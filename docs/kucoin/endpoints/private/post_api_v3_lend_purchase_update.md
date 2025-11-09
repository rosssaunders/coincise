# POST /api/v3/lend/purchase/update

**Source:** [/api/v3/lend/purchase/update](https://www.kucoin.com/docs/rest//api/v3/lend/purchase/update)

## Authentication

Required (Private Endpoint)

## Description

Modify Purchase

This API endpoint is used to update the interest rates of subscription orders, which will take effect at the beginning of the next hour. Please ensure that the funds are in the main (funding) account.

## Request Body

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| currency | required | string | Currency |
| interestRate | required | string | Modified purchase interest rate |
| purchaseOrderNo | required | string | Purchase order ID |

## Responses

### 200

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| code | required | string |  |
| data | required | string |  |

