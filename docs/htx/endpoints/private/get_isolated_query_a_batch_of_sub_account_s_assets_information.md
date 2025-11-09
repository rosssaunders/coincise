# GET [Isolated]Query a Batch of Sub-Account's Assets Information

**Source:**
[[Isolated]Query a Batch of Sub-Account's Assets Information](https://www.htx.com/en-us/opend/newApiPages/?id=8cb822f5-77b5-11ed-9966-0242ac110003)

**Category:** Swap Account Interface

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v1/swap_sub_account_info_list (\[Isolated\]Query a Batch of Sub-Account's Assets Information)

Request type: POST

Signature verification: Yes

Interface permission: Read

Rate Limit: Generally, the private interface rate limit of API key is at most
144 times every 3 seconds for each UID (Trade Interface: at most 72 times every
3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is
shared by all the altcoins contracts delivered by different date).

Interface description: This interface only supports isolated margin mode.

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter     | Data Type | Required | Description                         | Value Range                              | Default Value |
| ------------- | --------- | -------- | ----------------------------------- | ---------------------------------------- | ------------- |
| contract_code | string    | false    | contract code                       | "BTC-USDT"... ,if not filled, return all |               |
| page_index    | int       | false    | page index, if not filled in as 1st |                                          |               |
| page_size     | int       | false    | if not filled in as 20，50 at most  |                                          |               |

Notes:  
Only return data of sub-accounts that have agreed to access the contract
market.  
By default, the list of sub-accounts is in ascending order according to the time
when agree to access the contract market, and the earlier the agreed time, the
first the position

#### Response Parameter

| Parameter               | Data Type    | Required | Description                                   | Value Range        |
| ----------------------- | ------------ | -------- | --------------------------------------------- | ------------------ |
| status                  | string       | true     | result of server handled request              | "ok" , "error"     |
| ts                      | long         | true     | Time of Respond Generation，Unit：Millisecond |                    |
| DATA_START              | object       | true     |                                               |                    |
| SUB_LIST_START          | object array | true     |                                               |                    |
| sub_uid                 | long         | true     | sub uid                                       |                    |
| ACCOUNT_INFO_LIST_START | object array | true     |                                               |                    |
| symbol                  | string       | true     | symbol                                        | "BTC","ETH"...     |
| contract_code           | string       | true     | contract code                                 | "BTC-USDT" ...     |
| margin_account          | string       | true     | margin account                                | such as:BTC-USDT”  |
| margin_mode             | string       | true     | margin mode                                   | isolated: isolated |
| margin_asset            | string       | true     | margin asset)                                 |                    |
| margin_balance          | decimal      | true     | margin balance                                |                    |
| liquidation_price       | decimal      | true     | liquidation price                             |                    |
| risk_rate               | decimal      | true     | risk rate                                     |                    |
| ACCOUNT_INFO_LIST_END   |              | false    |                                               |                    |
| SUB_LIST_END            |              | false    |                                               |                    |
| current_page            | int          | true     | current page                                  |                    |
| total_page              | int          | true     | total page                                    |                    |
| total_size              | int          | true     | total size                                    |                    |
| DATA_END                |              | false    |                                               |                    |

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

1

"sub_list":\[

0:{

"sub_uid":

123456789

"account_info_list":\[

0:{

"symbol":

"BTC"

"margin_balance":

0

"liquidation_price":

NULL

"risk_rate":

NULL

"contract_code":

"BTC-USDT"

"margin_asset":

"USDT"

"margin_mode":

"isolated"

"margin_account":

"BTC-USDT"

}

\]

}

\]

}

"ts":

1612504756853

}
