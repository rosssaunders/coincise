## /private/edit_block_rfq_quote

**Maker method**

This method edits a Block RFQ quote using the specified `block_rfq_quote_id`.
Alternatively, user can use a combination of `block_rfq_id` and `label` to edit
the quote.

**Scope:** `block_rfq:read_write`

This is a private method; it can only be used after authentication.

### Parameters

| Parameter                 | Required                                                                                      | Type             | Enum  | Description                                                                                                                                                                       |
| ------------------------- | --------------------------------------------------------------------------------------------- | ---------------- | ----- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| legs                      | true                                                                                          | array of objects |       | List of legs used for Block RFQ quote                                                                                                                                             |
|   ›  instrument_name      | true                                                                                          | string           |       | Instrument name                                                                                                                                                                   |
|   ›  price                | true                                                                                          | number           |       | Price for trade                                                                                                                                                                   |
|   ›  ratio                | true                                                                                          | integer          |       | Ratio of amount between legs                                                                                                                                                      |
|   ›  direction            | true                                                                                          | string           | `buy` |
| `sell`                    | Direction of selected leg. Must match the direction of the corresponding leg in the Block RFQ |
| amount                    | true                                                                                          | number           |       | This value multiplied by the ratio of a leg gives trade size on that leg.                                                                                                         |
| block_rfq_quote_id        | false                                                                                         | integer          |       | ID of the Block RFQ quote                                                                                                                                                         |
| label                     | false                                                                                         | string           |       | User defined label for the Block RFQ quote (maximum 64 characters). Used to identify quotes of a selected Block RFQ                                                               |
| hedge                     | false                                                                                         | object           |       | Hedge leg of the Block RFQ. There is only one hedge leg allowed per Block RFQ                                                                                                     |
|   ›    ›  instrument_name | true                                                                                          | string           |       | Instrument name                                                                                                                                                                   |
|   ›    ›  direction       | true                                                                                          | string           | `buy` |
| `sell`                    | Direction of selected leg. Must match the direction of the corresponding leg in the Block RFQ |
|   ›    ›  price           | true                                                                                          | number           |       | Hedge leg price                                                                                                                                                                   |
|   ›    ›  amount          | true                                                                                          | number           |       | It represents the requested trade size. For perpetual and inverse futures the amount is in USD units. For options and linear futures and it is the underlying base currency coin. |
| block_rfq_id              | false                                                                                         | integer          |       | ID of the Block RFQ                                                                                                                                                               |
| price                     | false                                                                                         | number           |       | Aggregated price used for quoting future spreads.                                                                                                                                 |

### Response

| Name                       | Type     | Description                                                                         |
| -------------------------- | -------- | ----------------------------------------------------------------------------------- |
| id                         | integer  | The id that was sent in the request                                                 |
| jsonrpc                    | string   | The JSON-RPC version (2.0)                                                          |
| result                     | _object_ |                                                                                     |
|   ›  amount                | number   | This value multiplied by the ratio of a leg gives trade size on that leg.           |
|   ›  app_name              | string   | The name of the application that placed the quote on behalf of the user (optional). |
|   ›  block_rfq_id          | integer  | ID of the Block RFQ                                                                 |
|   ›  block_rfq_quote_id    | integer  | ID of the Block RFQ quote                                                           |
|   ›  creation_timestamp    | integer  | The timestamp when quote was created (milliseconds since the Unix epoch)            |
|   ›  direction             | string   | Direction of trade from the maker perspective                                       |
|   ›  execution_instruction | string   |

Execution instruction of the quote. Default - `any_part_of`

- `"all_or_none (AON)"` - The quote can only be filled entirely or not at all,
  ensuring that its amount matches the amount specified in the Block RFQ.
  Additionally, 'all_or_none' quotes have priority over 'any_part_of' quotes at
  the same price level.
- `"any_part_of (APO)"` - The quote can be filled either partially or fully,
  with the filled amount potentially being less than the Block RFQ amount.

| |   ›  filled_amount | number | Filled amount of the quote. For perpetual and
futures the filled_amount is in USD units, for options - in units or
corresponding cryptocurrency contracts, e.g., BTC or ETH. | |   ›  hedge |
_object_ | | |   ›    ›  amount | integer | It represents the requested hedge
leg size. For perpetual and inverse futures the amount is in USD units. For
options and linear futures and it is the underlying base currency coin. | |
  ›    ›  direction | string | Direction: `buy`, or `sell` | |
  ›    ›  instrument_name | string | Unique instrument identifier | |
  ›    ›  price | number | Price for a hedge leg | |   ›  label | string | User
defined label for the quote (maximum 64 characters) | |
  ›  last_update_timestamp | integer | Timestamp of the last update of the quote
(milliseconds since the UNIX epoch) | |   ›  legs | array of _object_ | | |
  ›    ›  direction | string | Direction: `buy`, or `sell` | |
  ›    ›  instrument_name | string | Unique instrument identifier | |
  ›    ›  price | number | Price for a leg | |   ›    ›  ratio | integer | Ratio
of amount between legs | |   ›  price | number | Price of a quote | |
  ›  quote_state | string | State of the quote | |   ›  quote_state_reason |
string | Reason of quote cancellation | |   ›  replaced | boolean | `true` if
the quote was edited, otherwise `false`. |
