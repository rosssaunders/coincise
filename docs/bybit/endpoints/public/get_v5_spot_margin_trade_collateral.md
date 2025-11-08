# GET /v5/spot-margin-trade/collateral

**Source:**
[Get Tiered Collateral Ratio](https://bybit-exchange.github.io/docs/v5/spot-margin-uta/tier-collateral-ratio)

## Authentication

Not Required (Public Endpoint)

- [](/docs/)
- Spot Margin Trade (UTA)
- Get Tiered Collateral Ratio

On this page

# Get Tiered Collateral Ratio

UTA loan tiered collateral ratio

info

Does not need authentication.

### HTTP Request[​](#http-request "Direct link to heading")

GET `/v5/spot-margin-trade/collateral`

### Request Parameters[​](#request-parameters "Direct link to heading")

| Parameter | Required | Type   | Comments                  |
| :-------- | :------- | :----- | ------------------------- |
| currency  | false    | string | Coin name, uppercase only |

### Response Parameters[​](#response-parameters "Direct link to heading")

| Parameter              | Type   | Comments                                                               |
| :--------------------- | :----- | ---------------------------------------------------------------------- |
| list                   | array  | Object                                                                 |
| \> currency            | string | Coin name                                                              |
| \> collateralRatioList | array  | Object                                                                 |
| \>> maxQty             | string | Upper limit(in coin) of the tiered range, `""` means positive infinity |
| \>> minQty             | string | lower limit(in coin) of the tiered range                               |
| \>> collateralRatio    | string | Collateral ratio                                                       |

### Request Example[​](#request-example "Direct link to heading")

- HTTP
- Python
- Node.js

```
GET /v5/spot-margin-trade/collateral?currency=BTC HTTP/1.1Host: api-testnet.bybit.com
```

```

```

```

```

### Response Example[​](#response-example "Direct link to heading")

```
{    "retCode": 0,    "retMsg": "OK",    "result": {        "list": [            {                "currency": "BTC",                "collateralRatioList": [                    {                        "minQty": "0",                        "maxQty": "1000000",                        "collateralRatio": "0.85"                    },                    {                        "minQty": "1000000",                        "maxQty": "",                        "collateralRatio": "0"                    }                ]            }        ]    },    "retExtInfo": "{}",    "time": 1739848984945}
```

[

Previous

Get VIP Margin Data

](/docs/v5/spot-margin-uta/vip-margin)[

Next

Get Historical Interest Rate

](/docs/v5/spot-margin-uta/historical-interest)

- [HTTP Request](#http-request)
- [Request Parameters](#request-parameters)
- [Response Parameters](#response-parameters)
- [Request Example](#request-example)
- [Response Example](#response-example)
