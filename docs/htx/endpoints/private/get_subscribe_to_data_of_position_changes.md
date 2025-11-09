# GET Subscribe to data of position changes

**Source:** [Subscribe to data of position changes](https://www.htx.com/en-us/opend/newApiPages/?id=8cb89359-77b5-11ed-9966-195a35d6034)

**Category:** Private Channels

## Authentication

Required (Private Endpoint)

### positions. $contract\_code (Subscribe to data of position changes)

Signature verification: Yes

Interface permission: Read

Rate Limit: WebSocket private order transaction push interface (API KEY verification is required) A UID can establish up to 30 private order transaction push WS links at the same time. The user only needs to maintain one order push WS link on one product (including all periodic contracts of the product). A single link is 50 requests per second, and a single IP link is 100 requests per second. Note: The frequency limit of the order push WS is separate from the frequency limit of the user's RESTFUL private interface and does not affect each other.

Interface description: When position details change, such as opening, adding to, or closing positions, or adjusting isolated margin, the following information will be pushed.

#### Subscription Address

| Environment | Address |
| --- | --- |
| Online | wss://api.hbdm.com/ws/v5/notification |
| Online (preferred by aws customers) | wss://api.hbdm.vn/ws/v5/notification |

#### Request Parameter

| Field Name | Type | Description |
| --- | --- | --- |
| op | string | Must. Use sub or unsub. |
| cid | string | Optional. The unique ID of the client. |
| topic | string | Must. positions\_$contract\_code |
| contract\_code | string | Must. Perpetual: "BTC-USDT"...; Delivery: "BTC-USDT-210625"... |

#### Rule description

| Subscribe(sub) | Unsubscribe( unsub ) | Rule |
| --- | --- | --- |
| \* | \* | yes |
| \* | contract\_code1 | no |

#### Subscription Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | true | Symbol. Case-insensitive | All: \* (Delivery and perpetual); Perpetual: "BTC-USDT"...; Delivery: "BTC-USDT-210625"... |  |
| cid | string | false | Current request's ID |  |  |

#### Data Update

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| op | string | true | Operation name | notify |
| topic | string | true | Push topic |  |
| ts | long | true | Timestamp of server response |  |
| event | string | true | Position change explanation | Event Type: snapshot: Snapshot of the first push message cancel\_order: Order cancellation delivered: Contract delivered; transferred: Assets transferred; filled: Order executed; liquidation: Forced liquidation; adl: Auto deleveraging; funding\_fee: Funding fees; set\_leverage: Set leverage |
| uid | string | true | User UID |  |
| DATA\_START |  | false |  |  |
| contract\_code | string | true | Symbol |  |
| position\_side | string | true | Position side | The side of your position. Under the buy/sell mode, "both" is default. Under the long/short mode, "long" refers to going long; "short" refers to going short. |
| margin\_mode | string | true | Margin mode | cross: Cross margin |
| open\_avg\_price | string | true | Avg. entry price |  |
| volume | string | true | Position size (Cont |  |
| available | string | true | Amount of position available to be closed (Cont) |  |
| fee | string | true | Position closing fee |  |
| lever\_rate | string | true | Leverage |  |
| adl\_risk\_percent | string | true | ADL indicator | Level 1, 2, 3, 4, 5, with level 1 representing the lowest risk and level 5 representing the highest risk. |
| liquidation\_price | string | true | Est. liquidation price |  |
| direction | string | true | Order direction | "buy": purchase; "sell": sell |
| initial\_margin | string | true | Initial margin, only applicable to cross margin mode |  |
| maintenance\_margin | string | true | Maintenance margin |  |
| profit\_unreal | string | true | Unrealized PnL |  |
| profit\_rate | string | true | Unrealized PnL percentage |  |
| margin\_rate | string | true | Margin ratio |  |
| state | string | true | Position status | normal, liq, adl |
| funding\_fee | string | true | Total funding fee |  |
| last\_price | decimal | true | Last Price |  |
| contract\_type | stringstring | true | Business | swap: Perpetual; this\_week: Weekly; next\_week: Bi-weekly; quarter: Quarterly; next\_quarter: Bi-quarterly |
| created\_time | string | true | Creation time |  |
| updated\_time | string | true | Update time |  |
| version | int | true | Version Number |  |
| DATA\_START |  | false |  |  |

#### Subscription Example

{

"op":

"sub"

"cid":

"NuAWMqWKSI"

"topic":

"positions"

"contract\_code":

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

"contract\_code":

"EOS-USDT"

}

#### Example of a Data Update

{

"op":

"notify"

"topic":

"positions"

"contract\_code":

"EOS-USDT"

"ts":

1734683308618

"uid":

"413120795"

"event":

"snapshot"

"data":\[

0:{

"contract\_code":

"EOS-USDT"

"symbol":

"EOS"

"position\_mode":

"dual\_side"

"position\_side":

"short"

"direction":

"sell"

"margin\_mode":

"cross"

"open\_avg\_price":

"0.492"

"volume":

"1"

"available":

"1"

"fee":

"0.8856"

"lever\_rate":

9

"adl\_risk\_percent":

NULL

"liquidation\_price":

"11.408717810946043845"

"initial\_margin":

"55.87624909281424"

"maintenance\_margin":

"2.5144312091766408"

"profit\_unreal":

"-10.88624183532816"

"profit":

"-21"

"profit\_rate":

"-0.1948"

"margin\_rate":

"0.000229358737821968"

"state":

"normal"

"funding\_fee":

"-3.749999999225936542"

"mark\_price":

"0.50289749455688544"

"contract\_type":

"swap"

"version":

21

"created\_time":

1734675591497

"updated\_time":

1734682810399

}

\]

}

#### Example of a Subscription Cancellation

No data