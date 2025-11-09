# GET Futures Risk Limit

**Source:**
[Get Futures Risk Limit](https://www.htx.com/en-us/opend/newApiPages/?id=8cb89359-77b5-11ed-9966-195a1c64aef)

**Category:** Basic Information

## Authentication

Required (Private Endpoint)

### /v5/market/risk/limit (Get Futures Risk Limit)

Request type: GET

Signature verification: Yes

Interface permission: Read

Rate Limit: Generally, the private interface rate limit of API key is at most
144 times every 3 seconds for each UID (Trade Interface: at most 72 times every
3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is
shared by all the altcoins contracts delivered by different date).

Interface description: Get information from the Futures Risk Limit Table.

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online (preferred by aws customers) | https://api.hbdm.vn  |
| Online                              | https://api.hbdm.com |

#### Request Parameter

| Parameter     | Data Type | Required | Description                   | Value Range                                                                                              | Default Value |
| ------------- | --------- | -------- | ----------------------------- | -------------------------------------------------------------------------------------------------------- | ------------- |
| contract_code | String    | false    | Symbol                        | "BTC-USDT", "ETH-USDT"……                                                                                 |               |
| contract_type | String    | false    | Contract type                 | swap: Perpetual; this_week: Weekly; next_week: Bi-weekly; quarter: Quarterly; next_quarter: Bi-quarterly |               |
| margin_mode   | String    | false    | Margin mode                   | cross: Cross margin                                                                                      |               |
| tier          | String    | false    | View designated position tier |                                                                                                          |               |

#### Response Parameter

| Parameter               | Data Type | Required | Description                      | Value Range                                                                                              |
| ----------------------- | --------- | -------- | -------------------------------- | -------------------------------------------------------------------------------------------------------- |
| contract_code           | String    | true     | Symbol                           | "BTC-USDT", "ETH-USDT"……                                                                                 |
| contract_type           | String    | true     | Contract type                    | swap: Perpetual; this_week: Weekly; next_week: Bi-weekly; quarter: Quarterly; next_quarter: Bi-quarterly |
| margin_mode             | String    | true     | Margin mode                      | cross: Cross margin                                                                                      |
| tier                    | String    | true     | View designated position tier    |                                                                                                          |
| max_lever               | String    | true     | Current maximum leverage         |                                                                                                          |
| maintenance_margin_rate | String    | true     | Current maintenance margin ratio |                                                                                                          |
| max_volume              | String    | true     | Current maximum position Cont    |                                                                                                          |
| min_volume              | String    | true     | Current minimum position Cont    |                                                                                                          |

#### Request example

{

"contract_code":

"BTC-USDT"

}

#### Response Example

##### Success Example

{

"code":

200

"message":

"Success"

"data":\[

0:{

"contract_code":

"BTC-USDT"

"margin_mode":

"cross"

"tier":

1

"max_lever":

"200"

"maintenance_margin_rate":

"0.00385"

"max_volume":

"400"

"min_volume":

"1"

}

1:{

"contract_code":

"BTC-USDT"

"margin_mode":

"cross"

"tier":

2

"max_lever":

"100"

"maintenance_margin_rate":

"0.005"

"max_volume":

"4000"

"min_volume":

"401"

}

2:{

"contract_code":

"BTC-USDT"

"margin_mode":

"cross"

"tier":

3

"max_lever":

"50"

"maintenance_margin_rate":

"0.015"

"max_volume":

"8000"

"min_volume":

"4001"

}

3:{

"contract_code":

"BTC-USDT"

"margin_mode":

"cross"

"tier":

4

"max_lever":

"30"

"maintenance_margin_rate":

"0.02"

"max_volume":

"120000"

"min_volume":

"8001"

}

4:{

"contract_code":

"BTC-USDT"

"margin_mode":

"cross"

"tier":

5

"max_lever":

"20"

"maintenance_margin_rate":

"0.03"

"max_volume":

"500000"

"min_volume":

"120000"

}

\]

"ts":

1740126940401

}
