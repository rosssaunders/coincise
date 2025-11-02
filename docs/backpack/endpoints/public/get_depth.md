# GET depth.

**Source:**
[depth.](https://docs.backpack.exchange/#tag/Markets/operation/get_depth)

## Authentication

Not Required (Public Endpoint)

## [](#tag/Markets/operation/get_depth)Get depth.

Retrieves the order book depth for a given market symbol.

##### query Parameters

| Parameter | Required | Type   | Description                                                 |
| --------- | -------- | ------ | ----------------------------------------------------------- |
| symbol    | required | string |                                                             |
| limit     | optional | string | Limit on the number of price levels to return on each side. |

### Responses

**200**

Success.

##### Response Schema: application/json; charset=utf-8

| Parameter    | Required | Type                          | Description                                                    |
| ------------ | -------- | ----------------------------- | -------------------------------------------------------------- |
| asks         | required | strings <decimal > <decimal > | Asks on the order book.                                        |
| bids         | required | strings <decimal > <decimal > | Bids on the order book.                                        |
| lastUpdateId | required | string                        | Update ID that caused the last change to the order book depth. |
| timestamp    | required | integer <int64>               | Matching engine timestamp in microseconds.                     |

**400**

Bad request.

**500**
