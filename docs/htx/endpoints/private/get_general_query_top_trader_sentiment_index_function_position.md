# GET [General] Query Top Trader Sentiment Index Function-Position

**Source:**
[[General] Query Top Trader Sentiment Index Function-Position](https://www.htx.com/en-us/opend/newApiPages/?id=8cb7f568-77b5-11ed-9966-0242ac110003)

**Category:** Reference Data

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v1/swap_elite_position_ratio (\[General\] Query Top Trader Sentiment Index Function-Position)

Request type: GET

Signature verification: No

Interface permission: Read

Rate Limit: For public interface used to get information of index, price limit,
settlement, delivery, open positions and so on, the rate limit is 240 times
every 3 second at most for each IP (this 240 times every 3 second public
interface rate limit is shared by all the requests from that IP of non-marketing
information, like above).

Interface description: The interface supports cross margin mode and isolated
margin mode. The request parameter "contract_code" supports the contract code of
futures, in that the format is BTC-USDT-210625.

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter     | Data Type | Required | Description   | Value Range                                          | Default Value |
| ------------- | --------- | -------- | ------------- | ---------------------------------------------------- | ------------- |
| contract_code | string    | true     | contract code | swap: "BTC-USDT"... , future: "BTC-USDT-FUTURES" ... |               |
| period        | string    | true     | period        | 5min, 15min, 30min, 60min,4hour,1day                 |               |

#### Response Parameter

| Parameter     | Data Type | Required | Description                                   | Value Range                                               |
| ------------- | --------- | -------- | --------------------------------------------- | --------------------------------------------------------- |
| status        | string    | true     | Request Processing Result                     | "ok" , "error"                                            |
| ts            | long      | true     | Time of Respond Generation, Unit: Millisecond |                                                           |
| DATA_START    |           | false    |                                               |                                                           |
| symbol        | string    | true     | symbol                                        | "BTC","ETH"...                                            |
| contract_code | string    | true     | contract code                                 | e.g. swap: "BTC-USDT"... , future: "BTC-USDT-FUTURES" ... |
| pair          | string    | true     | pair                                          | such as: “BTC-USDT”                                       |
| business_type | string    | true     | business type                                 | futures, swap                                             |
| LIST_START    |           | false    |                                               |                                                           |
| buy_ratio     | decimal   | true     | Net long position ratio                       |                                                           |
| sell_ratio    | decimal   | true     | Net short position ratio                      |                                                           |
| ts            | long      | true     | Time of Respond Generation                    |                                                           |
| LIST_END      |           | false    |                                               |                                                           |
| DATA_END      |           | false    |                                               |                                                           |

#### Request example

`curl "https://api.hbdm.com/linear-swap-api/v1/swap_elite_position_ratio?contract_code=BTC-USDT&period=1day"`

#### Response Example

##### Success Example

{

"status":

"ok"

"data":{

"list":\[

0:{

"buy_ratio":

0.5

"sell_ratio":

0.5

"ts":

1638460800000

}

\]

"symbol":

"BTC"

"contract_code":

"BTC-USDT-FUTURES"

"business_type":

"futures"

"pair":

"BTC-USDT"

}

"ts":

1638756121395

}
