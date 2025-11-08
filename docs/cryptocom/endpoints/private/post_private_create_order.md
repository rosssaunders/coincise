# POST private/create-order

**Source:**
[private/create-order](https://exchange-docs.crypto.com/exchange/v1/rest-ws/index.html#private-create-order)

## Authentication

Required (Private Endpoint)

## private/create-order

> Request Sample

```
{
  "id": 1,
  "nonce" : 1610905028000,
  "method": "private/create-order",
  "params": {
    "instrument_name": "BTCUSD-PERP",
    "side": "SELL",
    "type": "LIMIT",
    "price": "50000.5",
    "quantity": "1",
    "client_oid": "c5f682ed-7108-4f1c-b755-972fcdca0f02",
    "exec_inst": ["POST_ONLY"],
    "time_in_force": "FILL_OR_KILL"
  }
}
```

> Response Sample

```
{
  "id": 1,
  "method": "private/create-order",
  "code": 0,
  "result": {
    "client_oid": "c5f682ed-7108-4f1c-b755-972fcdca0f02",
    "order_id": "18342311"
  }
}
```

Creates a new BUY or SELL Order on the Exchange.

This call is asynchronous, so the response is simply a confirmation of the
request.

The `user.order` subscription can be used to check when the order is
successfully created.

### Request Params

| Name                                                                                  | Type                        | Required | Description                                                                                         |
| ------------------------------------------------------------------------------------- | --------------------------- | -------- | --------------------------------------------------------------------------------------------------- |
| instrument_name                                                                       | string                      | Y        | e.g. BTCUSD-PERP                                                                                    |
| side                                                                                  | string                      | Y        | `BUY`, `SELL`                                                                                       |
| type                                                                                  | string                      | Y        | `LIMIT`, `MARKET`, `STOP_LOSS`, `STOP_LIMIT`, `TAKE_PROFIT`, `TAKE_PROFIT_LIMIT`                    |
| price                                                                                 | string                      | Y        | Price                                                                                               |
| quantity                                                                              | string                      | Y        | Order Quantity                                                                                      |
| notional                                                                              | [number](#request-format-2) | Depends  | For MARKET (BUY), STOP_LOSS (BUY), TAKE_PROFIT (BUY) orders only:                                   |
| Amount to spend                                                                       |
| client_oid                                                                            | string                      | N        | Client Order ID (Maximum 36 characters)                                                             |
| exec_inst                                                                             | array of string             | N        | `POST_ONLY`,`SMART_POST_ONLY`                                                                       |
| Remarks: `POST_ONLY` and `SMART_POST_ONLY` cannot be coexisted in exec_inst           |
| time_in_force                                                                         | string                      | N        | `GOOD_TILL_CANCEL`, `IMMEDIATE_OR_CANCEL`, `FILL_OR_KILL`                                           |
| When `exec_inst` contains `POST_ONLY`, `time_in_force` can only be `GOOD_TILL_CANCEL` |
| ref_price                                                                             | string                      | N\*      | Trigger price required for `STOP_LOSS`, `STOP_LIMIT`, `TAKE_PROFIT`, `TAKE_PROFIT_LIMIT` order type |
| ref_price_type                                                                        | string                      | N        | which price to use for ref_price: `MARK_PRICE` (default), `INDEX_PRICE`, `LAST_PRICE`               |
| spot_margin                                                                           | string                      | N        | `SPOT`: non-margin order, `MARGIN`: margin order                                                    |
| stp_scope                                                                             | string                      | N        | Optional Field                                                                                      |

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
\[SPOT\] Buy - Base/Quote token/USD/USDT/EUR  
\[SPOT\] Sell - Quote token/USD/USDT/EUR  
\[DERIV\] Buy/Sell - USD/USDT/EUR

Example:  
If a client would like to BUY CRO/BTC, the default fee token is CRO, valid
tokens are CRO/BTC/USD/USDT/EUR.  
If a client would like to SELL CRO/BTC, the default fee token is BTC, valid
tokens are BTC/USD/USDT/EUR.  
If a client would like to BUY/SELL BTCUSD-PERP, the default fee token is USD,
valid tokens are USD/USDT/EUR.

If a client has an insufficient balance in their preferred fee token, the system
will switch to the default fee token.  
If a client has a sufficient fee credit balance from campaigns, the system will
automatically switch to use that balance. No opt-in is required. |

### Applies To

REST Websocket (User API)

### REST Method

POST

### Response Attributes

| Name       | Type             | Description                                                                                                                                                                       |
| ---------- | ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| order_id   | string of number | Newly created order ID                                                                                                                                                            |
| client_oid | string           | If a Client Order ID was provided in the request, otherwise, will be the `nonce` in the request. As nonce can be the same among orders, it is recommened to specify `client_oid`. |
