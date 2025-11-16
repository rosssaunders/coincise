# Get Transfer Record

Frequency limit: 20 times/1s (User ID)

### Description[​](#description "Direct link to Description")

Get transfer record

### HTTP Request[​](#http-request "Direct link to HTTP Request")

- GET /api/v2/spot/account/transferRecords

Request Example

```
curl "https://api.bitget.com/api/v2/spot/account/transferRecords?coin=USDT&fromType=exchange&startTime=1659076670&endTime=1659076670&limit=100" \   -H "ACCESS-KEY:*******" \   -H "ACCESS-SIGN:*" \   -H "ACCESS-PASSPHRASE:*" \   -H "ACCESS-TIMESTAMP:1659076670000" \   -H "locale:en-US" \   -H "Content-Type: application/json"
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter | Type   | Required | Description  |
| :-------- | :----- | :------- | :----------- |
| coin      | String | Yes      | Token name   |
| fromType  | String | No       | Account type |

spot: Spot account  
p2p: P2P/funding account  
coin_futures: Coin-M futures account  
usdt_futures: USDT-M futures account  
usdc_futures: USDC-M futures account  
crossed_margin: Cross margin account  
isolated_margin: Isolated margin account | | startTime | String | No | The start
time of the billing history, i.e., getting the billing history after that
timestamp  
Unix millisecond timestamp, e.g. 1690196141868 | | endTime | String | No | The
end time of the billing history, i.e., getting the billing history before that
timestamp  
Unix millisecond timestamp, e.g. 1690196141868  
The interval between startTime and endTime must not exceed 90 days. | |
clientOid | String | No | Order ID customized by user | | pageNum | String | No
| Requests the content on the page.  
default:1  
max:1000 | | limit | String | No | Number of results returned: Default: 100,
maximum 500 | | idLessThan | String | No | (Deprecated) Requests the content on
the page before this ID (older data), the value input should be the transferId
of the corresponding interface. |

Response Example

```
{    "code": "00000",    "data": [        {            "coin": "btc",            "status": "Successful",            "toType": "usdt_futures",            "toSymbol": "",            "fromType": "spot",            "fromSymbol": "BTC/USD",            "size": "1000.00000000",            "ts": "1631070374488",            "clientOid": "1",            "transferId": "1"        }    ],    "msg": "success",    "requestTime": 1631608142260}
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter | Type   | Description        |
| :-------- | :----- | :----------------- |
| coin      | String | Token name         |
| status    | String | Status of transfer |

Successful: Successful  
Failed: Failed  
Processing: Processing | | toType | String | Recipient account type  
spot: Spot account  
p2p: P2P/funding account  
coin_futures: Coin-M futures account  
usdt_futures: USDT-M futures account  
usdc_futures: USDC-M futures account  
crossed_margin: Cross margin account  
isolated_margin: Isolated margin account | | toSymbol | String | Trading pair
for the recipient account  
Returned when the recipient account is isolated_margin | | fromType | String |
Sender account type  
spot: Spot account  
p2p: P2P/funding account  
coin_futures: Coin-M futures account  
usdt_futures: USDT-M futures account  
usdc_futures: USDC-M futures account  
crossed_margin: Cross margin account  
isolated_margin: Isolated margin account | | fromSymbol | String | Trading pair
for the sending account  
Return when the sending account is isolated_margin | | size | String | Quantity
| | ts | String | Transfer time, Unix millisecond timestamp, e.g. 1690196141868
| | clientOid | String | Order ID customized by user | | transferId | String |
Transfer order ID |

> **Source:**
> https://www.bitget.com/api-doc/spot/account/Get-Account-TransferRecords
