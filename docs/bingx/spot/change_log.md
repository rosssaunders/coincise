# BingX Spot API Change Log

## Change Log

2025-08-21

- USDT-M Perp Futures:API and Websocket do not support foreign exchange
  currencies
- USDT-M Perp Futures:The positionId field has been added to the response of the
  query all current open orders API.
- USDT-M Perp Futures:Fixed the issue where clientOrderId was empty in the TP
  order cancellation API and order query API.
- USDT-M Perp Futures:Fixed the incorrect response issue in the set position
  mode API.
- USDT-M Perp Futures:Removed the INDEX_PRICE type from the workingType field in
  the order API.
- Accounts & Wallets:Optimized the withdrawal API. When the funding account
  balance is insufficient, the system will automatically replenish funds from
  the spot account.

2025-07-11

- Accounts & Wallets: Added wallType field to responses for 'Main Account
  Deposit Address', 'Create Sub-Account Deposit Address', and 'Query Sub-Account
  Deposit Address'.
- Accounts & Wallets: Added txId field to input parameters for 'Withdrawal
  Records', 'Deposit Records', and 'Sub-Account Deposit Records Query'.
- Accounts & Wallets: Added displayName field to input parameters and responses
  for 'Query Coin Deposit/Withdrawal Data'.

2025-07-09

- USDT-M Perp Futures: Removed SNAPSHOT type from 'Account balance and position
  update push'.

2025-06-30

- USDT-M Perp Futures: Added displayName field to 'USDT-M Perp Futures symbols'
  interface.
- Coin-M Perp Futures: Added displayName field to 'Contract Information'
  interface.
- Spot: Added displayName field to 'Spot trading symbols' interface.

2025-06-17

- USDT-M Perp Futures: Websocket ‘Market Depth Data’ push intervals adjusted to
  200ms and 500ms.

2025-06-12

- USDT-M Perp Futures: The order placement API response now includes an
  ‘executedQty’ field.
- USDT-M Perp Futures: Added ‘closePosition’ field to responses of both the
  single order details query and open orders query.

2025-05-14

- Public: New investigation questionnaire added.

2025-04-25

- Perpetual USDⓈ-M Futures: Order placement, cancellation, and query now support
  clientOrderId
- Spot: balance API endpoint adds displayName field
- Wallet & Account: Withdrawal API adds 'Spot Account' type

2025-03-13

- Perpetual USDT-M: Support 'Separated Isolated' Margin

2025-02-10

- Perpetual USDT-Margined: The ‘Current All Open Orders’ API has added the
  'actPrice' field.

2025-01-22

- Perpetual USDT-Margined: Added the Status field to all place order related
  interfaces

2025-01-21

- Perpetual U-margined: Added descriptions for the Price and PriceRate fields in
  the query all orders API.

2024-12-17

- Perpetual U-Margin: Hedge Mode Supports Automatic Margin Addition

2024-12-06

- Perpetual USDT-M: Query all pending orders API
  /openApi/swap/v2/trade/openOrders Support query based on order type
- Perpetual USDT-M: Cancel all pending orders API
  /openApi/swap/v2/trade/allOpenOrders Support cancellation based on order type

2024-11-19

- USDT-M Perpetual: Added 'One-Click Reverse Position' interface.

2024-11-15

- Perpetual USDT-M: Added 'Switch Multi-Assets Mode' interface.
- Perpetual USDT-M: Added 'Query Multi-Assets Mode' interface.
- Perpetual USDT-M: Added 'Query Multi-Assets Rules' interface.
- Perpetual USDT-M: Added 'Query Multi-Assets Margin' interface.
- Perpetual USDT-M: A websocket is limited to a maximum of 200 topics, and 80403
  error codes will be returned.
- Perpetual USDT-M: An IP limit is up to 60 websockets, beyond which the link
  will fail.

2024-11-08

- Spot: Account information push, after a new subscription, immediately push an
  overview of the current account, type=INIT

