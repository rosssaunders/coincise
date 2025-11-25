## Breaking Change Schedule

- On 2025-12-17 8:00 UTC,  
  The current trigger order creation/cancellation will be migrated to Advanced
  Order Management API.
- On 2025-02-27 8:00 UTC,  
  For `book.{instrument_name}.{depth}`, the full snapshot subscription
  (`book_subscription_type=SNAPSHOT`) `100ms` frequency is removed.  
  Customers wishing to continue with the faster `100ms` frequency should switch
  to the delta subscription (`book_subscription_type=SNAPSHOT_AND_UPDATE`).  
  This higher performing subscription benefits the user with reduced
  bandwidth/processing compared to the snapshot subscription.  
  For a transition period, users subscribing to the removed `100ms` snapshot
  will receive the `500ms` subscription.

  The `book.{instrument_name}` subscription (default depth) will be removed.  
  Customers should use the explicit `book.{instrument_name}.{depth}`
  subscription and specify the required depth.

  For a transition period, users subscribing to the removed subscription will
  receive the default `50` depth subscription.

- These changes will take place around 17 December 2023 8:00 UTC.
- Market Data wildcard ticker subscription will be removed. Users should use the
  instrument specific subscription.

## Change Logs

- 2025-11-18
  - `public/get-risk-parameters` was added new columns

- 2025-10-16
  - `Advanced Order Management API` section was updated

- 2025-07-17
  - `private/fiat/fiat-deposit-info` was added
  - `private/fiat/fiat-deposit-history` was added
  - `private/fiat/fiat-withdraw-history` was added
  - `private/fiat/fiat-create-withdraw` was added
  - `private/fiat/fiat-get-bank-accounts` was added
  - `private/fiat/fiat-transaction-quota` was added
  - `private/fiat/fiat-transaction-limit` was added

- 2025-07-04
  - `private/create-order` exec_inst was added `SMART_POST_ONLY`
  - `private/create-order-list (LIST)` exec_inst was added `SMART_POST_ONLY`
  - `private/get-open-orders` exec_inst was added `SMART_POST_ONLY`
  - `private/get-order-detail`was addedexec_inst was added `SMART_POST_ONLY`
  - `private/get-order-history` exec_inst was added `SMART_POST_ONLY`

- 2025-06-10
  - `private/amend-order` was added
  - `public/get-announcements` was added

- 2025-05-29
  - transaction_time_ns field was added into `user.order.{instrument_name}`
    response

- 2025-03-14
  - Removed deprecated attributes system_label in `private/get-accounts`

- 2025-03-06
  - Removed deprecated `book.{instrument_name}` default book subscription
  - Removed deprecated 100ms internval from full snapshot
    `book.{instrument_name}.{depth}` book subscription

- 2025-03-04
  - Remove section: `Unified Wallet and System Label`

- 2025-01-27
  - `book.{instrument_name}.{depth}` - The following additional update
    frequencies are now supported:  
    Full snapshot subscription (`book_subscription_type=SNAPSHOT`) `500ms`  
    Delta subscription (`book_subscription_type=SNAPSHOT_AND_UPDATE`) `100ms`

- 2024-12-11
  - `private/create-order` fee_instrument_name was added

- 2024-10-02
  - `public/get-risk-parameters` was added

- 2024-08-15
  - `private/get-fee-rate` was added
  - `private/get-instrument-fee-rate`was added

- 2024-07-12
  - Staking API added:  
    `private/staking/stake`  
    `private/staking/unstake`  
    `private/staking/get-staking-position`  
    `private/staking/get-staking-instruments`  
    `private/staking/get-open-stake`  
    `private/staking/get-stake-history`  
    `private/staking/get-reward-history`  
    `private/staking/convert`  
    `private/staking/get-open-convert`  
    `private/staking/get-convert-history`  
    `public/staking/get-conversion-rate`

- 2024-06-27
  - `private/create-order` self-trade prevent (STP) was added
  - `private/create-order-list (LIST)` self-trade prevent (STP) was added

- 2024-02-12
  - `public/get-trades`, `trade.{instrument_name}` subscription, clarification
    for the public trade side field
  - Side is the side of the taker order
  - `book.{instrument_name}.{depth}` clarifications for book delta sequence
    number handling and re-subscription

