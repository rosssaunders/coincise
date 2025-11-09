# GET Query information on system status

**Source:** [Query information on system status](https://www.htx.com/en-us/opend/newApiPages/?id=5d516aaf-77b6-11ed-9966-0242ac110003)

**Category:** Reference Data

## Authentication

Required (Private Endpoint)

### /swap-api/v1/swap\_api\_state (Query information on system status)

Request type: GET

Signature verification: No

Interface permission: Read

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | false | contract code | Case-Insenstive.e.g. "BTC-USD" |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | Request processing Result | "ok" , "error" |
| ts | long | true | Time of Respond Generation, Unit: Millisecond |  |
| DATA\_START |  | false |  |  |
| symbol | string | true | symbol | "BTC","ETH"... |
| contract\_code | string | true | contract code | e.g. "BTC-USD" |
| open | int | true | open order access：when “1”, then access available; when “0”, access unavailable"1" |  |
| close | int | true | close order access：when “1”, then access available; when “0”, access unavailable "1" |  |
| cancel | int | true | order cancellation access：when “1”, then access available; when “0”, access unavailable "1" |  |
| transfer\_in | int | true | deposit access：when “1”, then access available; when “0”, access unavailable "1" |  |
| transfer\_out | int | true | withdraw access： when “1”, then access available; when “0”, access unavailable "1" |  |
| master\_transfer\_sub | int | true | transfer from master to sub account："1" is available，“0” is unavailable |  |
| sub\_transfer\_master | int | true | transfer from sub to master account："1" is available，“0” is unavailable |  |
| DATA\_END |  | false |  |  |

#### Request example

`curl "https://api.hbdm.com/swap-api/v1/swap_api_state?contract_code=BTC-USD"`

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

"BTC-USD"

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

}

\]

"ts":

1603866257273

}