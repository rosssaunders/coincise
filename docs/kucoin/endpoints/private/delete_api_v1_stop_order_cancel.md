# DELETE /api/v1/stop-order/cancel

**Source:**
[/api/v1/stop-order/cancel](https://www.kucoin.com/docs/rest//api/v1/stop-order/cancel)

## Authentication

Required (Private Endpoint)

## Description

Batch Cancel Stop Orders

This endpoint can be used to cancel a spot stop orders by batch.

## Parameters

| Parameter | Required | Type   | Description                                                                                                |
| --------- | -------- | ------ | ---------------------------------------------------------------------------------------------------------- |
| symbol    | optional | string | Cancel the open order for the specified symbol                                                             |
| tradeType | optional | string | The type of trading : TRADE（Spot）, MARGIN_TRADE (Cross Margin), MARGIN_ISOLATED_TRADE (Isolated Margin). |
| orderIds  | optional | string | Comma seperated order IDs.                                                                                 |

## Responses

### 200

| Parameter              | Required | Type   | Description    |
| ---------------------- | -------- | ------ | -------------- |
| code                   | required | string |                |
| data                   | required | object |                |
| data.cancelledOrderIds | required | array  | order id array |
