## /public/get_trade_volumes

Retrieves aggregated 24h trade volumes for different instrument types and
currencies.

### Parameters

| Parameter | Required | Type    | Enum | Description                                                                           |
| --------- | -------- | ------- | ---- | ------------------------------------------------------------------------------------- |
| extended  | false    | boolean |      | Request for extended statistics. Including also 7 and 30 days volumes (default false) |

### Response

| Name                    | Type              | Description                              |
| ----------------------- | ----------------- | ---------------------------------------- |
| id                      | integer           | The id that was sent in the request      |
| jsonrpc                 | string            | The JSON-RPC version (2.0)               |
| result                  | array of _object_ |                                          |
|   ›  calls_volume       | number            | Total 24h trade volume for call options. |
|   ›  calls_volume_30d   | number            | Total 30d trade volume for call options. |
|   ›  calls_volume_7d    | number            | Total 7d trade volume for call options.  |
|   ›  currency           | string            | Currency, i.e `"BTC"`, `"ETH"`, `"USDC"` |
|   ›  futures_volume     | number            | Total 24h trade volume for futures.      |
|   ›  futures_volume_30d | number            | Total 30d trade volume for futures.      |
|   ›  futures_volume_7d  | number            | Total 7d trade volume for futures.       |
|   ›  puts_volume        | number            | Total 24h trade volume for put options.  |
|   ›  puts_volume_30d    | number            | Total 30d trade volume for put options.  |
|   ›  puts_volume_7d     | number            | Total 7d trade volume for put options.   |
|   ›  spot_volume        | number            | Total 24h trade for spot.                |
|   ›  spot_volume_30d    | number            | Total 30d trade for spot.                |
|   ›  spot_volume_7d     | number            | Total 7d trade for spot.                 |
