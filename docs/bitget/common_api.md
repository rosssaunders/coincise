# Bitget Common API Documentation



# Bitget API Introduction

## API Introduction[​](#api-introduction "Direct link to API Introduction")

Welcome to Bitget Developer document!

This document is the only official document of Bitget API. We will constantly update the functionalities of Bitget API here. Please pay attention to it regularly.

You can switch to access different APIs business line by clicking the upper menu, and you can switch the document language by clicking the language button on the upper right.

On the right side of the document usually displays example of request parameters and response results.

## Updates[​](#updates "Direct link to Updates")

Regarding API additions, updates, and offline information, Bitget will issue announcements in advance to notify you. It is recommended that you follow and subscribe to our announcements to obtain relevant information in time.

You can click [Latest News](javascript:;) to subscribe to announcements.

Further more, an API to get notification could be found [here](/api-doc/common/notice/Get-All-Notices)

## Contact Us[​](#contact-us "Direct link to Contact Us")

If you have any questions or suggestions, you can contact us by:

*   Send an email to [API@bitget.com](mailto:API@bitget.com).
*   Telegram [Join](https://t.me/bitgetOpenapi)

# V2 API Update Guide

## Scope of changes[​](#scope-of-changes "Direct link to Scope of changes")

### Interface aggregation[​](#interface-aggregation "Direct link to Interface aggregation")

In V1, interface changes involving modifications to input parameters are typically addressed by introducing new interfaces, ensuring minimal impact on online users. Therefore, in V2, we have optimized shortcomings such as interface redundancy and confusion in business scenarios. For detailed information on interface aggregation across all business lines, please refer to the V1 and V2 Interface Mapping Tables.

### Global symbol request rule changes[​](#global-symbol-request-rule-changes "Direct link to Global symbol request rule changes")

In V2, we reduced them to one parameter—**symbol**—corresponding to symbolName in V1. Additionally, business line notes such as SPBL and UMBCL were removed when passing the symbol value.

### Optimization of global query rules[​](#optimization-of-global-query-rules "Direct link to Optimization of global query rules")

In terms of data retrieval for query interfaces, we have abandoned the pagination method of pageSize and pageNo used in V1. In V2, we replaced it with cursor-based pagination with idLessThan and limit. Based on real-life business scenarios, a time range data query was added to most query interfaces. In addition, user ID can be used as the request parameter in precise query scenarios with some trade record, trade execution, and order-related interfaces. The basic rules and scenarios for id, startTime, endTime, idLessThan, and limit are described as follows:

  
Basic rule: When querying data, the verification order for returned results is id > startTime + endTime > idLessThan. In other words, it first prioritizes precise queries using the id, then narrows down the data range with startTime and endTime, and finally uses the cursor idLessThan to retrieve a specified number of data entries based on the limit.

### Standardization of naming rules for business line interfaces and parameters[​](#standardization-of-naming-rules-for-business-line-interfaces-and-parameters "Direct link to Standardization of naming rules for business line interfaces and parameters")

In V1, there was a lack of consistency in parameters between business lines. Therefore, in V2, we have standardized the naming and format of parameters with the same meaning for scenarios spanning different business lines (spot, futures, leverage) and interface types (Rest/WebSocket).

### Clearer catalog categorization[​](#clearer-catalog-categorization "Direct link to Clearer catalog categorization")

In V1, the categorization of interface catalogs was too vague, resulting in an excessive number of interfaces in some catalogs. This, in turn, led to difficulties in documentation query and poor user experience. In V2, we have adjusted the categorization and naming of the interface catalogs, making them more detailed, intuitive, thus avoiding readability and retrieval issues.

### Accessibility of more in-depth information[​](#accessibility-of-more-in-depth-information "Direct link to Accessibility of more in-depth information")

For futures and spot trading pairs, we significantly increased the trading pair depth that can be accessed through the interfaces and standardized the tiers across different business lines.

| Business Line | Version | Tier |
| --- | --- | --- |
| Spot | V1 | 150/200 
| Spot | V2 | 1/5/15/50/max; default: 100. The max is determined by the highest tier available for the designated trading pair. 
| Future | V1 | 5/15/50/100 
| Future | V2 | 1/5/15/50/max; default: 100.The max is determined by the highest tier available for the designated trading pair. 

### Merge of futures trigger order and trailing stop-loss[​](#merge-of-futures-trigger-order-and-trailing-stop-loss "Direct link to Merge of futures trigger order and trailing stop-loss")

In V2, we combined the trigger order and the trailing stop-loss into one, using the field planType to differentiate the order type.

The order placing conditions of the two are different. Different from the normal trigger order, the trailing stop-loss requires attention to the field callbackRatio, which is used to set the order-triggering percentage. stopSurplusTriggerPrice and stopLossTriggerPrice also require special attention as these two fields are used to determine the trail variance percentage that triggers the trailing stop-loss and take-profit orders.

### Position opening/closing in futures order placement[​](#position-openingclosing-in-futures-order-placement "Direct link to Position opening/closing in futures order placement")

In V2, we improved operations on positions in both one-way and hedging modes.

When placing an order, the field side and tradeSide are combined for parameter entry based on the position mode and direction.

Enumeration values of **side** and **tradeSide**:

| Field name | Enumeration value | Description |
| --- | --- | --- |
| side | buy | Buying 
| side | sell | selling 
| tradeSide | open | Opening a position 
| tradeSide | close | Closing a position 

Operation rules of parameter entries in one-way or hedging modes:

| Position mode | Parameter entries | Operation | Description |
| --- | --- | --- | --- |
| One-way mode | side: buy | Buying | In one-way mode, only one side is needed to indicate whether it is a buying or selling order 
| One-way mode | side: sell | Selling | In one-way mode, only one side is needed to indicate whether it is a buying or selling order 
| Hedging mode | side: buy; tradeSide: open | Opening a long position | In hedging mode, both side and tradeSide are needed to determine whether it is opening long/short or closing long/short 
| Hedging mode | side: sell; tradeSide: open | Opening a short position | In hedging mode, both side and tradeSide are needed to determine whether it is opening long/short or closing long/short 
| Hedging mode | side: buy; tradeSide: close | Closing a long position | In hedging mode, both side and tradeSide are needed to determine whether it is opening long/short or closing long/short 
| Hedging mode | side: sell; tradeSide: close | Closing a short position | In hedging mode, both side and tradeSide are needed to determine whether it is opening long/short or closing long/short 

### Optimization of delivery futures[​](#optimization-of-delivery-futures "Direct link to Optimization of delivery futures")

In V2, we updated the naming rules for symbol in Coin-M delivery futures.  

For Coin-M delivery futures, the format of symbol is trading pair + month code + year.  

Examples and descriptions:  

| Symbol | Descriptions |
| --- | --- |
| BTCUSD<strong>H</strong>23 | H means March (Q1) and 23 means the year 2023 
| BTCUSD<strong>M</strong>23 | M means June (Q2) and 23 means the year 2023 
| BTCUSD<strong>U</strong>23 | U means September (Q3) and 23 means the year 2023 
| BTCUSD<strong>Z</strong>23 | Z means December (Q4) and 23 means the year 2023 

The bolded letters H, M, U, and Z are some of the month codes. Month codes:

| Month code | Month | Month code | Month |
| --- | --- | --- | --- |
| F | January | N | July 
| G | February | Q | August 
| <code>H</code> | March | <code>U</code> | September 
| J | April | V | October 
| K | May | X | November 
| <code>M</code> | June | <code>Z</code> | December 

### Optimized maximum/minimum order size logic of trading pairs[​](#optimized-maximumminimum-order-size-logic-of-trading-pairs "Direct link to Optimized maximum/minimum order size logic of trading pairs")

In V2, we have included parameter descriptions for maximum and minimum order sizes in interfaces that access spot and futures trading pairs. This enhancement enables users to access essential information about trading pairs, including minimum and maximum trading volumes, the maximum number of open orders (considering both trading pairs and products), price precision, amount precision, and other basic information.

### Earn interfaces coming soon[​](#earn-interfaces-coming-soon "Direct link to Earn interfaces coming soon")

To meet users' demand for crypto Earn products, we are about to launch interfaces for Savings and Shark Fin, covering features such as information retrieval, PnL statistics, asset analysis, subscription, and redemption. Both fixed and flexible Savings are supported, enhancing our digital asset management service.

### Crypto Loan interfaces coming soon[​](#crypto-loan-interfaces-coming-soon "Direct link to Crypto Loan interfaces coming soon")

Catering to the needs of investors seeking more conservative or flexible approaches to grow their wealth, we are about to launch interfaces for Crypto Loan. For users with lower risk tolerance who seek conservative and flexible borrowing solutions, we introduced the interface for Crypto Loan. Crypto Loan is a financial product that allows users to borrow fiat currency or cryptocurrencies by using their crypto assets as collateral.

  
  
The Bitget Crypto Loan API aims to help users get additional funds instantly without losing control over their own crypto assets.The whole process includes staking the collateral, obtaining the loan, adding to/withdrawing from the collateral, undergoing liquidation, paying interest, repaying the loan, and redeeming the collateral. It should be noted that, due to the nature of the digital currency market, the crypto market is considerably more volatile than the traditional market. As a result, future fluctuations in coin prices will impact the overall return.

## Interface Mapping Tables[​](#interface-mapping-tables "Direct link to Interface Mapping Tables")

### Spot[​](#spot "Direct link to Spot")

| V1 Endpoint | V2 Endpoint |
| :-- | :-- |
| - GET /api/spot/v1/notice/queryAllNotices | - GET /api/v2/public/annoucements 
| - GET /api/spot/v1/public/time | - GET /api/v2/public/time 
| - GET /api/spot/v1/public/currencies | - GET /api/v2/spot/public/coins 
| - GET /api/spot/v1/public/products | - GET /api/v2/spot/public/symbols 
| - GET /api/spot/v1/public/product | - GET /api/v2/spot/public/symbols 
| - GET /api/spot/v1/market/ticker | - GET /api/v2/spot/market/tickers 
| - GET /api/spot/v1/market/tickers | - GET /api/v2/spot/market/tickers 
| - GET /api/spot/v1/market/fills-history | - GET /api/v2/spot/market/fills-history 
| - GET /api/spot/v1/market/fills | - GET /api/v2/spot/market/fills 
| - GET /api/spot/v1/market/candles | - GET /api/v2/spot/market/candles 
| - GET /api/spot/v1/market/history-candles | - GET /api/v2/spot/market/history-candles 
| - GET /api/spot/v1/market/depth | - GET /api/v2/spot/market/orderbook 
| - GET /api/spot/v1/market/merge-depth | - GET /api/v2/spot/market/orderbook 
| - GET /api/spot/v1/market/spot-vip-level | - GET /api/v2/spot/market/vip-fee-rate 
| - POST /api/spot/v1/wallet/transfer | - POST /api/v2/spot/wallet/transfer 
| - POST /api/spot/v1/wallet/transfer-v2 | - POST /api/v2/spot/wallet/transfer 
| - POST /api/spot/v1/wallet/subTransfer | - POST /api/v2/spot/wallet/subaccount-transfer 
| - POST /api/spot/v1/wallet/withdrawal | - POST /api/v2/spot/wallet/withdrawal 
| - POST /api/spot/v1/wallet/withdrawal-v2 | - POST /api/v2/spot/wallet/withdrawal 
| - POST /api/spot/v1/wallet/withdrawal-inner | - POST /api/v2/spot/wallet/withdrawal 
| - POST /api/spot/v1/wallet/withdrawal-inner-v2 | - POST /api/v2/spot/wallet/withdrawal 
| - GET /api/spot/v1/wallet/deposit-address | - GET /api/v2/spot/wallet/deposit-address 
| - GET /api/spot/v1/wallet/deposit-list | - GET /api/v2/spot/wallet/deposit-records 
| - GET /api/spot/v1/wallet/withdrawal-list | - GET /api/v2/spot/wallet/withdrawal-records 
| - GET /api/user/v1/fee/query | - GET /api/v2/public/trade-rate 
| - GET /api/spot/v1/account/getInfo | - GET /api/v2/spot/account/info 
| - GET /api/spot/v1/account/assets | - GET /api/v2/spot/account/assets 
| - GET /api/spot/v1/account/assets-lite | - GET /api/v2/spot/account/assets 
| - POST /api/spot/v1/account/sub-account-spot-assets | - GET /api/v2/spot/account/subaccount-assets 
| - POST /api/spot/v1/account/bills | - GET /api/v2/spot/account/bills 
| - GET /api/spot/v1/account/transferRecords | - GET /api/v2/spot/account/transferRecords 
| - POST /api/spot/v1/trade/orders | - POST /api/v2/spot/trade/place-order 
| - POST /api/spot/v1/trade/batch-orders | - POST /api/v2/spot/trade/batch-orders 
| - POST /api/spot/v1/trade/cancel-order | - POST /api/v2/spot/trade/cancel-order 
| - POST /api/spot/v1/trade/cancel-order-v2 | - POST /api/v2/spot/trade/cancel-order 
| - POST /api/spot/v1/trade/cancel-symbol-order | - POST /api/v2/spot/trade/cancel-symbol-order 
| - POST /api/spot/v1/trade/cancel-batch-orders | - POST /api/v2/spot/trade/batch-cancel-order 
| - POST /api/spot/v1/trade/cancel-batch-orders-v2 | - POST /api/v2/spot/trade/batch-cancel-order 
| - POST /api/spot/v1/trade/orderInfo | - GET /api/v2/spot/trade/orderInfo 
| - POST /api/spot/v1/trade/open-order | - GET /api/v2/spot/trade/unfilled-orders 
| - POST /api/spot/v1/trade/history | - GET /api/v2/spot/trade/history-orders 
| - POST /api/spot/v1/trade/fills | - GET /api/v2/spot/trade/fills 
| - POST /api/spot/v1/plan/placePlan | - POST /api/v2/spot/trade/place-plan-order 
| - POST /api/spot/v1/plan/modifyPlan | - POST /api/v2/spot/trade/modify-plan-order 
| - POST /api/spot/v1/plan/cancelPlan | - POST /api/v2/spot/trade/cancel-plan-order 
| - POST /api/spot/v1/plan/currentPlan | - GET /api/v2/spot/trade/current-plan-order 
| - POST /api/spot/v1/plan/historyPlan | - GET /api/v2/spot/trade/history-plan-order 
| - POST /api/spot/v1/plan/batchCancelPlan | - POST /api/v2/spot/trade/batch-cancel-plan-order 
| - GET /api/p2p/v1/merchant/merchantList | - GET /api/v2/p2p/merchantList 
| - GET /api/p2p/v1/merchant/merchantInfo | - GET /api/v2/p2p/merchantInfo 
| - GET /api/p2p/v1/merchant/advList | - GET /api/v2/p2p/advList 
| - GET /api/p2p/v1/merchant/orderList | - GET /api/v2/p2p/orderList 
| - POST /api/user/v1/sub/virtual-create | - POST /api/v2/user/create-virtual-subaccount 
| - POST /api/user/v1/sub/virtual-modify | - POST /api/v2/user/modify-virtual-subaccount 
| - POST /api/user/v1/sub/virtual-api-batch-create | - POST /api/v2/user/batch-create-subaccount-and-apikey 
| - GET /api/user/v1/sub/virtual-list | - GET /api/v2/user/virtual-subaccount-list 
| - POST /api/user/v1/sub/virtual-api-create | - POST /api/v2/user/create-virtual-subaccount-apikey 
| - POST /api/user/v1/sub/virtual-api-modify | - POST /api/v2/user/modify-virtual-subaccount-apikey 
| - GET /api/user/v1/sub/virtual-api-list | - GET /api/v2/user/virtual-subaccount-apikey-list 
| - GET /api/spot/v1/convert/currencies | - GET /api/v2/convert/currencies 
| - POST /api/spot/v1/convert/quoted-price | - POST /api/v2/convert/quoted-price 
| - POST /api/spot/v1/convert/trade | - POST /api/v2/convert/trade 
| - GET /api/spot/v1/convert/convert-record | - GET /api/v2/convert/convert-record 
| - GET /api/user/v1/tax/spot-record | - GET /api/v2/tax/spot-record 
| - GET /api/user/v1/tax/future-record | - GET /api/v2/tax/future-record 
| - GET /api/user/v1/tax/margin-record | - GET /api/v2/tax/margin-record 
| - GET /api/user/v1/tax/p2p-record | - GET /api/v2/tax/p2p-record 

### Future[​](#future "Direct link to Future")

| V1 Endpoint | V2 Endpoint |
| :-- | :-- |
| - GET /api/mix/v1/market/ticker | - GET /api/v2/mix/market/ticker 
| - GET /api/mix/v1/market/tickers | - GET /api/v2/mix/market/tickers 
| - GET /api/mix/v1/market/contract-vip-level | - GET /api/v2/mix/market/vip-fee-rate 
| - GET /api/mix/v1/market/fills | - GET /api/v2/mix/market/fills 
| - GET /api/mix/v1/market/fills-history | - GET /api/v2/mix/market/fills-history 
| - GET /api/mix/v1/market/candles | - GET /api/v2/mix/market/candles 
| - GET /api/mix/v1/market/history-candles | - GET /api/v2/mix/market/history-candles 
| - GET /api/mix/v1/market/history-index-candles | - GET /api/v2/mix/market/history-index-candles 
| - GET /api/mix/v1/market/history-mark-candles | - GET /api/v2/mix/market/history-mark-candles 
| - GET /api/mix/v1/market/funding-time | - GET /api/v2/mix/market/funding-time 
| - GET /api/mix/v1/market/history-fundRate | - GET /api/v2/mix/market/history-fund-rate 
| - GET /api/mix/v1/market/current-fundRate | - GET /api/v2/mix/market/current-fund-rate 
| - GET /api/mix/v1/market/open-interest | - GET /api/v2/mix/market/open-interest 
| - GET /api/mix/v1/market/queryPositionLever | - GET /api/v2/mix/market/query-position-lever 
| - GET /api/mix/v1/account/account | - GET /api/v2/mix/account/account 
| - GET /api/mix/v1/account/accounts | - GET /api/v2/mix/account/accounts 
| - POST /api/mix/v1/account/sub-account-contract-assets | - GET /api/v2/mix/account/sub-account-assets 
| - POST /api/mix/v1/account/open-count | - GET /api/v2/mix/account/open-count 
| - POST /api/mix/v1/account/setLeverage | - POST /api/v2/mix/account/set-leverage 
| - POST /api/mix/v1/account/setMargin | - POST /api/v2/mix/account/set-margin 
| - POST /api/mix/v1/account/setMarginMode | - POST /api/v2/mix/account/set-margin-mode 
| - POST /api/mix/v1/account/setPositionMode | - POST /api/v2/mix/account/set-position-mode 
| - GET /api/mix/v1/position/singlePosition | - GET /api/v2/mix/position/single-position 
| - GET /api/mix/v1/position/singlePosition-v2 | - GET /api/v2/mix/position/single-position 
| - GET /api/mix/v1/position/allPosition | - GET /api/v2/mix/position/all-position 
| - GET /api/mix/v1/position/allPosition-v2 | - GET /api/v2/mix/position/all-position 
| - GET /api/mix/v1/account/accountBill | - GET /api/v2/mix/account/bill 
| - GET /api/mix/v1/account/accountBusinessBill | - GET /api/v2/mix/account/bill 
| - GET /api/mix/v1/market/index | - GET /api/v2/mix/market/symbol-price 
| - GET /api/mix/v1/market/mark-price | - GET /api/v2/mix/market/symbol-price 
| - GET /api/mix/v1/market/contracts | - GET /api/v2/mix/market/contracts 
| - GET /api/mix/v1/market/symbol-leverage | - GET /api/v2/mix/market/contracts 
| - GET /api/mix/v1/market/open-limit | - GET /api/v2/mix/market/contracts 
| - POST /api/mix/v1/plan/placePlan | - POST /api/v2/mix/order/place-plan-order 
| - POST /api/mix/v1/plan/placeTrailStop | - POST /api/v2/mix/order/place-plan-order 
| - POST /api/mix/v1/plan/modifyPlan | - POST /api/v2/mix/order/modify-plan-order 
| - POST /api/mix/v1/plan/modifyPlanPreset | - POST /api/v2/mix/order/modify-plan-order 
| - POST /api/mix/v1/plan/cancelPlan | - POST /api/v2/mix/order/cancel-plan-order 
| - POST /api/mix/v1/plan/cancelSymbolPlan | - POST /api/v2/mix/order/cancel-plan-order 
| - POST /api/mix/v1/order/cancel-batch-orders | - POST /api/v2/mix/order/batch-cancel-orders 
| - POST /api/mix/v1/order/cancel-all-orders | - POST /api/v2/mix/order/batch-cancel-orders 
| - POST /api/mix/v1/order/cancel-symbol-orders | - POST /api/v2/mix/order/batch-cancel-orders 
| - GET /api/mix/v1/order/current | - GET /api/v2/mix/order/orders-pending 
| - GET /api/mix/v1/order/marginCoinCurrent | - GET /api/v2/mix/order/orders-pending 
| - GET /api/mix/v1/order/history | - GET api/v2/mix/order/orders-history 
| - GET /api/mix/v1/order/historyProductType | - GET api/v2/mix/order/orders-history 
| - GET /api/mix/v1/order/fills | - GET /api/v2/mix/order/fills 
| - GET /api/mix/v1/order/allFills | - GET /api/v2/mix/order/fills 
| - POST /api/mix/v1/order/placeOrder | - POST /api/v2/mix/order/place-order 
| - POST /api/mix/v1/order/placeOrder | - POST /api/v2/mix/order/click-backhand 
| - POST /api/mix/v1/order/batch-orders | - POST /api/v2/mix/order/batch-place-order 
| - POST /api/mix/v1/order/cancel-order | - POST /api/v2/mix/order/cancel-order 
| - POST /api/mix/v1/order/modifyOrder | - POST /api/v2/mix/order/modify-order 
| - POST /api/mix/v1/order/close-all-positions | - POST /api/v2/mix/order/close-positions 
| - GET /api/mix/v1/order/detail | - GET /api/v2/mix/order/detail 
| N/A | - GET /api/v2/mix/order/orders-plan-pending 
| N/A | - GET /api/v2/mix/order/orders-plan-history 

### Margin[​](#margin "Direct link to Margin")

| V1 Endpoint | V2 Endpoint |
| :-- | :-- |
| - GET /api/margin/v1/cross/public/interestRateAndLimit | - GET /api/v2/margin/cross/interest-rate-and-limit 
| - GET /api/margin/v1/isolated/public/interestRateAndLimit | - GET /api/v2/margin/isolated/interest-rate-and-limit 
| - GET /api/margin/v1/cross/public/tierData | - GET /api/v2/margin/cross/tier-data 
| - GET /api/margin/v1/isolated/public/tierData | - GET /api/v2/margin/isolated/tier-data 
| - GET /api/margin/v1/public/currencies | - GET /api/v2/margin/currencies 
| - GET /api/margin/v1/cross/account/assets | - GET /api/v2/margin/cross/account/assets 
| - GET /api/margin/v1/isolated/account/assets | - GET /api/v2/margin/isolated/account/assets 
| - POST /api/margin/v1/cross/account/borrow | - POST /api/v2/margin/cross/account/borrow 
| - POST /api/margin/v1/isolated/account/borrow | - POST /api/v2/margin/isolated/account/borrow 
| - POST /api/margin/v1/cross/account/repay | - POST /api/v2/margin/cross/account/repay 
| - GET /api/margin/v1/isolated/account/repay | - POST /api/v2/margin/cross/account/repay 
| - GET /api/margin/v1/cross/account/riskRate | - GET /api/v2/margin/cross/account/risk-rate 
| - POST /api/margin/v1/isolated/account/riskRate | - GET /api/v2/margin/cross/account/risk-rate 
| - POST /api/margin/v1/cross/account/maxBorrowableAmount | - GET /api/v2/margin/cross/account/max-borrowable-amount 
| - GET /api/margin/v1/isolated/account/maxBorrowableAmount | - GET /api/v2/margin/isolated/account/max-borrowable-amount 
| - GET /api/margin/v1/cross/account/maxTransferOutAmount | - GET /api/v2/margin/cross/account/max-transfer-out-amount 
| - GET /api/margin/v1/isolated/account/maxTransferOutAmount | - GET /api/v2/margin/isolated/account/max-transfer-out-amount 
| - POST /api/margin/v1/isolated/account/flashRepay | - POST /api/v2/margin/isolated/account/flash-repay 
| - POST /api/margin/v1/isolated/account/queryFlashRepayStatus | - POST /api/v2/margin/isolated/account/query-flash-repay-status 
| - POST /api/margin/v1/cross/account/flashRepay | - POST /api/v2/margin/cross/account/flash-repay 
| - POST /api/margin/v1/cross/account/queryFlashRepayStatus | - POST /api/v2/margin/cross/account/flash-repay-status 
| - POST /api/margin/v1/isolated/order/placeOrder | - POST /api/v2/margin/isolated/place-order 
| - POST /api/margin/v1/isolated/order/batchPlaceOrder | - POST /api/v2/margin/isolated/batch-place-order 
| - POST /api/margin/v1/isolated/order/cancelOrder | - POST /api/v2/margin/isolated/cancel-order 
| - POST /api/margin/v1/isolated/order/batchCancelOrder | - POST /api/v2/margin/isolated/batch-cancel-order 
| - GET /api/margin/v1/isolated/order/openOrders | - GET /api/v2/margin/isolated/open-orders 
| - GET /api/margin/v1/isolated/order/history | - GET /api/v2/margin/isolated/history-orders 
| - GET /api/margin/v1/isolated/order/fills | - GET /api/v2/margin/isolated/fills 
| - GET /api/margin/v1/isolated/loan/list | - GET /api/v2/margin/isolated/borrow-history 
| - GET /api/margin/v1/isolated/repay/list | - GET /api/v2/margin/isolated/repay-history 
| - GET /api/margin/v1/isolated/interest/list | - GET /api/v2/margin/isolated/interest-history 
| - GET /api/margin/v1/isolated/liquidation/list | - GET /api/v2/margin/isolated/liquidation-history 
| - GET /api/margin/v1/isolated/fin/list | - GET /api/v2/margin/isolated/financial-records 
| - POST /api/margin/v1/cross/order/placeOrder | - POST /api/v2/margin/cross/place-order 
| - POST /api/margin/v1/cross/order/batchPlaceOrder | - POST /api/v2/margin/cross/batch-place-order 
| - POST /api/margin/v1/cross/order/cancelOrder | - POST /api/v2/margin/cross/cancel-order 
| - POST /api/margin/v1/cross/order/batchCancelOrder | - POST /api/v2/margin/cross/batch-cancel-order 
| - GET /api/margin/v1/cross/order/openOrders | - GET /api/v2/margin/cross/open-orders 
| - GET /api/margin/v1/cross/order/history | - GET /api/v2/margin/cross/history-orders 
| - GET /api/margin/v1/cross/order/fills | - GET /api/v2/margin/cross/fills 
| - GET /api/margin/v1/cross/loan/list | - GET /api/v2/margin/cross/borrow-history 
| - GET /api/margin/v1/cross/repay/list | - GET /api/v2/margin/cross/repay-history 
| - GET /api/margin/v1/cross/interest/list | - GET /api/v2/margin/cross/interest-history 
| - GET /api/margin/v1/cross/liquidation/list | - GET /api/v2/margin/cross/liquidation-history 
| - GET /api/margin/v1/cross/fin/list | - GET /api/v2/margin/cross/financial-records 

### Broker[​](#broker "Direct link to Broker")

| V1 Endpoint | V2 Endpoint |
| :-- | :-- |
| - GET /api/broker/v1/account/info | - GET /api/v2/broker/account/info 
| - POST /api/broker/v1/account/sub-create | - POST /api/v2/broker/account/create-subaccount 
| - GET /api/broker/v1/account/sub-list | - GET /api/v2/broker/account/subaccount-list 
| - POST /api/broker/v1/account/sub-modify | - POST /api/v2/broker/account/modify-subaccount 
| - POST /api/broker/v1/account/sub-modify-email | - POST /api/v2/broker/account/modify-subaccount-email 
| - GET /api/broker/v1/account/sub-email | - GET /api/v2/broker/account/subaccount-email 
| - GET /api/broker/v1/account/sub-spot-assets | - GET /api/v2/broker/account/subaccount-spot-assets 
| - GET /api/broker/v1/account/sub-future-assets | - GET /api/v2/broker/account/subaccount-future-assets 
| - POST /api/broker/v1/account/sub-address | - POST /api/v2/broker/account/subaccount-address 
| - POST /api/broker/v1/account/sub-withdrawal | - POST /api/v2/broker/account/subaccount-withdrawal 
| - POST /api/broker/v1/account/sub-auto-transfer | - POST /api/v2/broker/account/set-subaccount-autotransfer 
| - POST /api/broker/v1/manage/sub-api-create | - POST /api/v2/broker/manage/create-subaccount-apikey 
| - GET /api/broker/v1/manage/sub-api-list | - GET /api/v2/broker/manage/subaccount-apikey-list 
| - POST /api/broker/v1/manage/sub-api-modify | - POST /api/v2/broker/manage/modify-subaccount-apikey 

### Future Copy Trading[​](#future-copy-trading "Direct link to Future Copy Trading")

| V1 Endpoint | V2 Endpoint |
| :-- | :-- |
| - POST /api/mix/v1/trace/closeTrackOrder | - POST /api/v2/copy/mix-trader/order-close-positions 
| - POST /api/mix/v1/trace/closeTrackOrderBySymbol | - POST /api/v2/copy/mix-trader/order-close-positions 
| - GET /api/mix/v1/trace/currentTrack | - GET /api/v2/copy/mix-trader/order-current-track 
| - GET /api/mix/v1/trace/historyTrack | - GET /api/v2/copy/mix-trader/order-history-track 
| - POST /api/mix/v1/trace/modifyTPSL | - POST /api/v2/copy/mix-trader/order-modify-tpsl 
| - GET /api/mix/v1/trace/traderDetail | - GET /api/v2/copy/mix-trader/order-total-detail 
| - GET /api/mix/v1/trace/summary | - GET /api/v2/copy/mix-trader/profit-summarys 
| - GET /api/mix/v1/trace/profitSettleTokenIdGroup | - GET /api/v2/copy/mix-trader/profit-summarys 
| - GET /api/mix/v1/trace/profitDateList | - GET /api/v2/copy/mix-trader/profit-hisotry-details 
| - GET /api/mix/v1/trace/waitProfitDateList | - GET /api/v2/copy/mix-trader/profit-details 
| - GET /api/mix/v1/trace/profitDateGroupList | - GET /api/v2/copy/mix-trader/profits-group-coin-date 
| - GET /api/mix/v1/trace/traderSymbols | - GET /api/v2/copy/mix-trader/config-query-symbols 
| - POST /api/mix/v1/trace/queryTraderTpslRatioConfig | - GET /api/v2/copy/mix-trader/config-query-symbols 
| - POST /api/mix/v1/trace/setUpCopySymbols | - POST /api/v2/copy/mix-trader/config-setting-symbols 
| - POST /api/mix/v1/trace/traderUpdateTpslRatioConfig | - POST /api/v2/copy/mix-trader/config-setting-symbols 
| - POST /api/mix/v1/trace/traderUpdateConfig | - POST /api/v2/copy/mix-trader/config-settings-base 
| - GET /api/mix/v1/trace/myFollowerList | - GET /api/v2/copy/mix-trader/config-query-followers 
| - POST /api/mix/v1/trace/removeFollower | - POST /api/v2/copy/mix-trader/config-remove-follower 
| - POST /api/mix/v1/trace/followerCloseByTrackingNo | - POST /api/v2/copy/mix-follower/close-positions 
| - POST /api/mix/v1/trace/followerCloseByAll | - POST /api/v2/copy/mix-follower/close-positions 
| - GET /api/mix/v1/trace/followerOrder | - GET /api/v2/copy/mix-follower/query-current-orders 
| - GET /api/mix/v1/trace/followerHistoryOrders | - GET /api/v2/copy/mix-follower/query-history-orders 
| - POST /api/mix/v1/trace/followerSetTpsl | - POST /api/v2/copy/mix-follower/setting-tpsl 
| - GET /api/mix/v1/trace/queryTraceConfig | - GET /api/v2/copy/mix-follower/query-settings 
| - GET /api/mix/v1/trace/public/getFollowerConfig | - GET /api/v2/copy/mix-follower/query-quantity-limit 
| - POST /api/mix/v1/trace/followerSetBatchTraceConfig | - POST /api/v2/copy/mix-follower/settings 
| - POST /api/mix/v1/trace/cancelCopyTrader | - POST /api/v2/copy/mix-follower/cancel-trader 
| - GET /api/mix/v1/trace/myTraderList | - GET /api/v2/copy/mix-follower/query-traders 
| - GET /api/mix/v1/trace/traderList | - GET /api/v2/copy/mix-broker/query-traders 
| - GET /api/mix/v1/trace/report/order/historyList | - GET /api/v2/copy/mix-broker/query-history-traces 
| - GET /api/mix/v1/trace/report/order/currentList | - GET /api/v2/copy/mix-broker/query-current-traces 

### Spot Copy Trading[​](#spot-copy-trading "Direct link to Spot Copy Trading")

| V1 Endpoint | V2 Endpoint |
| :-- | :-- |
| - POST /api/spot/v1/trace/profit/totalProfitInfo | - GET /api/v2/copy/spot-trader/profit-summarys 
| - POST /api/spot/v1/trace/profit/totalProfitList | - GET /api/v2/copy/spot-trader/profit-summarys 
| - POST /api/spot/v1/trace/profit/profitHisList | - GET /api/v2/copy/spot-trader/profit-summarys 
| - POST /api/spot/v1/trace/profit/profitHisDetailList | - GET /api/v2/copy/spot-trader/profit-hisotry-details 
| - POST /api/spot/v1/trace/profit/waitProfitDetailList | - GET /api/v2/copy/spot-trader/profit-details 
| - POST /api/spot/v1/trace/order/orderCurrentList | - GET /api/v2/copy/spot-trader/order-current-track 
| - POST /api/spot/v1/trace/order/orderHistoryList | - GET /api/v2/copy/spot-trader/order-history-track 
| - POST /api/spot/v1/trace/order/updateTpsl | - POST /api/v2/copy/spot-trader/order-modify-tpsl 
| - POST /api/spot/v1/trace/order/closeTrackingOrder | - POST /api/v2/copy/spot-trader/order-close-tracking 
| - POST /api/spot/v1/trace/user/getTraderInfo | - GET /api/v2/copy/spot-trader/order-total-detail 
| - POST /api/spot/v1/trace/config/getTraderSettings | - GET /api/v2/copy/spot-trader/config-query-settings 
| - POST /api/spot/v1/trace/order/spotInfoList | - GET /api/v2/copy/spot-trader/config-query-settings 
| - POST /api/spot/v1/trace/config/getRemoveFollowerConfig | - GET /api/v2/copy/spot-trader/config-query-settings 
| - POST /api/spot/v1/trace/user/myFollowers | - GET /api/v2/copy/spot-trader/config-query-followers 
| - POST /api/spot/v1/trace/config/setProductCode | - POST /api/v2/copy/spot-trader/config-setting-symbols 
| - POST /api/spot/v1/trace/user/removeFollower | - POST /api/v2/copy/spot-trader/config-remove-follower 
| N/A | - GET /api/v2/copy/spot-follower/query-current-orders 
| N/A | - GET /api/v2/copy/mix-follower/query-history-orders 
| N/A | - POST /api/v2/copy/spot-follower/setting-tpsl 
| N/A | - POST /api/v2/copy/spot-follower/order-close-tracking 
| - POST /api/spot/v1/trace/config/getFollowerSettings | - GET /api/v2/copy/spot-follower/query-settings 
| - POST /api/spot/v1/trace/user/myTraders | - GET /api/v2/copy/spot-follower/query-traders 
| - POST /api/spot/v1/trace/config/setFollowerConfig | - POST /api/v2/copy/spot-follower/settings 
| - POST /api/spot/v1/trace/user/removeTrader | - POST /api/v2/copy/spot-follower/cancel-trader 
| - POST /api/spot/v1/trace/order/followerEndOrder | - POST /api/v2/copy/spot-follower/stop-order 
| N/A | - GET /api/v2/copy/spot-follower/query-trader-symbols

# Changelog

## \[Apr 10,2025\] Adjustment to virtual sub-account API key related endpoints[​](#apr-102025-adjustment-to-virtual-sub-account-api-key-related-endpoints "Direct link to apr-102025-adjustment-to-virtual-sub-account-api-key-related-endpoints")

Interface：/api/v2/user/create-virtual-subaccount-apikey，/api/v2/user/modify-virtual-subaccount-apikey，/api/v2/user/virtual-subaccount-apikey-list

Changes：

*   The `permList` parameter in the create, modify, and query sub-account API key interfaces now includes the `transfer`: wallet transfer permission.
*   The modify and query sub-account API key interfaces now support regular sub-accounts

## \[Apr 10,2025\] Added new field `offTime` in the response of Get Spot Symbol Info interface[​](#apr-102025-added-new-field-offtime-in-the-response-of-get-spot-symbol-info-interface "Direct link to apr-102025-added-new-field-offtime-in-the-response-of-get-spot-symbol-info-interface")

Interface：/api/v2/spot/public/symbols

Changes:

*   Added new field `offTime` in the response
*   minTradeAmount & maxTradeAmount will be adjusted to 0, please ignore these two response parameters.

## \[Apr 09, 2025\] Added ADL ranking interface.[​](#apr-09-2025-added-adl-ranking-interface "Direct link to apr-09-2025-added-adl-ranking-interface")

Endpoints：/api/v2/mix/position/adlRank  
Additional content：

*   Supports obtaining ADL rankings for users across various trading pairs.

## \[Apr 08, 2025\] Added APIs for new order initiator key creation & follower order setup.[​](#apr-08-2025-added-apis-for-new-order-initiator-key-creation--follower-order-setup "Direct link to apr-08-2025-added-apis-for-new-order-initiator-key-creation--follower-order-setup")

Endpoints：/api/v2/copy/mix-trader/create-copy-api  
Additional content：

*   New version interface for order initiators to create order API keys.

Endpoints：/api/v2/copy/mix-follower/copy-settings  
Additional content：

*   New version interface for follower order-following setup.

## \[Apr 02, 2025\] Adjustment of input parameters for estimated interest and loanable amount[​](#apr-02-2025-adjustment-of-input-parameters-for-estimated-interest-and-loanable-amount "Direct link to apr-02-2025-adjustment-of-input-parameters-for-estimated-interest-and-loanable-amount")

Endpoints：/api/v2/earn/loan/public/hour-interest, /api/v2/earn/loan/borrow

*   Additional content： Adjust the input parameter for the daily to  
    `SEVEN`: 7 days  
    `THIRTY`: 30 days  
    `FLEXIBLE`: Flexible

## \[Mar 27, 2025\] Updates include new fields in futures contract & funding rate interfaces' return values, and adjusted input params for spot transaction details.[​](#mar-27-2025-updates-include-new-fields-in-futures-contract--funding-rate-interfaces-return-values-and-adjusted-input-params-for-spot-transaction-details "Direct link to mar-27-2025-updates-include-new-fields-in-futures-contract--funding-rate-interfaces-return-values-and-adjusted-input-params-for-spot-transaction-details")

Endpoints：/api/v2/mix/account/accounts  
Additional content：

*   The return value of the futures contract account interface has been updated with a new field `available`, which represents the maximum transferable amount of combined margin in the current currency.

Endpoints：/api/v2/mix/market/current-fund-rate  
Additional content：

*   The return value of the interface for obtaining the current funding rate has been updated with new parameters, including fundingRateInterval, upper and lower limits of funding rate, and next update time.

Endpoints：/api/v2/spot/trade/fills  
Changes content：

*   The `symbol` in the request parameters has been changed from required to optional.

## \[Mar 22, 2025\] New Response Fields in Futures Account Channel[​](#mar-22-2025-new-response-fields-in-futures-account-channel "Direct link to mar-22-2025-new-response-fields-in-futures-account-channel")

Channel: Futures - Private Channel - Account Channel  
Change: Add "crossedRiskRate"(Risk ratio in cross margin mode) and "unrealizedPL"(Unrealized PnL) in push data

## \[Mar 20,2025\] For Spot get order information endpoints, it is adjusted to only support to get the order data within 2 hours when queried by `clientOid`[​](#mar-202025-for-spot-get-order-information-endpoints-it-is-adjusted-to-only-support-to-get-the-order-data-within-2-hours-when-queried-by-clientoid "Direct link to mar-202025-for-spot-get-order-information-endpoints-it-is-adjusted-to-only-support-to-get-the-order-data-within-2-hours-when-queried-by-clientoid")

Endpoints: Spot get order info interfaces  
Change: Querying order information based on `ClientOid` only supports to get the data within last 2 hours.

## \[Mar 18,2025\] Adjust the input parameter instructions for modifying the ApiKey permissions of a sub-account.[​](#mar-182025-adjust-the-input-parameter-instructions-for-modifying-the-apikey-permissions-of-a-sub-account "Direct link to mar-182025-adjust-the-input-parameter-instructions-for-modifying-the-apikey-permissions-of-a-sub-account")

**Endpoints:** ：/api/v2/broker/manage/modify-subaccount-apikey  
Changes content：

*   Modify the sub-account ApiKey permissions: The input parameter permType (permission type) has been changed to a required field.

## \[Mar 12,2025\] Adjustment to the period input parameter for obtaining contract initiative buying and selling volume information.[​](#mar-122025-adjustment-to-the-period-input-parameter-for-obtaining-contract-initiative-buying-and-selling-volume-information "Direct link to mar-122025-adjustment-to-the-period-input-parameter-for-obtaining-contract-initiative-buying-and-selling-volume-information")

**Endpoints:** ：/api/v2/mix/market/long-short  
Changes content：

*   Change the input parameter period field from `1d` to `1Dutc`.

## \[Mar 11,2025\] API for new OI position limit information in contracts[​](#mar-112025-api-for-new-oi-position-limit-information-in-contracts "Direct link to mar-112025-api-for-new-oi-position-limit-information-in-contracts")

**Endpoints:** ：/api/v2/mix/market/oi-limit  
Additional content：

*   API for new OI position limit information in contracts

## \[Feb 19,2025\] Add a description for instId in the public channel for Margin.[​](#feb-192025-add-a-description-for-instid-in-the-public-channel-for-margin "Direct link to feb-192025-add-a-description-for-instid-in-the-public-channel-for-margin")

Changes content：

*   Add a description for instId in the public channel for Margin. Only supports：`default`

## \[Feb 18,2025\] Add the userId response field to the broker sub-account recharge records.[​](#feb-182025-add-the-userid-response-field-to-the-broker-sub-account-recharge-records "Direct link to feb-182025-add-the-userid-response-field-to-the-broker-sub-account-recharge-records")

**Endpoints:** ：/api/v2/broker/subaccount-deposit  
Changes content：

*   Add the userId response field to the broker sub-account recharge records.

## \[Feb 07,2025\] Add instructions for using the classic account simulation environment.[​](#feb-072025-add-instructions-for-using-the-classic-account-simulation-environment "Direct link to feb-072025-add-instructions-for-using-the-classic-account-simulation-environment")

Additional content：

*   Instructions for subscribing to simulation environment messages via Websocket.
*   Instructions for using RestApi to conduct API trading in the simulation environment.

## \[Feb 03,2025\] New addition to futures error codes:[​](#feb-032025-new-addition-to-futures-error-codes "Direct link to feb-032025-new-addition-to-futures-error-codes")

Additional content:

*   New contract error `code 22067` has been added, meaning: "Operations are prohibited during ADL processing."

## \[Jan 16,2025\] The futures contract financial record has added an enumeration for the futureTaxType parameter.[​](#jan-162025-the-futures-contract-financial-record-has-added-an-enumeration-for-the-futuretaxtype-parameter "Direct link to jan-162025-the-futures-contract-financial-record-has-added-an-enumeration-for-the-futuretaxtype-parameter")

**Endpoints:** ：/api/v2/tax/future-record  
Additional content:

*   Add the enumeration type and description for the return value parameter `futureTaxType`

## \[Jan 15,2025\] Bitget to adjust the calculation of USDC-M perpetual futures index price from USD to USDC[​](#jan-152025-bitget-to-adjust-the-calculation-of-usdc-m-perpetual-futures-index-price-from-usd-to-usdc "Direct link to jan-152025-bitget-to-adjust-the-calculation-of-usdc-m-perpetual-futures-index-price-from-usd-to-usdc")

Key adjustments

*   Index price and mark price: The index price and mark price of USDC-M perpetual futures will now be denominated in USDC.
*   Order book prices: Order book prices for USDC-M perpetual futures will also be denominated in USDC.

For more details, please refer to: [https://www.bitget.com/support/articles/12560603820643](https://www.bitget.com/support/articles/12560603820643)

## \[Dec 24,2024\] The rate limit change on Convert endpoint[​](#dec-242024-the-rate-limit-change-on-convert-endpoint "Direct link to dec-242024-the-rate-limit-change-on-convert-endpoint")

/api/v2/convert/trade, The rate limit is changed from 10 req/sec/UID to 5 req/sec/UID

## \[Dec 16,2024\] Get Spot TransferRecords endpoint adjust parameters[​](#dec-162024-get-spot-transferrecords-endpoint-adjust-parameters "Direct link to dec-162024-get-spot-transferrecords-endpoint-adjust-parameters")

Endpoints: Get Account Transfer Records Change: The "idLessThan" parameter for the spot account transfer record interface has been deprecated, and a new "pageNum" parameter has been added.

## \[Nov 22,2024\] Websocket connection limit update[​](#nov-222024-websocket-connection-limit-update "Direct link to nov-222024-websocket-connection-limit-update")

**Connection instructions**:  
**Connection limit**: 300 connection requests/IP/5min, Max 100 connections/IP  
**Subscription limit**: 240 subscription requests/Hour/connection, Max 1000 channel subscription/connection

If there’s a network problem, the system will automatically disconnect the connection.

To keep the connection stable:

1.  **Websocket will be forcibly disconnected every 24 hours, please add the reconnection mechanism in your code**
2.  Users set a 30 seconds timer to a send string "ping", and expect a string "pong" as response. If no string "pong" received, please reconnect
3.  Websocket server will disconnect the connection if there is no string "ping" received for 2 min
4.  The Websocket server accepts up to 10 messages per second. The message includes:

*   String "ping"
*   JSON message, such as subscribe, unsubscribe.

5.  If the user sends more messages than the limit, the connection will be disconnected. The IP which is repeatedly disconnected may be blocked by the server
6.  We highly recommend you to subscribe **less than 50 channels in one connection**. The connections with less channel subscriptions will be more stable.

## \[Oct 17,2024\] The update on calculation method for the `change24h` field in the Futrues and SPOT ticker interfaces[​](#oct-172024-the-update-on-calculation-method-for-the-change24h-field-in-the-futrues-and-spot-ticker-interfaces "Direct link to oct-172024-the-update-on-calculation-method-for-the-change24h-field-in-the-futrues-and-spot-ticker-interfaces")

**Endpoints:**

*   /api/v2/spot/market/tickers, SPOT Get Ticker Information
*   /api/v2/mix/market/ticker, Futures Get Single Ticker
*   /api/v2/mix/market/tickers, Futures Get All Tickers

**Change:**  
The calculation of the `change24h` field in the API response will change from the price fluctuation from 00:00 in the UTC+8 time zone to the current time, to the price fluctuation over the past 24 hours from the current time.

## \[Sep 24,2024\] The APIs for USDT-M Futures Multi-assets Mode requirements have been launched.[​](#sep-242024-the-apis-for-usdt-m-futures-multi-assets-mode-requirements-have-been-launched "Direct link to sep-242024-the-apis-for-usdt-m-futures-multi-assets-mode-requirements-have-been-launched")

Endpoints: APIs for USDT-M Futures Multi-assets Mode

## \[Aug 28,2024\] Get Merchant Advertisement List endpoint Adjust the maximum value of the 'limit' parameter to 20[​](#aug-282024-get-merchant-advertisement-list-endpoint-adjust-the-maximum-value-of-the-limit-parameter-to-20 "Direct link to aug-282024-get-merchant-advertisement-list-endpoint-adjust-the-maximum-value-of-the-limit-parameter-to-20")

Endpoints: Get Merchant Advertisement List Change: Adjust the maximum value of the 'limit' parameter to 20

## \[Aug 15,2024\] API rate limit adjustment[​](#aug-152024-api-rate-limit-adjustment "Direct link to aug-152024-api-rate-limit-adjustment")

| Endpoints | Old rate limit | New rate limit |
| --- | --- | --- |
| /api/v2/copy/mix-trader/order-close-positions | 10 req/sec/UID | 5 req/sec/UID 
| /api/v2/copy/mix-trader/order-current-track | 10 req/sec/UID | 5 req/sec/UID 
| /api/v2/copy/mix-follower/query-current-orders | 10 req/sec/UID | 5 req/sec/UID 
| /api/v2/copy/mix-follower/query-history-orders | 20 req/sec/UID | 5 req/sec/UID 
| /api/v2/copy/mix-trader/order-history-track | 10 req/sec/UID | 5 req/sec/UID 
| /api/v2/copy/mix-trader/profits-group-coin-date | 20 req/sec/UID | 5 req/sec/UID 
| /api/v2/copy/mix-trader/profit-history-summarys | 20 req/sec/UID | 5 req/sec/UID 
| /api/v2/copy/mix-trader/profit-history-details | 20 req/sec/UID | 5 req/sec/UID 
| /api/v2/copy/mix-trader/profit-details | 20 req/sec/UID | 5 req/sec/UID 
| /api/v2/copy/mix-trader/order-modify-tpsl | 10 req/sec/UID | 5 req/sec/UID 
| /api/v2/copy/mix-trader/order-total-detail | 10 req/sec/UID | 5 req/sec/UID 
| /api/v2/copy/mix-broker/query-traders | 10 req/sec/UID | 5 req/sec/UID 
| /api/v2/copy/mix-follower/settings | 10 req/sec/UID | 5 req/sec/UID 
| /api/v2/copy/mix-follower/close-positions | 10 req/sec/UID | 5 req/sec/UID 
| /api/v2/copy/mix-follower/setting-tpsl | 20 req/sec/UID | 5 req/sec/UID 
| /api/v2/copy/mix-follower/query-settings | 10 req/sec/UID | 5 req/sec/UID 
| /api/v2/copy/mix-follower/cancel-trader | 10 req/sec/UID | 5 req/sec/UID 
| /api/v2/copy/mix-trader/config-settings-base | 10 req/sec/UID | 5 req/sec/UID 
| /api/v2/copy/mix-follower/query-traders | 10 req/sec/UID | 5 req/sec/UID 
| /api/v2/copy/mix-trader/config-query-followers | 10 req/sec/UID | 5 req/sec/UID 
| /api/v2/copy/mix-trader/config-remove-follower | 10 req/sec/UID | 5 req/sec/UID 
| /api/v2/copy/mix-trader/config-query-symbols | 20 req/sec/UID | 5 req/sec/UID 
| /api/v2/copy/mix-trader/config-setting-symbols | 10 req/sec/UID | 5 req/sec/UID 
| /api/v2/copy/mix-broker/query-history-traces | 10 req/sec/UID | 5 req/sec/UID 
| /api/v2/spot/trade/batch-cancel-plan-order | 10 req/sec/UID | 5 req/sec/UID 
| /api/v2/spot/account/deduct-info | 10 req/sec/UID | 5 req/sec/UID 
| /api/v2/copy/spot-follower/query-current-orders | 10 req/sec/UID | 5 req/sec/UID 
| /api/v2/copy/spot-follower/query-settings | 10 req/sec/UID | 5 req/sec/UID 
| /api/v2/copy/spot-follower/query-history-orders | 10 req/sec/UID | 5 req/sec/UID 
| /api/v2/copy/spot-follower/query-traders | 10 req/sec/UID | 5 req/sec/UID 
| /api/v2/copy/spot-trader/config-query-settings | 10 req/sec/UID | 5 req/sec/UID 
| /api/v2/copy/spot-trader/order-history-track | 10 req/sec/UID | 5 req/sec/UID 
| /api/v2/copy/spot-trader/profit-summarys | 10 req/sec/UID | 5 req/sec/UID 
| /api/v2/copy/spot-trader/profit-history-details | 10 req/sec/UID | 5 req/sec/UID 
| /api/v2/copy/spot-trader/profit-details | 10 req/sec/UID | 5 req/sec/UID 
| /api/v2/copy/spot-trader/order-total-detail | 10 req/sec/UID | 5 req/sec/UID 
| /api/v2/user/virtual-subaccount-apikey-list | 10 req/sec/UID | 5 req/sec/UID 
| /api/v2/broker/account/subaccount-withdrawal | 10 req/sec/UID | 1 req/sec/UID 
| /api/v2/spot/account/switch-deduct | 10 req/sec/UID | 1 req/sec/UID 
| /api/v2/copy/spot-follower/order-close-tracking | 10 req/sec/UID | 1 req/sec/UID 
| /api/v2/copy/spot-follower/cancel-trader | 10 req/sec/UID | 1 req/sec/UID 
| /api/v2/copy/spot-follower/stop-order | 10 req/sec/UID | 1 req/sec/UID 
| /api/v2/copy/spot-follower/settings | 10 req/sec/UID | 1 req/sec/UID 
| /api/v2/copy/spot-follower/setting-tpsl | 10 req/sec/UID | 1 req/sec/UID 
| /api/v2/copy/spot-trader/order-close-tracking | 10 req/sec/UID | 1 req/sec/UID 
| /api/v2/copy/spot-trader/config-setting-symbols | 10 req/sec/UID | 1 req/sec/UID 
| /api/v2/copy/spot-trader/config-remove-follower | 10 req/sec/UID | 1 req/sec/UID 
| /api/v2/copy/spot-trader/order-modify-tpsl | 10 req/sec/UID | 1 req/sec/UID 

## \[Jul 03,2024\] Withdrawal and get deposit addresses supports Bitcoin Lightning Network[​](#jul-032024-withdrawal-and-get-deposit-addresses-supports-bitcoin-lightning-network "Direct link to jul-032024-withdrawal-and-get-deposit-addresses-supports-bitcoin-lightning-network")

Endpoints: Withdraw, Get Deposit Address, Get SubAccount Deposit Address Change: Get the deposit address to support obtaining the Bitcoin Lightning Network invoice address, and the withdrawal endpoint supports withdrawal from the Bitcoin Lightning Network invoice address

## \[Jun 25,2024\] Adjustment on Get P2P Merchant List Interface[​](#jun-252024-adjustment-on-get-p2p-merchant-list-interface "Direct link to jun-252024-adjustment-on-get-p2p-merchant-list-interface")

Parameter `merchantId` has been removed from **Get P2P Merchant List** Interface

## \[Mar 15,2024\] Adjustment on the time range for Get History Trigger Order[​](#mar-152024-adjustment-on-the-time-range-for-get-history-trigger-order "Direct link to mar-152024-adjustment-on-the-time-range-for-get-history-trigger-order")

Endpoint: Get History Trigger Order

1.  The interval between `startTime` and `endTime` has been limited to 90 days
2.  Only historical records within the past 90 days are supported.

## \[Feb 6,2023\] Add `newSize` field in the push parameters of Spot Order Channel for Websocket[​](#feb-62023-add-newsize-field-in-the-push-parameters-of-spot-order-channel-for-websocket "Direct link to feb-62023-add-newsize-field-in-the-push-parameters-of-spot-order-channel-for-websocket")

The spot order channel push now includes a new parameter `newSize`, which will gradually replace the existing parameter `size` in subsequent updates.

`newSize` represents the order quantity, following the specified rules:

*   when `orderType=limit`, `newSize` represents the quantity of base coin,
*   when `orderType=market`and`side=buy`, `newSize` represents the quantity of quote coin,
*   when `orderType=market`and`side=sell`, `newSize` represents the quantity of base coin.

## \[Jan 19,2024\] Adjustment on the time range for tax endpoints per request[​](#jan-192024-adjustment-on-the-time-range-for-tax-endpoints-per-request "Direct link to jan-192024-adjustment-on-the-time-range-for-tax-endpoints-per-request")

Endpoints: Spot Transaction Records, Futures Transaction Records, Margin Transaction Records, P2P Transaction Records Change: The interval between `startTime` and `endTime` has been adjusted from one year to 30 days

## \[Dec 27,2023\] Adjustment for the withdrawal of Broker's sub-account[​](#dec-272023-adjustment-for-the-withdrawal-of-brokers-sub-account "Direct link to dec-272023-adjustment-for-the-withdrawal-of-brokers-sub-account")

The request param `dest` no longer supports the input `internal_transfer`.  
The request param `toType` has been removed.

## \[Nov 16,2023\] Add 'errorCode' field in batch-cancel-orders response[​](#nov-162023-add-errorcode-field-in-batch-cancel-orders-response "Direct link to nov-162023-add-errorcode-field-in-batch-cancel-orders-response")

Added a new response parameter, errorCode, to the batch cancel order endpoint.

# Quick Start

## Access Preparation[​](#access-preparation "Direct link to Access Preparation")

If you need to use the API, please log in to the [web page](javascript:;), then apply the API key application and complete the permission configuration, and then develop and trade according to the details of this document.

You can click [API Key Management](javascript:;) to create an API Key after login.

Each UID can create 10 Api Keys, and each Api Key can set permissions as read only or read/write.

The permissions are described as follows:

*   Read-Only permission: Read permission authorized to query data, such as market data.
*   Trade permission: Transaction permission authorized to call the interface of placing and cancelling orders.
*   Transfer permission: With this permission it authorized to transfer coins between accounts.
*   Withdraw permission: Authorized to withdraw assets from Bitget account, `noted that you can only withdraw coins through an whitelisted IP address.`

After successfully created the API key, please remember the following information:

*   `APIKey` The identity of API transactions, generated by a random algorithm.
*   `SecretKey` The private key is randomly generated by the system and used for [Signature](/api-doc/common/signature) generation.
*   `Passphrase` The password is set by the user. It should be noted that if you forgot the Passphrase, it cannot be retrieved back, and the APIKey needs to be recreated.

For security reasons, it is strongly recommended that you bind to an IP address when you create the API key

**Risk Warning**：These three keys are highly related to account security. Please keep in mind DO NOT DISCLOSE **Secretkey and Passphrase** to anyone at any circumstances, even with BitGet employees. Leaking any one of these three keys may cause the loss of your assets. If you find by any chance that the APIKey is compromized, please delete the APIKey as soon as possible.

## Interface Type[​](#interface-type "Direct link to Interface Type")

Interfaces are mainly divided into two types:

*   Public Interface
*   Private Interface

**Public Interface**

The public interface can be used to obtain configuration information and market data. Public requests can be used without authentication.

**Private Interface**

The private interface can be used for order management and account management. Every private request must be [Signed](/api-doc/common/signature).

The private interface will be verified from server side with your API Key info.

## Access Restriction[​](#access-restriction "Direct link to Access Restriction")

This chapter mainly focuses on access restrictions:

*   Rest API will return 429 status when the access exceeds the frequency limit: the request is too frequent.

**Rest API**

The rate limit of interfaces is based on UID or IP. You can get detailed information from the separated API document page.

Frequency limit rules:

1.  The rate limit of each API endpoint is marked on the doc page;
2.  The rate limit of each API interface is calculated independently;
3.  The overall rate limit is 6000/IP/Min

# FAQ

*   Q1： How to get API support?
    
    A : Join our official API support group and our admins will answer your questions. [https://t.me/bitgetOpenapi](https://t.me/bitgetOpenapi)
    
*   Q2: Order parameter `symbol` What should I pass? For example, BTCUSDT\_UMCBL or BTCUSDT ?
    
    A : `BTCUSDT` in 'v2' API, `BTCUSDT_UMCBL` in 'v1' API
    
*   Q3 : What does the WebSocket parameter `instId` pass? For example, BTCUSDT\_UMCBL or BTCUSDT ?
    
    A : `BTCUSDT` or `default`; Please refer to the `symbol` value from [Get Contract Config](/api-doc/contract/market/Get-All-Symbols-Contracts)
    
*   Q4： Deposit Demo Coins in Demo Trading ?
    
    *   A :First please enter the official site for demo trading  
        USDT-M Futures Demo [https://www.bitget.com/futures/usdt/BTCUSDT](https://www.bitget.com/futures/usdt/BTCUSDT) COIN-M Futures Demo [https://www.bitget.com/futures/susd/SBTCSUSD](https://www.bitget.com/futures/susd/SBTCSUSD) USDC-M Futures Demo [https://www.bitget.com/zh-CN/futures/susdc/SBTCSPERP](https://www.bitget.com/zh-CN/futures/susdc/SBTCSPERP)
    
    On the right side under your Asset section, click the deposit buttun below it.  
    Notice:You’ll not be able to claim again if your current assets exceed 1000 SUSDT(SUSDC). You can get up to 1000 SUSDT(SUSDC) every time. You can only claim again 72 hour(s) after your last claim.
    
*   Q5： What are the differences of Trader's minimum open count from normal users ?
    
    *   A :  
        Future Trader's minimum open count Please refer to the response param minOpenCount of this endpoint [Get Copy Trade Symbol Settings](/api-doc/copytrading/future-copytrade/trader/Trader-Get-Config-Query-Symbols)  
        Spot Trader's minimum open count Please refer to the response param minOpenCount of this endpoint [Get Copytrade Configuration](/api-doc/copytrading/spot-copytrade/trader/Config-Query-Settings).
*   Q6： How to get future's maximum order numbers and position numbers ?
    
    *   A : Please refer to the response params maxProductOrderNum maxPositionNum of this endpoint [Get Contract Config](/api-doc/contract/market/Get-All-Symbols-Contracts).
*   Q7： How to know that you are a trader ？
    
    *   A : Please refer to the response param traderType of this endpoint GET /api/v2/spot/account/info.[Get Account Information](/api-doc/spot/account/Get-Account-Info)
*   Q8: I am using a third party server/codes and it is not working. How can I get help?
    
    *   A: Unfortunately, we do not provide troubleshooting support for third party servers or tools, please contact the third party customer service for further assistance. In addition, providing your API keys/keys to any other platform will have portential security risk, and it is up to you to decide whether to use their services. Please note that we do not provide coding related help.
*   Q9: If I forget the passphrase of API key, What should I do?
    
    *   A: The passphrase of API Key can not be modified, please recreate your API Key.
*   Q10: What is the rate limit of API?
    
    *   A: 1. The rate limit of each API endpoint is marked on the doc page;2. The rate limit of each API interface is calculated independently;3. The overall rate limit is 6000/IP/Min
*   Q11: Is there any currency with a different name in the spot market and the future market?
    
    *   A: Yes, currently there are three currencies with this situation. 1.Luna2(Future) — Luna(Spot) 2.ALT(Future) — $ALT(Spot) 3.MEME(Future) — MEMECOIN(Spot)
*   Q12: Which characters are supported for clientOid?
    
    *   A: clientOid supports \[0-9\], \[a-z\],\[A-Z\] and \[-,+,\_,#\], length less than 50

# SDK

We support below languages

| Language | Code Path |
| :-- | :-- |
| <a href="https://github.com/BitgetLimited/v3-bitget-api-sdk/tree/master/bitget-java-sdk-api" target="_blank" rel="noopener noreferrer">Java</a> | Check package <code>com.bitget.openapi.api.v2</code> 
| <a href="https://github.com/BitgetLimited/v3-bitget-api-sdk/tree/master/bitget-python-sdk-api" target="_blank" rel="noopener noreferrer">Python</a> | Check <code>v2</code> 
| <a href="https://github.com/BitgetLimited/v3-bitget-api-sdk/tree/master/bitget-node-sdk-api" target="_blank" rel="noopener noreferrer">NodeJs</a> | Check <code>src/lib/v2</code> 
| <a href="https://github.com/BitgetLimited/v3-bitget-api-sdk/tree/master/bitget-golang-sdk-api" target="_blank" rel="noopener noreferrer">Golang</a> | Check <code>pkg/client/v2</code> 
| <a href="https://github.com/BitgetLimited/v3-bitget-api-sdk/tree/master/bitget-php-sdk-api" target="_blank" rel="noopener noreferrer">PHP</a> | Check <code>src/api/v2</code>

# Signature

## API Verification[​](#api-verification "Direct link to API Verification")

### Initiate a request[​](#initiate-a-request "Direct link to Initiate a request")

The header of all REST requests must contain the following http headers：

*   ACCESS-KEY：API KEY as a string
*   ACCESS-SIGN：Sign with base64 encoding (see [HMAC](/api-doc/common/signature-samaple/hmac) and [RSA](/api-doc/common/signature-samaple/rsa) sample code).
*   ACCESS-TIMESTAMP：Timestamp of your request. Value equals to milliseconds since Epoch.
*   ACCESS-PASSPHRASE：The password you set when created the API KEY.
*   Content-Type：Please set to application/json for all POST request
*   locale: Support language such as: Chinese (zh-CN), English (en-US)

### How to get ACCESS-TIMESTAMP[​](#how-to-get-access-timestamp "Direct link to How to get ACCESS-TIMESTAMP")

*   Java
*   Python
*   Go
*   JS
*   PHP

Long timestamp = System.currentTimeMillis();

import time  
time.time\_ns() / 1000000

import (  
"time"  
)  
int64(time.Now().UnixNano()/1000000)

Math.round(new Date())

microtime(true) \* 1000;

## Generate Signature[​](#generate-signature "Direct link to Generate Signature")

The request header of ACCESS-SIGN is to encrypt **timestamp + method.toUpperCase() + requestPath + "?" + queryString + body** string (+ means string concat) by **HMAC SHA256** algorithm with **secretKey**. and encode the encrypted result through **BASE64**.

### Description of each parameter in the signature[​](#description-of-each-parameter-in-the-signature "Direct link to Description of each parameter in the signature")

*   timestamp：Same as ACCESS-TIMESTAMP request header. Value equals to milliseconds since Epoch.
*   method：Request method (POST/GET), all uppercase.
*   requestPath：Request interface path.
*   queryString：The query string in the request URL (the request parameter after the ?). **Need to be sorted in ascending alphabetical order by key**
*   body：The request body in string format. If the request body is empty (usually a GET request), the body can be omitted.

**If the queryString is empty, signature content**

`timestamp + method.toUpperCase() + requestPath + body`

**If the queryString not empty, signature content**

`timestamp + method.toUpperCase() + requestPath + "?" + queryString + body`

### Sample Code[​](#sample-code "Direct link to Sample Code")

Get contract depth information, let's take BTCUSDT as an example:

*   timestamp = 16273667805456
*   method = "GET"
*   requestPath = "/api/mix/v2/market/depth"
*   queryString= "?limit=20&symbol=BTCUSDT"

Generate the content to be signed:

`16273667805456GET/api/mix/v2/market/depth?limit=20&symbol=BTCUSDT`

Contract order, take BTCUSDT as an example:

*   timestamp = 16273667805456
*   method = "POST"
*   requestPath = "/api/v2/mix/order/place-order"
*   body = {"productType":"usdt-futures","symbol":"BTCUSDT","size":"8","marginMode":"crossed","side":"buy","orderType":"limit","clientOid":"channel#123456"}

Generate the content to be signed:

`16273667805456POST/api/v2/mix/order/place-order{"productType":"usdt-futures","symbol":"BTCUSDT","size":"8","marginMode":"crossed","side":"buy","orderType":"limit","clientOid":"channel#123456"}`

### Steps to generate the final signature[​](#steps-to-generate-the-final-signature "Direct link to Steps to generate the final signature")

**_HMAC_**

*   [HMAC sample code](/api-doc/common/signature-samaple/hmac)

Step 1. Use the private key \*\*secretkey\*\* to encrypt the string to be signed with hmac sha256

```
String payload = hmac_sha256(secretkey, Message);
```

Step 2. Base64 encoding for Signature.

```
String signature = base64.encode(payload);
```

**_RSA_**

*   [RSA sample code](/api-doc/common/signature-samaple/rsa)

Step 1. Use the RSA privateKey **privateKey** to encrypt the string to be signed with SHA-256

Step 2. Base64 encoding for Signature.

# HMAC

## HMAC Signature Demo Code[​](#hmac-signature-demo-code "Direct link to HMAC Signature Demo Code")

*   Java
*   Python

```
import lombok.extern.slf4j.Slf4j;import org.apache.commons.lang3.StringUtils;import javax.crypto.Mac;import javax.crypto.spec.SecretKeySpec;import javax.management.RuntimeErrorException;import java.io.UnsupportedEncodingException;import java.security.InvalidKeyException;import java.security.NoSuchAlgorithmException;import java.util.Base64;import org.springframework.util.Base64Utils;@Slf4jpublic class CheckSign {  private static final String secretKey = "";  public static void main(String[] args) throws Exception {    //POST sign example//        String timestamp = "1684813405151";//        String body = "{\"symbol\":\"TRXUSDT\",\"marginCoin\":\"USDT\",\"size\":551,\"side\":\"buy\",\"orderType\":\"limit\",\"price\":0.0555,\"force\":\"normal\"}";////        String sign = generate(timestamp,"POST","/api/v2/mix/order/place-order" ,null,body,secretKey);//        log.info("sign:{}",sign);    //GET sign example    String timestamp = "1684814440729";    String queryString = "marginCoin=usdt&symbol=btcusdt"; // Need to be sorted in ascending alphabetical order by key    String sign = generate(timestamp,"GET","/api/v2/mix/account/account" ,queryString,null,secretKey);    log.info("sign:{}",sign);  }  private static Mac MAC;  static {    try {      CheckSign.MAC = Mac.getInstance("HmacSHA256");    } catch (NoSuchAlgorithmException var1) {      throw new RuntimeErrorException(new Error("Can't get Mac's instance."));    }  }  public static String generate(String timestamp, String method, String requestPath,                                String queryString, String body, String secretKey)          throws CloneNotSupportedException, InvalidKeyException, UnsupportedEncodingException {    method = method.toUpperCase();    body = StringUtils.defaultIfBlank(body, StringUtils.EMPTY);    queryString = StringUtils.isBlank(queryString) ? StringUtils.EMPTY : "?" + queryString;    String preHash = timestamp + method + requestPath + queryString + body;    log.info("preHash:{}",preHash);    byte[] secretKeyBytes = secretKey.getBytes("UTF-8");    SecretKeySpec secretKeySpec = new SecretKeySpec(secretKeyBytes, "HmacSHA256");    Mac mac = (Mac) CheckSign.MAC.clone();    mac.init(secretKeySpec);    return Base64.getEncoder().encodeToString(mac.doFinal(preHash.getBytes("UTF-8")));  }}
```

```
import hmacimport base64import jsonimport timedef get_timestamp():  return int(time.time() * 1000)def sign(message, secret_key):  mac = hmac.new(bytes(secret_key, encoding='utf8'), bytes(message, encoding='utf-8'), digestmod='sha256')  d = mac.digest()  return base64.b64encode(d)def pre_hash(timestamp, method, request_path, body):  return str(timestamp) + str.upper(method) + request_path + bodydef parse_params_to_str(params):    params = [(key, val) for key, val in params.items()]    params.sort(key=lambda x: x[0])    url = '?' +toQueryWithNoEncode(params);    if url == '?':        return ''    return urldef toQueryWithNoEncode(params):    url = ''    for key, value in params:        url = url + str(key) + '=' + str(value) + '&'    return url[0:-1]if __name__ == '__main__':  API_SECRET_KEY = ""  timestamp = "1685013478665" # get_timestamp()  request_path = "/api/v2/mix/order/place-order"  # POST  params = {"symbol": "TRXUSDT", "marginCoin": "USDT", "price": 0.0555, "size": 551, "side": "buy", "orderType": "limit", "force": "normal"}  body = json.dumps(params)  sign = sign(pre_hash(timestamp, "POST", request_path, str(body)), API_SECRET_KEY)  print(sign)  # GET  body = ""  request_path = "/api/v2/mix/account/account"  params = {"symbol": "TRXUSDT", "marginCoin": "USDT"}  request_path = request_path + parse_params_to_str(params) # Need to be sorted in ascending alphabetical order by key  sign = sign(pre_hash(timestamp, "GET", request_path, str(body)), API_SECRET_KEY)  print(sign)
```

# RSA

## RSA Signature Demo Code[​](#rsa-signature-demo-code "Direct link to RSA Signature Demo Code")

*   Java
*   Python
*   JS

```
import lombok.extern.slf4j.Slf4j;import org.apache.commons.lang3.StringUtils;import javax.crypto.Mac;import javax.crypto.spec.SecretKeySpec;import javax.management.RuntimeErrorException;import java.io.UnsupportedEncodingException;import java.security.InvalidKeyException;import java.security.NoSuchAlgorithmException;import java.util.Base64;@Slf4jpublic class CheckSign {        public static void main(String[] args) throws Exception {        //GET sign example//        String timestamp = "1684814440729";//        String queryString = "marginCoin=usdt&symbol=btcusdt"; // Need to be sorted in ascending alphabetical order by key//        String signContent = timestamp + "GET" + "/api/v2/mix/account/account?" + queryString;//        String sign = generate(signContent);//        log.info("sign:{}",sign);        //POST sign example        String timestamp = "1684814440729";        String preContent = timestamp + "POST" + "/api/v2/spot/trade/place-order";        String body = "{\"symbol\":\"btcusdt\",\"quantity\":\"8\",\"side\":\"buy\",\"price\":\"1\",\"orderType\":\"limit\",\"clientOid\":\"channel1233456\"}";        String signContent = preContent + body;        String sign = generate(signContent);        log.info("sign:{}",sign);    }  /**   *   * @param content: the string to be signed   * @return   */  private String generate(String content) {    String privateKey = "-----BEGIN PRIVATE KEY-----\n" +            "xxxxxxxxxxxxxxxxxxxx9w0BAQEFAASCBKgwggSkAgEAAoIBAQD5C1iP01MC9fh5\n" +            "xxxxxxxxxxxxxxx9Tcqfz6HzoSg+zd8HVxKXRTXBwMDBfLxfQXobptz1tDlPUs+g\n" +            "xxxxxxxxxxxxxxxBaZ5qHxArBTimyNXX6WNL6hTw0MI238cGKiW0WvWd9v6Z6/LX\n" +            "xxxxxxxxxxxxxxxcO7EKGuvBrVIRl57FzvOPD5QKfhVxcHr63NfEViAEQfQH4IN2\n" +            "xxxxxxxxxxxxxxx4jILUP+LXvHN7ZMiWP9bouw3r4l6v0NJ4XyucSYJL9fJ81rsI\n" +            "xxxxxxxxxxxxxxx4RSsFZKFyurE1c8XiU2aZ2qq+6vjby0ncE4dKVu5x/iJZ4gsL\n" +            "xxxxxxxxxxxxxxxCggEAD6cF5uw6QGpjNo30emMd6aXKsUbpbyYvgQHUxPIxDFl2\n" +            "xxxxxxxxxxxxxxxJjhcYbJp9MrgkDfc/c23+HomKbXqIkcVMy2DvAu523q1SVTE0\n" +            "xxxxxxxxxxxxxxxs6BdIDWDWJRp8AAKTXba6jgOOrg/Xbwq25aOeyerNPHv/N3m3\n" +            "xxxxxxxxxxxxxxx2UdX7NkvV4qmRi8se47OXUT9aypzpvGbSukkqXuE4GtKGoybR\n" +            "xxxxxxxxxxxxxxxNshn2QJnRd3GN2UENDvZS3ZvSY6f/Cq7K/EAmrsstOdUB2Ihn\n" +            "xxxxxxxxxxxxxxx3ekuArWc54bDai0deKFl9KvI2oQKBgQD9ekRFMB6ueRCCeoyg\n" +            "xxxxxxxxxxxxxxxKL1xKhrg6mYh65hfQaxbihfOcrneFOoc3BgZwnbAZpF+hlq9J\n" +            "xxxxxxxxxxxxxxxF3PGj5vPln9/rd6/gcFFE9o7zZhI166PsmlxQ7/N0SCnlao7y\n" +            "xxxxxxxxxxxxxxxlNsTR+XZ88QKBgQD7hckVvGxIftcZsHChP8TFcDAn1IsaVbyt\n" +            "xxxxxxxxxxxxxxx8YPtFr9afiCJ4b2NqRe8gCpUCUi+urnoMMsqMxTUMopiLPh2S\n" +            "xxxxxxxxxxxxxxxWx06krbOOyXVZ8RtgYLMpMhFCsRyzovqe8/LZQfQKWfQGTAXS\n" +            "xxxxxxxxxxxxxxx7DMDYdbwOcFRYlOq1WEarExTCUoHdfZfIrc5jSKsmwynN14H3\n" +            "xxxxxxxxxxxxxxxKzO1vqU3Mfln7umC73/9FJgZQfOh7TRpW4saGduXAq4voDTiC\n" +            "xxxxxxxxxxxxxxxsozRAnfF/+8i+/TVjQaSVgetYPB63uXw4JoRzlq1zYQKBgQDJ\n" +            "xxxxxxxxxxxxxxxGaNBKhR9TypEFylDXreTbDaMtTzg3Mcwa/qyarGiL2Fl8AEh6\n" +            "xxxxxxxxxxxxxxxUFO6BBozpINt/5ZUN7NL7w92qi25qkAQt4sGi+QQOnHMGisak\n" +            "xxxxxxxxxxxxxxxzsXqDqiwF52M9bui5zthbWfkj4wKBgEFVT+jf235aihaS88Oj\n" +            "xxxxxxxxxxxxxxxHlYCIef7/a+gt7N1u9sEGlPspY3HuPamA39201BuItD9X83VR\n" +            "xxxxxxxxxxxxxxxZn1O8/l+ItSNUzQhX6T0cSdCo6KtmZLBQ6Zaw7r63GcdvSdR2\n" +            "xxxxxxxxxxxxxxxxxxxxxxx\n" +            "-----END PRIVATE KEY-----\n";    try {      String parsedPem = privateKey.replace("\n", "").trim();      parsedPem = parsedPem              .replace("-----BEGIN PRIVATE KEY-----", "")              .replace("-----END PRIVATE KEY-----", "");      PKCS8EncodedKeySpec priPKCS8 = new PKCS8EncodedKeySpec(Base64Utils.decodeFromString(parsedPem));      KeyFactory keyFactory = KeyFactory.getInstance("RSA");      PrivateKey priKey = keyFactory.generatePrivate(priPKCS8);      Signature signature = Signature.getInstance("SHA256WithRSA");      signature.initSign(priKey);      signature.update(content.getBytes(StandardCharsets.UTF_8));      String sign = Base64Utils.encodeToString(signature.sign());      return sign;    } catch (Exception ex) {      throw new RuntimeException("create sign  failed", ex);    }  }}
```

```
import base64import jsonimport timeimport base64from Crypto.Hash import SHA256from Crypto.Signature import PKCS1_v1_5from Crypto.PublicKey import RSAdef get_timestamp():    return int(time.time() * 1000)def rsa_sign(message, private_key):  pri_key = RSA.importKey(private_key)  encoded_param = SHA256.new(bytes(message, encoding='utf-8'))  sign_str = PKCS1_v1_5.new(pri_key).sign(encoded_param)  return base64.b64encode(sign_str).decode()def pre_hash(timestamp, method, request_path, body):    return str(timestamp) + str.upper(method) + request_path + bodydef parse_params_to_str(params):    params = [(key, val) for key, val in params.items()]    params.sort(key=lambda x: x[0])    from urllib.parse import urlencode    url = '?' +urlencode(params);    if url == '?':        return ''    return urlif __name__ == '__main__':    private_key = '''-----BEGIN PRIVATE KEY-----XXXXXXXXXXANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCdTR5gmwGH77wExxxxxxxxxxiw7fPXWhMh7gZwurQQ8M/I9/VA8lDjwwoGuuJ6enurdfwhpZxeZHxxxxxxxxxxSEXVuxJv5hdpI9m6ydInK9SA8IbaF4yYWp0l4N2mA44MzadA7QZqxxxxxxxxxxa5q/NZHFWCrCbW2lGAAWwrhQq9LceVIW75e213xtnps0pGlII7YexxxxxxxxxxYNSxlCdLOiz1GvOeVSeiSZx31o/O+rj7tDFpSgZJEXRmtGRoJkJyxxxxxxxxxxVSOcb1hCExg4osK6rBKnDjFjwQvwvNNZq0JG+CkfH8eHAa7gSK50xxxxxxxxxxAAECggEAEvYk30hQGu7PH0stQX3UhlVsR6HXnRlvgIrmJe7F/VLOxxxxxxxxxx/heYY1nsX8+mIyjmvEOayqPgdkEmXevVlcuQf38Zbduynr3vlRCXxxxxxxxxxxSxFBODuu/EAZc3mm27C2wUV7w6SAy9g0g6Os97ehZsSGAwHl4ayexxxxxxxxxxEh5Ptq4YAfCYiUO7j10pQ+DJKqN9N1eyjyw5eixEgCpudcbpCc9XxxxxxxxxxxANX8/LwvokqgYBK1UIL6ear0dtKmeFU+KwrmkKZfXk8/Amr/O8Otxxxxxxxxxxzq3La149LMmNkUYxaMSV/KGTEV7ukQKBgQDQl/fA3mxXtQg2IjTBxxxxxxxxxxECWcP7TQWJDb30vxOKeq1k9YPUfegZga5zlyV28PAZnb0m5x07+0xxxxxxxxxxe9OhQxfkAY6AtJaiIqhCcw5ew8Go/Ja1ML0jZESWG1MWBJtCcFTmxxxxxxxxxxe0adilYmyu7zwwKBgQDBDPJZgSj7YssPyRmo3bO0MjknfYBqXvwixxxxxxxxxxJ9Rc2WXGfEm3DEn7TO/Wv0t7Yqm6/sXg5HzriN/PHlaVtE6wlXe7xxxxxxxxxx7KKWYqP812mASl6ydLX9QWozlOXjVhWMuSGqMWjut4J3P8jlkOJ6xxxxxxxxxxgQCxwvAl8ubNj78hsuDWgsddKIMkwvKrfdsvXrMOYouAdLjZJvjsxxxxxxxxxxs9km8g/479pYlOn+Iv/Z7Lqke8/HdOFASoQ9h1nSuujgEgXUwkg1xxxxxxxxxx2BY3FPnGGh8iQma1pdkUVn35fAq/m7e/S+kP1JY6lPIx1QKBgQCSxxxxxxxxxxpot+ceGt2bseSd8l4jqU3nDZ0oW8+4Qnnu9QFhN4Hn9wIjpAOGaUxxxxxxxxxxVbior98JxMSDHsHmuXKPA8DishumGlqV+vxsIzLQD1Ge/dbqsERBxxxxxxxxxxiyUNqjk5kcPQeHIyJk5qQaF21udoTQKBgDOMbtM0Nq7cd/SAHISRxxxxxxxxxxLJW7DRJGxw3AEwxKG+nxNLeG7GsQDyPCvZSKwRpdpXRTh+6mzXqexxxxxxxxxxz8Cwo6tgyKRi6QPObQk00vbrKEBTihP30m81rwBPzjwj7iKXxWgADJoVsaqGOaIf4qXXXXXXXXXX-----END PRIVATE KEY-----'''    timestamp = get_timestamp()    request_path = "/api/v2/mix/order/place-order"    # POST    params = {"symbol": "TRXUSDT", "marginCoin": "USDT", "price": 0.0555, "size": 551, "side": "buy", "orderType": "limit", "force": "normal"}    body = json.dumps(params)    sign = rsa_sign(pre_hash(timestamp, "POST", request_path, str(body)), private_key)    print(sign)    # GET    body = ""    request_path = "/api/v2/mix/account/account"    params = {"symbol": "TRXUSDT", "marginCoin": "USDT"}    request_path = request_path + parse_params_to_str(params) # Need to be sorted in ascending alphabetical order by key    sign = rsa_sign(pre_hash(timestamp, "GET", request_path, str(body)), private_key)    print(sign)
```

```
export function sign() {        const private_key = '-----BEGIN PRIVATE KEY-----\n' +        'XXXXXXXXXXANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCdTR5gmwGH77wE\n' +        'XXXXXXXXXXVhiw7fPXWhMh7gZwurQQ8M/I9/VA8lDjwwoGuuJ6enurdfwhpZxeZH\n' +        'XXXXXXXXXXLESEXVuxJv5hdpI9m6ydInK9SA8IbaF4yYWp0l4N2mA44MzadA7QZq\n' +        'XXXXXXXXXXeia5q/NZHFWCrCbW2lGAAWwrhQq9LceVIW75e213xtnps0pGlII7Ye\n' +        'XXXXXXXXXXX8YNSxlCdLOiz1GvOeVSeiSZx31o/O+rj7tDFpSgZJEXRmtGRoJkJy\n' +        'XXXXXXXXXXzCVSOcb1hCExg4osK6rBKnDjFjwQvwvNNZq0JG+CkfH8eHAa7gSK50\n' +        'XXXXXXXXXXMBAAECggEAEvYk30hQGu7PH0stQX3UhlVsR6HXnRlvgIrmJe7F/VLO\n' +        'XXXXXXXXXXtU/heYY1nsX8+mIyjmvEOayqPgdkEmXevVlcuQf38Zbduynr3vlRCX\n' +        'XXXXXXXXXXucSxFBODuu/EAZc3mm27C2wUV7w6SAy9g0g6Os97ehZsSGAwHl4aye\n' +        'XXXXXXXXXX10Eh5Ptq4YAfCYiUO7j10pQ+DJKqN9N1eyjyw5eixEgCpudcbpCc9X\n' +        'XXXXXXXXXXr0ANX8/LwvokqgYBK1UIL6ear0dtKmeFU+KwrmkKZfXk8/Amr/O8Ot\n' +        'XXXXXXXXXXKRzq3La149LMmNkUYxaMSV/KGTEV7ukQKBgQDQl/fA3mxXtQg2IjTB\n' +        'XXXXXXXXXXhaECWcP7TQWJDb30vxOKeq1k9YPUfegZga5zlyV28PAZnb0m5x07+0\n' +        'XXXXXXXXXXpje9OhQxfkAY6AtJaiIqhCcw5ew8Go/Ja1ML0jZESWG1MWBJtCcFTm\n' +        'XXXXXXXXXX1Ze0adilYmyu7zwwKBgQDBDPJZgSj7YssPyRmo3bO0MjknfYBqXvwi\n' +        'XXXXXXXXXX5BJ9Rc2WXGfEm3DEn7TO/Wv0t7Yqm6/sXg5HzriN/PHlaVtE6wlXe7\n' +        'XXXXXXXXXXKO7KKWYqP812mASl6ydLX9QWozlOXjVhWMuSGqMWjut4J3P8jlkOJ6\n' +        'XXXXXXXXXXKBgQCxwvAl8ubNj78hsuDWgsddKIMkwvKrfdsvXrMOYouAdLjZJvjs\n' +        'XXXXXXXXXXl3s9km8g/479pYlOn+Iv/Z7Lqke8/HdOFASoQ9h1nSuujgEgXUwkg1\n' +        'XXXXXXXXXX0k2BY3FPnGGh8iQma1pdkUVn35fAq/m7e/S+kP1JY6lPIx1QKBgQCS\n' +        'XXXXXXXXXXNmpot+ceGt2bseSd8l4jqU3nDZ0oW8+4Qnnu9QFhN4Hn9wIjpAOGaU\n' +        'XXXXXXXXXXh+Vbior98JxMSDHsHmuXKPA8DishumGlqV+vxsIzLQD1Ge/dbqsERB\n' +        'XXXXXXXXXXyfiyUNqjk5kcPQeHIyJk5qQaF21udoTQKBgDOMbtM0Nq7cd/SAHISR\n' +        'XXXXXXXXXXAjLJW7DRJGxw3AEwxKG+nxNLeG7GsQDyPCvZSKwRpdpXRTh+6mzXqe\n' +        'XXXXXXXXXXtez8Cwo6tgyKRi6QPObQk00vbrKEBTihP30m81rwBPzjwj7iKXxWgA\n' +        'XXXXXXXXXXIf4qXXXXXXXXXX\n' +        '-----END PRIVATE KEY-----\n'        const ts = Date.now();    const NodeRSA = require('node-rsa')    const pri_key = new NodeRSA(private_key)    //GET    const ts = Date.now();    const params = 'clientOid=123&coin=USDT&endTime=1659076670000&pageNo=1&pageSize=20&startTime=1659036670000' // Need to be sorted in ascending alphabetical order by key    const endpoint = '/api/v2/spot/wallet/withdrawal-records'    const method = "GET"    const pre_hash = String(ts) + method + endpoint + '?' + params    const sign = pri_key.sign(pre_hash, 'base64', 'UTF-8')    //POST    const endpoint_post = '/api/v2/spot/trade/unfilled-orders'    const params_post = '{"symbol": "BTCUSDT"}'    const method_post = "POST"    const pre_hash_post = String(ts) + method_post + endpoint_post + params_post    const sign_post = pri_key.sign(pre_hash_post, 'base64', 'UTF-8')        return sign}
```

# Request Interaction

All requests are based on the Https protocol, and the Content-Type in the POST request header should set to:'application/json'.

## Request Interaction Description[​](#request-interaction-description "Direct link to Request Interaction Description")

*   Request parameters: Encapsulate parameters according to the interface request parameters.
*   Submit request parameters: Submit the encapsulated request parameters to the server through GET/POST.
*   Server Response：The server first performs parameter security verification on the user request data, and returns the response data to the user in JSON format according to the business logic after passing the verification.
*   Data processing：Process the server response data.

### Success[​](#success "Direct link to Success")

HTTP status code 200 indicates a successful response and may contain content. If the response contains content, it will be displayed in the corresponding return content.

### Common Error Codes[​](#common-error-codes "Direct link to Common Error Codes")

*   400 Bad Request – Invalid request format
*   401 Unauthorized – Invalid API Key
*   403 Forbidden – You do not have access to the requested resource
*   404 Not Found – No request found
*   429 Too Many Requests – Requests are too frequent and are limited by the system
*   500 Internal Server Error – We had a problem with our server
*   If it fails, the return body usually indicates the error message

## Standard Specification[​](#standard-specification "Direct link to Standard Specification")

### Timestamp[​](#timestamp "Direct link to Timestamp")

The unit of ACCESS-TIMESTAMP in the HTTP request signature is milliseconds. The timestamp of the request must be within 30 seconds of the API server time, otherwise the request will be considered expired and rejected. If there is a large deviation between the local server time and the API server time, we recommend that you compare the timestamp by querying the [API server time](/api-doc/spot/public/Get-Server-Time).

### Frequency Limiting Rules[​](#frequency-limiting-rules "Direct link to Frequency Limiting Rules")

If the request is too frequent, the system will automatically limit the request and return the 429 too many requests status code.

*   Public interface：For the [market](/api-doc/category/market-2) information interfaces, the unified rate limit is a maximum of 20 requests per second.
*   Authorization interface：apikey is used to restrict the calling of authorization interfaces, refer to the frequency restriction rules of each interface for frequency restriction.

### Request Format[​](#request-format "Direct link to Request Format")

There are currently only two supported request methods: GET and POST

*   GET: The parameters are transmitted to the server in the path through queryString.
*   POST: The parameters are sending to the server in json format.

# Websocket API

### Overview[​](#overview "Direct link to Overview")

WebSocket is a new HTML5 protocol that achieves full-duplex data transmission between the client and server, allowing data to be transferred effectively in both directions. A connection between the client and server can be established with just one handshake. The server will then be able to push data to the client according to preset rules. Its advantages include:

*   The WebSocket request header size for data transmission between client and server is only 2 bytes.
*   Either the client or server can initiate data transmission.
*   There's no need to repeatedly create and delete TCP connections, saving resources on bandwidth and server.

It is strongly recommended that developers use WebSocket API to obtain market information and transaction depth.

| Domain | WebSocket API | Recommended to use |
| :-- | :-- | :-- |
| Websocket Domain | wss://ws.bitget.com/v2/ws/public | Main Domain, Public channel 
| Websocket Domain | wss://ws.bitget.com/v2/ws/private | Main Domain, Private channel 

### Connect[​](#connect "Direct link to Connect")

**Connection instructions**:

**Connection limit**: 300 connection requests/IP/5min, Max 100 connections/IP

**Subscription limit**: 240 subscription requests/Hour/connection, Max 1000 channel subscription/connection

If there’s a network problem, the system will automatically disconnect the connection.

To keep the connection stable:

1.  **Websocket will be forcibly disconnected every 24 hours, please add the reconnection mechanism in your code**
2.  Users set a 30 seconds timer to a send string "ping", and expect a string "pong" as response. If no string "pong" received, please reconnect
3.  Websocket server will disconnect the connection if there is no string "ping" received for 2 min
4.  The Websocket server accepts up to 10 messages per second. The message includes:

*   String "ping"
*   JSON message, such as subscribe, unsubscribe.

5.  If the user sends more messages than the limit, the connection will be disconnected. The IP which is repeatedly disconnected may be blocked by the server
6.  We highly recommend you to subscribe **less than 50 channels in one connection**. The connections with less channel subscriptions will be more stable.

### Login[​](#login "Direct link to Login")

**apiKey**: Unique identification for invoking API. Requires user to [apply](javascript:;) one manually.

**passphrase**: APIKey password

**timestamp**: the Unix Epoch time, the unit is seconds(--different from the signature timestamp of restAPI--)

**secretKey**: The security key generated when the user applies for APIKey, e.g. : 22582BD0CFF14C41EDBF1AB98506286D

Example of timestamp

```
const timestamp ='' + Date.now() / 1000
```

"Sign

```
sign=CryptoJS.enc.Base64.Stringify(CryptoJS.HmacSHA256(timestamp +'GET'+'/user/verify', secretKey))
```

**method**: always 'GET'.

**requestPath** : always '/user/verify'

**sign**: signature string, the signature algorithm is as follows:

First concatenate `timestamp`, `method`, `requestPath`, then use HMAC SHA256 method to encrypt the concatenated string with SecretKey, and then perform Base64 encoding.

The request will expire 30 seconds after the timestamp. If your server time differs from the API server time, we recommended using the REST API to query the [API server time](/api-doc/common/public/Get-Server-Time) and then compare the timestamp.

#### Steps to generate the final signature[​](#steps-to-generate-the-final-signature "Direct link to Steps to generate the final signature")

**_HMAC_**

Step 1. concat the content

```
Long timestamp = System.currentTimeMillis() / 1000;        String content = timestamp +"GET"+"/user/verify";
```

Step 1. Use the private key secretkey to encrypt the string to be signed with hmac sha256

```
String hash = hmac_sha256(content, secretkey);
```

The final step is to base64 encode the hash

```
String sign = base64.encode(hash);
```

**_RSA_**

*   [RSA sample code](/api-doc/common/signature-samaple/rsa)

Step 1. Use the RSA privateKey **privateKey** to encrypt the string to be signed with SHA-256

Step 2. Base64 encoding for Signature.

If login fails, it will automatically disconnect

Request Format Description

```
{  "op":"login",  "args":[    {      "apiKey":"<api_key>",      "passphrase":"<passphrase>",      "timestamp":"<timestamp>",      "sign":"<sign>"    }  ]}
```

Request Example

```
{  "op":"login",  "args":[    {      "apiKey":"xx_xxx",      "passphrase":"xxx",      "timestamp":"1538054050",      "sign":"8RCOqCJAhhEh4PWcZB/96QojLDqMAg4qNynIixFzS3E="    }  ]}
```

Successful Response Example

```
{  "event":"login",  "code":"0",  "msg":""}
```

Failure Response Example

```
{  "event":"error",  "code":"30005",  "msg":"error"}
```

### Subscribe[​](#subscribe "Direct link to Subscribe")

**Subscription Instructions**

Request Format Description

```
{    "op": "subscribe",    "args": ["<SubscriptionTopic>"]}
```

`instId`: should be either `symbol` or `default`

Users can choose to subscribe to one or more channels, and the total length of multiple channels cannot exceed 4096 bytes at a time.

Request Example

```
{    "op":"subscribe",    "args":[        {            "instType":"SPOT",            "channel":"ticker",            "instId":"BTCUSDT"        },        {            "instType":"SPOT",            "channel":"candle5m",            "instId":"BTCUSDT"        }    ]}
```

**Request Parameters**

| Parameter | Type | Required | Description |
| :-- | :-- | :-- | :-- |
| op | String | Yes | Operation, <code>subscribe</code> 
| args | Array | Yes | List of subscribe channels 
| &gt; instType | String | No | Instrument Type 
| &gt; channel | String | Yes | Channel name 
| &gt; instId | String | No | Instrument ID 

Example Response

```
{ "event": "subscribe",  "arg": {   "instType":"SPOT",   "channel":"ticker",    "instId":"BTCUSDT"  }}
```

**Return Parameters**

| Parameter | Type | Required | Description |
| :-- | :-- | :-- | :-- |
| event | String | Yes | Event, subscribe error 
| arg | Object | No | Subscribed channel 
| &gt; instType | String | No | Instrument Type MC：Perpetual contract public channel 
| &gt; channel | String | Yes | Channel name 
| &gt; instId | String | No | Instrument ID 
| code | String | No | Error code 
| msg | String | No | Error message 

### Unsubscribe[​](#unsubscribe "Direct link to Unsubscribe")

Unsubscribe from one or more channels.

Request Format Description

```
{    "op": "unsubscribe",    "args": ["< SubscriptionTopic>"]}
```

Request Example

```
{    "op":"unsubscribe",    "args":[        {            "instType":"SPOT",            "channel":"ticker",            "instId":"BTCUSDT"        },        {            "instType":"SPOT",            "channel":"candle1m",            "instId":"BTCUSDT"        }    ]}
```

**Request Parameters**

| Parameter | Type | Required | Description |
| :-- | :-- | :-- | :-- |
| op | String | Yes | Operation, unsubscribe 
| args | Array | Yes | List of channels to unsubscribe from 
| &gt; instType | String | Yes | Instrument Type MC：Perpetual contract public channel 
| &gt; channel | String | Yes | Channel name 
| &gt; instId | String | Yes | Instrument ID 

Example Response

```
{  "op":"unsubscribe",  "args":[    {      "instType":"USDT-FUTURES",      "channel":"ticker",      "instId":"BTCUSDT"    },    {      "instType":"USDT-FUTURES",      "channel":"candle1m",      "instId":"BTCUSDT"    }  ]}
```

**Return Parameters**

| Parameter | Type | Required | Description |
| :-- | :-- | :-- | :-- |
| event | String | Yes | Event, unsubscribe error 
| arg | Object | Yes | Unsubscribed channel 
| &gt; instType | String | Yes | Instrument Type 
| &gt; channel | String | Yes | Channel name 
| &gt; instId | String | Yes | Instrument ID 
| code | String | No | Error Code 
| msg | String | No | Error Message

# Query Announcements

Frequency limit: 20 times/1s (IP)

### Description[​](#description "Direct link to Description")

Search for announcements within one month

### HTTP Request[​](#http-request "Direct link to HTTP Request")

*   GET /api/v2/public/annoucements

Request Example

```
curl "https://api.bitget.com/api/v2/public/annoucements?language=zh_CN"
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter | Type | Required | Description |
| :-- | :-- | :-- | :-- |
| annType | String | No | Announcement type<br><code>latest_news</code>: Latest events<br><code>coin_listings</code>: New coin listings<br><code>trading_competitions_promotions</code>: Trading competitions and promotions<br><code>maintenance_system_updates</code>: maintenance/system upgrades<br><code>symbol_delisting</code>: Delisting information 
| startTime | String | No | Start time of the query, Unix millisecond timestamp, e.g. 1690196141868<br>Search by announcement time 
| endTime | String | No | End time of the query, Unix millisecond timestamp, e.g. 1690196141868<br>Search by announcement time 
| language | String | Yes | language type<br>zh_CN: Chinese<br>en_US: English<br>Returns English if the language chosen is not supported 

Response Example

```
{    "code": "00000",    "msg": "success",    "requestTime": 1688008631614,    "data": [        {            "annId": "1",            "annTitle": "test0629",            "annDesc": "Latest announcement",            "cTime": "1688008040000",            "language": "zh_CN",            "annUrl": "https://www.bitget.com/zh_CN/support/articles/23685"        }    ]}
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter | Type | Description |
| :-- | :-- | :-- |
| annId | String | Announcement ID 
| annTitle | String | Announcement title 
| annDesc | String | Announcement description 
| cTime | String | Announcement creation time, Unix millisecond timestamp format 
| language | String | language type 
| annUrl | String | Announcement URL

# API Domain

You can use different domain as below Rest API.

| Domain Name | API | Description |
| --- | --- | --- |
| REST Domain 1 | <a href="https://api.bitget.com" target="_blank" rel="noopener noreferrer">https://api.bitget.com</a> | Main Domain 
| websocket Domain | wss://ws.bitget.com/v2/ws/public | Main Domain, Public channel 
| websocket Domain | wss://ws.bitget.com/v2/ws/private | Main Domain, Private channel

# Get Server Time

Frequency limit: 20 times/1s (IP)

### Description[​](#description "Direct link to Description")

Getting server time,Unix millisecond timestamp

### HTTP Request[​](#http-request "Direct link to HTTP Request")

*   GET /api/v2/public/time

Request Example

```
curl "https://api.bitget.com/api/v2/public/time"
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter | Type | Required | Description |
| :-- | :-- | :-- | :-- |
| N/A |  |  |  

Response Example

```
{    "code": "00000",    "msg": "success",    "requestTime": 1688008631614,    "data": {        "serverTime": "1688008631614"    }}
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter | Type | Description |
| :-- | :-- | :-- |
| serverTime | String | Server time, Unix millisecond timestamp, e.g. 1690196141868

# Get Trade Rate

Frequency limit:10 times/1s (UID)

### Description[​](#description "Direct link to Description")

Get Trade Rate

### HTTP Request[​](#http-request "Direct link to HTTP Request")

*   GET /api/v2/common/trade-rate

Request Example

```
curl "https://api.bitget.com/api/v2/common/trade-rate?symbol=BTCUSDT&business=mix" \   -H "ACCESS-KEY:*******" \   -H "ACCESS-SIGN:*" \   -H "ACCESS-PASSPHRASE:*" \   -H "ACCESS-TIMESTAMP:1659076670000" \   -H "locale:en-US" \   -H "Content-Type: application/json"
```

### Request Parameter[​](#request-parameter "Direct link to Request Parameter")

| Parameter | Type | Required | Description |
| :-- | :-- | :-- | :-- |
| symbol | String | Yes | Trading pair name, e.g. BTCUSDT 
| businessType | String | Yes | Business type<br>mix contract<br>spot Spot<br>margin leverage 

Response Example

```
{    "code": "00000",    "msg": "success",    "requestTime": 1683875302853,    "data": {        "makerFeeRate": "0.0002",        "takerFeeRate": "0.0006"    }}
```

### Response Parameter[​](#response-parameter "Direct link to Response Parameter")

| Parameter | Type | Description |
| :-- | :-- | :-- |
| makerRate | String | Pending Order Handling Rates<br>Fractional form, i.e., 0.0002 for two parts per million 
| takerFeeRate | String | Taking Order Handling Rates<br>Fractional form, i.e., 0.0002 for two parts per million

# Spot Transaction Records

Frequency limit: 1 times/1s (User ID)

### Description[​](#description "Direct link to Description")

Spot transaction records

### HTTP Request[​](#http-request "Direct link to HTTP Request")

*   GET /api/v2/tax/spot-record

Request Example

```
curl "https://api.bitget.com/api/v2/tax/spot-record?startTime=1686128558000&endTime=1686214958000&limit=100" \   -H "ACCESS-KEY:*******" \   -H "ACCESS-SIGN:*" \   -H "ACCESS-PASSPHRASE:*" \   -H "ACCESS-TIMESTAMP:1659076670000" \   -H "locale:en-US" \   -H "Content-Type: application/json" \
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter | Type | Required | Description |
| :-- | :-- | :-- | :-- |
| coin | String | No | Default all coin type 
| startTime | String | Yes | Start time, Unix millisecond timestamps 
| endTime | String | Yes | End time, Unix millisecond timestamps<br>The maximum interval between startTime and endTime is 30 days. 
| limit | String | No | Default: 500, maximum: 500 
| idLessThan | String | No | The last recorded ID 

Response example

```
{    "code": "00000",    "msg": "success",    "requestTime": 1687257612262,    "data": [        {            "id": "1",            "coin": "AIBB",            "spotTaxType": "Interest",            "amount": "6018333.33333333",            "fee": "0",            "balance": "468575833.33333306",            "ts": "1686128884851"        }    ]}
```

### Response parameters[​](#response-parameters "Direct link to Response parameters")

| Parameter | Type | Description |
| :-- | :-- | :-- |
| id | String | Record ID 
| coin | String | Coin 
| spotTaxType | String | tax type spot 
| amount | String | Quantity 
| fee | String | Transaction fee 
| balance | String | Total accounts 
| ts | String | When this record was generated Timestamp 

### spotTaxType[​](#spottaxtype "Direct link to spotTaxType")

*   Deposit
*   Withdrawal
*   User fees
*   Fiat withdrawal success - Deduct
*   Sell
*   Buy
*   Transaction fee deduct
*   Strategic purchase-user accounts
*   Subscribe to trader-user accounts
*   System charges fees
*   Strategic refund-User account
*   Subscription fee refund-user account
*   Strategic Income-Traders' accounts
*   Crypto Voucher Distribution
*   Copy Trade expense
*   Judicial recall
*   Copy Trade profit
*   Refund Copy Trade commission
*   Buy Crypto
*   Deduction of judicial recall
*   Buy with card
*   Airdrop Reward-B
*   Decrease due to ETF settlement
*   Increase due to ETF settlement
*   System lock-up
*   User lock-up
*   Trading fee rebate
*   Manage background lock positions
*   Automatic deposit
*   Automatic withdrawal
*   Deposit from strategy account
*   Withdraw to strategy account
*   Lotto rewards
*   User contract trial fund
*   User contract simulation fund
*   Delegate
*   Undelegate
*   Rebate rewards
*   Consumption
*   Gains
*   Unlock locked order
*   Deduction
*   Return
*   Release
*   Repayment
*   Forced liquidation return
*   The locked order is returned to the system
*   Failed
*   Withdrawal frozen
*   Mirror fund
*   Supplement fund
*   Reduce fund
*   Settlement out
*   Withdrawal unfreeze
*   Ordinary Withdrawal
*   Fast withdrawal fee
*   Airdrop Reward-A
*   Subscribe
*   Interest
*   Penalty
*   Redemption
*   Activity fund(USDT-Ⓜ)
*   Activity fund
*   Activity fund(Coin-Ⓜ)
*   Increase exchange rate
*   Reduce exchange rate
*   Transfer in
*   Activity issuance
*   Transfer out
*   Super account
*   Exchange spending
*   Exchange income
*   Sent
*   Received
*   MegaSwap Transfer in
*   MegaSwap Transfer out
*   Channel referral rewards
*   System account
*   Sell Crypto
*   Fiat deposit

# Futures Transaction Records

Frequency limit: 1 times/1s (User ID)

### Description[​](#description "Direct link to Description")

Futures transaction records

### HTTP Request[​](#http-request "Direct link to HTTP Request")

*   GET /api/v2/tax/future-record

Request Example

```
curl "https://api.bitget.com/api/v2/tax/future-record?startTime=1686128558000&endTime=1686214958000&limit=100" \   -H "ACCESS-KEY:*******" \   -H "ACCESS-SIGN:*" \   -H "ACCESS-PASSPHRASE:*" \   -H "ACCESS-TIMESTAMP:1659076670000" \   -H "locale:en-US" \   -H "Content-Type: application/json" \
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter | Type | Required | Description |
| :-- | :-- | :-- | :-- |
| productType | String | No | Product type default <code>USDT-FUTURES</code><br><code>USDT-FUTURES</code> USDT professional futures<br><code>COIN-FUTURES</code> Mixed futures<br><code>USDC-FUTURES</code> USDC professional futures 
| marginCoin | String | No | Default all margin coin 
| startTime | String | Yes | Start time (time stamp in milliseconds) 
| endTime | String | Yes | The maximum interval between startTime and endTime (time stamp in milliseconds) is 30 days. 
| limit | String | No | Default: 500, maximum: 500 
| idLessThan | String | No | The last recorded ID 

Response example

```
{    "code": "00000",    "msg": "success",    "requestTime": 1687257612262,    "data": [        {            "id": "1",            "symbol": "TRXUSDT",            "marginCoin": "USDT",            "futureTaxType": "close_long",            "amount": "0.10545",            "fee": "-0.02134863",            "ts": "1679909309766"        }    ]}
```

### Response parameters[​](#response-parameters "Direct link to Response parameters")

| Parameter | Type | Description |
| :-- | :-- | :-- |
| id | String | Transaction history ID 
| symbol | String | symbol 
| marginCoin | String | margin Coin 
| futureTaxType | String | Futures transaction type 
| amount | String | Quantity 
| fee | String | Transaction fee 
| ts | String | When this record was generated, millisecond timestamp 

**futureTaxType**  

*   `TRANSFER_IN` Fund transfer
*   `TRANSFER_OUT` Fund transfer
*   `ORDER_DEALT_FROZEN_OUT` Order dealt fund out
*   `ORDER_DEALT_IN` Order dealt fund in
*   `ORDER_PLF_FEE_OUT` handling fee deduction
*   `EXCHANGE_SOURCE_TOKEN_USER_OUT` Redeem
*   `EXCHANGE_TARGET_TOKEN_USER_IN` Redeem
*   `OPEN_LONG` Open long
*   `OPEN_SHORT` Open short
*   `BUY_DEAL` Buy
*   `SELL_DEAL` Sell
*   `CLOSE_LONG` Close long
*   `CLOSE_SHORT` Close short
*   `FORCE_CLOSE_LONG` Forced reduction of long position
*   `FORCE_CLOSE_SHORT` Forced reduction of short position
*   `BURST_CLOSE_LONG` Liquidate long position
*   `BURST_CLOSE_SHORT` Liquidate short position
*   `OFFSET_REDUCE_CLOSE_LONG` Offset close long
*   `OFFSET_REDUCE_CLOSE_SHORT` Offset close short
*   `FORCE_BUY_SSM` Forced buy
*   `FORCE_SELL_SSM` Forced sell
*   `BURST_BUY_SSM` Liquidate buy
*   `BURST_SELL_SSM` Liquidate sell
*   `RISK_LIQ_USER_IN` User money in due to liquidation risk
*   `RISK_LIQ_USER_OUT` User money out due to liquidation risk
*   `INTEREST_SETTLEMENT_OUT` Interest deduction
*   `CONTRACT_MAIN_SETTLE_FEE_USER_IN` Funding fee collection
*   `CONTRACT_MAIN_SETTLE_FEE_USER_OUT` Funding Fee deduction

# Margin Transaction History

Frequency limit: 1 times/1s (User ID)

### Description[​](#description "Direct link to Description")

Margin transaction records

### HTTP Request[​](#http-request "Direct link to HTTP Request")

*   GET /api/v2/tax/margin-record

Request Example

```
curl "https://api.bitget.com/api/v2/tax/margin-record?startTime=1686128558000&endTime=1686214958000&limit=100" \   -H "ACCESS-KEY:*******" \   -H "ACCESS-SIGN:*" \   -H "ACCESS-PASSPHRASE:*" \   -H "ACCESS-TIMESTAMP:1659076670000" \   -H "locale:en-US" \   -H "Content-Type: application/json" \
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter | Type | Required | Description |
| :-- | :-- | :-- | :-- |
| marginType | String | No | Leverage type<br><code>isolated</code>: Isolated margin<br><code>crossed</code>: Cross margin(default) 
| coin | String | No | Default all coin type 
| startTime | String | Yes | Start time (time stamp in milliseconds) 
| endTime | String | Yes | The maximum interval between startTime and endTime (time stamp in milliseconds) is 30 days. 
| limit | String | No | Default: 500, maximum: 500 
| idLessThan | String | No | The last recorded ID 

Response example

```
{    "code": "00000",    "msg": "success",    "requestTime": 1687259242290,    "data": [        {            "id": "1",            "coin": "USDT",            "marginTaxType": "transfer_in",            "amount": "13333",            "fee": "0",            "total": "13333",            "symbol": "BTCUSDT",            "ts": "1686129284474"        }    ]}
```

### Response parameters[​](#response-parameters "Direct link to Response parameters")

| Parameter | Type | Description |
| :-- | :-- | :-- |
| id | String | Record id 
| coin | String | Coin 
| symbol | String | Trade pair 
| marginTaxType | String | transfer_in: Inbound transfer<br>transfer_out: Outbound transfer<br>borrow: Borrowings<br>repay: Repayment<br>liquidation_fee: Liquidation fee<br>compensate: Risk fund compensation for collateral shortfall<br>deal_in: Margin buy<br>deal_out: Margin sell<br>interest_repay: Interest repayment<br>confiscated: Deducted for collateral shortfall<br>exchange_in: Conversion profit<br>exchange_out: Conversion profit 
| amount | String | Quantity 
| fee | String | Transaction fee 
| total | String | Total accounts 
| ts | String | Record generation time, Unix millisecond timestamps

# P2P Transaction Records

Frequency limit: 1 times/1s (User ID)

### Description[​](#description "Direct link to Description")

p2p transaction records

### HTTP Request[​](#http-request "Direct link to HTTP Request")

*   GET /api/v2/tax/p2p-record

Request Example

```
curl "https://api.bitget.com/api/v2/tax/p2p-record?startTime=1686128558000&endTime=1686214958000&limit=100" \   -H "ACCESS-KEY:*******" \   -H "ACCESS-SIGN:*" \   -H "ACCESS-PASSPHRASE:*" \   -H "ACCESS-TIMESTAMP:1659076670000" \   -H "locale:en-US" \   -H "Content-Type: application/json" \
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter | Type | Required | Description |
| :-- | :-- | :-- | :-- |
| coin | String | No | Default all coin type 
| startTime | String | Yes | Start time (time stamp in milliseconds) 
| endTime | String | Yes | The maximum interval between startTime and endTime (time stamp in milliseconds) is 30 days. 
| limit | String | No | Default: 500, maximum: 500 
| idLessThan | String | No | The last recorded ID 

Response example

```
{    "code": "00000",    "msg": "success",    "requestTime": 1687260620793,    "data": [        {            "id": "1752117",            "coin": "USDT",            "p2pTaxType": "buy",            "total": "10",            "ts": "1680582050393"        }    ]}
```

### Response parameters[​](#response-parameters "Direct link to Response parameters")

| Parameter | Type | Description |
| :-- | :-- | :-- |
| id | String | Record id lastEndId 
| coin | String | Coin 
| p2pTaxType | String | p2p taxation types<br>transfer_in Inbound transfer<br>transfer_out Outbound transfer<br>sell Sell<br>buy Buy 
| total | String | Total accounts

# Demo Trading

Demo trading allows you to practice trading and test strategies in a real-market environment using virtual funds, helping you improve your skills and reduce the risk of losses.KYC is needed.

## API Key[​](#api-key "Direct link to API Key")

To perform demo trading via API, you'll need to create a Demo API Key in the first place. The steps are as follows:  
Log in to your account → Switch to Demo mode → Go to the Personal Center → Go to the API Key Management → Create a Demo API Key → Use the Demo API Key to start trading.

## REST[​](#rest "Direct link to REST")

Please use the created Demo API Key for API calls, and add `paptrading` in the request header, with the value set to `1`.

* * *

# RestAPI Demo coin

We suggest users to use demo coin trading

## Demo Coin Testing[​](#demo-coin-testing "Direct link to Demo Coin Testing")

Demo coins include ：SUSDT, SBTC, SETH, SEOS, SUSDC, demo Coin does not have actual value it is only for users to do the simulated trading, demo coin will be in your account after account registeration : Futures Account - USDT\_M Futures Demo

Demo symbol name pattern is: SBTCSUSDT

Please use a real trading API key to make calls for demo symbol

Simulated trading does not support to use sub-account in most of interfaces, please use main account

## Get Demo Trading Symbol Config[​](#get-demo-trading-symbol-config "Direct link to Get Demo Trading Symbol Config")

### Request Sample[​](#request-sample "Direct link to Request Sample")

```
curl "https://api.bitget.com/api/v2/mix/market/contracts?productType=susdt-futures"
```

method:GET

### productType[​](#producttype "Direct link to productType")

*   susdt-futures `USDT simulation perpetual contract`
*   scoin-futures `Universal margin simulation perpetual contract`
*   susdc-futures `USDC simulation perpetual contract`

### Response Body[​](#response-body "Direct link to Response Body")

```
{    "code": "00000",    "data": [        {            "baseCoin": "SBTC",            "buyLimitPriceRatio": "0.01",            "feeRateUpRatio": "0.005",            "limitOpenTime": "-1",            "maintainTime": "",            "makerFeeRate": "0.0002",            "minTradeNum": "0.001",            "offTime": "-1",            "openCostUpRatio": "0.01",            "priceEndStep": "5",            "pricePlace": "1",            "quoteCoin": "SUSDT",            "sellLimitPriceRatio": "0.01",            "sizeMultiplier": "0.001",            "supportMarginCoins": [                "SUSDT"            ],            "symbol": "SBTCSUSDT",            "symbolStatus": "normal",            "symbolType": "perpetual",            "takerFeeRate": "0.0006",            "volumePlace": "3",            "deliveryTime": "",            "deliveryStartTime": "",            "launchTime": "",            "fundInterval": "",            "minLever": "",            "maxLever": "",            "posLimit": ""        }    ],    "msg": "success",    "requestTime": 1690313813709}
```

As we can see from the example, values of symbol and coin are demo symbol/demo coin

Demo symbol and demo coin must be shown in pairs, a wrong pair will result to an interface error

  
  

## Future Place Order Demo Trading[​](#future-place-order-demo-trading "Direct link to Future Place Order Demo Trading")

### Request sample[​](#request-sample-1 "Direct link to Request sample")

```
curl -X POST "https://api.bitget.com/api/v2/mix/order/place-order" \-H "ACCESS-KEY:*******" \-H "ACCESS-SIGN:*******" \-H "ACCESS-PASSPHRASE:*****" \-H "ACCESS-TIMESTAMP:1659076670000" \-H "locale:en-US" \-H "Content-Type: application/json" \-d '{    "symbol": "SETHSUSDT",    "productType": "susdt-futures",    "marginMode": "isolated",    "marginCoin": "SUSDT",    "size": "1.5",    "price": "2000",    "side": "buy",    "tradeSide": "open",    "orderType": "limit",    "force": "gtc",    "clientOid": "12121212122",    "reduceOnly": "NO",    "presetStopSurplusPrice": "2300",    "presetStopLossPrice": "1800"}'
```

**Request URI**

*   /api/v2/mix/order/place-order

**Method**

*   POST

A demo trade order ID will be return when input parameter symbol and marginCoin are demo symbol/demo coin

### Response Body[​](#response-body-1 "Direct link to Response Body")

```
{    "code": "00000",    "msg": "success",    "requestTime": 1627293504612,    "data": {        "orderId": "121211212122",        "clientOid": "121211212122"    }}
```

# Demo Trading

Demo trading allows you to practice trading and test strategies in a real-market environment using virtual funds, helping you improve your skills and reduce the risk of losses.KYC is needed.

## API Key[​](#api-key "Direct link to API Key")

To perform demo trading via API, you'll need to create a Demo API Key in the first place. The steps are as follows:  
Log in to your account → Switch to Demo mode → Go to the Personal Center → Go to the API Key Management → Create a Demo API Key → Use the Demo API Key to start trading.

## WebSocket[​](#websocket "Direct link to WebSocket")

Please use the created Demo API Key for WebSocket connections and request the demo trading service address:  
Public: wss://wspap.bitget.com/v2/ws/public  
Private: wss://wspap.bitget.com/v2/ws/private

* * *

# Websocket Demo Coin Trading

Bitget websocket also supports the demo coin trading,please use a real trading API key to make calls for demo symbol  
Public channel: wss://ws.bitget.com/v2/ws/public  
Private channel: wss://ws.bitget.com/v2/ws/private

## Tickers Channel[​](#tickers-channel "Direct link to Tickers Channel")

In websocket subscribe, simply use the demo symbol and demo coin if any

### Request Example[​](#request-example "Direct link to Request Example")

```
{  "op":"subscribe",  "args":[    {        "instType": "SUSDT-FUTURES",        "channel": "ticker",        "instId": "SBTCSUSDT"    }  ]}
```

### Successful Response Example[​](#successful-response-example "Direct link to Successful Response Example")

```
{  "event":"subscribe",  "arg":{        "instType": "SUSDT-FUTURES",        "channel": "ticker",        "instId": "SBTCSUSDT"  }}
```

### Push Data Example[​](#push-data-example "Direct link to Push Data Example")

```
{    "action": "snapshot",    "arg": {        "instType": "SUSDT-FUTURES",        "channel": "ticker",        "instId": "SBTCSUSDT"    },    "data": [        {            "instId": "SBTCSUSDT",            "last": "27000.5",            "bidPr": "27000",            "askPr": "27000.5",            "bidSz": "2.71",            "askSz": "8.76",            "open24h": "27000.5",            "high24h": "30668.5",            "low24h": "26999.0",            "priceChangePercent": "-0.00002",            "fundingRate": "0.000010",            "nextFundingTime": 1695722400000,            "markPrice": "27000.0",            "indexPrice": "25702.4",            "quantity": "929.502",            "baseVolume": "368.900",            "quoteVolume": "10152429.961",            "openUtc": "27000.5",            "symbolType": 1,            "symbol": "SBTCSUSDT",            "deliveryPrice": "0",            "ts": 1695715383021        }    ],    "ts": 1695715383039}
```

# Get P2P Merchant List

Rate limit:10 requests/s (UID)

### Description[​](#description "Direct link to Description")

Get P2P merchant list

### HTTP Request[​](#http-request "Direct link to HTTP Request")

*   GET /api/v2/p2p/merchantList

Request Example

```
curl "https://api.bitget.com/api/v2/p2p/merchantList?online=yes&limit=20" \   -H "ACCESS-KEY:*******" \   -H "ACCESS-SIGN:*" \   -H "ACCESS-PASSPHRASE:*" \   -H "ACCESS-TIMESTAMP:1659076670000" \   -H "locale:en-US" \   -H "Content-Type: application/json"
```

### Request Parameter[​](#request-parameter "Direct link to Request Parameter")

| Parameter | Type | Required | Description |
| :-- | :-- | :-- | :-- |
| online | String | No | Whether online?<br>yes: online<br>no: offline 
| idLessThan | String | No | The minMerchantId returned from the previous query.<br>Returns data whose ID is less than the entry parameter. 
| limit | String | No | Number of queries<br>The default value is 100 

Response Example

```
{    "code": "00000",    "msg": "success",    "requestTime": 1681195810516,    "data": {        "merchantList": [            {                "registerTime": "1678674575000",                "nickName": "test1",                "isOnline": "no",                "avgPaymentTime": "0",                "avgReleaseTime": "0",                "totalTrades": "0",                "totalBuy": "0",                "totalSell": "0",                "totalCompletionRate": "0",                "trades30d": "8",                "sell30d": "4",                "buy30d": "4",                "completionRate30d": "0.8"            }        ],        "minMerchantId": "1"    }}
```

### Response Parameter[​](#response-parameter "Direct link to Response Parameter")

| Parameter | Type | Description |
| :-- | :-- | :-- |
| &gt; merchantList | Array | Merchant list 
| &gt; registerTime | String | Registration time 
| &gt; nickName | String | Alias 
| &gt; isOnline | String | Whether online 
| &gt; avgPaymentTime | String | Average payment time<br>(in minutes) 
| &gt; avgReleaseTime | String | Average time to release coins<br>(in minutes) 
| &gt; totalTrades | String | Total traded orders 
| &gt; totalBuy | String | Total number of purchase orders 
| &gt; totalSell | String | Total number of sell orders 
| &gt; totalCompletionRate | String | Total execution rate 
| &gt; trades30d | String | 30-day trading volume 
| &gt; sell30d | String | 30-day sell orders 
| &gt; buy30d | String | 30-day purchase orders 
| &gt; completionRate30d | String | 30-day close rate 
| minMerchantId | String | Returns the smallest merchantId in the result

# Get Merchant Information

Frequency limit:10 times/1s (UID)

### Description[​](#description "Direct link to Description")

Get Merchant Information

### HTTP Request[​](#http-request "Direct link to HTTP Request")

*   GET /api/v2/p2p/merchantInfo

Request Example

```
curl "https://api.bitget.com/api/v2/p2p/merchantInfo" \   -H "ACCESS-KEY:*******" \   -H "ACCESS-SIGN:*" \   -H "ACCESS-PASSPHRASE:*" \   -H "ACCESS-TIMESTAMP:1659076670000" \   -H "locale:en-US" \   -H "Content-Type: application/json"
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

N/A

Response Example

```
{    "code": "00000",    "msg": "success",    "requestTime": 1681194805204,    "data": {        "registerTime": "1672039640000",        "nickName": "lz",        "merchantId": "1",        "avgPaymentTime": "172695",        "avgReleaseTime": "33009",        "totalTrades": "2",        "totalBuy": "1",        "totalSell": "0",        "totalCompletionRate": "1",        "trades30d": "12",        "sell30d": "4",        "buy30d": "8",        "completionRate30d": "0.71",        "kycStatus": true,        "emailBindStatus": true,        "mobileBindStatus": true,        "email": "******@*****.com",        "mobile": "18*34"    }}
```

### Response Parameter[​](#response-parameter "Direct link to Response Parameter")

| Parameter | Type | Description |
| :-- | :-- | :-- |
| registerTime | String | Registration time 
| nickName | String | Alias 
| merchantId | String | Merchant ID 
| kycStatus | Boolean | KYC or not<br>true: yes<br>false: no 
| emailBindStatus | Boolean | Email bound?<br>true: yes<br>false: no 
| mobileBindStatus | Boolean | Phone number bound？<br>true: yes<br>false: no 
| email | String | Email 
| mobile | String | Phone number 
| avgPaymentTime | String | Average payment time in minutes 
| avgReleaseTime | String | Average coin release time in minutes 
| totalTrades | String | Total traded orders 
| totalBuy | String | Total number of purchase orders 
| totalSell | String | Total number of sell orders 
| totalCompletionRate | String | Total execution rate 
| trades30d | String | 30-day trading volume 
| sell30d | String | 30-day sell orders 
| buy30d | String | 30-day purchase orders 
| completionRate30d | String | 30-day close rate

# Get Merchant P2P Orders

Frequency limit:10 times/1s (UID)

### Description[​](#description "Direct link to Description")

Merchant queries P2P orders

### HTTP Request[​](#http-request "Direct link to HTTP Request")

*   GET /api/v2/p2p/orderList

Request Example

```
curl "https://api.bitget.com/api/v2/p2p/orderList?startTimestartTime=1691403328000&endTime=1696930027673&limit=1" \   -H "ACCESS-KEY:*******" \   -H "ACCESS-SIGN:*" \   -H "ACCESS-PASSPHRASE:*" \   -H "ACCESS-TIMESTAMP:1659076670000" \   -H "locale:en-US" \   -H "Content-Type: application/json"
```

### Request Parameter[​](#request-parameter "Direct link to Request Parameter")

| Parameter | Type | Required | Description |
| :-- | :-- | :-- | :-- |
| startTime | String | Yes | Start time, Unix millisecond timestamp, e.g. 1690196141868 
| endTime | String | No | End time, Unix millisecond timestamp, e.g. 1690196141868<br>Maximum interval between start time and end time is 90 days 
| idLessThan | String | No | The minOrderId returned from the previous query. Returns p2p order data less than the specified entry parameter. 
| limit | String | No | Number of queries, default 100 
| status | String | No | P2P order status<br>pending_pay: pending payment<br>Paid: coins to be released<br>Appeal: Appeal in progress<br>Completed: Completed<br>cancelled: cancelled 
| advNo | String | Yes | Advertisement order number 
| side | String | No | TX type<br>buy: Buy<br>sell: Sell 
| coin | String | No | Digital currency name, e.g. USDT 
| language | String | Yes | Language<br>zh-CN: Chinese<br>en-US: English 
| fiat | String | No | Fiat currency name, e.g. USD 
| orderNo | String | No | Order no. 

Response Example

```
{  "code": "00000",  "msg": "success",  "requestTime": 1681201761390,  "data": {    "orderList": [      {        "orderId": "1",        "orderNo": "1",        "advNo": "1",        "price": "1",        "count": "11",        "side": "buy",        "fiat": "USD",        "coin": "USDT",        "withdrawTime": "",        "representTime": "",        "paymentTime": "",        "releaseTime": "",        "amount": "11",        "buyerRealName": "",        "sellerRealName": "兰州",        "status": "cancelled",        "paymentInfo": {          "paymethodName": "paypal",          "paymethodId": "1",          "paymethodInfo": [            {              "name": "繁体中文",              "required": "yes",              "type": "number",              "value": "11****"            },            {              "name": "繁体中文",              "required": "yes",              "type": "file",              "value": "http://abc.x.com/otc/images/20230116/1.jpg"            }          ]        },        "utime": "1696732368875",        "ctime": "1681111722251"      }    ],    "minOrderId": "1"  }}
```

### Response Parameter[​](#response-parameter "Direct link to Response Parameter")

| Parameter | Type | Description |
| :-- | :-- | :-- |
| orderList | Array | Order number 
| &gt; orderId | String | ID 
| &gt; orderNo | String | Order no. 
| &gt; advNo | String | Advertisement order number 
| &gt; side | String | Types: buy/sell 
| &gt; count | String | Amount 
| &gt; coin | String | Fiat Currency 
| &gt; price | String | Price 
| &gt; fiat | String | Fiat 
| &gt; withdrawTime | String | Time of withdrawal of this order 
| &gt; representTime | String | Appeal time 
| &gt; releaseTime | String | Coin release time 
| &gt; paymentTime | String | Repayment time 
| &gt; amount | String | Order amount 
| &gt; status | String | P2P order status 
| &gt; buyerRealName | String | Buyer name 
| &gt; sellerRealName | String | Seller name 
| &gt; cTime | String | Creation time, Unix millisecond timestamps 
| &gt; uTime | String | Update time, Unix millisecond timestamps 
| &gt; paymentInfo | Object | Payment Info 
| &gt;&gt; paymethodName | String | Payment method name 
| &gt;&gt; paymethodId | String | Payment method ID 
| &gt;&gt; paymethodInfo | Array | Payment method details 
| &gt;&gt;&gt; name | String | Payment detail name 
| &gt;&gt;&gt; required | String | Required or not: yes/no 
| &gt;&gt;&gt; type | String | type, number/file. Ignore this parameter 
| &gt;&gt;&gt; value | String | Payment information value 
| minOrderId | String | Returns the minimum orderId of record.

# Get Merchant Advertisement List

Frequency limit:10 times/1s (UID)

### Description[​](#description "Direct link to Description")

Get Merchant Advertisement List

### HTTP Request[​](#http-request "Direct link to HTTP Request")

*   GET /api/v2/p2p/advList

Request Example

```
curl "https://api.bitget.com/api/v2/p2p/advList?startTime=1659403328000&endTime=1659410528000&limit=20" \   -H "ACCESS-KEY:*******" \   -H "ACCESS-SIGN:*" \   -H "ACCESS-PASSPHRASE:*" \   -H "ACCESS-TIMESTAMP:1659076670000" \   -H "locale:en-US" \   -H "Content-Type: application/json"
```

### Request Parameter[​](#request-parameter "Direct link to Request Parameter")

| Parameter | Type | Required | Description |
| :-- | :-- | :-- | :-- |
| startTime | String | Yes | Start time, Unix millisecond timestamp, e.g. 1690196141868 
| endTime | String | No | End time, Unix millisecond timestamp, e.g. 1690196141868<br>Maximum interval between start time and end time is 90 days 
| idLessThan | String | No | The minAdvId returned from the previous query. Returns the data whose advId is less than the specified input parameter. 
| limit | String | No | Number of queries: Default: 20, max:20. 
| status | String | Yes | Advertisement order status<br><code>online</code>: Online<br><code>offline</code>: Offline<br><code>editing</code>: Editing<br><code>completed</code>: Completed 
| advNo | String | No | Advertisement order 
| side | String | Yes | TX type<br>buy: Buy<br>sell: Sell 
| coin | String | Yes | Digital currency 
| language | String | No | Language<br>zh-CN: Chinese<br>en-US: English 
| fiat | String | Yes | Fiat 
| orderBy | String | No | Sort Fields<br>createTime: Create time<br>price: Price<br>Descending, by createTime by default 
| payMethodId | String | No | Payment method id 
| sourceType | String | No | Query range<br>owner:query owner advertisement(default)<br>competitior:query other merchant advertisement<br>ownerAndCompetitior:query all advertisement 

Response Example

```
{    "code": "00000",    "msg": "success",    "requestTime": 1696930053072,    "data": {        "advList": [            {                "advId": "1",                "advNo": "1",                "side": "buy",                "advSize": "0.6",                "size": "0",                "coin": "BTC",                "price": "155570.9",                "coinPrecision": "36",                "fiat": "CNY",                "fiatPrecision": "2",                "fiatSymbol": "￥",                "status": "online",                "hide": "no",                "maxTradeAmount": "93342.54",                "minTradeAmount": "100",                "payDuration": "4",                "turnoverNum": "8",                "turnoverRate": "1.00",                "label": null,                "userLimitList": {                    "minCompleteNum": "0",                    "maxCompleteNum": "0",                    "placeOrderNum": "0",                    "allowMerchantPlace": "no",                    "completeRate30d": "0",                    "country": ""                },                "paymentMethodList": [                    {                        "paymentMethod": "Bank Card",                        "paymentId": "11",                        "paymentInfo": [                            {                                "name": "Bank Card",                                "required": true,                                "type": "txt"                            }                        ]                    },                    {                        "paymentMethod": "WeChat",                        "paymentId": "12",                        "paymentInfo": [                            {                                "name": "Payment code",                                "required": true,                                "type": "file"                            },                            {                                "name": "WeChatAccount",                                "required": true,                                "type": "txt"                            }                        ]                    },                    {                        "paymentMethod": "Alipay",                        "paymentId": "13",                        "paymentInfo": [                            {                                "name": "AlipayAccount",                                "required": true,                                "type": "txt"                            },                            {                                "name": "Payment code",                                "required": true,                                "type": "file"                            }                        ]                    }                ],                "merchantCertifiedList": [],                "utime": "1696733724267",                "ctime": "1696733724267"            }        ],        "minAdvId": "1"    }}
```

### Response Parameter[​](#response-parameter "Direct link to Response Parameter")

| Parameter | Type | Description |
| :-- | :-- | :-- |
| advList | Array | Number of advertisement orders 
| &gt; advId | String | Advertisement order ID 
| &gt; advNo | String | Advertisement order number 
| &gt; side | String | TX type<br>sell<br>buy 
| &gt; advSize | String | Total number of advertisement orders 
| &gt; size | String | Filled quantity 
| &gt; coin | String | Coins such as BGB, USDT, BTC, ETH etc. 
| &gt; price | String | Price 
| &gt; coinPrecision | String | Currency precision, decimala 
| &gt; fiat | String | Fiat 
| &gt; fiatPrecision | String | Fiat decimals 
| &gt; fiatSymbol | String | Currency symbol 
| &gt; status | String | Advertisement order status<br><code>online</code>: Online<br><code>offline</code>: Offline<br><code>editing</code>: Editing<br><code>completed</code>: Completed 
| &gt; hide | String | Hide the advertisement order or not<br>yes: Hide<br>no: not hide 
| &gt; maxTradeAmount | String | Maximum order quantity 
| &gt; minTradeAmount | String | Minimum order quantity 
| &gt; payDuration | String | Time period for payment after placing an order, min 
| &gt; turnoverNum | String | Total trading amount 
| &gt; turnoverRate | String | Close rate 
| &gt; label | String | Note 
| &gt; cTime | String | Creation time, Unix millisecond timestamps 
| &gt; uTime | String | Update time, Unix millisecond timestamps 
| &gt; userLimitList | Array | Upper limit of the advertiser order restricted user 
| &gt;&gt; minCompleteNum | String | Minimum number of completed user orders 
| &gt;&gt; maxCompleteNum | String | Maximum number of completed user orders 
| &gt;&gt; placeOrderNum | String | Maximum number of orders a user can place under this advertisement 
| &gt;&gt; allowMerchantPlace | String | Whether to allow merchants to place orders<br>yes: allow<br>no: not allow 
| &gt;&gt; completeRate30d | String | 30-day close rate 
| &gt;&gt; country | String | Only people from these countries are allowed to place orders 
| &gt; paymentMethodList | Array | Payment methods number 
| &gt;&gt; paymentMethod | String | Payment name 
| &gt;&gt; paymentId | String | Payment ID 
| &gt;&gt; paymentInfo | Array | Payment method detail information 
| &gt;&gt;&gt; required | Boolean | Required or not: true/false 
| &gt;&gt;&gt; name | String | Payment details 
| &gt;&gt;&gt; type | String | Payment method detail information type 
| &gt; merchantCertifiedResult | Array | Merchant authentication number 
| &gt;&gt; imageUrl | String | Gold Merchant certification pictures 
| &gt;&gt; desc | String | Gold Merchant certification parameter description 
| minAdvId | String | Returns the minimum advId of the result

# Get Spot Whale Net Flow Data

Rate limit: 1 req/s (IP)

### Description[​](#description "Direct link to Description")

Get spot fund flow

### HTTP Request[​](#http-request "Direct link to HTTP Request")

*   GET /api/v2/spot/market/whale-net-flow

Request Example

```
curl "https://api.bitget.com/api/v2/spot/market/fund-flow?symbol=BTCUSDT"
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter | Type | Required | Description |
| :-- | :-- | :-- | :-- |
| symbol | String | Yes | Trading pair 

Response Example

```
{    "code": "00000",    "msg": "success",    "requestTime": 1656589586807,    "data": [        {            "volume": "-1.1",            "date": "1713942000000"        },        {            "volume": "-1.1",            "date": "1713942000000"        },        {            "volume": "-1.1",            "date": "1713942000000"        },        {            "volume": "-1.1",            "date": "1713942000000"        },        {            "volume": "-1.1",            "date": "1713942000000"        }    ]}
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter | Type | Description |
| :-- | :-- | :-- |
| volume | String | Whale buy sell volume 
| date | String | Millseconds time

# Get Futures Active Buy Sell Volume Data

Rate limit: 1 req/s (IP)

### Description[​](#description "Direct link to Description")

Get Futures Active Buy Sell Volume Data

### HTTP Request[​](#http-request "Direct link to HTTP Request")

*   GET /api/v2/mix/market/taker-buy-sell

Request Example

```
curl "https://api.bitget.com/api/v2/mix/market/taker-buy-sell?symbol=BTCUSDT"
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter | Type | Required | Description |
| :-- | :-- | :-- | :-- |
| symbol | String | Yes | Trading pair 
| period | String | No | - default:5m, support:<br><code>5m</code><br><code>15m</code><br><code>30m</code><br><code>1h</code><br><code>2h</code><br><code>4h</code><br><code>6h</code><br><code>12h</code><br><code>1d</code> 

Response Example

```
{    "code": "00000",    "msg": "success",    "requestTime": 1656589586807,    "data": [        {            "buyVolume": "0.01",            "sellVolume": "0.12",            "ts": "1714020600000"        },        {            "buyVolume": "0.01",            "sellVolume": "0.12",            "ts": "1714020600000"        }    ]}
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter | Type | Description |
| :-- | :-- | :-- |
| sellVolume | String | Sell Volume 
| buyVolume | String | Buy volume 
| ts | String | Millseconds time

# Get Futures Active Long Short Position Data

Rate limit: 1 req/s (IP)

### Description[​](#description "Direct link to Description")

Get Futures Active Long Short Position Data

### HTTP Request[​](#http-request "Direct link to HTTP Request")

*   GET /api/v2/mix/market/position-long-short

Request Example

```
curl "https://api.bitget.com/api/v2/mix/market/position-long-short?symbol=BTCUSDT"
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter | Type | Required | Description |
| :-- | :-- | :-- | :-- |
| symbol | String | Yes | Trading pair 
| period | String | No | - default:5m, support:<br><code>5m</code><br><code>15m</code><br><code>30m</code><br><code>1h</code><br><code>2h</code><br><code>4h</code><br><code>6h</code><br><code>12h</code><br><code>1d</code> 

Response Example

```
{    "code": "00000",    "msg": "success",    "requestTime": 1656589586807,    "data": [        {            "longPositionRatio": "0.01",            "shortPositionRatio": "0.12",            "longShortPositionRatio": "1.2",            "ts": "1714020600000"        },        {            "longPositionRatio": "0.01",            "shortPositionRatio": "0.12",            "longShortPositionRatio": "1.2",            "ts": "1714020600000"        }    ]}
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter | Type | Description |
| :-- | :-- | :-- |
| longPositionRatio | String | Long Position Ratio 
| shortPositionRatio | String | Short Position Ratio 
| longShortPositionRatio | String | Long Short Position Ratio 
| ts | String | Millseconds time

# Get Leveraged long-short ratio Data

Frequency limit: 1 times/1s (IP)

### Description[​](#description "Direct link to Description")

The long-short position ratio for a specific coin in cross and isolated margin accounts.

### HTTP Request[​](#http-request "Direct link to HTTP Request")

*   GET /api/v2/margin/market/long-short-ratio

Request Example

```
curl "https://api.bitget.com/api/v2/margin/market/long-short-ratio?symbol=BTCUSDT"
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter | Type | Required | Description |
| :-- | :-- | :-- | :-- |
| symbol | String | Yes | Trading pair 
| period | String | No | Default:<code>24h</code>, support:<br><code>24h</code><br><code>30d</code> 
| coin | String | No | Base coin or quete coin, default: base coin 

Response Example

```
{    "code": "00000",    "msg": "success",    "requestTime": 1656589586807,    "data": [        {            "ts": "1713942000000",            "longShortRatio": "-0.96"        },        {            "ts": "1713942000000",            "longShortRatio": "-0.96"        }    ]}
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter | Type | Description |
| :-- | :-- | :-- |
| longShortRatio | String | long short ratio 
| ts | String | Millseconds time

# Get Margin loan growth rate Data

Frequency limit: 1 times/1s (IP)

### Description[​](#description "Direct link to Description")

The growth rate of borrowed funds for a specific coin in cross and isolated margin accounts.

### HTTP Request[​](#http-request "Direct link to HTTP Request")

*   GET /api/v2/mix/market/loan-growth

Request Example

```
curl "https://api.bitget.com/api/v2/mix/market/loan-growth?symbol=BTCUSDT"
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter | Type | Required | Description |
| :-- | :-- | :-- | :-- |
| symbol | String | Yes | Trading pair 
| period | String | No | Default:<code>24h</code>, support:<br><code>24h</code><br><code>30d</code> 
| coin | String | No | Base coin or quete coin, default: base coin 

Response Example

```
{    "code": "00000",    "msg": "success",    "requestTime": 1656589586807,    "data": [        {            "ts": "1713942000000",            "growthRate": "-0.96"        },        {            "ts": "1713942000000",            "growthRate": "-0.96"        }    ]}
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter | Type | Description |
| :-- | :-- | :-- |
| growthRate | String | growth ratio 
| ts | String | Millseconds time

# Get Isolated margin borrowing ratio Data

Frequency limit: 1 times/1s (IP)

### Description[​](#description "Direct link to Description")

The ratio of borrowed amount in the base currency (left) and borrowed amount in the quote currency (right) in isolated margin accounts, converted to USDT.

### HTTP Request[​](#http-request "Direct link to HTTP Request")

*   GET /api/v2/mix/market/isolated-borrow-rate

Request Example

```
curl "https://api.bitget.com/api/v2/mix/market/isolated-borrow-rate?symbol=BTCUSDT"
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter | Type | Required | Description |
| :-- | :-- | :-- | :-- |
| symbol | String | Yes | Trading pair 
| period | String | No | Default:<code>24h</code>, support:<br><code>24h</code><br><code>30d</code> 

Response Example

```
{    "code": "00000",    "msg": "success",    "requestTime": 1656589586807,    "data": [        {            "ts": "1713942000000",            "borrowRate": "-0.96"        },        {            "ts": "1713942000000",            "borrowRate": "-0.96"        }    ]}
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter | Type | Description |
| :-- | :-- | :-- |
| borrowRate | String | borrow ratio 
| ts | String | Millseconds time

# Get Futures Long and Short Ratio Data

Rate limit: 1 req/1s (IP)

### Description[​](#description "Direct link to Description")

Get Futures Long and Short Ratio Data

### HTTP Request[​](#http-request "Direct link to HTTP Request")

*   GET /api/v2/mix/market/long-short

Request Example

```
curl "https://api.bitget.com/api/v2/mix/market/long-short?symbol=BTCUSDT"
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter | Type | Required | Description |
| :-- | :-- | :-- | :-- |
| symbol | String | Yes | Trading pair 
| period | String | No | - default:5m, support:<br><code>5m</code><br><code>15m</code><br><code>30m</code><br><code>1h</code><br><code>2h</code><br><code>4h</code><br><code>6h</code><br><code>12h</code><br><code>1Dutc</code> 

Response Example

```
{    "code": "00000",    "msg": "success",    "requestTime": 1656589586807,    "data": [        {            "longRatio": "0.01",            "shortRatio": "0.12",            "longShortRatio": "1.2",            "ts": "1714020600000"        },        {            "longRatio": "0.01",            "shortRatio": "0.12",            "longShortRatio": "1.2",            "ts": "1714020600000"        }    ]}
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter | Type | Description |
| :-- | :-- | :-- |
| longRatio | String | Long Ratio 
| shortRatio | String | Short Ratio 
| longShortRatio | String | Long Short Ratio 
| ts | String | Millseconds time

# Get spot fund flow

Rate limit: 1 req/1s (IP)

### Description[​](#description "Direct link to Description")

Get spot fund flow

### HTTP Request[​](#http-request "Direct link to HTTP Request")

*   GET /api/v2/spot/market/fund-flow

Request Example

```
curl "https://api.bitget.com/api/v2/spot/market/fund-flow?symbol=BTCUSDT&period=1d"
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter | Type | Required | Description |
| :-- | :-- | :-- | :-- |
| symbol | String | Yes | Trading pairs, BTCUSDT 
| period | String | No | Query period: 15m(default),30m,1h,2h,4h,1d 

Response Example

```
{    "code": "00000",    "msg": "success",    "requestTime": 1656589586807,    "data": {        "whaleBuyVolume": "50.901579",        "dolphinBuyVolume": "1.506897",        "fishBuyVolume": "0.529853",        "whaleSellVolume": "50.635982",        "dolphinSellVolume": "1.429034",        "fishSellVolume": "0.344032",        "whaleBuyRatio": "50.901579",        "dolphinBuyRatio": "1.506897",        "fishBuyRatio": "0.529853",        "whaleSellRatio": "50.635982",        "dolphinSellRatio": "1.429034",        "fishSellRatio": "0.344032"    }}
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter | Type | Description |
| :-- | :-- | :-- |
| whaleBuyVolume | String | Whale buy volume 
| dolphinBuyVolume | String | Dolphin Buy Volume 
| fishBuyVolume | String | Fish Buy Volume 
| whaleSellVolume | String | Whale Sell Volume 
| dolphinSellVolume | String | Dolphin Sell Volume 
| fishSellVolume | String | Fish Sell Volume 
| whaleBuyRatio | String | Whale Buy Ratio 
| dolphinBuyRatio | String | Dolphin Buy Ratio 
| fishBuyRatio | String | Fish Buy Ratio 
| whaleSellRatio | String | Whale Sell Ratio 
| dolphinSellRatio | String | Dolphin Sell Ratio 
| fishSellRatio | String | Fish Sell Ratio

# Get Trade data support symbols

Rate limit: 1 req/1s (IP)

### Description[​](#description "Direct link to Description")

Get Trade data support symbols

### HTTP Request[​](#http-request "Direct link to HTTP Request")

*   GET /api/v2/spot/market/support-symbols

Request Example

```
curl "https://api.bitget.com/api/v2/spot/market/support-symbols"
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

N/A

Response Example

```
{    "code": "00000",    "msg": "success",    "requestTime": 1656589586807,    "data": {        "spotList": ["BTCUSDT","ETHUSDT"],        "futureList": ["BTCUSDT","ETHUSDT"]    }}
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter | Type | Description |
| :-- | :-- | :-- |
| spotList | List | Spot data symbols 
| futureList | List | Futures data symbols

# Get Spot Whale Net Flow Data

Rate limit: 1 req/s (IP)

### Description[​](#description "Direct link to Description")

Get spot fund flow

### HTTP Request[​](#http-request "Direct link to HTTP Request")

*   GET /api/v2/spot/market/fund-net-flow

Request Example

```
curl "https://api.bitget.com/api/v2/spot/market/fund-net-flow?symbol=BTCUSDT"
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter | Type | Required | Description |
| :-- | :-- | :-- | :-- |
| symbol | String | Yes | Trading pair 

Response Example

```
{    "code": "00000",    "msg": "success",    "requestTime": 1656589586807,    "data": [        {            "netFlow": "-1.1",            "ts": "1713942000000"        },        {            "netFlow": "-1.1",            "ts": "1713942000000"        },        {            "netFlow": "-1.1",            "ts": "1713942000000"        },        {            "netFlow": "-1.1",            "ts": "1713942000000"        },        {            "netFlow": "-1.1",            "ts": "1713942000000"        }    ]}
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter | Type | Description |
| :-- | :-- | :-- |
| netFlow | String | Whale fund net flow 
| ts | String | Millseconds time

# Get Futures Active Long Short Account Data

Rate limit: 1 req/s (IP)

### Description[​](#description "Direct link to Description")

Get Futures Active Long Short Account Data

### HTTP Request[​](#http-request "Direct link to HTTP Request")

*   GET /api/v2/mix/market/account-long-short

Request Example

```
curl "https://api.bitget.com/api/v2/mix/market/account-long-short?symbol=BTCUSDT"
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter | Type | Required | Description |
| :-- | :-- | :-- | :-- |
| symbol | String | Yes | Trading pair 
| period | String | No | - default:5m, support:<br><code>5m</code><br><code>15m</code><br><code>30m</code><br><code>1h</code><br><code>2h</code><br><code>4h</code><br><code>6h</code><br><code>12h</code><br><code>1d</code> 

Response Example

```
{    "code": "00000",    "msg": "success",    "requestTime": 1656589586807,    "data": [        {            "longAccountRatio": "0.01",            "shortAccountRatio": "0.12",            "longShortAccountRatio": "1.2",            "ts": "1714020600000"        },        {            "longAccountRatio": "0.01",            "shortAccountRatio": "0.12",            "longShortAccountRatio": "1.2",            "ts": "1714020600000"        }    ]}
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter | Type | Description |
| :-- | :-- | :-- |
| longAccountRatio | String | Long Account Ratio 
| shortAccountRatio | String | Short Account Ratio 
| longShortAccountRatio | String | Long Short Account Ratio 
| ts | String | Millseconds time

# Create Virtual Subaccount

Frequency limit: 5 times/1s (User ID)

### Description[​](#description "Direct link to Description")

This interface currently supports the creation of virtual sub-accounts in batch.(It's required API key binding IP address)

### HTTP Request[​](#http-request "Direct link to HTTP Request")

*   POST /api/v2/user/create-virtual-subaccount

Request Example

```
curl -X POST "https://api.bitget.com/api/v2/user/create-virtual-subaccount" \   -H "ACCESS-KEY:*******" \   -H "ACCESS-SIGN:*" \   -H "ACCESS-PASSPHRASE:*" \   -H "ACCESS-TIMESTAMP:1659076670000" \   -H "locale:en-US" \   -H "Content-Type: application/json" \  -d '{"subAccountList": ["testtest"]}'
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter | Type | Required | Description |
| :-- | :-- | :-- | :-- |
| subAccountList | List&lt;String&gt; | Yes | Virtual alias 8-character English letters,Global unique 

Response Example

```
{    "code": "00000",    "msg": "success",    "requestTime": 1682660169412,    "data": {        "failureList": [            {                "subaAccountName": "****@*****.com"            }        ],        "successList": [            {                "subaAccountUid": "**********",                "subaAccountName": "****@*****.com",                "status": "normal",                "label": "",                "permList": [                    "contract_trade",                    "spot_trade"                ],                "cTime": "1682660169573",                "uTime": "1682660169573"            }        ]    }}
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter | Type | Description |
| :-- | :-- | :-- |
| failureList | Array | Sub-account array creation failed<br>- Alias already exists<br>- The number of sub-accounts created has reached the limit 
| subaAccountName | String | Sub-account name 
| successList | Array | Sub-account array created successfully 
| subaAccountUid | String | Sub-account uid 
| subaAccountName | String | Sub-account name 
| status | String | Sub-account status<br>normal Normal<br>freeze Freeze<br>del Deleted 
| permList | List | Sub-account permissions<br>spot_trade Spot trade<br>contract_trade Futures trade read-write<br>read Read permissions 
| label | String | Note 
| cTime | String | Sub-account creation time, Unix millisecond timestamps. 
| uTime | String | Sub-account update time, Unix millisecond timestamps.

# Modify Virtual Subaccount

Frequency limit: 5 times/1s (User ID)

### Description[​](#description "Direct link to Description")

Modify the virtual sub-account

### HTTP Request[​](#http-request "Direct link to HTTP Request")

*   POST /api/v2/user/modify-virtual-subaccount

Request Example

```
curl -X POST "https://api.bitget.com/api/v2/user/modify-virtual-subaccount" \   -H "ACCESS-KEY:*******" \   -H "ACCESS-SIGN:*" \   -H "ACCESS-PASSPHRASE:*" \   -H "ACCESS-TIMESTAMP:1659076670000" \   -H "locale:en-US" \   -H "Content-Type: application/json" \     -d '{"subAccountUid": "1","permList":["spot_trade","contract_trade"], "status":"normal"}'
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter | Type | Required | Description |
| :-- | :-- | :-- | :-- |
| subAccountUid | String | Yes | Sub-account Uid 
| permList | List&lt;String&gt; | Yes | Permissions<br>spot_trade Spot trade<br>contract_trade Futures trade read-write<br>read Read permissions 
| status | String | Yes | Sub-account status<br>normal Normal<br>freeze Freeze 

Response Example

```
{    "code": "00000",    "msg": "success",    "requestTime": 1682660666458,    "data": {        "result": "success"    }}
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter | Type | Description |
| :-- | :-- | :-- |
| result | String | Edit result<br><code>success</code> Success<br><code>failure</code> Failure

# Batch Create Virtual Subaccount and Apikey

Frequency limit: 1 times/1s (User ID)

### Description[​](#description "Direct link to Description")

Create the virtual sub-account and apikey in batch

*   The max length of list is 5 in each request.
*   Every sub-account can create up to 10 API Key
*   You can create up to 20 sub-accounts.

### HTTP Request[​](#http-request "Direct link to HTTP Request")

*   POST /api/v2/user/batch-create-subaccount-and-apikey

Request Example

```
curl -X POST "https://api.bitget.com/api/v2/user/batch-create-subaccount-and-apikey" \   -H "ACCESS-KEY:*******" \   -H "ACCESS-SIGN:*" \   -H "ACCESS-PASSPHRASE:*" \   -H "ACCESS-TIMESTAMP:1659076670000" \   -H "locale:en-US" \   -H "Content-Type: application/json" \     -d '[{"subAccountName":"test","passphrase":"12345678","permList":["spot_trade","margin_trade","contract_trade"],"label":"1681808312065"}]'
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter | Type | Required | Description |
| :-- | :-- | :-- | :-- |
| subAccountName | String | Yes | Virtual sub-account alias8-character English letters 
| passphrase | String | Yes | Passcode English letters of 8−32 characters + numbers 
| label | String | Yes | Sub-account note Length 20 
| ipList | List | No | Virtual sub-account ApiKey ip whitelist, Max. 30 
| permList | List | No | Sub-account permissions<br><code>spot_trade</code>: Spot trade<br><code>margin_trade</code>: Spot Marign trade<br><code>contract_trade</code>: Futures trade read-write<br><code>read</code>: Read permissions 

Response Example

```
{    "code": "00000",    "msg": "success",    "requestTime": 1682662465346,    "data": [        {            "subAccountUid": "***********",            "subAccountName": "*****@*******.com",            "label": "1681808312065",            "subAccountApiKey": "xx_xxx",            "secretKey": "XXXXXXXXXXXXXXX",            "permList": [                "spot_trade",                "margin_trade",                "contract_trade"            ],            "ipList": [                "127.0.0.1"            ]        }    ]}
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter | Type | Description |
| :-- | :-- | :-- |
| subAccountUid | String | Virtual sub-account Uid 
| subAccountName | String | Virtual sub-account alias8-character English letters 
| label | String | Sub-account noteLength 20 
| subAccountApiKey | String | Sub-account apikey 
| secretKey | String | Sub-account secret key 
| permList | List | Sub-account permissions<br><code>spot_trade</code>: Spot trade<br><code>margin_trade</code>: Spot Marign trade<br><code>contract_trade</code>: Futures trade read-write<br><code>read</code>: Read permissions 
| ipList | List | ip whitelist

# Get Virtual Subaccounts

Frequency limit: 10 times/1s (User ID)

### Description[​](#description "Direct link to Description")

Get a list of virtual sub-account

### HTTP Request[​](#http-request "Direct link to HTTP Request")

*   GET /api/v2/user/virtual-subaccount-list

Request Example

```
curl "https://api.bitget.com/api/v2/user/virtual-subaccount-list?limit=20" \  -H "ACCESS-KEY:*******" \  -H "ACCESS-SIGN:*" \  -H "ACCESS-PASSPHRASE:*" \  -H "ACCESS-TIMESTAMP:1659076670000" \  -H "locale:en-US" \  -H "Content-Type: application/json"
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter | Type | Required | Description |
| :-- | :-- | :-- | :-- |
| limit | String | No | Entries per page<br>Default: 100, maximum: 500 
| idLessThan | String | No | Final sub-account ID, required for paging. 
| status | String | No | Sub-account status<br>normal Normal<br>freeze Freeze 

Response Example

```
{    "code": "00000",    "msg": "success",    "requestTime": 1656589586807,    "data": {        "endId": 51,        "subAccountList": [            {                "subAccountUid": "********",                "subAccountName": "****@*****.com",                "status": "normal",                "permList": [                    "read",                    "spot_trade",                    "contract_trade"                ],                "label": "mySub01",                "accountType":"hosting",                "bindingTime":"1653287983475",                "cTime": "1653287983475",                "uTime": "1682660169573"            }        ]    }}
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter | Type | Description |
| :-- | :-- | :-- |
| subAccountList | Array | Sub-account array 
| &gt; subAccountUid | String | Sub-account uid 
| &gt; subAccountName | String | Sub-account username 
| &gt; label | String | Sub-account ApiKey note, max length 20 
| &gt; status | String | Sub-account status<br>normal Normal<br>freeze Freeze<br>del Deleted 
| &gt; permList | List | Sub-account permissions<br>spot_trade Spot trade<br>contract_trade Futures trade read-write<br>read Read permissions 
| &gt; cTime | String | Sub-account creation time 
| &gt; uTime | String | Sub-account update time 
| endId | String | This is used when idLessThan/idGreaterThan is set as a range.

# Create Virtual Subaccount Apikey

Frequency limit: 5 times/1s (User ID)

### Description[​](#description "Direct link to Description")

Only supports API Key calls from the main account, and the API Key needs to be bound to an IP address.

Create the virtual sub-account apikey

### HTTP Request[​](#http-request "Direct link to HTTP Request")

*   POST /api/v2/user/create-virtual-subaccount-apikey

Request Example

```
curl -X POST "https://api.bitget.com/api/v2/user/create-virtual-subaccount-apikey" \   -H "ACCESS-KEY:*******" \   -H "ACCESS-SIGN:*" \   -H "ACCESS-PASSPHRASE:*" \   -H "ACCESS-TIMESTAMP:1659076670000" \   -H "locale:en-US" \   -H "Content-Type: application/json" \     -d '{    "subAccountUid":"1",    "passphrase":"pssword1",    "label":"test1_account",    "ipList":["127.0.0.1"],    "permList":[        "spot_trade"    ]}'
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter | Type | Required | Description |
| :-- | :-- | :-- | :-- |
| subAccountUid | String | Yes | Sub-account uid 
| passphrase | String | Yes | Passcode English letters of 8−32 characters + numbers 
| label | String | Yes | Note Length 20 
| ipList | List&lt;String&gt; | No | ip whitelist<br>Up to 30, if not then ip whitelist is set to empty. 
| permList | List | No | Sub-account permissions<br><code>spot_trade</code>: Spot trade<br><code>margin_trade</code>: Spot Marign trade<br><code>contract_trade</code>: Futures trade read-write<br><code>transfer</code>:Wallet transfer<br><code>read</code>: Read permissions 

Response Example

```
{  "code": "00000",  "msg": "success",  "requestTime": 1682660169412,  "data": {    "subAccountUid": "1",    "label": "test1_account",    "subAccountApiKey": "xx_xxx",    "secretKey": "xxx",    "permList": [      "spot_trade"    ],    "ipList": [      "127.0.0.1"    ]  }}
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter | Type | Description |
| :-- | :-- | :-- |
| subAccountUid | String | Sub-account uid 
| subAccountApiKey | String | Sub-account apikey 
| secretKey | String | Sub-account private key 
| permList | List | Sub-account permissions<br><code>spot_trade</code>: Spot trade<br><code>margin_trade</code>: Spot Marign trade<br><code>contract_trade</code>: Futures trade read-write<br><code>transfer</code>:Wallet transfer<br><code>read</code>: Read permissions 
| label | String | Sub-account apikey note 
| ipList | List | ip whitelist

# Modify Virtual Subaccount Apikey

Frequency limit: 5 times/1s (User ID)

### Description[​](#description "Direct link to Description")

Only supports API Key calls from the main account, and the API Key needs to be bound to an IP address

Modify the virtual sub-account or general sub-account API Key

### HTTP Request[​](#http-request "Direct link to HTTP Request")

*   POST /api/v2/user/modify-virtual-subaccount-apikey

Request Example

```
curl -X POST "https://api.bitget.com/api/v2/user/modify-virtual-subaccount-apikey" \   -H "ACCESS-KEY:*******" \   -H "ACCESS-SIGN:*" \   -H "ACCESS-PASSPHRASE:*" \   -H "ACCESS-TIMESTAMP:1659076670000" \   -H "locale:en-US" \   -H "Content-Type: application/json" \     -d '{"subAccountUid":"1","subAccountApiKey":"xx_xxx", "passphrase":"xxx","permList":["spot_trade","contract_trade"],"label":"label","ipList":["127.0.0.1","127.0.0.2"]}'
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter | Type | Required | Description |
| :-- | :-- | :-- | :-- |
| subAccountUid | String | Yes | Sub-account uid 
| passphrase | String | Yes | Passcode English letters of 8−32 characters + numbers 
| label | String | Yes | Note Length 20 
| ipList | List&lt;String&gt; | No | ip whitelist<br>Up to 30, if not then ip whitelist is set to empty. 
| permList | List&lt;String&gt; | No | Sub-account permissions<br><code>spot_trade</code>: Spot trade<br><code>margin_trade</code>: Spot Marign trade<br><code>contract_trade</code>: Futures trade read-write<br><code>transfer</code>:Wallet transfer<br><code>read</code>: Read permissions<br>If this parameter is not passed, it will be ignored, and the existing permissions will be retained<br>If an empty value is passed, the existing permissions of this API Key will be removed 
| subAccountApiKey | Yes | String | Sub-account ApiKey 

Response Example

```
{    "code": "00000",    "msg": "success",    "requestTime": 1682660169412,    "data": {        "subAccountUid": "1",        "label": "sub api",        "subAccountApiKey": "xx_xxx",        "secretKey": "xxx",        "permList": [            "spot_trade",            "contract_trade"        ],        "ipList": [            "127.0.0.1"        ]    }}
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter | Type | Description |
| :-- | :-- | :-- |
| subAccountUid | String | Sub-account uid 
| subAccountApiKey | String | Sub-account apikey 
| secretKey | String | secretKey 
| permList | List | Sub-account permissions<br><code>spot_trade</code>: Spot trade<br><code>margin_trade</code>: Spot Marign trade<br><code>contract_trade</code>: Futures trade read-write<br><code>transfer</code>:Wallet transfer<br><code>read</code>: Read permissions 
| label | String | Sub-account apikey note 
| ipList | List | Sub-account apikey ip whitelist

# Get Subaccount Apikey List

Rate Limit: 5 req/sec/UID

### Description[​](#description "Direct link to Description")

Only supports API Key calls from the main account, and the API Key needs to be bound to an IP address

Support to get virtual sub-account or general sub-account API Key list

### HTTP Request[​](#http-request "Direct link to HTTP Request")

*   GET /api/v2/user/virtual-subaccount-apikey-list

Request Example

```
curl -X GET "https://api.bitget.com/api/v2/user/virtual-subaccount-apikey-list?subAccountUid=1" \   -H "ACCESS-KEY:*******" \   -H "ACCESS-SIGN:*" \   -H "ACCESS-PASSPHRASE:*" \   -H "ACCESS-TIMESTAMP:1659076670000" \   -H "locale:en-US" \   -H "Content-Type: application/json" 
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter | Type | Required | Description |
| :-- | :-- | :-- | :-- |
| subAccountUid | String | Yes | Sub-account uid 

Response Example

```
{    "code": "00000",    "msg": "success",    "requestTime": 1682661432874,    "data": [        {            "subAccountUid": "1",            "label": "1682396356594",            "subAccountApiKey": "xx_xxx",            "permList": [                "spot_trade",                "margin_trade",                "contract_trade"            ],            "ipList": [                "127.0.0.1"            ]        }    ]}
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter | Type | Description |
| :-- | :-- | :-- |
| subAccountUid | String | Sub-account uid 
| subAccountApiKey | String | Sub-account ApiKey 
| permList | List | Sub-account permissions<br><code>spot_trade</code>: Spot trade<br><code>margin_trade</code>: Spot Marign trade<br><code>contract_trade</code>: Futures trade read-write<br><code>transfer</code>:Wallet transfer<br><code>read</code>: Read permissions 
| label | String | Sub-account apikey note 
| ipList | List | ip whitelist

# Funding Assets

Frequency limit: 10 times/1s (User ID)

### HTTP Request[​](#http-request "Direct link to HTTP Request")

*   GET /api/v2/account/funding-assets

Request Example

```
curl "https://api.bitget.com/api/v2/account/funding-assets" \  -H "ACCESS-KEY:your apiKey" \  -H "ACCESS-SIGN:*******" \  -H "ACCESS-PASSPHRASE:*****" \  -H "ACCESS-TIMESTAMP:1659076670000" \  -H "locale:en-US" \  -H "Content-Type: application/json"
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter | Type | Required | Description |
| :-- | :-- | :-- | :-- |
| coin | String | No | default all coin 

Response Example

```
{  "code": "00000",  "msg": "success",  "requestTime": 1712129301188,  "data": [    {      "coin": "USDT",      "available": "326",      "frozen": "",      "usdtValue": "326"    }  ]}
```

### Response parameters[​](#response-parameters "Direct link to Response parameters")

| Parameter | Type | Description |
| :-- | :-- | :-- |
| data | List&lt;Object&gt; | assets List 
| &gt; coin | String | coin 
| &gt; available | String | available 
| &gt; frozen | String | forzen 
| &gt; usdtValue | String | USDT value

# Bot account

Frequency limit: 10 times/1s (User ID)

Bot account

### HTTP Request[​](#http-request "Direct link to HTTP Request")

*   GET /api/v2/account/bot-assets

Request Example

```
curl "https://api.bitget.com/api/v2/account/bot-assets?accountType=futures" \  -H "ACCESS-KEY:your apiKey" \  -H "ACCESS-SIGN:*******" \  -H "ACCESS-PASSPHRASE:*****" \  -H "ACCESS-TIMESTAMP:1659076670000" \  -H "locale:en-US" \  -H "Content-Type: application/json"
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter | Type | Required | Description |
| :-- | :-- | :-- | :-- |
| accountType | String | No | bot account type<br>futures<br>spot 

Response Example

```
{  "code": "00000",  "msg": "success",  "requestTime": 1712131247803,  "data": [    {      "coin": "USDT",      "available": "84.61136285",      "equity": "140.94936285",      "bonus": "0",      "frozen": "0",      "usdtValue": "140.949362850622"    }  ]}
```

### Response parameters[​](#response-parameters "Direct link to Response parameters")

| Parameter | Type | Description |
| :-- | :-- | :-- |
| data | List&lt;Object&gt; | assetsList 
| &gt; coin | String | coin 
| &gt; available | String | available 
| &gt; equity | String | account assets 
| &gt; bonus | String | trading bonuses 
| &gt; frozen | String | in orders 
| &gt; usdtValue | String | USDT values

# Assets overview

Frequency limit: 1 times/1s (User ID)

Assets overview

### HTTP Request[​](#http-request "Direct link to HTTP Request")

*   GET /api/v2/account/all-account-balance

Request Example

```
curl "https://api.bitget.com/api/v2/account/all-account-balance" \  -H "ACCESS-KEY:your apiKey" \  -H "ACCESS-SIGN:*******" \  -H "ACCESS-PASSPHRASE:*****" \  -H "ACCESS-TIMESTAMP:1659076670000" \  -H "locale:en-US" \  -H "Content-Type: application/json"
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter | Type | Required | Description |
| :-- | :-- | :-- | :-- |

Response example

```
{  "code": "00000",  "msg": "success",  "requestTime": 1712129301188,  "data": [    {      "accountType": "spot",      "usdtBalance": "326883.9190752508"    },    {      "accountType": "futures",      "usdtBalance": "280108.503808983783"    },    {      "accountType": "funding",      "usdtBalance": "0"    },    {      "accountType": "earn",      "usdtBalance": "142313.7"    },    {      "accountType": "bots",      "usdtBalance": "210.585022843422"    },    {      "accountType": "margin",      "usdtBalance": "54616.35774218"    }  ]}
```

### Response parameters[​](#response-parameters "Direct link to Response parameters")

| Parameter | Type | Description |
| :-- | :-- | :-- |
| data | List&lt;Object&gt; | assetsList 
| &gt; accountType | String | account Type 
| &gt; usdtBalance | String | USDT amount

# Get Convert Coins

Frequency limit:10 times/1s (User ID)

### Description[​](#description "Direct link to Description")

Get a list of Flash Currencies

### HTTP Request[​](#http-request "Direct link to HTTP Request")

*   GET /api/v2/convert/currencies

Request Example

```
curl "https://api.bitget.com/api/v2/convert/currencies" \   -H "ACCESS-KEY:*******" \   -H "ACCESS-SIGN:*" \   -H "ACCESS-PASSPHRASE:*" \   -H "ACCESS-TIMESTAMP:1659076670000" \   -H "locale:en-US" \   -H "Content-Type: application/json" \
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

N/A

Response Example

```
{    "code": "00000",    "data": [        {            "coin": "ETH",            "available": "0.9994",            "maxAmount": "5",            "minAmount": "0.0005"        }    ],    "msg": "success",    "requestTime": 1627293612502}
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter | Type | Description |
| :-- | :-- | :-- |
| coin | String | Token name 
| available | String | Currency accounts available 
| maxAmount | String | Maximum available quantity as fromCoin means maximum consumable quantity, as toCoin means maximum redeemable quantity. 
| minAmount | String | Minimum usable quantity as fromCoin represents the minimum consumable quantity, as toCoin represents the minimum redeemable quantity.

# Get Quoted Price

Frequency limit:10 times/1s (User ID)

### Description[​](#description "Direct link to Description")

Get Quoted Price

### HTTP Request[​](#http-request "Direct link to HTTP Request")

*   GET /api/v2/convert/quoted-price

Request Example

```
curl "https://api.bitget.com/api/v2/convert/quoted-price?fromCoin=USDT&fromCoinSz=444&toCoin=ETH" \   -H "ACCESS-KEY:*******" \   -H "ACCESS-SIGN:*" \   -H "ACCESS-PASSPHRASE:*" \   -H "ACCESS-TIMESTAMP:1659076670000" \   -H "locale:en-US" \   -H "Content-Type: application/json"
```

### request parameters[​](#request-parameters "Direct link to request parameters")

| Parameter | Type | Required | Description |
| :-- | :-- | :-- | :-- |
| fromCoin | String | Yes | Quote currency 
| fromCoinSize | String | No | Number of coins to inquire about fromCoinSz and toCoinSz are only allowed to be passed in at the same time. 
| toCoin | String | Yes | Target currency 
| toCoinSize | String | No | Number of target coins fromCoinSz and toCoinSz are only allowed to be passed in at the same time. 

Response Example

```
{    "code": "00000",    "data": {        "fee": "0",        "fromCoinSize": 100,        "fromCoin": "USDT",        "cnvtPrice": "0.0005226794534969",        "toCoinSize": "0.23206967",        "toCoin": "ETH",        "traceId": "1"    },    "msg": "success",    "requestTime": 1627293612502}
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter | Type | Description |
| :-- | :-- | :-- |
| fromCoin | String | Quote currency 
| fromCoinSize | String | Number of currencies 
| cnvtPrice | String | Swap price<br>Flash price = Quote currency price / Target currency price 
| toCoin | String | Target currency 
| toCoinSize | String | Number of target currencies 
| traceId | String | RFQ id 
| fee | String | Transaction fee

# Convert

Rate limit: 5 req/sec/UID

### Description[​](#description "Direct link to Description")

Convert

### HTTP Request[​](#http-request "Direct link to HTTP Request")

*   POST /api/v2/convert/trade

Request Example

```
curl -X POST "https://api.bitget.com/api/v2/convert/trade" \   -H "ACCESS-KEY:*******" \   -H "ACCESS-SIGN:*" \   -H "ACCESS-PASSPHRASE:*" \   -H "ACCESS-TIMESTAMP:1659076670000" \   -H "locale:en-US" \   -H "Content-Type: application/json" \  -d '{"fromCoin": "USDT","fromCoinSize":"444","toCoin":"ETH","cnvtPrice":"0.0005226794534969","toCoinSize":"0.23206967","traceId":"1"}'
```

### request parameters[​](#request-parameters "Direct link to request parameters")

| Parameter | Type | Required | Description |
| :-- | :-- | :-- | :-- |
| fromCoin | String | Yes | Quote currency 
| fromCoinSize | String | Yes | Number of currencies 
| cnvtPrice | String | Yes | Results obtained by request for quotation 
| toCoin | String | Yes | Target currency 
| toCoinSize | String | Yes | Number of target currencies converted 
| traceId | String | Yes | RFQ id, valid for 8 seconds 

Response Example

```
{    "code": "00000",    "data": {        "ts": "1688527221603",        "cnvtPrice": "0.00052268",        "toCoinSize": "0.23206967",        "toCoin": "ETH"    },    "msg": "success",    "requestTime": 1627293612502}
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter | Type | Description |
| :-- | :-- | :-- |
| toCoin | String | Switch 
| toCoinSize | String | Coin swap amount 
| cnvtPrice | String | Swap price 
| ts | String | Conversion time, Unix millisecond timestamps

# Get Convert History

Frequency limit:10 times/1s (User ID)

### Description[​](#description "Direct link to Description")

Get Convert History

### HTTP Request[​](#http-request "Direct link to HTTP Request")

*   GET /api/v2/convert/convert-record

Request Example

```
curl "https://api.bitget.com/api/v2/convert/convert-record?startTime=1686128558000&endTime=1686214958000&limit=10" \   -H "ACCESS-KEY:*******" \   -H "ACCESS-SIGN:*" \   -H "ACCESS-PASSPHRASE:*" \   -H "ACCESS-TIMESTAMP:1659076670000" \   -H "locale:en-US" \   -H "Content-Type: application/json" 
```

### request parameters[​](#request-parameters "Direct link to request parameters")

| Parameter | Type | Required | Description |
| :-- | :-- | :-- | :-- |
| startTime | String | Yes | Start time, Unix millisecond timestamps 
| endTime | String | Yes | End time, Unix millisecond timestamps<br>The maximum interval between startTime and endTime is 90 days. 
| limit | String | No | Default 20 Maximum 100 
| idLessThan | String | No | ID of the last record endId 

Response Example

```
{    "code": "00000",    "data": {        "dataList": [            {                "id": "1",                "ts": "1688527512229",                "cnvtPrice": "0.00052268",                "fee": "0",                "fromCoinSize": 100,                "fromCoin": "USDT",                "toCoinSize": "0.23206967",                "toCoin": "ETH"            }        ],        "endId": "1"    },    "msg": "success",    "requestTime": 1627293612502}
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter | Type | Description |
| :-- | :-- | :-- |
| dataList | List | List 
| id | String | Splash Record id 
| ts | String | Time of generation of flash transfer records 
| cnvtPrice | String | Coin swap price 
| fee | String | Transaction fee 
| fromCoinSize | String | Coin swap amount 
| fromCoin | String | Switch 
| toCoinSize | String | Get the number of target coins 
| toCoin | String | Target currency 
| endId | String | Pagination

# Get BGB Convert Coins

Frequency limit:10 times/1s (User ID)

### Description[​](#description "Direct link to Description")

Get a list of Convert Bgb Currencies

### HTTP Request[​](#http-request "Direct link to HTTP Request")

*   GET /api/v2/convert/bgb-convert-coin-list

Request Example

```
curl "https://api.bitget.com/api/v2/convert/bgb-convert-coin-list" \   -H "ACCESS-KEY:*******" \   -H "ACCESS-SIGN:*" \   -H "ACCESS-PASSPHRASE:*" \   -H "ACCESS-TIMESTAMP:1659076670000" \   -H "locale:en-US" \   -H "Content-Type: application/json" \
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

N/A

Response Example

```
{    "code": "00000",    "msg": "success",    "requestTime": 1703831563264,    "data": {        "coinList": [            {                "coin": "SEAM",                "available": "0.00303329",                "bgbEstAmount": "0.03794680",                "precision": "8",                "feeDetail": [                    {                        "feeRate": "0.02",                        "fee": "0.00075893"                    }                ],                "cTime": "1703831563514"            }        ]    }}
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter | Type | Description |
| :-- | :-- | :-- |
| coin | String | Token name 
| available | String | Currency accounts available 
| bgbEstAmount | String | Expected number of BGB redeemable 
| precision | String | bgb scale 
| feeDetail | String | fee detail 
| &gt; feeRate | String | fee rate 
| &gt; fee | String | fee 
| cTime | String | Currently Time (time stamp in milliseconds)

# Convert BGB

Frequency limit:10 times/1s (User ID)

### Description[​](#description "Direct link to Description")

Convert BGB

### HTTP Request[​](#http-request "Direct link to HTTP Request")

*   POST /api/v2/convert/bgb-convert

Request Example

```
curl -X POST "https://api.bitget.com/api/v2/convert/bgb-convert" \   -H "ACCESS-KEY:*******" \   -H "ACCESS-SIGN:*" \   -H "ACCESS-PASSPHRASE:*" \   -H "ACCESS-TIMESTAMP:1659076670000" \   -H "locale:en-US" \   -H "Content-Type: application/json" \  -d \'{"coinList": ["EOS","GROK"]}'  
```

### request parameters[​](#request-parameters "Direct link to request parameters")

| Parameter | Type | Required | Description |
| :-- | :-- | :-- | :-- |
| coinList | String | Yes | swap coins 

Response Example

```
{  "code": "00000",  "data": {    "orderList": [   {        "coin": "EOS",        "orderId": "1233431213"   },   {        "coin": "GROK",        "orderId": "1233431213"   }          ],   }  "msg": "success",  "requestTime": 1627293612502}
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter | Type | Description |
| :-- | :-- | :-- |
| orderList | String |  
| &gt; coin | String | Coin swap 
| &gt; orderId | String | swap order Id

# Get BGB Convert History

Frequency limit:10 times/1s (User ID)

### Description[​](#description "Direct link to Description")

Get BGB Convert History

### HTTP Request[​](#http-request "Direct link to HTTP Request")

*   GET /api/v2/convert/bgb-convert-records

Request Example

```
curl "https://api.bitget.com/api/v2/convert/bgb-convert-records?startTime=1686128558000&endTime=1686214958000&limit=10" \   -H "ACCESS-KEY:*******" \   -H "ACCESS-SIGN:*" \   -H "ACCESS-PASSPHRASE:*" \   -H "ACCESS-TIMESTAMP:1659076670000" \   -H "locale:en-US" \   -H "Content-Type: application/json" 
```

### request parameters[​](#request-parameters "Direct link to request parameters")

| Parameter | Type | Required | Description |
| :-- | :-- | :-- | :-- |
| orderId | String | No | Splash Record id 
| startTime | String | No | Start time, Unix millisecond timestamps 
| endTime | String | No | End time, Unix millisecond timestamps<br>The maximum interval between startTime and endTime is 90 days. 
| limit | String | No | Default 20 Maximum 100 
| idLessThan | String | No | ID of the last record endId 

Response Example

```
{    "code": "00000",    "msg": "success",    "requestTime": 1703835442804,    "data": [        {            "orderId": "xxxx",            "fromCoin": "ROOT",            "fromAmount": "64.99837000",            "fromCoinPrice": "0.02954000",            "toCoin": "BGB",            "toAmount": "3.55072001",            "toCoinPrice": "0.54075000",            "feeDetail": [                {                    "feeCoin": "BGB",                    "fee": "0.07101441"                }            ],            "status": "success",            "ctime": "1700837066186"        }    ]}
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter | Type | Description |
| :-- | :-- | :-- |
| data | List | List 
| orderId | String | Splash Record id 
| fromCoin | String | Switch Coin 
| fromAmount | String | Switch amount 
| fromCoinPrice | String | Coin swap price 
| toCoin | String | Target currency 
| toAmount | String | Target currency Amount 
| toCoinPrice | String | Get the price of target coins 
| feeDetail | String | swap fee detail 
| &gt; fee | String | fee 
| &gt; feeCoin | String | fee coin 
| status | String | swap status 
| ts | String | Time of generation of flash transfer records