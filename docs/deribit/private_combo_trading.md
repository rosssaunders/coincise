# Deribit Private Combo Trading Documentation

# Combo Books

## /public/get_combo_details

Retrieves information about a combo

### Parameters

| Parameter | Required | Type   | Enum | Description |
| --------- | -------- | ------ | ---- | ----------- |
| combo_id  | true     | string |      | Combo ID    |

### Response

| Name                                                              | Type                     | Description                                                                                                                                         |
| ----------------------------------------------------------------- | ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| id                                                                | integer                  | The id that was sent in the request                                                                                                                 |
| jsonrpc                                                           | string                   | The JSON-RPC version (2.0)                                                                                                                          |
| result                                                            | <em>object</em>          |
| &nbsp;&nbsp;›&nbsp;&nbsp;creation_timestamp                       | integer                  | The timestamp (milliseconds since the Unix epoch)                                                                                                   |
| &nbsp;&nbsp;›&nbsp;&nbsp;id                                       | string                   | Unique combo identifier                                                                                                                             |
| &nbsp;&nbsp;›&nbsp;&nbsp;instrument_id                            | integer                  | Instrument ID                                                                                                                                       |
| &nbsp;&nbsp;›&nbsp;&nbsp;legs                                     | array of <em>object</em> |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;amount          | integer                  | Size multiplier of a leg. A negative value indicates that the trades on given leg are in opposite direction to the combo trades they originate from |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;instrument_name | string                   | Unique instrument identifier                                                                                                                        |
| &nbsp;&nbsp;›&nbsp;&nbsp;state                                    | string                   | Combo state: <code>"active"</code>, "<code>inactive</code>"                                                                                         |
| &nbsp;&nbsp;›&nbsp;&nbsp;state_timestamp                          | integer                  | The timestamp (milliseconds since the Unix epoch)                                                                                                   |

## /public/get_combo_ids

Retrieves available combos. This method can be used to get the list of all
combos, or only the list of combos in the given state.

### Parameters

| Parameter | Required | Type   | Enum                                                                                                | Description                                                      |
| --------- | -------- | ------ | --------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| currency  | true     | string | <code>BTC</code><br><code>ETH</code><br><code>USDC</code><br><code>USDT</code><br><code>EURR</code> | The currency symbol                                              |
| state     | false    | string | <code>active</code><br><code>inactive</code>                                                        | Combo state, if not provided combos of all states are considered |

### Response

| Name    | Type            | Description                         |
| ------- | --------------- | ----------------------------------- |
| id      | integer         | The id that was sent in the request |
| jsonrpc | string          | The JSON-RPC version (2.0)          |
| result  | array of string | Unique combo identifier             |

## /public/get_combos

Retrieves information about active combos

### Parameters

| Parameter | Required | Type   | Enum                                                                                                                    | Description                                       |
| --------- | -------- | ------ | ----------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| currency  | true     | string | <code>BTC</code><br><code>ETH</code><br><code>USDC</code><br><code>USDT</code><br><code>EURR</code><br><code>any</code> | The currency symbol or <code>"any"</code> for all |

### Response

| Name                                                              | Type                     | Description                                                                                                                                         |
| ----------------------------------------------------------------- | ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| id                                                                | integer                  | The id that was sent in the request                                                                                                                 |
| jsonrpc                                                           | string                   | The JSON-RPC version (2.0)                                                                                                                          |
| result                                                            | array of <em>object</em> |
| &nbsp;&nbsp;›&nbsp;&nbsp;creation_timestamp                       | integer                  | The timestamp (milliseconds since the Unix epoch)                                                                                                   |
| &nbsp;&nbsp;›&nbsp;&nbsp;id                                       | string                   | Unique combo identifier                                                                                                                             |
| &nbsp;&nbsp;›&nbsp;&nbsp;instrument_id                            | integer                  | Instrument ID                                                                                                                                       |
| &nbsp;&nbsp;›&nbsp;&nbsp;legs                                     | array of <em>object</em> |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;amount          | integer                  | Size multiplier of a leg. A negative value indicates that the trades on given leg are in opposite direction to the combo trades they originate from |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;instrument_name | string                   | Unique instrument identifier                                                                                                                        |
| &nbsp;&nbsp;›&nbsp;&nbsp;state                                    | string                   | Combo state: <code>"active"</code>, "<code>inactive</code>"                                                                                         |
| &nbsp;&nbsp;›&nbsp;&nbsp;state_timestamp                          | integer                  | The timestamp (milliseconds since the Unix epoch)                                                                                                   |

## /private/create_combo

Verifies and creates a combo book or returns an existing combo matching given
trades

