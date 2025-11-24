# GET /public/get\_tradingview\_chart\_data

Publicly available market data used to generate a TradingView candle chart.

### Parameters

| Parameter | Required | Type | Enum | Description |
| --- | --- | --- | --- | --- |
| instrument_name | true | string | Instrument name |  |
| start_timestamp | true | integer | The earliest timestamp to return result from (milliseconds since the UNIX epoch) |  |
| end_timestamp | true | integer | The most recent timestamp to return result from (milliseconds since the UNIX epoch) |  |
| resolution | true | string | 1 3 5 10 15 30 60 120 180 360 720 1D | Chart bars resolution given in full minutes or keyword 1D (only some specific resolutions are supported) |

### Response

| Name | Type | Description |
| --- | --- | --- |
| id | integer | The id that was sent in the request |
| jsonrpc | string | The JSON-RPC version (2.0) result object |
| result.close | array of number | List of prices at close (one per candle) |
| result.cost | array of number | List of cost bars (volume in quote currency, one per candle) |
| result.high | array of number | List of highest price levels (one per candle) |
| result.low | array of number | List of lowest price levels (one per candle) |
| result.open | array of number | List of prices at open (one per candle) |
| result.status | string | Status of the query: ok or no_data |
| result.ticks | array of integer | Values of the time axis given in milliseconds since UNIX epoch |
| result.volume | array of number | List of volume bars (in base currency, one per candle) |