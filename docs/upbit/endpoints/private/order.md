# Order

**Check the proper endpoint based on your region.**

The examples in this page is written using Singapore fiat code(SGD). Set the
quote currency to match your region. The base_url differs by country/region.
Make sure to specify the correct region value for your environment.

\- Singapore (sg): https://sg-api.upbit.com  
\- Indonesia (id): https://id-api.upbit.com  
\- Thailand (th): https://th-api.upbit.com

###

Order Type

[](#order-type)

The available order types are as follows.

####

Limit Order

[](#limit-order)

A limit order is a type of order that is executed only when the buy/sell price
set by the user or a more favorable price is reached. It allows control over the
upper and lower limits of the execution price; however, execution is not
guaranteed as the market price may not reach the specified limit price.

Limit buy/sell Order Parameter Guide

The table below provides an easy reference for the parameters available when
creating limit buy/sell order requests. For detailed explanations of each
parameter, please refer to the Request Body section below.

| Parameter     | Required | Description                                                                                                                                   |
| ------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| market        | Required | Trading pair code. Enter in the format `SGD-BTC`.                                                                                             |
| side          | Required | Enter `bid` for buy orders, `ask` for sell orders.                                                                                            |
| ord_type      | Required | `limit`                                                                                                                                       |
| volume        | Required | Order quantity. For example, entering 0.1 means buying/selling 0.1 units of the asset at the limit price.                                     |
| price         | Required | Order price based on the quote currency. For example, when buying/selling 1 BTC at 1000,000 SGD per BTC in the SGD-BTC market, enter 1000000. |
| time_in_force | Optional | `ioc`, `fok`, `post_only`. The post_only option cannot be used together with the smp_type option.                                             |
| smp_type      | Optional | Self-Match Prevention option. `cancel_maker`, `cancel_taker`, `reduce`.                                                                       |
| identifier    | Optional | User-defined order ID that can be used for querying or deleting orders.                                                                       |

####

Market Orders

[](#market-orders)

Market orders are order types that are executed immediately at the most
favorable current market price. While rapid execution is guaranteed, the
execution price may vary depending on market conditions.

Market Buy Order Parameter Guide

Refer to the table below to easily verify the parameters available when creating
a market buy order request. Do not include the `volume` parameter (either set
its value to null or omit the key entirely). For detailed explanations of each
parameter, see the Request Body section below.

| Parameter  | Required | Description                                                                                                                                         |
| ---------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| market     | Required | Pair code. Enter in the format `{Fiat}-BTC`.                                                                                                        |
| side       | Required | `bid`                                                                                                                                               |
| ord_type   | Required | `price`                                                                                                                                             |
| price      | Required | Total order amount based on the quote currency. For example, entering 1000000 in the SGD-BTC pair will buy BTC worth 1 million SGD at market price. |
| smp_type   | Optional | Self-Match Prevention option. `cancel_maker`, `cancel_taker`, `reduce`                                                                              |
| identifier | Optional | Custom order ID for query or cancellation.                                                                                                          |

Market Sell Order Parameter Guide

Refer to the table below to easily verify the parameters available when creating
a market sell order request. Do not include the `price` parameter (either set
its value to null or omit the key entirely). For detailed explanations of each
parameter, see the Request Body section below.

| Parameter  | Required | Description                                                                                           |
| ---------- | -------- | ----------------------------------------------------------------------------------------------------- |
| market     | Required | Pair code. Enter in the format `{Fiat}-BTC`.                                                          |
| side       | Required | `ask`                                                                                                 |
| ord_type   | Required | `market`                                                                                              |
| volume     | Required | Sell order quantity. For example, entering 0.1 in the SGD-BTC pair will sell 0.1 BTC at market price. |
| smp_type   | Optional | Self-Match Prevention option. `cancel_maker`, `cancel_taker`, `reduce`                                |
| identifier | Optional | Custom order ID for query or cancellation.                                                            |

####

Best Limit Orders

[](#best-limit-orders)

Best Limit orders are a type of order that uses the most favorable opposing
price currently available in the market. While complete execution is not always
guaranteed, this order type is useful when you want to quickly enter the order
book at the best possible price.

Best Buy Order Parameter Guide

Please refer to the table below to easily check the available parameters when
creating a best limit buy order request. The `volume` parameter is not provided
(either set to null or omitted). For detailed explanations of each parameter,
please refer to the Request Body section below.

| Parameter     | Required     | Description                                                                                                                                                                                                                                                                              |
| ------------- | ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| market        | Required     | Trading pair code. Enter in the format `SGD-BTC`.                                                                                                                                                                                                                                        |
| side          | Required     | `bid`                                                                                                                                                                                                                                                                                    |
| ord_type      | Required     | `best`                                                                                                                                                                                                                                                                                   |
| price         | Required     | Specifies the total order amount based on the quote asset. A buy order is created for the quantity equivalent to the specified amount at the best ask price. For example, in the SGD-BTC pair, specifying 1000000 creates a buy order for BTC worth 1,000,000 SGD at the best ask price. |
| time_in_force | **Required** | `ioc`, `fok`                                                                                                                                                                                                                                                                             |
| smp_type      | Optional     | Self-Match Prevention option. `cancel_maker`, `cancel_taker`, `reduce`                                                                                                                                                                                                                   |
| identifier    | Optional     | User-defined order ID for query or deletion.                                                                                                                                                                                                                                             |

Best Sell Order Parameter Guide

Please refer to the table below to easily check the available parameters when
creating a best limit sell order request. The `price` parameter is not provided
(either set to null or omitted). For detailed explanations of each parameter,
please refer to the Request Body section below.

| Parameter     | Required     | Description                                                                                                                |
| ------------- | ------------ | -------------------------------------------------------------------------------------------------------------------------- |
| market        | Required     | Pair code. Enter in the format `SGD-BTC`.                                                                                  |
| side          | Required     | `ask`                                                                                                                      |
| ord_type      | Required     | `best`                                                                                                                     |
| volume        | Required     | Sell order quantity. For example, entering 0.1 in the SGD-BTC pair creates an order to sell 0.1 BTC at the best ask price. |
| time_in_force | **Required** | `ioc`, `fok`                                                                                                               |
| smp_type      | Optional     | Self-Match Prevention option. `cancel_maker`, `cancel_taker`, `reduce`                                                     |
| identifier    | Optional     | User-defined order ID for query or deletion.                                                                               |

####

Order Execution Conditions (time_in_force)

[](#order-execution-conditions-time_in_force)

As an order option, this specifies how the order is handled depending on the
execution situation at the time of order creation.

Available Order Execution Condition (time_in_force) Options

| Option                        | Parameter Value | Description                                                                                                                                                                                                                                                                                                                                                             |
| ----------------------------- | --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **IOC (Immediate or Cancel)** | `ioc`           | Partially executes only the quantity immediately executable under limit order conditions, canceling the remaining quantity. **This option is available for Limit and Best Limit orders**.                                                                                                                                                                               |
| **FOK (Fill or Kill)**        | `fok`           | Executes the order only if the entire order quantity can be filled under limit order conditions; otherwise, cancels the entire order. **This option is available for Limit and Best Limit orders**.                                                                                                                                                                     |
| **Post Only**                 | `post_only`     | Cancels the order without execution if any portion or the entire order can be immediately filled under limit order conditions. The order is created only if it can become a maker order, preventing execution as a taker order. **This option is available only for Limit orders (ord_type=limit)** and **cannot be used with the Self-Match Prevention (SMP) option.** |

###

Self-Matching Prevention (SMP) Option

[](#self-matching-prevention-smp-option)

`smp_type` can be configured to enable the desired mode for preventing
self-matching of orders. For more details about SMP, please refer
[Self-Match Prevention](/docs/smp) page.

Available Self-Matching Prevention (SMP) Options

- If the SMP modes set for the maker and taker orders differ, the taker order
  mode will take precedence.
- When an order is created with an SMP mode, if an existing order or the new
  order is fully or partially canceled to prevent self-matching, the canceled
  order quantity and amount will be returned in the order creation response
  fields `prevented_volume` and `prevented_locked`.

| Option                    | Parameter Value | Description                                                                                                                                                                                                        |
| ------------------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Cancel Maker Order**    | `cancel_maker`  | Cancels the maker order. In other words, when self-matching conditions are met upon new order creation, the previously created order is canceled to prevent matching.                                              |
| **Cancel Taker Order**    | `cancel_taker`  | Cancels the taker order. That is, when self-matching conditions are met upon new order creation, the newly created order is canceled to prevent matching.                                                          |
| **Adjust Order Quantity** | `reduce`        | When self-matching conditions are met upon new order creation, the order quantities of the existing and new orders are reduced to prevent matching. If the remaining quantity reaches zero, the order is canceled. |

###

Asset Lock During Pending Order Execution

[](#asset-lock-during-pending-order-execution)

When an order is created, **the quote asset for buy orders or the base asset for
sell orders** involved in the order is immediately put into a locked state,
making it unavailable for other uses. This mechanism ensures that the user’s
balance remains valid at the time of order execution. You can check the locked
asset status by calling the [Get Account Balance API](/reference/get-balance).
The asset lock is maintained until one of the following conditions is met:

- The order is fully executed
- The order is canceled by the user
- `time_in_force` The order expires according to the time_in_force condition

**`Example`**: When creating a limit buy order in the SGD-BTC market, the
specified SGD amount remains locked until the order is executed.

###

Order Price Unit and Minimum Order Amount

[](#order-price-unit-and-minimum-order-amount)

The order price unit and minimum order amount available for use when placing an
order vary depending on the market (quote asset) and the base asset price.
Please refer to the guide below for market-specific price policies.

- [SGD, IDR, THB Market Order Price Unit](/docs/fiat-market-info)
- [BTC Market Order Price Unit](/docs/btc-market-info)
- [USDT Market Order Price Unit](/docs/usdt-market-info)

###

Identifier

[](#identifier)

This is a unique identifier assigned by the user’s client application to
identify the order, separate from the UUID used internally by the Upbit system
to uniquely identify the order. It is useful when you wish to manage (query and
cancel) orders based on a user-defined unique order ID scheme. Each order must
be assigned a value that is unique across all orders within the user’s account,
and once an identifier value has been used, it cannot be reused regardless of
whether the order was created or executed.

Form-based POST requests are no longer supported from March 1, 2022.

Due to the end of Form support, POST requests sent using URL-encoded Form data
are no longer guaranteed to work properly. **Please ensure that the request body
is sent** strictly in JSON format.

Revision History

| Version | Date       | Changes                                                                                            |
| ------- | ---------- | -------------------------------------------------------------------------------------------------- |
| v1.2.1  | 2025-07-02 | [Addition of `Self-Match Prevention (SMP)` feature](https://global-docs.upbit.com/changelog/smp#/) |
| v1.2.1  | 2025-07-02 | [Addition of `Post Only` order condition](https://global-docs.upbit.com/changelog/post_only#/)     |
| v1.1.9  | 2024-12-04 | [Addition of `identifier` field](https://global-docs.upbit.com/changelog/myorder_identifier#/)     |
| v1.1.1  | 2024-04-22 | [Addition of `ord_type: best,`                                                                     |

Addition of `time_in_force` parameter  
(All Markets)](https://global-docs.upbit.com/changelog/new_ord_type_expand#/) |
| v1.1.1 | 2024-04-04 | [Addition of `ord_type: best,`  
Addition of `time_in_force` parameter  
(BTC Market Upbit Indonesia and Thailand)](https://global-docs.upbit.com/changelog/ioc_fok_btc#/) |
| v1.1.1 | 2024-02-26 | [Addition of `ord_type: best,`  
Addition of `time_in_force` parameter  
(THB, IDR Market Upbit Indonesia and Thailand)](https://global-docs.upbit.com/changelog/id_th_iocfok_226#/) |
| v1.1.1 | 2023-10-27 | [Addition of `ord_type: best,`  
Addition of `time_in_force` parameter  
(Upbit Singapore only)](https://global-docs.upbit.com/changelog/sg_iocfok#/) |

Rate Limit

Up to 8 calls per second are allowed. Rate is measured per account and shared
within the 'order' group.

API Key Permission

This API requires [authentication](auth) and an API Key with the \[Order
Placement\] permission.  
If you encounter an out_of_scope error, please verify permission settings in the
API Key Management page.

market

string

required

Trading pair code for which the order will be created.

side

string

enum

required

Order side: "bid" for buy orders, "ask" for sell orders.

Allowed:

`ask``bid`

volume

string

Order quantity, as a numeric string.

Required for:

- Limit buy/sell (ord_type = "limit")
- Market sell (ord_type = "market")
- Best limit sell (side = "ask" and ord_type = "best")

price

string

Order unit price or total amount,  
entered as a numeric string based on the currency for purchase.

Required for:

- Limit buy/sell (ord_type = "limit")
- Market buy (ord_type = "price")
- Best limit buy (side = "bid" and ord_type = "best")

The price field is used for different purposes depending on the order type.

- For limit orders, this field specifies the quote price.
- For market buy and best limit buy, this field specifies the total purchase
  amount. The order will execute for the volume that fills this amount at market
  or best price.

ord_type

string

enum

Defaults to limit

Order type to create. Enter one of the following values depending on the order
type to be created.

- `limit`: Limit buy/sell order
- `price`: Market buy order
- `market`: Market sell order
- `best`: Best limit buy/sell order (The time_in_force field is required.)

Allowed:

`limit``price``market``best`

identifier

string

Client-specified order identifier.  
Each order must have a unique identifier within the user's account.  
Once used, an identifier value cannot be reused regardless of order creation or
execution.

time_in_force

string

enum

Order execution policy.  
Order execution policy such as IOC (Immediate or Cancel), FOK (Fill or Kill),
and Post Only can be specified.

For market orders (when the ord_type field is set to "limit"), all options can
be used optionally. For best bid/ask limit orders (when the ord_type field is
set to "best"), either "ioc" or "fok" must be specified. The available values
are as follows:

- `ioc`: Execute immediately for available quantity at the limit price; cancel
  the rest.
- `fok`: Execute only if the full quantity can be filled at the limit price;
  otherwise cancel the order.
- `post_only`: Only add to the order book as maker; cancel if the order would
  execute as taker.

Allowed:

`fok``ioc``post_only`

smp_type

string

enum

Self-Match Prevention (SMP) mode.  
The available values are as follows:

- `cancel_maker`: Cancel the maker order (existing order)
- `cancel_taker`: Cancel the taker order (new order)
- `reduce`: Reduce both order quantities to prevent self-trading; cancel the
  order if remaining quantity is 0

Allowed:

`cancel_maker``cancel_taker``reduce`

#

201

Object of created order

object

market

string

required

Trading pair code representing the market.

uuid

string

required

Unique identifier for the order.

side

string

enum

required

Order side: "ask" (sell), "bid" (buy).

`ask` `bid`

ord_type

string

enum

required

Order type.

`limit` `price` `market` `best`

price

string

Order unit price or total amount.  
For limit orders, this is the unit price.  
For market buy orders, this is the total purchase amount.

state

string

enum

required

Order status.

- `wait`: Waiting for execution
- `watch`: Scheduled order
- `done`: Execution completed
- `cancel`: Order cancelled

`wait` `watch` `done` `cancel`

created_at

string

required

Order creation time in UTC.

volume

string

Order request amount or quantity.

remaining_volume

string

required

Remaining order quantity after execution.

executed_volume

string

required

Executed order quantity.

reserved_fee

string

required

Fee amount reserved for the order.

remaining_fee

string

required

Remaining fee amount.

paid_fee

string

required

Fee amount paid at the time of execution.

locked

string

required

Amount or quantity locked by pending orders or trades.

trades_count

integer

required

Number of trades executed for the order.

time_in_force

string

enum

Order execution policy as applied in the response.

`fok` `ioc` `post_only`

identifier

string

Order identifier specified by the client at order creation.

- identifier field is only provided for orders created on or after October
  18, 2024.

smp_type

string

enum

Self-Match Prevention (SMP) mode applied in the response.

`reduce` `cancel_maker` `cancel_taker`

prevented_volume

string

required

Quantity cancelled due to Self-Match Prevention (SMP).  
Which prevents execution between orders from the same user.

prevented_locked

string

required

Assets released due to Self-Match Prevention (SMP). Remaining assets from an
order canceled due to the Self-Match Prevention setting.

- For buy orders: Cancelled amount
- For sell orders: Cancelled quantity

#

400

error object

object

error

object

name

string

required

Name identifying the error.

message

string

required

Message describing the cause of the error.

#

403

error object

object

error

object

name

string

required

Name identifying the error.

message

string

required

Message describing the cause of the error.

Updated 7 days ago

---

ShellPythonJavaNode

Base URL

https://region\-api.upbit.com/v1/orders

xxxxxxxxxx

15

1

curl \--request POST \\

2

\--url 'https://{region}-api.upbit.com/v1/orders' \\

3

\--header 'Authorization: Bearer {JWT_TOKEN}' \\

4

\--header 'Accept: application/json' \\

5

\--header 'Content-Type: application/json' \\

6

\--data '

7

{

8

"market":"SGD-BTC",

9

"side":"bid",

10

"volume":"1",

11

"price":"153559",

12

"ord_type":"limit"

13

}

14

'

15

​

xxxxxxxxxx

19

1

{

2

"uuid": "d098ceaf-6811-4df8-97f2-b7e01aefc03f",

3

"side": "bid",

4

"ord_type": "limit",

5

"price": "153559.00",

6

"state": "wait",

7

"market": "SGD-BTC",

8

"created_at": "2025-07-04T15:00:00",

9

"volume": "1.0",

10

"remaining_volume": "1.0",

11

"executed_volume": "0.0",

12

"reserved_fee": "383.8975",

13

"remaining_fee": "383.8975",

14

"paid_fee": "0",

15

"locked": "153942.8975",

16

"prevented_volume": "0",

17

"prevented_locked": "0",

18

"trades_count": 0

19

}

Updated 7 days ago

---

---

**Source:** [order](https://global-docs.upbit.com/reference/order)
