# GET [Isolated] Query information on Tiered Adjustment Factor

**Source:**
[[Isolated] Query information on Tiered Adjustment Factor](https://www.htx.com/en-us/opend/newApiPages/?id=8cb7fb2c-77b5-11ed-9966-0242ac110003)

**Category:** Reference Data

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v1/swap_adjustfactor (\[Isolated\] Query information on Tiered Adjustment Factor)

Request type: GET

Signature verification: No

Interface permission: Read

Rate Limit: For public interface used to get information of index, price limit,
settlement, delivery, open positions and so on, the rate limit is 240 times
every 3 second at most for each IP (this 240 times every 3 second public
interface rate limit is shared by all the requests from that IP of non-marketing
information, like above).

Interface description: This interface only supports isolated margin mode.

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter     | Data Type | Required | Description   | Value Range                     | Default Value |
| ------------- | --------- | -------- | ------------- | ------------------------------- | ------------- |
| contract_code | string    | false    | contract code | Case-Insenstive.e.g. "BTC-USDT" |               |

#### Response Parameter

| Parameter     | Data Type | Required | Description                                   | Value Range           |
| ------------- | --------- | -------- | --------------------------------------------- | --------------------- |
| status        | string    | true     | Request Processing Result                     | "ok" , "error"        |
| ts            | long      | true     | Time of Respond Generation, Unit: Millisecond |                       |
| DATA_START    |           | false    |                                               |                       |
| symbol        | string    | true     | symbol                                        | "BTC","ETH"...        |
| contract_code | string    | true     | contract code                                 | e.g. "BTC-USDT"       |
| margin_mode   | string    | true     | margin mode                                   | isolated : "isolated" |
| LIST_START    |           | false    |                                               |                       |
| lever_rate    | decimal   | true     | Leverage                                      |                       |
| LADDERS_START |           | false    |                                               |                       |
| min_size      | decimal   | true     | Min net position limit                        |                       |
| max_size      | decimal   | true     | Max net position limit                        |                       |
| ladder        | int       | true     | Tier                                          |                       |
| adjust_factor | decimal   | true     | Adjustment Factor                             |                       |
| LADDERS_END   |           | false    |                                               |                       |
| LIST_END      |           | false    |                                               |                       |
| DATA_END      |           | false    |                                               |                       |

#### Request example

`curl "https://api.hbdm.com/linear-swap-api/v1/swap_adjustfactor?contract_code=BTC-USDT"`

#### Response Example

##### Success Example

{

"status":

"ok"

"data":\[

0:{

"symbol":

"BTC"

"contract_code":

"BTC-USDT"

"margin_mode":

"isolated"

"list":\[

0:{

"lever_rate":

125

"ladders":\[

0:{

"ladder":

0

"min_size":

0

"max_size":

8999

"adjust_factor":

0.65

}

1:{

"ladder":

1

"min_size":

9000

"max_size":

89999

"adjust_factor":

0.8

}

2:{

"ladder":

2

"min_size":

90000

"max_size":

NULL

"adjust_factor":

0.85

}

\]

}

\]

}

\]

"ts":

1603695606565

}
