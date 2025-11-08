# GET Get a single currency asset

Source: [https://doc.xt.com/docs/spot/Balance/GetSingleCurrencyAsset](https://doc.xt.com/docs/spot/Balance/GetSingleCurrencyAsset)

# Get a single currency asset

### Description[​](#description "Direct link to Description")

**GET** `/v4/balance`

* * *

### Parameters[​](#parameters "Direct link to Parameters")

| Name | Type | Mandatory | Default | Description | Ranges |
| --- | --- | --- | --- | --- | --- |
| currency | string | Yes | N/A | Example: usdt | \- |

* * *

### Code Example[​](#code-example "Direct link to Code Example")

#### Java[​](#java "Direct link to Java")

```
public String getBalance(){    // Your request logic here}
```

#### Python[​](#python "Direct link to Python")

```
# Your request logic here
```

* * *

### Response Example[​](#response-example "Direct link to Response Example")

```
{  "rc": 0,  "mc": "string",  "ma": [{}],  "result": {    "currency": "usdt",    "currencyId": 0,    "frozenAmount": 0,    "availableAmount": 0,    "totalAmount": 0,    "convertBtcAmount": 0  }}
```

[Edit this page](https://github.com/facebook/docusaurus/edit/main/website/docs/spot/Balance/balanceGet.mdx)