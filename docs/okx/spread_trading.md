# OKX API Documentation - Spread Trading

## Introduction [🔗](https://www.okx.com/docs-v5/en/#spread-trading-introduction "Direct link to: https://www.okx.com/docs-v5/en/#spread-trading-introduction")

---

### Basic Concepts [🔗](https://www.okx.com/docs-v5/en/#spread-trading-introduction-basic-concepts "Direct link to: https://www.okx.com/docs-v5/en/#spread-trading-introduction-basic-concepts")

1.  **Spread -** Entering a trade where the trader is long one instrument and
    short an offsetting quantity of a related instrument, forming a trade with
    two risk offsetting legs.
2.  **Order-book -** A collection of offers to trade an instrument or basket.
    Each offer contains a defined instrument or group of instruments, relevant
    quantity, and the price at which the offerer is willing to transact. Takers
    can then immediately consume these offers up to the full amount of quantity
    listed at the offered price. The pending order limit of spread trading is
    500 across all spreads.

---

### High Level Workflow [🔗](https://www.okx.com/docs-v5/en/#spread-trading-introduction-high-level-workflow "Direct link to: https://www.okx.com/docs-v5/en/#spread-trading-introduction-high-level-workflow")

Nitro Spreads is centered around the familiar concept of a Central Limit Order
Book (**CLOB**).

- Spreads consist of instruments sourced from OKX where they are cleared and
  settled.
- Anyone can act as a "Taker," who consumes an existing resting order, or a
  "Maker," whose order is consumed.
- Trades take place when orders are crossed. Trades are then sent for clearing
  and settlement on OKX.

At a high level, the Nitro Spreads workflow is as follows:

1.  _Maker_ rests a Limit Order upon a Spread's Order Book.
2.  _Taker_ consumes a resting Order via a Limit Order.
3.  The crossed orders are sent for clearing and settlement.
4.  The _Taker_ and _Maker_ receive confirmation of the success or rejection of
    the Trade.
5.  All users are notified of successfully settled & cleared Trades, minus the
    counterparties or sides (`buy` / `sell`) involved.

Key aspects of Nitro Spreads:

- All Spreads have **publicly accessible** Central Limit Order Books **(CLOB)**.
- The availability of trading Spreads is determined by OKX. Typically, these
  Spreads encompass all possible combinations of delta one derivatives (Expiry
  Futures and Perpetual Futures) and SPOT within a specific instrument family
  (e.g. "BTC/USDT" or "ETH/USDC").
- **Partial fills** and multiple orders can be consumed as part of a single
  trade.
- **Counterparties** are **NOT** selected. All Spread Order Books can be engaged
  by anyone, effectively trading against the broader market.
- Anonymity is maintained throughout the process, with all orders and trades
  conducted on an **anonymous basis**.
- Users have the flexibility to place multiple orders on both the bid and ask
  sides of the Order Book, allowing for a **ladder-style** configuration.

---

## Comprehensive API Workflow [🔗](https://www.okx.com/docs-v5/en/#spread-trading-comprehensive-api-workflow "Direct link to: https://www.okx.com/docs-v5/en/#spread-trading-comprehensive-api-workflow")

Notifications regarding Orders and Trades will be received by both the Taker and
the Maker through the WebSocket Notification channels.

A user assumes the role of a _Maker_ when their Order is executed upon by
another Order. A user becomes a _Taker_ when they submit an Order that crosses
an existing Order in the Order Book.

---

### Obtaining Available Spreads [🔗](https://www.okx.com/docs-v5/en/#spread-trading-comprehensive-api-workflow-obtaining-available-spreads "Direct link to: https://www.okx.com/docs-v5/en/#spread-trading-comprehensive-api-workflow-obtaining-available-spreads")

To retrieve all available Spreads for trading on OKX, make a request to the
`GET /api/v5/sprd/spreads` endpoint.

---

### Retrieving Your Orders [🔗](https://www.okx.com/docs-v5/en/#spread-trading-comprehensive-api-workflow-retrieving-your-orders "Direct link to: https://www.okx.com/docs-v5/en/#spread-trading-comprehensive-api-workflow-retrieving-your-orders")

To retrieve orders on OKX, make a request to the `GET /api/v5/sprd/order`
endpoint.

---

### Retrieving Your Trades [🔗](https://www.okx.com/docs-v5/en/#spread-trading-comprehensive-api-workflow-retrieving-your-trades "Direct link to: https://www.okx.com/docs-v5/en/#spread-trading-comprehensive-api-workflow-retrieving-your-trades")

To retrieve trades on OKX, make a request to the `GET /api/v5/sprd/trades`
endpoint.

---

### Submitting an Order [🔗](https://www.okx.com/docs-v5/en/#spread-trading-comprehensive-api-workflow-submitting-an-order "Direct link to: https://www.okx.com/docs-v5/en/#spread-trading-comprehensive-api-workflow-submitting-an-order")

To submit an order to a Spread's Order Book, make a request to the
`POST /api/v5/sprd/order` endpoint.

---

### Spread States [🔗](https://www.okx.com/docs-v5/en/#spread-trading-comprehensive-api-workflow-spread-states "Direct link to: https://www.okx.com/docs-v5/en/#spread-trading-comprehensive-api-workflow-spread-states")

There are three different states during a Spread's life cycle: `live`,
`suspend`, and `expired` as detailed below:

1.  `live`: Spreads that are actively traded on Nitro Spreads
2.  `suspend`: Spreads in which at least one of the legs is suspended and the
    other one is active or suspended on the OKX orderbook exchange; or spreads
    in which the underlying instruments are still live on the OKX orderbook
    exchange, but removed from Nitro Spreads
3.  `expired`: Spreads in which at least one of the underlying instruments is
    expired on the OKX orderbook exchange

Please refer to the following table for all possible scenarios given the state
of the underlying instruments and the resulting state of the spread on Nitro
Spreads (except for the case that the spread is delisted on Nitro Spreads):

| Instrument A | Instrument B | Spread State |
| ------------ | ------------ | ------------ |
| Live         | Live         | Live         |
| Suspend      | Live         | Suspend      |
| Live         | Suspend      | Suspend      |
| Suspend      | Suspend      | Suspend      |
| Expired      | Live         | Expired      |
| Live         | Expired      | Expired      |
| Suspend      | Expired      | Expired      |
| Expired      | Suspend      | Expired      |
| Expired      | Expired      | Expired      |

---

### Trade Lifecycle [🔗](https://www.okx.com/docs-v5/en/#spread-trading-comprehensive-api-workflow-trade-lifecycle "Direct link to: https://www.okx.com/docs-v5/en/#spread-trading-comprehensive-api-workflow-trade-lifecycle")

In order for a trade to take place, two orders must be crossed within a Spread's
Order Book.

Obtain information about the state of an Order and determine if it has reached
its final state by monitoring the `sprd-orders`WebSocket channel. The `state`
key in the channel indicates the current state of the Order. If the state is
`live` or `partially_filled`, it means that the Order still has available size
(`sz`) that the creator or another user can take action on. On the other hand,
if the state is `canceled` or `filled`, the Order no longer has any available
actions that the creator or any other user can take action on.

It is important to closely track the values of the following attributes:
`sz`(size),`pendingFillSz` (pending fill size), `canceledSz` (canceled size),
and `accFillSz`(accumulated fill size). These attributes provide crucial
information regarding the status and progression of the Order.

---

### Order State [🔗](https://www.okx.com/docs-v5/en/#spread-trading-comprehensive-api-workflow-order-state "Direct link to: https://www.okx.com/docs-v5/en/#spread-trading-comprehensive-api-workflow-order-state")

Track the state of an order by subscribing to the `sprd-orders` WebSocket
channel.

1.  Upon submitting an order, whether as a Maker or Taker, an order update
    message is sent via the orders WebSocket channel. The message will indicate
    the order's `state` == `live`.
2.  Order matching and trade settlement are asynchronous processes. When the
    order is matched but not settled, system pushes `pendingSettleSz` > 0 and
    `fillSz` == ""
3.  If the order is partially filled, an order update message is sent with
    `state` == `partially_filled`.
4.  In the event that the order is completely filled, an order update message is
    sent with the `state` == `filled`.
5.  If the order is not fully filled but has reached its final state, an order
    update message is sent with the `state` == `canceled`.
6.  If a certain part of an order is rejected, an order update message is sent
    with updated `canceledSz` and `pendingFillSz`, and `code` and `msg`
    corresponding to the error.

---

### Trade State [🔗](https://www.okx.com/docs-v5/en/#spread-trading-comprehensive-api-workflow-trade-state "Direct link to: https://www.okx.com/docs-v5/en/#spread-trading-comprehensive-api-workflow-trade-state")

Track the state of a trade by subscribing to the `sprd-trades`WebSocket channel.

1.  After an executed trade undergoes clearing and settlement on OKX, it reaches
    finality.
2.  For successfully cleared trades, a WebSocket message is sent with the
    `state`denoted as `filled`.
3.  In the case of an unsuccessful trade clearing, a trade update message is
    sent with the `state` reflected as `rejected`.
4.  If the trade state is `rejected`, the trade update message will also include
    the error `code` and a corresponding error message (`msg`) that explains the
    reason for the rejection.

---

### All Trades [🔗](https://www.okx.com/docs-v5/en/#spread-trading-comprehensive-api-workflow-all-trades "Direct link to: https://www.okx.com/docs-v5/en/#spread-trading-comprehensive-api-workflow-all-trades")

All users have the ability to receive updates on all trades that take place
through the OKX Nitro Spreads product.

It's important to note that OKX Nitro Spreads does not disclose information
about the counterparties involved in the trades or the individual `side` (`buy`
or `sell`) of the composite legs that were traded.

1.  By subscribing to the `sprd-public-trades`WebSocket channel, WebSocket
    messages are sent exclusively for trades that have been successfully cleared
    and settled.

---

### Place order [🔗](https://www.okx.com/docs-v5/en/#spread-trading-rest-api-place-order "Direct link to: https://www.okx.com/docs-v5/en/#spread-trading-rest-api-place-order")

Place a new order

#### Rate Limit: 20 requests per 2 seconds

#### Rate limit rule: User ID

#### Permission: Trade

#### HTTP Request

`POST /api/v5/sprd/order`

#### Request Parameters

