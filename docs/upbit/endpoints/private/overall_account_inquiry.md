# Overall Account Inquiry

**Check the proper endpoint based on your region.**

The examples in this page is written using Singapore fiat code(SGD). Set the
quote currency to match your region. The base_url differs by country/region.
Make sure to specify the correct region value for your environment.

\- Singapore (sg): https://sg-api.upbit.com  
\- Indonesia (id): https://id-api.upbit.com  
\- Thailand (th): https://th-api.upbit.com

Rate Limit

Up to 30 calls per second are allowed. This is measured on an account basis and
request counts are shared within the exchange 'default' group.

API Key Permission

This API requires [authentication](auth) and must use an API Key with the \[View
Account\] permission enabled.  
If you encounter an out_of_scope permission error, please verify your API Key
permissions via the API Key Management page.

#

200

List of account balances

array of objects

object

currency

string

required

Currency code to be queried.

balance

string

required

Available amount or volume for orders.  
For digital assets, this represents the available quantity.  
For fiat currency, this represents the available amount.

locked

string

required

Amount or quantity locked by pending orders or withdrawals.

avg_buy_price

string

required

Average buy price of the asset.

avg_buy_price_modified

boolean

required

Indicates whether the average buy price has been modified.

unit_currency

string

required

Currency unit used as the basis for avg_buy_price.

\[Example\]: SGD, BTC

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

https://region\-api.upbit.com/v1/accounts

xxxxxxxxxx

1

curl \--request GET \\

2

\--url 'https://{region}-api.upbit.com/v1/accounts' \\

3

\--header 'Authorization: Bearer {JWT_TOKEN}' \\

4

\--header 'accept: application/json'

5

​

xxxxxxxxxx

18

1

\[

2

{

3

    "currency": "SGD",

4

    "balance": "1000000.0",

5

    "locked": "0.0",

6

    "avg\_buy\_price": "0",

7

    "avg\_buy\_price\_modified": false,

8

    "unit\_currency": "SGD"

9

},

10

{

11

    "currency": "BTC",

12

    "balance": "2.0",

13

    "locked": "0.0",

14

    "avg\_buy\_price": "101000",

15

    "avg\_buy\_price\_modified": false,

16

    "unit\_currency": "SGD"

17

}

18

\]

Updated 1 day ago

---

---

**Source:**
[overall-account-inquiry](https://global-docs.upbit.com/reference/overall-account-inquiry)
