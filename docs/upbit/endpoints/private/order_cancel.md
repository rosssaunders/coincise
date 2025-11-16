# Order Cancel

**Check the proper endpoint based on your region.**

The examples in this page is written using Singapore fiat code(SGD). Set the
quote currency to match your region. The base_url differs by country/region.
Make sure to specify the correct region value for your environment.

\- Singapore (sg): https://sg-api.upbit.com  
\- Indonesia (id): https://id-api.upbit.com  
\- Thailand (th): https://th-api.upbit.com

Either \`uuid\` or \`identifier\` must be included when canceling an order.

Both parameters are optional, but to specify the order to be canceled, at least
one of these parameters must be included. If both \`uuid\` and \`identifier\`
are provided, the cancellation will be based on the \`uuid\`.

Revision History

| Version | Date       | Changes                                                                                            |
| ------- | ---------- | -------------------------------------------------------------------------------------------------- |
| v1.2.1  | 2025-07-02 | [Addition of `Self-Match Prevention (SMP)` feature](https://global-docs.upbit.com/changelog/smp#/) |
| v1.1.9  | 2024-12-04 | [Addition of `identifier` field](https://global-docs.upbit.com/changelog/myorder_identifier#/)     |

Rate Limit

Up to 30 calls per second are allowed. This is measured on an account basis and
request counts are shared within the exchange 'default' group.

API Key Permission

This API requires [authentication](auth), and an API Key with the \[Make
Orders\] permission must be used.  
If you encounter an out_of_scope error, please check and adjust your permissions
in the API Key Management page.

uuid

string

required

Unique identifier(UUID) of the order to cancel

identifier

string

Client-assigned identifier of the order to be canceled.  
Used when canceling an order by the order identifier assigned by the user or
client at the time of order creation.

#

200

Object of canceled order

array of objects

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

- `limit`: Limit buy/sell order
- `price`: Market buy order
- `market`: Market sell order
- `best`: Best limit buy/sell order

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

`wait` `watch`

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

trades_count

integer

required

Number of trades executed for the order.

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

404

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

Updated 1 day ago

---

ShellPythonJavaNode

Base URL

https://region\-api.upbit.com/v1/order

xxxxxxxxxx

1

curl \--request DELETE \\

2

    \--url 'https://{region}-api.upbit.com/v1/order?uuid=cdd92199-2897-4e14-9448-f923320408ad' \\

3

    \--header 'Authorization: Bearer {JWT\_TOKEN}' \\

4

    \--header 'Accept: application/json'

5

​

xxxxxxxxxx

21

1

\[

2

{

3

    "uuid": "cdd92199-2897-4e14-9448-f923320408ad",

4

    "side": "bid",

5

    "ord\_type": "limit",

6

    "price": "153559.00",

7

    "state": "wait",

8

    "market": "SGD-BTC",

9

    "created\_at": "2025-07-04T15:00:00",

10

    "volume": "1.0",

11

    "remaining\_volume": "1.0",

12

    "executed\_volume": "0",

13

    "reserved\_fee": "383.8975",

14

    "remaining\_fee": "383.8975",

15

    "paid\_fee": "0",

16

    "locked": "153942.8975",

17

    "prevented\_volume": "0",

18

    "prevented\_locked": "0",

19

    "trades\_count": 0

20

}

21

\]

Updated 1 day ago

---

---

**Source:** [order-cancel](https://global-docs.upbit.com/reference/order-cancel)
