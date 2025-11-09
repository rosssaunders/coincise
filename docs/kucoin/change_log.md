1.  Home

Copy Page

# Change Log

##### 2025.10.24[#](#20251024)

\[Margin Add\]
[Get Margin Collateral Ratio](/docs-new/rest/margin-trading/market-data/get-margin-collateral-ratio)

##### 2025.10.17[#](#20251017)

**Hedge Mode** is currently supported in Futures Copy Trading.

\[Futures Copy Trading Add\]
[**Switch Position Mod**e](/docs-new/rest/copy-trading/switch-position-mode)

\[Futures Copy Trading Modify\]

| Endpoint                                                                                                             | Request Param Change                                                     |
| -------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| [Add Order](/docs-new/rest/copy-trading/add-order)                                                                   | Added the positionSide parameter to enable **Hedge Mode** configuration. |
| [Add Order Test](/docs-new/rest/copy-trading/add-order-test)                                                         | Added the positionSide parameter to enable **Hedge Mode** configuration. |
| [Add Take Profit And Stop Loss Order](/docs-new/rest/copy-trading/add-take-profit-and-stop-loss-order)               | Added the positionSide parameter to enable **Hedge Mode** configuration. |
| [Get Max Withdraw Margin](/docs-new/rest/copy-trading/get-max-withdraw-margin)                                       | Added the positionSide parameter to enable **Hedge Mode** configuration. |
| [Add Isolated Margin](/docs-new/rest/copy-trading/add-isolated-margin)                                               | Added the positionSide parameter to enable **Hedge Mode** configuration. |
| [Remove Isolated Margin](/docs-new/rest/copy-trading/remove-isolated-margin)                                         | Added the positionSide parameter to enable **Hedge Mode** configuration. |
| [Modify Isolated Margin Auto-Deposit Status](/docs-new/rest/copy-trading/modify-isolated-margin-auto-deposit-status) | Added the positionSide parameter to enable **Hedge Mode** configuration. |

##### 2025.09.30[#](#20250930)

**Cross margin mode** is available in Futures Copy Trading, with a maximum
leverage of up to **20x**.

\[Futures Copy Trading Add\]

| Endpoint                                                                                 | Description                                                           |
| ---------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| [Switch Margin Mode](/docs-new/rest/copy-trading/switch-margin-mode)                     | Modify the margin mode of the current symbol.                         |
| [Modify Cross Margin Leverage](/docs-new/rest/copy-trading/modify-cross-margin-leverage) | Modify the current symbol’s cross-margin leverage multiple.           |
| [Get Cross Margin Requirement](/docs-new/rest/copy-trading/get-cross-margin-requirement) | Querying the cross margin requirements of a symbol by position value. |

\[Futures Copy Trading Modify\]

| Endpoint                                                                                               | Request Param Change                                          |
| ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------- |
| [Add Order](/docs-new/rest/copy-trading/add-order)                                                     | Max leverage is set to 20, and marginMode supports **Cross**. |
| [Add Order Test](/docs-new/rest/copy-trading/add-order-test)                                           | Max leverage is set to 20, and marginMode supports **Cross**. |
| [Add Take Profit And Stop Loss Order](/docs-new/rest/copy-trading/add-take-profit-and-stop-loss-order) | Max leverage is set to 20, and marginMode supports **Cross**. |

##### 2025.09.29[#](#20250929)