**Scope:** `trade:read_write`

This is a private method; it can only be used after authentication.

This is a matching engine method.

### Parameters

| Parameter                                | Required | Type             | Enum                                  | Description                                                                                                                                                                       |
| ---------------------------------------- | -------- | ---------------- | ------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| trades                                   | true     | array of objects |                                       | List of trades used to create a combo                                                                                                                                             |
| &nbsp;&nbsp;›&nbsp;&nbsp;instrument_name | true     | string           |                                       | Instrument name                                                                                                                                                                   |
| &nbsp;&nbsp;›&nbsp;&nbsp;amount          | false    | number           |                                       | It represents the requested trade size. For perpetual and inverse futures the amount is in USD units. For options and linear futures and it is the underlying base currency coin. |
| &nbsp;&nbsp;›&nbsp;&nbsp;direction       | true     | string           | <code>buy</code><br><code>sell</code> | Direction of trade from the maker perspective                                                                                                                                     |

### Response

| Name                                                              | Type                     | Description                                                                                                                                         |
| ----------------------------------------------------------------- | ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| id                                                                | integer                  | The id that was sent in the request                                                                                                                 |
| jsonrpc                                                           | string                   | The JSON-RPC version (2.0)                                                                                                                          |
| result                                                            | <em>object</em>          |
| &nbsp;&nbsp;›&nbsp;&nbsp;creation_timestamp                       | integer                  | The timestamp (milliseconds since the Unix epoch)                                                                                                   |
| &nbsp;&nbsp;›&nbsp;&nbsp;id                                       | string                   | Unique combo identifier                                                                                                                             |
| &nbsp;&nbsp;›&nbsp;&nbsp;instrument_id                            | integer                  | Instrument ID                                                                                                                                       |
| &nbsp;&nbsp;›&nbsp;&nbsp;legs                                     | array of <em>object</em> |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;amount          | integer                  | Size multiplier of a leg. A negative value indicates that the trades on given leg are in opposite direction to the combo trades they originate from |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;instrument_name | string                   | Unique instrument identifier                                                                                                                        |
| &nbsp;&nbsp;›&nbsp;&nbsp;state                                    | string                   | Combo state: <code>"active"</code>, "<code>inactive</code>"                                                                                         |
| &nbsp;&nbsp;›&nbsp;&nbsp;state_timestamp                          | integer                  | The timestamp (milliseconds since the Unix epoch)                                                                                                   |

## /private/get_leg_prices

This method returns individual leg prices for a given combo structure based on
an aggregated price of the strategy and the mark prices of the individual legs.
Please note that leg prices change dynamically with mark price fluctuations, and
the algorithm is calibrated only for conventional option structures and future
spreads. This method supports both inverse strategies and known linear
structures within a single currency pair.

This is a private method; it can only be used after authentication.

### Parameters

| Parameter                                | Required | Type             | Enum                                  | Description                                                                                                                                                                       |
| ---------------------------------------- | -------- | ---------------- | ------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| legs                                     | true     | array of objects |                                       | List of legs for which the prices will be calculated                                                                                                                              |
| &nbsp;&nbsp;›&nbsp;&nbsp;instrument_name | true     | string           |                                       | Instrument name                                                                                                                                                                   |
| &nbsp;&nbsp;›&nbsp;&nbsp;amount          | true     | number           |                                       | It represents the requested trade size. For perpetual and inverse futures the amount is in USD units. For options and linear futures and it is the underlying base currency coin. |
| &nbsp;&nbsp;›&nbsp;&nbsp;direction       | true     | string           | <code>buy</code><br><code>sell</code> | Direction of selected leg                                                                                                                                                         |
| price                                    | true     | number           |                                       | Price for the whole leg structure                                                                                                                                                 |

### Response

| Name                                                              | Type                     | Description                                                               |
| ----------------------------------------------------------------- | ------------------------ | ------------------------------------------------------------------------- |
| id                                                                | integer                  | The id that was sent in the request                                       |
| jsonrpc                                                           | string                   | The JSON-RPC version (2.0)                                                |
| result                                                            | <em>object</em>          |
| &nbsp;&nbsp;›&nbsp;&nbsp;amount                                   | number                   | This value multiplied by the ratio of a leg gives trade size on that leg. |
| &nbsp;&nbsp;›&nbsp;&nbsp;legs                                     | array of <em>object</em> |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;direction       | string                   | Direction: <code>buy</code>, or <code>sell</code>                         |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;instrument_name | string                   | Unique instrument identifier                                              |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;price           | number                   | Price for a leg                                                           |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;ratio           | integer                  | Ratio of amount between legs                                              |
