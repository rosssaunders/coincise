# GET Symbols Setting

**Source:**
[Get Symbols Setting](https://www.htx.com/en-us/opend/newApiPages/?id=7ec4f777-7773-11ed-9966-0242ac110003)

**Category:** Reference Data

## Authentication

Required (Private Endpoint)

### /v1/settings/common/symbols ( Get Symbols Setting)

Request type: GET

Signature verification: No

Interface permission: Read

#### Request Address

| Environment                         | Address                   |
| ----------------------------------- | ------------------------- |
| Online                              | https://api.huobi.pro     |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description                       | Value Range | Default Value |
| --------- | --------- | -------- | --------------------------------- | ----------- | ------------- |
| ts        | long      | false    | timestamp to get incremental data |             |               |

Notes:  
It returns updated data from this timestample to the current time if filled in
with ts. If there is no update, the "data" of response is "\[\]".

#### Response Parameter

| Parameter | Data Type     | Required | Description                                                                                                                                                        | Value Range |
| --------- | ------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------- |
| status    | string        | false    | status                                                                                                                                                             |             |
| data      | Object        | false    |                                                                                                                                                                    |             |
| symbol    | string        | false    | symbol(outside)                                                                                                                                                    |             |
| sn        | string        | false    | symbol name                                                                                                                                                        |             |
| bc        | string        | false    | base currency                                                                                                                                                      |             |
| qc        | string        | false    | quote currency                                                                                                                                                     |             |
| state     | string        | false    | symbol status. unknown，not-online，pre-online，online，suspend，offline，transfer-board，fuse                                                                     |             |
| ve        | boolean       | false    | visible                                                                                                                                                            |             |
| we        | boolean       | false    | white enabled                                                                                                                                                      |             |
| dl        | boolean       | false    | delist                                                                                                                                                             |             |
| cd        | boolean       | false    | country disabled                                                                                                                                                   |             |
| te        | boolean       | false    | trade enabled                                                                                                                                                      |             |
| ce        | boolean       | false    | cancel enabled                                                                                                                                                     |             |
| tet       | long          | false    | trade enable timestamp                                                                                                                                             |             |
| toa       | long          | false    | the time trade open at                                                                                                                                             |             |
| tca       | long          | false    | the time trade close at                                                                                                                                            |             |
| voa       | long          | false    | visible open at                                                                                                                                                    |             |
| vca       | long          | false    | visible close at                                                                                                                                                   |             |
| sp        | string        | false    | symbol partition                                                                                                                                                   |             |
| tm        | string        | false    | symbol partition                                                                                                                                                   |             |
| w         | int           | false    | weight sort                                                                                                                                                        |             |
| ttp       | decimal(10,6) | false    | trade total precision                                                                                                                                              |             |
| tap       | decimal(10,6) | false    | trade amount precision                                                                                                                                             |             |
| tpp       | decimal(10,6) | false    | trade price precision                                                                                                                                              |             |
| fp        | decimal(10,6) | false    | fee precision                                                                                                                                                      |             |
| tags      | string        | false    | Tags, multiple tags are separated by commas, such as: st, hadax                                                                                                    |             |
| d         |               | false    |                                                                                                                                                                    |             |
| bcdn      | string        | false    | base currency display name                                                                                                                                         |             |
| qcdn      | string        | false    | quote currency display name                                                                                                                                        |             |
| elr       | string        | false    | etp leverage ratio                                                                                                                                                 |             |
| castate   | string        | false    | Not required. The state of the call auction; it will only be displayed when it is in the 1st and 2nd stage of the call auction. Enumeration values: "ca_1", "ca_2" |             |
| ca1oa     | long          | false    | not Required. the open time of call auction phase 1, total milliseconds since January 1, 1970 0:0:0:00ms UTC                                                       |             |
| ca1ca     | long          | false    | not Required. the close time of call auction phase 1, total milliseconds since January 1, 1970 0:0:0:00ms UTC                                                      |             |
| ca2oa     | long          | false    | not Required. the open time of call auction phase 2, total milliseconds since January 1, 1970 0:0:0:00ms UTC                                                       |             |
| ca2ca     | long          | false    | not Required. the close time of call auction phase 2, total milliseconds since January 1, 1970 0:0:0:00ms UTC                                                      |             |
| DATA_END  |               | false    |                                                                                                                                                                    |             |
| ts        | String        | false    | timestamp of incremental data                                                                                                                                      |             |
| full      | int           | false    | full data flag: 0 for no and 1 for yes                                                                                                                             |             |
| err-code  | string        | false    | error code(returned when the interface reports an error)                                                                                                           |             |
| err-msg   | string        | false    | error msg(returned when the interface reports an error)                                                                                                            |             |

#### Request example

`curl "https://api.huobi.pro/v1/settings/common/symbols"`

#### Response Example

##### Success Example

{

"status":

"ok"

"data":\[

0:{

"symbol":

"agldusdt"

"tags":

""

"state":

"online"

"bcdn":

"AGLD"

"qcdn":

"USDT"

"elr":

NULL

"tm":

"PRO"

"sn":

"AGLD/USDT"

"ve":

true

"dl":

false

"te":

true

"ce":

true

"cd":

false

"tet":

1630668600000

"we":

false

"toa":

1630668600000

"tca":

1893470400000

"voa":

1630666800000

"vca":

1893470400000

"bc":

"agld"

"qc":

"usdt"

"sp":

"innovation"

"d":

NULL

"tpp":

4

"tap":

4

"fp":

8

"w":

950000000

"ttp":

8

}

\]

"ts":

"1641880066563"

"full":

1

}
