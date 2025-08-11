# OKX API Documentation - Financial Product

### GET / Offers [🔗](https://www.okx.com/docs-v5/en/#financial-product-on-chain-earn-get-offers "Direct link to: https://www.okx.com/docs-v5/en/#financial-product-on-chain-earn-get-offers")

#### Rate Limit: 3 requests per second

#### Rate limit rule: User ID

#### Permission: Read

#### HTTP Request

`GET /api/v5/finance/staking-defi/offers`

#### Request Parameters

| Parameter    | Type   | Required | Description                                       |
| ------------ | ------ | -------- | ------------------------------------------------- |
| productId    | String | No       | Product ID                                        |
| protocolType | String | No       | Protocol type<br><code>defi</code>: on-chain earn |
| ccy          | String | No       | Investment currency, e.g. <code>BTC</code>        |

#### Response Parameters

| Parameter                | Type             | Description                                                                                                                                                                                                                               |
| ------------------------ | ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ccy                      | String           | Currency type, e.g. <code>BTC</code>                                                                                                                                                                                                      |
| productId                | String           | Product ID                                                                                                                                                                                                                                |
| protocol                 | String           | Protocol                                                                                                                                                                                                                                  |
| protocolType             | String           | Protocol type<br><code>defi</code>: on-chain earn                                                                                                                                                                                         |
| term                     | String           | Protocol term<br>It will return the days of fixed term and will return <code>0</code> for flexible product                                                                                                                                |
| apy                      | String           | Estimated annualization<br>If the annualization is 7% , this field is 0.07                                                                                                                                                                |
| earlyRedeem              | Boolean          | Whether the protocol supports early redemption                                                                                                                                                                                            |
| investData               | Array of objects | Current target currency information available for investment                                                                                                                                                                              |
| &gt; ccy                 | String           | Investment currency, e.g. <code>BTC</code>                                                                                                                                                                                                |
| &gt; bal                 | String           | Available balance to invest                                                                                                                                                                                                               |
| &gt; minAmt              | String           | Minimum subscription amount                                                                                                                                                                                                               |
| &gt; maxAmt              | String           | Maximum available subscription amount                                                                                                                                                                                                     |
| earningData              | Array of objects | Earning data                                                                                                                                                                                                                              |
| &gt; ccy                 | String           | Earning currency, e.g. <code>BTC</code>                                                                                                                                                                                                   |
| &gt; earningType         | String           | Earning type<br><code>0</code>: Estimated earning<br><code>1</code>: Cumulative earning                                                                                                                                                   |
| state                    | String           | Product state<br><code>purchasable</code>: Purchasable<br><code>sold_out</code>: Sold out<br><code>Stop</code>: Suspension of subscription                                                                                                |
| redeemPeriod             | Array of strings | Redemption Period, format in [min time,max time]<br><code>H</code>: Hour, <code>D</code>: Day<br>e.g. ["1H","24H"] represents redemption period is between 1 Hour and 24 Hours.<br>["14D","14D"] represents redemption period is 14 days. |
| fastRedemptionDailyLimit | String           | Fast redemption daily limit<br>If fast redemption is not supported, it will return ''.                                                                                                                                                    |

---

### POST / Purchase [🔗](https://www.okx.com/docs-v5/en/#financial-product-on-chain-earn-post-purchase "Direct link to: https://www.okx.com/docs-v5/en/#financial-product-on-chain-earn-post-purchase")

#### Rate Limit: 2 requests per second

#### Rate limit rule: User ID

#### Permission: Trade

#### HTTP Request

`POST /api/v5/finance/staking-defi/purchase`

#### Request Parameters

| Parameter  | Type             | Required    | Description                                                                                                     |
| ---------- | ---------------- | ----------- | --------------------------------------------------------------------------------------------------------------- |
| productId  | String           | Yes         | Product ID                                                                                                      |
| investData | Array of objects | Yes         | Investment data                                                                                                 |
| &gt; ccy   | String           | Yes         | Investment currency, e.g. <code>BTC</code>                                                                      |
| &gt; amt   | String           | Yes         | Investment amount                                                                                               |
| term       | String           | Conditional | Investment term<br>Investment term must be specified for fixed-term product                                     |
| tag        | String           | No          | Order tag<br>A combination of case-sensitive alphanumerics, all numbers, or all letters of up to 16 characters. |

