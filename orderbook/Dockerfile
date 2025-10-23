FROM rust:1.73 AS builder
WORKDIR /workspace
COPY Cargo.toml Cargo.lock ./
COPY crates ./crates
RUN cargo build --release --workspace --bins

FROM debian:bookworm-slim AS runtime
RUN apt-get update && apt-get install -y --no-install-recommends ca-certificates \
    && rm -rf /var/lib/apt/lists/*
COPY --from=builder /workspace/target/release/orderbook-server /usr/local/bin/
COPY --from=builder /workspace/target/release/market-maker-agent /usr/local/bin/
COPY --from=builder /workspace/target/release/twap-agent /usr/local/bin/
COPY --from=builder /workspace/target/release/pension-passive-buyer /usr/local/bin/
ENV RUST_LOG=info
CMD ["orderbook-server"]
