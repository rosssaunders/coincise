# POST / Adjust margin balance

Source:
[https://www.okx.com/docs-v5/en/#order-book-trading-signal-bot-trading-post-adjust-margin-balance](https://www.okx.com/docs-v5/en/#order-book-trading-signal-bot-trading-post-adjust-margin-balance)

### POST / Adjust margin balance

#### Rate Limit: 20 requests per 2 seconds

#### Rate limit rule: User ID

#### Permission: Trade

#### HTTP Request

`POST /api/v5/tradingBot/signal/margin-balance`

#### Request Parameters

| Parameter                              | Type    | Required | Description                                                                |
| -------------------------------------- | ------- | -------- | -------------------------------------------------------------------------- |
| algoId                                 | String  | Yes      | Algo ID                                                                    |
| type                                   | String  | Yes      | Adjust margin balance type                                                 |
| `add` `reduce`                         |
| amt                                    | String  | Yes      | Adjust margin balance amount                                               |
| Either `amt` or `percent` is required. |
| allowReinvest                          | Boolean | No       | Whether to reinvest with newly added margin. The default value is `false`. |

`false`:it will be used as passive margin to prevent liquidation and will not be
used as active investment  
`true`:the margin added here will furthermore be accounted for in calculations
of your total investment amount, and furthermore your order size。  
Only applicable to your signal comes in with an “investmentType” of
“percentage_investment” |

#### Response Parameters

| **Parameter** | **Type** | **Description** |
| ------------- | -------- | --------------- |
| algoId        | String   | Algo ID         |
