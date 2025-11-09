# Individual Deposit Address Inquiry

**Check the proper endpoint based on your region.**

The base\_url differs by country/region. Make sure to specify the correct region value for your environment.  
  
\- Singapore (sg): https://sg-api.upbit.com  
\- Indonesia (id): https://id-api.upbit.com  
\- Thailand (th): https://th-api.upbit.com

Null deposit\_address During Address Generation

If this API is called after requesting deposit address creation but before the address is generated, the deposit\_address field in the response may return null. Please retry the request after some time.

  

Revision History

| Version | Date | Changes |
| --- | --- | --- |
| v1.0.7 | 2023-05-23 | [Addition of `net_type` field](https://global-docs.upbit.com/changelog/net_type#/) |

Rate Limit

Up to 30 calls per second are allowed. This is measured on an account basis and request counts are shared within the exchange 'default' group.

  

API Key Permission

This API requires [authentication](auth) and an API Key with \[View Deposits\] permission enabled.  
If an out\_of\_scope error occurs, please check your permissions in the API Key Management page.

currency

string

required

Currency code to query.  
A filter parameter used to narrow down results by currency code.

net\_type

string

required

Blockchain network identifier for deposits and withdrawals. A filter parameter used to narrow down results by network identifier.

# 

200

Object of deposit address

object

currency

string

required

Currency code to be queried.

net\_type

string | null

required

Deposit network type.  
Blockchain network identifier defined and used by Upbit.

deposit\_address

string

Deposit address for the digital asset.

secondary\_address

string | null

Secondary withdrawal address (e.g., Destination Tag, Memo, Message).  
For some digital assets, deposits and withdrawals require a secondary address such as a Destination Tag, Memo, or Message. If the deposit address of the receiving exchange includes a secondary address, you must provide this field when submitting a withdrawal request.

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

* * *

ShellPythonJavaNode

Base URL

https://region\-api.upbit.com/v1/deposits/coin\_address

xxxxxxxxxx

1

curl \--request GET \\

2

    \--url 'https://{region}-api.upbit.com/v1/deposits/coin\_address?currency=BTC&net\_type=BTC' \\

3

    \--header 'Authorization: Bearer {JWT\_TOKEN}' \\

4

    \--header 'Accept: application/json'

5

​

xxxxxxxxxx

1

{

2

  "currency": "BTC",

3

  "net\_type": "BTC",

4

  "deposit\_address": "3EusRwybuZUhVDeHL7gh3HSLmbhLcy7NqD",

5

  "secondary\_address": null

6

}

Updated 16 days ago

* * *

---

**Source:** [individual-deposit-address-inquiry](https://global-docs.upbit.com/reference/individual-deposit-address-inquiry)
