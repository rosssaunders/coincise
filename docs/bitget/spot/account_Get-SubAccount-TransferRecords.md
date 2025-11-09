# Get MainSub Transfer Record

Rate limit: 20 req/sec/UID

### Description[​](#description "Direct link to Description")

Get transfer record

### HTTP Request[​](#http-request "Direct link to HTTP Request")

- GET /api/v2/spot/account/sub-main-trans-record

Request Example

```
curl "https://api.bitget.com/api/v2/spot/account/sub-main-trans-record?coin=USDT&startTime=1699510219000&endTime=1699684880000" \   -H "ACCESS-KEY:*******" \   -H "ACCESS-SIGN:*" \   -H "ACCESS-PASSPHRASE:*" \   -H "ACCESS-TIMESTAMP:1659076670000" \   -H "locale:en-US" \   -H "Content-Type: application/json"
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter  | Type   | Required | Description                                                                                                                                                                                                           |
| :--------- | :----- | :------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| coin       | String | No       | Token name                                                                                                                                                                                                            |
| role       | String | No       | Transfer out type(default：initiator)<br><code>initiator</code> initiator<br><code>receiver</code> receiver                                                                                                           |
| subUid     | String | No       | Sub-account UID<br>If empty, it only query the records that transfer from main account                                                                                                                                |
| startTime  | String | No       | The start time of the billing history, i.e., getting the billing history after that timestamp<br>Unix millisecond timestamp, e.g. 1690196141868                                                                       |
| endTime    | String | No       | The end time of the billing history, i.e., getting the billing history before that timestamp<br>Unix millisecond timestamp, e.g. 1690196141868<br>The interval between startTime and endTime must not exceed 90 days. |
| clientOid  | String | No       | Order ID customized by user                                                                                                                                                                                           |
| limit      | String | No       | Number of results returned: Default: 100, maximum 100                                                                                                                                                                 |
| idLessThan | String | No       | Requests the content on the page before this ID (older data), the value input should be the transferId of the corresponding interface.                                                                                |

Response Example

```
{    "code": "00000",    "msg": "success",    "requestTime": 1700556280430,    "data": [        {            "coin": "USDT",            "status": "Successful",            "toType": "usdt_futures",            "fromType": "spot",            "size": "1020.00000000",            "ts": "1691476360467",            "clientOid": "xxxx",            "transferId": "xxxx",            "fromUserId": "xxxx",            "toUserId": "xxxx"        }    ]}
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter     | Type   | Description                                                                                                                                                                                                                                                                  |
| :------------ | :----- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| coin          | String | Token name                                                                                                                                                                                                                                                                   |
| status        | String | Status of transfer<br>Successful: Successful<br>Failed: Failed<br>Processing: Processing                                                                                                                                                                                     |
| toType        | String | Recipient account type<br>spot: Spot account<br>p2p: P2P account<br>coin_futures: Coin-M futures account<br>usdt_futures: USDT-M futures account<br>usdc_futures: USDC-M futures account<br>crossed_margin: Cross margin account<br>isolated_margin: Isolated margin account |
| fromType      | String | Sender account type<br>spot: Spot account<br>p2p: P2P account<br>coin_futures: Coin-M futures account<br>usdt_futures: USDT-M futures account<br>usdc_futures: USDC-M futures account<br>crossed_margin: Cross margin account<br>isolated_margin: Isolated margin account    |
| size          | String | Quantity                                                                                                                                                                                                                                                                     |
| ts            | String | Transfer time, Unix millisecond timestamp, e.g. 1690196141868                                                                                                                                                                                                                |
| clientOid     | String | Order ID customized by user                                                                                                                                                                                                                                                  |
| transferId    | String | Transfer order ID                                                                                                                                                                                                                                                            |
| newTransferId | String | Transfer order ID<br>It is the same as the transferId in the main-sub account transfer response.                                                                                                                                                                             |
| fromUserId    | String | the user ID who initiate the trasnfer ID                                                                                                                                                                                                                                     |
| toUserId      | String | The user ID who receive the trnasfer                                                                                                                                                                                                                                         |

> **Source:**
> https://www.bitget.com/api-doc/spot/account/Get-SubAccount-TransferRecords
