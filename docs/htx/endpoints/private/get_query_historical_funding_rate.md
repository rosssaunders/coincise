# GET Query historical funding rate

**Source:** [Query historical funding rate](https://www.htx.com/en-us/opend/newApiPages/?id=5d516d2f-77b6-11ed-9966-0242ac110003)

**Category:** Reference Data

## Authentication

Required (Private Endpoint)

### /swap-api/v1/swap\_historical\_funding\_rate (Query historical funding rate)

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
| contract\_code | string | true | contract code | Case-Insenstive.eg:"BTC-USD" ... |  |
| page\_index | int | false | page index. 1 by default | 1 |  |
| page\_size | int | false | page size.20 by default. 50 at most | 20 |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | false | response status | "ok" , "error" |
| ts | long | false | response timestamp.unit:millionSeconds. |  |
| DICT>(ATTRS：DATA\_START |  | false |  |  |
| LIST>(ATTRS：DATA\_START |  | false |  |  |
| symbol | string | false | symbol | eg:"BTC","ETH"... |
| contract\_code | string | false | contract code | eg: "BTC-USD |
| fee\_asset | string | false | fee asset | eg:"BTC","ETH"... |
| funding\_time | string | false | funding time |  |
| funding\_rate | string | false | funding rate |  |
| realized\_rate | string | false | (Deprecated, default is null) |  |
| avg\_premium\_index | string | false | average premium index |  |
| LIST\_END |  | false |  |  |
| total\_page | int | false | total page |  |
| current\_page | int | false | current page |  |
| total\_size | int | false | total size |  |
| DICT\_END |  | false |  |  |

#### Request example

`curl "https://api.hbdm.com/swap-api/v1/swap_his_open_interest?contract_code=BTC-USD&period=60min&amount_type=1"`

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