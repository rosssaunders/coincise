## /private/get_margins

Get margins for a given instrument, amount and price.

**Scope:** `trade:read`

This is a private method; it can only be used after authentication.

### Parameters

| Parameter       | Required | Type   | Enum | Description                                                                                                                                                                       |
| --------------- | -------- | ------ | ---- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| instrument_name | true     | string |      | Instrument name                                                                                                                                                                   |
| amount          | true     | number |      | It represents the requested order size. For perpetual and inverse futures the amount is in USD units. For options and linear futures and it is the underlying base currency coin. |
| price           | true     | number |      | Price                                                                                                                                                                             |

### Response

| Name           | Type     | Description                                                                                                          |
| -------------- | -------- | -------------------------------------------------------------------------------------------------------------------- |
| id             | integer  | The id that was sent in the request                                                                                  |
| jsonrpc        | string   | The JSON-RPC version (2.0)                                                                                           |
| result         | _object_ |                                                                                                                      |
|   ›  buy       | number   | Margin when buying                                                                                                   |
|   ›  max_price | number   | The maximum price for the future. Any buy orders you submit higher than this price, will be clamped to this maximum. |
|   ›  min_price | number   | The minimum price for the future. Any sell orders you submit lower than this price will be clamped to this minimum.  |
|   ›  sell      | number   | Margin when selling                                                                                                  |
