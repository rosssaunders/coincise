# Changelog

## \[November 7, 2025\] Add Maximum Openable Quantity API[​](#november-7-2025-add-maximum-openable-quantity-api "Direct link to november-7-2025-add-maximum-openable-quantity-api")

Interface:

*   /api/v2/mix/account/max-open

Changes：

*   Add Maximum Openable Quantity API

## \[November 7, 2025\] Add Estimated Liquidation Price API[​](#november-7-2025-add-estimated-liquidation-price-api "Direct link to november-7-2025-add-estimated-liquidation-price-api")

Interface:

*   /api/v2/mix/account/liq-price

Changes：

*   Add Estimated Liquidation Price API

## \[November 6, 2025\] New broker commission inquiry interface added[​](#november-6-2025-new-broker-commission-inquiry-interface-added "Direct link to november-6-2025-new-broker-commission-inquiry-interface-added")

Interface:

*   /api/v2/broker/total-commission
*   /api/v2/broker/order-commission
*   /api/v2/broker/rebate-info  
    

Changes：

*   New broker commission inquiry interface added

## \[October 21, 2025\] Add an endpoint for querying symbol with isolated margin mode in futures.[​](#october-21-2025-add-an-endpoint-for-querying-symbol-with-isolated-margin-mode-in-futures "Direct link to october-21-2025-add-an-endpoint-for-querying-symbol-with-isolated-margin-mode-in-futures")

Interface: /api/v2/mix/account/isolated-symbols  
Changes：

*   Add an endpoint for querying symbol with isolated margin mode in futures.

## \[October 21, 2025\] Optimization of the spot historical plan order endpoint[​](#october-21-2025-optimization-of-the-spot-historical-plan-order-endpoint "Direct link to october-21-2025-optimization-of-the-spot-historical-plan-order-endpoint")

Interface: /api/v2/spot/trade/history-plan-order  
Changes： -The request parameters `symbol`, `startTime`, and `endTime` are changed to optional.

## \[October 14, 2025\] Notice: Classic Account Error Code Optimization[​](#october-14-2025-notice-classic-account-error-code-optimization "Direct link to october-14-2025-notice-classic-account-error-code-optimization")

Scope of Impact:  
Classic Account v2-related APIs  
Optimization Content:

*   Unified error code mapping: Resolves the issue where "different error codes correspond to the same error message", ensuring one code maps to one message and reducing recognition confusion.
*   Standardized error message matching: Fixes the problem where "different error messages correspond to the same error code", enabling accurate matching between messages and codes and improving troubleshooting efficiency.

## \[September 11, 2025\] Newly Added Interfaces Related to union Margin[​](#september-11-2025-newly-added-interfaces-related-to-union-margin "Direct link to september-11-2025-newly-added-interfaces-related-to-union-margin")

Changes：

1.  Newly Added — Query the USDT amount required for switching from union margin to single-currency margin /api/v2/mix/account/switch-union-usdt
2.  Newly Added — union Margin Conversion and Repayment API /api/v2/mix/account/union-convert
3.  Newly Added — union Margin Configuration Parameter API /api/v2/mix/account/union-config
4.  Newly Added — union Margin Currency Transfer Limit API /api/v2/mix/account/transfer-limits
5.  Newly Added — New union margin parameters in the WS Account Channel: `unionTotalMargin` (Margin Amount), `unionAvailable` (Available Margin), `unionMm` (Maintenance Margin), `assetMode` (Account Mode)
6.  Newly Added — New `assetMode` (Account Mode) parameter in the WS Position Channel

## \[September 4, 2025\] Notice: Adjustment to the transferId field in the sub-main account transfer records retrieval function. The transferId will be updated to the one returned during sub-main account transfers.[​](#september-4-2025-notice-adjustment-to-the-transferid-field-in-the-sub-main-account-transfer-records-retrieval-function-the-transferid-will-be-updated-to-the-one-returned-during-sub-main-account-transfers "Direct link to september-4-2025-notice-adjustment-to-the-transferid-field-in-the-sub-main-account-transfer-records-retrieval-function-the-transferid-will-be-updated-to-the-one-returned-during-sub-main-account-transfers")

