## /private/create_block_rfq

**Taker method**

This method creates a new Block RFQ.

**Block RFQ pre-allocation:** The taker can split the total amount between
different (sub)accounts using the `trade_allocations` parameter. The taker can
also allocate to himself. Each allocation must specify either `user_id` (for
direct allocation) or `client_info` object (for broker allocation), and
`amount`.

**📖 Related Support Article:**
[Deribit Block RFQ API walkthrough](https://support.deribit.com/hc/en-us/articles/25951393746589-Deribit-Block-RFQ-API-walkthrough)

**Scope:** `block_rfq:read_write`

This is a private method; it can only be used after authentication.

### Parameters

| Parameter                 | Required                  | Type             | Enum  | Description                                                                                                                                                                                                                                                    |
| ------------------------- | ------------------------- | ---------------- | ----- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| legs                      | true                      | array of objects |       | List of legs used to create Block RFQ                                                                                                                                                                                                                          |
|   ›  instrument_name      | true                      | string           |       | Instrument name                                                                                                                                                                                                                                                |
|   ›  amount               | true                      | number           |       | It represents the requested trade size. For perpetual and inverse futures the amount is in USD units. For options and linear futures and it is the underlying base currency coin.                                                                              |
|   ›  direction            | true                      | string           | `buy` |
| `sell`                    | Direction of selected leg |
| trade_allocations         | false                     | array of objects |       | List of allocations for Block RFQ pre-allocation. Allows to split amount between different (sub)accounts or broker clients. Each allocation must specify either `user_id` (for direct allocation) or `client_info` object (for broker allocation), and amount. |
|   ›  user_id              | false                     | integer          |       | User ID (subaccount or main account) to allocate part of the RFQ amount.                                                                                                                                                                                       |
|   ›  client_info          | false                     | object           |       | Client allocation info for brokers.                                                                                                                                                                                                                            |
|   ›    ›  client_id       | false                     | integer          |       | ID of a client; available to broker. Represents a group of users under a common name.                                                                                                                                                                          |
|   ›    ›  client_link_id  | false                     | integer          |       | ID assigned to a single user in a client; available to broker.                                                                                                                                                                                                 |
|   ›  amount               | false                     | number           |       | Amount allocated to this user or client.                                                                                                                                                                                                                       |
| hedge                     | false                     | object           |       | Hedge leg of the Block RFQ. There is only one hedge leg allowed per Block RFQ                                                                                                                                                                                  |
|   ›    ›  instrument_name | true                      | string           |       | Instrument name                                                                                                                                                                                                                                                |
|   ›    ›  direction       | true                      | string           | `buy` |
| `sell`                    | Direction of selected leg |
|   ›    ›  price           | true                      | number           |       | Hedge leg price                                                                                                                                                                                                                                                |
|   ›    ›  amount          | true                      | number           |       | It represents the requested trade size. For perpetual and inverse futures the amount is in USD units. For options and linear futures and it is the underlying base currency coin.                                                                              |
| label                     | false                     | string           |       | User defined label for the Block RFQ (maximum 64 characters)                                                                                                                                                                                                   |
| makers                    | false                     | array            |       | List of targeted Block RFQ makers. Only those makers will be notified about created Block RFQ. If the list is empty, all available makers will be targeted.                                                                                                    |
| disclosed                 | false                     | boolean          |       | Determines whether the RFQ is non-anonymous, revealing both taker and maker aliases. It can be set to `false` (anonymous mode) only when at least 5 makers are targeted. Default value is `true`.                                                              |

### Response

| Name                            | Type              | Description                                                                                                     |
| ------------------------------- | ----------------- | --------------------------------------------------------------------------------------------------------------- |
| id                              | integer           | The id that was sent in the request                                                                             |
| jsonrpc                         | string            | The JSON-RPC version (2.0)                                                                                      |
| result                          | _object_          |                                                                                                                 |
|   ›  amount                     | number            | This value multiplied by the ratio of a leg gives trade size on that leg.                                       |
|   ›  app_name                   | string            | The name of the application that created the Block RFQ on behalf of the user (optional, visible only to taker). |
|   ›  asks                       | array of _object_ |                                                                                                                 |
|   ›    ›  amount                | number            | This value multiplied by the ratio of a leg gives trade size on that leg.                                       |
|   ›    ›  execution_instruction | string            |

Execution instruction of the quote. Default - `any_part_of`

- `"all_or_none (AON)"` - The quote can only be filled entirely or not at all,
  ensuring that its amount matches the amount specified in the Block RFQ.
  Additionally, 'all_or_none' quotes have priority over 'any_part_of' quotes at
  the same price level.
- `"any_part_of (APO)"` - The quote can be filled either partially or fully,
  with the filled amount potentially being less than the Block RFQ amount.

| |   ›    ›  expires*at | integer | The timestamp when the quote expires
(milliseconds since the Unix epoch), equal to the earliest expiry of placed
quotes | |   ›    ›  last_update_timestamp | integer | Timestamp of the last
update of the quote (milliseconds since the UNIX epoch) | |   ›    ›  makers |
array of string | Maker of the quote | |   ›    ›  price | number | Price of a
quote | |   ›  bids | array of \_object* | | |   ›    ›  amount | number | This
value multiplied by the ratio of a leg gives trade size on that leg. | |
  ›    ›  execution_instruction | string |

Execution instruction of the quote. Default - `any_part_of`

- `"all_or_none (AON)"` - The quote can only be filled entirely or not at all,
  ensuring that its amount matches the amount specified in the Block RFQ.
  Additionally, 'all_or_none' quotes have priority over 'any_part_of' quotes at
  the same price level.
- `"any_part_of (APO)"` - The quote can be filled either partially or fully,
  with the filled amount potentially being less than the Block RFQ amount.

| |   ›    ›  expires*at | integer | The timestamp when the quote expires
(milliseconds since the Unix epoch), equal to the earliest expiry of placed
quotes | |   ›    ›  last_update_timestamp | integer | Timestamp of the last
update of the quote (milliseconds since the UNIX epoch) | |   ›    ›  makers |
array of string | Maker of the quote | |   ›    ›  price | number | Price of a
quote | |   ›  block_rfq_id | integer | ID of the Block RFQ | |   ›  combo_id |
string | Unique combo identifier | |   ›  creation_timestamp | integer | The
timestamp when Block RFQ was created (milliseconds since the Unix epoch) | |
  ›  disclosed | boolean | Indicates whether the RFQ was created as
non-anonymous, meaning taker and maker aliases are visible to counterparties. |
|   ›  expiration_timestamp | integer | The timestamp when the Block RFQ will
expire (milliseconds since the UNIX epoch) | |   ›  hedge | \_object* | | |
  ›    ›  amount | integer | It represents the requested hedge leg size. For
perpetual and inverse futures the amount is in USD units. For options and linear
futures and it is the underlying base currency coin. | |   ›    ›  direction |
string | Direction: `buy`, or `sell` | |   ›    ›  instrument*name | string |
Unique instrument identifier | |   ›    ›  price | number | Price for a hedge
leg | |   ›  included_in_taker_rating | boolean | Indicates whether the RFQ is
included in the taker's rating calculation. Present only for closed RFQs created
by the requesting taker. | |   ›  index_prices | array of number | A list of
index prices for the underlying instrument(s) at the time of trade execution. |
|   ›  label | string | User defined label for the Block RFQ (maximum 64
characters) | |   ›  legs | array of \_object* | | |   ›    ›  direction |
string | Direction: `buy`, or `sell` | |   ›    ›  instrument*name | string |
Unique instrument identifier | |   ›    ›  ratio | integer | Ratio of amount
between legs | |   ›  makers | array of string | List of targeted Block RFQ
makers | |   ›  mark_price | number | The mark price for the instrument | |
  ›  min_trade_amount | number | Minimum amount for trading | |   ›  role |
string | Role of the user in Block RFQ | |   ›  state | string | State of the
Block RFQ | |   ›  taker | string | Taker alias. Present only when `disclosed`
is `true`. | |   ›  taker_rating | string | Rating of the taker | |
  ›  trade_allocations | array of \_object* | List of allocations for Block RFQ
pre-allocation. Allows to split amount between different (sub)accounts or broker
clients. Each allocation must specify either `user_id` (for direct allocation)
or `client_info` object (for broker allocation), and amount. Visible only to the
taker. | |   ›    ›  amount | number | Amount allocated to this user or client.
| |   ›    ›  client*info | \_object* | Client allocation info for brokers. | |
  ›    ›    ›  client*id | integer | ID of a client; available to broker.
Represents a group of users under a common name. | |
  ›    ›    ›  client_link_id | integer | ID assigned to a single user in a
client; available to broker. | |   ›    ›    ›  name | string | Name of the
linked user within the client; available to broker. | |   ›    ›  user_id |
integer | User ID to allocate part of the RFQ amount. For brokers the User ID is
obstructed. | |   ›  trade_trigger | \_object* | Contains information about the
trade trigger state | |   ›    ›  cancel*reason | string | Reason for
cancellation, present only when state is cancelled | |   ›    ›  direction |
string | Direction of the trade trigger | |   ›    ›  price | number | Price of
the trade trigger | |   ›    ›  state | string | Trade trigger state:
`"untriggered"` or `"cancelled"` | |   ›  trades | array of \_object* | | |
  ›    ›  amount | number | Trade amount. For options, linear futures, linear
perpetuals and spots the amount is denominated in the underlying base currency
coin. The inverse perpetuals and inverse futures are denominated in USD units. |
|   ›    ›  direction | string | Direction: `buy`, or `sell` | |
  ›    ›  hedge_amount | number | Amount of the hedge leg. For linear futures,
linear perpetuals and spots the amount is denominated in the underlying base
currency coin. The inverse perpetuals and inverse futures are denominated in USD
units. | |   ›    ›  maker | string | Alias of the maker (optional) | |
  ›    ›  price | number | Price in base currency |
