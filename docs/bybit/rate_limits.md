- [](/docs/)
- Rate Limit
- Rate Limit Rules

On this page

# Rate Limit Rules

## IP Limit[​](#ip-limit "Direct link to heading")

### HTTP IP limit[​](#http-ip-limit "Direct link to heading")

You are allowed to send **600 requests within a 5-second window per IP** by
default. This limit applies to all traffic directed to `api.bybit.com`,
`api.bybick.com`, and local site hostnames such as `api.bybit.kz`. If you
encounter the error **"403, access too frequent"**, it indicates that your IP
has exceeded the allowed request frequency. In this case, you should terminate
all HTTP sessions and wait for at least 10 minutes. The ban will be lifted
automatically.

We do not recommend running your application at the very edge of these limits in
case abnormal network activity results in an unexpected violation.

### Websocket IP limit[​](#websocket-ip-limit "Direct link to heading")

- Do not establish more than 500 connections within a 5-minute window. This
  limit applies to all connections directed to `stream.bybit.com` as well as
  local site hostnames such as `stream.bybit.kz`.
- Do not frequently connect and disconnect the connection
- Do not establish more than 1,000 connections per IP for market data. The
  connection limits are counted separately for Spot, Linear, Inverse, and
  Options markets

## API Rate Limit[​](#api-rate-limit "Direct link to heading")

caution

If you receive `"retCode": 10006, "retMsg": "Too many visits!"` in the JSON
response, you have hit the API rate limit.

The API rate limit is based on the **rolling time window per second and UID**.
In other words, it is per second per UID. Every request to the API returns
response header shown in the code panel:

- `X-Bapi-Limit-Status` - your remaining requests for current endpoint
- `X-Bapi-Limit` - your current limit for current endpoint
- `X-Bapi-Limit-Reset-Timestamp` - the timestamp indicating when your request
  limit resets if you have exceeded your rate_limit. Otherwise, this is just the
  current timestamp (it may not exactly match `timeNow`).

> Http Response Header Example

```
▶Response HeadersContent-Type: application/json; charset=utf-8Content-Length: 141X-Bapi-Limit: 100X-Bapi-Limit-Status: 99X-Bapi-Limit-Reset-Timestamp: 1672738134824
```

### API Rate Limit Table[​](#api-rate-limit-table "Direct link to heading")

#### Trade[​](#trade "Direct link to heading")

| Method                            | Path               | UTA2.0 Pro | upgradable |
| --------------------------------- | ------------------ | :--------: | ---------- | ---- | --- |
| inverse                           | linear             |   option   | spot       |
| POST                              | /v5/order/create   |    10/s    | 10/s       | 20/s | Y   |
| /v5/order/amend                   | 10/s               |    10/s    | 10/s       | Y    |
| /v5/order/cancel                  | 10/s               |    10/s    | 20/s       | Y    |
| /v5/order/cancel-all              | 10/s               |    1/s     | 20/s       | Y    |
| /v5/order/create-batch            | 10/s               |    10/s    | 20/s       | Y    |
| /v5/order/amend-batch             | 10/s               |    10/s    | 20/s       | Y    |
| /v5/order/cancel-batch            | 10/s               |    10/s    | 20/s       | Y    |
| /v5/order/disconnected-cancel-all | 5/s                |     N      |
| GET                               | /v5/order/realtime |    50/s    | N          |
| /v5/order/history                 | 50/s               |     N      |
| /v5/execution/list                | 50/s               |     N      |
| /v5/order/spot-borrow-check       | \-                 |    50/s    | N          |

#### Position[​](#position "Direct link to heading")

| Method                  | Path                      | UTA2.0 Pro | upgradable |
| ----------------------- | ------------------------- | :--------: | ---------- | --- | --- | --- |
| inverse                 | linear                    |   option   | spot       |
| GET                     | /v5/position/list         |    50/s    | \-         | N   |
| /v5/position/closed-pnl | 50/s                      |     \-     | \-         | N   |
| POST                    | /v5/position/set-leverage |    10/s    | 10/s       | \-  | \-  | N   |

#### Account[​](#account "Direct link to heading")

| Method                       | Path                       |                     | Limit | upgradable |
| ---------------------------- | -------------------------- | ------------------- | ----- | ---------- |
| GET                          | /v5/account/wallet-balance | accountType=UNIFIED | 50/s  | N          |
| /v5/account/withdrawal       |                            | 50/s                | N     |
| /v5/account/borrow-history   |                            | 50/s                | N     |
| /v5/account/borrow           |                            | 1/s                 | N     |
| /v5/account/repay            |                            | 1/s                 | N     |
| /v5/account/no-convert-repay |                            | 1/s                 | N     |
| /v5/account/collateral-info  |                            | 50/s                | N     |
| /v5/asset/coin-greeks        |                            | 50/s                | N     |
| /v5/account/transaction-log  | accountType=UNIFIED        | 50/s                | N     |
| /v5/account/fee-rate         | category=linear            | 10/s                | N     |
| category=spot                | 5/s                        | N                   |
| category=option              | 5/s                        | N                   |
| category=inverse             | 10/s                       | N                   |

#### Asset[​](#asset "Direct link to heading")

