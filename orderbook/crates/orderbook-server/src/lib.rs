use itoa::Buffer as ItoaBuffer;
use memchr::memchr;
use mio::event::Event;
use mio::net::{TcpListener, TcpStream};
use mio::{Events, Interest, Poll, Token};
use orderbook::{
    AccountId, AccountSnapshot, BalanceError, BookEvent, BookRemovalReason, BookSnapshot,
    EngineEvent, EventBroadcaster, GatewayError, LevelSnapshot, MatchResult, OrderBook, OrderError,
    OrderRejectionReason, OrderType, OrderView, Price, Quantity, RiskEngine, SequencedEngineEvent,
    Side,
};

#[cfg(test)]
use orderbook::Fill;
use parking_lot::Mutex;
use rustc_hash::FxHashMap;
use std::io::{self, ErrorKind, Read, Write};
use std::net::SocketAddr;
use std::sync::Arc;
use tokio::sync::broadcast::error::TryRecvError;
use tracing::warn;

const SERVER_TOKEN: Token = Token(0);

pub type SharedRiskEngine = Arc<Mutex<RiskEngine>>;

#[inline]
pub fn shared_matching_engine(engine: RiskEngine) -> (SharedRiskEngine, EventBroadcaster) {
    let broadcaster = EventBroadcaster::default();
    let mut engine = engine;
    engine.set_event_broadcaster(broadcaster.clone());
    (Arc::new(Mutex::new(engine)), broadcaster)
}

mod grpc;

pub use grpc::proto;
pub use grpc::GrpcOrderBookService;

pub struct TcpOrderBookServer {
    poll: Poll,
    listener: TcpListener,
    events: Events,
    connections: FxHashMap<usize, Connection>,
    next_token: usize,
    engine: SharedRiskEngine,
    event_bus: EventBroadcaster,
    event_rx: tokio::sync::broadcast::Receiver<SequencedEngineEvent>,
}

impl TcpOrderBookServer {
    pub fn bind(address: &str) -> io::Result<Self> {
        let (engine, event_bus) = shared_matching_engine(RiskEngine::new());
        Self::with_shared_engine(address, engine, event_bus)
    }

    pub fn with_order_book(address: &str, book: OrderBook) -> io::Result<Self> {
        let engine = RiskEngine::with_book(book);
        let (shared, event_bus) = shared_matching_engine(engine);
        Self::with_shared_engine(address, shared, event_bus)
    }

    pub fn with_shared_engine(
        address: &str,
        engine: SharedRiskEngine,
        event_bus: EventBroadcaster,
    ) -> io::Result<Self> {
        let socket_addr: SocketAddr = address
            .parse()
            .map_err(|_| io::Error::new(ErrorKind::InvalidInput, "invalid socket address"))?;
        let mut listener = TcpListener::bind(socket_addr)?;
        let poll = Poll::new()?;
        poll.registry()
            .register(&mut listener, SERVER_TOKEN, Interest::READABLE)?;

        Ok(Self {
            poll,
            listener,
            events: Events::with_capacity(1024),
            connections: FxHashMap::default(),
            next_token: 1,
            engine,
            event_bus: event_bus.clone(),
            event_rx: event_bus.subscribe(),
        })
    }

    pub fn run(&mut self) -> io::Result<()> {
        loop {
            self.drain_events()?;
            self.poll.poll(&mut self.events, None)?;
            self.drain_events()?;
            let events: Vec<Event> = self.events.iter().map(|event| event.clone()).collect();
            for event in events {
                match event.token() {
                    SERVER_TOKEN => self.accept_connections()?,
                    token => self.handle_connection(token, &event)?,
                }
            }
        }
    }

    fn accept_connections(&mut self) -> io::Result<()> {
        loop {
            match self.listener.accept() {
                Ok((mut stream, _)) => {
                    let token = self.next_token;
                    self.next_token += 1;
                    let token_struct = Token(token);
                    self.poll
                        .registry()
                        .register(&mut stream, token_struct, Interest::READABLE)?;
                    self.connections.insert(token, Connection::new(stream));
                }
                Err(ref err) if err.kind() == ErrorKind::WouldBlock => break,
                Err(ref err) if err.kind() == ErrorKind::Interrupted => continue,
                Err(err) => return Err(err),
            }
        }
        Ok(())
    }

    fn handle_connection(&mut self, token: Token, event: &Event) -> io::Result<()> {
        let key = token.0;
        let mut drop_connection = false;

        if event.is_readable() {
            if let Some(connection) = self.connections.get_mut(&key) {
                match connection.read(&self.engine)? {
                    ReadStatus::Closed => drop_connection = true,
                    ReadStatus::Open => {}
                }
            } else {
                return Ok(());
            }
        }

        if !drop_connection && event.is_writable() {
            if let Some(connection) = self.connections.get_mut(&key) {
                connection.write()?;
            }
        }

        if drop_connection {
            self.drop_connection(key)?;
        } else if let Some(connection) = self.connections.get_mut(&key) {
            let interest = if connection.needs_flush() {
                Interest::READABLE | Interest::WRITABLE
            } else {
                Interest::READABLE
            };
            self.poll
                .registry()
                .reregister(&mut connection.socket, token, interest)?;
        }

        Ok(())
    }

    fn drop_connection(&mut self, key: usize) -> io::Result<()> {
        if let Some(mut connection) = self.connections.remove(&key) {
            self.poll.registry().deregister(&mut connection.socket)?;
        }
        Ok(())
    }

