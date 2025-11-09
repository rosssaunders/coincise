# GET Query historical transaction list

Source:
[https://doc.xt.com/docs/spot/Market/QueryHistoricalTransactions](https://doc.xt.com/docs/spot/Market/QueryHistoricalTransactions)

# Query historical transaction list

**Type:** GET **Description:** `/v4/public/trade/history`

### Parameters[​](#parameters "Direct link to Parameters")

| name      | type   | mandatory | default | description                        | ranges                                 |
| --------- | ------ | --------- | ------- | ---------------------------------- | -------------------------------------- |
| symbol    | string | true      |         | trading pair                       |                                        |
| limit     | number | false     | 200     |                                    | 1~1000                                 |
| direction | string | true      |         | query direction                    | PREV - previous page, NEXT - next page |
| fromId    | number | false     |         | Start ID, e.g. 6216559590087220004 |                                        |

#### **Limit Flow Rules**[​](#limit-flow-rules "Direct link to limit-flow-rules")

10/s/ip

### Request Example[​](#request-example "Direct link to Request Example")

Request

```
  curl --location --request GET 'https://sapi.xt.com/v4/public/trade/history?symbol=XT_USDT&limit=200&direction=NEXT' \    --header 'accept: */*' \    --header 'Content-Type: application/json' \
```

### Response Example[​](#response-example "Direct link to Response Example")

Response

```
{  "rc": 0,  "mc": "string",  "ma": [{}],  "result": [    {      "i": 0, // ID      "t": 0, // trade time      "p": "string", // trade price      "q": "string", // trade quantity      "v": "string", // trade amount      "b": true // whether the buyer is the maker    }  ]}
```

[Edit this page](https://github.com/facebook/docusaurus/edit/main/website/docs/spot/Market/tradeHistory.mdx)
