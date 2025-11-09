# GET Subscribe to data of account-related changes

**Source:**
[Subscribe to data of account-related changes](https://www.htx.com/en-us/opend/newApiPages/?id=8cb89359-77b5-11ed-9966-195a6c94551)

**Category:** Private Channels

## Authentication

Required (Private Endpoint)

### account (Subscribe to data of account-related changes)

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

Interface description: When changes occur in the static amount of the account,
such as margin freezing or releasing, funding rate settlements, and realized
PnLs, the following account-related information will be pushed.

#### Subscription Address

| Environment                         | Address                               |
| ----------------------------------- | ------------------------------------- |
| Online                              | wss://api.hbdm.com/ws/v5/notification |
| Online (preferred by aws customers) | wss://api.hbdm.vn/ws/v5/notification  |

#### Request Parameter

| Field Name | Type   | Description                           |
| ---------- | ------ | ------------------------------------- |
| op         | string | Must. Use sub or unsub                |
| cid        | string | Optional. The unique ID of the client |
| topic      | string | Must. account                         |

#### Rule description

| Subscribe(sub)         | Unsubscribe( unsub ) | Rule |
| ---------------------- | -------------------- | ---- |
| account                | account              | yes  |
| account.contract_code1 | account.\*           | no   |

#### Subscription Parameter

| Parameter | Data Type | Required | Description          | Value Range | Default Value |
| --------- | --------- | -------- | -------------------- | ----------- | ------------- |
| cid       | string    | false    | Current request's ID |             |               |

#### Data Update

| Parameter               | Data Type | Required | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Value Range                                                                                                                                                                                                                                                                                                                     |
| ----------------------- | --------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| op                      | string    | true     | Operation name, with a fixed value of "notify"                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |                                                                                                                                                                                                                                                                                                                                 |
| topic                   | string    | true     | Push topic                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |                                                                                                                                                                                                                                                                                                                                 |
| ts                      | long      | true     | Timestamp of server response                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |                                                                                                                                                                                                                                                                                                                                 |
| event                   | string    | true     | Account-related change explanation                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Event Type: snapshot: Snapshot of the first push message cancel_order: Order cancellation delivered: Contract delivered; transferred: Assets transferred; filled: Order executed; liquidation: Forced liquidation; adl: Auto deleveraging; funding_fee: Funding fees; set_leverage: Set leverage ; auto_exchange：Auto exchange |
| uid                     | string    | true     | User UID                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |                                                                                                                                                                                                                                                                                                                                 |
| DATA_START              |           | false    |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |                                                                                                                                                                                                                                                                                                                                 |
| state                   | string    | true     | Account status 1(NORMAL): The account is functioning normally for trading and transfers. 3 (LIQUIDATING): The account is under liquidation, and trading, transfers, and the receipt of funding fees are unavailable. 5(ADL): The account is under auto deleveraging, and trading, transfers, and the receipt of funding fees are unavailable. 6(OPEN_LIMIT): Orders are being canceled for risk management. Only ADL orders are allowed for futures trading; transfers in are permitted, but transfers out are not allowed. |                                                                                                                                                                                                                                                                                                                                 |
| equity                  | string    | true     | Account Equity                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |                                                                                                                                                                                                                                                                                                                                 |
| initial_margin          | string    | true     | Initial margin                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |                                                                                                                                                                                                                                                                                                                                 |
| maintenance_margin      | string    | true     | Maintenance margin                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |                                                                                                                                                                                                                                                                                                                                 |
| maintenance_margin_rate | string    | true     | Maintenance margin ratio                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |                                                                                                                                                                                                                                                                                                                                 |
| profit_unreal           | string    | true     | Unrealized PnL                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |                                                                                                                                                                                                                                                                                                                                 |
| available_margin        | string    | true     | Available collateral                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |                                                                                                                                                                                                                                                                                                                                 |
| voucher_value           | String    | true     | voucher value(usdt)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |                                                                                                                                                                                                                                                                                                                                 |
| created_time            | string    | true     | Account creation time                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |                                                                                                                                                                                                                                                                                                                                 |
| updated_time            | string    | true     | Account update time                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |                                                                                                                                                                                                                                                                                                                                 |
| details                 | string    | true     |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |                                                                                                                                                                                                                                                                                                                                 |
| currency                | string    | true     | Cryptocurrency                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |                                                                                                                                                                                                                                                                                                                                 |
| equity                  | string    | true     | Equity of a cryptocurrency                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |                                                                                                                                                                                                                                                                                                                                 |
| available               | string    | true     | Available balance of a cryptocurrency                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |                                                                                                                                                                                                                                                                                                                                 |
| withdraw_available      | String    | true     | Transferable balance of a cryptocurrency                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |                                                                                                                                                                                                                                                                                                                                 |
| profit_unreal           | string    | true     | Unrealized PnL                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |                                                                                                                                                                                                                                                                                                                                 |
| initial_margin          | string    | true     | Initial margin of a cryptocurrency                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |                                                                                                                                                                                                                                                                                                                                 |
| maintenance_margin      | string    | true     | Maintenance margin of a cryptocurrency                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |                                                                                                                                                                                                                                                                                                                                 |
| maintenance_margin_rate | string    | true     | Maintenance margin ratio of a cryptocurrency                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |                                                                                                                                                                                                                                                                                                                                 |
| initial_margin_rate     | string    | true     | Initial margin ratio of a cryptocurrency                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |                                                                                                                                                                                                                                                                                                                                 |
| voucher                 | String    | true     | voucher                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |                                                                                                                                                                                                                                                                                                                                 |
| voucher_value           | String    | true     | voucher value(usdt)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |                                                                                                                                                                                                                                                                                                                                 |
| created_time            | string    | true     | Creation time                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |                                                                                                                                                                                                                                                                                                                                 |
| updated_time            | string    | true     | Update time                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |                                                                                                                                                                                                                                                                                                                                 |
| DATA_START              |           | true     |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |                                                                                                                                                                                                                                                                                                                                 |

#### Subscription Example

{

"op":

"sub"

"cid":

"CEP7ozFIYa"

"topic":

"account"

}

#### Example of a Successful Subscription

{

"op":

"auth"

"cid":

"CEP7ozFIYa"

"type":

"api"

"err-code":

0

"ts":

1734406065549

"data":{

"user-id":

"41311196"

}

}

#### Example of a Data Update

{

"op":

"notify"

"topic":

"account"

"contract_code":

""

"ts":

1734681235891

"uid":

"413120795"

"event":

"snapshot"

"data":{

"equity":

"10264.111400000000001"

"state":

"normal"

"details":\[

0:{

"currency":

"USDT"

"equity":

"10264.111400000000001"

"available":

"10977.511400000000001"

"profit_unreal":

"-713.4"

"initial_margin":

"133.933333333333333333"

"maintenance_margin":

"6.027"

"maintenance_margin_rate":

"0.00058719160043411"

"initial_margin_rate":

"0.013048702231869125"

"voucher":

""

"voucher_value":

""

"withdraw_available":

"123456"

"created_time":

1734675405381

"updated_time":

1734681182933

}

1:{

"currency":

"BTC"

"equity":

"0"

"available":

"0"

"profit_unreal":

"0"

"initial_margin":

"0"

"maintenance_margin":

"0"

"maintenance_margin_rate":

"0"

"initial_margin_rate":

"0"

"voucher":

""

"voucher_value":

""

"withdraw_available":

"123456"

"created_time":

1734675456866

"updated_time":

1734675570751

}

\]

"initial_margin":

"133.933333333333333333"

"maintenance_margin":

"6.027"

"maintenance_margin_rate":

"0.00058719160043411"

"profit_unreal":

"-713.4"

"available_margin":

"10130.178066666666667667"

"created_time":

1734668300071

"updated_time":

1734681182933

"voucher_value":

""

"version":

1010

}

}

#### Example of a Subscription Cancellation

No data
