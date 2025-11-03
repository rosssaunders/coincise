# Update Plan

*   【2025-08-23 Important Notice】 Temporary Suspension of API Key Management Due to Domain Upgrade.Due to a service upgrade on the domain `api-cloud-v2.bitmart.com`, the API key creation and modification functions on the website will be temporarily unavailable on August 23, 2025, from 20:30 to 21:00 (UTC+8). The interruption is expected to last about 1–3 minutes. 👉 Note: This does not affect spot or futures trading operations. Thank you for your understanding.
    
*   【2025-04-16 Important Notice】The OpenAPI service of futures trading has launched the one-way position order function
    
*   【2024-11-11 Important Notice】The V1 OpenAPI service for futures trading will be fully discontinued on **2024-11-30**. Please use the V2 OpenAPI for future trading.
    
    *   The domain name `https://api-cloud.bitmart.com` will not provide Futures 1.0 HTTP services. Please use the domain name `https://api-cloud-v2.bitmart.com` to access Futures 2.0 HTTP services
    *   The domain name `wss://openapi-ws.bitmart.com` will not provide Futures 1.0 Websocket services. Please use the domain name `wss://openapi-ws-v2.bitmart.com` to access Futures 2.0 Websocket services
*   【2025-10-18 Important Notice】  
    BitMart Futures Server Upgrade Notice  
    Time: UTC+0, October 18, 2025, 02:00–03:00  
    Duration: Approximately 1 hour  
    During the upgrade, the following functions will be temporarily paused for 5–6 minutes:  
    
    *   Transfer of assets into Futures accounts
    *   Futures trading (including market data, order placement, order cancellation, position closing, trade queries, and grid trading functions)
    *   Copy trading for futures
    *   Futures account opening

Note:  
1.Spot trading functions will not be affected. If this may impact your trading, please consider transferring assets or closing positions in advance.  
2.During the upgrade, if you attempt to call any of the suspended functions, the system may return error code 40020 or 25601.
