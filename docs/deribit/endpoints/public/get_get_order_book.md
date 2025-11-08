## /public/get_order_book

Retrieves the order book, along with other market values for a given instrument.

### Parameters

| Parameter       | Required | Type    | Enum | Description                                                                                                                                   |
| --------------- | -------- | ------- | ---- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| instrument_name | true     | string  |      | The instrument name for which to retrieve the order book, see [`public/get_instruments`](#public-get_instruments) to obtain instrument names. |
| depth           | false    | integer | `1`  |

`5`  
`10`  
`20`  
`50`  
`100`  
`1000`  
`10000` | The number of entries to return for bids and asks, maximum - `10000`.
|

### Response

| Name                   | Type                       | Description                                                                                                                                                                                                            |
| ---------------------- | -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id                     | integer                    | The id that was sent in the request                                                                                                                                                                                    |
| jsonrpc                | string                     | The JSON-RPC version (2.0)                                                                                                                                                                                             |
| result                 | _object_                   |                                                                                                                                                                                                                        |
|   ›  ask_iv            | number                     | (Only for option) implied volatility for best ask                                                                                                                                                                      |
|   ›  asks              | array of \[price, amount\] | List of asks                                                                                                                                                                                                           |
|   ›  best_ask_amount   | number                     | It represents the requested order size of all best asks                                                                                                                                                                |
|   ›  best_ask_price    | number                     | The current best ask price, `null` if there aren't any asks                                                                                                                                                            |
|   ›  best_bid_amount   | number                     | It represents the requested order size of all best bids                                                                                                                                                                |
|   ›  best_bid_price    | number                     | The current best bid price, `null` if there aren't any bids                                                                                                                                                            |
|   ›  bid_iv            | number                     | (Only for option) implied volatility for best bid                                                                                                                                                                      |
|   ›  bids              | array of \[price, amount\] | List of bids                                                                                                                                                                                                           |
|   ›  current_funding   | number                     | Current funding (perpetual only)                                                                                                                                                                                       |
|   ›  delivery_price    | number                     | The settlement price for the instrument. Only when `state = closed`                                                                                                                                                    |
|   ›  funding_8h        | number                     | Funding 8h (perpetual only)                                                                                                                                                                                            |
|   ›  greeks            | _object_                   | Only for options                                                                                                                                                                                                       |
|   ›    ›  delta        | number                     | (Only for option) The delta value for the option                                                                                                                                                                       |
|   ›    ›  gamma        | number                     | (Only for option) The gamma value for the option                                                                                                                                                                       |
|   ›    ›  rho          | number                     | (Only for option) The rho value for the option                                                                                                                                                                         |
|   ›    ›  theta        | number                     | (Only for option) The theta value for the option                                                                                                                                                                       |
|   ›    ›  vega         | number                     | (Only for option) The vega value for the option                                                                                                                                                                        |
|   ›  index_price       | number                     | Current index price                                                                                                                                                                                                    |
|   ›  instrument_name   | string                     | Unique instrument identifier                                                                                                                                                                                           |
|   ›  interest_rate     | number                     | Interest rate used in implied volatility calculations (options only)                                                                                                                                                   |
|   ›  last_price        | number                     | The price for the last trade                                                                                                                                                                                           |
|   ›  mark_iv           | number                     | (Only for option) implied volatility for mark price                                                                                                                                                                    |
|   ›  mark_price        | number                     | The mark price for the instrument                                                                                                                                                                                      |
|   ›  max_price         | number                     | The maximum price for the future. Any buy orders you submit higher than this price, will be clamped to this maximum.                                                                                                   |
|   ›  min_price         | number                     | The minimum price for the future. Any sell orders you submit lower than this price will be clamped to this minimum.                                                                                                    |
|   ›  open_interest     | number                     | The total amount of outstanding contracts in the corresponding amount units. For perpetual and inverse futures the amount is in USD units. For options and linear futures and it is the underlying base currency coin. |
|   ›  settlement_price  | number                     | Optional (not added for spot). The settlement price for the instrument. Only when `state = open`                                                                                                                       |
|   ›  state             | string                     | The state of the order book. Possible values are `open` and `closed`.                                                                                                                                                  |
|   ›  stats             | _object_                   |                                                                                                                                                                                                                        |
|   ›    ›  high         | number                     | Highest price during 24h                                                                                                                                                                                               |
|   ›    ›  low          | number                     | Lowest price during 24h                                                                                                                                                                                                |
|   ›    ›  price_change | number                     | 24-hour price change expressed as a percentage, `null` if there weren't any trades                                                                                                                                     |
|   ›    ›  volume       | number                     | Volume during last 24h in base currency                                                                                                                                                                                |
|   ›    ›  volume_usd   | number                     | Volume in usd (futures only)                                                                                                                                                                                           |
|   ›  timestamp         | integer                    | The timestamp (milliseconds since the Unix epoch)                                                                                                                                                                      |
|   ›  underlying_index  | number                     | Name of the underlying future, or `index_price` (options only)                                                                                                                                                         |
|   ›  underlying_price  | number                     | Underlying price for implied volatility calculations (options only)                                                                                                                                                    |
