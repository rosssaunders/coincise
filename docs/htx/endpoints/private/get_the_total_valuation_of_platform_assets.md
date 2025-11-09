# GET The Total Valuation of Platform Assets

**Source:**
[Get The Total Valuation of Platform Assets](https://www.htx.com/en-us/opend/newApiPages/?id=7ec5058c-7773-11ed-9966-0242ac110003)

**Category:** Account

## Authentication

Required (Private Endpoint)

### /v2/account/valuation (Get The Total Valuation of Platform Assets)

Request type: GET

Signature verification: Yes

Interface permission: Read

Rate Limit: 3/1s

Interface description: Obtain the total asset valuation of the platform account
according to the BTC or legal currency denominated unit.

#### Request Address

| Environment                         | Address                   |
| ----------------------------------- | ------------------------- |
| Online                              | https://api.huobi.pro     |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter         | Data Type | Required | Description                                                                         | Value Range | Default Value |
| ----------------- | --------- | -------- | ----------------------------------------------------------------------------------- | ----------- | ------------- |
| accountType       | string    | false    | account type, more to see "Account type data dictionary"                            |             |               |
| valuationCurrency | string    | false    | If not filled, the default is BTC (only BTC supported now, and must be capitalized) |             |               |

#### Response Parameter

| Parameter                      | Data Type | Required | Description                                                                  | Value Range                                                                                                                                                                              |
| ------------------------------ | --------- | -------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| code                           | int       | false    | status code                                                                  |                                                                                                                                                                                          |
| DATA_START                     | object    | false    |                                                                              |                                                                                                                                                                                          |
| totalBalance                   | string    | false    | total balance                                                                |                                                                                                                                                                                          |
| todayProfit                    | string    | false    | today profit                                                                 |                                                                                                                                                                                          |
| todayProfitRate                | string    | false    | today profit rate                                                            |                                                                                                                                                                                          |
| PROFITACCOUNTBALANCELIST_START | list      | false    |                                                                              |                                                                                                                                                                                          |
| distributionType               | string    | false    | distribution type                                                            | 1 spot 2 Isolated 3 cross 4 coin futures 5 flat 6 minepool 7 coin swaps 8 investment 9 borrow 10 earn 11 usdt swaps 12 option 13 otc-options 14 crypto-loans 15 grid-trading 16 minepool |
| balance                        | float     | false    | balance                                                                      |                                                                                                                                                                                          |
| success                        | boolean   | false    | get data successful or not. When fails, the accountBalance and balance are 0 |                                                                                                                                                                                          |
| accountBalance                 | string    | false    | account balance                                                              |                                                                                                                                                                                          |
| PROFITACCOUNTBALANCELIST_END   |           | false    |                                                                              |                                                                                                                                                                                          |
| UPDATED_START                  | list      | false    |                                                                              |                                                                                                                                                                                          |
| success                        | boolean   | false    | updated today, yes or not                                                    |                                                                                                                                                                                          |
| time                           | long      | false    | updated time                                                                 |                                                                                                                                                                                          |
| UPDATED_END                    |           | false    |                                                                              |                                                                                                                                                                                          |
| DATA_END                       |           | false    |                                                                              |                                                                                                                                                                                          |
| success                        | boolean   | false    |                                                                              |                                                                                                                                                                                          |

#### Request example

`curl"https://api.huobi.pro/v2/account/valuation?accountTypency=spot&valuationCurrencyunt=BTC"`

#### Response Example

##### Success Example

{

"code":

200

"data":{

"updated":{

"success":

true

"time":

1629916724000

}

"todayProfitRate":

"0.004638293764657609"

"totalBalance":

"0.06276321"

"todayProfit":

"0.00028977"

"profitAccountBalanceList":\[

0:{

"distributionType":

"11"

"balance":

0.05728808

"success":

true

"accountBalance":

"0.05728808"

}

\]

}

"success":

true

}
