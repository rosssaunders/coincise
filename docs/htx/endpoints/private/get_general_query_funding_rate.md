# GET [General] Query funding rate

**Source:** [[General] Query funding rate](https://www.htx.com/en-us/opend/newApiPages/?id=8cb7ec03-77b5-11ed-9966-0242ac110003)

**Category:** Reference Data

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v1/swap\_funding\_rate (\[General\] Query funding rate)

Request type: GET

Signature verification: No

Interface permission: Read

Rate Limit: For public interface used to get information of index, price limit, settlement, delivery, open positions and so on, the rate limit is 240 times every 3 second at most for each IP (this 240 times every 3 second public interface rate limit is shared by all the requests from that IP of non-marketing information, like above).

Interface description: The interface supports cross margin mode and isolated margin mode.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | true | contract code | Case-Insenstive."BTC-USDT" ... |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | false | response status | "ok" , "error" |
| ts | long | false | response timestamp.unit:millionSeconds. |  |
| DATA\_START |  | false |  |  |
| symbol | string | false | symbol | "BTC","ETH"... |
| contract\_code | string | false | contract code,eg:"BTC-USDT" |  |
| fee\_asset | string | false | fee asset | eg:"BTC","ETH"... |
| funding\_time | string | false | current funding time |  |
| funding\_rate | string | false | current funding rate（Updated once a minute） |  |
| estimated\_rate | string | false | (Deprecated, default is null) |  |
| next\_funding\_time | string | false | (Deprecated, default is null) |  |
| DATA\_END |  | false |  |  |

#### Request example

`curl "https://api.hbdm.com/linear-swap-api/v1/swap_fund ing_rate?contract_code=BTC-USDT"`

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