| Parameter | Type   | Required | Description                                                                                                                                                                  |
| --------- | ------ | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| sprdId    | String | Yes      | spread ID, e.g. BTC-USDT_BTC-USD-SWAP                                                                                                                                        |
| clOrdId   | String | No       | Client Order ID as assigned by the client<br>A combination of case-sensitive alphanumerics, all numbers, or all letters of up to 32 characters.                              |
| tag       | String | No       | Order tag<br>A combination of case-sensitive alphanumerics, all numbers, or all letters of up to 16 characters.                                                              |
| side      | String | Yes      | Order side, <code>buy</code> <code>sell</code>                                                                                                                               |
| ordType   | String | Yes      | Order type<br><code>market</code>: Market order<br><code>limit</code>: Limit order<br><code>post_only</code>: Post-only order<br><code>ioc</code>: Immediate-or-cancel order |
| sz        | String | Yes      | Quantity to buy or sell. The unit is USD for inverse spreads, and the corresponding baseCcy for linear and hybrid spreads.                                                   |
| px        | String | Yes      | Order price. Only applicable to <code>limit</code>, <code>post_only</code>, <code>ioc</code>                                                                                 |

#### Response Example

| Parameter | Type   | Description                                              |
| --------- | ------ | -------------------------------------------------------- |
| ordId     | String | Order ID                                                 |
| clOrdId   | String | Client Order ID as assigned by the client                |
| tag       | String | Order tag                                                |
| sCode     | String | The code of the event execution result, 0 means success. |
| sMsg      | String | Rejection or success message of event execution.         |

clOrdId  
clOrdId is a user-defined unique ID used to identify the order. It will be
included in the response parameters if you have specified during order
submission, and can be used as a request parameter to the endpoints to query,
cancel and amend orders. clOrdId must be unique among the clOrdIds of all
pending orders.

ordType  
Order type. When creating a new order, you must specify the order type. The
order type you specify will affect: 1) what order parameters are required,
and 2) how the matching system executes your order. The following are valid
order types:  
limit: Limit order, which requires specified sz and px.  
post_only: Post-only order, which the order can only provide liquidity to the
market and be a maker. If the order would have executed on placement, it will be
canceled instead. ioc: Immediate-or-cancel order

sz  
The sz unit for inverse spreads is USD in Nitro Spread, as opposed to contract
in OKX orderbook.

---

### Cancel order [🔗](https://www.okx.com/docs-v5/en/#spread-trading-rest-api-cancel-order "Direct link to: https://www.okx.com/docs-v5/en/#spread-trading-rest-api-cancel-order")

Cancel an incomplete order.

#### Rate Limit: 20 requests per 2 seconds

#### Rate limit rule: User ID

#### Permission: Trade

#### HTTP Request

`POST /api/v5/sprd/cancel-order`

#### Request Parameters

| Parameter | Type   | Required    | Description                                                                                                                     |
| --------- | ------ | ----------- | ------------------------------------------------------------------------------------------------------------------------------- |
| ordId     | String | Conditional | Order ID<br>Either <code>ordId</code> or <code>clOrdId</code> is required. If both are passed, <code>ordId</code> will be used. |
| clOrdId   | String | Conditional | Client Order ID as assigned by the client                                                                                       |

#### Response Example

| Parameter | Type   | Description                                              |
| --------- | ------ | -------------------------------------------------------- |
| ordId     | String | Order ID                                                 |
| clOrdId   | String | Client Order ID as assigned by the client                |
| sCode     | String | The code of the event execution result, 0 means success. |
| sMsg      | String | Rejection message if the request is unsuccessful.        |

Cancel order returns with sCode equal to 0. It is not strictly considered that
the order has been canceled. It only means that your cancellation request has
been accepted by the system server. The result of the cancellation is subject to
the state pushed by the order channel or the get order state.

---

### Cancel All orders [🔗](https://www.okx.com/docs-v5/en/#spread-trading-rest-api-cancel-all-orders "Direct link to: https://www.okx.com/docs-v5/en/#spread-trading-rest-api-cancel-all-orders")

Cancel all pending orders.

#### Rate Limit: 10 requests per 2 seconds

#### Rate limit rule: User ID

#### Permission: Trade

#### HTTP Request

`POST /api/v5/sprd/mass-cancel`

#### Request Parameters

| Parameter | Type   | Required | Description |
| --------- | ------ | -------- | ----------- |
| sprdId    | String | No       | spread ID   |

#### Response Example

| Parameter | Type    | Description                                                 |
| --------- | ------- | ----------------------------------------------------------- |
| result    | Boolean | Result of the request <code>true</code>, <code>false</code> |

Getting a response with result=true means your request has been successfully
received and will be processed. The result of the cancellation is subject to the
state pushed by the order channel or the get order state.

---

### Amend order [🔗](https://www.okx.com/docs-v5/en/#spread-trading-rest-api-amend-order "Direct link to: https://www.okx.com/docs-v5/en/#spread-trading-rest-api-amend-order")

Amend an incomplete order.

#### Rate Limit: 20 requests per 2 seconds

#### Rate limit rule: User ID

#### Permission: Trade

#### HTTP Request

`POST /api/v5/sprd/amend-order`

#### Response parameters

| Parameter | Type   | Required    | Description                                                                                                                                                                                                                                                                                   |
| --------- | ------ | ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ordId     | String | Conditional | Order ID<br>Either <code>ordId</code> or <code>clOrdId</code> is required. If both are passed, ordId will be used.                                                                                                                                                                            |
| clOrdId   | String | Conditional | Client Order ID as assigned by the client                                                                                                                                                                                                                                                     |
| reqId     | String | No          | Client Request ID as assigned by the client for order amendment<br>A combination of case-sensitive alphanumerics, all numbers, or all letters of up to 32 characters.<br>The response will include the corresponding reqId to help you identify the request if you provide it in the request. |
| newSz     | String | Conditional | New quantity after amendment<br>Either <code>newSz</code> or <code>newPx</code> is required.<br>When amending a partially-filled order, the newSz should include the amount that has been filled.                                                                                             |
| newPx     | String | Conditional | New price after amendment<br>Either <code>newSz</code> or <code>newPx</code> is required.                                                                                                                                                                                                     |

#### Response Parameters

| Parameter | Type   | Description                                                      |
| --------- | ------ | ---------------------------------------------------------------- |
| ordId     | String | Order ID                                                         |
| clOrdId   | String | Client Order ID as assigned by the client.                       |
| reqId     | String | Client Request ID as assigned by the client for order amendment. |
| sCode     | String | The code of the event execution result, 0 means success.         |
| sMsg      | String | Rejection message if the request is unsuccessful.                |

newSz  
If the new quantity of the order is less than or equal to the (accFillSz +
canceledSz + pendingSettleSz), after pendingSettleSz is settled, the order
status will be transitioned into filled (if canceledSz = 0), or canceled (if
canceledSz > 0).

The amend order returns sCode equal to 0  
It is not strictly considered that the order has been amended. It only means
that your amend order request has been accepted by the system server. The result
of the amend is subject to the status pushed by the order channel or the order
status query.

---

### Get order details [🔗](https://www.okx.com/docs-v5/en/#spread-trading-rest-api-get-order-details "Direct link to: https://www.okx.com/docs-v5/en/#spread-trading-rest-api-get-order-details")

Retrieve order details.

#### Rate Limit: 20 requests per 2 seconds

#### Rate limit rule: User ID

#### Permission: Read

#### HTTP Request

`GET /api/v5/sprd/order`

#### Request Parameters

| Parameter | Type   | Required    | Description                                                                                                                    |
| --------- | ------ | ----------- | ------------------------------------------------------------------------------------------------------------------------------ |
| ordId     | String | Conditional | Order ID<br>Either <code>ordId</code> or <code>clOrdId</code> is required, if both are passed, <code>ordId</code> will be used |
| clOrdId   | String | Conditional | Client Order ID as assigned by the client. The latest order will be returned.                                                  |

#### Response Example

| Parameter       | Type   | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| --------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| sprdId          | String | spread ID                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| ordId           | String | Order ID                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| clOrdId         | String | Client Order ID as assigned by the client                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| tag             | String | Order tag                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| px              | String | Price                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| sz              | String | Quantity to buy or sell                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| ordType         | String | Order type<br><code>market</code>: Market order<br><code>limit</code>: Limit order<br><code>post_only</code>: Post-only order<br><code>ioc</code>: Immediate-or-cancel order                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| side            | String | Order side                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| fillSz          | String | Last fill quantity                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| fillPx          | String | Last fill price                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| tradeId         | String | Last trade ID                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| accFillSz       | String | Accumulated fill quantity                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| pendingFillSz   | String | Live quantity                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| pendingSettleSz | String | Quantity that's pending settlement                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| canceledSz      | String | Quantity canceled due order cancellations or trade rejections                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| avgPx           | String | Average filled price. If none is filled, it will return "0".                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| state           | String | State<br><code>canceled</code><br><code>live</code><br><code>partially_filled</code><br><code>filled</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| cancelSource    | String | Source of the order cancellation.Valid values and the corresponding meanings are:<br><code>0</code>: Order canceled by system<br><code>1</code>: Order canceled by user<br><code>14</code>: Order canceled: IOC order was partially canceled due to incompletely filled<br><code>15</code>: Order canceled: The order price is beyond the limit<br><code>20</code>: Cancel all after triggered<br><code>31</code>: The post-only order will take liquidity in maker orders<br><code>32</code>: Self trade prevention<br><code>34</code>: Order failed to settle due to insufficient margin<br><code>35</code>: Order cancellation due to insufficient margin from another order<br><code>44</code>: Your order was canceled because your available balance of this crypto was insufficient for auto conversion. Auto conversion was triggered when the total collateralized liabilities for this crypto reached the platform’s risk control limit. |
| uTime           | String | Update time, Unix timestamp format in milliseconds, e.g. <code>1597026383085</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| cTime           | String | Creation time, Unix timestamp format in milliseconds, e.g. <code>1597026383085</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |

Order sizes equation: pendingFillSz + canceledSz + accFillSz = sz

---

### Get active orders [🔗](https://www.okx.com/docs-v5/en/#spread-trading-rest-api-get-active-orders "Direct link to: https://www.okx.com/docs-v5/en/#spread-trading-rest-api-get-active-orders")

Retrieve all incomplete orders under the current account.

#### Rate Limit: 10 requests per 2 seconds

#### Rate limit rule: User ID

#### Permission: Read

#### HTTP Request

`GET /api/v5/sprd/orders-pending`

#### Request Parameters

