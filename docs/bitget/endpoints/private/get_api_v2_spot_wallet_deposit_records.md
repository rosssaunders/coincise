# Get Deposit Records

Frequency limit:10 times/1s (UID)

### Description[​](#description "Direct link to Description")

Get Deposit Records

### HTTP Request[​](#http-request "Direct link to HTTP Request")

-   GET /api/v2/spot/wallet/deposit-records

Request Example

```
curl "https://api.bitget.com/api/v2/spot/wallet/deposit-records?coin=USDT&startTime=1659036670000&endTime=1659076670000&limit=20" \   -H "ACCESS-KEY:*******" \   -H "ACCESS-SIGN:*" \   -H "ACCESS-PASSPHRASE:*" \   -H "ACCESS-TIMESTAMP:1659076670000" \   -H "locale:en-US" \   -H "Content-Type: application/json"
```

### Request Parameter[​](#request-parameter "Direct link to Request Parameter")

| Parameter | Type | Required | Description |
| :-- | :-- | :-- | :-- |
| coin | String | No | Coin name, e.g. USDT |
| orderId | String | No | The response orderId |
| startTime | String | Yes | The record start time for the query. Unix millisecond timestamp, e.g. 1690196141868 |
| endTime | String | Yes | The end time of the record for the query. Unix millisecond timestamp, e.g. 1690196141868 |
| idLessThan | String | No | Requests the content on the page before this ID (older data), the value input should be the orderId of the corresponding interface. |
| limit | String | No | Number of entries per page  
The default value is 20 and the maximum value is 100 |

Response Example

```
{    "code": "00000",    "msg": "success",    "requestTime": 1654507973411,    "data": [        {            "orderId": "1",            "tradeId": "1",            "coin": "USDT",            "type": "deposit",            "size": "10.00000000",            "status": "success",            "toAddress": "0x51xxx",            "dest": "on_chain",            "chain": "erc20",            "fromAddress": "0x52xxx",            "cTime": "1653290769222",            "uTime": "1653290769222"        }    ]}
```

### Response Parameter[​](#response-parameter "Direct link to Response Parameter")

| Parameter | Type | Description |
| :-- | :-- | :-- |
| orderId | String | Order ID |
| tradeId | String | TX ID  
when `dest` is `on_chain`, it's the on chain hash value  
if the `dest` is `internal_transfer`, it is the trade ID |
| coin | String | Token name |
| type | String | Type  
Fixed value: `deposit` |
| size | String | Quantity |
| status | String | Withdrawal status  
`pending`: pending confirmation  
`fail`: failed  
`success`: successed |
| fromAddress | String | Deposit Initiators  
If `dest` is `on_chain`, it's the on chain address  
If `dest` is `internal_transfer`, it would be the UID,email or the mobile |
| toAddress | String | Coin Receiver  
If `dest` is `on_chain`, it's the on chain address  
If `dest` is `internal_transfer`, it would be the UID,email or the mobile |
| chain | String | Deposit network  
if `dest` is `internal_transfer`, please ignore this parameter |
| dest | String | Deposit Type  
`on_chain`: the on chain deposit  
`internal_transfer`: internal deposit |
| cTime | String | Creation time, ms |
| uTime | String | Edit time, ms |

> **Source:** https://www.bitget.com/api-doc/spot/account/Get-Deposit-Record
