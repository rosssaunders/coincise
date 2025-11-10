# Get SubAccount Deposit Records

Frequency limit:10 times/1s (UID)

### Description[​](#description "Direct link to Description")

### HTTP Request[​](#http-request "Direct link to HTTP Request")

-   GET /api/v2/spot/wallet/subaccount-deposit-records

Request Example

```
curl "https://api.bitget.com/api/v2/spot/wallet/subaccount-deposit-records?subUid=12121212&coin=USDT&idLessThan=1111120137173336063&limit=5" \   -H "ACCESS-KEY:*******" \   -H "ACCESS-SIGN:*" \   -H "ACCESS-PASSPHRASE:*" \   -H "ACCESS-TIMESTAMP:1659076670000" \   -H "locale:en-US" \   -H "Content-Type: application/json"
```

### Request Parameter[​](#request-parameter "Direct link to Request Parameter")

| Parameter | Type | Required | Description |
| :-- | :-- | :-- | :-- |
| subUid | String | Yes | Sub Account Uid |
| coin | String | No | Coin name, e.g. USDT |
| startTime | String | No | The record start time for the query. Unix millisecond timestamp, e.g. 1690196141868 |
| endTime | String | No | The end time of the record for the query. Unix millisecond timestamp, e.g. 1690196141868 |
| idLessThan | String | No | Requests the content on the page before this ID (older data), the value input should be the orderId of the corresponding interface. |
| limit | String | No | Number of entries per page  
The default value is 20 and the maximum value is 100 |

Response Example

```
{    "code": "00000",    "msg": "success",    "requestTime": 1654507973411,    "data": [        {            "orderId": "1",            "tradeId": "1",            "coin": "USDT",            "size": "10.00000000",            "status": "success",            "toAddress": "0x51xxx",            "dest": "on_chain",            "chain": "erc20",            "fromAddress": "0x52xxx",            "cTime": "1653290769222",            "uTime": "1653290769222"        }    ]}
```

### Response Parameter[​](#response-parameter "Direct link to Response Parameter")

| Parameter | Type | Description |
| :-- | :-- | :-- |
| orderId | String | Order ID |
| tradeId | String | TX ID  
when `dest` is `on_chain`, it's the on chain hash value  
if the `dest` is `internal_transfer`, it is the trade ID |
| coin | String | Token name |
| clientOid | String | Customized order ID |
| size | String | Quantity |
| status | String | Deposit status  
`pending`：it's still in confirmation  
`fail`：fail  
`success`：success |
| fromAddress | String | Deposit Initiators  
If `dest` is `on_chain`, it's the on chain address  
If `dest` is `internal_transfer`, it would be the UID,email or the mobile |
| toAddress | String | Coin Receiver  
If `dest` is `on_chain`, it's the on chain address  
If `dest` is `internal_transfer`, it would be the UID,email or the mobile |
| chain | String | Deposit network  
if `dest` is `internal_transfer`, please ignore this parameter |
| confirm | String | The number of confirmed blocks |
| dest | String | Deposit Type  
`on_chain`: the on chain deposit  
`internal_transfer`: internal deposit |
| tag | String | Tag |
| cTime | String | Creation time in ms |
| uTime | String | Update time in ms |

> **Source:** https://www.bitget.com/api-doc/spot/account/Get-SubAccount-Deposit-Record