#### Response Parameters

| Parameter | Type   | Description |
| --------- | ------ | ----------- |
| ordId     | String | Order ID    |
| tag       | String | Order tag   |

---

### POST / Redeem [🔗](https://www.okx.com/docs-v5/en/#financial-product-on-chain-earn-post-redeem "Direct link to: https://www.okx.com/docs-v5/en/#financial-product-on-chain-earn-post-redeem")

#### Rate Limit: 2 requests per second

#### Rate limit rule: User ID

#### Permission: Trade

#### HTTP Request

`POST /api/v5/finance/staking-defi/redeem`

#### Request Parameters

| Parameter        | Type    | Required | Description                                                      |
| ---------------- | ------- | -------- | ---------------------------------------------------------------- |
| ordId            | String  | Yes      | Order ID                                                         |
| protocolType     | String  | Yes      | Protocol type<br><code>defi</code>: on-chain earn                |
| allowEarlyRedeem | Boolean | No       | Whether allows early redemption<br>Default is <code>false</code> |

#### Response Parameters

| Parameter | Type   | Description |
| --------- | ------ | ----------- |
| ordId     | String | Order ID    |
| tag       | String | Order tag   |

---

### POST / Cancel purchases/redemptions [🔗](https://www.okx.com/docs-v5/en/#financial-product-on-chain-earn-post-cancel-purchases-redemptions "Direct link to: https://www.okx.com/docs-v5/en/#financial-product-on-chain-earn-post-cancel-purchases-redemptions")

After cancelling, returning funds will go to the funding account.

#### Rate Limit: 2 requests per second

#### Rate limit rule: User ID

#### Permission: Trade

#### HTTP Request

`POST /api/v5/finance/staking-defi/cancel`

#### Request Parameters

| Parameter    | Type   | Required | Description                                       |
| ------------ | ------ | -------- | ------------------------------------------------- |
| ordId        | String | Yes      | Order ID                                          |
| protocolType | String | Yes      | Protocol type<br><code>defi</code>: on-chain earn |

#### Response Parameters

| Parameter | Type   | Description |
| --------- | ------ | ----------- |
| ordId     | String | Order ID    |
| tag       | String | Order tag   |

---

### GET / Active orders [🔗](https://www.okx.com/docs-v5/en/#financial-product-on-chain-earn-get-active-orders "Direct link to: https://www.okx.com/docs-v5/en/#financial-product-on-chain-earn-get-active-orders")

#### Rate Limit: 3 requests per second

#### Rate limit rule: User ID

#### Permission: Read

#### HTTP Request

`GET /api/v5/finance/staking-defi/orders-active`

#### Request Parameters

| Parameter    | Type   | Required | Description                                                                                                                                              |
| ------------ | ------ | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| productId    | String | No       | Product ID                                                                                                                                               |
| protocolType | String | No       | Protocol type<br><code>defi</code>: on-chain earn                                                                                                        |
| ccy          | String | No       | Investment currency, e.g. <code>BTC</code>                                                                                                               |
| state        | String | No       | Order state<br><code>8</code>: Pending<br><code>13</code>: Cancelling<br><code>9</code>: Onchain<br><code>1</code>: Earning<br><code>2</code>: Redeeming |

#### Response Parameters

