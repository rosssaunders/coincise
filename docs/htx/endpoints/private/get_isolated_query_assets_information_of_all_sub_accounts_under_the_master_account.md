# GET [Isolated] Query assets information of all sub-accounts under the master account

**Source:**
[[Isolated] Query assets information of all sub-accounts under the master account](https://www.htx.com/en-us/opend/newApiPages/?id=8cb820d9-77b5-11ed-9966-0242ac110003)

**Category:** Swap Account Interface

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v1/swap_sub_account_list (\[Isolated\] Query assets information of all sub-accounts under the master account)

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

| Parameter     | Data Type | Required | Description                                                                                                                                                                              | Value Range                                                                | Default Value |
| ------------- | --------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- | ------------- |
| contract_code | string    | false    | contract code                                                                                                                                                                            | Case-Insenstive.Both uppercase and lowercase are supported.e.g. "BTC-USDT" |               |
| direct        | string    | false    | Search direct, If the direction is NEXT, the data is returned in positive chronological order; if the direction is PREV, the data is returned in reverse chronological order             | next, prev default is next                                                 | next          |
| from_id       | long      | false    | If the query direction is prev, from_id should be the min query_id in the last query result. If the query direction is next, from_id should be the max query_id in the last query result | Search query_id to begin with                                              |               |

#### Response Parameter

| Parameter         | Data Type | Required | Description                                                                  | Value Range           |
| ----------------- | --------- | -------- | ---------------------------------------------------------------------------- | --------------------- |
| status            | string    | true     | the handling result of requests                                              | "ok" , "error"        |
| ts                | long      | true     | the create time point of response, unit: ms                                  |                       |
| DATA_START        |           | false    |                                                                              |                       |
| sub_uid           | long      | true     | sub-account UID                                                              |                       |
| LIST_START        |           | false    |                                                                              |                       |
| symbol            | string    | true     | type code                                                                    | "BTC","ETH"...        |
| contract_code     | string    | true     | contract code                                                                | e.g. "BTC-USDT"       |
| margin_asset      | string    | true     | margin asset                                                                 |                       |
| margin_balance    | decimal   | true     | account equity                                                               |                       |
| liquidation_price | decimal   | true     | estimated liquidation price                                                  |                       |
| risk_rate         | decimal   | true     | margin rate                                                                  |                       |
| margin_mode       | string    | true     | margin mode                                                                  | isolated : "isolated" |
| margin_account    | string    | true     | margin account                                                               | "BTC-USDT"...         |
| query_id          | long      | true     | Query id, which can be used as the from_id field for the next query request. |                       |
| LIST_END          |           | false    |                                                                              |                       |
| DATA_END          |           | false    |                                                                              |                       |

Notes:  
Only return data for activated contract sub-account (i.e. sub-accounts that have
gained contract trading permission).

#### Request example

{

"contract_code":

"BTC-USDT"

}

#### Response Example

##### Success Example

{

"status":

"ok"

"data":\[

0:{

"sub_uid":

123456789

"list":\[

0:{

"symbol":

"BTC"

"margin_balance":

20

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

"ts":

1603698380336

}
