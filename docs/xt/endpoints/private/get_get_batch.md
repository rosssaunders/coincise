# GET Get batch

Source: [https://doc.xt.com/docs/spot/Order/GetBatch](https://doc.xt.com/docs/spot/Order/GetBatch)

# Get batch

**Type:** GET

**Description:** `/v4/batch-order`

### Parameters[​](#parameters "Direct link to Parameters")

| name | type | mandatory | default | description | ranges |
| --- | --- | --- | --- | --- | --- |
| orderIds | string | true |  | order Ids eg: 6216559590087220004, 6216559590087220004 |  |

### Notes[​](#notes "Direct link to Notes")

Response field information, refer to the **Get single interface**.

### Response Example[​](#response-example "Direct link to Response Example")

```
curl --location --request DELETE 'https://sapi.xt.com/v4/batch-order' \--header 'accept: */*' \--header 'Content-Type: application/json' \--header 'validate-algorithms: HmacSHA256' \--header 'validate-recvwindow: 60000' \--header 'validate-appkey: xxxxxxxxxx' \--header 'validate-timestamp: xxxxxxxxxx' \--header 'validate-signature: xxxxxxxxxx' \--data '{  "orderIds": [123456789, 987654321]}'
```

### Response Example[​](#response-example-1 "Direct link to Response Example")

Response

```
{  "rc": 0,  "mc": "string",  "ma": [{}],  "result": [    {      "symbol": "BTC_USDT",      "orderId": "6216559590087220004",      "clientOrderId": "16559590087220001",      "baseCurrency": "string",      "quoteCurrency": "string",      "side": "BUY",      "type": "LIMIT",      "timeInForce": "GTC",      "price": "40000",      "origQty": "2",      "origQuoteQty": "48000",      "executedQty": "1.2",      "leavingQty": "string",      "tradeBase": "2",      "tradeQuote": "48000",      "avgPrice": "42350",      "fee": "string",      "feeCurrency": "string",      "state": "NEW",      "time": 1655958915583,      "ip": "127.0.0.1",      "updatedTime": 1655958915583    }  ]}
```

[Edit this page](https://github.com/facebook/docusaurus/edit/main/website/docs/spot/Order/batchOrderGet.mdx)