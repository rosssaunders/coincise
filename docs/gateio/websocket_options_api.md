# [#](#gate-io-options-websocket-v4) Gate.io Options WebSocket v4

Gate.io provides a simple and robust Websocket API to integrate gate.io options
underlying trade status into your business or application.

We have language bindings in `Python`, more in the future! You can view code
examples in the dark area to the right, and you can switch the programming
language of the examples with the tabs in the top right.

## [#](#server-url) Server URL

We provide underlying trade server urls, you can choose one of them according to
your condition.

Base URLs:

- Real Trading: `wss://op-ws.gateio.live/v4/ws`
- TestNet: `wss://op-ws-testnet.gateio.live/v4/ws`

## [#](#changelog) Changelog

```python
# !/usr/bin/env python
# coding: utf-8

import hashlib
import hmac
import json
import logging
import time

from websocket import WebSocketApp

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class GateWebSocketApp(WebSocketApp):

   def __init__(self, url, api_key, api_secret, **kwargs):
      super(GateWebSocketApp, self).__init__(url, **kwargs)
      self._api_key = api_key
      self._api_secret = api_secret

   def _send_ping(self, interval, event, payload):
      while not event.wait(interval):
         self.last_ping_tm = time.time()
         if self.sock:
            try:
               self.sock.ping(payload)
            except Exception as ex:
               logger.warning("send_ping routine terminated: {}".format(ex))
               break
            try:
               self._request("options.ping", auth_required=False)
            except Exception as e:
               raise e

   def _request(self, channel, event=None, payload=None, auth_required=True):
      current_time = int(time.time())
      data = {
         "time": current_time,
         "channel": channel,
         "event": event,
         "payload": payload,
      }
      if auth_required:
         message = 'channel=%s&event=%s&time=%d' % (channel, event, current_time)
         data['auth'] = {
            "method": "api_key",
            "KEY": self._api_key,
            "SIGN": self.get_sign(message),
         }
      data = json.dumps(data)
      logger.info('request: %s', data)
      self.send(data)

   def get_sign(self, message):
      h = hmac.new(self._api_secret.encode("utf8"), message.encode("utf8"), hashlib.sha512)
      return h.hexdigest()

   def subscribe(self, channel, payload=None, auth_required=True):
      self._request(channel, "subscribe", payload, auth_required)

   def unsubscribe(self, channel, payload=None, auth_required=True):
        self._request(channel, "unsubscribe", payload, auth_required)

def on_message(ws, message):
    # type: (GateWebSocketApp, str) -> None
    # handle message received
    logger.info("message received from server: {}".format(message))

def on_open(ws):
    # type: (GateWebSocketApp) -> None
    # subscribe to channels interested
    logger.info('websocket connected')
    ws.subscribe("options.contract_tickers", ['BTC_USDT-20211231-59800-C'], False)

if __name__ == "__main__":
    logging.basicConfig(format="%(asctime)s - %(message)s", level=logging.DEBUG)
    app = GateWebSocketApp("wss://op-ws.gateio.live/v4/ws",
                           "YOUR_API_KEY",
                           "YOUR_API_SECRET",
                           on_open=on_open,
                           on_message=on_message)
    app.run_forever(ping_interval=5)
```

```go
package main

import (
	"crypto/hmac"
	"crypto/sha512"
	"crypto/tls"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"io"
	"net/url"
	"time"

	"github.com/gorilla/websocket"
)

type Msg struct {
	Time    int64    `json:"time"`
	Channel string   `json:"channel"`
	Event   string   `json:"event"`
	Payload []string `json:"payload"`
	Auth    *Auth    `json:"auth"`
}

type Auth struct {
	Method string `json:"method"`
	KEY    string `json:"KEY"`
	SIGN   string `json:"SIGN"`
}

const (
	Key    = "YOUR_API_KEY"
	Secret = "YOUR_API_SECRETY"
)

func sign(channel, event string, t int64) string {
	message := fmt.Sprintf("channel=%s&event=%s&time=%d", channel, event, t)
	h2 := hmac.New(sha512.New, []byte(Secret))
	io.WriteString(h2, message)
	return hex.EncodeToString(h2.Sum(nil))
}

func (msg *Msg) sign() {
	signStr := sign(msg.Channel, msg.Event, msg.Time)
	msg.Auth = &Auth{
		Method: "api_key",
		KEY:    Key,
		SIGN:   signStr,
	}
}

func (msg *Msg) send(c *websocket.Conn) error {
	msgByte, err := json.Marshal(msg)
	if err != nil {
		return err
	}
	return c.WriteMessage(websocket.TextMessage, msgByte)
}

func NewMsg(channel, event string, t int64, payload []string) *Msg {
	return &Msg{
		Time:    t,
		Channel: channel,
		Event:   event,
		Payload: payload,
	}
}

func main() {
	u := url.URL{Scheme: "wss", Host: "op-ws.gateio.live", Path: "/v4/ws"}
	websocket.DefaultDialer.TLSClientConfig = &tls.Config{RootCAs: nil, InsecureSkipVerify: true}
	c, _, err := websocket.DefaultDialer.Dial(u.String(), nil)
	if err != nil {
		panic(err)
	}
	c.SetPingHandler(nil)

	// read msg
	go func() {
		for {
			_, message, err := c.ReadMessage()
			if err != nil {
				c.Close()
				panic(err)
			}
			fmt.Printf("recv: %s\n", message)
		}
	}()

	t := time.Now().Unix()
	pingMsg := NewMsg("options.ping", "", t, []string{})
	err = pingMsg.send(c)
	if err != nil {
		panic(err)
	}

	// subscribe order book
	orderBookMsg := NewMsg("options.order_book", "subscribe", t, []string{"BTC_USDT-20211231-59800-C"})
	err = orderBookMsg.send(c)
	if err != nil {
		panic(err)
	}

	// subscribe positions
	positionsMsg := NewMsg("options.positions", "subscribe", t, []string{"USERID", "BTC_USDT-20211231-59800-C"})
	positionsMsg.sign()
	err = positionsMsg.send(c)
	if err != nil {
		panic(err)
	}

	select {}
}
```

