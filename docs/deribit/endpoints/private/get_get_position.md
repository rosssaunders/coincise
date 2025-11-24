# GET /private/get\_position

Retrieve user position.

**Scope:** `trade:read`

This is a private method; it can only be used after authentication.

### Parameters

| Parameter | Required | Type | Enum | Description |
| --- | --- | --- | --- | --- |
| instrument_name | true | string | Instrument name |  |

### Response

| Name | Type | Description |
| --- | --- | --- |
| id | integer | The id that was sent in the request |
| jsonrpc | string | The JSON-RPC version (2.0) result object |
| result.average_price | number | Average price of trades that built this position |
| result.average_price_usd | number | Only for options, average price in USD |
| result.delta | number | Delta parameter |
| result.direction | string | Direction: buy, sell or zero |
| result.estimated_liquidation_price | number | Estimated liquidation price, added only for futures, for users with segregated_sm margin model |
| result.floating_profit_loss | number | Floating profit or loss |
| result.floating_profit_loss_usd | number | Only for options, floating profit or loss in USD |
| result.gamma | number | Only for options, Gamma parameter |
| result.index_price | number | Current index price |
| result.initial_margin | number | Initial margin |
| result.instrument_name | string | Unique instrument identifier |
| result.interest_value | number | Value used to calculate realized_funding (perpetual only) |
| result.kind | string | Instrument kind: "future", "option", "spot", "future_combo", "option_combo" |
| result.leverage | integer | Current available leverage for future position |
| result.maintenance_margin | number | Maintenance margin |
| result.mark_price | number | Current mark price for position's instrument |
| result.open_orders_margin | number | Open orders margin |
| result.realized_funding | number | Realized Funding in current session included in session realized profit or loss, only for positions of perpetual instruments |
| result.realized_profit_loss | number | Realized profit or loss |
| result.settlement_price | number | Optional (not added for spot). Last settlement price for position's instrument 0 if instrument wasn't settled yet |
| result.size | number | Position size for futures size in quote currency (e.g. USD), for options size is in base currency (e.g. BTC) |
| result.size_currency | number | Only for futures, position size in base currency |
| result.theta | number | Only for options, Theta parameter |
| result.total_profit_loss | number | Profit or loss from position |
| result.vega | number | Only for options, Vega parameter |