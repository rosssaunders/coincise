# General Deposit Address Inquiry

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

This API requires [authentication](auth) and an API Key with \[View Deposits\]
permission.  
If an out_of_scope error occurs, please check the permission settings in the API
Key Management page.

#

200

List of deposit addresses

array of objects

object

currency

string

required

Currency code to be queried.

net_type

string | null

required

Deposit network type.  
Blockchain network identifier defined and used by Upbit.

deposit_address

string

required

Deposit address for the digital asset.

secondary_address

string | null

Secondary withdrawal address (e.g., Destination Tag, Memo, Message).  
For some digital assets, deposits and withdrawals require a secondary address
such as a Destination Tag, Memo, or Message. If the deposit address of the
receiving exchange includes a secondary address, you must provide this field
when submitting a withdrawal request.

Updated 7 days ago

---

ShellPythonJavaNode

Base URL

https://region\-api.upbit.com/v1/deposits/coin_addresses

xxxxxxxxxx

1

curl \--request GET \\

2

\--url 'https://{region}-api.upbit.com/v1/deposits/coin_addresses' \\

3

\--header 'Authorization: Bearer {JWT_TOKEN}' \\

4

\--header 'Accept: application/json'

5

​

xxxxxxxxxx

20

1

\[

2

{

3

    "currency": "BTC",

4

    "net\_type": "BTC",

5

    "deposit\_address": "3EusRwybuZUhVDeHL7gh3HSLmbhLcy7NqD",

6

    "secondary\_address": null

7

},

8

{

9

    "currency": "ETH",

10

    "net\_type": "ETH",

11

    "deposit\_address": "0x0d73e0a482b8cf568976d2e8688f4a899d29301c",

12

    "secondary\_address": null

13

},

14

{

15

    "currency": "XRP",

16

    "net\_type": "XRP",

17

    "deposit\_address": "rN9qNpgnBaZwqCg8CvUZRPqCcPPY7wfWep",

18

    "secondary\_address": "3057887915"

19

}

20

\]

Updated 7 days ago

---

---

**Source:**
[general-deposit-address-inquiry](https://global-docs.upbit.com/reference/general-deposit-address-inquiry)
