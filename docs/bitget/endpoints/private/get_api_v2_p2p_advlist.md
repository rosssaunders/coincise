# Get Merchant Advertisement List

Frequency limit:10 times/1s (UID)

### Description[​](#description "Direct link to Description")

Get Merchant Advertisement List

### HTTP Request[​](#http-request "Direct link to HTTP Request")

- GET /api/v2/p2p/advList

Request Example

```
curl "https://api.bitget.com/api/v2/p2p/advList?startTime=1659403328000&endTime=1659410528000&limit=20" \   -H "ACCESS-KEY:*******" \   -H "ACCESS-SIGN:*" \   -H "ACCESS-PASSPHRASE:*" \   -H "ACCESS-TIMESTAMP:1659076670000" \   -H "locale:en-US" \   -H "Content-Type: application/json"
```

### Request Parameter[​](#request-parameter "Direct link to Request Parameter")

| Parameter                                                   | Type   | Required | Description                                                                                                             |
| :---------------------------------------------------------- | :----- | :------- | :---------------------------------------------------------------------------------------------------------------------- |
| startTime                                                   | String | Yes      | Start time, Unix millisecond timestamp, e.g. 1690196141868                                                              |
| endTime                                                     | String | No       | End time, Unix millisecond timestamp, e.g. 1690196141868                                                                |
| Maximum interval between start time and end time is 90 days |
| idLessThan                                                  | String | No       | The minAdvId returned from the previous query. Returns the data whose advId is less than the specified input parameter. |
| limit                                                       | String | No       | Number of queries: Default: 20, max:20.                                                                                 |
| status                                                      | String | Yes      | Advertisement order status                                                                                              |

`online`: Online  
`offline`: Offline  
`editing`: Editing  
`completed`: Completed | | advNo | String | No | Advertisement order | | side |
String | Yes | TX type  
buy: Buy  
sell: Sell | | coin | String | Yes | Digital currency | | language | String | No
| Language  
zh-CN: Chinese  
en-US: English | | fiat | String | Yes | Fiat | | orderBy | String | No | Sort
Fields  
createTime: Create time  
price: Price  
Descending, by createTime by default | | payMethodId | String | No | Payment
method id | | sourceType | String | No | Query range  
owner:query owner advertisement(default)  
competitior:query other merchant advertisement  
ownerAndCompetitior:query all advertisement |

Response Example

```
{    "code": "00000",    "msg": "success",    "requestTime": 1696930053072,    "data": {        "advList": [            {                "advId": "1",                "advNo": "1",                "side": "buy",                "advSize": "0.6",                "size": "0",                "coin": "BTC",                "price": "155570.9",                "coinPrecision": "36",                "fiat": "CNY",                "fiatPrecision": "2",                "fiatSymbol": "￥",                "status": "online",                "hide": "no",                "maxTradeAmount": "93342.54",                "minTradeAmount": "100",                "payDuration": "4",                "turnoverNum": "8",                "turnoverRate": "1.00",                "label": null,                "userLimitList": {                    "minCompleteNum": "0",                    "maxCompleteNum": "0",                    "placeOrderNum": "0",                    "allowMerchantPlace": "no",                    "completeRate30d": "0",                    "country": ""                },                "paymentMethodList": [                    {                        "paymentMethod": "Bank Card",                        "paymentId": "11",                        "paymentInfo": [                            {                                "name": "Bank Card",                                "required": true,                                "type": "txt"                            }                        ]                    },                    {                        "paymentMethod": "WeChat",                        "paymentId": "12",                        "paymentInfo": [                            {                                "name": "Payment code",                                "required": true,                                "type": "file"                            },                            {                                "name": "WeChatAccount",                                "required": true,                                "type": "txt"                            }                        ]                    },                    {                        "paymentMethod": "Alipay",                        "paymentId": "13",                        "paymentInfo": [                            {                                "name": "AlipayAccount",                                "required": true,                                "type": "txt"                            },                            {                                "name": "Payment code",                                "required": true,                                "type": "file"                            }                        ]                    }                ],                "merchantCertifiedList": [],                "utime": "1696733724267",                "ctime": "1696733724267"            }        ],        "minAdvId": "1"    }}
```

### Response Parameter[​](#response-parameter "Direct link to Response Parameter")

| Parameter | Type   | Description                    |
| :-------- | :----- | :----------------------------- |
| advList   | Array  | Number of advertisement orders |
| \> advId  | String | Advertisement order ID         |
| \> advNo  | String | Advertisement order number     |
| \> side   | String | TX type                        |

sell  
buy | | \> advSize | String | Total number of advertisement orders | | \> size |
String | Filled quantity | | \> coin | String | Coins such as BGB, USDT, BTC,
ETH etc. | | \> price | String | Price | | \> coinPrecision | String | Currency
precision, decimala | | \> fiat | String | Fiat | | \> fiatPrecision | String |
Fiat decimals | | \> fiatSymbol | String | Currency symbol | | \> status |
String | Advertisement order status  
`online`: Online  
`offline`: Offline  
`editing`: Editing  
`completed`: Completed | | \> hide | String | Hide the advertisement order or
not  
yes: Hide  
no: not hide | | \> maxTradeAmount | String | Maximum order quantity | | \>
minTradeAmount | String | Minimum order quantity | | \> payDuration | String |
Time period for payment after placing an order, min | | \> turnoverNum | String
| Total trading amount | | \> turnoverRate | String | Close rate | | \> label |
String | Note | | \> cTime | String | Creation time, Unix millisecond timestamps
| | \> uTime | String | Update time, Unix millisecond timestamps | | \>
userLimitList | Array | Upper limit of the advertiser order restricted user | |
\>\> minCompleteNum | String | Minimum number of completed user orders | | \>\>
maxCompleteNum | String | Maximum number of completed user orders | | \>\>
placeOrderNum | String | Maximum number of orders a user can place under this
advertisement | | \>\> allowMerchantPlace | String | Whether to allow merchants
to place orders  
yes: allow  
no: not allow | | \>\> completeRate30d | String | 30-day close rate | | \>\>
country | String | Only people from these countries are allowed to place orders
| | \> paymentMethodList | Array | Payment methods number | | \>\> paymentMethod
| String | Payment name | | \>\> paymentId | String | Payment ID | | \>\>
paymentInfo | Array | Payment method detail information | | \>\>\> required |
Boolean | Required or not: true/false | | \>\>\> name | String | Payment details
| | \>\>\> type | String | Payment method detail information type | | \>
merchantCertifiedResult | Array | Merchant authentication number | | \>\>
imageUrl | String | Gold Merchant certification pictures | | \>\> desc | String
| Gold Merchant certification parameter description | | minAdvId | String |
Returns the minimum advId of the result |

> **Source:** https://www.bitget.com/api-doc/common/p2p/Get-P2P-Adv-List
