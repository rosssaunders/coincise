# Deposit List Inquiry

**Check the proper endpoint based on your region.**

The examples in this page is written using Singapore fiat code(SGD). Set the
quote currency to match your region. The base_url differs by country/region.
Make sure to specify the correct region value for your environment.

\- Singapore (sg): https://sg-api.upbit.com  
\- Indonesia (id): https://id-api.upbit.com  
\- Thailand (th): https://th-api.upbit.com

You can set query conditions to retrieve only the deposit records that meet
those conditions. Currency, deposit status, UUID list, or TXID list can be used
as filter parameters. If no conditions are specified, the most recent 100
deposit records will be returned.

Revision History

| Version | Date       | Changes                                                                            |
| ------- | ---------- | ---------------------------------------------------------------------------------- |
| v1.0.7  | 2023-05-23 | [Addition of `net_type` field](https://global-docs.upbit.com/changelog/net_type#/) |

Rate Limit

Up to 30 calls per second are allowed. This is measured on an account basis and
request counts are shared within the exchange 'default' group.

API Key Permission

This API requires [authentication](auth) with an API Key granted \[View
Deposits\] permission.  
If you receive an out_of_scope error, please verify the permission settings in
the API Key Management page.

currency

string

Currency code to filter deposit history. A filter parameter used to narrow down
results by currency code. if not provided, returns the latest deposits across
all currencies.

state

string

enum

Deposit status to be queried.  
A filter parameter used to limit the query target by deposit status. Only
deposit information with the specified status will be returned in the response.

The available values are as follows:

- `PROCESSING`: Processing
- `ACCEPTED`: Completed
- `CANCELLED`: Cancelled
- `REJECTED`: Rejected
- `TRAVEL_RULE_SUSPECTED`: Waiting for additional Travel Rule verification
- `REFUNDING`: Refund in progress
- `REFUNDED`: Refund completed

Allowed:

`PROCESSING``ACCEPTED``CANCELLED``REJECTED``TRAVEL_RULE_SUSPECTED``REFUNDING``REFUNDED`

uuids\[\]

array of strings

List of UUIDs to query deposit information.  
Only the deposit information corresponding to the specified UUIDs will be
returned.

\[Example\] uuids\[\]=uuid1&uuids\[\]=uuid2

uuids\[\]

ADD string

txids\[\]

array of strings

List of transaction IDs to query deposit information.  
Only the deposit information corresponding to the specified txids will be
returned.

\[Example\] txids\[\]=txid1&txids\[\]=txid2

txids\[\]

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
continue retrieving up to "limit" deposit records made after the specified
deposit time.

to

string

Cursor for pagination.  
By entering the "uuid" value included in the response into this field, you can
retrieve up to "limit" deposit records made before the specified deposit time.

#

200

List of deposits

array of objects

object

type

string

Defaults to deposit

Deposit type.

uuid

string

Unique identifier for the deposit to verify.

currency

string

Currency code to be queried.

net_type

string | null

Deposit network type.  
Blockchain network identifier defined and used by Upbit.

txid

string

Transaction ID for the deposit as recorded on the blockchain.

state

string

enum

Deposit status.

- `PROCESSING`: Deposit in progress (digital asset only)
- `ACCEPTED`: Completed
- `CANCELLED`: Cancelled
- `REJECTED`: Rejected
- `TRAVEL_RULE_SUSPECTED`: Awaiting additional Travel Rule verification (digital
  assets only)
- `REFUNDING`: Refund in progress
- `REFUNDED`: Refunded (digital asset only)

`PROCESSING` `ACCEPTED` `CANCELLED` `REJECTED` `TRAVEL_RULE_SUSPECTED`
`REFUNDING` `REFUNDED`

created_at

string

Deposit request time (UTC).

done_at

string

Deposit completion time (UTC).

amount

string

Amount of fiat currency to be deposited.

fee

string

Deposit fee.

transaction_type

string

enum

Defaults to default

Deposit type.

- `default`: General deposit
- `internal`: Internal deposit (between Upbit accounts)

`default` `internal`

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

Updated 1 day ago

---

ShellPythonJavaNode

Base URL

https://region\-api.upbit.com/v1/deposits

xxxxxxxxxx

1

curl \--request GET \\

2

\--url 'https://{region}-api.upbit.com/v1/deposits?currency=SGD' \\

3

\--header 'Authorization: Bearer {JWT_TOKEN}' \\

4

\--header 'accept: application/json'

5

​

xxxxxxxxxx

15

1

\[

2

{

3

    "type": "deposit",

4

    "uuid": "94332e99-3a87-4a35-ad98-28b0c969f830",

5

    "currency": "SGD",

6

    "net\_type": null,

7

    "txid": "BKD-2000-12-29-aeked29c05eadac293b4214994",

8

    "state": "ACCEPTED",

9

    "created\_at": "2025-07-04T15:00:00",

10

    "done\_at": "2025-07-04T15:00:10",

11

    "amount": "100000.0",

12

    "fee": "0.0",

13

    "transaction\_type": "default"

14

}

15

\]

Updated 1 day ago

---

---

**Source:**
[deposit-list-inquiry](https://global-docs.upbit.com/reference/deposit-list-inquiry)