2024.11-28

- `options.usertrades` add new fields `fee`,`text`

2021-12-28

- Initial release

## [#](#api-overview) API Overview

### [#](#method) Method

Each general api (such as ticker, order book etc.) supports 4 different event
messages, they are:

1.  **`subscribe`** (**RECOMMENDED TO USE**)

    Subscribe to receive notification from server when new data is available.

2.  **`unsubscribe`**

    Server will not send new data notification if unsubscribed.

3.  **`update`**

    If new subscribed data(incremental data) is available, server will send a
    notification to client.

4.  **`all`**

    If new subscribed data(all data) is available, server will send a
    notification to client.

### [#](#request) Request

Each request follows a common format, which contains `time`, `channel`, `event`
and `payload`.

### [#](#response) Response

Similar with request, response follows a common format composed of `time`,
`channel`, `event` , `error` and `result`.

Note: type of `result` is channel specific if it's server-initiated data update
notification, but response to client subscription request always set the
`result` to `{"status": "success"}`. To verify if subscription request is
successful or not, you only need to check if `error` field is null. Parsing
`result` field is not necessary.

Channel specific description below will only give the server-initiated data
update notification format for simplicity.

### [#](#error) Error

In case of error, you receive a message containing the proper error code and
message within an error object.

## [#](#authentication) Authentication

WARNING

Note: the GateAPIv4 key pair you used MUST have at least options read permission
enabled, and your outbound IP address must be in the key's IP whitelist if its
whitelist is enabled.

```python
# example WebSocket signature calculation implementation in Python
import hmac, hashlib, json, time

def gen_sign(channel, event, timestamp):
    # GateAPIv4 key pair
    api_key = 'YOUR_API_KEY'
    api_secret = 'YOUR_API_SECRET'

    s = 'channel=%s&event=%s&time=%d' % (channel, event, timestamp)
    sign = hmac.new(api_secret.encode('utf-8'), s.encode('utf-8'), hashlib.sha512).hexdigest()
    return {'method': 'api_key', 'KEY': api_key, 'SIGN': sign}

request = {
    'id': int(time.time() * 1e6),
    'time': int(time.time()),
    'channel': 'options.orders',
    'event': 'subscribe',
    'payload': ["1001", "BTC_USDT-20211231-59800-C"]
}
request['auth'] = gen_sign(request['channel'], request['event'], request['time'])
print(json.dumps(request))
```

Client requests need to carry authentication information if channels are
private, e.g. `options.orders` channel to retrieve user orders update.

Authentication are sent by `auth` field in request body with the following
format:

WebSocket authentication uses the same signature calculation method with Gate
APIv4 API, i.e., `HexEncode(HMAC_SHA512(secret, signature_string))`, but has the
following differences:

1.  Signature string concatenation method:
    `channel=<channel>&event=<event>&time=<time>`, where `<channel>`, `<event>`,
    `<time>` are corresponding request information
2.  Authentication information are sent in request body in field `auth`.

You can log into the console to retrieve Gate APIv4 key and secret.

# [#](#system-api) System API

System APIs used to retrieve service meta information. **NOT** used for
subscription.

## [#](#application-ping-pong) Application ping pong

`options.ping`

Code samples

```python
import time
# pip install websocket_client
from websocket import create_connection

ws = create_connection("wss://op-ws.gateio.live/v4/ws")
ws.send('{"time": %d, "channel": "options.ping"}'% int(time.time()))
print(ws.recv())
```

Response example

```json
{
  "time": 1630566602,
  "channel": "options.pong",
  "event": "",
  "error": null,
  "result": null
}
```

Check if connection to server is still alive.

