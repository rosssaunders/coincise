# BingX USDT-Futures API - Account

## Account Endpoints

### Query account data

GET /openApi/swap/v3/user/balance

rate limitation by UID: 5/s & rate limitation by IP in group Number: 3

API KEY permission: Read

Content-Type:request body(application/json)

Get asset information of user‘s Perpetual Account of USDC and USDT

#### Request Parameters

| Parameter Name | Type  | Required | Description                                         |
| -------------- | ----- | -------- | --------------------------------------------------- |
| timestamp      | int64 | yes      | request timestamp in milliseconds                   |
| recvWindow     | int64 | no       | Request valid time window value, Unit: milliseconds |

#### Response Parameters

| Parameter Name   | Type   | Description                                                              |
| ---------------- | ------ | ------------------------------------------------------------------------ |
| code             | int64  | error code, 0 means successfully response, others means response failure |
| msg              | string | Error Details Description                                                |
| asset            | string | user asset                                                               |
| balance          | string | asset balance                                                            |
| equity           | string | net asset value                                                          |
| unrealizedProfit | string | unrealized profit and loss                                               |
| realisedProfit   | string | realized profit and loss                                                 |
| availableMargin  | string | available margin                                                         |
| usedMargin       | string | used margin                                                              |
| freezedMargin    | string | frozen margin                                                            |
| shortUid         | string | short uid                                                                |

#### Errors

| Error Code | Description                                                                                                                                                  |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 80014      | timestamp is invalid                                                                                                                                         |
| 100421     | Null timestamp or timestamp mismatch, try to run our sample code from the link https://bingx-api.github.io/docs/#/en-us/spot/account-api.html#Query%20Assets |
| 100419     | IP does not match IP whitelist , please go to https://bingx.com/en/account/api/ to verify the ip you have set                                                |
| 100410     | code:100410:The endpoint trigger frequency limit rule is currently in the disabled period and will be unblocked after 1727193814249                          |
| 100410     | rate limited                                                                                                                                                 |
| 100413     | Incorrect apiKey                                                                                                                                             |
| 100410     | over 20 error code:100202 requests within 480000 ms for this api, please verify and fix it ,can retry after time: 1727193970155                              |
| 109400     | CATI-USDT,symbol not exist, please verify it in api: /openApi/swap/v2/quote/contracts                                                                        |
| 80020      | risk forbidden                                                                                                                                               |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/swapV2/account-api.html#Query
> account
> data](https://bingx-api.github.io/docs/#/en-us/swapV2/account-api.html#Query
> account data)

### Query position data

GET /openApi/swap/v2/user/positions

rate limitation by UID: 5/s & rate limitation by IP in group Number: 3

API KEY permission: Read

Content-Type:request body(application/json)

Retrieve information on users' positions of Perpetual Swap.

#### Request Parameters

| Parameter Name | Type   | Required | Description                                                          |
| -------------- | ------ | -------- | -------------------------------------------------------------------- |
| symbol         | string | no       | There must be a hyphen/ "-" in the trading pair symbol. eg: BTC-USDT |
| timestamp      | int64  | yes      | request timestamp in milliseconds                                    |
| recvWindow     | int64  | no       | Request valid time window value, Unit: milliseconds                  |

#### Response Parameters

| Parameter Name     | Type    | Description                                                                                 |
| ------------------ | ------- | ------------------------------------------------------------------------------------------- |
| symbol             | string  | trading pair, for example: BTC-USDT                                                         |
| positionId         | string  | Position ID                                                                                 |
| positionSide       | string  | position direction LONG/SHORT long/short                                                    |
| isolated           | bool    | Whether it is isolated margin mode, true: isolated margin mode false: cross margin          |
| positionAmt        | string  | Position Amount                                                                             |
| availableAmt       | string  | AvailableAmt Amount                                                                         |
| unrealizedProfit   | string  | unrealized profit and loss                                                                  |
| realisedProfit     | string  | realized profit and loss                                                                    |
| initialMargin      | string  | initialMargin                                                                               |
| margin             | string  | margin                                                                                      |
| avgPrice           | string  | Average opening price                                                                       |
| liquidationPrice   | float64 | liquidation price                                                                           |
| leverage           | int     | leverage                                                                                    |
| positionValue      | string  | Position value                                                                              |
| markPrice          | string  | Mark price                                                                                  |
| riskRate           | string  | Risk rate. When the risk rate reaches 100%, it will force liquidation or position reduction |
| maxMarginReduction | string  | Maximum margin reduction                                                                    |
| pnlRatio           | string  | Unrealized P&L ratio                                                                        |
| updateTime         | int64   | Position update time, in milliseconds timestamp.                                            |

#### Errors

