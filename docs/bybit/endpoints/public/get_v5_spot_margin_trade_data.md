# GET /v5/spot-margin-trade/data

**Source:**
[Get VIP Margin Data](https://bybit-exchange.github.io/docs/v5/spot-margin-uta/vip-margin)

## Authentication

Not Required (Public Endpoint)

- [](/docs/)
- Spot Margin Trade (UTA)
- Get VIP Margin Data

On this page

# Get VIP Margin Data

This margin data is for **Unified account** in particular.

info

Does not need authentication.

### HTTP Request[​](#http-request "Direct link to heading")

GET `/v5/spot-margin-trade/data`

### Request Parameters[​](#request-parameters "Direct link to heading")

| Parameter                          | Required | Type   | Comments                  |
| :--------------------------------- | :------- | :----- | ------------------------- |
| [vipLevel](/docs/v5/enum#viplevel) | false    | string | Vip level                 |
| currency                           | false    | string | Coin name, uppercase only |

### Response Parameters[​](#response-parameters "Direct link to heading")

| Parameter              | Type    | Comments                                                                                                                                                                                                         |
| :--------------------- | :------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| vipCoinList            | array   | Object                                                                                                                                                                                                           |
| \> list                | array   | Object                                                                                                                                                                                                           |
| \>> borrowable         | boolean | Whether it is allowed to be borrowed                                                                                                                                                                             |
| \>> collateralRatio    | string  | Due to the new Tiered Collateral value logic, this field will no longer be accurate starting on February 19, 2025. Please refer to [Get Tiered Collateral Ratio](/docs/v5/spot-margin-uta/tier-collateral-ratio) |
| \>> currency           | string  | Coin name                                                                                                                                                                                                        |
| \>> hourlyBorrowRate   | string  | Borrow interest rate per hour                                                                                                                                                                                    |
| \>> liquidationOrder   | string  | Liquidation order                                                                                                                                                                                                |
| \>> marginCollateral   | boolean | Whether it can be used as a margin collateral currency                                                                                                                                                           |
| \>> maxBorrowingAmount | string  | Max borrow amount                                                                                                                                                                                                |
| \> vipLevel            | string  | Vip level                                                                                                                                                                                                        |

[RUN >>](/docs/api-explorer/v5/spot-margin-uta/vip-margin)

---

### Request Example[​](#request-example "Direct link to heading")

- HTTP
- Python
- Node.js

```
GET /v5/spot-margin-trade/data?vipLevel=No VIP&currency=BTC HTTP/1.1Host: api-testnet.bybit.com
```

```
from pybit.unified_trading import HTTPsession = HTTP(    testnet=True,    api_key="xxxxxxxxxxxxxxxxxx",    api_secret="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",)print(session.spot_margin_trade_get_vip_margin_data())
```

```
const { RestClientV5 } = require('bybit-api');const client = new RestClientV5({  testnet: true,  key: 'xxxxxxxxxxxxxxxxxx',  secret: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',});client  .getVIPMarginData({    vipLevel: 'No VIP',    currency: 'BTC',  })  .then((response) => {    console.log(response);  })  .catch((error) => {    console.error(error);  });
```

### Response Example[​](#response-example "Direct link to heading")

```
{    "retCode": 0,    "retMsg": "success",    "result": {        "vipCoinList": [            {                "list": [                    {                        "borrowable": true,                        "collateralRatio": "0.95",                        "currency": "BTC",                        "hourlyBorrowRate": "0.0000015021220000",                        "liquidationOrder": "11",                        "marginCollateral": true,                        "maxBorrowingAmount": "3"                    }                ],                "vipLevel": "No VIP"            }        ]    }}
```

[

Previous

Get Affiliate User Info

](/docs/v5/affiliate/affiliate-info)[

Next

Get Tiered Collateral Ratio

](/docs/v5/spot-margin-uta/tier-collateral-ratio)

- [HTTP Request](#http-request)
- [Request Parameters](#request-parameters)
- [Response Parameters](#response-parameters)
- [Request Example](#request-example)
- [Response Example](#response-example)
