# GET Get Single Order

Source: [https://doc.xt.com/docs/spot/Order/GetSingleOrder](https://doc.xt.com/docs/spot/Order/GetSingleOrder)

# Get Single Order

**Type** GET

**Description:** `/v4/order/{orderId}`

* * *

### Parameters[​](#parameters "Direct link to Parameters")

| Name | Type | Mandatory | Default | Description |
| --- | --- | --- | --- | --- |
| orderId | number | Yes | — | Order ID |

* * *

### Limit Flow Rules[​](#limit-flow-rules "Direct link to Limit Flow Rules")

-   10/s/apikey

* * *

### Parameters Example[​](#parameters-example "Direct link to Parameters Example")

```
curl --location --request GET 'https://sapi.xt.com/v4/order/xxxxxxxxxxx' \     // xxxxxxxxxxx：orderId--header 'accept: */*' \--header 'Content-Type: application/json' \--header 'validate-algorithms: HmacSHA256' \--header 'validate-recvwindow: 60000' \--header 'validate-appkey: xxxxxxxxxx' \--header 'validate-timestamp: xxxxxxxxxx' \--header 'validate-signature: xxxxxxxxxx'
```

* * *

### Response Example[​](#response-example "Direct link to Response Example")

Response

```
{  "rc": 0,  "mc": "string",  "ma": [{}],  "result": {    "symbol": "BTC_USDT",    "orderId": "6216559590087220004",    "clientOrderId": "16559590087220001",    "baseCurrency": "string",    "quoteCurrency": "string",    "side": "BUY", // order side: BUY, SELL    "type": "LIMIT", // order type: LIMIT, MARKET    "timeInForce": "GTC", // effective way: GTC, IOC, FOK, GTX    "price": "40000",    "origQty": "2", // original quantity    "origQuoteQty": "48000", // original amount    "executedQty": "1.2", // executed quantity    "leavingQty": "string", // remaining quantity (0 if cancelled or rejected)    "tradeBase": "2", // transaction quantity    "tradeQuote": "48000", // transaction amount    "avgPrice": "42350", // average transaction price    "fee": "string", // handling fee    "feeCurrency": "string",    "state": "NEW", // order state: NEW, PARTIALLY_FILLED, FILLED, CANCELED, REJECTED, EXPIRED    "time": 1655958915583, // order time    "ip": "127.0.0.1", // IP address    "updatedTime": 1655958915583  }}
```

[Edit this page](https://github.com/facebook/docusaurus/edit/main/website/docs/spot/Order/orderGet.mdx)