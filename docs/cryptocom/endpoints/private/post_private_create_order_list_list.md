# POST private/create-order-list (LIST)

**Source:**
[private/create-order-list (LIST)](https://exchange-docs.crypto.com/exchange/v1/rest-ws/index.html#private-create-order-list "list")

## Authentication

Required (Private Endpoint)

## private/create-order-list (LIST)

> Request Sample

```
// Create List of Orders example
{
  "id": 6573,
  "method": "private/create-order-list",
  "api_key": "xxxxxxxxxxx",
  "params": {
    "contingency_type": "LIST",
    "order_list": [
      {
        "instrument_name": "CRO_USD",
        "side": "SELL",
        "type": "LIMIT",
        "quantity": "10",
        "price": "0.12",
        "client_oid": "api_leg1"
      },
      {
        "instrument_name": "CRO_USD",
        "side": "SELL",
        "type": "LIMIT",
        "quantity": "20",
        "price": "0.122",
        "client_oid": "api_leg2"
      }
    ]
  },
  "nonce": 1750385416548,
  "sig": "xxxxxxxx"
}
```

> Response Sample

```
// Create List of Orders - All ok
{
  "id": 6573,
  "method": "private/create-order-list",
  "code": 0,
  "result": [
    {
      "code": 0,
      "index": 0,
      "client_oid": "api_leg1",
      "order_id": "5755600460443882762"
    },
    {
      "code": 0,
      "index": 1,
      "client_oid": "api_leg2",
      "order_id": "5755600460443882763"
    }
  ]
}
```

```
// Create List of Orders - Some rejected
{
  "id": xxxxx,
  "method": "private/create-order-list",
  "code": 0,
  "result": [
    {
      "code": 306,
      "index": 0,
      "client_oid": "api_leg_111",
      "message": "INSUFFICIENT_AVAILABLE_BALANCE",
      "order_id": "xxxx"
    },
    {
      "code": 204,
      "index": 1,
      "client_oid": "api_leg_22",
      "message": "DUPLICATE_CLORDID",
      "order_id": "xxxx"
    }
  ]
}
```

Create a list of orders on the Exchange.

`contingency_type` must be `LIST`, for list of orders creation.

This call is asynchronous, so the response is simply a confirmation of the
request.

The `user.order` subscription can be used to check if the orders are
successfully created.

### Request Params

| Name             | Type            | Required | Description         |
| ---------------- | --------------- | -------- | ------------------- |
| contingency_type | string          | Y        | LIST                |
| order_list       | array of orders | Y        | `LIST`: 1-10 orders |

Content of each order in `order_list`

| Name                      | Type                        | Required | Description                                                          |
| ------------------------- | --------------------------- | -------- | -------------------------------------------------------------------- |
| instrument_name           | string                      | Y        | e.g., ETH_CRO, BTC_USDT                                              |
| side                      | string                      | Y        | BUY, SELL                                                            |
| type                      | string                      | Y        | LIMIT, MARKET, STOP_LOSS, STOP_LIMIT, TAKE_PROFIT, TAKE_PROFIT_LIMIT |
| price                     | number                      | Depends  | For LIMIT and STOP_LIMIT orders only:                                |
| Unit price                |
| quantity                  | number                      | Depends  | For LIMIT Orders, MARKET, STOP_LOSS, TAKE_PROFIT orders only:        |
| Order Quantity to be Sold |
| notional                  | [number](#request-format-2) | Depends  | For MARKET (BUY), STOP_LOSS (BUY), TAKE_PROFIT (BUY) orders only:    |
| Amount to spend           |
| client_oid                | string                      | N        | Optional Client order ID (Maximum 36 characters)                     |
| time_in_force             | string                      | N        | (Limit Orders Only)                                                  |

Options are:  
\- `GOOD_TILL_CANCEL` (Default if unspecified)  
\- `FILL_OR_KILL`  
\- `IMMEDIATE_OR_CANCEL` | | exec_inst | array | N | (Limit Orders Only)  
Options are:  
\- `POST_ONLY`  
\- Or leave empty  
\- `SMART_POST_ONLY`  
Remarks: `POST_ONLY`and `SMART_POST_ONLY` cannot be coexisted in exec_inst | |
trigger_price | number | N | Used with STOP_LOSS, STOP_LIMIT, TAKE_PROFIT, and
TAKE_PROFIT_LIMIT orders.  
Dictates when order will be triggered | | stp_scope | string | N | Optional
Field

Possible Values  
\- M: Matches Master or Sub a/c  
\- S: Matches Sub a/c only

Note: orderbook-specific settings takes higher precedence. | | stp_inst | string
| N\* | Mandatory if stp_scope is set.

Possible Values  
\- M: Cancel Maker  
\- T: Cancel Taker  
\- B: Cancel Both Maker and Taker | | stp_id | string of number | N\* | Optional
Field

Possible Value: 0 to 32767

Default Value  
\- If stp_scope & stp_inst are not specified, REJECT  
\- If stp_scope is specified, default value = 0.

Note: orderbook-specific settings takes higher precedence. | |
fee_instrument_name | string | N | Specify the preferred fee token.  
Valid Values:  
\[SPOT\] Buy - Base/Quote CCY/USD/USDT  
\[SPOT\] Sell - Quote CCY/USD/USDT  
\[DERIV\] Buy/Sell - USD/USDT

Example:  
If a client would like to BUY CRO/BTC, the default fee token is CRO, valid
currencies are CRO/BTC/USD/USDT.  
If a client would like to SELL CRO/BTC, the default fee token is BTC, valid
currencies are BTC/USD/USDT.  
If a client would like to BUY/SELL BTCUSD-PERP, the default fee token is USD,
valid currencies are USD/USDT.

If a client has an insufficient balance in their preferred fee token, the system
will switch to the default fee token. |

**Here are the mandatory parameters based on order `type`:**

| Type              | Side | Additional Mandatory Parameters          |
| ----------------- | ---- | ---------------------------------------- |
| LIMIT             | Both | quantity, price                          |
| MARKET            | BUY  | notional or quantity, mutually exclusive |
| MARKET            | SELL | quantity                                 |
| STOP_LIMIT        | Both | price, quantity, trigger_price           |
| TAKE_PROFIT_LIMIT | Both | price, quantity, trigger_price           |
| STOP_LOSS         | BUY  | notional, trigger_price                  |
| STOP_LOSS         | SELL | quantity, trigger_price                  |
| TAKE_PROFIT       | BUY  | notional, trigger_price                  |
| TAKE_PROFIT       | SELL | quantity, trigger_price                  |

**Contingency Type:**

| Type | Description             |
| ---- | ----------------------- |
| LIST | Create a list of orders |

**Helpful information:**

- `STOP_LIMIT` and `TAKE_PROFIT_LIMIT` will execute a LIMIT order when the
  trigger_price is reached.
- `STOP_LOSS` and `TAKE_PROFIT` will execute a MARKET order when the
  trigger_price is reached.

**To create trigger orders against market price:**

- `trigger_price` below market price: SELL `STOP_LOSS` and `STOP_LIMIT`, BUY
  `TAKE_PROFIT` and `TAKE_PROFIT_LIMIT`
- `trigger_price` above market price: BUY `STOP_LOSS` and `STOP_LIMIT`, SELL
  `TAKE_PROFIT` and `TAKE_PROFIT_LIMIT`

### Applies To

REST Websocket (User API)

### REST Method

POST

### Response Attributes

| Name       | Type   | Description                                                                          |
| ---------- | ------ | ------------------------------------------------------------------------------------ |
| code       | number | 0 if success                                                                         |
| index      | number | The index of corresponding order request (Start from 0)                              |
| client_oid | string | (Optional) if a Client order ID was provided in the request. (Maximum 36 characters) |
| message    | string | (Optional) For server or error messages                                              |
| order_id   | number | Newly created order ID                                                               |
