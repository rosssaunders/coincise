# GET /api/v5/account/balance

Source:
[https://www.okx.com/docs-v5/en/#trading-account-rest-api-get-balance](https://www.okx.com/docs-v5/en/#trading-account-rest-api-get-balance)

### Get balance

Retrieve a list of assets (with non-zero balance), remaining balance, and
available amount in the trading account.

Interest-free quota and discount rates are public data and not displayed on the
account interface.

#### Rate Limit: 10 requests per 2 seconds

#### Rate limit rule: User ID

#### Permission: Read

#### HTTP Request

`GET /api/v5/account/balance`

#### Request Parameters

| **Parameters** | **Types** | **Required** | **Description**                                                                                         |
| -------------- | --------- | ------------ | ------------------------------------------------------------------------------------------------------- |
| ccy            | String    | No           | Single currency or multiple currencies (no more than 20) separated with comma, e.g. `BTC` or `BTC,ETH`. |

#### Response Parameters

| **Parameters**                                                          | **Types** | **Description**                                                                                |
| ----------------------------------------------------------------------- | --------- | ---------------------------------------------------------------------------------------------- |
| uTime                                                                   | String    | Update time of account information, millisecond format of Unix timestamp, e.g. `1597026383085` |
| totalEq                                                                 | String    | The total amount of equity in `USD`                                                            |
| isoEq                                                                   | String    | Isolated margin equity in `USD`                                                                |
| Applicable to `Futures mode`/`Multi-currency margin`/`Portfolio margin` |
| adjEq                                                                   | String    | Adjusted / Effective equity in `USD`                                                           |

The net fiat value of the assets in the account that can provide margins for
spot, expiry futures, perpetual futures and options under the cross-margin
mode.  
In multi-ccy or PM mode, the asset and margin requirement will all be converted
to USD value to process the order check or liquidation.  
Due to the volatility of each currency market, our platform calculates the
actual USD value of each currency based on discount rates to balance market
risks.  
Applicable to `Spot mode`/`Multi-currency margin` and `Portfolio margin` | |
availEq | String | Account level available equity, excluding currencies that are
restricted due to the collateralized borrowing limit.  
Applicable to `Multi-currency margin`/`Portfolio margin` | | ordFroz | String |
Cross margin frozen for pending orders in `USD`  
Only applicable to `Spot mode`/`Multi-currency margin`/`Portfolio margin` | |
imr | String | Initial margin requirement in `USD`  
The sum of initial margins of all open positions and pending orders under
cross-margin mode in `USD`.  
Applicable to `Spot mode`/`Multi-currency margin`/`Portfolio margin` | | mmr |
String | Maintenance margin requirement in `USD`  
The sum of maintenance margins of all open positions and pending orders under
cross-margin mode in `USD`.  
Applicable to `Spot mode`/`Multi-currency margin`/`Portfolio margin` | |
borrowFroz | String | Potential borrowing IMR of the account in `USD`  
Only applicable to `Spot mode`/`Multi-currency margin`/`Portfolio margin`. It is
"" for other margin modes. | | mgnRatio | String | Maintenance margin ratio in
`USD`  
Applicable to `Spot mode`/`Multi-currency margin`/`Portfolio margin` | |
notionalUsd | String | Notional value of positions in `USD`  
Applicable to `Spot mode`/`Multi-currency margin`/`Portfolio margin` | |
notionalUsdForBorrow | String | Notional value for `Borrow` in USD  
Applicable to `Spot mode`/`Multi-currency margin`/`Portfolio margin` | |
notionalUsdForSwap | String | Notional value of positions for
`Perpetual Futures` in USD  
Applicable to `Multi-currency margin`/`Portfolio margin` | |
notionalUsdForFutures | String | Notional value of positions for
`Expiry Futures` in USD  
Applicable to `Multi-currency margin`/`Portfolio margin` | |
notionalUsdForOption | String | Notional value of positions for `Option` in
USD  
Applicable to `Spot mode`/`Multi-currency margin`/`Portfolio margin` | | upl |
String | Cross-margin info of unrealized profit and loss at the account level in
`USD`  
Applicable to `Multi-currency margin`/`Portfolio margin` | | delta | String |
Delta (USD) | | deltaLever | String | Delta neutral strategy account level delta
leverage  
deltaLever = delta / totalEq | | deltaNeutralStatus | String | Delta risk
status  
`0`: normal  
`1`: transfer restricted  
`2`: delta reducing - cancel all pending orders if delta is greater than 5000
USD, only one delta reducing order allowed per index (spot, futures, swap) | |
details | Array of objects | Detailed asset information in all currencies | | \>
ccy | String | Currency | | \> eq | String | Equity of currency | | \> cashBal |
String | Cash balance | | \> uTime | String | Update time of currency balance
information, Unix timestamp format in milliseconds, e.g. `1597026383085` | | \>
isoEq | String | Isolated margin equity of currency  
Applicable to `Futures mode`/`Multi-currency margin`/`Portfolio margin` | | \>
availEq | String | Available equity of currency  
Applicable to `Futures mode`/`Multi-currency margin`/`Portfolio margin` | | \>
disEq | String | Discount equity of currency in `USD`.  
Applicable to `Spot mode`(enabled spot
borrow)/`Multi-currency margin`/`Portfolio margin` | | \> fixedBal | String |
Frozen balance for `Dip Sniper` and `Peak Sniper` | | \> availBal | String |
Available balance of currency | | \> frozenBal | String | Frozen balance of
currency | | \> ordFrozen | String | Margin frozen for open orders  
Applicable to `Spot mode`/`Futures mode`/`Multi-currency margin` | | \> liab |
String | Liabilities of currency  
It is a positive value, e.g. `21625.64`  
Applicable to `Spot mode`/`Multi-currency margin`/`Portfolio margin` | | \> upl
| String | The sum of the unrealized profit & loss of all margin and derivatives
positions of currency.  
Applicable to `Futures mode`/`Multi-currency margin`/`Portfolio margin` | | \>
uplLiab | String | Liabilities due to Unrealized loss of currency  
Applicable to `Multi-currency margin`/`Portfolio margin` | | \> crossLiab |
String | Cross liabilities of currency  
Applicable to `Spot mode`/`Multi-currency margin`/`Portfolio margin` | | \>
rewardBal | String | Trial fund balance | | \> isoLiab | String | Isolated
liabilities of currency  
Applicable to `Multi-currency margin`/`Portfolio margin` | | \> mgnRatio |
String | Cross maintenance margin ratio of currency  
The index for measuring the risk of a certain asset in the account.  
Applicable to `Futures mode` and when there is cross position | | \> imr |
String | Cross initial margin requirement at the currency level  
Applicable to `Futures mode` and when there is cross position | | \> mmr |
String | Cross maintenance margin requirement at the currency level  
Applicable to `Futures mode` and when there is cross position | | \> interest |
String | Accrued interest of currency  
It is a positive value, e.g. `9.01`  
Applicable to `Spot mode`/`Multi-currency margin`/`Portfolio margin` | | \> twap
| String | Risk indicator of forced repayment  
Divided into multiple levels from 0 to 5, the larger the number, the more likely
the forced repayment will be triggered.  
Applicable to `Spot mode`/`Multi-currency margin`/`Portfolio margin` | | \>
frpType | String | Forced repayment (FRP) type  
`0`: no FRP  
`1`: user based FRP  
`2`: platform based FRP

Return `1`/`2` when twap is >= 1, applicable to
`Spot mode`/`Multi-currency margin`/`Portfolio margin` | | \> maxLoan | String |
Max loan of currency  
Applicable to `cross` of `Spot mode`/`Multi-currency margin`/`Portfolio margin`
| | \> eqUsd | String | Equity in `USD` of currency | | \> borrowFroz | String |
Potential borrowing IMR of currency in `USD`  
Applicable to `Multi-currency margin`/`Portfolio margin`. It is "" for other
margin modes. | | \> notionalLever | String | Leverage of currency  
Applicable to `Futures mode` | | \> stgyEq | String | Strategy equity | | \>
isoUpl | String | Isolated unrealized profit and loss of currency  
Applicable to `Futures mode`/`Multi-currency margin`/`Portfolio margin` | | \>
spotInUseAmt | String | Spot in use amount  
Applicable to `Portfolio margin` | | \> clSpotInUseAmt | String | User-defined
spot risk offset amount  
Applicable to `Portfolio margin` | | \> maxSpotInUse | String | Max possible
spot risk offset amount  
Applicable to `Portfolio margin` | | \> spotIsoBal | String | Spot isolated
balance  
Applicable to copy trading  
Applicable to `Spot mode`/`Futures mode`. | | \> smtSyncEq | String | Smart sync
equity  
The default is "0", only applicable to copy trader. | | \> spotCopyTradingEq |
String | Spot smart sync equity.  
The default is "0", only applicable to copy trader. | | \> spotBal | String |
Spot balance. The unit is currency, e.g. BTC.
[More details](https://www.okx.com/help/i-introduction-of-spot) | | \> openAvgPx
| String | Spot average cost price. The unit is USD.
[More details](https://www.okx.com/help/i-introduction-of-spot) | | \> accAvgPx
| String | Spot accumulated cost price. The unit is USD.
[More details](https://www.okx.com/help/i-introduction-of-spot) | | \> spotUpl |
String | Spot unrealized profit and loss. The unit is USD.
[More details](https://www.okx.com/help/i-introduction-of-spot) | | \>
spotUplRatio | String | Spot unrealized profit and loss ratio.
[More details](https://www.okx.com/help/i-introduction-of-spot) | | \> totalPnl
| String | Spot accumulated profit and loss. The unit is USD.
[More details](https://www.okx.com/help/i-introduction-of-spot) | | \>
totalPnlRatio | String | Spot accumulated profit and loss ratio.
[More details](https://www.okx.com/help/i-introduction-of-spot) | | \> colRes |
String | Platform level collateral restriction status  
`0`: The restriction is not enabled.  
`1`: The restriction is not enabled. But the crypto is close to the platform's
collateral limit.  
`2`: The restriction is enabled. This crypto can't be used as margin for your
new orders. This may result in failed orders. But it will still be included in
the account's adjusted equity and doesn't impact margin ratio.  
Refer to
[Introduction to the platform collateralized borrowing limit](https://www.okx.com/help/introduction-to-the-platforms-collateralized-borrowing-limit-mechanism)
for more details. | | \> colBorrAutoConversion | String | Risk indicator of auto
conversion. Divided into multiple levels from 1-5, the larger the number, the
more likely the repayment will be triggered. The default will be 0, indicating
there is no risk currently. 5 means this user is undergoing auto conversion now,
4 means this user will undergo auto conversion soon whereas 1/2/3 indicates
there is a risk for auto conversion.  
Applicable to
`Spot mode`/`Futures mode`/`Multi-currency margin`/`Portfolio margin`  
When the total liability for each crypto set as collateral exceeds a certain
percentage of the platform's total limit, the auto-conversion mechanism may be
triggered. This may result in the automatic sale of excess collateral crypto if
you've set this crypto as collateral and have large borrowings. To lower this
risk, consider reducing your use of the crypto as collateral or reducing your
liabilities.  
Refer to
[Introduction to the platform collateralized borrowing limit](https://www.okx.com/help/introduction-to-the-platforms-collateralized-borrowing-limit-mechanism)
for more details. | | \> collateralRestrict | Boolean | ~Platform level
collateralized borrow restriction  
`true`  
`false`~(deprecated, use colRes instead) | | \> collateralEnabled | Boolean |
`true`: Collateral enabled  
`false`: Collateral disabled  
Applicable to `Multi-currency margin` | | \> autoLendStatus | String | Auto lend
status  
`unsupported`: auto lend is not supported by this currency  
`off`: auto lend is supported but turned off  
`pending`: auto lend is turned on but pending matching  
`active`: auto lend is turned on and matched | | \> autoLendMtAmt | String |
Auto lend currency matched amount  
Return "0" when autoLendStatus is `unsupported/off/pending`. Return matched
amount when autoLendStatus is `active` |

- Regarding more parameter details, you can refer to product documentations
  below:  
  [Futures mode: cross margin trading](https://www.okx.com/help/iii-single-currency-margin-cross-margin-trading)  
  [Multi-currency margin mode: cross margin trading](https://www.okx.com/help/iv-multi-currency-margin-mode-cross-margin-trading)  
  [Multi-currency margin mode vs. Portfolio margin mode](https://www.okx.com/help/vi-multi-currency-margin-mode-vs-portfolio-margin-mode)

"" will be returned for inapplicable fields under the current account level.

The currency details will not be returned when cashBal and eq is both 0.

Distribution of applicable fields under each account level are as follows:

| **Parameters**        | **Spot mode** | **Futures mode** | **Multi-currency margin mode** | **Portfolio margin mode** |
| --------------------- | ------------- | ---------------- | ------------------------------ | ------------------------- |
| uTime                 | Yes           | Yes              | Yes                            | Yes                       |
| totalEq               | Yes           | Yes              | Yes                            | Yes                       |
| isoEq                 |               | Yes              | Yes                            | Yes                       |
| adjEq                 | Yes           |                  | Yes                            | Yes                       |
| availEq               |               |                  | Yes                            | Yes                       |
| ordFroz               | Yes           |                  | Yes                            | Yes                       |
| imr                   | Yes           |                  | Yes                            | Yes                       |
| mmr                   | Yes           |                  | Yes                            | Yes                       |
| borrowFroz            | Yes           |                  | Yes                            | Yes                       |
| mgnRatio              | Yes           |                  | Yes                            | Yes                       |
| notionalUsd           | Yes           |                  | Yes                            | Yes                       |
| notionalUsdForSwap    |               |                  | Yes                            | Yes                       |
| notionalUsdForFutures |               |                  | Yes                            | Yes                       |
| notionalUsdForOption  | Yes           |                  | Yes                            | Yes                       |
| notionalUsdForBorrow  | Yes           |                  | Yes                            | Yes                       |
| upl                   |               |                  | Yes                            | Yes                       |
| details               |               |                  | Yes                            | Yes                       |
| \> ccy                | Yes           | Yes              | Yes                            | Yes                       |
| \> eq                 | Yes           | Yes              | Yes                            | Yes                       |
| \> cashBal            | Yes           | Yes              | Yes                            | Yes                       |
| \> uTime              | Yes           | Yes              | Yes                            | Yes                       |
| \> isoEq              |               | Yes              | Yes                            | Yes                       |
| \> availEq            |               | Yes              | Yes                            | Yes                       |
| \> disEq              | Yes           |                  | Yes                            | Yes                       |
| \> availBal           | Yes           | Yes              | Yes                            | Yes                       |
| \> frozenBal          | Yes           | Yes              | Yes                            | Yes                       |
| \> ordFrozen          | Yes           | Yes              | Yes                            | Yes                       |
| \> liab               | Yes           |                  | Yes                            | Yes                       |
| \> upl                |               | Yes              | Yes                            | Yes                       |
| \> uplLiab            |               |                  | Yes                            | Yes                       |
| \> crossLiab          | Yes           |                  | Yes                            | Yes                       |
| \> isoLiab            |               |                  | Yes                            | Yes                       |
| \> mgnRatio           |               | Yes              |                                |                           |
| \> interest           | Yes           |                  | Yes                            | Yes                       |
| \> twap               | Yes           |                  | Yes                            | Yes                       |
| \> maxLoan            | Yes           |                  | Yes                            | Yes                       |
| \> eqUsd              | Yes           | Yes              | Yes                            | Yes                       |
| \> borrowFroz         | Yes           |                  | Yes                            | Yes                       |
| \> notionalLever      |               | Yes              |                                |                           |
| \> stgyEq             | Yes           | Yes              | Yes                            | Yes                       |
| \> isoUpl             |               | Yes              | Yes                            | Yes                       |
| \> spotInUseAmt       |               |                  |                                | Yes                       |
| \> spotIsoBal         | Yes           | Yes              |                                |                           |
| \> imr                |               | Yes              |                                |                           |
| \> mmr                |               | Yes              |                                |                           |
| \> smtSyncEq          | Yes           | Yes              | Yes                            | Yes                       |
| \> spotCopyTradingEq  | Yes           | Yes              | Yes                            | Yes                       |
| \> spotBal            | Yes           | Yes              | Yes                            | Yes                       |
| \> openAvgPx          | Yes           | Yes              | Yes                            | Yes                       |
| \> accAvgPx           | Yes           | Yes              | Yes                            | Yes                       |
| \> spotUpl            | Yes           | Yes              | Yes                            | Yes                       |
| \> spotUplRatio       | Yes           | Yes              | Yes                            | Yes                       |
| \> totalPnl           | Yes           | Yes              | Yes                            | Yes                       |
| \> totalPnlRatio c    | Yes           | Yes              | Yes                            | Yes                       |
| \> collateralEnabled  |               |                  | Yes                            |                           |
