# GET Query Asset Valuation

**Source:**
[Query Asset Valuation](https://www.htx.com/en-us/opend/newApiPages/?id=5d51842b-77b6-11ed-9966-0242ac110003)

**Category:** Swap Account Interface

## Authentication

Required (Private Endpoint)

### /swap-api/v1/swap_balance_valuation (Query Asset Valuation)

Request type: POST

Signature verification: Yes

Interface permission: Read

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter       | Data Type | Required | Description                                                                          | Value Range                                                                   | Default Value |
| --------------- | --------- | -------- | ------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------- | ------------- |
| valuation_asset | string    | false    | The valuation according to the certain fiat currency. If not fill in, default as BTC | "BTC","USD","CNY","EUR","GBP","VND","HKD","TWD","MYR","SGD","KRW","RUB","TRY" |               |

#### Response Parameter

| Parameter       | Data Type    | Required | Description                                          | Value Range                                                                   |
| --------------- | ------------ | -------- | ---------------------------------------------------- | ----------------------------------------------------------------------------- |
| status          | string       | true     | the result of server handles for the request         |                                                                               |
| DATA_START      | object array | true     |                                                      |                                                                               |
| valuation_asset | string       | true     | The valuation according to the certain fiat currency | "BTC","USD","CNY","EUR","GBP","VND","HKD","TWD","MYR","SGD","KRW","RUB","TRY" |
| balance         | string       | true     | Asset Valuation                                      |                                                                               |
| DATA_END        |              | false    |                                                      |                                                                               |
| ts              | long         | true     | timestamp                                            |                                                                               |

#### Request example

{

"valuation_asset":

"BTC-USD"

}

#### Response Example

##### Success Example

{

"status":

"ok"

"data":\[

0:{

"valuation_asset":

"CNY"

"balance":

"167724.592639011521722342"

}

\]

"ts":

1614045313200

}
