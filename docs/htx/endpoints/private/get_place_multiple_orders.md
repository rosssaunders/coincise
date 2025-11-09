# GET Place Multiple Orders

**Source:**
[Place Multiple Orders](https://www.htx.com/en-us/opend/newApiPages/?id=8cb89359-77b5-11ed-9966-1958935dae1)

**Category:** Orders

## Authentication

Required (Private Endpoint)

### /v5/trade/batch_orders (Place Multiple Orders)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: Generally, the private interface rate limit of API key is at most
144 times every 3 seconds for each UID (Trade Interface: at most 72 times every
3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is
shared by all the altcoins contracts delivered by different date).

Interface description: Place bulk orders in futures trading

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online (preferred by aws customers) | https://api.hbdm.vn  |
| Online                              | https://api.hbdm.com |

#### Request Parameter

| Parameter             | Data Type | Required | Description                                                                                                                                                                                     | Value Range                                                                                                 | Default Value            |
| --------------------- | --------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- | ------------------------ |
| contract_code         | String    | true     | Symbol                                                                                                                                                                                          |                                                                                                             |                          |
| margin_mode           | String    | true     | Margin mode; cross: Cross margin                                                                                                                                                                |                                                                                                             |                          |
| position_side         | String    | false    | Position side                                                                                                                                                                                   | long: going long; short: going short; both: One-way mode. You must input long or short and both is default. |                          |
| side                  | String    | true     | Order side                                                                                                                                                                                      | buy; sell                                                                                                   |                          |
| type                  | String    | true     | Order type; enumeration                                                                                                                                                                         | "market": market order; "limit": limit order; "post_only": post-only order                                  |                          |
| price_match           | String    | false    | BBO and price are mutually exclusive                                                                                                                                                            | opponent: counterparty price; "optimal_5": Best 5 BBO; "optimal_10": Best 10 BBO; "optimal_20": Best 20 BBO |                          |
| client_order_id       | String    | false    | Order ID you entered                                                                                                                                                                            | Clients fill and maintain themselves. the value must be in \[1, 9223372036854775807\]                       |                          |
| price                 | String    | false    | Price, applicable for limit orders only. No price input is required for market orders.                                                                                                          |                                                                                                             |                          |
| volume                | String    | true     | Order size, specifically in Cont                                                                                                                                                                |                                                                                                             |                          |
| reduce_only           | Boolean   | false    | Reduce only: 0 is false; 1 is true                                                                                                                                                              |                                                                                                             |                          |
| time_in_force         | String    | false    | Enumerate FOK, IOC, and GTC. It is an optional field with GTC by default.                                                                                                                       |                                                                                                             |                          |
| tp_trigger_price      | String    | false    | Trigger price of your take profit order                                                                                                                                                         |                                                                                                             |                          |
| tp_order_price        | String    | false    | Price of your take profit order. (There is no need to input a price when using BBO.)                                                                                                            |                                                                                                             |                          |
| tp_type               | String    | false    | Type of your take profit order. "market" is default with no input. "market": market order; "limit": limit order. "optimal_5": Best 5 BBO; "optimal_10": Best 10 BBO; "optimal_20": Best 20 BBO. |                                                                                                             |                          |
| tp_trigger_price_type | String    | false    | Trigger price type of your take profit order. The last price is default.                                                                                                                        | "last": last price; "market": mark price                                                                    |                          |
| sl_trigger_price      | String    | false    | SL Trigger Price                                                                                                                                                                                |                                                                                                             |                          |
| sl_order_price        | String    | false    | Price of your stop loss order. (There is no need to input a price when using BBO.)                                                                                                              |                                                                                                             |                          |
| sl_type               | String    | false    | Type of your stop loss order. "market" is default with no input. "market": market order; "limit": limit order. "optimal_5": Best 5 BBO; "optimal_10": Best 10 BBO; "optimal_20": Best 20 BBO.   |                                                                                                             |                          |
| sl_trigger_price_type | String    | false    | Trigger price type of your stop loss order. The last price is default.                                                                                                                          | "last": last price; "market": mark price                                                                    |                          |
| price_protect         | boolean   | false    | Price protection. "false" is default. The parameter is needed when you set TP/SL                                                                                                                | false or true                                                                                               |                          |
| self_match_prevent    | String    | false    | Self-trading prevention                                                                                                                                                                         | cancel_taker: Cancel a taker order cancel_maker: Cancel a maker order cancel_both: Cancel all orders        | cancel_taker by default. |

#### Response Parameter

| Parameter       | Data Type | Required | Description                                                                                        | Value Range |
| --------------- | --------- | -------- | -------------------------------------------------------------------------------------------------- | ----------- |
| order_id        | String    | true     | Order ID                                                                                           |             |
| client_order_id | String    | true     | The order ID you entered when placing an order. The ID will not be returned if it is not provided. |             |

#### Request example

\[

0:{

"time_in_force":

"gtc"

"price_protect":

"true"

"contract_code":

"BTC-USDT-241115"

"margin_mode":

"cross"

"position_side":

"long"

"price":

5000

"volume":

1

"side":

"buy"

"type":

"limit"

}

1:{

"time_in_force":

"gtc"

"price_protect":

"true"

"contract_code":

"BTC-USDT-241115"

"margin_mode":

"cross"

"position_side":

"long"

"price":

5000

"volume":

1

"side":

"buy"

"type":

"limit"

}

2:{

"time_in_force":

"gtc"

"price_protect":

"true"

"contract_code":

"BTC-USDT-241115"

"margin_mode":

"cross"

"position_side":

"long"

"price":

5000

"volume":

1

"side":

"buy"

"type":

"limit"

}

3:{

"time_in_force":

"gtc"

"price_protect":

"true"

"contract_code":

"BTC-USDT-241115"

"margin_mode":

"cross"

"position_side":

"long"

"price":

5000

"volume":

1

"side":

"buy"

"type":

"limit"

}

4:{

"time_in_force":

"gtc"

"price_protect":

"true"

"contract_code":

"BTC-USDT-241115"

"margin_mode":

"cross"

"position_side":

"long"

"price":

5000

"volume":

1

"side":

"buy"

"type":

"limit"

}

5:{

"time_in_force":

"gtc"

"price_protect":

"true"

"contract_code":

"BTC-USDT-241115"

"margin_mode":

"cross"

"position_side":

"long"

"price":

5000

"volume":

1

"side":

"buy"

"type":

"limit"

}

6:{

"time_in_force":

"gtc"

"price_protect":

"true"

"contract_code":

"BTC-USDT-241115"

"margin_mode":

"cross"

"position_side":

"long"

"price":

5000

"volume":

1

"side":

"buy"

"type":

"limit"

}

7:{

"time_in_force":

"gtc"

"price_protect":

"true"

"contract_code":

"BTC-USDT-241115"

"margin_mode":

"cross"

"position_side":

"long"

"price":

5000

"volume":

1

"side":

"buy"

"type":

"limit"

}

8:{

"time_in_force":

"gtc"

"price_protect":

"true"

"contract_code":

"BTC-USDT-241115"

"margin_mode":

"cross"

"position_side":

"long"

"price":

5000

"volume":

1

"side":

"buy"

"type":

"limit"

}

9:{

"time_in_force":

"gtc"

"price_protect":

"true"

"contract_code":

"BTC-USDT-241115"

"margin_mode":

"cross"

"position_side":

"long"

"price":

5000

"volume":

1

"side":

"buy"

"type":

"limit"

}

10:{

"time_in_force":

"gtc"

"price_protect":

"true"

"contract_code":

"BTC-USDT-241115"

"margin_mode":

"cross"

"position_side":

"long"

"price":

5000

"volume":

1

"side":

"buy"

"type":

"limit"

}

11:{

"time_in_force":

"gtc"

"price_protect":

"true"

"contract_code":

"BTC-USDT-241115"

"margin_mode":

"cross"

"position_side":

"long"

"price":

5000

"volume":

1

"side":

"buy"

"type":

"limit"

}

12:{

"time_in_force":

"gtc"

"price_protect":

"true"

"contract_code":

"BTC-USDT-241115"

"margin_mode":

"cross"

"position_side":

"long"

"price":

5000

"volume":

1

"side":

"buy"

"type":

"limit"

}

13:{

"time_in_force":

"gtc"

"price_protect":

"true"

"contract_code":

"BTC-USDT-241115"

"margin_mode":

"cross"

"position_side":

"long"

"price":

5000

"volume":

1

"side":

"buy"

"type":

"limit"

}

14:{

"time_in_force":

"gtc"

"price_protect":

"true"

"contract_code":

"BTC-USDT-241115"

"margin_mode":

"cross"

"position_side":

"long"

"price":

5000

"volume":

1

"side":

"buy"

"type":

"limit"

}

15:{

"time_in_force":

"gtc"

"price_protect":

"true"

"contract_code":

"BTC-USDT-241115"

"margin_mode":

"cross"

"position_side":

"long"

"price":

5000

"volume":

1

"side":

"buy"

"type":

"limit"

}

16:{

"time_in_force":

"gtc"

"price_protect":

"true"

"contract_code":

"BTC-USDT-241115"

"margin_mode":

"cross"

"position_side":

"long"

"price":

5000

"volume":

1

"side":

"buy"

"type":

"limit"

}

17:{

"time_in_force":

"gtc"

"price_protect":

"true"

"contract_code":

"BTC-USDT-241115"

"margin_mode":

"cross"

"position_side":

"long"

"price":

5000

"volume":

1

"side":

"buy"

"type":

"limit"

}

\]

#### Response Example

##### Success Example

{

"code":

200

"data":\[

0:{

"client_order_id":

"1329854623927160832"

"code":

200

"message":

"成功"

"order_id":

"1329854623927160832"

}

1:{

"client_order_id":

"1329854624082350080"

"code":

200

"message":

"成功"

"order_id":

"1329854624082350080"

}

2:{

"client_order_id":

"1329854624141070336"

"code":

200

"message":

"成功"

"order_id":

"1329854624141070336"

}

3:{

"client_order_id":

"1329854624195596288"

"code":

200

"message":

"成功"

"order_id":

"1329854624195596288"

}

4:{

"client_order_id":

"1329854624258510848"

"code":

200

"message":

"成功"

"order_id":

"1329854624258510848"

}

5:{

"client_order_id":

"1329854624317231104"

"code":

200

"message":

"成功"

"order_id":

"1329854624317231104"

}

6:{

"client_order_id":

"1329854624380145664"

"code":

200

"message":

"成功"

"order_id":

"1329854624380145664"

}

7:{

"client_order_id":

"1329854624434671616"

"code":

200

"message":

"成功"

"order_id":

"1329854624434671616"

}

8:{

"client_order_id":

"1329854624497586176"

"code":

200

"message":

"成功"

"order_id":

"1329854624497586176"

}

9:{

"client_order_id":

"1329854624556306432"

"code":

200

"message":

"成功"

"order_id":

"1329854624556306432"

}

10:{

"client_order_id":

"1329854624615026688"

"code":

200

"message":

"成功"

"order_id":

"1329854624615026688"

}

11:{

"client_order_id":

"1329854624686329856"

"code":

200

"message":

"成功"

"order_id":

"1329854624686329856"

}

12:{

"client_order_id":

"1329854624753438720"

"code":

200

"message":

"成功"

"order_id":

"1329854624753438720"

}

13:{

"client_order_id":

"1329854624824741888"

"code":

200

"message":

"成功"

"order_id":

"1329854624824741888"

}

14:{

"client_order_id":

"1329854624896045056"

"code":

200

"message":

"成功"

"order_id":

"1329854624896045056"

}

15:{

"client_order_id":

"1329854624971542528"

"code":

200

"message":

"成功"

"order_id":

"1329854624971542528"

}

16:{

"client_order_id":

"1329854625038651392"

"code":

200

"message":

"成功"

"order_id":

"1329854625038651392"

}

17:{

"client_order_id":

"1329854625118343168"

"code":

200

"message":

"成功"

"order_id":

"1329854625118343168"

}

\]

"message":

"Success"

"ts":

1737103650151

}
