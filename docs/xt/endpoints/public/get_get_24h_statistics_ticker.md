# GET Get 24h statistics ticker

Source: [https://doc.xt.com/docs/spot/Market/Get24hStatisticsTicker](https://doc.xt.com/docs/spot/Market/Get24hStatisticsTicker)

# Get 24h statistics ticker

**Type:** GET **Description:** `/v4/public/ticker/24h`

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
  curl --location --request GET 'https://sapi.xt.com/v4/public/ticker/24h?symbol=XT_USDT' \    --header 'accept: */*' \    --header 'Content-Type: application/json' \
```

### Response Example[​](#response-example "Direct link to Response Example")

Response

```
{  "rc": 0,  "mc": "SUCCESS",  "ma": [],  "result": [    {<<<<<<< Updated upstream      "s": "btc_usdt", // trading pair      "t": 1661856036925, // update time      "cv": "0.0000", // price change      "cr": "0.00", // price change percentage      "o": "9000.0000", // opening price (first trade)      "l": "9000.0000", // lowest price      "h": "9000.0000", // highest price      "c": "9000.0000", // closing price (last trade)      "q": "0.0136", // trading volume      "v": "122.9940" // trading value=======      "s": "btc_usdt",      //symbol      "t": 1661856036925,   //time      "cv": "0.0000",       //price change value      "cr": "0.00",         //price change rate      "o": "9000.0000",     //open price      "l": "9000.0000",     //lowest price      "h": "9000.0000",     //highest price      "c": "9000.0000",     //close price      "q": "0.0136",        //transaction quantity      "v": "122.9940"       //transaction volume>>>>>>> Stashed changes    }  ]}
```

[Edit this page](https://github.com/facebook/docusaurus/edit/main/website/docs/spot/Market/ticker24h.mdx)