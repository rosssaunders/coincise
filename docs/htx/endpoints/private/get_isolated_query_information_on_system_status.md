# GET [Isolated] Query information on system status

**Source:**
[[Isolated] Query information on system status](https://www.htx.com/en-us/opend/newApiPages/?id=8cb7f665-77b5-11ed-9966-0242ac110003)

**Category:** Reference Data

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v1/swap_api_state (\[Isolated\] Query information on system status)

Request type: GET

Signature verification: No

Interface permission: Read

Rate Limit: For public interface used to get information of index, price limit,
settlement, delivery, open positions and so on, the rate limit is 240 times
every 3 second at most for each IP (this 240 times every 3 second public
interface rate limit is shared by all the requests from that IP of non-marketing
information, like above).

Interface description: This interface only supports isolated margin mode.

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter     | Data Type | Required | Description   | Value Range                     | Default Value |
| ------------- | --------- | -------- | ------------- | ------------------------------- | ------------- |
| contract_code | string    | false    | contract code | Case-Insenstive.e.g. "BTC-USDT" |               |

#### Response Parameter

| Parameter                     | Data Type    | Required | Description                                                                                                                                         | Value Range           |
| ----------------------------- | ------------ | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- |
| status                        | string       | true     | Request processing Result                                                                                                                           | "ok" , "error"        |
| ts                            | long         | true     | Time of Respond Generation, Unit: Millisecond                                                                                                       |                       |
| DATA_START                    | object array | true     |                                                                                                                                                     |                       |
| symbol                        | string       | true     | symbol                                                                                                                                              | "BTC","ETH"...        |
| contract_code                 | string       | true     | Contract Code                                                                                                                                       | "BTC-USDT"...         |
| margin_mode                   | string       | true     | margin mode                                                                                                                                         | isolated : "isolated" |
| margin_account                | string       | true     | margin account                                                                                                                                      | "BTC-USDT"...         |
| open                          | int          | true     | open order access：when “1”, then access available; when “0”, access unavailable"1"                                                                 |                       |
| close                         | int          | true     | close order access：when “1”, then access available; when “0”, access unavailable "1"                                                               |                       |
| cancel                        | int          | true     | order cancellation access：when “1”, then access available; when “0”, access unavailable "1"                                                        |                       |
| transfer_in                   | int          | true     | deposit access：when “1”, then access available; when “0”, access unavailable "1"                                                                   |                       |
| transfer_out                  | int          | true     | withdraw access： when “1”, then access available; when “0”, access unavailable "1"                                                                 |                       |
| master_transfer_sub           | int          | true     | transfer from master to sub account："1" is available，“0” is unavailable                                                                           |                       |
| sub_transfer_master           | int          | true     | transfer from sub to master account："1" is available，“0” is unavailable                                                                           |                       |
| master_transfer_sub_inner_in  | int          | true     | Transfer_in access for transfer from main account to sub-account - crossing account: "1" represents "available", "0" represents "unavailable"       |                       |
| master_transfer_sub_inner_out | int          | true     | Transfer_out access for transfer from main account to sub-account - crossing account: "1" represents "available", "0" represents "unavailable"      |                       |
| sub_transfer_master_inner_in  | int          | true     | Transfer_in access for transfer from sub-account to main account - crossing account: "1" represents "available", "0" represents "unavailable"       |                       |
| sub_transfer_master_inner_out | int          | true     | Transfer_out access for transfer from sub-account to main account - crossing account: "1" represents "available", "0" represents "unavailable"      |                       |
| transfer_inner_in             | int          | true     | Transfer_in access for transfer between different margin accounts under the same account："1" represents "available", "0" represents "unavailable"  |                       |
| transfer_inner_out            | int          | true     | Transfer_out access for transfer between different margin accounts under the same account："1" represents "available", "0" represents "unavailable" |                       |
| DATA_END                      |              | false    |                                                                                                                                                     |                       |

#### Request example

`curl "https://api.hbdm.com/linear-swap-api/v1/swap_api_state?contract_code=BTC-USDT"`

#### Response Example

##### Success Example

{

"status":

"ok"

"data":\[

0:{

"symbol":

"BTC"

"contract_code":

"BTC-USDT"

"margin_mode":

"isolated"

"margin_account":

"BTC-USDT"

"open":

1

"close":

1

"cancel":

1

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

1603696366019

}
