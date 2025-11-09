## Rate Limits

### REST API

For authenticated calls, rate limits are per API method, per API key:

| Method | Limit |
| ------ | ----- |

| `private/create-order`  
`private/cancel-order`  
`private/cancel-all-orders` | 15 requests per 100ms each | |
`private/get-order-detail` | 30 requests per 100ms | | `private/get-trades` | 1
requests per second | | `private/get-order-history` | 1 requests per second | |
All others | 3 requests per 100ms each |

For public market data calls, rate limits are per API method, per IP address:

| Method | Limit |
| ------ | ----- |

| `public/get-book`  
`public/get-ticker`  
`public/get-trades`  
`public/get-valuations`  
`public/get-candlestick`  
`public/get-insurance` | 100 requests per second each |

### Staking

| Method              | Limit                  |
| ------------------- | ---------------------- |
| `public/staking/*`  | 50 requests per second |
| `private/staking/*` | 50 requests per second |

### Websocket

| Websocket   | Limit                   |
| ----------- | ----------------------- |
| User API    | 150 requests per second |
| Market Data | 100 requests per second |

`private/get-trades` and `private/get-order-history` is rate limited at 1
request per second on REST

**Important Note**

We recommend adding a 1-second sleep after establishing the websocket
connection, and before requests are sent.

This will avoid occurrences of rate-limit (\`TOO_MANY_REQUESTS\`) errors, as the
websocket rate limits are pro-rated based on the calendar-second that the
websocket connection was opened.

## Open Order Limit

| Condition                                                                           | Limit |
| ----------------------------------------------------------------------------------- | ----- |
| Maximum allowed open orders per trading pair per account/subaccount                 | 200   |
| Overall maximum allowed open orders per account/subaccount across all trading pairs | 1000  |
