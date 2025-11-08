# GET Rate Limit

**Source:** [Rate Limit](https://developer-pro.bitmart.com/en/futuresv2/)

**API Type:** Futures

## Authentication

Required (Private Endpoint)

## Rate Limit

The speed of the public interface is limited according to the IP, and the speed of the private interface is limited according to the API KEY. When the requests exceed the rate limit, the 429 status will be returned: the request is too frequent.

### Endpoints Limit Rules:

| Futures Market Endpoints | Endpoint Name | Limit Target | Rate |
| --- | --- | --- | --- |
| /contract/public/details | Get a detailed list of all trading pairs | IP | 12 times/2 sec |
| /contract/public/depth | Get full depth of trading pairs | IP | 12 times/2 sec |
| /contract/public/open-interest | Get Contract Open Interest | IP | 2 times/2 sec |
| /contract/public/funding-rate | Get Current Funding Rate | IP | 12 times/2 sec |
| /contract/public/funding-rate-history | Get history Funding Rate | IP | 12 times/2 sec |
| /contract/public/kline | Get K-line | IP | 12 times/2 sec |
| /contract/public/markprice-kline | Get Mark Price K-line | IP | 12 times/2 sec |
| /contract/public/leverage-bracket | Get Contract Leverage Risk Limit | IP | 12 times/2 sec |
| /contract/public/market-trade | Get Market Trade | IP | 12 times/2 sec |

| Futures Trade Endpoints | Endpoint Name | Limit Target | Rate |
| --- | --- | --- | --- |
| /contract/private/submit-order | Submit Contract Order | X-BM-KEY | 24 times/2 sec |
| /contract/private/cancel-order | Cancel Contract Order | X-BM-KEY | 40 times/2 sec |
| /contract/private/cancel-orders | Batch Cancel Contract Orders | X-BM-KEY | 2 times/2 sec |
| /contract/private/submit-plan-order | Submit Contract Plan Order | UID | 24 times/2 sec |
| /contract/private/cancel-plan-order | Cancel Contract Plan Order | UID | 40 times/2 sec |
| /contract/private/submit-tp-sl-order | Submit Contract TP or SL order | UID | 24 times/2 esc |
| /contract/private/modify-plan-order | Modify Contract Plan Order | UID | 24 times/2 esc |
| /contract/private/modify-preset-plan-order | Modify Contract Preset Plan Order | UID | 24 times/2 esc |
| /contract/private/modify-tp-sl-order | Modify Contract TP or SL Order | UID | 24 times/2 esc |
| /contract/private/modify-limit-order | Modify Contract Limit Order | UID | 24 times/2 esc |
| /contract/private/cancel-all-after | Timed cancel all open orders | UID | 4 times/2 esc |
| /contract/private/submit-trail-order | Submit Trail Order | UID | 24 times/2 esc |
| /contract/private/cancel-trail-order | Cancel Trail Order | UID | 24 times/2 esc |
| /contract/private/set-position-mode | Set position mode | X-BM-KEY | 2 times/2 esc |
| /contract/private/get-position-mode | Get position mode | X-BM-KEY | 2 times/2 esc |
| /contract/private/get-open-orders | Get Contract All Open Orders | X-BM-KEY | 50 times/2 sec |
| /contract/private/order | Get Contract Order Detail | X-BM-KEY | 50 times/2 sec |
| /contract/private/order-history | Get Contract Order History | X-BM-KEY | 6 times/2 sec |
| /contract/private/trades | Get Contract Order Trade Detail | X-BM-KEY | 6 times/2 sec |
| /contract/private/transaction-history | Get Transaction History | X-BM-KEY | 6 times/2 sec |
| /contract/private/assets-detail | Get Contract Assets Detail | X-BM-KEY | 12 times/2 sec |
| /contract/private/position | Get Current Position Detail | X-BM-KEY | 6 times/2 sec |
| /contract/private/position-v2 | Get Current Position Detail V2 | X-BM-KEY | 6 times/2 sec |
| /contract/private/submit-leverage | Submit Contract Leverage | X-BM-KEY | 24 times/2 sec |
| /account/v1/transfer-contract | Transfer | X-BM-KEY | 1 times/2 sec |
| /account/v1/transfer-contract-list | Get Transfer List | X-BM-KEY | 1 times/2 sec |
| /contract/private/current-plan-order | Get Contract All Current Plan Orders | X-BM-KEY | 50 times/2 sec |
| /contract/private/position-risk | Get Position Risk Info | X-BM-KEY | 24 times/2 sec |
| /contract/private/trade-fee-rate | Get Trade Fee Rate | X-BM-KEY | 2 times/2 esc |

|

| Sub-Account Endpoints | Endpoint Name | Limit Target | Rate |
| --- | --- | --- | --- |
| /account/contract/sub-account/main/v1/sub-to-main | Sub-Account Transfer to Main-Account (For Main Account, ues futures account) | X-BM-KEY | 8 times/2s |
| /account/contract/sub-account/main/v1/main-to-sub | Main-Account Transfer to Sub-Account (For Main Account, ues futures account) | X-BM-KEY | 8 times/2s |
| /account/contract/sub-account/sub/v1/sub-to-main | Sub-Account Transfer to Main-Account (For Sub-Account, ues futures account) | X-BM-KEY | 8 times/2s |
| /account/contract/sub-account/main/v1/wallet | Get Sub-Account Futures Wallet Balance (For Main Account, ues futures account) | X-BM-KEY | 12 times/2s |
| /account/contract/sub-account/v1/transfer-history | Get Account Futures Asset Transfer History (For Main/Sub Account, ues futures account) | X-BM-KEY | 8 times/2s |
| /account/contract/sub-account/main/v1/transfer-list | Get Sub-Account Transfer History (For Main Account, ues futures account) | X-BM-KEY | 8 times/2s |

### REST API

Speed limit judgment:

Each call to the interface will return 3 Response Headers with limit tags, as shown below:

> Example:

`X-BM-RateLimit-Remaining: 10 X-BM-RateLimit-Limit: 600 X-BM-RateLimit-Reset: 60 The above setting means that it can be called 600 times within 60 seconds, and currently has been called 10 times`

| Response Header | Description |
| --- | --- |
| X-BM-RateLimit-Remaining | The number of requests that have been used in the current time window |
| X-BM-RateLimit-Limit | The max number of requests in the current time window |
| X-BM-RateLimit-Reset | Current time window, in seconds |

Note that when X-BM-RateLimit-Remaining> X-BM-RateLimit-Limit, please do not continue to call, otherwise it will be banned