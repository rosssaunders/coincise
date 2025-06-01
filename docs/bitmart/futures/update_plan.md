# Update Plan

*   【Important Notice】Temporary Suspension of One-Way Mode Order Placement via OpenAPI (Futures Trading)
    *   Affected Feature: Opening positions via OpenAPI in One-Way Mode (Note: This does not affect order cancellations or closing positions in One-Way Mode. All functions in Hedge Mode (Two-Way) remain fully available.)
    *   Affected Time: (UTC+0) 2025-04-15 12:00 ~ 2025-05-09 00:00
    *   Affected Performance: The order placement endpoint returns an error code of `40060`, and the prompt message is `The API is under maintenance`.
    *   Recommendation: Please switch to Hedge Mode (Two-Way) to continue placing orders via OpenAPI.
*   【Important Notice】The V1 OpenAPI service for futures trading will be fully discontinued on **2024-11-30**. Please use the V2 OpenAPI for future trading.
    *   The domain name `https://api-cloud.bitmart.com` will not provide Futures 1.0 HTTP services. Please use the domain name `https://api-cloud-v2.bitmart.com` to access Futures 2.0 HTTP services
    *   The domain name `wss://openapi-ws.bitmart.com` will not provide Futures 1.0 Websocket services. Please use the domain name `wss://openapi-ws-v2.bitmart.com` to access Futures 2.0 Websocket services