Interface: /api/v2/spot/account/sub-main-trans-record  
Changes：

*   Previous generation rule: for transferId: Auto-incrementing ID
*   New generation rule: for transferId: Snowflake algorithm

## \[September 2, 2025\] Add reason field for Get Upgrade Status[​](#september-2-2025-add-reason-field-for-get-upgrade-status "Direct link to september-2-2025-add-reason-field-for-get-upgrade-status")

Interface: /api/v2/spot/account/upgrade-status  
Changes：

*   Add reason field for Get Upgrade Status

## \[August 28, 2025\] Notice: Optimization of Push Frequency for Websocket Order Book Channel (books1) in Classic Account (v2)[​](#august-28-2025-notice-optimization-of-push-frequency-for-websocket-order-book-channel-books1--in-classic-account-v2 "Direct link to august-28-2025-notice-optimization-of-push-frequency-for-websocket-order-book-channel-books1--in-classic-account-v2")

Websocket: Order Book Channel  
Adjustment Content: The push frequency of the order book channel (books1) is optimized to 20ms. The symbols for this optimization are: BTCUSDT, ETHUSDT, XRPUSDT, SOLUSDT, SUIUSDT, DOGEUSDT, ADAUSDT, PEPEUSDT, LINKUSDT, HBARUSDT

## \[August 11, 2025\] Agent commission API query supports fee deduction[​](#august-11-2025-agent-commission-api-query-supports-fee-deduction "Direct link to august-11-2025-agent-commission-api-query-supports-fee-deduction")

Interface：/api/broker/v1/agent/commission-distribution;/api/broker/v1/agent/customer-commissions;  
Changes：

*   Agent commission API query supports fee deduction details

## \[August 11, 2025\] API Global rate Limit Adjustment[​](#august-11-2025-api-global-rate-limit-adjustment "Direct link to august-11-2025-api-global-rate-limit-adjustment")

Changes：

*   There is an overall rate limit rule of 6,000 times per IP per minute. After the rate limit is triggered, the recovery time is adjusted from 1 minute to 5 minutes.

## \[August 6, 2025\] Add unrealizedPL field for sub-account futures asset info[​](#august-6-2025-add-unrealizedpl-field-for-sub-account-futures-asset-info "Direct link to august-6-2025-add-unrealizedpl-field-for-sub-account-futures-asset-info")

Interface：/api/v2/broker/account/subaccount-future-assets  
Changes：

*   Add unrealizedPL field for sub-account futures asset info

## \[August 6, 2025\] Add marginCoin field for historical transaction details[​](#august-6-2025-add-margincoin-field-for-historical-transaction-details "Direct link to august-6-2025-add-margincoin-field-for-historical-transaction-details")

Interface：/api/v2/mix/order/fill-history  
Changes：

*   Add marginCoin field for historical transaction details

## \[August 4, 2025\] Delisting of Futures Demo Pairs[​](#august-4-2025-delisting-of-futures-demo-pairs "Direct link to august-4-2025-delisting-of-futures-demo-pairs")

Futures demo pairs have been delisted. Please use the [demo trading](/api-doc/common/demotrading/restapi) for simulated trading.

## \[July 31, 2025\] Optimization of the futures order placement interface logic[​](#july-31-2025-optimization-of-the-futures-order-placement-interface-logic "Direct link to july-31-2025-optimization-of-the-futures-order-placement-interface-logic")

Interface： /api/v2/mix/order/place-order

Changes：

*   before: In hedge mode, if the existing quantity is equal to the limit close order of the position, a newly added market close order will report an error due to insufficient position and will not automatically cancel the limit order that has occupied the position.
*   after: In hedge mode, if the existing quantity is equal to the limit close order of the position, a newly added market close order will automatically cancel the limit order that has occupied the position (consistent with Web/APP).

## \[July 29, 2025\] Optimize ADL API ranking logic.[​](#july-29-2025-optimize-adl-api-ranking-logic "Direct link to july-29-2025-optimize-adl-api-ranking-logic")

Interface：/api/v2/mix/position/adlRank Changes：

*   Optimize the ranking logic of the ADL API on the server side.Add a new field "rank" and deprecated the field "adlRank".