We are excited to announce the launch of public interfaces for the Unified
Trading Account API on September 29, 2025, at 08:00 UTC. These interfaces
provide a streamlined way to access trading and market data under the Unified
Trading Account framework. The specific changes are as follows:  
Domain Unification: All API requests for the Unified Trading Account will use
the unified domain: [https://api.kucoin.com](https://api.kucoin.com).

1.

[Get Announcements](/docs-new/rest/ua/get-announcements)

Description: Obtain the latest news announcements, with default page search for
announcements within a month.

Replaces: GET /api/v3/announcements

2.

[Get Currency](/docs-new/rest/ua/get-currency)

Description: Request the currency details of a specified currency.

Replaces:

GET /api/v3/currencies/{currency}

GET /api/v3/currencies

3.

[Get Symbol](/docs-new/rest/ua/get-symbol)

Description: Request a list of available currency pairs for trading.

Replaces:

SPOT: GET /api/v2/symbols/{symbol}

SPOT: GET /api/v2/symbols

FUTURES: GET /api/v1/contracts/{symbol}

FUTURES: GET /api/v1/contracts/active

4.

[Get Ticker](/docs-new/rest/ua/get-ticker)

Description: Request market tickers for all the trading pairs in the market
(including 24h volume); takes a snapshot every 2 seconds.

Replaces:

SPOT: GET /api/v1/market/orderbook/level1

SPOT: GET /api/v1/market/allTickers

FUTURES: GET /api/v1/ticker

FUTURES: GET /api/v1/allTickers

5.

[Get Trades](/docs-new/rest/ua/get-trades)

Description: Get the latest 100 trades of the specified symbol.

Replaces:

SPOT: GET /api/v1/market/histories

FUTURES: GET /api/v1/trade/history

6.

[Get OrderBook](/docs-new/rest/ua/get-orderbook)

Description: Query order book depth data (aggregated by price). Suitable for
professional traders; use WebSocket incremental feed for updates due to strict
rate limits.

Replaces:

SPOT: GET /api/v1/market/orderbook/level2\_{size}

SPOT: GET /api/v3/market/orderbook/level2

FUTURES: GET /api/v1/level2/depth{size}

FUTURES: GET /api/v1/level2/snapshot

7.

[Get Klines](/docs-new/rest/ua/get-klines)

Description: Get the Kline (candlestick) data of the symbol, returned in grouped
buckets based on requested type. Returns up to 1500 pieces of data per query;
page by time for more data.

Replaces:

SPOT: GET /api/v1/market/candles

FUTURES: GET /api/v1/kline/query

8.

[Get Current Funding Rate](/docs-new/rest/ua/get-current-funding-rate)

Description: Get the current futures funding fee rate.

Replaces: GET /api/v1/funding-rate/{symbol}/current

9.

[Get History Funding Rate](/docs-new/rest/ua/get-history-funding-rate)

Description: Query the funding rate at each settlement time point within a
certain time range for the corresponding contract.

Replaces: GET /api/v1/contract/funding-rates

10.

[Get Cross Margin Config](/docs-new/rest/ua/get-cross-margin-config)

Description: Request the configuration info of cross-margin trading.

Replaces: GET /api/v1/margin/config

11.

[Get Service Status](/docs-new/rest/ua/get-service-status)

Description: Get the service status.

Replaces:

SPOT: GET /api/v1/status

FUTURES: GET /api/v1/status

We will continue to roll out additional Unified Trading Account API interfaces
in Q4 2025. Please refer to future announcements for updates.

##### 2025.09.26[#](#20250926)

\[Futures Add\]
[Get Position Mode](/docs-new/rest/futures-trading/positions/get-position-mode)

\[Broker Deprecate\] Get API Broker Rebate, Deprecated the
[GET /api/v1/broker/api/rebase/download](/docs-new/3470280e0) endpoint. Please
use
[GET /api/v2/broker/api/rebase/download](/docs-new/rest/broker/api-broker/get-broker-rebate)
endpoint instead.

\[Broker Add\] [Get Commission](/docs-new/rest/broker/api-broker/get-commission)

\[Broker Add\] [Get User List](/docs-new/rest/broker/api-broker/get-user-list)

\[Broker Add\]
[Get User Transactions](/docs-new/rest/broker/api-broker/get-user-transactions)

##### 2025.09.25[#](#20250925)

\[Futures Modify\]
[Get Position Details](/docs-new/rest/futures-trading/positions/get-position-details)
endpoint: Upgrade from V1 to V2, /api/v2/position.

| Endpoint                                                                                               | API Permission Changed  |
| ------------------------------------------------------------------------------------------------------ | ----------------------- |
| [Get Recent Trade History](/docs-new/est/futures-trading/orders/get-recent-trade-history)              | From Futures To General |
| [Get Margin Mode](/docs-new/rest/futures-trading/positions/get-margin-mode)                            | From Futures To General |
| [Get Max Open Size](/docs-new/rest/futures-trading/positions/get-max-open-size)                        | From Futures To General |
| [Get Position Details](/docs-new/rest/futures-trading/positions/get-position-details)                  | From Futures To General |
| [Get Position List](/docs-new/rest/futures-trading/positions/get-position-list)                        | From Futures To General |
| [Get Positions History](/docs-new/rest/futures-trading/positions/get-positions-history)                | From Futures To General |
| [Get Max Withdraw Margin](/docs-new/rest/futures-trading/positions/get-max-withdraw-margin)            | From Futures To General |
| [Get Cross Margin Leverage](/docs-new/rest/futures-trading/positions/get-cross-margin-leverage)        | From Futures To General |
| [Get Cross Margin Risk Limit](/docs-new/rest/futures-trading/positions/get-cross-margin-risk-limit)    | From Futures To General |
| [Get Private Funding History](/docs-new/rest/futures-trading/funding-fees/get-private-funding-history) | From Futures To General |

##### 2025.09.12[#](#20250912)

\[Futures Modify\]
[Get Klines](/docs-new/rest/futures-trading/market-data/get-klines) endpoint:
Add **transaction volume** response parameter.

##### 2025.09.11[#](#20250911)

\[Futures Add\]
[Switch Position Mode](/docs-new/rest/futures-trading/positions/switch-position-mode)

##### 2025.09.03[#](#20250903)

\[Margin Add\]
[Add Stop Order](/docs-new/rest/margin-trading/orders/add-stop-order)

\[Margin Add\]
[Cancel Stop Order By OrderId](/docs-new/rest/margin-trading/orders/cancel-stop-order-by-orderld)

\[Margin Add\]
[Cancel Stop Order By ClientOid](/docs-new/rest/margin-trading/orders/cancel-stop-order-by-clientoid)

\[Margin Add\]
[Batch Cancel Stop Orders](/docs-new/rest/margin-trading/orders/batch-cancel-stop-orders)

\[Margin Add\]
[Get Stop Orders List](/docs-new/rest/margin-trading/orders/get-stop-order-list)

\[Margin Add\]
[Get Stop Order By OrderId](/docs-new/rest/margin-trading/orders/get-stop-order-by-orderld)

\[Margin Add\]
[Get Stop Order By ClientOid](/docs-new/rest/margin-trading/orders/get-stop-order-by-clientoid)

\[Margin Add\]
[Add OCO Order](/docs-new/rest/margin-trading/orders/add-oco-order)

\[Margin Add\]
[Cancel OCO Order By OrderId](/docs-new/rest/margin-trading/orders/cancel-oco-order-by-orderld)

\[Margin Add\]
[Cancel OCO Order By ClientOid](/docs-new/rest/margin-trading/orders/cancel-oco-order-by-clientoid)

\[Margin Add\]
[Batch Cancel OCO Order](/docs-new/rest/margin-trading/orders/batch-cancel-oco-orders)

\[Margin Add\]
[Get OCO Order By OrderId](/docs-new/rest/margin-trading/orders/get-oco-order-by-orderld)

\[Margin Add\]
[Get OCO Order By ClientOid](/docs-new/rest/margin-trading/orders/get-oco-order-by-clientoid)

\[Margin Add\]
[Get OCO Order Detail By OrderId](/docs-new/rest/margin-trading/orders/get-oco-order-detail-by-orderld)

\[Margin Add\]
[Get OCO Order List](/docs-new/rest/margin-trading/orders/get-oco-order-list)

##### 2025.08.19[#](#20250819)

\[Spot Add\]
[Get Order By OrderId](/docs-new/rest/spot-trading/orders/get-order-by-orderld)

\[Spot Add\]
[Get Order By ClientOid](/docs-new/rest/spot-trading/orders/get-order-by-clientoid)

\[Spot Add\]
[Get Closed Orders](/docs-new/rest/spot-trading/orders/get-closed-orders)

\[Margin Add\]
[Get Order By OrderId](/docs-new/rest/margin-trading/orders/get-order-by-orderld)

\[Margin Add\]
[Get Order By ClientOid](/docs-new/rest/margin-trading/orders/get-order-by-clientoid)

\[Margin Add\]
[Get Closed Orders](/docs-new/rest/margin-trading/orders/get-closed-orders)  
Above endpoints added **cancelReason** response parameter.

##### 2025.08.12[#](#20250812)

\[Margin Add\]
[Get Borrow Rate](/docs-new/rest/margin-trading/debit/get-borrow-interest-rate)

##### 2025.08.11[#](#20250811)

\[Affiliate Add\] [Get Transaction](/docs-new/rest/affiliate/get-transaction)

##### 2025.07.30[#](#20250730)

\[Add\] [JAVA SDK](/docs-new/sdk)

##### 2025.07.24[#](#20250724)

\[Add\] [Websocket Add Order](/docs-new/3470133w0),
[Websocket Cancel Order](/docs-new/3470134w0)  
added several new command options of this two endpoint

futures.multi_cancel

futures.multi_order

spot.sync_order

spot.modify

spot.sync_cancel

##### 2025.07.22[#](#20250722)

\[Futures
Add\][Get Cross Margin Requirement](/docs-new/rest/futures-trading/positions/get-cross-margin-requirement)

##### 2025.07.21[#](#20250721)

\[Earn Add\]
[Structured Product Purchase](/docs-new/rest/earn/structured-product-purchase)

\[Earn Add\]
[Get Dual Investment Products](/docs-new/rest/earn/get-dual-investment-products)

\[Earn Add\]
[Get Structured Product Orders](/docs-new/rest/earn/get-structured-product-orders)

##### 2025.07.18[#](#20250718)

\[Affiliate Add\] [Get Invited](/docs-new/rest/affiliate/get-invited)

\[Affiliate Add\][Get Commission](/docs-new/rest/affiliate/get-commission)

\[Affiliate Add\][Get Trade History](/docs-new/rest/affiliate/get-trade-history)

\[Affiliate
Deprecate\][Get Account](/docs-new/abandoned-endpoints/affiliate/get-account)

##### 2025.07.04[#](#20250704)

\[Convert Add\] [Get Convert Symbol](/docs-new/rest/convert/get-convert-symbol)

\[Convert Add\]
[Get Convert Currencies](/docs-new/rest/convert/get-convert-currencies)

\[Convert Add\] [Get Convert Quote](/docs-new/rest/convert/get-convert-quote)

\[Convert Add\] [Add Convert Order](/docs-new/rest/convert/add-convert-order)

\[Convert Add\]
[Get Convert Order Detail](/docs-new/rest/convert/get-convert-order-detail)

\[Convert Add\]
[Get Convert Order History](/docs-new/rest/convert/get-convert-order-history)

\[Convert Add\]
[Get Convert Limit Quote](/docs-new/rest/convert/get-convert-limit-quote)

\[Convert Add\]
[Add Convert Limit Order](/docs-new/rest/convert/add-convert-limit-order)

\[Convert Add\]
[Cancel Convert Limit Order](/docs-new/rest/convert/cancel-convert-limit-order)

\[Convert Add\]
[Get Convert Limit Order Detail](/docs-new/rest/convert/get-convert-limit-order-detail)

\[Convert Add\]
[Get Convert Limit Orders](/docs-new/rest/convert/get-convert-limit-orders)

##### 2025.07.01[#](#20250701)

\[Add\] API documentation support online debugging function (including private
endpoint)

##### 2025.06.30[#](#20250630)

\[Add\] [Websocket Add Order](/docs-new/3470133w0)

\[Add\] [Websocket Cancel Order](/docs-new/3470134w0)

##### 2025.06.27[#](#20250627)

\[Add\] [PHP SDK](/docs-new/sdk)

##### 2025.06.25[#](#20250625)

\[Futures Modify\] [Websocket Push Orders](/docs-new/3470090w0) endpoint, Add
**adl** and **liquid** options to the request parameter **tradeType**

##### 2025.06.12[#](#20250612)

\[Futures Modify\] [Add Order](/docs-new/rest/futures-trading/orders/add-order),
[Add Order Test](/docs-new/rest/futures-trading/orders/add-order-test),
[Batch Add Orders](/docs-new/rest/futures-trading/orders/batch-add-orders),
[Add Take Profit And Stop Loss Order](/docs-new/rest/futures-trading/orders/add-take-profit-and-stop-loss-order)
endpoint: **leverage** request parameter, changed from required to optional

##### 2025.05.29[#](#20250529)

\[Futures Modify\]
[Get Current Funding Rate](/docs-new/rest/futures-trading/funding-fees/get-current-funding-rate)
endpoint: add **period**, **fundingTime** response parameter.

##### 2025.05.28[#](#20250528)

\[Margin Modify\]
[Get Account - Cross Margin](/docs-new/rest/account-info/account-funding/get-account-cross-margin)
endpoint: Added **liabilityPrincipal**, **liabilityInterest** response
parameter.

##### 2025.05.19[#](#20250519)

\[Margin Modify\] [Add Order](/docs-new/rest/margin-trading/orders/add-order)
the rate limit quota has been adjusted from 5 to 2.  
\[Margin Modify\]
[Add Order Test](/docs-new/rest/margin-trading/orders/add-order-test) the rate
limit quota has been adjusted from 5 to 2.  
\[Margin Modify\]
[Cancel Order By OrderId](/docs-new/rest/margin-trading/orders/cancel-order-by-orderld)
the rate limit quota has been adjusted from 5 to 2.  
\[Margin Modify\][Cancel Order By ClientOid](/docs-new/rest/margin-trading/orders/cancel-order-by-clientoid)
the rate limit quota has been adjusted from 5 to 2.  
\[Margin Modify\]
[Cancel All Orders By Symbol](/docs-new/rest/margin-trading/orders/cancel-all-orders-by-symbol)
the rate limit quota has been adjusted from 10 to 5.  
\[Margin Modify\]
[Get Symbols With Open Order](/docs-new/rest/margin-trading/orders/get-symbols-with-open-order)
the rate limit quota has been adjusted from 10 to 2.

##### 2025.05.15[#](#20250515)

\[Futures Add\] Get Cross Margin Risk Limit,
[GET /api/v2/batchGetCrossOrderLimit](/docs-new/rest/futures-trading/positions/get-cross-margin-risk-limit)

\[Margin Modify\]
[Get Account - Isolated Margin](/docs-new/rest/account-info/account-funding/get-account-isolated-margin)
endpoint: Added **liabilityPrincipal**, **liabilityInterest** response
parameter.

##### 2025.05.14[#](#20250514)

\[Futures Add\] Batch Switch Margin Mode,
[POST /api/v2/position/batchChangeMarginMode](/docs-new/rest/futures-trading/positions/batch-switch-margin-mode)

##### 2025.05.13[#](#20250513)

\[Spot Modify\] Modify Order,
[POST /api/v1/hf/orders/alter](/docs-new/rest/spot-trading/orders/modify-order)
the rate limit quota has been adjusted from 3 to 1.

##### 2025.05.10[#](#20250510)

\[Spot Add\] Get Withdrawal History By ID,
[GET /api/v1/withdrawals/{withdrawalId}](/docs-new/rest/account-info/withdrawals/get-withdrawal-by-id)

##### 2025.03.28[#](#20250328)

\[Futures Modify\]
[Get Position List](/docs-new/rest/futures-trading/positions/get-position-list),
[Get Position Details](/docs-new/rest/futures-trading/positions/get-position-details),
[Topic: /contract/positionAll](/docs-new/3470093w0),
[Topic:/contract/position:{symbol}](/docs-new/3470093w0) endpoint: Cross margin
support **maintMarginReq**, **posMaint** response parameter.

##### 2025.03.13[#](#20250313)

\[Spot Deprecate\] Get Open Orders: Deprecated the
[GET /api/v1/hf/orders/active](/docs-new/rest/spot-trading/orders/get-open-orders)
endpoint. Please use the new
[GET /api/v1/hf/orders/active/page](/docs-new/rest/spot-trading/orders/get-open-orders-by-page)
endpoint instead.

##### 2025.03.05[#](#20250305)

\[Futures Modify\]
[GET /api/v1/account-overview](/docs-new/rest/account-info/account-funding/get-account-futures)
endpoint: Added **maxWithdrawAmount** response parameter.

\[Futures Modify\] [Topic /contractAccount/wallet](/docs-new/3470092w0)
endpoint: Added **maxWithdrawAmount** response parameter.

\[Spot Modify\]
[GET /api/v1/sub-accounts/{subUserId}](/docs-new/rest/account-info/sub-account/get-subaccount-detail-balance)
endpoint: Added **baseCurrency**, **baseAmount** request parameter.

##### 2025.02.28[#](#20250228)

\[Spot Modify\] [Add Order](/docs-new/rest/spot-trading/orders/add-order),
[Add Order Sync](/docs-new/rest/spot-trading/orders/add-order-sync),
[Add Order Test](/docs-new/rest/spot-trading/orders/add-order-test),
[Batch Add Orders](/docs-new/rest/spot-trading/orders/batch-add-orders),
[Batch Add Orders Sync](/docs-new/rest/spot-trading/orders/batch-add-orders-sync)
endpoint: Added **allowMaxTimeWindow**, **clientTimestamp** request parameter.

##### 2025.02.27[#](#20250227)

\[Add\] API documentation now includes a **Debug Function**.

##### 2025.02.26[#](#20250226)

\[Add\] [Nodejs SDK](/docs-new/sdk)

\[Spot Add\] Get Call Auction Part OrderBook,
[GET /api/v1/market/orderbook/callauction/level2\_{size}](/docs-new/rest/spot-trading/market-data/get-call-auction-part-orderbook)

\[Spot Add\] Get Call Auction Info,
[GET /api/v1/market/callauctionData](/docs-new/rest/spot-trading/market-data/get-call-auction-info)

\[Spot Add\] Call Auction Orderbook - Level50,
[Topic:/callauction/level2Depth50:{symbol}  
](/docs-new/3470137w0)

\[Spot Add\] Call Auction Data, [Topic: /callauction/callauctionData:{symbol}  
](/docs-new/3470138w0)

\[Spot Modify\]
[GET /api/v2/symbols/{symbol}](/docs-new/rest/spot-trading/market-data/get-symbol)
endpoint: Added **callauctionIsEnabled**, **callauctionPriceFloor**,
**callauctionPriceCeiling**, **callauctionFirstStageStartTime**,
**callauctionSecondStageStartTime**, **callauctionThirdStageStartTime**,
**tradingStartTime** response parameter.

\[Spot Modify\]
[GET /api/v2/symbols](/docs-new/rest/spot-trading/market-data/get-all-symbols)
endpoint: Added **callauctionIsEnabled**, **callauctionPriceFloor**,
**callauctionPriceCeiling**, **callauctionFirstStageStartTime**,
**callauctionSecondStageStartTime**, **callauctionThirdStageStartTime**,
**tradingStartTime** response parameter.

##### 2025.02.21[#](#20250221)

\[Spot Add\] Get Discount Rate Configs,
[GET /api/v1/otc-loan/discount-rate-configs](/docs-new/rest/vip-lending/get-collateral-ratio)

##### 2025.02.19[#](#20250219)

\[Modify\] [Rate Limit](/docs-new/rate-limit): The limit on the number of
WebSocket connections that can be established simultaneously per user ID has
been increased from 500 to 800.

##### 2025.02.06[#](#20250206)

\[Margin Modify\] Get Transfer
Quotas，[GET /api/v1/accounts/transferable](/docs-new/rest/account-info/transfer/get-transfer-quotas)
endpoint, Add **MARGIN_V2** and **ISOLATED_V2** options to the request parameter
**type**

\[Spot Modify\] Get Account Ledgers -
Trade_hf，[GET /api/v1/hf/accounts/ledgers](/docs-new/rest/account-info/account-funding/get-account-ledgers-tradehf)
endpoint, Add **RETURNED_FEES** and **DEDUCTION_FEES** options to the request
parameter **bizType**

##### 2025.01.21[#](#20250121)

\[Spot Add\] Get Client IP Address,
[GET /api/v1/my-ip](/docs-new/rest/spot-trading/market-data/get-client-ip-address)

##### 2024.01.07[#](#20240107)

\[Add\] [Futures Copy Trading](/docs-new/338284m0) has been launched, with 11
new endpoints.

\[Futures Modify\] Cancel All Orders:
[DELETE /api/v3/orders](/docs-new/rest/futures-trading/orders/cancel-all-orders)
the rate limit quota has been adjusted from 30 to 10.

##### 2024.01.03[#](#20240103)

\[Add\] [Postman SDK](/docs-new/sdk)

\[Add\] API documentation now includes a **Search Function**.

##### 2024.12.17[#](#20241217)

\[Modify\] [Rate Limit](/docs-new/rate-limit): The limit on the number of
WebSocket connections that can be established simultaneously per user ID has
been increased from 150 to 500.

\[Futures Deprecate\] Cancel All Orders: Deprecated the
[DELETE /api/v1/orders endpoint](/docs-new/abandoned-endpoints/futures-trading/cancel-all-orders-v1)
and adjusted the rate limit quota from 30 to 200. Please use the new
[DELETE /api/v3/orders](/docs-new/rest/futures-trading/orders/cancel-all-orders)
endpoint instead.

\[Futures Modify\]
[Topic: /contractMarket/tradeOrders](apidog://link/Websocket/3470090) endpoint:
Added the tradeType response parameter.

##### 2024.12.01[#](#20241201)

\[Add\] **The new version of the API documentation is now online.**

Modified at 16 days ago

[

Previous

Rate Limit

](/docs-new/rate-limit)[

Next

Market Making Incentive Scheme

](/docs-new/user-service/market-making-incentive-scheme)

[LLMs.txt](/docs-new/llms.txt)

On this page

[2025.10.24](#20251024)

[2025.10.17](#20251017)

[2025.09.30](#20250930)

[2025.09.29](#20250929)

[2025.09.26](#20250926)

[2025.09.25](#20250925)

[2025.09.12](#20250912)

[2025.09.11](#20250911)

[2025.09.03](#20250903)

[2025.08.19](#20250819)

[2025.08.12](#20250812)

[2025.08.11](#20250811)

[2025.07.30](#20250730)

[2025.07.24](#20250724)

[2025.07.22](#20250722)

[2025.07.21](#20250721)

[2025.07.18](#20250718)

[2025.07.04](#20250704)

[2025.07.01](#20250701)

[2025.06.30](#20250630)

[2025.06.27](#20250627)

[2025.06.25](#20250625)

[2025.06.12](#20250612)

[2025.05.29](#20250529)

[2025.05.28](#20250528)

[2025.05.19](#20250519)

[2025.05.15](#20250515)

[2025.05.14](#20250514)

[2025.05.13](#20250513)

[2025.05.10](#20250510)

[2025.03.28](#20250328)

[2025.03.13](#20250313)

[2025.03.05](#20250305)

[2025.02.28](#20250228)

[2025.02.27](#20250227)

[2025.02.26](#20250226)

[2025.02.21](#20250221)

[2025.02.19](#20250219)

[2025.02.06](#20250206)

[2025.01.21](#20250121)

[2024.01.07](#20240107)

[2024.01.03](#20240103)

[2024.12.17](#20241217)

[2024.12.01](#20241201)
