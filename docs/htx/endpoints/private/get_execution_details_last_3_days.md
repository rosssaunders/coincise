# GET Execution Details (last 3 days)

**Source:** [Get Execution Details (last 3 days)](https://www.htx.com/en-us/opend/newApiPages/?id=8cb89359-77b5-11ed-9966-195898804f0)

**Category:** Orders

## Authentication

Required (Private Endpoint)

### /v5/trade/order/details (Get Execution Details (last 3 days))

Request type: GET

Signature verification: Yes

Interface permission: Read

Rate Limit: Generally, the private interface rate limit of API key is at most 144 times every 3 seconds for each UID (Trade Interface: at most 72 times every 3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is shared by all the altcoins contracts delivered by different date).

Interface description: Get detailed information about your executed futures orders in the last three days.

#### Request Address

| Environment | Address |
| --- | --- |
| Online (preferred by aws customers) | https://api.hbdm.vn |
| Online | https://api.hbdm.com |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | String | false | Symbol |  |  |
| order\_id | String | false | Order ID |  |  |
| start\_time | String | false | Starting time of the history, Unix timestamp format in milliseconds. | Last 90 days Default value (now) – 48h |  |
| end\_time | String | false | Ending time of the history, Unix timestamp format in milliseconds. | Last 90 days Default value (now) – 48h |  |
| from | Long | false | ID for the query starts at 0 by default. |  |  |
| limit | Integer | false | Pagination size defaults to 10, with a maximum limit of 100. |  |  |
| direct | String | false | prev, next |  |  |

Notes: Note: Either ordId or clOrdId must be provided, but if both are provided, ordId will take precedence.

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| id | String | false | Query ID |  |
| contract\_code | String | false | Symbol | Perpetual: "BTC-USDT"...; Delivery: "BTC-USDT-210625"... |
| order\_id | String | false | Order ID |  |
| trade\_id | String | false | Trade ID |  |
| side | String | false | Buy or Sell |  |
| position\_side | String | false | Position side | long: going long; short: going short; both: One-way mode |
| order\_type | String | false | Execution Type: "1":"trade", "3":"liquidation" ,"4":"delivery","22":"adl" |  |
| margin\_mode | String | false | Cross margin; enumeration |  |
| type | String | false | Order type. Enumerate "market", "limit", and "post\_only" |  |
| client\_order\_id | String | false | Order ID you entered |  |
| role | String | false | Execution Role: Maker, Taker |  |
| trade\_price | String | false | Execution price |  |
| trade\_volume | String | false | Execution amount (Cont) |  |
| trade\_turnover | String | false | Total value executed (= Execution amount \* Face value \* Execution price) |  |
| created\_time | String | false | Creation time |  |
| updated\_time | String | false | Update time, defaulting to execution time |  |
| order\_source | String | false | Order source | system: System; web: Website for PC clients, api: API, m: Website for mobile clients, risk: Risk management system, settlement: Delivery settlement, ios: iOS clients, android: Android clients, windows: Windows clients, mac: Mac clients, trigger: Conditional order trigger, tpsl: Take profit or stop loss order, ADL: Auto deleveraging orders |
| fee\_currency | String | false | Currency for fee payment; if multiple currencies are used, separate them with a comma. |  |
| trade\_fee | String | false | Total trading fees in USDT |  |
| deduction\_price | String | false | Price of the crypto for deduction (USDT) |  |
| profit | String | false | Closing PnL |  |
| contract\_type | String | false | Contract type | swap: Perpetual; this\_week: Weekly; next\_week: Bi-weekly; quarter: Quarterly; next\_quarter: Bi-quarterly |

#### Request example

{

"order\_id":

"1343541341268738048"

}

#### Response Example

##### Success Example

{

"code":

200

"message":

"Success"

"data":\[

0:{

"id":

"1124147771"

"contract\_code":

"BTC-USDT"

"order\_id":

"1343541341268738048"

"trade\_id":

"100000032538647"

"side":

"sell"

"position\_side":

"short"

"order\_type":

"1"

"margin\_mode":

"cross"

"type":

"limit"

"role":

"TAKER"

"trade\_price":

"31400"

"trade\_volume":

"1"

"trade\_turnover":

"31.4"

"created\_time":

1740366817564

"updated\_time":

1740366817564

"order\_source":

"api"

"fee\_currency":

"USDT"

"trade\_fee":

"0.01884"

"deduction\_price":

""

"profit":

"0"

"contract\_type":

"swap"

}

\]

"ts":

1740377316667

}