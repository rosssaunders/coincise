# GET /api/v1/hf/orders/done

**Source:** [/api/v1/hf/orders/done](https://www.kucoin.com/docs/rest//api/v1/hf/orders/done)

## Authentication

Required (Private Endpoint)

## Description

Get Closed Orders

This interface is to obtain all Spot closed order lists, and the return value of the active order interface is the paged data of all uncompleted order lists. The returned data is sorted in descending order according to the latest update time of the order.  After the user successfully places an order, the order is in Active state, and the user can use inOrderBook to determine whether the order has entered the order. Canceled or fully filled orders are marked as completed Done status.

## Parameters

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| symbol | required | string | symbol |
| side | optional | string | specify if the order is to 'buy' or 'sell' |
| type | optional | string | specify if the order is an 'limit' order or 'market' order.  |
| lastId | optional | integer | The id of the last set of data from the previous batch of data. By default, the latest information is given.
lastId is used to filter data and paginate. If lastId is not entered, the default is a maximum of 100 returned data items. The return results include lastId，which can be used as a query parameter to look up new data from the next page. |
| limit | optional | integer | Default20，Max100 |
| startAt | optional | integer | Start time (milisecond) |
| endAt | optional | integer | End time (milisecond) |

## Responses

### 200

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| code | required | string |  |
| data | required | object |  |

