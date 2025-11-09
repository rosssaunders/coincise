# GET Query historical orders

Source: [https://doc.xt.com/docs/spot/Order/QueryHistoricalOrders](https://doc.xt.com/docs/spot/Order/QueryHistoricalOrders)

# Query historical orders

**Type** GET

**Description:** `/v4/history-order`

* * *

### Parameters[​](#parameters "Direct link to Parameters")

| Name | Type | Mandatory | Default | Description | Ranges |
| --- | --- | --- | --- | --- | --- |
| symbol | string | No | N/A | Trading pair, if not filled in, represents all | — |
| bizType | string | No | N/A | Business type | SPOT, LEVER |
| side | string | No | N/A | Order side | BUY, SELL |
| type | string | No | N/A | Order type | LIMIT, MARKET |
| state | string | No | N/A | Order [state](/docs/spot/Access Description/PublicModule#order-state) | PARTIALLY\_FILLED, FILLED, CANCELED, REJECTED, EXPIRED |
| fromId | number | No | N/A | Start ID | — |
| direction | string | No | N/A | Query direction | PREV, NEXT |
| limit | number | No | 20 | Limit number (max 100) | — |
| startTime | number | No | N/A | Start time (e.g. 1657682804112) | — |
| endTime | number | No | N/A | End time | — |
| hiddenCanceled | bool | No | N/A | Whether to hide canceled orders | — |

* * *

### Limit Flow Rules[​](#limit-flow-rules "Direct link to Limit Flow Rules")

-   10/s/apikey

### Parameters Example[​](#parameters-example "Direct link to Parameters Example")

```
curl --location --request GET 'https://sapi.xt.com/v4/history-order?symbol=XT_USDT&direction=NEXT&limit=10&startTime=xxxxxxxx&endTime=xxxxxxxx' \--header 'accept: */*' \--header 'Content-Type: application/json' \--header 'validate-algorithms: HmacSHA256' \--header 'validate-recvwindow: 60000' \--header 'validate-appkey: xxxxxxxxxx' \--header 'validate-timestamp: xxxxxxxxxx' \--header 'validate-signature: xxxxxxxxxx'
```

* * *

### Response Example[​](#response-example "Direct link to Response Example")

Response

```
{  "rc": 0,  "mc": "string",  "ma": [{}],  "result": {    "hasPrev": true,    "hasNext": true,    "items": [      // For field information, refer to the Get Single Order API      {        "symbol": "BTC_USDT",        "orderId": "6216559590087220004",        "clientOrderId": "16559590087220001",        "baseCurrency": "string",        "quoteCurrency": "string",        "side": "BUY",        "type": "LIMIT",        "timeInForce": "GTC",        "price": "40000",        "origQty": "2",        "origQuoteQty": "48000",        "executedQty": "1.2",        "leavingQty": "string",        "tradeBase": "2",        "tradeQuote": "48000",        "avgPrice": "42350",        "fee": "string",        "feeCurrency": "string",        "state": "NEW",        "time": 1655958915583,        "ip": "127.0.0.1",        "updatedTime": 1655958915583      }    ]  }}
```

[Edit this page](https://github.com/facebook/docusaurus/edit/main/website/docs/spot/Order/historyOrderGet.mdx)