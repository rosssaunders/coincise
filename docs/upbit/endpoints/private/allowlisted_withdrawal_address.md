# Allowlisted Withdrawal Address

**Check the proper endpoint based on your region.**

The base_url differs by country/region. Make sure to specify the correct region
value for your environment.

\- Singapore (sg): https://sg-api.upbit.com  
\- Indonesia (id): https://id-api.upbit.com  
\- Thailand (th): https://th-api.upbit.com

###

Withdrawal Whitelist Address Registration

[](#withdrawal-whitelist-address-registration)

To request the withdrawal, a withdrawal address must be registered.

Please refer to the
[Withdrawal Allowlist Registration Guide](/docs/faq-how-to-add-withdrawal-address)
and register your withdrawal allowlist address through the \[My Page > Open API
Management > Digital Asset Withdrawal Address Management\] menu on the Upbit PC
Web.

###

Address Verification under Travel Rule Compliance

[](#address-verification-under-travel-rule-compliance)

When registering a withdrawal whitelist address, Upbit requests address
verification from the counterparty exchange that issued the address to comply
with the Travel Rule. If the counterparty exchange does not receive, approve, or
if verification fails, withdrawals may be restricted. Therefore, before
registering a withdrawal whitelist address, please ensure that the address is
supported by the relevant exchange.

**Network Type(`net_type`) and Network Name(`network_name`)**

The network type(`net_type`) is an identifier field used to specify the
blockchain network (target chain) through which a digital asset is transferred
during deposit and withdrawal (e.g., `BTC`). It is a required parameter for
digital asset withdrawals, and the correct identifier value must be used to
ensure proper processing. When calling the withdrawal API, you should first call
the withdrawal whitelist address API and use the exact network type value from
the response.

The network name(`network_name`) represents the full name of the blockchain
network (e.g., `Bitcoin`). It is human-readable information and cannot be used
as an identifier. It is intended for display purposes, such as representing the
blockchain network in a service UI.

Some response fields may return null depending on the type of withdrawal
whitelist address.

**\[Differences in Response Fields by Address Type\]**

- For **personal wallet addresses**, the `beneficiary_name` field returns the
  member's name, and the `wallet_type` field returns the personal wallet name.
  The `exchange_name` and `beneficiary_type` fields return null.
- For **exchange wallets**, the `exchange_name` field returns the name of the
  exchange owning the wallet, and the `beneficiary_name` field returns the
  member's name. The `wallet_type` field returns null. The `beneficiary_type` is
  returned according to the owner type as described below.

**\[Differences in Response Fields by Address Owner Type\]**

- For **individual-owned addresses**, the `beneficiary_type` returns
  `individual`, and the `beneficiary_company_name` field returns null.
- For **corporate-owned addresses**, the `beneficiary_type` returns `corporate`,
  and the `beneficiary_company_name` field returns the name of the corporation.

Revision History

| Version                                                                                                                                                                              | Date       | Changes                                                                            |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------- | ---------------------------------------------------------------------------------- |
| v1.2.1                                                                                                                                                                               | 2025-07-07 | [Addition of new response fields                                                   |
| `exchange_name`, `wallet_type`, `beneficiary_type`, `beneficiary_name`, `beneficiary_company_name`](https://global-docs.upbit.com/changelog/allowlisted_withdrawal_address_update#/) |
| v1.0.7                                                                                                                                                                               | 2023-05-23 | [Addition of `net_type` field](https://global-docs.upbit.com/changelog/net_type#/) |

Rate Limit

Up to 30 calls per second are allowed. This is measured on an account basis and
request counts are shared within the exchange 'default' group.

API Key Permission

This API requires [authentication](auth) and an API Key with \[View
Withdrawals\] permission.  
If you encounter an out_of_scope permission error, please check your permissions
in the API Key Management page.

#

200

List of addresses

array of objects

object

currency

string

required

Currency code of the digital asset to withdraw.

net_type

string | null

required

Withdrawal network type.  
Blockchain network identifier defined and used by Upbit. The `net_type`
parameter used in a withdrawal request must have the same value as this field.

network_name

string

required

Name of the blockchain network used for withdrawals. Blockchain network name
displayed to the user by Upbit.

\[Example\]: "Ethereum", "Bitcoin", "Solana"

withdraw_address

string

required

Address to receive the digital assets when withdrawing.  
Only addresses registered in the withdrawal address list are supported.

secondary_address

string | null

Secondary withdrawal address (e.g., Destination Tag, Memo, Message).  
For some digital assets, deposits and withdrawals require a secondary address
such as a Destination Tag, Memo, or Message. If the deposit address of the
receiving exchange includes a secondary address, you must provide this field
when submitting a withdrawal request.

beneficiary_name

string

Name of the beneficiary (individual or corporate) for the withdrawal.(Only
Singapore)

- For corporate entities, the response will be None

beneficiary_company_name

string | null

Name of the company receiving the withdrawn assets.(Only Singapore)

beneficiary_type

string | null

Type of receiving wallet.(Only Singapore)

- `individual`: Individual wallet
- `corporate`: Corporate wallet

exchange_name

string | null

Name of the exchange where the withdrawal address is registered.(Only Singapore)

wallet_type

string | null

Type of individual wallet.(Only Singapore)

Updated 16 days ago

---

ShellPythonJavaNode

Base URL

https://region\-api.upbit.com/v1/withdraws/coin_addresses

xxxxxxxxxx

1

curl \--request GET \\

2

\--url 'https://{region}-api.upbit.com/v1/withdraws/coin_addresses' \\

3

\--header 'Authorization: Bearer {JWT_TOKEN}' \\

4

\--header 'Accept: application/json'

5

​

xxxxxxxxxx

26

1

\[

2

{

3

    "currency": "BTC",

4

    "net\_type": "BTC",

5

    "network\_name": "Bitcoin",

6

    "withdraw\_address": "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",

7

    "secondary\_address": null,

8

    "beneficiary\_name": "John",

9

    "beneficiary\_company\_name": null,

10

    "beneficiary\_type": "individual",

11

    "exchange\_name": "Binance",

12

    "wallet\_type": null

13

},

14

{

15

    "currency": "ETH",

16

    "net\_type": "ETH",

17

    "network\_name": "Ethereum",

18

    "withdraw\_address": "0x1234615148db0926d76bde31d420abcd5439484fd",

19

    "secondary\_address": null,

20

    "beneficiary\_name": "John",

21

    "beneficiary\_company\_name": null,

22

    "beneficiary\_type": null,

23

    "exchange\_name": null,

24

    "wallet\_type": "MetaMask"

25

}

26

\]

Updated 16 days ago

---

---

**Source:**
[allowlisted-withdrawal-address](https://global-docs.upbit.com/reference/allowlisted-withdrawal-address)
