# GET /public/get\_instruments

Retrieves available trading instruments. This method can be used to see which instruments are available for trading, or which instruments have recently expired. **Note - This endpoint has distinct API rate limiting requirements:** 1 request per 10 seconds, with a burst of 5. To avoid rate limits, we recommend using either the REST requests for server-cached data or the WebSocket subscription to [instrument\_state.{kind}.{currency}](https://docs.deribit.com/#instrument-state-kind-currency) for real-time updates. For more information, see [Rate Limits](https://support.deribit.com/hc/en-us/articles/25944617523357-Rate-Limits).

### Parameters

| Parameter | Required | Type | Enum | Description |
| --- | --- | --- | --- | --- |
| currency | true | string | BTC ETH USDC USDT EURR any | The currency symbol or "any" for all |
| kind | false | string | future option spot future_combo option_combo | Instrument kind, if not provided instruments of all kinds are considered |
| expired | false | boolean | Set to true to show recently expired instruments instead of active ones. |  |

### Response

| Name | Type | Description |
| --- | --- | --- |
| id | integer | The id that was sent in the request |
| jsonrpc | string | The JSON-RPC version (2.0) result array of object |
| result[].base_currency | string | The underlying currency being traded. |
| result[].block_trade_commission | number | Block Trade commission for instrument. |
| result[].block_trade_min_trade_amount | number | Minimum amount for block trading. |
| result[].block_trade_tick_size | number | Specifies minimal price change for block trading. |
| result[].contract_size | integer | Contract size for instrument. |
| result[].counter_currency | string | Counter currency for the instrument. |
| result[].creation_timestamp | integer | The time when the instrument was first created (milliseconds since the UNIX epoch). |
| result[].expiration_timestamp | integer | The time when the instrument will expire (milliseconds since the UNIX epoch). |
| result[].future_type | string | Future type (only for futures)(field is deprecated and will be removed in the future, instrument_type should be used instead). |
| result[].instrument_id | integer | Instrument ID |
| result[].instrument_name | string | Unique instrument identifier |
| result[].instrument_type | string | Type of the instrument. linear or reversed |
| result[].is_active | boolean | Indicates if the instrument can currently be traded. |
| result[].kind | string | Instrument kind: "future", "option", "spot", "future_combo", "option_combo" |
| result[].maker_commission | number | Maker commission for instrument. |
| result[].max_leverage | integer | Maximal leverage for instrument (only for futures). |
| result[].max_liquidation_commission | number | Maximal liquidation trade commission for instrument (only for futures). |
| result[].min_trade_amount | number | Minimum amount for trading. For perpetual and inverse futures the amount is in USD units. For options and linear futures and it is the underlying base currency coin. |
| result[].option_type | string | The option type (only for options). |
| result[].price_index | string | Name of price index that is used for this instrument |
| result[].quote_currency | string | The currency in which the instrument prices are quoted. |
| result[].settlement_currency | string | Optional (not added for spot). Settlement currency for the instrument. |
| result[].settlement_period | string | Optional (not added for spot). The settlement period. |
| result[].strike | number | The strike value (only for options). |
| result[].taker_commission | number | Taker commission for instrument. |
| result[].tick_size | number | Specifies minimal price change and, as follows, the number of decimal places for instrument prices. result[].tick_size_steps object |
| result[].tick_size_steps.above_price | number | The price from which the increased tick size applies |
| result[].tick_size_steps.tick_size | number | Tick size to be used above the price. It must be multiple of the minimum tick size. |