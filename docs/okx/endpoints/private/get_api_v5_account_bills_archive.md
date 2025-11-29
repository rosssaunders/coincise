# GET /api/v5/account/bills-archive

Source:
[https://www.okx.com/docs-v5/en/#trading-account-rest-api-get-bills-details-last-3-months](https://www.okx.com/docs-v5/en/#trading-account-rest-api-get-bills-details-last-3-months)

### Get bills details (last 3 months)

Retrieve the account’s bills. The bill refers to all transaction records that
result in changing the balance of an account. Pagination is supported, and the
response is sorted with most recent first. This endpoint can retrieve data from
the last 3 months.

#### Rate Limit: 5 requests per 2 seconds

#### Rate limit rule: User ID

#### Permission: Read

#### HTTP Request

`GET /api/v5/account/bills-archive`

#### Request Parameters

| Parameter | Type   | Required | Description     |
| --------- | ------ | -------- | --------------- |
| instType  | String | No       | Instrument type |

`SPOT`  
`MARGIN`  
`SWAP`  
`FUTURES`  
`OPTION` | | instId | String | No | Instrument ID, e.g. `BTC-USDT` | | ccy |
String | No | Bill currency | | mgnMode | String | No | Margin mode  
`isolated`  
`cross` | | ctType | String | No | Contract type  
`linear`  
`inverse`  
Only applicable to `FUTURES`/`SWAP` | | type | String | No | Bill type  
`1`: Transfer  
`2`: Trade  
`3`: Delivery  
`4`: Forced repayment  
`5`: Liquidation  
`6`: Margin transfer  
`7`: Interest deduction  
`8`: Funding fee  
`9`: ADL  
`10`: Clawback  
`11`: System token conversion  
`12`: Strategy transfer  
`13`: DDH  
`14`: Block trade  
`15`: Quick Margin  
`16`: Borrowing  
`22`: Repay  
`24`: Spread trading  
`26`: Structured products  
`27`: Convert  
`28`: Easy convert  
`29`: One-click repay  
`30`: Simple trade  
`32`: Move position  
`33`: Loans  
`34`: Settlement  
`250`: Copy trader profit sharing expenses  
`251`: Copy trader profit sharing refund | | subType | String | No | Bill
subtype  
`1`: Buy  
`2`: Sell  
`3`: Open long  
`4`: Open short  
`5`: Close long  
`6`: Close short  
`9`: Interest deduction for Market loans  
`11`: Transfer in  
`12`: Transfer out  
`14`: Interest deduction for VIP loans  
`160`: Manual margin increase  
`161`: Manual margin decrease  
`162`: Auto margin increase  
`114`: Forced repayment buy  
`115`: Forced repayment sell  
`118`: System token conversion transfer in  
`119`: System token conversion transfer out  
`100`: Partial liquidation close long  
`101`: Partial liquidation close short  
`102`: Partial liquidation buy  
`103`: Partial liquidation sell  
`104`: Liquidation long  
`105`: Liquidation short  
`106`: Liquidation buy  
`107`: Liquidation sell  
`108`: Clawback  
`110`: Liquidation transfer in  
`111`: Liquidation transfer out  
`125`: ADL close long  
`126`: ADL close short  
`127`: ADL buy  
`128`: ADL sell  
`131`: ddh buy  
`132`: ddh sell  
`170`: Exercised(ITM buy side)  
`171`: Counterparty exercised(ITM sell side)  
`172`: Expired(Non-ITM buy and sell side)  
`112`: Delivery long (applicable to `FUTURES` expiration and `SWAP` delisting)  
`113`: Delivery short (applicable to `FUTURES` expiration and `SWAP`
delisting)  
`117`: Delivery/Exercise clawback  
`173`: Funding fee expense  
`174`: Funding fee income  
`200`:System transfer in  
`201`: Manually transfer in  
`202`: System transfer out  
`203`: Manually transfer out  
`204`: block trade buy  
`205`: block trade sell  
`206`: block trade open long  
`207`: block trade open short  
`208`: block trade close long  
`209`: block trade close short  
`210`: Manual Borrowing of quick margin  
`211`: Manual Repayment of quick margin  
`212`: Auto borrow of quick margin  
`213`: Auto repay of quick margin  
`220`: Transfer in when using USDT to buy OPTION  
`221`: Transfer out when using USDT to buy OPTION  
`16`: Repay forcibly  
`17`: Repay interest by borrowing forcibly  
`224`: Repayment transfer in  
`225`: Repayment transfer out  
`236`: Easy convert in  
`237`: Easy convert out  
`250`: Profit sharing expenses  
`251`: Profit sharing refund  
`280`: SPOT profit sharing expenses  
`281`: SPOT profit sharing refund  
`282`: Spot profit share income  
`283`: Asset transfer for spot copy trading  
`270`: Spread trading buy  
`271`: Spread trading sell  
`272`: Spread trading open long  
`273`: Spread trading open short  
`274`: Spread trading close long  
`275`: Spread trading close short  
`280`: SPOT profit sharing expenses  
`281`: SPOT profit sharing refund  
`284`: Copy trade automatic transfer in  
`285`: Copy trade manual transfer in  
`286`: Copy trade automatic transfer out  
`287`: Copy trade manual transfer out  
`290`: Crypto dust auto-transfer out  
~`293`: Fixed loan interest deduction~  
~`294`: Fixed loan interest refund~  
~`295`: Fixed loan overdue penalty~  
`296`: From structured order placements  
`297`: To structured order placements  
`298`: From structured settlements  
`299`: To structured settlements  
`306`: Manual borrow  
`307`: Auto borrow  
`308`: Manual repay  
`309`: Auto repay  
`312`: Auto offset  
`318`: Convert in  
`319`: Convert out  
`320`: Simple buy  
`321`: Simple sell  
`324`: Move position buy  
`325`: Move position sell  
`326`: Move position open long  
`327`: Move position open short  
`328`: Move position close long  
`329`: Move position close short  
`332`: Margin transfer in isolated margin position  
`333`: Margin transfer out isolated margin position  
`334`: Margin loss when closing isolated margin position  
`355`: Settlement PnL  
`376`: Collateralized borrowing auto conversion buy  
`377`: Collateralized borrowing auto conversion sell  
`381`: Auto lend interest transfer in  
`372`: Bot airdrop (transfer in)  
`373`: Bot airdrop (transfer out)  
`374`: Bot airdrop reclaim (transfer in)  
`375`: Bot airdrop reclaim (transfer out)  
`381`: Auto earn (auto lend) | | after | String | No | Pagination of data to
return records earlier than the requested bill ID. | | before | String | No |
Pagination of data to return records newer than the requested bill ID. | | begin
| String | No | Filter with a begin timestamp `ts`. Unix timestamp format in
milliseconds, e.g. `1597026383085` | | end | String | No | Filter with an end
timestamp `ts`. Unix timestamp format in milliseconds, e.g. `1597026383085` | |
limit | String | No | Number of results per request. The maximum is `100`. The
default is `100`. |

#### Response Parameters

| Parameter | Type   | Description                                                                                           |
| --------- | ------ | ----------------------------------------------------------------------------------------------------- |
| instType  | String | Instrument type                                                                                       |
| billId    | String | Bill ID                                                                                               |
| type      | String | Bill type                                                                                             |
| subType   | String | Bill subtype                                                                                          |
| ts        | String | The time when the balance complete update, Unix timestamp format in milliseconds, e.g.`1597026383085` |
| balChg    | String | Change in balance amount at the account level                                                         |
| posBalChg | String | Change in balance amount at the position level                                                        |
| bal       | String | Balance at the account level                                                                          |
| posBal    | String | Balance at the position level                                                                         |
| sz        | String | Quantity                                                                                              |

For `FUTURES`/`SWAP`/`OPTION`, it is fill quantity or position quantity, the
unit is contract. The value is always positive.  
For other scenarios. the unit is account balance currency(`ccy`). | | px |
String | Price which related to subType

- Trade filled price for `1`: Buy `2`: Sell `3`: Open long `4`: Open short `5`:
  Close long `6`: Close short `204`: block trade buy `205`: block trade sell
  `206`: block trade open long `207`: block trade open short `208`: block trade
  close long `209`: block trade close short `114`: Forced repayment buy `115`:
  Forced repayment sell
- Liquidation Price for `100`: Partial liquidation close long `101`: Partial
  liquidation close short `102`: Partial liquidation buy `103`: Partial
  liquidation sell `104`: Liquidation long `105`: Liquidation short `106`:
  Liquidation buy `107`: Liquidation sell `16`: Repay forcibly `17`: Repay
  interest by borrowing forcibly `110`: Liquidation transfer in `111`:
  Liquidation transfer out
- Delivery price for `112`: Delivery long `113`: Delivery short
- Exercise price for `170`: Exercised `171`: Counterparty exercised `172`:
  Expired OTM
- Mark price for `173`: Funding fee expense `174`: Funding fee income | | ccy |
  String | Account balance currency | | pnl | String | Profit and loss | | fee |
  String | Fee  
  Negative number represents the user transaction fee charged by the platform.  
  Positive number represents rebate.  
  [Trading fee rule](/en/fees) | | earnAmt | String | Auto earn amount  
  Only applicable when type is 381 | | earnApr | String | Auto earn APR  
  Only applicable when type is 381 | | mgnMode | String | Margin mode  
  `isolated` `cross` `cash`  
  When bills are not generated by trading, the field returns "" | | instId |
  String | Instrument ID, e.g. `BTC-USDT` | | ordId | String | Order ID  
  Return order ID when the type is `2`/`5`/`9`  
  Return "" when there is no order. | | execType | String | Liquidity taker or
  maker  
  `T`: taker `M`: maker | | from | String | The remitting account  
  `6`: Funding account  
  `18`: Trading account  
  Only applicable to `transfer`. When bill type is not `transfer`, the field
  returns "". | | to | String | The beneficiary account  
  `6`: Funding account  
  `18`: Trading account  
  Only applicable to `transfer`. When bill type is not `transfer`, the field
  returns "". | | notes | String | Notes | | interest | String | Interest | |
  tag | String | Order tag | | fillTime | String | Last filled time | | tradeId
  | String | Last traded ID | | clOrdId | String | Client Order ID as assigned
  by the client  
  A combination of case-sensitive alphanumerics, all numbers, or all letters of
  up to 32 characters. | | fillIdxPx | String | Index price at the moment of
  trade execution  
  For cross currency spot pairs, it returns baseCcy-USDT index price. For
  example, for LTC-ETH, this field returns the index price of LTC-USDT. | |
  fillMarkPx | String | Mark price when filled  
  Applicable to FUTURES/SWAP/OPTIONS, return "" for other instrument types | |
  fillPxVol | String | Implied volatility when filled  
  Only applicable to options; return "" for other instrument types | | fillPxUsd
  | String | Options price when filled, in the unit of USD  
  Only applicable to options; return "" for other instrument types | |
  fillMarkVol | String | Mark volatility when filled  
  Only applicable to options; return "" for other instrument types | | fillFwdPx
  | String | Forward price when filled  
  Only applicable to options; return "" for other instrument types |

**Funding Fee expense (subType = 173)**  
You may refer to "pnl" for the fee payment
