# GET Full ticker

Source:
[https://doc.xt.com/docs/spot/Market/FullTicker](https://doc.xt.com/docs/spot/Market/FullTicker)

# Full ticker

### Description[​](#description "Direct link to Description")

**GET** `/v4/public/ticker`

---

### Limit Rule[​](#limit-rule "Direct link to Limit Rule")

1.  Single symbol: 10 requests/second/ip
2.  Multiple symbols: 10 requests/second/ip

---

### Parameters[​](#parameters "Direct link to Parameters")

| Name    | Type   | Mandatory | Default | Description                                                                           | Ranges |
| ------- | ------ | --------- | ------- | ------------------------------------------------------------------------------------- | ------ |
| symbol  | string | No        | N/A     | Trading pair, e.g. `btc_usdt`                                                         | \-     |
| symbols | array  | No        | N/A     | Collection of trading pairs. Priority is higher than symbol, e.g. `btc_usdt,eth_usdt` | \-     |
| tags    | string | No        | N/A     | Set of tags, separated by commas. Currently only supports `spot`                      | \-     |

---

### Request Example[​](#request-example "Direct link to Request Example")

Request

```
  curl --location --request GET 'https://sapi.xt.com/v4/public/ticker?symbol=XT_USDT' \    --header 'accept: */*' \    --header 'Content-Type: application/json' \
```

### Response Example[​](#response-example "Direct link to Response Example")

Response

```
{
  "rc": 0,
  "mc": "SUCCESS",
  "ma": [],
  "result": [
    {
      "s": "btc_usdt",          //symbol
      "t": 1662444879425,       //update time
      "cv": "0.00",             //change value
      "cr": "0.0000",           //change rate
      "o": "200.00",            //open
      "l": "200.00",            //low
      "h": "200.00",            //high
      "c": "200.00",            //close
      "q": "0.002",             //quantity
      "v": "0.40",              //volume
      "ap": null,               //asks price(sell one price)
      "aq": null,               //asks qty(sell one quantity)
      "bp": null,               //bids price(buy one price)
      "bq": null                //bids qty(buy one quantity)
    }
  ]
}
```

[Edit this page](https://github.com/facebook/docusaurus/edit/main/website/docs/spot/Market/allTicker.mdx)