| Parameter                | Type             | Description                                                                                                                                              |
| ------------------------ | ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ccy                      | String           | Currency, e.g. <code>BTC</code>                                                                                                                          |
| ordId                    | String           | Order ID                                                                                                                                                 |
| productId                | String           | Product ID                                                                                                                                               |
| state                    | String           | Order state<br><code>8</code>: Pending<br><code>13</code>: Cancelling<br><code>9</code>: Onchain<br><code>1</code>: Earning<br><code>2</code>: Redeeming |
| protocol                 | String           | Protocol                                                                                                                                                 |
| protocolType             | String           | Protocol type<br><code>defi</code>: on-chain earn                                                                                                        |
| term                     | String           | Protocol term<br>It will return the days of fixed term and will return <code>0</code> for flexible product                                               |
| apy                      | String           | Estimated APY<br>If the estimated APY is 7% , this field is 0.07<br>Retain to 4 decimal places (truncated)                                               |
| investData               | Array of objects | Investment data                                                                                                                                          |
| &gt; ccy                 | String           | Investment currency, e.g. <code>BTC</code>                                                                                                               |
| &gt; amt                 | String           | Invested amount                                                                                                                                          |
| earningData              | Array of objects | Earning data                                                                                                                                             |
| &gt; ccy                 | String           | Earning currency, e.g. <code>BTC</code>                                                                                                                  |
| &gt; earningType         | String           | Earning type<br><code>0</code>: Estimated earning<br><code>1</code>: Cumulative earning                                                                  |
| &gt; earnings            | String           | Earning amount                                                                                                                                           |
| fastRedemptionData       | Array of objects | Fast redemption data                                                                                                                                     |
| &gt; ccy                 | String           | Currency, e.g. <code>BTC</code>                                                                                                                          |
| &gt; redeemingAmt        | String           | Redeeming amount                                                                                                                                         |
| purchasedTime            | String           | Order purchased time, Unix timestamp format in milliseconds, e.g. <code>1597026383085</code>                                                             |
| estSettlementTime        | String           | Estimated redemption settlement time                                                                                                                     |
| cancelRedemptionDeadline | String           | Deadline for cancellation of redemption application                                                                                                      |
| tag                      | String           | Order tag                                                                                                                                                |

---

### GET / Order history [🔗](https://www.okx.com/docs-v5/en/#financial-product-on-chain-earn-get-order-history "Direct link to: https://www.okx.com/docs-v5/en/#financial-product-on-chain-earn-get-order-history")

#### Rate Limit: 3 requests per second

#### Rate limit rule: User ID

#### Permission: Read

#### HTTP Request

`GET /api/v5/finance/staking-defi/orders-history`

#### Request Parameters

| Parameter    | Type   | Required | Description                                                                                                                  |
| ------------ | ------ | -------- | ---------------------------------------------------------------------------------------------------------------------------- |
| productId    | String | No       | Product ID                                                                                                                   |
| protocolType | String | No       | Protocol type<br><code>defi</code>: on-chain earn                                                                            |
| ccy          | String | No       | Investment currency, e.g. <code>BTC</code>                                                                                   |
| after        | String | No       | Pagination of data to return records earlier than the requested ID. The value passed is the corresponding <code>ordId</code> |
| before       | String | No       | Pagination of data to return records newer than the requested ID. The value passed is the corresponding <code>ordId</code>   |
| limit        | String | No       | Number of results per request. The default is <code>100</code>. The maximum is <code>100</code>.                             |

#### Response Parameters

| Parameter             | Type             | Description                                                                                                             |
| --------------------- | ---------------- | ----------------------------------------------------------------------------------------------------------------------- |
| ccy                   | String           | Currency, e.g. <code>BTC</code>                                                                                         |
| ordId                 | String           | Order ID                                                                                                                |
| productId             | String           | Product ID                                                                                                              |
| state                 | String           | Order state<br><code>3</code>: Completed (including canceled and redeemed)                                              |
| protocol              | String           | Protocol                                                                                                                |
| protocolType          | String           | Protocol type<br><code>defi</code>: on-chain earn                                                                       |
| term                  | String           | Protocol term<br>It will return the days of fixed term and will return <code>0</code> for flexible product              |
| apy                   | String           | Estimated APY<br>If the estimated APY is 7% , this field is <code>0.07</code><br>Retain to 4 decimal places (truncated) |
| investData            | Array of objects | Investment data                                                                                                         |
| &gt; ccy              | String           | Investment currency, e.g. <code>BTC</code>                                                                              |
| &gt; amt              | String           | Invested amount                                                                                                         |
| earningData           | Array of objects | Earning data                                                                                                            |
| &gt; ccy              | String           | Earning currency, e.g. <code>BTC</code>                                                                                 |
| &gt; earningType      | String           | Earning type<br><code>0</code>: Estimated earning<br><code>1</code>: Cumulative earning                                 |
| &gt; realizedEarnings | String           | Cumulative earning of redeemed orders<br>This field is just valid when the order is in redemption state                 |
| purchasedTime         | String           | Order purchased time, Unix timestamp format in milliseconds, e.g. <code>1597026383085</code>                            |
| redeemedTime          | String           | Order redeemed time, Unix timestamp format in milliseconds, e.g. <code>1597026383085</code>                             |
| tag                   | String           | Order tag                                                                                                               |

---

