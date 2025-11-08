## /public/get_instrument

Retrieves information about instrument

### Parameters

| Parameter       | Required | Type   | Enum | Description     |
| --------------- | -------- | ------ | ---- | --------------- |
| instrument_name | true     | string |      | Instrument name |

### Response

| Name                              | Type     | Description                                                                                                                                                           |
| --------------------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id                                | integer  | The id that was sent in the request                                                                                                                                   |
| jsonrpc                           | string   | The JSON-RPC version (2.0)                                                                                                                                            |
| result                            | _object_ |                                                                                                                                                                       |
|   ›  base_currency                | string   | The underlying currency being traded.                                                                                                                                 |
|   ›  block_trade_commission       | number   | Block Trade commission for instrument.                                                                                                                                |
|   ›  block_trade_min_trade_amount | number   | Minimum amount for block trading.                                                                                                                                     |
|   ›  block_trade_tick_size        | number   | Specifies minimal price change for block trading.                                                                                                                     |
|   ›  contract_size                | integer  | Contract size for instrument.                                                                                                                                         |
|   ›  counter_currency             | string   | Counter currency for the instrument.                                                                                                                                  |
|   ›  creation_timestamp           | integer  | The time when the instrument was first created (milliseconds since the UNIX epoch).                                                                                   |
|   ›  expiration_timestamp         | integer  | The time when the instrument will expire (milliseconds since the UNIX epoch).                                                                                         |
|   ›  future_type                  | string   | Future type (only for futures)(field is deprecated and will be removed in the future, `instrument_type` should be used instead).                                      |
|   ›  instrument_id                | integer  | Instrument ID                                                                                                                                                         |
|   ›  instrument_name              | string   | Unique instrument identifier                                                                                                                                          |
|   ›  instrument_type              | string   | Type of the instrument. `linear` or `reversed`                                                                                                                        |
|   ›  is_active                    | boolean  | Indicates if the instrument can currently be traded.                                                                                                                  |
|   ›  kind                         | string   | Instrument kind: `"future"`, `"option"`, `"spot"`, `"future_combo"`, `"option_combo"`                                                                                 |
|   ›  maker_commission             | number   | Maker commission for instrument.                                                                                                                                      |
|   ›  max_leverage                 | integer  | Maximal leverage for instrument (only for futures).                                                                                                                   |
|   ›  max_liquidation_commission   | number   | Maximal liquidation trade commission for instrument (only for futures).                                                                                               |
|   ›  min_trade_amount             | number   | Minimum amount for trading. For perpetual and inverse futures the amount is in USD units. For options and linear futures and it is the underlying base currency coin. |
|   ›  option_type                  | string   | The option type (only for options).                                                                                                                                   |
|   ›  price_index                  | string   | Name of price index that is used for this instrument                                                                                                                  |
|   ›  quote_currency               | string   | The currency in which the instrument prices are quoted.                                                                                                               |
|   ›  settlement_currency          | string   | Optional (not added for spot). Settlement currency for the instrument.                                                                                                |
|   ›  settlement_period            | string   | Optional (not added for spot). The settlement period.                                                                                                                 |
|   ›  strike                       | number   | The strike value (only for options).                                                                                                                                  |
|   ›  taker_commission             | number   | Taker commission for instrument.                                                                                                                                      |
|   ›  tick_size                    | number   | Specifies minimal price change and, as follows, the number of decimal places for instrument prices.                                                                   |
|   ›  tick_size_steps              | _object_ |                                                                                                                                                                       |
|   ›    ›  above_price             | number   | The price from which the increased tick size applies                                                                                                                  |
|   ›    ›  tick_size               | number   | Tick size to be used above the price. It must be multiple of the minimum tick size.                                                                                   |
