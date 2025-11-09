# GET Get currency information

Source:
[https://doc.xt.com/docs/spot/Balance/GetCurrencies](https://doc.xt.com/docs/spot/Balance/GetCurrencies)

# Get currency information

### Description[​](#description "Direct link to Description")

**GET** `/v4/public/currencies`

---

### Parameters[​](#parameters "Direct link to Parameters")

| Name | Type   | Mandatory | Default | Description                    | Ranges |
| ---- | ------ | --------- | ------- | ------------------------------ | ------ |
| —    | string | No        | N/A     | No request parameters required |        |

---

### Response Example[​](#response-example "Direct link to Response Example")

```
{  "rc": 0,  "mc": "string",  "ma": [{}],  "result": [    {      "id": 11, // currency id      "currency": "usdt", // currency symbol      "fullName": "usdt", // full currency name      "logo": null, // currency logo      "cmcLink": null, // CoinMarketCap link      "weight": 100, // weight / ranking      "maxPrecision": 6, // maximum precision      "depositStatus": 1, // deposit status (0 closed, 1 open)      "withdrawStatus": 1, // withdrawal status (0 closed, 1 open)      "convertEnabled": 1, // small asset conversion (0 closed, 1 open)      "transferEnabled": 1 // transfer switch (0 closed, 1 open)    }  ]}
```

[Edit this page](https://github.com/facebook/docusaurus/edit/main/website/docs/spot/Balance/currenciesGet.mdx)