### GET / Product info [🔗](https://www.okx.com/docs-v5/en/#financial-product-eth-staking-get-product-info "Direct link to: https://www.okx.com/docs-v5/en/#financial-product-eth-staking-get-product-info")

#### Rate Limit: 3 requests per second

#### Rate limit rule: User ID

#### Permission: Read

#### HTTP Request

`GET /api/v5/finance/staking-defi/eth/product-info`

#### Response Parameters

| Parameter                | Type   | Description                                                                             |
| ------------------------ | ------ | --------------------------------------------------------------------------------------- |
| fastRedemptionDailyLimit | String | Fast redemption daily limit<br>The master account and sub-accounts share the same limit |

---

### POST / Purchase [🔗](https://www.okx.com/docs-v5/en/#financial-product-eth-staking-post-purchase "Direct link to: https://www.okx.com/docs-v5/en/#financial-product-eth-staking-post-purchase")

Staking ETH for BETH  
Only the assets in the funding account can be used.

#### Rate Limit: 2 requests per second

#### Rate limit rule: User ID

#### Permission: Trade

#### HTTP Request

`POST /api/v5/finance/staking-defi/eth/purchase`

#### Request Parameters

| Parameter | Type   | Required | Description       |
| --------- | ------ | -------- | ----------------- |
| amt       | String | Yes      | Investment amount |

#### Response Parameters

code = `0` means your request has been successfully handled.

---

### POST / Redeem [🔗](https://www.okx.com/docs-v5/en/#financial-product-eth-staking-post-redeem "Direct link to: https://www.okx.com/docs-v5/en/#financial-product-eth-staking-post-redeem")

Only the assets in the funding account can be used. If your BETH is in your
trading account, you can make funding transfer first.

#### Rate Limit: 2 requests per second

#### Rate limit rule: User ID

#### Permission: Trade

#### HTTP Request

`POST /api/v5/finance/staking-defi/eth/redeem`

#### Request Parameters

| Parameter | Type   | Required | Description      |
| --------- | ------ | -------- | ---------------- |
| amt       | String | Yes      | Redeeming amount |

#### Response Parameters

code = `0` means your request has been successfully handled.

---

### GET / Balance [🔗](https://www.okx.com/docs-v5/en/#financial-product-eth-staking-get-balance "Direct link to: https://www.okx.com/docs-v5/en/#financial-product-eth-staking-get-balance")

The balance is a snapshot summarized all BETH assets (including assets in
redeeming) in account.

#### Rate Limit: 6 requests per second

#### Rate limit rule: User ID

#### Permission: Read

#### HTTP Request

`GET /api/v5/finance/staking-defi/eth/balance`

#### Request Parameters

None

#### Response Parameters

| Parameter             | Type   | Description                                                                             |
| --------------------- | ------ | --------------------------------------------------------------------------------------- |
| ccy                   | String | Currency, e.g. <code>BETH</code>                                                        |
| amt                   | String | Currency amount                                                                         |
| latestInterestAccrual | String | Latest interest accrual                                                                 |
| totalInterestAccrual  | String | Total interest accrual                                                                  |
| ts                    | String | Query data time, Unix timestamp format in milliseconds, e.g. <code>1597026383085</code> |

---

### GET / Purchase&Redeem history [🔗](https://www.okx.com/docs-v5/en/#financial-product-eth-staking-get-purchase-amp-redeem-history "Direct link to: https://www.okx.com/docs-v5/en/#financial-product-eth-staking-get-purchase-amp-redeem-history")

#### Rate Limit: 6 requests per second

#### Rate limit rule: User ID

#### Permission: Read

#### HTTP Request

`GET /api/v5/finance/staking-defi/eth/purchase-redeem-history`

#### Request Parameters

| Parameter | Type   | Required | Description                                                                                                                                  |
| --------- | ------ | -------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| type      | String | No       | Type<br><code>purchase</code><br><code>redeem</code>                                                                                         |
| status    | String | No       | Status<br><code>pending</code><br><code>success</code><br><code>failed</code>                                                                |
| after     | String | No       | Pagination of data to return records earlier than the <code>requestTime</code>. The value passed is the corresponding <code>timestamp</code> |
| before    | String | No       | Pagination of data to return records newer than the <code>requestTime</code>. The value passed is the corresponding <code>timestamp</code>   |
| limit     | String | No       | Number of results per request. The default is <code>100</code>. The maximum is <code>100</code>.                                             |

