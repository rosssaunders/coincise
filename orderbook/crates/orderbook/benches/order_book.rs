use criterion::{black_box, criterion_group, criterion_main, BatchSize, Criterion};
use orderbook::{MatchingEngine, OrderBook, OrderType, Side};

fn bench_add_orders(c: &mut Criterion) {
    c.bench_function("add_limit_orders", |b| {
        b.iter(|| {
            let mut book = OrderBook::new();
            for i in 0..1024u64 {
                let _ = book.add_order(i, Side::Bid, 1_000 + i, 10).unwrap();
            }
            black_box(book);
        });
    });
}

fn bench_update_orders(c: &mut Criterion) {
    c.bench_function("update_orders", |b| {
        b.iter_batched(
            || {
                let mut book = OrderBook::new();
                for i in 0..1024u64 {
                    let _ = book.add_order(i, Side::Ask, 1_000 + (i % 64), 10).unwrap();
                }
                book
            },
            |mut book| {
                for i in 0..1024u64 {
                    let new_qty = 5 + (i % 5);
                    book.update_order_quantity(i, new_qty).unwrap();
                }
                black_box(book);
            },
            BatchSize::SmallInput,
        );
    });
}

fn bench_cancel_orders(c: &mut Criterion) {
    c.bench_function("cancel_orders", |b| {
        b.iter_batched(
            || {
                let mut book = OrderBook::new();
                for i in 0..1024u64 {
                    let _ = book.add_order(i, Side::Bid, 1_000 + (i % 64), 10).unwrap();
                }
                book
            },
            |mut book| {
                for i in 0..1024u64 {
                    let _ = book.cancel(i).unwrap();
                }
                black_box(book);
            },
            BatchSize::SmallInput,
        );
    });
}

fn bench_matching_engine(c: &mut Criterion) {
    c.bench_function("matching_limit_execution", |b| {
        b.iter_batched(
            || {
                let mut engine = MatchingEngine::new();
                for i in 0..64u64 {
                    engine
                        .order_book_mut()
                        .add_order(i, Side::Ask, 1_000 + i, 5)
                        .unwrap();
                }
                engine
            },
            |mut engine| {
                let _ = engine
                    .submit(10_000, Side::Bid, OrderType::Limit, Some(1_050), 320)
                    .unwrap();
                black_box(engine);
            },
            BatchSize::SmallInput,
        );
    });

    c.bench_function("matching_market_execution", |b| {
        b.iter_batched(
            || {
                let mut engine = MatchingEngine::new();
                for i in 0..64u64 {
                    engine
                        .order_book_mut()
                        .add_order(i, Side::Bid, 1_000 - i, 5)
                        .unwrap();
                }
                engine
            },
            |mut engine| {
                let _ = engine
                    .submit(11_000, Side::Ask, OrderType::Market, None, 128)
                    .unwrap();
                black_box(engine);
            },
            BatchSize::SmallInput,
        );
    });
}

criterion_group!(
    benches,
    bench_add_orders,
    bench_update_orders,
    bench_cancel_orders,
    bench_matching_engine
);
criterion_main!(benches);