2024-11-07

- Perpetual Coin-M: Added PostOnly type to TimeInForce field in order placement
  interface.
- Perpetual Coin-M: Added TimeInForce field to single order query interface.
- Perpetual Coin-M: Added TimeInForce field to all open orders query interface.
- Perpetual Coin-M: Added TimeInForce field to liquidation orders query
  interface.
- Perpetual Coin-M: Added TimeInForce field to all historical orders query
  interface.
- Perpetual USD-M WebSocket Service: 'Order update push' add 'td' and 'tv'
  fields。
- Perpetual USD-M: 'Modify Isolated Position Margin' interface add 'positionId'
  field.
- Perpetual USD-M: Add 'Apply VST' interface.

2024-10-24

- Added TWAP order API：/openApi/swap/v1/twap/order
- Added new API for querying TWAP orders：/openApi/swap/v1/twap/openOrders
- Added new API for querying TWAP history：/openApi/swap/v1/twap/historyOrders
- Added new API for querying TWAP order
  details：/openApi/swap/v1/twap/orderDetail
- Added API to cancel TWAP order：/openApi/swap/v1/twap/cancelOrder
- Query history order API：/openApi/swap/v2/trade/allOrders, Added isTwap,
  mainOrderId fields to the output parameters
- Query all order API：/openApi/swap/v1/trade/fullOrder, Added isTwap,
  mainOrderId fields to the output parameters

2024-10-24

- Perpetual USD-M WebSocket Service: Added 'VST' service.
- Added new isolated margin change history
  interface：/openApi/swap/v1/positionMargin/history

2024-10-23

- /openApi/swap/v2/trade/forceOrders now support USDC
- /openApi/swap/v2/trade/allOrders now support USDC
- /openApi/swap/v2/trade/allFillOrders now support USDC
- /openApi/swap/v2/trade/fillHistory now support USDC
- /openApi/swap/v1/trade/positionHistory now support USDC
- /openApi/swap/v3/user/balance now support USDC
- /openApi/swap/v2/user/positions now support USDC

2024-10-16

- Perpetual USD-M WebSocket Service: Added 'Incremental Depth Push' feature

2024-10-11

- Perpetual USDT Websocket Service: 'Order update push' add 'ro'
  field('reduceOnly' field).

2024-10-09

- Perpetual USDT Websocket Service: Each time a new connection is established,
  it will push the full data of 'Account balance and position update', then push
  updates every 5 seconds.
- Perpetual USDT Websocket Service: Each time a new connection is established,
  it will push the full data of 'Configuration updates such as leverage and
  margin mode', then push updates every 5 seconds.
- Perpetual USD-Margined Restful Service: The 'Position and Maintenance Margin
  Ratio' endpoint has added a new 'tier' field.

2024-09-29

- USDT-M Perp Futures: Websocket market data push, added an explanation of the
  push frequency.
- perpetual future websocket: MAX 240 websocket connections per IP

2024-09-11

- Coin-M: Get K-line Data interface, add a note stating that only data from the
  last 30 days can be queried.
- new: agent api

2024-08-27

- Spot: Supports OCO order features, providing OCO order placement, OCO order
  cancellation, querying individual OCO orders, querying open OCO orders, and
  querying OCO order interfaces.

2024-08-22

- Perpetual WebSocket: Added 'cr' field for realized profit and loss in position
  data.
- Spot Market API: Added 'offTime' and 'maintainTime' fields to the
  /openApi/spot/v1/common/symbols endpoint.
- Perpetual Market API: Added 'brokerState' field to the
  /openApi/swap/v2/quote/contracts endpoint.

2024-08-08

- Spot: Added a limit where a single websocket can only successfully subscribe
  to 200 dataTypes.
- Spot: Added a limit where a single IP can have at most 60 websockets.

2024-08-08

- Coin-M Perpetuals: new WS DataType-ACCOUNT_UPDATE Account balance and position
  update push