## \[July 16, 2025\] Add New Account Mode Switching API[​](#july-16-2025-add-new-account-mode-switching-api "Direct link to july-16-2025-add-new-account-mode-switching-api")

Interface：/api/v2/spot/account/upgrade, /api/v2/spot/account/upgrade-status Adjustment:

*   Add New Account Mode Switching API

## \[July 14, 2025\] Futures leverage adjustment API supports setting long/short leverage ratios separately.[​](#july-14-2025--futures-leverage-adjustment-api-supports-setting-longshort-leverage-ratios-separately "Direct link to july-14-2025--futures-leverage-adjustment-api-supports-setting-longshort-leverage-ratios-separately")

Interface： /api/v2/mix/account/set-leverage  
Changes：

*   Futures leverage adjustment API supports setting long/short leverage ratios separately.

## \[July 14, 2025\] Position take-profit/stop-loss API supports setting custom IDs for take-profit and stop-loss orders separately.[​](#july-14-2025--position-take-profitstop-loss-api-supports-setting-custom-ids-for-take-profit-and-stop-loss-orders-separately "Direct link to july-14-2025--position-take-profitstop-loss-api-supports-setting-custom-ids-for-take-profit-and-stop-loss-orders-separately")

Interface： /api/v2/mix/order/place-pos-tpsl  
Changes：

*   Position take-profit/stop-loss API supports setting custom IDs for take-profit and stop-loss orders separately.

## \[July 14, 2025\] The interface for obtaining the list of historical contract positions has added a position mode field.[​](#july-14-2025--the-interface-for-obtaining-the-list-of-historical-contract-positions-has-added-a-position-mode-field "Direct link to july-14-2025--the-interface-for-obtaining-the-list-of-historical-contract-positions-has-added-a-position-mode-field")

Interface： /api/v2/mix/position/history-position  
Changes：

*   The interface return parameters have added `posMode` (position mode), with enumeration values including `one_way_mode` (one-way position) and `hedge_mode` (hedge mode/two-way position).

## \[July 8, 2025\] WebSocket futures position channel adds mark price parameter[​](#july-8-2025-websocket-futures-position-channel-adds-mark-price-parameter "Direct link to july-8-2025-websocket-futures-position-channel-adds-mark-price-parameter")

Channels: futures position channel Changes：

*   WebSocket futures position channel adds mark price parameter

## \[July 1, 2025\] WebSocket Adds Order Placement and Cancellation Channels[​](#july-1-2025-websocket-adds-order-placement-and-cancellation-channels "Direct link to july-1-2025-websocket-adds-order-placement-and-cancellation-channels")

Channels: Place Order，Cancel Order

Changes：

*   Adds Order Placement and Cancellation Channels

## \[Jun 17, 2025\]Spot merged trading depth, spot trading depth, futures merged depth interfaces: ts field adjustment[​](#jun-17-2025spot-merged-trading-depth-spot-trading-depth-futures-merged-depth-interfaces-ts-field-adjustment "Direct link to jun-17-2025spot-merged-trading-depth-spot-trading-depth-futures-merged-depth-interfaces-ts-field-adjustment")

Interface：/api/v2/mix/market/merge-depth,/api/v2/spot/market/orderbook,/api/v2/spot/market/merge-depth

Changes：

*   Spot merged trading depth, spot trading depth, and futures merged depth interfaces: ts field adjusted to matching engine timestamp

## \[Jun 16, 2025\] The ADL ranking interface has added the position direction.[​](#jun-16-2025-the-adl-ranking-interface-has-added-the-position-direction "Direct link to jun-16-2025-the-adl-ranking-interface-has-added-the-position-direction")

Interface：/api/v2/mix/position/adlRank  
Changes：

*   The ADL ranking interface has added the position direction `holdSide` field。

## \[June 09, 2025\] Get Contract Information Adds Maximum Order Quantity Fields[​](#june-09-2025-get-contract-information-adds-maximum-order-quantity-fields "Direct link to june-09-2025-get-contract-information-adds-maximum-order-quantity-fields")

Interface：/api/v2/mix/market/contracts  
Changes：

