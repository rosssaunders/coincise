# GET Search Past Orders

**Source:**
[Search Past Orders](https://www.htx.com/en-us/opend/newApiPages/?id=7ec4e1c4-7773-11ed-9966-0242ac110003)

**Category:** Trading

## Authentication

Required (Private Endpoint)

### /v1/order/orders ( Search Past Orders)

Request type: GET

Signature verification: Yes

Interface permission: Read

Rate Limit: 50times/2s

Interface description: This endpoint returns orders based on a specific
searching criteria. The order created via API will no longer be queryable after
being cancelled for more than 2 hours. If the user does not fill in the
start-time and end-time any parameters, the server will return the historical
orders from near to far \[now, now - 48 hours\]. If the user fills in the
start-time but does not fill in the end-time parameter, the server will return
the historical order from near to far \[start-time + 48 hours, start-time\]. If
the user does not fill in the start-time but fills in the end-time parameter,
the server will return the historical order from near to far \[end-time,
end-time - 48 hours\]. If the user fills in both start-time and end-time
parameters, the server will return historical orders from near to far
\[end-time, start-time\]. The maximum range of each query is 48 hours, and the
last 180 days data can be queried continuously.

#### Request Address

| Environment                         | Address                   |
| ----------------------------------- | ------------------------- |
| Online                              | https://api.huobi.pro     |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter  | Data Type | Required | Description                                                                                                                                                                                                                         | Value Range                                                                  | Default Value |
| ---------- | --------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ------------- |
| symbol     | string    | true     | All supported trading symbols, e.g. btcusdt, bccbtc                                                                                                                                                                                 | The trading symbol                                                           | NA            |
| types      | string    | false    | buy-market, sell-market, buy-limit, sell-limit, buy-ioc, sell-ioc, buy-stop-limit, sell-stop-limit, buy-limit-fok, sell-limit-fok, buy-stop-limit-fok, sell-stop-limit-fok                                                          | One or more types of order to include in the search, use comma to separate.  | NA            |
| start-time | long      | false    | Value range \[((end-time) – 48h), (end-time)\], maximum query window size is 48 hours, query window shift should be within past 180 days, query window shift should be within past 2 hours for cancelled order (state = "canceled") | Search starts time, UTC time in millisecond                                  | \-48h         |
| end-time   | long      | false    | Value range \[(present-179d), present\], maximum query window size is 48 hours, query window shift should be within past 180 days, queriable range should be within past 2 hours for cancelled order (state = "canceled")           | Search ends time, UTC time in millisecond                                    | present       |
| states     | string    | true     | filled, partial-canceled, canceled                                                                                                                                                                                                  | One or more states of order to include in the search, use comma to separate. | NA            |
| from       | string    | false    | NA                                                                                                                                                                                                                                  | Search order id to begin with                                                | NA            |
| direct     | string    | false    | next, prev                                                                                                                                                                                                                          | Search direction when 'from' is used                                         | both          |
| size       | string    | false    | \[1-100\]                                                                                                                                                                                                                           | The number of orders to return                                               | 100           |

#### Response Parameter

| Parameter            | Data Type | Required | Description                                                                                                                                                                                                                                                                             | Value Range                                                                                                                                                                                                                                                                                                                                            |
| -------------------- | --------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| status               | string    | false    |                                                                                                                                                                                                                                                                                         |                                                                                                                                                                                                                                                                                                                                                        |
| DATA_START           | object    | false    |                                                                                                                                                                                                                                                                                         |                                                                                                                                                                                                                                                                                                                                                        |
| id                   | long      | false    | Order id                                                                                                                                                                                                                                                                                |                                                                                                                                                                                                                                                                                                                                                        |
| client-order-id      | string    | false    | User-generated order number                                                                                                                                                                                                                                                             |                                                                                                                                                                                                                                                                                                                                                        |
| account-id           | long      | false    | Account id                                                                                                                                                                                                                                                                              |                                                                                                                                                                                                                                                                                                                                                        |
| amount               | long      | false    | The amount of base currency in this order                                                                                                                                                                                                                                               |                                                                                                                                                                                                                                                                                                                                                        |
| symbol               | string    | false    | The trading symbol to trade, e.g. btcusdt, bccbtc                                                                                                                                                                                                                                       |                                                                                                                                                                                                                                                                                                                                                        |
| price                | string    | false    | The limit price of limit order                                                                                                                                                                                                                                                          |                                                                                                                                                                                                                                                                                                                                                        |
| created-at           | string    | false    | The timestamp in milliseconds when the order was created                                                                                                                                                                                                                                |                                                                                                                                                                                                                                                                                                                                                        |
| canceled-at          | long      | false    | The timestamp in milliseconds when the order was canceled, or 0 if not canceled                                                                                                                                                                                                         |                                                                                                                                                                                                                                                                                                                                                        |
| finished-at          | long      | false    | The timestamp in milliseconds when the order was finished, or 0 if not finished                                                                                                                                                                                                         |                                                                                                                                                                                                                                                                                                                                                        |
| type                 | string    | false    | All possible order type (refer to introduction in this section)                                                                                                                                                                                                                         | buy-market, sell-market, buy-limit, sell-limit, buy-ioc, sell-ioc, buy-stop-limit, sell-stop-limit, buy-limit-fok, sell-limit-fok, buy-stop-limit-fok, sell-stop-limit-fok                                                                                                                                                                             |
| field-amount         | string    | false    | The amount which has been filled                                                                                                                                                                                                                                                        |                                                                                                                                                                                                                                                                                                                                                        |
| field-cash-amount    | string    | false    | The filled total in quote currency                                                                                                                                                                                                                                                      |                                                                                                                                                                                                                                                                                                                                                        |
| field-fees           | string    | false    | Transaction fee (Accurate fees refer to matchresults endpoint)                                                                                                                                                                                                                          |                                                                                                                                                                                                                                                                                                                                                        |
| source               | string    | false    | All possible order source (refer to introduction in this section)                                                                                                                                                                                                                       | "sys","web","api","app","fl-sys","fl-mgt","spot-stop","margin-stop","super-margin-stop","grid-trading-sys"                                                                                                                                                                                                                                             |
| state                | string    | false    | filled, partial-canceled, canceled                                                                                                                                                                                                                                                      | created：Created，submitted : The order is waiting for transaction，partial-filled : Partial deal，filled : Closed the deal，partial-canceled :Partial cancellation of transaction，canceling :Undo in process，canceled : Have been withdrawn                                                                                                         |
| stop-price           | string    | false    | trigger price of stop limit order                                                                                                                                                                                                                                                       |                                                                                                                                                                                                                                                                                                                                                        |
| operator             | string    | false    | operation character of stop price                                                                                                                                                                                                                                                       |                                                                                                                                                                                                                                                                                                                                                        |
| role                 | string    | true     | Order transaction direction If the order is a taker transaction, role returns the taker enumeration If the order is a maker transaction, role returns the maker enumeration If the order is both a taker transaction and a maker achievement, role returns the taker, maker enumeration | taker or maker or both                                                                                                                                                                                                                                                                                                                                 |
| canceled-source      | string    | false    | Enumeration value code of the cancellation source                                                                                                                                                                                                                                       |                                                                                                                                                                                                                                                                                                                                                        |
| canceled-source-desc | string    | false    | The specific reasons for the order cancellation.                                                                                                                                                                                                                                        | "timeout-canceled-order"、"cross-margin-fl-sys"、"isolated-margin-fl-sys"、"coin-listing-delisting"、"api"、"user-actively-cancels-order-web"、"user-actively-cancels-order-ios"、"user-actively-cancels-order-android"、"admin"、"grid-end"、"system-manually-cancels-order"、"circuit"、"self_match_prevent"、"market"、"fok"、"ioc"、 "limit_maker" |
| DATA_END             |           | false    |                                                                                                                                                                                                                                                                                         |                                                                                                                                                                                                                                                                                                                                                        |

#### Request example

`curl"https://api.huobi.pro/v1/order/orders"`

#### Response Example

##### Success Example

{

"status":

"ok"

"data":\[

0:{

"id":

1322796192271763

"symbol":

"xrpusdt"

"account-id":

51906522

"client-order-id":

""

"amount":

"5"

"market-amount":

"0"

"ice-amount":

"0"

"is-ice":

false

"price":

"2.5"

"created-at":

1747640289427

"type":

"sell-limit"

"field-amount":

"0"

"field-cash-amount":

"0"

"field-fees":

"0"

"finished-at":

1747640302667

"updated-at":

1747640302667

"source":

"spot-web"

"state":

"canceled"

"canceled-at":

1747640302663

"canceled-source":

116

"canceled-source-desc":

"Manual cancelation - Web"

"role":

"none"

}

\]

}
