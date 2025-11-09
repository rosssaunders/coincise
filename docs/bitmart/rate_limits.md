# Rate Limits

## Rate Limit

The speed of the public interface is limited according to the IP, and the speed
of the private interface is limited according to the API KEY. When the requests
exceed the rate limit, the 429 status will be returned: the request is too
frequent.

### The specific interface limits are as follows:

| System Interface | Interface Name            | Limit Target | Rate         |
| ---------------- | ------------------------- | ------------ | ------------ |
| /system/time     | Get system time           | IP           | 10 times/sec |
| /system/service  | Get system service status | IP           | 10 times/sec |

| Funding Account Interface            | Interface Name                       | Limit Target | Rate           |
| ------------------------------------ | ------------------------------------ | ------------ | -------------- |
| /account/v1/currencies               | Get currencies                       | IP           | 2 times/2 sec  |
| /account/v1/wallet                   | Get account balance                  | X-BM-KEY     | 12 times/2 sec |
| /account/v1/deposit/address          | Deposit address                      | X-BM-KEY     | 2 times/2 sec  |
| /account/v1/withdraw/charge          | Withdraw quota                       | X-BM-KEY     | 2 times/2 sec  |
| /account/v1/withdraw/apply           | Withdraw                             | X-BM-KEY     | 8 times/2 sec  |
| /account/v1/withdraw/address/list    | Withdraw Address                     | X-BM-KEY     | 2 times/2 sec  |
| /account/v2/deposit-withdraw/history | Get deposit and withdraw history V2  | X-BM-KEY     | 8 times/2 sec  |
| /account/v1/deposit-withdraw/detail  | Get a deposit Or withdraw detail     | X-BM-KEY     | 8 times/2 sec  |
| /spot/v1/margin/isolated/account     | Get Margin Account Details(Isolated) | X-BM-KEY     | 12 times/2 sec |
| /spot/v1/margin/isolated/transfer    | Margin Asset Transfer                | X-BM-KEY     | 2 times/2 sec  |
| /spot/v1/user_fee                    | Basic Fee Rate                       | X-BM-KEY     | 2 times/2 sec  |
| /spot/v1/trade_fee                   | Actual Trade Fee Rate                | X-BM-KEY     | 2 times/2 sec  |

| Spot Public Market Interface   | Interface Name                           | Limit Target | Rate           |
| ------------------------------ | ---------------------------------------- | ------------ | -------------- |
| /spot/v1/currencies            | Get a list of all cryptocurrencies       | IP           | 8 times/2 sec  |
| /spot/v1/symbols               | Get a list of all trading pairs          | IP           | 8 times/2 sec  |
| /spot/v1/symbols/details       | Get a detailed list of all trading pairs | IP           | 12 times/2 sec |
| /spot/quotation/v3/tickers     | Get Ticker of All Pairs (V3)             | IP           | 10 times/2 sec |
| /spot/quotation/v3/ticker      | Get Ticker of a Trading Pair(V3)         | IP           | 15 times/2 sec |
| /spot/quotation/v3/lite-klines | Get Latest K-Line (V3)                   | IP           | 15 times/2 sec |
| /spot/quotation/v3/klines      | Get History K-Line (V3)                  | IP           | 10 times/2 sec |
| /spot/quotation/v3/books       | Get Depth(V3)                            | IP           | 15 times/2 sec |
| /spot/quotation/v3/trades      | Get Recent Trades(V3)                    | IP           | 15 times/2 sec |

| Spot Trading Interface        | Interface Name                            | Limit Target | Rate           |
| ----------------------------- | ----------------------------------------- | ------------ | -------------- |
| /spot/v1/wallet               | Get the user's wallet balance(KEYED)      | X-BM-KEY     | 12 times/2 sec |
| /spot/v2/submit_order         | New Order(v2) (SIGNED)                    | UID          | 40 times/2 sec |
| /spot/v4/batch_orders         | New Batch Order(v4) (SIGNED)              | UID          | 40 times/2 sec |
| /spot/v1/margin/submit_order  | New Margin Order (SIGNED)                 | UID          | 20 times/1 sec |
| /spot/v3/cancel_order         | Cancel Order(v3) (SIGNED)                 | UID          | 40 times/2 sec |
| /spot/v4/cancel_orders        | Cancel Batch Order(v4) (SIGNED)           | UID          | 40 times/2 sec |
| /spot/v4/cancel_all           | Cancel All Order(v4) (SIGNED)             | UID          | 1 times/3 sec  |
| /spot/v4/query/order          | Query Order By Id(v4) (SIGNED)            | X-BM-KEY     | 50 times/2 sec |
| /spot/v4/query/client-order   | Query Order By clientOrderId(v4) (SIGNED) | X-BM-KEY     | 50 times/2 sec |
| /spot/v4/query/open-orders    | Current Open Orders(v4) (SIGNED)          | X-BM-KEY     | 12 times/2 sec |
| /spot/v4/query/history-orders | Account Orders(v4) (SIGNED)               | X-BM-KEY     | 12 times/2 sec |
| /spot/v4/query/trades         | Account Trade List(v4) (SIGNED)           | X-BM-KEY     | 12 times/2 sec |
| /spot/v4/query/order-trades   | Order Trade List(v4) (SIGNED)             | X-BM-KEY     | 12 times/2 sec |

