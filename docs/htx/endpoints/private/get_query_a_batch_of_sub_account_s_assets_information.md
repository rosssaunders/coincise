# GET Query a Batch of Sub-Account's Assets Information

**Source:**
[Query a Batch of Sub-Account's Assets Information](https://www.htx.com/en-us/opend/newApiPages/?id=5d518b8a-77b6-11ed-9966-0242ac110003)

**Category:** Swap Account Interface

## Authentication

Required (Private Endpoint)

### /swap-api/v1/swap_sub_account_info_list (Query a Batch of Sub-Account's Assets Information)

Request type: POST

Signature verification: Yes

Interface permission: Read

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter     | Data Type | Required | Description                         | Value Range                               | Default Value |
| ------------- | --------- | -------- | ----------------------------------- | ----------------------------------------- | ------------- |
| contract_code | string    | false    | contract code                       | "BTC-USD"... ,if not filled in return all |               |
| page_index    | int       | false    | page index, if not filled in as 1st |                                           |               |
| page_size     | int       | false    | if not filled in as 20，50 at most  |                                           |               |

Notes:  
Only return data of sub-accounts that have agreed to access the contract
market.  
By default, the list of sub-accounts is in ascending order according to the time
when agree to access the contract market, and the earlier the agreed time, the
first the position

#### Response Parameter

| Parameter               | Data Type    | Required | Description                                   | Value Range    |
| ----------------------- | ------------ | -------- | --------------------------------------------- | -------------- |
| status                  | string       | true     | the result of server handling to request      | "ok" , "error" |
| ts                      | long         | true     | Time of Respond Generation，Unit：Millisecond |                |
| DATA_START              | object       | true     |                                               |                |
| SUB_LIST_START          | object array | true     |                                               |                |
| sub_uid                 | long         | true     | sub uid                                       |                |
| ACCOUNT_INFO_LIST_START | object array | true     |                                               |                |
| symbol                  | string       | true     | symbol                                        | "BTC","ETH"... |
| contract_code           | string       | true     | contract code                                 | "BTC-USD" ...  |
| margin_balance          | decimal      | true     | margin balance                                |                |
| liquidation_price       | decimal      | true     | liquidation price                             |                |
| risk_rate               | decimal      | true     | risk rate                                     |                |
| ACCOUNT_INFO_LIST_END   |              | false    |                                               |                |
| SUB_LIST_END            |              | false    |                                               |                |
| current_page            | int          | true     | current page                                  |                |
| total_page              | int          | true     | total page                                    |                |
| total_size              | int          | true     | total size                                    |                |
| DATA_END                |              | false    |                                               |                |

#### Request example

{

"contract_code":

"BTC-USD"

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

1

"sub_list":\[

0:{

"sub_uid":

123456789

"account_info_list":\[

0:{

"symbol":

"TRX"

"margin_balance":

50

"liquidation_price":

NULL

"risk_rate":

NULL

"contract_code":

"TRX-USD"

}

\]

}

\]

}

"ts":

1612496369035

}
