# GET Get Order Detail (KEYED)

**Source:**
[Get Order Detail (KEYED)](https://developer-pro.bitmart.com/en/futuresv2/)

**API Type:** Futures

## Authentication

Required (Private Endpoint)

## Get Order Detail (KEYED)

`Applicable for querying contract order detail`

#### Request URL

`GET https://api-cloud-v2.bitmart.com/contract/private/order`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

`curl -H 'X-BM-KEY:{{AccessKey}}' https://api-cloud-v2.bitmart.com/contract/private/order?symbol=BTCUSDT&order_id=220609666322019`

| Field    | Type   | Required? | Description                          |
| -------- | ------ | --------- | ------------------------------------ |
| symbol   | String | Yes       | Symbol of the contract(like BTCUSDT) |
| order_id | String | Yes       | Order ID                             |
| account  | String | No        | Trading account                      |

\-`futures`  
\-`copy_trading` |

#### Response Data

> Response

```json
{
  "code": 1000,
  "message": "Ok",
  "data": {
    "order_id": "220906179895578",
    "client_order_id": "BM123",
    "price": "1",
    "size": "1000",
    "symbol": "BTCUSDT",
    "state": 2,
    "side": 1,
    "type": "limit",
    "position_mode": "hedge_mode",
    "account": "futures",
    "leverage": "5",
    "open_type": "isolated",
    "deal_avg_price": "0",
    "deal_size": "1000",
    "create_time": 1662368173000,
    "update_time": 1662368173000
  },
  "trace": "638d5048-ad21-4a4b-9365-d0756fbfc7ba"
}
```

| Field           | Type   | Description                                                                      |
| --------------- | ------ | -------------------------------------------------------------------------------- |
| symbol          | String | Symbol of the contract                                                           |
| order_id        | String | Order ID                                                                         |
| client_order_id | String | Client-defined OrderId (If the field is not defined, a empty string is returned) |
| side            | Int    | Order side                                                                       |

hedge mode  
\-`1`\=buy_open_long  
\-`2`\=buy_close_short  
\-`3`\=sell_close_long  
\-`4`\=sell_open_short  
oneway mode  
\-`1`\=buy  
\-`2`\=buy(reduce only)  
\-`3`\=sell(reduce only)  
\-`4`\=sell | | type | String | Order type  
\-`limit`  
\- `market`  
\- `liquidate`  
\- `bankruptcy`  
\-`adl` | | position_mode | String | Position mode  
\-`hedge_mode`  
\-`one_way_mode` | | account | String | Trading account  
\-`futures`  
\-`copy_trading` | | leverage | String | Leverage order multipliers | |
open_type | String | Open type  
\-`cross`  
\-`isolated` | | deal_avg_price | String | Average deal price | | deal_size |
String | Deal amount | | price | String | Consignment price | | size | String |
Order amount | | state | Int | Order status  
\-`1`\=status_approval  
\-`2`\=status_check  
\-`4`\=status_finish | | activation_price | String | Activation price, returned
at trailing order | | callback_rate | String | Callback rate, returned at
trailing order | | activation_price_type | Int | Activation price type, returned
at trailing order  
\-`1`\=last_price  
\-`2`\=fair_price | | preset_take_profit_price_type | Int | Pre-set TP price
type  
\-`1`\=last_price  
\-`2`\=fair_price | | preset_stop_loss_price_type | Int | Pre-set SL price
type  
\-`1`\=last_price  
\-`2`\=fair_price | | preset_take_profit_price | String | Pre-set TP price | |
preset_stop_loss_price | String | Pre-set SL price | | create_time | Long |
Order created timestamp (ms) | | update_time | Long | Latest transaction
timestamp (ms) |