| Sub-Account Interface                        | Interface Name                                                    | Limit Target | Rate           |
| -------------------------------------------- | ----------------------------------------------------------------- | ------------ | -------------- |
| /account/sub-account/main/v1/sub-to-main     | Sub-Account Spot Asset Transfer (For Main Account)                | X-BM-KEY     | 2 times/2 sec  |
| /account/sub-account/sub/v1/sub-to-main      | Sub-Account Spot Asset Transfer (For Sub-Account)                 | X-BM-KEY     | 2 times/2 sec  |
| /account/sub-account/main/v1/main-to-sub     | Main Account Spot Asset Transfer (For Main Account)               | X-BM-KEY     | 2 times/2 sec  |
| /account/sub-account/sub/v1/sub-to-sub       | Sub-Account to Sub-Account Spot Asset Transfer (For Sub-Account)  | X-BM-KEY     | 2 times/2 sec  |
| /account/sub-account/main/v1/sub-to-sub      | Sub-account to Sub-Account Spot Asset Transfer (For Main Account) | X-BM-KEY     | 2 times/2 sec  |
| /account/sub-account/main/v1/transfer-list   | Query Sub-account Spot Asset Transfer History (For Main Account)  | X-BM-KEY     | 8 times/2 sec  |
| /account/sub-account/v1/transfer-history     | Get Account Spot Asset Transfer History                           | X-BM-KEY     | 8 times/2 sec  |
| /account/sub-account/main/v1/wallet          | Get Sub-Account Spot Wallet Balance (For Main Account)            | X-BM-KEY     | 12 times/2 sec |
| /account/sub-account/main/v1/subaccount-list | Get Sub-account List (For Main Account)                           | X-BM-KEY     | 8 times/2 sec  |

| Margin Loan Interface                  | Interface Name                             | Limit Target | Rate            |
| -------------------------------------- | ------------------------------------------ | ------------ | --------------- |
| /spot/v1/margin/isolated/borrow        | Margin Borrow (Isolated)                   | X-BM-KEY     | 2 times/2 sec   |
| /spot/v1/margin/isolated/repay         | Margin Repay (Isolated)                    | X-BM-KEY     | 2 times/2 sec   |
| /spot/v1/margin/isolated/borrow_record | Get Borrow Record(Isolated)                | X-BM-KEY     | 150 times/2 sec |
| /spot/v1/margin/isolated/repay_record  | Get Repayment Record(Isolated)             | X-BM-KEY     | 150 times/2 sec |
| /spot/v1/margin/isolated/pairs         | Get Trading Pair Borrowing Rate and Amount | X-BM-KEY     | 2 times/2 sec   |

### REST API

Speed limit judgment:

Each call to the interface will return 3 Response Headers with limit tags, as
shown below:

> Example:

Copy Success

Copy to Clipboard

`X-BM-RateLimit-Remaining: 10 X-BM-RateLimit-Limit: 600 X-BM-RateLimit-Reset: 60 The above setting means that it can be called 600 times within 60 seconds, and currently has been called 10 times`

| Response Header          | Description                                                           |
| ------------------------ | --------------------------------------------------------------------- |
| X-BM-RateLimit-Remaining | The number of requests that have been used in the current time window |
| X-BM-RateLimit-Limit     | The max number of requests in the current time window                 |
| X-BM-RateLimit-Reset     | Current time window, in seconds                                       |

Note that when X-BM-RateLimit-Remaining> X-BM-RateLimit-Limit, please do not
continue to call, otherwise it will be banned
