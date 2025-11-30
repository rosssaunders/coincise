# POST /v2/auth/w/withdraw

**Source:**
[https://docs.bitfinex.com/reference/rest-auth-withdraw](https://docs.bitfinex.com/reference/rest-auth-withdraw)

post

https://api.bitfinex.com/v2/auth/w/withdraw

Allows you to request a withdrawal from one of your wallets.

> 📘
>
> ###
>
> Withdrawal methods
>
> A full list of all withdrawal methods, including the different methods for
> tether withdrawals, can be found here:
> [https://api-pub.bitfinex.com//v2/conf/pub:map:tx:method](https://api-pub.bitfinex.com//v2/conf/pub:map:tx:method)
>
> Tether can be withdrawn using different networks. Different methods are used
> to specify which network should be used. The table below specifies which
> methods need to be used to use different networks.

> 📘
>
> ###
>
> Travel rule
>
> The 'travel_rule_tos' field can be used to voluntarily send travel rule
> information when requesting a withdrawal.
>
> Pass the virtual asset provider ID and name by passing the 'vasp_did' and
> 'vasp_name' respective. For possible values, see the documentation of the
> [Virtual Asset Service Providers](/reference/virtual-asset-service-providers)
> endpoint.

**Tether Methods**

| Currency | Transport Protocol                 | Method         |
| -------- | ---------------------------------- | -------------- |
| USDT     | Tether(USD) on Ethereum            | tetheruse      |
| USDT     | Tether(USD) on Tron                | tetherusx      |
| USDT     | Tether(USD) on Liquid              | tetherusl      |
| USDT     | Tether(USD) on Omni                | tetheruso      |
| USDT     | Tether(USD) on Solana              | tetherusdtsol  |
| USDT     | Tether(USD) on Avalanche (C Chain) | tetherusdtavax |
| USDT     | Tether(USD) on Algorand            | tetherusdtalg  |
| USDT     | Tether(USD) on Polkadot            | tetherusdtdot  |
| USDT     | Tether(USD) on Kusama              | tetherusdtksm  |
| USDT     | Tether(USD) on EOS                 | tetheruss      |
| USDT     | Tether(USD) on NEAR                | tetherusdtnear |
| USDT     | Tether(USD) on Polygon             | tetherusdtply  |
| USDT     | Tether(USD) on Bitcoin Cash        | tetherusdtbch  |
| USDT     | Tether(USD) on Tezos               | tetherusdtxtz  |
| USDT     | Tether(USD) on KAVA                | tetherusdtkava |
| USDT     | Tether(USD) on zkSync              | tetherusdtzk   |
| USDT     | Tether(USD) on Celo                | tetherusdtcelo |
| USDT     | Tether(USD) on Toncoin             | tetherusdtton  |
| EURT     | Tether(EUR) on Ethereum            | tethereue      |
| CNHT     | Tether(CNH) on Ethereum            | tethercnhte    |
| CNHT     | Tether(CNH) on Huobi Token         | tethercnhtx    |
| XAUT     | Tether(XAU) on Ethereum            | tetherxaute    |
| XAUT     | Tether(XAU) on zkSync              | tetherxautzk   |
| MXNT     | Tether(MXN) on Ethereum            | tethermxnte    |

Response data

| Index | Field            | Type                                          | Description                                                                      |
| ----- | ---------------- | --------------------------------------------- | -------------------------------------------------------------------------------- |
| [0]   | MTS              | int                                           | Seconds epoch timestamp of notification                                          |
| [1]   | TYPE             | string                                        | Notification's type ("acc_wd-req")                                               |
| [2]   | MESSAGE_ID       | int                                           | Unique notification's ID                                                         |
| [4]   | WITHDRAWAL_ARRAY | [Withdrawal array](#withdrawal-array-index-4) | An array containing your withdrawal data                                         |
| [5]   | CODE             | int                                           | W.I.P. (work in progress)                                                        |
| [6]   | STATUS           | string                                        | Status of the notification; it may vary over time (SUCCESS, ERROR, FAILURE, ...) |
| [7]   | TEXT             | string                                        | Additional notification description                                              |

Withdrawal array (Index [4])

| Index | Field          | Type   | Description                                                         |
| ----- | -------------- | ------ | ------------------------------------------------------------------- |
| [0]   | WITHDRAWAL_ID  | Int    | Unique Withdrawal ID (0 or null if the withdrawal was unsuccessful) |
| [2]   | METHOD         | String | Method of withdrawal                                                |
| [3]   | PAYMENT_ID     | String | Payment ID (if relevant)                                            |
| [4]   | WALLET         | String | Sending wallet                                                      |
| [5]   | AMOUNT         | Int    | Amount of the withdrawal                                            |
| [8]   | WITHDRAWAL_FEE | Int    | Fee on withdrawal                                                   |

wallet

string

required

Select the wallet from which to transfer (exchange, margin, funding (can also
use the old labels which are exchange, trading and deposit respectively))

method

string

required

Method of withdrawal. For an up-to-date mapping of methods and their respective
currencies see:
[https://api-pub.bitfinex.com//v2/conf/pub:map:tx:method](https://api-pub.bitfinex.com//v2/conf/pub:map:tx:method)
[[[METHOD,[CURRENCY]]...]] \*(methods should be added to the post body in lower
case)

amount

string

Amount of Withdrawal (not used for LNX)

address

string

Destination address (not used for LNX)

invoice

string

Used instead of address for LNBTC (method: 'lnx')

payment_id

string

Specify a tag/memo/etc.

fee_deduct

int32

Set to 1 to deduct the withdrawal fee from the withdrawal amount

note

string

Add an optional note to your withdrawal

travel_rule_tos

boolean

Flag to voluntarily send travel rule details for withdrawal

truefalse

vasp_did

string

Virtual asset provider identifier, optional info for travel rule purpose. DID
values can be found on
[https://api-pub.bitfinex.com/v2/ext/vasps](https://api-pub.bitfinex.com/v2/ext/vasps)
endpoint.

vasp_name

string

Virtual asset provider name, optional info for travel rule purpose, if self
custody ignore the field

beneficiary_self

boolean

Set to 'true' to extract destination data from your KYC data. (If 'true',
dest_firstname, dest_lastname, or dest_corp_name do not need to be supplied)

truefalse

dest_firstname

string

Destination entity first name for travel rule purpose (mandatory if
dest_lastname is supplied, not required if beneficiary_self = true)

dest_lastname

string

Destination entity last name for travel rule purpose (mandatory if
dest_firstname is supplied, not required if beneficiary_self = true)

dest_corp_name

string

Destination entity corporate name for travel rule purpose. (use either
dest_firstname + dest_lastname or dest_corp_name, not required if
beneficiary_self = true)

{

"wallet": "trading",

"method": "bitcoin",

"amount": "1234",

"address": "xxxx1234",

"fee_deduct": 0

}

'