| Parameter | Type   | Required | Description                                                                                                                                                                  |
| --------- | ------ | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| sprdId    | String | No       | spread ID, e.g.                                                                                                                                                              |
| ordType   | String | No       | Order type<br><code>market</code>: Market order<br><code>limit</code>: Limit order<br><code>post_only</code>: Post-only order<br><code>ioc</code>: Immediate-or-cancel order |
| state     | String | No       | State<br><code>live</code><br><code>partially_filled</code>                                                                                                                  |
| beginId   | String | No       | Start order ID the request to begin with. Pagination of data to return records newer than the requested order Id, not including beginId                                      |
| endId     | String | No       | End order ID the request to end with. Pagination of data to return records earlier than the requested order Id, not including endId                                          |
| limit     | String | No       | Number of results per request. The maximum is 100. The default is 100                                                                                                        |

#### Response Example

| Parameter       | Type   | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| --------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| sprdId          | String | spread ID                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| ordId           | String | Order ID                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| clOrdId         | String | Client Order ID as assigned by the client                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| tag             | String | Order tag                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| px              | String | Price                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| sz              | String | Quantity to buy or sell                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| ordType         | String | Order type<br><code>market</code>: Market order<br><code>limit</code>: Limit order<br><code>post_only</code>: Post-only order<br><code>ioc</code>: Immediate-or-cancel order                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| side            | String | Order side                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| fillSz          | String | Last fill quantity                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| fillPx          | String | Last fill price                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| tradeId         | String | Last trade ID                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| accFillSz       | String | Accumulated fill quantity                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| pendingFillSz   | String | Quantity still remaining to be filled                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| pendingSettleSz | String | Quantity that's pending settlement                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| canceledSz      | String | Quantity canceled due order cancellations or trade rejections                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| avgPx           | String | Average filled price. If none is filled, it will return "0".                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| state           | String | State<br><code>live</code><br><code>partially_filled</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| cancelSource    | String | Source of the order cancellation.Valid values and the corresponding meanings are:<br><code>0</code>: Order canceled by system<br><code>1</code>: Order canceled by user<br><code>14</code>: Order canceled: IOC order was partially canceled due to incompletely filled<br><code>15</code>: Order canceled: The order price is beyond the limit<br><code>20</code>: Cancel all after triggered<br><code>31</code>: The post-only order will take liquidity in maker orders<br><code>32</code>: Self trade prevention<br><code>34</code>: Order failed to settle due to insufficient margin<br><code>35</code>: Order cancellation due to insufficient margin from another order<br><code>44</code>: Your order was canceled because your available balance of this crypto was insufficient for auto conversion. Auto conversion was triggered when the total collateralized liabilities for this crypto reached the platform’s risk control limit. |
| uTime           | String | Update time, Unix timestamp format in milliseconds, e.g. <code>1597026383085</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| cTime           | String | Creation time, Unix timestamp format in milliseconds, e.g. <code>1597026383085</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |

---

### Get orders (last 21 days) [🔗](https://www.okx.com/docs-v5/en/#spread-trading-rest-api-get-orders-last-21-days "Direct link to: https://www.okx.com/docs-v5/en/#spread-trading-rest-api-get-orders-last-21-days")

Retrieve the completed order data for the last 21 days, and the incomplete
orders (filledSz =0 & state = canceled) that have been canceled are only
reserved for 2 hours. Results are returned in counter chronological order of
orders creation.

#### Rate Limit: 20 requests per 2 seconds

#### Rate limit rule: User ID

#### Permission: Read

#### HTTP Request

`GET /api/v5/sprd/orders-history`

#### Request Parameters

| Parameter | Type   | Required | Description                                                                                                                                                                  |
| --------- | ------ | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| sprdId    | String | No       | spread ID, e.g.                                                                                                                                                              |
| ordType   | String | No       | Order type<br><code>market</code>: Market order<br><code>limit</code>: limit order<br><code>post_only</code>: Post-only order<br><code>ioc</code>: Immediate-or-cancel order |
| state     | String | No       | State<br><code>canceled</code><br><code>filled</code>                                                                                                                        |
| beginId   | String | No       | Start order ID the request to begin with. Pagination of data to return records newer than the requested order Id, not including beginId                                      |
| endId     | String | No       | End order ID the request to end with. Pagination of data to return records earlier than the requested order Id, not including endId                                          |
| begin     | String | No       | Filter with a begin timestamp. Unix timestamp format in milliseconds, e.g. <code>1597026383085</code>. Date older than 7 days will be truncated.                             |
| end       | String | No       | Filter with an end timestamp. Unix timestamp format in milliseconds, e.g. <code>1597026383085</code>                                                                         |
| limit     | String | No       | Number of results per request. The maximum is 100. The default is 100                                                                                                        |

#### Response Example

| Parameter       | Type   | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| --------------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| sprdId          | String | spread ID                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| ordId           | String | Order ID                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| clOrdId         | String | Client Order ID as assigned by the client                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| tag             | String | Order tag                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| px              | String | Price                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| sz              | String | Quantity to buy or sell                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| ordType         | String | Order type<br><code>market</code>: Market order<br><code>limit</code>: limit order<br><code>post_only</code>: Post-only order<br><code>ioc</code>: Immediate-or-cancel order                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| side            | String | Order side                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| fillSz          | String | Last fill quantity                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| fillPx          | String | Last fill price                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| tradeId         | String | Last trade ID                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| accFillSz       | String | Accumulated fill quantity                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| pendingFillSz   | String | Quantity still remaining to be filled, inluding pendingSettleSz                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| pendingSettleSz | String | Quantity that's pending settlement                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| canceledSz      | String | Quantity canceled due order cancellations or trade rejections                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| avgPx           | String | Average filled price. If none is filled, it will return "0".                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| state           | String | State<br><code>canceled</code><br><code>filled</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| cancelSource    | String | Source of the order cancellation. Valid values and the corresponding meanings are:<br><code>0</code>: Order canceled by system<br><code>1</code>: Order canceled by user<br><code>14</code>: Order canceled: IOC order was partially canceled due to incompletely filled<br><code>15</code>: Order canceled: The order price is beyond the limit<br><code>20</code>: Cancel all after triggered<br><code>31</code>: The post-only order will take liquidity in maker orders<br><code>32</code>: Self trade prevention<br><code>34</code>: Order failed to settle due to insufficient margin<br><code>35</code>: Order cancellation due to insufficient margin from another order<br><code>44</code>: Your order was canceled because your available balance of this crypto was insufficient for auto conversion. Auto conversion was triggered when the total collateralized liabilities for this crypto reached the platform’s risk control limit. |
| uTime           | String | Update time, Unix timestamp format in milliseconds, e.g. <code>1597026383085</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| cTime           | String | Creation time, Unix timestamp format in milliseconds, e.g. <code>1597026383085</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |

---

### Get orders history (last 3 months) [🔗](https://www.okx.com/docs-v5/en/#spread-trading-rest-api-get-orders-history-last-3-months "Direct link to: https://www.okx.com/docs-v5/en/#spread-trading-rest-api-get-orders-history-last-3-months")

Retrieve the completed order data for the last 3 months, including those placed
3 months ago but completed in the last 3 months. Results are returned in counter
chronological order.

#### Rate Limit: 20 requests per 2 seconds

#### Rate limit rule: User ID

#### Permission: Read

#### HTTP Request

`GET /api/v5/sprd/orders-history-archive`

#### Request Parameters

| Parameter  | Type   | Required | Description                                                                                                                                                                        |
| ---------- | ------ | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| sprdId     | String | No       | spread ID, e.g.                                                                                                                                                                    |
| ordType    | String | No       | Order type<br><code>market</code>: Market order<br><code>limit</code>: limit order<br><code>post_only</code>: Post-only order<br><code>ioc</code>: Immediate-or-cancel order       |
| state      | String | No       | State<br><code>canceled</code><br><code>filled</code>                                                                                                                              |
| instType   | String | No       | Instrument type<br><code>SPOT</code><br><code>FUTURES</code><br><code>SWAP</code><br>Any orders with spreads containing the specified instrument type in any legs will be returned |
| instFamily | String | No       | Instrument family, e.g. BTC-USDT. Any orders with spreads containing the specified instrument family in any legs will be returned                                                  |
| beginId    | String | No       | Start order ID the request to begin with. Pagination of data to return records newer than the requested order Id, not including beginId                                            |
| endId      | String | No       | End order ID the request to end with. Pagination of data to return records earlier than the requested order Id, not including endId                                                |
| begin      | String | No       | Filter with a begin timestamp. Unix timestamp format in milliseconds, e.g. <code>1597026383085</code>                                                                              |
| end        | String | No       | Filter with an end timestamp. Unix timestamp format in milliseconds, e.g. <code>1597026383085</code>                                                                               |
| limit      | String | No       | Number of results per request. The maximum is 100. The default is 100                                                                                                              |

#### Response Example

| Parameter       | Type   | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| --------------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| sprdId          | String | spread ID                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| ordId           | String | Order ID                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| clOrdId         | String | Client Order ID as assigned by the client                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| tag             | String | Order tag                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| px              | String | Price                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| sz              | String | Quantity to buy or sell                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| ordType         | String | Order type<br><code>market</code>: Market order<br><code>limit</code>: limit order<br><code>post_only</code>: Post-only order<br><code>ioc</code>: Immediate-or-cancel order                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| side            | String | Order side                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| fillSz          | String | Last fill quantity                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| fillPx          | String | Last fill price                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| tradeId         | String | Last trade ID                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| accFillSz       | String | Accumulated fill quantity                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| pendingFillSz   | String | Quantity still remaining to be filled, inluding pendingSettleSz                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| pendingSettleSz | String | Quantity that's pending settlement                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| canceledSz      | String | Quantity canceled due order cancellations or trade rejections                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| avgPx           | String | Average filled price. If none is filled, it will return "0".                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| state           | String | State<br><code>canceled</code><br><code>filled</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| cancelSource    | String | Source of the order cancellation. Valid values and the corresponding meanings are:<br><code>0</code>: Order canceled by system<br><code>1</code>: Order canceled by user<br><code>14</code>: Order canceled: IOC order was partially canceled due to incompletely filled<br><code>15</code>: Order canceled: The order price is beyond the limit<br><code>20</code>: Cancel all after triggered<br><code>31</code>: The post-only order will take liquidity in maker orders<br><code>32</code>: Self trade prevention<br><code>34</code>: Order failed to settle due to insufficient margin<br><code>35</code>: Order cancellation due to insufficient margin from another order<br><code>44</code>: Your order was canceled because your available balance of this crypto was insufficient for auto conversion. Auto conversion was triggered when the total collateralized liabilities for this crypto reached the platform’s risk control limit. |
| uTime           | String | Update time, Unix timestamp format in milliseconds, e.g. <code>1597026383085</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| cTime           | String | Creation time, Unix timestamp format in milliseconds, e.g. <code>1597026383085</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |

