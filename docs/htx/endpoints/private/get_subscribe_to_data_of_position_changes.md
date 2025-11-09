# GET Subscribe to data of position changes

**Source:**
[Subscribe to data of position changes](https://www.htx.com/en-us/opend/newApiPages/?id=8cb89359-77b5-11ed-9966-195a35d6034)

**Category:** Private Channels

## Authentication

Required (Private Endpoint)

### positions. $contract_code (Subscribe to data of position changes)

Signature verification: Yes

Interface permission: Read

Rate Limit: WebSocket private order transaction push interface (API KEY
verification is required) A UID can establish up to 30 private order transaction
push WS links at the same time. The user only needs to maintain one order push
WS link on one product (including all periodic contracts of the product). A
single link is 50 requests per second, and a single IP link is 100 requests per
second. Note: The frequency limit of the order push WS is separate from the
frequency limit of the user's RESTFUL private interface and does not affect each
other.

Interface description: When position details change, such as opening, adding to,
or closing positions, or adjusting isolated margin, the following information
will be pushed.

#### Subscription Address

| Environment                         | Address                               |
| ----------------------------------- | ------------------------------------- |
| Online                              | wss://api.hbdm.com/ws/v5/notification |
| Online (preferred by aws customers) | wss://api.hbdm.vn/ws/v5/notification  |

#### Request Parameter

| Field Name    | Type   | Description                                                    |
| ------------- | ------ | -------------------------------------------------------------- |
| op            | string | Must. Use sub or unsub.                                        |
| cid           | string | Optional. The unique ID of the client.                         |
| topic         | string | Must. positions\_$contract_code                                |
| contract_code | string | Must. Perpetual: "BTC-USDT"...; Delivery: "BTC-USDT-210625"... |

#### Rule description

| Subscribe(sub) | Unsubscribe( unsub ) | Rule |
| -------------- | -------------------- | ---- |
| \*             | \*                   | yes  |
| \*             | contract_code1       | no   |

#### Subscription Parameter

| Parameter     | Data Type | Required | Description              | Value Range                                                                                | Default Value |
| ------------- | --------- | -------- | ------------------------ | ------------------------------------------------------------------------------------------ | ------------- |
| contract_code | string    | true     | Symbol. Case-insensitive | All: \* (Delivery and perpetual); Perpetual: "BTC-USDT"...; Delivery: "BTC-USDT-210625"... |               |
| cid           | string    | false    | Current request's ID     |                                                                                            |               |

#### Data Update

| Parameter          | Data Type    | Required | Description                                          | Value Range                                                                                                                                                                                                                                                                                      |
| ------------------ | ------------ | -------- | ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| op                 | string       | true     | Operation name                                       | notify                                                                                                                                                                                                                                                                                           |
| topic              | string       | true     | Push topic                                           |                                                                                                                                                                                                                                                                                                  |
| ts                 | long         | true     | Timestamp of server response                         |                                                                                                                                                                                                                                                                                                  |
| event              | string       | true     | Position change explanation                          | Event Type: snapshot: Snapshot of the first push message cancel_order: Order cancellation delivered: Contract delivered; transferred: Assets transferred; filled: Order executed; liquidation: Forced liquidation; adl: Auto deleveraging; funding_fee: Funding fees; set_leverage: Set leverage |
| uid                | string       | true     | User UID                                             |                                                                                                                                                                                                                                                                                                  |
| DATA_START         |              | false    |                                                      |                                                                                                                                                                                                                                                                                                  |
| contract_code      | string       | true     | Symbol                                               |                                                                                                                                                                                                                                                                                                  |
| position_side      | string       | true     | Position side                                        | The side of your position. Under the buy/sell mode, "both" is default. Under the long/short mode, "long" refers to going long; "short" refers to going short.                                                                                                                                    |
| margin_mode        | string       | true     | Margin mode                                          | cross: Cross margin                                                                                                                                                                                                                                                                              |
| open_avg_price     | string       | true     | Avg. entry price                                     |                                                                                                                                                                                                                                                                                                  |
| volume             | string       | true     | Position size (Cont                                  |                                                                                                                                                                                                                                                                                                  |
| available          | string       | true     | Amount of position available to be closed (Cont)     |                                                                                                                                                                                                                                                                                                  |
| fee                | string       | true     | Position closing fee                                 |                                                                                                                                                                                                                                                                                                  |
| lever_rate         | string       | true     | Leverage                                             |                                                                                                                                                                                                                                                                                                  |
| adl_risk_percent   | string       | true     | ADL indicator                                        | Level 1, 2, 3, 4, 5, with level 1 representing the lowest risk and level 5 representing the highest risk.                                                                                                                                                                                        |
| liquidation_price  | string       | true     | Est. liquidation price                               |                                                                                                                                                                                                                                                                                                  |
| direction          | string       | true     | Order direction                                      | "buy": purchase; "sell": sell                                                                                                                                                                                                                                                                    |
| initial_margin     | string       | true     | Initial margin, only applicable to cross margin mode |                                                                                                                                                                                                                                                                                                  |
| maintenance_margin | string       | true     | Maintenance margin                                   |                                                                                                                                                                                                                                                                                                  |
| profit_unreal      | string       | true     | Unrealized PnL                                       |                                                                                                                                                                                                                                                                                                  |
| profit_rate        | string       | true     | Unrealized PnL percentage                            |                                                                                                                                                                                                                                                                                                  |
| margin_rate        | string       | true     | Margin ratio                                         |                                                                                                                                                                                                                                                                                                  |
| state              | string       | true     | Position status                                      | normal, liq, adl                                                                                                                                                                                                                                                                                 |
| funding_fee        | string       | true     | Total funding fee                                    |                                                                                                                                                                                                                                                                                                  |
| last_price         | decimal      | true     | Last Price                                           |                                                                                                                                                                                                                                                                                                  |
| contract_type      | stringstring | true     | Business                                             | swap: Perpetual; this_week: Weekly; next_week: Bi-weekly; quarter: Quarterly; next_quarter: Bi-quarterly                                                                                                                                                                                         |
| created_time       | string       | true     | Creation time                                        |                                                                                                                                                                                                                                                                                                  |
| updated_time       | string       | true     | Update time                                          |                                                                                                                                                                                                                                                                                                  |
| version            | int          | true     | Version Number                                       |                                                                                                                                                                                                                                                                                                  |
| DATA_START         |              | false    |                                                      |                                                                                                                                                                                                                                                                                                  |

#### Subscription Example

{

"op":

"sub"

"cid":

"NuAWMqWKSI"

"topic":

"positions"

"contract_code":

"EOS-USDT"

}

#### Example of a Successful Subscription

{

"op":

"sub"

"cid":

"NuAWMqWKSI"

"topic":

"positions"

"ts":

1734683308615

"err-code":

0

"contract_code":

"EOS-USDT"

}

#### Example of a Data Update

{

"op":

"notify"

"topic":

"positions"

"contract_code":

"EOS-USDT"

"ts":

1734683308618

"uid":

"413120795"

"event":

"snapshot"

"data":\[

0:{

"contract_code":

"EOS-USDT"

"symbol":

"EOS"

"position_mode":

"dual_side"

"position_side":

"short"

"direction":

"sell"

"margin_mode":

"cross"

"open_avg_price":

"0.492"

"volume":

"1"

"available":

"1"

"fee":

"0.8856"

"lever_rate":

9

"adl_risk_percent":

NULL

"liquidation_price":

"11.408717810946043845"

"initial_margin":

"55.87624909281424"

"maintenance_margin":

"2.5144312091766408"

"profit_unreal":

"-10.88624183532816"

"profit":

"-21"

"profit_rate":

"-0.1948"

"margin_rate":

"0.000229358737821968"

"state":

"normal"

"funding_fee":

"-3.749999999225936542"

"mark_price":

"0.50289749455688544"

"contract_type":

"swap"

"version":

21

"created_time":

1734675591497

"updated_time":

1734682810399

}

\]

}

#### Example of a Subscription Cancellation

No data