- Coin-M Perpetuals:new WS DataType-ORDER_TRADE_UPDATE Order update push
- Coin-M Perpetuals:nwe WS ACCOUNT-CONFIG_UPDATE Configuration updates such as
  leverage and margin mode

2024-07-30

- USDT-M Perp Futures: All market data APIs and websocket DataTypes support USDC
  contracts.
- NEW : /openApi/swap/v3/user/balance return both USDT and USDC

2024-07-22

- USDT-M Perp Futures: The ClientOrderId field in the request will be
  automatically converted to lowercase by the system.

2024-07-11

- New Spot features: POST /openApi/spot/v1/trade/batchOrders, new field sync
  (true/false) supports parallel and serial batch ordering
- Change perpetual contract: Order api Post /openApi/swap/v2/trade/order,
  StopGuaranteed field add a new parameter value cutfee, it means to turn on the
  stop-loss function, and enable VIP to reduce the stop-loss fee.
- Perpetual U-based api adjustment: query order, query historical order
  interfaces return the triggerOrderId field.
- New perpetual U-based interface: query position history Get
  /openApi/swap/v1/trade/positionHistory.
- New perpetual coin-based interface: query margin mode Get
  /openApi/cswap/v1/trade/marginType.
- New perpetual coin-based interface: set margin mode Post
  /openApi/cswap/v1/trade/marginType.
- New perpetual coin-based interface: set position margin Post
  /openApi/cswap/v1/trade/positionMargin.
- Perpetual coin-based api adjustment: order api Post
  /openApi/cswap/v1/trade/order, order supports isolated margin mode and planned
  entrusted limit orders

2024-06-28

- Perpetual New Interface: Query historical transaction details.

2024-06-13

- Coin-M Perpetuals new series Trading API

2024-05-27

- Perpetual contract new:Subscribe to 24-hour price changes of all trading pairs
- Perpetual contract new:Subscribe K-Line Data of all trading pairs
- Perpetual contract new:Subscribe Market Depth Data of all trading pairs

2024-05-23

- Perpetual New Interface: Query Position and Maintenance Margin Ratio.

2024-04-25

- Change perpetual contract: 'Contract Information' api supports querying by a
  symbol.
- change perpetual contract: allFillOrders interface, when the symbol field is
  not provided, it will return the historical transaction information of all
  pairs.
- Change perpetual contract: The query position api has a new Return Margin
  field.

2024-04-15

