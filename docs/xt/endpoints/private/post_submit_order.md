# POST Submit order

Source: [https://doc.xt.com/docs/spot/Order/SubmitOrder](https://doc.xt.com/docs/spot/Order/SubmitOrder)

# Submit order

**Type:** post **Description:** `/v4/order`

### Parameters[​](#parameters "Direct link to Parameters")

| name | type | mandatory | default | description | ranges |
| --- | --- | --- | --- | --- | --- |
| symbol | string | true |  |  |  |
| clientOrderId | string | false |  | Pattern: ^\[a-zA-Z0-9\_\]`{4,22}` |  |
| $ |  |  |  |  |  |
| side | string | true |  | "BUY,SELL" |  |
| type | string | true |  | "order type:LIMIT,MARKET" |  |
| timeInForce | string | true |  | effective way:GTC, FOK, IOC, GTX |  |
| bizType | string | true |  | "SPOT, LEVER" |  |
| price | number | false |  | price. Required if it is the LIMIT price; blank if it is the MARKET price |  |
| quantity | number | false |  | quantity. Required if it is the LIMIT price or the order is placed at the market price by quantity |  |
| quoteQty | number | false |  | amount. Required if it is the LIMIT price or the order is the market price when placing an order by amount |  |
| nftId | string | false |  | nft id |  |

#### Remark[​](#remark "Direct link to Remark")

Create a BUY order based on market price, quantity must be null, quoteQty required. Create a SELL order based on market price, quoteQty must be null, quantity required.

#### Limit Flow Rules[​](#limit-flow-rules "Direct link to Limit Flow Rules")

20/s/apikey

### Parameters Example[​](#parameters-example "Direct link to Parameters Example")

```
curl --location --request POST 'https://sapi.xt.com/v4/order' \--header 'accept: */*' \--header 'Content-Type: application/json' \--header 'validate-algorithms: HmacSHA256' \--header 'validate-recvwindow: 60000' \--header 'validate-appkey: xxxxxxxxxx' \--header 'validate-timestamp: xxxxxxxxxx' \--header 'validate-signature: xxxxxxxxxx' \--data '{    "symbol": "XT_USDT",    "side": "BUY",    "type": "LIMIT",    "timeInForce": "GTC",    "bizType": "SPOT",    "price": 10,    "quantity": 1}'
```

### Response Example[​](#response-example "Direct link to Response Example")

```
{  "rc": 0,  "mc": "string",  "ma": [{}],  "result": {    "orderId": "6216559590087220004",    "ip": "127.0.0.1" // ip address  }}
```

[Edit this page](https://github.com/facebook/docusaurus/edit/main/website/docs/spot/Order/orderPost.mdx)