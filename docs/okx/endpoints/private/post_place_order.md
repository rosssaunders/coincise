# POST / Place order

Source:
[https://www.okx.com/docs-v5/en/#order-book-trading-trade-post-place-order](https://www.okx.com/docs-v5/en/#order-book-trading-trade-post-place-order)

### POST / Place order

You can place an order only if you have sufficient funds.

#### Rate Limit: 60 requests per 2 seconds

#### Rate Limit of lead trader lead instruments for Copy Trading: 4 requests per 2 seconds

#### Rate limit rule (except Options): User ID + Instrument ID

#### Rate limit rule (Options only): User ID + Instrument Family

#### Permission: Trade

Rate limit of this endpoint will also be affected by the rules
[Sub-account rate limit](/docs-v5/en/#overview-rate-limits-sub-account-rate-limit)
and
[Fill ratio based sub-account rate limit](/docs-v5/en/#overview-rate-limits-fill-ratio-based-sub-account-rate-limit).

#### HTTP Request

`POST /api/v5/trade/order`

#### Request Parameters

| Parameter | Type   | Required | Description                    |
| --------- | ------ | -------- | ------------------------------ |
| instId    | String | Yes      | Instrument ID, e.g. `BTC-USDT` |
| tdMode    | String | Yes      | Trade mode                     |

Margin mode `cross` `isolated`  
Non-Margin mode `cash`  
`spot_isolated` (only applicable to SPOT lead trading, `tdMode` should be
`spot_isolated` for `SPOT` lead trading.)  
Note: `isolated` is not available in multi-currency margin mode and portfolio
margin mode. | | ccy | String | No | Margin currency  
Applicable to all `isolated` `MARGIN` orders and `cross` `MARGIN` orders in
`Futures mode`. | | clOrdId | String | No | Client Order ID as assigned by the
client  
A combination of case-sensitive alphanumerics, all numbers, or all letters of up
to 32 characters.  
Only applicable to general order. It will not be posted to algoId when placing
TP/SL order after the general order is filled completely. | | tag | String | No
| Order tag  
A combination of case-sensitive alphanumerics, all numbers, or all letters of up
to 16 characters. | | side | String | Yes | Order side, `buy` `sell` | | posSide
| String | Conditional | Position side  
The default is `net` in the `net` mode  
It is required in the `long/short` mode, and can only be `long` or `short`.  
Only applicable to `FUTURES`/`SWAP`. | | ordType | String | Yes | Order type  
`market`: Market order, only applicable to `SPOT/MARGIN/FUTURES/SWAP`  
`limit`: Limit order  
`post_only`: Post-only order  
`fok`: Fill-or-kill order  
`ioc`: Immediate-or-cancel order  
`optimal_limit_ioc`: Market order with immediate-or-cancel order (applicable
only to Expiry Futures and Perpetual Futures).  
`mmp`: Market Maker Protection (only applicable to Option in Portfolio Margin
mode)  
`mmp_and_post_only`: Market Maker Protection and Post-only order(only applicable
to Option in Portfolio Margin mode) | | sz | String | Yes | Quantity to buy or
sell | | px | String | Conditional | Order price. Only applicable to
`limit`,`post_only`,`fok`,`ioc`,`mmp`,`mmp_and_post_only` order.  
When placing an option order, one of px/pxUsd/pxVol must be filled in, and only
one can be filled in | | pxUsd | String | Conditional | Place options orders in
`USD`  
Only applicable to options  
When placing an option order, one of px/pxUsd/pxVol must be filled in, and only
one can be filled in | | pxVol | String | Conditional | Place options orders
based on implied volatility, where 1 represents 100%  
Only applicable to options  
When placing an option order, one of px/pxUsd/pxVol must be filled in, and only
one can be filled in | | reduceOnly | Boolean | No | Whether orders can only
reduce in position size.  
Valid options: `true` or `false`. The default value is `false`.  
Only applicable to `MARGIN` orders, and `FUTURES`/`SWAP` orders in `net` mode  
Only applicable to `Futures mode` and `Multi-currency margin` | | tgtCcy |
String | No | Whether the target currency uses the quote or base currency.  
`base_ccy`: Base currency ,`quote_ccy`: Quote currency  
Only applicable to `SPOT` Market Orders  
Default is `quote_ccy` for buy, `base_ccy` for sell | | banAmend | Boolean | No
| Whether to disallow the system from amending the size of the SPOT Market
Order.  
Valid options: `true` or `false`. The default value is `false`.  
If `true`, system will not amend and reject the market order if user does not
have sufficient funds.  
Only applicable to SPOT Market Orders | | pxAmendType | String | No | The price
amendment type for orders  
`0`: Do not allow the system to amend to order price if `px` exceeds the price
limit  
`1`: Allow the system to amend the price to the best available value within the
price limit if `px` exceeds the price limit  
The default value is `0` | | tradeQuoteCcy | String | No | The quote currency
used for trading. Only applicable to `SPOT`.  
The default value is the quote currency of the `instId`, for example: for
`BTC-USD`, the default is `USD`. | | stpMode | String | No | Self trade
prevention mode.  
`cancel_maker`,`cancel_taker`, `cancel_both`  
Cancel both does not support FOK

The account-level acctStpMode will be used to place orders by default. The
default value of this field is `cancel_maker`. Users can log in to the webpage
through the master account to modify this configuration. Users can also utilize
the stpMode request parameter of the placing order endpoint to determine the
stpMode of a certain order. | | attachAlgoOrds | Array of objects | No | TP/SL
information attached when placing order | | \> attachAlgoClOrdId | String | No |
Client-supplied Algo ID when placing order attaching TP/SL  
A combination of case-sensitive alphanumerics, all numbers, or all letters of up
to 32 characters.  
It will be posted to `algoClOrdId` when placing TP/SL order once the general
order is filled completely. | | \> tpTriggerPx | String | Conditional |
Take-profit trigger price  
For condition TP order, if you fill in this parameter, you should fill in the
take-profit order price as well. | | \> tpOrdPx | String | Conditional |
Take-profit order price

For condition TP order, if you fill in this parameter, you should fill in the
take-profit trigger price as well.  
For limit TP order, you need to fill in this parameter, but the take-profit
trigger price doesn’t need to be filled.  
If the price is -1, take-profit will be executed at the market price. | | \>
tpOrdKind | String | No | TP order kind  
`condition`  
`limit`  
The default is `condition` | | \> slTriggerPx | String | Conditional | Stop-loss
trigger price  
If you fill in this parameter, you should fill in the stop-loss order price. | |
\> slOrdPx | String | Conditional | Stop-loss order price  
If you fill in this parameter, you should fill in the stop-loss trigger price.  
If the price is -1, stop-loss will be executed at the market price. | | \>
tpTriggerPxType | String | No | Take-profit trigger price type  
`last`: last price  
`index`: index price  
`mark`: mark price  
The default is last | | \> slTriggerPxType | String | No | Stop-loss trigger
price type  
`last`: last price  
`index`: index price  
`mark`: mark price  
The default is last | | \> sz | String | Conditional | Size. Only applicable to
TP order of split TPs, and it is required for TP order of split TPs | | \>
amendPxOnTriggerType | String | No | Whether to enable Cost-price SL. Only
applicable to SL order of split TPs. Whether `slTriggerPx` will move to `avgPx`
when the first TP order is triggered  
`0`: disable, the default value  
`1`: Enable |

#### Response Parameters

| **Parameter**                              | **Type**         | **Description**                                                                                                                    |
| ------------------------------------------ | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| code                                       | String           | The result code, `0` means success                                                                                                 |
| msg                                        | String           | The error message, empty if the code is 0                                                                                          |
| data                                       | Array of objects | Array of objects contains the response results                                                                                     |
| \> ordId                                   | String           | Order ID                                                                                                                           |
| \> clOrdId                                 | String           | Client Order ID as assigned by the client                                                                                          |
| \> tag                                     | String           | Order tag                                                                                                                          |
| \> ts                                      | String           | Timestamp when the order request processing is finished by our system, Unix timestamp format in milliseconds, e.g. `1597026383085` |
| \> sCode                                   | String           | The code of the event execution result, `0` means success.                                                                         |
| \> sMsg                                    | String           | Rejection or success message of event execution.                                                                                   |
| inTime                                     | String           | Timestamp at REST gateway when the request is received, Unix timestamp format in microseconds, e.g. `1597026383085123`             |
| The time is recorded after authentication. |
| outTime                                    | String           | Timestamp at REST gateway when the response is sent, Unix timestamp format in microseconds, e.g. `1597026383085123`                |

tdMode  
Trade Mode, when placing an order, you need to specify the trade mode.  
**Spot mode:**  
\- SPOT and OPTION buyer: cash  
**Futures mode:**  
\- Isolated MARGIN: isolated  
\- Cross MARGIN: cross  
\- SPOT: cash  
\- Cross FUTURES/SWAP/OPTION: cross  
\- Isolated FUTURES/SWAP/OPTION: isolated  
**Multi-currency margin mode:**  
\- Cross SPOT: cross  
\- Cross FUTURES/SWAP/OPTION: cross  
**Portfolio margin:**  
\- Cross SPOT: cross  
\- Cross FUTURES/SWAP/OPTION: cross

clOrdId  
clOrdId is a user-defined unique ID used to identify the order. It will be
included in the response parameters if you have specified during order
submission, and can be used as a request parameter to the endpoints to query,
cancel and amend orders.  
clOrdId must be unique among the clOrdIds of all pending orders.

posSide  
Position side, this parameter is not mandatory in **net** mode. If you pass it
through, the only valid value is **net**.  
In **long/short** mode, it is mandatory. Valid values are **long** or
**short**.  
In **long/short** mode, **side** and **posSide** need to be specified in the
combinations below:  
Open long: buy and open long (side: fill in buy; posSide: fill in long)  
Open short: sell and open short (side: fill in sell; posSide: fill in short)  
Close long: sell and close long (side: fill in sell; posSide: fill in long)  
Close short: buy and close short (side: fill in buy; posSide: fill in short)  
Portfolio margin mode: Expiry Futures and Perpetual Futures only support net
mode

ordType  
Order type. When creating a new order, you must specify the order type. The
order type you specify will affect: 1) what order parameters are required,
and 2) how the matching system executes your order. The following are valid
order types:  
limit: Limit order, which requires specified sz and px.  
market: Market order. For SPOT and MARGIN, market order will be filled with
market price (by swiping opposite order book). For Expiry Futures and Perpetual
Futures, market order will be placed to order book with most aggressive price
allowed by Price Limit Mechanism. For OPTION, market order is not supported yet.
As the filled price for market orders cannot be determined in advance, OKX
reserves/freezes your quote currency by an additional 5% for risk check.  
post_only: Post-only order, which the order can only provide liquidity to the
market and be a maker. If the order would have executed on placement, it will be
canceled instead.  
fok: Fill or kill order. If the order cannot be fully filled, the order will be
canceled. The order would not be partially filled.  
ioc: Immediate or cancel order. Immediately execute the transaction at the order
price, cancel the remaining unfilled quantity of the order, and the order
quantity will not be displayed in the order book.  
optimal_limit_ioc: Market order with ioc (immediate or cancel). Immediately
execute the transaction of this market order, cancel the remaining unfilled
quantity of the order, and the order quantity will not be displayed in the order
book. Only applicable to Expiry Futures and Perpetual Futures.

sz  
Quantity to buy or sell.  
For SPOT/MARGIN Buy and Sell Limit Orders, it refers to the quantity in base
currency.  
For MARGIN Buy Market Orders, it refers to the quantity in quote currency.  
For MARGIN Sell Market Orders, it refers to the quantity in base currency.  
For SPOT Market Orders, it is set by tgtCcy.  
For FUTURES/SWAP/OPTION orders, it refers to the number of contracts.

reduceOnly  
When placing an order with this parameter set to true, it means that the order
will reduce the size of the position only  
For the same MARGIN instrument, the coin quantity of all reverse direction
pending orders adds \`sz\` of new \`reduceOnly\` order cannot exceed the
position assets. After the debt is paid off, if there is a remaining size of
orders, the position will not be opened in reverse, but will be traded in
SPOT.  
For the same FUTURES/SWAP instrument, the sum of the current order size and all
reverse direction reduce-only pending orders which’s price-time priority is
higher than the current order, cannot exceed the contract quantity of
position.  
Only applicable to \`Futures mode\` and \`Multi-currency margin\`  
Only applicable to \`MARGIN\` orders, and \`FUTURES\`/\`SWAP\` orders in \`net\`
mode  
Notice: Under long/short mode of Expiry Futures and Perpetual Futures, all
closing orders apply the reduce-only feature which is not affected by this
parameter.

tgtCcy  
This parameter is used to specify the order quantity in the order request is
denominated in the quantity of base or quote currency. This is applicable to
SPOT Market Orders only.  
Base currency: base_ccy  
Quote currency: quote_ccy  
If you use the Base Currency quantity for buy market orders or the Quote
Currency for sell market orders, please note:  
1\. If the quantity you enter is greater than what you can buy or sell, the
system will execute the order according to your maximum buyable or sellable
quantity. If you want to trade according to the specified quantity, you should
use Limit orders.  
2\. When the market price is too volatile, the locked balance may not be
sufficient to buy the Base Currency quantity or sell to receive the Quote
Currency that you specified. We will change the quantity of the order to execute
the order based on best effort principle based on your account balance. In
addition, we will try to over lock a fraction of your balance to avoid changing
the order quantity.  
2.1 Example of base currency buy market order:  
Taking the market order to buy 10 LTCs as an example, and the user can buy 11
LTC. At this time, if 10 < 11, the order is accepted. When the LTC-USDT market
price is 200, and the locked balance of the user is 3,000 USDT, as 200\*10 <
3,000, the market order of 10 LTC is fully executed; If the market is too
volatile and the LTC-USDT market price becomes 400, 400\*10 > 3,000, the user's
locked balance is not sufficient to buy using the specified amount of base
currency, the user's maximum locked balance of 3,000 USDT will be used to settle
the trade. Final transaction quantity becomes 3,000/400 = 7.5 LTC.  
2.2 Example of quote currency sell market order:  
Taking the market order to sell 1,000 USDT as an example, and the user can sell
1,200 USDT, 1,000 < 1,200, the order is accepted. When the LTC-USDT market price
is 200, and the locked balance of the user is 6 LTC, as 1,000/200 < 6, the
market order of 1,000 USDT is fully executed; If the market is too volatile and
the LTC-USDT market price becomes 100, 100\*6 < 1,000, the user's locked balance
is not sufficient to sell using the specified amount of quote currency, the
user's maximum locked balance of 6 LTC will be used to settle the trade. Final
transaction quantity becomes 6 \* 100 = 600 USDT.

px  
The value for px must be a multiple of tickSz for OPTION orders.  
If not, the system will apply the rounding rules below. Using tickSz 0.0005 as
an example:  
The px will be rounded up to the nearest 0.0005 when the remainder of px to
0.0005 is more than 0.00025 or \`px\` is less than 0.0005.  
The px will be rounded down to the nearest 0.0005 when the remainder of px to
0.0005 is less than 0.00025 and \`px\` is more than 0.0005.

For placing order with TP/Sl:  
1\. TP/SL algo order will be generated only when this order is filled fully, or
there is no TP/SL algo order generated.  
2\. Attaching TP/SL is neither supported for market buy with tgtCcy is base_ccy
or market sell with tgtCcy is quote_ccy  
3\. If tpOrdKind is limit, and there is only one conditional TP order,
attachAlgoClOrdId can be used as clOrdId for retrieving on "GET / Order details"
endpoint.  
4\. For “split TPs”, including condition TP order and limit TP order.  
\* TP/SL orders in Split TPs only support one-way TP/SL. You can't use
slTriggerPx&slOrdPx and tpTriggerPx&tpOrdPx at the same time, or error code
51076 will be thrown.  
\* Take-profit trigger price types (tpTriggerPxType) must be the same in an
order with Split TPs attached, or error code 51080 will be thrown.  
\* Take-profit trigger prices (tpTriggerPx) cannot be the same in an order with
Split TPs attached, or error code 51081 will be thrown.  
\* The size of the TP order among split TPs attached cannot be empty, or error
code 51089 will be thrown.  
\* The total size of TP orders with Split TPs attached in a same order should
equal the size of this order, or error code 51083 will be thrown.  
\* The number of TP orders with Split TPs attached in a same order cannot exceed
10, or error code 51079 will be thrown.  
\* Setting multiple TP and cost-price SL orders isn’t supported for spot and
margin trading, or error code 51077 will be thrown.  
\* The number of SL orders with Split TPs attached in a same order cannot exceed
1, or error code 51084 will be thrown.  
\* The number of TP orders cannot be less than 2 when cost-price SL is enabled
(amendPxOnTriggerType set as 1) for Split TPs, or error code 51085 will be
thrown.  
\* All TP orders in one order must be of the same type, or error code 51091 will
be thrown.  
\* TP order prices (tpOrdPx) in one order must be different, or error code 51092
will be thrown.  
\* TP limit order prices (tpOrdPx) in one order can't be –1 (market price), or
error code 51093 will be thrown.  
\* You can't place TP limit orders in spot, margin, or options trading.
Otherwise, error code 51094 will be thrown.

Mandatory self trade prevention (STP)  
The trading platform imposes mandatory self trade prevention at master account
level, which means the accounts under the same master account, including master
account itself and all its affiliated sub-accounts, will be prevented from self
trade. The account-level acctStpMode will be used to place orders by default.
The default value of this field is \`cancel_maker\`. Users can log in to the
webpage through the master account to modify this configuration. Users can also
utilize the stpMode request parameter of the placing order endpoint to determine
the stpMode of a certain order.  
Mandatory self trade prevention will not lead to latency.  
There are three STP modes. The STP mode is always taken based on the
configuration in the taker order.  
1\. Cancel Maker: This is the default STP mode, which cancels the maker order to
prevent self-trading. Then, the taker order continues to match with the next
order based on the order book priority.  
2\. Cancel Taker: The taker order is canceled to prevent self-trading. If the
user's own maker order is lower in the order book priority, the taker order is
partially filled and then canceled. FOK orders are always honored and canceled
if they would result in self-trading.  
3\. Cancel Both: Both taker and maker orders are canceled to prevent
self-trading. If the user's own maker order is lower in the order book priority,
the taker order is partially filled. Then, the remaining quantity of the taker
order and the first maker order are canceled. FOK orders are not supported in
this mode.

tradeQuoteCcy  
For users in specific countries and regions, this parameter must be filled out
for a successful order. Otherwise, the system will use the quote currency of
instId as the default value, then error code 51000 will occur.  
The value provided must be one of the enumerated values from tradeQuoteCcyList,
which can be obtained from the endpoint Get instruments (GET
/api/v5/account/instruments).