    fn drain_events(&mut self) -> io::Result<()> {
        loop {
            match self.event_rx.try_recv() {
                Ok(event) => self.dispatch_event(&event)?,
                Err(TryRecvError::Empty) => break,
                Err(TryRecvError::Lagged(skipped)) => {
                    warn!(skipped, "tcp event receiver lagged; skipping");
                }
                Err(TryRecvError::Closed) => {
                    self.event_rx = self.event_bus.subscribe();
                    break;
                }
            }
        }
        Ok(())
    }

    fn dispatch_event(&mut self, event: &SequencedEngineEvent) -> io::Result<()> {
        for (key, connection) in self.connections.iter_mut() {
            if connection.subscribed {
                connection.push_event(event);
                let interest = if connection.needs_flush() {
                    Interest::READABLE | Interest::WRITABLE
                } else {
                    Interest::READABLE
                };
                self.poll
                    .registry()
                    .reregister(&mut connection.socket, Token(*key), interest)?;
            }
        }
        Ok(())
    }
}

struct Connection {
    socket: TcpStream,
    read_buffer: Vec<u8>,
    write_buffer: Vec<u8>,
    write_cursor: usize,
    subscribed: bool,
}

enum ReadStatus {
    Open,
    Closed,
}

impl Connection {
    fn new(socket: TcpStream) -> Self {
        Self {
            socket,
            read_buffer: Vec::with_capacity(4096),
            write_buffer: Vec::with_capacity(1024),
            write_cursor: 0,
            subscribed: false,
        }
    }

    fn needs_flush(&self) -> bool {
        self.write_cursor < self.write_buffer.len()
    }

    fn read(&mut self, engine: &SharedRiskEngine) -> io::Result<ReadStatus> {
        let mut buffer = [0u8; 4096];
        loop {
            match self.socket.read(&mut buffer) {
                Ok(0) => return Ok(ReadStatus::Closed),
                Ok(n) => {
                    self.read_buffer.extend_from_slice(&buffer[..n]);
                    self.process_frames(engine);
                }
                Err(ref err) if err.kind() == ErrorKind::WouldBlock => break,
                Err(ref err) if err.kind() == ErrorKind::Interrupted => continue,
                Err(err) => return Err(err),
            }
        }
        Ok(ReadStatus::Open)
    }

    fn write(&mut self) -> io::Result<()> {
        while self.write_cursor < self.write_buffer.len() {
            match self.socket.write(&self.write_buffer[self.write_cursor..]) {
                Ok(0) => break,
                Ok(n) => {
                    self.write_cursor += n;
                }
                Err(ref err) if err.kind() == ErrorKind::WouldBlock => break,
                Err(ref err) if err.kind() == ErrorKind::Interrupted => continue,
                Err(err) => return Err(err),
            }
        }

        if self.write_cursor >= self.write_buffer.len() {
            self.write_buffer.clear();
            self.write_cursor = 0;
        }
        Ok(())
    }

    fn push_event(&mut self, event: &SequencedEngineEvent) {
        write_event(&mut self.write_buffer, event);
    }

    fn process_frames(&mut self, engine: &SharedRiskEngine) {
        let mut start = 0;
        while start < self.read_buffer.len() {
            let slice = &self.read_buffer[start..];
            let Some(position) = memchr(b'\n', slice) else {
                break;
            };
            let end = start + position;
            let frame = &self.read_buffer[start..end];
            let result = {
                let mut guard = engine.lock();
                handle_frame(&mut guard, frame)
            };
            match result {
                Ok(CommandResponse::Subscription { subscribed }) => {
                    self.subscribed = subscribed;
                    CommandResponse::Subscription { subscribed }.write_to(&mut self.write_buffer);
                }
                Ok(response) => {
                    response.write_to(&mut self.write_buffer);
                }
                Err(error) => {
                    error.write_to(&mut self.write_buffer);
                }
            }
            start = end + 1;
        }
        if start > 0 {
            self.read_buffer.drain(..start);
        }
    }
}

#[derive(Debug)]
struct Fields<'a> {
    line: &'a [u8],
    position: usize,
}

impl<'a> Fields<'a> {
    fn new(line: &'a [u8]) -> Self {
        Self { line, position: 0 }
    }
}

impl<'a> Iterator for Fields<'a> {
    type Item = &'a [u8];

    fn next(&mut self) -> Option<Self::Item> {
        let len = self.line.len();
        while self.position < len && self.line[self.position].is_ascii_whitespace() {
            self.position += 1;
        }
        if self.position >= len {
            return None;
        }
        let start = self.position;
        while self.position < len && !self.line[self.position].is_ascii_whitespace() {
            self.position += 1;
        }
        Some(&self.line[start..self.position])
    }
}

#[derive(Debug, PartialEq, Eq)]
enum CommandResponse {
    Ack,
    Execution(MatchResult),
    Canceled(Quantity),
    SnapshotLevel {
        side: Side,
        price: Price,
        orders: Vec<OrderView>,
    },
    Book(BookSnapshot),
    Order(OrderView),
    Subscription {
        subscribed: bool,
    },
    Balance {
        account_id: AccountId,
        snapshot: AccountSnapshot,
    },
}

