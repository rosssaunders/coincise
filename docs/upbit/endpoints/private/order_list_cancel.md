# Order List Cancel

**Check the proper endpoint based on your region.**

The examples in this page is written using Singapore fiat code(SGD). Set the
quote currency to match your region. The base_url differs by country/region.
Make sure to specify the correct region value for your environment.

\- Singapore (sg): https://sg-api.upbit.com  
\- Indonesia (id): https://id-api.upbit.com  
\- Thailand (th): https://th-api.upbit.com

Cases Where Order Cancellation Requests May Be Rejected

Order cancellation requests may be rejected due to the following reasons:-
Orders that have already been fully executed and cannot be canceled

- Orders that have already been canceled
- Orders belonging to pairs for which service has been temporarily suspended due
  to reasons such as rebranding

This API supports only query parameter format.

All request parameters must be sent as query parameters. Form data or JSON
format in the request body is not supported.

`Example:` /v1/orders/uuids?uuids\[\]=1234567890&uuids\[\]=1234567891

When canceling orders, you must include either `uuid[]` or `identifier[]`.

Both parameters are optional individually, but at least one must be included to
specify the orders to cancel. You cannot use both parameters simultaneously.

Revision History

| Version | Date       | Changes                                                                                        |
| ------- | ---------- | ---------------------------------------------------------------------------------------------- |
| v1.1.9  | 2024-12-11 | [Addition of `Order List Cancel`](https://global-docs.upbit.com/changelog/new_delete_orders#/) |

Rate Limit

Up to 30 calls per second are allowed. This is measured on an account basis and
request counts are shared within the exchange 'default' group.

API Key Permission

This API requires [authentication](auth) and an API Key with the \[Make Orders\]
permission.  
If you encounter an out_of_scope error, please verify the permission settings in
the API Key Management page.

uuids\[\]

array of strings

List of order UUIDs  
The maximum number of orders that can be canceled is 20.  
When querying with two or more UUIDs, specify the query parameters as follows:

\[Example\] uuids\[\]=uuid1&uuids\[\]=uuid2…

uuids\[\]

ADD string

identifiers\[\]

array of strings

Client-specified identifiers for orders to cancel.  
The maximum number of orders that can be canceled is 20.  
When querying with two or more identifiers, specify the query parameters as
follows:

\[Example\] identifiers\[\]=id1&identifiers\[\]=id2…

identifiers\[\]

ADD string

#

200

List of canceled orders

object

success

object

required

Information about successfully canceled orders

count

number

required

Number of orders successfully cancelled.

orders

array of objects

required

List of successfully canceled orders

orders\*

object

uuid

string

required

Unique identifier for the order.

market

string

required

Trading pair code representing the market.

identifier

string

Order identifier specified by the client at order creation.

- identifier field is only provided for orders created on or after October
  18, 2024.

failed

object

required

Information about failed canceled orders

count

number

required

Number of orders that failed to cancel.

orders

array of objects

required

List of failed canceled orders

orders\*

object

uuid

string

required

Unique identifier for the order.

market

string

required

Trading pair code representing the market.

identifier

string

Order identifier specified by the client at order creation.

- identifier field is only provided for orders created on or after October
  18, 2024.

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

https://region\-api.upbit.com/v1/orders/uuids

xxxxxxxxxx

1

curl \--request DELETE \\

2

    \--url 'https://{region}-api.upbit.com/v1/orders/uuids?uuids\[\]=bbbb8e07-1689-4769-af3e-a117016623f8&uuids\[\]=4312ba49-5f1a-4a01-9f3b-2d2bce17267e&uuids\[\]=bdb49a54-de36-4eb4-a963-9c8d4337a9da' \\

3

    \--header 'Authorization: Bearer {JWT\_TOKEN}' \\

4

    \--header 'accept: application/json'

5

​

xxxxxxxxxx

24

1

{

2

"success": {

3

    "count": 2,

4

    "orders": \[

5

      {

6

        "uuid": "bbbb8e07-1689-4769-af3e-a117016623f8",

7

        "market": "SGD-ETH"

8

      },

9

      {

10

        "uuid": "4312ba49-5f1a-4a01-9f3b-2d2bce17267e",

11

        "market": "SGD-ETH"

12

      }

13

    \]

14

},

15

"failed": {

16

    "count": 1,

17

    "orders": \[

18

      {

19

        "uuid": "bdb49a54-de36-4eb4-a963-9c8d4337a9da",

20

        "market": "SGD-BTC"

21

      }

22

    \]

23

}

24

}

Updated 7 days ago

---

---

**Source:**
[order-list-cancel](https://global-docs.upbit.com/reference/order-list-cancel)
