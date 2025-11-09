# GET [Isolated] Query information on system status

**Source:** [[Isolated] Query information on system status](https://www.htx.com/en-us/opend/newApiPages/?id=8cb7f665-77b5-11ed-9966-0242ac110003)

**Category:** Reference Data

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v1/swap\_api\_state (\[Isolated\] Query information on system status)

Request type: GET

Signature verification: No

Interface permission: Read

Rate Limit: For public interface used to get information of index, price limit, settlement, delivery, open positions and so on, the rate limit is 240 times every 3 second at most for each IP (this 240 times every 3 second public interface rate limit is shared by all the requests from that IP of non-marketing information, like above).

Interface description: This interface only supports isolated margin mode.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | false | contract code | Case-Insenstive.e.g. "BTC-USDT" |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | Request processing Result | "ok" , "error" |
| ts | long | true | Time of Respond Generation, Unit: Millisecond |  |
| DATA\_START | object array | true |  |  |
| symbol | string | true | symbol | "BTC","ETH"... |
| contract\_code | string | true | Contract Code | "BTC-USDT"... |
| margin\_mode | string | true | margin mode | isolated : "isolated" |
| margin\_account | string | true | margin account | "BTC-USDT"... |
| open | int | true | open order access：when “1”, then access available; when “0”, access unavailable"1" |  |
| close | int | true | close order access：when “1”, then access available; when “0”, access unavailable "1" |  |
| cancel | int | true | order cancellation access：when “1”, then access available; when “0”, access unavailable "1" |  |
| transfer\_in | int | true | deposit access：when “1”, then access available; when “0”, access unavailable "1" |  |
| transfer\_out | int | true | withdraw access： when “1”, then access available; when “0”, access unavailable "1" |  |
| master\_transfer\_sub | int | true | transfer from master to sub account："1" is available，“0” is unavailable |  |
| sub\_transfer\_master | int | true | transfer from sub to master account："1" is available，“0” is unavailable |  |
| master\_transfer\_sub\_inner\_in | int | true | Transfer\_in access for transfer from main account to sub-account - crossing account: "1" represents "available", "0" represents "unavailable" |  |
| master\_transfer\_sub\_inner\_out | int | true | Transfer\_out access for transfer from main account to sub-account - crossing account: "1" represents "available", "0" represents "unavailable" |  |
| sub\_transfer\_master\_inner\_in | int | true | Transfer\_in access for transfer from sub-account to main account - crossing account: "1" represents "available", "0" represents "unavailable" |  |
| sub\_transfer\_master\_inner\_out | int | true | Transfer\_out access for transfer from sub-account to main account - crossing account: "1" represents "available", "0" represents "unavailable" |  |
| transfer\_inner\_in | int | true | Transfer\_in access for transfer between different margin accounts under the same account："1" represents "available", "0" represents "unavailable" |  |
| transfer\_inner\_out | int | true | Transfer\_out access for transfer between different margin accounts under the same account："1" represents "available", "0" represents "unavailable" |  |
| DATA\_END |  | false |  |  |

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

"contract\_code":

"BTC-USDT"

"margin\_mode":

"isolated"

"margin\_account":

"BTC-USDT"

"open":

1

"close":

1

"cancel":

1

"transfer\_in":

1

"transfer\_out":

1

"master\_transfer\_sub":

1

"sub\_transfer\_master":

1

"master\_transfer\_sub\_inner\_in":

1

"master\_transfer\_sub\_inner\_out":

1

"sub\_transfer\_master\_inner\_in":

1

"sub\_transfer\_master\_inner\_out":

1

"transfer\_inner\_in":

1

"transfer\_inner\_out":

1

}

\]

"ts":

1603696366019

}