impl CommandResponse {
    fn write_to(self, buffer: &mut Vec<u8>) {
        match self {
            CommandResponse::Ack => {
                buffer.extend_from_slice(b"OK\n");
            }
            CommandResponse::Execution(result) => {
                write_match_result(buffer, result);
            }
            CommandResponse::Canceled(quantity) => {
                buffer.extend_from_slice(b"CANCELED ");
                push_u64(buffer, quantity);
                buffer.push(b'\n');
            }
            CommandResponse::SnapshotLevel {
                side,
                price,
                orders,
            } => {
                buffer.extend_from_slice(b"SNAP ");
                buffer.push(side_to_byte(side));
                buffer.push(b' ');
                push_u64(buffer, price);
                for order in orders {
                    buffer.push(b' ');
                    push_u64(buffer, order.id);
                    buffer.push(b':');
                    push_u64(buffer, order.quantity);
                }
                buffer.push(b'\n');
            }
            CommandResponse::Book(snapshot) => {
                buffer.extend_from_slice(b"BOOKSNAP");
                for level in snapshot.bids {
                    buffer.push(b' ');
                    write_level_snapshot(buffer, Side::Bid, level);
                }
                for level in snapshot.asks {
                    buffer.push(b' ');
                    write_level_snapshot(buffer, Side::Ask, level);
                }
                buffer.push(b'\n');
            }
            CommandResponse::Order(order) => {
                buffer.extend_from_slice(b"ORDER ");
                push_u64(buffer, order.id);
                buffer.push(b' ');
                buffer.push(side_to_byte(order.side));
                buffer.push(b' ');
                push_u64(buffer, order.price);
                buffer.push(b' ');
                push_u64(buffer, order.quantity);
                buffer.push(b'\n');
            }
            CommandResponse::Subscription { subscribed } => {
                if subscribed {
                    buffer.extend_from_slice(b"SUBSCRIBED\n");
                } else {
                    buffer.extend_from_slice(b"UNSUBSCRIBED\n");
                }
            }
            CommandResponse::Balance {
                account_id,
                snapshot,
            } => {
                buffer.extend_from_slice(b"BAL ");
                push_u64(buffer, account_id);
                buffer.push(b' ');
                push_u64(buffer, clamp_to_u64(snapshot.available_base));
                buffer.push(b' ');
                push_u64(buffer, clamp_to_u64(snapshot.reserved_base));
                buffer.push(b' ');
                push_u64(buffer, clamp_to_u64(snapshot.available_quote));
                buffer.push(b' ');
                push_u64(buffer, clamp_to_u64(snapshot.reserved_quote));
                buffer.push(b'\n');
            }
        }
    }
}

fn write_match_result(buffer: &mut Vec<u8>, result: MatchResult) {
    buffer.extend_from_slice(b"EXEC ");
    push_u64(buffer, result.unfilled);
    if let Some(resting) = result.resting {
        buffer.extend_from_slice(b" REST ");
        push_u64(buffer, resting.id);
        buffer.push(b' ');
        buffer.push(side_to_byte(resting.side));
        buffer.push(b' ');
        push_u64(buffer, resting.price);
        buffer.push(b' ');
        push_u64(buffer, resting.quantity);
    }
    for fill in result.fills {
        buffer.extend_from_slice(b" FILL ");
        push_u64(buffer, fill.maker_id);
        buffer.push(b' ');
        push_u64(buffer, fill.price);
        buffer.push(b' ');
        push_u64(buffer, fill.quantity);
    }
    buffer.push(b'\n');
}

fn write_event(buffer: &mut Vec<u8>, event: &SequencedEngineEvent) {
    buffer.extend_from_slice(b"EVENT ");
    push_u64(buffer, event.sequence);
    match &event.event {
        EngineEvent::Book(BookEvent::Added(order)) => {
            buffer.extend_from_slice(b" BOOK_ADD ");
            push_u64(buffer, order.id);
            buffer.push(b' ');
            buffer.push(side_to_byte(order.side));
            buffer.push(b' ');
            push_u64(buffer, order.price);
            buffer.push(b' ');
            push_u64(buffer, order.quantity);
        }
        EngineEvent::Book(BookEvent::Updated(order)) => {
            buffer.extend_from_slice(b" BOOK_UPDATE ");
            push_u64(buffer, order.id);
            buffer.push(b' ');
            buffer.push(side_to_byte(order.side));
            buffer.push(b' ');
            push_u64(buffer, order.price);
            buffer.push(b' ');
            push_u64(buffer, order.quantity);
        }
        EngineEvent::Book(BookEvent::Removed {
            order_id,
            side,
            price,
            quantity,
            reason,
        }) => {
            buffer.extend_from_slice(b" BOOK_REMOVE ");
            push_u64(buffer, *order_id);
            buffer.push(b' ');
            buffer.push(side_to_byte(*side));
            buffer.push(b' ');
            push_u64(buffer, *price);
            buffer.push(b' ');
            push_u64(buffer, *quantity);
            buffer.push(b' ');
            buffer.extend_from_slice(removal_reason_to_bytes(*reason));
        }
        EngineEvent::Trade(trade) => {
            buffer.extend_from_slice(b" TRADE ");
            push_u64(buffer, trade.taker_order_id);
            buffer.push(b' ');
            push_u64(buffer, trade.maker_order_id);
            buffer.push(b' ');
            buffer.push(side_to_byte(trade.taker_side));
            buffer.push(b' ');
            buffer.extend_from_slice(order_type_to_bytes(trade.taker_order_type));
            buffer.push(b' ');
            push_u64(buffer, trade.price);
            buffer.push(b' ');
            push_u64(buffer, trade.quantity);
        }
        EngineEvent::Rejection(rejection) => {
            buffer.extend_from_slice(b" REJECT ");
            push_u64(buffer, rejection.order_id);
            buffer.push(b' ');
            buffer.push(side_to_byte(rejection.side));
            buffer.push(b' ');
            buffer.extend_from_slice(order_type_to_bytes(rejection.order_type));
            buffer.push(b' ');
            match rejection.price {
                Some(price) => push_u64(buffer, price),
                None => buffer.push(b'-'),
            }
            buffer.push(b' ');
            push_u64(buffer, rejection.quantity);
            buffer.push(b' ');
            buffer.extend_from_slice(rejection_reason_to_bytes(rejection.reason));
        }
    }
    buffer.push(b'\n');
}

