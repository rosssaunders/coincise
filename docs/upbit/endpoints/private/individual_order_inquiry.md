# Individual Order Inquiry

**Check the proper endpoint based on your region.**

The examples in this page is written using Singapore fiat code(SGD). Set the
quote currency to match your region. The base_url differs by country/region.
Make sure to specify the correct region value for your environment.

\- Singapore (sg): https://sg-api.upbit.com  
\- Indonesia (id): https://id-api.upbit.com  
\- Thailand (th): https://th-api.upbit.com

One of \`uuid\` or \`identifier\` must be included in the query request.

Although both parameters are optional, at least one must be included to specify
the order to be queried. If both \`uuid\` and \`identifier\` are provided, the
query will be based on the \`uuid\`.

Revision History

| Version | Date       | Changes                                                                                            |
| ------- | ---------- | -------------------------------------------------------------------------------------------------- |
| v1.2.1  | 2025-07-02 | [Addition of `Self-Match Prevention (SMP)` feature](https://global-docs.upbit.com/changelog/smp#/) |
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

Up to 30 calls per second are allowed. This is measured on an account basis and
request counts are shared within the exchange 'default' group.

API Key Permission

This API requires [authentication](auth), and an API Key with \[View Orders\]
permission must be used.  
If you encounter an out_of_scope error, please check the permission settings in
the API Key Management page.

uuid

string

Unique identifier(UUID) of the order to query

identifier

string

User-defined identifier of the order to query  
Used when querying by the order identifier assigned by the user or client at the
time of order creation.

#

200

Object of order

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

smp_type

string

enum

Self-Match Prevention (SMP) mode applied in the response.

`reduce` `cancel_maker` `cancel_taker`

prevented_volume

string

Quantity cancelled due to Self-Match Prevention (SMP).  
Which prevents execution between orders from the same user.

prevented_locked

string

required

Assets released due to Self-Match Prevention (SMP). Remaining assets from an
order canceled due to the Self-Match Prevention setting.

- For buy orders: Cancelled amount
- For sell orders: Cancelled quantity

identifier

string

Order identifier specified by the client at order creation.

- identifier field is only provided for orders created on or after October
  18, 2024.

trades_count

integer

required

Number of trades executed for the order.

trades

array of objects

required

List of trades

trades\*

object

market

string

required

Trading pair code representing the market.

uuid

string

required

Unique identifier for the trade.

price

string

required

Trade execution price.

volume

string

required

Trade execution quantity.

funds

string

required

Trade execution amount.

trend

string

enum

required

Trade price trend.

- `up`: Trade executed by "buy order"
- `down`: Trade executed by "sell order"

`up` `down`

created_at

string

required

Order creation time in UTC.

\[Format\] yyyy-MM-ddTHH:mm:ss.SSS

side

string

enum

required

Order side: "ask" (sell), "bid" (buy).

`ask` `bid`

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

number

required

Name identifying the error.

message

string

required

Message describing the cause of the error.

Updated 16 days ago

---

ShellPythonJavaNode

Base URL

https://region\-api.upbit.com/v1/order

xxxxxxxxxx

1

curl \--request GET \\

2

\--url
'https://{region}-api.upbit.com/v1/order?uuid=9ca023a5-851b-4fec-9f0a-48cd83c2eaae'
\\

3

\--header 'Authorization: Bearer {JWT_TOKEN}' \\

4

\--header 'accept: application/json'

5

​

xxxxxxxxxx

31

1

{

2

"market": "SGD-BTC",

3

"uuid": "9ca023a5-851b-4fec-9f0a-48cd83c2eaae",

4

"side": "ask",

5

"ord_type": "limit",

6

"price": "153559.00",

7

"state": "done",

8

"created_at": "2025-07-04T15:00:00",

9

"volume": "1.0",

10

"remaining_volume": "0",

11

"executed_volume": "1.0",

12

"reserved_fee": "0",

13

"remaining_fee": "0",

14

"paid_fee": "383.8975",

15

"locked": "0",

16

"prevented_volume": "0",

17

"prevented_locked": "0",

18

"trades_count": 1,

19

"trades": \[

20

    {

21

      "market": "SGD-BTC",

22

      "uuid": "9e8f8eba-7050-4837-8969-cfc272cbe083",

23

      "price": "153559.00",

24

      "volume": "1.0",

25

      "funds": "153559.00",

26

      "trend": "down",

27

      "created\_at": "2025-07-04T15:00:00",

28

      "side": "ask"

29

    }

30

\]

31

}

Updated 16 days ago

---

---

**Source:**
[individual-order-inquiry](https://global-docs.upbit.com/reference/individual-order-inquiry)
