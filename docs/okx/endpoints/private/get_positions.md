# GET positions

Source: [https://www.okx.com/docs-v5/en/#trading-account-rest-api-get-positions](https://www.okx.com/docs-v5/en/#trading-account-rest-api-get-positions)

### Get positions

Retrieve information on your positions. When the account is in `net` mode, `net` positions will be displayed, and when the account is in `long/short` mode, `long` or `short` positions will be displayed. Return in reverse chronological order using ctime.

#### Rate Limit: 10 requests per 2 seconds

#### Rate limit rule: User ID

#### Permission: Read

#### HTTP Request

`GET /api/v5/account/positions`

#### Request Parameters

| **Parameter** | **Type** | **Required** | **Description** |
| --- | --- | --- | --- |
| instType | String | No | Instrument type  
`MARGIN`  
`SWAP`  
`FUTURES`  
`OPTION`  
`instId` will be checked against `instType` when both parameters are passed. |
| instId | String | No | Instrument ID, e.g. `BTC-USDT-SWAP`. Single instrument ID or multiple instrument IDs (no more than 10) separated with comma |
| posId | String | No | Single position ID or multiple position IDs (no more than 20) separated with comma.  
There is attribute expiration, the posId and position information will be cleared if it is more than 30 days after the last full close position. |

instId  
If the instrument ever had position and its open interest is 0, it will return the position information with specific instId. It will not return the position information with specific instId if there is no valid posId; it will not return the position information without specific instId.

In the isolated margin trading settings, if it is set to the manual transfers mode, after the position is transferred to the margin, a position with a position of 0 will be generated

#### Response Parameters

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
| instType | String | Instrument type |
| mgnMode | String | Margin mode  
`cross`  
`isolated` |
| posId | String | Position ID |
| posSide | String | Position side  
`long`, `pos` is positive  
`short`, `pos` is positive  
`net` (`FUTURES`/`SWAP`/`OPTION`: positive `pos` means long position and negative `pos` means short position. For `MARGIN`, `pos` is always positive, `posCcy` being base currency means long position, `posCcy` being quote currency means short position.) |
| pos | String | Quantity of positions. In the isolated margin mode, when doing manual transfers, a position with pos of `0` will be generated after the deposit is transferred |
| baseBal | String | ~Base currency balance, only applicable to `MARGIN`（Quick Margin Mode）~(Deprecated) |
| quoteBal | String | ~Quote currency balance, only applicable to `MARGIN`（Quick Margin Mode）~(Deprecated) |
| baseBorrowed | String | ~Base currency amount already borrowed, only applicable to MARGIN(Quick Margin Mode）~(Deprecated) |
| baseInterest | String | ~Base Interest, undeducted interest that has been incurred, only applicable to MARGIN(Quick Margin Mode）~(Deprecated) |
| quoteBorrowed | String | ~Quote currency amount already borrowed, only applicable to MARGIN(Quick Margin Mode）~(Deprecated) |
| quoteInterest | String | ~Quote Interest, undeducted interest that has been incurred, only applicable to MARGIN(Quick Margin Mode）~(Deprecated) |
| posCcy | String | Position currency, only applicable to `MARGIN` positions. |
| availPos | String | Position that can be closed  
Only applicable to `MARGIN` and `OPTION`.  
For `MARGIN` position, the rest of sz will be `SPOT` trading after the liability is repaid while closing the position. Please get the available reduce-only amount from "Get maximum available tradable amount" if you want to reduce the amount of `SPOT` trading as much as possible. |
| avgPx | String | Average open price  
Under cross-margin mode, the entry price of expiry futures will update at settlement to the last settlement price, and when the position is opened or increased. |
| nonSettleAvgPx | String | Non-settlement entry price  
The non-settlement entry price only reflects the average price at which the position is opened or increased.  
Applicable to `cross` `FUTURES` positions. |
| markPx | String | Latest Mark price |
| upl | String | Unrealized profit and loss calculated by mark price. |
| uplRatio | String | Unrealized profit and loss ratio calculated by mark price. |
| uplLastPx | String | Unrealized profit and loss calculated by last price. Main usage is showing, actual value is upl. |
| uplRatioLastPx | String | Unrealized profit and loss ratio calculated by last price. |
| instId | String | Instrument ID, e.g. `BTC-USDT-SWAP` |
| lever | String | Leverage  
Not applicable to `OPTION` and positions of cross margin mode under `Portfolio margin` |
| liqPx | String | Estimated liquidation price  
Not applicable to `OPTION` |
| imr | String | Initial margin requirement, only applicable to `cross`. |
| margin | String | Margin, can be added or reduced. Only applicable to `isolated`. |
| mgnRatio | String | Maintenance margin ratio |
| mmr | String | Maintenance margin requirement |
| liab | String | Liabilities, only applicable to `MARGIN`. |
| liabCcy | String | Liabilities currency, only applicable to `MARGIN`. |
| interest | String | Interest. Undeducted interest that has been incurred. |
| tradeId | String | Last trade ID |
| optVal | String | Option Value, only applicable to `OPTION`. |
| pendingCloseOrdLiabVal | String | The amount of close orders of isolated margin liability. |
| notionalUsd | String | Notional value of positions in `USD` |
| adl | String | Auto-deleveraging (ADL) indicator  
Divided into 6 levels, from 0 to 5, the smaller the number, the weaker the adl intensity.  
Only applicable to `FUTURES/SWAP/OPTION` |
| ccy | String | Currency used for margin |
| last | String | Latest traded price |
| idxPx | String | Latest underlying index price |
| usdPx | String | Latest USD price of the `ccy` on the market, only applicable to `FUTURES`/`SWAP`/`OPTION` |
| bePx | String | Breakeven price |
| deltaBS | String | delta: Black-Scholes Greeks in dollars, only applicable to `OPTION` |
| deltaPA | String | delta: Greeks in coins, only applicable to `OPTION` |
| gammaBS | String | gamma: Black-Scholes Greeks in dollars, only applicable to `OPTION` |
| gammaPA | String | gamma: Greeks in coins, only applicable to `OPTION` |
| thetaBS | String | theta：Black-Scholes Greeks in dollars, only applicable to `OPTION` |
| thetaPA | String | theta：Greeks in coins, only applicable to `OPTION` |
| vegaBS | String | vega：Black-Scholes Greeks in dollars, only applicable to `OPTION` |
| vegaPA | String | vega：Greeks in coins, only applicable to `OPTION` |
| spotInUseAmt | String | Spot in use amount  
Applicable to `Portfolio margin` |
| spotInUseCcy | String | Spot in use unit, e.g. `BTC`  
Applicable to `Portfolio margin` |
| clSpotInUseAmt | String | User-defined spot risk offset amount  
Applicable to `Portfolio margin` |
| maxSpotInUseAmt | String | Max possible spot risk offset amount  
Applicable to `Portfolio margin` |
| bizRefId | String | External business id, e.g. experience coupon id |
| bizRefType | String | External business type |
| realizedPnl | String | Realized profit and loss  
Only applicable to `FUTURES`/`SWAP`/`OPTION`  
`realizedPnl`\=`pnl`+`fee`+`fundingFee`+`liqPenalty`+`settledPnl` |
| settledPnl | String | Accumulated settled profit and loss (calculated by settlement price)  
Only applicable to `cross` `FUTURES` |
| pnl | String | Accumulated pnl of closing order(s) (excluding the fee). |
| fee | String | Accumulated fee  
Negative number represents the user transaction fee charged by the platform.Positive number represents rebate. |
| fundingFee | String | Accumulated funding fee |
| liqPenalty | String | Accumulated liquidation penalty. It is negative when there is a value. |
| closeOrderAlgo | Array of objects | Close position algo orders attached to the position. This array will have values only after you request "Place algo order" with `closeFraction`\=1. |
| \> algoId | String | Algo ID |
| \> slTriggerPx | String | Stop-loss trigger price. |
| \> slTriggerPxType | String | Stop-loss trigger price type.  
`last`: last price  
`index`: index price  
`mark`: mark price |
| \> tpTriggerPx | String | Take-profit trigger price. |
| \> tpTriggerPxType | String | Take-profit trigger price type.  
`last`: last price  
`index`: index price  
`mark`: mark price |
| \> closeFraction | String | Fraction of position to be closed when the algo order is triggered. |
| cTime | String | Creation time, Unix timestamp format in milliseconds, e.g. `1597026383085` |
| uTime | String | Latest time position was adjusted, Unix timestamp format in milliseconds, e.g. `1597026383085` |

As for portfolio margin account, the IMR and MMR of the position are calculated in risk unit granularity, thus their values of the same risk unit cross positions are the same.