#[derive(Debug, PartialEq, Eq)]
enum CommandError {
    MissingField(&'static str),
    InvalidField(&'static str),
    TooManyFields,
    UnknownCommand,
    Gateway(GatewayError),
}

impl CommandError {
    fn write_to(self, buffer: &mut Vec<u8>) {
        buffer.extend_from_slice(b"ERR ");
        match self {
            CommandError::MissingField(name) => {
                buffer.extend_from_slice(b"missing_field ");
                buffer.extend_from_slice(name.as_bytes());
            }
            CommandError::InvalidField(name) => {
                buffer.extend_from_slice(b"invalid_field ");
                buffer.extend_from_slice(name.as_bytes());
            }
            CommandError::TooManyFields => {
                buffer.extend_from_slice(b"too_many_fields");
            }
            CommandError::UnknownCommand => {
                buffer.extend_from_slice(b"unknown_command");
            }
            CommandError::Gateway(error) => {
                buffer.extend_from_slice(gateway_error_code(error).as_bytes())
            }
        }
        buffer.push(b'\n');
    }
}

fn gateway_error_code(error: GatewayError) -> &'static str {
    match error {
        GatewayError::Order(order) => match order {
            OrderError::DuplicateOrder => "duplicate_order",
            OrderError::UnknownOrder => "unknown_order",
            OrderError::InvalidQuantity => "invalid_quantity",
            OrderError::CrossedOrder => "crossed_order",
            OrderError::MissingPrice => "missing_price",
        },
        GatewayError::Balance(balance) => match balance {
            BalanceError::UnknownAccount => "unknown_account",
            BalanceError::InsufficientBase => "insufficient_base",
            BalanceError::InsufficientQuote => "insufficient_quote",
            BalanceError::UnknownOrder => "unknown_order",
            BalanceError::AccountMismatch => "account_mismatch",
            BalanceError::ArithmeticOverflow => "numeric_overflow",
            BalanceError::InvariantViolation(_) => "invariant_violation",
        },
    }
}

fn side_to_byte(side: Side) -> u8 {
    match side {
        Side::Bid => b'B',
        Side::Ask => b'A',
    }
}

fn order_type_to_bytes(order_type: OrderType) -> &'static [u8] {
    match order_type {
        OrderType::Market => b"MARKET",
        OrderType::Limit => b"LIMIT",
        OrderType::ImmediateOrCancel => b"IOC",
        OrderType::FillOrKill => b"FOK",
        OrderType::PostOnly => b"POST_ONLY",
    }
}

fn removal_reason_to_bytes(reason: BookRemovalReason) -> &'static [u8] {
    match reason {
        BookRemovalReason::Filled => b"FILLED",
        BookRemovalReason::Canceled => b"CANCELED",
    }
}

fn rejection_reason_to_bytes(reason: OrderRejectionReason) -> &'static [u8] {
    match reason {
        OrderRejectionReason::DuplicateOrder => b"DUPLICATE",
        OrderRejectionReason::Crossed => b"CROSSED",
        OrderRejectionReason::InvalidQuantity => b"INVALID_QTY",
        OrderRejectionReason::MissingPrice => b"MISSING_PRICE",
        OrderRejectionReason::InsufficientLiquidity => b"INSUFFICIENT_LIQ",
    }
}

fn parse_side(field: &[u8]) -> Result<Side, CommandError> {
    match field {
        [b'B'] | [b'b'] => Ok(Side::Bid),
        [b'A'] | [b'a'] => Ok(Side::Ask),
        _ => Err(CommandError::InvalidField("side")),
    }
}

fn parse_order_type(field: &[u8]) -> Result<OrderType, CommandError> {
    let text = std::str::from_utf8(field)
        .map_err(|_| CommandError::InvalidField("order_type"))?
        .trim();
    if text.eq_ignore_ascii_case("LIMIT") || text.eq_ignore_ascii_case("L") {
        Ok(OrderType::Limit)
    } else if text.eq_ignore_ascii_case("MARKET")
        || text.eq_ignore_ascii_case("M")
        || text.eq_ignore_ascii_case("MKT")
    {
        Ok(OrderType::Market)
    } else if text.eq_ignore_ascii_case("IOC") {
        Ok(OrderType::ImmediateOrCancel)
    } else if text.eq_ignore_ascii_case("FOK") {
        Ok(OrderType::FillOrKill)
    } else if text.eq_ignore_ascii_case("POST")
        || text.eq_ignore_ascii_case("POST_ONLY")
        || text.eq_ignore_ascii_case("POSTONLY")
        || text.eq_ignore_ascii_case("PO")
    {
        Ok(OrderType::PostOnly)
    } else {
        Err(CommandError::InvalidField("order_type"))
    }
}

fn parse_u64(field: &[u8]) -> Result<u64, CommandError> {
    if field.is_empty() {
        return Err(CommandError::InvalidField("number"));
    }
    let mut value: u64 = 0;
    for &byte in field {
        if !(byte as char).is_ascii_digit() {
            return Err(CommandError::InvalidField("number"));
        }
        value = value
            .checked_mul(10)
            .and_then(|v| v.checked_add((byte - b'0') as u64))
            .ok_or(CommandError::InvalidField("number"))?;
    }
    Ok(value)
}

fn push_u64(buffer: &mut Vec<u8>, value: u64) {
    let mut itoa = ItoaBuffer::new();
    buffer.extend_from_slice(itoa.format(value).as_bytes());
}

