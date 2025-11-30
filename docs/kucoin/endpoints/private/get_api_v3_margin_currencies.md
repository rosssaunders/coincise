# GET /api/v3/margin/currencies

**Source:**
[/api/v3/margin/currencies](https://www.kucoin.com/docs/rest//api/v3/margin/currencies)

## Authentication

Required (Private Endpoint)

## Description

Get Margin Risk Limit

Request Configure and Risk limit info of the margin via this endpoint.

## Parameters

| Parameter  | Required | Type    | Description                                             |
| ---------- | -------- | ------- | ------------------------------------------------------- |
| isIsolated | optional | boolean | True-isolated, false-cross                              |
| currency   | optional | string  | Currency: This field is only required for cross margin  |
| symbol     | optional | string  | Symbol: This field is only required for isolated margin |

## Responses

### 200

| Parameter                     | Required | Type    | Description                                                                                                                                                                                                                       |
| ----------------------------- | -------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| code                          | required | string  |                                                                                                                                                                                                                                   |
| data                          | required | array   |                                                                                                                                                                                                                                   |
| data[].timestamp              | optional | integer | Time stamp                                                                                                                                                                                                                        |
| data[].currency               | optional | string  | CROSS MARGIN RESPONSES, Currency                                                                                                                                                                                                  |
| data[].borrowMaxAmount        | optional | string  | CROSS MARGIN RESPONSES, Maximum personal borrow amount. If the platform has no borrowing amount, this value will still be displayed.                                                                                              |
| data[].buyMaxAmount           | optional | string  | CROSS MARGIN RESPONSES, Maximum buy amount                                                                                                                                                                                        |
| data[].holdMaxAmount          | optional | string  | CROSS MARGIN RESPONSES, Maximum holding amount                                                                                                                                                                                    |
| data[].borrowCoefficient      | optional | string  | CROSS MARGIN RESPONSES, [Borrow Coefficient](https://www.kucoin.com/land/price-protect)                                                                                                                                           |
| data[].marginCoefficient      | optional | string  | CROSS MARGIN RESPONSES, [Margin Coefficient](https://www.kucoin.com/land/price-protect)                                                                                                                                           |
| data[].precision              | optional | integer | CROSS MARGIN RESPONSES, Currency precision. The minimum repayment amount of a single transaction should be >= currency precision. For example, the precision of ETH is 8, and the minimum repayment amount is 0.00000001          |
| data[].borrowMinAmount        | optional | string  | CROSS MARGIN RESPONSES, Minimum personal borrow amount                                                                                                                                                                            |
| data[].borrowMinUnit          | optional | string  | CROSS MARGIN RESPONSES, Minimum unit for borrowing; the borrowed amount must be an integer multiple of this value                                                                                                                 |
| data[].borrowEnabled          | optional | boolean | CROSS MARGIN RESPONSES, Whether to support borrowing                                                                                                                                                                              |
| data[].symbol                 | optional | string  | ISOLATED MARGIN RESPONSES, Symbol                                                                                                                                                                                                 |
| data[].baseMaxBorrowAmount    | optional | string  | ISOLATED MARGIN RESPONSES, Base maximum personal borrow amount. If the platform has no borrowing amount, this value will still be displayed.                                                                                      |
| data[].quoteMaxBorrowAmount   | optional | string  | ISOLATED MARGIN RESPONSES, Quote maximum personal borrow amount. If the platform has no borrowing amount, this value will still be displayed.                                                                                     |
| data[].baseMaxBuyAmount       | optional | string  | ISOLATED MARGIN RESPONSES, Base maximum buy amount                                                                                                                                                                                |
|  |
| data[].quoteMaxBuyAmount      | optional | string  | ISOLATED MARGIN RESPONSES, Quote maximum buy amount                                                                                                                                                                               |
| data[].baseMaxHoldAmount      | optional | string  | ISOLATED MARGIN RESPONSES, Base maximum holding amount                                                                                                                                                                            |
|  |
| data[].quoteMaxHoldAmount     | optional | string  | ISOLATED MARGIN RESPONSES, Quote maximum holding amount                                                                                                                                                                           |
|  |
| data[].basePrecision          | optional | integer | ISOLATED MARGIN RESPONSES, Base currency precision. The minimum repayment amount of a single transaction should be >= currency precision. For example, the precision of ETH is 8, and the minimum repayment amount is 0.00000001  |
| data[].quotePrecision         | optional | integer | ISOLATED MARGIN RESPONSES, Quote currency precision. The minimum repayment amount of a single transaction should be >= currency precision. For example, the precision of ETH is 8, and the minimum repayment amount is 0.00000001 |
|  |
| data[].baseBorrowMinAmount    | optional | string  | ISOLATED MARGIN RESPONSES, Base minimum personal borrow amount                                                                                                                                                                    |
|  |
| data[].quoteBorrowMinAmount   | optional | string  | ISOLATED MARGIN RESPONSES, Quote minimum personal borrow amount                                                                                                                                                                   |
| data[].baseBorrowMinUnit      | optional | string  | ISOLATED MARGIN RESPONSES, Base minimum unit for borrowing, the borrowed amount must be an integer multiple of this value                                                                                                         |
| data[].quoteBorrowMinUnit     | optional | string  | ISOLATED MARGIN RESPONSES, Quote minimum unit for borrowing, the borrowed amount must be an integer multiple of this value                                                                                                        |
| data[].baseBorrowEnabled      | optional | boolean | ISOLATED MARGIN RESPONSES, Base whether to support borrowing                                                                                                                                                                      |
|  |
| data[].quoteBorrowEnabled     | optional | boolean | ISOLATED MARGIN RESPONSES, Quote whether to support borrowing                                                                                                                                                                     |
|  |
| data[].baseBorrowCoefficient  | optional | string  | ISOLATED MARGIN RESPONSES, [Base Borrow Coefficient](https://www.kucoin.com/land/price-protect)                                                                                                                                   |
| data[].quoteBorrowCoefficient | optional | string  | ISOLATED MARGIN RESPONSES, [Quote Borrow Coefficient](https://www.kucoin.com/land/price-protect)                                                                                                                                  |
| data[].baseMarginCoefficient  | optional | string  | ISOLATED MARGIN RESPONSES, [Base Margin Coefficient](https://www.kucoin.com/land/price-protect)                                                                                                                                   |
| data[].quoteMarginCoefficient | optional | string  | ISOLATED MARGIN RESPONSES, [Quote Margin Coefficient](https://www.kucoin.com/land/price-protect)                                                                                                                                  |
