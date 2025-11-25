# API Change Log

## 2025 Changes

- November
  - Removed deprecated fields `maxPriceLimit`, `minPriceLimit`, `maxCostLimit`,
    `minCostLimit`, `makerFee`, `takerFee` from [Get Markets](#tag--market-data)
  - new REST API -
    [Get Unconfirmed OTC Trade](#get-/v2/otc-trades/unconfirmed-trade)
- October
  - new fields in V1CancelAllOrders -
    [V1CancelAllOrders](#post-/v2/command-cancellations)
- September
  - new REST API - [Get Expiry Prices](#get-/v1/expiry-prices/-symbol-)
- August
  - new REST API - [Get Option Ladder](#tag--option-ladder)
  - updated REST API - [Get Markets](#get-/v1/markets) NEW fields `strikePrice`
  - updated REST API - [Get Market Tick](#get-/v1/markets/-symbol-/tick) NEW
    fields `bidIVPercentage`, `askIVPercentage` and `greeks`
  - new REST API - [OTC](#tag--OTC)
  - new fields at [Get Trades](#get-/v1/trades) - `otcMatchId` and `otcTradeId`
  - new REST API -
    [Market Maker Protection](<#tag--market-maker-protection(MMP)>)
  - new WebSocket API - `mmpRequest` topic for
    [Private Data WebSocket](#overview--private-data-websocket-authenticated)
  - new WebSocket API - `mmpTrigger` topic for
    [Private Data WebSocket](#overview--private-data-websocket-authenticated)
  - new REST API -
    [Get Market Maker Protection Configuration by Trading Account Id](#get-/v2/mmp-configuration)
- July
  - new Websocket API -
    [Unified tick for multiple markets](#overview--anonymous-unified-tick-websocket-unauthenticated)
- June
  - new REST API - [Get Historical Trades](#get-/v1/history/trades)
  - new REST API - [Get Historical Orders](#get-/v2/history/orders)
- May
  - Deprecated Features to be removed June 2025:
    - Hybrid OrderBook WebSocket (unauthenticated)
    - Market Data WebSocket (authenticated)
    - Anonymous Trades WebSocket (unauthenticated)
  - Support for fee rebates - [Get Trades](#get-/v1/trades) new fields
    `tradeRebateAmount` and `tradeRebateAssetSymbol`
- March
  - updated REST API - [Get Trading Account](#tag--trading-accounts) new field
    `tradeFees`
  - updated REST API - [Get Trading Account](#tag--trading-accounts) Deprecated
    fields `makerFee` and `takerFee`
  - updated REST API - [Get Markets](#tag--market-data) new field `feeGroupId`
  - updated REST API - [Get Markets](#tag--market-data) Deprecated fields
    `makerFee` and `takerFee`
  - Removal of request parameter `depth` from
    [Get Market Orderbook](#get-/v1/markets/-symbol-/orderbook/hybrid)
  - Removal of subscription parameter `depth` from
    [unauthenticated multi-orderbook websocket](#overview--multi-orderbook-websocket-unauthenticated)
  - updated REST API - [Order Amendment Commands](#post-/v2/command-amend) new
    command `V1AmendOrder`

## 2024 Changes

- December
  - updated REST API - [Get Trading Account](#tag--trading-accounts) new field
    `totalLiabilitiesUSD`
  - updated WebSocket API - `/private-data` topic - `tradingAccounts` new field
    `totalLiabilitiesUSD`
- November
  - updated REST API - [Get Trading Account](#tag--trading-accounts) new fields
    `liquidityAddonUSD`, `marketRiskUSD` and `marginProfile`
  - updated WebSocket API - `/private-data` topic - `tradingAccounts` new fields
    `liquidityAddonUSD`, `marketRiskUSD` and `marginProfile`
  - updated REST API - [Get Assets](#tag--asset-data) new nested fields
    `underlyingAsset`
  - updated REST API - [Get Markets](#tag--market-data) new field
    `expiryDatetime`
  - Deprecated REST API - [Perpetual Settlement History]
  - New REST API -
    [Derivatives Settlement History](#get-/v1/history/derivatives-settlement)
  - Deprecating REST API - `GET /trading-api/v1/history/perpetual-settlement`
  - WebSocket API `/private-data` new topic - `derivativesPositionV2`
- October
  - New REST API -
    [Portfolio Margin Simulator](#tag--portfolio-margin-simulator)
- September
  - New REST API -
    [Funding Rate History](#get-/v1/history/markets/-symbol-/funding-rate)
  - updated REST API - [Get Markets](#tag--market-data) deprecated fields
    `maxInitialLeverage`, `warningLeverage`, `liquidationLeverage`,
    `fullLiquidationLeverage` and `defaultedLeverage`
- August
  - New
    [Unified Anonymous Trade WS API](#overview--unified-anonymous-trades-websocket-unauthenticated)
- July
  - updated REST API - [Get Trading Account](#tag--trading-accounts) new field
    `isConcentrationRiskEnabled`
  - updated REST API - [Get Markets](#tag--market-data) new fields
    `openInterestUSD`, `concentrationRiskThresholdUSD` and
    `concentrationRiskPercentage`
  - updated REST API - [Get Markets](#tag--market-data) new fields
    `roundingCorrectionFactor`, `makerMinLiquidityAddition`,
    `liquidityInvestEnabled` and `liquidityWithdrawEnabled`
  - New APIs
    - WebSocket `/trading-api/v1/index-data` for
      [index price updates](#overview--index-data-websocket-unauthenticated)
    - REST - `GET /trading-api/v1/index-prices`
    - REST - `GET /trading-api/v1/index-prices/{assetSymbol}`
- June
  - updated REST API - [Get Assets](#tag--asset-data) new fields `name` and
    `collateralBands`
  - updated REST API - [Get Assets](#tag--asset-data) deprecating field
    `collateralRating`
- May
  - WebSocket API `/private-data` new topic - `ammInstructions`
- April
  - Moved deprecated items to
    [Deprecated Features & APIs](.././deprecated/index.html)
    - Bullish Key
    - Old Signing Format
    - Hybrid OrderBook WebSocket (unauthenticated)
    - Market Data WebSocket (authenticated)
    - V1 Orders APIs
    - V1 AMM Instructions APIs
    - REST - `GET /accounts/spot`
    - REST - `GET /accounts/spot/{symbol}`
  - Removed decommissioned items
    - REST - `POST /trading-api/v1/users/login`
- March
  - Added POST_ONLY order type for
    [POST /trading-api/v2/orders](#post-/v2/orders)
  - Added POST_ONLY order type for [GET /markets](#get-/v1/markets)
  - WebSocket API `/private-data` response models contain new field -
    `tradingAccountId`
- February
  - Response model changes for [GET /trading-api/assets](#get-/v1/assets) and
    [GET `/trading-api/assets/{symbol}`](#get-/v1/assets/-symbol-)
    - new fields `totalOfferedLoanQuantity` and `loanBorrowedQuantity`
  - new REST API -
    [GET /trading-api/v1/history/transfer](#get-/v1/history/transfer)
  - Updated REST API -
    [Get Trading-Accounts](#get-/v1/accounts/trading-accounts) new fields
    `totalBorrowedUSD` `totalCollateralUSD`, `initialMarginUSD`,
    `warningMarginUSD` `liquidationMarginUSD`, `fullLiquidationMarginUSD`,
    `defaultedMarginUSD`, `endCustomerId`
  - Updated WS API - `/private-data` websocket, `tradingAccounts` response model
    updated with new fields
- January
  - Added new field `quoteAmount` for response models
    - REST - `GET /orders`
    - REST - `GET /trades`
    - Websocket - `orders` and `trades` topic

## 2023 Changes

- December
  - History APIs require date/time range to be specified.
  - Direct Connect connectivity option added.
  - Deprecation of authenticated L1 websocket in favour of
    [unauthenticated multi-orderbook websocket](#overview--multi-orderbook-websocket-unauthenticated).
  - Deprecation of unauthenticated per-market L2 websocket in favour of
    [unauthenticated multi-orderbook websocket](#overview--multi-orderbook-websocket-unauthenticated).
  - Added test instruments.
- November
  - New APIs for placing commands into the exchange. Uses
    [signing format](#overview--signing-format) and allows non-strict precision
    on price/quantities.
    - [POST /trading-api/v2/orders](#post-/v2/orders) for creating orders,
      [GET /trading-api/v2/orders](#get-/v2/orders) for fetching orders.
    - [POST /trading-api/v2/amm-instructions](#post-/v2/amm-instructions) for
      creating AMM instructions,
      [GET /trading-api/v2/amm-instructions](#get-/v2/amm-instructions) for
      fetching AMM instructions.
    - [POST /trading-api/v2/command](#post-/v2/command) for all other commands.
  - Deprecation of following APIs, will be removed towards the end of Q3 2024.
    - `/trading-api/v1/orders`
    - `/trading-api/v1/amm-instructions`
    - `/trading-api/v1/command`
  - Response model changes for [GET /trading-api/v2/orders](#get-/v2/orders),
    [GET /trading-api/v1/orders](#get-/v1/orders) and
    [Private Data WebSocket (authenticated)](#overview--private-data-websocket-authenticated)
    orders topic.
    - `allowBorrow`, `borrowedBaseQuantity`, `borrowedQuoteQuantity`,
      `clientOrderId` added.
    - `margin`, `borrowedQuantity`, `handle` deprecated, will be removed towards
      the end of Q3 2024.
  - Response model changes for
    [GET /trading-api/v2/amm-instructions](#get-/v2/amm-instructions) and
    [GET /trading-api/v1/amm-instructions](#get-/v1/amm-instructions)
    - `instructionId` added.
    - `liquidityId` deprecated, will be removed towards the end of Q3 2024.
  - New
    [Multi-OrderBook WebSocket (unauthenticated)](#overview--multi-orderbook-websocket-unauthenticated)
    API
  - new REST API - [derivatives positions](#get-/v1/derivatives-positions)
  - new REST API - perpetual settlement
  - updated REST API - [Get Markets](#get-/v1/markets) new fields `marketType`
    and new fields for perpetual market only:
    `contractMultiplier`,`settlementAssetSymbol`, `underlyingBaseSymbol`,
    `underlyingQuoteSymbol`
  - updated REST API - [Get Market Tick](#get-/v1/markets/-symbol-/tick) new
    fields `markPrice` `fundingRate`, `openInterest`
  - updated REST API -
    [Get Trading-Accounts](#get-/v1/accounts/trading-accounts) new field
    `riskLimitUSD`
  - updated REST API - [Get AMM Instruction](#get-/v2/amm-instructions) new
    field `lastDistributedPrice`
  - New
    [Get Market Tick WebSocket API](#overview--anonymous-market-data-price-tick-unauthenticated)
  - Websocket - Updated API
    [Private Data WebSocket](#overview--private-data-websocket-authenticated)
    new Topic `derivativesPositions`
  - Websocket - Updated API
    [Private Data WebSocket](#overview--private-data-websocket-authenticated)
    Topic `tradingAccounts`, response model updated.
- October
  - New heartbeat topic for
    [Private Data WebSocket (authenticated)](#overview--private-data-websocket-authenticated)
  - New ECDSA API Keys and ECDSA based signing
    - Login API - `POST /trading-api/v2/users/login` supports ECDSA signatures
    - BX-SIGNATURE header supports signatures generated via ECDSA
- September
  - New HMAC API Keys and HMAC based signing
    - Login API - `GET /v1/users/hmac/login`
    - BX-SIGNATURE header supports signatures generated via HMAC and EDDSA
  - New FIX API - The FIX API is available to institutional clients
- August - New REST API - `GET /history/borrow-interest`
  - New REST API - `Cancel All Open Limit Orders after Delay` -
    `POST /command?commandType=V1DelayedCancelAllOrders`
  - New REST API - logout session - `GET /v1/users/logout`
- July - Margin related REST and WS changes
  - `borrowedQuantity` and `isLiquidation` fields added to `GET /orders` and
    `WS /private-data` orders topic
  - Calculation for `free` and `used` fields changed in `GET /accounts/spot`,
    `GET /accounts/spot/{symbol}` and `WS /private-data` `spotAccounts` topic
  - New `GET /accounts/asset` and `GET /accounts/asset/{symbol}`
  - New `assetAccounts` and `tradingAccounts` topics in `WS /private-data`
  - `isLending`, `isBorrowing`, `isDefaulted`, `maxInitialLeverage`, `makerFee`
    and `takerFee` fields added to `GET /accounts/trading-accounts`
  - `collateralRating` and `maxBorrow` fields added to `/assets`
- May - add V1CancelAllOrdersByMarket to cancel all open orders by trading
  account id and market
- April - add V1CancelAllOrders to cancel all open limit orders by trading
  account id
- April - add `/accounts/trading-accounts` endpoint to fetch all trading
  accounts
- April - new hybrid orderbook WebSocket API with greater depth and aggregation
  factor
  - Private Data WebSocket `/v1/private-data` ->
    [New API](#overview--private-data-websocket-authenticated)
    `/v1/private-data?tradingAccountId=111234567890`
  - Get account details [Current API](../v1/#get-/accounts/spot) ->
    [New API](#tag--accounts)
  - Get trade details [Current API](../v1/#get-/trades) ->
    [New API](#get-/v1/trades)
  - Get AMM Instruction by ID
    [Current API](../v1/#get-/amm-instructions/-liquidityId-) ->
    [New API](#get-/v2/amm-instructions/-instructionid-)
  - Get AMM instruction details [Current API](../v1/#get-/amm-instructions) ->
    [New API](#get-/v2/amm-instructions)
  - Remove AMM instruction [Current API](../v1/#delete-/amm-instructions) ->
    [New API](../v2/#delete-/amm-instructions)
  - Add AMM instruction [Current API](../v1/#post-/amm-instructions) ->
    [New API](#post-/v2/amm-instructions)
  - Get order details [Current API](../v1/#get-/orders) ->
    [New API](#get-/v2/orders)
  - Cancel order [Current API](../v1/#delete-/orders) ->
    [New API](../v2/#delete-/orders)
  - Create order [Current API](../v1/#post-/orders) ->
    [New API](#post-/v2/orders)
  - Updated REST API:
  - New REST API:
    [To transfer asset between two trading accounts ](#tag--command-entry)
  - New REST API:
    [To retrieve all the trading account details for current user](../v2/#get-/v1/accounts/trading-accounts)
    Gets details for all trading accounts accessible by the API key used in the
    request. Requires
    [bearer token](#overview--add-authenticated-request-header) in authorization
    header. The trading account's id will be used in all other REST API
- March - introduce "trading account Id" to authenticated REST API and websocket
- March - add custody SIGNET support, remove SEN support
- March - add unsolicited amend status reason code
- March - add nonce window to `/orders` to allow out-of-order order requests to
  be processed
- March - `/v1/users/login` to be deprecated towards the end of Q2 2023
- January - add AMM instructions API

## 2022 Changes

- November - deprecate subscription topics in `/private-data` - `events`,
  `positions` and `marginAccounts`
- November - deprecate `/accounts/margin`, `/accounts/margin/{symbol}`,
  `/positions` and `/positions/{symbol}`
- October - add Custody API
- August - add anonymous trades WebSocket API
- July - deprecate WebSocket API `/v1/private` and `/v1/market-data`
- July - add hybrid orderbook WebSocket API
- June - add handle field to `GET /trades` and `GET /trades/{tradeId}`
- June - add handle field to `V1TATrade` for private data WebSocket
- June - orderbook default depth of `10` -
  `GET /markets/{symbol}/orderbook/hybrid`
- May - add `events` topic to private data WebSocket
- April - add market data WebSocket API
- April - add private data WebSocket API
- March - add optional `depth` parameter to
  `GET /markets/{symbol}/orderbook/hybrid?depth=10`
- March - add IOC time-in-force order type
- March - add FOK time-in-force order type
- March - add order `statusReasonCode` map to API documentation
- March - add historical anonymous trades API -
  `GET /history/markets/{symbol}/trades`
- February - add filter by status=CANCELLED to `GET /orders?status=CANCELLED`
- January - add pagination support to `GET /markets/{symbol}/candle`