fn clamp_to_u64(value: u128) -> u64 {
    value.min(u128::from(u64::MAX)) as u64
}

fn write_level_snapshot(buffer: &mut Vec<u8>, side: Side, level: LevelSnapshot) {
    buffer.push(side_to_byte(side));
    buffer.push(b':');
    push_u64(buffer, level.price);
    buffer.push(b':');
    push_u64(buffer, level.total_quantity);
    for order in level.orders {
        buffer.push(b':');
        push_u64(buffer, order.id);
        buffer.push(b'@');
        push_u64(buffer, order.quantity);
    }
}

fn handle_frame(engine: &mut RiskEngine, frame: &[u8]) -> Result<CommandResponse, CommandError> {
    let trimmed = if frame.ends_with(b"\r") {
        &frame[..frame.len() - 1]
    } else {
        frame
    };
    let mut fields = Fields::new(trimmed);
    let Some(command) = fields.next() else {
        return Err(CommandError::MissingField("command"));
    };
    if command.len() != 1 {
        return Err(CommandError::InvalidField("command"));
    }
    match command[0] {
        b'N' | b'n' => handle_new(engine, &mut fields),
        b'M' | b'm' => handle_modify(engine, &mut fields),
        b'C' | b'c' => handle_cancel(engine, &mut fields),
        b'S' | b's' => handle_snapshot(engine, &mut fields),
        b'O' | b'o' => handle_order_query(engine, &mut fields),
        b'F' | b'f' => handle_feed(&mut fields),
        b'A' | b'a' => handle_account_credit(engine, &mut fields),
        b'B' | b'b' => handle_balance(engine, &mut fields),
        _ => Err(CommandError::UnknownCommand),
    }
}

fn handle_new(
    engine: &mut RiskEngine,
    fields: &mut Fields<'_>,
) -> Result<CommandResponse, CommandError> {
    let account_id = fields
        .next()
        .ok_or(CommandError::MissingField("account_id"))
        .and_then(parse_u64)? as AccountId;
    let order_id = fields
        .next()
        .ok_or(CommandError::MissingField("order_id"))
        .and_then(parse_u64)?;
    let side = fields
        .next()
        .ok_or(CommandError::MissingField("side"))
        .and_then(parse_side)?;
    let price = fields
        .next()
        .ok_or(CommandError::MissingField("price"))
        .and_then(parse_u64)?;
    let quantity = fields
        .next()
        .ok_or(CommandError::MissingField("quantity"))
        .and_then(parse_u64)?;

    let type_field = fields.next();
    let order_type = match type_field {
        Some(value) => parse_order_type(value)?,
        None => OrderType::Limit,
    };

    if fields.next().is_some() {
        return Err(CommandError::TooManyFields);
    }

    let price_option = if matches!(order_type, OrderType::Market) {
        None
    } else {
        Some(price)
    };

    let result = engine
        .submit(
            account_id,
            order_id,
            side,
            order_type,
            price_option,
            quantity,
        )
        .map_err(CommandError::Gateway)?;

    Ok(CommandResponse::Execution(result))
}

fn handle_modify(
    engine: &mut RiskEngine,
    fields: &mut Fields<'_>,
) -> Result<CommandResponse, CommandError> {
    let account_id = fields
        .next()
        .ok_or(CommandError::MissingField("account_id"))
        .and_then(parse_u64)? as AccountId;
    let order_id = fields
        .next()
        .ok_or(CommandError::MissingField("order_id"))
        .and_then(parse_u64)?;
    let quantity = fields
        .next()
        .ok_or(CommandError::MissingField("quantity"))
        .and_then(parse_u64)?;

    if fields.next().is_some() {
        return Err(CommandError::TooManyFields);
    }

    engine
        .modify_order(account_id, order_id, quantity)
        .map(|_| CommandResponse::Ack)
        .map_err(CommandError::Gateway)
}

fn handle_cancel(
    engine: &mut RiskEngine,
    fields: &mut Fields<'_>,
) -> Result<CommandResponse, CommandError> {
    let account_id = fields
        .next()
        .ok_or(CommandError::MissingField("account_id"))
        .and_then(parse_u64)? as AccountId;
    let order_id = fields
        .next()
        .ok_or(CommandError::MissingField("order_id"))
        .and_then(parse_u64)?;

    if fields.next().is_some() {
        return Err(CommandError::TooManyFields);
    }

    engine
        .cancel_order(account_id, order_id)
        .map(CommandResponse::Canceled)
        .map_err(CommandError::Gateway)
}

fn handle_snapshot(
    engine: &mut RiskEngine,
    fields: &mut Fields<'_>,
) -> Result<CommandResponse, CommandError> {
    let Some(side_field) = fields.next() else {
        return Ok(CommandResponse::Book(engine.order_book().snapshot()));
    };

    let side = parse_side(side_field)?;
    let price = fields
        .next()
        .ok_or(CommandError::MissingField("price"))
        .and_then(parse_u64)?;

    if fields.next().is_some() {
        return Err(CommandError::TooManyFields);
    }

    let orders = engine
        .order_book()
        .level_orders(side, price)
        .unwrap_or_else(Vec::new);

    Ok(CommandResponse::SnapshotLevel {
        side,
        price,
        orders,
    })
}

fn handle_order_query(
    engine: &mut RiskEngine,
    fields: &mut Fields<'_>,
) -> Result<CommandResponse, CommandError> {
    let order_id = fields
        .next()
        .ok_or(CommandError::MissingField("order_id"))
        .and_then(parse_u64)?;

    if fields.next().is_some() {
        return Err(CommandError::TooManyFields);
    }

    engine
        .order_book()
        .order(order_id)
        .map(CommandResponse::Order)
        .ok_or(CommandError::Gateway(GatewayError::Order(
            OrderError::UnknownOrder,
        )))
}

