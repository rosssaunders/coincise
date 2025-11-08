# WebSocket API

**Source:** https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/websocket

Copy

1.  [For developers](/hyperliquid-docs/for-developers)
2.  [API](/hyperliquid-docs/for-developers/api)

# Websocket

WebSocket endpoints are available for real-time data streaming and as an alternative to HTTP request sending on the Hyperliquid exchange. The WebSocket URLs by network are:

-   Mainnet: `wss://api.hyperliquid.xyz/ws`
    
-   Testnet: `wss://api.hyperliquid-testnet.xyz/ws`.
    

### 

[](#connecting)

Connecting

To connect to the WebSocket API, you must establish a WebSocket connection to the respective URL based on your desired network. Once connected, you can start sending subscription messages to receive real-time data updates.

Example from command line:

Copy

```
$ wscat -c  wss://api.hyperliquid.xyz/ws
Connected (press CTRL+C to quit)
>  { "method": "subscribe", "subscription": { "type": "trades", "coin": "SOL" } }
< {"channel":"subscriptionResponse","data":{"method":"subscribe","subscription":{"type":"trades","coin":"SOL"}}}
```

Note: this doc uses Typescript for defining many of the message types. If you prefer to use Python, you can check out the equivalent types in the python SDK [here](https://github.com/hyperliquid-dex/hyperliquid-python-sdk/blob/master/hyperliquid/utils/types.py) and example connection code [here](https://github.com/hyperliquid-dex/hyperliquid-python-sdk/blob/master/hyperliquid/websocket_manager.py).

[PreviousExchange endpoint](/hyperliquid-docs/for-developers/api/exchange-endpoint)[NextSubscriptions](/hyperliquid-docs/for-developers/api/websocket/subscriptions)

Last updated 8 months ago
