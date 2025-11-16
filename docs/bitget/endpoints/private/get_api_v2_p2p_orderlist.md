# Get Merchant P2P Orders

Frequency limit:10 times/1s (UID)

### Description[​](#description "Direct link to Description")

Merchant queries P2P orders

### HTTP Request[​](#http-request "Direct link to HTTP Request")

- GET /api/v2/p2p/orderList

Request Example

```
curl "https://api.bitget.com/api/v2/p2p/orderList?startTimestartTime=1691403328000&endTime=1696930027673&limit=1" \   -H "ACCESS-KEY:*******" \   -H "ACCESS-SIGN:*" \   -H "ACCESS-PASSPHRASE:*" \   -H "ACCESS-TIMESTAMP:1659076670000" \   -H "locale:en-US" \   -H "Content-Type: application/json"
```

### Request Parameter[​](#request-parameter "Direct link to Request Parameter")

| Parameter                                                   | Type   | Required | Description                                                                                                      |
| :---------------------------------------------------------- | :----- | :------- | :--------------------------------------------------------------------------------------------------------------- |
| startTime                                                   | String | Yes      | Start time, Unix millisecond timestamp, e.g. 1690196141868                                                       |
| endTime                                                     | String | No       | End time, Unix millisecond timestamp, e.g. 1690196141868                                                         |
| Maximum interval between start time and end time is 90 days |
| idLessThan                                                  | String | No       | The minOrderId returned from the previous query. Returns p2p order data less than the specified entry parameter. |
| limit                                                       | String | No       | Number of queries, default 100                                                                                   |
| status                                                      | String | No       | P2P order status                                                                                                 |

pending_pay: pending payment  
Paid: coins to be released  
Appeal: Appeal in progress  
Completed: Completed  
cancelled: cancelled | | advNo | String | Yes | Advertisement order number | |
side | String | No | TX type  
buy: Buy  
sell: Sell | | coin | String | No | Digital currency name, e.g. USDT | |
language | String | Yes | Language  
zh-CN: Chinese  
en-US: English | | fiat | String | No | Fiat currency name, e.g. USD | | orderNo
| String | No | Order no. |

Response Example

```
{  "code": "00000",  "msg": "success",  "requestTime": 1681201761390,  "data": {    "orderList": [      {        "orderId": "1",        "orderNo": "1",        "advNo": "1",        "price": "1",        "count": "11",        "side": "buy",        "fiat": "USD",        "coin": "USDT",        "withdrawTime": "",        "representTime": "",        "paymentTime": "",        "releaseTime": "",        "amount": "11",        "buyerRealName": "",        "sellerRealName": "兰州",        "status": "cancelled",        "paymentInfo": {          "paymethodName": "paypal",          "paymethodId": "1",          "paymethodInfo": [            {              "name": "繁体中文",              "required": "yes",              "type": "number",              "value": "11****"            },            {              "name": "繁体中文",              "required": "yes",              "type": "file",              "value": "http://abc.x.com/otc/images/20230116/1.jpg"            }          ]        },        "utime": "1696732368875",        "ctime": "1681111722251"      }    ],    "minOrderId": "1"  }}
```

### Response Parameter[​](#response-parameter "Direct link to Response Parameter")

| Parameter          | Type   | Description                                |
| :----------------- | :----- | :----------------------------------------- |
| orderList          | Array  | Order number                               |
| \> orderId         | String | ID                                         |
| \> orderNo         | String | Order no.                                  |
| \> advNo           | String | Advertisement order number                 |
| \> side            | String | Types: buy/sell                            |
| \> count           | String | Amount                                     |
| \> coin            | String | Fiat Currency                              |
| \> price           | String | Price                                      |
| \> fiat            | String | Fiat                                       |
| \> withdrawTime    | String | Time of withdrawal of this order           |
| \> representTime   | String | Appeal time                                |
| \> releaseTime     | String | Coin release time                          |
| \> paymentTime     | String | Repayment time                             |
| \> amount          | String | Order amount                               |
| \> status          | String | P2P order status                           |
| \> buyerRealName   | String | Buyer name                                 |
| \> sellerRealName  | String | Seller name                                |
| \> cTime           | String | Creation time, Unix millisecond timestamps |
| \> uTime           | String | Update time, Unix millisecond timestamps   |
| \> paymentInfo     | Object | Payment Info                               |
| \>\> paymethodName | String | Payment method name                        |
| \>\> paymethodId   | String | Payment method ID                          |
| \>\> paymethodInfo | Array  | Payment method details                     |
| \>\>\> name        | String | Payment detail name                        |
| \>\>\> required    | String | Required or not: yes/no                    |
| \>\>\> type        | String | type, number/file. Ignore this parameter   |
| \>\>\> value       | String | Payment information value                  |
| minOrderId         | String | Returns the minimum orderId of record.     |

> **Source:** https://www.bitget.com/api-doc/common/p2p/Get-P2P-Order-List
