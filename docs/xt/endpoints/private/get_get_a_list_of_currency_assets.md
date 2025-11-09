# GET Get a list of currency assets

Source: [https://doc.xt.com/docs/spot/Balance/GetBalances](https://doc.xt.com/docs/spot/Balance/GetBalances)

# Get a list of currency assets

### Description[​](#description "Direct link to Description")

**GET** `/v4/balances`

* * *

### Limit Rule[​](#limit-rule "Direct link to Limit Rule")

-   10 requests/second/apikey

* * *

### Parameters[​](#parameters "Direct link to Parameters")

| Name | Type | Mandatory | Default | Description | Ranges |
| --- | --- | --- | --- | --- | --- |
| currencies | string | No | N/A | List of currencies, comma separated, e.g. `usdt,btc` |  |

* * *

### Request Example[​](#request-example "Direct link to Request Example")

Request

```
  curl --location --request GET 'https://sapi.xt.com/v4/balances' \    --header 'accept: */*' \    --header 'Content-Type: application/json' \    --header 'validate-algorithms: HmacSHA256' \    --header 'validate-recvwindow: 60000' \    --header 'validate-appkey: xxxxxxxxxx' \    --header 'validate-timestamp: xxxxxxxxxx' \    --header 'validate-signature: xxxxxxxxxx' \
```

### Response Example[​](#response-example "Direct link to Response Example")

```
{  "rc": 0,  "mc": "string",  "ma": [{}],  "result": {    "totalBtcAmount": 0,    "assets": [      {        "currency": "string", // currency        "currencyId": 0, // currency ID        "frozenAmount": 0, // frozen amount        "availableAmount": 0, // available amount        "totalAmount": 0, // total amount        "convertBtcAmount": 0 // converted BTC amount      }    ]  }}
```

[Edit this page](https://github.com/facebook/docusaurus/edit/main/website/docs/spot/Balance/balancesGet.mdx)