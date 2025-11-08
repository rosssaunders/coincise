# GET /v5/earn/position

**Source:**
[Get Staked Position](https://bybit-exchange.github.io/docs/v5/earn/position)

## Authentication

Required (Private Endpoint)

- [](/docs/)
- Earn
- Get Staked Position

On this page

# Get Staked Position

info

API key needs "Earn" permission

note

For Flexible Saving, fully redeemed position is also returned in the response
For Onchain, only active position will be returned in the response

### HTTP Request[​](#http-request "Direct link to heading")

GET `/v5/earn/position`

### Request Parameters[​](#request-parameters "Direct link to heading")

| Parameter | Required | Type   | Comments                   |
| :-------- | :------- | :----- | -------------------------- |
| category  | **true** | string | `FlexibleSaving`,`OnChain` |
| productId | false    | string | Product ID                 |
| coin      | false    | string | Coin name                  |

### Response Parameters[​](#response-parameters "Direct link to heading")

| Parameter                          | Type   | Comments                                                                                                                                                                                                                                                |
| :--------------------------------- | :----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| list                               | array  | Object                                                                                                                                                                                                                                                  |
| \> coin                            | string | Coin name                                                                                                                                                                                                                                               |
| \> productId                       | string | Product ID                                                                                                                                                                                                                                              |
| \> amount                          | string | Total staked amount                                                                                                                                                                                                                                     |
| \> totalPnl                        | string | Return the profit of the current position. Only has value in Onchain non-LST mode                                                                                                                                                                       |
| \> claimableYield                  | string | Yield accrues on an hourly basis and is distributed at 00:30 UTC daily. If you unstake your assets before yield distribution, any undistributed yield will be credited to your account along with your principal. Onchain products do not return values |
| \> id                              | string | Position Id. Only for Onchain                                                                                                                                                                                                                           |
| \> status                          | string | `Processing`,`Active`. Only for Onchain                                                                                                                                                                                                                 |
| \> orderId                         | string | Order Id. Only for Onchain                                                                                                                                                                                                                              |
| \> estimateRedeemTime              | string | Estimate redeem time, in milliseconds. Only for Onchain                                                                                                                                                                                                 |
| \> estimateStakeTime               | string | Estimate stake time, in milliseconds. Only for Onchain                                                                                                                                                                                                  |
| \> estimateInterestCalculationTime | string | Estimated Interest accrual time, in milliseconds. Only for Onchain                                                                                                                                                                                      |
| \> settlementTime                  | string | Settlement time, in milliseconds. Only has value for Onchain `Fixed` product                                                                                                                                                                            |

### Request Example[​](#request-example "Direct link to heading")

- HTTP
- Python
- Node.js

```
GET /v5/earn/position?category=FlexibleSaving&coin=USDT HTTP/1.1Host: api-testnet.bybit.comX-BAPI-SIGN: XXXXXXX-BAPI-API-KEY: xxxxxxxxxxxxxxxxxxX-BAPI-TIMESTAMP: 1739944576277X-BAPI-RECV-WINDOW: 5000Content-Type: application/json
```

```
from pybit.unified_trading import HTTPsession = HTTP(    testnet=True,    api_key="xxxxxxxxxxxxxxxxxx",    api_secret="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",)print(session.get_staked_position(    category="FlexibleSaving",    coin="USDT",))
```

```

```

### Response Example[​](#response-example "Direct link to heading")

```
{    "retCode": 0,    "retMsg": "",    "result": {        "list": [            {                "coin": "BTC",                "productId": "8",                "amount": "0.1",                "totalPnl": "0.000027397260273973",                "claimableYield": "0",                "id": "326",                "status": "Active",                "orderId": "1a5a8945-e042-4dd5-a93f-c0f0577377ad",                "estimateRedeemTime": "",                "estimateStakeTime": "",                "estimateInterestCalculationTime": "1744243200000",                "settlementTime": "1744675200000"            }        ]    },    "retExtInfo": {},    "time": 1739944577575}
```

[

Previous

Get Stake/Redeem Order History

](/docs/v5/earn/order-history)[

Next

Get Yield History

](/docs/v5/earn/yield-history)

- [HTTP Request](#http-request)
- [Request Parameters](#request-parameters)
- [Response Parameters](#response-parameters)
- [Request Example](#request-example)
- [Response Example](#response-example)