- Changes to api rate limits, please refer
  to:[Rate limit](https://bingx-api.github.io/docs/#/en-us/swapV2/base-info.html#Rate%20limit)

2024-03-28

- Change perpetual contract: The allFillOrders api has added type, side, and
  positionSide fields to return.
- Change perpetual contract: The 'query contract' api response has been updated
  to include the 'ensureTrigger' field and the 'triggerFeeRate' field.
- Change perpetual contract: The 'query positions' api response has been updated
  to include the 'updateTime' field.
- Change perpetual contract: The 'query account balance' api has been updated to
  include the 'shortUid' field.
- Change perpetual contract: The 'query leverage' api and 'modify leverage' api
  added fields availableLongVol, availableShortVol, availableLongVal,
  availableShortVal, maxPositionLongVal, maxPositionShortVal.
- Perpetual contract new: Query all order interface
- Copy Trading New: Trader buys spot order and sells spot assets
- Perpetual addition: Query all current orders GET
  /openApi/swap/v2/trade/openOrders added to return tracking orders, planned
  reverse orders, and added fields for guaranteed take profit and stop loss,
  maker only, retracement rate/spread

2024-03-19

- Perpetual contract new: Close position by positionId
- Perpetual websocket: Added stopGuaranteed field to order information.
- Change perpetual contract: The query order api returns the stopGuaranteed
  field.
- Change perpetual contract: The query order api and the query history orders
  api return the triggerOrderId field.
- Added tradeMinQuantity, tradeMinUSDT, makerFeeRate, and takerFeeRate to the
  /openApi/swap/v2/quote/contracts endpoint in the sustainable market interface.

2024-03-14

- Change perpetual contract: The place order api supports guaranteed stop-loss
  and take-profit functionality.
- Spot added: Countdown cancel all orders function
- Perpetual added: Countdown cancel all orders function
- Spot added: Server time interface
- Spot added: Valid methods, currently supports PostOnly, GTC, IOC, default to
  GTC if not filled in

2024-03-04

- Change perpetual contract: Place Order api supports TRAILING_TP_SL order type

2024-02-23

- Change perpetual contract: adjust the switch leverage interface's 'side' field
  to support the 'BOTH' value.
- Change perpetual contract: In the 'Trade Order' & 'Bulk order' interfaces, the
  'stopLoss' and 'takeProfit' fields do not support the 'quantity' field input.
- Change perpetual contract: New parameter 'closePosition' for 'Trade order' &
  'Bulk order' interface.
- Change perpetual contract: New parameter 'activationPrice' for 'Trade order' &
  'Bulk order' interface.

2024-02-04

- Perpetual contract new: Query Latest price
- Perpetual contract new: Cancel an order and place another one
- Perpetual contract new: Cancel orders in batches and place orders in batches
- Perpetual contract: New WS DataType - Book Ticker streams
- Spot ew endpoint: Cancel order and place a new order
- Spot: Added HTTP api for querying aggregated depth
- Spot: Added HTTP api for querying latest transaction price
- Spot: Added HTTP api for querying best order
- Spot: Added WS ticker - subscribe to 24-hour price changes
- Spot: Added WS lastPrice - subscribe to latest transaction price
- Spot: Added WS bookTicker - subscribe to best order
- Spot: Added HTTP historical transaction query
- Spot: Added HTTP historical k-line query

2024-01-23

- Perpetual contract new: Query marked price K-line data
- Perpetual contract: New WS DataType - 24-hour price change push
- Perpetual contract: New WS DataType - Latest transaction price push
- Perpetual contract: New WS DataType - Latest marked price push
- New: User queries recharge records in risk control interface.

2024-01-10

- GET /openApi/api/v3/capital/withdraw/history response added fields:
  sourceAddress/transferType/addressTag
- GET /openApi/api/v3/capital/deposit/hisrec response added field: sourceAddress
- Perpetual contract new: Query Pending Order Status Interface
- Spot addition: Query transaction details api GET
  /openApi/spot/v1/trade/myTrades
- Perpetual contract new:Query Historical Trading Orders api GET
  /openApi/swap/v1/market/historicalTrades
- Perpetual contract:Query the historical funding rate. 1. Change the input
  parameter 'symbol' to non-mandatory. 2. response added field: fairPrice
- Perpetual contract: New WS DataType - Optional Push Interval for Depth
  Information

2023-12-21

- The spot cancel order api has added the field 'cancelRestrictions' (optional),
  which cancels orders of specified status.
- The spot batch cancel order api provides the field 'clientOrderIDs'
  (optional), which cancels orders in batches according to clientOrderIDs.
- The spot add cancel open orders interface:
  /openApi/spot/v1/trade/cancelOpenOrders
- The spot add commission rate query interface:
  /openApi/spot/v1/user/commissionRate
- The spot query historical orders: The request parameters have added the fields
  'status' and 'type', which filter corresponding orders based on conditions.
- The spot currency pair query interface: Added fields 'apiStateBuy',
  'apiStateSell', and 'timeOnline'.
- Perpetual, add fields to position query response: position value, mark price,
  risk rate, maximum reducible margin, unrealized PNL ratio
- Perpetual order placement and order query: Add single position holding
  function
- Perpetual, modify historical order query request: if symbol is not filled, it
  will query historical orders of all trading pairs
- Spot: increase the history data query period from 7 days to 15 days for K-line
  data
- Withdraw: add field withdrawOrderId, optional, customer-defined withdrawal ID,
  composed of numbers and letters, with a length less than 100 characters
- Withdrawal history: update the field withdrawOrderId: when both platform ID
  and withdrawOrderId are provided as input parameters, the query will be based
  on platform ID
- Internal transfer in master account: add field transferClientId, optional,
  customer-defined internal transfer ID, composed of numbers and letters, with a
  length less than 100 characters
- Query internal transfer records in master account: add field transferClientId,
  optional, customer-defined internal transfer ID. When both platform ID and
  transferClientId are provided as input parameters, the query will be based on
  platform ID
- Internal transfer in sub-account: add field transferClientId, optional,
  customer-defined internal transfer ID, composed of numbers and letters, with a
  length less than 100 characters
- Query internal transfer records in sub-account: add field transferClientId,
  optional, customer-defined internal transfer ID. When both platform ID and
  transferClientId are provided as input parameters, the query will be based on
  platform ID
- Query deposit records in sub-account: change the field subUid to optional,
  when not filled, it will query deposit records of all sub-accounts under the
  master account

2023-12-08

- Spot: Added field for percentage change in price in the last 24 hours
- Spot: Added support for querying the list of open orders with an optional
  symbol parameter. If the symbol parameter is not provided, it will return all
  open orders for the user across all trading pairs
- Perpetual one-click liquidation API: Add the non-mandatory string field
  'symbol'. If not filled, it will liquidate all positions at market price. If
  filled, it will liquidate the corresponding symbol position at market price.
- Perpetual cancel all orders API: 1. Change the input parameter 'symbol' to
  non-mandatory. If not filled, it will cancel all orders. If filled, it will
  cancel the orders for the corresponding symbol. 2. Add a non-mandatory input
  parameter 'type'. If filled, it will cancel orders of the specified type. If
  not filled, it will cancel orders of all types.
- Sub-account: Query sub-account list: Adjust the input field 'limit' to a
  maximum of 1000.
- Sub-account: Create sub-account API Key: Add a new parameter value '5' for the
  input field 'permissions' - Withdrawal.

2023-11-22

- Spot depth websocket: Now supports 5/10/20/50/100 levels
- Spot depth rest api: Now supports up to 1000 levels
- Query user cross-transfer history: Added parameter 'tranId' to request
- Get deposit history (supports multiple networks): Updated 'status' field in
  request/response to: 0-In progress, 6-Confirmed on chain, 1-Completed
- Get withdrawal history (supports multiple networks): Updated 'status' field in
  request/response to: 4-Under review, 5-Failed, 6-Completed, Added parameter
  'id' to request, Removed 'transferType' field from response
- Query internal transfer records of master account: Added parameter 'status' to
  response: 4-Under review, 5-Failed, 6-Completed
- Internal transfer of sub-account: Added 'callingCode' field, required when
  'userAccountType' is 2
- Query internal transfer records of sub-account: Added parameter 'status' to
  response: 4-Under review, 5-Failed, 6-Completed
- Query deposit records of all coins: Added parameter 'coin' to request, Added
  fields 'depositEnable' and 'depositMin' to Network object in response

2023-11-10

- Perpetual future API: Support for simulated trading order placement interface
- Perpetual future WebSocket: Support for returning trigger price field: sp
- Perpetual future WebSocket: Subscription to depth supports returning time
  field
- Perpetual future/Spot: 24-hour price change information supports returning
  best bid and ask prices
- Spot WebSocket: K-line subscription supports more internal types:
  1min/5min/30min/.../1day...etc.

2023-10-12

- Perpetual future/spot: The same order is limited to 1 second and can be
  revoked at most once
- Spot: New Order Type: TAKE\_ STOP\_ Limit: TAKE\_ STOP\_ MARKET: Market price
  stop loss order TRIGGER\_ LIMITED: TRIGGER commissioned for price limit plan\_
  Market: Market price plan commission
- Spot: Historical orders returned with additional fee fields

2023-09-18

- Perpetual Futures: Added support for setting stop-profit and stop-loss when
  placing an order
- Perpetual Futures: Add historical transaction orders to return trading pair
  information
- Perpetual Futures:/openApi/swap/v2/user/positions return liquidation price
- Perpetual Futures: New contract depth query api adds returns in currency units
- Perpetual Futures: Added contract ordering, order checking, push support and
  return to workingType
- Spot: Fix the problem that the K-line does not include the start and end time;
  update the K-line query api V2. When only starttime is transmitted, the time
  sequence is returned in descending order
- Wallet:
  Added[Sub-account recharge Address-related creation and query interface](https://bingx-api.github.io/docs/#/common/sub-account#Create%20Sub-Account%20Recharge%20Address)
  interface
- Copy Trading:
  Added[API for copy trading system](https://bingx-api.github.io/docs/#/copyTrade/trader-interface.html#Current%20Trader)

2023-08-23

- Spot: new
  [24-hour price changes](https://bingx-api.github.io/docs/#/spot/market-api.html#24%E5%B0%8F%E6%97%B6%E4%BB%B7%E6%A0%BC%E5%8F%98%E5%8A%A8%E6%83%85%E5%86%B5)
  interface

2023-08-11

- Perpetual order placement: Add trailing stop loss order types
  [Perpetual contract ordering interface](https://bingx-api.github.io/docs/#/swapV2/trade-api.html#%E4%BA%A4%E6%98%93%E4%B8%8B%E5%8D%95)
- Permanent order placement: stopPrice trigger price supports price types:
  MARK_PRICE, CONTRACT_PRICE,
  INDEX_PRICE:MARK_PRICE、CONTRACT_PRICE、INDEX_PRICE
  [Perpetual contract ordering interface](https://bingx-api.github.io/docs/#/swapV2/trade-api.html#%E4%BA%A4%E6%98%93%E4%B8%8B%E5%8D%95)
- Spot:
  [Cancel a Batch of Orders](https://bingx-api.github.io/docs/#/spot/trade-api.html#Cancel%20a%20Batch%20of%20Orders)

2023-08-03

- Change perpetual contract (maximum leverage moved into new
  interface)[Perpetual contract: maximum leverage](https://bingx-api.github.io/docs/#/swapV2/trade-api.html#Query%20Leverage),Please
  do not use the market interface: Maximum number of levers in
  [Transaction pair information](https://bingx-api.github.io/docs/#/swapV2/market-api.html#Contract%20Information)
- newly added
  [Sub account related operations: sub account creation, query, removal, freezing, authorization, etc](https://bingx-api.github.io/docs/#/common/sub-account)
- newly added
  [Sub account API KEY related operations: sub account API KEY creation, query, removal, permission settings, etc](https://bingx-api.github.io/docs/#/common/sub-account)
- newly added
  [Internal transfer api between sub accounts](https://bingx-api.github.io/docs/#/common/account-api.html#User%20internal%20transfer)
- new
  [User Universal Transfer](https://bingx-api.github.io/docs/#/common/account-api.html#User%20Universal%20Transfer)

2023-07-29

- support TAKE_PROFIT/STOP order type in USDT-M Perp Futures
- support customized field: clientOrderId in both USDT-M Perp Futures and Spot
- support batch placing orders in Spot
- support kline api in Spot

2023-06-03

New version API document website release

- New version UI and interaction
- Demo code is automatically generated and copied with one click
- Fast conversion between api parameter tables and JSON, one click full code
  copying, reducing the workload for developers to copy API parameters
- Add full-text fuzzy search function
- Add email subscription function, and notify developers via email if there are
  API version updates in the future
- Added issue feedback function, developers can directly feedback API issues to
  the BingX team through this website

---
