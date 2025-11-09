# GET [Cross]Query Settlement Records of Users

**Source:**
[[Cross]Query Settlement Records of Users](https://www.htx.com/en-us/opend/newApiPages/?id=8cb82cf8-77b5-11ed-9966-0242ac110003)

**Category:** Downline Interface

## Authentication

Required (Private Endpoint)

### linear-swap-api/v1/swap_cross_user_settlement_records (\[Cross\]Query Settlement Records of Users)

Request type: POST

Signature verification: Yes

Interface permission: Read

Rate Limit: Generally, the private interface rate limit of API key is at most
144 times every 3 seconds for each UID (Trade Interface: at most 72 times every
3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is
shared by all the altcoins contracts delivered by different date).

Interface description: The interface only supports cross margin mode.

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter      | Data Type | Required | Description                              | Value Range                                                     | Default Value |
| -------------- | --------- | -------- | ---------------------------------------- | --------------------------------------------------------------- | ------------- |
| margin_account | string    | true     | margin account                           | "USDT", now only support USDT                                   |               |
| start_time     | long      | false    | start time(timestamp, Unit: Millisecond) | Value Range：\[(now - 90 days), now\] , now - 90 days           |               |
| end_time       | long      | false    | end time(timestamp, Unit: Millisecond)   | Value Range：(start_time, now\], now                            |               |
| page_index     | int       | false    | page index                               | if not filled in is 1st                                         |               |
| page_size      | int       | false    | page size                                | if not filled is 10, 25 at most(if more than 25, treated as 50) |               |

Notes:  
The data of response is descending sorted, the latest the first.  
The settlement records is between "from" and "to"  
This interface only supports users to query data for the last 90 days.

#### Response Parameter

| Parameter                | Data Type    | Required | Description                              | Value Range         |
| ------------------------ | ------------ | -------- | ---------------------------------------- | ------------------- |
| status                   | string       | true     | status                                   |                     |
| DATA_START               | object       | true     |                                          |                     |
| SETTLEMENT_RECORDS_START | object array | true     |                                          |                     |
| margin_mode              | string       | true     | margin mode                              | cross/isolated      |
| margin_account           | string       | true     | margin account                           | such as “USDT”      |
| margin_balance_init      | decimal      | true     | margin balance init                      |                     |
| margin_balance           | decimal      | true     | margin balance after current settlement  |                     |
| settlement_profit_real   | decimal      | true     | settlement profit real                   |                     |
| settlement_time          | long         | true     | settlement time/delivery time            |                     |
| clawback                 | decimal      | true     | clawback                                 |                     |
| funding_fee              | decimal      | true     | total funding fee(delivery fee included) |                     |
| offset_profitloss        | decimal      | true     | offset profit or loss                    |                     |
| fee                      | decimal      | true     | fee                                      |                     |
| fee_asset                | string       | true     | fee asset                                |                     |
| CONTRACT_DETAIL_START    | object array | true     |                                          |                     |
| symbol                   | string       | true     | symbol                                   | "BTC","ETH"...      |
| contract_code            | string       | true     | contract code                            | "BTC-USDT" ...      |
| offset_profitloss        | decimal      | true     | offset profit or loss current settlement |                     |
| fee                      | decimal      | true     | fee current settlement                   |                     |
| fee_asset                | string       | true     | fee asset                                |                     |
| pair                     | string       | true     | pair                                     | such as: “BTC-USDT” |
| POSITIONS_START          | object array | true     | positions(just place when has positions) |                     |
| symbol                   | string       | true     | symbol                                   | "BTC","ETH"...      |
| contract_code            | string       | true     | contract code                            | "BTC-USDT" ...      |
| direction                | string       | true     | direction                                | "buy"/"sell"        |
| volume                   | decimal      | true     | volume before settlement(cont)           |                     |
| cost_open                | decimal      | true     | cost open                                |                     |
| cost_hold_pre            | decimal      | true     | cost hold before settlement              |                     |
| cost_hold                | decimal      | true     | cost hold after current settlement       |                     |
| settlement_profit_unreal | decimal      | true     | settlement profit unreal                 |                     |
| settlement_price         | decimal      | true     | settlement price/delivery price          |                     |
| settlement_type          | string       | true     | settlement type                          | settlement/delivery |
| pair                     | string       | true     | pair                                     | such as: “BTC-USDT” |
| POSITIONS_END            |              | false    |                                          |                     |
| CONTRACT_DETAIL_END      |              | true     |                                          |                     |
| SETTLEMENT_RECORDS_END   |              | false    |                                          |                     |
| total_page               | int          | true     | total page                               |                     |
| current_page             | int          | true     | current page                             |                     |
| total_size               | int          | true     | total size                               |                     |
| DATA_END                 |              | false    |                                          |                     |
| ts                       | long         | true     | timestamp                                |                     |

#### Request example

{

"margin_account":

"USDT"

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

2

"current_page":

1

"total_size":

13

"settlement_records":\[

0:{

"margin_mode":

"cross"

"margin_account":

"USDT"

"margin_balance_init":

5000

"margin_balance":

5007.6708

"settlement_profit_real":

7.6708

"settlement_time":

1611051602040

"clawback":

0

"funding_fee":

0

"offset_profitloss":

0

"fee":

0.6708

"fee_asset":

"USDT"

"contract_detail":\[

0:{

"symbol":

"BTC"

"contract_code":

"BTC-USDT"

"offset_profitloss":

0

"fee":

0.6708

"fee_asset":

"USDT"

"positions":\[

0:{

"symbol":

"BTC-USDT"

"contract_code":

"BTC-USDT"

"direction":

"buy"

"volume":

9

"cost_open":

27911.11111111111

"cost_hold_pre":

27911.11111111111

"cost_hold":

34361.25

"settlement_profit_unreal":

580.5125

"settlement_price":

34361.25

"settlement_type":

"settlement"

}

1:{

"symbol":

"BTC-USDT"

"contract_code":

"BTC-USDT"

"direction":

"sell"

"volume":

9

"cost_open":

27988.88888888889

"cost_hold_pre":

27988.88888888889

"cost_hold":

34361.25

"settlement_profit_unreal":

\-573.5125

"settlement_price":

34361.25

"settlement_type":

"settlement"

}

\]

}

\]

}

1:{

"margin_mode":

"cross"

"margin_account":

"USDT"

"margin_balance_init":

5000

"margin_balance":

5000

"settlement_profit_real":

0

"settlement_time":

1611047654316

"clawback":

0

"funding_fee":

0

"offset_profitloss":

0

"fee":

0

"fee_asset":

"USDT"

"contract_detail":\[\]

}

\]

}

"ts":

1611051729365

}
