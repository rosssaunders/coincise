# GET Get latest prices ticker

Source: [https://doc.xt.com/docs/spot/Market/GetLatestPricesTicker](https://doc.xt.com/docs/spot/Market/GetLatestPricesTicker)

# Get latest prices ticker

**Type:** GET **Description:** `/v4/public/ticker/price`

### Parameters[​](#parameters "Direct link to Parameters")

| name | type | mandatory | default | description | ranges |
| --- | --- | --- | --- | --- | --- |
| symbol | string | false |  | trading pair eg:btc\_usdt |  |
| symbols | array | false |  | Collection of trading pairs. Priority is higher than symbol. eg: btc\_usdt,eth\_usdt |  |
| tags | string | false |  | Set of tags, separated by commas, currently only supports spot |  |

#### **Limit Flow Rules**[​](#limit-flow-rules "Direct link to limit-flow-rules")

1.  single symbol: `10/s/ip`
2.  multiple symbols: `10/s/ip`

### Request Example[​](#request-example "Direct link to Request Example")

Request

```
  curl --location --request GET 'https://sapi.xt.com/v4/public/ticker/price?symbol=XT_USDT' \    --header 'accept: */*' \    --header 'Content-Type: application/json' \
```

### Response Example[​](#response-example "Direct link to Response Example")

Response

```
{  "rc": 0,  "mc": "SUCCESS",  "ma": [],  "result": [    {      "s": "btc_usdt", // trading pair       "t": 1661856036925, // timestamp      "p": "9000.0000" // price    }  ]}
```

[Edit this page](https://github.com/facebook/docusaurus/edit/main/website/docs/spot/Market/tickerPrice.mdx)