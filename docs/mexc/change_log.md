# Change Log

## **2025-11-25**[​](#2025-11-25 "Direct link to 2025-11-25")

- Added a new order type: Market TP/SL Order

## **2025-11-03**[​](#2025-11-03 "Direct link to 2025-11-03")

- The `/api/v3/rebate/affiliate/commission` API requires the parameters
  "startTime" and "endTime"

## **2025-09-17**[​](#2025-09-17 "Direct link to 2025-09-17")

- Add Query UID endpoint
- Add STP endpoint
- Update params "filters" in exchangeInfo endpoint

## **2025-08-15**[​](#2025-08-15 "Direct link to 2025-08-15")

- Update MiniTicker websocket channels

## **2025-02-24**[​](#2025-02-24 "Direct link to 2025-02-24")

- Update Protocol Buffers websocket channels

## **2024-10-17**[​](#2024-10-17 "Direct link to 2024-10-17")

- Add Query Kyc status endpoint

## **2024-08-16**[​](#2024-08-16 "Direct link to 2024-08-16")

- Exchange Information endpoint update params:status and tradeSideType.

## **2024-06-09**[​](#2024-06-09 "Direct link to 2024-06-09")

- Query The Currency Information endpoint add params:netWork,network will
  offline soon.
- Add new withdraw endpoint,previous withdraw endpoint will offline soon.

## **2024-05-15**[​](#2024-05-15 "Direct link to 2024-05-15")

- Add query commission endpoint

## **2024-04-08**[​](#2024-04-08 "Direct link to 2024-04-08")

- Update response params of Get Withdraw History endpoint

## **2024-01-12**[​](#2024-01-12 "Direct link to 2024-01-12")

- Add query sub-account asset endpoint

## **2024-01-01**[​](#2024-01-01 "Direct link to 2024-01-01")

- Kline support interval: week
- Deposit and withdraw history endpoint update the query timestamp range

## **2023-12-11**[​](#2023-12-11 "Direct link to 2023-12-11")

- Query Sub-account List endpoint add response params:uid

## **2023-11-10**[​](#2023-11-10 "Direct link to 2023-11-10")

- Add user internal transfer endpoint and query internal transfer history
  endpoint.
- Add ws miniTicker and miniTickers channels.

## **2023-10-17**[​](#2023-10-17 "Direct link to 2023-10-17")

- Add Get Affiliate Referral Data endpoint and Get Subaffiliates Data endpoint

## **2023-09-27**[​](#2023-09-27 "Direct link to 2023-09-27")

- Add Get Affiliate Withdraw Record endpoint and Get Affiliate Commission Detail
  Record endpoint

## **2023-08-15**[​](#2023-08-15 "Direct link to 2023-08-15")

- Add Get Affiliate Commission Record endpoint

## **2023-06-13**[​](#2023-06-13 "Direct link to 2023-06-13")

- Add query all listenKey endpoint

## **2023-05-21**[​](#2023-05-21 "Direct link to 2023-05-21")

- Add Download Historical Market Data

## **2023-03-16**[​](#2023-03-16 "Direct link to 2023-03-16")

- Add:Query User Universal Transfer History (by tranId) endpoint
- ws
  [spot@private.deals.v3.api](mailto:spot@private.deals.v3.api "spot@private.deals.v3.api")
  channel add params:"commission","commissionAsset"and"deals amount"

## **2023-03-12**[​](#2023-03-12 "Direct link to 2023-03-12")

- Add:API default symbol,User API default symbol,cancel withdraw,Deposit Address
  endpoints.

## **2023-03-07**[​](#2023-03-07 "Direct link to 2023-03-07")

- ws add channel:Account Update

## **2023-02-13**[​](#2023-02-13 "Direct link to 2023-02-13")

- Add:Get Assets That Can Be Converted Into MX,Dust Transfer,Dust Log endpoints

## **2023-02-07**[​](#2023-02-07 "Direct link to 2023-02-07")

- ws add channel:Individual Symbol Book Ticker Streams

## **2023-01-06**[​](#2023-01-06 "Direct link to 2023-01-06")

- Update Limits Info

## **2022-12-29**[​](#2022-12-29 "Direct link to 2022-12-29")

- ETFremove some response params:

| Name        | type   | Description |
| ----------- | ------ | ----------- |
| preBasket   | string | preBasket   |
| preLeverage | string | preLeverage |

## **2022-12-28**[​](#2022-12-28 "Direct link to 2022-12-28")

- websocket add Partial Book Depth Streams

## **2022-12-13**[​](#2022-12-13 "Direct link to 2022-12-13")

- Add params: avgPrice,cumulativeQuantity,cumulativeAmount for
  `spot@private.orders.v3.api` channel
- Add Query ReferCode Endpoint

## **2022-11-24**[​](#2022-11-24 "Direct link to 2022-11-24")

- Add MEXC Broker Introduction
- Add "Enable MX Deduct" and "Query MX Deduct Status" Endpoints