#### Response Parameters

| Parameter        | Type   | Description                                                                                                           |
| ---------------- | ------ | --------------------------------------------------------------------------------------------------------------------- |
| type             | String | Type<br><code>purchase</code><br><code>redeem</code>                                                                  |
| amt              | String | Purchase/Redeem amount                                                                                                |
| redeemingAmt     | String | Redeeming amount                                                                                                      |
| status           | String | Status<br><code>pending</code><br><code>success</code><br><code>failed</code>                                         |
| requestTime      | String | Request time of make purchase/redeem, Unix timestamp format in milliseconds, e.g. <code>1597026383085</code>          |
| completedTime    | String | Completed time of redeem settlement, Unix timestamp format in milliseconds, e.g. <code>1597026383085</code>           |
| estCompletedTime | String | Estimated completed time of redeem settlement, Unix timestamp format in milliseconds, e.g. <code>1597026383085</code> |

---

### GET / APY history (Public) [🔗](https://www.okx.com/docs-v5/en/#financial-product-eth-staking-get-apy-history-public "Direct link to: https://www.okx.com/docs-v5/en/#financial-product-eth-staking-get-apy-history-public")

Public endpoints don't need authorization.

#### Rate Limit: 6 requests per second

#### Rate limit rule: IP

#### HTTP Request

`GET /api/v5/finance/staking-defi/eth/apy-history`

#### Request Parameters

| Parameter | Type   | Required | Description                                                                                      |
| --------- | ------ | -------- | ------------------------------------------------------------------------------------------------ |
| days      | String | Yes      | Get the days of APY(Annual percentage yield) history record in the past<br>No more than 365 days |

#### Response Parameters

| Parameter | Type   | Description                                                                       |
| --------- | ------ | --------------------------------------------------------------------------------- |
| rate      | String | APY(Annual percentage yield), e.g. <code>0.01</code> represents <code>1%</code>   |
| ts        | String | Data time, Unix timestamp format in milliseconds, e.g. <code>1597026383085</code> |

---

### GET / Product info [🔗](https://www.okx.com/docs-v5/en/#financial-product-sol-staking-get-product-info "Direct link to: https://www.okx.com/docs-v5/en/#financial-product-sol-staking-get-product-info")

#### Rate Limit: 3 requests per second

#### Rate limit rule: User ID

#### Permission: Read

#### HTTP Request

`GET /api/v5/finance/staking-defi/sol/product-info`

#### Response Parameters

| Parameter                | Type   | Description                                                                             |
| ------------------------ | ------ | --------------------------------------------------------------------------------------- |
| fastRedemptionDailyLimit | String | Fast redemption daily limit<br>The master account and sub-accounts share the same limit |
| fastRedemptionAvail      | String | Currently fast redemption max available amount                                          |

---

### POST / Purchase [🔗](https://www.okx.com/docs-v5/en/#financial-product-sol-staking-post-purchase "Direct link to: https://www.okx.com/docs-v5/en/#financial-product-sol-staking-post-purchase")

Staking SOL for OKSOL  
Only the assets in the funding account can be used.

#### Rate Limit: 2 requests per second

#### Rate limit rule: User ID

#### Permission: Trade

#### HTTP Request

`POST /api/v5/finance/staking-defi/sol/purchase`

#### Request Parameters

| Parameter | Type   | Required | Description       |
| --------- | ------ | -------- | ----------------- |
| amt       | String | Yes      | Investment amount |

#### Response Parameters

code = `0` means your request has been successfully handled.

---

### POST / Redeem [🔗](https://www.okx.com/docs-v5/en/#financial-product-sol-staking-post-redeem "Direct link to: https://www.okx.com/docs-v5/en/#financial-product-sol-staking-post-redeem")

Only the assets in the funding account can be used. If your OKSOL is in your
trading account, you can make funding transfer first.

#### Rate Limit: 2 requests per second

#### Rate limit rule: User ID

#### Permission: Trade

#### HTTP Request

`POST /api/v5/finance/staking-defi/sol/redeem`

#### Request Parameters

| Parameter | Type   | Required | Description      |
| --------- | ------ | -------- | ---------------- |
| amt       | String | Yes      | Redeeming amount |

#### Response Parameters

code = `0` means your request has been successfully handled.

---

