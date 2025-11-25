# Wallet Status

**Check the proper endpoint based on your region.**

The base_url differs by country/region. Make sure to specify the correct region
value for your environment.

\- Singapore (sg): https://sg-api.upbit.com  
\- Indonesia (id): https://id-api.upbit.com  
\- Thailand (th): https://th-api.upbit.com

Deposit and withdrawal service status API does not guarantee real-time status.

Get Deposit/Withdrawal Service Status API is not updated in real time and may be
delayed by several minutes. **It is recommended to use this information only for
reference purposes, not for trading strategies**. Before making an actual
deposit, please check the
[Upbit notice](https://sg.upbit.com/service_center/notice) and
[Real-time deposit/withdrawal status](https://sg.upbit.com/service_center/wallet_status)
page.

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

Revision History

| Version | Date       | Changes                                                                                                            |
| ------- | ---------- | ------------------------------------------------------------------------------------------------------------------ |
| v1.2.1  | 2025-07-28 | [Addition of `Get Deposit/Withdrawal Service Status` API](https://global-docs.upbit.com/changelog/wallet-status#/) |

Rate Limit

Up to 30 calls per second are allowed. This is measured on an account basis and
request counts are shared within the exchange 'default' group.

API Key Permission

[Authentication](auth) is required. No additional permissions needed.

#

200

List of service status

array of objects

object

currency

string

required

Currency code to be queried.

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

block_state

string

enum

Status of the blockchain network.  
This field may return `null` depending on the status of the wallet or exchange.

- `normal`: Normal
- `delayed`: Delayed
- `inactive`: Inactive

`normal` `delayed` `inactive`

block_height

integer

Current confirmed block height.  
This field may return `null` depending on the status of the wallet or exchange.

block_updated_at

string

Time when the block height was last updated (UTC).  
This field may return `null` depending on the status of the wallet or exchange.

block_elapsed_minutes

integer

required

Time elapsed since the last block update (minutes).  
This field may return `null` depending on the status of the wallet or exchange.

net_type

string

required

Deposit/withdrawal network type.  
Blockchain network identifier defined and used by Upbit.

network_name

string

required

Deposit/withdrawal network name.  
Blockchain network name shown to users in Upbit.

\[Example\]: "Ethereum", "Bitcoin", "Solana"

\-Singapore [Wallet Status](https://sg.upbit.com/service_center/wallet_status)

\-Indonesia [Wallet Status](https://id.upbit.com/service_center/wallet_status)

\-Thailand [Wallet Status](https://th.upbit.com/service_center/wallet_status)

Updated 7 days ago

---

ShellPythonJavaNode

Base URL

https://region\-api.upbit.com/v1/status/wallet

xxxxxxxxxx

1

curl \--request GET \\

2

    \--url 'https://{region}-api.upbit.com/v1/status/wallet' \\

3

    \--header 'Authorization: Bearer {JWT\_TOKEN}' \\

4

    \--header 'Accept: application/json'

5

​

xxxxxxxxxx

52

1

\[

2

{

3

    "currency": "BTC",

4

    "wallet\_state": "working",

5

    "block\_state": "normal",

6

    "block\_height": 907974,

7

    "block\_updated\_at": "2025-07-31T16:12:40.584+00:00",

8

    "block\_elapsed\_minutes": 15,

9

    "net\_type": "BTC",

10

    "network\_name": "Bitcoin"

11

},

12

{

13

    "currency": "ETH",

14

    "wallet\_state": "working",

15

    "block\_state": "normal",

16

    "block\_height": 23040230,

17

    "block\_updated\_at": "2025-07-31T16:19:28.010+00:00",

18

    "block\_elapsed\_minutes": 2,

19

    "net\_type": "ETH",

20

    "network\_name": "Ethereum"

21

},

22

{

23

    "currency": "XRP",

24

    "wallet\_state": "working",

25

    "block\_state": "normal",

26

    "block\_height": 97847580,

27

    "block\_updated\_at": "2025-07-31T16:21:01.018+00:00",

28

    "block\_elapsed\_minutes": 2,

29

    "net\_type": "XRP",

30

    "network\_name": "XRP Ledger"

31

},

32

{

33

    "currency": "USDT",

34

    "wallet\_state": "working",

35

    "block\_state": "normal",

36

    "block\_height": 23040230,

37

    "block\_updated\_at": "2025-07-31T16:19:28.010+00:00",

38

    "block\_elapsed\_minutes": 2,

39

    "net\_type": "ETH",

40

    "network\_name": "Ethereum"

41

},

42

{

43

    "currency": "SOL",

44

    "wallet\_state": "working",

45

    "block\_state": "normal",

46

    "block\_height": 356978700,

47

    "block\_updated\_at": "2025-07-31T16:20:59.957+00:00",

48

    "block\_elapsed\_minutes": 2,

49

    "net\_type": "SOL",

50

    "network\_name": "Solana"

51

}

52

\]

Updated 7 days ago

---

---

**Source:**
[wallet-status](https://global-docs.upbit.com/reference/wallet-status)
