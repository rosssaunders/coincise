# Get Withdrawal Records

Frequency limit:10 times/1s (User ID)

### Description[​](#description "Direct link to Description")

Get Withdrawal Records

### HTTP Request[​](#http-request "Direct link to HTTP Request")

- GET /api/v2/spot/wallet/withdrawal-records

Request Example

```
curl "https://api.bitget.com/api/v2/spot/wallet/withdrawal-records?coin=USDT&clientOid=123&startTime=1659036670000&endTime=1659076670000&limit=20" \   -H "ACCESS-KEY:*******" \   -H "ACCESS-SIGN:*" \   -H "ACCESS-PASSPHRASE:*" \   -H "ACCESS-TIMESTAMP:1659076670000" \   -H "locale:en-US" \   -H "Content-Type: application/json"
```

### Request Parameter[​](#request-parameter "Direct link to Request Parameter")

| Parameter                                            | Type   | Required | Description                                                                                                                         |
| :--------------------------------------------------- | :----- | :------- | :---------------------------------------------------------------------------------------------------------------------------------- |
| coin                                                 | String | No       | Coin name, e.g. USDT                                                                                                                |
| clientOid                                            | String | No       | Client customized ID                                                                                                                |
| startTime                                            | String | Yes      | The record start time for the query. Unix millisecond timestamp, e.g. 1690196141868                                                 |
| endTime                                              | String | Yes      | The end time of the record for the query. Unix millisecond timestamp, e.g. 1690196141868                                            |
| idLessThan                                           | String | No       | Requests the content on the page before this ID (older data), the value input should be the orderId of the corresponding interface. |
| orderId                                              | String | No       | The response orderId                                                                                                                |
| limit                                                | String | No       | Number of entries per page                                                                                                          |
| The default value is 20 and the maximum value is 100 |

Response Example

```
{    "code": "00000",    "msg": "success",    "requestTime": 1654507973411,    "data": [        {            "orderId": "1",            "tradeId": "1",            "coin": "USDT",            "dest": "dest",            "clientOid": "123",            "type": "withdraw",            "tag": "",            "size": "10.00000000",            "fee": "-1.00000000",            "status": "success",            "toAddress": "1",            "fromAddress": "2",            "confirm": "100",            "chain": "erc20",            "cTime": "1653290769222",            "uTime": "1653290769222"        }    ]}
```

### Response Parameter[​](#response-parameter "Direct link to Response Parameter")

| Parameter | Type   | Description |
| :-------- | :----- | :---------- |
| orderId   | String | Order ID    |
| tradeId   | String | TX ID       |

when `dest` is `on_chain`, it's the on chain hash value  
if the `dest` is `internal_transfer`, it is the trade ID | | coin | String |
Token name | | clientOid | String | Client customized ID | | type | String |
Type  
Fixed value: `withdraw` | | dest | String | Type of withdrawal  
`on_chain`: withdrawal on chain  
`internal_transfer`: internal transfer | | size | String | Quantity | | fee |
string | Transaction Fee | | status | String | Withdrawal status  
`pending`:Pending preliminary examination  
`fail`:Failed  
`success`:Successful | | fromAddress | String | Withdrawal Initiators  
If `dest` is `on_chain`, it's the on chain address  
If `dest` is `internal_transfer`, it would be the UID,email or the mobile | |
toAddress | String | Coin receiver address  
If `dest` is `on_chain`, it's the on chain address  
If `dest` is `internal_transfer`, it would be the UID,email or the mobile | |
chain | String | Withdrawal network  
if `dest` is `internal_transfer`, please ignore this parameter | | confirm |
String | Number of confirmed blocks | | tag | String | Tag | | cTime | String |
Creation time(ms) | | uTime | String | Update time(ms) |

> **Source:** https://www.bitget.com/api-doc/spot/account/Get-Withdraw-Record