- 2024-01-04
  - Market data websocket subscription enhancements:
  - `book.{instrument_name}` - The `subscription` result value is now explicit  
    e.g. previous `"subscription": "book.BTC_USD"` -> new
    `"subscription": "book.BTC_USD.50"`
  - `book.{instrument_name}.{depth}` - For delta updates, the fixed 500ms delta
    full book snapshot heartbeat is replaced with empty delta in the case of no
    book changes
  - `ticker` - Documented existing 'bs' and 'ks' fields (bid/ask size)
  - `settlement` - For wildcard subscription, the `subscription` result value is
    now explicit  
    e.g. previous `"subscription": "settlement"` -> new
    `"subscription": "settlement.BTCUSD-231124"`
  - Applied consistent field ordering for all market data subscriptions (`book`,
    `ticker`, `trade`, `candlestick`, `index`, `mark`, `settlement`, `funding`,
    `estimatedfunding`).  
    Result fields are always in the following order:  
    `id, method, code, instrument_name, subscription, channel`
  - Market data REST `public/get-trades`
  - Added additional `tn` nanoseconds timestamp field to the trade response
  - Clarified timestamp pagination parameters

- 2023-12-18
  - Market Data wildcard ticker subscription removed. Users should use the
    instrument specific subscription.

- 2023-12-11
  - Introduced Market Data subscription limiting. Refer to
    [Market Data Websocket Subscription Limits](#market-data-websocket-subscription-limits)
    for more details

- 2023-10-31
  - `user.balance`,`private/user-balance` will be updated:  
    1\. Existing field total_margin_balance will represent new margin balance
    calculation without haircut.  
    2\. Existing field total_initial_margin previously is made up of position IM
    only. On effective date, this field will represent the total sum of
    total_position_im + total_haircut  
    3\. New field total_position_im will be introduced to represent initial
    margin requirement to support open positions and orders  
    4\. New field total_haircut will be introduced to represent the total
    haircut on eligible collateral token assets. Refer to
    [Smart Cross Margin Enhancement Guide](https://static2.crypto.com/exchange/assets/documents/Exchange%20Smart%20Cross%20Margin%20Enhancement%20Guide%202023.pdf)
    for details
  - `user.balance`, `user.account_risk`, `private/user-balance`,
    `private/get-subaccount-balances` will be updated:  
    1\. New field collateral_eligible will be introduced to indicate if token is
    eligible Collateral  
    2\. collateral_weight will be deprecated  
    3\. New field haircut will be introduced to show haircut of eligible
    collateral token instead of collateral Weight. Refer to
    [Smart Cross Margin Enhancement Guide](https://static2.crypto.com/exchange/assets/documents/Exchange%20Smart%20Cross%20Margin%20Enhancement%20Guide%202023.pdf)
    for details

- 2023-08-11
  - `private/create-order-list (LIST)` for batch order creation added
  - `private/cancel-order-list (LIST)` for batch order cancel added

- 2023-07-31
  - Market Data Websocket Subscriptions is effective:
  - `funding.{instrument_name}` - channel will return the fixed hourly rate that
    will settle at the end of the hour.
  - `estimatedfunding.{instrument_name}` - channel will return the estimated
    hourly rate that will begin in the next interval.
  - Added new “funding_rate” and “estimated_funding_rate” valuation types for
    public/get-valuations

- 2023-06-28
  - `private/get-deposit-history` added
  - `private/get-withdrawal-history` added

- 2022-11-30
  - Support using `client_oid` to query in `private/get-order-detail` REST API

- 2022-11-10
  - `USD_Stable_Coin` (aka USD Bundle), will be renamed as `USD`. Customer can
    test the change in UAT from 2022-11-10 before the change is effective in
    PROD. Target date for PROD is TBD.
  - Customer can input both `USD` and `USD_Stable_Coin` to mean the same USD
    Bundle.
  - However, on response, `USD` will be used to mean USD Bundle, instead of
    `USD_Stable_Coin`.

- 2022-10-31
  - Added `private/create-order-list`, `private/create-subaccount-transfer` REST
    APIs
  - Added `user.account_risk` and `user.position_balance` WebSocket
    subscriptions
  - Added more `period` in `public/get-candlestick`
    `candlestick.{time_frame}.{instrument_name}` WebSocket subscription

- 2022-09-21 - Added **Unified Wallet and System Label** section, to illustrate
  the transition from multiple wallets into unified wallet.
- 2022-09-21 - Added new sub-account management endpoints:
  `private/get-accounts`, `private/create-subaccount-transfer`
- 2022-09-21 - Added new exchange wallet management endpoints:
  `private/create-withdrawal`, `private/get-deposit-address`,
  `private/get-curency-networks`
- 2022-09-21 - First publish, based on Derivative Exchange API v1.
