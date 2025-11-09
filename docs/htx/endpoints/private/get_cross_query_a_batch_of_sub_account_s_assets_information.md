# GET [Cross]Query a Batch of Sub-Account's Assets Information

**Source:**
[[Cross]Query a Batch of Sub-Account's Assets Information](https://www.htx.com/en-us/opend/newApiPages/?id=8cb8243c-77b5-11ed-9966-0242ac110003)

**Category:** Swap Account Interface

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v1/swap_cross_sub_account_info_list (\[Cross\]Query a Batch of Sub-Account's Assets Information)

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

| Parameter      | Data Type | Required | Description                                                | Value Range                               | Default Value |
| -------------- | --------- | -------- | ---------------------------------------------------------- | ----------------------------------------- | ------------- |
| margin_account | string    | false    | margin account，if not filled in return all margin account | "USDT"，but now just has one account usdt |               |
| page_index     | int       | false    | page index, if not filled in as 1st                        |                                           |               |
| page_size      | int       | false    | if not filled in as 20，50 at most                         |                                           |               |

Notes:  
Only return data of sub-accounts that have agreed to access the contract
market.  
By default, the list of sub-accounts is in ascending order according to the time
when agree to access the contract market, and and the earlier the agreed time,
the first the position

#### Response Parameter

| Parameter               | Data Type    | Required | Description                                   | Value Range                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| ----------------------- | ------------ | -------- | --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| status                  | string       | true     | result of server handled request              | "ok" , "error"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| ts                      | long         | true     | Time of Respond Generation，Unit：Millisecond |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| DATA_START              | object       | true     |                                               |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| SUB_LIST_START          | object array | true     |                                               |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| sub_uid                 | long         | true     | sub uid                                       |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| ACCOUNT_INFO_LIST_START | object array | true     |                                               |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| margin_mode             | string       | true     | margin mode                                   | cross；                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| margin_account          | string       | true     | margin account                                | such as:USDT”                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| margin_asset            | string       | true     | margin asset                                  |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| margin_balance          | decimal      | true     | margin balance                                |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| risk_rate               | decimal      | true     | risk rate                                     |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| ACCOUNT_INFO_LIST_END   |              | false    |                                               |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| SUB_LIST_END            |              | false    | sub-account UID                               |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| UNITE_SUB_LIST_START    | object array | true     | unite sub list                                |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| sub_uid                 | long         | true     |                                               |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| ASSET_MULTI_SUB_START   | object array | true     | Account status                                |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| state                   | String       | true     | Account Equity                                | 1(NORMAL): The account is functioning normally for trading and transfers. 3 (LIQUIDATING): The account is under liquidation, and trading, transfers, and the receipt of funding fees are unavailable. 5(ADL): The account is under auto deleveraging, and trading, transfers, and the receipt of funding fees are unavailable. 6(OPEN_LIMIT): Orders are being canceled for risk management. Only ADL orders are allowed for futures trading; transfers in are permitted, but transfers out are not allowed. |
| equity                  | String       | true     | Account Equity                                |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| initial_margin          | String       | true     | Initial margin                                |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| maintenance_margin      | String       | true     | Maintenance margin                            |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| maintenance_margin_rate | String       | true     | Maintenance margin ratio                      |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| profit_unreal           | String       | true     | Unrealized PnL                                |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| available_margin        | String       | true     | Available collateral                          |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| created_time            | String       | true     | Account creation time                         |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| updated_time            | String       | true     | Account update time                           |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| details                 | list         | true     |                                               |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| UNITE_SUB_LIST_START    | object array | true     |                                               |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| current_page            | int          | true     | current page                                  |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| total_page              | int          | true     | total page                                    |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| total_size              | int          | true     | total size                                    |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| DATA_END                |              | false    |                                               |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |

#### Request example

{

"contract_code":

"BTC-USDT"

"page_index":

1

"page_size":

100

}

#### Response Example

##### Success Example

{

"status":

"ok"

"data":{

"total_page":

1

"current_page":

1

"total_size":

9

"sub_list":\[

0:{

"sub_uid":

415353372

"account_info_list":\[

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

}

1:{

"sub_uid":

415779795

"account_info_list":\[\]

}

2:{

"sub_uid":

486424213

"account_info_list":\[

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

}

3:{

"sub_uid":

511356054

"account_info_list":\[

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

}

4:{

"sub_uid":

531926803

"account_info_list":\[

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

}

5:{

"sub_uid":

531927396

"account_info_list":\[

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

}

6:{

"sub_uid":

536147469

"account_info_list":\[\]

}

7:{

"sub_uid":

537382988

"account_info_list":\[

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

}

\]

"unite_sub_list":\[

0:{

"sub_uid":

414513021

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

\]

}

"ts":

1743393714820

}
