# GET [Cross]Query Info Of Take-profit and Stop-loss Order That Related To Position Opening Order

**Source:**
[[Cross]Query Info Of Take-profit and Stop-loss Order That Related To Position Opening Order](https://www.htx.com/en-us/opend/newApiPages/?id=8cb8864d-77b5-11ed-9966-0242ac110003)

**Category:** Swap Strategy Order Interface

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v1/swap_cross_relation_tpsl_order (\[Cross\]Query Info Of Take-profit and Stop-loss Order That Related To Position Opening Order)

Request type: POST

Signature verification: Yes

Interface permission: Read

Rate Limit: Generally, the private interface rate limit of API key is at most
144 times every 3 seconds for each UID (Trade Interface: at most 72 times every
3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is
shared by all the altcoins contracts delivered by different date).

Interface description: This interface only supports cross margin mode. The
request parameter "contract_code" supports the contract code of futures, in that
the format is BTC-USDT-210625. one of pair and contract_code must be filled
in(if both of them not filled in, will get 1014 error code); and both filled in,
the contract_code is the preferred.

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter     | Data Type | Required | Description   | Value Range                                         | Default Value |
| ------------- | --------- | -------- | ------------- | --------------------------------------------------- | ------------- |
| contract_code | string    | false    | contract code | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |               |
| pair          | string    | false    | pair          | BTC-USDT                                            |               |
| order_id      | long      | true     | open order id |                                                     |               |

#### Response Parameter

| Parameter              | Data Type    | Required | Description                                                                                                                                                                  | Value Range                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| ---------------------- | ------------ | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| status                 | string       | true     | status                                                                                                                                                                       | "ok", "error"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| DATA_START             | object       | true     |                                                                                                                                                                              | dictionary                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| symbol                 | string       | true     | symbol                                                                                                                                                                       |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| contract_code          | string       | true     | contract code                                                                                                                                                                | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ...                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| margin_mode            | string       | true     | margin mode                                                                                                                                                                  | cross, isolated                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| margin_account         | string       | true     | margin account                                                                                                                                                               | such as “USDT”，“BTC-USDT”                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| volume                 | decimal      | true     | Numbers of orders (volume)                                                                                                                                                   |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| price                  | decimal      | true     | price                                                                                                                                                                        |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| order_price_type       | string       | true     | order price type                                                                                                                                                             | "market": Market Order，"limit”: Limit Order "opponent":BBO "post_only": Post-Only Order, No order limit but position limit for post-only orders.,optimal_5： Optimal , optimal_10： Optimal 10, optimal_20：Optimal 20，ioc: IOC Order,，fok：FOK Order, "opponent_ioc"：IOC order using the BBO price，"optimal_5_ioc"：optimal_5 IOC，"optimal_10_ioc"：optimal_10 IOC，"optimal_20_ioc"：optimal_20 IOC, "opponent_fok"：FOK order using the BBO price，"optimal_5_fok"：optimal_5 FOK，"optimal_10_fok"：optimal_10 FOK，"optimal_20_fok"：optimal_20 FOK |
| direction              | string       | true     | direction                                                                                                                                                                    | "buy","sell"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| offset                 | string       | true     | offset                                                                                                                                                                       | "open", "close", "both"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| lever_rate             | int          | true     | lever rate                                                                                                                                                                   |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| order_id               | long         | true     | order id                                                                                                                                                                     |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| order_id_str           | string       | true     | order id in string                                                                                                                                                           |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| client_order_id        | long         | true     | client order id                                                                                                                                                              |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| created_at             | long         | true     | created at                                                                                                                                                                   |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| trade_volume           | decimal      | true     | trade volume                                                                                                                                                                 |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| trade_turnover         | decimal      | true     | trade turnover                                                                                                                                                               |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| fee                    | decimal      | true     | fee                                                                                                                                                                          |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| trade_avg_price        | decimal      | true     | trade avg price                                                                                                                                                              |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| margin_frozen          | decimal      | true     | margin frozen                                                                                                                                                                |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| profit                 | decimal      | true     | profit when close position (calculated with the average price of position, exclude profit in history settlement.)                                                            |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| status                 | int          | true     | status                                                                                                                                                                       | 1\. Ready to submit the orders; 2. Ready to submit the orders; 3. Have sumbmitted the orders; 4. Orders partially matched; 5. Orders cancelled with partially matched; 6. Orders fully matched; 7. Orders cancelled; 11. Orders cancelling                                                                                                                                                                                                                                                                                                                     |
| order_type             | int          | true     | order type                                                                                                                                                                   | 1\. Quotation; 2. Cancelled order; 3. Forced liquidation; 4. Delivery Order                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| order_source           | string       | true     | order source                                                                                                                                                                 | system. web. api. m. risk. settlement. ios. android. windows. mac. trigger                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| fee_asset              | string       | true     | fee asset                                                                                                                                                                    | （"BTC","ETH"...）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| canceled_at            | long         | true     | canceled at                                                                                                                                                                  |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| contract_type          | string       | true     | contract type                                                                                                                                                                | swap, this_week, next_week, quarter, next_quarter                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| pair                   | string       | true     | pair                                                                                                                                                                         | such as: “BTC-USDT”                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| business_type          | string       | true     | business type                                                                                                                                                                | futures, swap                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| TPSL_ORDER_INFO_START  | object array | true     | related take-profit and stop loss order info                                                                                                                                 |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| volume                 | decimal      | true     | Numbers of orders (volume)                                                                                                                                                   |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| tpsl_order_type        | string       | true     | Order type(take-profit order/stop-loss order)                                                                                                                                | “tp”:take-profit order；"sl"stop-loss order                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| direction              | string       | true     | direction                                                                                                                                                                    | "buy", "sell"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| order_id               | long         | true     | order id                                                                                                                                                                     |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| order_id_str           | string       | true     | order id in string                                                                                                                                                           |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| trigger_type           | string       | true     | trigger type: ge, le                                                                                                                                                         |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| trigger_price          | decimal      | true     | trigger price                                                                                                                                                                |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| price_protect          | boolean      | false    | price protection, default is false. This parameter is only required when setting tp/sl                                                                                       | true or false                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| created_at             | long         | true     | created time                                                                                                                                                                 |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| order_price            | decimal      | true     | order price                                                                                                                                                                  |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| status                 | int          | true     | status                                                                                                                                                                       | 1.Not Activated, 2.Ready to submit the orders, 3.Submitting the orders, 4.Submit the orders success, 5.Submit the orders failed, 6.Orders cancelled, 8.Cancelled order not found, 9.Orders cancelling, 10.Failed, 11.Expired. 12. Not Activated-Expired                                                                                                                                                                                                                                                                                                        |
| relation_tpsl_order_id | string       | true     | related take-profit and stop loss order id（The field will have a value when users set take-profit and stop loss order stimulatenously, otherwise, the value will be "-1".） |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| canceled_at            | long         | true     | canceled time                                                                                                                                                                |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| fail_code              | int          | true     | fail code when triggered                                                                                                                                                     |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| fail_reason            | string       | true     | fail reason when triggered                                                                                                                                                   |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| triggered_price        | decimal      | true     | triggered price                                                                                                                                                              |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| relation_order_id      | string       | true     | Relation order ID is the string related to the limit orders， The value is -1 before the trigger orders executed.                                                            |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| TPSL_ORDER_INFO_END    |              | false    |                                                                                                                                                                              |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| DATA_END               |              | false    |                                                                                                                                                                              |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| ts                     | long         | true     | Time of Respond Generation，Unit: Millisecond                                                                                                                                |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |

#### Request example

{

"contract_code":

"BTC-USDT"

"pair":

"BTC-USDT"

"order_id":

3456678123

}

#### Response Example

##### Success Example

{

"status":

"ok"

"data":{

"contract_type":

"this_week"

"business_type":

"futures"

"pair":

"BTC-USDT"

"symbol":

"BTC"

"contract_code":

"BTC-USDT-211210"

"margin_mode":

"cross"

"margin_account":

"USDT"

"volume":

1

"price":

48592.2

"order_price_type":

"opponent"

"direction":

"buy"

"offset":

"open"

"lever_rate":

5

"order_id":

918819004716982300

"order_id_str":

"918819004716982272"

"client_order_id":

NULL

"created_at":

1639105121550

"trade_volume":

1

"trade_turnover":

48.5922

"fee":

\-0.0242961

"trade_avg_price":

48592.2

"margin_frozen":

0

"profit":

0

"status":

6

"order_type":

1

"order_source":

"api"

"fee_asset":

"USDT"

"canceled_at":

0

"tpsl_order_info":\[

0:{

"volume":

1

"direction":

"sell"

"tpsl_order_type":

"tp"

"order_id":

918819004746342400

"order_id_str":

"918819004746342400"

"trigger_type":

"ge"

"trigger_price":

50000

"order_price":

0

"created_at":

1639105121563

"order_price_type":

"optimal_5"

"relation_tpsl_order_id":

"918819004750536704"

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

"sell"

"tpsl_order_type":

"sl"

"order_id":

918819004750536700

"order_id_str":

"918819004750536704"

"trigger_type":

"le"

"trigger_price":

40000

"order_price":

0

"created_at":

1639105121564

"order_price_type":

"optimal_5"

"relation_tpsl_order_id":

"918819004746342400"

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

1639105149621

}
