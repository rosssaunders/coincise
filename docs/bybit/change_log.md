- [](/docs/)
- V5

On this page

# V5

## 2025-11-25[​](#2025-11-25 "Direct link to heading")

### Websocket API[​](#websocket-api "Direct link to heading")

- The push frequency of Orderbook Level 1000 data will be changed from 300ms to
  200ms.

## 2025-11-17[​](#2025-11-17 "Direct link to heading")

### REST API[​](#rest-api "Direct link to heading")

- We have deprecated the Legacy Crypto Loan Borrow API, since the new crypto
  loan service is now online.
  - [Legacy Crypto Loan Borrow](/docs/v5/abandon/borrow)

## 2025-11-13[​](#2025-11-13 "Direct link to heading")

### REST API[​](#rest-api-1 "Direct link to heading")

- [Get Transaction Log](/docs/v5/account/transaction-log) \[UPDATE\]
  - Add new request param `transSubType`, it is used to filter Move Position
    trans log only.

## 2025-11-11[​](#2025-11-11 "Direct link to heading")

### REST API[​](#rest-api-2 "Direct link to heading")

- [Get Instruments Info](/docs/v5/market/instrument) \[UPDATE\]
  - Add new response field `postOnlyMaxLimitOrderSize` for spot, each trading
    pair has its own configuration defining the maximum limit order size for
    Post-only and RPI orders
- [Get Account Instruments Info](/docs/v5/account/instrument) \[UPDATE\]
  - Add new response field `postOnlyMaxLimitOrderSize` for spot, each trading
    pair has its own configuration defining the maximum limit order size for
    Post-only and RPI orders

## 2025-11-04[​](#2025-11-04 "Direct link to heading")

### REST API[​](#rest-api-3 "Direct link to heading")

- [Place Order](/docs/v5/order/create-order) \[UPDATE\]
  - Option trading supports `slippageToleranceType`
- [Get Public Trades](/docs/v5/market/recent-trade) \[UPDATE\]
  - The interval between the order transaction's startTime and endTime has been
    changed from 7 days to 30 days

### Websocket API[​](#websocket-api-1 "Direct link to heading")

- [Tickers](/docs/v5/websocket/public/ticker) \[UPDATE\]
  - Spot Push frequency changes from Real-time to 50ms

## 2025-11-03[​](#2025-11-03 "Direct link to heading")

### REST API[​](#rest-api-4 "Direct link to heading")

- [Manual Repay Without Asset Conversion](/docs/v5/account/no-convert-repay)
  \[NEW\]
  - Add a new endpoint to manual repay without asset conversion

## 2025-10-23[​](#2025-10-23 "Direct link to heading")

### REST API[​](#rest-api-5 "Direct link to heading")

- [Manual Borrow](/docs/v5/account/borrow) \[NEW\]
  - Add a new endpoint for UTA manual borrow

- [Get Max Borrowable Amount](/docs/v5/spot-margin-uta/max-borrowable) \[NEW\]
  - Add a new endpoint to get max borrowable amount

- [Get Position Tiers](/docs/v5/spot-margin-uta/position-tiers) \[NEW\]
  - Add a new endpoint to get loan position risk information.

- [Set Leverage](/docs/v5/spot-margin-uta/set-leverage) \[UPDATE\]
  - Add a new input parameter `currency` to set leverage by `currency`

- [Get Coin State](/docs/v5/spot-margin-uta/coinstate) \[NEW\]
  - Add a new endpoint to get currency leverage information

- [Get Available Amount to Repay](/docs/v5/spot-margin-uta/repayment-available-amount)
  \[NEW\]
  - Add a new endpoint to get available amount to repay

- [Get Transaction Log](/docs/v5/account/transaction-log) \[UPDATE\]
  - Add new type Enums `MANUAL_LOANS_BORROW`, `MANUAL_LOANS_REPAY`,
    `AUTO_LOANS_BORROW`, `AUTO_LOANS_REPAY`

- [Get Tickers](/docs/v5/market/tickers) \[UPDATE\]
  - Add new response fields `basisRateYear`, `fundingIntervalHour`, `fundingCap`

## 2025-10-22[​](#2025-10-22 "Direct link to heading")

### REST API[​](#rest-api-6 "Direct link to heading")

- [Get Affiliate User List](/docs/v5/affiliate/affiliate-user-list) \[UPDATE\]
  - Add new request fields `startDate`, `endDate`
  - Add new response fields `takerVol`, `makerVol`, `tradeVol`, `startDate`,
    `endDate`

## 2025-10-21[​](#2025-10-21 "Direct link to heading")

### REST API[​](#rest-api-7 "Direct link to heading")

- [Get Withdrawal Address List](/docs/v5/asset/withdraw/withdraw-address)
  \[NEW\]
  - We have launched a new endpoint to query the withdrawal addresses in the
    address book.

- [Get Instruments Info](/docs/v5/market/instrument) \[UPDATE\]
  - Add `symbolType` request parameter to filter instrument records for`spot`
  - Add new response field `forbidUplWithdrawal`

- [Get Account Instruments Info](/docs/v5/account/instrument) \[NEW\]
  - Add category = `spot` to support querying `spot` instruments

- [Place Order](/docs/v5/order/create-order) \[UPDATE\]
  - Add new input parameters `bboSideType`, `bboLevel` to suppot to place a BBO
    order

- [Get Open Orders](/docs/v5/order/open-order) \[UPDATE\]
  - `createType` has new enumeration value: `CreateByBboOrder`, used to indicate
    BBO Order

- [Get Order History](/docs/v5/order/order-list) \[UPDATE\]
  - `createType` has new enumeration value: `CreateByBboOrder`, used to indicate
    BBO Order

### WebSocket API[​](#websocket-api-2 "Direct link to heading")

- [Order](/docs/v5/websocket/private/order) \[UPDATE\]
  - `createType` has new enumeration value: `CreateByBboOrder`, used to indicate
    BBO Order
- [Execution](/docs/v5/websocket/private/execution) \[UPDATE\]
  - `createType` has new enumeration value: `CreateByBboOrder`, used to indicate
    BBO Order

## 2025-10-16[​](#2025-10-16 "Direct link to heading")

### REST API[​](#rest-api-8 "Direct link to heading")

- [Get Account Instruments Info](/docs/v5/account/instrument) \[NEW\]
  - This new endpoint supports querying whether the current account has trading
    permissions, whether it has RPI permissions, and whether the current symbol
    is among the public RPI symbols
- [Get Flexible Loans](/docs/v5/new-crypto-loan/flexible/unpaid-loan-order)
  \[UPDATE\]
  - Add response parameters `unpaidAmount`, `unpaidInterest`, to distinguish
    unpaid principal and unpaid interest from `totalDebt`
- [Manual Repay](/docs/v5/account/repay) \[NEW\]
  - Add a new endpoint for UTA manual repay

### WebSocket API[​](#websocket-api-3 "Direct link to heading")

- [Ticker](/docs/v5/websocket/public/ticker) \[UPDATE\]
  - Add new response fields `basisRateYear`, `fundingIntervalHour`, `fundingCap`

## 2025-10-14[​](#2025-10-14 "Direct link to heading")

### REST API[​](#rest-api-9 "Direct link to heading")

- [Get Sub UID List (Limited)](/docs/v5/user/subuid-list) \[UPDATE\]
  - Update response parameter `accountMode`, now support distinguish to Classic
    Account, UTA1.0, UTA1.0 Pro, UTA2.0, UTA2.0 Pro
- [Get Sub UID List (Unlimited)](/docs/v5/user/page-subuid) \[UPDATE\]
  - Update response parameter `accountMode`, now support distinguish to Classic
    Account, UTA1.0, UTA1.0 Pro, UTA2.0, UTA2.0 Pro

## 2025-10-10[​](#2025-10-10 "Direct link to heading")

### REST API[​](#rest-api-10 "Direct link to heading")

