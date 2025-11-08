## /private/create_combo

Verifies and creates a combo book or returns an existing combo matching given
trades

**Scope:** `trade:read_write`

This is a private method; it can only be used after authentication.

This is a matching engine method.

### Parameters

| Parameter            | Required                                      | Type             | Enum  | Description                                                                                                                                                                       |
| -------------------- | --------------------------------------------- | ---------------- | ----- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| trades               | true                                          | array of objects |       | List of trades used to create a combo                                                                                                                                             |
|   ›  instrument_name | true                                          | string           |       | Instrument name                                                                                                                                                                   |
|   ›  amount          | false                                         | number           |       | It represents the requested trade size. For perpetual and inverse futures the amount is in USD units. For options and linear futures and it is the underlying base currency coin. |
|   ›  direction       | true                                          | string           | `buy` |
| `sell`               | Direction of trade from the maker perspective |

### Response

| Name                      | Type              | Description                                                                                                                                         |
| ------------------------- | ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| id                        | integer           | The id that was sent in the request                                                                                                                 |
| jsonrpc                   | string            | The JSON-RPC version (2.0)                                                                                                                          |
| result                    | _object_          |                                                                                                                                                     |
|   ›  creation_timestamp   | integer           | The timestamp (milliseconds since the Unix epoch)                                                                                                   |
|   ›  id                   | string            | Unique combo identifier                                                                                                                             |
|   ›  instrument_id        | integer           | Instrument ID                                                                                                                                       |
|   ›  legs                 | array of _object_ |                                                                                                                                                     |
|   ›    ›  amount          | integer           | Size multiplier of a leg. A negative value indicates that the trades on given leg are in opposite direction to the combo trades they originate from |
|   ›    ›  instrument_name | string            | Unique instrument identifier                                                                                                                        |
|   ›  state                | string            | Combo state: `"active"`, "`inactive`"                                                                                                               |
|   ›  state_timestamp      | integer           | The timestamp (milliseconds since the Unix epoch)                                                                                                   |