| Error Code | Description                                                                                                                                                  |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 80014      | timestamp is invalid                                                                                                                                         |
| 100421     | Null timestamp or timestamp mismatch, try to run our sample code from the link https://bingx-api.github.io/docs/#/en-us/spot/account-api.html#Query%20Assets |
| 100419     | IP does not match IP whitelist , please go to https://bingx.com/en/account/api/ to verify the ip you have set                                                |
| 100410     | code:100410:The endpoint trigger frequency limit rule is currently in the disabled period and will be unblocked after 1727193814249                          |
| 100410     | rate limited                                                                                                                                                 |
| 100413     | Incorrect apiKey                                                                                                                                             |
| 100410     | over 20 error code:100202 requests within 480000 ms for this api, please verify and fix it ,can retry after time: 1727193970155                              |
| 109400     | CATI-USDT,symbol not exist, please verify it in api: /openApi/swap/v2/quote/contracts                                                                        |
| 80020      | risk forbidden                                                                                                                                               |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/swapV2/account-api.html#Query
> position
> data](https://bingx-api.github.io/docs/#/en-us/swapV2/account-api.html#Query
> position data)

### Get Account Profit and Loss Fund Flow

GET /openApi/swap/v2/user/income

rate limitation by UID: 5/s & rate limitation by IP in group Number: 2

API KEY permission: Perpetual Futures Trading

Content-Type:request body(application/json)

Query the capital flow of the perpetual contract under the current account.

- If neither startTime nor endTime is sent, only the data of the last 7 days
  will be returned.

- If the incomeType is not sent, return all types of account profit and loss
  fund flow.

- Only keep the last 3 months data.

#### Request Parameters

| Parameter Name | Type   | Required | Description                                                          |
| -------------- | ------ | -------- | -------------------------------------------------------------------- |
| symbol         | string | no       | There must be a hyphen/ "-" in the trading pair symbol. eg: BTC-USDT |
| incomeType     | string | no       | Income type, see remarks                                             |
| startTime      | int64  | no       | start time                                                           |
| endTime        | int64  | no       | end time                                                             |
| limit          | int64  | no       | Number of result sets to return Default: 100 Maximum: 1000           |
| timestamp      | int64  | yes      | request timestamp in milliseconds                                    |
| recvWindow     | int64  | no       | Request valid time window value, Unit: milliseconds                  |

#### Response Parameters

| Parameter Name | Type   | Description                                                                                         |
| -------------- | ------ | --------------------------------------------------------------------------------------------------- |
| symbol         | string | trading pair, for example: BTC-USDT                                                                 |
| incomeType     | string | money flow type                                                                                     |
| income         | string | The amount of capital flow, positive numbers represent inflows, negative numbers represent outflows |
| asset          | string | asset content                                                                                       |
| info           | string | Remarks, depending on the type of stream                                                            |
| time           | int64  | time, unit: millisecond                                                                             |
| tranId         | string | transfer id                                                                                         |
| tradeId        | string | The original transaction ID that caused the transaction                                             |

#### Errors

| Error Code | Description                                                                                                                                                  |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 80014      | timestamp is invalid                                                                                                                                         |
| 100421     | Null timestamp or timestamp mismatch, try to run our sample code from the link https://bingx-api.github.io/docs/#/en-us/spot/account-api.html#Query%20Assets |
| 100419     | IP does not match IP whitelist , please go to https://bingx.com/en/account/api/ to verify the ip you have set                                                |
| 100410     | code:100410:The endpoint trigger frequency limit rule is currently in the disabled period and will be unblocked after 1727193814249                          |
| 100410     | rate limited                                                                                                                                                 |
| 100413     | Incorrect apiKey                                                                                                                                             |
| 100410     | over 20 error code:100202 requests within 480000 ms for this api, please verify and fix it ,can retry after time: 1727193970155                              |
| 109400     | CATI-USDT,symbol not exist, please verify it in api: /openApi/swap/v2/quote/contracts                                                                        |
| 80020      | risk forbidden                                                                                                                                               |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/swapV2/account-api.html#Get Account
> Profit and Loss Fund
> Flow](https://bingx-api.github.io/docs/#/en-us/swapV2/account-api.html#Get
> Account Profit and Loss Fund Flow)

### Export fund flow

GET /openApi/swap/v2/user/income/export

rate limitation by UID: 5/s & rate limitation by IP in group Number: 2

API KEY permission: Perpetual Futures Trading

Content-Type:request body(application/json)

Export fund flow

