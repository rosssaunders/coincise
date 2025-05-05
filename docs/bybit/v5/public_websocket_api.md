# ByBit V5 Public Websocket API Documentation

# Rate Limit

## IP Limit[​](#ip-limit "Direct link to heading")

### HTTP IP limit[​](#http-ip-limit "Direct link to heading")

You are allowed to send **600 requests within a 5-second window per IP** by
default. This limit applies to all traffic directed to `api.bybit.com`,
`api.bybick.com`, and local site hostnames such as `api.bybit.kz`. If you
encounter the error **“403, access too frequent”**, it indicates that your IP
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

- Classic account
- UTA1.0 Pro
- UTA2.0 Pro

| Method               | Path               | Classic account | upgradable |
| -------------------- | ------------------ | :-------------: | ---------- | --- |
| inverse              | linear             |      spot       |
| POST                 | /v5/order/create   |      10/s       | 20/s       | Y   |
| /v5/order/amend      | 10/s               |      10/s       | Y          |
| /v5/order/cancel     | 10/s               |      20/s       | Y          |
| /v5/order/cancel-all | 10/s               |      20/s       | Y          |
| GET                  | /v5/order/realtime |      10/s       | 20/s       | N   |
| /v5/order/history    | 10/s               |      20/s       | N          |
| /v5/execution/list   | 10/s               |      20/s       | N          |

| Method                            | Path               | UTA1.0 Pro | upgradable |
| --------------------------------- | ------------------ | :--------: | ---------- | ---- | ---- | --- |
| inverse                           | linear             |   option   | spot       |
| POST                              | /v5/order/create   |    10/s    | 10/s       | 10/s | 20/s | Y   |
| /v5/order/amend                   | 10/s               |    10/s    | 10/s       | 20/s | Y    |
| /v5/order/cancel                  | 10/s               |    10/s    | 10/s       | 20/s | Y    |
| /v5/order/cancel-all              | 10/s               |    10/s    | 1/s        | 20/s | Y    |
| /v5/order/create-batch            | -                  |    10/s    | 10/s       | 20/s | Y    |
| /v5/order/amend-batch             | -                  |    10/s    | 10/s       | 20/s | Y    |
| /v5/order/cancel-batch            | -                  |    10/s    | 10/s       | 20/s | Y    |
| /v5/order/disconnected-cancel-all | -                  |    5/s     | N          |
| GET                               | /v5/order/realtime |    10/s    | 50/s       | N    |
| /v5/order/history                 | 10/s               |    50/s    | N          |
| /v5/execution/list                | 10/s               |    50/s    | N          |
| /v5/order/spot-borrow-check       | -                  |    50/s    | N          |

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
| /v5/order/spot-borrow-check       | -                  |    50/s    | N          |

#### Position[​](#position "Direct link to heading")

- Classic account
- UTA1.0 Pro
- UTA2.0 Pro

| Method                  | Path                      | Classic account | upgradable |
| ----------------------- | ------------------------- | :-------------: | ---------- | --- |
| inverse                 | linear                    |      spot       |
| GET                     | /v5/position/list         |      10/s       | -          | N   |
| /v5/position/closed-pnl | 10/s                      |        -        | N          |
| POST                    | /v5/position/set-leverage |      10/s       | -          | N   |

| Method                  | Path                      | UTA1.0 Pro | upgradable |
| ----------------------- | ------------------------- | :--------: | ---------- | --- | --- | --- |
| inverse                 | linear                    |   option   | spot       |
| GET                     | /v5/position/list         |    10/s    | 50/s       | -   | N   |
| /v5/position/closed-pnl | 10/s                      |    50/s    | -          | -   | N   |
| POST                    | /v5/position/set-leverage |    10/s    | 10/s       | -   | -   | N   |

| Method                  | Path                      | UTA2.0 Pro | upgradable |
| ----------------------- | ------------------------- | :--------: | ---------- | --- | --- | --- |
| inverse                 | linear                    |   option   | spot       |
| GET                     | /v5/position/list         |    50/s    | -          | N   |
| /v5/position/closed-pnl | 50/s                      |     -      | -          | N   |
| POST                    | /v5/position/set-leverage |    10/s    | 10/s       | -   | -   | N   |

#### Account[​](#account "Direct link to heading")

- Classic account
- UTA1.0 Pro
- UTA2.0 Pro

| Method                     | Path                                 |      | Limit | upgradable |
| -------------------------- | ------------------------------------ | ---- | ----- | ---------- |
| GET                        | /v5/account/contract-transaction-log |      | 10/s  | N          |
| /v5/account/wallet-balance | accountType=SPOT                     | 20/s | N     |
| accountType=CONTRACT       | 10/s                                 | N    |
| /v5/account/fee-rate       | category=linear                      | 10/s | N     |
| category=spot              | 5/s                                  | N    |
| category=option            | 5/s                                  | N    |

| Method | Path                       |                      | Limit | upgradable |
| ------ | -------------------------- | -------------------- | ----- | ---------- |
| GET    | /v5/account/wallet-balance | accountType=CONTRACT | 50/s  | N          |

| accountType=UNIFIED | /v5/account/withdrawal | | 50/s | N |
/v5/account/borrow-history | | 50/s | N | /v5/account/collateral-info | | 50/s |
N | /v5/asset/coin-greeks | | 50/s | N | /v5/account/transaction-log |
accountType=UNIFIED | 50/s | N | /v5/account/fee-rate | category=linear | 10/s |
N | category=spot | 5/s | N | category=option | 5/s | N

| Method                      | Path                       |                     | Limit | upgradable |
| --------------------------- | -------------------------- | ------------------- | ----- | ---------- |
| GET                         | /v5/account/wallet-balance | accountType=UNIFIED | 50/s  | N          |
| /v5/account/withdrawal      |                            | 50/s                | N     |
| /v5/account/borrow-history  |                            | 50/s                | N     |
| /v5/account/collateral-info |                            | 50/s                | N     |
| /v5/asset/coin-greeks       |                            | 50/s                | N     |
| /v5/account/transaction-log | accountType=UNIFIED        | 50/s                | N     |
| /v5/account/fee-rate        | category=linear            | 10/s                | N     |
| category=spot               | 5/s                        | N                   |
| category=option             | 5/s                        | N                   |

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

<table border="0.8"><tbody><tr><th>Method</th><th>Path</th><th>Limit</th><td>upgradable</td></tr><tr><td rowspan="7">POST</td><td>v5/user/create-sub-member</td><td>5 req/s</td><td>N</td></tr><tr><td>/v5/user/create-sub-api</td><td>5 req/s</td><td>N</td></tr><tr><td>/v5/user/frozen-sub-member</td><td>5 req/s</td><td>N</td></tr><tr><td>/v5/user/update-api</td><td>5 req/s</td><td>N</td></tr><tr><td>/v5/user/update-sub-api</td><td>5 req/s</td><td>N</td></tr><tr><td>/v5/user/delete-api</td><td>5 req/s</td><td>N</td></tr><tr><td>/v5/user/delete-sub-api</td><td>5 req/s</td><td>N</td></tr><tr><td rowspan="3">GET</td><td>/v5/user/query-sub-members</td><td>10 req/s</td><td>N</td></tr><tr><td>/v5/user/query-api</td><td>10 req/s</td><td>N</td></tr><tr><td>/v5/user/aff-customer-info</td><td>10 req/s</td><td>N</td></tr></tbody></table>

#### Spot Leverage Token[​](#spot-leverage-token "Direct link to heading")

| Method |               Path                | Limit    | Upgradable |
| :----- | :-------------------------------: | -------- | ---------- |
| GET    | /v5/spot-lever-token/order-record | 50 req/s | N          |
| POST   |   /v5/spot-lever-token/purchase   | 20 req/s | N          |
| POST   |    /v5/spot-lever-token/redeem    | 20 req/s | N          |

#### Spot Margin Trade (UTA)[​](#spot-margin-trade-uta "Direct link to heading")

<table border="0.8"><tbody><tr><td>For now, there is no limit for endpoints under this category</td></tr></tbody></table>

#### Spread Trading[​](#spread-trading "Direct link to heading")

| Method |                                    Path                                    | Limit       | Upgradable |
| :----- | :------------------------------------------------------------------------: | ----------- | ---------- |
| POST   |    <a href="/docs/v5/spread/trade/create-order">Create Spread Order</a>    | 100 req/min | N          |
| POST   |     <a href="/docs/v5/spread/trade/amend-order">Amend Spread Order</a>     | 100 req/min | N          |
| POST   |    <a href="/docs/v5/spread/trade/cancel-order">Cancel Spread Order</a>    | 100 req/min | N          |
| POST   |  <a href="/docs/v5/spread/trade/cancel-all">Cancel All Spread Orders</a>   | 100 req/min | N          |
| GET    |   <a href="/docs/v5/spread/trade/open-order">Get Spread Open Orders</a>    | 50 req/s    | N          |
| GET    | <a href="/docs/v5/spread/trade/order-history">Get Spread Order History</a> | 50 req/s    | N          |
| GET    | <a href="/docs/v5/spread/trade/trade-history">Get Spread Trade History</a> | 50 req/s    | N          |

## API Rate Limit Rules For VIPs[​](#api-rate-limit-rules-for-vips "Direct link to heading")

instructions for batch endpoints

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

|               | Classic account & UTA | UTA Pro       |
| ------------- | :-------------------: | ------------- | ----------- | -------------- | ------------- | ----------- |
| Level\Product |    <b>Futures</b>     | <b>Option</b> | <b>Spot</b> | <b>Futures</b> | <b>Option</b> | <b>Spot</b> |
| Default       |         10/s          | 10/s          | 20/s        | 10/s           | 10/s          | 20/s        |
| VIP 1         |         20/s          | 20/s          | 25/s        | 20/s           | 20/s          | 25/s        |
| VIP 2         |         40/s          | 40/s          | 30/s        | 40/s           | 40/s          | 30/s        |
| VIP 3         |         60/s          | 60/s          | 40/s        | 60/s           | 60/s          | 40/s        |
| VIP 4         |         60/s          | 60/s          | 40/s        | 60/s           | 60/s          | 40/s        |
| VIP 5         |         60/s          | 60/s          | 40/s        | 60/s           | 60/s          | 40/s        |
| VIP Supreme   |         60/s          | 60/s          | 40/s        | 60/s           | 60/s          | 40/s        |
| PRO1          |         100/s         | 100/s         | 50/s        | 150/s          | 150/s         | 150/s       |
| PRO2          |         150/s         | 150/s         | 75/s        | 200/s          | 200/s         | 200/s       |
| PRO3          |         200/s         | 200/s         | 100/s       | 250/s          | 250/s         | 250/s       |
| PRO4          |         200/s         | 200/s         | 100/s       | 300/s          | 300/s         | 300/s       |
| PRO5          |         200/s         | 200/s         | 100/s       | 300/s          | 300/s         | 300/s       |
| PRO6          |         200/s         | 200/s         | 100/s       | 300/s          | 300/s         | 300/s       |

# Enums Definitions

### locale[​](#locale "Direct link to heading")

- `de-DE`
- `en-US`
- `es-AR`
- `es-ES`
- `es-MX`
- `fr-FR`
- `kk-KZ`
- `id-ID`
- `uk-UA`
- `ja-JP`
- `ru-RU`
- `th-TH`
- `pt-BR`
- `tr-TR`
- `vi-VN`
- `zh-TW`
- `ar-SA`
- `hi-IN`
- `fil-PH`

### announcementType[​](#announcementtype "Direct link to heading")

- `new_crypto`
- `latest_bybit_news`
- `delistings`
- `latest_activities`
- `product_updates`
- `maintenance_updates`
- `new_fiat_listings`
- `other`

### announcementTag[​](#announcementtag "Direct link to heading")

- `Spot`
- `Derivatives`
- `Spot Listings`
- `BTC`
- `ETH`
- `Trading Bots`
- `USDC`
- `Leveraged Tokens`
- `USDT`
- `Margin Trading`
- `Partnerships`
- `Launchpad`
- `Upgrades`
- `ByVotes`
- `Delistings`
- `VIP`
- `Futures`
- `Institutions`
- `Options`
- `WEB3`
- `Copy Trading`
- `Earn`
- `Bybit Savings`
- `Dual Asset`
- `Liquidity Mining`
- `Shark Fin`
- `Launchpool`
- `NFT GrabPic`
- `Buy Crypto`
- `P2P Trading`
- `Fiat Deposit`
- `Crypto Deposit`
- `Спот`
- `Спот лістинги`
- `Торгові боти`
- `Токени з кредитним плечем`
- `Маржинальна торгівля`
- `Партнерство`
- `Оновлення`
- `Делістинги`
- `Ф'ючерси`
- `Опціони`
- `Копітрейдинг`
- `Bybit Накопичення`
- `Бівалютні інвестиції`
- `Майнінг ліквідності`
- `Купівля криптовалюти`
- `P2P торгівля`
- `Фіатні депозити`
- `Криптодепозити`
- `Копитрейдинг`
- `Торговые боты`
- `Деривативы`
- `P2P`
- `Спот листинги`
- `Деривативи`
- `MT4`
- `Lucky Draw`
- `Unified Trading Account`
- `Єдиний торговий акаунт`
- `Единый торговый аккаунт`
- `Институциональный трейдинг`
- `Інституціональний трейдинг`
- `Делистинг`

### category[​](#category "Direct link to heading")

_Unified Account_

- `spot`
- `linear` USDT perpetual, USDT Futures and USDC contract, including USDC perp,
  USDC futures
- `inverse` Inverse contract, including Inverse perp, Inverse futures
- `option`

_Classic Account_

- `linear` USDT perp
- `inverse` Inverse contract, including Inverse perp, Inverse futures
- `spot`

### orderStatus[​](#orderstatus "Direct link to heading")

_open status_

- `New` order has been placed successfully
- `PartiallyFilled`
- `Untriggered` Conditional orders are created

_closed status_

- `Rejected`
- `PartiallyFilledCanceled` Only spot has this order status
- `Filled`
- `Cancelled` In derivatives, orders with this status may have an executed qty
- `Triggered` instantaneous state for conditional orders from Untriggered to New
- `Deactivated` UTA: Spot tp/sl order, conditional order, OCO order are
  cancelled before they are triggered

### timeInForce[​](#timeinforce "Direct link to heading")

