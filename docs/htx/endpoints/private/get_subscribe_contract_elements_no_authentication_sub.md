# GET Subscribe contract elements (no authentication)（sub）

**Source:**
[Subscribe contract elements (no authentication)（sub）](https://www.htx.com/en-us/opend/newApiPages/?id=8cb89359-77b5-11ed-9966-18ef189bb24)

**Category:** Orders and Accounts WebSocket Interfaces

## Authentication

Required (Private Endpoint)

### public.$contract_code.contract_elements (Subscribe contract elements (no authentication)（sub）)

Signature verification: Yes

Interface permission: Read

Rate Limit: For public interface to get market data such as Get Kline data, Get
Market Data Overview, Get Contract Information,Get market in-depth data, Get
premium index Kline, Get real-time forecast capital rate kline, Get basis data,
Get the last Trade of a Contract and so on： For websocket: The rate limit for
“req” request is 50 times at once. No limit for “sub” request as the data will
be pushed by sever voluntarily.

Interface description: Check the latest contract elements information

#### Subscription Address

| Environment                         | Address                              |
| ----------------------------------- | ------------------------------------ |
| Online                              | wss://api.hbdm.com/swap-notification |
| Online (preferred by aws customers) | wss://api.hbdm.vn/swap-notification  |

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

| Parameter | Data Type | Required | Description                                                                                                                     | Value Range | Default Value |
| --------- | --------- | -------- | ------------------------------------------------------------------------------------------------------------------------------- | ----------- | ------------- |
| op        | string    | true     | Required； Operator Name，value for unsubscribe is Sub/Unsubscribe ;                                                            |             |               |
| cid       | string    | false    | Optional; ID Client requests unique ID                                                                                          |             |               |
| topic     | string    | true     | Required；Sub/Unsubscribe Topic Name, format: orders.$contract_code; For parameter details please check req Subscribe Parameter |             |               |

#### Data Update

| Parameter             | Data Type    | Required | Description                                                                                                                 | Value Range                                                                                                                     |
| --------------------- | ------------ | -------- | --------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| op                    | string       | true     | op                                                                                                                          |                                                                                                                                 |
| topic                 | string       | true     | topic                                                                                                                       |                                                                                                                                 |
| ts                    | long         | true     |                                                                                                                             |                                                                                                                                 |
| DATA_START            | object array | true     |                                                                                                                             |                                                                                                                                 |
| contract_code         | string       | true     | BTC...                                                                                                                      |                                                                                                                                 |
| instrument_index_code | string       | true     | index                                                                                                                       |                                                                                                                                 |
| real_time_settlement  | int          | true     | Whether to enable real-time settlement: 0: No; 1: Yes                                                                       |                                                                                                                                 |
| transfer_profit_ratio | Number       | true     | transfer profit ratio                                                                                                       |                                                                                                                                 |
| min_level             | int          | true     | min level                                                                                                                   |                                                                                                                                 |
| max_level             | int          | true     | max level                                                                                                                   |                                                                                                                                 |
| CONTRACT_INFOS_START  |              | false    |                                                                                                                             |                                                                                                                                 |
| contract_code         |              | false    |                                                                                                                             |                                                                                                                                 |
| delivery_time         | string       | true     | delivery time（When the contract does not need to be delivered, the field value is an empty string），millesecond timestamp |                                                                                                                                 |
| create_date           | string       | true     | Listing Date                                                                                                                | eg "20190808"                                                                                                                   |
| contract_status       | int          | true     | Contract Status                                                                                                             | contract status ： 0: Delisting,1: Listing,2: Pending Listing,3: Suspension,4: Suspending of Listing,6: Delivering,8: Delivered |
| settlement_date       | string       | true     |                                                                                                                             |                                                                                                                                 |
| CONTRACT_INFOS_START  |              | false    |                                                                                                                             |                                                                                                                                 |
| open_order_limit      | int          | true     | open order limit                                                                                                            |                                                                                                                                 |
| offset_order_limit    | int          | true     | offset order limit                                                                                                          |                                                                                                                                 |
| long_position_limit   | int          | true     | long position limit                                                                                                         |                                                                                                                                 |
| short_position_limit  | int          | true     | short position limit                                                                                                        |                                                                                                                                 |
| price_tick            | string       | true     | price tick                                                                                                                  |                                                                                                                                 |
| instrument_value      | string       | true     | instrument value                                                                                                            |                                                                                                                                 |
| settle_period         | int          | true     | settle period                                                                                                               |                                                                                                                                 |
| funding_rate_cap      | int          | true     | funding rate cap                                                                                                            |                                                                                                                                 |
| funding_rate_floor    | int          | true     | funding rate floor                                                                                                          |                                                                                                                                 |
| hig_normal_limit      | int          | true     | hig normal limit                                                                                                            |                                                                                                                                 |
| min_normal_limit      | int          | true     | min normal limit                                                                                                            |                                                                                                                                 |
| hig_open_limit        | int          | true     | hig open limit                                                                                                              |                                                                                                                                 |
| min_open_limit        | int          | true     | min open limit                                                                                                              |                                                                                                                                 |
| hig_trade_limit       | int          | true     | hig trade limit                                                                                                             |                                                                                                                                 |
| min_trade_limit       | int          | true     | min trade limit                                                                                                             |                                                                                                                                 |
| DATA_END              |              | false    |                                                                                                                             |                                                                                                                                 |

#### Subscription Example

{

"op":

"sub"

"cid":

"40sG903yz80oDFWr"

"topic":

"public.BTC-USD.contract_elements"

}

#### Example of a Successful Subscription

{

"op":

"sub"

"cid":

"40sG903yz80oDFWr"

"topic":

"public.BTC-USD.contract_elements"

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

"public.XRP-USD.contract_elements"

"ts":

1712804889692

"data":{

"contract_code":

"XRP"

"settle_period":

8

"instrument_index_code":

"XRP-USD"

"price_tick":

"0.010000"

"instrument_value":

"10"

"min_level":

"1"

"max_level":

"75"

"real_time_settlement":

0

"transfer_profit_ratio":

0

"open_order_limit":

"10001.000000000000000000"

"offset_order_limit":

"20001.000000000000000000"

"long_position_limit":

"80001"

"short_position_limit":

"8002"

"funding_rate_cap":

"0.0071"

"funding_rate_floor":

"-0.0072"

"hig_normal_limit":

"999999.99"

"min_normal_limit":

"999999.99"

"hig_open_limit":

"999999.99"

"min_open_limit":

"999999.99"

"hig_trade_limit":

"999999.99"

"min_trade_limit":

"999999.99"

"contract_infos":\[

0:{

"contract_code":

"XRP-USD"

"settlement_date":

"1715428800000"

"delivery_time":

""

"create_date":

"20230324"

"contract_status":

1

}

\]

}

}

#### Example of a Subscription Cancellation

{

"op":

"unsub"

"topic":

"public.BTC-USD.contract_elements"

"cid":

"40sG903yz80oDFWr"

}
