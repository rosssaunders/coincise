# Withdrawal List Inquiry

**Check the proper endpoint based on your region.**

The base_url differs by country/region. Make sure to specify the correct region
value for your environment.

\- Singapore (sg): https://sg-api.upbit.com  
\- Indonesia (id): https://id-api.upbit.com  
\- Thailand (th): https://th-api.upbit.com

You can set query parameters to retrieve a filtered list of withdrawals that
meet the specified conditions. Currency, withdrawal status, UUID list, or TXID
list can be used as filter parameters. If no conditions are specified, the API
returns the most recent 100 withdrawal records.

Revision History

| Version | Date       | Changes                                                                            |
| ------- | ---------- | ---------------------------------------------------------------------------------- |
| v1.0.7  | 2023-05-23 | [Addition of `net_type` field](https://global-docs.upbit.com/changelog/net_type#/) |

Rate Limit

Up to 30 calls per second are allowed. This is measured on an account basis and
request counts are shared within the exchange 'default' group.

API Key Permission

This API requires [authentication](auth) and an API Key with \[View
Withdrawals\] permission.  
If you receive an out_of_scope permission error, please verify your API Key
permissions in the API Key Management page.

currency

string

Currency code to filter withdrawal history. A filter parameter used to narrow
down results by currency code. if not provided, returns the latest withdrawals
across all currencies.

state

string

Withdrawal processing status to be queried.  
A filter parameter used to limit the query target by withdrawal processing
status. Only withdrawal information with the specified status will be returned
in the response.

The available values are as follows:

- `WAITING`: Waiting
- `PROCESSING`: Processing
- `DONE`: Completed
- `FAILED`: Failed
- `CANCELLED`: Cancelled
- `REJECTED`: Rejected

uuids

array of strings

List of UUIDs to query withdrawal information.  
Only the deposit/withdrawal information corresponding to the specified UUIDs
will be returned. Up to 100 UUIDs can be specified.

The uuids and txids parameters cannot be used simultaneously.

\[Example\] uuids\[\]=uuid1&uuids\[\]=uuid2

uuids

ADD string

txids

array of strings

List of transaction IDs to query withdrawal information.  
Only the deposit/withdrawal information corresponding to the specified txids
will be returned. Up to 100 txids can be specified.

The uuids and txids parameters cannot be used simultaneously.

\[Example\] txids\[\]=txid1&txids\[\]=txid2

txids

ADD string

limit

integer

Defaults to 100

Number of items per page.  
A parameter for pagination that allows you to specify the number of items per
page to retrieve.  
Up to 100 items can be retrieved at a time, and if not specified, the default
value is 100.

page

integer

Defaults to 1

Page number for pagination.  
A parameter for pagination that allows you to specify the page to retrieve.  
If not specified, the default value is 1.

order_by

string

enum

Defaults to desc

Sorting method for query results.  
Returns a list of orders sorted according to the specified method based on the
order creation time.  
The available values are "desc" (descending, latest orders first) or "asc"
(ascending, oldest orders first).  
The default value is "desc".

Allowed:

`asc``desc`

from

string

Cursor for pagination.  
By entering the "uuid" value included in the response into this field, you can
continue retrieving up to "limit" withdrawal records made after the specified
withdrawal time.

to

string

Cursor for pagination.  
By entering the "uuid" value included in the response into this field, you can
retrieve up to "limit" withdrawal records made before the specified withdrawal
time.

#

200

List of withdrawals

array of objects

object

type

string

required

Defaults to withdraw

Withdrawal type.

uuid

string

required

Unique identifier for the order.

currency

string

required

Currency code to be queried.

net_type

string | null

required

Withdrawal network type.  
Blockchain network identifier defined and used by Upbit.  
Returned as null for Fiat withdrawals.

txid

string | null

required

Transaction ID of the blockchain transaction.

state

string

enum

required

Withdrawal status.

- `WAITING`: Waiting
- `PROCESSING`: In progress
- `DONE`: Completed
- `FAILED`: Failed
- `CANCELLED`: Cancelled
- `REJECTED`: Rejected

`WAITING` `PROCESSING` `DONE` `FAILED` `CANCELLED` `REJECTED`

created_at

string

required

Time when the withdrawal was created.

done_at

string | null

Time when the withdrawal was completed.  
Returned as null if the withdrawal has not been completed.

amount

string

required

Quantity of digital assets to be withdrawn.

fee

string

required

Fee amount for the withdrawal.

transaction_type

string

enum

required

Defaults to default

Withdrawal type.  
The available values are as follows:

- `default`: General withdrawal
- `internal`: Internal (between Upbit accounts)

`default` `internal`

is_cancelable

boolean

required

Indicates whether the withdrawal can be cancelled.

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

Updated 16 days ago

---

ShellPythonJavaNode

Base URL

https://region\-api.upbit.com/v1/withdraws

xxxxxxxxxx

1

curl \--request GET \\

2

    \--url 'https://{region}-api.upbit.com/v1/withdraws?currency=XRP&state=DONE' \\

3

    \--header 'Authorization: Bearer {JWT\_TOKEN}' \\

4

    \--header 'Accept: application/json'

5

​

xxxxxxxxxx

16

1

\[

2

{

3

    "type": "withdraw",

4

    "uuid": "9f432943-54e0-40b7-825f-b6fec8b42b79",

5

    "currency": "XRP",

6

    "net\_type": "XRP",

7

    "txid": "98c15999f0bdc4ae0e8a-ed35868bb0c204fe6ec29e4058a3451e-88636d1040f4baddf943274ce37cf9cc",

8

    "state": "DONE",

9

    "created\_at": "2025-07-04T15:00:00",

10

    "done\_at": "2025-07-04T15:00:20",

11

    "amount": "10.00",

12

    "fee": "0.0",

13

    "transaction\_type": "default",

14

    "is\_cancelable": false

15

}

16

\]

Updated 16 days ago

---

---

**Source:**
[withdrawal-list-inquiry](https://global-docs.upbit.com/reference/withdrawal-list-inquiry)
