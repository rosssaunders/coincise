# Get Market Trades

Rate limit: 10 req/sec/IP

### Description[​](#description "Direct link to Description")

Get Market Trades

- The time interval between startTime and endTime should not exceed 7 days.
- It supports to get the data within 90days. You can download the older data on
  our [web](https://www.bitget.com/data-download)

### HTTP Request[​](#http-request "Direct link to HTTP Request")

- GET /api/v2/spot/market/fills-history

Request Example

```
curl "https://api.bitget.com/api/v2/spot/market/fills-history?symbol=BTCUSDT&limit=20&startTime=1678965010861&endTime=1678965910861"
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter                                     | Type   | Required | Description                                                  |
| :-------------------------------------------- | :----- | :------- | :----------------------------------------------------------- |
| symbol                                        | String | Yes      | Trading pair name, e.g. BTCUSDT                              |
| limit                                         | String | No       | number of data returned. Default: 500, maximum: 1000         |
| idLessThan                                    | String | No       | Order ID, returns records less than the specified 'tradeId'. |
| startTime                                     | String | No       | startTime, Unix millisecond timestamp e.g. 1690196141868     |
| startTime and endTime should be within 7days. |
| endTime                                       | String | No       | endTime, Unix millisecond timestamp e.g. 1690196141868       |
| startTime and endTime should be within 7days. |

Response Example

```
{  "code": "00000",  "msg": "success",  "requestTime": 1744275754521,  "data": [    {      "symbol": "ETHUSDT",      "tradeId": "1294151170843025500",      "side": "Buy",      "price": "1592.58",      "size": "2.1982",      "ts": "1744275603000"    },    {      "symbol": "ETHUSDT",      "tradeId": "1294151170834636801",      "side": "Sell",      "price": "1592.57",      "size": "0.0045",      "ts": "1744275603000"    }  ]}
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter  | Type   | Description  |
| :--------- | :----- | :----------- |
| symbol     | String | Trading pair |
| tradeId    | String | Order ID     |
| Descending |
| side       | String | Direction    |

`Buy`  
`Sell` | | price | String | Order price | | size | String | Filled quantity | |
ts | String | Transaction time(second level)  
Unix millisecond timestamp, e.g. 1744275603000 |

> **Source:** https://www.bitget.com/api-doc/spot/market/Get-Market-Trades
