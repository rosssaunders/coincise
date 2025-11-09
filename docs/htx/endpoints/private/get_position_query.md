# GET Position Query

**Source:** [Position Query](https://www.htx.com/en-us/opend/newApiPages/?id=8cb89359-77b5-11ed-9966-19975d7abbc)

**Category:** Earn

## Authentication

Required (Private Endpoint)

### /v1/earn/order/user/assets/list (Position Query)

Request type: GET

Signature verification: Yes

Interface permission: Read

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.huobi.pro |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| projectType | Integer | false | Project type: 0 - Flexible |  |  |
| currency | String | false | Crypto |  |  |
| pageNum | Integer | true | Page number |  | 1 |
| pageSize | Integer | true | Number of items per page (max 100) |  | 10 |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| code | Integer | true | Response status (200: Success, 500: Failure) |  |
| message | String | true | Error message |  |
| data | PageInfoResVo | false | Paginated result set |  |
| total | Integer | true | Total items |  |
| items | List<UserAssetsInfoCouponExpandResDto> | false | Data result set |  |
| projectId | Long | true | Project ID |  |
| orderId | Long | true | Order ID |  |
| projectType | Integer | true | Project type: 0 - Flexible |  |
| currency | String | true | Crypto |  |
| yesterdayIncome | String | true | Yesterday's earnings |  |
| totalIncomeAmount | String | true | Total earnings |  |
| totalAmount | String | true | Total holdings |  |
| miningYearRate | String | true | APY |  |
| apyType | Integer | true | APY type: 0 - Fixed; 1 - Market-based |  |

#### Request example

No data

#### Response Example

##### Success Example

No data