fn handle_feed(fields: &mut Fields<'_>) -> Result<CommandResponse, CommandError> {
    let subscribed = match fields.next() {
        None => true,
        Some(value) => parse_subscription_mode(value)?,
    };

    if fields.next().is_some() {
        return Err(CommandError::TooManyFields);
    }

    Ok(CommandResponse::Subscription { subscribed })
}

fn handle_account_credit(
    engine: &mut RiskEngine,
    fields: &mut Fields<'_>,
) -> Result<CommandResponse, CommandError> {
    let account_id = fields
        .next()
        .ok_or(CommandError::MissingField("account_id"))
        .and_then(parse_u64)? as AccountId;
    let base = fields
        .next()
        .ok_or(CommandError::MissingField("base"))
        .and_then(parse_u64)?;
    let quote = fields
        .next()
        .ok_or(CommandError::MissingField("quote"))
        .and_then(parse_u64)?;

    if fields.next().is_some() {
        return Err(CommandError::TooManyFields);
    }

    engine
        .credit_account(account_id, base, quote)
        .map_err(|error| CommandError::Gateway(GatewayError::Balance(error)))?;
    let snapshot = engine
        .account_snapshot(account_id)
        .ok_or(CommandError::Gateway(GatewayError::Balance(
            BalanceError::UnknownAccount,
        )))?;

    Ok(CommandResponse::Balance {
        account_id,
        snapshot,
    })
}

fn handle_balance(
    engine: &mut RiskEngine,
    fields: &mut Fields<'_>,
) -> Result<CommandResponse, CommandError> {
    let account_id = fields
        .next()
        .ok_or(CommandError::MissingField("account_id"))
        .and_then(parse_u64)? as AccountId;

    if fields.next().is_some() {
        return Err(CommandError::TooManyFields);
    }

    let snapshot = engine
        .account_snapshot(account_id)
        .ok_or(CommandError::Gateway(GatewayError::Balance(
            BalanceError::UnknownAccount,
        )))?;

    Ok(CommandResponse::Balance {
        account_id,
        snapshot,
    })
}

