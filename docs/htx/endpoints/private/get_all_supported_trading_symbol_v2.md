# GET all Supported Trading Symbol(V2)

**Source:** [Get all Supported Trading Symbol(V2)](https://www.htx.com/en-us/opend/newApiPages/?id=7ec51cb5-7773-11ed-9966-0242ac110003)

**Category:** Reference Data

## Authentication

Required (Private Endpoint)

### /v2/settings/common/symbols ( Get all Supported Trading Symbol(V2))

Request type: GET

Signature verification: No

Interface permission: Read

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.huobi.pro |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| ts | long | false | timestamp to get incremental data |  |  |

Notes:  
It returns updated data from this timestample to the current time if filled in with ts. If there is no update, the "data" of response is "\[\]".

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | false | status |  |
| data | Object | false |  |  |
| si | string | false | state\_isolated |  |
| scr | string | false | state\_cross |  |
| sc | string | false | symbol(outside) |  |
| dn | string | false | display name |  |
| bc | string | false | base currency |  |
| bcdn | string | false | base currency display name |  |
| qc | string | false | quote currency |  |
| qcdn | string | false | quote currency display name |  |
| state | string | false | symbol status. unknown，not-online，pre-online，online，suspend，offline，transfer-board，fuse |  |
| whe | boolean | false | white enabled |  |
| cd | boolean | false | country disabled |  |
| te | boolean | false | trade enabled |  |
| toa | long | false | the time trade open at |  |
| sp | string | false | symbol partition |  |
| w | int | false | weight sort |  |
| ttp | decimal(10,6) | false | trade total precision |  |
| tap | decimal(10,6) | false | trade amount precision |  |
| tpp | decimal(10,6) | false | trade price precision |  |
| fp | decimal(10,6) | false | fee precision |  |
| suspend\_desc | string | false | suspend desc |  |
| transfer\_board\_desc | string | false | transfer board desc |  |
| tags | string | false | Tags, multiple tags are separated by commas, such as: st, hadax |  |
| lr | decimal | false | leverage ratio, such as: 3.5, or null if the symbol does not support this leverage ratio |  |
| smlr | decimal | false | super-margin leverage ratio, such as: 3, or null if the symbol does not support super-margin.For trading pairs launched after September 15, 2020, this field does not return a value. You can query it through /v1/settings/common/market-symbols. |  |
| flr | String | false | C2C leverage ratio, such as:3, or null if the symbol does not support C2C |  |
| wr | string | false | withdraw\_risk, such as: 3, or null if the symbol does not support super-margin |  |
| d | int | false | direction: 1 for long and 2 for short |  |
| elr | string | false | etp leverage ratio |  |
| p | Object | false |  |  |
| castate | string | false | not Required. The state of the call auction; it will only be displayed when it is in the 1st and 2nd stage of the call auction. Enumeration values: "ca\_1", "ca\_2" |  |
| ca1oa | long | false | not Required. this information is only available for that symbols configured with call auction. The total number of milliseconds since 0:0:0:00,000 on January 1, 1970 UTC to the present. |  |
| ca2oa | long | false | not Required. this information is only available for that symbols configured with call auction. The total number of milliseconds since 0:0:0:00,000 on January 1, 1970 UTC to the present. |  |
| DATA\_END |  | false |  |  |
| ts | String | false | timestamp of incremental data |  |
| full | int | false | full data flag: 0 for no and 1 for yes |  |
| err\_code | string | false | error code(returned when the interface reports an error) |  |
| err\_msg | string | false | error msg(returned when the interface reports an error) |  |

#### Request example

`curl”https://api.huobi.pro/v1/settings/common/symbols“`

#### Response Example

##### Success Example

{

"status":

"ok"

"data":\[

0:{

"tags":

""

"state":

"online"

"wr":

"1.5"

"sc":

"ethusdt"

"p":\[

0:{

"id":

9

"name":

"Grayscale"

"weight":

91

}

\]

"bcdn":

"ETH"

"qcdn":

"USDT"

"elr":

NULL

"tpp":

2

"tap":

4

"fp":

8

"smlr":

NULL

"flr":

NULL

"whe":

false

"cd":

false

"te":

true

"sp":

"main"

"d":

NULL

"bc":

"eth"

"qc":

"usdt"

"toa":

1514779200000

"ttp":

8

"w":

999400000

"lr":

5

"dn":

"ETH/USDT"

}

\]

"ts":

"1641870869718"

"full":

1

}