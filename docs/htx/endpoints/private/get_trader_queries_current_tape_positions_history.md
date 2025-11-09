# GET Trader queries current tape positions history

**Source:**
[Trader queries current tape positions history](https://www.htx.com/en-us/opend/newApiPages/?id=8cb89359-77b5-11ed-9966-19126dc80c9)

**Category:** Future Copy Trade

## Authentication

Required (Private Endpoint)

### /copytrading/trader/position_positions (Trader queries current tape positions history)

Request type: GET

Signature verification: Yes

Interface permission: Read

Rate Limit: A single user requests all copytrading interfaces 18 times per
second.

Interface description: This interface is used to query the trader's historical
positions with orders.

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter     | Data Type | Required | Description                                                                                                                                                                              | Value Range                          | Default Value |
| ------------- | --------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ | ------------- |
| contract_code | string    | true     | BTC-USDT...                                                                                                                                                                              |                                      |               |
| start_time    | long      | false    | Query start time, query by data creation. time,millisecond timestamp.                                                                                                                    | The query window is the last 90 days |               |
| end_time      | long      | false    | Query end time, query data by creation. timetime,millisecond timestamp.                                                                                                                  | The query window is the last 90 days |               |
| direct        | string    | false    | Search direct, If the direction is NEXT, the data is returned in positive chronological order; if the direction is PREV, the data is returned in reverse chronological order             | next, prev default is prev           | now           |
| from_id       | long      | false    | If the query direction is prev, from_id should be the min query_id in the last query result. If the query direction is next, from_id should be the max query_id in the last query result |                                      |               |
| limit         | long      | false    | Number of results per request. Maximum is 100. Default is 100.                                                                                                                           |                                      |               |

#### Response Parameter

| Parameter       | Data Type | Required | Description                                                                  | Value Range |
| --------------- | --------- | -------- | ---------------------------------------------------------------------------- | ----------- |
| tid             | String    | true     | request id                                                                   |             |
| DATA_START      |           | true     |                                                                              |             |
| POSITIONS_START | array     | true     |                                                                              |             |
| sub_position_id | String    | true     | copy position ID                                                             |             |
| margin_mode     | String    | true     | margin mode                                                                  |             |
| position_side   | String    | true     | position side                                                                |             |
| lever           | String    | true     | lever                                                                        |             |
| open_order_id   | String    | true     | Order ID for opening position                                                |             |
| open_avg_price  | String    | true     | Average open price                                                           |             |
| open_time       | long      | true     | Open time                                                                    |             |
| volume          | String    | true     | Quantity of positions                                                        |             |
| close_time      | long      | true     | Time of closing position                                                     |             |
| close_avg_price | string    | true     | Average price of closing position                                            |             |
| open_fee        | string    | true     | open fee                                                                     |             |
| close_fee       | string    | true     | close fee                                                                    |             |
| profit          | string    | true     | Profit and loss                                                              |             |
| profit_rate     | string    | true     | Profit and loss Rate                                                         |             |
| close_type      | integer   | true     |                                                                              |             |
| follow_takes    | string    | true     |                                                                              |             |
| POSITIONS_END   |           | true     |                                                                              |             |
| query_id        | long      | true     | Query id, which can be used as the from_id field for the next query request. |             |
| DATA_END        |           | false    |                                                                              |             |
| code            | long      | true     |                                                                              |             |

#### Request example

`curl"https://api.hbdm.com?contract_code=DOT-USDT&start_time=1716539773000&end_time=1719284288864&direct=prev&from_id=249639&limit=2"`

#### Response Example

##### Success Example

{

"code":

200

"data":{

"positions":\[

0:{

"sub_position_id":

"249788"

"open_order_id":

"1255161109104218112"

"lever":

"5"

"position_side":

"short"

"open_avg_price":

"200"

"volume":

"null"

"margin_mode":

"cross"

"open_time":

1719295328176

"close_time":

1719295398821

"close_avg_price":

"10"

"open_fee":

"0.072"

"close_fee":

"0.0036"

"profit":

"189.9244"

"profit_rate":

"4.7481"

"close_type":

2

"follow_takes":

"37.984880"

}

1:{

"sub_position_id":

"249786"

"open_order_id":

"1255160729700061184"

"lever":

"5"

"position_side":

"long"

"open_avg_price":

"10"

"volume":

"null"

"margin_mode":

"cross"

"open_time":

1719295237719

"close_time":

1719295354578

"close_avg_price":

"200"

"open_fee":

"0.36"

"close_fee":

"7.2"

"profit":

"18992.44"

"profit_rate":

"94.9622"

"close_type":

2

"follow_takes":

"949.622000"

}

\]

"query_id":

249786

}

"tid":

"3b4bbd53cfc64dd4bd6bce2e6f2f08c5"

"success":

true

}
