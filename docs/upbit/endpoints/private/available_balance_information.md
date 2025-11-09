# Available Balance Information

**Check the proper endpoint based on your region.**

The base_url differs by country/region. Make sure to specify the correct region
value for your environment.

\- Singapore (sg): https://sg-api.upbit.com  
\- Indonesia (id): https://id-api.upbit.com  
\- Thailand (th): https://th-api.upbit.com

Available withdrawal information includes the following key items.

| Key Items | Related Key Response Fields |
| --------- | --------------------------- |

| **Currency Information:**  
Withdrawal fee, withdrawal and  
wallet status | `currency.withdraw_fee`,  
`currency.wallet_state`,  
`currency.wallet_support` | | **Currency Balance** |
`account.balance`,`account.locked`,  
`account.avg_buy_price` | | **Withdrawal Limits:**  
Per transaction / Daily / Remaining  
limits | `withdraw_limit.onetime`,  
`withdraw_limit.daily`,  
`withdraw_limit.remaining_daily`,  
`withdraw_limit.minimum`,  
`withdraw_limit.can_withdraw` | | **Withdrawal-related Account  
Information:**  
Fee level, verification status | `member_level.fee_level`,  
`member_level.bank_account_verified`,  
`member_level.locked`,  
`member_level.wallet_locked` |

Revision History

| Version | Date       | Changes                                                                            |
| ------- | ---------- | ---------------------------------------------------------------------------------- |
| v1.0.7  | 2023-05-23 | [Addition of `net_type` field](https://global-docs.upbit.com/changelog/net_type#/) |

Rate Limit

Up to 30 calls per second are allowed. This is measured on an account basis and
request counts are shared within the exchange 'default' group.

API Key Permission

This API requires [authentication](auth), and the API Key must have \[View
Withdrawals\] permission enabled.  
If you encounter a permission error (out_of_scope), please verify your
permission settings in the API Key Management page.

currency

string

required

Currency code to query.  
A filter parameter used to narrow down results by currency code.

net_type

string

required

Blockchain network identifier used for deposits and withdrawals.  
After registering a withdrawal address, call the List Withdrawal Allowed
Addresses API to check the available "net_type" values for each address.  
For digital assets, this is a required field.

#

200

Object of withdrawal policy

object

member_level

object

required

User security level information

security_level

integer

required

Security level of the account.

fee_level

integer

required

Fee level of the account.

email_verified

boolean

required

Indicates whether email verification has been completed.

identity_auth_verified

boolean

required

Indicates whether identity verification has been completed.

bank_account_verified

boolean

required

Indicates whether bank account verification has been completed.

locked

boolean

required

Indicates whether the account is protected (locked).

wallet_locked

boolean

required

Indicates whether withdrawal protection is enabled.

currency

object

required

Currency information

code

string

required

Currency code.

withdraw_fee

string

required

Fee amount for the withdrawal.

is_coin

boolean

required

Indicates whether the asset is a digital asset.

wallet_state

string

enum

required

Indicates whether deposit and withdrawal support has ever been provided for each
asset. For the current deposit/withdrawal availability, please refer to the
wallet_support field.

- `working`: Deposit/withdrawal available
- `unsupported`: Deposit/withdrawal not supported

`working` `unsupported`

wallet_support

array of strings

required

Deposit and withdrawal availability for the specified currency.  
If deposits are available, "deposit" will be included; if withdrawals are
available, "withdraw" will be included. An empty list indicates that both
deposit and withdrawal are unavailable.

wallet_support\*

account

object

required

Asset balance information

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

Amount or quantity locked by pending orders or trades.

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

withdraw_limit

object

required

Withdrawal constraints

currency

string

required

Currency code to be queried.

onetime

string

required

Single withdrawal limit for the asset. (Deprecated)

daily

string | null

required

Daily withdrawal limit for the asset. (Deprecated)

remaining_daily

string

required

Remaining daily withdrawal limit. (Deprecated)

remaining_daily_fiat

string

required

Integrated daily remaining withdrawal limit (fiat basis).

fiat_currency

string

required

Base fiat currency code.

minimum

string

Minimum withdrawal amount or quantity.

fixed

integer

Number of decimal places allowed for withdrawal amounts.

withdraw_delayed_fiat

string

Amount restricted from withdrawal due to the withdrawal delay system.

can_withdraw

boolean

Indicates whether withdrawal is currently supported for the currency.  
To check if withdrawal is available, verify that "withdraw" is present in
currency.wallet_support.

remaining_daily_sgd

string

Integrated daily remaining withdrawal limit in SGD. (deprecated)

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

Updated 16 days ago

---

ShellPythonJavaNode

Base URL

https://region\-api.upbit.com/v1/withdraws/chance

xxxxxxxxxx

1

curl \--request GET \\

2

    \--url 'https://{region}-api.upbit.com/v1/withdraws/chance?currency=BTC&net\_type=BTC' \\

3

    \--header 'Authorization: Bearer {JWT\_TOKEN}' \\

4

    \--header 'Accept: application/json'

5

​

xxxxxxxxxx

42

1

{

2

"member_level": {

3

    "security\_level": 4,

4

    "fee\_level": 0,

5

    "email\_verified": true,

6

    "identity\_auth\_verified": true,

7

    "bank\_account\_verified": true,

8

    "locked": false,

9

    "wallet\_locked": false

10

},

11

"currency": {

12

    "code": "BTC",

13

    "withdraw\_fee": "0.0008",

14

    "is\_coin": true,

15

    "wallet\_state": "working",

16

    "wallet\_support": \[

17

      "deposit",

18

      "withdraw"

19

    \]

20

},

21

"account": {

22

    "currency": "BTC",

23

    "balance": "0.0",

24

    "locked": "0.0",

25

    "avg\_buy\_price": "145115000",

26

    "avg\_buy\_price\_modified": false,

27

    "unit\_currency": "SGD"

28

},

29

"withdraw_limit": {

30

    "currency": "BTC",

31

    "onetime": "50.0",

32

    "daily": null,

33

    "remaining\_daily": "0.0",

34

    "remaining\_daily\_fiat": "1000000.0",

35

    "fiat\_currency": "SGD",

36

    "minimum": "0.00001",

37

    "fixed": 8,

38

    "withdraw\_delayed\_fiat": "227.0",

39

    "can\_withdraw": true,

40

    "remaining\_daily\_sgd": "1000000.0"

41

}

42

}

Updated 16 days ago

---

---

**Source:**
[available-balance-information](https://global-docs.upbit.com/reference/available-balance-information)