### GET / Balance [🔗](https://www.okx.com/docs-v5/en/#financial-product-sol-staking-get-balance "Direct link to: https://www.okx.com/docs-v5/en/#financial-product-sol-staking-get-balance")

The balance is summarized all OKSOL assets (including assets in redeeming) in
account.

#### Rate Limit: 6 requests per second

#### Rate limit rule: User ID

#### Permission: Read

#### HTTP Request

`GET /api/v5/finance/staking-defi/sol/balance`

#### Request Parameters

None

#### Response Parameters

| Parameter             | Type   | Description                       |
| --------------------- | ------ | --------------------------------- |
| ccy                   | String | Currency, e.g. <code>OKSOL</code> |
| amt                   | String | Currency amount                   |
| latestInterestAccrual | String | Latest interest accrual           |
| totalInterestAccrual  | String | Total interest accrual            |

---

### GET / Purchase&Redeem history [🔗](https://www.okx.com/docs-v5/en/#financial-product-sol-staking-get-purchase-amp-redeem-history "Direct link to: https://www.okx.com/docs-v5/en/#financial-product-sol-staking-get-purchase-amp-redeem-history")

#### Rate Limit: 6 requests per second

#### Rate limit rule: User ID

#### Permission: Read

#### HTTP Request

`GET /api/v5/finance/staking-defi/sol/purchase-redeem-history`

#### Request Parameters

| Parameter | Type   | Required | Description                                                                                                                                  |
| --------- | ------ | -------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| type      | String | No       | Type<br><code>purchase</code><br><code>redeem</code>                                                                                         |
| status    | String | No       | Status<br><code>pending</code><br><code>success</code><br><code>failed</code>                                                                |
| after     | String | No       | Pagination of data to return records earlier than the <code>requestTime</code>. The value passed is the corresponding <code>timestamp</code> |
| before    | String | No       | Pagination of data to return records newer than the <code>requestTime</code>. The value passed is the corresponding <code>timestamp</code>   |
| limit     | String | No       | Number of results per request. The default is <code>100</code>. The maximum is <code>100</code>.                                             |

#### Response Parameters

| Parameter        | Type   | Description                                                                                                           |
| ---------------- | ------ | --------------------------------------------------------------------------------------------------------------------- |
| type             | String | Type<br><code>purchase</code><br><code>redeem</code>                                                                  |
| amt              | String | Purchase/Redeem amount                                                                                                |
| redeemingAmt     | String | Redeeming amount                                                                                                      |
| status           | String | Status<br><code>pending</code><br><code>success</code><br><code>failed</code>                                         |
| requestTime      | String | Request time of make purchase/redeem, Unix timestamp format in milliseconds, e.g. <code>1597026383085</code>          |
| completedTime    | String | Completed time of redeem settlement, Unix timestamp format in milliseconds, e.g. <code>1597026383085</code>           |
| estCompletedTime | String | Estimated completed time of redeem settlement, Unix timestamp format in milliseconds, e.g. <code>1597026383085</code> |

---

### GET / APY history (Public) [🔗](https://www.okx.com/docs-v5/en/#financial-product-sol-staking-get-apy-history-public "Direct link to: https://www.okx.com/docs-v5/en/#financial-product-sol-staking-get-apy-history-public")

Public endpoints don't need authorization.

#### Rate Limit: 6 requests per second

#### Rate limit rule: IP

#### HTTP Request

`GET /api/v5/finance/staking-defi/sol/apy-history`

#### Request Parameters

| Parameter | Type   | Required | Description                                                                                      |
| --------- | ------ | -------- | ------------------------------------------------------------------------------------------------ |
| days      | String | Yes      | Get the days of APY(Annual percentage yield) history record in the past<br>No more than 365 days |

#### Response Parameters

| Parameter | Type   | Description                                                                       |
| --------- | ------ | --------------------------------------------------------------------------------- |
| rate      | String | APY(Annual percentage yield), e.g. <code>0.01</code> represents <code>1%</code>   |
| ts        | String | Data time, Unix timestamp format in milliseconds, e.g. <code>1597026383085</code> |

---

## Simple earn flexible [🔗](https://www.okx.com/docs-v5/en/#financial-product-simple-earn-flexible "Direct link to: https://www.okx.com/docs-v5/en/#financial-product-simple-earn-flexible")

