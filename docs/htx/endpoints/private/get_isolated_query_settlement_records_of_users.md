# GET [Isolated]Query Settlement Records of Users

**Source:**
[[Isolated]Query Settlement Records of Users](https://www.htx.com/en-us/opend/newApiPages/?id=8cb82ba7-77b5-11ed-9966-0242ac110003)

**Category:** Downline Interface

## Authentication

Required (Private Endpoint)

### linear-swap-api/v1/swap_user_settlement_records (\[Isolated\]Query Settlement Records of Users)

Request type: POST

Signature verification: Yes

Interface permission: Read

Rate Limit: Generally, the private interface rate limit of API key is at most
144 times every 3 seconds for each UID (Trade Interface: at most 72 times every
3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is
shared by all the altcoins contracts delivered by different date).

Interface description: This interface only supports isolated margin mode.

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter     | Data Type | Required | Description                              | Value Range                                                           | Default Value |
| ------------- | --------- | -------- | ---------------------------------------- | --------------------------------------------------------------------- | ------------- |
| contract_code | string    | true     | contract_code                            | "BTC-USDT"...                                                         |               |
| start_time    | long      | false    | start time(timestamp, Unit: Millisecond) | Value Range：\[(now - 90 days), now\] , now - 90 days                 |               |
| end_time      | long      | false    | end time(timestamp, Unit: Millisecond)   | Value Range：(start_time, now\], now                                  |               |
| page_index    | int       | false    | page index                               | if not filled in is 1st                                               |               |
| page_size     | int       | false    | page size                                | if not filled in is 20, and 50 at most(if more than 50, treated as 50 |               |

Notes:  
The data of response is descending sorted, the latest the first.  
The settlement records is between "from" and "to"  
This interface only supports users to query data for the last 90 days.

#### Response Parameter

| Parameter                | Data Type    | Required | Description                                                                                                                                           | Value Range         |
| ------------------------ | ------------ | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| status                   | string       | true     | status                                                                                                                                                |                     |
| DATA_START               | object       | true     |                                                                                                                                                       |                     |
| SETTLEMENT_RECORDS_START | object array | true     |                                                                                                                                                       |                     |
| symbol                   | string       | true     | symbol                                                                                                                                                | "BTC","ETH"...      |
| contract_code            | string       | true     | contract code                                                                                                                                         | "BTC-USDT" ...      |
| margin_mode              | string       | true     | margin mode                                                                                                                                           | cross/isolated      |
| margin_account           | string       | true     | margin account                                                                                                                                        | such as: “BTC-USDT” |
| margin_balance_init      | decimal      | true     | Initial account equity of this period (this value is only valid for non-unified account users, and invalid for unified account users)                 |                     |
| margin_balance           | decimal      | true     | Account equity after settlement in the current period (this value is only valid for non-unified account users, and invalid for unified account users) |                     |
| settlement_profit_real   | decimal      | true     | settlement profit real                                                                                                                                |                     |
| settlement_time          | long         | true     | settlement time/delivery time                                                                                                                         |                     |
| clawback                 | decimal      | true     | clawback                                                                                                                                              |                     |
| funding_fee              | decimal      | true     | current funding fee(or current delivery fee)                                                                                                          |                     |
| offset_profitloss        | decimal      | true     | offset profit or loss                                                                                                                                 |                     |
| fee                      | decimal      | true     | fee                                                                                                                                                   |                     |
| fee_asset                | string       | true     | fee asset                                                                                                                                             |                     |
| POSITIONS_START          | object array | true     |                                                                                                                                                       |                     |
| symbol                   | string       | true     | symbol                                                                                                                                                | "BTC","ETH"...      |
| contract_code            | string       | true     | contract code                                                                                                                                         | "BTC-USDT" ...      |
| direction                | string       | true     | direction                                                                                                                                             | "buy"/"sell"        |
| volume                   | decimal      | true     | volume before settlement(cont)                                                                                                                        |                     |
| cost_open                | decimal      | true     | cost open                                                                                                                                             |                     |
| cost_hold_pre            | decimal      | true     | cost hold before settlement                                                                                                                           |                     |
| cost_hold                | decimal      | true     | cost hold after settlement                                                                                                                            |                     |
| settlement_profit_unreal | decimal      | true     | settlement profit unreal                                                                                                                              |                     |
| settlement_price         | decimal      | true     | settlement price/delivery time                                                                                                                        |                     |
| settlement_type          | string       | true     | settlement type                                                                                                                                       | settlement/delivery |
| POSITIONS_END            |              | false    |                                                                                                                                                       |                     |
| SETTLEMENT_RECORDS_END   |              | false    |                                                                                                                                                       |                     |
| total_page               | int          | true     | total page                                                                                                                                            |                     |
| current_page             | int          | true     | current page                                                                                                                                          |                     |
| total_size               | int          | true     | total size                                                                                                                                            |                     |
| DATA_END                 |              | false    |                                                                                                                                                       |                     |
| ts                       | long         | true     | timestamp                                                                                                                                             |                     |

#### Request example

{

"contract_code":

"BTC-USDT"

"start_time":

1660119810000

"end_time":

1660274746031

"page_index":

1

"page_size":

50

}

#### Response Example

##### Success Example

{

"status":

"ok"

"data":{

"total_page":

1

"current_page":

1

"total_size":

13

"settlement_records":\[

0:{

"symbol":

"BTC"

"contract_code":

"BTC-USDT"

"margin_mode":

"isolated"

"margin_account":

"BTC-USDT"

"margin_balance_init":

5000

"margin_balance":

4891.74704672

"settlement_profit_real":

\-108.25295328

"settlement_time":

1611040802012

"clawback":

0

"funding_fee":

0

"offset_profitloss":

0

"fee":

\-2.63615328

"fee_asset":

"USDT"

"positions":\[

0:{

"symbol":

"BTC"

"contract_code":

"BTC-USDT"

"direction":

"buy"

"volume":

12

"cost_open":

27900

"cost_hold_pre":

27900

"cost_hold":

27459.93

"settlement_profit_unreal":

\-52.8084

"settlement_price":

27459.93

"settlement_type":

"settlement"

}

1:{

"symbol":

"BTC"

"contract_code":

"BTC-USDT"

"direction":

"sell"

"volume":

12

"cost_open":

27019.86

"cost_hold_pre":

27019.86

"cost_hold":

27459.93

"settlement_profit_unreal":

\-52.8084

"settlement_price":

27459.93

"settlement_type":

"settlement"

}

\]

}

\]

}

"ts":

1611052289681

}
