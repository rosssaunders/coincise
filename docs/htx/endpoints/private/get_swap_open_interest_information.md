# GET Swap Open Interest Information

**Source:**
[Get Swap Open Interest Information](https://www.htx.com/en-us/opend/newApiPages/?id=5d5173ee-77b6-11ed-9966-0242ac110003)

**Category:** Reference Data

## Authentication

Required (Private Endpoint)

### /swap-api/v1/swap_open_interest (Get Swap Open Interest Information)

Request type: GET

Signature verification: No

Interface permission: Read

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter     | Data Type | Required | Description                                                | Value Range | Default Value |
| ------------- | --------- | -------- | ---------------------------------------------------------- | ----------- | ------------- |
| contract_code | string    | false    | Case-insenstive.such as BTC-USD. ALL contracts by default. |             |               |

#### Response Parameter

| Parameter      | Data Type | Required | Description                                                                    | Value Range      |
| -------------- | --------- | -------- | ------------------------------------------------------------------------------ | ---------------- |
| status         | string    | true     | Request Processing Result                                                      | "ok" , "error"   |
| data <list>    |           | false    |                                                                                |                  |
| symbol         | string    | true     | Variety code                                                                   | "BTC", "ETH" ... |
| volume         | decimal   | true     | Position quantity(volume). Single side                                         |                  |
| amount         | decimal   | true     | Position quantity(Currency). Single side                                       |                  |
| contract_code  | string    | true     | Contract Code                                                                  | eg "BTC-USD" ... |
| trade_amount   | decimal   | true     | trading volume within the last 24 hours (coin). Sum of both buy and sell sides |                  |
| trade_volume   | decimal   | true     | trading volume within the last 24 hours (cont). Sum of both buy and sell sides |                  |
| trade_turnover | decimal   | true     | trading amount within the last 24 hours. Sum of both buy and sell sides        |                  |
| LIST_END       |           | false    |                                                                                |                  |
| ts             | long      | true     | Time of Respond Generation, Unit: Millisecond                                  |                  |

#### Request example

`curl"https://api.hbdm.com/swap-api/v1/swap_open_interest?contract_code=ltc-usd&direction=sell&offset=open&price=136&lever_rate=5&volume= 1&order_price_type=post_only&tp_trigger_price= 135&tp_order_price= 135&tp_order_price_type=optimal_5&sl_trigger_price= 138&sl_order_price= 138&sl_order_price_type=optimal_5"`

#### Response Example

##### Success Example

{

"status":

"ok"

"data":\[

0:{

"volume":

129

"amount":

9.485294117647058

"symbol":

"LTC"

"contract_code":

"LTC-USD"

"trade_amount":

24.149422048261336

"trade_volume":

320

"trade_turnover":

3200

}

\]

"ts":

1603852005954

}
