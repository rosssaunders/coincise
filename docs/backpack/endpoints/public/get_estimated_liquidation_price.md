# GET estimated liquidation price.

**Source:**
[estimated liquidation price.](https://docs.backpack.exchange/#tag/Borrow-Lend/operation/get_borrow_lend_estimated_liquidation_price)

## Authentication

Not Required (Public Endpoint)

## [](#tag/Borrow-Lend/operation/get_borrow_lend_estimated_liquidation_price)Get estimated liquidation price.

Retrieves the estimated liquidation price for a potential borrow lend position.

##### query Parameters

| Parameter    | Required | Type             | Description                                                  |
| ------------ | -------- | ---------------- | ------------------------------------------------------------ |
| subaccountId | optional | integer <uint16> | Optional subaccount.                                         |
| borrow       | required | string           | Standard base64 encoded json of \[BorrowLendExecutePayload\] |

### Responses

**200**

Success.

##### Response Schema: application/json; charset=utf-8

| Parameter        | Required | Type             | Description |
| ---------------- | -------- | ---------------- | ----------- |
| liquidationPrice | required | string <decimal> |             |
| markPrice        | required | string <decimal> |             |

**400**

Bad request.

**401**

Unauthorized.

**500**

Internal server error.

##### Response Schema: application/json; charset=utf-8

| Parameter | Required | Type   | Description |
| --------- | -------- | ------ | ----------- |
| code      | required | string |             |
| message   | required | string |             |
