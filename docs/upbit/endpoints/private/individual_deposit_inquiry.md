# Individual Deposit Inquiry

**Check the proper endpoint based on your region.**

The examples in this page is written using Singapore fiat code(SGD). Set the quote currency to match your region. The base\_url differs by country/region. Make sure to specify the correct region value for your environment.  
  
\- Singapore (sg): https://sg-api.upbit.com  
\- Indonesia (id): https://id-api.upbit.com  
\- Thailand (th): https://th-api.upbit.com

  

Revision History

| Version | Date | Changes |
| --- | --- | --- |
| v1.0.7 | 2023-05-23 | [Addition of `net_type` field](https://global-docs.upbit.com/changelog/net_type#/) |

Rate Limit

Up to 30 calls per second are allowed. This is measured on an account basis and request counts are shared within the exchange 'default' group.

  

API Key Permission

API key with [authentication](auth) is required, with \[View Deposits\] permission enabled.  
If an out\_of\_scope permission error occurs, please check the permission settings in the API Key Management page.

currency

string

Currency code to query.  
A filter parameter used to narrow down results by currency code.

uuid

string

Unique identifier(UUID) of the deposit to query. If neither uuid nor txid is specified, the latest deposit record is returned.

txid

string

Transaction ID of the deposit to query. If neither uuid nor txid is specified, the latest deposit record is returned.

# 

200

Object of deposit

object

type

string

required

Defaults to deposit

Deposit type.

uuid

string

required

Unique identifier for the deposit to verify.

currency

string

required

Currency code to be queried.

net\_type

string | null

required

Deposit network type.  
Blockchain network identifier defined and used by Upbit.

txid

string

required

Transaction ID for the deposit as recorded on the blockchain.

state

string

enum

required

Deposit status.

-   `PROCESSING`: Deposit in progress (digital asset only)
-   `ACCEPTED`: Completed
-   `CANCELLED`: Cancelled
-   `REJECTED`: Rejected
-   `TRAVEL_RULE_SUSPECTED`: Awaiting additional Travel Rule verification (digital assets only)
-   `REFUNDING`: Refund in progress
-   `REFUNDED`: Refunded (digital asset only)

`PROCESSING` `ACCEPTED` `CANCELLED` `REJECTED` `TRAVEL_RULE_SUSPECTED` `REFUNDING` `REFUNDED`

created\_at

string

required

Deposit request time (UTC).

done\_at

string

required

Deposit completion time (UTC).

amount

string

required

Amount of fiat currency to be deposited.

fee

string

required

Deposit fee.

transaction\_type

string

enum

required

Defaults to default

Deposit type.

-   `default`: General deposit
-   `internal`: Internal deposit (between Upbit accounts)

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

* * *

ShellPythonJavaNode

Base URL

https://region\-api.upbit.com/v1/deposit

xxxxxxxxxx

1

curl \--request GET \\

2

  \--url 'https://{region}-api.upbit.com/v1/deposit?uuid=94332e99-3a87-4a35-ad98-28b0c969f830' \\

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

  "type": "deposit",

3

  "uuid": "94332e99-3a87-4a35-ad98-28b0c969f830",

4

  "currency": "SGD",

5

  "net\_type": null,

6

  "txid": "BKD-2000-12-29-aeked29c05eadac293b4214994",

7

  "state": "ACCEPTED",

8

  "created\_at": "2025-07-04T15:00:00",

9

  "done\_at": "2025-07-04T15:00:10",

10

  "amount": "100000.0",

11

  "fee": "0.0",

12

  "transaction\_type": "default"

13

}

Updated 16 days ago

* * *

---

**Source:** [individual-deposit-inquiry](https://global-docs.upbit.com/reference/individual-deposit-inquiry)
