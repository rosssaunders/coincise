# GET 【Coin-M Swaps】Query user’s settlement records

**Source:**
[【Coin-M Swaps】Query user’s settlement records](https://www.htx.com/en-us/opend/newApiPages/?id=5d5191f6-77b6-11ed-9966-0242ac110003)

**Category:** Downline Interface

## Authentication

Required (Private Endpoint)

### /swap-api/v1/swap_user_settlement_records (【Coin-M Swaps】Query user’s settlement records)

Request type: POST

Signature verification: Yes

Interface permission: Read

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter     | Data Type | Required | Description                                | Value Range                                                                             | Default Value |
| ------------- | --------- | -------- | ------------------------------------------ | --------------------------------------------------------------------------------------- | ------------- |
| contract_code | string    | true     | contract code                              |                                                                                         |               |
| start_time    | long      | false    | start time（Timestamp，Unit: Millisecond） | Value Range: \[(current time - 90 days), current time\] ，default current day - 90 days |               |
| end_time      | long      | false    | end time（Timestamp，Unit: Millisecond）   | Value Range: (start_time, current time\]，default current time                          |               |
| page_index    | int       | false    | Page                                       | 1st page by default without given instruction                                           |               |
| page_size     | int       | false    | page size                                  | Page 20 by default without given instruction, ，no more than 50                         |               |

Notes:  
The data is queried in reverse order by default; the newer the data, the closer
to the front.  
If the start time or the end time is not within the value range, the system will
report an error 1067 to indicate the parameter is invalid.  
Query users' settlement records with settlement start time behind the start_time
but before the end_time.  
This interface only supports users to query data for the last 90 days.

#### Response Parameter

| Parameter                | Data Type    | Required | Description                                                        | Value Range                                  |
| ------------------------ | ------------ | -------- | ------------------------------------------------------------------ | -------------------------------------------- |
| status                   | string       | true     | Request Processing Result                                          |                                              |
| DATA_START               | object       | true     |                                                                    |                                              |
| SETTLEMENT_RECORDS_START | object array | true     |                                                                    |                                              |
| symbol                   | string       | true     | Coin Code                                                          | "BTC","ETH"...                               |
| contract_code            | string       | true     | contract code                                                      | "BTC-USD" ...                                |
| margin_balance_init      | decimal      | true     | Initial account equity for this term                               |                                              |
| margin_balance           | decimal      | true     | Account equity after settlement for this term                      |                                              |
| settlement_profit_real   | decimal      | true     | Realized PnL for this term                                         |                                              |
| settlement_time          | long         | true     | Settlement time for this term; delivery time if at the delivery.   |                                              |
| clawback                 | decimal      | true     | Clawback for this term                                             |                                              |
| funding_fee              | decimal      | true     | Funding for this term                                              |                                              |
| offset_profitloss        | decimal      | true     | Current term PnL of positions closed                               |                                              |
| fee                      | decimal      | true     | Transaction fee for this term                                      |                                              |
| fee_asset                | string       | true     | Transaction Fee Coin                                               |                                              |
| POSITIONS_START          | object array | true     |                                                                    |                                              |
| symbol                   | string       | true     | Coin Code                                                          | "BTC","ETH"...                               |
| contract_code            | string       | true     | contract code                                                      | "BTC-USD" ...                                |
| direction                | string       | true     | Position Direction                                                 | \[buy : sell\]                               |
| volume                   | decimal      | true     | Position volume before the settlement of this term（volume）       |                                              |
| cost_open                | decimal      | true     | Open price                                                         |                                              |
| cost_hold_pre            | decimal      | true     | Average position price before the settlement of this term          |                                              |
| cost_hold                | decimal      | true     | Average position price after the settlement of this term           |                                              |
| settlement_profit_unreal | decimal      | true     | Unrealized PnL for this term                                       |                                              |
| settlement_price         | decimal      | true     | Settlement price for this term; delivery price if at the delivery. |                                              |
| settlement_type          | string       | true     | Settlement Type                                                    | settlement: settlement；delivery: delivery； |
| POSITIONS_END            |              | false    |                                                                    |                                              |
| SETTLEMENT_RECORDS_END   |              | false    |                                                                    |                                              |
| total_page               | int          | true     | Total Pages                                                        |                                              |
| current_page             | int          | true     | Current Page                                                       |                                              |
| total_size               | int          | true     | Total Size                                                         |                                              |
| DATA_END                 |              | false    |                                                                    |                                              |
| ts                       | long         | true     | Timestamp                                                          |                                              |

#### Request example

{

"contract":

"BTC-USD"

"type":

1

"start_time":

1660119810000

"end_time":

1660274746031

"direct":

"next"

"from_id":

1110

}

#### Response Example

##### Success Example

{

"status":

"ok"

"data":{

"total_page":

231

"current_page":

1

"total_size":

231

"settlement_records":\[

0:{

"symbol":

"THETA"

"contract_code":

"THETA-USD"

"margin_balance_init":

716.9105820184488

"margin_balance":

723.9229498590471

"settlement_profit_real":

7.012367840598277

"settlement_time":

1603843204027

"clawback":

0

"funding_fee":

0.15243320057344192

"offset_profitloss":

0

"fee":

0

"fee_asset":

"THETA"

"positions":\[

0:{

"symbol":

"THETA"

"contract_code":

"THETA-USD"

"direction":

"buy"

"volume":

20

"cost_open":

0.6048347107438017

"cost_hold_pre":

0.64473

"cost_hold":

0.65931

"settlement_profit_unreal":

6.859934640024835

"settlement_price":

0.65931

"settlement_type":

"settlement"

}

\]

}

\]

}

"ts":

1603870588781

}
