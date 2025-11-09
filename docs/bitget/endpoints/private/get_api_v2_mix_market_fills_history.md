# Get History Transactions

Frequency limit: 10 times/1s (IP)

### Description[​](#description "Direct link to Description")

-   Get transaction records of the last 90 days
-   The time interval between startTime and endTime should not exceed 7 days.

### HTTP Request[​](#http-request "Direct link to HTTP Request")

-   GET /api/v2/mix/market/fills-history

Request Example

```
curl "https://api.bitget.com/api/v2/mix/market/fills-history?symbol=BTCUSDT&productType=usdt-futures"
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter | Type | Required | Description |
| :-- | :-- | :-- | :-- |
| symbol | String | Yes | Trading pair |
| productType | String | Yes | Product type  
`USDT-FUTURES` USDT-M Futures  
`COIN-FUTURES` Coin-M Futures  
`USDC-FUTURES` USDC-M Futures |
| limit | String | No | Number of queries: Default: 500, maximum: 1000 |
| idLessThan | String | No | Separate page content before this ID is requested (older data), the value input should be the endId of the corresponding interface. |
| startTime | String | No | Start timestamp  
Unix timestamp in milliseconds format, e.g. 1597026383085  
(The maximum time span supported is a week. The default end time is a week if no value is set for the end time. ) |
| endTime | String | No | End timestamp  
Unix timestamp in milliseconds format, e.g. 1597026383085  
(The maximum time span supported is a week. The default start time is a week ago if no value is set for the start time. ) |

Response Example

```
{    "code": "00000",    "msg": "success",    "requestTime": 1695865481335,    "data": [        {            "tradeId": "1",            "price": "26372.5",            "size": "9.25",            "side": "Sell",            "ts": "1695865151000",            "symbol": "BTCUSDT"        },        {            "tradeId": "2",            "price": "26383",            "size": "12.12",            "side": "Buy",            "ts": "1695865115000",            "symbol": "BTCUSDT"        }    ]}
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter | Type | Description |
| :-- | :-- | :-- |
| \> tradeId | String | tradeId, descending order |
| \> price | String | Price |
| \> size | String | Amount, specific base coin |
| \> side | String | Trading direction  
`sell`: Sell  
`buy`: Buy |
| \> ts | String | Current data timestamp  
Unix timestamp in milliseconds format, e.g. 1597026383085 |
| \> symbol | String | Trading pair name |

> **Source:** https://www.bitget.com/api-doc/contract/market/Get-Fills-History
