# GET query followers

**Source:**
[query followers](https://www.htx.com/en-us/opend/newApiPages/?id=8cb89359-77b5-11ed-9966-1912707dbd0)

**Category:** Future Copy Trade

## Authentication

Required (Private Endpoint)

### /copytrading/trader/query_followers (query followers)

Request type: GET

Signature verification: Yes

Interface permission: Read

Rate Limit: A single user requests all copytrading interfaces 18 times per
second.

Interface description: This interface is used to query the traders’ followers

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter  | Data Type | Required | Description                                                                                                                                                                              | Value Range                          | Default Value |
| ---------- | --------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ | ------------- |
| start_time | long      | false    | Query start time, query by data creation. timetime,millisecond timestamp.                                                                                                                | The query window is the last 90 days |               |
| end_time   | long      | false    | Query end time, query data by creation. timetime,millisecond timestamp.                                                                                                                  | The query window is the last 90 days |               |
| direct     | string    | false    | Search direct, If the direction is NEXT, the data is returned in positive chronological order; if the direction is PREV, the data is returned in reverse chronological order             | next, prev default is prev           | now           |
| from_id    | long      | false    | If the query direction is prev, from_id should be the min query_id in the last query result. If the query direction is next, from_id should be the max query_id in the last query result |                                      |               |
| limit      | long      | false    | Number of results per request. Maximum is 100. Default is 100.                                                                                                                           |                                      |               |

#### Response Parameter

| Parameter             | Data Type | Required | Description           | Value Range |
| --------------------- | --------- | -------- | --------------------- | ----------- |
| tid                   | String    | true     | request id            |             |
| DATA_START            |           | true     |                       |             |
| FOLLOWER \_START      | array     | true     |                       |             |
| follower_head_pic     | String    | true     | follower head pic     |             |
| follower_name         | String    | true     | follower name         |             |
| follower_uid          | String    | true     | follower uid          |             |
| follower_time         | long      | true     | follower time         |             |
| follower_profit_amont | String    | true     | follower profit amont |             |
| follower_trade_amount | String    | true     | follower trade amount |             |
| FOLLOWER \_END        |           | true     |                       |             |
| query_id              | String    | true     |                       |             |
| DATA_END              |           | false    |                       |             |
| code                  | long      | true     |                       |             |

#### Request example

`curl "https://api.hbdm.com/copytrading/trader/query_followers?sub_uid=441618222,462826107,117196834&direct=next&from_id=23512590&start_time=&end_time="`

#### Response Example

##### Success Example

{

"code":

200

"data":{

"follower":\[

0:{

"follower_uid":

"NDEzMDUzNjE"

"follower_head_pic":

"https://app-static-1306115679.file.myqcloud.com/nuwa/static/prod/1f6e2d36-e665-4447-b8fb-390fc7bcd243.png"

"follower_name":

"1\*\*\*\*@follower.com"

"follower_trade_amount":

"2999.85"

"follower_profit_amount":

"0"

"follower_time":

1719305505122

}

1:{

"follower_uid":

"MTIxOTc4Mjg"

"follower_head_pic":

"https://d1gi1ak10awzgt.cloudfront.net/images/2023-10-09/share\_1694659357823.png"

"follower_name":

"zsw\*\*\*\*@163.com"

"follower_trade_amount":

"3999.88"

"follower_profit_amount":

"0"

"follower_time":

1716864260158

}

\]

"query_id":

21193

}

"tid":

"006d4b4cd21f4ea58fc002b3837979e9"

"success":

true

}
