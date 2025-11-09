# GET Execution Details (last 3 days)

**Source:**
[Get Execution Details (last 3 days)](https://www.htx.com/en-us/opend/newApiPages/?id=8cb89359-77b5-11ed-9966-195898804f0)

**Category:** Orders

## Authentication

Required (Private Endpoint)

### /v5/trade/order/details (Get Execution Details (last 3 days))

Request type: GET

Signature verification: Yes

Interface permission: Read

Rate Limit: Generally, the private interface rate limit of API key is at most
144 times every 3 seconds for each UID (Trade Interface: at most 72 times every
3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is
shared by all the altcoins contracts delivered by different date).

Interface description: Get detailed information about your executed futures
orders in the last three days.

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online (preferred by aws customers) | https://api.hbdm.vn  |
| Online                              | https://api.hbdm.com |

#### Request Parameter

| Parameter     | Data Type | Required | Description                                                          | Value Range                            | Default Value |
| ------------- | --------- | -------- | -------------------------------------------------------------------- | -------------------------------------- | ------------- |
| contract_code | String    | false    | Symbol                                                               |                                        |               |
| order_id      | String    | false    | Order ID                                                             |                                        |               |
| start_time    | String    | false    | Starting time of the history, Unix timestamp format in milliseconds. | Last 90 days Default value (now) – 48h |               |
| end_time      | String    | false    | Ending time of the history, Unix timestamp format in milliseconds.   | Last 90 days Default value (now) – 48h |               |
| from          | Long      | false    | ID for the query starts at 0 by default.                             |                                        |               |
| limit         | Integer   | false    | Pagination size defaults to 10, with a maximum limit of 100.         |                                        |               |
| direct        | String    | false    | prev, next                                                           |                                        |               |

Notes: Note: Either ordId or clOrdId must be provided, but if both are provided,
ordId will take precedence.

#### Response Parameter

| Parameter       | Data Type | Required | Description                                                                            | Value Range                                                                                                                                                                                                                                                                                                                                          |
| --------------- | --------- | -------- | -------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id              | String    | false    | Query ID                                                                               |                                                                                                                                                                                                                                                                                                                                                      |
| contract_code   | String    | false    | Symbol                                                                                 | Perpetual: "BTC-USDT"...; Delivery: "BTC-USDT-210625"...                                                                                                                                                                                                                                                                                             |
| order_id        | String    | false    | Order ID                                                                               |                                                                                                                                                                                                                                                                                                                                                      |
| trade_id        | String    | false    | Trade ID                                                                               |                                                                                                                                                                                                                                                                                                                                                      |
| side            | String    | false    | Buy or Sell                                                                            |                                                                                                                                                                                                                                                                                                                                                      |
| position_side   | String    | false    | Position side                                                                          | long: going long; short: going short; both: One-way mode                                                                                                                                                                                                                                                                                             |
| order_type      | String    | false    | Execution Type: "1":"trade", "3":"liquidation" ,"4":"delivery","22":"adl"              |                                                                                                                                                                                                                                                                                                                                                      |
| margin_mode     | String    | false    | Cross margin; enumeration                                                              |                                                                                                                                                                                                                                                                                                                                                      |
| type            | String    | false    | Order type. Enumerate "market", "limit", and "post_only"                               |                                                                                                                                                                                                                                                                                                                                                      |
| client_order_id | String    | false    | Order ID you entered                                                                   |                                                                                                                                                                                                                                                                                                                                                      |
| role            | String    | false    | Execution Role: Maker, Taker                                                           |                                                                                                                                                                                                                                                                                                                                                      |
| trade_price     | String    | false    | Execution price                                                                        |                                                                                                                                                                                                                                                                                                                                                      |
| trade_volume    | String    | false    | Execution amount (Cont)                                                                |                                                                                                                                                                                                                                                                                                                                                      |
| trade_turnover  | String    | false    | Total value executed (= Execution amount \* Face value \* Execution price)             |                                                                                                                                                                                                                                                                                                                                                      |
| created_time    | String    | false    | Creation time                                                                          |                                                                                                                                                                                                                                                                                                                                                      |
| updated_time    | String    | false    | Update time, defaulting to execution time                                              |                                                                                                                                                                                                                                                                                                                                                      |
| order_source    | String    | false    | Order source                                                                           | system: System; web: Website for PC clients, api: API, m: Website for mobile clients, risk: Risk management system, settlement: Delivery settlement, ios: iOS clients, android: Android clients, windows: Windows clients, mac: Mac clients, trigger: Conditional order trigger, tpsl: Take profit or stop loss order, ADL: Auto deleveraging orders |
| fee_currency    | String    | false    | Currency for fee payment; if multiple currencies are used, separate them with a comma. |                                                                                                                                                                                                                                                                                                                                                      |
| trade_fee       | String    | false    | Total trading fees in USDT                                                             |                                                                                                                                                                                                                                                                                                                                                      |
| deduction_price | String    | false    | Price of the crypto for deduction (USDT)                                               |                                                                                                                                                                                                                                                                                                                                                      |
| profit          | String    | false    | Closing PnL                                                                            |                                                                                                                                                                                                                                                                                                                                                      |
| contract_type   | String    | false    | Contract type                                                                          | swap: Perpetual; this_week: Weekly; next_week: Bi-weekly; quarter: Quarterly; next_quarter: Bi-quarterly                                                                                                                                                                                                                                             |

#### Request example

{

"order_id":

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

"contract_code":

"BTC-USDT"

"order_id":

"1343541341268738048"

"trade_id":

"100000032538647"

"side":

"sell"

"position_side":

"short"

"order_type":

"1"

"margin_mode":

"cross"

"type":

"limit"

"role":

"TAKER"

"trade_price":

"31400"

"trade_volume":

"1"

"trade_turnover":

"31.4"

"created_time":

1740366817564

"updated_time":

1740366817564

"order_source":

"api"

"fee_currency":

"USDT"

"trade_fee":

"0.01884"

"deduction_price":

""

"profit":

"0"

"contract_type":

"swap"

}

\]

"ts":

1740377316667

}