- [RFQ APIs and WebSockets](/docs/v5/rfq/basic-workflow) \[NEW\]
  - We have launched Bybit RFQ (Request for Quote). Please see our
    [basic workflow](/docs/v5/rfq/basic-workflow) and the
    [help centre](https://www.bybit.com/en/help-center/article/Introduction-to-RFQ)
    for details.
- Earn API \[NEW\]
  - [Get Yield History](/docs/v5/earn/yield-history)
  - [Get Hourly Yield History](/docs/v5/earn/hourly-yield)
- Earn API \[UPDATE\]
  - [Get Stake/Redeem Order History](/docs/v5/earn/order-history)
  - Add request parameters `productId`,`startTime`,`endTime`,`limit`,`cursor` to
    support batch query of orders

## 2025-10-09[​](#2025-10-09 "Direct link to heading")

### REST API[​](#rest-api-11 "Direct link to heading")

- [Place Order](/docs/v5/order/create-order) \[UPDATE\]
  - The value range of `slippageTolerance` has been adjusted, where: `TickSize`
    has changed from \[5, 2000\] to \[1, 10000\],`Percent` has changed from
    \[0.05, 1\] to \[0.01, 10\]
- [Get Instruments Info](/docs/v5/market/instrument) \[UPDATE\]
  - Add `symbolType` request parameter to filter instrument records, only for
    `linear`,`inverse`
- [Get Instruments Info](/docs/v5/market/instrument) \[UPDATE\]
  - category=`spot` adds new response fields `maxLimitOrderQty`,
    `maxMarketOrderQty`, will becomes effective on Oct 16th, refer to the
    [announcement](https://announcements.bybit.com/article/changes-to-maximum-order-size-for-limit-and-market-orders-blt6ac479804a794c46/)
    to get more details

## 2025-09-28[​](#2025-09-28 "Direct link to heading")

### REST API[​](#rest-api-12 "Direct link to heading")

- [Rate Limit](/docs/v5/rate-limit) \[UPDATE\]
  - [Set Rate Limit](/docs/v5/rate-limit/rules-for-pros/apilimit-set)
    - Change the input parameter `limit` to `rate`, and change the returned
      field `limit` to `rate`.
  - [Get Rate Limit](/docs/v5/rate-limit/rules-for-pros/apilimit-query)
    - Change returned field `limit` to `rate`.
- [Rate Limit](/docs/v5/rate-limit) \[NEW\]
  - Add endpoints
    [Get Rate Limit Cap](/docs/v5/rate-limit/rules-for-pros/apilimit-query-cap)
    and
    [Get All Rate Limits](/docs/v5/rate-limit/rules-for-pros/apilimit-query-all)

## 2025-09-25[​](#2025-09-25 "Direct link to heading")

### REST API[​](#rest-api-13 "Direct link to heading")

- [Get Fee Group Structure](/docs/v5/market/fee-group-info) \[NEW\]
- [Get Instruments Info](/docs/v5/market/instrument) \[UPDATE\]
  - category=`option`,`linear`,`spot` adds a new response field `symbolType`
  - `innovation` field is deprecated, always `0`

## 2025-09-24[​](#2025-09-24 "Direct link to heading")

### REST API[​](#rest-api-14 "Direct link to heading")

- [Create Borrow Order](/docs/v5/new-crypto-loan/fixed/borrow) \[UPDATE\]
  - Add a new input parameter `repayType`
- [Get Borrow Contract Info](/docs/v5/new-crypto-loan/fixed/borrow-contract)
  \[UPDATE\]
  - Add a new response field `repayType`
- [Get Borrow Order Info](/docs/v5/new-crypto-loan/fixed/borrow-order)
  \[UPDATE\]
  - Add a new response field `repayType`
- [Get Repayment History](/docs/v5/new-crypto-loan/fixed/repay-history)
  \[UPDATE\]
  - Add a new enum `8`(transfer to flexible loan) for field `repayType`

## 2025-09-23[​](#2025-09-23 "Direct link to heading")

### REST API[​](#rest-api-15 "Direct link to heading")

- [Get ADL Alert](/docs/v5/market/adl-alert) \[NEW\]
- [Get Index Price Components](/docs/v5/market/index-components) \[NEW\]

### WebSocket API[​](#websocket-api-4 "Direct link to heading")

- [ADL Alert](/docs/v5/websocket/public/adl-alert) \[NEW\]
  - Add new topic to push grouped insurance pool ADL alert and information

## 2025-09-18[​](#2025-09-18 "Direct link to heading")

### REST API[​](#rest-api-16 "Direct link to heading")

- [Get RPI Orderbook](/docs/v5/market/rpi-orderbook) \[NEW\]
- [Get Open & Closed Orders](/docs/v5/order/open-order) \[UPDATE\]
  - Add a new response field `cumFeeDetail` to return trading fee details
    instead of `cumExecFee`
- [Get Order History](/docs/v5/order/order-list) \[UPDATE\]
  - Add a new response field `cumFeeDetail` to return trading fee details
    instead of `cumExecFee`
- [Get Trade History](/docs/v5/order/execution) \[UPDATE\]
  - Response field `feeCurrency` supports derivatives trading

### WebSocket API[​](#websocket-api-5 "Direct link to heading")

- [Execution](/docs/v5/websocket/private/execution) \[UPDATE\]
  - Add `feeCurrency` to return trading fee currency
- [Order](/docs/v5/websocket/private/order) \[UPDATE\]
  - Add a new response field `cumFeeDetail` to return trading fee details
    instead of `cumExecFee` and `feeCurrency`
- [Order](/docs/v5/spread/websocket/private/order) \[UPDATE\]
  - Add a new response field `cumFeeDetail` to return trading fee details
    instead of `cumExecFee` and `feeCurrency`

## 2025-09-16[​](#2025-09-16 "Direct link to heading")

### REST API[​](#rest-api-17 "Direct link to heading")

- [Get Wallet Balance](/docs/v5/account/wallet-balance) \[UPDATE\]
  - Add new response fields: `spotBorrow`

### WebSocket API[​](#websocket-api-6 "Direct link to heading")

- [Wallet](/docs/v5/websocket/private/wallet) \[UPDATE\]
  - Add new response fields: `spotBorrow`

## 2025-09-15[​](#2025-09-15 "Direct link to heading")

### REST API[​](#rest-api-18 "Direct link to heading")

- [Get Transaction Log](/docs/v5/account/transaction-log) \[UPDATE\]
  - Add new type enums `PLATFORM_TOKEN_MNT_LIQRECALLEDMMNT`,
    `PLATFORM_TOKEN_MNT_LIQRETURNEDMNT`

## 2025-09-11[​](#2025-09-11 "Direct link to heading")

### WebSocket API[​](#websocket-api-7 "Direct link to heading")

- [Orderbook](/docs/v5/websocket/public/orderbook) \[REMOVE\]
  - Remove level 500 orderbooks for futures

## 2025-09-09[​](#2025-09-09 "Direct link to heading")

### REST API[​](#rest-api-19 "Direct link to heading")

- [Cancel all](/docs/v5/order/cancel-all) \[UPDATE\]
  - orderFilter adds a new enum value `StopOrder` for option product types

## 2025-09-08[​](#2025-09-08 "Direct link to heading")

### REST API[​](#rest-api-20 "Direct link to heading")

- [Collateral Repayment](/docs/v5/new-crypto-loan/fixed/repay-collateral)
  \[NEW\]
  - Add fixed collateral repayment endpoint
- [Get Repayment History](/docs/v5/new-crypto-loan/fixed/repay-history)
  \[UPDATE\]
  - Add a new repayType Enum `7：Repay by Currency` for current repayment
    records
- [Collateral Repayment](/docs/v5/new-crypto-loan/flexible/repay-collateral)
  \[NEW\]
  - Add flexible collateral repayment endpoint
- [Get Repayment Orders History](/docs/v5/new-crypto-loan/flexible/repay-orders)
  \[UPDATE\]
  - Add a new repayType Enum `7：Repay by Currency` for current repayment
    records
- [Move Positions](/docs/v5/position/move-position) \[UPDATE\]
  - Newly add category = inverse, only supports UTA 2.0

## 2025-09-04[​](#2025-09-04 "Direct link to heading")

### REST API[​](#rest-api-21 "Direct link to heading")

- [Get Limit Price Behaviour](/docs/v5/account/get-user-setting-config) \[NEW\]
  - Add a new endpoint to get configuration how the system behaves when your
    limit order price exceeds the highest bid or lowest ask price

## 2025-08-28[​](#2025-08-28 "Direct link to heading")

### REST API[​](#rest-api-22 "Direct link to heading")

- [Get Risk Limit](/docs/v5/market/risk-limit) \[UPDATE\]
  - Add support for querying risk limit tables of pre-market trading contract
    pairs

## 2025-08-26[​](#2025-08-26 "Direct link to heading")

### REST API[​](#rest-api-23 "Direct link to heading")

- [Get New Delivery Price](/docs/v5/market/new-delivery-price) \[NEW\]
  - Add a new endpoint to query historical option delivery price

- [Stake / Redeem](/docs/v5/earn/create-order) \[UPDATE\]
  - Add a new input parameter `toAccountType`

## 2025-08-14[​](#2025-08-14 "Direct link to heading")

### WebSocket API[​](#websocket-api-8 "Direct link to heading")

- [Orderbook](/docs/v5/websocket/public/orderbook) \[UPDATE\]
  - Add level 1000 orderbooks for spot and futures

## 2025-08-13[​](#2025-08-13 "Direct link to heading")

### REST API[​](#rest-api-24 "Direct link to heading")

- [Rate Limit](/docs/v5/rate-limit) \[UPDATE\]
  - Add endpoints to set api rate limit and query api rate limit

## 2025-08-07[​](#2025-08-07 "Direct link to heading")

### REST API[​](#rest-api-25 "Direct link to heading")

- [Get Recent Public Trades](/docs/v5/market/recent-trade) \[UPDATE\]
  - Add a new response field `seq`

- [Get Recent Public Trades](/docs/v5/spread/market/recent-trade) \[UPDATE\]
  - Add a new response field `seq` for spread trading

## 2025-08-06[​](#2025-08-06 "Direct link to heading")

### REST API[​](#rest-api-26 "Direct link to heading")

- [Withdraw](/docs/v5/asset/withdraw) \[UPDATE\]
  - Request parameter `accountType` becomes mandatory, and supports withdrawing
    from multiple wallets.

- [Get Delay Withdraw Amount](/docs/v5/asset/balance/delay-amount)
  - Support returning UTA wallet balance

## 2025-08-05[​](#2025-08-05 "Direct link to heading")

### Websocket API[​](#websocket-api-9 "Direct link to heading")

- [Trade](/docs/v5/websocket/public/trade) \[UPDATE\]
  - Add `seq`
  - Futures and Spot public trade message will be split into multiple messages
    when it exceeds 1024 trades

- [Trade](/docs/v5/spread/websocket/public/trade) \[UPDATE\]
  - Add `seq` in spread trading
  - Futures and Spot public trade message will be split into multiple messages
    when it exceeds 1024 trades

## 2025-07-31[​](#2025-07-31 "Direct link to heading")

### REST API[​](#rest-api-27 "Direct link to heading")

- [Set Limit Price Behaviour](/docs/v5/account/set-price-limit) \[NEW\]
  - This endpoint is used to select the system behaviour when the limit order
    price exceeds the price boundary

## 2025-07-25[​](#2025-07-25 "Direct link to heading")

### REST API[​](#rest-api-28 "Direct link to heading")

- [New Crypto Loan](/docs/v5/new-crypto-loan/loan-coin) \[UPDATE\]
  - Add new response fields:
    `flexibleAnnualizedInterestRate`,`annualizedInterestRate7D`,`annualizedInterestRate14D`,`annualizedInterestRate30D`,`annualizedInterestRate60D`,`annualizedInterestRate90D`,`annualizedInterestRate180D`

## 2025-07-22[​](#2025-07-22 "Direct link to heading")

### REST API[​](#rest-api-29 "Direct link to heading")

- [Get Order History](/docs/v5/order/order-list) \[UPDATE\]
  - Add new enum "VAT" for `extraFees` field for ARE VAT tax

- [Get Trade History](/docs/v5/order/execution) \[UPDATE\]
  - Add new enum "VAT" for `extraFees` field for ARE VAT tax

- [Get Transaction Log (UTA)](/docs/v5/account/transaction-log) \[UPDATE\]
  - Add new enum "VAT" for `extraFees` field for ARE VAT tax

### Websocket API[​](#websocket-api-10 "Direct link to heading")

- [RPI Orderbook](/docs/v5/websocket/public/orderbook-rpi) \[UPDATE\]
  - Support Perpetual & Futures

## 2025-07-17[​](#2025-07-17 "Direct link to heading")

### REST API[​](#rest-api-30 "Direct link to heading")

- [New Crypto Loan](/docs/v5/new-crypto-loan/loan-coin) \[New\]
  - Crypto loan (New) now is available

## 2025-07-16[​](#2025-07-16 "Direct link to heading")

### REST API[​](#rest-api-31 "Direct link to heading")

- [Get Transaction Log (UTA)](/docs/v5/account/transaction-log) \[UPDATE\]
  - Add new types `DEFI_INVESTMENT_SUBSCRIPTION`, `DEFI_INVESTMENT_REFUND`,
    `DEFI_INVESTMENT_REDEMPTION`

## 2025-07-15[​](#2025-07-15 "Direct link to heading")

### Websocket API[​](#websocket-api-11 "Direct link to heading")

- [RPI Orderbook](/docs/v5/websocket/public/orderbook-rpi) \[NEW\]
  - Add new topic to push the orderbook feed with RPI quote

## 2025-07-08[​](#2025-07-08 "Direct link to heading")

### REST API[​](#rest-api-32 "Direct link to heading")

- [Get System Status](/docs/v5/system-status) \[NEW\]
  - Add new endpoint to get system status

### Websocket API[​](#websocket-api-12 "Direct link to heading")

- [Websocket GET System Status](/docs/v5/websocket/system/system-status) \[NEW\]
  - Add new topic to get system status

## 2025-07-04[​](#2025-07-04 "Direct link to heading")

### REST API[​](#rest-api-33 "Direct link to heading")

- Add new api hostname `https://api.bybitgeorgia.ge` for Georgia users

### Websocket API[​](#websocket-api-13 "Direct link to heading")

- Add new stream hostname `wss://stream.bybitgeorgia.ge` for Georgia users

## 2025-07-03[​](#2025-07-03 "Direct link to heading")

### REST API[​](#rest-api-34 "Direct link to heading")

- [Get Wallet Balance](/docs/v5/account/wallet-balance) \[UPDATE\]
  - Add new response fields:
    `totalMaintenanceMarginByMp`,`accountMMRateByMp`,`accountIMRateByMp`,`totalInitialMarginByMp`
- [Get Position Info](/docs/v5/position) \[UPDATE\]
  - Add new response fields: `positionIMByMp`,`positionMMByMp`

### Websocket API[​](#websocket-api-14 "Direct link to heading")

- [Wallet](/docs/v5/websocket/private/wallet) \[UPDATE\]
  - Add new fields:
    `accountIMRateByMp`,`accountMMRateByMp`,`totalInitialMarginByMp`,`totalMaintenanceMarginByMp`
- [Position](/docs/v5/websocket/private/position) \[UPDATE\]
  - Add new fields: `positionIMByMp`,`positionMMByMp`

## 2025-06-30[​](#2025-06-30 "Direct link to heading")

### REST API[​](#rest-api-35 "Direct link to heading")

- [Get Order History](/docs/v5/order/order-list) \[UPDATE\]
  - Add new enum "GST" for `extraFees` field for Indian GST tax
- [Get Trade History](/docs/v5/order/execution) \[UPDATE\]
  - Add new enum "GST" for `extraFees` field for Indian GST tax
- [Get Transaction Log (UTA)](/docs/v5/account/transaction-log) \[UPDATE\]
  - Add new enum "GST" for `extraFees` field for Indian GST tax

### Websocket API[​](#websocket-api-15 "Direct link to heading")

- [Execution](/docs/v5/websocket/private/execution) \[UPDATE\]
  - Add `extraFees` for Indian GST tax
- BTC and ETH leveraged tokens are delisted, and the API service will be
  terminated on **4 July, 2025**

## 2025-06-26[​](#2025-06-26 "Direct link to heading")

### REST API[​](#rest-api-36 "Direct link to heading")

- [Get Spread Trade History](/docs/v5/spread/trade/trade-history) \[UPDATE\]
  - Add `execFeeV2` for Spot leg trading fee
  - Add `feeCurrency` for all legs trading fee currency
- [Get Trade History](/docs/v5/order/execution) \[UPDATED\]
  - Add `execFeeV2` for FutureSpread Spot leg trading fee only

### Websocket API[​](#websocket-api-16 "Direct link to heading")

- [Spread Execution](/docs/v5/spread/websocket/private/execution) \[UPDATE\]
  - Add `execFeeV2` for Spot leg trading fee
  - Add `feeCurrency` for all legs trading fee currency

## 2025-06-24[​](#2025-06-24 "Direct link to heading")

### REST API[​](#rest-api-37 "Direct link to heading")

- [Get Closed Options Positions](/docs/v5/position/close-position) \[NEW\]
  - Add new endpoint which is used to get closed options positions
- [Get Closed PnL](/docs/v5/position/close-pnl) \[UPDATE\]
  - Add new response fields `openFee`, `closeFee`
  - Add new enum "option" for `category` field to support getting option closed
    pnl records
- [Get Delivery Record](/docs/v5/asset/delivery) \[UPDATE\]
  - Add new response field `entryPrice`
- [Get Transaction Log (UTA)](/docs/v5/account/transaction-log) \[UPDATE\]
  - Add new types `ONCHAINEARN_SUBSCRIPTION`, `ONCHAINEARN_REDEMPTION`,
    `ONCHAINEARN_REFUND`, `STRUCTURE_PRODUCT_SUBSCRIPTION`,
    `STRUCTURE_PRODUCT_REFUND`, `CLASSIC_WEALTH_MANAGEMENT_SUBSCRIPTION`,
    `PREMIMUM_WEALTH_MANAGEMENT_SUBSCRIPTION`,
    `PREMIMUM_WEALTH_MANAGEMENT_REFUND`, `LIQUIDITY_MINING_SUBSCRIPTION`,
    `LIQUIDITY_MINING_REFUND`, `FLEXIBLE_STAKING_REFUND`,
    `FIXED_STAKING_REFUND`, `PWM_SUBSCRIPTION`, `PWM_REFUND`

## 2025-06-19[​](#2025-06-19 "Direct link to heading")

### REST API[​](#rest-api-38 "Direct link to heading")

- [Get Order Price Limit](/docs/v5/market/order-price-limit) \[NEW\]
  - Add new endpoint which is used to get order price limit

### WebSocket API[​](#websocket-api-17 "Direct link to heading")

- [Order Price Limit](/docs/v5/websocket/public/order-price-limit) \[NEW\]
  - Add new websocket topic "priceLimit" which is used to get order price limit

## 2025-06-12[​](#2025-06-12 "Direct link to heading")

### REST API[​](#rest-api-39 "Direct link to heading")

- [Get Deposit Records (on-chain)](/docs/v5/asset/deposit/deposit-record)
  \[UPDATE\]
  - Add `id`, `txID` request parameters to filter deposit records
  - Add `id`, an internal unique key field in the response
- [Get Sub Deposit Records (on-chain)](/docs/v5/asset/deposit/sub-deposit-record)
  \[UPDATE\]
  - Add `id`, `txID` request parameters to filter deposit records
  - Add `id`, an internal unique key field in the response
- [Get Sub Account Deposit Records](/docs/v5/broker/sub-deposit-record)
  \[UPDATE\]
  - Add `id`, `txID` request parameters to filter deposit records
  - Add `id`, an internal unique key field in the response
- [Get Coin Information](/docs/v5/asset/coin-info) \[UPDATE\]
  - Add `safeConfirmNumber` to indicate the number of security confirmations of
    deposit

## 2025-06-10[​](#2025-06-10 "Direct link to heading")

### REST API[​](#rest-api-40 "Direct link to heading")

- [Pre Check Order](/docs/v5/order/pre-check-order) \[NEW\]
  - Add new endpoint which is used to calculate the changes in IMR and MMR of
    UTA account before and after placing an order.

## 2025-05-28[​](#2025-05-28 "Direct link to heading")

### REST API[​](#rest-api-41 "Direct link to heading")

- [Get Order History](/docs/v5/order/order-list) \[UPDATE\]
  - Add new response field `extraFees` which is only used for Indonesian site or
    EU site
- [Get Trade History](/docs/v5/order/execution) \[UPDATE\]
  - Add new response field `extraFees` which is only used for Indonesian site or
    EU site
- [Get Transaction Log (UTA)](/docs/v5/account/transaction-log) \[UPDATE\]
  - Add new response field `extraFees` which is only used for Indonesian site or
    EU site

## 2025-05-27[​](#2025-05-27 "Direct link to heading")

### REST API[​](#rest-api-42 "Direct link to heading")

- [Get Delivery Price](/docs/v5/market/delivery-price) \[UPDATE\]
  - Add query parameter `settleCoin`, and support settleCoin=USDT

## 2025-05-23[​](#2025-05-23 "Direct link to heading")

### REST API[​](#rest-api-43 "Direct link to heading")

- [Get Insurance](/docs/v5/market/insurance) \[UPDATE\]
  - The balance data update frequency has been changed from every 24 hours to
    every 1 minute
- [Insurance Pool](/docs/v5/websocket/public/insurance-pool) \[NEW\]
  - A new WebSocket topic has been introduced to allow users to listen for
    updates to the insurance pool balance

## 2025-05-06[​](#2025-05-06 "Direct link to heading")

### REST API[​](#rest-api-44 "Direct link to heading")

- [Spread Trading Rate limit](/docs/v5/rate-limit#spread-trading) \[UPDATE\]
  - Modify the rate limit for create/amend/cancel from 100/min to 20/sec
  - Modify the rate limit for cancel-all from 100/min to 5/sec

## 2025-04-24[​](#2025-04-24 "Direct link to heading")

### REST API[​](#rest-api-45 "Direct link to heading")

- [Get Transaction Log (UTA)](/docs/v5/account/transaction-log) \[UPDATE\]
  - Add new response field `transSubType`, used for trans log generated by move
    position now
  - Modify the default time range from 7 days to 24 hours when `startTime` &
    `endTime` are not passed together
- [Get Spread Order History](/docs/v5/spread/trade/order-history) \[UPDATE\]
  - Add response field `cxlRejReason`
  - Remove redundent field `orderPrice`

## 2025-04-22[​](#2025-04-22 "Direct link to heading")

### REST API[​](#rest-api-46 "Direct link to heading")

- [Get Instruments Info](/docs/v5/market/instrument) \[UPDATE\]
  - category=`option` adds a new response field `displayName`
  - category=`linear` adds a new response field `displayName`

## 2025-04-17[​](#2025-04-17 "Direct link to heading")

### REST API[​](#rest-api-47 "Direct link to heading")

- [Request a Quote](/docs/v5/asset/convert/apply-quote) \[UPDATE\]
  - Add a new response param `extTaxAndFee`

## 2025-04-16[​](#2025-04-16 "Direct link to heading")

### REST API[​](#rest-api-48 "Direct link to heading")

- [Get Internal Transfer Records](/docs/v5/asset/transfer/inter-transfer-list)
  \[UPDATE\]
  - Add 7 days restriction to `startTime` & `endTime`
- [Get Universal Transfer List](/docs/v5/asset/transfer/unitransfer-list)
  \[UPDATE\]
  - Add 7 days restriction to `startTime` & `endTime`
- [Get API Key Information](/docs/v5/user/apikey-info) \[UPDATE\]
  - `NFT` field is deprecated, always `[]`
- [Create Sub UID API Key](/docs/v5/user/create-subuid-apikey) \[UPDATE\]
  - `NFT` field is deprecated, always `[]`
- [Get Sub Account All API Keys](/docs/v5/user/list-sub-apikeys) \[UPDATE\]
  - `NFT` field is deprecated, always `[]`
- [Modify Master API Key](/docs/v5/user/modify-master-apikey) \[UPDATE\]
  - `NFT` field is deprecated, always `[]`
- [Modify Sub API Key](/docs/v5/user/modify-sub-apikey) \[UPDATE\]
  - `NFT` field is deprecated, always `[]`

## 2025-04-14[​](#2025-04-14 "Direct link to heading")

### REST API[​](#rest-api-49 "Direct link to heading")

- [Spread Trading Open API](/docs/v5/spread/market/instrument) \[NEW\]

## 2025-04-11[​](#2025-04-11 "Direct link to heading")

### REST API[​](#rest-api-50 "Direct link to heading")

- Earn API \[UPDATE\]
  - Add category `OnChain`.

## 2025-04-02[​](#2025-04-02 "Direct link to heading")

### REST API[​](#rest-api-51 "Direct link to heading")

- [Withdraw](/docs/v5/asset/withdraw) \[UPDATE\]
  - Add request parameter `beneficiaryAddressCountry`,
    `beneficiaryAddressState`, `beneficiaryAddressCity` they are used for users
    from Bybit Indonesia to fill travel rule info

## 2025-04-01[​](#2025-04-01 "Direct link to heading")

### REST API[​](#rest-api-52 "Direct link to heading")

- [Place Order](/docs/v5/order/create-order) \[Perpetual & Futures\]
  - "timeInForce" request parameter supports `RPI`, refer to
    [Retail Price Improvement (RPI) Order](https://www.bybit.com/en/help-center/article/Retail-Price-Improvement-RPI-Order)
    to get more details
- [Batch Place Order](/docs/v5/order/batch-place) \[Perpetual & Futures\]
  - "timeInForce" request parameter supports `RPI`
- [Get Open & Closed Orders](/docs/v5/order/open-order) \[Perpetual & Futures\]
  - Response field "timeInForce" supports `RPI`
- [Get Order History](/docs/v5/order/order-list) \[Perpetual & Futures\]
  - Response field "timeInForce" supports `RPI`
- [Get Public Recent Trading History](/docs/v5/market/recent-trade) \[Perpetual
  & Futures\]
  - Add a new response field `isRPITrade`

### Websocket API[​](#websocket-api-18 "Direct link to heading")

- [Websocket Trade Service](/docs/v5/websocket/trade/guideline)\[Perpetual &
  Futures\]
  - "timeInForce" request parameter supports `RPI` when creating orders
- [Order](/docs/v5/websocket/private/order) \[Perpetual & Futures\]
  - Response field "timeInForce" supports `RPI`
- [Trade](/docs/v5/websocket/public/trade) \[Perpetual & Futures\]
  - Inverse Perpetual & Inverse Futures are effective, and the rest will be done
    in a week.

## 2025-03-20[​](#2025-03-20 "Direct link to heading")

### WebSocket API[​](#websocket-api-19 "Direct link to heading")

- [Orderbook](/docs/v5/websocket/public/orderbook) \[UPDATE\]
  - Spot and Futures orderbook.1 pushes snapshot message only

## 2025-03-05[​](#2025-03-05 "Direct link to heading")

### REST API[​](#rest-api-53 "Direct link to heading")

- [Withdraw](/docs/v5/asset/withdraw) \[UPDATE\]
  - Add request parameter `beneficiaryLegalType`, `beneficiaryWalletType`,
    `beneficiaryUnhostedWalletType`, `beneficiaryPoiNumber`,
    `beneficiaryPoiType`, `beneficiaryPoiIssuingCountry`,
    `beneficiaryPoiExpiredDate` they are used for users from Bybit Turkey and
    Bybit Kazakhstan to fill travel rule info

## 2025-02-27[​](#2025-02-27 "Direct link to heading")

### REST API[​](#rest-api-54 "Direct link to heading")

- [Place Order](/docs/v5/order/create-order) \[UPDATE\]
  - Add `slippageToleranceType` request parameter, used to select slippage type
    for Spot and Futures market orders
  - Add `slippageTolerance` request parameter, used to set slippage value based
    on the type of slippage
- [Get Order History](/docs/v5/order/order-list) \[UPDATE\]
  - Add a new response param `slippageToleranceType`
  - Add a new response param `slippageTolerance`

### Websocket API[​](#websocket-api-20 "Direct link to heading")

- [Order](/docs/v5/websocket/private/order) \[UPDATE\]
  - Add a new response param `slippageToleranceType`
  - Add a new response param `slippageTolerance`

## 2025-02-26[​](#2025-02-26 "Direct link to heading")

### Websocket API[​](#websocket-api-21 "Direct link to heading")

- [Websocket Trade Service](/docs/v5/websocket/trade/guideline)\[UPDATE\]
  - Add a new response field `retExtInfo` in each
    [create/amend/cancel order response](/docs/v5/websocket/trade/guideline#response-parameters-1)
  - Support
    [batch create/amend/cancel](/docs/v5/websocket/trade/guideline#batch-createamendcancel-order)
    request

## 2025-02-20[​](#2025-02-20 "Direct link to heading")

### REST API[​](#rest-api-55 "Direct link to heading")

- Earn API \[NEW\]
  - [Get Product Info](/docs/v5/earn/product-info)
  - [Stake / Redeem](/docs/v5/earn/create-order)
  - [Get Stake/Redeem Order History](/docs/v5/earn/order-history)
  - [Get Staked Position](/docs/v5/earn/position)

### Websocket API[​](#websocket-api-22 "Direct link to heading")

- [All Liquidation](/docs/v5/websocket/public/all-liquidation) \[NEW\]
  - A new topic to get full liquidation occurred in Bybit exchange.
- Liquidation \[DEPRECATE\]
  - The old one only pushes 1 liquidation per second, it can be discarded.

## 2025-02-19[​](#2025-02-19 "Direct link to heading")

### REST API[​](#rest-api-56 "Direct link to heading")

- [Get Affiliate User List](/docs/v5/affiliate/affiliate-user-list) \[UPDATE\]
  - Add new response fields `takerVol30Day`, `makerVol30Day`, `tradeVol30Day`,
    `depositAmount30Day`, `takerVol365Day`, `makerVol365Day`, `tradeVol365Day`,
    `depositAmount365Day`

## 2025-02-18[​](#2025-02-18 "Direct link to heading")

### REST API[​](#rest-api-57 "Direct link to heading")

- [Get Tiered Collateral Ratio](/docs/v5/spot-margin-uta/tier-collateral-ratio)
  (NEW)
  - A new endpoint introduced to get tiered collateral ratio in UTA loan
- [Get Unified Wallet Transferable Amount](/docs/v5/account/unified-trans-amnt)
  \[UPDATE\]
  - `coinName` supports query up to 20 coins per request
  - Add new response field `availableWithdrawalMap` to support multiple coins
- [Get Historical Volatility](/docs/v5/market/iv) \[UPDATE\]
  - Add new request parameter `quoteCoin`, the input value can be "USD" or
    "USDT"
- [Place Order](/docs/v5/order/create-order) \[Spot\]
  - "timeInForce" request parameter supports `RPI`, refer to
    [Retail Price Improvement (RPI) Order](https://www.bybit.com/en/help-center/article/Retail-Price-Improvement-RPI-Order)
    to get more details
- [Batch Place Order](/docs/v5/order/batch-place) \[Spot\]
  - "timeInForce" request parameter supports `RPI`
- [Get Open & Closed Orders](/docs/v5/order/open-order) \[Spot\]
  - Response field "timeInForce" supports `RPI`
- [Get Order History](/docs/v5/order/order-list) \[Spot\]
  - Response field "timeInForce" supports `RPI`
- [Get Public Recent Trading History](/docs/v5/market/recent-trade) \[Spot\]
  - Add a new response field `isRPITrade`

### Websocket API[​](#websocket-api-23 "Direct link to heading")

- [Websocket Trade Service](/docs/v5/websocket/trade/guideline)\[Spot\]
  - "timeInForce" request parameter supports `RPI` when creating orders
- [Order](/docs/v5/websocket/private/order) \[Spot\]
  - Response field "timeInForce" supports `RPI`
- [Trade](/docs/v5/websocket/public/trade) \[Spot\]
  - Four symbols (MASKUSDT, IOUSDT, ZROUSDT, TWTUSDT) now have `RPI` response
    field, full release will be 20th Feb.

## 2025-02-17[​](#2025-02-17 "Direct link to heading")

### REST API[​](#rest-api-58 "Direct link to heading")

- [Create Sub UID API Key](/docs/v5/user/create-subuid-apikey) \[UPDATE\]
  - Support creating the key for Fund Custodial sub acct.
- [Modify Sub API Key](/docs/v5/user/modify-sub-apikey) \[UPDATE\]
  - Support updating the key of Fund Custodial sub acct by custodial institional
    account.
- [Delete Sub API Key](/docs/v5/user/rm-sub-apikey) \[UPDATE\]
  - Support deleting the key of Fund Custodial sub acct by custodial institional
    account.
- [Get Fund Custodial Sub](/docs/v5/user/fund-subuid-list) \[NEW\]
  - Provide a new endpoint to get Fund Custodial sub acct list by custodial
    institional account.
- [Get Sub Account All API Keys](/docs/v5/user/list-sub-apikeys) \[UPDATE\]
  - Support Fund Custodial sub acct

## 2025-02-13[​](#2025-02-13 "Direct link to heading")

### REST API[​](#rest-api-59 "Direct link to heading")

- [Get Transaction Log (UTA)](/docs/v5/account/transaction-log) \[UPDATE\]
  - New transaction type value `PEF_TRANSFER_IN`, `PEF_TRANSFER_OUT`,
    `PEF_PROFIT_SHARE`
- [Get Collateral Info](/docs/v5/account/collateral-info) \[UPDATE\]
  - The field `collateralRatio` field will be no longer useful due to the
    transition from a single conversion rate to a tiered collateral value ratio
    starting from 19 Feb, 2025, refer to
    [announcement](https://announcements.bybit.com/article/updates-to-collateral-value-ratio-rules-for-uta-borrowing-blteba1497739a08988/)
- [Get VIP Margin Data](/docs/v5/spot-margin-uta/vip-margin) \[UPDATE\]
  - The field `collateralRatio` field will be no longer useful due to the
    transition from a single conversion rate to a tiered collateral value ratio
    starting from 19 Feb, 2025

## 2025-02-07[​](#2025-02-07 "Direct link to heading")

### REST API[​](#rest-api-60 "Direct link to heading")

- [Cancel All Orders](/docs/v5/order/cancel-all) \[UPDATE\]
  - Option orders can be cancelled by specifying `settleCoin`, and choose cancel
    all USDT or USDC Option orders

## 2025-01-14[​](#2025-01-14 "Direct link to heading")

### REST API[​](#rest-api-61 "Direct link to heading")

- [Get Instruments Info](/docs/v5/market/instrument) \[UPDATE\]
  - For category=`spot`, replace `limitParameter` and `marketParamter` with
    `priceLimitRatioX`, `priceLimitRatioY`, please refer to this
    [change](https://announcements.bybit.com/article/title-adjustments-to-bybit-s-spot-trading-limit-order-mechanism-blt786c0c5abf865983/)

## 2025-01-09[​](#2025-01-09 "Direct link to heading")

### REST API[​](#rest-api-62 "Direct link to heading")

- [Get Sub Account Deposit Records (Exchange Broker)](/docs/v5/broker/sub-deposit-record)
  \[UPDATE\]
  - Add a new response field `fromAddress`, source address of the deposit
- [Get Deposit Records (on chain)](/docs/v5/asset/deposit/deposit-record)
  \[UPDATE\]
  - Add new response field `fromAddress`, source address of the deposit
- [Get Sub Deposit Records (on chain)](/docs/v5/asset/deposit/sub-deposit-record)
  \[UPDATE\]
  - Add new response field `fromAddress`, source address of the deposit
- [Get Master Deposit Address](/docs/v5/asset/deposit/master-deposit-addr)
  \[UPDATE\]
  - Add a new response field `contractAddress`, show last 6 characters
- [Get Sub Deposit Address](/docs/v5/asset/deposit/sub-deposit-addr) \[UPDATE\]
  - Add a new response field `contractAddress`, show last 6 characters
- [Get Coin Information](/docs/v5/asset/coin-info) \[UPDATE\]
  - Add a new response field `contractAddress`, show complete token contract
    address
- [Get Wallet Balance](/docs/v5/account/wallet-balance) \[UPDATE\]
  - For accountType=`UNIFIED`, the response field `availableToWithdraw` is
    deprecated, it always returns `""`
- [Get All Coins Balance](/docs/v5/asset/balance/all-balance) \[UPDATE\]
  - For accountType=`UNIFIED`, "coin" request parameter becomes **mandatory**,
    and it supports up to 10 coins in one request
- [Get Exchange Broker Earning](/docs/v5/broker/exchange-earning) \[UPDATE\]
  - Add a new response field `execId`

### Websocket API[​](#websocket-api-24 "Direct link to heading")

- [Wallet](/docs/v5/websocket/private/wallet) \[UPDATE\]
  - For accountType=`UNIFIED`, the response field `availableToWithdraw` is
    deprecated, it always returns `""`

## 2025-01-02[​](#2025-01-02 "Direct link to heading")

### REST API[​](#rest-api-63 "Direct link to heading")

- [Get Instruments Info](/docs/v5/market/instrument) \[UPDATE\]
  - For category=`linear` and `inverse`, added response field `riskParameters`,
    `priceLimitRatioX`, `priceLimitRatioY`, please refer to this
    [change](https://announcements.bybit.com/article/adjustments-to-bybit-s-derivative-trading-limit-order-mechanism-blt469228de1902fff6/)

## 2024-12-12[​](#2024-12-12 "Direct link to heading")

### REST API[​](#rest-api-64 "Direct link to heading")

- [Get Risk Limit](/docs/v5/market/risk-limit) \[UPDATE\]
  - When query category="linear", API returned 30 symbols data set each request
    before, but now it returns 15.
- [Withdraw](/docs/v5/asset/withdraw) \[UPDATE\]
  - API rate limit is raised from 1 req to 5 reqs per second

## 2024-12-09[​](#2024-12-09 "Direct link to heading")

### REST API[​](#rest-api-65 "Direct link to heading")

- [Get Unified Wallet Transferable Amount](/docs/v5/account/unified-trans-amnt)
  \[NEW\]
  - Add a new endpoint to get the transferrable amount of a specific coin in the
    Unified wallet

## 2024-12-04[​](#2024-12-04 "Direct link to heading")

### REST API[​](#rest-api-66 "Direct link to heading")

- [Get Affiliate User List](/docs/v5/affiliate/affiliate-user-list) \[NEW\]
  - For Affiliate user, you can use this endpoint to query user list information

## 2024-11-19[​](#2024-11-19 "Direct link to heading")

### REST API[​](#rest-api-67 "Direct link to heading")

- [Get Instruments Info](/docs/v5/market/instrument) \[UPDATE\]
  - For category=`spot`, added response field `stTag`

## 2024-11-14[​](#2024-11-14 "Direct link to heading")

### REST API[​](#rest-api-68 "Direct link to heading")

- [Get Long Short Ratio](/docs/v5/market/long-short-ratio) \[UPDATE\]
  - Add request parameter `startTime`, `endTime`, used to query historical data
    by filter time range

## 2024-11-05[​](#2024-11-05 "Direct link to heading")

- Kazakhstan users registered from "[www.bybit.kz"](http://www.bybit.kz%22),
  please use "api.bybit.kz" and "stream.bybit.kz" hostnames.

## 2024-10-30[​](#2024-10-30 "Direct link to heading")

### REST API[​](#rest-api-69 "Direct link to heading")

- [Get Collateral Info](/docs/v5/account/collateral-info) \[UPDATE\]
  - Add a new response field `otherBorrowAmount`

## 2024-10-15[​](#2024-10-15 "Direct link to heading")

### Websocket API[​](#websocket-api-25 "Direct link to heading")

- Add websocket domain `stream.bybit-tr.com` for the users registered from
  "[www.bybit-tr.com"](http://www.bybit-tr.com%22). For these users, now you can
  use this domain to place orders via
  [websocket trade service](/docs/v5/websocket/trade/guideline).

## 2024-10-11[​](#2024-10-11 "Direct link to heading")

### REST API[​](#rest-api-70 "Direct link to heading")

- [Crypto Loan](/docs/v5/crypto-loan/collateral-coin) open API are released to
  production

## 2024-09-29[​](#2024-09-29 "Direct link to heading")

### Websocket API[​](#websocket-api-26 "Direct link to heading")

- [Order](/docs/v5/websocket/private/order) \[UPDATE\]
  - Add new response field `closedPnl`
- [Execution](/docs/v5/websocket/private/execution) \[UPDATE\]
  - Add a response field `execPnl`

## 2024-09-12[​](#2024-09-12 "Direct link to heading")

### REST API[​](#rest-api-71 "Direct link to heading")

- [Query Voucher Spec](/docs/v5/broker/reward/voucher) \[NEW\]
  - Add voucher API for exchange broker clients
- [Issue Voucher](/docs/v5/broker/reward/issue-voucher) \[NEW\]
  - Add voucher API for exchange broker clients
- [Query Issued Voucher](/docs/v5/broker/reward/get-issue-voucher) \[NEW\]
  - Add voucher API for exchange broker clients

## 2024-08-29[​](#2024-08-29 "Direct link to heading")

### REST API[​](#rest-api-72 "Direct link to heading")

- [Get Order History](/docs/v5/order/order-list) \[UPDATE\]
  - Classic account Spot trading supports getting the past 2 years Filled,
    Triggered orders
  - Support using `startTime` and `endTime`
- [Get Trade History](/docs/v5/order/execution) \[UPDATE\]
  - Classic account Spot trading supports getting the past 2 years trades
  - Support using `startTime` and `endTime`
- [Get Pre-upgrade Order History](/docs/v5/pre-upgrade/order-list) \[UPDATE\]
  - Support using `startTime` and `endTime`
- [Get Pre-upgrade Trade History](/docs/v5/pre-upgrade/execution) \[UPDATE\]
  - Support using `startTime` and `endTime`

## 2024-08-13[​](#2024-08-13 "Direct link to heading")

### REST API[​](#rest-api-73 "Direct link to heading")

- [Get Loan Orders](/docs/v5/otc/loan-info) \[UPDATE\]
  - Add a new response param `reserveToken`, `reserveQuantity`

## 2024-08-07[​](#2024-08-07 "Direct link to heading")

### REST API[​](#rest-api-74 "Direct link to heading")

- [Request a Quote](/docs/v5/asset/convert/apply-quote) \[UPDATE\]
  - Add two new request parameter for API broker client, `paramType`,
    `paramValue`
- [Get Convert history](/docs/v5/asset/convert/get-convert-history) \[UPDATE\]
  - Add two new response `paramType`, `paramValue` in the "extInfo" object

## 2024-08-06[​](#2024-08-06 "Direct link to heading")

### REST API[​](#rest-api-75 "Direct link to heading")

- [Demo Trading Service](/docs/v5/demo#request-demo-trading-funds) \[Demo
  trading\]
  - Add request param `adjustType` to determine adding or reducing the demo
    funds

## 2024-07-30[​](#2024-07-30 "Direct link to heading")

### Websocket API[​](#websocket-api-27 "Direct link to heading")

- [Fast Execution](/docs/v5/websocket/private/fast-execution) \[UPDATE\]
  - Add response field `isMaker`
  - Supports Spot execution

## 2024-07-25[​](#2024-07-25 "Direct link to heading")

### REST API[​](#rest-api-76 "Direct link to heading")

- [Get Historical Interest Rate](/docs/v5/spot-margin-uta/historical-interest)
  \[NEW\]
  - Add a new endpoint to query historical borrowing interest rate of Margin
    trading

## 2024-07-09[​](#2024-07-09 "Direct link to heading")

### Websocket API[​](#websocket-api-28 "Direct link to heading")

- [Fast Execution](/docs/v5/websocket/private/fast-execution) \[UPDATE\]
  - Add categorised topic, `execution.fast.linear`, `execution.fast.inverse`

## 2024-07-04[​](#2024-07-04 "Direct link to heading")

### REST API[​](#rest-api-77 "Direct link to heading")

- New feature: open api supports the conversion of crypto assets
  - [Get Convert Coin List](/docs/v5/asset/convert/convert-coin-list) \[NEW\]
  - [Request a Quote](/docs/v5/asset/convert/apply-quote) \[NEW\]
  - [Confirm a Quote](/docs/v5/asset/convert/confirm-quote) \[NEW\]
  - [Get Convert Status](/docs/v5/asset/convert/get-convert-result) \[NEW\]
  - [Get Convert history](/docs/v5/asset/convert/get-convert-history) \[NEW\]

## 2024-07-03[​](#2024-07-03 "Direct link to heading")

- [Get Exchange Broker Earning](/docs/v5/broker/exchange-earning) \[UPDATE\]
  - Request parameter `bizType` adds a new enum value "CONVERT"
  - Response parameter `bizType` adds a new enum value "CONVERT"
  - Add new response fields `convert`
- [Get Exchange Broker Account Info](/docs/v5/broker/account-info) \[UPDATE\]
  - Add new response fields `convert`

## 2024-07-01[​](#2024-07-01 "Direct link to heading")

- [Integration Guidance](/docs/v5/guide#authentication) \[UPDATE\]
  - To obey the compliance rule, the new domain is added for Turkey region
    users.

## 2024-06-27[​](#2024-06-27 "Direct link to heading")

### REST API[​](#rest-api-78 "Direct link to heading")

- [Get Instruments Info](/docs/v5/market/instrument) \[UPDATE\]
  - Pre-market contract: add new response fields `isPreListing`,
    `preListingInfo`, `curAuctionPhase`, `phases`, `startTime`, `endTime`,
    `auctionFeeInfo`, `auctionFeeRate`, `takerFeeRate`, `makerFeeRate`
  - Request parameter `status` supports `Closed`, `Delivering`, `PreLaunch` for
    category="inverse" and "linear"
  - When category=linear&status=PreLaunch, you can get pre-market perpetual
- [Get Tickers](/docs/v5/market/tickers) \[UPDATE\]
  - Pre-market contract: add new response fields `preOpenPrice`, `preQty`,
    `curPreListingPhase`
- New error codes related to pre-market perpetual trading
  - `110095`: You cannot create, modify or cancel Pre-Market Perpetual orders
    during the Call Auction.
  - `110096`: Pre-Market Perpetual Trading does not support Portfolio Margin
    mode.
  - `110097`: Non-UTA users cannot access Pre-Market Perpetual Trading. To
    place, modify or cancel Pre-Market Perpetual orders, please upgrade your
    Standard Account to UTA.
  - `110098`: Only Good-Till-Canceled (GTC) orders are supported during Call
    Auction.
  - `110099`: You cannot create TP/SL orders during the Call Auction for
    Pre-Market Perpetuals.
  - `110100`: You cannot place, modify, or cancel Pre-Market Perpetual orders
    when you are in Demo Trading.
  - `3777029`: You currently have orders for pre-market trading that can’t be
    bind UIDs
  - `3200419`: Unable to switch to Portfolio margin due to active pre-market
    Perpetual orders and positions

### Websocket API[​](#websocket-api-29 "Direct link to heading")

- [Tickers](/docs/v5/websocket/public/ticker) \[UPDATE\]
  - Pre-market contract: add new response fields `preOpenPrice`, `preQty`,
    `curPreListingPhase`

## 2024-06-20[​](#2024-06-20 "Direct link to heading")

### REST API[​](#rest-api-79 "Direct link to heading")

- [Place Order](/docs/v5/order/create-order) \[UPDATE\]
  - `marketUnit` field now supports orderFilter=tpslOrder, StopOrder when
    placing Spot market order (UTA)
- [Batch Place Order](/docs/v5/order/batch-place) \[UPDATE\]
  - `marketUnit` field now supports orderFilter=tpslOrder, StopOrder when
    placing Spot market order (UTA)

## 2024-06-18[​](#2024-06-18 "Direct link to heading")

### REST API[​](#rest-api-80 "Direct link to heading")

- [Set Disconnect Cancel All](/docs/v5/order/dcp) \[UPDATE\]
  - Add `product` request parameter, support `DERIVATIVES`, `SPOT` and `OPTIONS`
- [Get Account Info](/docs/v5/account/account-info) \[UPDATE\]
  - Deprecate the fields `dcpStatus`, `timeWindow`
- [Get DCP Info](/docs/v5/account/dcp-info) \[NEW\]
  - Add a new API used to query dcp config data

### Websocket API[​](#websocket-api-30 "Direct link to heading")

- [Dcp](/docs/v5/websocket/private/dcp) \[UPDATE\]
  - Deprecate the topic name `dcp`
  - Add new topic names `dcp.future`, `dcp.spot`, `dcp.option`

## 2024-06-14[​](#2024-06-14 "Direct link to heading")

### Websocket API[​](#websocket-api-31 "Direct link to heading")

- [Fast Execution](/docs/v5/websocket/private/fast-execution) \[UPDATE\]
  - `orderLinkId` will be also output for a maker trade, but the value will be
    `""` all the time.

## 2024-06-13[​](#2024-06-13 "Direct link to heading")

### REST API[​](#rest-api-81 "Direct link to heading")

- [Get Exchange Broker Earning](/docs/v5/broker/exchange-earning) \[UPDATE\]
  - Changed from support query for the past 6 months to query for the past 1
    month

## 2024-06-06[​](#2024-06-06 "Direct link to heading")

### REST API[​](#rest-api-82 "Direct link to heading")

- [Get Affiliate User Info](/docs/v5/affiliate/affiliate-info) \[UPDATE\]
  - Add a new response field `KycLevel`

### Websocket API[​](#websocket-api-32 "Direct link to heading")

- [Fast Execution](/docs/v5/websocket/private/fast-execution) \[NEW\]
  - Provide a lower latency execution event

## 2024-06-04[​](#2024-06-04 "Direct link to heading")

### REST API[​](#rest-api-83 "Direct link to heading")

- [Get Orderbook](/docs/v5/market/orderbook) \[UPDATE\]
  - A new response field `cts` added when category=spot, and it is matched with
    the "cts" from ws ob.200

## 2024-05-30[​](#2024-05-30 "Direct link to heading")

### REST API[​](#rest-api-84 "Direct link to heading")

- [Get Orderbook](/docs/v5/market/orderbook) \[UPDATE\]
  - A new response field `cts` added when category=linear & inverse, and it is
    matched with the "cts" from ws ob.500

## 2024-05-09[​](#2024-05-09 "Direct link to heading")

### REST API[​](#rest-api-85 "Direct link to heading")

- [Get Risk Limit](/docs/v5/market/risk-limit) \[UPDATE\]
  - When query category="linear", API returns 30 symbols data set each request,
    please add request parameter `cursor` paginate
  - Add new response parameter `nextPageCursor`
- [Withdraw](/docs/v5/asset/withdraw) \[UPDATE\]
  - Add request parameter `beneficiary`, `vaspEntityId`, `beneficiaryName`, they
    are only used for kyc=KOR (Korean users) to fill travel rule info
- [Get Exchange Entity List](/docs/v5/asset/withdraw/vasp-list) \[NEW\]
  - Add a new API for kyc=KOR users to query target exchange info when fill
    travel rule info
- [Create Internal Transfer](/docs/v5/asset/transfer/create-inter-transfer)
  \[UPDATE\]
  - Add new response field `status`. When you get "PENDING", please call query
    API to check the final status after a while
- [Create Universal Transfer](/docs/v5/asset/transfer/unitransfer) \[UPDATE\]
  - Add new response field `status`. When you get "PENDING", please call query
    API to check the final status after a while

## 2024-05-06[​](#2024-05-06 "Direct link to heading")

### Websocket API[​](#websocket-api-33 "Direct link to heading")

- [Websocket Trade Guideline](/docs/v5/websocket/trade/guideline#url) \[UPDATE\]
  - The websocket order entry feature is officially launched on 06/May/2024 8AM
    UTC.

## 2024-04-25[​](#2024-04-25 "Direct link to heading")

### REST API[​](#rest-api-86 "Direct link to heading")

- [Get Transaction Log (UTA)](/docs/v5/account/transaction-log) \[UPDATE\]
  - New transaction type value `ADL`
- [Get Transaction Log (Classic)](/docs/v5/account/contract-transaction-log)
  \[NEW\]
  - New endpoint for Classic account derivatives wallet, and Unified account
    inverse derivatives wallet
- [Get Insurance](/docs/v5/market/insurance) \[UPDATE\]
  - Add a new response field `symbols`

## 2024-04-23[​](#2024-04-23 "Direct link to heading")

### REST API[​](#rest-api-87 "Direct link to heading")

- [Get Internal Transfer Records](/docs/v5/asset/transfer/inter-transfer-list)
  \[UPDATE\]

  ```
  - When `startTime` & `endTime` are not passed together, API returns 30 days data by default
  ```

  [Get Universal Transfer List](/docs/v5/asset/transfer/unitransfer-list)
  \[UPDATE\]

  ```
  - When `startTime` & `endTime` are not passed together, API returns 30 days data by default
  ```

### Websocket API[​](#websocket-api-34 "Direct link to heading")

- [Websocket Trade Guideline](/docs/v5/websocket/trade/guideline#request-parameters-1)
  \[UPDATE\]
  - Request parameter of Create/Amend/Cancel is changed from `headers` to
    `header`

## 2024-04-15[​](#2024-04-15 "Direct link to heading")

### REST API[​](#rest-api-88 "Direct link to heading")

- [Demo Trading Service](/docs/v5/demo#request-demo-trading-funds) \[Demo
  trading\]
  - Request demo funds API update

## 2024-04-11[​](#2024-04-11 "Direct link to heading")

### REST API[​](#rest-api-89 "Direct link to heading")

- [Get Instruments Info](/docs/v5/market/instrument) \[Futures\]
  - Add response fields `minNotionalValue`

## 2024-04-03[​](#2024-04-03 "Direct link to heading")

### REST API[​](#rest-api-90 "Direct link to heading")

- [Get Sub Account Deposit Records](/docs/v5/broker/sub-deposit-record) \[NEW\]
  - Add a new endpoint for exchange broker user to query sub account deposit
    records
- [Demo trading supports Open API](/docs/v5/demo)

## 2024-04-01[​](#2024-04-01 "Direct link to heading")

### REST API[​](#rest-api-91 "Direct link to heading")

- [Get Sub UID List (Unlimited)](/docs/v5/user/page-subuid) \[NEW\]
  - Add a new API to get sub uid entry. This supports pagnation.
- [Get Sub UID List (Limited)](/docs/v5/user/subuid-list) \[UPDATE\]
  - Return up to 10k sub accounts

### Websocket API[​](#websocket-api-35 "Direct link to heading")

- [Websocket Trade Guideline](/docs/v5/websocket/trade/guideline#url) \[UPDATE\]
  - URL uses `wss` as prefix

## 2024-03-28[​](#2024-03-28 "Direct link to heading")

### Websocket API[​](#websocket-api-36 "Direct link to heading")

- [Websocket Trade Guideline](/docs/v5/websocket/trade/guideline#request-parameters-1)
  \[UPDATE\]
  - Create/Amend/Cancel request adds required header parameter
    `X-BAPI-TIMESTAMP`

## 2024-03-22[​](#2024-03-22 "Direct link to heading")

- [Integration Guidance](/docs/v5/guide#authentication) \[UPDATE\]
  - To obey the compliance rule, two new domains are added for Netherlands users
    and Hong Kong users repectively.
- [Create Internal Transfer](/docs/v5/asset/transfer/create-inter-transfer)
  \[UPDATE\]
  - API rate limit is increase from 20req/min to 60req/min

## 2024-03-21[​](#2024-03-21 "Direct link to heading")

- [Get Orderbook](/docs/v5/market/orderbook) \[UPDATE\]
  - linear & inverse supports up to limit=500
  - linear & inverse, field `u` is matched with the `u` in ws 500 level

## 2024-03-13[​](#2024-03-13 "Direct link to heading")

### REST API[​](#rest-api-92 "Direct link to heading")

- [Set Deposit Account](/docs/v5/asset/deposit/set-deposit-acct) \[UPDATE\]
  - `OPTION`(USDC Contract wallet) is no longer supported to set for classic
    account
- [Get Announcement](/docs/v5/announcement) \[UPDATE\]
  - Add a new response field `publishTime`

## 2024-03-12[​](#2024-03-12 "Direct link to heading")

### REST API[​](#rest-api-93 "Direct link to heading")

- [Set Risk Limit](/docs/v5/position/set-risk-limit) \[Deprecate\]
  - Since auto risk limit has been launched, it is meaningless to use this API

## 2024-03-11[​](#2024-03-11 "Direct link to heading")

### REST API[​](#rest-api-94 "Direct link to heading")

- [Get Order History](/docs/v5/order/order-list) \[UPDATE\]
  - UTA(spot, linear, option) can only query last 24 hours **full cancelled**
    orders records

## 2024-03-06[​](#2024-03-06 "Direct link to heading")

### REST API[​](#rest-api-95 "Direct link to heading")

- [Batch Place Order](/docs/v5/order/batch-place) \[UPDATE\]
  - Support Spot trading (UTA, UTA Pro)
- [Batch Amend Order](/docs/v5/order/batch-amend) \[UPDATE\]
  - Support Spot trading (UTA, UTA Pro)
- [Batch Cancel Order](/docs/v5/order/batch-cancel) \[UPDATE\]
  - Support Spot trading (UTA, UTA Pro)

## 2024-03-05[​](#2024-03-05 "Direct link to heading")

### REST API[​](#rest-api-96 "Direct link to heading")

- [Get Position Info](/docs/v5/position) \[UPDATE\]
  - Add new response field `sessionAvgPrice` for USDC contracts
  - Add new response field `curRealisedPnl` for Perps, Futures and Option
  - `cumRealisedPnl` is deprecated for Option
  - Add new response fields `delta`, `vega`, `theta`, `gamma` for Option

### Websocket API[​](#websocket-api-37 "Direct link to heading")

- [Position](/docs/v5/websocket/private/position) \[UPDATE\]
  - Add new response field `sessionAvgPrice` for USDC contracts
  - Add new response field `curRealisedPnl` for Perps, Futures and Option
  - `cumRealisedPnl` is deprecated for Option
  - Add new response fields `delta`, `vega`, `theta`, `gamma` for Option

## 2024-03-04[​](#2024-03-04 "Direct link to heading")

### REST API[​](#rest-api-97 "Direct link to heading")

- [Get Public Recent Trading History](/docs/v5/market/recent-trade)
  - Add new response fields for Option only. `mP`, `iP`, `mIv`, `iv`

### Websocket API[​](#websocket-api-38 "Direct link to heading")

- [Trade](/docs/v5/websocket/public/trade)
  - Add new stream fields for Option only. `mP`, `iP`, `mIv`, `iv`

## 2024-03-01[​](#2024-03-01 "Direct link to heading")

### REST API[​](#rest-api-98 "Direct link to heading")

- All C2C-Lending APIs are abandoned due to the merge between Lending and
  Flexible Savings
  - [Get Lending Coin Info](/docs/v5/abandon/coin-info)
  - [Deposit Funds](/docs/v5/abandon/deposit)
  - [Redeem Funds](/docs/v5/abandon/redeem)
  - [Cancel Redeem](/docs/v5/abandon/cancel-redeem)
  - [Get Order Records](/docs/v5/abandon/order-record)
  - [Get Lending Account Info](/docs/v5/abandon/account-info)

## 2024-02-29[​](#2024-02-29 "Direct link to heading")

### REST API[​](#rest-api-99 "Direct link to heading")

- [Get Borrow History](/docs/v5/account/borrow-history) \[UPDATE\]
  - `startTime` & `endTime` are restricted to 30 days time range
  - Support getting up to 2 years data
- [Get Delivery Record](/docs/v5/asset/delivery) \[UPDATE\]
  - Add query parameter `startTime` & `endTime`, and 30 days times range per
    request
  - Support getting up to 2 years data
- [Get USDC Session Settlement](/docs/v5/asset/settlement) \[UPDATE\]
  - Add query parameter `startTime` & `endTime`, and 30 days times range per
    request
  - Support getting up to 2 years data
- [Get Orderbook](/docs/v5/market/orderbook) \[UPDATE\]
  - Add a new response field `seq` for linear, inverse & spot

## 2024-02-28[​](#2024-02-28 "Direct link to heading")

### REST API[​](#rest-api-100 "Direct link to heading")

- [Get Withdrawal Records](/docs/v5/asset/withdraw/withdraw-record) \[UPDATE\]
  - New withdraw status enum value `MoreInformationRequired`

## 2024-02-21[​](#2024-02-21 "Direct link to heading")

### REST API[​](#rest-api-101 "Direct link to heading")

- [Get Instruments Info](/docs/v5/market/instrument) \[Futures\]
  - Add response fields `maxMktOrderQty`
  - `postOnlyMaxOrderQty` is useless, use `maxOrderQty` for Limit and PostOnly
    order

## 2024-02-06[​](#2024-02-06 "Direct link to heading")

### REST API[​](#rest-api-102 "Direct link to heading")

- [Get Instruments Info](/docs/v5/market/instrument) \[Futures\]
  - Add response fields `upperFundingRate` and `lowerFundingRate`

## 2024-02-05[​](#2024-02-05 "Direct link to heading")

### REST API[​](#rest-api-103 "Direct link to heading")

- [Get Order History](/docs/v5/order/order-list) \[UPDATE\]
  - UTA (linear,spot,option) does not support querying open status orders any
    more
  - Add a new error code: "181017", error message: "OrderStatus must be final
    status"

## 2024-01-18[​](#2024-01-18 "Direct link to heading")

### REST API[​](#rest-api-104 "Direct link to heading")

- [Get Instruments Info](/docs/v5/market/instrument) \[Spot\]
  - Add new response fields `riskParameters`, `limitParameter`,
    `marketParameter`

## 2024-01-16[​](#2024-01-16 "Direct link to heading")

### REST API[​](#rest-api-105 "Direct link to heading")

- [Get Withdrawal Records](/docs/v5/asset/withdraw/withdraw-record) \[UPDATE\]
  - Add a new request param `txID`
  - The withdrawal between Bybit account returns `txID`
- [Get Internal Deposit Records (off-chain)](/docs/v5/asset/deposit/internal-deposit-record)
  \[UPDATE\]
  - Add a new request param `txID`
  - Add a new response field `txID`

## 2024-01-15[​](#2024-01-15 "Direct link to heading")

### REST API[​](#rest-api-106 "Direct link to heading")

- [Place Order](/docs/v5/order/create-order) \[UPDATE\]
  - Spot(UTA) can use `takeProfit`, `stopLoss`, `tpLimitPrice`, `slLimitPrice`,
    `tpOrderType`, `slOrderType` to set Market TPSL or Limit TPSL when creating
    Spot limit order.
- [Amend Order](/docs/v5/order/amend-order) \[UPDATE\]
  - Spot(UTA) can amend `takeProfit`, `stopLoss`, `tpLimitPrice`, `slLimitPrice`
    if the original order has related attributes
- [Cancel All Orders](/docs/v5/order/cancel-all) \[UPDATE\]
  - Add new enums "OcoOrder", "BidirectionalTpslOrder" for `orderFilter`. You
    can only cancel all untriggered "BidirectionalTpslOrder"
- [Get Open Orders](/docs/v5/order/open-order) \[UPDATE\]
  - Add new enum "BidirectionalTpslOrder" for `orderFilter`
  - Add new enum "BidirectionalTpslOrder" for `stopOrderType`
- [Get Order History](/docs/v5/order/order-list) \[UPDATE\]
  - Add new enum "BidirectionalTpslOrder" for `orderFilter`
  - Add new enum "BidirectionalTpslOrder" for `stopOrderType`

### Websocket API[​](#websocket-api-39 "Direct link to heading")

- [Order](/docs/v5/websocket/private/order) \[UPDATE\]
  - Add new enum "BidirectionalTpslOrder" for `stopOrderType`

## 2024-01-11[​](#2024-01-11 "Direct link to heading")

### REST API[​](#rest-api-107 "Direct link to heading")

- [Get Transaction Log](/docs/v5/account/transaction-log) \[UPDATE\]
  - new type enums `FLEXIBLE_STAKING_SUBSCRIPTION`,
    `FLEXIBLE_STAKING_REDEMPTION`, `FIXED_STAKING_SUBSCRIPTION`

## 2024-01-09[​](#2024-01-09 "Direct link to heading")

### REST API[​](#rest-api-108 "Direct link to heading")

- [Batch Set Collateral Coin](/docs/v5/account/batch-set-collateral) \[NEW\]
  - Add a new endpoint to batch set collateral coin for Unified account

## 2024-01-08[​](#2024-01-08 "Direct link to heading")

### REST API[​](#rest-api-109 "Direct link to heading")

- [Get Trade History](/docs/v5/order/execution) \[UPDATE\]
  - Add a new response field `feeCurrency` for UTA Spot trading fee currency

## 2024-01-02[​](#2024-01-02 "Direct link to heading")

### REST API[​](#rest-api-110 "Direct link to heading")

- [Move Position](/docs/v5/position/move-position) \[NEW\]
  - Add a new endpoint to move your positions between the main-sub, sub-sub
    accounts
- [Get Move Position History](/docs/v5/position/move-position-history) \[NEW\]
  - Add a new endpoint to query move position history
- [Get Status And Leverage](/docs/v5/spot-margin-uta/status) \[UPDATE\]
  - Add a new response param `effectiveLeverage`.
- Add error codes for transfer endpoints:

| New error code | Description                                   |
| :------------- | :-------------------------------------------- |
| 131231         | Transfers into this account are not supported |
| 131232         | Transfers out this account are not supported  |

## 2023-12-28[​](#2023-12-28 "Direct link to heading")

### REST API[​](#rest-api-111 "Direct link to heading")

- [Get Loan Orders](/docs/v5/otc/loan-info) \[UPDATE\]
  - Add a new response param `deferredLiquidationLine`,
    `deferredLiquidationTime`
- [Get LTV](/docs/v5/otc/ltv-convert) \[UPDATE\]
  - Add a new response param `rst`.
- [Get Product Info](/docs/v5/otc/margin-product-info) \[UPDATE\]
  - Add a new response param `deferredLiquidationLine`,
    `deferredLiquidationTime`

## 2023-12-22[​](#2023-12-22 "Direct link to heading")

### REST API[​](#rest-api-112 "Direct link to heading")

- [Place Order](/docs/v5/order/create-order) \[UPDATE\]
  - Add a new request param `marketUnit`, the value are `baseCoin`, `quoteCoin`.
    It can be used to select `qty` unit for Spot market order (Unified account)
- [Get Open Orders](/docs/v5/order/open-order) \[UPDATE\]
  - Add a new response param `marketUnit`
- [Get Order History](/docs/v5/order/order-list) \[UPDATE\]
  - Add a new response param `marketUnit`

### Websocket API[​](#websocket-api-40 "Direct link to heading")

- [Order](/docs/v5/websocket/private/order) \[UPDATE\]
  - Add a new response param `marketUnit`

## 2023-12-20[​](#2023-12-20 "Direct link to heading")

### REST API[​](#rest-api-113 "Direct link to heading")

- [Get Account Info](/docs/v5/account/account-info) \[UPDATE\]
  - `smpGroup` is deprecated, please use
    [Get SMP Group ID](/docs/v5/account/smp-group)

## 2023-12-14[​](#2023-12-14 "Direct link to heading")

### Websocket API[​](#websocket-api-41 "Direct link to heading")

- [Orderbook](/docs/v5/websocket/public/orderbook) \[UPDATE\]
  - Add a new field `cts`

## 2023-12-12[​](#2023-12-12 "Direct link to heading")

### REST API[​](#rest-api-114 "Direct link to heading")

- [Get Order History](/docs/v5/order/order-list) \[UPDATE\]
  - Add a response field `createType`
- [Get Open Orders](/docs/v5/order/open-order) \[UPDATE\]
  - Add a response field `createType`
- [Get Trade History](/docs/v5/order/execution) \[UPDATE\]
  - Add a response field `createType`
- [Get SMP Group ID](/docs/v5/account/smp-group) \[NEW\]
  - Add a new endpoint to get smp group ID

### Websocket API[​](#websocket-api-42 "Direct link to heading")

- [Order](/docs/v5/websocket/private/order) \[UPDATE\]
  - Add a response field `createType`
- [Execution](/docs/v5/websocket/private/execution) \[UPDATE\]
  - Add a response field `createType`

## 2023-12-07[​](#2023-12-07 "Direct link to heading")

### REST API[​](#rest-api-115 "Direct link to heading")

- [Repay Liability](/docs/v5/account/repay-liability) \[NEW\]
  - Add a new endpoint to repay the liability of Unified Account

## 2023-12-04[​](#2023-12-04 "Direct link to heading")

### REST API[​](#rest-api-116 "Direct link to heading")

- [Get Broker Earning](/docs/v5/abandon/earning) \[deprecated\]
  - deprecated, replaced by
    [Get Exchange Broker Earning](/docs/v5/broker/exchange-earning)
- [Get Exchange Broker Earning](/docs/v5/broker/exchange-earning) \[NEW\]
  - Add a new endpoint to query exchange broker earning information
- [Get Exchange Broker Account Info](/docs/v5/broker/account-info) \[NEW\]
  - Add a new endpoint to query exchange broker main account information

## 2023-11-16[​](#2023-11-16 "Direct link to heading")

### REST API[​](#rest-api-117 "Direct link to heading")

- [Set Spot Hedging](/docs/v5/account/set-spot-hedge) \[NEW\]
  - Add a new endpoint to enable or disable Spot hedging function for Portfolio
    margin mode
- [Get Wallet Balance](/docs/v5/account/wallet-balance) \[UPDATE\]
  - Add a new response field `spotHedgingQty`
- [Get Account Info](/docs/v5/account/account-info) \[UPDATE\]
  - Add a new response field `spotHedgingStatus`

### Websocket API[​](#websocket-api-43 "Direct link to heading")

- [Wallet](/docs/v5/websocket/private/wallet) \[UPDATE\]
  - Add a new response field `spotHedgingQty`

## 2023-11-14[​](#2023-11-14 "Direct link to heading")

### REST API[​](#rest-api-118 "Direct link to heading")

- [Withdraw](/docs/v5/asset/withdraw) \[UPDATE\]
  - The rate limit is changed from 10 req/min to 1 req/s

## 2023-11-09[​](#2023-11-09 "Direct link to heading")

### REST API[​](#rest-api-119 "Direct link to heading")

- [Get Open Orders](/docs/v5/order/open-order) \[UPDATE\]
  - Classic account Spot can use `orderFilter`\="OcoOrder"
- [Get Order History](/docs/v5/order/order-list) \[UPDATE\]
  - Add the time range limitation for `startTime` and `endTime` request params
  - Classic account Spot can use `orderFilter`\="OcoOrder"
- [Get Trade History](/docs/v5/order/execution) \[UPDATE\]
  - Add the time range limitation for `startTime` and `endTime` request params
- [Get Closed PnL](/docs/v5/position/close-pnl) \[UPDATE\]
  - Add the time range limitation for `startTime` and `endTime` request params
  - Classic account data is sort by `updatedTime`
- [Get Transaction Log](/docs/v5/account/transaction-log) \[UPDATE\]
  - Add the time range limitation for `startTime` and `endTime` request params
- [Get Pre-upgrade Order History](/docs/v5/pre-upgrade/order-list) \[UPDATE\]
  - Add the time range limitation for `startTime` and `endTime` request params
- [Get Pre-upgrade Trade History](/docs/v5/pre-upgrade/execution) \[UPDATE\]
  - Add the time range limitation for `startTime` and `endTime` request params
- [Get Pre-upgrade Closed PnL](/docs/v5/pre-upgrade/close-pnl) \[UPDATE\]
  - Add the time range limitation for `startTime` and `endTime` request params
  - Classic account data is sort by `updatedTime`
- [Get Pre-upgrade Transaction Log](/docs/v5/pre-upgrade/transaction-log)
  \[UPDATE\]
  - Add the time range limitation for `startTime` and `endTime` request params
- [Get Sub Account All API Keys](/docs/v5/user/list-sub-apikeys) \[NEW\]
  - Add new endpoint for master account to query all api keys of a sub UID

## 2023-11-08[​](#2023-11-08 "Direct link to heading")

### REST API[​](#rest-api-120 "Direct link to heading")

- [Bind Or Unbind UID](/docs/v5/otc/bind-uid) \[NEW\]
  - Add a new endpoint to bind or unbind UID for OTC loan products

## 2023-11-02[​](#2023-11-02 "Direct link to heading")

### REST API[​](#rest-api-121 "Direct link to heading")

- [Amend Order](/docs/v5/order/amend-order) \[UPDATE\]
  - Add `tpslMode` in the request parameter
- [Batch Amend Order](/docs/v5/order/batch-amend) \[UPDATE\]
  - Add `tpslMode` in the request parameter
- [Get Borrow Quota (Spot)](/docs/v5/order/spot-borrow-quota) \[UPDATE\]
  - Add new response fields `spotMaxTradeQty`, `spotMaxTradeAmount`
- [Withdraw](/docs/v5/asset/withdraw) \[UPDATE\]
  - Add new enum value for `forceChain` parameter. You can withdraw between
    Bybit main accounts via inputting UID
- [Delete Sub UID](/docs/v5/user/rm-subuid) \[NEW\]
  - Add new endpoint to delete sub account

## 2023-11-01[​](#2023-11-01 "Direct link to heading")

### REST API[​](#rest-api-122 "Direct link to heading")

- [Amend Order](/docs/v5/order/amend-order) \[UPDATE\]
  - Spot supports amending order, category=`spot`

## 2023-10-26[​](#2023-10-26 "Direct link to heading")

### REST API[​](#rest-api-123 "Direct link to heading")

- [Get Trade History](/docs/v5/order/execution) \[UPDATE\]
  - UTA Spot: `stopOrderType`, `""` for normal order, `tpslOrder` for TP/SL
    order, `Stop` for conditional order, `OcoOrder` for OCO order
- [Get Open Orders](/docs/v5/order/open-order) \[UPDATE\]
  - UTA Spot: add new response field `ocoTriggerBy`, and the value can be
    `OcoTriggerByUnknown`, `OcoTriggerByTp`, `OcoTriggerBySl`
- [Get Order History](/docs/v5/order/order-list) \[UPDATE\]
  - UTA Spot: add new response field `ocoTriggerBy`, and the value can be
    `OcoTriggerByUnknown`, `OcoTriggerByTp`, `OcoTriggerBySl`

### Websocket API[​](#websocket-api-44 "Direct link to heading")

- [Order](/docs/v5/websocket/private/order) \[UPDATE\]
  - UTA Spot: add new response field `ocoTriggerBy`, and the value can be
    `OcoTriggerByUnknown`, `OcoTriggerByTp`, `OcoTriggerBySl`

## 2023-10-25[​](#2023-10-25 "Direct link to heading")

### REST API[​](#rest-api-124 "Direct link to heading")

- [Get Position Info](/docs/v5/position) \[UPDATE\]
  - Add response field `isReduceOnly`, `mmrSysUpdatedTime`,
    `leverageSysUpdatedTime`
- [Confirm New Risk Limit](/docs/v5/position/confirm-mmr) \[NEW\]
  - Add a new endpoint

### Websocket API[​](#websocket-api-45 "Direct link to heading")

- [Position](/docs/v5/websocket/private/position) \[UPDATE\]
  - Add response field `isReduceOnly`, `mmrSysUpdatedTime`,
    `leverageSysUpdatedTime`

## 2023-10-17[​](#2023-10-17 "Direct link to heading")

### REST API[​](#rest-api-125 "Direct link to heading")

- [Get API Key Information](/docs/v5/user/apikey-info) \[UPDATE\]
  - Add a new response field `kycLevel`, `kycRegion`
- [Get Borrow History](/docs/v5/account/borrow-history) \[UPDATE\]
  - Add new response fields `borrowAmount`, `unrealisedLoss`,
    `freeBorrowedAmount`

## 2023-10-09[​](#2023-10-09 "Direct link to heading")

### Websocket API[​](#websocket-api-46 "Direct link to heading")

- [Orderbook](/docs/v5/websocket/public/orderbook) \[Spot\]
  - Add a new level 200 data with frequency 200ms

## 2023-09-28[​](#2023-09-28 "Direct link to heading")

### REST API[​](#rest-api-126 "Direct link to heading")

- [Get Long Short Ratio](/docs/v5/market/long-short-ratio) \[NEW\]
  - Add a new endpoint to query long short ratio market data

## 2023-09-25[​](#2023-09-25 "Direct link to heading")

### REST API[​](#rest-api-127 "Direct link to heading")

- [Get Open Orders](/docs/v5/order/open-order) \[UPDATE\]
  - `stopOrderType` has new enumeration value: `OcoOrder`, used to indicate the
    Spot OCO Order (Unified Trading Account)
- [Get Order History](/docs/v5/order/order-list) \[UPDATE\]
  - `stopOrderType` has new enumeration value: `OcoOrder`, used to indicate the
    Spot OCO Order (Unified Trading Account)
- [Get Trade History](/docs/v5/order/execution) \[UPDATE\]
  - `execType` has new enumeration value: `MovePosition`, used to indicate the
    position movement execution (Unified Trading Account)
- [Get Transaction Log](/docs/v5/account/transaction-log) \[UPDATE\]
  - `type` has new enumeration values: `TRANSFER_IN_INS_LOAN`,
    `TRANSFER_OUT_INS_LOAN` (Unified Trading Account)
- [Get Transaction Log](/docs/v5/account/transaction-log) \[UPDATE\]
  - `type` has new enumeration values: `SPOT_REPAYMENT_SELL`,
    `SPOT_REPAYMENT_BUY` (Unified Trading Account)

### Websocket API[​](#websocket-api-47 "Direct link to heading")

- [Order](/docs/v5/websocket/private/order) \[UPDATE\]
  - `stopOrderType` has new enumeration value: `OcoOrder`, used to indicate the
    Spot OCO Order (Unified Trading Account)

## 2023-09-21[​](#2023-09-21 "Direct link to heading")

### REST API[​](#rest-api-128 "Direct link to heading")

- [Get Trade History](/docs/v5/order/execution) \[UPDATE\]
  - Add response field `seq`
- [Get Position Info](/docs/v5/position) \[UPDATE\]
  - Add response field `seq`
- [Get Collateral Info](/docs/v5/account/collateral-info) \[UPDATE\]
  - Added "freeBorrowAmount" field: This field represents the amount of
    borrowing within your total borrowing amount that is exempt from interest
    charges
  - deprecated "freeBorrowingAmount" field: The value of this field has been
    migrated to "freeBorrowingLimit", and it keeps empty string.
  - Added "freeBorrowingLimit" field: This field indicates the maximum limit for
    interest-free borrowing. If the unrealized loss portion exceeds this limit,
    all borrowings will be subject to interest.

### WebSocket API[​](#websocket-api-48 "Direct link to heading")

- [Position](/docs/v5/websocket/private/position) \[UPDATE\]
  - Add response field `seq`
  - Can subscribe specific category position
- [Execution](/docs/v5/websocket/private/execution) \[UPDATE\]
  - Add response field `seq`
  - Can subscribe specific category position
- [Order](/docs/v5/websocket/private/order) \[UPDATE\]
  - Can subscribe specific category position

## 2023-09-18[​](#2023-09-18 "Direct link to heading")

### REST API[​](#rest-api-129 "Direct link to heading")

- [Create Sub UID API Key](/docs/v5/user/create-subuid-apikey) \[UPDATE\]
  - Request parameter `ips` is actually string type. array can be used, but
    string is more explicit
  - Request parameter `Derivatives` has been deprecated due to auto
    identification by system
- [Modify Master API Key](/docs/v5/user/modify-master-apikey) \[UPDATE\]
  - Request parameter `ips` is actually string type. array can be used, but
    string is more explicit
  - Request parameter `Derivatives` has been deprecated due to auto
    identification by system
- [Modify Sub API Key](/docs/v5/user/modify-sub-apikey) \[UPDATE\]
  - Add a new request param `apikey`, which can be used for Master account to
    manage sub account api key
  - Request parameter `ips` is actually string type. array can be used, but
    string is more explicit
  - Request parameter `Derivatives` has been deprecated due to auto
    identification by system
- [Delete Sub API Key](/docs/v5/user/rm-sub-apikey) \[UPDATE\]
  - Add a new request param `apikey`, which can be used for Master account to
    delete sub account api key

## 2023-09-14[​](#2023-09-14 "Direct link to heading")

### REST API[​](#rest-api-130 "Direct link to heading")

- [Get Product Info](/docs/v5/otc/margin-product-info) \[UPDATE\]
  - Add a new response field `spotMarginTrading`
  - You can use api key and secret to call this endpoint to get your private
    data if you are eligible.
- [Get Margin Coin Info](/docs/v5/otc/margin-coin-convert-info) \[UPDATE\]
  - You can use api key and secret to call this endpoint to get your private
    data if you are eligible.
- [Get Loan Orders](/docs/v5/otc/loan-info) \[UPDATE\]
  - Add a new response field `spotMarginTrading`
  - The meaning of `parentUid` is changed. After the change, it represents the
    uid that bound with OTC loan product
- [Get LTV](/docs/v5/otc/ltv-convert) \[NEW\]
  - The meaning of `parentUid` is changed. After the change, it represents the
    uid that bound with OTC loan product

## 2023-09-07[​](#2023-09-07 "Direct link to heading")

### REST API[​](#rest-api-131 "Direct link to heading")

- [Get Open Orders](/docs/v5/order/open-order) \[UPDATE\]
  - By `/v5/order/realtime?category=inverse`, you can get all inverse contracts
    opening orders
- [Get Position Info](/docs/v5/position) \[UPDATE\]
  - By `/v5/position/list?category=inverse`, you can get all inverse contracts
    holding positions
  - `symbol` supports multiple values for category=inverse

## 2023-09-04[​](#2023-09-04 "Direct link to heading")

### REST API[​](#rest-api-132 "Direct link to heading")

- [Batch Place Order](/docs/v5/order/batch-place) \[UPDATE\]
  - UTA Pro: support USDT perp, USDC perp & USDC Futures batch place orders
- [Batch Amend Order](/docs/v5/order/batch-amend) \[UPDATE\]
  - UTA Pro: support USDT perp, USDC perp & USDC Futures batch amend orders
- [Batch Cancel Order](/docs/v5/order/batch-cancel) \[UPDATE\]
  - UTA Pro: support USDT perp, USDC perp & USDC Futures batch cancel orders

## 2023-08-31[​](#2023-08-31 "Direct link to heading")

### REST API[​](#rest-api-133 "Direct link to heading")

- [Cancel All Orders](/docs/v5/order/cancel-all) \[UPDATE\]
  - add new request params `stopOrderType`
  - enumerations `Order` and `StopOrder` for **orderFilter** support linear and
    inverse product types
- [Get Deposit Records (on chain)](/docs/v5/asset/deposit/deposit-record)
  \[UPDATE\]
  - Add a new response field `depositType`. You can process deposit assets when
    the deposit has daily deposit limit or abnormal deposit issue.
- [Get Sub Deposit Records (on chain)](/docs/v5/asset/deposit/sub-deposit-record)
  \[UPDATE\]
  - Add a new response field `depositType`. You can process deposit assets when
    the deposit has daily deposit limit or abnormal deposit issue.

## 2023-08-30[​](#2023-08-30 "Direct link to heading")

### REST API[​](#rest-api-134 "Direct link to heading")

- [Get API Key Information](/docs/v5/user/apikey-info) \[UPDATE\]
  - Add a new response field `parentUid`

## 2023-08-25[​](#2023-08-25 "Direct link to heading")

### REST API[​](#rest-api-135 "Direct link to heading")

- [Enable Universal Transfer for Sub UID](/docs/v5/abandon/enable-unitransfer-subuid)
  \[Deprecate\]
  - Deprecate this endpoint due to business logic is updated

## 2023-08-24[​](#2023-08-24 "Direct link to heading")

### REST API[​](#rest-api-136 "Direct link to heading")

- [Get VIP Margin Data](/docs/v5/spot-margin-uta/vip-margin) \[NEW\]
  - Add new endpoint used to query margin data for different VIP levels (Unified
    Account)
- [Toggle Margin Trade](/docs/v5/spot-margin-uta/switch-mode) \[UPDATE\]
  - Adjust error code

| Old error code | New error code | Msg                                                                                                                                             |
| :------------- | :------------- | :---------------------------------------------------------------------------------------------------------------------------------------------- |
| ~110075~       | 182021         | Cannot enable spot margin while in isolated margin mode. Please switch to cross margin mode or portfolio margin mode to trade spot with margin. |

## 2023-08-22[​](#2023-08-22 "Direct link to heading")

### REST API[​](#rest-api-137 "Direct link to heading")

- [Get Transaction Log](/docs/v5/account/transaction-log) \[UPDATE\]
  - Add a new response field `id`, which is a unique id for each transaction log
- [Get Status And Leverage](/docs/v5/spot-margin-uta/status) \[NEW\]
  - Add a new endpoint to query margin trade status and leverage of Unified
    account

## 2023-08-17[​](#2023-08-17 "Direct link to heading")

### REST API[​](#rest-api-138 "Direct link to heading")

- [Get Deposit Records (on chain)](/docs/v5/asset/deposit/deposit-record)
  \[UPDATE\]
  - Add a new response field `batchReleaseLimit`, which means the daily deposit
    limit amount
- [Get Sub Deposit Records (on chain)](/docs/v5/asset/deposit/sub-deposit-record)
  \[UPDATE\]
  - Add a new response field `batchReleaseLimit`, which means the daily deposit
    limit amount
- [Get Master Deposit Address](/docs/v5/asset/deposit/master-deposit-addr)
  \[UPDATE\]
  - Add a new response field `batchReleaseLimit`, which means the daily deposit
    limit amount
- [Get Sub Deposit Address](/docs/v5/asset/deposit/sub-deposit-addr) \[UPDATE\]
  - Add a new response field `batchReleaseLimit`, which means the daily deposit
    limit amount

## 2023-08-11[​](#2023-08-11 "Direct link to heading")

### REST API[​](#rest-api-139 "Direct link to heading")

- [Get Wallet Balance](/docs/v5/account/wallet-balance) \[UPDATE\]
  - `availableToBorrow` always returns `""` because main-sub uids share borrow
    quota
- [Get Collateral Info](/docs/v5/account/collateral-info) \[UPDATE\]
  - Add new response field `borrowUsageRate`
  - `availableToBorrow` is a shared value across main-sub uids

### Websocket API[​](#websocket-api-49 "Direct link to heading")

- [Wallet](/docs/v5/websocket/private/wallet) \[UPDATE\]
  - `availableToBorrow` always returns `""` because main-sub uids share borrow
    quota

## 2023-08-10[​](#2023-08-10 "Direct link to heading")

### REST API[​](#rest-api-140 "Direct link to heading")

- [Set Collateral Coin](/docs/v5/account/set-collateral) \[NEW\]
  - Add a new endpoint to set collateral coin in the Unified account
- [Get Account Info](/docs/v5/account/account-info) \[UPDATE\]
  - Add a new response field `isMasterTrader` to indicate if the account is
    master trader (copytrading)

## 2023-08-08[​](#2023-08-08 "Direct link to heading")

### REST API[​](#rest-api-141 "Direct link to heading")

- [Upgrade to Unified Account](/docs/v5/account/upgrade-unified-account)
  \[UPDATE\]
  - Supports account upgraded to UTA Pro
- [Get Account Info](/docs/v5/account/account-info) \[UPDATE\]
  - "unifiedMarginStatus" has a new enum `4` to indicate UTA Pro

## 2023-08-07[​](#2023-08-07 "Direct link to heading")

### REST API[​](#rest-api-142 "Direct link to heading")

- [Place Order](/docs/v5/order/create-order) \[UPDATE\]
  - Spot supports conditional order, orderFilter adds a new enum value
    `StopOrder`
- [Cancel Order](/docs/v5/order/cancel-order) \[UPDATE\]
  - Spot supports conditional order, orderFilter adds a new enum value
    `StopOrder`
- [Cancel All Orders](/docs/v5/order/cancel-all) \[UPDATE\]
  - Spot supports conditional order, orderFilter adds a new enum value
    `StopOrder`
- [Get Open Orders](/docs/v5/order/open-order) \[UPDATE\]
  - Spot supports conditional order, orderFilter adds a new enum value
    `StopOrder`, stopOrderType reuses `Stop` for Futures and Spot conditional
    order
- [Get Order History](/docs/v5/order/order-list) \[UPDATE\]
  - Spot supports conditional order, orderFilter adds a new enum value
    `StopOrder`, stopOrderType reuses `Stop` for Futures and Spot conditional
    order

### Websocket API[​](#websocket-api-50 "Direct link to heading")

- [Order](/docs/v5/websocket/private/order) \[UPDATE\]
  - stopOrderType reuses `Stop` for Futures and Spot conditional order
  - Add new field `feeCurrency`, which is used to identify Spot trading fee
    asset
  - `updatedTime` has value for classic account Spot trading

## 2023-07-31[​](#2023-07-31 "Direct link to heading")

### REST API[​](#rest-api-143 "Direct link to heading")

- [Get Position Info](/docs/v5/position)
  - Adjust `liqPrice` value logic. It only has value when
    [minPrice](/docs/v5/market/instrument) < liqPrice <
    [maxPrice](/docs/v5/market/instrument), otherwise it is always `""`
- [Get Collateral Info](/docs/v5/account/collateral-info)
  - Add new response field `collateralSwitch`
- [Get Wallet Balance](/docs/v5/account/wallet-balance)
  - Add new response field `collateralSwitch`

### WebSocket API[​](#websocket-api-51 "Direct link to heading")

- [Position](/docs/v5/websocket/private/position)
  - Adjust `liqPrice` value logic. It only has value when
    [minPrice](/docs/v5/market/instrument) < liqPrice <
    [maxPrice](/docs/v5/market/instrument), otherwise it is always `""`
- [Wallet](/docs/v5/websocket/private/wallet)
  - Add new response field `collateralSwitch`

## 2023-07-24[​](#2023-07-24 "Direct link to heading")

### REST API[​](#rest-api-144 "Direct link to heading")

- [Get Product Info](/docs/v5/otc/margin-product-info)
  - Add new Response fields: `USDTPerpetualOpenLine``USDCContractOpenLine`,
    `USDCOptionsOpenLine`, `USDTPerpetualCloseLine`, `USDCContractCloseLine`,
    `USDCOptionsCloseLine`, `USDCContractSymbols`, `USDCOptionsSymbols`,
    `marginLeverage`, `USDTPerpetualLeverage`, `symbol`, `leverage`,
    `USDCContractLeverage`
- [Get Loan Orders](/docs/v5/otc/loan-info)
  - Add new Response fields: `USDTPerpetualOpenLine`, `USDCContractOpenLine`,
    `USDCOptionsOpenLine`, `USDTPerpetualCloseLine`, `USDCContractCloseLine`,
    `USDCOptionsCloseLine`, `USDCContractSymbols`, `USDCOptionsSymbols`,
    `marginLeverage`, `USDTPerpetualLeverage`, `symbol`, `leverage`,
    `USDCContractLeverage`
- [Get Single Coin Balance](/docs/v5/asset/balance/account-coin-balance)
  - Add new request param: `toAccountType`, `toMemberId`,
    `withLtvTransferSafeAmount`
  - Add new response field: `ltvTransferSafeAmount`
- Add error codes for UTA with OTC loan when trade Spot, Futures and Option

| New error code | Description                                                                                   |
| :------------- | :-------------------------------------------------------------------------------------------- |
| 30133          | USDT Perp: When the trading pair is not in the whitelist                                      |
| 30134          | USDC Contract: When the trading pair is not in the whitelist                                  |
| 30135          | USDT Perp: When you try to change a leverage higher than the maximum leverage in OTC loan     |
| 30136          | USDC Contract: When you try to change a leverage higher than the maximum leverage in OTC loan |
| 3200316        | Option: restrict to trade                                                                     |
| 3200317        | Option: restrict to buy                                                                       |
| 170709         | Spot: When the trading pair is not in the whitelist                                           |
| 170215         | Spot: restrict to buy                                                                         |
| 170216         | Spot: margin leverage exceeded                                                                |
| 170220         | Spot: restrict to trade                                                                       |

## 2023-07-13[​](#2023-07-13 "Direct link to heading")

### REST API[​](#rest-api-145 "Direct link to heading")

- [Get Sub UID List](/docs/v5/user/subuid-list)
  - Add a new response field `accountMode` to distinguish the account mode
- [Get Kline](/docs/v5/market/kline)
  - Increase max limit from 200 to 1000
- [Get Mark Price Kline](/docs/v5/market/mark-kline)
  - Increase max limit from 200 to 1000
- [Get Index Price Kline](/docs/v5/market/index-kline)
  - Increase max limit from 200 to 1000
- [Get Premium Index Price Kline](/docs/v5/market/premium-index-kline)
  - Increase max limit from 200 to 1000

## 2023-07-04[​](#2023-07-04 "Direct link to heading")

### REST API[​](#rest-api-146 "Direct link to heading")

- [Get Bybit Sever Time](/docs/v5/market/time)
  - Add a new API to get server time
- [Set Disconnect Cancel All](/docs/v5/order/dcp) \[Option\]
  - Expand configurable disconnection window time from \[10, 300\] to \[3, 300\]
    seconds

## 2023-06-26[​](#2023-06-26 "Direct link to heading")

### WebSocket API[​](#websocket-api-52 "Direct link to heading")

- [Orderbook](/docs/v5/websocket/public/orderbook) \[Spot\]
  - Improve the push frequency from 100ms to 20ms of level 50

## 2023-06-24[​](#2023-06-24 "Direct link to heading")

### REST API[​](#rest-api-147 "Direct link to heading")

- [Get Instruments Info](/docs/v5/market/instrument) \[UPDATE\]
  - When category=linear, add a new response params `copyTrading` to indicate
    this trading pair supporting copy trade or not for UTA and normal account

## 2023-06-15[​](#2023-06-15 "Direct link to heading")

### REST API[​](#rest-api-148 "Direct link to heading")

- [Get Pre-upgrade Transaction Log](/docs/v5/pre-upgrade/transaction-log)
  \[NEW\]
  - A brand new endpoint to for Unified account to query pre-upgrade USDC
    Derivatives transaction logs
- [Get Pre-upgrade Delivery Record](/docs/v5/pre-upgrade/delivery) \[NEW\]
  - A brand new endpoint to for Unified account to query pre-upgrade Option
    delivery records
- [Get Pre-upgrade USDC Session Settlement](/docs/v5/pre-upgrade/settlement)
  \[NEW\]
  - A brand new endpoint to for Unified account to query pre-upgrade USDC
    Perpetual session settlement
- [Create Sub UID](/docs/v5/user/create-subuid) \[UPDATE\]
  - Support to create a UTA sub account
- [Modify Master API Key](/docs/v5/user/modify-master-apikey) \[UPDATE\]
  - "permissions" becomes non-mandatory param
- [Modify Sub API Key](/docs/v5/user/modify-sub-apikey) \[UPDATE\]
  - "permissions" becomes non-mandatory param
- [Get UID Wallet Type](/docs/v5/user/wallet-type) \[NEW\]
  - A brand new endpoint to check the wallet types supported

## 2023-06-14[​](#2023-06-14 "Direct link to heading")

### REST API[​](#rest-api-149 "Direct link to heading")

- [Get Broker Earning](/docs/v5/abandon/earning) \[NEW\]
  - A brand new endpoint for exchange broker to get the earnings.

## 2023-06-08[​](#2023-06-08 "Direct link to heading")

### REST API[​](#rest-api-150 "Direct link to heading")

- [Get Fee Rate](/docs/v5/account/fee-rate) \[UPDATE\]
  - Support to get USDC perp & USDC futures trading fee rate

## 2023-06-07[​](#2023-06-07 "Direct link to heading")

### REST API[​](#rest-api-151 "Direct link to heading")

- [Withdraw](/docs/v5/asset/withdraw) \[UPDATE\]
  - Add new request param `feeType`, which is used to select the withdrawal fee
    operation type when withdraw

## 2023-06-02[​](#2023-06-02 "Direct link to heading")

### REST API[​](#rest-api-152 "Direct link to heading")

- [Get Affiliate User Info](/docs/v5/affiliate/affiliate-info) \[New\]
  - A brand new endpoint, which is used for affiliate to check the basic
    information of their users

## 2023-06-01[​](#2023-06-01 "Direct link to heading")

### REST API[​](#rest-api-153 "Direct link to heading")

- [Set Margin Mode](/docs/v5/account/set-margin-mode) \[UPDATE\]
  - UTA account supports isolated margin, a new enum `ISOLATED_MARGIN` for
    request param "setMarginMode"
- [Switch Position Mode](/docs/v5/position/position-mode) \[UPDATE\]
  - UTA account supports Hedge mode for USDT Perp when it is isolated margin or
    cross margin mode
- [Get Position Info](/docs/v5/position) \[UPDATE\]
  - Add new response field `positionBalance`
- [Get Account Info](/docs/v5/account/account-info) \[UPDATE\]
  - "marginTrade" field has a new enum value - `ISOLATED_MARGIN`
- [Set Auto Add Margin](/docs/v5/position/auto-add-margin) \[UPDATE\]
  - add category enum `linear` for UTA
- [Add Or Reduce Margin](/docs/v5/position/manual-add-margin) \[UPDATE\]
  - A brand new endpoint is used to add or reduce specific margin you want

### WebSocket API[​](#websocket-api-53 "Direct link to heading")

- [Position](/docs/v5/websocket/private/position) \[UPDATE\]
  - Add new response param `positionBalance`

## 2023-05-30[​](#2023-05-30 "Direct link to heading")

### REST API[​](#rest-api-154 "Direct link to heading")

- [Get Instruments Info](/docs/v5/market/instrument) \[UPDATE\]
  - When category=spot, add a new response params `marginTrading` to indicate
    this trading pair supporting margin trade or not for UTA and normal account

## 2023-05-23[​](#2023-05-23 "Direct link to heading")

### REST API[​](#rest-api-155 "Direct link to heading")

- [Place Order](/docs/v5/order/create-order) \[UPDATE\]
  - Add new request params for new TP/SL `tpslMode`, `tpLimitPrice`,
    `slLimitPrice`, `tpOrderType`, `slOrderType`
- [Amend Order](/docs/v5/order/amend-order) \[UPDATE\]
  - Add new request params for new TP/SL `tpLimitPrice`, `slLimitPrice`
- [Get Open Orders](/docs/v5/order/open-order) \[UPDATE\]
  - Add new response params for new TP/SL `tpslMode`, `tpLimitPrice`,
    `slLimitPrice`
- [Get Order History](/docs/v5/order/order-list) \[UPDATE\]
  - Add new response params for new TP/SL `tpslMode`, `tpLimitPrice`,
    `slLimitPrice`
- [Get Position Info](/docs/v5/position) \[UPDATE\]
  - `tpslMode` in the position is deprecated
- [Set Trading Stop](/docs/v5/position/trading-stop) \[UPDATE\]
  - Add new request params for new TP/SL `tpslMode`, `tpLimitPrice`,
    `slLimitPrice`, `tpOrderType`, `slOrderType`

### WebSocket API[​](#websocket-api-54 "Direct link to heading")

- [Position](/docs/v5/websocket/private/position) \[UPDATE\]
  - `tpslMode` in the position is deprecated
- [Order](/docs/v5/websocket/private/order) \[UPDATE\]
  - Add new response params for new TP/SL `tpslMode`, `tpLimitPrice`,
    `slLimitPrice`

## 2023-05-10[​](#2023-05-10 "Direct link to heading")

### REST API[​](#rest-api-156 "Direct link to heading")

- [Set Risk Limit](/docs/v5/position/set-risk-limit) \[UPDATE\]
  - Adjust the error code

| Old error code | New error code | Msg                    |
| :------------- | :------------- | :--------------------- |
| ~10001~        | 110075         | RiskId is not modified |

## 2023-05-05[​](#2023-05-05 "Direct link to heading")

### REST API[​](#rest-api-157 "Direct link to heading")

- [Get Margin Coin Info With Conversion Rate](/docs/v5/otc/margin-coin-convert-info)
  \[NEW\]
  - add new endpoint to query Margin Coin Info With Conversion Rate
- [Get LTV with Ladder Conversion Rate](/docs/v5/otc/ltv-convert) \[NEW\]
  - add new endpoint to query LTV With Conversion Rate

## 2023-05-04[​](#2023-05-04 "Direct link to heading")

### REST API[​](#rest-api-158 "Direct link to heading")

- [Get Trade History](/docs/v5/order/execution) \[UPDATE\]
  - `symbol` is no longer mandatory for normal account when get derivatives
- [Get Closed PnL](/docs/v5/position/close-pnl) \[UPDATE\]
  - `symbol` is no longer mandatory for normal account when get derivatives

## 2023-04-20[​](#2023-04-20 "Direct link to heading")

### REST API[​](#rest-api-159 "Direct link to heading")

- [Place Order](/docs/v5/order/create-order) \[UPDATE\]
  - add new request param `smpType` used to select SMP execution type
- [Get Open Orders](/docs/v5/order/open-order) \[UPDATE\]
  - add new response fields `smpType`, `smpOrderId`, `smpGroup`
  - add new enum `cancelBySmp` of `cancelType`
- [Get Order History](/docs/v5/order/order-list) \[UPDATE\]
  - add new response fields `smpType`, `smpOrderId`, `smpGroup`
  - add new enum `cancelBySmp` of `cancelType`
- [Get Account Info](/docs/v5/account/account-info) \[UPDATE\]
  - add new response fields `dcpStatus`, `timeWindow`, `smpGroup`

### WebSocket API[​](#websocket-api-55 "Direct link to heading")

- [Order](/docs/v5/websocket/private/order) \[UPDATE\]
  - add new response fields `smpType`, `smpOrderId`, `smpGroup`
  - add new enum `cancelBySmp` of `cancelType`

## 2023-04-06[​](#2023-04-06 "Direct link to heading")

### REST API[​](#rest-api-160 "Direct link to heading")

- [Get Instruments Info](/docs/v5/market/instrument) \[UPDATE\]
  - add request param `status` to filter symbol status

## 2023-04-04[​](#2023-04-04 "Direct link to heading")

### REST API[​](#rest-api-161 "Direct link to heading")

- [Get Instruments Info](/docs/v5/order/order-list) \[UPDATE\]
  - add request param `startTime` `endTime`, effective for UTA mode
  - add response param `placeType`, used for option

## 2023-04-04[​](#2023-04-04-1 "Direct link to heading")

### REST API[​](#rest-api-162 "Direct link to heading")

- [Get Order History](/docs/v5/order/order-list) \[UPDATE\]
  - add request param `startTime` `endTime`, effective for UTA mode
  - add response param `placeType`, used for option
- [Get Trade History](/docs/v5/order/execution) \[UPDATE\]
  - add response param `closedSize`
- [Get Position Info](/docs/v5/position) \[UPDATE\]
  - add response param `adlRankIndicator`

### WebSocket API[​](#websocket-api-56 "Direct link to heading")

- [Position](/docs/v5/websocket/private/position) \[UPDATE\]
  - add response param `adlRankIndicator`
  - `category` field is added to UTA stream
- [Order](/docs/v5/websocket/private/order) \[UPDATE\]
  - add response param `placeType`, used for option
- [Execution](/docs/v5/websocket/private/execution) \[UPDATE\]
  - add response param `closedSize`

## 2023-03-24[​](#2023-03-24 "Direct link to heading")

### REST API[​](#rest-api-163 "Direct link to heading")

- [Get Fee Rate](/docs/v5/account/fee-rate) \[UPDATE\]
  - Support to get Spot fee rate

## 2023-03-23[​](#2023-03-23 "Direct link to heading")

### REST API[​](#rest-api-164 "Direct link to heading")

- [Get Wallet Balance](/docs/v5/account/wallet-balance) \[UPDATE\]
  - Add a new response field `accountLTV`
- [Create Sub UID API Key](/docs/v5/user/create-subuid-apikey) \[UPDATE\]
  - Add a new permission value `SubMemberTransferList` for Sub account Wallet
- [Create Universal Transfer](/docs/v5/asset/transfer/unitransfer) \[UPDATE\]
  - Support to use Sub acct api key to request
- [Get Universal Transfer List](/docs/v5/asset/transfer/unitransfer-list)
  \[UPDATE\]
  - Support to use Sub acct api key to request

### WebSocket API[​](#websocket-api-57 "Direct link to heading")

- [Wallet](/docs/v5/websocket/private/wallet) \[UPDATE\]
  - Add a new response field `accountLTV`

## 2023-03-22[​](#2023-03-22 "Direct link to heading")

### REST API[​](#rest-api-165 "Direct link to heading")

- [Get Announcement](/docs/v5/announcement) \[NEW\]
  - A brand new API to get Bybit announcements

## 2023-03-15[​](#2023-03-15 "Direct link to heading")

### REST API[​](#rest-api-166 "Direct link to heading")

- [Get Single Coin Balance](/docs/v5/asset/balance/account-coin-balance)
  \[UPDATE\]
  - Add a new request param `withTransferSafeAmount` and a new response field
    `transferSafeAmount`

## 2023-03-10[​](#2023-03-10 "Direct link to heading")

### REST API[​](#rest-api-167 "Direct link to heading")

- [Get Instruments Info](/docs/v5/market/instrument) \[UPDATE\]
  - Unify the enums of `status` for Spot, Derivatives and Options. Use
    `Trading`, `Closed`, `Settling`, `PreLaunch`, `Deliverying`
  - Remove duplicate `category` field in the Options response
- [Get Fee Rate](/docs/v5/account/fee-rate) \[UPDATE\]
  - Support to get Options trading fee rate

## 2023-03-09[​](#2023-03-09 "Direct link to heading")

### REST API[​](#rest-api-168 "Direct link to heading")

- [Set Leverage](/docs/v5/spot-margin-uta/set-leverage) \[UPDATE\]
  - UTA user can set up to 10X for margin trade
- [Get Wallet Balance](/docs/v5/account/wallet-balance) \[UPDATE\]
  - Before adjustment: normal account gets error code and message when call
    accountType=UNIFIED.  
    After adjustment: normal account gets **http code 400** when call
    accountType=UNIFIED

## 2023-02-28[​](#2023-02-28 "Direct link to heading")

### REST API[​](#rest-api-169 "Direct link to heading")

- [IP Rate Limit](/docs/v5/rate-limit#ip-rate-limit) \[UPDATE\]
  - Due to the switch to CloudFront, the IP limit rules have been adjusted
    appropriately
- [Get Wallet Balance](/docs/v5/account/wallet-balance) \[UPDATE\]
  - Add a new response field `bonus`
- [Get Transaction Log](/docs/v5/account/transaction-log) \[UPDATE\]
  - Add a new response field `bonusChange`
- [Get Coin Information](/docs/v5/asset/coin-info) \[UPDATE\]
  - Add a new response field `withdrawPercentageFee`
- [Create Sub UID](/docs/v5/user/create-subuid) \[UPDATE\]
  - Add a new request param `password`
- [Get API Key Information](/docs/v5/user/apikey-info) \[UPDATE\]
  - Add a new response field `isMaster`
- [Get Delay Withdraw Amount](/docs/v5/asset/balance/delay-amount) \[NEW\]
  - New api to know that how much amount cannot be withdrawn temporarily due to
    risk
- [Get Internal Deposit Records (across Bybit)](/docs/v5/asset/deposit/internal-deposit-record)
  \[NEW\]
  - New api to get internal deposit on Bybit platform

### WebSocket API[​](#websocket-api-58 "Direct link to heading")

- [Wallet](/docs/v5/websocket/private/wallet) \[UPDATE\]
  - Add a new field `bonus`

## 2023-02-20[​](#2023-02-20 "Direct link to heading")

### REST API[​](#rest-api-170 "Direct link to heading")

- [Set Deposit Account](/docs/v5/asset/deposit/set-deposit-acct) \[NEW\]
  - You can set auto-transfer-to account type after deposit
- [Get API Key Information](/docs/v5/user/apikey-info) \[UPDATE\]
  - Add a new response filed: `rsaPublicKey`
- [Create Universal Transfer](/docs/v5/asset/transfer/unitransfer) \[UPDATE\]
  - Change rate limit from 20 req/min to 1 req/sec
- [Get Universal Transfer List](/docs/v5/asset/transfer/unitransfer-list)
  \[UPDATE\]
  - Change rate limit from 60 req/min to 2 req/sec

## 2023-02-15[​](#2023-02-15 "Direct link to heading")

### REST API[​](#rest-api-171 "Direct link to heading")

- [User](/docs/v5/user/create-subuid) \[NEW\]
  - Add a set of user & api key related endpoints for V5

## 2023-02-14[​](#2023-02-14 "Direct link to heading")

### REST API[​](#rest-api-172 "Direct link to heading")

- [Get Fee Rate (Derivatives)](/docs/v5/account/fee-rate) \[NEW\]
  - Get the trading fee rate for derivatives
- [Withdraw](/docs/v5/asset/withdraw) \[UPDATE\]
  - Select the wallet to be withdrawn from
  - The default withdrawn wallet is Spot wallet

| Req param   | Required | Type   | Comments                               |
| :---------- | :------- | :----- | -------------------------------------- |
| accountType | false    | string | Select the wallet to be withdrawn from |

- `SPOT`：spot wallet (default)
- `FUND`：Funding wallet

|

## 2023-02-09[​](#2023-02-09 "Direct link to heading")

### REST API[​](#rest-api-173 "Direct link to heading")

- [Get All Coins Balance](/docs/v5/asset/balance/all-balance) \[NEW\]
  - Get all coins balance of a specified account in one request
- [Set Disconnect Cancel All](/docs/v5/order/dcp) \[NEW\]
  - Set DCP for Options trade
- [Set MMP](/docs/v5/account/set-mmp) \[NEW\]
  - Set MMP for Options tarde
- [Reset MMP](/docs/v5/account/reset-mmp) \[NEW\]
  - To release MMP frozen status
- [Get MMP State](/docs/v5/account/get-mmp-state) \[NEW\]
  - Get MMP settings info

## 2023-01-19[​](#2023-01-19 "Direct link to heading")

### REST API[​](#rest-api-174 "Direct link to heading")

- [Set Margin Mode](/docs/v5/account/set-margin-mode) \[UPDATE\]
  - Portfolio margin mode supports USDT Perpetual
- [Get Position Info](/docs/v5/position) \[UPDATE\]
  - For portfolio margin mode, `positionIM`, `positionMM`, `leverage`,
    `riskLimitValue` returns "", `riskId` returns 0
- [Get Wallet Balance](/docs/v5/account/wallet-balance) \[UPDATE\]
  - For portfolio margin mode, `totalOrderIM`, `totalPositionIM`,
    `totoalPositionMM` returns ""

### WebSocket API[​](#websocket-api-59 "Direct link to heading")

- [Position](/docs/v5/websocket/private/position) \[UPDATE\]
  - For portfolio margin mode, `positionIM`, `positionMM`, `leverage`,
    `riskLimitValue` returns "", `riskId` returns 0
- [Wallet](/docs/v5/websocket/private/wallet) \[UPDATE\]
  - For portfolio margin mode, `totalOrderIM`, `totalPositionIM`,
    `totoalPositionMM` returns ""

## 2023-01-16[​](#2023-01-16 "Direct link to heading")

### REST API[​](#rest-api-175 "Direct link to heading")

- [Get Tickers](/docs/v5/market/tickers) \[spot\]
  - `usdIndexPrice` has been added to response. It means USD index price, which
    can be empty.

### WebSocket API[​](#websocket-api-60 "Direct link to heading")

- [Tickers](/docs/v5/websocket/public/ticker) \[spot\]
  - `usdIndexPrice` has been added to stream. It means USD index price, which
    can be empty.
- [Orderbook](/docs/v5/websocket/public/orderbook) \[linear contract & inverse
  contract\]
  - Add 500 level depth, push frequency is 100ms

## 2023-01-09[​](#2023-01-09 "Direct link to heading")

### WebSocket API[​](#websocket-api-61 "Direct link to heading")

- [Tickers](/docs/v5/websocket/public/ticker) \[linear contract & inverse
  contract\]
  - `nextFundingTime` has been changed from dataTime `2023-01-05T08:00:00Z` to
    timestamp (ms) `1672905600000`
  - `predicatedFundingRate` has been removed from stream

- [2025-11-25](#2025-11-25)
  - [Websocket API](#websocket-api)
- [2025-11-17](#2025-11-17)
  - [REST API](#rest-api)
- [2025-11-13](#2025-11-13)
  - [REST API](#rest-api-1)
- [2025-11-11](#2025-11-11)
  - [REST API](#rest-api-2)
- [2025-11-04](#2025-11-04)
  - [REST API](#rest-api-3)
  - [Websocket API](#websocket-api-1)
- [2025-11-03](#2025-11-03)
  - [REST API](#rest-api-4)
- [2025-10-23](#2025-10-23)
  - [REST API](#rest-api-5)
- [2025-10-22](#2025-10-22)
  - [REST API](#rest-api-6)
- [2025-10-21](#2025-10-21)
  - [REST API](#rest-api-7)
  - [WebSocket API](#websocket-api-2)
- [2025-10-16](#2025-10-16)
  - [REST API](#rest-api-8)
  - [WebSocket API](#websocket-api-3)
- [2025-10-14](#2025-10-14)
  - [REST API](#rest-api-9)
- [2025-10-10](#2025-10-10)
  - [REST API](#rest-api-10)
- [2025-10-09](#2025-10-09)
  - [REST API](#rest-api-11)
- [2025-09-28](#2025-09-28)
  - [REST API](#rest-api-12)
- [2025-09-25](#2025-09-25)
  - [REST API](#rest-api-13)
- [2025-09-24](#2025-09-24)
  - [REST API](#rest-api-14)
- [2025-09-23](#2025-09-23)
  - [REST API](#rest-api-15)
  - [WebSocket API](#websocket-api-4)
- [2025-09-18](#2025-09-18)
  - [REST API](#rest-api-16)
  - [WebSocket API](#websocket-api-5)
- [2025-09-16](#2025-09-16)
  - [REST API](#rest-api-17)
  - [WebSocket API](#websocket-api-6)
- [2025-09-15](#2025-09-15)
  - [REST API](#rest-api-18)
- [2025-09-11](#2025-09-11)
  - [WebSocket API](#websocket-api-7)
- [2025-09-09](#2025-09-09)
  - [REST API](#rest-api-19)
- [2025-09-08](#2025-09-08)
  - [REST API](#rest-api-20)
- [2025-09-04](#2025-09-04)
  - [REST API](#rest-api-21)
- [2025-08-28](#2025-08-28)
  - [REST API](#rest-api-22)
- [2025-08-26](#2025-08-26)
  - [REST API](#rest-api-23)
- [2025-08-14](#2025-08-14)
  - [WebSocket API](#websocket-api-8)
- [2025-08-13](#2025-08-13)
  - [REST API](#rest-api-24)
- [2025-08-07](#2025-08-07)
  - [REST API](#rest-api-25)
- [2025-08-06](#2025-08-06)
  - [REST API](#rest-api-26)
- [2025-08-05](#2025-08-05)
  - [Websocket API](#websocket-api-9)
- [2025-07-31](#2025-07-31)
  - [REST API](#rest-api-27)
- [2025-07-25](#2025-07-25)
  - [REST API](#rest-api-28)
- [2025-07-22](#2025-07-22)
  - [REST API](#rest-api-29)
  - [Websocket API](#websocket-api-10)
- [2025-07-17](#2025-07-17)
  - [REST API](#rest-api-30)
- [2025-07-16](#2025-07-16)
  - [REST API](#rest-api-31)
- [2025-07-15](#2025-07-15)
  - [Websocket API](#websocket-api-11)
- [2025-07-08](#2025-07-08)
  - [REST API](#rest-api-32)
  - [Websocket API](#websocket-api-12)
- [2025-07-04](#2025-07-04)
  - [REST API](#rest-api-33)
  - [Websocket API](#websocket-api-13)
- [2025-07-03](#2025-07-03)
  - [REST API](#rest-api-34)
  - [Websocket API](#websocket-api-14)
- [2025-06-30](#2025-06-30)
  - [REST API](#rest-api-35)
  - [Websocket API](#websocket-api-15)
- [2025-06-26](#2025-06-26)
  - [REST API](#rest-api-36)
  - [Websocket API](#websocket-api-16)
- [2025-06-24](#2025-06-24)
  - [REST API](#rest-api-37)
- [2025-06-19](#2025-06-19)
  - [REST API](#rest-api-38)
  - [WebSocket API](#websocket-api-17)
- [2025-06-12](#2025-06-12)
  - [REST API](#rest-api-39)
- [2025-06-10](#2025-06-10)
  - [REST API](#rest-api-40)
- [2025-05-28](#2025-05-28)
  - [REST API](#rest-api-41)
- [2025-05-27](#2025-05-27)
  - [REST API](#rest-api-42)
- [2025-05-23](#2025-05-23)
  - [REST API](#rest-api-43)
- [2025-05-06](#2025-05-06)
  - [REST API](#rest-api-44)
- [2025-04-24](#2025-04-24)
  - [REST API](#rest-api-45)
- [2025-04-22](#2025-04-22)
  - [REST API](#rest-api-46)
- [2025-04-17](#2025-04-17)
  - [REST API](#rest-api-47)
- [2025-04-16](#2025-04-16)
  - [REST API](#rest-api-48)
- [2025-04-14](#2025-04-14)
  - [REST API](#rest-api-49)
- [2025-04-11](#2025-04-11)
  - [REST API](#rest-api-50)
- [2025-04-02](#2025-04-02)
  - [REST API](#rest-api-51)
- [2025-04-01](#2025-04-01)
  - [REST API](#rest-api-52)
  - [Websocket API](#websocket-api-18)
- [2025-03-20](#2025-03-20)
  - [WebSocket API](#websocket-api-19)
- [2025-03-05](#2025-03-05)
  - [REST API](#rest-api-53)
- [2025-02-27](#2025-02-27)
  - [REST API](#rest-api-54)
  - [Websocket API](#websocket-api-20)
- [2025-02-26](#2025-02-26)
  - [Websocket API](#websocket-api-21)
- [2025-02-20](#2025-02-20)
  - [REST API](#rest-api-55)
  - [Websocket API](#websocket-api-22)
- [2025-02-19](#2025-02-19)
  - [REST API](#rest-api-56)
- [2025-02-18](#2025-02-18)
  - [REST API](#rest-api-57)
  - [Websocket API](#websocket-api-23)
- [2025-02-17](#2025-02-17)
  - [REST API](#rest-api-58)
- [2025-02-13](#2025-02-13)
  - [REST API](#rest-api-59)
- [2025-02-07](#2025-02-07)
  - [REST API](#rest-api-60)
- [2025-01-14](#2025-01-14)
  - [REST API](#rest-api-61)
- [2025-01-09](#2025-01-09)
  - [REST API](#rest-api-62)
  - [Websocket API](#websocket-api-24)
- [2025-01-02](#2025-01-02)
  - [REST API](#rest-api-63)
- [2024-12-12](#2024-12-12)
  - [REST API](#rest-api-64)
- [2024-12-09](#2024-12-09)
  - [REST API](#rest-api-65)
- [2024-12-04](#2024-12-04)
  - [REST API](#rest-api-66)
- [2024-11-19](#2024-11-19)
  - [REST API](#rest-api-67)
- [2024-11-14](#2024-11-14)
  - [REST API](#rest-api-68)
- [2024-11-05](#2024-11-05)
- [2024-10-30](#2024-10-30)
  - [REST API](#rest-api-69)
- [2024-10-15](#2024-10-15)
  - [Websocket API](#websocket-api-25)
- [2024-10-11](#2024-10-11)
  - [REST API](#rest-api-70)
- [2024-09-29](#2024-09-29)
  - [Websocket API](#websocket-api-26)
- [2024-09-12](#2024-09-12)
  - [REST API](#rest-api-71)
- [2024-08-29](#2024-08-29)
  - [REST API](#rest-api-72)
- [2024-08-13](#2024-08-13)
  - [REST API](#rest-api-73)
- [2024-08-07](#2024-08-07)
  - [REST API](#rest-api-74)
- [2024-08-06](#2024-08-06)
  - [REST API](#rest-api-75)
- [2024-07-30](#2024-07-30)
  - [Websocket API](#websocket-api-27)
- [2024-07-25](#2024-07-25)
  - [REST API](#rest-api-76)
- [2024-07-09](#2024-07-09)
  - [Websocket API](#websocket-api-28)
- [2024-07-04](#2024-07-04)
  - [REST API](#rest-api-77)
- [2024-07-03](#2024-07-03)
- [2024-07-01](#2024-07-01)
- [2024-06-27](#2024-06-27)
  - [REST API](#rest-api-78)
  - [Websocket API](#websocket-api-29)
- [2024-06-20](#2024-06-20)
  - [REST API](#rest-api-79)
- [2024-06-18](#2024-06-18)
  - [REST API](#rest-api-80)
  - [Websocket API](#websocket-api-30)
- [2024-06-14](#2024-06-14)
  - [Websocket API](#websocket-api-31)
- [2024-06-13](#2024-06-13)
  - [REST API](#rest-api-81)
- [2024-06-06](#2024-06-06)
  - [REST API](#rest-api-82)
  - [Websocket API](#websocket-api-32)
- [2024-06-04](#2024-06-04)
  - [REST API](#rest-api-83)
- [2024-05-30](#2024-05-30)
  - [REST API](#rest-api-84)
- [2024-05-09](#2024-05-09)
  - [REST API](#rest-api-85)
- [2024-05-06](#2024-05-06)
  - [Websocket API](#websocket-api-33)
- [2024-04-25](#2024-04-25)
  - [REST API](#rest-api-86)
- [2024-04-23](#2024-04-23)
  - [REST API](#rest-api-87)
  - [Websocket API](#websocket-api-34)
- [2024-04-15](#2024-04-15)
  - [REST API](#rest-api-88)
- [2024-04-11](#2024-04-11)
  - [REST API](#rest-api-89)
- [2024-04-03](#2024-04-03)
  - [REST API](#rest-api-90)
- [2024-04-01](#2024-04-01)
  - [REST API](#rest-api-91)
  - [Websocket API](#websocket-api-35)
- [2024-03-28](#2024-03-28)
  - [Websocket API](#websocket-api-36)
- [2024-03-22](#2024-03-22)
- [2024-03-21](#2024-03-21)
- [2024-03-13](#2024-03-13)
  - [REST API](#rest-api-92)
- [2024-03-12](#2024-03-12)
  - [REST API](#rest-api-93)
- [2024-03-11](#2024-03-11)
  - [REST API](#rest-api-94)
- [2024-03-06](#2024-03-06)
  - [REST API](#rest-api-95)
- [2024-03-05](#2024-03-05)
  - [REST API](#rest-api-96)
  - [Websocket API](#websocket-api-37)
- [2024-03-04](#2024-03-04)
  - [REST API](#rest-api-97)
  - [Websocket API](#websocket-api-38)
- [2024-03-01](#2024-03-01)
  - [REST API](#rest-api-98)
- [2024-02-29](#2024-02-29)
  - [REST API](#rest-api-99)
- [2024-02-28](#2024-02-28)
  - [REST API](#rest-api-100)
- [2024-02-21](#2024-02-21)
  - [REST API](#rest-api-101)
- [2024-02-06](#2024-02-06)
  - [REST API](#rest-api-102)
- [2024-02-05](#2024-02-05)
  - [REST API](#rest-api-103)
- [2024-01-18](#2024-01-18)
  - [REST API](#rest-api-104)
- [2024-01-16](#2024-01-16)
  - [REST API](#rest-api-105)
- [2024-01-15](#2024-01-15)
  - [REST API](#rest-api-106)
  - [Websocket API](#websocket-api-39)
- [2024-01-11](#2024-01-11)
  - [REST API](#rest-api-107)
- [2024-01-09](#2024-01-09)
  - [REST API](#rest-api-108)
- [2024-01-08](#2024-01-08)
  - [REST API](#rest-api-109)
- [2024-01-02](#2024-01-02)
  - [REST API](#rest-api-110)
- [2023-12-28](#2023-12-28)
  - [REST API](#rest-api-111)
- [2023-12-22](#2023-12-22)
  - [REST API](#rest-api-112)
  - [Websocket API](#websocket-api-40)
- [2023-12-20](#2023-12-20)
  - [REST API](#rest-api-113)
- [2023-12-14](#2023-12-14)
  - [Websocket API](#websocket-api-41)
- [2023-12-12](#2023-12-12)
  - [REST API](#rest-api-114)
  - [Websocket API](#websocket-api-42)
- [2023-12-07](#2023-12-07)
  - [REST API](#rest-api-115)
- [2023-12-04](#2023-12-04)
  - [REST API](#rest-api-116)
- [2023-11-16](#2023-11-16)
  - [REST API](#rest-api-117)
  - [Websocket API](#websocket-api-43)
- [2023-11-14](#2023-11-14)
  - [REST API](#rest-api-118)
- [2023-11-09](#2023-11-09)
  - [REST API](#rest-api-119)
- [2023-11-08](#2023-11-08)
  - [REST API](#rest-api-120)
- [2023-11-02](#2023-11-02)
  - [REST API](#rest-api-121)
- [2023-11-01](#2023-11-01)
  - [REST API](#rest-api-122)
- [2023-10-26](#2023-10-26)
  - [REST API](#rest-api-123)
  - [Websocket API](#websocket-api-44)
- [2023-10-25](#2023-10-25)
  - [REST API](#rest-api-124)
  - [Websocket API](#websocket-api-45)
- [2023-10-17](#2023-10-17)
  - [REST API](#rest-api-125)
- [2023-10-09](#2023-10-09)
  - [Websocket API](#websocket-api-46)
- [2023-09-28](#2023-09-28)
  - [REST API](#rest-api-126)
- [2023-09-25](#2023-09-25)
  - [REST API](#rest-api-127)
  - [Websocket API](#websocket-api-47)
- [2023-09-21](#2023-09-21)
  - [REST API](#rest-api-128)
  - [WebSocket API](#websocket-api-48)
- [2023-09-18](#2023-09-18)
  - [REST API](#rest-api-129)
- [2023-09-14](#2023-09-14)
  - [REST API](#rest-api-130)
- [2023-09-07](#2023-09-07)
  - [REST API](#rest-api-131)
- [2023-09-04](#2023-09-04)
  - [REST API](#rest-api-132)
- [2023-08-31](#2023-08-31)
  - [REST API](#rest-api-133)
- [2023-08-30](#2023-08-30)
  - [REST API](#rest-api-134)
- [2023-08-25](#2023-08-25)
  - [REST API](#rest-api-135)
- [2023-08-24](#2023-08-24)
  - [REST API](#rest-api-136)
- [2023-08-22](#2023-08-22)
  - [REST API](#rest-api-137)
- [2023-08-17](#2023-08-17)
  - [REST API](#rest-api-138)
- [2023-08-11](#2023-08-11)
  - [REST API](#rest-api-139)
  - [Websocket API](#websocket-api-49)
- [2023-08-10](#2023-08-10)
  - [REST API](#rest-api-140)
- [2023-08-08](#2023-08-08)
  - [REST API](#rest-api-141)
- [2023-08-07](#2023-08-07)
  - [REST API](#rest-api-142)
  - [Websocket API](#websocket-api-50)
- [2023-07-31](#2023-07-31)
  - [REST API](#rest-api-143)
  - [WebSocket API](#websocket-api-51)
- [2023-07-24](#2023-07-24)
  - [REST API](#rest-api-144)
- [2023-07-13](#2023-07-13)
  - [REST API](#rest-api-145)
- [2023-07-04](#2023-07-04)
  - [REST API](#rest-api-146)
- [2023-06-26](#2023-06-26)
  - [WebSocket API](#websocket-api-52)
- [2023-06-24](#2023-06-24)
  - [REST API](#rest-api-147)
- [2023-06-15](#2023-06-15)
  - [REST API](#rest-api-148)
- [2023-06-14](#2023-06-14)
  - [REST API](#rest-api-149)
- [2023-06-08](#2023-06-08)
  - [REST API](#rest-api-150)
- [2023-06-07](#2023-06-07)
  - [REST API](#rest-api-151)
- [2023-06-02](#2023-06-02)
  - [REST API](#rest-api-152)
- [2023-06-01](#2023-06-01)
  - [REST API](#rest-api-153)
  - [WebSocket API](#websocket-api-53)
- [2023-05-30](#2023-05-30)
  - [REST API](#rest-api-154)
- [2023-05-23](#2023-05-23)
  - [REST API](#rest-api-155)
  - [WebSocket API](#websocket-api-54)
- [2023-05-10](#2023-05-10)
  - [REST API](#rest-api-156)
- [2023-05-05](#2023-05-05)
  - [REST API](#rest-api-157)
- [2023-05-04](#2023-05-04)
  - [REST API](#rest-api-158)
- [2023-04-20](#2023-04-20)
  - [REST API](#rest-api-159)
  - [WebSocket API](#websocket-api-55)
- [2023-04-06](#2023-04-06)
  - [REST API](#rest-api-160)
- [2023-04-04](#2023-04-04)
  - [REST API](#rest-api-161)
- [2023-04-04](#2023-04-04-1)
  - [REST API](#rest-api-162)
  - [WebSocket API](#websocket-api-56)
- [2023-03-24](#2023-03-24)
  - [REST API](#rest-api-163)
- [2023-03-23](#2023-03-23)
  - [REST API](#rest-api-164)
  - [WebSocket API](#websocket-api-57)
- [2023-03-22](#2023-03-22)
  - [REST API](#rest-api-165)
- [2023-03-15](#2023-03-15)
  - [REST API](#rest-api-166)
- [2023-03-10](#2023-03-10)
  - [REST API](#rest-api-167)
- [2023-03-09](#2023-03-09)
  - [REST API](#rest-api-168)
- [2023-02-28](#2023-02-28)
  - [REST API](#rest-api-169)
  - [WebSocket API](#websocket-api-58)
- [2023-02-20](#2023-02-20)
  - [REST API](#rest-api-170)
- [2023-02-15](#2023-02-15)
  - [REST API](#rest-api-171)
- [2023-02-14](#2023-02-14)
  - [REST API](#rest-api-172)
- [2023-02-09](#2023-02-09)
  - [REST API](#rest-api-173)
- [2023-01-19](#2023-01-19)
  - [REST API](#rest-api-174)
  - [WebSocket API](#websocket-api-59)
- [2023-01-16](#2023-01-16)
  - [REST API](#rest-api-175)
  - [WebSocket API](#websocket-api-60)
- [2023-01-09](#2023-01-09)
  - [WebSocket API](#websocket-api-61)
