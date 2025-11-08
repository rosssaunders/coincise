# GET Get K-line data

Source: [https://doc.xt.com/docs/spot/Market/GetKlineData](https://doc.xt.com/docs/spot/Market/GetKlineData)

# Get K-line data

**Type:** get  
**Description:** `/v4/public/kline`

### Parameters[​](#parameters "Direct link to Parameters")

| name | type | mandatory | default | description | ranges |
| --- | --- | --- | --- | --- | --- |
| symbol | string | true |  | trading pair eg:btc\_usdt |  |
| interval | string | true |  | K line type,  
eg:1m | `[1m;3m;5m;15m;30m;1h;2h;4h;6h;8h;12h;1d;3d;1w;1M]` |
| startTime | number | false |  | start timestamp |  |
| endTime | number | false |  | end timestamp |  |
| limit | number | false | '100' |  | 1~1000 |

#### **Limit Flow Rules**[​](#limit-flow-rules "Direct link to limit-flow-rules")

10/s/ip

### Request Example[​](#request-example "Direct link to Request Example")

Request

```
  curl --location --request GET 'https://sapi.xt.com/v4/public/kline?symbol=XT_USDT&interval=3m&startTime=xxxxxxxxx&endTime=xxxxxxxxx&limit=100' \    --header 'accept: */*' \    --header 'Content-Type: application/json' \
```

### Response[​](#response "Direct link to Response")

Response

```
{  "rc": 0,  "mc": "string",  "ma": [{}],  "result": [    {      "t": 1662601014832, //open time      "o": "30000", //open price      "c": "32000", //close price      "h": "35000", //highest price      "l": "25000", //lowest price      "q": "512", //transaction quantity      "v": "15360000" //transaction volume    }  ]}
```

[Edit this page](https://github.com/facebook/docusaurus/edit/main/website/docs/spot/Market/kline.mdx)