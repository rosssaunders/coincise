# Individual Withdrawal Inquiry

**Check the proper endpoint based on your region.**

The base_url differs by country/region. Make sure to specify the correct region
value for your environment.

\- Singapore (sg): https://sg-api.upbit.com  
\- Indonesia (id): https://id-api.upbit.com  
\- Thailand (th): https://th-api.upbit.com

Revision History

| Version | Date       | Changes                                                                            |
| ------- | ---------- | ---------------------------------------------------------------------------------- |
| v1.0.7  | 2023-05-23 | [Addition of `net_type` field](https://global-docs.upbit.com/changelog/net_type#/) |

Rate Limit

Up to 30 calls per second are allowed. This is measured on an account basis and
request counts are shared within the exchange 'default' group.

API Key Permission

This API requires [authentication](auth) and an API Key with \[Withdrawal
Inquiry\] permission.  
If you receive an out_of_scope permission error, please verify your API Key
permissions in the API Key Management page.

uuid

string

Unique identifier(UUID) of the withdrawal to query.  
If neither uuid nor txid is specified, the latest withdrawal record is returned.

txid

string

Transaction ID of the withdrawal to query. If neither uuid nor txid is
specified, the latest withdrawal record is returned.

currency

string

Currency code to filter withdrawal history. A filter parameter used to narrow
down results by currency code. if not provided, returns the latest withdrawals
across all currencies.

#

200

Object of withdrawal

object

type

string

required

Defaults to withdraw

Withdrawal type.

uuid

string

required

Unique identifier for the withdrawal to verify.

currency

string

required

Currency code to be queried.

net_type

string | null

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

Updated 16 days ago

---

ShellPythonJavaNode

Base URL

https://region\-api.upbit.com/v1/withdraw

xxxxxxxxxx

1

curl \--request GET \\

2

    \--url 'https://{region}-api.upbit.com/v1/withdraw?currency=BTC' \\

3

    \--header 'Authorization: Bearer {JWT\_TOKEN}' \\

4

    \--header 'Accept: application/json'

5

​

xxxxxxxxxx

13

1

{

2

"type": "withdraw",

3

"uuid": "9f432943-54e0-40b7-825f-b6fec8b42b79",

4

"currency": "BTC",

5

"txid": null,

6

"state": "PROCESSING",

7

"created_at": "2025-07-04T15:00:00",

8

"done_at": null,

9

"amount": "0.01",

10

"fee": "0.0",

11

"transaction_type": "default",

12

"is_cancelable": false

13

}

Updated 16 days ago

---

---

**Source:**
[individual-withdrawal-inquiry](https://global-docs.upbit.com/reference/individual-withdrawal-inquiry)
