# Batch Cancel Orders

Frequency limit:10 times/1s (UID)

### Description[​](#description "Direct link to Description")

Cancel Orders in Batch

### HTTP Request[​](#http-request "Direct link to HTTP Request")

- POST /api/v2/spot/trade/batch-cancel-order

Request Example

```
curl -X POST "https://api.bitget.com/api/v2/spot/trade/batch-cancel-order" \   -H "ACCESS-KEY:*******" \   -H "ACCESS-SIGN:*" \   -H "ACCESS-PASSPHRASE:*" \   -H "ACCESS-TIMESTAMP:1659076670000" \   -H "locale:en-US" \   -H "Content-Type: application/json" \   -d '{    "symbol": "",    "batchMode"："multiple",    "orderList": [        {            "orderId":"121211212122",            "symbol":"BTCUSDT",            "clientOid":"121211212122"        }    ]}'
```

### Request Parameter[​](#request-parameter "Direct link to Request Parameter")

| Parameter      | Type   | Required | Description                                                                                                                                                                                                                                                                                                                                            |
| :------------- | :----- | :------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| symbol         | String | No       | Trading pair name, e.g. BTCUSDT                                                                                                                                                                                                                                                                                                                        |
| batchMode      | String | No       | Batch order mode<br><code>single</code> single currency mode, default single currency mode<br><code>multiple</code> cross-currency mode.<br>If single mode , the symbol in orderlist will be ingor<br>If multiple mode , the symbol in orderlist is not allow be null, and the symbol in orderlist is required. symbol outside orderlist will be ingor |
| orderList      | Array  | Yes      | Order ID List ，maximum length: 50                                                                                                                                                                                                                                                                                                                     |
| &gt;symbol     | String | No       | Trading pair name, e.g. BTCUSDT                                                                                                                                                                                                                                                                                                                        |
| &gt; orderId   | String | No       | Order ID. Either orderId or clientOid is required.                                                                                                                                                                                                                                                                                                     |
| &gt; clientOid | String | No       | Client Order ID.Either clientOid or orderId is required.                                                                                                                                                                                                                                                                                               |

Response Example

```
{    "code": "00000",    "msg": "success",    "requestTime": 1695808949356,    "data": {        "successList": [            {                "orderId": "121211212122",                "clientOid": "121211212122"            }        ],        "failureList": [            {                "orderId": "121211212122",                "clientOid": "xxx001",                "errorMsg": "duplicate clientOrderId"            }        ]    }}
```

### Response Parameter[​](#response-parameter "Direct link to Response Parameter")

| Parameter     | Type   | Description             |
| :------------ | :----- | :---------------------- |
| successList   | Array  | Successful order number |
| &gt;orderId   | String | Order ID                |
| &gt;clientOid | String | Client Order ID         |
| failureList   | Array  | Failed order number     |
| &gt;orderId   | String | Order ID                |
| &gt;clientOid | String | Client Order ID         |
| &gt;errorMsg  | String | Error information       |
| &gt;errorCode | String | Error code              |

> **Source:** https://www.bitget.com/api-doc/spot/trade/Batch-Cancel-Orders
