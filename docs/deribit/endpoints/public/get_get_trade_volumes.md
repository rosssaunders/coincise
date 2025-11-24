# GET /public/get_trade_volumes

Retrieves aggregated 24h trade volumes for different instrument types and
currencies.

### Parameters

| Parameter | Required | Type    | Enum                                                                                  | Description |
| --------- | -------- | ------- | ------------------------------------------------------------------------------------- | ----------- |
| extended  | false    | boolean | Request for extended statistics. Including also 7 and 30 days volumes (default false) |             |

### Response

| Name                        | Type    | Description                                       |
| --------------------------- | ------- | ------------------------------------------------- |
| id                          | integer | The id that was sent in the request               |
| jsonrpc                     | string  | The JSON-RPC version (2.0) result array of object |
| result[].calls_volume       | number  | Total 24h trade volume for call options.          |
| result[].calls_volume_30d   | number  | Total 30d trade volume for call options.          |
| result[].calls_volume_7d    | number  | Total 7d trade volume for call options.           |
| result[].currency           | string  | Currency, i.e "BTC", "ETH", "USDC"                |
| result[].futures_volume     | number  | Total 24h trade volume for futures.               |
| result[].futures_volume_30d | number  | Total 30d trade volume for futures.               |
| result[].futures_volume_7d  | number  | Total 7d trade volume for futures.                |
| result[].puts_volume        | number  | Total 24h trade volume for put options.           |
| result[].puts_volume_30d    | number  | Total 30d trade volume for put options.           |
| result[].puts_volume_7d     | number  | Total 7d trade volume for put options.            |
| result[].spot_volume        | number  | Total 24h trade for spot.                         |
| result[].spot_volume_30d    | number  | Total 30d trade for spot.                         |
| result[].spot_volume_7d     | number  | Total 7d trade for spot.                          |
