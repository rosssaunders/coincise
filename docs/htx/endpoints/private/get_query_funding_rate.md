# GET Query funding rate

**Source:** [Query funding rate](https://www.htx.com/en-us/opend/newApiPages/?id=5d516b86-77b6-11ed-9966-0242ac110003)

**Category:** Reference Data

## Authentication

Required (Private Endpoint)

### /swap-api/v1/swap\_funding\_rate (Query funding rate)

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
| contract\_code | string | true | contract code | Case-Insenstive."BTC-USD" ... |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | false | response status | "ok" , "error" |
| ts | long | false | response timestamp.unit:millionSeconds. |  |
| DICT>(ATTRS：DATA\_START |  | false |  |  |
| symbol | string | false | symbol | "BTC","ETH"... |
| contract\_code | string | false | contract code | eg:"BTC-USD" |
| fee\_asset | string | false | fee asset | eg:"BTC","ETH"... |
| funding\_time | string | false | current funding time |  |
| funding\_rate | string | false | current funding rate（Updated once a minute） |  |
| estimated\_rate | string | false | (Deprecated, default is null) |  |
| next\_funding\_time | string | false | (Deprecated, default is null) |  |
| DICT\_END |  | false |  |  |

#### Request example

`curl "https://api.hbdm.com/swap-api/v1/swap_historical_funding_rate?contract_code=BTC-USD"`

#### Response Example

##### Success Example

{

"status":

"ok"

"data":{

"funding\_rate":

"0.000100000000000000"

"contract\_code":

"BTC-USDT"

"symbol":

"BTC"

"fee\_asset":

"BTC"

"funding\_time":

"1603699200000"

"estimated\_rate":

"null"

"next\_funding\_time":

"null"

}

"ts":

1603696494714

}