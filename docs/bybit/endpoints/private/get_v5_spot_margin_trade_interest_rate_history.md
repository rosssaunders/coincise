# GET /v5/spot-margin-trade/interest-rate-history

**Source:**
[Get Historical Interest Rate](https://bybit-exchange.github.io/docs/v5/spot-margin-uta/historical-interest)

## Authentication

Required (Private Endpoint)

- [](/docs/)
- Spot Margin Trade (UTA)
- Get Historical Interest Rate

On this page

# Get Historical Interest Rate

You can query up to six months borrowing interest rate of Margin trading.

info

- Need authentication, the api key needs "Spot" permission
- Only supports Unified account
- It is public data, i.e., different users get the same historical interest rate
  for the same VIP/Pro

### HTTP Request[​](#http-request "Direct link to heading")

GET `/v5/spot-margin-trade/interest-rate-history`

### Request Parameters[​](#request-parameters "Direct link to heading")

| Parameter                                                 | Required | Type    | Comments                                                                                  |
| :-------------------------------------------------------- | :------- | :------ | ----------------------------------------------------------------------------------------- |
| currency                                                  | **true** | string  | Coin name, uppercase only                                                                 |
| [vipLevel](/docs/v5/enum#viplevel)                        | false    | string  | Vip level- Please note that "No VIP" should be passed like "No%20VIP" in the query string |
| - If not passed, it returns your account's VIP level data |
| startTime                                                 | false    | integer | The start timestamp (ms)- Either both time parameters are passed or neither is passed.    |

- Returns 7 days data when both are not passed
- Supports up to 30 days interval when both are passed | | endTime | false |
  integer | The end timestamp (ms) |

### Response Parameters[​](#response-parameters "Direct link to heading")

| Parameter           | Type           | Comments              |
| :------------------ | :------------- | --------------------- |
| list                | array<object\> |                       |
| \> timestamp        | long           | timestamp             |
| \> currency         | string         | coin name             |
| \> hourlyBorrowRate | string         | Hourly borrowing rate |
| \> vipLevel         | string         | VIP/Pro level         |

### Request Example[​](#request-example "Direct link to heading")

- HTTP
- Python

```
GET /v5/spot-margin-trade/interest-rate-history?currency=USDC&vipLevel=No%20VIP&startTime=1721458800000&endTime=1721469600000 HTTP/1.1Host: api-testnet.bybit.comX-BAPI-SIGN: XXXXXXX-BAPI-API-KEY: xxxxxxxxxxxxxxxxxxX-BAPI-TIMESTAMP: 1721891663064X-BAPI-RECV-WINDOW: 5000
```

```
from pybit.unified_trading import HTTPsession = HTTP(    testnet=True,    api_key="xxxxxxxxxxxxxxxxxx",    api_secret="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",)print(session.spot_margin_trade_get_historical_interest_rate(    currency="BTC"))
```

### Response Example[​](#response-example "Direct link to heading")

```
{    "retCode": 0,    "retMsg": "OK",    "result": {        "list": [            {                "timestamp": 1721469600000,                "currency": "USDC",                "hourlyBorrowRate": "0.000014621596",                "vipLevel": "No VIP"            },            {                "timestamp": 1721466000000,                "currency": "USDC",                "hourlyBorrowRate": "0.000014621596",                "vipLevel": "No VIP"            },            {                "timestamp": 1721462400000,                "currency": "USDC",                "hourlyBorrowRate": "0.000014621596",                "vipLevel": "No VIP"            },            {                "timestamp": 1721458800000,                "currency": "USDC",                "hourlyBorrowRate": "0.000014621596",                "vipLevel": "No VIP"            }        ]    },    "retExtInfo": "{}",    "time": 1721899048991}
```

[

Previous

Get Tiered Collateral Ratio

](/docs/v5/spot-margin-uta/tier-collateral-ratio)[

Next

Toggle Margin Trade

](/docs/v5/spot-margin-uta/switch-mode)

- [HTTP Request](#http-request)
- [Request Parameters](#request-parameters)
- [Response Parameters](#response-parameters)
- [Request Example](#request-example)
- [Response Example](#response-example)
