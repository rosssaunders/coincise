# GET Query Info Of Take-profit and Stop-loss Order That Related To Position Opening Order

**Source:**
[Query Info Of Take-profit and Stop-loss Order That Related To Position Opening Order](https://www.htx.com/en-us/opend/newApiPages/?id=5d51bac1-77b6-11ed-9966-0242ac110003)

**Category:** Swap Strategy Order Interface

## Authentication

Required (Private Endpoint)

### /swap-api/v1/swap_relation_tpsl_order (Query Info Of Take-profit and Stop-loss Order That Related To Position Opening Order)

Request type: POST

Signature verification: Yes

Interface permission: Read

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter     | Data Type | Required | Description   | Value Range   | Default Value |
| ------------- | --------- | -------- | ------------- | ------------- | ------------- |
| contract_code | string    | true     | contract code | "BTC-USD" ... |               |
| order_id      | long      | true     | open order id |               |               |

#### Response Parameter

| Parameter              | Data Type    | Required | Description                                                                                                                                                                  | Value Range                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| ---------------------- | ------------ | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| status                 | string       | true     | status                                                                                                                                                                       | "ok", "error"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| DATA_START             | object       | true     |                                                                                                                                                                              | dictionary                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| symbol                 | string       | true     | symbol                                                                                                                                                                       |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| contract_code          | string       | true     | contract code                                                                                                                                                                | "BTC-USD" ...                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| volume                 | decimal      | true     | Numbers of orders (volume)                                                                                                                                                   |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| price                  | decimal      | true     | price                                                                                                                                                                        |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| order_price_type       | string       | true     | order price type                                                                                                                                                             | "limit":Limit,"opponent":opponent,"post_only":Post-Only Order, No order limit but position limit for post-only orders.，"lightning":lightning, "optimal_5":optimal 5，"optimal_10":optimal 10，"optimal_20":optimal 20，"fok":FOK Order，"ioc":IOC Order, "opponent_ioc": opponent ioc，"lightning_ioc": lightning ioc，"optimal_5_ioc": optimal_5 ioc，"optimal_10_ioc": optimal_10 ioc，"optimal_20_ioc": optimal_20 ioc，"opponent_fok": opponent fok，"lightning_fok": lightning fok，"optimal_5_fok": optimal_5 fok，"optimal_10_fok": optimal_10 fok，"optimal_20_fok": optimal_20 fok |
| direction              | string       | true     | direction                                                                                                                                                                    | "buy","sell"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| offset                 | string       | true     | offset                                                                                                                                                                       | "open", "close"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| lever_rate             | int          | true     | lever rate                                                                                                                                                                   |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| order_id               | long         | true     | order id                                                                                                                                                                     |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| order_id_str           | string       | true     | order id in string                                                                                                                                                           |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| client_order_id        | long         | true     | client order id                                                                                                                                                              |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| created_at             | long         | true     | created at                                                                                                                                                                   |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| trade_volume           | decimal      | true     | trade volume                                                                                                                                                                 |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| trade_turnover         | decimal      | true     | trade turnover                                                                                                                                                               |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| fee                    | decimal      | true     | fee                                                                                                                                                                          |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| trade_avg_price        | decimal      | true     | trade avg price                                                                                                                                                              |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| margin_frozen          | decimal      | true     | margin frozen                                                                                                                                                                |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| profit                 | decimal      | true     | profit when close position (calculated with the average price of position, exclude profit in history settlement.)                                                            |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| status                 | int          | true     | status                                                                                                                                                                       | 1\. Ready to submit the orders; 2. Ready to submit the orders; 3. Have sumbmitted the orders; 4. Orders partially matched; 5. Orders cancelled with partially matched; 6. Orders fully matched; 7. Orders cancelled; 11. Orders cancelling                                                                                                                                                                                                                                                                                                                                                   |
| order_type             | int          | true     | order type                                                                                                                                                                   | 1\. Quotation; 2. Cancelled order; 3. Forced liquidation; 4. Delivery Order                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| order_source           | string       | true     | order source                                                                                                                                                                 | system. web. api. m. risk. settlement. ios. android. windows. mac. trigger）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| fee_asset              | string       | true     | fee asset                                                                                                                                                                    | （"BTC","ETH"...）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| canceled_at            | long         | true     | canceled at                                                                                                                                                                  |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| TPSL_ORDER_INFO_START  | object array | true     | related take-profit and stop loss order info                                                                                                                                 |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| volume                 | decimal      | true     | Numbers of orders (volume)                                                                                                                                                   |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| tpsl_order_type        | string       | true     | Order type(take-profit order/stop-loss order)                                                                                                                                | “tp”:take-profit order；"sl"stop-loss order                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| direction              | string       | true     | direction                                                                                                                                                                    | "buy", "sell"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| order_id               | long         | true     | order id(take-profit order/stop-loss order)                                                                                                                                  |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| order_id_str           | string       | true     | order id in string(take-profit order/stop-loss order)                                                                                                                        |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| trigger_type           | string       | true     | trigger type: ge, le                                                                                                                                                         |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| trigger_price          | decimal      | true     | trigger price                                                                                                                                                                |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| price_protect          | booleanint   | false    | price protection, default is false. This parameter is only required when setting tp/sl                                                                                       | true or false                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| created_at             | long         | true     | created time                                                                                                                                                                 |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| order_price            | decimal      | true     | order price                                                                                                                                                                  |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| order_price_type       | string       | true     | order price type                                                                                                                                                             | limit, optimal_5, optimal_10, optimal_20                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| status                 | int          | true     | status                                                                                                                                                                       | 1.Not Activated, 2.Ready to submit the orders, 3.Submitting the orders, 4.Submit the orders success, 5.Submit the orders failed, 6.Orders cancelled, 8.Cancelled order not found, 9.Orders cancelling, 10.Failed, 11.Expired. 12. Not Activated-Expired                                                                                                                                                                                                                                                                                                                                      |
| relation_tpsl_order_id | string       | true     | related take-profit and stop loss order id（The field will have a value when users set take-profit and stop loss order stimulatenously, otherwise, the value will be "-1".） |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| canceled_at            | long         | true     | canceled time                                                                                                                                                                |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| fail_code              | int          | true     | fail code when triggered                                                                                                                                                     |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| fail_reason            | string       | true     | fail reason when triggered                                                                                                                                                   |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| triggered_price        | decimal      | true     | triggered price                                                                                                                                                              |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| relation_order_id      | string       | true     | Relation order ID is the string related to the limit orders， The value is -1 before the trigger orders executed.                                                            |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| TPSL_ORDER_INFO_END    |              | false    |                                                                                                                                                                              |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| DATA_END               |              | false    |                                                                                                                                                                              |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| ts                     | long         | true     | Time of Respond Generation，Unit: Millisecond                                                                                                                                |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |

#### Request example

`curl "https://api.hbdm.com/swap-api/v1/swap_risk_info?contract_code=BTC-USD"`

#### Response Example

##### Success Example

{

"status":

"ok"

"data":{

"symbol":

"LTC"

"contract_code":

"LTC-USD"

"volume":

1

"price":

135

"order_price_type":

"opponent"

"direction":

"sell"

"offset":

"open"

"lever_rate":

5

"order_id":

796041478786072600

"order_id_str":

"796041478786072576"

"client_order_id":

NULL

"created_at":

1609832678273

"trade_volume":

1

"trade_turnover":

10

"fee":

\-0.000022222222222222

"trade_avg_price":

135

"margin_frozen":

0

"profit":

0

"status":

6

"order_type":

NULL

"order_source":

"api"

"fee_asset":

"LTC"

"canceled_at":

0

"tpsl_order_info":\[

0:{

"volume":

1

"direction":

"buy"

"tpsl_order_type":

"tp"

"order_id":

796041478790266900

"order_id_str":

"796041478790266880"

"trigger_type":

"le"

"trigger_price":

133

"order_price":

0

"created_at":

1609832678279

"order_price_type":

"optimal_5"

"relation_tpsl_order_id":

"796041478790266881"

"status":

2

"canceled_at":

0

"fail_code":

NULL

"fail_reason":

NULL

"triggered_price":

NULL

"relation_order_id":

"-1"

}

1:{

"volume":

1

"direction":

"buy"

"tpsl_order_type":

"sl"

"order_id":

796041478790266900

"order_id_str":

"796041478790266881"

"trigger_type":

"ge"

"trigger_price":

138

"order_price":

0

"created_at":

1609832678279

"order_price_type":

"optimal_5"

"relation_tpsl_order_id":

"796041478790266880"

"status":

2

"canceled_at":

0

"fail_code":

NULL

"fail_reason":

NULL

"triggered_price":

NULL

"relation_order_id":

"-1"

}

\]

}

"ts":

1609832687267

}
