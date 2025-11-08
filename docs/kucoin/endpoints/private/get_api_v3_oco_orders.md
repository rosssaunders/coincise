# GET /api/v3/oco/orders

**Source:** [/api/v3/oco/orders](https://www.kucoin.com/docs/rest//api/v3/oco/orders)

## Authentication

Required (Private Endpoint)

## Description

Get OCO Order List

Request your current OCO order list via this endpoint. Items are paginated and sorted to show the latest first. See the Pagination section for retrieving additional entries after the first page.

## Parameters

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| symbol | optional | string | symbol |
| startAt | optional | integer | Start time (milliseconds) |
| endAt | optional | integer | End time (milliseconds) |
| orderIds | optional | string | Specify orderId collection, up to 500 orders
 |
| pageSize | optional | integer | Size per page, minimum value 10, maximum value 500 |
| currentPage | optional | integer | Page number, minimum value 1
 |

## Responses

### 200

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| code | required | string |  |
| data | required | object |  |