---

### Get trades (last 7 days) [🔗](https://www.okx.com/docs-v5/en/#spread-trading-rest-api-get-trades-last-7-days "Direct link to: https://www.okx.com/docs-v5/en/#spread-trading-rest-api-get-trades-last-7-days")

Retrieve historical transaction details **for the last 7 days**. Results are
returned in counter chronological order.

#### Rate Limit: 20 requests per 2 seconds

#### Rate limit rule: User ID

#### Permission: Read

#### HTTP Request

`GET /api/v5/sprd/trades`

#### Request Parameters

| Parameter | Type   | Required | Description                                                                                                                            |
| --------- | ------ | -------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| sprdId    | String | No       | spread ID, e.g.                                                                                                                        |
| tradeId   | String | No       | Trade ID                                                                                                                               |
| ordId     | String | No       | Order ID                                                                                                                               |
| beginId   | String | No       | Start trade ID the request to begin with. Pagination of data to return records newer than the requested tradeId, not including beginId |
| endId     | String | No       | End trade ID the request to end with. Pagination of data to return records earlier than the requested tradeId, not including endId     |
| begin     | String | No       | Filter with a begin timestamp. Unix timestamp format in milliseconds, e.g. <code>1597026383085</code>                                  |
| end       | String | No       | Filter with an end timestamp. Unix timestamp format in milliseconds, e.g. <code>1597026383085</code>                                   |
| limit     | String | No       | Number of results per request. The maximum is 100. The default is 100                                                                  |

#### Response Parameters

| Parameter    | Type             | Description                                                                                                                        |
| ------------ | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| sprdId       | String           | spread ID                                                                                                                          |
| tradeId      | String           | Trade ID                                                                                                                           |
| ordId        | String           | Order ID                                                                                                                           |
| clOrdId      | String           | Client Order ID as assigned by the client                                                                                          |
| tag          | String           | Order tag                                                                                                                          |
| fillPx       | String           | Filled price                                                                                                                       |
| fillSz       | String           | Filled quantity                                                                                                                    |
| side         | String           | Order side, <code>buy</code> <code>sell</code>                                                                                     |
| state        | String           | Trade state.<br>Valid values are <code>filled</code> and <code>rejected</code>                                                     |
| execType     | String           | Liquidity taker or maker, <code>T</code>: taker <code>M</code>: maker                                                              |
| ts           | String           | Data generation time, Unix timestamp format in milliseconds, e.g. <code>1597026383085</code>.                                      |
| legs         | Array of objects | Legs of trade                                                                                                                      |
| &gt; instId  | String           | Instrument ID, e.g. BTC-USDT-SWAP                                                                                                  |
| &gt; px      | String           | The price the leg executed                                                                                                         |
| &gt; sz      | String           | The size of each leg                                                                                                               |
| &gt; szCont  | String           | Filled amount of the contract<br>Only applicable to contracts, return "" for spot                                                  |
| &gt; side    | String           | The direction of the leg. Valid value can be <code>buy</code> or <code>sell</code>.                                                |
| &gt; fillPnl | String           | Last filled profit and loss, applicable to orders which have a trade and aim to close position. It always is 0 in other conditions |
| &gt; fee     | String           | Fee. Negative number represents the user transaction fee charged by the platform. Positive number represents rebate.               |
| &gt; feeCcy  | String           | Fee currency                                                                                                                       |
| &gt; tradeId | String           | Traded ID in the OKX orderbook.                                                                                                    |
| code         | String           | Error Code, the default is 0                                                                                                       |
| msg          | String           | Error Message, the default is ""                                                                                                   |

---

### Get Spreads (Public) [🔗](https://www.okx.com/docs-v5/en/#spread-trading-rest-api-get-spreads-public "Direct link to: https://www.okx.com/docs-v5/en/#spread-trading-rest-api-get-spreads-public")

Retrieve all available spreads based on the request parameters.

#### Rate Limit: 20 requests per 2 seconds

#### Rate limit rule: IP

#### Permission: Read

#### HTTP Request

`GET /api/v5/sprd/spreads`

#### Request Parameters

| Parameter | Type   | Required | Description                                                                                                                                       |
| --------- | ------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| baseCcy   | string | No       | Currency instrument is based in, e.g. BTC, ETH                                                                                                    |
| instId    | String | No       | The instrument ID to be included in the spread.                                                                                                   |
| sprdId    | String | No       | The spread ID                                                                                                                                     |
| state     | string | No       | Spreads which are available to trade, suspened or expired. Valid values include <code>live</code>, <code>suspend</code> and <code>expired</code>. |

#### Response Parameters

| Parameter   | Type             | Description                                                                                                       |
| ----------- | ---------------- | ----------------------------------------------------------------------------------------------------------------- |
| sprdId      | String           | spread ID                                                                                                         |
| sprdType    | String           | spread Type. Valid values are <code>linear</code>, <code>inverse</code>, <code>hybrid</code>                      |
| state       | String           | Current state of the spread. Valid values include <code>live</code>, <code>expired</code>, <code>suspend</code>.  |
| baseCcy     | String           | Currency instrument is based in. Valid values include BTC, ETH                                                    |
| szCcy       | String           | The currency the spread order size is submitted to the underlying venue in, e.g. USD, BTC, ETH.                   |
| quoteCcy    | String           | The currency the spread is priced in, e.g. USDT, USD                                                              |
| tickSz      | String           | Tick size, e.g. 0.0001 in the quoteCcy of the spread.                                                             |
| minSz       | String           | Minimum order size in the szCcy of the spread.                                                                    |
| lotSz       | String           | The minimum order size increment the spread can be traded in the szCcy of the spread.                             |
| listTime    | String           | The timestamp the spread was created. Unix timestamp format in milliseconds, , e.g. <code>1597026383085</code>    |
| expTime     | String           | Expiry time, Unix timestamp format in milliseconds, e.g. <code>1597026383085</code>                               |
| uTime       | String           | The timestamp the spread was last updated. Unix timestamp format in milliseconds, e.g. <code>1597026383085</code> |
| legs        | array of objects |
| &gt; instId | String           | Instrument ID, e.g. BTC-USD-SWAP                                                                                  |
| &gt; side   | String           | The direction of the leg of the spread. Valid Values include <code>buy</code> and <code>sell</code>.              |

---

### Get order book (Public) [🔗](https://www.okx.com/docs-v5/en/#spread-trading-rest-api-get-order-book-public "Direct link to: https://www.okx.com/docs-v5/en/#spread-trading-rest-api-get-order-book-public")

Retrieve the order book of the spread.

#### Rate Limit: 20 requests per 2 seconds

#### Rate limit rule: IP

#### Permission: Read

#### HTTP Request

`GET /api/v5/sprd/books`

#### Request Parameters

| Parameter | Type   | Required | Description                                                          |
| --------- | ------ | -------- | -------------------------------------------------------------------- |
| sprdId    | String | Yes      | spread ID, e.g. BTC-USDT_BTC-USDT-SWAP                               |
| sz        | String | No       | Order book depth per side. Maximum value is 400. Default value is 5. |

#### Response Parameters

| Parameter | Type            | Description                |
| --------- | --------------- | -------------------------- |
| asks      | Array of arrays | Order book on sell side    |
| bids      | Array of arrays | Order book on buy side     |
| ts        | String          | Order book generation time |

An example of the array of asks and bids values: \["411.8", "10", "4"\]  
\- "411.8" is the depth price  
\- "10" is the quantity at the price (Unit: szCcy)  
\- "4" is the number of orders at the price.

---

### Get ticker (Public) [🔗](https://www.okx.com/docs-v5/en/#spread-trading-rest-api-get-ticker-public "Direct link to: https://www.okx.com/docs-v5/en/#spread-trading-rest-api-get-ticker-public")

Retrieve the latest price snapshot, best bid/ask price and quantity.

#### Rate Limit: 20 requests per 2 seconds

#### Rate limit rule: IP

#### HTTP Request

`GET /api/v5/market/sprd-ticker`

#### Request Parameters

| Parameter | Type   | Required | Description                            |
| --------- | ------ | -------- | -------------------------------------- |
| sprdId    | String | Yes      | spread ID, e.g. BTC-USDT_BTC-USDT-SWAP |

#### Response Parameters

| Parameter | Type   | Description                                                                                                             |
| --------- | ------ | ----------------------------------------------------------------------------------------------------------------------- |
| sprdId    | String | spread ID                                                                                                               |
| last      | String | Last traded price                                                                                                       |
| lastSz    | String | Last traded size                                                                                                        |
| askPx     | String | Best ask price                                                                                                          |
| askSz     | String | Best ask size                                                                                                           |
| bidPx     | String | Best bid price                                                                                                          |
| bidSz     | String | Best bid size                                                                                                           |
| open24h   | String | Open price in the past 24 hours                                                                                         |
| high24h   | String | Highest price in the past 24 hours                                                                                      |
| low24h    | String | Lowest price in the past 24 hours                                                                                       |
| vol24h    | String | 24h trading volume<br>The unit is USD for inverse spreads, and the corresponding baseCcy for linear and hybrid spreads. |
| ts        | String | Ticker data generation time, Unix timestamp format in milliseconds, e.g. 1597026383085.                                 |

---

### Get public trades (Public) [🔗](https://www.okx.com/docs-v5/en/#spread-trading-rest-api-get-public-trades-public "Direct link to: https://www.okx.com/docs-v5/en/#spread-trading-rest-api-get-public-trades-public")

Retrieve the recent transactions of an instrument (at most 500 records per
request). Results are returned in counter chronological order.

#### Rate Limit: 20 requests per 2 seconds

#### Rate limit rule: IP

#### Permission: Read

#### HTTP Request

`GET /api/v5/sprd/public-trades`

#### Request Parameters

| Parameter | Type   | Required | Description                            |
| --------- | ------ | -------- | -------------------------------------- |
| sprdId    | String | No       | Spread ID, e.g. BTC-USDT_BTC-USDT-SWAP |

#### Response Parameters