[1\. Create Account](https://bingx.com)
[2\. Pass KYC/KYB](https://bingx.com/en-us/account/api/)
[3\. Create API KEY](https://bingx.com/en-us/account/api/)
[4\. Configure API KEY permissions](https://bingx.com/en-us/account/api/)
[5\. Understanding signature authentication](https://bingx-api.github.io/docs/#/en-us/swapV2/authentication.html#Signature%20Description)
_6\. Run the following example code_
[7\. Understand common error codes](https://bingx-api.github.io/docs/#/en-us/swapV2/base-info.html#Common%20Error%20Codes)
[8\. Understand rate limitations](https://bingx-api.github.io/docs/#/en-us/swapV2/base-info.html#Rate%20limit)
[9\. Understanding request timestamps](https://bingx-api.github.io/docs/#/en-us/swapV2/base-info.html#Timestamp)
[10\. Understand fee schedule](https://bingx.com/en-us/support/costs/)
[11\. Understand trading rules](https://bingx.com/en-us/tradeInfo/perpetual/trading-rules/BTC-USDT)

request parameters https://open-api.bingx.com

- Only keep the last 3 months data.

#### Request Parameters

| Parameter Name | Type   | Required | Description                                                                                                          |
| -------------- | ------ | -------- | -------------------------------------------------------------------------------------------------------------------- |
| symbol         | string | no       | trading pair, for example: BTC-USDT                                                                                  |
| incomeType     | string | no       | Fund flow type, optional values:REALIZED_PNL FUNDING_FEE TRADING_FEE INSURANCE_CLEAR TRIAL_FUND ADL SYSTEM_DEDUCTION |
| startTime      | int64  | no       | Start time, unit: millisecond                                                                                        |
| endTime        | int64  | no       | End time, unit: millisecond                                                                                          |
| limit          | int    | no       | Number of returned result sets default value: 100 maximum value: 1000                                                |
| timestamp      | int64  | yes      | request timestamp, unit: millisecond                                                                                 |
| recvWindow     | int64  | no       | Request valid time window value, Unit: milliseconds                                                                  |

#### Errors

| Error Code | Description                                                                                                                                                  |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 80014      | timestamp is invalid                                                                                                                                         |
| 100421     | Null timestamp or timestamp mismatch, try to run our sample code from the link https://bingx-api.github.io/docs/#/en-us/spot/account-api.html#Query%20Assets |
| 100419     | IP does not match IP whitelist , please go to https://bingx.com/en/account/api/ to verify the ip you have set                                                |
| 100410     | code:100410:The endpoint trigger frequency limit rule is currently in the disabled period and will be unblocked after 1727193814249                          |
| 100410     | rate limited                                                                                                                                                 |
| 100413     | Incorrect apiKey                                                                                                                                             |
| 100410     | over 20 error code:100202 requests within 480000 ms for this api, please verify and fix it ,can retry after time: 1727193970155                              |
| 109400     | CATI-USDT,symbol not exist, please verify it in api: /openApi/swap/v2/quote/contracts                                                                        |
| 80020      | risk forbidden                                                                                                                                               |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/swapV2/account-api.html#Export fund
> flow](https://bingx-api.github.io/docs/#/en-us/swapV2/account-api.html#Export
> fund flow)

### Query Trading Commission Rate

GET /openApi/swap/v2/user/commissionRate

rate limitation by UID: 5/s & rate limitation by IP in group Number: 2

API KEY permission: Perpetual Futures Trading

Content-Type:request body(application/json)

Obtain the transaction rate for the current user

#### Request Parameters

| Parameter Name | Type  | Required | Description                                         |
| -------------- | ----- | -------- | --------------------------------------------------- |
| timestamp      | int64 | yes      | request timestamp, unit: millisecond                |
| recvWindow     | int64 | no       | Request valid time window value, Unit: milliseconds |

#### Response Parameters

| Parameter Name      | Type    | Description    |
| ------------------- | ------- | -------------- |
| takerCommissionRate | float64 | taker fee rate |
| makerCommissionRate | float64 | maker fee rate |

#### Errors

| Error Code | Description                                                                                                                                                  |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 80014      | timestamp is invalid                                                                                                                                         |
| 100421     | Null timestamp or timestamp mismatch, try to run our sample code from the link https://bingx-api.github.io/docs/#/en-us/spot/account-api.html#Query%20Assets |
| 100419     | IP does not match IP whitelist , please go to https://bingx.com/en/account/api/ to verify the ip you have set                                                |
| 100410     | code:100410:The endpoint trigger frequency limit rule is currently in the disabled period and will be unblocked after 1727193814249                          |
| 100410     | rate limited                                                                                                                                                 |
| 100413     | Incorrect apiKey                                                                                                                                             |
| 100410     | over 20 error code:100202 requests within 480000 ms for this api, please verify and fix it ,can retry after time: 1727193970155                              |
| 109400     | CATI-USDT,symbol not exist, please verify it in api: /openApi/swap/v2/quote/contracts                                                                        |
| 80020      | risk forbidden                                                                                                                                               |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/swapV2/account-api.html#Query
> Trading Commission
> Rate](https://bingx-api.github.io/docs/#/en-us/swapV2/account-api.html#Query
> Trading Commission Rate)

---
