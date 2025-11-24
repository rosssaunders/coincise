# GET /api/v5/account/config

Source:
[https://www.okx.com/docs-v5/en/#trading-account-rest-api-get-account-configuration](https://www.okx.com/docs-v5/en/#trading-account-rest-api-get-account-configuration)

### Get account configuration

Retrieve current account configuration.

#### Rate Limit: 5 requests per 2 seconds

#### Rate limit rule: User ID

#### Permission: Read

#### HTTP Request

`GET /api/v5/account/config`

#### Request Parameters

none

#### Response Parameters

| **Parameter** | **Type** | **Description**                     |
| ------------- | -------- | ----------------------------------- |
| uid           | String   | Account ID of current request.      |
| mainUid       | String   | Main Account ID of current request. |

The current request account is main account if uid = mainUid.  
The current request account is sub-account if uid != mainUid. | | acctLv |
String | Account mode  
`1`: Spot mode  
`2`: Futures mode  
`3`: Multi-currency margin  
`4`: Portfolio margin | | acctStpMode | String | Account self-trade prevention
mode  
`cancel_maker`  
`cancel_taker`  
`cancel_both`  
The default value is `cancel_maker`. Users can log in to the webpage through the
master account to modify this configuration | | posMode | String | Position
mode  
`long_short_mode`: long/short, only applicable to `FUTURES`/`SWAP`  
`net_mode`: net | | autoLoan | Boolean | Whether to borrow coins automatically  
`true`: borrow coins automatically  
`false`: not borrow coins automatically | | greeksType | String | Current
display type of Greeks  
`PA`: Greeks in coins  
`BS`: Black-Scholes Greeks in dollars | | feeType | String | Fee type  
`0`: fee is charged in the currency you receive from the trade  
`1`: fee is always charged in the quote currency of the trading pair | | level |
String | The user level of the current real trading volume on the platform, e.g
`Lv1`, which means regular user level. | | levelTmp | String | Temporary
experience user level of special users, e.g `Lv1` | | ctIsoMode | String |
Contract isolated margin trading settings  
`automatic`: Auto transfers  
`autonomy`: Manual transfers | | mgnIsoMode | String | Margin isolated margin
trading settings  
`auto_transfers_ccy`: New auto transfers, enabling both base and quote currency
as the margin for isolated margin trading  
`automatic`: Auto transfers  
`quick_margin`: Quick Margin Mode (For new accounts, including subaccounts, some
defaults will be `automatic`, and others will be `quick_margin`) | |
spotOffsetType | String | ~Risk offset type  
`1`: Spot-Derivatives(USDT) to be offsetted  
`2`: Spot-Derivatives(Coin) to be offsetted  
`3`: Only derivatives to be offsetted  
Only applicable to `Portfolio margin`~  
(Deprecated) | | stgyType | String | Strategy type  
`0`: general strategy  
`1`: delta neutral strategy | | roleType | String | Role type  
`0`: General user  
`1`: Leading trader  
`2`: Copy trader | | traderInsts | Array of strings | Leading trade instruments,
only applicable to Leading trader | | spotRoleType | String | SPOT copy trading
role type.  
`0`: General user；`1`: Leading trader；`2`: Copy trader | | spotTraderInsts |
Array of strings | Spot lead trading instruments, only applicable to lead trader
| | opAuth | String | Whether the optional trading was activated  
`0`: not activate  
`1`: activated | | kycLv | String | Main account KYC level  
`0`: No verification  
`1`: level 1 completed  
`2`: level 2 completed  
`3`: level 3 completed  
If the request originates from a subaccount, kycLv is the KYC level of the main
account.  
If the request originates from the main account, kycLv is the KYC level of the
current account. | | label | String | API key note of current request API key.
No more than 50 letters (case sensitive) or numbers, which can be pure letters
or pure numbers. | | ip | String | IP addresses that linked with current API
key, separate with commas if more than one, e.g. `117.37.203.58,117.37.203.57`.
It is an empty string "" if there is no IP bonded. | | perm | String | The
permission of the current requesting API key or Access token  
`read_only`: Read  
`trade`: Trade  
`withdraw`: Withdraw | | liquidationGear | String | The maintenance margin ratio
level of liquidation alert  
`3` and `-1` means that you will get hourly liquidation alerts on app and
channel "Position risk warning" when your margin level drops to or below 300%.
`-1` is the initial value which has the same effect as `-3`  
`0` means that there is not alert | | enableSpotBorrow | Boolean | Whether
borrow is allowed or not in `Spot mode`  
`true`: Enabled  
`false`: Disabled | | spotBorrowAutoRepay | Boolean | Whether auto-repay is
allowed or not in `Spot mode`  
`true`: Enabled  
`false`: Disabled | | type | String | Account type  
`0`: Main account  
`1`: Standard sub-account  
`2`: Managed trading sub-account  
`5`: Custody trading sub-account - Copper  
`9`: Managed trading sub-account - Copper  
`12`: Custody trading sub-account - Komainu | | settleCcy | String | Current
account's USD-margined contract settle currency | | settleCcyList | String |
Current account's USD-margined contract settle currency list, like \["USD",
"USDC", "USDG"\]. |