| Parameter | Type   | Description                                                                         |
| --------- | ------ | ----------------------------------------------------------------------------------- |
| sprdId    | String | spread ID                                                                           |
| tradeId   | String | Trade ID                                                                            |
| px        | String | Trade price                                                                         |
| sz        | String | Trade quantity                                                                      |
| side      | String | Trade side of the taker.<br><code>buy</code><br><code>sell</code>                   |
| ts        | String | Trade time, Unix timestamp format in milliseconds, e.g. <code>1597026383085</code>. |

---

### Get candlesticks [🔗](https://www.okx.com/docs-v5/en/#spread-trading-rest-api-get-candlesticks "Direct link to: https://www.okx.com/docs-v5/en/#spread-trading-rest-api-get-candlesticks")

Retrieve the candlestick charts. This endpoint can retrieve the latest 1,440
data entries. Charts are returned in groups based on the requested bar.

#### Rate Limit: 40 requests per 2 seconds

#### Rate limit rule: IP

#### HTTP Request

`GET /api/v5/market/sprd-candles`

#### Request Parameters

| Parameter | Type   | Required | Description                                                                                                                                                                                              |
| --------- | ------ | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| sprdId    | String | Yes      | Spread ID                                                                                                                                                                                                |
| bar       | String | No       | Bar size, the default is 1m, e.g. [1m/3m/5m/15m/30m/1H/2H/4H]<br>UTC+8 opening price k-line:[6H/12H/1D/2D/3D/1W/1M/3M]<br>UTC+0 opening price k-line:[/6Hutc/12Hutc/1Dutc/2Dutc/3Dutc/1Wutc/1Mutc/3Mutc] |
| after     | String | No       | Pagination of data to return records earlier than the requested ts                                                                                                                                       |
| before    | String | No       | Pagination of data to return records newer than the requested ts. The latest data will be returned when using before individually                                                                        |
| limit     | String | No       | Number of results per request. The maximum is 300. The default is 100.                                                                                                                                   |

#### Response Parameters

| Parameter | Type   | Description                                                                                                                       |
| --------- | ------ | --------------------------------------------------------------------------------------------------------------------------------- |
| ts        | String | Opening time of the candlestick, Unix timestamp format in milliseconds, e.g. 1597026383085                                        |
| o         | String | Open price                                                                                                                        |
| h         | String | highest price                                                                                                                     |
| l         | String | Lowest price                                                                                                                      |
| c         | String | Close price                                                                                                                       |
| vol       | String | Trading volume                                                                                                                    |
| confirm   | String | The state of candlesticks.<br><code>0</code> represents that it is uncompleted<br><code>1</code> represents that it is completed. |

The first candlestick data may be incomplete, and should not be polled
repeatedly.  
The data returned will be arranged in an array like this:
\[ts,o,h,l,c,vol,confirm\].

---

### Get candlesticks history [🔗](https://www.okx.com/docs-v5/en/#spread-trading-rest-api-get-candlesticks-history "Direct link to: https://www.okx.com/docs-v5/en/#spread-trading-rest-api-get-candlesticks-history")

Retrieve history candlestick charts from recent years.

#### Rate Limit: 20 requests per 2 seconds

#### Rate limit rule: IP

#### HTTP Request

`GET /api/v5/market/sprd-history-candles`

#### Request Parameters

| Parameter | Type   | Required | Description                                                                                                                                                                                             |
| --------- | ------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| sprdId    | String | Yes      | Spread ID                                                                                                                                                                                               |
| after     | String | No       | Pagination of data to return records earlier than the requested ts                                                                                                                                      |
| before    | String | No       | Pagination of data to return records newer than the requested ts. The latest data will be returned when using before individually                                                                       |
| bar       | String | No       | Bar size, the default is 1m, e.g. [1m/3m/5m/15m/30m/1H/2H/4H]<br>UTC+8 opening price k-line:[6H/12H/1D/2D/3D/1W/1M/3M]<br>UTC+0 opening price k-line:[6Hutc/12Hutc/1Dutc/2Dutc/3Dutc/1Wutc/1Mutc/3Mutc] |
| limit     | String | No       | Number of results per request. The maximum is 100. The default is 100.                                                                                                                                  |

#### Response Parameters

| Parameter | Type   | Description                                                                                                                       |
| --------- | ------ | --------------------------------------------------------------------------------------------------------------------------------- |
| ts        | String | Opening time of the candlestick, Unix timestamp format in milliseconds, e.g. 1597026383085                                        |
| o         | String | Open price                                                                                                                        |
| h         | String | Highest price                                                                                                                     |
| l         | String | Lowest price                                                                                                                      |
| c         | String | Close price                                                                                                                       |
| vol       | String | Trading volume                                                                                                                    |
| confirm   | String | The state of candlesticks.<br><code>0</code> represents that it is uncompleted<br><code>1</code> represents that it is completed. |

The data returned will be arranged in an array like this:
\[ts,o,h,l,c,vol,confirm\]

---

### Cancel All After [🔗](https://www.okx.com/docs-v5/en/#spread-trading-rest-api-cancel-all-after "Direct link to: https://www.okx.com/docs-v5/en/#spread-trading-rest-api-cancel-all-after")

Cancel all pending orders after the countdown timeout. Only applicable to spread
trading.

#### Rate Limit: 1 request per second

#### Rate limit rule: User ID

#### Permission: Trade

#### HTTP Request

`POST /api/v5/sprd/cancel-all-after`

#### Request Parameters

| Parameter | Type   | Required | Description                                                                                                                                              |
| --------- | ------ | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| timeOut   | String | Yes      | The countdown for order cancellation, with second as the unit.<br>Range of value can be 0, [10, 120].<br>Setting timeOut to 0 disables Cancel All After. |

#### Response Parameters

| Parameter   | Type   | Description                                                                                  |
| ----------- | ------ | -------------------------------------------------------------------------------------------- |
| triggerTime | String | The time the cancellation is triggered.<br>triggerTime=0 means Cancel All After is disabled. |
| ts          | String | The time the request is received.                                                            |

Users are recommended to send a request to the exchange every second. When the
cancel all after is triggered, the trading engine will cancel orders on behalf
of the client one by one and this operation may take up to a few seconds. This
feature is intended as a protection mechanism for clients only and clients
should not use this feature as part of their trading strategies.

---

### WS / Place order [🔗](https://www.okx.com/docs-v5/en/#spread-trading-websocket-trade-api-ws-place-order "Direct link to: https://www.okx.com/docs-v5/en/#spread-trading-websocket-trade-api-ws-place-order")

You can place an order only if you have sufficient funds.

#### URL Path

/ws/v5/business (required login)

#### Rate Limit: 20 requests per 2 seconds

#### Rate limit rule: User ID

