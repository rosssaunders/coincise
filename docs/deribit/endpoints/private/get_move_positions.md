# GET /private/move\_positions

Moves positions from source subaccount to target subaccount

**Note:**  
In rare cases, the request may return an `internal_server_error`. This does not necessarily mean the operation failed entirely. Part or all of the position transfer might have still been processed successfully.

**Scope:** `trade:read_write`

This is a private method; it can only be used after authentication.

This is a matching engine method.

### Parameters

| Parameter | Required | Type | Enum | Description |
| --- | --- | --- | --- | --- |
| currency | false | string | BTC ETH USDC USDT EURR | The currency symbol |
| source_uid | true | integer | Id of source subaccount. Can be found in My Account >> Subaccounts tab |  |
| target_uid | true | integer | Id of target subaccount. Can be found in My Account >> Subaccounts tab |  |
| trades | true | array of objects | List of trades for position move |  |
| trades[].instrument_name | true | string | Instrument name |  |
| trades[].price | false | number | Price for trade - if not provided average price of the position is used |  |
| trades[].amount | true | number | It represents the requested trade size. For perpetual and inverse futures the amount is in USD units. For options and linear futures and it is the underlying base currency coin. Amount can't exceed position size. |  |

### Response

| Name | Type | Description |
| --- | --- | --- |
| id | integer | The id that was sent in the request |
| jsonrpc | string | The JSON-RPC version (2.0) result object result.trades array of object |
| result.trades[].amount | number | Trade amount. For perpetual and inverse futures the amount is in USD units. For options and linear futures and it is the underlying base currency coin. |
| result.trades[].direction | string | Direction: buy, or sell |
| result.trades[].instrument_name | string | Unique instrument identifier |
| result.trades[].price | number | Price in base currency |
| result.trades[].source_uid | integer | Trade source uid |
| result.trades[].target_uid | integer | Trade target uid |