# Cancel And New Order

**Check the proper endpoint based on your region.**

The examples in this page is written using Singapore fiat code(SGD). Set the quote currency to match your region. The base\_url differs by country/region. Make sure to specify the correct region value for your environment.  
  
\- Singapore (sg): https://sg-api.upbit.com  
\- Indonesia (id): https://id-api.upbit.com  
\- Thailand (th): https://th-api.upbit.com

### 

Modifiable Fields and Restrictions When Reordering

[](#modifiable-fields-and-restrictions-when-reordering)

-   New orders can only be created for the **same market and the same order side** as the original order; these cannot be changed
-   You may optionally set a new identifier (`new_identifier`), but the identifier used for the original order to be canceled **cannot be reused**.
-   order type(`new_ord_type`), volume(`new_volume`), price(`new_price`), self-matching prevention mode(`new_smp_type`), time in force(`new_time_in_force`) can be changed.
-   If the original order was partially filled, you can specify **"remain\_only"** in the "new\_volume" parameter to automatically set the new order volume to the remaining amount of the original order.

  

### 

Required Parameters by New Order Type

[](#required-parameters-by-new-order-type)

The mandatory parameters based on the new order type ("new\_ord\_type") are as follows..

| Order Type | Required Fields |
| --- | --- |
| Limit | `new_volume`, `new_price` |
| Price | `new_price` |
| Market | `new_volume` |
| Best Limit Buy | `new_price`, `new_time_in_force` |
| Best Limit Sell | `new_volume`, `new_time_in_force` |

For detailed parameter examples by order type, please refer to the [Create Order documentation](/reference/new-order).

  

### 

New Order Creation Conditions

[](#new-order-creation-conditions)

When making a request to this API, the new order is created only after the cancellation of the previous order has been completed. Even if the API request is successful, if the previous order is fully filled before the cancellation is finalized and thus cannot be canceled, the new order will not be created.

When making a cancel request, either "prev\_order\_uuid" or "prev\_order\_identifier" must be included.

Both parameters are optional; however, at least one must be included to specify the order to be canceled.

Form-based POST requests are no longer supported from March 1, 2022.

Due to the end of Form support, POST requests sent using URL-encoded Form data are no longer guaranteed to work properly. **Please ensure that the request body is sent** strictly in JSON format.

  

Revision History

| Version | Date | Changes |
| --- | --- | --- |
| v1.2.1 | 2025-07-02 | [Addition of `Self-Match Prevention (SMP)` feature](https://global-docs.upbit.com/changelog/smp#/) |
| v1.2.1 | 2025-07-02 | [Addition of `Post Only` order condition](https://global-docs.upbit.com/changelog/post_only#/) |
| v1.1.9 | 2025-02-05 | [Addition of `Cancel and New Order`](https://global-docs.upbit.com/changelog/cancel_and_new_oreder#/) |

Rate Limit

Up to 8 calls per second are allowed. This is measured on an account basis and request counts are shared within the exchange 'order' group.

  

API Key Permission

This API requires [authentication](auth) and an API Key with the \[Make Orders\] permission.  
If you encounter an out\_of\_scope error, please verify the permission settings in the API Key Management page.

prev\_order\_uuid

string

Unique identifier of the order to be cancelled.

prev\_order\_identifier

string

Client-specified identifier of the order to be cancelled.

new\_ord\_type

string

required

Type of the new order to be created.  
Enter one of the following values depending on the order type to be created.

-   `limit`: Limit buy/sell order
-   `price`: Market buy order
-   `market`: Market sell order
-   `best`: Best limit buy/sell order (The time\_in\_force field is required.)

new\_volume

string

New order quantity as a numeric string.  
If set to "remain\_only", the remaining quantity of the previous order will be used.

Required for:

-   Limit buy/sell (new\_ord\_type = "limit")
-   Market sell (new\_ord\_type = "market")
-   Best limit sell (previous order side = "ask" and new\_ord\_type = "best")

new\_price

string

New order unit price or total amount.  
entered as a numeric string based on the currency for purchase.

Required for:

-   Limit buy/sell (new\_ord\_type = "limit")
-   Market buy (new\_ord\_type = "price")
-   Best limit buy (previous order side = "bid" and new\_ord\_type = "best")

The price field is used for different purposes depending on the order type.

-   For limit orders, this field specifies the quote price.
-   For market buy and best limit buy, this field specifies the total purchase amount. The order will execute for the volume that fills this amount at market or best price.

new\_identifier

string

Client-specified identifier for the new order.  
Must be unique within all orders of the user's account.  
Once used, identifier values (including prev\_order\_identifier) cannot be reused.

new\_time\_in\_force

string

enum

Order execution policy.  
Order execution policy such as IOC (Immediate or Cancel), FOK (Fill or Kill), and Post Only can be specified.

For market orders (when the ord\_type field is set to "limit"), all options can be used optionally. For best bid/ask limit orders (when the ord\_type field is set to "best"), either "ioc" or "fok" must be specified. The available values are as follows:

-   ioc: Execute immediately for available quantity at the limit price; cancel the rest.
-   fok: Execute only if the full quantity can be filled at the limit price; otherwise cancel the order.
-   post\_only: Only add to the order book as maker; cancel if the order would execute as taker.

Allowed:

`ioc``fok``post_only`

new\_smp\_type

string

enum

Self-Match Prevention (SMP) mode for the new order.  
To prevent self-trading, where buy and sell orders created from the same account are executed during automated trading, the SMP mode can be set optionally. If the SMP mode set for the maker order differs from that of the taker order, the taker order’s mode will take precedence.

The available values are as follows:

-   cancel\_maker: Cancels the maker order. In other words, if the conditions for self-trading are met when placing a new order, the previously created order will be canceled to prevent execution.
-   cancel\_taker: Cancels the taker order. In other words, if the conditions for self-trading are met when placing a new order, the newly created order will be canceled to prevent execution.
-   reduce: When self-matching conditions are met upon new order creation, the order quantities of the existing and new orders are reduced to prevent matching. If the remaining quantity reaches zero, the order is canceled.

Allowed:

`reduce``cancel_maker``cancel_taker`

# 

201

Object of cancel-and-new order result

object

market

string

required

Trading pair code representing the market.

uuid

string

required

Unique identifier of the order to be canceled.

side

string

enum

required

Side of order to be canceled: "ask" (sell), "bid" (buy).

`ask` `bid`

ord\_type

string

enum

required

Order type to be canceled.

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

Order status to be canceled

-   `wait`: Waiting for execution
-   `watch`: Scheduled order
-   `done`: Execution completed
-   `cancel`: Order cancelled

`wait` `watch` `done` `cancel`

created\_at

string

required

Order creation time in UTC.

volume

string

Amount or quantity of the order to be canceled.

remaining\_volume

string

required

Remaining volume of the order to be canceled.

executed\_volume

string

required

Executed volume of the order to be canceled.

reserved\_fee

string

required

Fee amount reserved for the order to be canceled.

remaining\_fee

string

required

Remaining fee amount of the order to be canceled.

paid\_fee

string

required

Used fee of the order to be canceled

locked

string

required

Cost in use for the trade of the order to be canceled.

prevented\_volume

string

required

Quantity of the order to be canceled due to Self-Match Prevention.

prevented\_locked

string

required

Assets released from the order to be canceled due to Self-Match Prevention.  
Remaining assets from an order canceled due to the Self-Match Prevention setting.

-   For buy orders: Cancelled amount
-   For sell orders: Cancelled quantity

smp\_type

string

enum

Self-Match Prevention (SMP) mode applied in the response.

`reduce` `cancel_maker` `cancel_taker`

trades\_count

integer

required

Number of executions for the order to be canceled.

time\_in\_force

string

enum

Order execution policy as applied in the response.

`fok` `ioc` `post_only`

new\_order\_uuid

string

required

Unique identifier for the newly created order.

new\_order\_identifier

string

Client-specified identifier for the newly created order.

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

401

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

500

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

Updated 16 days ago

* * *

ShellPythonJavaNode

Base URL

https://region\-api.upbit.com/v1/orders/cancel\_and\_new

xxxxxxxxxx

14

1

curl \--request POST \\

2

  \--url 'https://{region}-api.upbit.com/v1/orders/cancel\_and\_new' \\

3

  \--header 'Authorization: Bearer {JWT\_TOKEN}' \\

4

  \--header 'Accept: application/json' \\

5

  \--header 'Content-Type: application/json' \\

6

  \--data '

7

{

8

"prev\_order\_uuid": "d098ceaf-6811-4df8-97f2-b7e01aefc03f",

9

"new\_ord\_type": "limit",

10

"new\_price": "153559",

11

"new\_volume": "1"

12

}

13

'

14

​

xxxxxxxxxx

20

1

{

2

  "uuid": "d098ceaf-6811-4df8-97f2-b7e01aefc03f",

3

  "side": "bid",

4

  "ord\_type": "limit",

5

  "price": "153559.00",

6

  "state": "wait",

7

  "market": "SGD-BTC",

8

  "created\_at": "2025-07-04T15:00:00",

9

  "volume": "1.0",

10

  "remaining\_volume": "1.0",

11

  "executed\_volume": "0",

12

  "reserved\_fee": "383.8975",

13

  "remaining\_fee": "383.8975",

14

  "paid\_fee": "0",

15

  "locked": "153942.8975",

16

  "prevented\_volume": "0",

17

  "prevented\_locked": "0",

18

  "trades\_count": 0,

19

  "new\_order\_uuid": "4b07aa31-4747-485c-8bce-ac5495e4a639"

20

}

Updated 16 days ago

* * *

---

**Source:** [cancel-and-new-order](https://global-docs.upbit.com/reference/cancel-and-new-order)
