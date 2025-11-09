# Get Deposit Records

Frequency limit:10 times/1s (UID)

### Description[​](#description "Direct link to Description")

Get Deposit Records

### HTTP Request[​](#http-request "Direct link to HTTP Request")

- GET /api/v2/spot/wallet/deposit-records

Request Example

```
curl "https://api.bitget.com/api/v2/spot/wallet/deposit-records?coin=USDT&startTime=1659036670000&endTime=1659076670000&limit=20" \   -H "ACCESS-KEY:*******" \   -H "ACCESS-SIGN:*" \   -H "ACCESS-PASSPHRASE:*" \   -H "ACCESS-TIMESTAMP:1659076670000" \   -H "locale:en-US" \   -H "Content-Type: application/json"
```

### Request Parameter[​](#request-parameter "Direct link to Request Parameter")

| Parameter  | Type   | Required | Description                                                                                                                         |
| :--------- | :----- | :------- | :---------------------------------------------------------------------------------------------------------------------------------- |
| coin       | String | No       | Coin name, e.g. USDT                                                                                                                |
| orderId    | String | No       | The response orderId                                                                                                                |
| startTime  | String | Yes      | The record start time for the query. Unix millisecond timestamp, e.g. 1690196141868                                                 |
| endTime    | String | Yes      | The end time of the record for the query. Unix millisecond timestamp, e.g. 1690196141868                                            |
| idLessThan | String | No       | Requests the content on the page before this ID (older data), the value input should be the orderId of the corresponding interface. |
| limit      | String | No       | Number of entries per page<br>The default value is 20 and the maximum value is 100                                                  |

Response Example

```
{    "code": "00000",    "msg": "success",    "requestTime": 1654507973411,    "data": [        {            "orderId": "1",            "tradeId": "1",            "coin": "USDT",            "type": "deposit",            "size": "10.00000000",            "status": "success",            "toAddress": "0x51xxx",            "dest": "on_chain",            "chain": "erc20",            "fromAddress": "0x52xxx",            "cTime": "1653290769222",            "uTime": "1653290769222"        }    ]}
```

### Response Parameter[​](#response-parameter "Direct link to Response Parameter")

| Parameter   | Type   | Description                                                                                                                                                                                       |
| :---------- | :----- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| orderId     | String | Order ID                                                                                                                                                                                          |
| tradeId     | String | TX ID<br>when <code>dest</code> is <code>on_chain</code>, it's the on chain hash value<br>if the <code>dest</code> is <code>internal_transfer</code>, it is the trade ID                          |
| coin        | String | Token name                                                                                                                                                                                        |
| type        | String | Type<br>Fixed value: <code>deposit</code>                                                                                                                                                         |
| size        | String | Quantity                                                                                                                                                                                          |
| status      | String | Withdrawal status<br><code>pending</code>: pending confirmation<br><code>fail</code>: failed<br><code>success</code>: successed                                                                   |
| fromAddress | String | Deposit Initiators<br>If <code>dest</code> is <code>on_chain</code>, it's the on chain address<br>If <code>dest</code> is <code>internal_transfer</code>, it would be the UID,email or the mobile |
| toAddress   | String | Coin Receiver<br>If <code>dest</code> is <code>on_chain</code>, it's the on chain address<br>If <code>dest</code> is <code>internal_transfer</code>, it would be the UID,email or the mobile      |
| chain       | String | Deposit network<br>if <code>dest</code> is <code>internal_transfer</code>, please ignore this parameter                                                                                           |
| dest        | String | Deposit Type<br><code>on_chain</code>: the on chain deposit<br><code>internal_transfer</code>: internal deposit                                                                                   |
| cTime       | String | Creation time, ms                                                                                                                                                                                 |
| uTime       | String | Edit time, ms                                                                                                                                                                                     |

> **Source:** https://www.bitget.com/api-doc/spot/account/Get-Deposit-Record
