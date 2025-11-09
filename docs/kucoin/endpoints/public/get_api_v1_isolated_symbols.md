# GET /api/v1/isolated/symbols

**Source:**
[/api/v1/isolated/symbols](https://www.kucoin.com/docs/rest//api/v1/isolated/symbols)

## Authentication

Not Required (Public Endpoint)

## Description

Get Symbols - Isolated Margin

This endpoint allows querying the configuration of isolated margin symbol.

## Responses

### 200

| Parameter                     | Required | Type    | Description                  |
| ----------------------------- | -------- | ------- | ---------------------------- |
| code                          | required | string  |                              |
| data                          | required | array   |                              |
| data[].symbol                 | required | string  | symbol                       |
| data[].symbolName             | required | string  | Symbol name                  |
| data[].baseCurrency           | required | string  | Base currency, e.g. BTC.     |
| data[].quoteCurrency          | required | string  | Quote currency, e.g. USDT.   |
| data[].maxLeverage            | required | integer | Max. leverage of this symbol |
| data[].flDebtRatio            | required | string  |                              |
| data[].tradeEnable            | required | boolean |                              |
| data[].autoRenewMaxDebtRatio  | required | string  |                              |
| data[].baseBorrowEnable       | required | boolean |                              |
| data[].quoteBorrowEnable      | required | boolean |                              |
| data[].baseTransferInEnable   | required | boolean |                              |
| data[].quoteTransferInEnable  | required | boolean |                              |
| data[].baseBorrowCoefficient  | required | string  |                              |
| data[].quoteBorrowCoefficient | required | string  |                              |