*   Added maxMarketOrderQty field for the maximum quantity of a single market order.
*   Added maxOrderQty field for the maximum quantity of a single limit order.

## \[May 19, 2025\] Update on Regular Release Date[​](#may-19-2025-update-on-regular-release-date "Direct link to may-19-2025-update-on-regular-release-date")

The current fixed regular release date for backend is **every Tuesday, Wednesday, and Thursday from 14:00 PM to 17:00 PM (UTC +8)**(Except for emergency upgrade).  
During the regular release time window, the RestAPI may return 45001, 40725, or 40808 error responses. Users can retry after receiving these error responses. WebSocket connections may be disconnected during the release period. WebSocket users are advised to implement a reconnection mechanism in their code.

## \[May 19,2025\] Adjustment of the Spot place-plan-order API[​](#may-192025-adjustment-of-the-spot-place-plan-order-api "Direct link to may-192025-adjustment-of-the-spot-place-plan-order-api")

Interface：/api/v2/spot/trade/place-plan-order

Changes：

*   The `force` field was invalid when placing an order and has been deleted.

## \[May 14, 2025\] New version: Order-taking staff API Key creation interface adds currency pair range description.[​](#may-14-2025-new-version-order-taking-staff-api-key-creation-interface-adds-currency-pair-range-description "Direct link to may-14-2025-new-version-order-taking-staff-api-key-creation-interface-adds-currency-pair-range-description")

Interface：/api/v2/copy/mix-trader/create-copy-api  
Changes：

*   New: Added description for order-taking currency pair range.

## \[May 09, 2025\] Obtain the adjustment of the input parameters for the current funding rate.[​](#may-09-2025-obtain-the-adjustment-of-the-input-parameters-for-the-current-funding-rate "Direct link to may-09-2025-obtain-the-adjustment-of-the-input-parameters-for-the-current-funding-rate")

Interface：/api/v2/mix/market/current-fund-rate

Changes：

*   Obtain that the request parameter `symbol` of the current funding rate is changed to be non-mandatory.

## \[May 09, 2025\] Optimized the API for retrieving spot assets of sub-accounts.[​](#may-09-2025-optimized-the-api-for-retrieving-spot-assets-of-sub-accounts "Direct link to may-09-2025-optimized-the-api-for-retrieving-spot-assets-of-sub-accounts")

Interface：/api/v2/spot/account/subaccount-assets

Changes：

*   Added pagination parameters: `idLessThan` (pagination cursor) and `limit` (items per page).
*   Added return field: `id` (cursor ID)

## \[May 09, 2025\] Optimized the API for querying announcements.[​](#may-09-2025-optimized-the-api-for-querying-announcements "Direct link to may-09-2025-optimized-the-api-for-querying-announcements")

Interface：/api/v2/public/annoucements

Changes：

*   New announcement types added  
    `product_updates`: Product Updates  
    `security`: Security  
    `api_trading`: API Trading
*   Added pagination parameters: `cursor` (pagination cursor ID) and `limit` (items per page).
*   Deprecated announcement type: `trading_competitions_promotions` (Trading Competitions and Promotions)
*   The return field `annDesc` (Announcement Description) is deprecated.

## \[May 08, 2025\] Interface for adding leverage interest rate records[​](#may-08-2025-interface-for-adding-leverage-interest-rate-records "Direct link to may-08-2025-interface-for-adding-leverage-interest-rate-records")

Interface： /api/v2/margin/interest-rate-record Changes：

*   The interface for adding leverage interest rate records supports users to query the interest rate record data based on the trading pairs.

## \[May 08, 2025\] Optimization of the query range for public transaction details of spot/contract.[​](#may-08-2025-optimization-of-the-query-range-for-public-transaction-details-of-spotcontract "Direct link to may-08-2025-optimization-of-the-query-range-for-public-transaction-details-of-spotcontract")

Interface： /api/v2/spot/market/fills-history; /api/v2/mix/market/fills-history；

Changes：

*   Adjust the time span from 7 days to 90 days, which means it supports querying public transaction data from the past three months.

