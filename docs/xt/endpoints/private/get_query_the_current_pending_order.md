# GET Query the current pending order

Source:
[https://doc.xt.com/docs/spot/Order/QueryOpenOrders](https://doc.xt.com/docs/spot/Order/QueryOpenOrders)

# Query the current pending order

**Type** GET

**Description:** `/v4/open-order`

---

### Parameters[​](#parameters "Direct link to Parameters")

| Name    | Type   | Mandatory | Default | Description                                    | Ranges      |
| ------- | ------ | --------- | ------- | ---------------------------------------------- | ----------- |
| symbol  | string | No        | N/A     | Trading pair, if not filled in, represents all | —           |
| bizType | string | No        | N/A     | Business type                                  | SPOT, LEVER |
| side    | string | No        | N/A     | Order side                                     | BUY, SELL   |

---

### Limit Flow Rules[​](#limit-flow-rules "Direct link to Limit Flow Rules")

- 10/s/apikey

---

### Parameters Example[​](#parameters-example "Direct link to Parameters Example")

```
curl --location --request GET 'https://sapi.xt.com/v4/open-order?symbol=XT_USDT' \--header 'accept: */*' \--header 'Content-Type: application/json' \--header 'validate-algorithms: HmacSHA256' \--header 'validate-recvwindow: 60000' \--header 'validate-appkey: xxxxxxxxxx' \--header 'validate-timestamp: xxxxxxxxxx' \--header 'validate-signature: xxxxxxxxxx'
```

### Response Example[​](#response-example "Direct link to Response Example")

Response

```
{  "rc": 0,  "mc": "string",  "ma": [{}],  "result": [    {      "symbol": "BTC_USDT",      "orderId": "6216559590087220004",      "clientOrderId": "16559590087220001",      "baseCurrency": "string",      "quoteCurrency": "string",      "side": "BUY",      "type": "LIMIT",      "timeInForce": "GTC",      "price": "40000",      "origQty": "2",      "origQuoteQty": "48000",      "executedQty": "1.2",      "leavingQty": "string",      "tradeBase": "2",      "tradeQuote": "48000",      "avgPrice": "42350",      "fee": "string",      "feeCurrency": "string",      "state": "NEW",      "time": 1655958915583,      "ip": "127.0.0.1",      "updatedTime": 1655958915583    }  ]}
```

[Edit this page](https://github.com/facebook/docusaurus/edit/main/website/docs/spot/Order/openOrderGet.mdx)
