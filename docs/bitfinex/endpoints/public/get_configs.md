# Configs

get

https://api-pub.bitfinex.com/v2/conf/pub:{Action}:{Object}:{Detail}

Fetch site configuration data

Mapping Requests

You can use a mapping request to retrieve a mapping of symbols to related
details. For example, you can send a request to _pub:map:currency:label_ to map
symbols to their verbose friendly names (e.g. BTC -> Bitcoin)

| Request                   | Description                                                                                                        |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| pub:map:currency:sym      | Map symbols to their API symbols (e.g. DSH -> DASH)                                                                |
| pub:map:currency:label    | Maps symbols to their verbose friendly name (e.g. BTC -> Bitcoin                                                   |
| pub:map:currency:unit     | Maps symbols to their unit of measure (where applicable) (e.g. IOT -> MegaIOTA)                                    |
| pub:map:currency:undl     | Maps derivatives symbols to their underlying currency (e.g. BTCF0 -> BTC)                                          |
| pub:map:currency:pool     | Maps symbols to the underlying network/protocol they operate on (e.g. BAT -> ETH)                                  |
| pub:map:currency:explorer | Maps symbols to their recognised block explorer URLs (e.g. ETH -> [https://etherscan.io](https://etherscan.io))    |
| pub:map:currency:tx:fee   | Maps currencies to their current withdrawal fee amount                                                             |
| pub:map:tx:method         | Maps currencies to their appropriate method(s) for API withdrawals (e.g. UST -> [TETHERUSDTBCH, TETHERUSDTALG, …]) |

Listing Requests

You can use a listing request to retrieve lists of currencies, trading pairs, or
leaderboard competitions.

| Request                  | Description                                                          |
| ------------------------ | -------------------------------------------------------------------- |
| pub:list:pair:exchange   | Fetch a list of valid exchange trading pairs                         |
| pub:list:pair:margin     | Fetch a list of valid margin trading pairs                           |
| pub:list:pair:futures    | Fetch a list of valid derivative pairs                               |
| pub:list:pair:securities | Fetch a list of valid securities pairs                               |
| pub:list:currency        | Fetch a list of all currencies available on the platform             |
| pub:list:currency:margin | Fetch a list of all currencies that can be used as margin collateral |
| pub:list:competitions    | Fetch a list of all active leaderboard competitions                  |

Info Requests

You can use an info request to fetch detailed information about pairs or
transactions

| Request               | Description                                                                                                                                                                                                               | Mapping                                                                                                                                                                                                                                                                                                       |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| pub:info:pair         | Fetches an array of market information for each trading pair                                                                                                                                                              | [[PAIR, [PLACEHOLDER, PLACEHOLDER, PLACEHOLDER, MIN\_ORDER\_SIZE, MAX\_ORDER\_SIZE, PLACEHOLDER, PLACEHOLDER, PLACEHOLDER, INITIAL\_MARGIN, MIN\_MARGIN][PLACEHOLDER, PLACEHOLDER, PLACEHOLDER, MIN\_ORDER\_SIZE, MAX\_ORDER\_SIZE, PLACEHOLDER, PLACEHOLDER, PLACEHOLDER, INITIAL\_MARGIN, MIN\_MARGIN]]...] |
| pub:info:pair:futures | Fetches an array of market information for each derivative trading pair                                                                                                                                                   | [[PAIR, [PLACEHOLDER, PLACEHOLDER, PLACEHOLDER, MIN\_ORDER\_SIZE, MAX\_ORDER\_SIZE, PLACEHOLDER, PLACEHOLDER, PLACEHOLDER, INITIAL\_MARGIN, MIN\_MARGIN][PLACEHOLDER, PLACEHOLDER, PLACEHOLDER, MIN\_ORDER\_SIZE, MAX\_ORDER\_SIZE, PLACEHOLDER, PLACEHOLDER, PLACEHOLDER, INITIAL\_MARGIN, MIN\_MARGIN]]...] |
| pub:info:tx:status    | Fetches an array showing the wallet status for each currency for deposits and withdrawals (1 = active, 0 = maintenance) Also shows if payment IDs are allowed for deposits and withdrawals (1 = allowed, 0 = not allowed) | [METHOD, DEP_STATUS, WD_STATUS, PH, PH, PH, PH, PAYMENT_ID_DEP, PAYMENT_ID_WD, PH, PH, DEPOSIT_CONFIRMATIONS_REQUIRED][METHOD, DEP\_STATUS, WD\_STATUS, PH, PH, PH, PH, PAYMENT\_ID\_DEP, PAYMENT\_ID\_WD, PH, PH, DEPOSIT\_CONFIRMATIONS\_REQUIRED]                                                          |

Other Requests

Requests that aren't grouped in the Map, List, or Info categories.

| Request         | Description                                                            |
| --------------- | ---------------------------------------------------------------------- |
| pub:spec:margin | Fetches lists of active haircuts and risk coefficients on margin pairs |
| pub:fees        | Fetch derivatives fees config                                          |

Requesting multiple configurations

Instead of performing a request for each configuration item, it is possible to
fetch multiple configurations in a single request. To do this, append each
request into a single string separated by comma's without any spaces.

Example of a multi-request that will fetch both margin and exchange trading
pairs:  
pub:list:pair:exchange,pub:list:pair:margin

**Ratelimit**: 90 req/min

Path Params

Action

string

required

Defaults to list

**Valid action values:** : 'map', 'list', 'info', 'fees', 'spec'

Object

string

required

Defaults to pair

**Valid object values for the map action:** 'currency', 'tx'.  
**Valid object values for the list action:** 'currency', 'pair',
'competitions'.  
**Valid object values for the info action:** 'pair', 'tx'  
**Valid object values for the fees action:** none  
**Valid object values for the spec action:** 'margin'

Detail

string

required

Defaults to exchange

**_The detail parameter is only required for the below action:object
values:_**  
A **map:currency** request requires one of the following **detail** values:  
'sym', 'label', 'unit', 'undl', 'pool', 'explorer'.  
A **map:tx** request requires the following **detail** value:  
'method'.  
A **list:pair** request requires one of the following **detail** values:  
'exchange', 'margin', 'futures', 'securities'  
A **list:currency** request can optionally use the following **detail** value:  
'margin'.  
A **info:tx** request requires the following **detail** value:  
'status'.

Responses

Request

curl \--request GET \\

     \--url https://api-pub.bitfinex.com/v2/conf/pub:list:pair:exchange \\

     \--header 'accept: application/json'

---

Section: General Source: https://docs.bitfinex.com/reference/rest-public-conf
Path: /v2/conf/pub:list:pair:exchange Method: GET
