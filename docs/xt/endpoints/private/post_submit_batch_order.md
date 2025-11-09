# POST Submit batch order

Source:
[https://doc.xt.com/docs/spot/Order/SubmitBatchOrder](https://doc.xt.com/docs/spot/Order/SubmitBatchOrder)

# Submit batch order

**Type** POST

**Description:** `/v4/batch-order`

---

### Parameters[​](#parameters "Direct link to Parameters")

| Name               | Type   | Mandatory | Default | Description                                             | Ranges             |
| ------------------ | ------ | --------- | ------- | ------------------------------------------------------- | ------------------ |
| clientBatchId      | string | No        | N/A     | Client batch number. Pattern: `^[a-zA-Z0-9_]{4,32}$`    | —                  |
| items              | array  | Yes       | N/A     | Array                                                   | —                  |
| item.symbol        | string | Yes       | N/A     | Trading pair                                            | —                  |
| item.clientOrderId | string | No        | N/A     | Pattern: `^[a-zA-Z0-9_]{4,32}$`                         | —                  |
| item.side          | string | Yes       | N/A     | Order side                                              | BUY, SELL          |
| item.type          | string | Yes       | N/A     | Order type                                              | LIMIT, MARKET      |
| item.timeInForce   | string | Yes       | N/A     | Effective way                                           | GTC, FOK, IOC, GTX |
| item.bizType       | string | Yes       | N/A     | Business type                                           | SPOT, LEVER        |
| item.price         | number | No        | N/A     | Price. Required if it is LIMIT; blank if it is MARKET   | —                  |
| item.quantity      | number | No        | N/A     | Quantity. Required if it is LIMIT or MARKET by quantity | —                  |
| item.quoteQty      | number | No        | N/A     | Amount. Required if it is LIMIT or MARKET by amount     | —                  |

---

### Limit Flow Rules[​](#limit-flow-rules "Direct link to Limit Flow Rules")

- 30/s/apikey

### Parameters Example[​](#parameters-example "Direct link to Parameters Example")

```
curl --location --request POST 'https://sapi.xt.com/v4/batch-order' \--header 'accept: */*' \--header 'Content-Type: application/json' \--header 'validate-algorithms: HmacSHA256' \--header 'validate-recvwindow: 60000' \--header 'validate-appkey: xxxxxxxxxx' \--header 'validate-timestamp: xxxxxxxxxx' \--header 'validate-signature: xxxxxxxxxx' \--data '{    "clientBatchId": "xxxxxxxxxx",    "items": [        {            "symbol": "XT_USDT",            "clientOrderId": "xxxxxxxxxx",            "side": "BUY",            "type": "LIMIT",            "timeInForce": "GTC",            "bizType": "SPOT",            "price": 10,            "quantity": 1        }    ]}'
```

---

### Request Example[​](#request-example "Direct link to Request Example")

Request

```
{  "clientBatchId": "51232",  "items": [    {      "symbol": "BTC_USDT",      "clientOrderId": "16559590087220001",      "side": "BUY",      "type": "LIMIT",      "timeInForce": "GTC",      "bizType": "SPOT",      "price": 40000,      "quantity": 2,      "quoteQty": 80000    }  ]}
```

### Response Example[​](#response-example "Direct link to Response Example")

Request

```
{  "rc": 0,  "mc": "string",  "ma": [{}],  "result": {    "batchId": "123",    "items": [      {        "index": "0", // start with 0        "clientOrderId": "123",        "orderId": "123",        "reject": "false",        "reason": "invalid price precision"      }    ]  }}
```

[Edit this page](https://github.com/facebook/docusaurus/edit/main/website/docs/spot/Order/batchOrderPost.mdx)
