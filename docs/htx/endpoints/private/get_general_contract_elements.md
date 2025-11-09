# GET [General]Contract Elements

**Source:**
[[General]Contract Elements](https://www.htx.com/en-us/opend/newApiPages/?id=8cb89359-77b5-11ed-9966-18bd764260c)

**Category:** Reference Data

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v1/swap_query_elements (\[General\]Contract Elements)

Request type: GET

Signature verification: No

Interface permission: Read

Rate Limit: 20 times/2s

Interface description: Get Contract Elements info

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter     | Data Type | Required | Description                        | Value Range | Default Value |
| ------------- | --------- | -------- | ---------------------------------- | ----------- | ------------- |
| contract_code | string    | false    | Contract code, if empty, query all | BTC-USDT... |               |

#### Response Parameter

| Parameter                   | Data Type    | Required | Description                                                                                                                               | Value Range                                                                                                                     |
| --------------------------- | ------------ | -------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| status                      | string       | false    |                                                                                                                                           | ok , "error"                                                                                                                    |
| DATA_START                  | object array | true     |                                                                                                                                           |                                                                                                                                 |
| contract_code               | string       | true     | BTC-USDT...                                                                                                                               |                                                                                                                                 |
| mode_type                   | int          | true     | Margin Mode: 1: Isolated margin; 2: Cross margin and isolated margin; 3: Cross margin                                                     |                                                                                                                                 |
| swap_delivery_type          | int          | true     | Type of Futures: 1: USDT-M perpetual futures; 2: USDT-M delivery futures; 3: Both of them                                                 |                                                                                                                                 |
| instrument_index_code       | string       | true     | index                                                                                                                                     |                                                                                                                                 |
| real_time_settlement        | int          | true     | Whether to enable real-time settlement: 0: No; 1: Yes                                                                                     |                                                                                                                                 |
| transfer_profit_ratio       | Number       | true     | Available coefficient of isolated margin                                                                                                  |                                                                                                                                 |
| cross_transfer_profit_ratio | Number       | true     | Available coefficient of cross margin                                                                                                     |                                                                                                                                 |
| instrument_type             | list         | true     | Types of Futures Expiration: 1: Weekly futures; 2: Bi-weekly futures; 3: Quarterly futures; 4: Bi-quarterly futures; 0: Perpetual futures |                                                                                                                                 |
| trade_partition             | String       | true     | trade partition USDT HUSD                                                                                                                 |                                                                                                                                 |
| min_level                   | int          | true     | min level                                                                                                                                 |                                                                                                                                 |
| max_level                   | int          | true     | max level                                                                                                                                 |                                                                                                                                 |
| settle_period               | int          | true     | settle period                                                                                                                             |                                                                                                                                 |
| funding_rate_cap            | int          | true     | funding rate cap                                                                                                                          |                                                                                                                                 |
| funding_rate_floor          | int          | true     | funding rate floor                                                                                                                        |                                                                                                                                 |
| trigger_protect             | decimal      | false    | Threshold for price Protection                                                                                                            |                                                                                                                                 |
| long_position_limit         |              | false    | long position limit                                                                                                                       |                                                                                                                                 |
| offset_order_limit          |              | false    | offset order limit                                                                                                                        |                                                                                                                                 |
| open_order_limit            |              | false    | open order limit                                                                                                                          |                                                                                                                                 |
| short_position_limit        |              | false    | short position limit                                                                                                                      |                                                                                                                                 |
| CONTRACT_INFOS_START        | object array | true     |                                                                                                                                           |                                                                                                                                 |
| contract_code               | string       | true     | contract code                                                                                                                             |                                                                                                                                 |
| instrument_type             | list         | true     | Types of Futures Expiration: 1: Weekly futures; 2: Bi-weekly futures; 3: Quarterly futures; 4: Bi-quarterly futures; 0: Perpetual futures |                                                                                                                                 |
| settlement_date             | string       | true     | The next settlement time of the contract                                                                                                  | Timestamps, such as "1490759594752"                                                                                             |
| delivery_time               | string       | true     | delivery time（When the contract does not need to be delivered, the field value is an empty string），millesecond timestamp               |                                                                                                                                 |
| create_date                 | string       | true     | Listing Date                                                                                                                              | eg "20190808"                                                                                                                   |
| contract_status             | int          | true     | Contract Status                                                                                                                           | contract status ： 0: Delisting,1: Listing,2: Pending Listing,3: Suspension,4: Suspending of Listing,6: Delivering,8: Delivered |
| delivery_date               | string       | true     | delivery date, empty string when swap                                                                                                     | such as: "20180720"                                                                                                             |
| CONTRACT_INFOS_START        | object array | true     |                                                                                                                                           |                                                                                                                                 |
| PRICE_TICKS_START           | object array | false    | The Minimum Price Change                                                                                                                  |                                                                                                                                 |
| business_type               | Integer      | true     | 1: Perpetual futures; 2: Delivery futures; 3: Perpetual futures + delivery futures                                                        |                                                                                                                                 |
| price                       | String       | true     | The Minimum Price Change                                                                                                                  |                                                                                                                                 |
| INSTRUMENT_VALUES_START     |              | true     | contract Face Value                                                                                                                       |                                                                                                                                 |
| business_type               | Integer      | true     | 1: Perpetual futures; 2: Delivery futures; 3: Perpetual futures + delivery futures                                                        |                                                                                                                                 |
| price                       | String       | true     | contract Face Value                                                                                                                       |                                                                                                                                 |
| ORDER_LIMITS_START          | object array | true     | The maximum quantity of single order (Cont)                                                                                               |                                                                                                                                 |
| instrument_type             | int          | true     | Types of Futures Expiration: 1: Weekly futures; 2: Bi-weekly futures; 3: Quarterly futures; 4: Bi-quarterly futures; 0: Perpetual futures |                                                                                                                                 |
| open                        | String       | true     | open                                                                                                                                      |                                                                                                                                 |
| close                       | String       | true     | close                                                                                                                                     |                                                                                                                                 |
| open_after_closing          | String       | true     | open after closing                                                                                                                        |                                                                                                                                 |
| NORMAL_LIMITS_START         |              | false    | Hard Price Limit                                                                                                                          |                                                                                                                                 |
| instrument_type             | int          | true     | Types of Futures Expiration: 1: Weekly futures; 2: Bi-weekly futures; 3: Quarterly futures; 4: Bi-quarterly futures; 0: Perpetual futures |                                                                                                                                 |
| open                        | String       | true     | open                                                                                                                                      |                                                                                                                                 |
| close                       | String       | true     | close                                                                                                                                     |                                                                                                                                 |
| OPEN_LIMITS_START           | object       | false    | Non-basis Price Limit                                                                                                                     |                                                                                                                                 |
| instrument_type             | int          | true     | Types of Futures Expiration: 1: Weekly futures; 2: Bi-weekly futures; 3: Quarterly futures; 4: Bi-quarterly futures; 0: Perpetual futures |                                                                                                                                 |
| open                        | String       | true     | open                                                                                                                                      |                                                                                                                                 |
| close                       | String       | true     | close                                                                                                                                     |                                                                                                                                 |
| TRADE_LIMITS_START          |              | false    | Basis Price Limit                                                                                                                         |                                                                                                                                 |
| instrument_type             | int          | true     | Types of Futures Expiration: 1: Weekly futures; 2: Bi-weekly futures; 3: Quarterly futures; 4: Bi-quarterly futures; 0: Perpetual futures |                                                                                                                                 |
| open                        | String       | true     | open                                                                                                                                      |                                                                                                                                 |
| close                       | String       | true     | close                                                                                                                                     |                                                                                                                                 |
| DATA_END                    |              | false    |                                                                                                                                           |                                                                                                                                 |
| ts                          | long         | true     |                                                                                                                                           |                                                                                                                                 |

#### Request example

`curl"https://api.hbdm.com?contract_code=XRP-USDT"`

#### Response Example

##### Success Example

{

"status":

"ok"

"data":\[

0:{

"contract_code":

"BTC-USDT"

"funding_rate_cap":

"0.003750000000000000"

"funding_rate_floor":

"-0.003750000000000000"

"mode_type":

2

"swap_delivery_type":

3

"settle_period":

8

"instrument_index_code":

"BTC-USDT"

"price_ticks":\[

0:{

"business_type":

1

"price":

"0.001000000000000000"

}

1:{

"business_type":

2

"price":

"0.100000000000000000"

}

\]

"instrument_values":\[

0:{

"business_type":

1

"price":

"0.001000000000000000"

}

1:{

"business_type":

2

"price":

"0.001000000000000000"

}

\]

"min_level":

"1"

"max_level":

"200"

"order_limits":\[

0:{

"open_after_closing":

"99999999.000000000000000000"

"instrument_type":

0

"open":

"99999999.000000000000000000"

"close":

"99999999.000000000000000000"

}

1:{

"open_after_closing":

"99999999.000000000000000000"

"instrument_type":

1

"open":

"99999999.000000000000000000"

"close":

"99999999.000000000000000000"

}

2:{

"open_after_closing":

"170000.000000000000000000"

"instrument_type":

2

"open":

"170000.000000000000000000"

"close":

"170000.000000000000000000"

}

\]

"normal_limits":\[

0:{

"instrument_type":

0

"open":

"999999.990000000000000000"

"close":

"999999.990000000000000000"

}

1:{

"instrument_type":

1

"open":

"999999.990000000000000000"

"close":

"999999.990000000000000000"

}

2:{

"instrument_type":

2

"open":

"999999.990000000000000000"

"close":

"999999.990000000000000000"

}

\]

"open_limits":\[

0:{

"instrument_type":

0

"open":

"999999.990000000000000000"

"close":

"999999.990000000000000000"

}

1:{

"instrument_type":

1

"open":

"999999.990000000000000000"

"close":

"999999.990000000000000000"

}

2:{

"instrument_type":

2

"open":

"999999.990000000000000000"

"close":

"999999.990000000000000000"

}

\]

"trade_limits":\[

0:{

"instrument_type":

0

"open":

"999999.990000000000000000"

"close":

"999999.990000000000000000"

}

1:{

"instrument_type":

1

"open":

"999999.990000000000000000"

"close":

"999999.990000000000000000"

}

2:{

"instrument_type":

2

"open":

"999999.990000000000000000"

"close":

"999999.990000000000000000"

}

\]

"real_time_settlement":

1

"transfer_profit_ratio":

1

"cross_transfer_profit_ratio":

1

"instrument_type":\[

0

:

1

1

:

2

2

:

0

\]

"price_tick":

"0.001000000000000000"

"instrument_value":

"0.001000000000000000"

"trade_partition":

"USDT"

"open_order_limit":

"99999999.000000000000000000"

"offset_order_limit":

"99999999.000000000000000000"

"long_position_limit":

"200000000.000000000000000000"

"short_position_limit":

"200000000.000000000000000000"

"contract_infos":\[

0:{

"contract_code":

"BTC-USDT-231222"

"instrument_type":

1

"settlement_date":

"1703232000000"

"delivery_time":

"1703232000000"

"create_date":

"20231208"

"contract_status":

1

"delivery_date":

"20231222"

}

1:{

"contract_code":

"BTC-USDT-231229"

"instrument_type":

2

"settlement_date":

"1703836800000"

"delivery_time":

"1703836800000"

"create_date":

"20230915"

"contract_status":

1

"delivery_date":

"20231229"

}

2:{

"contract_code":

"BTC-USDT"

"instrument_type":

0

"settlement_date":

"1703232000000"

"delivery_time":

""

"create_date":

"20230905"

"contract_status":

1

"delivery_date":

""

}

\]

}

\]

"ts":

1703217085568

}
