# Available Deposit Information

**Check the proper endpoint based on your region.**

The base_url differs by country/region. Make sure to specify the correct region
value for your environment.

\- Singapore (sg): https://sg-api.upbit.com  
\- Indonesia (id): https://id-api.upbit.com  
\- Thailand (th): https://th-api.upbit.com

The deposit availability information for the currency includes the following key
items.

| Key Item                    | Related Key Response Fields      |
| --------------------------- | -------------------------------- |
| **Deposit Availability**    | `is_deposit_possible`,           |
| `deposit_impossible_reason` |
| **Minimum Deposit Amount**  | `minimum_deposit_amount`         |
| **Policy**                  | `minimum_deposit_confirmations`, |
| `decimal_precision`         |

The Deposit Availability API does not guarantee real-time status updates.

Get Digital Asset Deposit Availability Information API does not reflect service
status in real time and may be delayed by several minutes. **It is recommended
to use this information only for reference, not for trading strategies**. Before
making an actual deposit, please check the
[Upbit notice](https://sg.upbit.com/service_center/notice) and
[Real-time deposit/withdrawal status](https://sg.upbit.com/service_center/wallet_status)
page.

Revision History

| Version | Date       | Changes                                                                                                                 |
| ------- | ---------- | ----------------------------------------------------------------------------------------------------------------------- |
| v1.1.8  | 2024-11-14 | [Addition of `Get Available Deposit Info` API](https://global-docs.upbit.com/changelog/available_deposit_information#/) |

Rate Limit

Up to 30 calls per second are allowed. This is measured on an account basis and
request counts are shared within the exchange 'default' group.

API Key Permission

This API requires [authentication](auth) and an API Key with the \[View
Deposits\] permission enabled.  
If an out_of_scope error occurs, please check the permission settings in the API
Key Management page.

currency

string

required

Currency code to query.  
A filter parameter used to narrow down results by currency code.

net_type

string

required

Blockchain network identifier for deposits and withdrawals. A filter parameter
used to narrow down results by network identifier.

#

200

Object of deposit availability

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

is_deposit_possible

boolean

required

Deposit Availability.

deposit_impossible_reason

string

required

Reason for deposit unavailability.  
※ A message is provided if "is_deposit_possible" is set to "false".

minimum_deposit_amount

string

required

Minimum deposit amount.

minimum_deposit_confirmations

integer

required

Minimum deposit confirmation count.  
The number of blockchain confirmations required by Upbit for the asset to be
accepted as a valid deposit.

decimal_precision

integer

required

Number of decimal places supported for deposits.

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

https://region\-api.upbit.com/v1/deposits/chance/coin

xxxxxxxxxx

1

curl \--request GET \\

2

\--url
'https://{region}-api.upbit.com/v1/deposits/chance/coin?currency=BTC&net_type=BTC'
\\

3

\--header 'Authorization: Bearer {JWT_TOKEN}' \\

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

"net_type": "BTC",

4

"is_deposit_possible": false,

5

"deposit_impossible_reason": "Deposits and withdrawals are temporarily suspended
due to a network upgrade",

6

"minimum_deposit_amount": "0",

7

"minimum_deposit_confirmations": 1,

8

"decimal_precision": 8

9

}

Updated 1 day ago

---

---

**Source:**
[available-deposit-information](https://global-docs.upbit.com/reference/available-deposit-information)
