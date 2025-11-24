# Get Wallet Balance

Obtain wallet balance, query asset information of each currency. By default,
currency information with assets or liabilities of 0 is not returned.

info

Under the new logic of UTA manual borrow, `spotBorrow` field corresponding to
spot liabilities is detailed in the
[announcement](https://announcements.bybit.com/en/article/bybit-uta-function-optimization-manual-coin-borrowing-will-be-launched-soon-blt5d858199bd12e849/).

Old `walletBalance` = New `walletBalance` - `spotBorrow`

### HTTP Request[​](#http-request "Direct link to heading")

GET `/v5/account/wallet-balance`

### Request Parameters[​](#request-parameters "Direct link to heading")

| Parameter                                | Required | Type   | Comments     |
| :--------------------------------------- | :------- | :----- | ------------ |
| [accountType](/docs/v5/enum#accounttype) | **true** | string | Account type |

- [UTA2.0](/docs/v5/acct-mode#uta-20): `UNIFIED`
- [UTA1.0](/docs/v5/acct-mode#uta-10): `UNIFIED`, `CONTRACT`(inverse derivatives
  wallet)
- Classic account: `CONTRACT`, `SPOT`

To get Funding wallet balance, please go to this
[endpoint](/docs/v5/asset/balance/all-balance) | | coin | false | string | Coin
name, uppercase only

- If not passed, it returns non-zero asset info
- You can pass multiple coins to query, separated by comma. `USDT,USDC`

|

### Response Parameters[​](#response-parameters "Direct link to heading")

| Parameter        | Type   | Comments                                                                                                                                                                                 |
| :--------------- | :----- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| list             | array  | Object                                                                                                                                                                                   |
| \> accountType   | string | Account type                                                                                                                                                                             |
| \> accountLTV    | string | deprecated field                                                                                                                                                                         |
| \> accountIMRate | string | Account IM rate- You can refer to this [Glossary](https://www.bybit.com/en/help-center/article/Glossary-Unified-Trading-Account) to understand the below fields calculation and mearning |

- All account wide fields are **not** applicable to  
   [UTA2.0](/docs/v5/acct-mode#uta-20)(isolated margin),  
   [UTA1.0](/docs/v5/acct-mode#uta-10)(isolated margin),
  [UTA1.0](/docs/v5/acct-mode#uta-10)(CONTRACT),  
   classic account(SPOT, CONTRACT) | | \> accountIMRateByMp | string | Account
  IM rate calculated by mark price | | \> accountMMRate | string | Account MM
  rate | | \> accountMMRateByMp | string | Account MM rate calculated by mark
  price | | \> totalEquity | string | Account total equity (USD): ∑Asset Equity
  By USD value of each asset | | \> totalWalletBalance | string | Account wallet
  balance (USD): ∑Asset Wallet Balance By USD value of each asset | | \>
  totalMarginBalance | string | Account margin balance (USD):
  totalWalletBalance + totalPerpUPL | | \> totalAvailableBalance | string |
  Account available balance (USD),
- Cross Margin: totalMarginBalance - Haircut - totalInitialMargin.
- Porfolio Margin: total Equity - Haircut - totalInitialMargin.

| | \> totalPerpUPL | string | Account Perps and Futures unrealised p&l (USD):
∑Each Perp and USDC Futures upl by base coin | | \> totalInitialMargin | string
| Account initial margin (USD): ∑Asset Total Initial Margin Base Coin | | \>
totalInitialMarginByMp | string | Account initial margin (USD) calculated by
mark price: ∑Asset Total Initial Margin Base Coin calculated by mark price | |
\> totalMaintenanceMargin | string | Account maintenance margin (USD): ∑ Asset
Total Maintenance Margin Base Coin | | \> totalMaintenanceMarginByMp | string |
Account maintenance margin (USD) calculated by mark price: ∑ Asset Total
Maintenance Margin Base Coin calculated by mark price | | \> coin | array |
Object | | \>> coin | string | Coin name, such as BTC, ETH, USDT, USDC | | \>>
equity | string | Equity of coin. Asset Equity = Asset Wallet Balance + Asset
Perp UPL + Asset Future UPL + Asset Option Value = `walletBalance` -
`spotBorrow` + `unrealisedPnl` + Asset Option Value | | \>> usdValue | string |
USD value of coin | | \>> walletBalance | string | Wallet balance of coin | |
\>> free | string | Available balance for Spot wallet. _This is a unique field
for Classic `SPOT`_ | | \>> locked | string | Locked balance due to the Spot
open order | | \>> spotHedgingQty | string | The spot asset qty that is used to
hedge in the portfolio margin, truncate to 8 decimals and "0" by default | | \>>
borrowAmount | string | Borrow amount of current coin = spot liabilities +
derivatives liabilities | | \>> availableToWithdraw | string | **Note:** this
field is deprecated for `accountType=UNIFIED` from 9 Jan, 2025

- Transferable balance: you can use
  [Get Transferable Amount (Unified)](/docs/v5/account/unified-trans-amnt) or
  [Get All Coins Balance](/docs/v5/asset/balance/all-balance) instead
- Derivatives available balance:  
  **isolated margin**: walletBalance - totalPositionIM - totalOrderIM - locked -
  bonus  
  **cross & portfolio margin**: look at field `totalAvailableBalance`(USD),
  which needs to be converted into the available balance of accordingly coin
  through index price
- Spot (margin) available balance: refer to
  [Get Borrow Quota (Spot)](/docs/v5/order/spot-borrow-quota)

| | \>> accruedInterest | string | Accrued interest | | \>> totalOrderIM |
string | Pre-occupied margin for order. For portfolio margin mode, it returns ""
| | \>> totalPositionIM | string | Sum of initial margin of all positions +
Pre-occupied liquidation fee. For portfolio margin mode, it returns "" | | \>>
totalPositionMM | string | Sum of maintenance margin for all positions. For
portfolio margin mode, it returns "" | | \>> unrealisedPnl | string | Unrealised
P&L | | \>> cumRealisedPnl | string | Cumulative Realised P&L | | \>> bonus |
string | Bonus. _This is a unique field for accounType=UNIFIED_ | | \>>
marginCollateral | boolean | Whether it can be used as a margin collateral
currency (platform), `true`: YES, `false`: NO- When marginCollateral=false, then
collateralSwitch is meaningless | | \>> collateralSwitch | boolean | Whether the
collateral is turned on by user (user), `true`: ON, `false`: OFF- When
marginCollateral=true, then collateralSwitch is meaningful | | \>>
availableToBorrow | string | deprecated field, always return `""`. Please refer
to `availableToBorrow` in the
[Get Collateral Info](/docs/v5/account/collateral-info) | | \>> spotBorrow |
string | Borrow amount by spot margin trade and manual borrow amount (does not
include borrow amount by spot margin active order). `spotBorrow` field
corresponding to spot liabilities is detailed in the
[announcement](https://announcements.bybit.com/en/article/bybit-uta-function-optimization-manual-coin-borrowing-will-be-launched-soon-blt5d858199bd12e849/).
|

[RUN >>](/docs/api-explorer/v5/account/wallet)

---

### Request Example[​](#request-example "Direct link to heading")

```bash
GET /v5/account/wallet-balance?accountType=UNIFIED&coin=BTC HTTP/1.1Host: api-testnet.bybit.comX-BAPI-SIGN: XXXXXX-BAPI-API-KEY: xxxxxxxxxxxxxxxxxxX-BAPI-TIMESTAMP: 1672125440406X-BAPI-RECV-WINDOW: 5000
```

```python
from pybit.unified_trading import HTTPsession = HTTP(    testnet=True,    api_key="xxxxxxxxxxxxxxxxxx",    api_secret="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",)print(session.get_wallet_balance(    accountType="UNIFIED",    coin="BTC",))
```

```javascript
const { RestClientV5 } = require("bybit-api")
const client = new RestClientV5({
  testnet: true,
  key: "YOUR_API_KEY",
  secret: "YOUR_API_SECRET"
})
client
  .getWalletBalance({ accountType: "UNIFIED", coin: "BTC" })
  .then(response => {
    console.log(response)
  })
  .catch(error => {
    console.error(error)
  })
```

### Response Example[​](#response-example "Direct link to heading")

```json
{
  "retCode": 0,
  "retMsg": "OK",
  "result": {
    "list": [
      {
        "totalEquity": "3.31216591",
        "accountIMRate": "0",
        "accountIMRateByMp": "0",
        "totalMarginBalance": "3.00326056",
        "totalInitialMargin": "0",
        "totalInitialMarginByMp": "0",
        "accountType": "UNIFIED",
        "totalAvailableBalance": "3.00326056",
        "accountMMRate": "0",
        "accountMMRateByMp": "0",
        "totalPerpUPL": "0",
        "totalWalletBalance": "3.00326056",
        "accountLTV": "0",
        "totalMaintenanceMargin": "0",
        "totalMaintenanceMarginByMp": "0",
        "coin": [
          {
            "availableToBorrow": "3",
            "bonus": "0",
            "accruedInterest": "0",
            "availableToWithdraw": "0",
            "totalOrderIM": "0",
            "equity": "0",
            "totalPositionMM": "0",
            "usdValue": "0",
            "spotHedgingQty": "0.01592413",
            "unrealisedPnl": "0",
            "collateralSwitch": true,
            "borrowAmount": "0.0",
            "totalPositionIM": "0",
            "walletBalance": "0",
            "cumRealisedPnl": "0",
            "locked": "0",
            "marginCollateral": true,
            "coin": "BTC",
            "spotBorrow": "0"
          }
        ]
      }
    ]
  },
  "retExtInfo": {},
  "time": 1690872862481
}
```
