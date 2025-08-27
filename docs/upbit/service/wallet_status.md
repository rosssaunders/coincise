# Wallet Status

JUMP TOCTRL-/

## Exchange API

- [Assets](/reference/overall-account-inquiry)
  - [Overall Account Inquiryget

    ](/reference/overall-account-inquiry)
- [Order](/reference/available-order-information)
  - [Available Order Informationget

    ](/reference/available-order-information)

  - [Individual Order Inquiryget

    ](/reference/individual-order-inquiry)

  - [Query Order List by IDget

    ](/reference/query-order-byid)

  - [Query Open Ordersget

    ](/reference/open-order)

  - [Query Closed Ordersget

    ](/reference/closed-order)

  - [Order Canceldel

    ](/reference/order-cancel)

  - [Batch Order Canceldel

    ](/reference/batch-cancel-order)

  - [Order List Canceldel

    ](/reference/order-list-cancel)

  - [Orderpost

    ](/reference/order)

  - [Cancel And New Orderpost

    ](/reference/cancel-and-new)
- [Withdrawal](/reference/withdrawal-list-inquiry)
  - [Withdrawal List Inquiryget

    ](/reference/withdrawal-list-inquiry)

  - [Individual Withdrawal Inquiryget

    ](/reference/individual-withdrawal-inquiry)

  - [Available Balance Informationget

    ](/reference/available-balance-information)

  - [Digital Asset Withdrawalpost

    ](/reference/withdrawal-digital-assets)

  - [Allowlisted Withdrawal Addressget

    ](/reference/allowlisted-withdrawal-address)

  - [Cancel Digital Asset Withdrawaldel

    ](/reference/cancel-withdrawal)
- [Deposit](/reference/deposit-list-inquiry)
  - [Deposit List Inquiryget

    ](/reference/deposit-list-inquiry)

  - [Individual Deposit Inquiryget

    ](/reference/individual-deposit-inquiry)

  - [Deposit Address Generationpost

    ](/reference/deposit-address-generation)

  - [General Deposit Address Inquiryget

    ](/reference/general-deposit-address-inquiry)

  - [Individual Deposit Address Inquiryget

    ](/reference/individual-deposit-address-inquiry)

  - [Travel Rule Deposit Verifcation](/reference/travelrule-verification)
    - [Travel Rule VASP Listget

      ](/reference/travelrule-vasp-list)

    - [Deposit Verification Using UUIDpost

      ](/reference/travelrule-uuid)

    - [Deposit Verification Using TxIDpost

      ](/reference/travelrule-txid)
  - [Available Deposit Informationget

    ](/reference/available-deposit-information)
- [Service](/reference/wallet-status)
  - [Wallet Statusget

    ](/reference/wallet-status)

## Quotation API

- [Quotation Market List](/reference/listing-market-list)
  - [Listing Market Listget

    ](/reference/listing-market-list)
- [Quotation Candles](/reference/seconds-candles)
  - [Seconds Candlesget

    ](/reference/seconds-candles)

  - [Minutes Candlesget

    ](/reference/minutes)

  - [Days Candlesget

    ](/reference/days)

  - [Weeks Candlesget

    ](/reference/weeks)

  - [Months Candlesget

    ](/reference/months)

  - [Years Candlesget

    ](/reference/years-candles)
- [Quotation Trades](/reference/today-trades-history)
  - [Recent Trades Historyget

    ](/reference/today-trades-history)
- [Quotation Tickers](/reference/tickers)
  - [Tickers by trading pairget

    ](/reference/tickers)

  - [Tickers by quote currenciesget

    ](/reference/tickers_by_quote)
- [Quotation Order Book](/reference/order-book-list)
  - [Order Book Listget

    ](/reference/order-book-list)

  - [Order Book Policyget

    ](/reference/order-book-policy)

## WEBSOCKET