## **2022-10-14**[​](#2022-10-14 "Direct link to 2022-10-14")

- Update Endpoints Wallet Endpoints\]:

  1.Withdraw: When do a withdraw, `address` and `memo` should be passed separate
  (The previous version the memo is joined with a ":" after address).

  2.Withdraw History: Parameters `address` and `memo` should be returned
  separate (The previous version the memo is joined with a ":" after address).

  3.Deposit Address: The return parameter `tag` is changed to `memo`, and the
  memo required for deposite is returned in the `memo` parameter.

  4.Deposit History: The return parameter `addressTag` is changed to `memo`, and
  the memo required for deposite is returned in the `memo` parameter.

  5.Add Generate deposit address

  6.Query the currency information: add `withdrawTips` and `depositTips`
  params。

## **2022-09-06**[​](#2022-09-06 "Direct link to 2022-09-06")

- Add Rebate Endpoints:

  1.Get Rebate History Records:Get the rebates from friends you invited and the
  transactions they make.

  2.Get Rebate Records Detail:You can query the records of each rebate generated
  by contracts and spot (non-leveraged) transactions made by your friends and
  their sub-accounts.

  3.Get Self Rebate Records Detail:You can query the each contract and spot (no
  margin) your invited friend made as the self-commission record generated from
  it.

## **2022-09-02**[​](#2022-09-02 "Direct link to 2022-09-02")

- Add v3 websocket:

  1.Websocket Market Streams:Trade Streams,Kline Streams,Diff.Depth Stream;

  2.Websocket User Data Streams:Account Deals,Account Orders).

## **2022-08-26**[​](#2022-08-26 "Direct link to 2022-08-26")

- ETF add some response params:

| Name        | type   | Description |
| ----------- | ------ | ----------- |
| preBasket   | string | preBasket   |
| preLeverage | string | preLeverage |
| basket      | string | basket      |

## **2022-08-15**[​](#2022-08-15 "Direct link to 2022-08-15")

- Update for Sub-account endpoints:

  1.Universal Transfer

  2.Query Universal Transfer History

## **2022-08-03**[​](#2022-08-03 "Direct link to 2022-08-03")

- Add Wallet Endpoints:

  1.Query the currency information

  2.Withdraw

  3.Deposit History

  4.Withdraw History

  5.Deposit Address

  6.User Universal Transfer

  7.Query User Universal Transfer History

## **2022-07-27**[​](#2022-07-27 "Direct link to 2022-07-27")

- Spot New Order Order type add: IOC and FOK

## **2022-07-15**[​](#2022-07-15 "Direct link to 2022-07-15")

- Account Trade List add params: isSelfTrade

| Name        | Description |
| ----------- | ----------- |
| isSelfTrade | isSelfTrade |

## **2022-07-08**[​](#2022-07-08 "Direct link to 2022-07-08")

- Add Batch Orders Supports 20 orders in a batch,rate limit: 2 times/s.

## **2022-07-03**[​](#2022-07-03 "Direct link to 2022-07-03")

- Add Query the currency information,Query currency details and the smart
  contract address.

## **2022-05-22**[​](#2022-05-22 "Direct link to 2022-05-22")

- Optimize exchangeInfo Endpoints
- Optimize order Endpoints,add parameter: order id

## **2022-04-25**[​](#2022-04-25 "Direct link to 2022-04-25")

- Exchange Info add parameters:

| Name                   | type    | Description            |
| ---------------------- | ------- | ---------------------- |
| isSpotTradingAllowed   | Boolean | isSpotTradingAllowed   |
| isMarginTradingAllowed | Boolean | isMarginTradingAllowed |

- Current Open Orders Optimize: Get all open orders on multiple symbols,maximun
  support 5 symbols for one request.

## **2022-03-29**[​](#2022-03-29 "Direct link to 2022-03-29")

- Add Sub-Account Endpoints:

  1.Create a Sub-account

  2.Query Sub-account List

  3.Create an APIKey for a sub-account

  4.Query the APIKey of a sub-account

  5.Delete the APIKey of a sub-account

  6.Universal Transfer

  7.Query Universal Transfer History

## **2022-03-25**[​](#2022-03-25 "Direct link to 2022-03-25")

- Add Postman collection

## **2022-03-24**[​](#2022-03-24 "Direct link to 2022-03-24")

- Add information of market order

## **2022-03-21**[​](#2022-03-21 "Direct link to 2022-03-21")

- Add order status

## **2022-03-18**[​](#2022-03-18 "Direct link to 2022-03-18")

- Add new [Order Type](#order_type "Order Type"): Market
- Add time page info: startTime and endTime need to the same time

## **2022-03-09**[​](#2022-03-09 "Direct link to 2022-03-09")

- Add [kline interval](#kline_interval "kline interval")

## **2022-02-19**[​](#2022-02-19 "Direct link to 2022-02-19")

- Add ETF

## **2022-02-11**[​](#2022-02-11 "Direct link to 2022-02-11")

- New version API
