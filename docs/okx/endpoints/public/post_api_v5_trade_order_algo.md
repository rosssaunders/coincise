# POST /api/v5/trade/order-algo

Source:
[https://www.okx.com/docs-v5/en/#order-book-trading-algo-trading-post-place-algo-order](https://www.okx.com/docs-v5/en/#order-book-trading-algo-trading-post-place-algo-order)

### POST / Place algo order

The algo order includes `trigger` order, `oco` order, `chase` order,
`conditional` order, `twap` order and trailing order.

#### Rate Limit: 20 requests per 2 seconds

#### Rate Limit of lead trader lead instruments for Copy Trading: 1 request per 2 seconds

#### Rate limit rule (except Options): User ID + Instrument ID

#### Rate limit rule (Options only): User ID + Instrument Family

#### Permission: Trade

#### HTTP Request

`POST /api/v5/trade/order-algo`

#### Request Parameters

| Parameter | Type   | Required | Description                    |
| --------- | ------ | -------- | ------------------------------ |
| instId    | String | Yes      | Instrument ID, e.g. `BTC-USDT` |
| tdMode    | String | Yes      | Trade mode                     |

Margin mode `cross` `isolated`  
Non-Margin mode `cash`  
`spot_isolated` (only applicable to SPOT lead trading)  
Note: `isolated` is not available in multi-currency margin mode and portfolio
margin mode. | | ccy | String | No | Margin currency  
Applicable to all `isolated` `MARGIN` orders and `cross` `MARGIN` orders in
`Futures mode`. | | side | String | Yes | Order side, `buy` `sell` | | posSide |
String | Conditional | Position side  
Required in `long/short` mode and only be `long` or `short` | | ordType | String
| Yes | Order type  
`conditional`: One-way stop order  
`oco`: One-cancels-the-other order  
`chase`: chase order, only applicable to FUTURES and SWAP  
`trigger`: Trigger order  
`move_order_stop`: Trailing order  
`twap`: TWAP order | | sz | String | Conditional | Quantity to buy or sell  
Either `sz` or `closeFraction` is required. | | tag | String | No | Order tag  
A combination of case-sensitive alphanumerics, all numbers, or all letters of up
to 16 characters. | | tgtCcy | String | No | Order quantity unit setting for
`sz`  
`base_ccy`: Base currency ,`quote_ccy`: Quote currency  
Only applicable to `SPOT` traded with Market buy `conditional` order  
Default is `quote_ccy` for buy, `base_ccy` for sell | | algoClOrdId | String |
No | Client-supplied Algo ID  
A combination of case-sensitive alphanumerics, all numbers, or all letters of up
to 32 characters. | | closeFraction | String | Conditional | Fraction of
position to be closed when the algo order is triggered.  
Currently the system supports fully closing the position only so the only
accepted value is `1`. For the same position, only one TPSL pending order for
fully closing the position is supported.  
This is only applicable to `FUTURES` or `SWAP` instruments.  
If `posSide` is `net`, `reduceOnly` must be `true`.  
This is only applicable if `ordType` is `conditional` or `oco`.  
This is only applicable if the stop loss and take profit order is executed as
market order.  
This is not supported in Portfolio Margin mode.  
Either `sz` or `closeFraction` is required. | | tradeQuoteCcy | String | No |
The quote currency used for trading. Only applicable to `SPOT`.  
The default value is the quote currency of the `instId`, for example: for
`BTC-USD`, the default is `USD`. |

**Take Profit / Stop Loss Order**

Predefine the price you want the order to trigger a market order to execute
immediately or it will place a limit order.  
This type of order will not freeze your free margin in advance.

learn more about [Take Profit / Stop Loss Order](/help/11015447687437)

| Parameter                                                                              | Type   | Required | Description                    |
| -------------------------------------------------------------------------------------- | ------ | -------- | ------------------------------ |
| tpTriggerPx                                                                            | String | No       | Take-profit trigger price      |
| If you fill in this parameter, you should fill in the take-profit order price as well. |
| tpTriggerPxType                                                                        | String | No       | Take-profit trigger price type |

`last`: last price  
`index`: index price  
`mark`: mark price  
The default is `last` | | tpOrdPx | String | No | Take-profit order price  
For condition TP order, if you fill in this parameter, you should fill in the
take-profit trigger price as well.  
For limit TP order, you need to fill in this parameter, but the take-profit
trigger price doesn’t need to be filled.  
If the price is `-1`, take-profit will be executed at the market price. | |
tpOrdKind | String | No | TP order kind  
`condition`  
`limit`  
The default is `condition` | | slTriggerPx | String | No | Stop-loss trigger
price  
If you fill in this parameter, you should fill in the stop-loss order price. | |
slTriggerPxType | String | No | Stop-loss trigger price type  
`last`: last price  
`index`: index price  
`mark`: mark price  
The default is `last` | | slOrdPx | String | No | Stop-loss order price  
If you fill in this parameter, you should fill in the stop-loss trigger price.  
If the price is `-1`, stop-loss will be executed at the market price. | |
cxlOnClosePos | Boolean | No | Whether the TP/SL order placed by the user is
associated with the corresponding position of the instrument. If it is
associated, the TP/SL order will be canceled when the position is fully closed;
if it is not, the TP/SL order will not be affected when the position is fully
closed.  
Valid values:  
`true`: Place a TP/SL order associated with the position  
`false`: Place a TP/SL order that is not associated with the position  
The default value is `false`. If `true` is passed in, users must pass reduceOnly
= true as well, indicating that when placing a TP/SL order associated with a
position, it must be a reduceOnly order.  
Only applicable to `Futures mode` and `Multi-currency margin`. | | reduceOnly |
Boolean | No | Whether the order can only reduce the position size.  
Valid options: `true` or `false`. The default value is `false`. |

Take Profit / Stop Loss Order  
When placing net TP/SL order (ordType=conditional) and both take-profit and
stop-loss parameters are sent, only stop-loss logic will be performed and
take-profit logic will be ignored.

**Chase order**

It will place a Post Only order immediately and amend it continuously  
Chase order and corresponding Post Only order can't be amended.

| Parameter | Type   | Required | Description |
| --------- | ------ | -------- | ----------- |
| chaseType | String | No       | Chase type. |

`distance`: distance from best bid/ask price, the default value.  
`ratio`: ratio. | | chaseVal | String | No | Chase value.  
It represents distance from best bid/ask price when `chaseType` is distance.  
For USDT-margined contract, the unit is USDT.  
For USDC-margined contract, the unit is USDC.  
For Crypto-margined contract, the unit is USD.  
It represents ratio when `chaseType` is ratio. 0.1 represents 10%.  
The default value is 0. | | maxChaseType | String | Conditional | Maximum chase
type.  
`distance`: maximum distance from best bid/ask price  
`ratio`: the ratio.

maxChaseTyep and maxChaseVal need to be used together or none of them. | |
maxChaseVal | String | Conditional | Maximum chase value.  
It represents maximum distance when `maxChaseType` is distance.  
It represents ratio when `maxChaseType` is ratio. 0.1 represents 10%. | |
reduceOnly | Boolean | No | Whether the order can only reduce the position
size.  
Valid options: `true` or `false`. The default value is `false`. |

**Trigger Order**

Use a trigger order to place a market or limit order when a specific price level
is crossed.  
When a Trigger Order is triggered, if your account balance is lower than the
order amount, the system will automatically place the order based on your
current balance.  
Trigger orders do not freeze assets when placed.  
Only applicable to SPOT/FUTURES/SWAP

learn more about [Trigger Order](/help/11015447687437)

| Parameter                                                             | Type   | Required | Description        |
| --------------------------------------------------------------------- | ------ | -------- | ------------------ |
| triggerPx                                                             | String | Yes      | Trigger price      |
| orderPx                                                               | String | Yes      | Order Price        |
| If the price is `-1`, the order will be executed at the market price. |
| triggerPxType                                                         | String | No       | Trigger price type |

`last`: last price  
`index`: index price  
`mark`: mark price  
The default is `last` | | attachAlgoOrds | Array of objects | No | Attached
SL/TP orders info  
Applicable to `Futures mode/Multi-currency margin/Portfolio margin` | | \>
attachAlgoClOrdId | String | No | Client-supplied Algo ID when placing order
attaching TP/SL.  
A combination of case-sensitive alphanumerics, all numbers, or all letters of up
to 32 characters.  
It will be posted to algoClOrdId when placing TP/SL order once the general order
is filled completely. | | \> tpTriggerPx | String | No | Take-profit trigger
price  
If you fill in this parameter, you should fill in the take-profit order price as
well. | | \> tpTriggerRatio | String | No | Take profit trigger ratio, 0.3
represents 30%  
Only applicable to FUTURES and SWAP. | | \> tpTriggerPxType | String | No |
Take-profit trigger price type  
`last`: last price  
`index`: index price  
`mark`: mark price  
The default is `last` | | \> tpOrdPx | String | No | Take-profit order price  
If you fill in this parameter, you should fill in the take-profit trigger price
as well.  
If the price is `-1`, take-profit will be executed at the market price. | | \>
slTriggerPx | String | No | Stop-loss trigger price  
If you fill in this parameter, you should fill in the stop-loss order price. | |
\> slTriggerRatio | String | No | Stop profit trigger ratio, 0.3 represents
30%  
Only applicable to FUTURES and SWAP. | | \> slTriggerPxType | String | No |
Stop-loss trigger price type  
`last`: last price  
`index`: index price  
`mark`: mark price  
The default is `last` | | \> slOrdPx | String | No | Stop-loss order price  
If you fill in this parameter, you should fill in the stop-loss trigger price.  
If the price is `-1`, stop-loss will be executed at the market price. |

**Trailing Stop Order**

A trailing stop order is a stop order that tracks the market price. Its trigger
price changes with the market price. Once the trigger price is reached, a market
order is placed.  
Actual trigger price for sell orders and short positions = Highest price after
order placement – Trail variance (Var.), or Highest price after placement × (1 –
Trail variance) (Ratio).  
Actual trigger price for buy orders and long positions = Lowest price after
order placement + Trail variance, or Lowest price after order placement × (1 +
Trail variance).  
You can use the activation price to set the activation condition for a trailing
stop order.

learn more about [Trailing Stop Order](/help/11015447687437)

| Parameter                                                                                                                                                                                               | Type    | Required    | Description                                          |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | ----------- | ---------------------------------------------------- |
| callbackRatio                                                                                                                                                                                           | String  | Conditional | Callback price ratio, e.g. `0.01` represents `1%`    |
| Either `callbackRatio` or `callbackSpread` is allowed to be passed.                                                                                                                                     |
| callbackSpread                                                                                                                                                                                          | String  | Conditional | Callback price variance                              |
| activePx                                                                                                                                                                                                | String  | No          | Active price                                         |
| The system will only start tracking the market and calculating your trigger price after the activation price is reached. If you don’t set a price, your order will be activated as soon as it’s placed. |
| reduceOnly                                                                                                                                                                                              | Boolean | No          | Whether the order can only reduce the position size. |

Valid options: `true` or `false`. The default value is `false`.  
This parameter is only valid in the `FUTRUES`/`SWAP` net mode, and is ignored in
the long/short mode. |

**TWAP Order**

Time-weighted average price (TWAP) strategy splits your order and places smaller
orders at regular time intervals.  
It is a strategy that will attempt to execute an order which trades in slices of
order quantity at regular intervals of time as specified by users.

learn more about [TWAP Order](/help/xiii-time-weighted-average-price-twap)

| Parameter | Type   | Required    | Description                                                                                |
| --------- | ------ | ----------- | ------------------------------------------------------------------------------------------ |
| pxVar     | String | Conditional | Price variance by percentage, range between \[0.0001 ~ 0.01\], e.g. `0.01` represents `1%` |

Take buy orders as an example. When the market price is lower than the limit
price, small buy orders will be placed above the best bid price within a certain
range. This parameter determines the range by percentage.  
Either `pxVar` or `pxSpread` is allowed to be passed. | | pxSpread | String |
Conditional | Price variance by constant, should be no less then 0 (no upper
limit)  
Take buy orders as an example. When the market price is lower than the limit
price, small buy orders will be placed above the best bid price within a certain
range. This parameter determines the range by constant. | | szLimit | String |
Yes | Average amount  
Take buy orders as an example. When the market price is lower than the limit
price, a certain amount of buy orders will be placed above the best bid price
within a certain range. This parameter determines the amount. | | pxLimit |
String | Yes | Price Limit, should be no less then 0 (no upper limit)  
Take buy orders as an example. When the market price is lower than the limit
price, small buy orders will be placed above the best bid price within a certain
range. This parameter represents the limit price. | | timeInterval | String |
Yes | Time interval in unit of `second`  
ake buy orders as an example. When the market price is lower than the limit
price, small buy orders will be placed above the best bid price within a certain
range based on the time cycle. This parameter represents the time cycle. |

#### Response Parameters

| **Parameter** | **Type** | **Description**                                            |
| ------------- | -------- | ---------------------------------------------------------- |
| algoId        | String   | Algo ID                                                    |
| clOrdId       | String   | ~Client Order ID as assigned by the client~(Deprecated)    |
| algoClOrdId   | String   | Client-supplied Algo ID                                    |
| sCode         | String   | The code of the event execution result, `0` means success. |
| sMsg          | String   | Rejection message if the request is unsuccessful.          |
| tag           | String   | Order tag                                                  |
