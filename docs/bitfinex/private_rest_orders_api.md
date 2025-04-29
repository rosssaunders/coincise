# Bitfinex Orders

## URL

Authenticated endpoints should use the following domain: [https://api.bitfinex.com](https://api.bitfinex.com).

## Authentication

Authenticated endpoints require users to sign their requests using a pair of API-KEY and API-SECRET.  
Below you can find several guides to authenticate your HTTP requests using different programming languages.  
These examples use the [Submit Order](/reference/rest-auth-submit-order) endpoint but can be easily modified to make requests to other endpoints.

## Wallets

### Wallets

### 

Response data

[](#response-data)

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| \[0...n\] | WALLET | [Wallet](#wallet-arrays) | Each index contains one of the `n` current user's wallets. |

#### 

Wallet arrays

[](#wallet-arrays)

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| \[0\] | TYPE | string | Wallet name (exchange, margin, funding) |
| \[1\] | CURRENCY | string | Currency (e.g. USD, BTC, ETH, ...) |
| \[2\] | BALANCE | float | Balance |
| \[3\] | UNSETTLED\_INTEREST | float | Unsettled interest |
| \[4\] | AVAILABLE\_BALANCE | float | Wallet balance available for orders/withdrawal/transfer |
| \[5\] | LAST\_CHANGE | string | Description of the last ledger entry |
| \[6\] | LAST\_CHANGE\_METADATA | JSON | Optional object with details |

* * *

| --- | --- |
| Rate Limit: | 90 reqs/min (requests per minute) |

---

## Orders

### Retrieve Orders

### 

Response Fields

[](#response-fields)

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| \[0\] | ID | int | Order ID |
| \[1\] | GID | int | Group Order ID |
| \[2\] | CID | int | Client Order ID |
| \[3\] | SYMBOL | string | Trading pair (tBTCUSD, tLTCBTC, ...) |
| \[4\] | MTS\_CREATE | int | Millisecond epoch timestamp of creation |
| \[5\] | MTS\_UPDATE | int | Millisecond epoch timestamp of last update |
| \[6\] | AMOUNT | float | Positive means buy, negative means sell |
| \[7\] | AMOUNT\_ORIG | float | Original amount (before any update) |
| \[8\] | ORDER\_TYPE | string | The order's type (see list below) |
| \[9\] | TYPE\_PREV | string | Previous order type (before the last update) |
| \[10\] | MTS\_TIF | int | Millisecond epoch timestamp for TIF (Time-In-Force) |
| 

\[ . . . \]

 |
| \[12\] | FLAGS | int | Sum of all active flags for the order (values can be found [here](https://docs.bitfinex.com/v2/docs/flag-values)) |
| \[13\] | STATUS | string | A complete overview on available order statuses can be found [here](https://docs.bitfinex.com/docs/abbreviations-glossary#order-status) |
| 

\[ . . . \]

 |
| \[16\] | PRICE | float | Price |
| \[17\] | PRICE\_AVG | float | Average price |
| \[18\] | PRICE\_TRAILING | float | The trailing price |
| \[19\] | PRICE\_AUX\_LIMIT | float | Auxiliary Limit price (for STOP LIMIT) |
| 

\[ . . . \]

 |
| \[23\] | NOTIFY | int | 1 if operations on order must trigger a notification, 0 if operations on order must not trigger a notification |
| \[24\] | HIDDEN | int | 1 if order must be hidden, 0 if order must not be hidden |
| \[25\] | PLACED\_ID | int | If another order caused this order to be placed (OCO) this will be that other order's ID |
| 

\[ . . . \]

 |
| \[28\] | ROUTING | string | Indicates origin of action: BFX, API>BFX |
| 

\[ . . . \]

 |
| \[31\] | META | JSON | Additional meta information about the order ( $F7 = IS\_POST\_ONLY (0 if false, 1 if true), $F33 = Leverage (int), aff\_code: "aff\_code\_here") |td:has(div.placeholders) { background-color: #ebebeb } .placeholders { height: 10px; text-align: center; font-size: 16px; line-height: 8px; }

> ## 📘
> 
> Available order types
> 
> Available order types are: `LIMIT`, `EXCHANGE LIMIT`, `MARKET`, `EXCHANGE MARKET`, `STOP`, `EXCHANGE STOP`, `STOP LIMIT`, `EXCHANGE STOP LIMIT`, `TRAILING STOP`, `EXCHANGE TRAILING STOP`, `FOK`, `EXCHANGE FOK`, `IOC`, `EXCHANGE IOC`.

* * *

| --- | --- |
| Rate Limit: | 90 reqs/min (requests per minute) |

---

### Submit Order

### 

Response Fields

[](#response-fields)

This endpoint returns a notification.

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| \[0\] | MTS | int | Seconds epoch timestamp of notification |
| \[1\] | TYPE | string | Notification's type ("on-req") |
| \[2\] | MESSAGE\_ID | int | Unique notification's ID |
| 

\[ . . . \]

 |
| \[4\] | DATA | [Order](#order-objects)\[\] | An array containing only the new order |
| \[5\] | CODE | int | W.I.P. (work in progress) |
| \[6\] | STATUS | string | Status of the notification; it may vary over time (SUCCESS, ERROR, FAILURE, ...) |
| \[7\] | TEXT | string | Additional notification description |td:has(div.placeholders) { background-color: #ebebeb } .placeholders { height: 10px; text-align: center; font-size: 16px; line-height: 8px; }

#### 

Order objects

[](#order-objects)

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| \[0\] | ID | int | Order ID |
| \[1\] | GID | int | Group Order ID |
| \[2\] | CID | int | Client Order ID |
| \[3\] | SYMBOL | string | Trading pair (tBTCUSD, tLTCETH, ...) |
| \[4\] | MTS\_CREATE | int | Millisecond epoch timestamp of creation |
| \[5\] | MTS\_UPDATE | int | Millisecond epoch timestamp of last update |
| \[6\] | AMOUNT | float | Positive means buy, negative means sell |
| \[7\] | AMOUNT\_ORIG | float | Original amount (before any update) |
| \[8\] | ORDER\_TYPE | string | The order's type (see list below) |
| \[9\] | TYPE\_PREV | string | Previous order type (before the last update) |
| \[10\] | MTS\_TIF | int | Millisecond epoch timestamp for TIF (Time-In-Force) |
| 

\[ . . . \]

 |
| \[12\] | FLAGS | int | Sum of all active flags for the order (values can be found [here](https://docs.bitfinex.com/v2/docs/flag-values)) |
| \[13\] | STATUS | string | A complete overview on available order statuses can be found [here](https://docs.bitfinex.com/docs/abbreviations-glossary#order-status) |
| 

\[ . . . \]

 |
| \[16\] | PRICE | float | Price |
| \[17\] | PRICE\_AVG | float | Average price |
| \[18\] | PRICE\_TRAILING | float | The trailing price |
| \[19\] | PRICE\_AUX\_LIMIT | float | Auxiliary Limit price (for STOP LIMIT) |
| 

\[ . . . \]

 |
| \[23\] | NOTIFY | int | 1 if operations on order must trigger a notification, 0 if operations on order must not trigger a notification |
| \[24\] | HIDDEN | int | 1 if order must be hidden, 0 if order must not be hidden |
| \[25\] | PLACED\_ID | int | If another order caused this order to be placed (OCO) this will be that other order's ID |
| 

\[ . . . \]

 |
| \[28\] | ROUTING | string | Indicates origin of action: BFX, API>BFX |
| 

\[ . . . \]

 |
| \[31\] | META | JSON | Additional meta information about the order ( $F7 = IS\_POST\_ONLY (0 if false, 1 if true), $F33 = Leverage (int), aff\_code: "aff\_code\_here") |td:has(div.placeholders) { background-color: #ebebeb } .placeholders { height: 10px; text-align: center; font-size: 16px; line-height: 8px; }

> ## 📘
> 
> Available order types
> 
> Available order types are: `LIMIT`, `EXCHANGE LIMIT`, `MARKET`, `EXCHANGE MARKET`, `STOP`, `EXCHANGE STOP`, `STOP LIMIT`, `EXCHANGE STOP LIMIT`, `TRAILING STOP`, `EXCHANGE TRAILING STOP`, `FOK`, `EXCHANGE FOK`, `IOC`, `EXCHANGE IOC`.

> ## 📘
> 
> Using multiple flags at once
> 
> You may sum flag values to pass multiple flags.  
> For example, 4160 (64 + 4096) means Hidden and Post Only.

> ## 🚧
> 
> meta: {aff\_code: ...}
> 
> API orders can now pass an affiliate code through which you can earn rebates. To learn more about these rebates and our affiliate program, please look at the relevant [announcement](https://blog.bitfinex.com/announcements/the-revolution-continues/) and [knowledge base article](https://support.bitfinex.com/hc/en-us/articles/360036965234-The-Bitfinex-Affiliate-Program).

> ## 🚧
> 
> meta: {protect\_selfmatch: 1}
> 
> The 'protect\_selfmatch' flag can be used to avoid matching orders with standing orders on the same account. This flag is passed in the meta object in the order body when submitting or updating your orders.
> 
> Note that this flag is only intended to assist users in avoiding unintentional wash trading. As per our [trading rulebook](https://www.bitfinex.com/legal/trading-rulebook), wash trading is forbidden on the platform.

* * *

| --- | --- |
| Rate Limit: | 90 reqs/min (requests per minute) |

---

### Order Update

### 

Response Fields

[](#response-fields)

This endpoint returns a notification.

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| \[0\] | MTS | int | Milliseconds epoch timestamp of notification |
| \[1\] | TYPE | string | Notification's type ("ou-req") |
| \[2\] | MESSAGE\_ID | int | Unique notification's ID |
| 

\[ . . . \]

 |
| \[4\] | DATA | [Order](#order-objects) | The order that has been updated |
| \[5\] | CODE | int | W.I.P. (work in progress) |
| \[6\] | STATUS | string | Status of the notification; it may vary over time (SUCCESS, ERROR, FAILURE, ...) |
| \[7\] | TEXT | string | Additional notification description |td:has(div.placeholders) { background-color: #ebebeb } .placeholders { height: 10px; text-align: center; font-size: 16px; line-height: 8px; }

#### 

Order objects

[](#order-objects)

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| \[0\] | ID | int | Order ID |
| \[1\] | GID | int | Group Order ID |
| \[2\] | CID | int | Client Order ID |
| \[3\] | SYMBOL | string | Trading pair (tBTCUSD, tLTCETH, ...) |
| \[4\] | MTS\_CREATE | int | Millisecond epoch timestamp of creation |
| \[5\] | MTS\_UPDATE | int | Millisecond epoch timestamp of last update |
| \[6\] | AMOUNT | float | Positive means buy, negative means sell |
| \[7\] | AMOUNT\_ORIG | float | Original amount (before any update) |
| \[8\] | ORDER\_TYPE | string | The order's type (see list below) |
| \[9\] | TYPE\_PREV | string | Previous order type (before the last update) |
| \[10\] | MTS\_TIF | int | Millisecond epoch timestamp for TIF (Time-In-Force) |
| 

\[ . . . \]

 |
| \[12\] | FLAGS | int | Sum of all active flags for the order (values can be found [here](https://docs.bitfinex.com/v2/docs/flag-values)) |
| \[13\] | STATUS | string | A complete overview on available order statuses can be found [here](https://docs.bitfinex.com/docs/abbreviations-glossary#order-status) |
| 

\[ . . . \]

 |
| \[16\] | PRICE | float | Price |
| \[17\] | PRICE\_AVG | float | Average price |
| \[18\] | PRICE\_TRAILING | float | The trailing price |
| \[19\] | PRICE\_AUX\_LIMIT | float | Auxiliary Limit price (for STOP LIMIT) |
| 

\[ . . . \]

 |
| \[23\] | NOTIFY | int | 1 if operations on order must trigger a notification, 0 if operations on order must not trigger a notification |
| \[24\] | HIDDEN | int | 1 if order must be hidden, 0 if order must not be hidden |
| \[25\] | PLACED\_ID | int | If another order caused this order to be placed (OCO) this will be that other order's ID |
| 

\[ . . . \]

 |
| \[28\] | ROUTING | string | Indicates origin of action: BFX, API>BFX |
| 

\[ . . . \]

 |
| \[31\] | META | JSON | Additional meta information about the order ( $F7 = IS\_POST\_ONLY (0 if false, 1 if true), $F33 = Leverage (int), aff\_code: "aff\_code\_here") |td:has(div.placeholders) { background-color: #ebebeb } .placeholders { height: 10px; text-align: center; font-size: 16px; line-height: 8px; }

> ## 📘
> 
> Available order types
> 
> Available order types are: `LIMIT`, `EXCHANGE LIMIT`, `MARKET`, `EXCHANGE MARKET`, `STOP`, `EXCHANGE STOP`, `STOP LIMIT`, `EXCHANGE STOP LIMIT`, `TRAILING STOP`, `EXCHANGE TRAILING STOP`, `FOK`, `EXCHANGE FOK`, `IOC`, `EXCHANGE IOC`.

> ## 📘
> 
> Using multiple flags at once
> 
> You may sum flag values to pass multiple flags.  
> For example, 4160 (64 + 4096) means Hidden and Post Only.

> ## 🚧
> 
> meta: {protect\_selfmatch: 1}
> 
> The 'protect\_selfmatch' flag can be used to avoid matching orders with standing orders on the same account. This flag is passed in the meta object in the order body when submitting or updating your orders.
> 
> Note that this flag is only intended to assist users in avoiding unintentional wash trading. As per our [trading rulebook](https://www.bitfinex.com/legal/trading-rulebook), wash trading is forbidden on the platform.

* * *

| --- | --- |
| Rate Limit: | 90 reqs/min (requests per minute) |

---

### Cancel Order

Users can cancel their margin, exchange and derivative orders by providing their IDs.

Alternatively, users can cancel an order using its CID along with a date (YYYY-MM-DD).

Both the ID and CID of an order can be get through the [Retrieve Orders](/reference/rest-auth-retrieve-orders) and [Retrieve Orders (by symbol)](/reference/rest-auth-retrieve-orders-by-symbol) endpoints.

### 

Response Fields

[](#response-fields)

This endpoint returns a notification.

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| \[0\] | MTS | int | Milliseconds epoch timestamp of notification |
| \[1\] | TYPE | string | Notification's type ("oc-req") |
| \[2\] | MESSAGE\_ID | int | Unique notification's ID |
| 

\[ . . . \]

 |
| \[4\] | DATA | [Order](#order-objects) | The order that has been cancelled |
| \[5\] | CODE | int | W.I.P. (work in progress) |
| \[6\] | STATUS | string | Status of the notification; it may vary over time (SUCCESS, ERROR, FAILURE, ...) |
| \[7\] | TEXT | string | Additional notification description |td:has(div.placeholders) { background-color: #ebebeb } .placeholders { height: 10px; text-align: center; font-size: 16px; line-height: 8px; }

#### 

Order arrays

[](#order-arrays)

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| \[0\] | ID | int | Order ID |
| \[1\] | GID | int | Group Order ID |
| \[2\] | CID | int | Client Order ID |
| \[3\] | SYMBOL | string | Trading pair (tBTCUSD, tLTCETH, ...) |
| \[4\] | MTS\_CREATE | int | Millisecond epoch timestamp of creation |
| \[5\] | MTS\_UPDATE | int | Millisecond epoch timestamp of last update |
| \[6\] | AMOUNT | float | Positive means buy, negative means sell |
| \[7\] | AMOUNT\_ORIG | float | Original amount (before any update) |
| \[8\] | ORDER\_TYPE | string | The order's type (see list below) |
| \[9\] | TYPE\_PREV | string | Previous order type (before the last update) |
| \[10\] | MTS\_TIF | int | Millisecond epoch timestamp for TIF (Time-In-Force) |
| 

\[ . . . \]

 |
| \[12\] | FLAGS | int | Sum of all active flags for the order (values can be found [here](https://docs.bitfinex.com/v2/docs/flag-values)) |
| \[13\] | STATUS | string | A complete overview on available order statuses can be found [here](https://docs.bitfinex.com/docs/abbreviations-glossary#order-status) |
| 

\[ . . . \]

 |
| \[16\] | PRICE | float | Price |
| \[17\] | PRICE\_AVG | float | Average price |
| \[18\] | PRICE\_TRAILING | float | The trailing price |
| \[19\] | PRICE\_AUX\_LIMIT | float | Auxiliary Limit price (for STOP LIMIT) |
| 

\[ . . . \]

 |
| \[23\] | NOTIFY | int | 1 if operations on order must trigger a notification, 0 if operations on order must not trigger a notification |
| \[24\] | HIDDEN | int | 1 if order must be hidden, 0 if order must not be hidden |
| \[25\] | PLACED\_ID | int | If another order caused this order to be placed (OCO) this will be that other order's ID |
| 

\[ . . . \]

 |
| \[28\] | ROUTING | string | Indicates origin of action: BFX, API>BFX |
| 

\[ . . . \]

 |
| \[31\] | META | JSON | Additional meta information about the order ( $F7 = IS\_POST\_ONLY (0 if false, 1 if true), $F33 = Leverage (int), aff\_code: "aff\_code\_here") |td:has(div.placeholders) { background-color: #ebebeb } .placeholders { height: 10px; text-align: center; font-size: 16px; line-height: 8px; }

> ## 📘
> 
> Available order types
> 
> Available order types are: `LIMIT`, `EXCHANGE LIMIT`, `MARKET`, `EXCHANGE MARKET`, `STOP`, `EXCHANGE STOP`, `STOP LIMIT`, `EXCHANGE STOP LIMIT`, `TRAILING STOP`, `EXCHANGE TRAILING STOP`, `FOK`, `EXCHANGE FOK`, `IOC`, `EXCHANGE IOC`.

* * *

| --- | --- |
| Rate Limit: | 90 reqs/min (requests per minute) |

---

### Order Multi-OP

> ## ❗️
> 
> Cancel All Orders
> 
> Please note that using {"all" : 1} to cancel all orders will cancel all trading as well as all derivatives orders. Order IDs can be passed instead to cancel only selected orders.

> ## 🚧
> 
> meta: {protect\_selfmatch: 1}
> 
> The 'protect\_selfmatch' flag can be used to avoid matching orders with standing orders on the same account. This flag is passed in the meta object in the order body when submitting or updating your orders.
> 
> Note that this flag is only intended to assist users in avoiding unintentional wash trading. As per our [trading rulebook](https://www.bitfinex.com/legal/trading-rulebook), wash trading is forbidden on the platform.

**Response Fields**

| Term | Type | Description |
| --- | --- | --- |
| MTS | int | Millisecond Time Stamp of the update |
| TYPE | string | Purpose of notification ('on-req', 'oc-req', 'uca', 'fon-req', 'foc-req') |
| MESSAGE\_ID | int | unique ID of the message |
| ID | int | Order ID |
| GID | int | Group ID |
| CID | int | Client Order ID |
| SYMBOL | string | Pair (tBTCUSD, …) |
| MTS\_CREATE | int | Millisecond timestamp of creation |
| MTS\_UPDATE | int | Millisecond timestamp of update |
| AMOUNT | float | Positive means buy, negative means sell. |
| AMOUNT\_ORIG | float | Original amount |
| TYPE | string | The type of the order: LIMIT, EXCHANGE LIMIT, MARKET, EXCHANGE MARKET, STOP, EXCHANGE STOP, STOP LIMIT, EXCHANGE STOP LIMIT, TRAILING STOP, EXCHANGE TRAILING STOP, FOK, EXCHANGE FOK, IOC, EXCHANGE IOC. |
| TYPE\_PREV | string | Previous order type |
| MTS\_TIF | int | Millisecond timestamp of Time-In-Force: automatic order cancellation |
| ORDER\_STATUS | string | Order Status: ACTIVE, EXECUTED @ PRICE(AMOUNT) e.g. "EXECUTED @ 107.6(-0.2)", PARTIALLY FILLED @ PRICE(AMOUNT), INSUFFICIENT MARGIN was: PARTIALLY FILLED @ PRICE(AMOUNT), CANCELED, CANCELED was: PARTIALLY FILLED @ PRICE(AMOUNT), RSN\_DUST (amount is less than 0.00000001), RSN\_PAUSE (trading is paused due to rebase events on AMPL or funding settlement on derivatives) |
| PRICE | float | Price |
| PRICE\_AVG | float | Average price |
| PRICE\_TRAILING | float | The trailing price |
| PRICE\_AUX\_LIMIT | float | Auxiliary Limit price (for STOP LIMIT) |
| HIDDEN | int | "null" if false, 1 if true |
| PLACED\_ID | int | If another order caused this order to be placed (OCO) this will be that other order's ID |
| ROUTING | string | indicates origin of action: BFX, ETHFX, API>BFX, API>ETHFX |
| FLAGS | int | See [https://docs.bitfinex.com/v2/docs/flag-values](/docs/flag-values). |
| META | json string | Additional meta information about the order ( $F7 = IS\_POST\_ONLY (0 if false, 1 if true), $F33 = Leverage (int)) |
| CODE | null or integer | Work in progress |
| STATUS | string | Status of the notification; it may vary over time (SUCCESS, ERROR, FAILURE, ...) |
| TEXT | string | Text of the notification |

**Ratelimit**: 90 req/min

---

### Cancel Order Multi

### 

Response Fields

[](#response-fields)

This endpoint returns a notification.

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| \[0\] | MTS | int | Milliseconds epoch timestamp of notification |
| \[1\] | TYPE | string | Notification's type ("oc\_multi-req") |
| \[2\] | MESSAGE\_ID | int | Unique notification's ID |
| 

\[ . . . \]

 |
| \[4\] | DATA | [Order](#order-objects)\[\] | An array containing all orders that have been cancelled |
| \[5\] | CODE | int | W.I.P. (work in progress) |
| \[6\] | STATUS | string | Status of the notification; it may vary over time (SUCCESS, ERROR, FAILURE, ...) |
| \[7\] | TEXT | string | Additional notification description |td:has(div.placeholders) { background-color: #ebebeb } .placeholders { height: 10px; text-align: center; font-size: 16px; line-height: 8px; }

#### 

Order objects

[](#order-objects)

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| \[0\] | ID | int | Order ID |
| \[1\] | GID | int | Group Order ID |
| \[2\] | CID | int | Client Order ID |
| \[3\] | SYMBOL | string | Trading pair (tBTCUSD, tLTCETH, ...) |
| \[4\] | MTS\_CREATE | int | Millisecond epoch timestamp of creation |
| \[5\] | MTS\_UPDATE | int | Millisecond epoch timestamp of last update |
| \[6\] | AMOUNT | float | Positive means buy, negative means sell |
| \[7\] | AMOUNT\_ORIG | float | Original amount (before any update) |
| \[8\] | ORDER\_TYPE | string | The order's type (see list below) |
| \[9\] | TYPE\_PREV | string | Previous order type (before the last update) |
| \[10\] | MTS\_TIF | int | Millisecond epoch timestamp for TIF (Time-In-Force) |
| 

\[ . . . \]

 |
| \[12\] | FLAGS | int | Sum of all active flags for the order (values can be found [here](https://docs.bitfinex.com/v2/docs/flag-values)) |
| \[13\] | STATUS | string | A complete overview on available order statuses can be found [here](https://docs.bitfinex.com/docs/abbreviations-glossary#order-status) |
| 

\[ . . . \]

 |
| \[16\] | PRICE | float | Price |
| \[17\] | PRICE\_AVG | float | Average price |
| \[18\] | PRICE\_TRAILING | float | The trailing price |
| \[19\] | PRICE\_AUX\_LIMIT | float | Auxiliary Limit price (for STOP LIMIT) |
| 

\[ . . . \]

 |
| \[23\] | NOTIFY | int | 1 if operations on order must trigger a notification, 0 if operations on order must not trigger a notification |
| \[24\] | HIDDEN | int | 1 if order must be hidden, 0 if order must not be hidden |
| \[25\] | PLACED\_ID | int | If another order caused this order to be placed (OCO) this will be that other order's ID |
| 

\[ . . . \]

 |
| \[28\] | ROUTING | string | Indicates origin of action: BFX, API>BFX |
| 

\[ . . . \]

 |
| \[31\] | META | JSON | Additional meta information about the order ( $F7 = IS\_POST\_ONLY (0 if false, 1 if true), $F33 = Leverage (int), aff\_code: "aff\_code\_here") |td:has(div.placeholders) { background-color: #ebebeb } .placeholders { height: 10px; text-align: center; font-size: 16px; line-height: 8px; }

> ## 📘
> 
> Available order types
> 
> Available order types are: `LIMIT`, `EXCHANGE LIMIT`, `MARKET`, `EXCHANGE MARKET`, `STOP`, `EXCHANGE STOP`, `STOP LIMIT`, `EXCHANGE STOP LIMIT`, `TRAILING STOP`, `EXCHANGE TRAILING STOP`, `FOK`, `EXCHANGE FOK`, `IOC`, `EXCHANGE IOC`.

* * *

| --- | --- |
| Rate Limit: | 90 reqs/min (requests per minute) |

---

### Orders History

### 

Response Fields

[](#response-fields)

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| \[0\] | ID | int | Order ID |
| \[1\] | GID | int | Group Order ID |
| \[2\] | CID | int | Client Order ID |
| \[3\] | SYMBOL | string | Trading pair (tBTCUSD, tLTCBTC, ...) |
| \[4\] | MTS\_CREATE | int | Millisecond epoch timestamp of creation |
| \[5\] | MTS\_UPDATE | int | Millisecond epoch timestamp of last update |
| \[6\] | AMOUNT | float | Positive means buy, negative means sell |
| \[7\] | AMOUNT\_ORIG | float | Original amount (before any update) |
| \[8\] | ORDER\_TYPE | string | The order's type (see list below) |
| \[9\] | TYPE\_PREV | string | Previous order type (before the last update) |
| \[10\] | MTS\_TIF | int | Millisecond epoch timestamp for TIF (Time-In-Force) |
| 

\[ . . . \]

 |
| \[12\] | FLAGS | int | Sum of all active flags for the order (values can be found [here](https://docs.bitfinex.com/v2/docs/flag-values)) |
| \[13\] | STATUS | string | A complete overview on available order statuses can be found [here](https://docs.bitfinex.com/docs/abbreviations-glossary#order-status) |
| 

\[ . . . \]

 |
| \[16\] | PRICE | float | Price |
| \[17\] | PRICE\_AVG | float | Average price |
| \[18\] | PRICE\_TRAILING | float | The trailing price |
| \[19\] | PRICE\_AUX\_LIMIT | float | Auxiliary Limit price (for STOP LIMIT) |
| 

\[ . . . \]

 |
| \[23\] | NOTIFY | int | 1 if operations on order must trigger a notification, 0 if operations on order must not trigger a notification |
| \[24\] | HIDDEN | int | 1 if order must be hidden, 0 if order must not be hidden |
| \[25\] | PLACED\_ID | int | If another order caused this order to be placed (OCO) this will be that other order's ID |
| 

\[ . . . \]

 |
| \[28\] | ROUTING | string | Indicates origin of action: BFX, API>BFX |
| 

\[ . . . \]

 |
| \[31\] | META | JSON | Additional meta information about the order ( $F7 = IS\_POST\_ONLY (0 if false, 1 if true), $F33 = Leverage (int), aff\_code: "aff\_code\_here") |td:has(div.placeholders) { background-color: #ebebeb } .placeholders { height: 10px; text-align: center; font-size: 16px; line-height: 8px; }

> ## 📘
> 
> Available order types
> 
> Available order types are: `LIMIT`, `EXCHANGE LIMIT`, `MARKET`, `EXCHANGE MARKET`, `STOP`, `EXCHANGE STOP`, `STOP LIMIT`, `EXCHANGE STOP LIMIT`, `TRAILING STOP`, `EXCHANGE TRAILING STOP`, `FOK`, `EXCHANGE FOK`, `IOC`, `EXCHANGE IOC`.

* * *

| --- | --- |
| Rate Limit: | 90 reqs/min (requests per minute) |

---

### Order Trades

### 

Request Fields

[](#request-fields)

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| \[0\] | ID | int | Trade database id |
| \[1\] | SYMBOL | string | Symbol (BTCUSD, …) |
| \[2\] | MTS | int | Execution timestamp |
| \[3\] | ORDER\_ID | int | Order id |
| \[4\] | EXEC\_AMOUNT | float | Positive means buy, negative means sell |
| \[5\] | EXEC\_PRICE | float | Execution price |
| 

\[ . . . \]

 |
| \[8\] | MAKER | int | 1 if true, -1 if false |
| \[9\] | FEE | float | Fee |
| \[10\] | FEE\_CURRENCY | string | Fee currency |
| \[11\] | CID | string | Client Order ID |td:has(div.placeholders) { background-color: #ebebeb } .placeholders { height: 10px; text-align: center; font-size: 16px; line-height: 8px; }

* * *

| --- | --- |
| Rate Limit: | 90 reqs/min (requests per minute) |

---

### Trades

### 

Response Fields

[](#response-fields)

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| \[0\] | ID | int | Trade database id |
| \[1\] | SYMBOL | string | Symbol (BTCUSD, …) |
| \[2\] | MTS | int | Execution timestamp |
| \[3\] | ORDER\_ID | int | Order id |
| \[4\] | EXEC\_AMOUNT | float | Positive means buy, negative means sell |
| \[5\] | EXEC\_PRICE | float | Execution price |
| \[6\] | ORDER\_TYPE | string | Order type |
| \[7\] | ORDER\_PRICE | float | Order price |
| \[8\] | MAKER | int | 1 if true, -1 if false |
| \[9\] | FEE | float | Fee |
| \[10\] | FEE\_CURRENCY | string | Fee currency |
| \[11\] | CID | int | Client Order ID |

> ## 🚧
> 
> Order type
> 
> For trades older than March 2020, the ORDER\_TYPE field will not be set.

* * *

| --- | --- |
| Rate Limit: | 90 reqs/min (requests per minute) |

---

### Ledgers

> ## 🚧
> 
> Retrieve all ledgers
> 
> The currency param can be omitted to return a ledger including all currencies. The path for this call is 'v2/auth/r/ledgers/hist'.

### 

Response data

[](#response-data)

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| \[0...n\] | LEDGER\_ENTRY | [Ledger entry](#ledger-entry-arrays) | Each index contains one of the `n` current user's ledger entries. |

#### 

Ledger entry arrays

[](#ledger-entry-arrays)

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| \[0\] | ID | int | Ledger identifier |
| \[1\] | CURRENCY | string | The symbol of the currency (e.g. "BTC") |
| \[2\] | WALLET | string (or null) | Returns the relevant wallet for the ledger entry ('exchange', 'margin', 'funding', 'contribution') |
| \[3\] | MTS | int | Timestamp in milliseconds |
| 

\[ . . . \]

 |
| \[5\] | AMOUNT | float | Amount changed |
| \[6\] | BALANCE | float | Balance after change |
| 

\[ . . . \]

 |
| \[8\] | DESCRIPTION | string | Description of ledger transaction |td:has(div.placeholders) { background-color: #ebebeb } .placeholders { height: 10px; text-align: center; font-size: 16px; line-height: 8px; }

#### 

Possible values for the 'category' filter

[](#possible-values-for-the-category-filter)

This table shows the possible values for the 'category' body param. The table shows the filter followed by the int value that should be entered in the 'category' param to activate the filter.

| Filter | Int Value | Filter | Int Value | Filter | Int Value |
| --- | --- | --- | --- | --- | --- |
| exchange | 5 | canceled withdrawal | 105 | withdrawal fee | 254 |
| position modified, closed, or liquidated | 22 | trading fee | 201 | withdrawal express fee | 255 |
| position claim | 23 | trading rebate | 202 | miner fee | 258 |
| position transfer | 25 | hidden order fee | 204 | staking payment | 262 |
| position swap | 26 | otc trade fee | 207 | adjustment | 401 |
| position funding cost or interest charged | 27 | swap fee | 222 | expense | 501 |
| margin / swap / interest payment | 28 | claiming fee | 224 | currency conversion / computation fee | 905 |
| derivatives funding event | 29 | used margin funding charge | 226 | monthly profit payment | 907 |
| settlement | 31 | unused margin funding fee | 228 | losses | 911 |
| transfer | 51 | earned fee / affiliate rebate | 241 |  |  |
| deposit | 101 | ETHFX loyalty fee | 243 |  |  |
| withdrawal | 104 | deposit fee | 251 |  |  |

**Ratelimit**: 90 req/min

---

## Positions

### Margin Info

### 

Response Fields

[](#response-fields)

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| \[0\] | STATUS | int | 1: operative, 0: maintenance |

> ## 🚧
> 
> Maintenance mode
> 
> When the platform is marked in maintenance mode, bots should stop all trading activity. Cancelling and placing new orders will not be possible during this time.

* * *

| --- | --- |
| Rate Limit: | 30 reqs/min (requests per minute) |

---

### Retrieve Positions

### 

Response Fields

[](#response-fields)

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| \[0\] | STATUS | int | 1: operative, 0: maintenance |

> ## 🚧
> 
> Maintenance mode
> 
> When the platform is marked in maintenance mode, bots should stop all trading activity. Cancelling and placing new orders will not be possible during this time.

* * *

| --- | --- |
| Rate Limit: | 30 reqs/min (requests per minute) |

---

### Claim Position

### 

Response Fields

[](#response-fields)

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| \[0\] | STATUS | int | 1: operative, 0: maintenance |

> ## 🚧
> 
> Maintenance mode
> 
> When the platform is marked in maintenance mode, bots should stop all trading activity. Cancelling and placing new orders will not be possible during this time.

* * *

| --- | --- |
| Rate Limit: | 30 reqs/min (requests per minute) |

---

### Increase Position

> ## 🚧
> 
> Verification Required
> 
> The Increase Position feature is only available on accounts with, basic+, intermediate or full [verification levels](https://support.bitfinex.com/hc/en-us/articles/360017321633-Verification-Levels-and-Advantages) or on accounts marked for paper trading.
> 
> Full verification is required to use the increase position feature to open a long position on pairs with a fiat quote currency.

### 

Response Fields

[](#response-fields)

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| \[0\] | MTS | int | Seconds epoch timestamp of notification |
| \[1\] | TYPE | string | Notification's type ("pmi-req") |
| \[2\] | MESSAGE\_ID | int | Unique notification's ID |
| 

\[ . . . \]

 |
| \[4\] | DATA | [Position increase array](#position-increase-array)\[\] | An array containing info on the position increase |
| \[5\] | CODE | int | W.I.P. (work in progress) |
| \[6\] | STATUS | string | Status of the notification; it may vary over time (SUCCESS, ERROR, FAILURE, ...) |
| \[7\] | TEXT | string | Additional notification description |td:has(div.placeholders) { background-color: #ebebeb } .placeholders { height: 10px; text-align: center; font-size: 16px; line-height: 8px; }

#### 

Position increase array

[](#position-increase-array)

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| \[0\] | SYMBOL | string | Pair (tBTCUSD, …) |
| 

\[ . . . \]

 |
| \[2\] | AMOUNT | float | Size of the position. Positive for long, negative for short positions |
| \[3\] | BASE\_PRICE | float | Base price of the position (average of all trades related to the position) |
| 

\[ . . . \]

 |td:has(div.placeholders) { background-color: #ebebeb } .placeholders { height: 10px; text-align: center; font-size: 16px; line-height: 8px; }

**Ratelimit**: 90 req/min

---

### Increase Position Info

**Response Fields**

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| \[0\] | POSITION INFO | [Position Info Array](#position-info-index-0) | Position info |
| \[1\] | BALANCE INFO | [Balance Info Array](#balance-info-index-1) | Array of info with base currency balance, tradable balance data, and available funding |
| 

\[ . . . \]

 |
| \[4\] | FUNDING INFO | [Funding Info Array](#funding-info-index-4) | Array with data on funding required |
| \[5\] | FUNDING CURRENCY INFO | [Funding Currency Info Array](#funding-currency-info-index-5) | Array with additional info on funding required |td:has(div.placeholders) { background-color: #ebebeb } .placeholders { height: 10px; text-align: center; font-size: 16px; line-height: 8px; }

#### 

Position Info (Index \[0\])

[](#position-info-index-0)

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| \[0\] | MAX\_POS | float | Maximum position size for increase position on the pair |
| \[1\] | CURRENT\_POS | float | Size of current position on the pair |td:has(div.placeholders) { background-color: #ebebeb } .placeholders { height: 10px; text-align: center; font-size: 16px; line-height: 8px; }

#### 

Balance Info (Index \[1\])

[](#balance-info-index-1)

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| \[0\] | BASE\_CURRENCY\_BALANCE | float | Current margin wallet balance in the base currency |
| \[1\] | TRADABLE BALANCE INFO | [Tradable Balance Info Array](#tradable-balance-info-index1) | Array with total and current tradable balances for both currencies |
| \[2\] | FUNDING\_AVAIL | float | Available funding below 0.75% (currency depends on the funding currency required for the entered amount) |td:has(div.placeholders) { background-color: #ebebeb } .placeholders { height: 10px; text-align: center; font-size: 16px; line-height: 8px; }

#### 

Tradable Balance Info (Index\[1\]\[1\])

[](#tradable-balance-info-index1)

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| \[0\] | TRADABLE\_BALANCE\_QUOTE\_CURRENCY | float | Tradable balance in the quote currency adjusted for open orders and positions |
| \[1\] | TRADABLE\_BALANCE\_QUOTE\_TOTAL | float | Tradable balance in the quote currency non-adjusted |
| \[2\] | TRADABLE\_BALANCE\_BASE\_CURRENCY | float | Tradable balance in the base currency adjusted for open orders and positions |
| \[3\] | TRADABLE\_BALANCE\_BASE\_TOTAL | float | Tradable balance in the base currency non-adjusted |td:has(div.placeholders) { background-color: #ebebeb } .placeholders { height: 10px; text-align: center; font-size: 16px; line-height: 8px; }

#### 

Funding Info (Index \[4\])

[](#funding-info-index-4)

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| \[0\] | FUNDING\_VALUE | float | Value of funding required in opposite currency |
| \[1\] | FUNDING\_REQUIRED | float | Funding required for a position of the specified amount |td:has(div.placeholders) { background-color: #ebebeb } .placeholders { height: 10px; text-align: center; font-size: 16px; line-height: 8px; }

#### 

Funding Currency Info (Index \[5\])

[](#funding-currency-info-index-5)

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| \[0\] | FUNDING\_VALUE\_CURRENCY | string | Currency of the FUNDING\_VALUE field |
| \[1\] | FUNDING\_REQUIRED\_CURRENCY | string | Currency of the FUNDING\_REQUIRED field |td:has(div.placeholders) { background-color: #ebebeb } .placeholders { height: 10px; text-align: center; font-size: 16px; line-height: 8px; }

**Ratelimit**: 90 req/min

---

### Positions History

### 

Response Fields

[](#response-fields)

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| \[0\] | STATUS | int | 1: operative, 0: maintenance |

> ## 🚧
> 
> Maintenance mode
> 
> When the platform is marked in maintenance mode, bots should stop all trading activity. Cancelling and placing new orders will not be possible during this time.

* * *

| --- | --- |
| Rate Limit: | 30 reqs/min (requests per minute) |

---

### Positions Snapshot

#### 

Response data

[](#response-data)

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| \[0...n\] | POSITION\_SNAPSHOT\_ARRAY | [Position snapshot array](#position-snapshot-entry-arrays-index-0n) | Each index contains one of the n\` current user's position snapshot entries |

#### 

Position snapshot entry arrays (index \[0...n\])

[](#position-snapshot-entry-arrays-index-0n)

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| \[0\] | SYMBOL | string | Pair (tBTCUSD, …). |
| \[1\] | STATUS | string | Status (ACTIVE). |
| \[2\] | AMOUNT | float | Size of the position. A positive value indicates a long position; a negative value indicates a short position. |
| \[3\] | BASE\_PRICE | float | Base price of the position. (Average traded price of the previous orders of the position) |
| \[4\] | FUNDING | float | Funding amount |
| \[5\] | FUNDING\_TYPE | int | 0 for daily, 1 for term. |
| 

\[ . . . \]

 |
| \[11\] | POSITION\_ID | int | Position identifier |
| \[12\] | MTS\_CREATE | int | Timestamp of creation (millis) |
| \[13\] | MTS\_UPDATE | int | Timestamp of last update (millis) |
| 

\[ . . . \]

 |td:has(div.placeholders) { background-color: #ebebeb } .placeholders { height: 10px; text-align: center; font-size: 16px; line-height: 8px; }

**Ratelimit**: 90 req/min

---

### Positions Audit

### 

Response Fields

[](#response-fields)

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| \[0\] | STATUS | int | 1: operative, 0: maintenance |

> ## 🚧
> 
> Maintenance mode
> 
> When the platform is marked in maintenance mode, bots should stop all trading activity. Cancelling and placing new orders will not be possible during this time.

* * *

| --- | --- |
| Rate Limit: | 30 reqs/min (requests per minute) |

---

### Derivative Position Collateral

### 

Response Fields

[](#response-fields)

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| \[0\] | STATUS | int | 1: operative, 0: maintenance |

> ## 🚧
> 
> Maintenance mode
> 
> When the platform is marked in maintenance mode, bots should stop all trading activity. Cancelling and placing new orders will not be possible during this time.

* * *

| --- | --- |
| Rate Limit: | 30 reqs/min (requests per minute) |

---

### Derivative Position Collateral Limits

When adjusting collateral on a derivative position, the system can sometimes return an error: \["error",110202,"collateral: market risk"\]. The error prevents the reduction of assigned collateral to a point where the risk of liquidation would be too high. When updating the collateral through the UI, minimum and maximum values are shown to prevent such an error. When updating collateral through the API, this endpoint can be used to calculate these minimum and maximum values.

> ## 🚧
> 
> Position required
> 
> An open position is required on the pair for which you would like to calculate the collateral limits.

**Response fields**

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| \[0\] | MIN\_COLLATERAL | float | Minimum amount of collateral that can be assigned to your current position on the provided pair. |
| \[1\] | MAX\_COLLATERAL | float | Maximum amount of collateral that can be assigned to your current position on the provided pair. |

**Ratelimit**: 90 req/min

---

## Margin Funding

### Active Funding Offers

#### 

Response data

[](#response-data)

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| \[0...n\] | FUNDING\_OFFER\_ARRAY | [Funding offer array](#active-funding-offers-entry-arrays-index-0n) | Each index contains one of the n\` current user's active funding offer entries |

#### 

Active funding offers entry arrays (index \[0...n\]

[](#active-funding-offers-entry-arrays-index-0n)

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| \[0\] | ID | Integer | Offer ID |
| \[1\] | SYMBOL | String | The currency of the offer (fUSD, etc) |
| \[2\] | MTS\_CREATED | Int | Millisecond Time Stamp when the offer was created |
| \[3\] | MTS\_UPDATED | Int | Millisecond Time Stamp when the offer was updated |
| \[4\] | AMOUNT | Float | Amount of the offer |
| \[5\] | AMOUNT\_ORIG | Float | Amount of the offer when it was first created |
| \[6\] | TYPE | String | "LIMIT, ..." |
| 

\[ . . . \]

 |
| \[9\] | FLAGS | Object | Future params object (stay tuned) |
| \[10\] | STATUS | String | Offer Status: ACTIVE, PARTIALLY FILLED |
| 

\[ . . . \]

 |
| \[14\] | RATE | Float | Rate of the offer (percentage expressed as decimal number i.e. 1% = 0.01) |
| \[15\] | PERIOD | Int | Period of the offer |
| \[16\] | NOTIFY | Int | 0 if false, 1 if true |
| \[17\] | HIDDEN | Int | null if false, 1 if true |
| 

\[ . . . \]

 |
| \[19\] | RENEW | Int | 0 if false, 1 if true |
| 

\[ . . . \]

 |td:has(div.placeholders) { background-color: #ebebeb } .placeholders { height: 10px; text-align: center; font-size: 16px; line-height: 8px; }

**Ratelimit**: 90 req/min

---

### Submit Funding Offer

**What is FRR?**

The FRR, or Flash Return Rate, is a dynamic rate that is a derivative of current market conditions.  
See the [Knowledge Base](https://support.bitfinex.com/hc/en-us/articles/213919009-Flash-Return-Rate) for more information.

**FRR Offer**

To place an FRR offer, use type FRRDELTAVAR and specify the rate as 0. This will place an FRRDELTAVAR offer with an offset of 0.

> ## 📘
> 
> Funding Order Types
> 
> **LIMIT: Place an order at an explicit, static rate**  
> e.g. Placing a LIMIT order with a rate of 0.01 will put an order on the book with a rate of 0.01. Do note that rates are percentages expressed as decimals, so a rate of 0.01 will equal 1%.
> 
> * * *
> 
> **FRRDELTAFIX: Place an order at an implicit, static rate, relative to the FRR**  
> e.g. Given that the FRR was 0.03 at the time, placing a FRRDELTAFIX order with a rate of 0.01 will put an order on the book with a rate of 0.04 (FRR + rate).
> 
> Before the order is matched, the rate updates against the FRR. Once matched, the rate becomes static and will no longer update against the FRR.
> 
> The offset can be negative or positive for FRRDELTAFIX.
> 
> * * *
> 
> **FRRDELTAVAR: Place an order at an implicit, dynamic rate, relative to the FRR**  
> e.g. Given that the FRR was 0.03 at the time, placing a FRRDELTAVAR order with a rate of 0.01 will put an order on the book with a rate of 0.04 (FRR + rate).
> 
> This rate will update automatically with the FRR both on the book as well as after matching.
> 
> The offset can only be positive for FRRDELTAVAR.

#### 

Response data

[](#response-data)

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| \[0\] | MTS | int | Seconds epoch timestamp of notification |
| \[1\] | TYPE | string | Notification's type ("on-req") |
| \[2\] | MESSAGE\_ID | int | Unique notification's ID |
| 

\[ . . . \]

 |
| \[4\] | FUNDING\_OFFER\_ARRAY | [FUNDING\_OFFER\_ARRAY](#funding-offer-array-index-4) | An array containing only the new offer |
| \[5\] | CODE | int | W.I.P. (work in progress) |
| \[6\] | STATUS | string | Status of the notification; it may vary over time (SUCCESS, ERROR, FAILURE, ...) |
| \[7\] | TEXT | string | Additional notification description |td:has(div.placeholders) { background-color: #ebebeb } .placeholders { height: 10px; text-align: center; font-size: 16px; line-height: 8px; }

#### 

Funding offer array (Index \[4\])

[](#funding-offer-array-index-4)

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| \[0\] | ID | Integer | Offer ID |
| \[1\] | SYMBOL | String | The currency of the offer (fUSD, etc) |
| \[2\] | MTS\_CREATED | Int | Millisecond Time Stamp when the offer was created |
| \[3\] | MTS\_UPDATED | Int | Millisecond Time Stamp when the offer was updated |
| \[4\] | AMOUNT | Float | Current amount of the offer |
| \[5\] | AMOUNT\_ORIGINAL | Float | Amount of the initial offer |
| \[6\] | OFFER\_TYPE | String | Offer Type |
| 

\[ . . . \]

 |
| \[9\] | FLAGS | Int | Flags active on the offer; see https://docs.bitfinex.com/v2/docs/flag-values |
| \[10\] | OFFER\_STATUS | String | Offer Status: ACTIVE, EXECUTED, PARTIALLY FILLED, CANCELED |
| 

\[ . . . \]

 |
| \[14\] | RATE | Float | Rate of the offer (percentage expressed as decimal number i.e. 1% = 0.01) |
| \[15\] | PERIOD | Int | Period of the offer |
| \[16\] | NOTIFY | Boolean | True / false |
| \[17\] | HIDDEN | Int | 0 if false, 1 if true |
| 

\[ . . . \]

 |
| \[19\] | RENEW | Boolean | True / false |td:has(div.placeholders) { background-color: #ebebeb; } .placeholders { height: 10px; text-align: center; font-size: 16px; line-height: 8px; }

**Ratelimit**: 90 req/min

---

### Cancel Funding Offer

> ## 📘
> 
> Offer ID
> 
> The offer ID can be retrieved by calling the [Funding Offers](/reference#rest-auth-funding-offers) endpoint.

#### 

Response data

[](#response-data)

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| \[0\] | MTS | int | Seconds epoch timestamp of notification |
| \[1\] | TYPE | string | Notification's type ("on-req") |
| \[2\] | MESSAGE\_ID | int | Unique notification's ID |
| 

\[ . . . \]

 |
| \[4\] | FUNDING\_OFFER\_ARRAY | [FUNDING\_OFFER\_ARRAY](#funding-offer-array-index-4) | An array containing only the new offer |
| \[5\] | CODE | int | W.I.P. (work in progress) |
| \[6\] | STATUS | string | Status of the notification; it may vary over time (SUCCESS, ERROR, FAILURE, ...) |
| \[7\] | TEXT | string | Additional notification description |td:has(div.placeholders) { background-color: #ebebeb } .placeholders { height: 10px; text-align: center; font-size: 16px; line-height: 8px; }

#### 

Funding offer array (Index \[4\])

[](#funding-offer-array-index-4)

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| \[0\] | ID | Integer | Offer ID |
| \[1\] | SYMBOL | String | The currency of the offer (fUSD, etc) |
| \[2\] | MTS\_CREATED | Int | Millisecond Time Stamp when the offer was created |
| \[3\] | MTS\_UPDATED | Int | Millisecond Time Stamp when the offer was updated |
| \[4\] | AMOUNT | Float | Current amount of the offer |
| \[5\] | AMOUNT\_ORIGINAL | Float | Amount of the initial offer |
| \[6\] | OFFER\_TYPE | String | Offer Type |
| 

\[ . . . \]

 |
| \[9\] | FLAGS | Int | Flags active on the offer; see https://docs.bitfinex.com/v2/docs/flag-values |
| \[10\] | OFFER\_STATUS | String | Offer Status: ACTIVE, EXECUTED, PARTIALLY FILLED, CANCELED |
| 

\[ . . . \]

 |
| \[14\] | RATE | Float | Rate of the offer (percentage expressed as decimal number i.e. 1% = 0.01) |
| \[15\] | PERIOD | Int | Period of the offer |
| \[16\] | NOTIFY | Boolean | True / false |
| \[17\] | HIDDEN | Int | 0 if false, 1 if true |
| 

\[ . . . \]

 |
| \[19\] | RENEW | Boolean | True / false |td:has(div.placeholders) { background-color: #ebebeb; } .placeholders { height: 10px; text-align: center; font-size: 16px; line-height: 8px; }

**Ratelimit**: 90 req/min

---

### Cancel All Funding Offers

> ## 📘
> 
> Currency
> 
> Specifying a currency is optional. If the currency param is omitted, all open offers will be cancelled.

**Response data**

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| \[0\] | MTS | Int | Millisecond Time Stamp of the update |
| \[1\] | TYPE | String | Purpose of notification ('foc\_all-req' (funding offer cancel all request)) |
| 

\[ . . . \]

 |
| \[6\] | STATUS | String | Status of the notification; it may vary over time (SUCCESS, ERROR, FAILURE, ...) |
| \[7\] | TEXT | String | Text of the notification |td:has(div.placeholders) { background-color: #ebebeb; } .placeholders { height: 10px; text-align: center; font-size: 16px; line-height: 8px; }

**Ratelimit**: 90 req/min

---

### Funding Close

#### 

Response data

[](#response-data)

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| \[0\] | MTS | Int | Millisecond Time Stamp of the update |
| \[1\] | TYPE | String | Purpose of notification ('on-req', 'oc-req', 'uca', 'fon-req', 'foc-req') |
| 

\[ . . . \]

 |
| \[6\] | STATUS | String | Status of the notification; it may vary over time (SUCCESS, ERROR, FAILURE, ...) |
| 

\[ . . . \]

 |td:has(div.placeholders) { background-color: #ebebeb; } .placeholders { height: 10px; text-align: center; font-size: 16px; line-height: 8px; }

> ## 🚧
> 
> Offer ID
> 
> Please note that the Offer ID needed is not the one received from the initial offer submission response. The Offer ID should be retrieved via the [Funding Loans](/reference#rest-auth-funding-loans) and [Funding Credits](/reference#rest-auth-funding-credits) endpoints.

**Ratelimit**: 90 req/min

---

### Funding Auto-renew

#### 

Response array

[](#response-array)

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| \[0\] | MTS | int | Seconds epoch timestamp of notification |
| \[1\] | TYPE | string | Notification's type ("fa-req") |
| \[2\] | MESSAGE\_ID | int | Unique notification's ID |
| 

\[ . . . \]

 |
| \[4\] | FUNDING\_OFFER\_ARRAY | [FUNDING\_OFFER\_ARRAY](#funding-offer-array-index-4) | An array containing data for the funding offer |
| \[5\] | CODE | int | W.I.P. (work in progress) |
| \[6\] | STATUS | string | Status of the notification; it may vary over time (SUCCESS, ERROR, FAILURE, ...) |
| \[7\] | TEXT | string | Additional notification description |td:has(div.placeholders) { background-color: #ebebeb } .placeholders { height: 10px; text-align: center; font-size: 16px; line-height: 8px; }

#### 

Funding offer array (index 4)

[](#funding-offer-array-index-4)

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| \[0\] | CURRENCY | String | Currency (USD, …) |
| \[1\] | PERIOD | Int | Period in days |
| \[2\] | RATE | Float | Rate of the offer (percentage expressed as decimal number i.e. 1% = 0.01) |
| \[3\] | THRESHOLD | Float | Max amount to be auto-renewed |td:has(div.placeholders) { background-color: #ebebeb; } .placeholders { height: 10px; text-align: center; font-size: 16px; line-height: 8px; }

**Ratelimit**: 90 req/min

---

### Keep Funding

> ## 📘
> 
> Loan and credit ID's
> 
> Loan or credit ID's can be retrieved through the [Funding Loans](/reference?showHidden=94bdb#rest-auth-funding-loans) and [Funding Credits](/reference?showHidden=94bdb#rest-auth-funding-credits) endpoints.

#### 

Response array

[](#response-array)

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| \[0\] | MTS | Int | Millisecond Time Stamp of the update |
| \[1\] | TYPE | String | Purpose of notification ('fk-req' (funding keep request)) |
| 

\[ . . . \]

 |
| \[6\] | STATUS | String | Status of the notification; it may vary over time (SUCCESS, ERROR, FAILURE, ...) |
| \[7\] | TEXT | String | Text of the notification |td:has(div.placeholders) { background-color: #ebebeb; } .placeholders { height: 10px; text-align: center; font-size: 16px; line-height: 8px; }

**Ratelimit**: 90 req/min

---

### Funding Offers History

#### 

Response data

[](#response-data)

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| \[0...n\] | FUNDING\_OFFER\_ARRAY | [Funding offer array](#funding-offers-history-entry-arrays-index-0n) | Each index contains one of the n\` current user's funding offer history entries |

#### 

Funding offers history entry arrays (Index \[0...n\])

[](#funding-offers-history-entry-arrays-index-0n)

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| \[0\] | ID | Int | Offer ID |
| \[1\] | SYMBOL | String | The currency of the offer (fUSD, etc) |
| \[2\] | MTS\_CREATED | Int | Millisecond Time Stamp when the offer was created |
| \[3\] | MTS\_UPDATED | Int | Millisecond Time Stamp when the offer was updated |
| \[4\] | AMOUNT | Float | Amount the offer is for |
| \[5\] | AMOUNT\_ORIG | Float | Amount the offer was entered with originally |
| \[6\] | TYPE | String | Offer type ('LIMIT') |
| 

\[ . . . \]

 |
| \[9\] | FLAGS | Object | Future params object (stay tuned) |
| \[10\] | STATUS | String | Offer Status: EXECUTED, CANCELED |
| 

\[ . . . \]

 |
| \[14\] | RATE | Float | Rate of the offer (percentage expressed as decimal number i.e. 1% = 0.01) |
| \[15\] | PERIOD | Int | Period of the offer |
| \[16\] | NOTIFY | Int | 0 if false, 1 if true |
| \[17\] | HIDDEN | Int | 0 if false, 1 if true |
| 

\[ . . . \]

 |
| \[19\] | RENEW | Int | 0 if false, 1 if true |
| 

\[ . . . \]

 |td:has(div.placeholders) { background-color: #ebebeb; } .placeholders { height: 10px; text-align: center; font-size: 16px; line-height: 8px; }

**Ratelimit**: 90 req/min

---

### Funding Loans

#### 

Response data

[](#response-data)

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| \[0...n\] | FUNDING\_LOAN\_ARRAY | [Funding loan array](#funding-loan-arrays-index-0n) | Each index contains one of the n\` current user's funding loans entries |

#### 

Funding loan arrays (Index \[0...n\])

[](#funding-loan-arrays-index-0n)

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| \[0\] | ID | Integer | Loan ID |
| \[1\] | SYMBOL | String | The currency of the loan (fUSD, etc) |
| \[2\] | SIDE | Int | 1 if you are the lender, 0 if you are both the lender and borrower, -1 if you're the borrower |
| \[3\] | MTS\_CREATE | Int | Millisecond Time Stamp when the loan was created |
| \[4\] | MTS\_UPDATE | Int | Millisecond Time Stamp when the loan was updated |
| \[5\] | AMOUNT | Float | Amount of funds provided |
| \[6\] | FLAGS | Object | Future params object (stay tuned) |
| \[7\] | STATUS | String | Loan Status: ACTIVE |
| \[8\] | RATE\_TYPE | String | "FIXED" or "VAR" (for FRR) |
| 

\[ . . . \]

 |
| \[11\] | RATE | Float | Rate of the loan (percentage expressed as decimal number i.e. 1% = 0.01) |
| \[12\] | PERIOD | Int | Period of the loan |
| \[13\] | MTS\_OPENING | Int | Millisecond Time Stamp for when the loan was opened |
| \[14\] | MTS\_LAST\_PAYOUT | Int | Millisecond Time Stamp for when the last payout was made |
| \[15\] | NOTIFY | Int | 0 if false, 1 if true |
| \[16\] | HIDDEN | Int | 0 if false, 1 if true |
| 

\[ . . . \]

 |
| \[18\] | RENEW | Int | 0 if false, 1 if true |
| 

\[ . . . \]

 |
| \[20\] | NO\_CLOSE | Int | If funding will be returned when position is closed. 0 if false, 1 if true |td:has(div.placeholders) { background-color: #ebebeb; } .placeholders { height: 10px; text-align: center; font-size: 16px; line-height: 8px; }

**Ratelimit**: 90 req/min

---

### Funding Loans History

#### 

Response data

[](#response-data)

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| \[0...n\] | FUNDING\_LOAN\_ARRAY | [Funding loan array](#funding-loan-arrays-index-0n) | Each index contains one of the n\` current user's funding loans entries |

#### 

Funding loan arrays (Index \[0...n\])

[](#funding-loan-arrays-index-0n)

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| \[0\] | ID | Integer | Loan ID |
| \[1\] | SYMBOL | String | The currency of the loan (fUSD, etc) |
| \[2\] | SIDE | Int | 1 if you are the lender, 0 if you are both the lender and borrower, -1 if you're the borrower |
| \[3\] | MTS\_CREATE | Int | Millisecond Time Stamp when the loan was created |
| \[4\] | MTS\_UPDATE | Int | Millisecond Time Stamp when the loan was updated |
| \[5\] | AMOUNT | Float | Amount of funds provided |
| \[6\] | FLAGS | Object | Future params object (stay tuned) |
| \[7\] | STATUS | String | Loan Status: ACTIVE |
| \[8\] | RATE\_TYPE | String | "FIXED" or "VAR" (for FRR) |
| 

\[ . . . \]

 |
| \[11\] | RATE | Float | Rate of the loan (percentage expressed as decimal number i.e. 1% = 0.01) |
| \[12\] | PERIOD | Int | Period of the loan |
| \[13\] | MTS\_OPENING | Int | Millisecond Time Stamp for when the loan was opened |
| \[14\] | MTS\_LAST\_PAYOUT | Int | Millisecond Time Stamp for when the last payout was made |
| \[15\] | NOTIFY | Int | 0 if false, 1 if true |
| \[16\] | HIDDEN | Int | 0 if false, 1 if true |
| 

\[ . . . \]

 |
| \[18\] | RENEW | Int | 0 if false, 1 if true |
| 

\[ . . . \]

 |
| \[20\] | NO\_CLOSE | Int | If funding will be returned when position is closed. 0 if false, 1 if true |td:has(div.placeholders) { background-color: #ebebeb; } .placeholders { height: 10px; text-align: center; font-size: 16px; line-height: 8px; }

**Ratelimit**: 90 req/min

---

### Funding Credits

#### 

Response data

[](#response-data)

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| \[0...n\] | FUNDING\_CREDIT\_ARRAY | [Funding credit array](#funding-credit-arrays-index-0n) | Each index contains one of the n\` current user's funding credits entries |

#### 

Funding credit arrays (Index \[0...n\])

[](#funding-credit-arrays-index-0n)

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| \[0\] | ID | Integer | Loan ID |
| \[1\] | SYMBOL | String | The currency of the loan (fUSD, etc) |
| \[2\] | SIDE | Int | 1 if you are the lender, 0 if you are both the lender and borrower, -1 if you're the borrower |
| \[3\] | MTS\_CREATE | Int | Millisecond Time Stamp when the loan was created |
| \[4\] | MTS\_UPDATE | Int | Millisecond Time Stamp when the loan was updated |
| \[5\] | AMOUNT | Float | Amount of funds provided |
| \[6\] | FLAGS | Object | Future params object (stay tuned) |
| \[7\] | STATUS | String | Loan Status: ACTIVE |
| \[8\] | RATE\_TYPE | String | "FIXED" or "VAR" (for FRR) |
| 

\[ . . . \]

 |
| \[11\] | RATE | Float | Rate of the loan (percentage expressed as decimal number i.e. 1% = 0.01) |
| \[12\] | PERIOD | Int | Period of the loan |
| \[13\] | MTS\_OPENING | Int | Millisecond Time Stamp for when the loan was opened |
| \[14\] | MTS\_LAST\_PAYOUT | Int | Millisecond Time Stamp for when the last payout was made |
| \[15\] | NOTIFY | Int | 0 if false, 1 if true |
| \[16\] | HIDDEN | Int | 0 if false, 1 if true |
| 

\[ . . . \]

 |
| \[18\] | RENEW | Int | 0 if false, 1 if true |
| 

\[ . . . \]

 |
| \[20\] | NO\_CLOSE | Int | If funding will be returned when position is closed. 0 if false, 1 if true |
| \[21\] | POSITION\_PAIR | String | Pair of the position that the funding was used for |td:has(div.placeholders) { background-color: #ebebeb; } .placeholders { height: 10px; text-align: center; font-size: 16px; line-height: 8px; }

**Ratelimit**: 90 req/min

---

### Funding Credits History

#### 

Response data

[](#response-data)

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| \[0...n\] | FUNDING\_CREDIT\_ARRAY | [Funding credit array](#funding-credit-arrays-index-0n) | Each index contains one of the n\` current user's funding credits history entries |

#### 

Funding credit arrays (Index \[0...n\])

[](#funding-credit-arrays-index-0n)

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| \[0\] | ID | Integer | Loan ID |
| \[1\] | SYMBOL | String | The currency of the loan (fUSD, etc) |
| \[2\] | SIDE | Int | 1 if you are the lender, 0 if you are both the lender and borrower, -1 if you're the borrower |
| \[3\] | MTS\_CREATE | Int | Millisecond Time Stamp when the loan was created |
| \[4\] | MTS\_UPDATE | Int | Millisecond Time Stamp when the loan was updated |
| \[5\] | AMOUNT | Float | Amount of funds provided |
| \[6\] | FLAGS | Object | Future params object (stay tuned) |
| \[7\] | STATUS | String | Loan Status: ACTIVE |
| \[8\] | RATE\_TYPE | String | "FIXED" or "VAR" (for FRR) |
| 

\[ . . . \]

 |
| \[11\] | RATE | Float | Rate of the loan (percentage expressed as decimal number i.e. 1% = 0.01) |
| \[12\] | PERIOD | Int | Period of the loan |
| \[13\] | MTS\_OPENING | Int | Millisecond Time Stamp for when the loan was opened |
| \[14\] | MTS\_LAST\_PAYOUT | Int | Millisecond Time Stamp for when the last payout was made |
| \[15\] | NOTIFY | Int | 0 if false, 1 if true |
| \[16\] | HIDDEN | Int | 0 if false, 1 if true |
| 

\[ . . . \]

 |
| \[18\] | RENEW | Int | 0 if false, 1 if true |
| 

\[ . . . \]

 |
| \[20\] | NO\_CLOSE | Int | If funding will be returned when position is closed. 0 if false, 1 if true |
| \[21\] | POSITION\_PAIR | String | Pair of the position that the funding was used for |td:has(div.placeholders) { background-color: #ebebeb; } .placeholders { height: 10px; text-align: center; font-size: 16px; line-height: 8px; }

**Ratelimit**: 90 req/min

---

### Funding Trades

#### 

Response data

[](#response-data)

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| \[0...n\] | FUNDING\_TRADE\_ARRAY | [Funding trade array](#funding-trade-arrays-index-0n) | Each index contains one of the n\` current user's funding trades entries. |

#### 

Funding trade arrays (Index \[0...n\])

[](#funding-trade-arrays-index-0n)

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| \[0\] | ID | Integer | Funding trade ID |
| \[1\] | CURRENCY | String | The currency of the offer (fUSD, etc) |
| \[2\] | MTS\_CREATE | Int | Millisecond Time Stamp when the offer was created |
| \[3\] | OFFER\_ID | Int | Funding offer ID |
| \[4\] | AMOUNT | Float | Amount the offer is for |
| \[5\] | RATE | Float | Rate of the offer (percentage expressed as decimal number i.e. 1% = 0.01) |
| \[6\] | PERIOD | Int | Period of the offer |
| 

\[ . . . \]

 |td:has(div.placeholders) { background-color: #ebebeb; } .placeholders { height: 10px; text-align: center; font-size: 16px; line-height: 8px; }

**Ratelimit**: 90 req/min

---

### Funding Info

#### 

Response fields

[](#response-fields)

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| \[0\] | "sym" | string | "sym" |
| \[1\] | SYMBOL | string | The symbol the information pertains to (funding currencies) |
| \[2\] | FUNDING\_INFO\_ARRAY | [Funding info array](#funding-info-array-index-3) | Contains info on the yield and duration of the user's taken and provided funding |

#### 

Funding info array (Index \[3\])

[](#funding-info-array-index-3)

| Index | Term | Type | Description |
| --- | --- | --- | --- |
| \[0\] | YIELD\_LOAN | float | Weighted average rate for taken funding |
| \[1\] | YIELD\_LEND | float | Weighted average rate for provided funding |
| \[2\] | DURATION\_LOAN | float | Weighted average duration for taken funding |
| \[3\] | DURATION\_LEND | float | Weighted average duration for provided funding |

**Ratelimit**: 90 req/min

---

## Account Actions

### User Info

#### 

Response data

[](#response-data)

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| \[0\] | ID | int | Account ID |
| \[1\] | EMAIL | string | Account Email |
| \[2\] | USERNAME | string | Account username |
| \[3\] | MTS\_ACCOUNT\_CREATE | int | Millisecond timestamp of account creation |
| \[4\] | VERIFIED | int | Indicates if the user has a verified status (KYC) 1 = true, 0 = false |
| \[5\] | VERIFICATION\_LEVEL | int | Account verification level |
| 

\[ . . . \]

 |
| \[7\] | TIMEZONE | string | Account timezone setting |
| \[8\] | LOCALE | string | Account locale setting |
| \[9\] | COMPANY | string | Shows where the account is registered. Accounts registered at Bitfinex will show 'bitfinex' and accounts registered at eosfinex will show 'eosfinex' |
| \[10\] | EMAIL\_VERIFIED | int | 1 if true |
| 

\[ . . . \]

 |
| \[12\] | SUBACCOUNT\_TYPE | TBD | TBD |
| 

\[ . . . \]

 |
| \[14\] | MTS\_MASTER\_ACCOUNT\_CREATE | int | Millisecond timestamp of master account creation |
| \[15\] | GROUP\_ID | int | Account group ID |
| \[16\] | MASTER\_ACCOUNT\_ID | int | The ID of the master account, If the account is a sub-account. |
| \[17\] | INHERIT\_MASTER\_ACCOUNT\_VERIFICATION | int | 1 if account inherits verification from master account |
| \[18\] | IS\_GROUP\_MASTER | int | 1 if account is a master account |
| \[19\] | GROUP\_WITHDRAW\_ENABLED | int | 1 if enabled |
| 

\[ . . . \]

 |
| \[21\] | PPT\_ENABLED | int | 1 if true (for paper trading accounts) |
| \[22\] | MERCHANT\_ENABLED | int | 1 if true (for merchant accounts) |
| \[23\] | COMPETITION\_ENABLED | int | 1 if true (for competition accounts) |
| 

\[ . . . \]

 |
| \[26\] | 2FA\_MODES | array of strings | Array of enabled 2FA modes ('u2f', 'otp') |
| 

\[ . . . \]

 |
| \[28\] | IS\_SECURITIES\_MASTER | int | 1 if true (when the account has a securities sub-account) |
| \[29\] | SECURITIES\_ENABLED | int | 1 if true (for securities accounts) |
| \[30\] | IS\_SECURITIES\_INVESTOR\_ACCREDITED | int | 1 if true (when an account is accredited investor verified) |
| \[31\] | IS\_SECURITIES\_EL\_SALVADOR | int | 1 if true (if an account is verified for El Salvador securities) |
| 

\[ . . . \]

 |
| \[38\] | ALLOW\_DISABLE\_CTXSWITCH | int | Account can disable context switching by master account into this account (1 if true) |
| \[39\] | CTXSWITCH\_DISABLED | int | Master account cannot context switch into this account (1 if true) |
| 

\[ . . . \]

 |
| \[44\] | TIME\_LAST\_LOGIN | string | Date and time of last login |
| 

\[ . . . \]

 |
| \[47\] | VERIFICATION\_LEVEL\_SUBMITTED | int | Level of highest verification application submitted from the account |
| 

\[ . . . \]

 |
| \[49\] | COMP\_COUNTRIES | array | Array of country codes based on your verification data (residence and nationality) |
| \[50\] | COMP\_COUNTRIES\_RESID | array | Array of country codes based on your verification data (residence only) |
| \[51\] | COMPL\_ACCOUNT\_TYPE | string | Type of verification ("individual" or "corporate") |
| 

\[ . . . \]

 |
| \[54\] | IS\_MERCHANT\_ENTERPRISE | int | 1 if true (when account is enterprise merchant) |td:has(div.placeholders) { background-color: #ebebeb; } .placeholders { height: 10px; text-align: center; font-size: 16px; line-height: 8px; }

**Ratelimit**: 90 req/min

---

### Summary

#### 

Response data

[](#response-data)

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| 

\[ . . . \]

 |
| \[4\] | FEE\_INFO | [Fee info array](#fee-info-array-index-4) | Array with info on your current fee rates |
| \[5\] | TRADING\_VOL\_AND\_FEE | [Trading vol and fee](#trading-volume-and-fees-array-index-5) | Array with data on your trading volume and fees paid |
| \[6\] | FUNDING\_EARNINGS | [Funding earnings array](#funding-earnings-array-index-6) | Array with data on your funding earnings |
| 

\[ . . . \]

 |
| \[9\] | LEO\_INFO | Object | Object with info on your LEO level and holdings. Keys: "leo\_lev" (to see your current LEO level) and "leo\_amount\_avg" (to see your average LEO amount held in the past 30 days) |td:has(div.placeholders) { background-color: #ebebeb } .placeholders { height: 10px; text-align: center; font-size: 16px; line-height: 8px; }

#### 

Fee info array (Index \[4\])

[](#fee-info-array-index-4)

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| \[0\] | MAKER\_FEE\_INFO | [Maker fee info array](#maker-fee-info-array-index-4) | Array with info on your current maker fee rates |
| \[1\] | TAKER\_FEE\_INFO | [Taker fee info array](#taker-fee-info-array-index-4) | Array with info on your current taker fee rates |td:has(div.placeholders) { background-color: #ebebeb } .placeholders { height: 10px; text-align: center; font-size: 16px; line-height: 8px; }

##### 

Maker fee info array (Index \[4\]\[0\])

[](#maker-fee-info-array-index-4)

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| \[0\] | MAKER\_FEE | Float | Shows the maker fee rate for the account |
| \[1\] | MAKER\_FEE | Float | Shows the maker fee rate for the account |
| \[2\] | MAKER\_FEE | Float | Shows the maker fee rate for the account |
| 

\[ . . . \]

 |
| \[5\] | DERIV\_REBATE | float | Shows the maker rebate for derivative trades on the account |td:has(div.placeholders) { background-color: #ebebeb } .placeholders { height: 10px; text-align: center; font-size: 16px; line-height: 8px; }

##### 

Taker fee info array (Index \[4\]\[1\])

[](#taker-fee-info-array-index-4)

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| \[0\] | TAKER\_FEE\_TO\_CRYPTO | Float | Shows the taker fee rate for crypto to crypto trades on the account |
| \[1\] | TAKER\_FEE\_TO\_STABLE | Float | Shows the taker fee rate for crypto to stable coin trades on the account |
| \[2\] | TAKER\_FEE\_TO\_FIAT | Float | Shows the taker fee rate for crypto to fiat trades on the account |
| 

\[ . . . \]

 |
| \[5\] | DERIV\_TAKER\_FEE | float | Shows the taker fee rate for derivative trades on the account |td:has(div.placeholders) { background-color: #ebebeb } .placeholders { height: 10px; text-align: center; font-size: 16px; line-height: 8px; }

#### 

Trading volume and fees array (Index \[5\])

[](#trading-volume-and-fees-array-index-5)

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| \[0\] | TRADE\_VOL\_30d | Array of objects | Shows objects containing trading volume per currency and Total(USD) over the past 30 days |
| \[1\] | FEES\_TRADING\_30d | Object | Shows trading fees paid per currency over the past 30 days |
| \[2\] | FEES\_TRADING\_TOTAL\_30d | Float | Shows the USD equivalent of the total trading fees paid over the past 30 days |td:has(div.placeholders) { background-color: #ebebeb } .placeholders { height: 10px; text-align: center; font-size: 16px; line-height: 8px; }

#### 

Funding earnings array (Index \[6\]

[](#funding-earnings-array-index-6)

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| 

\[ . . . \]

 |
| \[1\] | FUNDING\_EARNINGS\_PER\_CURR | Object | Shows the amount earned on your provided funding per currency over the past 30 days |
| \[2\] | FUNDING\_EARNINGS\_TOTAL | Float | Shows the USD equivalent of the total earnings on your provided funding over the past 30 days |td:has(div.placeholders) { background-color: #ebebeb } .placeholders { height: 10px; text-align: center; font-size: 16px; line-height: 8px; }

**Ratelimit**: 90 req/min

---

### Login History

#### 

Response data

[](#response-data)

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| \[0...n\] | LOGIN\_INFO\_ARRAY | [Login info array](#login-info-arrays-index-0n) | Each index contains one of the n current user's login history entries |

#### 

Login info arrays (index \[0...n\])

[](#login-info-arrays-index-0n)

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| \[0\] | ID | Int | Login ID |
| 

\[ . . . \]

 |
| \[2\] | TIME | Int | Millisecond timestamp of login |
| 

\[ . . . \]

 |
| \[4\] | IP | String | IP address of login |
| 

\[ . . . \]

 |
| \[7\] | EXTRA\_INFO | Object | Object with extra information |td:has(div.placeholders) { background-color: #ebebeb; } .placeholders { height: 10px; text-align: center; font-size: 16px; line-height: 8px; }

**Ratelimit**: 90 req/min

---

### Key Permissions

#### 

Response data

[](#response-data)

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| \[0...n\] | KEY\_PERMISSION\_ARRAY | [Key permission array](#key-permission-arrays-index-0n) | Each index contains one of the current key's permissions |

#### 

Key permission arrays (index \[0...n\]

[](#key-permission-arrays-index-0n)

| Index | Term | Type | Description |
| --- | --- | --- | --- |
| \[0\] | SCOPE | string | Api scope, ('account', 'history', 'orders', 'positions', 'funding', 'settings', 'wallets', 'withdraw', 'ui\_withdraw', 'bfxpay') |
| \[1\] | READ | int | Read permission (0 - false, 1 - true) |
| \[2\] | WRITE | int | Write permission (0 - false, 1 - true) |

**Ratelimit**: 90 req/min

---

### Generate Token

> ## 📘
> 
> Caps
> 
> Available caps are:
> 
> *   a - account
> *   o - orders
> *   f - funding
> *   s - settings
> *   w - wallets
> *   wd - withdraw
> *   bp - bfxpay

#### 

Response data

[](#response-data)

| Index | Term | Type | Description |
| --- | --- | --- | --- |
| \[0\] | TOKEN | string | Generated authentication token |

---

### Changelog

#### 

Response data

[](#response-data)

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| \[0...n\] | CHANGELOG\_ARRAY | [Changelog array](#changelog-array-index-0n) | Each index contains one of the n current user's changelog entries |

#### 

Changelog array (Index \[0...n\])

[](#changelog-array-index-0n)

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| \[0\] | MTS\_CREATE | Int | Millisecond timestamp of change |
| 

\[ . . . \]

 |
| \[2\] | LOG | String | Log entry |
| 

\[ . . . \]

 |
| \[5\] | IP | String | IP address for logged change |
| \[6\] | USER\_AGENT | Object | Browser info |td:has(div.placeholders) { background-color: #ebebeb; } .placeholders { height: 10px; text-align: center; font-size: 16px; line-height: 8px; }

**Ratelimit**: 90 req/min

---

### Transfer Between Wallets

#### 

Response data

[](#response-data)

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| \[0\] | MTS | int | Seconds epoch timestamp of notification |
| \[1\] | TYPE | string | Notification's type ("on-req") |
| \[2\] | MESSAGE\_ID | int | Unique notification's ID |
| 

\[ . . . \]

 |
| \[4\] | TRANSFER\_ARRAY | [TRANSFER\_ARRAY](#transfer-array-index-4) | An array containing details of the transfer/conversion |
| \[5\] | CODE | int | W.I.P. (work in progress) |
| \[6\] | STATUS | string | Status of the notification; it may vary over time (SUCCESS, ERROR, FAILURE, ...) |
| \[7\] | TEXT | string | Additional notification description |td:has(div.placeholders) { background-color: #ebebeb } .placeholders { height: 10px; text-align: center; font-size: 16px; line-height: 8px; }

#### 

Transfer array (index \[4\])

[](#transfer-array-index-4)

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| \[0\] | MTS\_UPDATED | Int | Millisecond Time Stamp of the update |
| \[1\] | WALLET\_FROM | String | Starting wallet |
| \[2\] | WALLET\_TO | String | Destination wallet |
| 

\[ . . . \]

 |
| \[4\] | CURRENCY | String | Currency |
| \[5\] | CURRENCY\_TO | String | Currency converted to |
| 

\[ . . . \]

 |
| \[7\] | AMOUNT | Int | Amount of Transfer |td:has(div.placeholders) { background-color: #ebebeb; } .placeholders { height: 10px; text-align: center; font-size: 16px; line-height: 8px; }

> ## 📘
> 
> Derivatives Wallet
> 
> Note that the margin wallet, for Derivative symbols, is the derivatives wallet. If the destination is 'margin' and the currency\_to is 'USTF0', the funds will end up in the derivatives wallet.

---

### Deposit Address

> ## 📘
> 
> Tag/Memo/Payment\_ID
> 
> For currencies that require a tag, memo, or payment ID, the endpoint will provide these. The deposit address cannot be retrieved through this endpoint, but you can find it on your deposit page on the website. The deposit address is always the same; the tag, memo, or payment ID is used to direct your deposit to the correct account and wallet.

#### 

Response data

[](#response-data)

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| \[0\] | MTS | int | Seconds epoch timestamp of notification |
| \[1\] | TYPE | string | Notification's type ("on-req") |
| \[2\] | MESSAGE\_ID | int | Unique notification's ID |
| 

\[ . . . \]

 |
| \[4\] | DEPOSIT\_ADDRESS\_ARRAY | [Deposit address array](#deposit-address-arrays-index-4) | An array containing deposit adddress data |
| \[5\] | CODE | int | W.I.P. (work in progress) |
| \[6\] | STATUS | string | Status of the notification; it may vary over time (SUCCESS, ERROR, FAILURE, ...) |
| \[7\] | TEXT | string | Additional notification description |td:has(div.placeholders) { background-color: #ebebeb } .placeholders { height: 10px; text-align: center; font-size: 16px; line-height: 8px; }

#### 

Deposit address arrays (Index \[4\])

[](#deposit-address-arrays-index-4)

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| 

\[ . . . \]

 |
| \[1\] | METHOD | String | Method of deposit |
| \[2\] | CURRENCY\_CODE | String | Currency code of new address |
| 

\[ . . . \]

 |
| \[4\] | ADDRESS | String | Deposit address (instead of the address, this field will show Tag/Memo/Payment\_ID for currencies that require it) |
| \[5\] | POOL\_ADDRESS | String | Pool address (for currencies that require a Tag/Memo/Payment\_ID) |td:has(div.placeholders) { background-color: #ebebeb; } .placeholders { height: 10px; text-align: center; font-size: 16px; line-height: 8px; }

> ## 📘
> 
> Address Limit
> 
> Please note that you may generate up to 15 addresses in total per currency per month.

**Ratelimit**: 10 req/min

---

### Generate Invoice

> ## ❗️
> 
> Creating a deposit address
> 
> If this is the first time you are generating an LNX invoice on your account, you will first need to create a deposit address. To do this, call w/deposit/address with { method: 'LNX', wallet: 'exchange' }

#### 

Response data

[](#response-data)

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| \[0\] | INVOICE\_HASH | String | Hashed invoice |
| \[1\] | INVOICE | String | Requested invoice |
| 

\[ . . . \]

 |
| \[4\] | AMOUNT | String | Amount of invoice |td:has(div.placeholders) { background-color: #ebebeb; } .placeholders { height: 10px; text-align: center; font-size: 16px; line-height: 8px; }

---

### Withdrawal

> ## 📘
> 
> Withdrawal methods
> 
> A full list of all withdrawal methods, including the different methods for tether withdrawals, can be found here: [https://api-pub.bitfinex.com//v2/conf/pub:map:tx:method](https://api-pub.bitfinex.com//v2/conf/pub:map:tx:method)
> 
> Tether can be withdrawn using different networks. Different methods are used to specify which network should be used. The table below specifies which methods need to be used to use different networks.

> ## 📘
> 
> Travel rule
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
| \[7\] | TEXT | string | Additional notification description |td:has(div.placeholders) { background-color: #ebebeb } .placeholders { height: 10px; text-align: center; font-size: 16px; line-height: 8px; }

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
| \[8\] | WITHDRAWAL\_FEE | Int | Fee on withdrawal |td:has(div.placeholders) { background-color: #ebebeb; } .placeholders { height: 10px; text-align: center; font-size: 16px; line-height: 8px; }

---

### Movements

#### 

Response data

[](#response-data)

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| \[0...n\] | MOVEMENT\_ARRAY | [Movement array](#movement-arrays-index-0n) | Each index contains one of the n\` current user's movements entries. |

#### 

Movement arrays (Index \[0...n\])

[](#movement-arrays-index-0n)

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| \[0\] | ID | String | Movement identifier |
| \[1\] | CURRENCY | String | The symbol of the currency (ex. "BTC") |
| \[2\] | CURRENCY\_NAME | String | The extended name of the currency (ex. "BITCOIN") |
| 

\[ . . . \]

 |
| \[5\] | MTS\_STARTED | Int | Movement started at |
| \[6\] | MTS\_UPDATED | Int | Movement last updated at |
| 

\[ . . . \]

 |
| \[9\] | STATUS | String | Current status |
| 

\[ . . . \]

 |
| \[12\] | AMOUNT | String | Amount of funds moved (positive for deposits, negative for withdrawals) |
| \[13\] | FEES | String | Tx Fees applied |
| 

\[ . . . \]

 |
| \[16\] | DESTINATION\_ADDRESS | String | Destination address |
| \[17\] | PAYMENT\_ID | String | Payment ID (if relevant) |
| 

\[ . . . \]

 |
| \[20\] | TRANSACTION\_ID | String | Transaction identifier |
| \[21\] | WITHDRAW\_TRANSACTION\_NOTE | String | Optional personal withdraw transaction note |td:has(div.placeholders) { background-color: #ebebeb; } .placeholders { height: 10px; text-align: center; font-size: 16px; line-height: 8px; }

**Ratelimit**: 90 req/min

---

### Alert List

#### 

Response data

[](#response-data)

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| \[0...n\] | ALERT\_ARRAY | [Alert array](#alert-arrays-index-0n) | Each index contains one of the n current user's alerts |

#### 

Alert arrays (Index \[0...n\])

[](#alert-arrays-index-0n)

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| \[0\] | INFO | String | 'type:pair:price' |
| \[1\] | TYPE | String | Alert type ('price') |
| \[2\] | PAIR | String | Pair on which the price alert is active (tBTCUSD, tBTCUST, ...) |
| \[3\] | PRICE | Float | Alert price |
| \[4\] | COUNTDOWN | Int | This is set to 100 when the alert is placed. Each time the alert is triggered, this number will go down. When the countdown reaches 0, the alert gets removed. |

**Ratelimit**: 45 req/min

---

### Alert Set

#### 

Response data

[](#response-data)

| Index | Term | Type | Description |
| --- | --- | --- | --- |
| \[0\] | INFO | string | 'type:pair:price' |
| \[1\] | TYPE | string | Alert type ('price') |
| \[2\] | PAIR | string | Pair on which the price alert is active (tBTCUSD, tBTCUST, ...) |
| \[3\] | PRICE | float | Alert price |
| \[4\] | COUNTDOWN | int | This is set to 100 when the alert is placed. Each time the alert is triggered, this number will go down. When the countdown reaches 0, the alert gets removed. |

**Ratelimit**: 90 req/min

---

### Alert Delete

**Ratelimit**: 90 req/min

---

### Balance Available for Orders/Offers

**Fields**

| Fields | Type | Description |
| --- | --- | --- |
| AMOUNT\_AVAIL | float | Amount available for order/offer |

**Ratelimit**: 90 req/min

---

### User Settings Write

**Body Fields**

| Term | Type | Description |
| --- | --- | --- |
| Settings | Object | Object of keys and values to be set. Must follow regex pattern `/^api:[A-Za-z0-9_-]*$/` |

**Response Fields**

| Term | Type | Description |
| --- | --- | --- |
| TIMESTAMP | int | Timestamp in milliseconds |
| TYPE | string | Purpose of notification ('acc\_ss' (account settings set)) |
| NUMBER\_OF\_SETTINGS | string | Number of settings changed or created with this request |
| STATUS | string | Status of the notification; it may vary over time (SUCCESS, ERROR, FAILURE, ...) |

**Ratelimit**: 90 req/min

---

### User Settings Read

**Body Fields**

| Term | Type | Description |
| --- | --- | --- |
| Keys | Array | Array of keys requested. Must follow regex pattern `/^api:[A-Za-z0-9_-]*$/` |

**Returned Fields**

| Term | Type | Description |
| --- | --- | --- |
| KEY | String | Requested Key |
| VALUE | Self defined | Returned setting |

**Ratelimit**: 90 req/min

---

### User Settings Delete

**Body Fields**

| Term | Type | Description |
| --- | --- | --- |
| Settings | Array | Array of keys to be deleted. Must follow regex pattern `/^api:[A-Za-z0-9_-]*$/` |

**Response Fields**

| Term | Type | Description |
| --- | --- | --- |
| TIMESTAMP | int | Timestamp in milliseconds |
| TYPE | string | Purpose of notification ('acc\_sd' (account settings del)) |
| STATUS | string | Status of the notification; it may vary over time (SUCCESS, ERROR, FAILURE, ...) |

**Ratelimit**: 90 req/min

---

## Merchants

### Submit Invoice

#### 

Response data

[](#response-data)

| Term | Type | Description |
| --- | --- | --- |
| ID | string | Unique invoice identifier |
| T | int | Timestamp when invoice is created |
| TYPE | string | Invoice type, currently supported `ECOMMERCE` and `POS` |
| DURATION | int | Invoice expire time in seconds |
| AMOUNT | float | Invoice amount in currency |
| CURRENCY | string | Invoice currency |
| ORDER\_ID | string | Reference order identifier in merchant's platform |
| PAY\_CURRENCIES | array of strings | Currencies in which invoice accepts the payments |
| WEBHOOK | string | Optional, the endpoint that will be called once the payment is completed/expired |
| REDIRECT\_URL | string | Optional, merchant redirect URL, this one is used in UI to redirect customer to merchant's site once the payment is completed/expired |
| STATUS | string | Payment status, should be one of: CREATED, PENDING, COMPLETED, EXPIRED |
| CUSTOMER\_INFO | object | Information related to customer against who the invoice is issued, it's `NULL` when type is `POS` |
| CUSTOMER\_TYPE | string | Customer type, either INDIVIDUAL or BUSINESS |
| CUSTOMER\_NATIONALITY | string | Customer's nationality, alpha2 code format |
| CUSTOMER\_RESID\_COUNTRY | string | Customer's residential country, alpha2 code format |
| CUSTOMER\_RESID\_STATE | string | Optional, customer's residential state/province |
| CUSTOMER\_RESID\_CITY | string | Customer's residential city/town |
| CUSTOMER\_RESID\_ZIP | string | Customer's residential zip code/postal code |
| CUSTOMER\_RESID\_STREET | string | Customer's residential street address |
| CUSTOMER\_RESID\_NO | string | Optional, customer's residential building number/name |
| CUSTOMER\_FULLNAME | string | Customer's full name |
| CUSTOMER\_EMAIL | string | Customer's email address |
| CUSTOMER\_TOS\_ACCEPTED | boolean | Flag that specified whenever the customer has accepted terms of service |
| CUSTOMER\_IP | string | Optional, customer's ip address |
| INVOICES | array of objects | Payment details for each payable currency |
| INVOICES\_AMOUNT | float | Amount in specific payable currency |
| INVOICES\_BFXPAY\_CCY | string | Bitfinex pay currency that corresponds to list of PAY\_CURRENCIES |
| INVOICES\_PAY\_CCY | string | Payment currency |
| INVOICES\_POOL\_CCY | string | Underlying technology used by payment currency |
| INVOICES\_ADDRESS | string | Deposit/Payment address |
| INVOICES\_EXT | object | Optional, additional data related to payment |
| METADATA | object | Optional, invoice metadata |
| FLAGS | array of strings | Optional, flags related to invoice |
| RECALCULATED\_AT | int | Optional, timestamp in milliseconds when invoice prices got recalculated |

> ## 🚧
> 
> key permissions
> 
> The api key permissions should include these settings in order to be able to create the invoice:
> 
> *   _Account Info_ - both get account fee and edit account info should be enabled
> *   _Orders_ - both get orders and create/cancel orders should be enabled
> 
> The api key permissions can be checked through [key permissions](#key-permissions) endpoint, where it should have read and write flags set to 1 for these options:
> 
> *   settings
> *   account
> *   orders

> ## 🚧
> 
> payment addresses
> 
> All the payments are done against user's merchant sub account, before being able to accept the deposits the user should generate deposit addresses for currencies that expects to be paid with. This can be done either through UI by going on [deposit page](https://movement.bitfinex.com/deposit), or through api by calling [deposit address](#rest-auth-deposit-address) endpoint

> ## 📘
> 
> webhook
> 
> Webhook must be an endpoint that would accept POST requests with JSON body. In request body the following invoice fields will be send:
> 
> *   id: string
> *   type: string // invoice type
> *   orderId: string
> *   status: string // COMPLETED or EXPIRED
> *   amount: float
> *   currency: string
> *   t: int // timestamp
> *   invoices: array of object // if expired no item will be included, if paid only the paid invoice
> *   payment: object // present only in case of success
>     *   txid: string // transaction hash
>     *   amount: float // amount in payable ccy
>     *   currency: string
>     *   method: string // method of deposit. For an up-to-date mapping of methods and their respective currencies see: [https://api-pub.bitfinex.com//v2/conf/pub:map:tx:method](https://api-pub.bitfinex.com//v2/conf/pub:map:tx:method) \[\[\[METHOD,\[CURRENCY\]\]...\]\]
>     *   status: 'COMPLETED'
>     *   confirmations: int
>     *   created\_at: 'YYYY-MM-DD hh:mm:ss'
>     *   updated\_at: 'YYYY-MM-DD hh:mm:ss'
>     *   depositId: int // optional, deposit id linked to payment, present when payment is done through wallet deposit
>     *   ledgerId: int // optional, ledger id linked to payment, present when payment is realized through "Instant Payment",
>     *   forceCompleted: boolean // optional, flag indicating that invoice is manually marked as completed
>     *   amountDiff: string // optional, paid amount difference from deposited amount and expected amount in invoice
> *   additionalPayments: array // optional, additional payments, applied when invoice has partial underpaid payments, it's basically array of objects with same structure as payment field
> 
> Example request:
> 
> ```rdmd-code lang- theme-light
> `POST https://example.com/api/v3/order/order123 {   "id": "a6761c8b-468f-40ad-a522-cc5e41c39757",   "type": "ECOMMERCE",   "orderId": "order123",   "status": "COMPLETED",   "amount": 2.5,   "currency": "USD",   "t": 1612460165497,   "invoices": [     {       "amount": 0.00006262,       "currency": "BTC",       "payCurrency": "BTC",       "poolCurrency": "BTC",       "address": "bc1qyegkyyk656vrqp0pzyg8p4yy9xlqfhxlrg0jtf"     }   ],   "payment": {     "txid": "5119b4caaad1af22bebb2373995d8ecd8dfb23cc1971d0347aaa516b4e0f3e3a",     "amount": 0.00006262,     "currency": "BTC",     "method": "BITCOIN",     "status": "COMPLETED",     "confirmations": 6,     "created_at": "2021-01-06 21:16:28",     "updated_at": "2021-01-06 21:16:28",     "depositId": 1357996   } }`
> ```

> ## 🚧
> 
> webhook
> 
> Warning! Webhook will be called only once and in case of failure it's not triggered again, due to that case merchants can also use [/v2/auth/r/ext/pay/invoices](#invoice-list) endpoint to query the invoice states.

> ## 📘
> 
> invoices: { ext: ... }
> 
> Ext field contains additional data related to payment. In case of lighting network (LNX) payment it should look like this: { "hash": string, "payment\_request": string, "node\_pub": string }.

> ## 📘
> 
> invoices: { poolCurrency: ... }
> 
> Pool currency represents the underlying blockchain used by payable currency, e.g. in case of UST-ETH which is an ERC-20 token poolCurrency is ETH.

> ## 📘
> 
> flags
> 
> Invoice might have flags that are automatically added depending on data. Currently supported flags are:
> 
> *   **ip:prohibited** - added when customer's ip belongs to a prohibited jurisdiction

**Ratelimit**: 90 req/min

---

### Invoice List

**Response Fields**

| Term | Type | Description |
| --- | --- | --- |
| ID | string | Unique invoice identifier |
| T | int | Timestamp when invoice is created |
| TYPE | string | Invoice type, currently supported `ECOMMERCE` and `POS` |
| DURATION | int | Invoice expire time in seconds |
| AMOUNT | float | Invoice amount in currency |
| CURRENCY | string | Invoice currency |
| ORDER\_ID | string | Reference order identifier in merchant's platform |
| PAY\_CURRENCIES | array of strings | Currencies in which invoice accepts the payments |
| WEBHOOK | string | Optional, the endpoint that will be called once the payment is completed/expired |
| REDIRECT\_URL | string | Optional, merchant redirect URL, this one is used in UI to redirect customer to merchant's site once the payment is completed/expired |
| STATUS | string | Payment status, should be one of: CREATED, PENDING, COMPLETED, EXPIRED |
| CUSTOMER\_INFO | object | Information related to customer against who the invoice is issued, it's `NULL` when type is `POS` |
| CUSTOMER\_TYPE | string | Customer type, either INDIVIDUAL or BUSINESS |
| CUSTOMER\_NATIONALITY | string | Customer's nationality, alpha2 code format |
| CUSTOMER\_RESID\_COUNTRY | string | Customer's residential country, alpha2 code format |
| CUSTOMER\_RESID\_STATE | string | Optional, customer's residential state/province |
| CUSTOMER\_RESID\_CITY | string | Customer's residential city/town |
| CUSTOMER\_RESID\_ZIP | string | Customer's residential zip code/postal code |
| CUSTOMER\_RESID\_STREET | string | Customer's residential street address |
| CUSTOMER\_RESID\_NO | string | Optional, customer's residential building number/name |
| CUSTOMER\_FULLNAME | string | Customer's full name |
| CUSTOMER\_EMAIL | string | Customer's email address |
| CUSTOMER\_TOS\_ACCEPTED | boolean | Flag that specified whenever the customer has accepted terms of service |
| INVOICES | array of objects | Payment details for each payable currency |
| INVOICES\_AMOUNT | float | Amount in specific payable currency |
| INVOICES\_BFXPAY\_CCY | string | Bitfinex pay currency that corresponds to list of PAY\_CURRENCIES |
| INVOICES\_PAY\_CCY | string | Payment currency |
| INVOICES\_POOL\_CCY | string | Underlying technology used by payment currency |
| INVOICES\_ADDRESS | string | Deposit/Payment address |
| INVOICES\_EXT | object | Optional, additional data related to payment |
| PAYMENT | object | Optional, payment related info |
| PAYMENT\_TXID | string | Payment transaction hash |
| PAYMENT\_AMOUNT | float | Paid amount in payment currency |
| PAYMENT\_CCY | string | Payment currency |
| PAYMENT\_METHOD | string | Method of deposit. For an up-to-date mapping of methods and their respective currencies see: [https://api-pub.bitfinex.com//v2/conf/pub:map:tx:method](https://api-pub.bitfinex.com//v2/conf/pub:map:tx:method) \[\[\[METHOD,\[CURRENCY\]\]...\]\] |
| PAYMENT\_STATUS | string | Deposit status, one of CREATED, COMPLETED, PROCESSING |
| PAYMENT\_CONFIRMATIONS | int | Deposit confirmation count |
| PAYMENT\_CREATED | string | Time when the deposit was created (YYYY-MM-DD hh:mm:ss format) |
| PAYMENT\_UPDATED | string | Time when the deposit was last updated (YYYY-MM-DD hh:mm:ss format) |
| PAYMENT\_DEPOSIT\_ID | int | Optional, deposit id linked to the payment, present when payment is done through wallet deposit |
| PAYMENT\_LEDGER\_ID | int | Optional, ledger entry linked to the payment, present when payment is realized through "Instant Payment" |
| PAYMENT\_FORCE\_COMPLETED | boolean | Optional, flag indicating that invoice is manually marked as completed |
| PAYMENT\_AMOUNT\_DIFF | string | Optional, paid amount difference from deposited amount and expected amount in invoice |
| ADDITIONAL\_PAYMENTS | array of objects | Optional, additional payments, applied when invoice has partial underpaid payments |
| ADDITIONAL\_PAYMENT | object | Additional payment entry, it's same structure as PAYMENT just without PAYMENT\_FORCE\_COMPLETED and PAYMENT\_FORCE\_COMPLETED |
| MERCHANT\_NAME | string | The name of the merchant (Optional) |
| METADATA | object | Optional, invoice metadata |
| FLAGS | array of strings | Optional, flags related to invoice |
| RECALCULATED\_AT | int | Optional, timestamp in milliseconds when invoice prices got recalculated |

**Ratelimit**: 90 req/min

---

### Complete Invoice

**Response Fields**

| Term | Type | Description |
| --- | --- | --- |
| ID | string | Unique invoice identifier |
| T | int | Timestamp when invoice is created |
| TYPE | string | Invoice type, currently supported `ECOMMERCE` and `POS` |
| DURATION | int | Invoice expire time in seconds |
| AMOUNT | float | Invoice amount in currency |
| CURRENCY | string | Invoice currency |
| ORDER\_ID | string | Reference order identifier in merchant's platform |
| PAY\_CURRENCIES | array of strings | Currencies in which invoice accepts the payments |
| WEBHOOK | string | Optional, the endpoint that will be called once the payment is completed/expired |
| REDIRECT\_URL | string | Optional, merchant redirect URL, this one is used in UI to redirect customer to merchant's site once the payment is completed/expired |
| STATUS | string | Payment status, should be one of: CREATED, PENDING, COMPLETED, EXPIRED |
| CUSTOMER\_INFO | object | Information related to customer against who the invoice is issued, it's `NULL` when type is `POS` |
| CUSTOMER\_NATIONALITY | string | Customer's nationality, alpha2 code format |
| CUSTOMER\_RESID\_COUNTRY | string | Customer's residential country, alpha2 code format |
| CUSTOMER\_RESID\_STATE | string | Optional, customer's residential state/province |
| CUSTOMER\_RESID\_CITY | string | Customer's residential city/town |
| CUSTOMER\_RESID\_ZIP | string | Customer's residential zip code/postal code |
| CUSTOMER\_RESID\_STREET | string | Customer's residential street address |
| CUSTOMER\_RESID\_NO | string | Optional, customer's residential building number/name |
| CUSTOMER\_FULLNAME | string | Customer's full name |
| CUSTOMER\_EMAIL | string | Customer's email address |
| CUSTOMER\_TOS\_ACCEPTED | boolean | Flag that specified whenever the customer has accepted terms of service |
| INVOICES | array of objects | Payment details for each payable currency |
| INVOICES\_AMOUNT | float | Amount in specific payable currency |
| INVOICES\_BFXPAY\_CCY | string | Bitfinex pay currency that corresponds to list of PAY\_CURRENCIES |
| INVOICES\_PAY\_CCY | string | Payment currency |
| INVOICES\_POOL\_CCY | string | Underlying technology used by payment currency |
| INVOICES\_ADDRESS | string | Deposit/Payment address |
| INVOICES\_EXT | object | Optional, additional data related to payment |
| PAYMENT | object | Optional, payment related info |
| PAYMENT\_TXID | string | Payment transaction hash |
| PAYMENT\_AMOUNT | float | Paid amount in payment currency |
| PAYMENT\_CCY | string | Payment currency |
| PAYMENT\_METHOD | string | Method of deposit. For an up-to-date mapping of methods and their respective currencies see: [https://api-pub.bitfinex.com//v2/conf/pub:map:tx:method](https://api-pub.bitfinex.com//v2/conf/pub:map:tx:method) \[\[\[METHOD,\[CURRENCY\]\]...\]\] |
| PAYMENT\_STATUS | string | Deposit status, one of CREATED, COMPLETED, PROCESSING |
| PAYMENT\_CONFIRMATIONS | int | Deposit confirmation count |
| PAYMENT\_CREATED | string | Time when the deposit was created (YYYY-MM-DD hh:mm:ss format) |
| PAYMENT\_UPDATED | string | Time when the deposit was last updated (YYYY-MM-DD hh:mm:ss format) |
| PAYMENT\_DEPOSIT\_ID | int | Optional, deposit id linked to the payment, present when payment is done through wallet deposit |
| PAYMENT\_LEDGER\_ID | int | Optional, ledger entry linked to the payment, present when payment is realized through "Instant Payment" |
| PAYMENT\_FORCE\_COMPLETED | boolean | Optional, flag indicating that invoice is manually marked as completed |
| PAYMENT\_AMOUNT\_DIFF | string | Optional, paid amount difference from deposited amount and expected amount in invoice |
| ADDITIONAL\_PAYMENTS | array of objects | Optional, additional payments, applied when invoice has partial underpaid payments |
| ADDITIONAL\_PAYMENT | object | Additional payment entry, it's same structure as PAYMENT just without PAYMENT\_FORCE\_COMPLETED and PAYMENT\_FORCE\_COMPLETED |
| METADATA | object | Optional, invoice metadata |
| FLAGS | array of strings | Optional, flags related to invoice |
| RECALCULATED\_AT | int | Optional, timestamp in milliseconds when invoice prices got recalculated |

**Ratelimit**: 90 req/min

---

## Thalex Derivatives

### Thalex Deposit Request

#### 

Response data

[](#response-data)

| Key | Type | Description |
| --- | --- | --- |
| type | String | Specifies the transfer type: "deposit" |
| addressDest | String | Specifies the address for the transaction |
| amount | String | Amount of the deposit |
| ccy | String | Currency deposited |
| createdAt | Integer | Deposit creation timestamp |
| updatedAt | Integer | Deposit update timestamp |
| id | string | Deposit id |
| status | string | Deposit status |
| fee | string | Fee charged for the deposit |

---

### Thalex Withdrawal Request

#### 

Response data

[](#response-data)

| Key | Type | Description |
| --- | --- | --- |
| type | String | Specifies the transfer type: "withdrawal" |
| addressDest | String | Specifies the address for the transaction |
| amount | String | Amount of the withdrawal |
| ccy | String | Currency withdrawn |
| createdAt | Integer | Withdrawal creation timestamp |
| updatedAt | Integer | Withdrawal update timestamp |
| id | string | Withdrawal id |
| status | string | Withdrawal status |
| fee | string | Fee charged for the withdrawal |

---

### Thalex Free Transfer Count

#### 

Response data

[](#response-data)

| Key | Type | Description |
| --- | --- | --- |
| deposits.available | Integer | Number of free deposits available |
| deposits.resetsAt | Integer || null | Timestamp at which the number of free deposits resets (defaults to null if not available) |
| withdrawals.available | Integer | Number of free withdrawals available |
| withdrawals.resetsAt | Integer || null | Timestamp at which the number of free withdrawals resets (defaults to null if not available) |

---

