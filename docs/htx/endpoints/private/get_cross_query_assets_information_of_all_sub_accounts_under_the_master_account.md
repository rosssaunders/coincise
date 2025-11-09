# GET [Cross] Query Assets Information Of All Sub-Accounts Under The Master Account

**Source:**
[[Cross] Query Assets Information Of All Sub-Accounts Under The Master Account](https://www.htx.com/en-us/opend/newApiPages/?id=8cb8221f-77b5-11ed-9966-0242ac110003)

**Category:** Swap Account Interface

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v1/swap_cross_sub_account_list (\[Cross\] Query Assets Information Of All Sub-Accounts Under The Master Account)

Request type: POST

Signature verification: Yes

Interface permission: Read

Rate Limit: Generally, the private interface rate limit of API key is at most
144 times every 3 seconds for each UID (Trade Interface: at most 72 times every
3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is
shared by all the altcoins contracts delivered by different date).

Interface description: The interface only supports cross margin mode.

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter      | Data Type | Required | Description                                                                                                                                                                              | Value Range                   | Default Value |
| -------------- | --------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- | ------------- |
| margin_account | string    | false    | margin account，return all margin account info when null                                                                                                                                 | "USDT"...，but now only USDT  |               |
| direct         | string    | false    | Search direct, If the direction is NEXT, the data is returned in positive chronological order; if the direction is PREV, the data is returned in reverse chronological order             | next, prev default is next    | next          |
| from_id        | long      | false    | If the query direction is prev, from_id should be the min query_id in the last query result. If the query direction is next, from_id should be the max query_id in the last query result | Search query_id to begin with |               |

#### Response Parameter

| Parameter               | Data Type    | Required | Description                                                                  | Value Range                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| ----------------------- | ------------ | -------- | ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| status                  | string       | true     | Request Processing Result                                                    | "ok" , "error"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| ts                      | long         | true     | Time of Respond Generation, Unit: Millisecond                                |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| DATA_START              | object array | true     |                                                                              |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| sub_uid                 | long         | true     | sub-account UID                                                              |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| LIST_START              | object array | true     |                                                                              |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| margin_mode             | string       | true     | margin mode                                                                  | cross: cross margin mode                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| margin_account          | string       | true     | margin account                                                               | "USDT"...                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| margin_asset            | string       | true     | margin asset                                                                 |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| margin_balance          | decimal      | true     | account equity                                                               |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| risk_rate               | decimal      | true     | margin rate                                                                  |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| query_id                | long         | true     | Query id, which can be used as the from_id field for the next query request. |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| DATA_END                | object array | false    |                                                                              |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| sub_uid                 | long         | true     | sub-account UID                                                              |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| query_id                | long         | true     | Query id, which can be used as the from_id field for the next query request. |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| LIST_END                |              | false    |                                                                              |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| state                   | String       | true     | Account status                                                               | 1(NORMAL): The account is functioning normally for trading and transfers. 3 (LIQUIDATING): The account is under liquidation, and trading, transfers, and the receipt of funding fees are unavailable. 5(ADL): The account is under auto deleveraging, and trading, transfers, and the receipt of funding fees are unavailable. 6(OPEN_LIMIT): Orders are being canceled for risk management. Only ADL orders are allowed for futures trading; transfers in are permitted, but transfers out are not allowed. |
| equity                  | String       | true     | Account Equity                                                               |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| initial_margin          | String       | true     | Initial margin                                                               |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| maintenance_margin      | String       | true     | Maintenance margin                                                           |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| maintenance_margin_rate | String       | true     | Maintenance margin ratio                                                     |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| profit_unreal           | String       | true     | Unrealized PnL                                                               |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| available_margin        | String       | true     | Available collateral                                                         |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| created_time            | String       | true     | Account creation time                                                        |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| updated_time            | String       | true     | Account update time                                                          |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| details                 | list         | true     |                                                                              |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| DATA_START              | object array | true     |                                                                              |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |

Notes:  
Only return data for activated contract sub-account (i.e. sub-accounts that have
gained contract trading permission).

#### Request example

{

"margin_account":

"USDT"

}

#### Response Example

##### Success Example

{

"status":

"ok"

"data":\[

0:{

"query_id":

20699714

"sub_uid":

414513021

"list":\[\]

"asset_multi_sub":{

"state":

"normal"

"equity":

"0"

"initial_margin":

"0"

"maintenance_margin":

"0"

"maintenance_margin_rate":

"0"

"profit_unreal":

"0"

"available_margin":

"0"

"created_time":

1743393157729

"updated_time":

1743393157729

"details":\[\]

}

}

1:{

"query_id":

20785109

"sub_uid":

415353372

"list":\[

0:{

"margin_balance":

0

"risk_rate":

NULL

"margin_asset":

"USDT"

"margin_mode":

"cross"

"margin_account":

"USDT"

"trade_partition":

"USDT"

}

\]

"asset_multi_sub":

NULL

}

2:{

"query_id":

20829528

"sub_uid":

415779795

"list":\[\]

"asset_multi_sub":

NULL

}

3:{

"query_id":

27711735

"sub_uid":

486424213

"list":\[

0:{

"margin_balance":

5e-9

"risk_rate":

NULL

"margin_asset":

"USDT"

"margin_mode":

"cross"

"margin_account":

"USDT"

"trade_partition":

"USDT"

}

\]

"asset_multi_sub":

NULL

}

4:{

"query_id":

30091410

"sub_uid":

511356054

"list":\[

0:{

"margin_balance":

3.5e-15

"risk_rate":

NULL

"margin_asset":

"USDT"

"margin_mode":

"cross"

"margin_account":

"USDT"

"trade_partition":

"USDT"

}

\]

"asset_multi_sub":

NULL

}

5:{

"query_id":

32131301

"sub_uid":

531926803

"list":\[

0:{

"margin_balance":

0

"risk_rate":

NULL

"margin_asset":

"USDT"

"margin_mode":

"cross"

"margin_account":

"USDT"

"trade_partition":

"USDT"

}

\]

"asset_multi_sub":

NULL

}

6:{

"query_id":

32131360

"sub_uid":

531927396

"list":\[

0:{

"margin_balance":

0

"risk_rate":

NULL

"margin_asset":

"USDT"

"margin_mode":

"cross"

"margin_account":

"USDT"

"trade_partition":

"USDT"

}

\]

"asset_multi_sub":

NULL

}

7:{

"query_id":

32551209

"sub_uid":

536147469

"list":\[\]

"asset_multi_sub":

NULL

}

8:{

"query_id":

32674241

"sub_uid":

537382988

"list":\[

0:{

"margin_balance":

0

"risk_rate":

NULL

"margin_asset":

"USDT"

"margin_mode":

"cross"

"margin_account":

"USDT"

"trade_partition":

"USDT"

}

\]

"asset_multi_sub":

NULL

}

\]

"ts":

1743393401798

}