| Method                                           | Path                                | Limit      | upgradable |
| ------------------------------------------------ | ----------------------------------- | ---------- | ---------- |
| GET                                              | /v5/asset/transfer/query-asset-info | 60 req/min | N          |
| /v5/asset/transfer/query-transfer-coin-list      | 60 req/min                          | N          |
| /v5/asset/transfer/query-inter-transfer-list     | 60 req/min                          | N          |
| /v5/asset/transfer/query-sub-member-list         | 60 req/min                          | N          |
| /v5/asset/transfer/query-universal-transfer-list | 5 req/s                             | N          |
| /v5/asset/transfer/query-account-coins-balance   | 5 req/s                             | N          |
| /v5/asset/deposit/query-record                   | 100 req/min                         | N          |
| /v5/asset/deposit/query-sub-member-record        | 300 req/min                         | N          |
| /v5/asset/deposit/query-address                  | 300 req/min                         | N          |
| /v5/asset/deposit/query-sub-member-address       | 300 req/min                         | N          |
| /v5/asset/withdraw/query-record                  | 300 req/min                         | N          |
| /v5/asset/coin/query-info                        | 5 req/s                             | N          |
| /v5/asset/exchange/order-record                  | 600 req/min                         | N          |
| POST                                             | /v5/asset/transfer/inter-transfer   | 60 req/min | N          |
| /v5/asset/transfer/save-transfer-sub-member      | 20 req/s                            | N          |
| /v5/asset/transfer/universal-transfer            | 5 req/s                             | N          |
| /v5/asset/withdraw/create                        | 5 req/s                             | N          |
| /v5/asset/withdraw/cancel                        | 60 req/min                          | N          |

#### User[​](#user "Direct link to heading")

<table border="0.8"><tbody><tr><th>Method</th><th>Path</th><th>Limit</th><td>upgradable</td></tr><tr><td rowspan="7">POST</td><td>v5/user/create-sub-member</td><td>1 req/s</td><td>N</td></tr><tr><td>/v5/user/create-sub-api</td><td>1 req/s</td><td>N</td></tr><tr><td>/v5/user/frozen-sub-member</td><td>5 req/s</td><td>N</td></tr><tr><td>/v5/user/update-api</td><td>5 req/s</td><td>N</td></tr><tr><td>/v5/user/update-sub-api</td><td>5 req/s</td><td>N</td></tr><tr><td>/v5/user/delete-api</td><td>5 req/s</td><td>N</td></tr><tr><td>/v5/user/delete-sub-api</td><td>5 req/s</td><td>N</td></tr><tr><td rowspan="3">GET</td><td>/v5/user/query-sub-members</td><td>10 req/s</td><td>N</td></tr><tr><td>/v5/user/query-api</td><td>10 req/s</td><td>N</td></tr><tr><td>/v5/user/aff-customer-info</td><td>10 req/s</td><td>N</td></tr></tbody></table>

#### Spot Margin Trade (UTA)[​](#spot-margin-trade-uta "Direct link to heading")

<table border="0.8"><tbody><tr><td>For now, there is no limit for endpoints under this category</td></tr></tbody></table>

#### Spread Trading[​](#spread-trading "Direct link to heading")

| Method |                              Path                               | Limit    | Upgradable |
| :----- | :-------------------------------------------------------------: | -------- | ---------- |
| POST   |    [Create Spread Order](/docs/v5/spread/trade/create-order)    | 20 req/s | N          |
| POST   |     [Amend Spread Order](/docs/v5/spread/trade/amend-order)     | 20 req/s | N          |
| POST   |    [Cancel Spread Order](/docs/v5/spread/trade/cancel-order)    | 20 req/s | N          |
| POST   |  [Cancel All Spread Orders](/docs/v5/spread/trade/cancel-all)   | 5 req/s  | N          |
| GET    |   [Get Spread Open Orders](/docs/v5/spread/trade/open-order)    | 50 req/s | N          |
| GET    | [Get Spread Order History](/docs/v5/spread/trade/order-history) | 50 req/s | N          |
| GET    | [Get Spread Trade History](/docs/v5/spread/trade/trade-history) | 50 req/s | N          |

## Instructions for batch endpoints[​](#instructions-for-batch-endpoints "Direct link to heading")

tip

The batch order endpoint, which includes operations for creating, amending, and
canceling, has its own rate limit and does not share it with single requests,
_e.g., let's say the rate limit of single create order endpoint is 100/s, and
batch create order endpoint is 100/s, so in this case, I can place 200 linear
orders in one second if I use both endpoints to place orders_

#### When category = linear spot or inverse[​](#when-category--linear-spot-or-inverse "Direct link to heading")

- API for batch create/amend/cancel order, the frequency of the API will be
  consistent with the current configuration, but the counting consumption will
  be consumed according to the actual number of orders. (Number of consumption =
  number of requests \* number of orders included in a single request), and the
  configuration of business lines is independent of each other.
- The batch APIs allows 1-10 orders/request. For example, if a batch order
  request is made once and contains 5 orders, then the request limit will
  consume 5.
- If part of the last batch of orders requested within 1s exceeds the limit, the
  part that exceeds the limit will fail, and the part that does not exceed the
  limit will succeed. For example, in the 1 second, the remaining limit is 5,
  but a batch request containing 8 orders is placed at this time, then the first
  5 orders will be successfully placed, and the 6-8th orders will report an
  error exceeding the limit, and these orders will fail.

[

Previous

System Status

](/docs/v5/websocket/system/system-status)[

Next

API Rate Limit Rules for VIPs

](/docs/v5/rate-limit/rules-for-vips)

- [IP Limit](#ip-limit)
  - [HTTP IP limit](#http-ip-limit)
  - [Websocket IP limit](#websocket-ip-limit)
- [API Rate Limit](#api-rate-limit)
  - [API Rate Limit Table](#api-rate-limit-table)
    - [Trade](#trade)
    - [Position](#position)
    - [Account](#account)
    - [Asset](#asset)
    - [User](#user)
    - [Spot Margin Trade (UTA)](#spot-margin-trade-uta)
    - [Spread Trading](#spread-trading)
- [Instructions for batch endpoints](#instructions-for-batch-endpoints)
