# GET Market Symbols Setting

**Source:** [Get Market Symbols Setting](https://www.htx.com/en-us/opend/newApiPages/?id=7ec4f5d6-7773-11ed-9966-0242ac110003)

**Category:** Reference Data

## Authentication

Required (Private Endpoint)

### /v1/settings/common/market-symbols ( Get Market Symbols Setting)

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
| symbols | string | false | symbols. NA means all symbols, multiple symbols separated with comma |  |  |
| ts | long | false | timestamp to get incremental data |  |  |

Notes:  
It returns updated data from this timestample to the current time if filled in with ts. If there is no update, the "data" of response is "\[\]".

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | false | status |  |
| data | Object | false |  |  |
| symbol | string | false | symbol(outside) |  |
| bc | string | false | base currency |  |
| qc | string | false | quote currency |  |
| state | string | false | symbol status. unknown，not-online，pre-online，online，suspend，offline，transfer-board，fuse |  |
| sp | string | false | symbol partition |  |
| tags | string | false | Tags, multiple tags are separated by commas, such as: st, hadax |  |
| lr | decimal | false | leverage ratio of margin symbol, provided by Global |  |
| smlr | decimal | false | leverage ratio of super-margin symbol, provided by Global |  |
| pp | integer | false | price precision |  |
| ap | integer | false | amount precision |  |
| vp | integer | false | value precision |  |
| minoa | decimal | false | min order amount |  |
| maxoa | decimal | false | max order amount |  |
| minov | decimal | false | min order value |  |
| lominoa | decimal | false | min amount of limit price order |  |
| lomaxoa | decimal | false | max amount of limit price order |  |
| lomaxba | decimal | false | max amount of limit price buy order |  |
| lomaxsa | decimal | false | max amount of limit price sell order |  |
| smminoa | decimal | false | min amount of market price sell order |  |
| smmaxoa | decimal | false | max amount of market price sell order |  |
| bmmaxov | decimal | false | max amount of market price buy order |  |
| blmlt | decimal(10,6) | false | Buy limit must less than |  |
| slmgt | decimal(10,6) | false | Sell limit must greater than |  |
| msormlt | decimal(10,6) | false | Market sell order rate must less than |  |
| mbormlt | decimal(10,6) | false | Market buy order rate must less than |  |
| at | string | false | trading by api interface |  |
| u | string | false | ETP: symbol |  |
| mfr | decimal | false |  |  |
| ct | string | false | charge time(unix time in millisecond, just for symbols of ETP) |  |
| rt | string | false | rebal time(unix time in millisecond, just for symbols of ETP) |  |
| rthr | decimal | false | rebal threshold(just for symbols of ETP) |  |
| in | decimal | false | ETP: init nav |  |
| maxov | decimal | false | max value of market price order |  |
| flr | decimal | false | C2C: funding leverage ratio |  |
| castate | string | false | not Required. The state of the call auction; it will only be displayed when it is in the 1st and 2nd stage of the call auction. Enumeration values: "ca\_1", "ca\_2" |  |
| DATA\_END |  | false |  |  |
| ts | String | false | timestamp of incremental data |  |
| full | int | false | full data flag: 0 for no and 1 for yes |  |
| err-code | string | false | error code(returned when the interface reports an error) |  |
| err-msg | string | false | error msg(returned when the interface reports an error) |  |

#### Request example

`curl"https://api.huobi.pro/v1/settings/common/market-symbols"`

#### Response Example

##### Success Example

{

"status":

"ok"

"data":\[

0:{

"symbol":

"btc3lusdt"

"state":

"online"

"bc":

"btc3l"

"qc":

"usdt"

"pp":

4

"ap":

4

"sp":

"main"

"vp":

8

"minoa":

0.01

"maxoa":

199.0515

"minov":

5

"lominoa":

0.01

"lomaxoa":

199.0515

"lomaxba":

199.0515

"lomaxsa":

199.0515

"smminoa":

0.01

"blmlt":

1.1

"slmgt":

0.9

"smmaxoa":

199.0515

"bmmaxov":

2500

"msormlt":

0.1

"mbormlt":

0.1

"maxov":

2500

"u":

"btcusdt"

"mfr":

0.035

"ct":

"23:55:00"

"rt":

"00:00:00"

"rthr":

4

"in":

16.3568

"at":

"enabled"

"tags":

"etp,nav,holdinglimit,activities"

}

\]

"ts":

"1641880897191"

"full":

1

}