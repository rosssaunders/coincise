# Deposit Address Generation

**Check the proper endpoint based on your region.**

The base_url differs by country/region. Make sure to specify the correct region
value for your environment.

\- Singapore (sg): https://sg-api.upbit.com  
\- Indonesia (id): https://id-api.upbit.com  
\- Thailand (th): https://th-api.upbit.com

###

Differentiation of API Response Objects Due to Asynchronous Address Generation

[](#differentiation-of-api-response-objects-due-to-asynchronous-address-generation)

Deposit address generation works asynchronously. Depending on the completion
status at the time of the API call, two types of responses may be returned:

- Immediately after the initial request, the response shows whether the creation
  request was received successfully and includes only the `success` and
  `message` fields. This response will continue to be returned until the address
  creation is finished.
- After the address is generated asynchronously, the response will include the
  created address details: `currency`, `net_type`, and `deposit_address`. An
  address is generated only once per currency. Subsequent creation requests will
  return the previously generated address.

If the deposit address is still not generated after some time, please retry the
request at intervals.

Form-based POST requests are no longer supported from March 1, 2022.

Due to the end of Form support, POST requests sent using URL-encoded Form data
are no longer guaranteed to work properly. **Please ensure that the request body
is sent** strictly in JSON format.

Revision History

| Version | Date       | Changes                                                                            |
| ------- | ---------- | ---------------------------------------------------------------------------------- |
| v1.0.7  | 2023-05-23 | [Addition of `net_type` field](https://global-docs.upbit.com/changelog/net_type#/) |

Rate Limit

Up to 30 calls per second are allowed. This is measured on an account basis and
request counts are shared within the exchange 'default' group.

API Key Permission

API Key with [authentication](auth) is required, and must have the \[Deposit\]
permission.  
If you encounter an out_of_scope error, please check the permission settings in
the API Key Management page.

Create Deposit Address

currency

string

required

Currency code to be queried.

net_type

string

required

Blockchain network type.

#

200

Object of created deposit address

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

#

201

Object of created deposit address

object

success

boolean

required

Defaults to true

Indicates whether the deposit address was created successfully.

message

string

required

Message regarding the deposit address creation request.

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

Updated 1 day ago

---

ShellPythonJavaNode

Base URL

https://region\-api.upbit.com/v1/deposits/generate_coin_address

xxxxxxxxxx

11

1

curl \--request POST \\

2

\--url 'https://{region}-api.upbit.com/v1/deposits/generate_coin_address' \\

3

\--header 'Authorization: Bearer {JWT_TOKEN}' \\

4

\--header 'Content-Type: application/json' \\

5

\--data '

6

{

7

"currency": "BTC",

8

"net_type": "BTC"

9

}

10

'

11

​

xxxxxxxxxx

1

{

2

"currency": "BTC",

3

"net_type": "BTC",

4

"deposit_address": "3EusRwybuZUhVDeHL7gh3HSLmbhLcy7NqD",

5

"secondary_address": null

6

}

Updated 1 day ago

---

---

**Source:**
[deposit-address-generation](https://global-docs.upbit.com/reference/deposit-address-generation)
