# GET [Cross] Query Information On Transfer State

**Source:**
[[Cross] Query Information On Transfer State](https://www.htx.com/en-us/opend/newApiPages/?id=8cb89abf-77b5-11ed-9966-0242ac110003)

**Category:** Swap Transferring Interface

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v1/swap_cross_transfer_state (\[Cross\] Query Information On Transfer State)

Request type: GET

Signature verification: No

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

| Parameter      | Data Type | Required | Description                                 | Value Range                   | Default Value |
| -------------- | --------- | -------- | ------------------------------------------- | ----------------------------- | ------------- |
| margin_account | string    | false    | margin account, return all margin when null | "USDT"，only support USDT now |               |

#### Response Parameter

| Parameter                     | Data Type    | Required | Description                                                                                                                                         | Value Range              |
| ----------------------------- | ------------ | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| status                        | string       | true     | Request Processing Result                                                                                                                           | "ok" , "error"           |
| ts                            | long         | true     | Time of Respond Generation, Unit: Millisecond                                                                                                       |                          |
| DATA_START                    | object array | true     |                                                                                                                                                     |                          |
| margin_mode                   | string       | true     | margin mode                                                                                                                                         | cross: cross margin mode |
| margin_account                | string       | true     | margin account                                                                                                                                      | "USDT"...                |
| transfer_in                   | int          | true     | deposit access：when “1”, then access available; when “0”, access unavailable "1"                                                                   |                          |
| transfer_out                  | int          | true     | withdraw access： when “1”, then access available; when “0”, access unavailable "1"                                                                 |                          |
| master_transfer_sub           | int          | true     | transfer from master to sub account："1" is available，“0” is unavailable                                                                           |                          |
| sub_transfer_master           | int          | true     | transfer from sub to master account："1" is available，“0” is unavailable                                                                           |                          |
| master_transfer_sub_inner_in  | int          | true     | Transfer_in access for transfer from main account to sub-account - crossing account: "1" represents "available", "0" represents "unavailable"       |                          |
| master_transfer_sub_inner_out | int          | true     | Transfer_out access for transfer from main account to sub-account - crossing account: "1" represents "available", "0" represents "unavailable"      |                          |
| sub_transfer_master_inner_in  | int          | true     | Transfer_in access for transfer from sub-account to main account - crossing account: "1" represents "available", "0" represents "unavailable"       |                          |
| sub_transfer_master_inner_out | int          | true     | Transfer_out access for transfer from sub-account to main account - crossing account: "1" represents "available", "0" represents "unavailable"      |                          |
| transfer_inner_in             | int          | true     | Transfer_in access for transfer between different margin accounts under the same account："1" represents "available", "0" represents "unavailable"  |                          |
| transfer_inner_out            | int          | true     | Transfer_out access for transfer between different margin accounts under the same account："1" represents "available", "0" represents "unavailable" |                          |
| DATA_END                      |              | false    |                                                                                                                                                     |                          |

#### Request example

`curl"https://api.hbdm.com/linear-swap-api/v1/swap_cross_transfer_state?margin_account=USDT"`

#### Response Example

##### Success Example

{

"status":

"ok"

"data":\[

0:{

"margin_mode":

"cross"

"margin_account":

"USDT"

"transfer_in":

1

"transfer_out":

1

"master_transfer_sub":

1

"sub_transfer_master":

1

"master_transfer_sub_inner_in":

1

"master_transfer_sub_inner_out":

1

"sub_transfer_master_inner_in":

1

"sub_transfer_master_inner_out":

1

"transfer_inner_in":

1

"transfer_inner_out":

1

}

\]

"ts":

1606905619516

}
