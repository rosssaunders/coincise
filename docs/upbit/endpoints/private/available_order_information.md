# Available Order Information

**Check the proper endpoint based on your region.**

The examples in this page is written using Singapore fiat code(SGD). Set the
quote currency to match your region. The base_url differs by country/region.
Make sure to specify the correct region value for your environment.

\- Singapore (sg): https://sg-api.upbit.com  
\- Indonesia (id): https://id-api.upbit.com  
\- Thailand (th): https://th-api.upbit.com

The order availability information for a market includes the following key
fields.

| Key Items            | Related Response Fields |
| -------------------- | ----------------------- |
| Applicable Fee Rates | `bid_fee`,              |

`ask_fee`,  
`maker_bid_fee`,`maker_ask_fee` | | Supported Order Sides and Types |
`market.order_sides`,  
`market.bid_types`  
`market.ask_types` | | Base Asset, Quote Asset and  
Minimum/Maximum Order Amount | `market.bid`,  
`market.ask`,  
`market.max_total` | | Available Balances of  
Base Asset and Quote Asset | `bid_account`,`ask_account` |

`market.order_types` is deprecated.

The order_types field is planned to be deprecated. After deprecation, this field
will be removed from responses. If you are currently using this field, please
switch to the alternative fields `ask_types` and `bid_types`.

Revision History

| Version | Date       | Changes                        |
| ------- | ---------- | ------------------------------ |
| v1.1.1  | 2024-04-22 | [Addition of `ord_type: best,` |

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
(Upbit Singapore only)](https://global-docs.upbit.com/changelog/sg_iocfok#/) | |
v1.0.6 | 2022-10-14 | [Deprecation of `market.order_types,`  
Addition of `ask_types` and `bid_types` fields](https://global-docs.upbit.com/changelog/notice-changes-of-open-api-from-oct-14#/) |

Rate Limit

Up to 30 calls per second are allowed. This is measured on an account basis and
request counts are shared within the exchange 'default' group.

API Key Permission

This API requires [authentication](auth) and must use an API Key with the \[View
Orders\] permission enabled.  
If you encounter an out_of_scope permission error, please verify your API Key
permissions via the API Key Management page.

market

string

required

Trading pair code representing the market.

#

200

Object of order policy

array of objects

object

bid_fee

string

required

Fee rate applied to buy orders.

ask_fee

string

required

Fee rate applied to sell orders.

maker_bid_fee

string

required

Fee rate for buy maker orders.

maker_ask_fee

string

required

Fee rate for sell maker orders.

market

object

required

market object

bid_account

object

required

Quote Asset account information

bid_account object

ask_account

object

required

Base Asset account information

ask_account object

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

Updated 7 days ago

---

ShellPythonJavaNode

Base URL

https://region\-api.upbit.com/v1/orders/chance

xxxxxxxxxx

1

curl \--request GET \\

2

    \--url 'https://{region}-api.upbit.com/v1/orders/chance?market=SGD-BTC' \\

3

    \--header 'Authorization: Bearer {JWT\_TOKEN}' \\

4

    \--header 'accept: application/json'

5

​

xxxxxxxxxx

61

\]

1

\[

2

{

3

    "bid\_fee": "0.0025",

4

    "ask\_fee": "0.0025",

5

    "maker\_bid\_fee": "0.0025",

6

    "maker\_ask\_fee": "0.0025",

7

    "market": {

8

      "id": "SGD-BTC",

9

      "name": "BTC/SGD",

10

      "order\_types": \[

11

        "limit"

12

      \],

13

      "order\_sides": \[

14

        "ask",

15

        "bid"

16

      \],

17

      "bid\_types": \[

18

        "best\_fok",

19

        "best\_ioc",

20

        "limit",

21

        "limit\_fok",

22

        "limit\_ioc",

23

        "price"

24

      \],

25

      "ask\_types": \[

26

        "best\_fok",

27

        "best\_ioc",

28

        "limit",

29

        "limit\_fok",

30

        "limit\_ioc",

31

        "market"

32

      \],

33

      "bid": {

34

        "currency": "SGD",

35

        "min\_total": "1"

36

      },

37

      "ask": {

38

        "currency": "BTC",

39

        "min\_total": "1"

40

      },

41

      "max\_total": "1000000",

42

      "state": "active"

43

    },

44

    "bid\_account": {

45

      "currency": "SGD",

46

      "balance": "0",

47

      "locked": "0",

48

      "avg\_buy\_price": "0",

49

      "avg\_buy\_price\_modified": true,

50

      "unit\_currency": "SGD"

51

    },

52

    "ask\_account": {

53

      "currency": "BTC",

54

      "balance": "0",

55

      "locked": "0",

Updated 7 days ago

---

---

**Source:**
[available-order-information](https://global-docs.upbit.com/reference/available-order-information)
