# GET Query trade

Source: [https://doc.xt.com/docs/spot/Trade/QueryTrade](https://doc.xt.com/docs/spot/Trade/QueryTrade)

# Query trade

**Type:** GET **Description:** `/v4/trade`

### Parameters[​](#parameters "Direct link to Parameters")

| name | type | mandatory | default | description | ranges |
| --- | --- | --- | --- | --- | --- |
| symbol | string | false | N/A | Trading pair, if not filled, represents all |  |
| bizType | string | false | N/A | Business type: `SPOT`, `LEVER` |  |
| orderSide | string | false | N/A | Order side: `BUY`, `SELL` |  |
| orderType | string | false | N/A | Order type: `LIMIT`, `MARKET` |  |
| orderId | number | false | N/A | Order ID |  |
| fromId | number | false | N/A | Start ID |  |
| direction | string | false | N/A | Query direction: `PREV`, `NEXT` |  |
| limit | number | false | 20 | Limit number, max 100 |  |
| startTime | number | false | N/A | Start time (e.g. `1657682804112`) |  |
| endTime | number | false | N/A | End time |  |

### Parameters Example[​](#parameters-example "Direct link to Parameters Example")

cURL

```
curl --location --request GET 'https://sapi.xt.com/v4/trade?limit=100&bizType=SPOT&startTime=1757779200000&endTime=1760457599999&direction=NEXT' \--header 'accept: */*' \--header 'Content-Type: application/json' \--header 'validate-algorithms: HmacSHA256' \--header 'validate-recvwindow: 60000' \--header 'validate-appkey: xxxxxxxxxx' \--header 'validate-timestamp: xxxxxxxxxx' \--header 'validate-signature: xxxxxxxxxx'
```

### Notes[​](#notes "Direct link to Notes")

This endpoint retrieves trade records. Supports filtering by trading pair, business type, side, order type, time range, and pagination.

### Response Example[​](#response-example "Direct link to Response Example")

Response

```
{  "rc": 0,  "mc": "string",  "ma": [{}],  "result": {    "hasPrev": true,    "hasNext": true,    "items": [      {        "symbol": "BTC_USDT", // Trading pair        "tradeId": "6316559590087222001", // Trade ID        "orderId": "6216559590087220004", // Order ID        "orderSide": "BUY", // Order direction        "orderType": "LIMIT", // Order type        "bizType": "SPOT", // Business type        "time": 1655958915583, // Trade time        "price": "40000", // Trade price        "quantity": "1.2", // Trade quantity        "quoteQty": "48000", // Trade amount        "baseCurrency": "BTC", // Base currency        "quoteCurrency": "USDT", // Quote currency        "takerMaker": "taker", // Taker/Maker        "deductType": "COUPON", // Fee deduction type: COUPON / PLATFORM_CURRENCY / null        "deductFee": "0.003", // Deducted fee amount if using coupon; otherwise null        "fee": "0.5", // Fee amount (or platform currency amount if deducted)        "feeCurrency": "USDT", // Fee currency        "couponAmount": "0.002", // Coupon amount if used; otherwise null        "couponCurrency": "usdt" // Coupon currency if used; otherwise null      }    ]  }}
```

[Edit this page](https://github.com/facebook/docusaurus/edit/main/website/docs/spot/Trade/tradeGet.mdx)