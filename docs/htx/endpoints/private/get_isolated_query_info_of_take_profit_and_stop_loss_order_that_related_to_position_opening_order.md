# GET [Isolated]Query Info Of Take-profit and Stop-loss Order That Related To Position Opening Order

**Source:**
[[Isolated]Query Info Of Take-profit and Stop-loss Order That Related To Position Opening Order](https://www.htx.com/en-us/opend/newApiPages/?id=8cb884f1-77b5-11ed-9966-0242ac110003)

**Category:** Swap Strategy Order Interface

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v1/swap_relation_tpsl_order (\[Isolated\]Query Info Of Take-profit and Stop-loss Order That Related To Position Opening Order)

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

| Parameter     | Data Type | Required | Description   | Value Range    | Default Value |
| ------------- | --------- | -------- | ------------- | -------------- | ------------- |
| contract_code | string    | true     | contract code | "BTC-USDT" ... |               |
| order_id      | long      | true     | order id      |                |               |

#### Response Parameter

| Parameter              | Data Type    | Required | Description                                                                                                                                                                  | Value Range                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| ---------------------- | ------------ | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| status                 | string       | true     | status                                                                                                                                                                       | "ok", "error"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| DATA_START             | object       | true     |                                                                                                                                                                              | dictionary                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| symbol                 | string       | true     | symbol                                                                                                                                                                       |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| contract_code          | string       | true     | contract code                                                                                                                                                                | "BTC180914" ...                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
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

"order_id":

3456678123

}

#### Response Example

##### Success Example

{

"status":

"ok"

"data":{

"symbol":

"BTC"

"contract_code":

"BTC-USDT"

"margin_mode":

"isolated"

"margin_account":

"BTC-USDT"

"volume":

1

"price":

29999

"order_price_type":

"opponent"

"direction":

"buy"

"offset":

"open"

"lever_rate":

75

"order_id":

795947785812557800

"order_id_str":

"795947785812557824"

"client_order_id":

NULL

"created_at":

1609810340126

"trade_volume":

1

"trade_turnover":

29.999

"fee":

\-0.01619946

"trade_avg_price":

29999

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

795947785820946400

"order_id_str":

"795947785820946432"

"trigger_type":

"ge"

"trigger_price":

31000

"order_price":

0

"created_at":

1609810340134

"order_price_type":

"optimal_5"

"relation_tpsl_order_id":

"795947785820946433"

"status":

1

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

795947785820946400

"order_id_str":

"795947785820946433"

"trigger_type":

"le"

"trigger_price":

29100

"order_price":

0

"created_at":

1609810340134

"order_price_type":

"optimal_5"

"relation_tpsl_order_id":

"795947785820946432"

"status":

1

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

1609810352828

}