- [General Information](/reference/general-info)
- [Authentication](/reference/authentication)
- [Test and Request examples](/reference/test-and-request-sample)
- [Request Format](/reference/websocket-request-format)
- [Request and Response](/reference/websocket-ticker)
  - [Ticker](/reference/websocket-ticker)
  - [Trade](/reference/websocket-trade)
  - [Orderbook](/reference/websocket-orderbook)
  - [Candle](/reference/websocket-candle)
  - [MyOrder (& Trade info)](/reference/websocket-myorder)
  - [MyAsset](/reference/websocket-myasset)
- [List Subscriptions](/reference/list-subscriptions)
- [Websocket Error](/reference/websocket-error)
- [Connection Management & Compression](/reference/connection-management-compression)

## Deprecated

- [Order List Inquiryget

  ](/reference/order-list-inquiry)

# Wallet Status

get https://EXCHANGE-REGION-ENDPOINT-URL.com/v1/status/wallet

/\*! tailwindcss v4.1.6 | MIT License | https://tailwindcss.com \*/ @layer
theme, base, components, utilities; @layer utilities;

> ❗️
>
> ###
>
> Wallet status data may differ from actual service status.
>
> [](#wallet-status-data-may-differ-from-actual-service-status)
>
> The deposit/withdrawal status and block status information provided by API
> **may be reflected with a delay of several minutes.** **Please use this API
> only for reference**, and be sure to refer to the Upbit notice and Wallet
> Status page before performing actual deposit and withdrawal.

> 🚧
>
> ###
>
> Network Type (net_type) vs. Network Name (network_name)
>
> [](#network-type-net_type-vs-network-name-network_name)
>
> - **What is Network Type (`net_type`)?**
>
>   It refers to the blockchain network used for digital asset deposit and
>   withdrawal, and the network (chain) used may differ depending on the type of
>   digital asset. _\***Please make sure that the address and the network match
>   exactly, as normal deposit and withdrawal may not be possible if the
>   networks do not match.**_ **The value of Network Type (net_type) is required
>   when withdrawing digital assets.**
>
> - **What is Network Name (`network_name`)?**
>
>   It is a function that allows you to **check the name of the blockchain
>   network for digital assets** supported by Upbit. It has the same value as
>   the 'Network' in the deposit and withdrawal status page provided by the
>   Upbit Support Center.
>
>   - [Singapore Wallet Status](https://sg.upbit.com/service_center/wallet_status)
>     l
>     [Indonesia Wallet Status](https://id.upbit.com/service_center/wallet_status)
>     l
>     [Thailand Wallet Status](https://th.upbit.com/service_center/wallet_status)

##

Response

[](#response)

| Name

|

Description

|

Type

|  |
|  |

|

currency

|

Currency Symbol

|

String

| |

wallet_state

|

Indicates the deposit/withdrawal availability for each digital asset

\- working : Deposit/Withdrawal is fine

\- withdraw_only : Only supports Withdrawal

\- deposit_only : Only supports Withdrawal

\- paused : Suspended

\- unsupported : In preparation

|

String

| |

block_state

|

Block network status

\- normal 

\- delayed

\- inactive (ex. maintenance, etc)

|

String

| |

block_height

|

Current block height of the network

|

Integer

| |

block_updated_at

|

Timestamp of the latest block update

|

DateString

| |

block_elapsed_minute

|

Minutes elapsed since the last block update

|

String

| |

net_type

|

Network type required for withdrawal requests

|

String

| |

network_name

|

Name of the blockchain network as shown on the Upbit deposit/withdrawal page

\-[Singapore Wallet Status](https://sg.upbit.com/service_center/wallet_status)

\-[Indonesia Wallet Status](https://id.upbit.com/service_center/wallet_status)

\-[Thailand Wallet Status](https://th.upbit.com/service_center/wallet_status)

|

String

|

Responses

# 200

OK

Response body

json

# 4XX

Client Error

Response body

json

Updated 30 days ago

---

[

Available Deposit Information

](/reference/available-deposit-information)[

Quotation Market List

](/reference/quotation-market-list)

Language

NodePythonRubyJava

Request

xxxxxxxxxx

1

const request \= require('request')

2

const uuidv4 \= require("uuid/v4")

3

const sign \= require('jsonwebtoken').sign

4

​

5

const access_key \= process.env.UPBIT_OPEN_API_ACCESS_KEY

6

const secret_key \= process.env.UPBIT_OPEN_API_SECRET_KEY

7

const server_url \= process.env.UPBIT_OPEN_API_SERVER_URL

8

​

9

const payload \= {

10

    access\_key: access\_key,

11

    nonce: uuidv4(),

12

}

13

​

14

const token \= sign(payload, secret_key)

15

​

16

const options \= {

17

    method: "GET",

18

    url: server\_url + "/v1/status/wallet",

19

    headers: {Authorization: \`Bearer \${token}\`},

20

}

21

​

22

request(options, (error, response, body) \=> {

23

    if (error) throw new Error(error)

24

    console.log(body)

25

})

RESPONSE

200 - Result

Example

xxxxxxxxxx

1

\[

2

{'currency': 'BTC',

3

'wallet_state': 'working',

4

'block_state': 'normal',

5

'block_height': 906620,

6

'block_updated_at': '2025-07-22T03:51:06.958+00:00',

7

'block_elapsed_minutes': 24,

8

'net_type': 'BTC',

9

'network_name': 'Bitcoin'},

10

{'currency': 'ETH',

11

'wallet_state': 'working',

12

'block_state': 'normal',

13

'block_height': 22972270,

14

'block_updated_at': '2025-07-22T04:15:07.195+00:00',

15

'block_elapsed_minutes': 0,

16

'net_type': 'ETH',

17

'network_name': 'Ethereum'},

18

{'currency': 'XRP',

19

'wallet_state': 'working',

20

'block_state': 'normal',

21

'block_height': 97636970,

22

'block_updated_at': '2025-07-22T04:15:41.470+00:00',

23

'block_elapsed_minutes': 0,

24

'net_type': 'XRP',

25

'network_name': 'XRP Ledger'},

26

{'currency': 'USDT',

27

...

28

'block_height': 3101601000,

29

'block_updated_at': '2025-07-22T04:15:29.170+00:00',

30

'block_elapsed_minutes': 0,

31

'net_type': 'APT',

32

'network_name': 'Aptos'}

33

\]

Updated 30 days ago

---

[

Available Deposit Information

](/reference/available-deposit-information)[

Quotation Market List

](/reference/quotation-market-list)

1.  Exchange API
2.  [

    Assets

    ](/reference/assets)

3.  [

    Overall Account Inquiryget

    ](/reference/overall-account-inquiry)

4.  [

    Order

    ](/reference/order_section)

5.  [

    Cancel And New Orderpost

    ](/reference/cancel-and-new)

6.  [

    Orderpost

    ](/reference/order)

7.  [

    Order List Canceldel

    ](/reference/order-list-cancel)

8.  [

    Batch Order Canceldel

    ](/reference/batch-cancel-order)

9.  [

    Order Canceldel

    ](/reference/order-cancel)

10. [


    Query Closed Ordersget

    ](/reference/closed-order)

11. [


    Query Open Ordersget

    ](/reference/open-order)

12. [


    Query Order List by IDget

    ](/reference/query-order-byid)

13. [


    Individual Order Inquiryget

    ](/reference/individual-order-inquiry)

14. [


    Available Order Informationget

    ](/reference/available-order-information)

15. [


    Withdrawal

    ](/reference/withdrawal)

16. [


    Cancel Digital Asset Withdrawaldel

    ](/reference/cancel-withdrawal)

17. [


    Allowlisted Withdrawal Addressget

    ](/reference/allowlisted-withdrawal-address)

18. [


    Digital Asset Withdrawalpost

    ](/reference/withdrawal-digital-assets)

19. [


    Available Balance Informationget

    ](/reference/available-balance-information)

20. [


    Individual Withdrawal Inquiryget

    ](/reference/individual-withdrawal-inquiry)

21. [


    Withdrawal List Inquiryget

    ](/reference/withdrawal-list-inquiry)

22. [


    Deposit

    ](/reference/deposit)

23. [


    Available Deposit Informationget

    ](/reference/available-deposit-information)

24. [


    Travel Rule Deposit Verifcation

    ](/reference/travelrule-verification)

25. [


    Deposit Verification Using TxIDpost

    ](/reference/travelrule-txid)

26. [


    Deposit Verification Using UUIDpost

    ](/reference/travelrule-uuid)

27. [


    Travel Rule VASP Listget

    ](/reference/travelrule-vasp-list)

28. [


    Individual Deposit Address Inquiryget

    ](/reference/individual-deposit-address-inquiry)

29. [


    General Deposit Address Inquiryget

    ](/reference/general-deposit-address-inquiry)

30. [


    Deposit Address Generationpost

    ](/reference/deposit-address-generation)

31. [


    Individual Deposit Inquiryget

    ](/reference/individual-deposit-inquiry)

32. [


    Deposit List Inquiryget

    ](/reference/deposit-list-inquiry)

33. [


    Service

    ](/reference/general-info-1)

34. [


    Wallet Statusget

    ](/reference/wallet-status)

1.  Quotation API
2.  [

    Quotation Market List

    ](/reference/quotation-market-list)

3.  [

    Listing Market Listget

    ](/reference/listing-market-list)

4.  [

    Quotation Candles

    ](/reference/quotation-candles)

5.  [

    Years Candlesget

    ](/reference/years-candles)

6.  [

    Months Candlesget

    ](/reference/months)

7.  [

    Weeks Candlesget

    ](/reference/weeks)

8.  [

    Days Candlesget

    ](/reference/days)

9.  [

    Minutes Candlesget

    ](/reference/minutes)

10. [


    Seconds Candlesget

    ](/reference/seconds-candles)

11. [


    Quotation Trades

    ](/reference/quotation-trades)

12. [


    Recent Trades Historyget

    ](/reference/today-trades-history)

13. [


    Quotation Tickers

    ](/reference/quotation-tickers)

14. [


    Tickers by quote currenciesget

    ](/reference/tickers_by_quote)

15. [


    Tickers by trading pairget

    ](/reference/tickers)

16. [


    Quotation Order Book

    ](/reference/quotation-orderbook)

17. [


    Order Book Policyget

    ](/reference/order-book-policy)

18. [


    Order Book Listget

    ](/reference/order-book-list)

1.  WEBSOCKET
2.  [

    General Information

    ](/reference/general-info)

3.  [

    Authentication

    ](/reference/authentication)

4.  [

    Test and Request examples

    ](/reference/test-and-request-sample)

5.  [

    Request Format

    ](/reference/websocket-request-format)

6.  [

    Request and Response

    ](/reference/websocket-request-response)

7.  [

    MyAsset

    ](/reference/websocket-myasset)

8.  [

    MyOrder (& Trade info)

    ](/reference/websocket-myorder)

9.  [

    Candle

    ](/reference/websocket-candle)

10. [


    Orderbook

    ](/reference/websocket-orderbook)

11. [


    Trade

    ](/reference/websocket-trade)

12. [


    Ticker

    ](/reference/websocket-ticker)

13. [


    List Subscriptions

    ](/reference/list-subscriptions)

14. [


    Websocket Error

    ](/reference/websocket-error)

15. [


    Connection Management & Compression

    ](/reference/connection-management-compression)

1.  Deprecated
2.  [

    Order List Inquiryget

    ](/reference/order-list-inquiry)

> **Source:**
> [wallet-status](https://global-docs.upbit.com/reference/wallet-status)
