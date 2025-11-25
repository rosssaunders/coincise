# Listing Market List

**Check the proper endpoint based on your region.**

The examples in this page is written using Singapore fiat code(SGD). Set the
quote currency to match your region. The base_url differs by country/region.
Make sure to specify the correct region value for your environment.

\- Singapore (sg): https://sg-api.upbit.com  
\- Indonesia (id): https://id-api.upbit.com  
\- Thailand (th): https://th-api.upbit.com

The order availability information for a market includes the following key
fields.

| Key Items            | Related Response Fields |
| -------------------- | ----------------------- |
| Applicable Fee Rates | `bid_fee`,              |

`ask_fee`,  
`maker_bid_fee`,`maker_ask_fee` | | Supported Order Sides and Types |
`market.order_sides`,  
`market.bid_types`  
`market.ask_types` | | Base Asset, Quote Asset and  
Minimum/Maximum Order Amount | `market.bid`,  
`market.ask`,  
`market.max_total` | | Available Balances of  
Base Asset and Quote Asset | `bid_account`,`ask_account` |

`market.order_types` is deprecated.

The order_types field is planned to be deprecated. After deprecation, this field
will be removed from responses. If you are currently using this field, please
switch to the alternative fields `ask_types` and `bid_types`.

Revision History

| Version | Date       | Changes                        |
| ------- | ---------- | ------------------------------ |
| v1.1.1  | 2024-04-22 | [Addition of `ord_type: best,` |

Addition of `time_in_force` parameter  
(All Markets)](https://global-docs.upbit.com/changelog/new_ord_type_expand#/) |
| v1.1.1 | 2024-04-04 | [Addition of `ord_type: best,`  
Addition of `time_in_force` parameter  
(BTC Market Upbit Indonesia and Thailand)](https://global-docs.upbit.com/changelog/ioc_fok_btc#/) |
| v1.1.1 | 2024-02-26 | [Addition of `ord_type: best,`  
Addition of `time_in_force` parameter  
(THB, IDR Market Upbit Indonesia and Thailand)](https://global-docs.upbit.com/changelog/id_th_iocfok_226#/) |
| v1.1.1 | 2023-10-27 | [Addition of `ord_type: best,`  
Addition of `time_in_force` parameter  
(Upbit Singapore only)](https://global-docs.upbit.com/changelog/sg_iocfok#/) | |
v1.0.6 | 2022-10-14 | [Deprecation of `market.order_types,`  
Addition of `ask_types` and `bid_types` fields](https://global-docs.upbit.com/changelog/notice-changes-of-open-api-from-oct-14#/) |

Rate Limit

Up to 30 calls per second are allowed. This is measured on an account basis and
request counts are shared within the exchange 'default' group.

API Key Permission

This API requires [authentication](auth) and must use an API Key with the \[View
Orders\] permission enabled.  
If you encounter an out_of_scope permission error, please verify your API Key
permissions via the API Key Management page.

is_details

boolean

Whether to include detailed information in the query. If true, the response
includes detail fields such as caution or warning designation. Default: false.

truetruefalse

#

200

List of trading pairs

array of objects

object

market

string

required

Trading pair code representing the market.

english_name

string

required

English name of the digital asset.

market_warning

string

Trading pair warning Information.

- `NONE` (Not applicable)
- `CAUTION`(Investment warning)

#

400

error object

object

error

object

name

number

required

Name identifying the error.

message

string

required

Message describing the cause of the error.

Updated 7 days ago

---

ShellPythonJavaNode

Base URL

https://region\-api.upbit.com/v1/market/all

xxxxxxxxxx

1

curl \--request GET \\

2

     \--url https://region-api.upbit.com/v1/market/all \\

3

     \--header 'accept: application/json'

xxxxxxxxxx

27

1

\[

2

{

3

    "market": "SGD-ETH",

4

    "english\_name": "Ethereum",

5

    "market\_warning": "NONE"

6

},

7

{

8

    "market": "SGD-XRP",

9

    "english\_name": "XRP",

10

    "market\_warning": "NONE"

11

},

12

{

13

    "market": "SGD-BTC",

14

    "english\_name": "Bitcoin",

15

    "market\_warning": "NONE"

16

},

17

{

18

    "market": "SGD-USDT",

19

    "english\_name": "Tether",

20

    "market\_warning": "NONE"

21

},

22

{

23

    "market": "SGD-SOL",

24

    "english\_name": "Solana",

25

    "market\_warning": "NONE"

26

}

27

\]

Updated 7 days ago

---

---

**Source:**
[listing-market-list](https://global-docs.upbit.com/reference/listing-market-list)
