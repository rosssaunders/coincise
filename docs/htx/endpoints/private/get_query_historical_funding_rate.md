# GET Query historical funding rate

**Source:**
[Query historical funding rate](https://www.htx.com/en-us/opend/newApiPages/?id=5d516d2f-77b6-11ed-9966-0242ac110003)

**Category:** Reference Data

## Authentication

Required (Private Endpoint)

### /swap-api/v1/swap_historical_funding_rate (Query historical funding rate)

Request type: GET

Signature verification: No

Interface permission: Read

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter     | Data Type | Required | Description                         | Value Range                      | Default Value |
| ------------- | --------- | -------- | ----------------------------------- | -------------------------------- | ------------- |
| contract_code | string    | true     | contract code                       | Case-Insenstive.eg:"BTC-USD" ... |               |
| page_index    | int       | false    | page index. 1 by default            | 1                                |               |
| page_size     | int       | false    | page size.20 by default. 50 at most | 20                               |               |

#### Response Parameter

| Parameter               | Data Type | Required | Description                             | Value Range       |
| ----------------------- | --------- | -------- | --------------------------------------- | ----------------- |
| status                  | string    | false    | response status                         | "ok" , "error"    |
| ts                      | long      | false    | response timestamp.unit:millionSeconds. |                   |
| DICT>(ATTRS：DATA_START |           | false    |                                         |                   |
| LIST>(ATTRS：DATA_START |           | false    |                                         |                   |
| symbol                  | string    | false    | symbol                                  | eg:"BTC","ETH"... |
| contract_code           | string    | false    | contract code                           | eg: "BTC-USD      |
| fee_asset               | string    | false    | fee asset                               | eg:"BTC","ETH"... |
| funding_time            | string    | false    | funding time                            |                   |
| funding_rate            | string    | false    | funding rate                            |                   |
| realized_rate           | string    | false    | (Deprecated, default is null)           |                   |
| avg_premium_index       | string    | false    | average premium index                   |                   |
| LIST_END                |           | false    |                                         |                   |
| total_page              | int       | false    | total page                              |                   |
| current_page            | int       | false    | current page                            |                   |
| total_size              | int       | false    | total size                              |                   |
| DICT_END                |           | false    |                                         |                   |

#### Request example

`curl "https://api.hbdm.com/swap-api/v1/swap_his_open_interest?contract_code=BTC-USD&period=60min&amount_type=1"`

#### Response Example

##### Success Example

{

"status":

"ok"

"data":{

"total_page":

14

"current_page":

1

"total_size":

14

"data":\[

0:{

"avg_premium_index":

"0.000049895833333333"

"funding_rate":

"0.000100000000000000"

"funding_time":

"1603670400000"

"realized_rate":

"null"

"contract_code":

"BTC-USDT"

"symbol":

"BTC"

"fee_asset":

"USDT"

}

\]

}

"ts":

1603696680599

}