Simple earn flexible (saving) is earned by lending to leveraged trading users in
the lending market. [learn more](/earn/simple-earn)

---

### GET / Saving balance [🔗](https://www.okx.com/docs-v5/en/#financial-product-simple-earn-flexible-get-saving-balance "Direct link to: https://www.okx.com/docs-v5/en/#financial-product-simple-earn-flexible-get-saving-balance")

#### Rate Limit: 6 requests per second

#### Rate limit rule: User ID

#### Permission: Read

#### HTTP Request

`GET /api/v5/finance/savings/balance`

#### Request Parameters

| **Parameters** | **Types** | **Required** | **Description**                 |
| -------------- | --------- | ------------ | ------------------------------- |
| ccy            | String    | No           | Currency, e.g. <code>BTC</code> |

#### Response Parameters

| Parameter  | Type   | Description                               |
| ---------- | ------ | ----------------------------------------- |
| ccy        | String | Currency                                  |
| amt        | String | Currency amount                           |
| earnings   | String | Currency earnings                         |
| rate       | String | Lending rate                              |
| loanAmt    | String | Lending amount                            |
| pendingAmt | String | Pending amount                            |
| redemptAmt | String | <del>Redempting amount</del> (Deprecated) |

---

### POST / Savings purchase/redemption [🔗](https://www.okx.com/docs-v5/en/#financial-product-simple-earn-flexible-post-savings-purchase-redemption "Direct link to: https://www.okx.com/docs-v5/en/#financial-product-simple-earn-flexible-post-savings-purchase-redemption")

Only the assets in the funding account can be used for saving.

#### Rate Limit: 6 requests per second

#### Rate limit rule: User ID

#### Permission: Trade

#### HTTP Request

`POST /api/v5/finance/savings/purchase-redempt`

#### Request Parameters

| Parameter | Type   | Required    | Description                                                                                                                                                                                                                                                            |
| --------- | ------ | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ccy       | String | Yes         | Currency, e.g. <code>BTC</code>                                                                                                                                                                                                                                        |
| amt       | String | Yes         | Purchase/redemption amount                                                                                                                                                                                                                                             |
| side      | String | Yes         | Action type.<br><code>purchase</code>: purchase saving shares<br><code>redempt</code>: redeem saving shares                                                                                                                                                            |
| rate      | String | Conditional | Annual purchase rate, e.g. <code>0.1</code> represents <code>10%</code><br>Only applicable to purchase saving shares<br>The interest rate of the new subscription will cover the interest rate of the last subscription<br>The rate value range is between 1% and 365% |

#### Response Parameters

| Parameter | Type   | Description                                                             |
| --------- | ------ | ----------------------------------------------------------------------- |
| ccy       | String | Currency                                                                |
| amt       | String | Purchase/Redemption amount                                              |
| side      | String | Action type                                                             |
| rate      | String | Annual purchase rate, e.g. <code>0.1</code> represents <code>10%</code> |

---

### POST / Set lending rate [🔗](https://www.okx.com/docs-v5/en/#financial-product-simple-earn-flexible-post-set-lending-rate "Direct link to: https://www.okx.com/docs-v5/en/#financial-product-simple-earn-flexible-post-set-lending-rate")

#### Rate Limit: 6 requests per second

#### Rate limit rule: User ID

#### Permission: Trade

#### HTTP Request

`POST /api/v5/finance/savings/set-lending-rate`

#### Request Parameters

| Parameter | Type   | Required | Description                                                        |
| --------- | ------ | -------- | ------------------------------------------------------------------ |
| ccy       | String | Yes      | Currency, e.g. <code>BTC</code>                                    |
| rate      | String | Yes      | Annual lending rate<br>The rate value range is between 1% and 365% |

#### Response Parameters

| Parameter | Type   | Description                     |
| --------- | ------ | ------------------------------- |
| ccy       | String | Currency, e.g. <code>BTC</code> |
| rate      | String | Annual lending rate             |

---

### GET / Lending history [🔗](https://www.okx.com/docs-v5/en/#financial-product-simple-earn-flexible-get-lending-history "Direct link to: https://www.okx.com/docs-v5/en/#financial-product-simple-earn-flexible-get-lending-history")

Return data in the past month.

#### Rate Limit: 6 requests per second

#### Rate limit rule: User ID

#### Permission: Read

#### HTTP Request

`GET /api/v5/finance/savings/lending-history`

