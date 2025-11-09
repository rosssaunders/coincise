# GET [General] Subscribe contract elements (no authentication)（sub）

**Source:**
[[General] Subscribe contract elements (no authentication)（sub）](https://www.htx.com/en-us/opend/newApiPages/?id=8cb89359-77b5-11ed-9966-18ef15d1f28)

**Category:** Orders and Accounts WebSocket Interfaces

## Authentication

Required (Private Endpoint)

### public.$contract_code.contract_elements (\[General\] Subscribe contract elements (no authentication)（sub）)

Signature verification: Yes

Interface permission: Read

Rate Limit: For public interface to get market data such as Get Kline data, Get
Market Data Overview, Get Contract Information,Get market in-depth data, Get
premium index Kline, Get real-time forecast capital rate kline, Get basis data,
Get the last Trade of a Contract and so on： For websocket: The rate limit for
“req” request is 50 times at once. No limit for “sub” request as the data will
be pushed by sever voluntarily.

Interface description: The interface supports cross margin mode and isolated
margin mode，Check the latest contract elements information

#### Subscription Address

| Environment                         | Address                                     |
| ----------------------------------- | ------------------------------------------- |
| Online                              | wss://api.hbdm.com/linear-swap-notification |
| Online (preferred by aws customers) | wss://api.hbdm.vn/linear-swap-notification  |

#### Request Parameter

| Field Name | Type   | Description                                                                                                                     |
| ---------- | ------ | ------------------------------------------------------------------------------------------------------------------------------- |
| op         | string | Required； Operator Name，value for unsubscribe is Sub/Unsubscribe ;                                                            |
| cid        | string | Optional; ID Client requests unique ID                                                                                          |
| topic      | string | Required；Sub/Unsubscribe Topic Name, format: orders.$contract_code; For parameter details please check req Subscribe Parameter |

#### Rule description

| Subscribe(sub)                          | Unsubscribe( unsub )                    | Rule                      |
| --------------------------------------- | --------------------------------------- | ------------------------- |
| public.$contract_code.contract_elements | public.$contract_code.contract_elements | Allowed (single contract) |
| public.\*.contract_elements             | public.\*.contract_elements             | Allowed (all contracts)   |

#### Subscription Parameter

| Parameter     | Data Type | Required | Description          | Value Range                                                                    | Default Value |
| ------------- | --------- | -------- | -------------------- | ------------------------------------------------------------------------------ | ------------- |
| contract_code | string    | true     | contract code        | all: \* (swap and future), swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |               |
| cid           | string    | false    | Current request's ID |                                                                                |               |

#### Data Update

| Parameter                   | Data Type    | Required | Description                                                                                                                               | Value Range                                                                                                                     |
| --------------------------- | ------------ | -------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| op                          | string       | true     | op                                                                                                                                        |                                                                                                                                 |
| topic                       | string       | true     | topic                                                                                                                                     |                                                                                                                                 |
| ts                          | long         | true     |                                                                                                                                           |                                                                                                                                 |
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
| CONTRACT_INFOS_START        |              | false    |                                                                                                                                           |                                                                                                                                 |
| contract_code               |              | false    |                                                                                                                                           |                                                                                                                                 |
| instrument_type             |              | false    |                                                                                                                                           |                                                                                                                                 |
| settlement_date             | string       | true     |                                                                                                                                           |                                                                                                                                 |
| delivery_time               | string       | true     | delivery time（When the contract does not need to be delivered, the field value is an empty string），millesecond timestamp               |                                                                                                                                 |
| create_date                 | string       | true     | Listing Date                                                                                                                              | eg "20190808"                                                                                                                   |
| contract_status             | int          | true     | Contract Status                                                                                                                           | contract status ： 0: Delisting,1: Listing,2: Pending Listing,3: Suspension,4: Suspending of Listing,6: Delivering,8: Delivered |
| delivery_date               | string       | true     | delivery date, empty string when swap                                                                                                     | such as: "20180720"                                                                                                             |
| CONTRACT_INFOS_START        |              | false    |                                                                                                                                           |                                                                                                                                 |
| long_position_limit         |              | false    | long position limit                                                                                                                       |                                                                                                                                 |
| offset_order_limit          |              | false    | offset order limit                                                                                                                        |                                                                                                                                 |
| open_order_limit            |              | false    | open order limit                                                                                                                          |                                                                                                                                 |
| short_position_limit        |              | false    | short position limit                                                                                                                      |                                                                                                                                 |
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

#### Subscription Example

{

"op":

"sub"

"cid":

"40sG903yz80oDFWr"

"topic":

"public.BTC-USDT.contract_elements"

}

#### Example of a Successful Subscription

{

"op":

"sub"

"cid":

"40sG903yz80oDFWr"

"topic":

"public.BTC-USDT.contract_elements"

"ts":

1670903745088

"err-code":

0

}

#### Example of a Data Update

{

"op":

"notify"

"event":

"init"

"topic":

"public.DOSE-USDT.contract_elements"

"ts":

1712804933421

"data":{

"contract_code":

"DOSE-USDT"

"funding_rate_cap":

"0.007800000000000000"

"funding_rate_floor":

"-0.007600000000000000"

"mode_type":

2

"swap_delivery_type":

3

"settle_period":

4

"instrument_index_code":

"DOSE-USDT"

"price_ticks":\[

0:{

"business_type":

2

"price":

"0.000010000000000000"

}

1:{

"business_type":

1

"price":

"0.000000000100000000"

}

\]

"instrument_values":\[

0:{

"business_type":

2

"price":

"0.000010000000000000"

}

1:{

"business_type":

1

"price":

"0.000010000000000000"

}

\]

"min_level":

"1"

"max_level":

"74"

"order_limits":\[

0:{

"open_after_closing":

"500000000000.000000000000000000"

"instrument_type":

1

"open":

"500000000000.000000000000000000"

"close":

"500000000000.000000000000000000"

}

1:{

"open_after_closing":

"500000000000.000000000000000000"

"instrument_type":

2

"open":

"500000000000.000000000000000000"

"close":

"500000000000.000000000000000000"

}

2:{

"open_after_closing":

"500000000000.000000000000000000"

"instrument_type":

3

"open":

"500000000000.000000000000000000"

"close":

"500000000000.000000000000000000"

}

3:{

"open_after_closing":

"500000000003.000000000000000000"

"instrument_type":

0

"open":

"500000000001.000000000000000000"

"close":

"10005000000002.000000000000000000"

}

\]

"normal_limits":\[

0:{

"instrument_type":

1

"open":

"999999.910000000000000000"

"close":

"999999.920000000000000000"

}

1:{

"instrument_type":

2

"open":

"999999.990000000000000000"

"close":

"999999.990000000000000000"

}

2:{

"instrument_type":

3

"open":

"999999.990000000000000000"

"close":

"999999.990000000000000000"

}

3:{

"instrument_type":

0

"open":

"999999.910000000000000000"

"close":

"999999.920000000000000000"

}

\]

"open_limits":\[

0:{

"instrument_type":

1

"open":

"999999.930000000000000000"

"close":

"999999.940000000000000000"

}

1:{

"instrument_type":

2

"open":

"999999.990000000000000000"

"close":

"999999.990000000000000000"

}

2:{

"instrument_type":

3

"open":

"999999.990000000000000000"

"close":

"999999.990000000000000000"

}

3:{

"instrument_type":

0

"open":

"999999.930000000000000000"

"close":

"999999.940000000000000000"

}

\]

"trade_limits":\[

0:{

"instrument_type":

1

"open":

"999999.950000000000000000"

"close":

"999999.960000000000000000"

}

1:{

"instrument_type":

2

"open":

"999999.990000000000000000"

"close":

"999999.990000000000000000"

}

2:{

"instrument_type":

3

"open":

"999999.990000000000000000"

"close":

"999999.990000000000000000"

}

3:{

"instrument_type":

0

"open":

"999999.950000000000000000"

"close":

"999999.960000000000000000"

}

\]

"real_time_settlement":

0

"transfer_profit_ratio":

0

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

3

3

:

0

\]

"price_tick":

"0.000000000100000000"

"instrument_value":

"0.000010000000000000"

"trade_partition":

"USDT"

"open_order_limit":

"500000000001.000000000000000000"

"offset_order_limit":

"10005000000002.000000000000000000"

"long_position_limit":

"4000001.000000000000000000"

"short_position_limit":

"4000002.000000000000000000"

"contract_infos":\[

0:{

"contract_code":

"DOSE-USDT-231027"

"instrument_type":

1

"settlement_date":

"1694592000000"

"delivery_time":

"1698393600000"

"create_date":

"20231024"

"contract_status":

1

"delivery_date":

"20231027"

}

1:{

"contract_code":

"DOSE-USDT-231103"

"instrument_type":

2

"settlement_date":

"1694592000000"

"delivery_time":

"1698998400000"

"create_date":

"20231024"

"contract_status":

1

"delivery_date":

"20231103"

}

2:{

"contract_code":

"DOSE-USDT-231229"

"instrument_type":

3

"settlement_date":

"1694592000000"

"delivery_time":

"1703836800000"

"create_date":

"20231024"

"contract_status":

1

"delivery_date":

"20231229"

}

3:{

"contract_code":

"DOSE-USDT"

"instrument_type":

0

"settlement_date":

"1712822400000"

"delivery_time":

""

"create_date":

"20231024"

"contract_status":

1

"delivery_date":

""

}

\]

}

}

#### Example of a Subscription Cancellation

{

"op":

"unsub"

"topic":

"public.BTC-USDT.contract_elements"

"cid":

"40sG903yz80oDFWr"

}
