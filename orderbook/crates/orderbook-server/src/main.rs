use metrics_exporter_prometheus::PrometheusBuilder;
use orderbook::RiskEngine;
use orderbook_server::{shared_matching_engine, GrpcOrderBookService, TcpOrderBookServer};
use std::env;
use std::net::SocketAddr;
use std::process;
use std::thread;
use tracing::{error, info};
use tracing_subscriber::EnvFilter;

fn main() {
    tracing_subscriber::fmt()
        .with_env_filter(
            EnvFilter::try_from_default_env().unwrap_or_else(|_| EnvFilter::new("info")),
        )
        .with_target(false)
        .init();

    let mut args = env::args().skip(1);
    let tcp_address = args.next().unwrap_or_else(|| "0.0.0.0:9000".to_string());
    let grpc_address = args.next().unwrap_or_else(|| "0.0.0.0:50051".to_string());

    let grpc_socket: SocketAddr = grpc_address.parse().unwrap_or_else(|error| {
        error!("invalid gRPC socket address {}: {}", grpc_address, error);
        process::exit(1);
    });

    let _prometheus = PrometheusBuilder::new()
        .with_http_listener("0.0.0.0:9100".parse::<SocketAddr>().unwrap())
        .install_recorder()
        .unwrap_or_else(|error| {
            error!("failed to install Prometheus metrics recorder: {}", error);
            process::exit(1);
        });
    info!("metrics exporter listening on 0.0.0.0:9100");

    let (shared_engine, event_bus) = shared_matching_engine(RiskEngine::new());
    let grpc_engine = shared_engine.clone();
    let grpc_events = event_bus.clone();

    let _grpc_handle = thread::spawn(move || {
        let runtime = tokio::runtime::Builder::new_multi_thread()
            .enable_all()
            .build()
            .unwrap_or_else(|error| {
                error!("failed to build tokio runtime: {}", error);
                process::exit(1);
            });

        if let Err(error) = runtime.block_on(GrpcOrderBookService::serve(
            grpc_engine,
            grpc_events,
            grpc_socket,
        )) {
            error!("gRPC server terminated with error: {}", error);
            process::exit(1);
        }
    });

    let mut server = TcpOrderBookServer::with_shared_engine(&tcp_address, shared_engine, event_bus)
        .unwrap_or_else(|error| {
            error!("failed to bind TCP listener on {}: {}", tcp_address, error);
            process::exit(1);
        });

    info!(
        "tcp server listening on {} and gRPC on {}",
        tcp_address, grpc_address
    );

    if let Err(error) = server.run() {
        error!("order book server terminated with error: {}", error);
        process::exit(1);
    }
}