#### Request Parameters

| **Parameters** | **Types** | **Required** | **Description**                                                                                                                                         |
| -------------- | --------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ccy            | String    | No           | Currency, e.g. <code>BTC</code>                                                                                                                         |
| after          | String    | No           | Pagination of data to return records earlier than the requested <code>ts</code>, Unix timestamp format in milliseconds, e.g. <code>1597026383085</code> |
| before         | String    | No           | Pagination of data to return records newer than the requested <code>ts</code>, Unix timestamp format in milliseconds, e.g. <code>1597026383085</code>   |
| limit          | String    | No           | Number of results per request. The maximum is <code>100</code>. The default is <code>100</code>.                                                        |

#### Response Parameters

| Parameter | Type   | Description                                                                          |
| --------- | ------ | ------------------------------------------------------------------------------------ |
| ccy       | String | Currency, e.g. <code>BTC</code>                                                      |
| amt       | String | Lending amount                                                                       |
| earnings  | String | Currency earnings                                                                    |
| rate      | String | Lending annual interest rate                                                         |
| ts        | String | Lending time, Unix timestamp format in milliseconds, e.g. <code>1597026383085</code> |

---

### GET / Public borrow info (public) [🔗](https://www.okx.com/docs-v5/en/#financial-product-simple-earn-flexible-get-public-borrow-info-public "Direct link to: https://www.okx.com/docs-v5/en/#financial-product-simple-earn-flexible-get-public-borrow-info-public")

Authentication is not required for this public endpoint.

#### Rate Limit: 6 requests per second

#### Rate limit rule: IP

#### HTTP Request

`GET /api/v5/finance/savings/lending-rate-summary`

#### Request Parameters

| **Parameters** | **Types** | **Required** | **Description**                 |
| -------------- | --------- | ------------ | ------------------------------- |
| ccy            | String    | No           | Currency, e.g. <code>BTC</code> |

#### Response Parameters

| Parameter | Type   | Description                                                                   |
| --------- | ------ | ----------------------------------------------------------------------------- |
| ccy       | String | Currency, e.g. <code>BTC</code>                                               |
| avgAmt    | String | <del>24H average borrowing amount</del>(deprecated)                           |
| avgAmtUsd | String | <del>24H average borrowing amount in <code>USD</code> value</del>(deprecated) |
| avgRate   | String | 24H average lending rate                                                      |
| preRate   | String | Last annual interest rate                                                     |
| estRate   | String | Next estimate annual interest rate                                            |

---

### GET / Public borrow history (public) [🔗](https://www.okx.com/docs-v5/en/#financial-product-simple-earn-flexible-get-public-borrow-history-public "Direct link to: https://www.okx.com/docs-v5/en/#financial-product-simple-earn-flexible-get-public-borrow-history-public")

Authentication is not required for this public endpoint.  
Only returned records after December 14, 2021.

#### Rate Limit: 6 requests per second

#### Rate limit rule: IP

#### HTTP Request

`GET /api/v5/finance/savings/lending-rate-history`

#### Request Parameters

| **Parameters** | **Types** | **Required** | **Description**                                                                                                                                                                                                                       |
| -------------- | --------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ccy            | String    | No           | Currency, e.g. <code>BTC</code>                                                                                                                                                                                                       |
| after          | String    | No           | Pagination of data to return records earlier than the requested <code>ts</code>, Unix timestamp format in milliseconds, e.g. <code>1597026383085</code>                                                                               |
| before         | String    | No           | Pagination of data to return records newer than the requested <code>ts</code>, Unix timestamp format in milliseconds, e.g. <code>1597026383085</code>                                                                                 |
| limit          | String    | No           | Number of results per request. The maximum is <code>100</code>. The default is <code>100</code>.<br>If <code>ccy</code> is not specified, all data under the same <code>ts</code> will be returned, not limited by <code>limit</code> |

#### Response Parameters

| Parameter | Type   | Description                                                                  |
| --------- | ------ | ---------------------------------------------------------------------------- |
| ccy       | String | Currency, e.g. <code>BTC</code>                                              |
| amt       | String | <del>Lending amount</del>(deprecated)                                        |
| rate      | String | Lending annual interest rate                                                 |
| ts        | String | Time, Unix timestamp format in milliseconds, e.g. <code>1597026383085</code> |

---
