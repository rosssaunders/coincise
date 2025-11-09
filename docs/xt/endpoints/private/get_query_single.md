# GET Query single

Source:
[https://doc.xt.com/docs/spot/Order/QuerySingle](https://doc.xt.com/docs/spot/Order/QuerySingle)

# Query single

### Description[​](#description "Direct link to Description")

**Type:** GET

**Path:** `/v4/order`

---

### Parameters[​](#parameters "Direct link to Parameters")

| Name          | Type   | Mandatory | Default | Description     |
| ------------- | ------ | --------- | ------- | --------------- |
| orderId       | number | No        | N/A     | Order ID        |
| clientOrderId | string | No        | N/A     | Client order ID |

---

### Limit Flow Rules[​](#limit-flow-rules "Direct link to Limit Flow Rules")

- 50/s/apikey

### Parameters Example[​](#parameters-example "Direct link to Parameters Example")

```
curl --location --request GET 'https://sapi.xt.com/v4/order?orderId=xxxxxx' \--header 'accept: */*' \--header 'Content-Type: application/json' \--header 'validate-algorithms: HmacSHA256' \--header 'validate-recvwindow: 60000' \--header 'validate-appkey: xxxxxxxxxx' \--header 'validate-timestamp: xxxxxxxxxx' \--header 'validate-signature: xxxxxxxxxx'
```

---

### Code Example[​](#code-example "Direct link to Code Example")

Java

```
public String orderGet(){}
```

---

### Response Example[​](#response-example "Direct link to Response Example")

Response

```
{  "rc": 0,  "mc": "string",  "ma": [{}],  "result": {    "symbol": "BTC_USDT",    "orderId": "6216559590087220004",    "clientOrderId": "16559590087220001",    "baseCurrency": "string",    "quoteCurrency": "string",    "side": "BUY", // Order side: BUY, SELL    "type": "LIMIT", // Order type: LIMIT, MARKET    "timeInForce": "GTC", // Effective way: GTC, IOC, FOK, GTX    "price": "40000",    "origQty": "2", // Original quantity    "origQuoteQty": "48000", // Original amount    "executedQty": "1.2", // Executed quantity    "leavingQty": "string", // Remaining quantity (0 if cancelled or rejected)    "tradeBase": "2", // Transaction quantity    "tradeQuote": "48000", // Transaction amount    "avgPrice": "42350", // Average transaction price    "fee": "string", // Handling fee    "feeCurrency": "string",    "state": "NEW", // Order state    "time": 1655958915583, // Order creation time    "updatedTime": 1655958915583 // Last updated time  }}
```

[Edit this page](https://github.com/facebook/docusaurus/edit/main/website/docs/spot/Order/orderGetQueryParam.mdx)