fn parse_subscription_mode(field: &[u8]) -> Result<bool, CommandError> {
    let text = std::str::from_utf8(field)
        .map_err(|_| CommandError::InvalidField("mode"))?
        .trim();
    if text.is_empty()
        || text.eq_ignore_ascii_case("on")
        || text.eq_ignore_ascii_case("yes")
        || text.eq_ignore_ascii_case("1")
        || text.eq_ignore_ascii_case("events")
        || text.eq_ignore_ascii_case("sub")
        || text.eq_ignore_ascii_case("subscribe")
    {
        Ok(true)
    } else if text.eq_ignore_ascii_case("off")
        || text.eq_ignore_ascii_case("no")
        || text.eq_ignore_ascii_case("0")
        || text.eq_ignore_ascii_case("none")
        || text.eq_ignore_ascii_case("stop")
        || text.eq_ignore_ascii_case("unsub")
        || text.eq_ignore_ascii_case("unsubscribe")
    {
        Ok(false)
    } else {
        Err(CommandError::InvalidField("mode"))
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    fn run_command(engine: &mut RiskEngine, input: &[u8]) -> Vec<u8> {
        match handle_frame(engine, input) {
            Ok(response) => {
                let mut buffer = Vec::new();
                response.write_to(&mut buffer);
                buffer
            }
            Err(error) => {
                let mut buffer = Vec::new();
                error.write_to(&mut buffer);
                buffer
            }
        }
    }

    #[test]
    fn new_and_snapshot_commands() {
        let mut engine = RiskEngine::new();
        run_command(&mut engine, b"A 1 0 2000");
        assert_eq!(
            run_command(&mut engine, b"N 1 1 B 100 5"),
            b"EXEC 0 REST 1 B 100 5\n"
        );
        assert_eq!(
            run_command(&mut engine, b"N 1 2 B 100 7"),
            b"EXEC 0 REST 2 B 100 7\n"
        );
        let snapshot = run_command(&mut engine, b"S B 100");
        assert_eq!(snapshot, b"SNAP B 100 1:5 2:7\n");
        let full_snapshot = run_command(&mut engine, b"S");
        assert_eq!(full_snapshot, b"BOOKSNAP B:100:12:1@5:2@7\n");
    }

    #[test]
    fn modify_cancel_and_order_query() {
        let mut engine = RiskEngine::new();
        run_command(&mut engine, b"A 1 10 0");
        assert_eq!(
            run_command(&mut engine, b"N 1 1 A 105 3"),
            b"EXEC 0 REST 1 A 105 3\n"
        );
        assert_eq!(run_command(&mut engine, b"M 1 1 6"), b"OK\n");
        let order = run_command(&mut engine, b"O 1");
        assert_eq!(order, b"ORDER 1 A 105 6\n");
        let canceled = run_command(&mut engine, b"C 1 1");
        assert_eq!(canceled, b"CANCELED 6\n");
    }

    #[test]
    fn errors_reported_correctly() {
        let mut engine = RiskEngine::new();
        run_command(&mut engine, b"A 1 0 1000");
        let duplicate = run_command(&mut engine, b"N 1 1 B 100 5");
        assert_eq!(duplicate, b"EXEC 0 REST 1 B 100 5\n");
        let duplicate = run_command(&mut engine, b"N 1 1 B 100 5");
        assert_eq!(duplicate, b"ERR duplicate_order\n");
        let missing_field = run_command(&mut engine, b"M 1");
        assert_eq!(missing_field, b"ERR missing_field order_id\n");
        let unknown = run_command(&mut engine, b"O 77");
        assert_eq!(unknown, b"ERR unknown_order\n");
        let invalid = run_command(&mut engine, b"Z 1");
        assert_eq!(invalid, b"ERR unknown_command\n");
    }

    #[test]
    fn feed_commands_toggle_subscription() {
        let mut engine = RiskEngine::new();
        assert_eq!(run_command(&mut engine, b"F"), b"SUBSCRIBED\n");
        assert_eq!(run_command(&mut engine, b"F OFF"), b"UNSUBSCRIBED\n");
        assert_eq!(
            run_command(&mut engine, b"F UNKNOWN"),
            b"ERR invalid_field mode\n"
        );
    }

    #[test]
    fn credit_and_balance_commands() {
        let mut engine = RiskEngine::new();
        let credit = run_command(&mut engine, b"A 10 5 7");
        assert_eq!(credit, b"BAL 10 5 0 7 0\n");

        let balance = run_command(&mut engine, b"B 10");
        assert_eq!(balance, b"BAL 10 5 0 7 0\n");

        let unknown = run_command(&mut engine, b"B 11");
        assert_eq!(unknown, b"ERR unknown_account\n");
    }

    #[test]
    fn market_ioc_and_fok_commands() {
        let mut market_engine = RiskEngine::new();
        run_command(&mut market_engine, b"A 1 10 0");
        run_command(&mut market_engine, b"A 2 10 0");
        run_command(&mut market_engine, b"A 3 0 2000");
        run_command(&mut market_engine, b"N 1 1 A 101 3");
        run_command(&mut market_engine, b"N 2 2 A 102 4");

        let market = run_command(&mut market_engine, b"N 3 10 B 0 5 MARKET");
        assert!(market.starts_with(b"EXEC 0"));

        let mut ioc_engine = RiskEngine::new();
        run_command(&mut ioc_engine, b"A 1 10 0");
        run_command(&mut ioc_engine, b"A 3 0 2000");
        run_command(&mut ioc_engine, b"N 1 1 A 101 6");
        let ioc = run_command(&mut ioc_engine, b"N 3 11 B 102 10 IOC");
        assert!(ioc.starts_with(b"EXEC 4"));

        let mut fok_engine = RiskEngine::new();
        run_command(&mut fok_engine, b"A 1 10 0");
        run_command(&mut fok_engine, b"A 3 0 2000");
        run_command(&mut fok_engine, b"N 1 1 A 101 6");
        let fok = run_command(&mut fok_engine, b"N 3 12 B 101 10 FOK");
        assert_eq!(fok, b"EXEC 10\n");
    }

    #[test]
    fn post_only_and_lowercase_commands() {
        let mut engine = RiskEngine::new();
        run_command(&mut engine, b"A 1 10 0");
        let add = run_command(&mut engine, b"n 1 5 a 110 4 post_only");
        assert_eq!(add, b"EXEC 0 REST 5 A 110 4\n");

        run_command(&mut engine, b"A 1 0 1000");
        let err = run_command(&mut engine, b"n 1 6 b 110 1 post");
        assert_eq!(err, b"ERR crossed_order\n");
    }

    #[test]
    fn parse_helpers_cover_all_variants() {
        assert_eq!(parse_side(b"B"), Ok(Side::Bid));
        assert_eq!(parse_side(b"a"), Ok(Side::Ask));
        assert_eq!(parse_side(b"X"), Err(CommandError::InvalidField("side")));

        assert_eq!(parse_order_type(b"LIMIT"), Ok(OrderType::Limit));
        assert_eq!(parse_order_type(b"m"), Ok(OrderType::Market));
        assert_eq!(parse_order_type(b"MKT"), Ok(OrderType::Market));
        assert_eq!(parse_order_type(b"IOC"), Ok(OrderType::ImmediateOrCancel));
        assert_eq!(parse_order_type(b"FOK"), Ok(OrderType::FillOrKill));
        assert_eq!(parse_order_type(b"po"), Ok(OrderType::PostOnly));
        assert_eq!(
            parse_order_type(b"X"),
            Err(CommandError::InvalidField("order_type"))
        );

        assert_eq!(parse_u64(b"123"), Ok(123));
        assert_eq!(parse_u64(b""), Err(CommandError::InvalidField("number")));
        assert_eq!(parse_u64(b"12A"), Err(CommandError::InvalidField("number")));
        assert_eq!(
            parse_u64(b"18446744073709551616"),
            Err(CommandError::InvalidField("number"))
        );
    }

    #[test]
    fn fields_iterator_skips_whitespace() {
        let tokens: Vec<&[u8]> = Fields::new(b"  A  bb\tcc  ").collect();
        assert_eq!(tokens, vec![&b"A"[..], &b"bb"[..], &b"cc"[..]]);
    }

    #[test]
    fn handle_frame_validates_command_field() {
        let mut engine = RiskEngine::new();
        let missing = handle_frame(&mut engine, b"   ").unwrap_err();
        assert_eq!(missing, CommandError::MissingField("command"));

        let invalid = handle_frame(&mut engine, b"NO 1").unwrap_err();
        assert_eq!(invalid, CommandError::InvalidField("command"));
    }

    #[test]
    fn handle_new_reports_specific_errors() {
        let mut engine = RiskEngine::new();
        let missing_account = run_command(&mut engine, b"N");
        assert_eq!(missing_account, b"ERR missing_field account_id\n");
        let missing_order = run_command(&mut engine, b"N 1");
        assert_eq!(missing_order, b"ERR missing_field order_id\n");
        let missing_side = run_command(&mut engine, b"N 1 1");
        assert_eq!(missing_side, b"ERR missing_field side\n");
        let missing_price = run_command(&mut engine, b"N 1 1 B");
        assert_eq!(missing_price, b"ERR missing_field price\n");
        let missing_quantity = run_command(&mut engine, b"N 1 1 B 100");
        assert_eq!(missing_quantity, b"ERR missing_field quantity\n");
        let too_many = run_command(&mut engine, b"N 1 1 B 100 5 LIMIT EXTRA");
        assert_eq!(too_many, b"ERR too_many_fields\n");
    }

    #[test]
    fn handle_modify_and_cancel_errors() {
        let mut engine = RiskEngine::new();
        let missing_account = run_command(&mut engine, b"M");
        assert_eq!(missing_account, b"ERR missing_field account_id\n");
        let missing_order_id = run_command(&mut engine, b"M 1");
        assert_eq!(missing_order_id, b"ERR missing_field order_id\n");
        let missing_quantity = run_command(&mut engine, b"M 1 5");
        assert_eq!(missing_quantity, b"ERR missing_field quantity\n");
        let unknown = run_command(&mut engine, b"M 1 5 4");
        assert_eq!(unknown, b"ERR unknown_order\n");

        let cancel_missing = run_command(&mut engine, b"C");
        assert_eq!(cancel_missing, b"ERR missing_field account_id\n");
        let cancel_unknown = run_command(&mut engine, b"C 1 2 3");
        assert_eq!(cancel_unknown, b"ERR too_many_fields\n");
    }

    #[test]
    fn handle_snapshot_unknown_price_returns_empty_level() {
        let mut engine = RiskEngine::new();
        run_command(&mut engine, b"A 1 0 1000");
        run_command(&mut engine, b"N 1 1 B 100 5");
        let result = run_command(&mut engine, b"S A 999");
        assert_eq!(result, b"SNAP A 999\n");
    }

    #[test]
    fn write_match_result_covers_all_fields() {
        let mut buffer = Vec::new();
        write_match_result(
            &mut buffer,
            MatchResult {
                fills: vec![
                    Fill {
                        maker_id: 1,
                        price: 101,
                        quantity: 2,
                    },
                    Fill {
                        maker_id: 2,
                        price: 102,
                        quantity: 3,
                    },
                ],
                resting: Some(OrderView {
                    id: 99,
                    side: Side::Bid,
                    price: 100,
                    quantity: 7,
                }),
                unfilled: 1,
            },
        );
        assert_eq!(
            buffer,
            b"EXEC 1 REST 99 B 100 7 FILL 1 101 2 FILL 2 102 3\n".to_vec()
        );
    }

    #[test]
    fn command_response_book_serializes_bids_and_asks() {
        let mut buffer = Vec::new();
        CommandResponse::Book(BookSnapshot {
            bids: vec![LevelSnapshot {
                price: 100,
                total_quantity: 5,
                orders: vec![OrderView {
                    id: 1,
                    side: Side::Bid,
                    price: 100,
                    quantity: 5,
                }],
            }],
            asks: vec![LevelSnapshot {
                price: 105,
                total_quantity: 6,
                orders: vec![OrderView {
                    id: 2,
                    side: Side::Ask,
                    price: 105,
                    quantity: 6,
                }],
            }],
        })
        .write_to(&mut buffer);
        assert_eq!(buffer, b"BOOKSNAP B:100:5:1@5 A:105:6:2@6\n".to_vec());
    }

    #[test]
    fn command_error_serialization_variants() {
        let mut buffer = Vec::new();
        CommandError::MissingField("test").write_to(&mut buffer);
        CommandError::InvalidField("foo").write_to(&mut buffer);
        CommandError::TooManyFields.write_to(&mut buffer);
        CommandError::UnknownCommand.write_to(&mut buffer);
        CommandError::Gateway(GatewayError::Order(OrderError::InvalidQuantity))
            .write_to(&mut buffer);
        CommandError::Gateway(GatewayError::Balance(BalanceError::UnknownAccount))
            .write_to(&mut buffer);
        assert_eq!(
            buffer,
            b"ERR missing_field test\nERR invalid_field foo\nERR too_many_fields\nERR unknown_command\nERR invalid_quantity\nERR unknown_account\n"
                .to_vec()
        );
    }

    #[test]
    fn process_frames_buffers_partial_messages() {
        let listener = std::net::TcpListener::bind("127.0.0.1:0").unwrap();
        let addr = listener.local_addr().unwrap();
        let mut _client = std::net::TcpStream::connect(addr).unwrap();
        _client.set_nonblocking(true).unwrap();
        let (server_stream, _) = listener.accept().unwrap();
        server_stream.set_nonblocking(true).unwrap();

        let mut connection = Connection::new(mio::net::TcpStream::from_std(server_stream));
        let (engine, _) = shared_matching_engine(RiskEngine::new());
        {
            let mut guard = engine.lock();
            guard.credit_account(1, 0, 10_000).expect("credit account");
        }

        connection.read_buffer.extend_from_slice(b"N 1 1 B 100");
        connection.process_frames(&engine);
        assert!(connection.write_buffer.is_empty());

        connection
            .read_buffer
            .extend_from_slice(b" 5\nN 1 2 B 100 6\n");
        connection.process_frames(&engine);
        assert_eq!(
            connection.write_buffer,
            b"EXEC 0 REST 1 B 100 5\nEXEC 0 REST 2 B 100 6\n".to_vec()
        );
    }
}
