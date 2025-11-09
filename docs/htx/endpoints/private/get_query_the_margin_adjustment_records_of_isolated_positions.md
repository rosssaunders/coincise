# GET Query the margin adjustment records of isolated positions

**Source:**
[Query the margin adjustment records of isolated positions](https://www.htx.com/en-us/opend/newApiPages/?id=10000078-77b7-11ed-9966-0242ac110003)

**Category:** USDT-M Unified Account

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v3/fix_position_margin_change_record (Query the margin adjustment records of isolated positions )

Request type: GET

Signature verification: Yes

Interface permission: Read

Rate Limit: Generally, the private interface rate limit of API key is at most
144 times every 3 seconds for each UID (Trade Interface: at most 72 times every
3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is
shared by all the altcoins contracts delivered by different date).

Interface description: It is used to query the records of margin increase and
decrease for isolated positions of trading pairs.

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter     | Data Type | Required | Description                                                                                                                                                                                                                        | Value Range                                                                                                                                        | Default Value |
| ------------- | --------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| asset         | string    | true     | Currency                                                                                                                                                                                                                           | USDT                                                                                                                                               |               |
| contract_code | string    | true     | Contract code                                                                                                                                                                                                                      | "BTC-USDT","ETH-USDT"……                                                                                                                            |               |
| start_time    | long      | false    | Query start time, use data to query by creation time                                                                                                                                                                               | The value range is \[((end-time) – 48h), (end-time)\], the maximum query window is 48 hours, and the window translation range is the last 90 days. |               |
| end_time      | long      | false    | Query end time, use data to query by creation time                                                                                                                                                                                 | The value range is \[(present-90d), present\], the maximum query window is 48 hours, and the window translation range is the last 90 days.         |               |
| direct        | string    | false    | Query direction, when the direction is next, the data will be returned in the forward order of time; when the direction is prev, the data will be returned in the reverse order of time                                            | prev means forward query, and next means backward query.                                                                                           |               |
| from_id       | long      | false    | If it is a forward (prev) query, it will be assigned the smallest query_id obtained in the previous query result; if it is a backward (next) query, it will be assigned the largest query_id obtained in the previous query result |                                                                                                                                                    |               |

#### Response Parameter

| Parameter  | Data Type | Required | Description                                                                 | Value Range                                           |
| ---------- | --------- | -------- | --------------------------------------------------------------------------- | ----------------------------------------------------- |
| code       | int       | true     | Status code                                                                 |                                                       |
| msg        | string    | true     | Result description                                                          |                                                       |
| ts         | long      | true     | Timestamp                                                                   |                                                       |
| DATA_START |           | true     |                                                                             |                                                       |
| query_id   | long      | true     | Query id, which can be used as the from_id field of the next query request  |                                                       |
| order_id   | string    | true     | Adjusting margin order number                                               |                                                       |
| amount     | double    | true     | Adjustment amount                                                           |                                                       |
| asset      | string    | true     | Currency                                                                    | USDT                                                  |
| symbol     | string    | true     | trading pair                                                                | "BTC-USDT","ETH-USDT"……                               |
| type       | int       | true     | Adjustment direction 1: increase isolated margin, 2: reduce isolated margin | 1: Increase isolated margin;2: Reduce isolated margin |
| direction  | int       | true     | Position direction                                                          | 1: buy;2: sell                                        |
| DATA_END   |           | true     |                                                                             |                                                       |

#### Request example

No data

#### Response Example

##### Success Example

{

"code":

200

"msg":

"ok"

"data":\[

0:{

"asset":

"USDT"

"symbol":

"ETH-USDT"

"type":

2

"direction":

1

"amount":

0

"order_id":

"1016665644990599168"

"query_id":

1421340514

}

\]

"ts":

1670170020265

}
