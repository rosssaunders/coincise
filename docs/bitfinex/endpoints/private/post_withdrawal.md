# Withdrawal

# Withdrawal

post https://api.bitfinex.com/v2/auth/w/withdraw

Allows you to request a withdrawal from one of your wallets.

/\*! tailwindcss v4.1.16 | MIT License | https://tailwindcss.com \*/ @layer theme, base, components, utilities; @layer utilities;

> 📘
> 
> ### 
> 
> Withdrawal methods
> 
> [](#withdrawal-methods)
> 
> A full list of all withdrawal methods, including the different methods for tether withdrawals, can be found here: [https://api-pub.bitfinex.com//v2/conf/pub:map:tx:method](https://api-pub.bitfinex.com//v2/conf/pub:map:tx:method)
> 
> Tether can be withdrawn using different networks. Different methods are used to specify which network should be used. The table below specifies which methods need to be used to use different networks.

> 📘
> 
> ### 
> 
> Travel rule
> 
> [](#travel-rule)
> 
> The 'travel\_rule\_tos' field can be used to voluntarily send travel rule information when requesting a withdrawal.
> 
> Pass the virtual asset provider ID and name by passing the 'vasp\_did' and 'vasp\_name' respective. For possible values, see the documentation of the [Virtual Asset Service Providers](/reference/virtual-asset-service-providers) endpoint.

**Tether Methods**

| Currency | Transport Protocol | Method |
| --- | --- | --- |
| USDT | Tether(USD) on Ethereum | tetheruse |
| USDT | Tether(USD) on Tron | tetherusx |
| USDT | Tether(USD) on Liquid | tetherusl |
| USDT | Tether(USD) on Omni | tetheruso |
| USDT | Tether(USD) on Solana | tetherusdtsol |
| USDT | Tether(USD) on Avalanche (C Chain) | tetherusdtavax |
| USDT | Tether(USD) on Algorand | tetherusdtalg |
| USDT | Tether(USD) on Polkadot | tetherusdtdot |
| USDT | Tether(USD) on Kusama | tetherusdtksm |
| USDT | Tether(USD) on EOS | tetheruss |
| USDT | Tether(USD) on NEAR | tetherusdtnear |
| USDT | Tether(USD) on Polygon | tetherusdtply |
| USDT | Tether(USD) on Bitcoin Cash | tetherusdtbch |
| USDT | Tether(USD) on Tezos | tetherusdtxtz |
| USDT | Tether(USD) on KAVA | tetherusdtkava |
| USDT | Tether(USD) on zkSync | tetherusdtzk |
| USDT | Tether(USD) on Celo | tetherusdtcelo |
| USDT | Tether(USD) on Toncoin | tetherusdtton |
| EURT | Tether(EUR) on Ethereum | tethereue |
| CNHT | Tether(CNH) on Ethereum | tethercnhte |
| CNHT | Tether(CNH) on Huobi Token | tethercnhtx |
| XAUT | Tether(XAU) on Ethereum | tetherxaute |
| XAUT | Tether(XAU) on zkSync | tetherxautzk |
| MXNT | Tether(MXN) on Ethereum | tethermxnte |

#### 

Response data

[](#response-data)

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| \[0\] | MTS | int | Seconds epoch timestamp of notification |
| \[1\] | TYPE | string | Notification's type ("acc\_wd-req") |
| \[2\] | MESSAGE\_ID | int | Unique notification's ID |
| 
\[ . . . \]

 |
| \[4\] | WITHDRAWAL\_ARRAY | [Withdrawal array](#withdrawal-array-index-4) | An array containing your withdrawal data |
| \[5\] | CODE | int | W.I.P. (work in progress) |
| \[6\] | STATUS | string | Status of the notification; it may vary over time (SUCCESS, ERROR, FAILURE, ...) |
| \[7\] | TEXT | string | Additional notification description |

td:has(div.placeholders) { background-color: #ebebeb } .placeholders { height: 10px; text-align: center; font-size: 16px; line-height: 8px; }

#### 

Withdrawal array (Index \[4\])

[](#withdrawal-array-index-4)

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| \[0\] | WITHDRAWAL\_ID | Int | Unique Withdrawal ID (0 or null if the withdrawal was unsuccessful) |
| 
\[ . . . \]

 |
| \[2\] | METHOD | String | Method of withdrawal |
| \[3\] | PAYMENT\_ID | String | Payment ID (if relevant) |
| \[4\] | WALLET | String | Sending wallet |
| \[5\] | AMOUNT | Int | Amount of the withdrawal |
| 

\[ . . . \]

 |
| \[8\] | WITHDRAWAL\_FEE | Int | Fee on withdrawal |

td:has(div.placeholders) { background-color: #ebebeb; } .placeholders { height: 10px; text-align: center; font-size: 16px; line-height: 8px; }

Body Params

wallet

string

required

Defaults to trading

Select the wallet from which to transfer (exchange, margin, funding (can also use the old labels which are exchange, trading and deposit respectively))

method

string

required

Defaults to bitcoin

Method of withdrawal. For an up-to-date mapping of methods and their respective currencies see: [https://api-pub.bitfinex.com//v2/conf/pub:map:tx:method](https://api-pub.bitfinex.com//v2/conf/pub:map:tx:method) \[\[\[METHOD,\[CURRENCY\]\]...\]\] \*(methods should be added to the post body in lower case)

amount

string

Defaults to 1234

Amount of Withdrawal (not used for LNX)

address

string

Defaults to xxxx1234

Destination address (not used for LNX)

invoice

string

Used instead of address for LNBTC (method: 'lnx')

payment\_id

string

Specify a tag/memo/etc.

fee\_deduct

int32

Defaults to 0

Set to 1 to deduct the withdrawal fee from the withdrawal amount

note

string

Add an optional note to your withdrawal

travel\_rule\_tos

boolean

Flag to voluntarily send travel rule details for withdrawal

truefalse

vasp\_did

string

Virtual asset provider identifier, optional info for travel rule purpose. DID values can be found on [https://api-pub.bitfinex.com/v2/ext/vasps](https://api-pub.bitfinex.com/v2/ext/vasps) endpoint.

vasp\_name

string

Virtual asset provider name, optional info for travel rule purpose, if self custody ignore the field

beneficiary\_self

boolean

Set to 'true' to extract destination data from your KYC data. (If 'true', dest\_firstname, dest\_lastname, or dest\_corp\_name do not need to be supplied)

truefalse

dest\_firstname

string

Destination entity first name for travel rule purpose (mandatory if dest\_lastname is supplied, not required if beneficiary\_self = true)

dest\_lastname

string

Destination entity last name for travel rule purpose (mandatory if dest\_firstname is supplied, not required if beneficiary\_self = true)

dest\_corp\_name

string

Destination entity corporate name for travel rule purpose. (use either dest\_firstname + dest\_lastname or dest\_corp\_name, not required if beneficiary\_self = true)

Responses

# 

200

200

Response body

array

# 

400

400

Response body

object

Updated 5 months ago

* * *

Language

ShellNodeRubyPHPPython

cURL Request

Examples

xxxxxxxxxx

13

1

curl \--request POST \\

2

     \--url https://api.bitfinex.com/v2/auth/w/withdraw \\

3

     \--header 'accept: application/json' \\

4

     \--header 'content-type: application/json' \\

5

     \--data '

6

{

7

  "wallet": "trading",

8

  "method": "bitcoin",

9

  "amount": "1234",

10

  "address": "xxxx1234",

11

  "fee\_deduct": 0

12

}

13

'

Try It!

RESPONSE

Examples

Click `Try It!` to start a request and see the response here! Or choose an example:

application/json

200 - Result400 - Result

Updated 5 months ago

* * *

---
Section: Account Actions
Source: https://docs.bitfinex.com/reference/rest-auth-withdraw
Path: /v2/auth/w/withdraw
Method: POST
