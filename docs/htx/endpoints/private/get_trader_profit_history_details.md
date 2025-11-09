# GET Trader profit history details

**Source:**
[Trader profit history details](https://www.htx.com/en-us/opend/newApiPages/?id=8cb89359-77b5-11ed-9966-19126fda206)

**Category:** Future Copy Trade

## Authentication

Required (Private Endpoint)

### /copytrading/trader/profit_history_details (Trader profit history details)

Request type: GET

Signature verification: Yes

Interface permission: Read

Rate Limit: A single user requests all copytrading interfaces 18 times per
second.

Interface description: The trader gets profits shared details for the last 3
months.

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter  | Data Type | Required | Description                                                                                                                                                                              | Value Range                          | Default Value |
| ---------- | --------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ | ------------- |
| start_time | long      | false    | Query start time, query by data creation. time,millisecond timestamp.                                                                                                                    | The query window is the last 90 days |               |
| end_time   | long      | false    | Query end time, query data by creation. timetime,millisecond timestamp.                                                                                                                  | The query window is the last 90 days |               |
| direct     | string    | false    | Search direct, If the direction is NEXT, the data is returned in positive chronological order; if the direction is PREV, the data is returned in reverse chronological order             | next, prev default is prev           | now           |
| from_id    | long      | false    | If the query direction is prev, from_id should be the min query_id in the last query result. If the query direction is next, from_id should be the max query_id in the last query result |                                      |               |
| limit      | long      | false    | Number of results per request. Maximum is 100. Default is 100.                                                                                                                           |                                      |               |

#### Response Parameter

| Parameter          | Data Type | Required | Description                                                                  | Value Range |
| ------------------ | --------- | -------- | ---------------------------------------------------------------------------- | ----------- |
| tid                | String    | true     | request id                                                                   |             |
| DATA_START         |           | true     |                                                                              |             |
| PROFIT_ITEMS_START | array     | true     |                                                                              |             |
| user_id            | String    | true     | Nickname of copy trader.                                                     |             |
| profit_currency    | String    | true     | The currency of profit.                                                      |             |
| profit_amont       | String    | true     | Profit sharing amount. Default is 0.                                         |             |
| profit_time        | long      | true     | profit time                                                                  |             |
| PROFIT_ITEMS_END   |           | true     |                                                                              |             |
| query_id           | long      | true     | Query id, which can be used as the from_id field for the next query request. |             |
| DATA_END           |           | false    |                                                                              |             |
| code               | long      | true     |                                                                              |             |

#### Request example

`curl"https://api.hbdm.com/copytrading/trader/profit_history_details?start_time=1643011211000&end_time=1719304672711&direct=next&from_id=4273396&limit=2"`

#### Response Example

##### Success Example

{

"code":

200

"data":{

"profit_items":\[

0:{

"profit_amount":

"37.984880"

"profit_currency":

"USDT"

"profit_time":

1719295391023

"user_id":

"41085682"

}

1:{

"profit_amount":

"949.622000"

"profit_currency":

"USDT"

"profit_time":

1719295332030

"user_id":

"41085682"

}

\]

"query_id":

4273397

}

"tid":

"2eb8ad70b5ce4a1e9ce1fe73e69302a8"

"success":

true

}
