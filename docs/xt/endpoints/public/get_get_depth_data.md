# GET Get depth data

Source: [https://doc.xt.com/docs/spot/Market/GetDepthData](https://doc.xt.com/docs/spot/Market/GetDepthData)

# Get depth data

**Type:** GET **Description:** `/v4/public/depth`

### Parameters[​](#parameters "Direct link to Parameters")

| name | type | mandatory | default | description | ranges |
| --- | --- | --- | --- | --- | --- |
| symbol | string | true |  | trading pair eg:btc\_usdt |  |
| limit | number | false | 100 | minimum number of queries is 100 | 1~500 |

#### **Limit Flow Rules**[​](#limit-flow-rules "Direct link to limit-flow-rules")

10/s/ip

### Request Example[​](#request-example "Direct link to Request Example")

Request

```
  curl --location --request GET 'https://sapi.xt.com/v4/public/depth?symbol=XT_USDT&limit=100' \    --header 'accept: */*' \    --header 'Content-Type: application/json' \
```

### Response Example[​](#response-example "Direct link to Response Example")

Response

```
{  "rc": 0,  "mc": "SUCCESS",  "ma": [],  "result": {    "timestamp": 1662445330524, // timestamp    "lastUpdateId": 137333589606963580, // last update ID    "bids": [      ["200.0000", "0.996000"],      ["100.0000", "0.001000"],      ["20.0000", "10.000000"]    ], // bids [price, order quantity]    "asks": [] // asks [price, order quantity]  }}
```

[Edit this page](https://github.com/facebook/docusaurus/edit/main/website/docs/spot/Market/depth.mdx)