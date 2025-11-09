# GET /api/v1/market/callauctionData

**Source:**
[/api/v1/market/callauctionData](https://www.kucoin.com/docs/rest//api/v1/market/callauctionData)

## Authentication

Not Required (Public Endpoint)

## Description

Get Call Auction Info

Get call auction data. This interface will return the following information for
the specified symbol during the call auction phase: estimated transaction price,
estimated transaction quantity, bid price range, and ask price range.

## Parameters

| Parameter | Required | Type   | Description |
| --------- | -------- | ------ | ----------- |
| symbol    | required | string | symbol      |

## Responses

### 200

| Parameter                    | Required | Type    | Description                |
| ---------------------------- | -------- | ------- | -------------------------- |
| code                         | required | string  |                            |
| data                         | required | object  |                            |
| data.symbol                  | required | string  | Symbol                     |
| data.estimatedPrice          | required | string  | Estimated price            |
| data.estimatedSize           | required | string  | Estimated size             |
| data.sellOrderRangeLowPrice  | required | string  | Sell ​​order minimum price |
| data.sellOrderRangeHighPrice | required | string  | Sell ​​order maximum price |
| data.buyOrderRangeLowPrice   | required | string  | Buy order minimum price    |
| data.buyOrderRangeHighPrice  | required | string  | Buy ​​order maximum price  |
| data.time                    | required | integer | Timestamp (ms)             |