This is an additional connection reachability check. The server uses the
[protocol layer ping/pong (opens new window)](https://tools.ietf.org/html/rfc6455)
message to check if client is still connected. It does NOT force this method to
be used. If you use some well-known WebSocket client library, you generally
don't need to care about this API.

However, from the client's view, this API can help the client to actively check
if the connection to server is still reachable. Additionally, if the server
receives the client's `options.ping` request, it will also reset the client's
timeout timer.

TIP

This channel does not require authentication

# [#](#contract-tickers-channel) Contract Tickers Channel

`options.contract_tickers`

The ticker is a high level overview of the state of the contract. It shows you
the last trade price, best ask price, best bid price, index price .etc

**push type**: `incremental`

**update frequency**: `1s`

## [#](#client-subscription) Client Subscription

Code samples

```python
import time
import json

# pip install websocket_client
from websocket import create_connection

ws = create_connection("wss://op-ws.gateio.live/v4/ws")
ws.send(json.dumps({
    "time": int(time.time()),
    "channel": "options.contract_tickers",
    "event": "subscribe",  # "unsubscribe" for unsubscription
    "payload": ["BTC_USDT-20211231-59800-C"]
}))
print(ws.recv())
```

Payload format:

You can subscribe/unsubscribe multiple times. Contract subscribed earlier will
not be overridden unless explicitly unsubscribed to.

TIP

This channel does not require authentication

## [#](#server-notification) Server Notification

Notification example

```json
{
  "time": 1630576352,
  "channel": "options.contract_tickers",
  "event": "update",
  "result": {
    "name": "BTC_USDT-20211231-59800-P",
    "last_price": "11349.5",
    "mark_price": "11170.19",
    "index_price": "",
    "position_size": 993,
    "bid1_price": "10611.7",
    "bid1_size": 100,
    "ask1_price": "11728.7",
    "ask1_size": 100,
    "vega": "34.8731",
    "theta": "-72.80588",
    "rho": "-28.53331",
    "gamma": "0.00003",
    "delta": "-0.78311",
    "mark_iv": "0.86695",
    "bid_iv": "0.65481",
    "ask_iv": "0.88145",
    "leverage": "3.5541112718136"
  }
}
```

Result format:

# [#](#underlying-tickers-channel) Underlying Tickers Channel

`options.ul_tickers`

The underlying ticker shows put trades, call trades and index_price of
underlyings.

**push type**: `incremental`

**update frequency**: `1s`

## [#](#client-subscription-2) Client Subscription

Code samples

```python
import time
import json

# pip install websocket_client
from websocket import create_connection

ws = create_connection("wss://op-ws.gateio.live/v4/ws")
ws.send(json.dumps({
    "time": int(time.time()),
    "channel": "options.ul_tickers",
    "event": "subscribe",  # "unsubscribe" for unsubscription
    "payload": ["BTC_USDT"]
}))
print(ws.recv())
```

Payload format:

You can subscribe/unsubscribe multiple times. Contract subscribed earlier will
not be overridden unless explicitly unsubscribed to.

TIP

This channel does not require authentication

## [#](#server-notification-2) Server Notification

Notification example

```json
{
  "time": 1630576352,
  "channel": "options.ul_tickers",
  "event": "update",
  "result": {
    "trade_put": 800,
    "trade_call": 41700,
    "index_price": "50695.43",
    "name": "BTC_USDT"
  }
}
```

Result format:

# [#](#public-contract-trades-channel) Public Contract Trades Channel

`options.trades`

This channel sends a trade message whenever a trade occurs at gate.io. It
includes details of the trade, such as price, amount, time.

**push type**: `continuous`

**update frequency**: `real-time`

## [#](#client-subscription-3) Client Subscription

Code samples

```python
import time
import json

# pip install websocket_client
from websocket import create_connection

ws = create_connection("wss://op-ws.gateio.live/v4/ws")
ws.send(json.dumps({
    "time": int(time.time()),
    "channel": "options.trades",
    "event": "subscribe",  # "unsubscribe" for unsubscription
    "payload": ["BTC_USDT-20211231-59800-C"]
}))
print(ws.recv())
```

Payload format:

You can subscribe/unsubscribe multiple times. Contracts subscribed earlier will
not be overridden unless explicitly unsubscribed to.

TIP

This channel does not require authentication

## [#](#server-notification-3) Server Notification

Notification example

```json
{
  "time": 1630576356,
  "channel": "options.trades",
  "event": "update",
  "result": [
    {
      "contract": "BTC_USDT-20211231-59800-C",
      "create_time": 1639144526,
      "id": 12279,
      "price": 997.8,
      "size": -100,
      "create_time_ms": 1639144526597,
      "underlying": "BTC_USDT"
    }
  ]
}
```

Note that public trade channel only notify the taker side in a trade. Private
user trades channel below will notify all user related trades.

Result format:

# [#](#public-underlying-trades-channel) Public Underlying Trades Channel

`options.ul_trades`

This channel sends all trades message under underlying whenever a trade occurs
at gate.io. It includes details of the trade, such as price, amount,
time.\*\*Not a underlying trade data, it's all contracts trades data which
contract under underlying \*\*

**push type**: `continuous`

**update frequency**: `real-time`

## [#](#client-subscription-4) Client Subscription

Code samples

```python
import time
import json

# pip install websocket_client
from websocket import create_connection

ws = create_connection("wss://op-ws.gateio.live/v4/ws")
ws.send(json.dumps({
    "time": int(time.time()),
    "channel": "options.ul_trades",
    "event": "subscribe",  # "unsubscribe" for unsubscription
    "payload": ["BTC_USDT"]
}))
print(ws.recv())
```

Payload format:

You can subscribe/unsubscribe multiple times. Contracts subscribed earlier will
not be overridden unless explicitly unsubscribed to.

TIP

This channel does not require authentication

## [#](#server-notification-4) Server Notification

Notification example

```json
{
  "time": 1630576356,
  "channel": "options.ul_trades",
  "event": "update",
  "result": [
    {
      "contract": "BTC_USDT-20211231-59800-C",
      "create_time": 1639144526,
      "id": 12279,
      "price": 997.8,
      "size": -100,
      "create_time_ms": 1639144526597,
      "underlying": "BTC_USDT",
      "is_call": true
    }
  ]
}
```

Result format:

# [#](#underlying-price-channel) Underlying Price Channel

`options.ul_price`

This channel sends underlying price update messages.

**push type**: `continuous`

**update frequency**: `real-time`

## [#](#client-subscription-5) Client Subscription

Code samples

```python
import time
import json

# pip install websocket_client
from websocket import create_connection

ws = create_connection("wss://op-ws.gateio.live/v4/ws")
ws.send(json.dumps({
    "time": int(time.time()),
    "channel": "options.ul_price",
    "event": "subscribe",  # "unsubscribe" for unsubscription
    "payload": ["BTC_USDT"]
}))
print(ws.recv())
```

Payload format:

You can subscribe/unsubscribe multiple times. Contracts subscribed earlier will
not be overridden unless explicitly unsubscribed to.

TIP

This channel does not require authentication

## [#](#server-notification-5) Server Notification

Notification example

```json
{
  "time": 1630576356,
  "channel": "options.ul_price",
  "event": "update",
  "result": {
    "underlying": "BTC_USDT",
    "price": 49653.24,
    "time": 1639143988,
    "time_ms": 1639143988931
  }
}
```

Result format:

# [#](#mark-price-channel) Mark Price Channel

`options.mark_prices`

This channel sends mark price update messages.

**push type**: `continuous`

**update frequency**: `real-time`

## [#](#client-subscription-6) Client Subscription

Code samples

```python
import time
import json

# pip install websocket_client
from websocket import create_connection

ws = create_connection("wss://op-ws.gateio.live/v4/ws")
ws.send(json.dumps({
    "time": int(time.time()),
    "channel": "options.mark_prices",
    "event": "subscribe",  # "unsubscribe" for unsubscription
    "payload": ["BTC_USDT-20211231-59800-P"]
}))
print(ws.recv())
```

Payload format:

You can subscribe/unsubscribe multiple times. Contracts subscribed earlier will
not be overridden unless explicitly unsubscribed to.

TIP

This channel does not require authentication

## [#](#server-notification-6) Server Notification

Notification example

```json
{
  "time": 1630576356,
  "channel": "options.mark_prices",
  "event": "update",
  "result": {
    "contract": "BTC_USDT-20211231-59800-P",
    "price": 11021.27,
    "time": 1639143401,
    "time_ms": 1639143401676
  }
}
```

Result format:

# [#](#settlements-channel) Settlements Channel

`options.settlements`

This channel sends contracts settlement update messages.

**push type**: `continuous`

**update frequency**: `real-time`

## [#](#client-subscription-7) Client Subscription

Code samples

```python
import time
import json

# pip install websocket_client
from websocket import create_connection

ws = create_connection("wss://op-ws.gateio.live/v4/ws")
ws.send(json.dumps({
    "time": int(time.time()),
    "channel": "options.settlements",
    "event": "subscribe",  # "unsubscribe" for unsubscription
    "payload": ["BTC_USDT-20211130-55000-P"]
}))
print(ws.recv())
```

Payload format:

You can subscribe/unsubscribe multiple times. Contracts subscribed earlier will
not be overridden unless explicitly unsubscribed to.

TIP

This channel does not require authentication

## [#](#server-notification-7) Server Notification

Notification example

```json
{
  "time": 1630576356,
  "channel": "options.settlements",
  "event": "update",
  "result": {
    "contract": "BTC_USDT-20211130-55000-P",
    "orderbook_id": 2,
    "position_size": 1,
    "profit": 0.5,
    "settle_price": 70000,
    "strike_price": 65000,
    "tag": "WEEK",
    "trade_id": 1,
    "trade_size": 1,
    "underlying": "BTC_USDT",
    "time": 1639051907,
    "time_ms": 1639051907000
  }
}
```

Result format:

# [#](#contracts-channel) Contracts Channel

`options.contracts`

This channel sends contracts update messages.

**push type**: `continuous`

**update frequency**: `real-time`

## [#](#client-subscription-8) Client Subscription

Code samples

```python
import time
import json

# pip install websocket_client
from websocket import create_connection

ws = create_connection("wss://op-ws.gateio.live/v4/ws")
ws.send(json.dumps({
    "time": int(time.time()),
    "channel": "options.contracts",
    "event": "subscribe",  # "unsubscribe" for unsubscription
    "payload": ["BTC_USDT-20211130-50000-P"]
}))
print(ws.recv())
```

Payload format:

You can subscribe/unsubscribe multiple times. Contracts subscribed earlier will
not be overridden unless explicitly unsubscribed to.

TIP

This channel does not require authentication

## [#](#server-notification-8) Server Notification

Notification example

```json
{
  "time": 1630576356,
  "channel": "options.contracts",
  "event": "update",
  "result": {
    "contract": "BTC_USDT-20211130-50000-P",
    "create_time": 1637917026,
    "expiration_time": 1638230400,
    "init_margin_high": 0.15,
    "init_margin_low": 0.1,
    "is_call": false,
    "maint_margin_base": 0.075,
    "maker_fee_rate": 0.0004,
    "mark_price_round": 0.1,
    "min_balance_short": 0.5,
    "min_order_margin": 0.1,
    "multiplier": 0.0001,
    "order_price_deviate": 0,
    "order_price_round": 0.1,
    "order_size_max": 1,
    "order_size_min": 10,
    "orders_limit": 100000,
    "ref_discount_rate": 0.1,
    "ref_rebate_rate": 0,
    "strike_price": 50000,
    "tag": "WEEK",
    "taker_fee_rate": 0.0004,
    "underlying": "BTC_USDT",
    "time": 1639051907,
    "time_ms": 1639051907000
  }
}
```

Result format:

# [#](#contract-candlesticks-channel) Contract Candlesticks Channel

`options.contract_candlesticks`

Provides a way to access charting candlestick info.

**push type**: `incremental`

**update frequency**: `2s`

## [#](#client-subscription-9) Client Subscription

**_If prefix `contract` with
`mark_`, the contract's mark price candlesticks will be subscribed; if prefix with `index*`,
index price candlesticks will be subscribed.***

```python
import time
import json

# pip install websocket_client
from websocket import create_connection

ws = create_connection("wss://op-ws.gateio.live/v4/ws")
ws.send(json.dumps({
    "time": int(time.time()),
    "channel": "options.contract_candlesticks",
    "event": "subscribe",  # "unsubscribe" for unsubscription
    "payload": ["10s", "BTC_USDT-20211231-59800-C"]
}))
print(ws.recv())
```

Payload format:

#### [#](#enumerated-values) Enumerated Values

To subscribe to multiple contracts or with different intervals, just send
multiple subscribe request with different parameters.

TIP

This channel does not require authentication

## [#](#server-notification-9) Server Notification

Notification example

```json
{
  "time": 1630650451,
  "channel": "options.contract_candlesticks",
  "event": "update",
  "result": [
    {
      "t": 1639039260,
      "v": 100,
      "c": "1041.4",
      "h": "1041.4",
      "l": "1041.4",
      "o": "1041.4",
      "a": "0",
      "n": "10s_BTC_USDT-20211231-59800-C"
    }
  ]
}
```

Result format:

# [#](#underlying-candlesticks-channel) Underlying Candlesticks Channel

`options.ul_andlesticks`

Provides a way to access charting underlying candlestick info.

**push type**: `continuous`

**update frequency**: `2s`

## [#](#client-subscription-10) Client Subscription

**_If prefix `contract` with
`mark_`, the contract's mark price candlesticks will be subscribed; if prefix with `index*`,
index price candlesticks will be subscribed.***

```python
import time
import json

# pip install websocket_client
from websocket import create_connection

ws = create_connection("wss://op-ws.gateio.live/v4/ws")
ws.send(json.dumps({
    "time": int(time.time()),
    "channel": "options.ul_candlesticks",
    "event": "subscribe",  # "unsubscribe" for unsubscription
    "payload": ["10s", "BTC_USDT"]
}))
print(ws.recv())
```

Payload format:

#### [#](#enumerated-values-2) Enumerated Values

To subscribe to multiple contracts or with different intervals, just send
multiple subscribe request with different parameters.

TIP

This channel does not require authentication

## [#](#server-notification-10) Server Notification

Notification example

```json
{
  "time": 1630650451,
  "channel": "options.ul_candlesticks",
  "event": "update",
  "result": [
    {
      "t": 1639039260,
      "v": 100,
      "c": "1041.4",
      "h": "1041.4",
      "l": "1041.4",
      "o": "1041.4",
      "a": "0",
      "n": "10s_BTC_USDT"
    }
  ]
}
```

Result format:

# [#](#order-book-channel) Order Book Channel

The order_book channel allow you to keep track of the state of the gate.io order
book depth. It is provided on a price aggregated basis, with customizable
precision.

There are three different order book channels for subscription:

- `options.order_book`

  Legacy channel, which uses `all` to push full limited-level order book, and
  `update` to send every order book change event.

- `options.book_ticker`

  Push best bid and ask in real-time.

- `options.order_book_update`

  Push order book change with user-specified update frequency.

Receiving order book update through \`options.order_book\` is not recommended to

use. `options.order_book_update` can provide more timely update with less
traffic

How to maintain local order book:

1.  Subscribe `options.order_book_update` with specified level and update
    frequency, e.g. `["BTC_USDT-20211130-50000-C", "1000ms", "10"]` pushes the
    first 10 levels' update in BTC_USDT order book every 1s
2.  Cache WebSocket notifications. Every notification use `U` and `u` to tell
    the first and last update ID since last notification.
3.  Retrieve base order book using REST API, and make sure the order book ID is
    recorded(referred as `baseID` below) e.g.
    `https://api.gateio.ws/api/v4/options/order_book?contract=BTC_USDT-20211130-50000-C&limit=10&with_id=true`
    retrieves the 10-level base order book of BTC_USDT
4.  Iterate the cached WebSocket notifications, and find the first one which
    contains the baseID, i.e. `U <= baseId+1` and `u >= baseId+1`, then start
    consuming from it. Note that sizes in notifications are all absolute values.
    Use them to replace original sizes in corresponding price. If size equals to
    0, delete the price from the order book.
5.  Dump all notifications which satisfy `u < baseID+1`. If
    `baseID+1 < first notification U`, it means current base order book falls
    behind notifications. Start from step 3 to retrieve newer base order book.
6.  If any subsequent notification which satisfy `U > baseID+1` is found, it
    means some updates are lost. Reconstruct local order book from step 3.

You can find example application implementing the methods above in the
[SDK GitHub repository (opens new window)](https://github.com/gateio/gatews)

## [#](#best-bid-or-ask-price) Best bid or ask price

`options.book_ticker`

**push type**: `continuous`

**update frequency**: `real-time`

### [#](#client-subscription-11) Client Subscription

Code samples

```python
import time
import json

# pip install websocket_client
from websocket import create_connection

ws = create_connection("wss://op-ws.gateio.live/v4/ws")
ws.send(json.dumps({
    "time": int(time.time()),
    "channel": "options.book_ticker",
    "event": "subscribe",  # "unsubscribe" for unsubscription
    "payload": ["BTC_USDT-20211130-50000-C"]
}))
print(ws.recv())
```

Payload format:

You can subscribe/unsubscribe multiple times. Contracts subscribed earlier will
not be overridden unless explicitly unsubscribed to.

TIP

This channel does not require authentication

## [#](#server-notification-11) Server Notification

If `a` is empty string, it means empty asks; if `b` is empty string, it means
empty bids.

Notification example

```json
{
  "time": 1630650452,
  "channel": "options.book_ticker",
  "event": "update",
  "result": {
    "t": 1615366379123,
    "u": 2517661076,
    "s": "BTC_USDT-20211130-50000-C",
    "b": "54696.6",
    "B": 37000,
    "a": "54696.7",
    "A": 47061
  }
}
```

Result format:

## [#](#changed-order-book-levels) Changed order book levels

`options.order_book_update`

**push type**: `continuous`

**update frequency**: `100ms`

### [#](#client-subscription-12) Client Subscription

Code samples

```python
import time
import json

# pip install websocket_client
from websocket import create_connection

ws = create_connection("wss://op-ws.gateio.live/v4/ws")
ws.send(json.dumps({
    "time": int(time.time()),
    "channel": "options.order_book_update",
    "event": "subscribe",  # "unsubscribe" for unsubscription
    "payload": ["BTC_USDT-20211130-50000-C", "1000ms", "20"]
}))
print(ws.recv())
```

Payload format:

#### [#](#enumerated-values-3) Enumerated Values

You can subscribe/unsubscribe multiple times. Contracts subscribed earlier will
not be overridden unless explicitly unsubscribed to.

TIP

This channel does not require authentication

### [#](#server-notification-12) Server Notification

Notification example

```json
{
  "time": 1630650445,
  "channel": "options.order_book_update",
  "event": "update",
  "result": {
    "t": 1615366381417,
    "s": "BTC_USDT-20211130-50000-C",
    "U": 2517661101,
    "u": 2517661113,
    "b": [
      {
        "p": "54672.1",
        "s": 0
      },
      {
        "p": "54664.5",
        "s": 58794
      }
    ],
    "a": [
      {
        "p": "54743.6",
        "s": 0
      },
      {
        "p": "54742",
        "s": 95
      }
    ]
  }
}
```

Result format:

## [#](#limited-level-full-order-book-snapshot) Limited-Level Full Order Book Snapshot

`options.order_book`

**push type**: `continuous`

**update frequency**: `250ms`

### [#](#client-subscription-13) Client Subscription

Code samples

```python
import time
import json

# pip install websocket_client
from websocket import create_connection

ws = create_connection("wss://op-ws.gateio.live/v4/ws")
ws.send(json.dumps({
    "time": int(time.time()),
    "channel": "options.order_book",
    "event": "subscribe",  # "unsubscribe" for unsubscription
    "payload": ["BTC_USDT-20211130-50000-C", "20", "0"]
}))
print(ws.recv())
```

Payload format:

#### [#](#enumerated-values-4) Enumerated Values

You can subscribe/unsubscribe multiple times. Contracts subscribed earlier will
not be overridden unless explicitly unsubscribed to.

TIP

This channel does not require authentication

### [#](#server-notification-13) Server Notification

Notification example

```json
{
  "time": 1630650445,
  "channel": "options.order_book",
  "event": "all",
  "result": {
    "t": 1541500161123,
    "contract": "BTC_USDT-20211130-50000-C",
    "id": 93973511,
    "asks": [
      {
        "p": "97.1",
        "s": 2245
      },
      {
        "p": "97.1",
        "s": 2245
      }
    ],
    "bids": [
      {
        "p": "97.1",
        "s": 2245
      },
      {
        "p": "97.1",
        "s": 2245
      }
    ]
  }
}
```

Or

```json
{
  "channel": "options.order_book",
  "event": "update",
  "time": 1630650445,
  "result": [
    {
      "p": "49525.6",
      "s": 7726,
      "c": "BTC_USDT-20211130-50000-C",
      "id": 93973511
    }
  ]
}
```

Result format:

# [#](#orders-channel) Orders Channel

`options.orders`

Provides a way to receive user closed orders.

**push type**: `continuous`

**update frequency**: `real-time`

## [#](#client-subscription-14) Client Subscription

Code samples

```python
import time
import json

# pip install websocket_client
from websocket import create_connection

ws = create_connection("wss://op-ws.gateio.live/v4/ws")
request = {
    "time": int(time.time()),
    "channel": "options.orders",
    "event": "subscribe",  # "unsubscribe" for unsubscription
    "payload": ["1001","BTC_USDT-20211130-65000-C"]
}
# refer to Authentication section for gen_sign implementation
request['auth'] = gen_sign(request['channel'], request['event'], request['time'])
ws.send(json.dumps(request))
print(ws.recv())
```

Payload format:

You can subscribe/unsubscribe multiple times. Contract subscribed earlier will
not be overridden unless explicitly unsubscribed to.

If you want to subscribe to all orders updates in all contracts, you can include
`!all` in contract list.

WARNING

This channel requires authentication.

## [#](#server-notification-14) Server Notification

Notification example

```json
{
  "time": 1630654851,
  "channel": "options.orders",
  "event": "update",
  "result": [
    {
      "contract": "BTC_USDT-20211130-65000-C",
      "create_time": 1637897000,
      "fill_price": 0,
      "finish_as": "cancelled",
      "iceberg": 0,
      "id": 106,
      "is_close": false,
      "is_liq": false,
      "is_reduce_only": false,
      "left": -10,
      "mkfr": 0.0004,
      "price": 15000,
      "refr": 0,
      "refu": 0,
      "size": -10,
      "status": "finished",
      "text": "web",
      "tif": "gtc",
      "tkfr": 0.0004,
      "underlying": "BTC_USDT",
      "user": "9xxx",
      "time": 1639051907,
      "time_ms": 1639051907000
    }
  ]
}
```

Updated order list. Note it is possible that multiple contracts' orders will be
updated in one notification.

Result format:

# [#](#user-trades-channel) User Trades Channel

`options.usertrades`

Provides a way to receive user trades.

**push type**: `continuous`

**update frequency**: `real-time`

## [#](#client-subscription-15) Client Subscription

Code samples

```python
import time
import json

# pip install websocket_client
from websocket import create_connection

ws = create_connection("wss://op-ws.gateio.live/v4/ws")
request = {
    "time": int(time.time()),
    "channel": "options.usertrades",
    "event": "subscribe",  # "unsubscribe" for unsubscription
    "payload": ["1001", "BTC_USDT-20211216-44800-C"]
}
# refer to Authentication section for gen_sign implementation
request['auth'] = gen_sign(request['channel'], request['event'], request['time'])
ws.send(json.dumps(request))
print(ws.recv())
```

Payload format:

You can subscribe/unsubscribe multiple times. Contract subscribed earlier will
not be overridden unless explicitly unsubscribed to.

If you want to subscribe to all user trades updates in all contracts, you can
include `!all` in contract list.

WARNING

This channel requires authentication.

## [#](#server-notification-15) Server Notification

Notification example

```json
{
  "time": 1639144214,
  "channel": "options.usertrades",
  "event": "update",
  "result": [
    {
      "id": "1",
      "underlying": "BTC_USDT",
      "order": "557940",
      "contract": "BTC_USDT-20211216-44800-C",
      "create_time": 1639144214,
      "create_time_ms": 1639144214583,
      "price": "4999",
      "role": "taker",
      "size": -1,
      "fee": "0.001",
      "text": "t-xer01sax4yu"
    }
  ]
}
```

Updated user trades list. Note it is possible that multiple contracts' trades
will be updated in one notification.

Result format:

#### [#](#enumerated-values-5) Enumerated Values

# [#](#liquidates-channel) Liquidates Channel

`options.liquidates`

Provides a way to receive user liquidates info. ()

**push type**: `continuous`

**update frequency**: `real-time`

## [#](#client-subscription-16) Client Subscription

Code samples

```python
import time
import json

# pip install websocket_client
from websocket import create_connection

ws = create_connection("wss://op-ws.gateio.live/v4/ws")
request = {
    "time": int(time.time()),
    "channel": "options.liquidates",
    "event": "subscribe",  # "unsubscribe" for unsubscription
    "payload": ["1001", "BTC_USDT-20211130-50000-C"]
}
# refer to Authentication section for gen_sign implementation
request['auth'] = gen_sign(request['channel'], request['event'], request['time'])
ws.send(json.dumps(request))
print(ws.recv())
```

Payload format:

You can subscribe/unsubscribe multiple times. Contract subscribed earlier will
not be overridden unless explicitly unsubscribed to.

WARNING

This channel requires authentication.

## [#](#server-notification-16) Server Notification

Notification example

```json
{
  "channel": "options.liquidates",
  "event": "update",
  "time": 1630654851,
  "result": [
    {
      "user": "1xxxx",
      "init_margin": 1190,
      "maint_margin": 1042.5,
      "order_margin": 0,
      "time": 1639051907,
      "time_ms": 1639051907000
    }
  ]
}
```

Result format:

# [#](#user-settlements-channel) User Settlements Channel

`options.user_settlements`

Provides a way to receive user settlements info.

**push type**: `continuous`

**update frequency**: `real-time`

## [#](#client-subscription-17) Client Subscription

Code samples

```python
import time
import json

# pip install websocket_client
from websocket import create_connection

ws = create_connection("wss://op-ws.gateio.live/v4/ws")
request = {
    "time": int(time.time()),
    "channel": "options.user_settlements",
    "event": "subscribe",  # "unsubscribe" for unsubscription
    "payload": ["1001", "BTC_USDT-20211130-65000-C"]
}
# refer to Authentication section for gen_sign implementation
request['auth'] = gen_sign(request['channel'], request['event'], request['time'])
ws.send(json.dumps(request))
print(ws.recv())
```

Payload format:

You can subscribe/unsubscribe multiple times. Contract subscribed earlier will
not be overridden unless explicitly unsubscribed to.

WARNING

This channel requires authentication.

## [#](#server-notification-17) Server Notification

Notification example

```json
{
  "channel": "options.user_settlements",
  "event": "update",
  "time": 1639051907,
  "result": [
    {
      "contract": "BTC_USDT-20211130-65000-C",
      "realised_pnl": -13.028,
      "settle_price": 70000,
      "settle_profit": 5,
      "size": 10,
      "strike_price": 65000,
      "underlying": "BTC_USDT",
      "user": "9xxx",
      "time": 1639051907,
      "time_ms": 1639051907000
    }
  ]
}
```

# [#](#position-closes-channel) Position Closes Channel

`options.position_closes`

Provides a way to receive user position closes info.

**push type**: `continuous`

**update frequency**: `real-time`

## [#](#client-subscription-18) Client Subscription

Code samples

```python
import time
import json

# pip install websocket_client
from websocket import create_connection

ws = create_connection("wss://op-ws.gateio.live/v4/ws")
request = {
    "time": int(time.time()),
    "channel": "options.position_closes",
    "event": "subscribe",  # "unsubscribe" for unsubscription
    "payload": ["1001", "BTC_USDT-20211130-50000-C"]
}
# refer to Authentication section for gen_sign implementation
request['auth'] = gen_sign(request['channel'], request['event'], request['time'])
ws.send(json.dumps(request))
print(ws.recv())
```

Payload format:

You can subscribe/unsubscribe multiple times. Contract subscribed earlier will
not be overridden unless explicitly unsubscribed to.

WARNING

This channel requires authentication.

## [#](#server-notification-18) Server Notification

Notification example

```json
{
  "channel": "options.position_closes",
  "event": "update",
  "time": 1630654851,
  "result": [
    {
      "contract": "BTC_USDT-20211130-50000-C",
      "pnl": -0.0056,
      "settle_size": 0,
      "side": "long",
      "text": "web",
      "underlying": "BTC_USDT",
      "user": "11xxxxx",
      "time": 1639051907,
      "time_ms": 1639051907000
    }
  ]
}
```

Result format:

#### [#](#enumerated-values-6) Enumerated Values

# [#](#balances-channel) Balances Channel

`options.balances`

Provides a way to receive user balances info.

**push type**: `continuous`

**update frequency**: `real-time`

## [#](#client-subscription-19) Client Subscription

Code samples

```python
import json
import time
from websocket import create_connection

ws = create_connection("wss://op-ws.gateio.live/v4/ws")
request = {
    "time": int(time.time()),
    "channel": "options.balances",
    "event": "subscribe",  # "unsubscribe" for unsubscription
    "payload": ["1001"]
}
# refer to Authentication section for gen_sign implementation
request['auth'] = gen_sign(request['channel'], request['event'], request['time'])
ws.send(json.dumps(request))
print(ws.recv())
```

Payload format:

WARNING

This channel requires authentication.

## [#](#server-notification-19) Server Notification

Notification example

```json
{
  "channel": "options.balances",
  "event": "update",
  "time": 1630654851,
  "result": [
    {
      "balance": 60.79009,
      "change": -0.5,
      "text": "BTC_USDT-20211130-55000-P",
      "type": "set",
      "user": "11xxxx",
      "time": 1639051907,
      "time_ms": 1639051907000
    }
  ]
}
```

Result format:

# [#](#positions-channel) Positions Channel

`options.positions`

Provides a way to receive user positions info.

**push type**: `continuous`

**update frequency**: `real-time`

## [#](#client-subscription-20) Client Subscription

Code samples

```python
import json
import time
from websocket import create_connection

ws = create_connection("wss://op-ws.gateio.live/v4/ws")
request = {
    "time": int(time.time()),
    "channel": "options.positions",
    "event": "subscribe",  # "unsubscribe" for unsubscription
    "payload": ["1001", "BTC_USDT-20211130-65000-C"]
}
# refer to Authentication section for gen_sign implementation
request['auth'] = gen_sign(request['channel'], request['event'], request['time'])
ws.send(json.dumps(request))
print(ws.recv())
```

Payload format:

You can subscribe/unsubscribe multiple times. Contract subscribed earlier will
not be overridden unless explicitly unsubscribed to.

Authentication required.

## [#](#server-notification-20) Server Notification

Notification example

```json
{
  "time": 1630654851,
  "channel": "options.positions",
  "event": "update",
  "error": null,
  "result": [
    {
      "entry_price": 0,
      "realised_pnl": -13.028,
      "size": 0,
      "contract": "BTC_USDT-20211130-65000-C",
      "user": "9010",
      "time": 1639051907,
      "time_ms": 1639051907000
    }
  ]
}
```

Result format:

Last Updated: 11/28/2024, 2:26:55 AM
