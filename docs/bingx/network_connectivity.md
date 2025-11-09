# Network Connectivity

## Base URLs

- Production API: `https://open-api.bingx.com`
- WebSocket: `wss://open-api-ws.bingx.com`

## API Endpoints

BingX provides separate API endpoints for different products:

### Spot Trading

- REST API: `https://open-api.bingx.com/openApi/spot/v1`

### USDT-M Perpetual Futures

- REST API: `https://open-api.bingx.com/openApi/swap/v2`

### Coin-M Futures

- REST API: `https://open-api.bingx.com/openApi/swap/v1`

### Standard Futures

- REST API: `https://open-api.bingx.com/openApi/contract/v1`

## WebSocket Connections

WebSocket endpoints are available for real-time market data and account updates:

- Market Data: `wss://open-api-ws.bingx.com/market`
- Account Updates: `wss://open-api-ws.bingx.com/account`

## Connection Guidelines

- Use persistent connections for WebSocket
- Implement reconnection logic for dropped connections
- Send ping/pong messages to maintain connection
