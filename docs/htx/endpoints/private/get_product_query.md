# GET Product Query

**Source:**
[Product Query](https://www.htx.com/en-us/opend/newApiPages/?id=8cb89359-77b5-11ed-9966-19975752584)

**Category:** Earn

## Authentication

Required (Private Endpoint)

### /v1/earn/project/queryEarnProjectList (Product Query)

Request type: GET

Signature verification: Yes

Interface permission: 读取

#### Request Address

| Environment                         | Address                   |
| ----------------------------------- | ------------------------- |
| Online                              | https://api.huobi.pro     |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description                        | Value Range | Default Value |
| --------- | --------- | -------- | ---------------------------------- | ----------- | ------------- |
| currency  | String    | false    | Crypto                             |             |               |
| pageNum   | Integer   | true     | Page number                        |             | 1             |
| pageSize  | Integer   | true     | Number of items per page (max 100) |             | 10            |

#### Response Parameter

| Parameter         | Data Type              | Required | Description                                                                                                                                                                                                               | Value Range |
| ----------------- | ---------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| code              | Integer                | true     | Response status (200: Success, 500: Failure)                                                                                                                                                                              |             |
| message           | String                 | true     | Error message                                                                                                                                                                                                             |             |
| data              | PageInfoResVo          | false    | Data result                                                                                                                                                                                                               |             |
| total             | Integer                | true     | Total items                                                                                                                                                                                                               |             |
| items             | List<SavingProjectDTO> | true     | Data result set                                                                                                                                                                                                           |             |
| projectId         | Long                   | true     | Project ID                                                                                                                                                                                                                |             |
| productId         | Long                   | true     | Product ID                                                                                                                                                                                                                |             |
| calculationType   | Integer                | true     | Earnings calculation type: 0 - By APY (percentage); 1 - By total return pool (fixed)                                                                                                                                      |             |
| type              | Integer                | true     | Project type: 0 - Flexible                                                                                                                                                                                                |             |
| viewYearRate      | BigDecimal             | true     | APY                                                                                                                                                                                                                       |             |
| finishAmount      | BigDecimal             | true     | Amount raised                                                                                                                                                                                                             |             |
| projectStatus     | Integer                | true     | Funding status: 1 - Funding (currently fundraising)                                                                                                                                                                       |             |
| totalAmount       | BigDecimal             | true     | Total funding amount                                                                                                                                                                                                      |             |
| currency          | String                 | true     | Product crypto                                                                                                                                                                                                            |             |
| startAmount       | BigDecimal             | true     | Minimum subscription amount                                                                                                                                                                                               |             |
| apyType           | Integer                | true     | APY type: 0 - Fixed; 1 - Market-based                                                                                                                                                                                     |             |
| tieredRates       | List<TieredRateVo>     | false    | Tiered interest rates for Flexible products                                                                                                                                                                               |             |
| marketPerkUpLimit | String                 | false    | Maximum subscription amount applying to market-based interest rate bonus (used with marketTimeApy and marketPerkApy) Example: Assume the subscription amount limit is 100 USDT. 0-100: marketPerkApy; >100: marketPerkApy |             |
| marketTimeApy     | BigDecimal             | false    | Market-based, real-time interest rate (used with marketPerkUpLimit and marketPerkApy)                                                                                                                                     |             |
| marketPerkApy     | BigDecimal             | false    | Market-based subsidy interest rate (used with marketPerkUpLimit and marketTimeApy)                                                                                                                                        |             |
| amountStart       | BigDecimal             | true     | Starting amount                                                                                                                                                                                                           |             |
| amountEnd         | BigDecimal             | true     | Ending amount                                                                                                                                                                                                             |             |
| rate              | BigDecimal             | true     | Interest rate                                                                                                                                                                                                             |             |

#### Request example

No data

#### Response Example

##### Success Example

No data