Rate limit is shared with the Nitro Spread \`Place order\` REST API endpoints

#### Request Parameters

| Parameter    | Type             | Required | Description                                                                                                                                                                                                                                   |
| ------------ | ---------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id           | String           | Yes      | Unique identifier of the message provided by client. It will be returned in response message for identifying the corresponding request.<br>A combination of case-sensitive alphanumerics, all numbers, or all letters of up to 32 characters. |
| op           | String           | Yes      | Operation<br><code>sprd-order</code>                                                                                                                                                                                                          |
| args         | Array of objects | Yes      | Request parameters                                                                                                                                                                                                                            |
| &gt; sprdId  | String           | Yes      | spread ID, e.g. BTC-USDT_BTC-USD-SWAP                                                                                                                                                                                                         |
| &gt; clOrdId | String           | No       | Client Order ID as assigned by the client<br>A combination of case-sensitive alphanumerics, all numbers, or all letters of up to 32 characters.                                                                                               |
| &gt; tag     | String           | No       | Order tag<br>A combination of case-sensitive alphanumerics, all numbers, or all letters of up to 16 characters.                                                                                                                               |
| &gt; side    | String           | Yes      | Order side<br><code>buy</code><br><code>sell</code>                                                                                                                                                                                           |
| &gt; ordType | String           | Yes      | Order type:<br><code>market</code>: Market order<br><code>limit</code>: Limit order<br><code>post_only</code>: Post-only order<br><code>ioc</code>: Immediate-or-cancel order                                                                 |
| &gt; sz      | String           | Yes      | Quantity to buy or sell                                                                                                                                                                                                                       |
| &gt; px      | String           | Yes      | Order price. Only applicable to <code>limit, post_only, ioc</code> order.                                                                                                                                                                     |

#### Response Parameters

| Parameter    | Type             | Description                                      |
| ------------ | ---------------- | ------------------------------------------------ |
| id           | String           | Unique identifier of the message                 |
| op           | String           | Operation                                        |
| code         | String           | Error Code                                       |
| msg          | String           | Error message                                    |
| data         | Array of objects | Data                                             |
| &gt; ordId   | String           | Order ID                                         |
| &gt; clOrdId | String           | Client Order ID as assigned by the client        |
| &gt; tag     | String           | Order tag                                        |
| &gt; sCode   | String           | Order status code, <code>0</code> means success  |
| &gt; sMsg    | String           | Rejection or success message of event execution. |

clOrdId  
clOrdId is a user-defined unique ID used to identify the order. It will be
included in the response parameters if you have specified during order
submission, and can be used as a request parameter to the endpoints to query,
cancel and amend orders.  
clOrdId must be unique among the clOrdIds of all pending orders.

---

### WS / Amend order [🔗](https://www.okx.com/docs-v5/en/#spread-trading-websocket-trade-api-ws-amend-order "Direct link to: https://www.okx.com/docs-v5/en/#spread-trading-websocket-trade-api-ws-amend-order")

Amend an incomplete order.

#### URL Path

/ws/v5/business (required login)

#### Rate Limit: 20 requests per 2 seconds

#### Rate limit rule: User ID

Rate limit is shared with the \`Amend order\` REST API endpoints

#### Request Parameters

| Parameter    | Type             | Required    | Description                                                                                                                                                                                                                                     |
| ------------ | ---------------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id           | String           | Yes         | Unique identifier of the messageProvided by client.<br>It will be returned in response message for identifying the corresponding request.<br>A combination of case-sensitive alphanumerics, all numbers, or all letters of up to 32 characters. |
| op           | String           | Yes         | Operation<br><code>sprd-amend-order</code>                                                                                                                                                                                                      |
| args         | Array of objects | Yes         | Request Parameters                                                                                                                                                                                                                              |
| &gt; ordId   | String           | Conditional | Order ID<br>Either <code>ordId</code> or <code>clOrdId</code> is required, if both are passed, <code>ordId</code> will be used.                                                                                                                 |
| &gt; clOrdId | String           | Conditional | Client Order ID as assigned by the client                                                                                                                                                                                                       |
| &gt; reqId   | String           | No          | Client Request ID as assigned by the client for order amendment<br>A combination of case-sensitive alphanumerics, all numbers, or all letters of up to 32 characters.                                                                           |
| &gt; newSz   | String           | Conditional | New quantity after amendment.<br>Either <code>newSz</code> or <code>newPx</code> is required. When amending a partially-filled order, the newSz should include the amount that has been filled and failed.                                      |
| &gt; newPx   | String           | Conditional | New price after amendment.                                                                                                                                                                                                                      |

#### Response Parameters

| Parameter    | Type             | Description                                                     |
| ------------ | ---------------- | --------------------------------------------------------------- |
| id           | String           | Unique identifier of the message                                |
| op           | String           | Operation                                                       |
| code         | String           | Error Code                                                      |
| msg          | String           | Error message                                                   |
| data         | Array of objects | Data                                                            |
| &gt; ordId   | String           | Order ID                                                        |
| &gt; clOrdId | String           | Client Order ID as assigned by the client                       |
| &gt; reqId   | String           | Client Request ID as assigned by the client for order amendment |
| &gt; sCode   | String           | Order status code, 0 means success                              |
| &gt; sMsg    | String           | Order status message                                            |

newSz  
If the new quantity of the order is less than or equal to the (accFillSz +
canceledSz + pendingSettleSz), after pendingSettleSz is settled, the order
status will be transitioned into filled (if canceledSz = 0), or canceled (if
canceledSz > 0).

The amend order returns sCode equal to 0  
It is not strictly considered that the order has been amended. It only means
that your amend order request has been accepted by the system server. The result
of the amend is subject to the status pushed by the order channel or the order
status query.

---

### WS / Cancel order [🔗](https://www.okx.com/docs-v5/en/#spread-trading-websocket-trade-api-ws-cancel-order "Direct link to: https://www.okx.com/docs-v5/en/#spread-trading-websocket-trade-api-ws-cancel-order")

Cancel an incomplete order

#### URL Path

/ws/v5/business (required login)

#### Rate Limit: 20 requests per 2 seconds

#### Rate limit rule: User ID

Rate limit is shared with the Nitro Spread \`Cancel order\` REST API endpoints

#### Request Parameters

| Parameter    | Type             | Required    | Description                                                                                                                                                                                                                                   |
| ------------ | ---------------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id           | String           | Yes         | Unique identifier of the message provided by client. It will be returned in response message for identifying the corresponding request.<br>A combination of case-sensitive alphanumerics, all numbers, or all letters of up to 32 characters. |
| op           | String           | Yes         | Operation<br><code>sprd-cancel-order</code>                                                                                                                                                                                                   |
| args         | Array of objects | Yes         | Request Parameters                                                                                                                                                                                                                            |
| &gt; ordId   | String           | Conditional | Order ID<br>Either ordId or clOrdId is required, if both are passed, ordId will be used                                                                                                                                                       |
| &gt; clOrdId | String           | Conditional | Client Order ID as assigned by the client<br>A combination of case-sensitive alphanumerics, all numbers, or all letters of up to 32 characters.                                                                                               |

#### Response Parameters

| Parameter    | Type             | Description                                     |
| ------------ | ---------------- | ----------------------------------------------- |
| id           | String           | Unique identifier of the message                |
| op           | String           | Operation                                       |
| code         | String           | Error Code                                      |
| msg          | String           | Error message                                   |
| data         | Array of objects | Data                                            |
| &gt; ordId   | String           | Order ID                                        |
| &gt; clOrdId | String           | Client Order ID as assigned by the client       |
| &gt; sCode   | String           | Order status code, <code>0</code> means success |
| &gt; sMsg    | String           | Order status message                            |

Cancel order returns with sCode equal to 0. It is not strictly considered that
the order has been canceled. It only means that your cancellation request has
been accepted by the system server. The result of the cancellation is subject to
the state pushed by the sprd-orders channel or the get order state.

---

### WS / Cancel all orders [🔗](https://www.okx.com/docs-v5/en/#spread-trading-websocket-trade-api-ws-cancel-all-orders "Direct link to: https://www.okx.com/docs-v5/en/#spread-trading-websocket-trade-api-ws-cancel-all-orders")

#### URL Path

/ws/v5/business (required login)

#### Rate Limit: 5 requests per 2 seconds

#### Rate limit rule: User ID

#### Request Parameters

| Parameter   | Type             | Required | Description                                                                                                                                                                                                                               |
| ----------- | ---------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id          | String           | Yes      | Unique identifier of the message provided by client. It will be returned in response message to identify the corresponding request.<br>A combination of case-sensitive alphanumerics, all numbers, or all letters of up to 32 characters. |
| op          | String           | Yes      | Operation<br><code>sprd-mass-cancel</code>                                                                                                                                                                                                |
| args        | Array of objects | Yes      | Request parameters                                                                                                                                                                                                                        |
| &gt; sprdId | String           | No       | spread ID                                                                                                                                                                                                                                 |

#### Response Parameters

| Parameter   | Type             | Description                                                 |
| ----------- | ---------------- | ----------------------------------------------------------- |
| id          | String           | Unique identifier of the message                            |
| op          | String           | Operation                                                   |
| code        | String           | Error Code                                                  |
| msg         | String           | Error message                                               |
| data        | Array of objects | Data                                                        |
| &gt; result | Boolean          | Result of the request <code>true</code>, <code>false</code> |

---

### Order channel [🔗](https://www.okx.com/docs-v5/en/#spread-trading-websocket-private-channel-order-channel "Direct link to: https://www.okx.com/docs-v5/en/#spread-trading-websocket-private-channel-order-channel")

Retrieve order information from the `sprd-order` Websocket channel. Data will
not be pushed when first subscribed. Data will only be pushed when triggered by
events such as placing/canceling order.

#### URL Path

/ws/v5/business (required login)

#### Request Parameters

| Parameter    | Type             | Required | Description                                                                                                                                                                                                                                      |
| ------------ | ---------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| id           | String           | No       | Unique identifier of the message<br>Provided by client. It will be returned in response message for identifying the corresponding request.<br>A combination of case-sensitive alphanumerics, all numbers, or all letters of up to 32 characters. |
| op           | String           | Yes      | Operation<br><code>subscribe</code><br><code>unsubscribe</code><br>                                                                                                                                                                              |
| args         | Array of objects | Yes      | List of subscribed channels                                                                                                                                                                                                                      |
| &gt; channel | String           | Yes      | Channel name<br><code>sprd-orders</code>                                                                                                                                                                                                         |
| &gt; sprdId  | String           | No       | Spread ID                                                                                                                                                                                                                                        |

#### Response parameters

| Parameter    | Required | Type   | Description                                                                       |
| ------------ | -------- | ------ | --------------------------------------------------------------------------------- |
| id           | String   | No     | Unique identifier of the message                                                  |
| event        | Yes      | String | Event<br><code>subscribe</code><br><code>unsubscribe</code><br><code>error</code> |
| arg          | No       | Object | Subscribed channel                                                                |
| &gt; channel | Yes      | String | Channel name                                                                      |
| &gt; sprdId  | No       | String | Spread ID                                                                         |
| code         | No       | String | Error code                                                                        |
| msg          | No       | String | Error message                                                                     |
| connId       | String   | Yes    | WebSocket connection ID                                                           |

#### Push data parameters

| **Parameter**        | **Type**         | **Description**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| -------------------- | ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| arg                  | Object           | Successfully subscribed channel                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| &gt; channel         | String           | Channel name                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| &gt; uid             | String           | User Identifier                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| &gt; sprdId          | String           | spread ID                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| data                 | Array of objects | Subscribed data                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| &gt; sprdId          | String           | spread ID, e.g.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| &gt; ordId           | String           | Order ID                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| &gt; clOrdId         | String           | Client Order ID as assigned by the client                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| &gt; tag             | String           | Order tag                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| &gt; px              | String           | Order price                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| &gt; sz              | String           | The original order quantity, in the unit of szCcy                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| &gt; ordType         | String           | Order type<br><code>market</code>: Market order<br><code>limit</code>: limit order<br><code>post_only</code>: Post-only order<br><code>ioc</code>: Immediate-or-cancel order                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| &gt; side            | String           | Order side, buy sell                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| &gt; fillSz          | String           | Last trade quantity, only applicable to order updates representing successful settlement                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| &gt; fillPx          | String           | Last trade price, only applicable to order updates representing successful settlement                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| &gt; tradeId         | String           | Last trade ID                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| &gt; accFillSz       | String           | Accumulated fill quantity                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| &gt; pendingFillSz   | String           | Quantity still remaining to be filled                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| &gt; pendingSettleSz | String           | Quantity that's pending settlement                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| &gt; canceledSz      | String           | Quantity canceled due order cancellations or trade rejections                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| &gt; avgPx           | String           | Average filled price. If none is filled, it will return "0".                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| &gt; state           | String           | Order state:<br><code>canceled</code><br><code>live</code><br><code>partially_filled</code><br><code>filled</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| &gt; cancelSource    | String           | Source of the order cancellation.Valid values and the corresponding meanings are:<br><code>0</code>: Order canceled by system<br><code>1</code>: Order canceled by user<br><code>14</code>: Order canceled: IOC order was partially canceled due to incompletely filled<br><code>15</code>: Order canceled: The order price is beyond the limit<br><code>20</code>: Cancel all after triggered<br><code>31</code>: The post-only order will take liquidity in maker orders<br><code>32</code>: Self trade prevention<br><code>34</code>: Order failed to settle due to insufficient margin<br><code>35</code>: Order cancellation due to insufficient margin from another order<br><code>44</code>: Your order was canceled because your available balance of this crypto was insufficient for auto conversion. Auto conversion was triggered when the total collateralized liabilities for this crypto reached the platform’s risk control limit. |
| &gt; uTime           | String           | Update time, Unix timestamp format in milliseconds, e.g. 1597026383085                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| &gt; cTime           | String           | Creation time, Unix timestamp format in milliseconds, e.g. 1597026383085                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| &gt; code            | String           | Error Code, the default is 0                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| &gt; msg             | String           | Error Message, the default is ""                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| &gt; reqId           | String           | Client Request ID as assigned by the client for order amendment. "" will be returned if there is no order amendment.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| &gt; amendResult     | String           | The result of amending the order<br><code>-1</code>: failure<br><code>0</code>: success<br>"" will be returned if there is no order amendment.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |

---

### Trades channel [🔗](https://www.okx.com/docs-v5/en/#spread-trading-websocket-private-channel-trades-channel "Direct link to: https://www.okx.com/docs-v5/en/#spread-trading-websocket-private-channel-trades-channel")

All updates relating to User's Trades are sent through the `sprd-trades`
WebSocket Notifications channel.

This is a private channel and consumable solely by the authenticated user.

Updates received through the `sprd-trades` WebSocket Notification channel can
include Trades being `filled` or `rejected`.

You may receive multiple notifications if an Order of yours interacts with more
than one other Order.

#### URL Path

/ws/v5/business (required login)

#### Request Parameters

| Parameter    | Type             | Required | Description                                                                                                                                                                                                                                      |
| ------------ | ---------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| id           | String           | No       | Unique identifier of the message<br>Provided by client. It will be returned in response message for identifying the corresponding request.<br>A combination of case-sensitive alphanumerics, all numbers, or all letters of up to 32 characters. |
| op           | String           | Yes      | Operation<br><code>subscribe</code><br><code>unsubscribe</code><br>                                                                                                                                                                              |
| args         | Array of objects | Yes      | List of subscribed channels                                                                                                                                                                                                                      |
| &gt; channel | String           | Yes      | Channel name<br><code>sprd-trades</code>                                                                                                                                                                                                         |
| &gt; sprdId  | String           | No       | Spread ID                                                                                                                                                                                                                                        |

#### Response parameters

| Parameter    | Type   | Required | Description                                                                       |
| ------------ | ------ | -------- | --------------------------------------------------------------------------------- |
| id           | String | No       | Unique identifier of the message                                                  |
| event        | String | Yes      | Event<br><code>subscribe</code><br><code>unsubscribe</code><br><code>error</code> |
| arg          | Object | No       | Subscribed channel                                                                |
| &gt; channel | String | Yes      | Channel name                                                                      |
| &gt; sprdId  | String | No       | Spread ID                                                                         |
| code         | String | No       | Error code                                                                        |
| msg          | String | No       | Error message                                                                     |
| connId       | String | Yes      | WebSocket connection ID                                                           |

#### Push Data Parameters

| **Parameter**    | **Type**         | **Description**                                                                                                                    |
| ---------------- | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| arg              | Object           | Successfully subscribed channel                                                                                                    |
| &gt; channel     | String           | Channel name                                                                                                                       |
| &gt; uid         | String           | User Identifier                                                                                                                    |
| &gt; sprdId      | String           | spread ID                                                                                                                          |
| data             | Array of objects | Subscribed data                                                                                                                    |
| &gt; sprdId      | String           | spread ID                                                                                                                          |
| &gt; tradeId     | String           | Trade ID                                                                                                                           |
| &gt; ordId       | String           | Order ID                                                                                                                           |
| &gt; clOrdId     | String           | Client Order ID as assigned by the client                                                                                          |
| &gt; tag         | String           | Order tag                                                                                                                          |
| &gt; fillPx      | String           | Last filled price                                                                                                                  |
| &gt; fillSz      | String           | Last filled quantity                                                                                                               |
| &gt; side        | String           | Order side, buy sell                                                                                                               |
| &gt; state       | String           | Trade state. Valid values are filled and rejected                                                                                  |
| &gt; execType    | String           | Liquidity taker or maker<br><code>T</code>: taker<br><code>M</code>: maker                                                         |
| &gt;ts           | String           | Data generation time, Unix timestamp format in milliseconds, e.g. 1597026383085.                                                   |
| &gt; legs        | Array of objects | Legs of trade                                                                                                                      |
| &gt;&gt; instId  | String           | Instrument ID, e.g. BTC-USDT-SWAP                                                                                                  |
| &gt;&gt; px      | String           | The price the leg executed                                                                                                         |
| &gt;&gt; sz      | String           | Size of the leg in contracts or spot.                                                                                              |
| &gt;&gt; szCont  | String           | Filled amount of the contract<br>Only applicable to contracts, return "" for spot                                                  |
| &gt;&gt; side    | String           | The direction of the leg. Valid value can be <code>buy</code> or <code>sell</code>.                                                |
| &gt;&gt; fillPnl | String           | Last filled profit and loss, applicable to orders which have a trade and aim to close position. It always is 0 in other conditions |
| &gt;&gt; fee     | String           | Fee. Negative number represents the user transaction fee charged by the platform. Positive number represents rebate.               |
| &gt;&gt; feeCcy  | String           | Fee currency                                                                                                                       |
| &gt;&gt; tradeId | String           | Traded ID in the OKX orderbook.                                                                                                    |
| &gt; code        | String           | Error Code, the default is 0                                                                                                       |
| &gt; msg         | String           | Error Message, the default is ""                                                                                                   |

---

### Order book channel [🔗](https://www.okx.com/docs-v5/en/#spread-trading-websocket-public-channel-order-book-channel "Direct link to: https://www.okx.com/docs-v5/en/#spread-trading-websocket-public-channel-order-book-channel")

Retrieve order book data. Available channels:

- `sprd-bbo-tbt`: 1 depth level snapshot will be pushed in the initial push.
  Snapshot data will be pushed every 10 ms when there are changes in the 1 depth
  level snapshot.
- `sprd-books5`: 5 depth levels snapshot will be pushed in the initial push.
  Snapshot data will be pushed every 100 ms when there are changes in the 5
  depth levels snapshot.
- `sprd-books-l2-tbt`: 400 depth levels will be pushed in the initial full
  snapshot. Incremental data will be pushed every 10 ms for the changes in the
  order book during that period of time.
- The push sequence for order book channels within the same connection and
  trading symbols is fixed as: sprd-bbo-tbt -> sprd-books-l2-tbt -> sprd-books5.

#### URL Path

/ws/v5/business

#### Request Parameters

| Parameter    | Type             | Required | Description                                                                                                                                                                                                                                      |
| ------------ | ---------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| id           | String           | No       | Unique identifier of the message<br>Provided by client. It will be returned in response message for identifying the corresponding request.<br>A combination of case-sensitive alphanumerics, all numbers, or all letters of up to 32 characters. |
| op           | String           | Yes      | Operation<br><code>subscribe</code><br><code>unsubscribe</code><br>                                                                                                                                                                              |
| args         | Array of objects | Yes      | List of subscribed channels<br><code>sprd-bbo-tbt</code><br><code>sprd-books5</code><br><code>sprd-books-l2-tbt</code>                                                                                                                           |
| &gt; channel | String           | Yes      | Channel name                                                                                                                                                                                                                                     |
| &gt; sprdId  | String           | Yes      | spread ID                                                                                                                                                                                                                                        |

#### Response parameters

| Parameter    | Type   | Required | Description                                                                                                    |
| ------------ | ------ | -------- | -------------------------------------------------------------------------------------------------------------- |
| id           | String | No       | Unique identifier of the message                                                                               |
| event        | String | Yes      | Event<br><code>subscribe</code><br><code>unsubscribe</code><br><code>error</code>                              |
| arg          | Object | No       | Subscribed channels<br><code>sprd-bbo-tbt</code><br><code>sprd-books5</code><br><code>sprd-books-l2-tbt</code> |
| &gt; channel | String | Yes      | Channel name                                                                                                   |
| &gt; sprdId  | String | Yes      | spread ID                                                                                                      |
| msg          | String | No       | Error message                                                                                                  |
| code         | String | No       | Error code                                                                                                     |
| connId       | String | Yes      | WebSocket connection ID                                                                                        |

#### Push data parameters

| Parameter      | Type             | Description                                                                                                             |
| -------------- | ---------------- | ----------------------------------------------------------------------------------------------------------------------- |
| arg            | Object           | Successfully subscribed channel                                                                                         |
| &gt; channel   | String           | Channel name                                                                                                            |
| &gt; sprdId    | String           | spread ID                                                                                                               |
| action         | String           | Push data action, incremental data or full snapshot.<br><code>snapshot</code>: full<br><code>update</code>: incremental |
| data           | Array of objects | Subscribed data                                                                                                         |
| &gt; asks      | Array of strings | Order book on sell side                                                                                                 |
| &gt; bids      | Array of strings | Order book on buy side                                                                                                  |
| &gt; ts        | String           | Order book generation time, Unix timestamp format in milliseconds, e.g. 1597026383085                                   |
| &gt; checksum  | Integer          | Checksum, implementation details below. Only applicable to&nbsp;<code>sprd-books-l2-tbt</code>.                         |
| &gt; prevSeqId | Integer          | Sequence ID of the last sent message. Only applicable to&nbsp;<code>sprd-books-l2-tbt</code>.                           |
| &gt; seqId     | Integer          | Sequence ID of the current message, implementation details below.                                                       |

An example of the array of asks and bids values: \["411.8", "10", "4"\]  
\- "411.8" is the depth price  
\- "10" is the quantity at the price (Unit: szCcy)  
\- "4" is the number of orders at the price.

#### Sequence ID

`seqId` is the sequence ID of the market data published. The set of sequence ID
received by users is the same if users are connecting to the same channel
through multiple websocket connections. Each `sprdId` has an unique set of
sequence ID. Users can use `prevSeqId` and `seqId` to build the message
sequencing for incremental order book updates. Generally the value of seqId is
larger than prevSeqId. The `prevSeqId` in the new message matches with `seqId`
of the previous message. The smallest possible sequence ID value is 0, except in
snapshot messages where the prevSeqId is always -1.

Exceptions:  
1\. If there are no updates to the depth for an extended period, OKX will send a
message with `'asks': [], 'bids': []` to inform users that the connection is
still active. `seqId` is the same as the last sent message and `prevSeqId`
equals to `seqId`. 2. The sequence number may be reset due to maintenance, and
in this case, users will receive an incremental message with `seqId` smaller
than `prevSeqId`. However, subsequent messages will follow the regular
sequencing rule.

##### Example

1.  Snapshot message: prevSeqId = -1, seqId = 10
2.  Incremental message 1 (normal update): prevSeqId = 10, seqId = 15
3.  Incremental message 2 (no update): prevSeqId = 15, seqId = 15
4.  Incremental message 3 (sequence reset): prevSeqId = 15, seqId = 3
5.  Incremental message 4 (normal update): prevSeqId = 3, seqId = 5

#### Checksum

This mechanism can assist users in checking the accuracy of depth data.

##### Merging incremental data into full data

After subscribing to the incremental load push (such as `books` 400 levels) of
Order Book Channel, users first receive the initial full load of market depth.
After the incremental load is subsequently received, update the local full load.

1.  If there is the same price, compare the size. If the size is 0, delete this
    depth data. If the size changes, replace the original data.
2.  If there is no same price, sort by price (bid in descending order, ask in
    ascending order), and insert the depth information into the full load.

##### Calculate Checksum

Use the first 25 bids and asks in the full load to form a string (where a colon
connects the price and size in an ask or a bid), and then calculate the CRC32
value (32-bit signed integer).

---

### Public Trades channel [🔗](https://www.okx.com/docs-v5/en/#spread-trading-websocket-public-channel-public-trades-channel "Direct link to: https://www.okx.com/docs-v5/en/#spread-trading-websocket-public-channel-public-trades-channel")

Retrieve the recent trades data from `sprd-public-trades`. Data will be pushed
whenever there is a trade. Every update contains only one trade.

#### URL Path

/ws/v5/business

#### Request Parameters

| Parameter    | Type             | Required | Description                                                                                                                                                                                                                                      |
| ------------ | ---------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| id           | String           | No       | Unique identifier of the message<br>Provided by client. It will be returned in response message for identifying the corresponding request.<br>A combination of case-sensitive alphanumerics, all numbers, or all letters of up to 32 characters. |
| op           | String           | Yes      | Operation<br><code>subscribe</code><br><code>unsubscribe</code><br>                                                                                                                                                                              |
| args         | Array of objects | Yes      | List of subscribed channels                                                                                                                                                                                                                      |
| &gt; channel | String           | Yes      | Channel name<br><code>sprd-public-trades</code>                                                                                                                                                                                                  |
| &gt; sprdId  | String           | Yes      | spread ID                                                                                                                                                                                                                                        |

#### Response parameters

| Parameter    | Type   | Required | Description                                                                       |
| ------------ | ------ | -------- | --------------------------------------------------------------------------------- |
| id           | String | No       | Unique identifier of the message                                                  |
| event        | String | Yes      | Event<br><code>subscribe</code><br><code>unsubscribe</code><br><code>error</code> |
| arg          | Object | No       | Subscribed channel                                                                |
| &gt; channel | String | Yes      | Channel name                                                                      |
| &gt; sprdId  | String | Yes      | spread ID                                                                         |
| code         | String | No       | Error code                                                                        |
| msg          | String | No       | Error message                                                                     |
| connId       | String | Yes      | WebSocket connection ID                                                           |

#### Push data parameters

| **Parameter** | **Type**         | **Description**                                                                                                                                        |
| ------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| arg           | Object           | Successfully subscribed channel                                                                                                                        |
| &gt; channel  | String           | Channel name                                                                                                                                           |
| &gt; sprdId   | String           | spread ID                                                                                                                                              |
| data          | Array of objects | Subscribed data                                                                                                                                        |
| &gt; sprdId   | String           | spread ID, e.g.                                                                                                                                        |
| &gt; tradeId  | String           | Trade ID                                                                                                                                               |
| &gt; px       | String           | Trade price                                                                                                                                            |
| sz            | String           | Trade quantity<br>For spot trading, the unit is base currency<br>For <code>FUTURES</code>/<code>SWAP</code>/<code>OPTION</code>, the unit is contract. |
| &gt; side     | String           | Trade direction, buy, sell                                                                                                                             |
| &gt; ts       | String           | Filled time, Unix timestamp format in milliseconds, e.g. 1597026383085                                                                                 |

---

### Tickers channel [🔗](https://www.okx.com/docs-v5/en/#spread-trading-websocket-public-channel-tickers-channel "Direct link to: https://www.okx.com/docs-v5/en/#spread-trading-websocket-public-channel-tickers-channel")

Retrieve the last traded price, bid price, ask price. The fastest rate is 1
update/100ms. There will be no update if the event is not triggered. The events
which can trigger update: trade, the change on best ask/bid price

#### URL Path

/ws/v5/business

#### Request Parameters

| Parameter    | Type             | Required | Description                                                                                                                                                                                                                                      |
| ------------ | ---------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| id           | String           | No       | Unique identifier of the message<br>Provided by client. It will be returned in response message for identifying the corresponding request.<br>A combination of case-sensitive alphanumerics, all numbers, or all letters of up to 32 characters. |
| op           | String           | Yes      | Operation<br><code>subscribe</code><br><code>unsubscribe</code><br>                                                                                                                                                                              |
| args         | Array of objects | Yes      | List of subscribed channels                                                                                                                                                                                                                      |
| &gt; channel | String           | Yes      | Channel name<br><code>sprd-tickers</code>                                                                                                                                                                                                        |
| &gt; sprdId  | String           | Yes      | spread ID                                                                                                                                                                                                                                        |

#### Response parameters

| Parameter    | Type   | Required | Description                                                                       |
| ------------ | ------ | -------- | --------------------------------------------------------------------------------- |
| id           | String | No       | Unique identifier of the message                                                  |
| event        | String | Yes      | Event<br><code>subscribe</code><br><code>unsubscribe</code><br><code>error</code> |
| arg          | Object | No       | Subscribed channel                                                                |
| &gt; channel | String | Yes      | Channel name                                                                      |
| &gt; sprdId  | String | Yes      | spread ID                                                                         |
| code         | String | No       | Error code                                                                        |
| msg          | String | No       | Error message                                                                     |
| connId       | String | Yes      | WebSocket connection ID                                                           |

#### Push data parameters

| **Parameter** | **Type**         | **Description**                                                                        |
| ------------- | ---------------- | -------------------------------------------------------------------------------------- |
| arg           | Object           | Successfully subscribed channel                                                        |
| &gt; channel  | String           | Channel name                                                                           |
| &gt; sprdId   | String           | spread ID                                                                              |
| data          | Array of objects | Subscribed data                                                                        |
| &gt; sprdId   | String           | spread ID                                                                              |
| &gt; last     | String           | Last traded price                                                                      |
| &gt; lastSz   | String           | Last traded size                                                                       |
| &gt; askPx    | String           | Best ask price                                                                         |
| &gt; askSz    | String           | Best ask size                                                                          |
| &gt; bidPx    | String           | Best bid price                                                                         |
| &gt; bidSz    | String           | Best bid size                                                                          |
| &gt; open24h  | String           | Open price in the past 24 hours                                                        |
| &gt; high24h  | String           | Highest price in the past 24 hours                                                     |
| &gt; low24h   | String           | Lowest price in the past 24 hours                                                      |
| &gt; vol24h   | String           | 24h trading volume, with a unit of base currency or USD                                |
| &gt; ts       | String           | Ticker data generation time, Unix timestamp format in milliseconds, e.g. 1597026383085 |

vol24h  
For Spot vs USDT-margined contracts spread and USDT-margined contracts spread,
the volume is with the unit of base currency; for Crypto-margined contracts
spread, the volume is with the unit of USD.

---

### Candlesticks channel [🔗](https://www.okx.com/docs-v5/en/#spread-trading-websocket-public-channel-candlesticks-channel "Direct link to: https://www.okx.com/docs-v5/en/#spread-trading-websocket-public-channel-candlesticks-channel")

Retrieve the candlesticks data of an instrument. The push frequency is the
fastest interval 1 second push the data.

#### URL Path

/ws/v5/business

#### Request parameters

| Parameter    | Type             | Required | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| ------------ | ---------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id           | String           | No       | Unique identifier of the message<br>Provided by client. It will be returned in response message for identifying the corresponding request.<br>A combination of case-sensitive alphanumerics, all numbers, or all letters of up to 32 characters.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| op           | String           | Yes      | Operation, subscribe unsubscribe                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| args         | Array of objects | Yes      | List of subscribed channels                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| &gt; channel | String           | Yes      | Channel name<br><code>sprd-candle3M</code> <code>sprd-candle1M</code><br><code>sprd-candle1W</code><br><code>sprd-candle1D</code> <code>sprd-candle2D</code> <code>sprd-candle3D</code> <code>sprd-candle5D</code><br><code>sprd-candle12H</code> <code>sprd-candle6H</code> <code>sprd-candle4H</code> <code>sprd-candle2H</code> <code>sprd-candle1H</code><br><code>sprd-candle30m</code> <code>sprd-candle15m</code> <code>sprd-candle5m</code> <code>sprd-candle3m</code> <code>sprd-candle1m</code><br><code>sprd-candle3Mutc</code> <code>sprd-candle1Mutc</code> <code>sprd-candle1Wutc</code> <code>sprd-candle1Dutc</code> <code>sprd-candle2Dutc</code> <code>sprd-candle3Dutc</code> <code>sprd-candle5Dutc</code> <code>sprd-candle12Hutc</code> <code>sprd-candle6Hutc</code> |
| &gt; sprdId  | String           | Yes      | Spread ID                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |

#### Response parameters

| Parameter | Type   | Required | Description                        |
| --------- | ------ | -------- | ---------------------------------- |
| id        | String | No       | Unique identifier of the message   |
| event     | String | Yes      | Event, subscribe unsubscribe error |
| arg       | Object | No       | Subscribed channel                 |
| channel   | String | yes      | channel name                       |
| sprdId    | String | Yes      | Spread ID                          |
| code      | String | No       | Error code                         |
| msg       | String | No       | Error message                      |

#### Push data parameters

| Parameter    | Type            | Description                                                                                       |
| ------------ | --------------- | ------------------------------------------------------------------------------------------------- |
| arg          | Object          | Successfully subscribed channel                                                                   |
| &gt; channel | String          | Channel name                                                                                      |
| &gt; sprdId  | String          | Spread ID                                                                                         |
| data         | Array of Arrays | Subscribed data                                                                                   |
| &gt; ts      | String          | Opening time of the candlestick, Unix timestamp format in milliseconds, e.g. 1597026383085        |
| &gt; o       | String          | Open price                                                                                        |
| &gt; h       | String          | highest price                                                                                     |
| &gt; l       | String          | Lowest price                                                                                      |
| &gt; c       | String          | Close price                                                                                       |
| &gt; vol     | String          | Trading volume, in szCcy                                                                          |
| &gt; confirm | String          | The state of candlesticks.0 represents that it is uncompleted, 1 represents that it is completed. |

The data returned will be arranged in an array like this:
\[ts,o,h,l,c,vol,confirm\]

---