## \[May 08, 2025\] Add preset stop - profit and stop - loss execution prices for contract orders.[​](#may-08-2025-add-preset-stop---profit-and-stop---loss-execution-prices-for-contract-orders "Direct link to may-08-2025-add-preset-stop---profit-and-stop---loss-execution-prices-for-contract-orders")

Interface： /api/v2/mix/order/place-order

Changes：

*   Add request parameters  
    `presetStopSurplusExecutePrice` Preset stop-profit execution price  
    `presetStopLossExecutePrice` Preset stop-loss execution price

## \[May 08, 2025\] Add "utime" to the WebSocket push for cross-margin/isolated-margin leverage order channels.[​](#may-08-2025-add-utime-to-the-websocket-push-for-cross-marginisolated-margin-leverage-order-channels "Direct link to may-08-2025-add-utime-to-the-websocket-push-for-cross-marginisolated-margin-leverage-order-channels")

Channels: Cross-margin Leverage Order Channel, Isolated-margin Leverage Order Channel

Changes：

*   Add to the push data `utime`

## \[Apr 30,2025\] For the trading details of the WS futures, push fields are added to the spot/futures depth channels.[​](#apr-302025-for-the-trading-details-of-the-ws-futures-push-fields-are-added-to-the-spotfutures-depth-channels "Direct link to apr-302025-for-the-trading-details-of-the-ws-futures-push-fields-are-added-to-the-spotfutures-depth-channels")

Channels: futures Trading Details Channel, Spot Depth Channel, Contract Depth Channel

Changes:

*   Add the `clientOid` field to the pushed information of the futures Trading Details Channel.
*   Add the `seq` field to the pushed information of the Spot Depth Channel and the futures Depth Channel.

## \[Apr 23, 2025\] Added groupType enumeration for get account bills.[​](#apr-23-2025-added-grouptype-enumeration-for-get-account-bills "Direct link to apr-23-2025-added-grouptype-enumeration-for-get-account-bills")

Interface：/api/v2/spot/account/bills

Changes：

*   Added a new bill type enumeration `groupType` for input parameters and return values when fetching bill transaction details.

## \[Apr 21,2025\] Delete error code 40882[​](#apr-212025-delete-error-code-40882 "Direct link to apr-212025-delete-error-code-40882")

Removed content:

*   Removed error code `code 40882`:"You are currently a trader and you cannot switch to the full position mode|400|"

## \[Apr 14,2025\] Add New Endpoint: Get ND Broker Sub-accounts Deposit and Withdrawal Records[​](#apr-142025-add-new-endpoint-get-nd-broker-sub-accounts-deposit-and-withdrawal-records "Direct link to apr-142025-add-new-endpoint-get-nd-broker-sub-accounts-deposit-and-withdrawal-records")

Interface：/api/v2/broker/all-sub-deposit-withdrawal

Changes：

*   Adding new endpoint to get ND Broker sub-accounts deposit and withdrawal records within **90 days**

## \[Apr 10,2025\] Adjustment to virtual sub-account API key related endpoints[​](#apr-102025-adjustment-to-virtual-sub-account-api-key-related-endpoints "Direct link to apr-102025-adjustment-to-virtual-sub-account-api-key-related-endpoints")

Interface：/api/v2/user/create-virtual-subaccount-apikey，/api/v2/user/modify-virtual-subaccount-apikey，/api/v2/user/virtual-subaccount-apikey-list

Changes：

*   The `permList` parameter in the create, modify, and query sub-account API key interfaces now includes the `transfer`: wallet transfer permission.
*   The modify and query sub-account API key interfaces now support regular sub-accounts

## \[Apr 10,2025\] Added new field `offTime` in the response of Get Spot Symbol Info interface[​](#apr-102025-added-new-field-offtime-in-the-response-of-get-spot-symbol-info-interface "Direct link to apr-102025-added-new-field-offtime-in-the-response-of-get-spot-symbol-info-interface")

Interface：/api/v2/spot/public/symbols

Changes:

*   Added new field `offTime` in the response
*   The response parameter "maxTradeAmount" is fixed to return `900000000000000000000`; please disregard this response parameter.

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

> **Source:** https://www.bitget.com/api-doc/common/changelog
