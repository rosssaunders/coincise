# GET [General] Query historical funding rate

**Source:**
[[General] Query historical funding rate](https://www.htx.com/en-us/opend/newApiPages/?id=8cb7ee4a-77b5-11ed-9966-0242ac110003)

**Category:** Reference Data

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v1/swap_historical_funding_rate (\[General\] Query historical funding rate)

Request type: GET

Signature verification: No

Interface permission: Read

Rate Limit: For public interface used to get information of index, price limit,
settlement, delivery, open positions and so on, the rate limit is 240 times
every 3 second at most for each IP (this 240 times every 3 second public
interface rate limit is shared by all the requests from that IP of non-marketing
information, like above).

Interface description: The interface supports cross margin mode and isolated
margin mode.

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter     | Data Type | Required | Description                         | Value Range                       | Default Value |
| ------------- | --------- | -------- | ----------------------------------- | --------------------------------- | ------------- |
| contract_code | string    | true     | contract code                       | Case-Insenstive.eg:"BTC-USDT" ... |               |
| page_index    | int       | false    | page index. 1 by default            |                                   |               |
| page_size     | int       | false    | page size.20 by default. 50 at most | \[1-50\]                          |               |

#### Response Parameter

| Parameter         | Data Type | Required | Description                             | Value Range       |
| ----------------- | --------- | -------- | --------------------------------------- | ----------------- |
| status            | string    | false    | response status                         | "ok" , "error"    |
| ts                | long      | false    | response timestamp.unit:millionSeconds. |                   |
| DATA_START        |           | false    |                                         |                   |
| symbol            | string    | false    | symbol                                  | eg:"BTC","ETH"... |
| contract_code     | string    | false    | contract code                           | eg: "BTC-USDT     |
| fee_asset         | string    | false    | fee asset                               | eg:"USDT"         |
| funding_time      | string    | false    | funding time                            |                   |
| funding_rate      | string    | false    | funding rate                            |                   |
| realized_rate     | string    | false    | (Deprecated, default is null)           |                   |
| avg_premium_index | string    | false    | average premium index                   |                   |
| DATA_END          |           | false    |                                         |                   |
| total_page        | int       | false    | total page                              |                   |
| current_page      | int       | false    | current page                            |                   |
| total_size        | int       | false    | total size                              |                   |
| DATA_END          |           | false    |                                         |                   |

#### Request example

`curl "https://api.hbdm.com/linear-swap-api/v1/swap_historical_funding_rate?contract_code=BTC-USDT"`

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
