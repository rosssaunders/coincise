# GET [General] Query historical funding rate

**Source:** [[General] Query historical funding rate](https://www.htx.com/en-us/opend/newApiPages/?id=8cb7ee4a-77b5-11ed-9966-0242ac110003)

**Category:** Reference Data

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v1/swap\_historical\_funding\_rate (\[General\] Query historical funding rate)

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
| contract\_code | string | true | contract code | Case-Insenstive.eg:"BTC-USDT" ... |  |
| page\_index | int | false | page index. 1 by default |  |  |
| page\_size | int | false | page size.20 by default. 50 at most | \[1-50\] |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | false | response status | "ok" , "error" |
| ts | long | false | response timestamp.unit:millionSeconds. |  |
| DATA\_START |  | false |  |  |
| symbol | string | false | symbol | eg:"BTC","ETH"... |
| contract\_code | string | false | contract code | eg: "BTC-USDT |
| fee\_asset | string | false | fee asset | eg:"USDT" |
| funding\_time | string | false | funding time |  |
| funding\_rate | string | false | funding rate |  |
| realized\_rate | string | false | (Deprecated, default is null) |  |
| avg\_premium\_index | string | false | average premium index |  |
| DATA\_END |  | false |  |  |
| total\_page | int | false | total page |  |
| current\_page | int | false | current page |  |
| total\_size | int | false | total size |  |
| DATA\_END |  | false |  |  |

#### Request example

`curl "https://api.hbdm.com/linear-swap-api/v1/swap_historical_funding_rate?contract_code=BTC-USDT"`

#### Response Example

##### Success Example

{

"status":

"ok"

"data":{

"total\_page":

14

"current\_page":

1

"total\_size":

14

"data":\[

0:{

"avg\_premium\_index":

"0.000049895833333333"

"funding\_rate":

"0.000100000000000000"

"funding\_time":

"1603670400000"

"realized\_rate":

"null"

"contract\_code":

"BTC-USDT"

"symbol":

"BTC"

"fee\_asset":

"USDT"

}

\]

}

"ts":

1603696680599

}