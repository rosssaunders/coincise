# GET funding interval rates.

**Source:**
[funding interval rates.](https://docs.backpack.exchange/#tag/Markets/operation/get_funding_interval_rates)

## Authentication

Not Required (Public Endpoint)

## [](#tag/Markets/operation/get_funding_interval_rates)Get funding interval rates.

Funding interval rate history for futures.

##### query Parameters

| Parameter | Required | Type             | Description                                           |
| --------- | -------- | ---------------- | ----------------------------------------------------- |
| symbol    | required | string           | Market symbol to query                                |
| limit     | optional | integer <uint64> | Maximum number to return. Default 100, maximum 10000. |
| offset    | optional | integer <uint64> | Offset for pagination. Default 0.                     |

### Responses

**200**

Success.

| Parameter                     | Required | Type             | Description |
| ----------------------------- | -------- | ---------------- | ----------- |
| ACCESS-CONTROL-EXPOSE-HEADERS | required | string           |             |
| X-PAGE-COUNT                  | required | integer <uint64> |             |
| X-CURRENT-PAGE                | required | integer <uint64> |             |
| X-PAGE-SIZE                   | required | integer <uint64> |             |
| X-TOTAL                       | required | integer <uint64> |             |

##### Response Schema: application/json; charset=utf-8

Array

| Parameter            | Required | Type                     | Description                                                  |
| -------------------- | -------- | ------------------------ | ------------------------------------------------------------ |
| symbol               | required | string                   | The symbol of the market associated to the funding interval. |
| intervalEndTimestamp | required | string <naive-date-time> | The end of the funding interval.                             |
| fundingRate          | required | string <decimal>         | The funding rate for the interval.                           |

**400**

Bad request.

**500**

Internal server error.

##### Response Schema: application/json; charset=utf-8

| Parameter | Required | Type   | Description |
| --------- | -------- | ------ | ----------- |
| code      | required | string |             |
| message   | required | string |             |