- `GTC` GoodTillCancel
- `IOC` ImmediateOrCancel
- `FOK` FillOrKill
- [PostOnly](https://www.bybit.com/en/help-center/article/Post-Only-Order)
- [RPI](https://www.bybit.com/en/help-center/article/Retail-Price-Improvement-RPI-Order) features:
  - **Exclusive Matching**: Only match non-algorithmic users; no execution
    against orders from Open API.
  - **Post-Only Mechanism**: Act as maker orders, adding liquidity
  - **Lower Priority**: Execute after non-RPI orders at the same price level.
  - **Limited Access**: Initially for select market makers across multiple
    pairs.
  - **Order Book Updates**: Excluded from API but displayed on the GUI.

### createType[​](#createtype "Direct link to heading")

- `CreateByUser`
- `CreateByFutureSpread` Spread order
- `CreateByAdminClosing`
- `CreateBySettle` USDC Futures delivery; Position closed by contract delisted
- `CreateByStopOrder` Futures conditional order
- `CreateByTakeProfit` Futures take profit order
- `CreateByPartialTakeProfit` Futures partial take profit order
- `CreateByStopLoss` Futures stop loss order
- `CreateByPartialStopLoss` Futures partial stop loss order
- `CreateByTrailingStop` Futures trailing stop order
- `CreateByLiq` Laddered liquidation to reduce the required maintenance margin
- `CreateByTakeOver_PassThrough`If the position is still subject to liquidation
  (i.e., does not meet the required maintenance margin level), the position
  shall be taken over by the liquidation engine and closed at the bankruptcy
  price.
- `CreateByAdl_PassThrough` [Auto-Deleveraging(ADL)](https://www.bybit.com/en/help-center/article/Auto-Deleveraging-ADL)
- `CreateByBlock_PassThrough` Order placed via Paradigm
- `CreateByBlockTradeMovePosition_PassThrough` Order created by move position
- `CreateByClosing` The close order placed via web or app position area -
  web/app
- `CreateByFGridBot` Order created via grid bot - web/app
- `CloseByFGridBot` Order closed via grid bot - web/app
- `CreateByTWAP` Order created by TWAP - web/app
- `CreateByTVSignal` Order created by TV webhook - web/app
- `CreateByMmRateClose` Order created by Mm rate close function - web/app
- `CreateByMartingaleBot` Order created by Martingale bot - web/app
- `CloseByMartingaleBot` Order closed by Martingale bot - web/app
- `CreateByIceBerg` Order created by Ice berg strategy - web/app
- `CreateByArbitrage` Order created by arbitrage - web/app
- `CreateByDdh` Option dynamic delta hedge order - web/app

### execType[​](#exectype "Direct link to heading")

- `Trade`
- `AdlTrade` [Auto-Deleveraging](https://www.bybit.com/en/help-center/article/Auto-Deleveraging-ADL)
- `Funding` [Funding fee](https://www.bybit.com/en/help-center/article/Introduction-to-Funding-Rate)
- `BustTrade` Takeover liquidation
- `Delivery` USDC futures delivery; Position closed by contract delisted
- `Settle` Inverse futures settlement; Position closed due to delisting
- `BlockTrade`
- `MovePosition`
- `FutureSpread` Spread leg execution
- `UNKNOWN` May be returned by a classic account. Cannot query by this type

### orderType[​](#ordertype "Direct link to heading")

- `Market`
- `Limit`
- `UNKNOWN` is not a valid request parameter value. Is only used in some
  responses. Mainly, it is used when `execType` is `Funding`.

### stopOrderType[​](#stopordertype "Direct link to heading")

- `TakeProfit`
- `StopLoss`
- `TrailingStop`
- `Stop`
- `PartialTakeProfit`
- `PartialStopLoss`
- `tpslOrder` spot TP/SL order
- `OcoOrder` spot Oco order
- `MmRateClose` On web or app can set MMR to close position
- `BidirectionalTpslOrder` Spot bidirectional tpsl order

### tickDirection[​](#tickdirection "Direct link to heading")

- `PlusTick` price rise
- `ZeroPlusTick` trade occurs at the same price as the previous trade, which
  occurred at a price higher than that for the trade preceding it
- `MinusTick` price drop
- `ZeroMinusTick` trade occurs at the same price as the previous trade, which
  occurred at a price lower than that for the trade preceding it

### interval[​](#interval "Direct link to heading")

- `1` `3` `5` `15` `30` `60` `120` `240` `360` `720` minute
- `D` day
- `W` week
- `M` month

### intervalTime[​](#intervaltime "Direct link to heading")

- `5min` `15min` `30min` minute
- `1h` `4h` hour
- `1d` day

### positionIdx[​](#positionidx "Direct link to heading")

- `0` one-way mode position
- `1` Buy side of hedge-mode position
- `2` Sell side of hedge-mode position

### positionStatus[​](#positionstatus "Direct link to heading")

- `Normal`
- `Liq` in the liquidation progress
- `Adl` in the auto-deleverage progress

### rejectReason[​](#rejectreason "Direct link to heading")

- `EC_NoError`
- `EC_Others`
- `EC_UnknownMessageType`
- `EC_MissingClOrdID`
- `EC_MissingOrigClOrdID`
- `EC_ClOrdIDOrigClOrdIDAreTheSame`
- `EC_DuplicatedClOrdID`
- `EC_OrigClOrdIDDoesNotExist`
- `EC_TooLateToCancel`
- `EC_UnknownOrderType`
- `EC_UnknownSide`
- `EC_UnknownTimeInForce`
- `EC_WronglyRouted`
- `EC_MarketOrderPriceIsNotZero`
- `EC_LimitOrderInvalidPrice`
- `EC_NoEnoughQtyToFill`
- `EC_NoImmediateQtyToFill`
- `EC_PerCancelRequest`
- `EC_MarketOrderCannotBePostOnly`
- `EC_PostOnlyWillTakeLiquidity`
- `EC_CancelReplaceOrder`
- `EC_InvalidSymbolStatus`
- `EC_CancelForNoFullFill`
- `EC_BySelfMatch`
- `EC_InCallAuctionStatus` used for pre-market order operation, e.g., during 2nd
  phase of call auction, cancel order is not allowed, when the cancel request is
  failed to be rejected by trading server, the request will be rejected by
  matching box finally
- `EC_QtyCannotBeZero`
- `EC_MarketOrderNoSupportTIF`
- `EC_ReachMaxTradeNum`
- `EC_InvalidPriceScale`
- `EC_BitIndexInvalid`
- `EC_StopBySelfMatch`
- `EC_InvalidSmpType`
- `EC_CancelByMMP`
- `EC_InvalidUserType`
- `EC_InvalidMirrorOid`
- `EC_InvalidMirrorUid`
- `EC_EcInvalidQty`
- `EC_InvalidAmount`
- `EC_LoadOrderCancel`
- `EC_MarketQuoteNoSuppSell`
- `EC_DisorderOrderID`
- `EC_InvalidBaseValue`
- `EC_LoadOrderCanMatch`
- `EC_SecurityStatusFail`
- `EC_ReachRiskPriceLimit`
- `EC_OrderNotExist`
- `EC_CancelByOrderValueZero`
- `EC_CancelByMatchValueZero`
- `EC_ReachMarketPriceLimit`

### accountType[​](#accounttype "Direct link to heading")

#### [UTA2.0](/docs/v5/acct-mode#uta20)[​](#uta20 "Direct link to heading")

- `UNIFIED` Unified Trading Account
- `FUND` Funding Account

#### [UTA1.0](/docs/v5/acct-mode#uta10)[​](#uta10 "Direct link to heading")

- `CONTRACT` Inverse Derivatives Account (no UDST in this wallet))
- `UNIFIED` Unified Trading Account
- `FUND` Funding Account

#### Classic account[​](#classic-account "Direct link to heading")

Also known as the "standard account".

- `SPOT` Spot Account
- `CONTRACT` Derivatives Account (contain USDT in this wallet)
- `FUND` Funding Account

### transferStatus[​](#transferstatus "Direct link to heading")

- `SUCCESS`
- `PENDING`
- `FAILED`

### depositStatus[​](#depositstatus "Direct link to heading")

- `0` unknown
- `1` toBeConfirmed
- `2` processing
- `3` success (finalised status of a success deposit)
- `4` deposit failed
- `10011` pending to be credited to funding pool
- `10012` Credited to funding pool successfully

### withdrawStatus[​](#withdrawstatus "Direct link to heading")

- `SecurityCheck`
- `Pending`
- `success`
- `CancelByUser`
- `Reject`
- `Fail`
- `BlockchainConfirmed`
- `MoreInformationRequired`
- `Unknown` a rare status

### triggerBy[​](#triggerby "Direct link to heading")

- `LastPrice`
- `IndexPrice`
- `MarkPrice`

### cancelType[​](#canceltype "Direct link to heading")

- `CancelByUser`
- `CancelByReduceOnly` cancelled by
  [reduceOnly](https://bybit-exchange.github.io/docs/v5/order/create-order)
- `CancelByPrepareLiq` `CancelAllBeforeLiq` cancelled in order to attempt
  [liquidation prevention](https://www.bybit.com/en/help-center/article/Liquidation-Process-Derivatives-Standard-Account)
  by freeing up margin
- `CancelByPrepareAdl` `CancelAllBeforeAdl` cancelled due to
  [ADL](https://www.bybit.com/en/help-center/article/Auto-Deleveraging-ADL)
- `CancelByAdmin`
- `CancelBySettle` cancelled due to delisting contract
- `CancelByTpSlTsClear` TP/SL order cancelled when the position is cleared
- `CancelBySmp` cancelled by [SMP](https://bybit-exchange.github.io/docs/v5/smp)

_Options:_

- `CancelByUser`
- `CancelByReduceOnly`
- `CancelAllBeforeLiq` cancelled due to liquidation
- `CancelAllBeforeAdl` cancelled due to ADL
- `CancelBySettle`
- `CancelByCannotAffordOrderCost`
- `CancelByPmTrialMmOverEquity`
- `CancelByAccountBlocking`
- `CancelByDelivery`
- `CancelByMmpTriggered`
- `CancelByCrossSelfMuch`
- `CancelByCrossReachMaxTradeNum`
- `CancelByDCP`
- `CancelBySmp`

### optionPeriod[​](#optionperiod "Direct link to heading")

- BTC: `7`,`14`,`21`,`30`,`60`,`90`,`180`,`270`days
- ETH: `7`,`14`,`21`,`30`,`60`,`90`,`180`,`270`days
- SOL: `7`,`14`,`21`,`30`,`60`,`90`days

### dataRecordingPeriod[​](#datarecordingperiod "Direct link to heading")

- `5min` `15min` `30min` minute
- `1h` `4h` hour
- `4d` day

### contractType[​](#contracttype "Direct link to heading")

- `InversePerpetual`
- `LinearPerpetual`
- `LinearFutures` USDT/USDC Futures
- `InverseFutures`

### status[​](#status "Direct link to heading")

- `PreLaunch`
- `Trading`
- `Delivering`
- `Closed`

### curAuctionPhase[​](#curauctionphase "Direct link to heading")

- `NotStarted` Pre-market trading is not started
- `Finished` Pre-market trading is finished
  - After the auction, if the pre-market contract fails to enter continues
    trading phase, it will be delisted and phase="Finished"
  - After the continuous trading, if the pre-market contract fails to be
    converted to official contract, it will be delisted and phase="Finished"
- `CallAuction` Auction phase of pre-market trading
  - only timeInForce=GTC, orderType=Limit order is allowed to submit
  - TP/SL are not supported; Conditional orders are not supported
  - cannot **modify** the order at this stage
  - order price range: \[[preOpenPrice](/docs/v5/market/tickers) x 0.5,
    [maxPrice](/docs/v5/market/instrument)\]
- `CallAuctionNoCancel` Auction no cancel phase of pre-market trading
  - only timeInForce=GTC, orderType=Limit order is allowed to submit
  - TP/SL are not supported; Conditional orders are not supported
  - cannot **modify and cancel** the order at this stage
  - order price range: Buy \[[lastPrice](/docs/v5/market/tickers) x 0.5,
    [markPrice](/docs/v5/market/tickers) x 1.1\], Sell
    \[[markPrice](/docs/v5/market/tickers) x 0.9,
    [maxPrice](/docs/v5/market/instrument)\]
- `CrossMatching` cross matching phase
  - cannot **create, modify and cancel** the order at this stage
  - Candle data is released from this stage
- `ContinuousTrading` Continuous trading phase
  - There is no restriction to create, amend, cancel orders
  - orderbook, public trade data is released from this stage

### marginTrading[​](#margintrading "Direct link to heading")

- `none` Regardless of normal account or UTA account, this trading pair does not
  support margin trading
- `both` For both normal account and UTA account, this trading pair supports
  margin trading
- `utaOnly` Only for UTA account,this trading pair supports margin trading
- `normalSpotOnly` Only for normal account, this trading pair supports margin
  trading

### copyTrading[​](#copytrading "Direct link to heading")

- `none` Regardless of normal account or UTA account, this trading pair does not
  support copy trading
- `both` For both normal account and UTA account, this trading pair supports
  copy trading
- `utaOnly` Only for UTA account,this trading pair supports copy trading
- `normalOnly` Only for normal account, this trading pair supports copy trading

### type(uta-translog)[​](#typeuta-translog "Direct link to heading")

- `TRANSFER_IN` Assets that transferred into Unified wallet
- `TRANSFER_OUT` Assets that transferred out from Unified wallet
- `TRADE`
- `SETTLEMENT` USDT Perp funding settlement, and USDC Perp funding settlement +
  USDC 8-hour session settlement
- `DELIVERY` USDC Futures, Option delivery
- `LIQUIDATION`
- `ADL` Auto-Deleveraging
- `AIRDROP`
- `BONUS` Bonus claimed
- `BONUS_RECOLLECT` Bonus expired
- `FEE_REFUND` Trading fee refunded
- `INTEREST` Interest occurred due to borrowing
- `CURRENCY_BUY` Currency convert, and the liquidation for borrowing asset(UTA
  loan)
- `CURRENCY_SELL` Currency convert, and the liquidation for borrowing asset(UTA
  loan)
- `BORROWED_AMOUNT_INS_LOAN`
- `PRINCIPLE_REPAYMENT_INS_LOAN`
- `INTEREST_REPAYMENT_INS_LOAN`
- `AUTO_SOLD_COLLATERAL_INS_LOAN` the liquidation for borrowing asset(INS loan)
- `AUTO_BUY_LIABILITY_INS_LOAN` the liquidation for borrowing asset(INS loan)
- `AUTO_PRINCIPLE_REPAYMENT_INS_LOAN`
- `AUTO_INTEREST_REPAYMENT_INS_LOAN`
- `TRANSFER_IN_INS_LOAN` Transfer In when in the liquidation of OTC loan
- `TRANSFER_OUT_INS_LOAN` Transfer Out when in the liquidation of OTC loan
- `SPOT_REPAYMENT_SELL` One-click repayment currency sell
- `SPOT_REPAYMENT_BUY` One-click repayment currency buy
- `TOKENS_SUBSCRIPTION` Spot leverage token subscription
- `TOKENS_REDEMPTION` Spot leverage token redemption
- `AUTO_DEDUCTION` Asset auto deducted by system (roll back)
- `FLEXIBLE_STAKING_SUBSCRIPTION` Byfi flexible stake subscription
- `FLEXIBLE_STAKING_REDEMPTION` Byfi flexible stake redemption
- `FIXED_STAKING_SUBSCRIPTION` Byfi fixed stake subscription
- `PREMARKET_TRANSFER_OUT`
- `PREMARKET_DELIVERY_SELL_NEW_COIN`
- `PREMARKET_DELIVERY_BUY_NEW_COIN`
- `PREMARKET_DELIVERY_PLEDGE_PAY_SELLER`
- `PREMARKET_DELIVERY_PLEDGE_BACK`
- `PREMARKET_ROLLBACK_PLEDGE_BACK`
- `PREMARKET_ROLLBACK_PLEDGE_PENALTY_TO_BUYER`
- `CUSTODY_NETWORK_FEE` fireblocks business
- `CUSTODY_SETTLE_FEE` fireblocks business
- `CUSTODY_LOCK` fireblocks / copper business
- `CUSTODY_UNLOCK` fireblocks business
- `CUSTODY_UNLOCK_REFUND` fireblocks business
- `LOANS_BORROW_FUNDS` crypto loan
- `LOANS_PLEDGE_ASSET` crypto loan repayment
- `BONUS_TRANSFER_IN`
- `BONUS_TRANSFER_OUT`
- `PEF_TRANSFER_IN`
- `PEF_TRANSFER_OUT`
- `PEF_PROFIT_SHARE`

### type(contract-translog)[​](#typecontract-translog "Direct link to heading")

- `TRANSFER_IN` Assets that transferred into (inverse) derivatives wallet
- `TRANSFER_OUT` Assets that transferred out from (inverse) derivatives wallet
- `TRADE`
- `SETTLEMENT` USDT / Inverse Perp funding settlement
- `DELIVERY` Inverse Futures delivery
- `LIQUIDATION`
- `ADL` Auto-Deleveraging
- `AIRDROP`
- `BONUS` Bonus claimed
- `BONUS_RECOLLECT` Bonus expired
- `FEE_REFUND` Trading fee refunded
- `CURRENCY_BUY` Currency convert
- `CURRENCY_SELL` Currency convert
- `AUTO_DEDUCTION` Asset auto deducted by system (roll back)
- `Others`

### unifiedMarginStatus[​](#unifiedmarginstatus "Direct link to heading")

- `1` Classic account
- `3` Unified trading account 1.0
- `4` Unified trading account 1.0 (pro version)
- `5` Unified trading account 2.0
- `6` Unified trading account 2.0 (pro version)

### ltStatus[​](#ltstatus "Direct link to heading")

- `1` LT can be purchased and redeemed
- `2` LT can be purchased, but not redeemed
- `3` LT can be redeemed, but not purchased
- `4` LT cannot be purchased nor redeemed
- `5` Adjusting position

### convertAccountType[​](#convertaccounttype "Direct link to heading")

Check the value of [`unifiedMarginStatus`](#unifiedmarginstatus)

#### [UTA2.0](/docs/v5/acct-mode#uta20)[​](#uta20-1 "Direct link to heading")

- `eb_convert_uta` Unified Trading Account
- `eb_convert_funding` Funding Account

#### [UTA1.0](/docs/v5/acct-mode#uta10)[​](#uta10-1 "Direct link to heading")

- `eb_convert_inverse` Inverse Derivatives Account (no USDT in this wallet))
- `eb_convert_uta` Unified Trading Account
- `eb_convert_funding` Funding Account

#### Classic account[​](#classic-account-1 "Direct link to heading")

Also known as the "standard account"

- `eb_convert_spot` Spot Account
- `eb_convert_contract` Derivatives Account (contain USDT in this wallet)
- `eb_convert_funding` Funding Account

### symbol[​](#symbol "Direct link to heading")

_USDT Perpetual_:

- `BTCUSDT`
- `ETHUSDT`

_USDT Futures_:

- `BTCUSDT-21FEB25`
- `ETHUSDT-14FEB25`

_USDC Perpetual_:

- `BTCPERP`
- `ETHPERP`

_USDC Futures_:

- `BTC-24MAR23`

_Inverse Perpetual_:

- `BTCUSD`
- `ETHUSD`

_Inverse Futures_:

- `BTCUSDH23` H: First quarter; 23: 2023
- `BTCUSDM23` M: Second quarter; 23: 2023
- `BTCUSDU23` U: Third quarter; 23: 2023
- `BTCUSDZ23` Z: Fourth quarter; 23: 2023

_Spot_:

- `BTCUSDT`
- `ETHUSDC`

_Option_:

- `BTC-13FEB25-89000-P-USDT` USDT Option
- `ETH-28FEB25-2800-C` USDC Option

### vipLevel[​](#viplevel "Direct link to heading")

- No VIP
- VIP-1
- VIP-2
- VIP-3
- VIP-4
- VIP-5
- VIP-Supreme
- PRO-1
- PRO-2
- PRO-3
- PRO-4
- PRO-5

### adlRankIndicator[​](#adlrankindicator "Direct link to heading")

- `0` default value of empty position
- `1`
- `2`
- `3`
- `4`
- `5`

### smpType[​](#smptype "Direct link to heading")

- default: `None`
- `CancelMaker`
- `CancelTaker`
- `CancelBoth`

### Spot Fee Currency Instruction[​](#spot-fee-currency-instruction "Direct link to heading")

with the example of BTCUSDT:

- Is makerFeeRate positive?
  - TRUE
    - Side = Buy -> base currency (BTC)
    - Side = Sell -> quote currency (USDT)
  - FALSE
    - IsMakerOrder = TRUE
      - Side = Buy -> quote currency (USDT)
      - Side = Sell -> base currency (BTC)
    - IsMakerOrder = FALSE
      - Side = Buy -> base currency (BTC)
      - Side = Sell -> quote currency (USDT)

# Error Codes

## HTTP Code[​](#http-code "Direct link to heading")

|                                    Code                                     | Description                                                                                                                             |
| :-------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------- |
|                                     400                                     | Bad request. Need to send the request with <strong>GET</strong> / <strong>POST</strong> (must be capitalized)                           |
| <a href="/docs/pilot-feature#normal-account-is-supported-by-v5-api">401</a> | Invalid request. 1. Need to use the correct key to access; 2. Need to put authentication params in the request header                   |
|                                     403                                     | Forbidden request. Possible causes: 1. IP rate limit breached; 2. You send GET request with an empty json body; 3. You are using U.S IP |
| <a href="/docs/pilot-feature#normal-account-is-supported-by-v5-api">404</a> | Cannot find path. Possible causes: 1. Wrong path; 2. Category value does not match account mode                                         |
|                                     429                                     | System level frequency protection. Please retry when encounter this                                                                     |

## WS OE General code[​](#ws-oe-general-code "Direct link to heading")

| Code  | Description                                                                                                                                                            |
| :---: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 10404 | 1. op type is not found; 2. <code>category</code> is not correct/supported                                                                                             |
| 10429 | System level frequency protection                                                                                                                                      |
| 10003 | Too many sessions under the same UID                                                                                                                                   |
| 10016 | 1. internal server error; 2. Service is restarting                                                                                                                     |
| 10019 | ws trade service is restarting, do not accept new request, but the request in the process is not affected. You can build new connection to be routed to normal service |
| 20003 | Too frequent requests under the same session                                                                                                                           |
| 20006 | reqId is duplicated                                                                                                                                                    |

## UTA[​](#uta "Direct link to heading")

|       Code        | Description                                                                                                                                                                                |
| :---------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|         0         | OK                                                                                                                                                                                         |
|        -1         | request expired: o@0, now[] diff[]                                                                                                                                                         |
|        429        | The trading service is experiencing a high server load. Please retry if you encounter this issue.                                                                                          |
|       -2015       | (Spot) Your api key has expired                                                                                                                                                            |
|       33004       | (Derivatives) Your api key has expired                                                                                                                                                     |
|       10000       | Server Timeout                                                                                                                                                                             |
|       10001       | Request parameter error                                                                                                                                                                    |
|       10002       | The request time exceeds the time window range.                                                                                                                                            |
|       10003       | API key is invalid. Check whether the key and domain are matched, there are 4 env: mainnet, testnet, mainnet-demo, testnet-demo                                                            |
|       10004       | Error sign, please check your signature generation algorithm.                                                                                                                              |
|       10005       | Permission denied, please check your API key permissions.                                                                                                                                  |
|       10006       | Too many visits. Exceeded the API Rate Limit.                                                                                                                                              |
|       10007       | User authentication failed.                                                                                                                                                                |
|       10008       | Common banned, please check your account mode                                                                                                                                              |
|       10009       | IP has been banned.                                                                                                                                                                        |
|       10010       | Unmatched IP, please check your API key's bound IP addresses.                                                                                                                              |
|       10014       | Invalid duplicate request.                                                                                                                                                                 |
|       10016       | Server error.                                                                                                                                                                              |
|       10017       | Route not found.                                                                                                                                                                           |
| <del>10018</del>  | <del>Exceeded the IP Rate Limit.</del>                                                                                                                                                     |
|       10024       | Compliance rules triggered                                                                                                                                                                 |
|       10027       | Transactions are banned.                                                                                                                                                                   |
|       10029       | The requested symbol is invalid, please check symbol whitelist                                                                                                                             |
|       10028       | The API can only be accessed by unified account users.                                                                                                                                     |
|       30133       | OTC loan: The symbol you select for USDT Perpetual is not allowed by Institutional Lending                                                                                                 |
|       30134       | OTC loan: The symbol you select for USDC Contract is not allowed by Institutional Lending                                                                                                  |
|       30135       | The leverage you select for USDT Perpetual trading cannot exceed the maximum leverage allowed by Institutional Lending.                                                                    |
|       30136       | The leverage you select for USDC Perpetual or Futures trading cannot exceed the maximum leverage allowed by Institutional Lending.                                                         |
|       40004       | the order is modified during the process of replacing , please check the order status again                                                                                                |
|      100028       | The API cannot be accessed by unified account users.                                                                                                                                       |
|      110001       | Order does not exist                                                                                                                                                                       |
|      110003       | Order price exceeds the <a href="https://www.bybithelp.com/en-US/s/article/Contract-Price-Limits" target="_blank" rel="noopener noreferrer">allowable range</a>.                           |
|      110004       | Wallet balance is insufficient                                                                                                                                                             |
|      110005       | position status error                                                                                                                                                                      |
|      110006       | The assets are estimated to be unable to cover the position margin                                                                                                                         |
|      110007       | Available balance is insufficient                                                                                                                                                          |
|      110008       | The order has been completed or cancelled.                                                                                                                                                 |
|      110009       | The number of stop orders exceeds the maximum allowable limit                                                                                                                              |
|      110010       | The order has been cancelled                                                                                                                                                               |
|      110011       | Liquidation will be triggered immediately by this adjustment                                                                                                                               |
|      110012       | Insufficient available balance.                                                                                                                                                            |
|      110013       | Cannot set leverage due to risk limit level.                                                                                                                                               |
|      110014       | Insufficient available balance to add additional margin.                                                                                                                                   |
|      110015       | The position is in cross margin mode.                                                                                                                                                      |
| <del>110016</del> | <del>The quantity of contracts requested exceeds the risk limit, please adjust your risk limit level before trying again</del>                                                             |
|      110017       | Reduce-only rule not satisfied                                                                                                                                                             |
|      110018       | User ID is illegal.                                                                                                                                                                        |
|      110019       | Order ID is illegal.                                                                                                                                                                       |
|      110020       | Not allowed to have more than 500 active orders.                                                                                                                                           |
|      110021       | Not allowed to exceeded position limits due to Open Interest.                                                                                                                              |
|      110022       | Quantity has been restricted and orders cannot be modified to increase the quantity.                                                                                                       |
|      110023       | Currently you can only reduce your position on this contract. please check our announcement or contact customer service for details.                                                       |
|      110024       | You have an existing position, so the position mode cannot be switched.                                                                                                                    |
|      110025       | Position mode has not been modified.                                                                                                                                                       |
|      110026       | Cross/isolated margin mode has not been modified.                                                                                                                                          |
|      110027       | Margin has not been modified.                                                                                                                                                              |
|      110028       | You have existing open orders, so the position mode cannot be switched.                                                                                                                    |
|      110029       | Hedge mode is not supported for this symbol.                                                                                                                                               |
| <del>110030</del> | <del>Duplicate orderId</del>                                                                                                                                                               |
|      110031       | Non-existing risk limit info, please check the risk limit rules.                                                                                                                           |
|      110032       | Order is illegal                                                                                                                                                                           |
|      110033       | You can't set margin without an open position                                                                                                                                              |
|      110034       | There is no net position                                                                                                                                                                   |
|      110035       | Cancellation of orders was not completed before liquidation                                                                                                                                |
|      110036       | You are not allowed to change leverage due to cross margin mode.                                                                                                                           |
|      110037       | User setting list does not have this symbol                                                                                                                                                |
|      110038       | You are not allowed to change leverage due to portfolio margin mode.                                                                                                                       |
|      110039       | Maintenance margin rate is too high. This may trigger liquidation.                                                                                                                         |
|      110040       | The order will trigger a forced liquidation, please re-submit the order.                                                                                                                   |
|      110041       | Skip liquidation is not allowed when a position or maker order exists                                                                                                                      |
|      110042       | Currently,due to pre-delivery status, you can only reduce your position on this contract.                                                                                                  |
|      110043       | Set leverage has not been modified.                                                                                                                                                        |
|      110044       | Available margin is insufficient.                                                                                                                                                          |
|      110045       | Wallet balance is insufficient.                                                                                                                                                            |
|      110046       | Liquidation will be triggered immediately by this adjustment.                                                                                                                              |
|      110047       | Risk limit cannot be adjusted due to insufficient available margin.                                                                                                                        |
|      110048       | Risk limit cannot be adjusted as the current/expected position value exceeds the revised risk limit.                                                                                       |
|      110049       | Tick notes can only be numbers                                                                                                                                                             |
|      110050       | Invalid coin                                                                                                                                                                               |
|      110051       | The user's available balance cannot cover the lowest price of the current market                                                                                                           |
|      110052       | Your available balance is insufficient to set the price                                                                                                                                    |
|      110053       | The user's available balance cannot cover the current market price and upper limit price                                                                                                   |
|      110054       | This position has at least one take profit link order, so the take profit and stop loss mode cannot be switched                                                                            |
|      110055       | This position has at least one stop loss link order, so the take profit and stop loss mode cannot be switched                                                                              |
|      110056       | This position has at least one trailing stop link order, so the take profit and stop loss mode cannot be switched                                                                          |
|      110057       | Conditional order or limit order contains TP/SL related params                                                                                                                             |
|      110058       | You can't set take profit and stop loss due to insufficient size of remaining position size.                                                                                               |
|      110059       | Not allowed to modify the TP/SL of a partially filled open order                                                                                                                           |
|      110060       | Under full TP/SL mode, it is not allowed to modify TP/SL                                                                                                                                   |
|      110061       | Not allowed to have more than 20 TP/SLs under Partial tpSlMode                                                                                                                             |
|      110062       | There is no MMP information of the institution found.                                                                                                                                      |
|      110063       | Settlement in progress! {{key0}} not available for trading.                                                                                                                                |
|      110064       | The modified contract quantity cannot be less than or equal to the filled quantity.                                                                                                        |
|      110065       | MMP hasn't yet been enabled for your account. Please contact your BD manager.                                                                                                              |
|      110066       | Trading is currently not allowed.                                                                                                                                                          |
|      110067       | Unified account is not supported.                                                                                                                                                          |
|      110068       | Leveraged trading is not allowed.                                                                                                                                                          |
|      110069       | Ins lending customer is not allowed to trade.                                                                                                                                              |
|      110070       | ETP symbols cannot be traded.                                                                                                                                                              |
|      110071       | Sorry, we're revamping the Unified Margin Account! Currently, new upgrades are not supported. If you have any questions, please contact our 24/7 customer support.                         |
|      110072       | OrderLinkedID is duplicate                                                                                                                                                                 |
|      110073       | Set margin mode failed                                                                                                                                                                     |
|      110074       | This contract is not live                                                                                                                                                                  |
| <del>110075</del> | <del>RiskId not modified</del>                                                                                                                                                             |
|      110076       | Only isolated mode can set auto-add-margin                                                                                                                                                 |
|      110077       | Pm mode cannot support                                                                                                                                                                     |
|      110078       | Added margin more than max can reduce margin                                                                                                                                               |
|      110079       | The order is processing and can not be operated, please try again later                                                                                                                    |
|      110080       | Operations Restriction: The current LTV ratio of your Institutional Lending has hit the liquidation threshold. Assets in your account are being liquidated (trade/risk limit/leverage)     |
|      110082       | You cannot lift Reduce-Only restrictions, as no Reduce-Only restrictions are applied to your position                                                                                      |
|      110083       | Reduce-Only restrictions must be lifted for both Long and Short positions at the same time                                                                                                 |
|      110085       | The risk limit and margin ratio for this contract has been updated, please select a supported risk limit and place your order again                                                        |
|      110086       | Current order leverage exceeds the maximum available for your current Risk Limit tier. Please lower leverage before placing an order                                                       |
|      110087       | Leverage for Perpetual or Futures contracts cannot exceed the maximum allowed for your Institutional loan                                                                                  |
|      110088       | Please Upgrade to UTA to trade                                                                                                                                                             |
|      110089       | Exceeds the maximum risk limit level                                                                                                                                                       |
|      110090       | Order placement failed as your position may exceed the max limit. Please adjust your leverage to {{leverage}} or below to increase the max. position limit                                 |
|      110092       | expect Rising, but trigger_price[XXXXX] &lt;= current[XXXXX]??laste                                                                                                                        |
|      110093       | expect Falling, but trigger_price[XXXXX] &gt;= current[XXXXX]??last                                                                                                                        |
|      110094       | Order notional value below the lower limit                                                                                                                                                 |
|      110095       | You cannot create, modify or cancel Pre-Market Perpetual orders during the Call Auction.                                                                                                   |
|      110096       | Pre-Market Perpetual Trading does not support Portfolio Margin mode.                                                                                                                       |
|      110097       | Non-UTA users cannot access Pre-Market Perpetual Trading. To place, modify or cancel Pre-Market Perpetual orders, please upgrade your Standard Account to UTA.                             |
|      110098       | Only Good-Till-Canceled (GTC) orders are supported during Call Auction.                                                                                                                    |
|      110099       | You cannot create TP/SL orders during the Call Auction for Pre-Market Perpetuals.                                                                                                          |
|      110100       | You cannot place, modify, or cancel Pre-Market Perpetual orders when you are in Demo Trading.                                                                                              |
|      110101       | Trading inverse contracts under Cross and Portfolio modes requires enabling the settlement asset as collateral.                                                                            |
|      110102       | The user does not support trading Inverse contracts - copy trading pro, Ins loan account are not supported                                                                                 |
|      110103       | Only Post-Only orders are available at this stage                                                                                                                                          |
|      110104       | The LTV for ins Loan has exceeded the limit, and opening inverse contracts is prohibited                                                                                                   |
|      110105       | The LTV for ins Loan has exceeded the limit, and trading inverse contracts is prohibited                                                                                                   |
|      110106       | Restrictions on Ins Loan; inverse contracts are not on the whitelist and are not allowed for trading                                                                                       |
|      110107       | Restrictions on ins Loan; leverage exceeding the limit for inverse contracts is not allowed.                                                                                               |
|      110108       | Allowable range: 5 to 2000 tick size                                                                                                                                                       |
|      110109       | Allowable range: 0.05% to 1%                                                                                                                                                               |
|      110110       | Spread trading is not available in isolated margin trading mode                                                                                                                            |
|      110111       | To access spread trading, upgrade to the latest version of UTA                                                                                                                             |
|      110112       | Spread trading is not available for Copy Trading                                                                                                                                           |
|      110113       | Spread trading is not available in hedge mode                                                                                                                                              |
|      110114       | You have a Spread trading order in progress. Please try again later                                                                                                                        |
|      110115       | The cancellation of a combo single-leg order can only be done by canceling the combo order                                                                                                 |
|      110116       | The entry price of a single leg, derived from the combo order price, exceeds the limit price                                                                                               |
|      110117       | The modification of a combo single-leg order can only be done by modifying the combo order                                                                                                 |
|      110118       | Unable to retrieve a pruce of the market order due to low liquidity                                                                                                                        |
|      110119       | Order failed. RPI orders are restricted to approved market makers only                                                                                                                     |
|      170346       | Settle coin is not a collateral coin, cannot trade                                                                                                                                         |
|      170360       | symbol[XXXX] cannot trade. Used for spread trading in particular when collateral is not turned on                                                                                          |
|      181017       | OrderStatus must be final status                                                                                                                                                           |
|      182100       | Compulsory closing of positions, no repayment allowed                                                                                                                                      |
|      182101       | Failed repayment, insufficient collateral balance                                                                                                                                          |
|      182102       | Failed repayment, there are no liabilities in the current currency                                                                                                                         |
|      182103       | Institutional lending users are not supported                                                                                                                                              |
|      182108       | Switching failed, margin verification failed, please re-adjust the currency status                                                                                                         |
|      182110       | Failed to switch                                                                                                                                                                           |
|      182111       | The requested currency has a non guaranteed gold currency or does not support switching status currencies                                                                                  |
|      182112       | Duplicate currency, please re-adjust                                                                                                                                                       |
|      3100181      | UID can not be null                                                                                                                                                                        |
|      3100197      | Temporary banned due to the upgrade to UTA                                                                                                                                                 |
|      3200316      | USDC Options Trading Restriction: The current LTV ratio for your Institutional Lending has reached the maximum allowable amount for USDC Options trading.                                  |
|      3200317      | USDC Options Open Position Restriction: The current LTV ratio for your Institutional Lending has reached the maximum allowable amount for opening USDC Options positions.                  |
|      3100326      | BaseCoin is required                                                                                                                                                                       |
|      3200403      | isolated margin can not create order                                                                                                                                                       |
|      3200419      | Unable to switch to Portfolio margin due to active pre-market Perpetual orders and positions                                                                                               |
|      3200320      | Operations Restriction: The current LTV ratio of your Institutional Lending has hit the liquidation threshold. Assets in your account are being liquidated. (margin mode or spot leverage) |
|      3400208      | You have unclosed hedge mode or isolated mode USDT perpetual positions                                                                                                                     |
|      3400209      | You have USDT perpetual positions, so upgrading is prohibited for 10 minutes before and after the hour every hour                                                                          |
|      3400210      | The risk rate of your Derivatives account is too high                                                                                                                                      |
|      3400211      | Once upgraded, the estimated risk rate will be too high                                                                                                                                    |
|      3400212      | You have USDC perpetual positions or Options positions, so upgrading is prohibited for 10 minutes before and after the hour every hour                                                     |
|      3400213      | The risk rate of your USDC Derivatives account is too high                                                                                                                                 |
|      3400052      | You have uncancelled USDC perpetual orders                                                                                                                                                 |
|      3400053      | You have uncancelled Options orders                                                                                                                                                        |
|      3400054      | You have uncancelled USDT perpetual orders                                                                                                                                                 |
|      3400214      | Server error, please try again later                                                                                                                                                       |
|      3400071      | The net asset is not satisfied                                                                                                                                                             |
|      3401010      | Cannot switch to PM mode (for copy trading master trader)                                                                                                                                  |
|      3400139      | The total value of your positions and orders has exceeded the risk limit for a Perpetual or Futures contract                                                                               |
|      500010       | The sub-account specified does not belong to the parent account                                                                                                                            |
|      500011       | The Uid 592334 provided is not associated with a Unified Trading Account                                                                                                                   |

## Spot Trade[​](#spot-trade "Direct link to heading")

|  Code  | Description                                                                                                                                                                                               |
| :----: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 170001 | Internal error.                                                                                                                                                                                           |
| 170005 | Too many new orders; current limit is %s orders per %s.                                                                                                                                                   |
| 170007 | Timeout waiting for response from backend server.                                                                                                                                                         |
| 170010 | Purchase failed: Exceed the maximum position limit of leveraged tokens, the current available limit is %s USDT                                                                                            |
| 170011 | "Purchase failed: Exceed the maximum position limit of innovation tokens,                                                                                                                                 |
| 170019 | the current available limit is ''{{.replaceKey0}}'' USDT"                                                                                                                                                 |
| 170031 | The feature has been suspended                                                                                                                                                                            |
| 170032 | Network error. Please try again later                                                                                                                                                                     |
| 170033 | margin Insufficient account balance                                                                                                                                                                       |
| 170034 | Liability over flow in spot leverage trade!                                                                                                                                                               |
| 170035 | Submitted to the system for processing!                                                                                                                                                                   |
| 170036 | You haven't enabled Cross Margin Trading yet. To do so, please head to the PC trading site or the Bybit app                                                                                               |
| 170037 | Cross Margin Trading not yet supported by the selected coin                                                                                                                                               |
| 170105 | Parameter '%s' was empty.                                                                                                                                                                                 |
| 170115 | Invalid timeInForce.                                                                                                                                                                                      |
| 170116 | Invalid orderType.                                                                                                                                                                                        |
| 170117 | Invalid side.                                                                                                                                                                                             |
| 170121 | Invalid symbol.                                                                                                                                                                                           |
| 170124 | Order amount too large.                                                                                                                                                                                   |
| 170130 | Data sent for paramter '%s' is not valid.                                                                                                                                                                 |
| 170131 | Balance insufficient                                                                                                                                                                                      |
| 170132 | Order price too high.                                                                                                                                                                                     |
| 170133 | Order price lower than the minimum.                                                                                                                                                                       |
| 170134 | Order price decimal too long.                                                                                                                                                                             |
| 170135 | Order quantity too large.                                                                                                                                                                                 |
| 170136 | Order quantity lower than the minimum.                                                                                                                                                                    |
| 170137 | Order volume decimal too long                                                                                                                                                                             |
| 170139 | Order has been filled.                                                                                                                                                                                    |
| 170140 | Order value exceeded lower limit                                                                                                                                                                          |
| 170141 | Duplicate clientOrderId                                                                                                                                                                                   |
| 170142 | Order has been canceled                                                                                                                                                                                   |
| 170143 | Cannot be found on order book                                                                                                                                                                             |
| 170144 | Order has been locked                                                                                                                                                                                     |
| 170145 | This order type does not support cancellation                                                                                                                                                             |
| 170146 | Order creation timeout                                                                                                                                                                                    |
| 170147 | Order cancellation timeout                                                                                                                                                                                |
| 170148 | Market order amount decimal too long                                                                                                                                                                      |
| 170149 | Create order failed                                                                                                                                                                                       |
| 170150 | Cancel order failed                                                                                                                                                                                       |
| 170151 | The trading pair is not open yet                                                                                                                                                                          |
| 170157 | The trading pair is not available for api trading                                                                                                                                                         |
| 170159 | Market Order is not supported within the first %s minutes of newly launched pairs due to risk control.                                                                                                    |
| 170190 | Cancel order has been finished                                                                                                                                                                            |
| 170191 | Can not cancel order, please try again later                                                                                                                                                              |
| 170192 | Order price cannot be higher than %s .                                                                                                                                                                    |
| 170193 | Buy order price cannot be higher than %s.                                                                                                                                                                 |
| 170194 | Sell order price cannot be lower than %s.                                                                                                                                                                 |
| 170195 | Please note that your order may not be filled. ETP buy order price deviates from risk control                                                                                                             |
| 170196 | Please note that your order may not be filled. ETP sell order price deviates from risk control                                                                                                            |
| 170197 | Your order quantity to buy is too large. The filled price may deviate significantly from the market price. Please try again                                                                               |
| 170198 | Your order quantity to sell is too large. The filled price may deviate significantly from the market price. Please try again                                                                              |
| 170199 | Your order quantity to buy is too large. The filled price may deviate significantly from the nav. Please try again.                                                                                       |
| 170200 | Your order quantity to sell is too large. The filled price may deviate significantly from the nav. Please try again.                                                                                      |
| 170201 | Invalid orderFilter parameter                                                                                                                                                                             |
| 170202 | Please enter the TP/SL price.                                                                                                                                                                             |
| 170203 | trigger price cannot be higher than 110% price.                                                                                                                                                           |
| 170204 | trigger price cannot be lower than 90% of qty.                                                                                                                                                            |
| 170206 | Stop_limit Order is not supported within the first 5 minutes of newly launched pairs                                                                                                                      |
| 170207 | The loan amount of the platform is not enough.                                                                                                                                                            |
| 170210 | New order rejected.                                                                                                                                                                                       |
| 170212 | Cancel order request processing                                                                                                                                                                           |
| 170213 | Order does not exist.                                                                                                                                                                                     |
| 170215 | Spot Trading (Buy) Restriction: The current LTV ratio of your institutional lending has reached the maximum allowable amount for buy orders                                                               |
| 170216 | The leverage you select for Spot Trading cannot exceed the maximum leverage allowed by Institutional Lending                                                                                              |
| 170217 | Only LIMIT-MAKER order is supported for the current pair.                                                                                                                                                 |
| 170218 | The LIMIT-MAKER order is rejected due to invalid price.                                                                                                                                                   |
| 170219 | UID {{xxx}} is not available to this feature                                                                                                                                                              |
| 170220 | Spot Trading Restriction: The current LTV ratio of your institutional lending has reached the maximum allowable amount for Spot trading                                                                   |
| 170221 | This coin does not exist.                                                                                                                                                                                 |
| 170222 | Too many requests in this time frame.                                                                                                                                                                     |
| 170223 | Your Spot Account with Institutional Lending triggers an alert or liquidation.                                                                                                                            |
| 170224 | You're not a user of the Innovation Zone.                                                                                                                                                                 |
| 170226 | Your Spot Account for Margin Trading is being liquidated.                                                                                                                                                 |
| 170227 | This feature is not supported.                                                                                                                                                                            |
| 170228 | The purchase amount of each order exceeds the estimated maximum purchase amount.                                                                                                                          |
| 170229 | The sell quantity per order exceeds the estimated maximum sell quantity.                                                                                                                                  |
| 170230 | Operations Restriction: Due to the deactivation of Margin Trading for institutional loan                                                                                                                  |
| 170234 | System Error                                                                                                                                                                                              |
| 170241 | To proceed with trading, users must read through and confirm that they fully understand the project's risk disclosure document. For App users, please update your Bybit App to version 4.16.0 to process. |
| 170310 | Order modification timeout                                                                                                                                                                                |
| 170311 | Order modification failed                                                                                                                                                                                 |
| 170312 | The current order does not support modification                                                                                                                                                           |
| 170313 | The modified contract quantity cannot be less than to the filled quantity                                                                                                                                 |
| 170341 | Request order quantity exceeds maximum limit                                                                                                                                                              |
| 170344 | Symbol is not supported on Margin Trading                                                                                                                                                                 |
| 170348 | Please go to (<a href="https://www.bybit-tr.com" target="_blank" rel="noopener noreferrer">https://www.bybit-tr.com</a>) to proceed.                                                                      |
| 170355 | RPI orders are restricted to approved market makers only                                                                                                                                                  |
| 170358 | The current site does not support ETP                                                                                                                                                                     |
| 170359 | TThe current site does not support leveraged trading                                                                                                                                                      |
| 170709 | OTC loan: The select trading pair is not in the whitelist pair                                                                                                                                            |
| 170810 | Cannot exceed maximum of 500 conditional, TP/SL and active orders.                                                                                                                                        |

## Spot Leverage Token[​](#spot-leverage-token "Direct link to heading")

|  Code  | Description                                                                                                            |
| :----: | :--------------------------------------------------------------------------------------------------------------------- |
| 175000 | The serialNum is already in use.                                                                                       |
| 175001 | Daily purchase limit has been exceeded. Please try again later.                                                        |
| 175002 | There's a large number of purchase orders. Please try again later.                                                     |
| 175003 | Insufficient available balance. Please make a deposit and try again.                                                   |
| 175004 | Daily redemption limit has been exceeded. Please try again later.                                                      |
| 175005 | There's a large number of redemption orders. Please try again later.                                                   |
| 175006 | Insufficient available balance. Please make a deposit and try again.                                                   |
| 175007 | Order not found.                                                                                                       |
| 175008 | Purchase period hasn't started yet.                                                                                    |
| 175009 | Purchase amount has exceeded the upper limit.                                                                          |
| 175010 | You haven't passed the quiz yet! To purchase and/or redeem an LT, please complete the quiz first.                      |
| 175012 | Redemption period hasn't started yet.                                                                                  |
| 175013 | Redemption amount has exceeded the upper limit.                                                                        |
| 175014 | Purchase of the LT has been temporarily suspended.                                                                     |
| 175015 | Redemption of the LT has been temporarily suspended.                                                                   |
| 175016 | Invalid format. Please check the length and numeric precision.                                                         |
| 175017 | Failed to place order：Exceed the maximum position limit of leveraged tokens, the current available limit is XXXX USDT |
| 175027 | Subscriptions and redemptions are temporarily unavailable while account upgrade is in progress                         |

## Spot Margin Trade[​](#spot-margin-trade "Direct link to heading")

|  Code  | Description                                                                                                                                     |
| :----: | :---------------------------------------------------------------------------------------------------------------------------------------------- |
| 176002 | Query user account info error. Confirm that if you have completed quiz in GUI                                                                   |
| 176003 | Query user loan history error                                                                                                                   |
| 176004 | Query order history start time exceeds end time                                                                                                 |
| 176005 | Failed to borrow                                                                                                                                |
| 176006 | Repayment Failed                                                                                                                                |
| 176007 | User not found                                                                                                                                  |
| 176008 | You haven't enabled Cross Margin Trading yet. To do so, please head to the PC trading site                                                      |
| 176009 | You haven't enabled Cross Margin Trading yet. Confirm that if you have turned on margin trade                                                   |
| 176010 | Failed to locate the coins to borrow                                                                                                            |
| 176011 | Cross Margin Trading not yet supported by the selected coin                                                                                     |
| 176012 | Pair not available                                                                                                                              |
| 176013 | Cross Margin Trading not yet supported by the selected pair                                                                                     |
| 176014 | Repeated repayment requests                                                                                                                     |
| 176015 | Insufficient available balance                                                                                                                  |
| 176016 | No repayment required                                                                                                                           |
| 176017 | Repayment amount has exceeded the total liability                                                                                               |
| 176018 | Settlement in progress                                                                                                                          |
| 176019 | Liquidation in progress                                                                                                                         |
| 176020 | Failed to locate repayment history                                                                                                              |
| 176021 | Repeated borrowing requests                                                                                                                     |
| 176022 | Coins to borrow not generally available yet                                                                                                     |
| 176023 | Pair to borrow not generally available yet                                                                                                      |
| 176024 | Invalid user status                                                                                                                             |
| 176025 | Amount to borrow cannot be lower than the min. amount to borrow (per transaction)                                                               |
| 176026 | Amount to borrow cannot be larger than the max. amount to borrow (per transaction)                                                              |
| 176027 | Amount to borrow cannot be higher than the max. amount to borrow per user                                                                       |
| 176028 | Amount to borrow has exceeded Bybit's max. amount to borrow                                                                                     |
| 176029 | Amount to borrow has exceeded the user's estimated max. amount to borrow                                                                        |
| 176030 | Query user loan info error                                                                                                                      |
| 176031 | Number of decimals for borrow amount has exceeded the maximum precision                                                                         |
| 176034 | The leverage ratio is out of range                                                                                                              |
| 176035 | Failed to close the leverage switch during liquidation                                                                                          |
| 176036 | Failed to adjust leverage switch during forced liquidation                                                                                      |
| 176037 | For non-unified transaction users, the operation failed                                                                                         |
| 176038 | The spot leverage is closed and the current operation is not allowed                                                                            |
| 176039 | Borrowing, current operation is not allowed                                                                                                     |
| 176040 | There is a spot leverage order, and the adjustment of the leverage switch failed!                                                               |
| 176132 | Number of decimals for repay amount has exceeded the maximum precision                                                                          |
| 176133 | Liquidation may be triggered! Please adjust your transaction amount and try again                                                               |
| 176134 | Account has been upgraded (upgrading) to UTA                                                                                                    |
| 176135 | Failed to get bond data                                                                                                                         |
| 176136 | Failed to get borrow data                                                                                                                       |
| 176137 | Failed to switch user status                                                                                                                    |
| 176138 | You need to repay all your debts before closing your disabling cross margin account                                                             |
| 176139 | Sorry, you are not eligible to enable cross margin, as you have already enabled OTC lending                                                     |
| 176201 | Account exception. Check if the UID is bound to an institutional loan                                                                           |
| 182021 | Cannot enable spot margin while in isolated margin mode. Please switch to cross margin mode or portfolio margin mode to trade spot with margin. |
| 182104 | This action could not be completed as your Unified Margin Account's IM/MM utilization rate has exceeded the threshold                           |
| 182105 | Adjustment failed, user is upgrading                                                                                                            |
| 182106 | Adjustment failed, user forced liquidation in progress.                                                                                         |
| 182107 | Adjustment failed, Maintenance Margin Rate too high                                                                                             |

## Asset[​](#asset "Direct link to heading")

|       Code        | Description                                                                                                                                              |
| :---------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------- |
|      131001       | openapi svc error                                                                                                                                        |
|      131002       | Parameter error                                                                                                                                          |
|      131002       | Withdraw address chain or destination tag are not equal                                                                                                  |
|      131003       | Internal error                                                                                                                                           |
|      131004       | KYC needed                                                                                                                                               |
|      131066       | This address does not support withdrawals for the time being. Please switch to another address for withdrawing                                           |
|      131067       | Travel rule verification failed, please contact the target exchange. Travel rule for KR user                                                             |
|      131068       | Travel rule information is insufficient, please provide additional details. Travel rule for KR user                                                      |
|      131069       | Unable to withdraw to the receipt, please contact the target the exchange. Travel rule for KR user                                                       |
|      131070       | The recipient's name is mismatched with the targeted exchange. Travel rule for KR user                                                                   |
|      131071       | The recipient has not undergone KYC verification. Travel rule for KR user                                                                                |
|      131072       | Your withdrawal currency is not supported by the target exchange. Travel rule for KR user                                                                |
|      131073       | Your withdrawal address has not been included in the target exchange. Travel rule for KR user                                                            |
|      131074       | Beneficiary info is required, please refer to the latest api document. Travel rule for KR user                                                           |
|      131075       | InternalAddressCannotBeYourself                                                                                                                          |
|      131076       | internal transfer not support sub-accounts                                                                                                               |
|      131077       | receive user not exist                                                                                                                                   |
|      131078       | receive user deposit has been banned                                                                                                                     |
|      131079       | receive user need kyc                                                                                                                                    |
|      131080       | User left retry times is zero                                                                                                                            |
|      131081       | Do not input memo/tag,please.                                                                                                                            |
|      131082       | Do not repeat the request                                                                                                                                |
|      131083       | Withdraw only allowed from address book                                                                                                                  |
|      131084       | Withdraw failed because of Uta Upgrading                                                                                                                 |
|      131085       | Withdrawal amount is greater than your availale balance (the deplayed withdrawal is triggered)                                                           |
|      131086       | Withdrawal amount exceeds risk limit (the risk limit of margin trade is triggered)                                                                       |
|      131087       | your current account spot risk level is too high, withdrawal is prohibited, please adjust and try again                                                  |
|      131088       | The withdrawal amount exceeds the remaining withdrawal limit of your identity verification level. The current available amount for withdrawal : %s       |
|      131089       | User sensitive operation, withdrawal is prohibited within 24 hours                                                                                       |
|      131090       | User withdraw has been banned                                                                                                                            |
|      131091       | Blocked login status does not allow withdrawals                                                                                                          |
|      131092       | User status is abnormal                                                                                                                                  |
|      131093       | The withdrawal address is not in the whitelist                                                                                                           |
|      131094       | UserId is not in the whitelist                                                                                                                           |
|      131095       | Withdrawl amount exceeds the 24 hour platform limit                                                                                                      |
|      131096       | Withdraw amount does not satify the lower limit or upper limit                                                                                           |
|      131097       | Withdrawal of this currency has been closed                                                                                                              |
|      131098       | Withdrawal currently is not availble from new address                                                                                                    |
|      131099       | Hot wallet status can cancel the withdraw                                                                                                                |
|      131200       | Service error                                                                                                                                            |
|      131201       | Internal error                                                                                                                                           |
|      131202       | Invalid memberId                                                                                                                                         |
|      131203       | Request parameter error                                                                                                                                  |
|      131204       | Account info error                                                                                                                                       |
|      131205       | Query transfer error                                                                                                                                     |
|      131206       | cannot be transfer                                                                                                                                       |
|      131207       | Account not exist                                                                                                                                        |
|      131208       | Forbid transfer                                                                                                                                          |
|      131209       | Get subMember relation error                                                                                                                             |
|      131210       | Amount accuracy error                                                                                                                                    |
|      131211       | fromAccountType can't be the same as toAccountType                                                                                                       |
|      131212       | Insufficient balance                                                                                                                                     |
|      131213       | TransferLTV check error                                                                                                                                  |
|      131214       | TransferId exist                                                                                                                                         |
|      131215       | Amount error                                                                                                                                             |
|      131216       | Query balance error                                                                                                                                      |
|      131217       | Risk check error                                                                                                                                         |
|      131227       | Sub-account do not have universal transfer permission                                                                                                    |
|      131228       | your balance is not enough. Please check transfer safe amount                                                                                            |
|      131229       | Due to compliance requirements, the current currency is not allowed to transfer                                                                          |
|      131230       | The system is busy, please try again later                                                                                                               |
|      131231       | Transfers into this account are not supported                                                                                                            |
|      131232       | Transfers out this account are not supported                                                                                                             |
|      131233       | can not transfer the coin that not supported for islamic account                                                                                         |
|      140001       | Switching the PM spot hedging switch is not allowed in non PM mode                                                                                       |
| <del>140002</del> | <del>Institutional lending users do not support PM spot hedging</del>                                                                                    |
|      140003       | You have position(s) being liquidated, please try again later.                                                                                           |
|      140004       | Operations Restriction: The current LTV ratio of your Institutional Loan has hit the liquidation threshold. Assets in your account are being liquidated. |
|      140005       | Risk level after switching modes exceeds threshold                                                                                                       |
|      141004       | sub member is not normal                                                                                                                                 |
|      141025       | This sub-account has assets and cannot be deleted                                                                                                        |
|      181000       | category is null                                                                                                                                         |
|      181001       | category only support linear or option or spot.                                                                                                          |
|      181002       | symbol is null.                                                                                                                                          |
|      181003       | side is null.                                                                                                                                            |
|      181004       | side only support Buy or Sell.                                                                                                                           |
|      181005       | orderStatus is wrong                                                                                                                                     |
|      181006       | startTime is not number                                                                                                                                  |
|      181007       | endTime is not number                                                                                                                                    |
|      181008       | Parameter startTime and endTime are both needed                                                                                                          |
|      181009       | Parameter startTime needs to be smaller than endTime                                                                                                     |
|      181010       | The time range between startTime and endTime cannot exceed 7 days                                                                                        |
|      181011       | limit is not a number                                                                                                                                    |
|      181012       | symbol not exist                                                                                                                                         |
|      181013       | Only support settleCoin: usdc                                                                                                                            |
|      181014       | Classic account is not supported                                                                                                                         |
|      181018       | Invalid expDate.                                                                                                                                         |
|      181019       | Parameter expDate can't be earlier than 2 years                                                                                                          |
|      182000       | symbol related quote price is null                                                                                                                       |
|      182200       | Please upgrade UTA first.                                                                                                                                |
|      182201       | You must enter 2 time parameters.                                                                                                                        |
|      182202       | The start time must be less than the end time                                                                                                            |
|      182203       | Please enter valid characters                                                                                                                            |
|      182204       | Coin does not exist                                                                                                                                      |
|      182205       | User level does not exist                                                                                                                                |
|      700000       | accountType/quoteTxId cannot be null                                                                                                                     |
|      700001       | quote fail:no dealer can used                                                                                                                            |
|      700004       | order does not exist                                                                                                                                     |
|      700007       | Large Amount Limit                                                                                                                                       |
|      700012       | UTA upgrading, don't allow to apply for quote                                                                                                            |

## Crypto Loan[​](#crypto-loan "Direct link to heading")

|  Code  | Description                                                                                                 |
| :----: | :---------------------------------------------------------------------------------------------------------- |
| 177002 | Server is busy, please wait and try again                                                                   |
| 177003 | Illegal characters found in a parameter                                                                     |
| 177004 | Precision is over the maximum defined for this asset                                                        |
| 177005 | Order does not exist                                                                                        |
| 177006 | We don't have this asset                                                                                    |
| 177007 | Your borrow amount has exceed maximum borrow amount                                                         |
| 177008 | Borrow is banned for this asset                                                                             |
| 177009 | Borrow amount is less than minimum borrow amount                                                            |
| 177010 | Repay amount exceeds borrow amount                                                                          |
| 177011 | Balance is not enough                                                                                       |
| 177012 | The system doesn't have enough asset now                                                                    |
| 177013 | adjustment amount exceeds minimum collateral amount                                                         |
| 177014 | Individual loan quota reached                                                                               |
| 177015 | Collateral amount has reached the limit. Please reduce your collateral amount or try with other collaterals |
| 177016 | Minimum collateral amount is not enough                                                                     |
| 177017 | This coin cannot be used as collateral                                                                      |
| 177018 | duplicate request                                                                                           |
| 177019 | Your input param is invalid                                                                                 |
| 177020 | The account does not support the asset                                                                      |
| 177021 | Repayment failed                                                                                            |

## Institutional Loan[​](#institutional-loan "Direct link to heading")

|  Code   | Description                                                                |
| :-----: | :------------------------------------------------------------------------- |
| 3777002 | UID cannot be bound repeatedly.                                            |
| 3777003 | UID cannot be unbound because the UID has not been bound to a risk unit.   |
| 3777004 | The main UID of the risk unit cannot be unbound.                           |
| 3777005 | You have unsettled lending or borrowing orders. Please try again later.    |
| 3777006 | UID cannot be bound, please try again with a different UID."               |
| 3777007 | UID cannot be bound, please upgrade to UTA Pro."                           |
| 3777012 | Your request is currently being processed. Please wait and try again later |
| 3777027 | UID cannot be bound, leveraged trading closure failed.                     |
| 3777029 | You currently have orders for pre-market trading that can’t be bind UIDs   |
| 3777030 | This account has activated copyPro and cannot bind uid                     |

## Exchange Broker[​](#exchange-broker "Direct link to heading")

|        Code        | Description                                                    |
| :----------------: | :------------------------------------------------------------- |
|      3500402       | Parameter verification failed for 'limit'.                     |
|      3500403       | Only available to exchange broker main-account                 |
|      3500404       | Invalid Cursor                                                 |
| <del>3500405</del> | Parameter "startTime" and "endTime" need to be input in pairs. |
|      3500406       | Out of query time range.                                       |
|      3500407       | Parameter begin and end need to be input in pairs.             |

### Reward[​](#reward "Direct link to heading")

|  Code  | Description                                                                        |
| :----: | :--------------------------------------------------------------------------------- |
| 400001 | invalid parameter                                                                  |
| 400101 | The voucher was recycled                                                           |
| 400102 | The voucher has exceeded the redemption date (expired)                             |
| 400103 | The voucher is not available for redemption                                        |
| 400105 | Budget exceeded                                                                    |
| 403001 | Account rejected, check if the input accountId valid, account banned, or kyc issue |
| 404001 | resource not found                                                                 |
| 404011 | Insufficient inventory                                                             |
| 409011 | VIP level limit                                                                    |
| 500001 | Internal server error                                                              |

## Earn[​](#earn "Direct link to heading")

|  Code  | Description                                                    |
| :----: | :------------------------------------------------------------- |
| 180001 | Invalid parameter                                              |
| 180002 | Invalid coin                                                   |
| 180003 | User banned                                                    |
| 180004 | Site not allowed. Only users from Bybit global site can access |
| 180005 | Compliance wallet not reach                                    |
| 180006 | Validation failed                                              |
| 180007 | Product not available                                          |
| 180008 | Invalid Product                                                |
| 180009 | product is forbidden                                           |
| 180010 | User not allowed                                               |
| 180011 | User not VIP                                                   |
| 180012 | Purchase share is invalid                                      |
| 180013 | Stake over maximum share                                       |
| 180014 | Redeem share invlaid                                           |
| 180015 | Products share not enough                                      |
| 180016 | Balance not enough                                             |
| 180017 | Invalid risk user                                              |
| 180018 | internal error                                                 |
| 180019 | empty order link id                                            |

# Connect

**[WebSocket public stream](/docs/v5/websocket/public/orderbook):**

- **Mainnet:**  
  Spot: `wss://stream.bybit.com/v5/public/spot`  
  USDT, USDC perpetual & USDT Futures:
  `wss://stream.bybit.com/v5/public/linear`  
  Inverse contract: `wss://stream.bybit.com/v5/public/inverse`  
  USDT Option: `wss://stream.bybit.com/v5/public/option`  
  Spread trading: `wss://stream.bybit.com/v5/public/spread`
- **Testnet:**  
  Spot: `wss://stream-testnet.bybit.com/v5/public/spot`  
  USDT,USDC perpetual & USDT Futures:
  `wss://stream-testnet.bybit.com/v5/public/linear`  
  Inverse contract: `wss://stream-testnet.bybit.com/v5/public/inverse`  
  USDT Option: `wss://stream-testnet.bybit.com/v5/public/option`  
  Spread trading: `wss://stream-testnet.bybit.com/v5/public/spread`

**[WebSocket private stream](/docs/v5/websocket/private/order):**

- **Mainnet:**  
  `wss://stream.bybit.com/v5/private`
- **Testnet:**  
  `wss://stream-testnet.bybit.com/v5/private`

**[WebSocket Order Entry](/docs/v5/websocket/trade/guideline):**

- **Mainnet:**  
  `wss://stream.bybit.com/v5/trade` (Spread trading is not supported)
- **Testnet:**  
  `wss://stream-testnet.bybit.com/v5/trade` (Spread trading is not supported)

info

- If your account is registered from
  [www.bybit-tr.com](http://www.bybit-tr.com), please use `stream.bybit-tr.com`
  for mainnet access
- If your account is registered from [www.bybit.kz](http://www.bybit.kz), please
  use `stream.bybit.kz` for mainnet access

Customise Private Connection Alive Time

For private stream and order entry, you can customise alive duration by adding a
param `max_active_time`, the lowest value is `30s` (30 seconds), the highest
value is `600s` (10 minutes). You can also pass `1m`, `2m` etc when you try to
configure by minute level. e.g.,
_wss://stream-testnet.bybit.com/v5/private?max_active_time=1m_.

In general, if there is no "ping-pong" and no stream data sent from server end,
the connection will be cut off after 10 minutes. When you have a particular
need, you can configure connection alive time by `max_active_time`.

Since ticker scans every 30s, so it is not fully exact, i.e., if you configure
45s, and your last update or ping-pong is occurred on `2023-08-15 17:27:23`,
your disconnection time maybe happened on `2023-08-15 17:28:15`

## Authentication[​](#authentication "Direct link to heading")

info

**Public** topics do not require authentication. The following section applies
to **private** topics only.

Apply for authentication when establishing a connection.

Note: if you're using [pybit](https://github.com/bybit-exchange/pybit),
[bybit-api](https://www.npmjs.com/package/bybit-api), or another high-level
library, you can ignore this code - as authentication is handled for you.

```
{    "req_id": "10001", // optional    "op": "auth",    "args": [        "api_key",        1662350400000, // expires; is greater than your current timestamp        "signature"    ]}
```

```
# based on: https://github.com/bybit-exchange/pybit/blob/master/pybit/_http_manager.pyimport hmacimport jsonimport timeimport websocketapi_key = ""api_secret = ""# Generate expires.expires = int((time.time() + 1) * 1000)# Generate signature.signature = str(hmac.new(    bytes(api_secret, "utf-8"),    bytes(f"GET/realtime{expires}", "utf-8"), digestmod="sha256").hexdigest())ws = websocket.WebSocketApp(    url=url,    ...)# Authenticate with API.ws.send(    json.dumps({        "op": "auth",        "args": [api_key, expires, signature]    }))
```

> Successful authentication sample response

```
{    "success": true,    "ret_msg": "",    "op": "auth",    "conn_id": "cejreaspqfh3sjdnldmg-p"}
```

note

Example signature algorithms can be found
[here](https://github.com/bybit-exchange/api-usage-examples).

caution

Due to network complexity, your may get disconnected at any time. Please follow
the instructions below to ensure that you receive WebSocket messages on time:

1.  Keep connection alive by
    [sending the heartbeat packet](/docs/v5/ws/connect#how-to-send-the-heartbeat-packet)
2.  Reconnect as soon as possible if disconnected

## IP Limits[​](#ip-limits "Direct link to heading")

- Do not frequently connect and disconnect the connection.
- Do not build over 500 connections in 5 minutes. This is counted per WebSocket
  domain.

## Public channel - Args limits[​](#public-channel---args-limits "Direct link to heading")

Regardless of Perpetual, Futures, Options or Spot, for one public connection,
you cannot have length of "args" array over 21,000 characters.

- Spot can input up to 10 args for each subscription request sent to one
  connection
- Options can input up to 2000 args for a single connection
- No args limit for Futures for now

## How to Send the Heartbeat Packet[​](#how-to-send-the-heartbeat-packet "Direct link to heading")

> How to Send

```
// req_id is a customised ID, which is optionalws.send(JSON.stringify({"req_id": "100001", "op": "ping"}));
```

> Pong message example of public channels

- Spot
- Linear/Inverse
- Option/Spread

```
{    "success": true,    "ret_msg": "pong",    "conn_id": "0970e817-426e-429a-a679-ff7f55e0b16a",    "op": "ping"}
```

```
{    "success": true,    "ret_msg": "pong",    "conn_id": "465772b1-7630-4fdc-a492-e003e6f0f260",    "req_id": "",    "op": "ping"}
```

```
{    "args": [        "1672916271846"    ],    "op": "pong"}
```

> Pong message example of private channels

```
{    "req_id": "test",    "op": "pong",    "args": [        "1675418560633"    ],    "conn_id": "cfcb4ocsvfriu23r3er0-1b"}
```

caution

To avoid network or program issues, we recommend that you send the `ping`
heartbeat packet every **20** seconds to maintain the WebSocket connection.

## How to Subscribe to Topics[​](#how-to-subscribe-to-topics "Direct link to heading")

### Understanding WebSocket Filters[​](#understanding-websocket-filters "Direct link to heading")

How to subscribe with a filter

```
// Subscribing level 1 orderbook{    "req_id": "test", // optional    "op": "subscribe",    "args": [        "orderbook.1.BTCUSDT"    ]}
```

Subscribing with multiple symbols and topics is supported.

```
{    "req_id": "test", // optional    "op": "subscribe",    "args": [        "orderbook.1.BTCUSDT",        "publicTrade.BTCUSDT",        "orderbook.1.ETHUSDT"    ]}
```

### Understanding WebSocket Filters: Unsubscription[​](#understanding-websocket-filters-unsubscription "Direct link to heading")

You can dynamically subscribe and unsubscribe from topics without unsubscribing
from the WebSocket like so:

```
{    "op": "unsubscribe",    "args": [        "publicTrade.ETHUSD"    ],    "req_id": "customised_id"}
```

## Understanding the Subscription Response[​](#understanding-the-subscription-response "Direct link to heading")

> Topic subscription response message example

- Private
- Public Spot
- Linear/Inverse
- Option/Spread

```
{    "success": true,    "ret_msg": "",    "op": "subscribe",    "conn_id": "cejreassvfrsfvb9v1a0-2m"}
```

```
{    "success": true,    "ret_msg": "subscribe",    "conn_id": "2324d924-aa4d-45b0-a858-7b8be29ab52b",    "req_id": "10001",    "op": "subscribe"}
```

```
{    "success": true,    "ret_msg": "",    "conn_id": "3cd84cb1-4d06-4a05-930a-2efe5fc70f0f",    "req_id": "",    "op": "subscribe"}
```

```
{    "success": true,    "conn_id": "aa01fbfffe80af37-00000001-000b37b9-7147f432704fd28c-00e1c172",    "data": {    "failTopics": [],    "successTopics": [        "orderbook.100.BTC-6JAN23-18000-C"    ]},    "type": "COMMAND_RESP"}
```

# Orderbook

Subscribe to the orderbook stream. Supports different depths.

info

[Retail Price Improvement (RPI)](https://www.bybit.com/en/help-center/article/Retail-Price-Improvement-RPI-Order)
orders will not be included in the messages.

### Depths[​](#depths "Direct link to heading")

**Linear & inverse:**  
Level 1 data, push frequency: **10ms**  
Level 50 data, push frequency: **20ms**  
Level 200 data, push frequency: **100ms**  
Level 500 data, push frequency: **100ms**

**Spot:**  
Level 1 data, push frequency: **10ms**  
Level 50 data, push frequency: **20ms**  
Level 200 data, push frequency: **200ms**

**Option:**  
Level 25 data, push frequency: **20ms**  
Level 100 data, push frequency: **100ms**

**Topic:**  
`orderbook.{depth}.{symbol}` e.g., orderbook.1.BTCUSDT

### Process snapshot/delta[​](#process-snapshotdelta "Direct link to heading")

To process `snapshot` and `delta` messages, please follow these rules:

Once you have subscribed successfully, you will receive a `snapshot`. The
WebSocket will keep pushing `delta` messages every time the orderbook changes.
If you receive a new `snapshot` message, you will have to reset your local
orderbook. If there is a problem on Bybit's end, a `snapshot` will be re-sent,
which is guaranteed to contain the latest data.

To apply `delta` updates:

- If you receive an amount that is `0`, delete the entry
- If you receive an amount that does not exist, insert it
- If the entry exists, you simply update the value

See working code examples of this logic in the
[FAQ](https://bybit-exchange.github.io/docs/faq#how-can-i-process-websocket-snapshot-and-delta-messages).

info

- Linear, inverse, spot level 1 data: if 3 seconds have elapsed without a change
  in the orderbook, a `snapshot` message will be pushed again, and the field `u`
  will be the same as that in the previous message.
- **Linear, inverse, spot level 1 data has `snapshot` message only**

### Response Parameters[​](#response-parameters "Direct link to heading")

| Parameter     | Type    | Comments                                                                                                                                                                                                                                                                                                                                                       |
| :------------ | :------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| topic         | string  | Topic name                                                                                                                                                                                                                                                                                                                                                     |
| type          | string  | Data type. <code>snapshot</code>,<code>delta</code>                                                                                                                                                                                                                                                                                                            |
| ts            | number  | The timestamp (ms) that the system generates the data                                                                                                                                                                                                                                                                                                          |
| data          | map     | Object                                                                                                                                                                                                                                                                                                                                                         |
| &gt; s        | string  | Symbol name                                                                                                                                                                                                                                                                                                                                                    |
| &gt; b        | array   | Bids. For <code>snapshot</code> stream, the element is sorted by price in descending order                                                                                                                                                                                                                                                                     |
| &gt;&gt; b[0] | string  | Bid price                                                                                                                                                                                                                                                                                                                                                      |
| &gt;&gt; b[1] | string  | Bid size<li>The delta data has size=0, which means that all quotations for this price have been filled or cancelled</li>                                                                                                                                                                                                                                       |
| &gt; a        | array   | Asks. For <code>snapshot</code> stream, the element is sorted by price in ascending order                                                                                                                                                                                                                                                                      |
| &gt;&gt; a[0] | string  | Ask price                                                                                                                                                                                                                                                                                                                                                      |
| &gt;&gt; a[1] | string  | Ask size<li>The delta data has size=0, which means that all quotations for this price have been filled or cancelled</li>                                                                                                                                                                                                                                       |
| &gt; u        | integer | Update ID<li>Occasionally, you'll receive "u"=1, which is a snapshot data due to the restart of the service. So please overwrite your local orderbook</li><li>For level 1 of linear, inverse Perps and Futures, the snapshot data will be pushed again when there is no change in 3 seconds, and the "u" will be the same as that in the previous message</li> |
| &gt; seq      | integer | Cross sequence<li>You can use this field to compare different levels orderbook data, and for the smaller seq, then it means the data is generated earlier.</li>                                                                                                                                                                                                |
| cts           | number  | The timestamp from the match engine when this orderbook data is produced. It can be correlated with <code>T</code> from <a href="/docs/v5/websocket/public/trade">public trade channel</a>                                                                                                                                                                     |

### Subscribe Example[​](#subscribe-example "Direct link to heading")

```
from pybit.unified_trading import WebSocketfrom time import sleepws = WebSocket(    testnet=True,    channel_type="linear",)def handle_message(message):    print(message)ws.orderbook_stream(    depth=50,    symbol="BTCUSDT",    callback=handle_message)while True:    sleep(1)
```

### Response Example[​](#response-example "Direct link to heading")

- Snapshot
- Delta

```
{    "topic": "orderbook.50.BTCUSDT",    "type": "snapshot",    "ts": 1672304484978,    "data": {        "s": "BTCUSDT",        "b": [            ...,            [                "16493.50",                "0.006"            ],            [                "16493.00",                "0.100"            ]        ],        "a": [            [                "16611.00",                "0.029"            ],            [                "16612.00",                "0.213"            ],            ...,        ],    "u": 18521288,    "seq": 7961638724    },    "cts": 1672304484976}
```

```
{    "topic": "orderbook.50.BTCUSDT",    "type": "delta",    "ts": 1687940967466,    "data": {        "s": "BTCUSDT",        "b": [            [                "30247.20",                "30.028"            ],            [                "30245.40",                "0.224"            ],            [                "30242.10",                "1.593"            ],            [                "30240.30",                "1.305"            ],            [                "30240.00",                "0"            ]        ],        "a": [            [                "30248.70",                "0"            ],            [                "30249.30",                "0.892"            ],            [                "30249.50",                "1.778"            ],            [                "30249.60",                "0"            ],            [                "30251.90",                "2.947"            ],            [                "30252.20",                "0.659"            ],            [                "30252.50",                "4.591"            ]        ],        "u": 177400507,        "seq": 66544703342    },    "cts": 1687940967464}
```

# Trade

Subscribe to the recent trades stream.

After subscription, you will be pushed trade messages in real-time.

Push frequency: **real-time**

**Topic:**  
`publicTrade.{symbol}`  
**Note**: option uses baseCoin, e.g., publicTrade.BTC

### Response Parameters[​](#response-parameters "Direct link to heading")

| Parameter                                        | Type    | Comments                                                                     |
| :----------------------------------------------- | :------ | ---------------------------------------------------------------------------- |
| id                                               | string  | Message id. <em>Unique field for option</em>                                 |
| topic                                            | string  | Topic name                                                                   |
| type                                             | string  | Data type. <code>snapshot</code>                                             |
| ts                                               | number  | The timestamp (ms) that the system generates the data                        |
| data                                             | array   | Object. The element in the array is sort by matching time in ascending order |
| &gt; T                                           | number  | The timestamp (ms) that the order is filled                                  |
| &gt; s                                           | string  | Symbol name                                                                  |
| &gt; S                                           | string  | Side of taker. <code>Buy</code>,<code>Sell</code>                            |
| &gt; v                                           | string  | Trade size                                                                   |
| &gt; p                                           | string  | Trade price                                                                  |
| &gt; <a href="/docs/v5/enum#tickdirection">L</a> | string  | Direction of price change. <em>Unique field for Perps &amp; futures</em>     |
| &gt; i                                           | string  | Trade ID                                                                     |
| &gt; BT                                          | boolean | Whether it is a block trade order or not                                     |
| &gt; RPI                                         | boolean | Whether it is a RPI trade or not                                             |
| &gt; mP                                          | string  | Mark price, unique field for <code>option</code>                             |
| &gt; iP                                          | string  | Index price, unique field for <code>option</code>                            |
| &gt; mIv                                         | string  | Mark iv, unique field for <code>option</code>                                |
| &gt; iv                                          | string  | iv, unique field for <code>option</code>                                     |

### Subscribe Example[​](#subscribe-example "Direct link to heading")

```
from pybit.unified_trading import WebSocketfrom time import sleepws = WebSocket(    testnet=True,    channel_type="linear",)def handle_message(message):    print(message)ws.trade_stream(    symbol="BTCUSDT",    callback=handle_message)while True:    sleep(1)
```

### Response Example[​](#response-example "Direct link to heading")

```
{    "topic": "publicTrade.BTCUSDT",    "type": "snapshot",    "ts": 1672304486868,    "data": [        {            "T": 1672304486865,            "s": "BTCUSDT",            "S": "Buy",            "v": "0.001",            "p": "16578.50",            "L": "PlusTick",            "i": "20f43950-d8dd-5b31-9112-a178eb6023af",            "BT": false        }    ]}
```

# Ticker

Subscribe to the ticker stream.

note

- This topic utilises the snapshot field and delta field. If a response param is
  not found in the message, then its value has not changed.
- Spot & Option tickers message are `snapshot` **only**

Push frequency: Derivatives & Options - **100ms**, Spot - **real-time**

**Topic:**  
`tickers.{symbol}`

### Response Parameters[​](#response-parameters "Direct link to heading")

- Linear/Inverse
- Option
- Spot

| Parameter                                                           | Type     | Comments                                                                                                                                                                         |
| ------------------------------------------------------------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| topic                                                               | string   | Topic name                                                                                                                                                                       |
| type                                                                | string   | Data type. <code>snapshot</code>,<code>delta</code>                                                                                                                              |
| cs                                                                  | integer  | Cross sequence                                                                                                                                                                   |
| ts                                                                  | number   | The timestamp (ms) that the system generates the data                                                                                                                            |
| data                                                                | array    | Object                                                                                                                                                                           |
| &gt; symbol                                                         | string   | Symbol name                                                                                                                                                                      |
| &gt; <a href="/docs/v5/enum#tickdirection">tickDirection</a>        | string   | Tick direction                                                                                                                                                                   |
| &gt; price24hPcnt                                                   | string   | Percentage change of market price in the last 24 hours                                                                                                                           |
| &gt; lastPrice                                                      | string   | Last price                                                                                                                                                                       |
| &gt; prevPrice24h                                                   | string   | Market price 24 hours ago                                                                                                                                                        |
| &gt; highPrice24h                                                   | string   | The highest price in the last 24 hours                                                                                                                                           |
| &gt; lowPrice24h                                                    | string   | The lowest price in the last 24 hours                                                                                                                                            |
| &gt; prevPrice1h                                                    | string   | Market price an hour ago                                                                                                                                                         |
| &gt; markPrice                                                      | string   | Mark price                                                                                                                                                                       |
| &gt; indexPrice                                                     | string   | Index price                                                                                                                                                                      |
| &gt; openInterest                                                   | string   | Open interest size                                                                                                                                                               |
| &gt; openInterestValue                                              | string   | Open interest value                                                                                                                                                              |
| &gt; turnover24h                                                    | string   | Turnover for 24h                                                                                                                                                                 |
| &gt; volume24h                                                      | string   | Volume for 24h                                                                                                                                                                   |
| &gt; nextFundingTime                                                | string   | Next funding timestamp (ms)                                                                                                                                                      |
| &gt; fundingRate                                                    | string   | Funding rate                                                                                                                                                                     |
| &gt; bid1Price                                                      | string   | Best bid price                                                                                                                                                                   |
| &gt; bid1Size                                                       | string   | Best bid size                                                                                                                                                                    |
| &gt; ask1Price                                                      | string   | Best ask price                                                                                                                                                                   |
| &gt; ask1Size                                                       | string   | Best ask size                                                                                                                                                                    |
| &gt; deliveryTime                                                   | datetime | Delivery date time (UTC+0), applicable to expired futures only                                                                                                                   |
| &gt; basisRate                                                      | string   | Basis rate. <i>Unique field for inverse futures &amp; USDT/USDC futures</i>                                                                                                      |
| &gt; deliveryFeeRate                                                | string   | Delivery fee rate. <i>Unique field for inverse futures &amp; USDT/USDC futures</i>                                                                                               |
| &gt; predictedDeliveryPrice                                         | string   | Predicated delivery price. <i>Unique field for inverse futures &amp; USDT/USDC futures</i>                                                                                       |
| &gt; preOpenPrice                                                   | string   | Estimated pre-market contract open price<li>The value is meaningless when entering continuous trading phase</li><li>USDC Futures and Inverse Futures do not have this field</li> |
| &gt; preQty                                                         | string   | Estimated pre-market contract open qty<li>The value is meaningless when entering continuous trading phase</li><li>USDC Futures and Inverse Futures do not have this field</li>   |
| &gt; <a href="/docs/v5/enum#curauctionphase">curPreListingPhase</a> | string   | The current pre-market contract phase<li>USDC Futures and Inverse Futures do not have this field</li>                                                                            |

| Parameter                   | Type   | Comments                                                            |
| --------------------------- | ------ | ------------------------------------------------------------------- |
| topic                       | string | Topic name                                                          |
| type                        | string | Data type. <code>snapshot</code>                                    |
| id                          | string | message ID                                                          |
| ts                          | number | The timestamp (ms) that the system generates the data               |
| data                        | array  | Object                                                              |
| &gt; symbol                 | string | Symbol name                                                         |
| &gt; bidPrice               | string | Best bid price                                                      |
| &gt; bidSize                | string | Best bid size                                                       |
| &gt; bidIv                  | string | Best bid iv                                                         |
| &gt; askPrice               | string | Best ask price                                                      |
| &gt; askSize                | string | Best ask size                                                       |
| &gt; askIv                  | string | Best ask iv                                                         |
| &gt; lastPrice              | string | Last price                                                          |
| &gt; highPrice24h           | string | The highest price in the last 24 hours                              |
| &gt; lowPrice24h            | string | The lowest price in the last 24 hours                               |
| &gt; markPrice              | string | Mark price                                                          |
| &gt; indexPrice             | string | Index price                                                         |
| &gt; markPriceIv            | string | Mark price iv                                                       |
| &gt; underlyingPrice        | string | Underlying price                                                    |
| &gt; openInterest           | string | Open interest size                                                  |
| &gt; turnover24h            | string | Turnover for 24h                                                    |
| &gt; volume24h              | string | Volume for 24h                                                      |
| &gt; totalVolume            | string | Total volume                                                        |
| &gt; totalTurnover          | string | Total turnover                                                      |
| &gt; delta                  | string | Delta                                                               |
| &gt; gamma                  | string | Gamma                                                               |
| &gt; vega                   | string | Vega                                                                |
| &gt; theta                  | string | Theta                                                               |
| &gt; predictedDeliveryPrice | string | Predicated delivery price. It has value when 30 min before delivery |
| &gt; change24h              | string | The change in the last 24 hous                                      |

| Parameter          | Type    | Comments                                                                                                                                             |
| ------------------ | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| topic              | string  | Topic name                                                                                                                                           |
| ts                 | number  | The timestamp (ms) that the system generates the data                                                                                                |
| type               | string  | Data type. <code>snapshot</code>                                                                                                                     |
| cs                 | integer | Cross sequence                                                                                                                                       |
| data               | array   | Object                                                                                                                                               |
| &gt; symbol        | string  | Symbol name                                                                                                                                          |
| &gt; lastPrice     | string  | Last price                                                                                                                                           |
| &gt; highPrice24h  | string  | The highest price in the last 24 hours                                                                                                               |
| &gt; lowPrice24h   | string  | The lowest price in the last 24 hours                                                                                                                |
| &gt; prevPrice24h  | string  | Percentage change of market price relative to 24h                                                                                                    |
| &gt; volume24h     | string  | Volume for 24h                                                                                                                                       |
| &gt; turnover24h   | string  | Turnover for 24h                                                                                                                                     |
| &gt; price24hPcnt  | string  | Percentage change of market price relative to 24h                                                                                                    |
| &gt; usdIndexPrice | string  | USD index price<ul class=""><li>used to calculate USD value of the assets in Unified account</li><li>non-collateral margin coin returns ""</li></ul> |

### Subscribe Example[​](#subscribe-example "Direct link to heading")

- Linear
- Option
- Spot

```
from pybit.unified_trading import WebSocketfrom time import sleepws = WebSocket(    testnet=True,    channel_type="linear",)def handle_message(message):    print(message)ws.ticker_stream(    symbol="BTCUSDT",    callback=handle_message)while True:    sleep(1)
```

```
from pybit.unified_trading import WebSocketfrom time import sleepws = WebSocket(    testnet=True,    channel_type="option",)def handle_message(message):    print(message)ws.ticker_stream(    symbol="tickers.BTC-22JAN23-17500-C",    callback=handle_message)while True:    sleep(1)
```

```
from pybit.unified_trading import WebSocketfrom time import sleepws = WebSocket(    testnet=True,    channel_type="spot",)def handle_message(message):    print(message)ws.ticker_stream(    symbol="BTCUSDT",    callback=handle_message)while True:    sleep(1)
```

### Response Example[​](#response-example "Direct link to heading")

- Linear
- Option
- Spot

```
{    "topic": "tickers.BTCUSDT",    "type": "snapshot",    "data": {        "symbol": "BTCUSDT",        "tickDirection": "PlusTick",        "price24hPcnt": "0.017103",        "lastPrice": "17216.00",        "prevPrice24h": "16926.50",        "highPrice24h": "17281.50",        "lowPrice24h": "16915.00",        "prevPrice1h": "17238.00",        "markPrice": "17217.33",        "indexPrice": "17227.36",        "openInterest": "68744.761",        "openInterestValue": "1183601235.91",        "turnover24h": "1570383121.943499",        "volume24h": "91705.276",        "nextFundingTime": "1673280000000",        "fundingRate": "-0.000212",        "bid1Price": "17215.50",        "bid1Size": "84.489",        "ask1Price": "17216.00",        "ask1Size": "83.020"    },    "cs": 24987956059,    "ts": 1673272861686}
```

```
{    "id": "tickers.BTC-6JAN23-17500-C-2480334983-1672917511074",    "topic": "tickers.BTC-6JAN23-17500-C",    "ts": 1672917511074,    "data": {        "symbol": "BTC-6JAN23-17500-C",        "bidPrice": "0",        "bidSize": "0",        "bidIv": "0",        "askPrice": "10",        "askSize": "5.1",        "askIv": "0.514",        "lastPrice": "10",        "highPrice24h": "25",        "lowPrice24h": "5",        "markPrice": "7.86976724",        "indexPrice": "16823.73",        "markPriceIv": "0.4896",        "underlyingPrice": "16815.1",        "openInterest": "49.85",        "turnover24h": "446802.8473",        "volume24h": "26.55",        "totalVolume": "86",        "totalTurnover": "1437431",        "delta": "0.047831",        "gamma": "0.00021453",        "vega": "0.81351067",        "theta": "-19.9115368",        "predictedDeliveryPrice": "0",        "change24h": "-0.33333334"    },    "type": "snapshot"}
```

```
{    "topic": "tickers.BTCUSDT",    "ts": 1673853746003,    "type": "snapshot",    "cs": 2588407389,    "data": {        "symbol": "BTCUSDT",        "lastPrice": "21109.77",        "highPrice24h": "21426.99",        "lowPrice24h": "20575",        "prevPrice24h": "20704.93",        "volume24h": "6780.866843",        "turnover24h": "141946527.22907118",        "price24hPcnt": "0.0196",        "usdIndexPrice": "21120.2400136"    }}
```

# Kline

Subscribe to the klines stream.

tip

If `confirm`\=true, this means that the candle has closed. Otherwise, the candle
is still open and updating.

**Available intervals:**

- `1` `3` `5` `15` `30` (min)
- `60` `120` `240` `360` `720` (min)
- `D` (day)
- `W` (week)
- `M` (month)

**Push frequency:** 1-60s

**Topic:**  
`kline.{interval}.{symbol}` e.g., kline.30.BTCUSDT

### Response Parameters[​](#response-parameters "Direct link to heading")

| Parameter                                          | Type    | Comments                                                   |
| :------------------------------------------------- | :------ | ---------------------------------------------------------- |
| topic                                              | string  | Topic name                                                 |
| type                                               | string  | Data type. <code>snapshot</code>                           |
| ts                                                 | number  | The timestamp (ms) that the system generates the data      |
| data                                               | array   | Object                                                     |
| &gt; start                                         | number  | The start timestamp (ms)                                   |
| &gt; end                                           | number  | The end timestamp (ms)                                     |
| &gt; <a href="/docs/v5/enum#interval">interval</a> | string  | Kline interval                                             |
| &gt; open                                          | string  | Open price                                                 |
| &gt; close                                         | string  | Close price                                                |
| &gt; high                                          | string  | Highest price                                              |
| &gt; low                                           | string  | Lowest price                                               |
| &gt; volume                                        | string  | Trade volume                                               |
| &gt; turnover                                      | string  | Turnover                                                   |
| &gt; confirm                                       | boolean | Whether the tick is ended or not                           |
| &gt; timestamp                                     | number  | The timestamp (ms) of the last matched order in the candle |

### Subscribe Example[​](#subscribe-example "Direct link to heading")

```
from pybit.unified_trading import WebSocketfrom time import sleepws = WebSocket(    testnet=True,    channel_type="linear",)def handle_message(message):    print(message)ws.kline_stream(    interval=5,    symbol="BTCUSDT",    callback=handle_message)while True:    sleep(1)
```

### Response Example[​](#response-example "Direct link to heading")

```
{    "topic": "kline.5.BTCUSDT",    "data": [        {            "start": 1672324800000,            "end": 1672325099999,            "interval": "5",            "open": "16649.5",            "close": "16677",            "high": "16677",            "low": "16608",            "volume": "2.081",            "turnover": "34666.4005",            "confirm": false,            "timestamp": 1672324988882        }    ],    "ts": 1672324988882,    "type": "snapshot"}
```

# All Liquidation

Subscribe to the liquidation stream, push all liquidations that occur on Bybit.

> **Covers: USDT contract / USDC contract / Inverse contract**

Push frequency: **500ms**

**Topic:**  
`allLiquidation.{symbol}` e.g., allLiquidation.BTCUSDT

### Response Parameters[​](#response-parameters "Direct link to heading")

| Parameter | Type   | Comments                                                                                                                                                  |
| :-------- | :----- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| topic     | string | Topic name                                                                                                                                                |
| type      | string | Data type. <code>snapshot</code>                                                                                                                          |
| ts        | number | The timestamp (ms) that the system generates the data                                                                                                     |
| data      | Object |
| &gt; T    | number | The updated timestamp (ms)                                                                                                                                |
| &gt; s    | string | Symbol name                                                                                                                                               |
| &gt; S    | string | Position side. <code>Buy</code>,<code>Sell</code>. When you receive a <code>Buy</code> update, this means that a long position has been liquidated        |
| &gt; v    | string | Executed size                                                                                                                                             |
| &gt; p    | string | <a href="https://www.bybit.com/en-US/help-center/s/article/Bankruptcy-Price-USDT-Contract" target="_blank" rel="noopener noreferrer">Bankruptcy price</a> |

### Subscribe Example[​](#subscribe-example "Direct link to heading")

```
from pybit.unified_trading import WebSocketfrom time import sleepws = WebSocket(    testnet=True,    channel_type="linear",)def handle_message(message):    print(message)ws.all_liquidation_stream("ROSEUSDT", handle_message)while True:    sleep(1)
```

### Message Example[​](#message-example "Direct link to heading")

```
{    "topic": "allLiquidation.ROSEUSDT",    "type": "snapshot",    "ts": 1739502303204,    "data": [        {            "T": 1739502302929,            "s": "ROSEUSDT",            "S": "Sell",            "v": "20000",            "p": "0.04499"        }    ]}
```

# LT Kline

Subscribe to the leveraged token kline stream.

tip

If `confirm`\=true, this means that the candle has closed. Otherwise, the candle
is still open and updating.

**Available intervals:**

- `1` `3` `5` `15` `30` (min)
- `60` `120` `240` `360` `720` (min)
- `D` (day)
- `W` (week)
- `M` (month)

**Push frequency:** 1-60s

**Topic:**  
`kline_lt.{interval}.{symbol}` e.g., kline_lt.30.BTC3SUSDT

### Response Parameters[​](#response-parameters "Direct link to heading")

| Parameter                                          | Type    | Comments                                                                                       |
| :------------------------------------------------- | :------ | ---------------------------------------------------------------------------------------------- |
| topic                                              | string  | Topic name                                                                                     |
| type                                               | string  | Data type. <code>snapshot</code>                                                               |
| ts                                                 | number  | The timestamp (ms) that the system generates the data                                          |
| data                                               | array   | Object                                                                                         |
| &gt; start                                         | number  | The start timestamp (ms)                                                                       |
| &gt; end                                           | number  | The end timestamp (ms). It is current timestamp if it does not reach to the end time of candle |
| &gt; <a href="/docs/v5/enum#interval">interval</a> | string  | Kline interval                                                                                 |
| &gt; open                                          | string  | Open price                                                                                     |
| &gt; close                                         | string  | Close price                                                                                    |
| &gt; high                                          | string  | Highest price                                                                                  |
| &gt; low                                           | string  | Lowest price                                                                                   |
| &gt; confirm                                       | boolean | Whether the tick is ended or not                                                               |
| &gt; timestamp                                     | number  | The timestamp (ms) of the last matched order in the candle                                     |

### Subscribe Example[​](#subscribe-example "Direct link to heading")

```
from pybit.unified_trading import WebSocketfrom time import sleepws = WebSocket(    testnet=True,    channel_type="spot",)def handle_message(message):    print(message)ws.lt_kline_stream(    interval=30,    symbol="EOS3LUSDT",    callback=handle_message)while True:    sleep(1)
```

### Response Example[​](#response-example "Direct link to heading")

```
{    "type": "snapshot",    "topic": "kline_lt.5.EOS3LUSDT",    "data": [        {            "start": 1672325100000,            "end": 1672325399999,            "interval": "5",            "open": "0.416039541212402799",            "close": "0.41477848043290448",            "high": "0.416039541212402799",            "low": "0.409734237314911206",            "confirm": false,            "timestamp": 1672325322393        }    ],    "ts": 1672325322393}
```

# LT Ticker

Subscribe to the leveraged token ticker stream.

**Push frequency:** 300ms

**Topic:**  
`tickers_lt.{symbol}` e.g.,tickers_lt.BTC3SUSDT

### Response Parameters[​](#response-parameters "Direct link to heading")

| Parameter         | Type   | Comments                                              |
| :---------------- | :----- | ----------------------------------------------------- |
| topic             | string | Topic name                                            |
| type              | string | Data type. <code>snapshot</code>                      |
| ts                | number | The timestamp (ms) that the system generates the data |
| data              | array  | Object                                                |
| &gt; symbol       | string | Symbol name                                           |
| &gt; price24hPcnt | string | Market price change percentage in the past 24 hours   |
| &gt; lastPrice    | string | The last price                                        |
| &gt; prevPrice24h | string | Market price 24 hours ago                             |
| &gt; highPrice24h | string | Highest price in the past 24 hours                    |
| &gt; lowPrice24h  | string | Lowest price in the past 24 hours                     |

### Subscribe Example[​](#subscribe-example "Direct link to heading")

```
from pybit.unified_trading import WebSocketfrom time import sleepws = WebSocket(    testnet=True,    channel_type="spot",)def handle_message(message):    print(message)ws.lt_ticker_stream(    symbol="EOS3LUSDT",    callback=handle_message)while True:    sleep(1)
```

### Response Example[​](#response-example "Direct link to heading")

```
{    "topic": "tickers_lt.EOS3LUSDT",    "ts": 1672325446847,    "type": "snapshot",    "data": {        "symbol": "EOS3LUSDT",        "lastPrice": "0.41477848043290448",        "highPrice24h": "0.435285472510871305",        "lowPrice24h": "0.394601507960931382",        "prevPrice24h": "0.431502290172376349",        "price24hPcnt": "-0.0388"    }}
```

# LT Nav

Subscribe to the leveraged token nav stream.

**Push frequency:** 300ms

**Topic:**  
`lt.{symbol}` e.g.,lt.BTC3SUSDT

### Response Parameters[​](#response-parameters "Direct link to heading")

| Parameter           | Type   | Comments                                                 |
| :------------------ | :----- | -------------------------------------------------------- |
| topic               | string | Topic name                                               |
| type                | string | Data type. <code>snapshot</code>                         |
| ts                  | number | The timestamp (ms) that the system generates the data    |
| data                | array  | Object                                                   |
| &gt; time           | number | The generated timestamp of nav                           |
| &gt; symbol         | string | Symbol name                                              |
| &gt; nav            | string | Net asset value                                          |
| &gt; basketPosition | string | Total position value = basket value \* total circulation |
| &gt; leverage       | string | Leverage                                                 |
| &gt; basketLoan     | string | Basket loan                                              |
| &gt; circulation    | string | Circulation                                              |
| &gt; basket         | string | Basket                                                   |

### Subscribe Example[​](#subscribe-example "Direct link to heading")

```
from pybit.unified_trading import WebSocketfrom time import sleepws = WebSocket(    testnet=True,    channel_type="spot",)def handle_message(message):    print(message)ws.lt_nav_stream(    symbol="EOS3LUSDT",    callback=handle_message)while True:    sleep(1)
```

### Response Example[​](#response-example "Direct link to heading")

```
{    "topic": "lt.EOS3LUSDT",    "ts": 1672325564669,    "type": "snapshot",    "data": {        "symbol": "EOS3LUSDT",        "time": 1672325564554,        "nav": "0.413517419653406162",        "basketPosition": "1.261060779498318641",        "leverage": "2.656197506416192150",        "basketLoan": "-0.684866519289629374",        "circulation": "72767.309468460367138199",        "basket": "91764.000000292013277472"    }}
```

# Liquidation (deprecated)

Depreicated liquidation stream, please move to
[All Liquidation](/docs/v5/websocket/public/all-liquidation) Subscribe to the
liquidation stream. Pushes at most one order per second per symbol. As such,
this feed does not push all liquidations that occur on Bybit.

Push frequency: **1s**

**Topic:**  
`liquidation.{symbol}` e.g., liquidation.BTCUSDT

### Response Parameters[​](#response-parameters "Direct link to heading")

| Parameter       | Type   | Comments                                                                                                                                                  |
| :-------------- | :----- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| topic           | string | Topic name                                                                                                                                                |
| type            | string | Data type. <code>snapshot</code>                                                                                                                          |
| ts              | number | The timestamp (ms) that the system generates the data                                                                                                     |
| data            | Object |
| &gt; updateTime | number | The updated timestamp (ms)                                                                                                                                |
| &gt; symbol     | string | Symbol name                                                                                                                                               |
| &gt; side       | string | Position side. <code>Buy</code>,<code>Sell</code>. When you receive a <code>Buy</code> update, this means that a long position has been liquidated        |
| &gt; size       | string | Executed size                                                                                                                                             |
| &gt; price      | string | <a href="https://www.bybit.com/en-US/help-center/s/article/Bankruptcy-Price-USDT-Contract" target="_blank" rel="noopener noreferrer">Bankruptcy price</a> |

### Subscribe Example[​](#subscribe-example "Direct link to heading")

```
from pybit.unified_trading import WebSocketfrom time import sleepws = WebSocket(    testnet=True,    channel_type="linear",)def handle_message(message):    print(message)ws.liquidation_stream(    symbol="BTCUSDT",    callback=handle_message)while True:    sleep(1)
```

### Response Example[​](#response-example "Direct link to heading")

```
{    "topic": "liquidation.BTCUSDT",    "type": "snapshot",    "ts": 1703485237953,    "data": {        "updatedTime": 1703485237953,        "symbol": "BTCUSDT",        "side": "Sell",        "size": "0.003",        "price": "43511.70"    }}
```
