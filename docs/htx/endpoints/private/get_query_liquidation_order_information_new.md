# GET Query Liquidation Order Information(New)

**Source:**
[Query Liquidation Order Information(New)](https://www.htx.com/en-us/opend/newApiPages/?id=28c2d22c-77ae-11ed-9966-0242ac110003)

**Category:** Reference Data

## Authentication

Required (Private Endpoint)

### /api/v3/contract_liquidation_orders (Query Liquidation Order Information(New))

Request type: GET

Signature verification: No

Interface permission: Read

Rate Limit: the rate limit is 120 times every 3 seconds at most for each IP
(this 120 times every 3 seconds public interface rate limit is shared by all the
requests from that IP of non-marketing information, like above)

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter  | Data Type | Required | Description                                                                                                                                                                              | Value Range | Default Value                                                                                                                                                                                               |
| ---------- | --------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| symbol     | string    | true     | Variety code                                                                                                                                                                             |             | Case-Insenstive.Both uppercase and lowercase are supported."BTC","ETH"...                                                                                                                                   |
| trade_type | int       | true     | trading type                                                                                                                                                                             |             | when “0”, request fully filled liquidated orders; when “5’, request liquidated close orders; when “6”, request liquidated open orders                                                                       |
| start_time | long      | false    |                                                                                                                                                                                          | (now) – 2h  | Value range \[((end-time) – 2h), (end-time)\], maximum query window size is 2 hours, query window shift should be within past 90 days, query window shift should be within past 2 hours for cancelled order |
| end_time   | long      | false    |                                                                                                                                                                                          | now         | Value range \[(present-90d), present\], maximum query window size is 48 hours, query window shift should be within past 90 days, queriable range should be within past 2 hours for cancelled order          |
| direct     | string    | false    | Search direct, If the direction is NEXT, the data is returned in positive chronological order; if the direction is PREV, the data is returned in reverse chronological order             | next        | next, prev default is prev                                                                                                                                                                                  |
| from_id    | long      | false    | If the query direction is prev, from_id should be the min query_id in the last query result. If the query direction is next, from_id should be the max query_id in the last query result |             | Search query_id to begin with                                                                                                                                                                               |

#### Response Parameter

| Parameter     | Data Type   | Required | Description                | Value Range     |
| ------------- | ----------- | -------- | -------------------------- | --------------- |
|               |             | false    |                            |                 |
| code          | int         | true     | State code                 |                 |
| msg           | string      | true     | The code description       |                 |
| ts            | long        | true     | Timestamp                  |                 |
| DATA_START    | objectarray | true     |                            |                 |
| query_id      | long        | true     | next Query ID              |                 |
| symbol        | string      | true     | symbol                     |                 |
| contract_code | string      | true     | Contract Code              | "BTC180914" ... |
| direction     | string      | true     | "buy":buy"sell": sell      |                 |
| offset        | string      | true     | "open":open "close": close |                 |
| volume        | decimal     | true     | liquidated volume(cont)    |                 |
| amount        | decimal     | true     | liquidation amount (token) |                 |
| price         | decimal     | true     | bankruptcy price           |                 |
| created_at    | long        | true     | liquidation time           |                 |
| DATA_END      |             | false    |                            |                 |

#### Request example

`curl"https://api.hbdm.com/api/v3/contract_liquidation_orders?trade_type=5&symbol=BTC"`

#### Response Example

##### Success Example

{

"code":

200

"msg":

""

"data":\[

0:{

"query_id":

111000

"contract_code":

"BTC201225"

"symbol":

"BTC"

"direction":

"buy"

"offset":

"close"

"volume":

26

"price":

19674.96

"created_at":

1606293144641

"amount":

0.13214766383260754

}

\]

"ts":

1604312615051

}
