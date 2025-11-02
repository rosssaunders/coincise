# GET K-lines.

**Source:**
[K-lines.](https://docs.backpack.exchange/#tag/Markets/operation/get_klines)

## Authentication

Not Required (Public Endpoint)

## [](#tag/Markets/operation/get_klines)Get K-lines.

Get K-Lines for the given market symbol, optionally providing a `startTime` and
`endTime`. If no `endTime` is provided, the current time will be used.

The `priceType` parameter can be used to specify the price type of the kline. If
not provided, the default is `LastPrice`.

##### query Parameters

| Parameter | Required | Type            | Description                                                        |
| --------- | -------- | --------------- | ------------------------------------------------------------------ |
| symbol    | required | string          | Market symbol for the kline query, e.g. SOL_USDC.                  |
| interval  | required | string          |                                                                    |
| startTime | required | integer <int64> | UTC timestamp in seconds.                                          |
| endTime   | optional | integer <int64> | UTC timestamp in seconds. Set to the current time if not provided. |
| priceType | optional | string          | The price type of the K-line.                                      |

### Responses

**200**

Success.

##### Response Schema: application/json; charset=utf-8

Array

| Parameter   | Required | Type   | Description                         |
| ----------- | -------- | ------ | ----------------------------------- |
| start       | required | string | Start time.                         |
| end         | required | string | End time.                           |
| open        | optional | string | Open price.                         |
| high        | optional | string | High price.                         |
| low         | optional | string | Low price.                          |
| close       | optional | string | Close price.                        |
| volume      | required | string | Volume in base asset.               |
| quoteVolume | required | string | Volume in quote asset.              |
| trades      | required | string | Number of trades during the K-line. |

**400**

Bad request.

**500**

Internal server error.

##### Response Schema: application/json; charset=utf-8

| Parameter | Required | Type   | Description |
| --------- | -------- | ------ | ----------- |
| code      | required | string |             |
| message   | required | string |             |
