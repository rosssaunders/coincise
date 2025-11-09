# GET Contract Elements

**Source:**
[Contract Elements](https://www.htx.com/en-us/opend/newApiPages/?id=8cb89359-77b5-11ed-9966-18bd7dfe1ff)

**Category:** Reference Data

## Authentication

Required (Private Endpoint)

### /swap-api/v1/swap_query_elements (Contract Elements)

Request type: GET

Signature verification: No

Interface permission: Read

Rate Limit: Generally, the private interface rate limit of API key is at most
144 times every 3 seconds for each UID (Trade Interface: at most 72 times every
3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is
shared by all the altcoins contracts delivered by different date).

Interface description: Get Contract Elements info

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter     | Data Type | Required | Description                        | Value Range | Default Value |
| ------------- | --------- | -------- | ---------------------------------- | ----------- | ------------- |
| contract_code | string    | false    | Contract code, if blank, query all | BTC...      |               |

#### Response Parameter

| Parameter             | Data Type    | Required | Description                                                                                                                               | Value Range                                                                                                                     |
| --------------------- | ------------ | -------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| status                | string       | false    |                                                                                                                                           | ok , "error"                                                                                                                    |
| DATA_START            | object array | true     |                                                                                                                                           |                                                                                                                                 |
| contract_code         | string       | true     | BTC...                                                                                                                                    |                                                                                                                                 |
| instrument_index_code | string       | true     | index                                                                                                                                     |                                                                                                                                 |
| real_time_settlement  | int          | true     | Whether to enable real-time settlement: 0: No; 1: Yes                                                                                     |                                                                                                                                 |
| transfer_profit_ratio | Number       | true     | transfer profit ratio                                                                                                                     |                                                                                                                                 |
| min_level             | int          | true     | min level                                                                                                                                 |                                                                                                                                 |
| max_level             | int          | true     | max level                                                                                                                                 |                                                                                                                                 |
| open_order_limit      | int          | true     | long position limit                                                                                                                       |                                                                                                                                 |
| offset_order_limit    | int          | true     | offset order limit                                                                                                                        |                                                                                                                                 |
| long_position_limit   | int          | true     | open order limit                                                                                                                          |                                                                                                                                 |
| short_position_limit  | int          | true     | short position limit                                                                                                                      |                                                                                                                                 |
| price_tick            | string       | true     | price tick                                                                                                                                |                                                                                                                                 |
| instrument_value      | string       | true     | instrument value                                                                                                                          |                                                                                                                                 |
| settle_period         | int          | true     | settle period                                                                                                                             |                                                                                                                                 |
| funding_rate_cap      | int          | true     | funding rate cap                                                                                                                          |                                                                                                                                 |
| funding_rate_floor    | int          | true     | funding rate floor                                                                                                                        |                                                                                                                                 |
| trigger_protect       | decimal      | false    | Threshold for price Protection                                                                                                            |                                                                                                                                 |
| hig_normal_limit      | int          | true     | hig normal limit                                                                                                                          |                                                                                                                                 |
| min_normal_limit      | int          | true     | min normal limit                                                                                                                          |                                                                                                                                 |
| hig_open_limit        | int          | true     | hig open limit                                                                                                                            |                                                                                                                                 |
| min_open_limit        | int          | true     | min open limit                                                                                                                            |                                                                                                                                 |
| hig_trade_limit       | int          | true     | min open limit                                                                                                                            |                                                                                                                                 |
| min_trade_limit       | int          | true     | min open limit                                                                                                                            |                                                                                                                                 |
| CONTRACT_INFOS_START  | object array | true     |                                                                                                                                           |                                                                                                                                 |
| contract_code         | string       | true     | contract code                                                                                                                             |                                                                                                                                 |
| instrument_type       | list         | true     | Types of Futures Expiration: 1: Weekly futures; 2: Bi-weekly futures; 3: Quarterly futures; 4: Bi-quarterly futures; 0: Perpetual futures |                                                                                                                                 |
| settlement_date       | string       | true     | The next settlement time of the contract                                                                                                  | Timestamps, such as "1490759594752"                                                                                             |
| create_date           | string       | true     | Listing Date                                                                                                                              | eg "20190808"                                                                                                                   |
| contract_status       | int          | true     | Contract Status                                                                                                                           | contract status ： 0: Delisting,1: Listing,2: Pending Listing,3: Suspension,4: Suspending of Listing,6: Delivering,8: Delivered |
| CONTRACT_INFOS_START  | object array | true     |                                                                                                                                           |                                                                                                                                 |
| DATA_END              |              | false    |                                                                                                                                           |                                                                                                                                 |
| ts                    | long         | true     |                                                                                                                                           |                                                                                                                                 |

#### Request example

{

"contract_code":

"BTC"

}

#### Response Example

##### Success Example

{

"status":

"ok"

"data":\[

0:{

"contract_code":

"BTC"

"settle_period":

8

"instrument_index_code":

"BTC-USD"

"price_tick":

"0.100000000000000000"

"instrument_value":

"100.000000000000000000"

"min_level":

"1"

"max_level":

"91"

"real_time_settlement":

0

"transfer_profit_ratio":

0

"open_order_limit":

"9000.000000000000000000"

"offset_order_limit":

"9000.000000000000000000"

"long_position_limit":

"18000000.000000000000000000"

"short_position_limit":

"1800000.000000000000000000"

"funding_rate_cap":

"0.003750000000000000"

"funding_rate_floor":

"-0.003750000000000000"

"hig_normal_limit":

"999999.990000000000000000"

"min_normal_limit":

"999999.990000000000000000"

"hig_open_limit":

"999999.990000000000000000"

"min_open_limit":

"999999.990000000000000000"

"hig_trade_limit":

"999999.990000000000000000"

"min_trade_limit":

"999999.990000000000000000"

"contract_infos":\[

0:{

"contract_code":

"BTC-USD"

"settlement_date":

"1734710400000"

"delivery_time":

""

"create_date":

"20221114"

"contract_status":

1

}

\]

}

\]

"ts":

1703215559468

}
