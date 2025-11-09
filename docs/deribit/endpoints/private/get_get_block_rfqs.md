## /private/get_block_rfqs

This method returns a list of Block RFQs that were either created by the user or
assigned to them as a maker, sorted in descending order. `trades` and
`mark_price` are only visible for the filled Block RFQ. When a `block_rfq_id` is
specified, only that particular Block RFQ will be returned. If called by a
`taker`, response will additionally include `makers` list and `label` if
previously provided. If called by the `maker`, the `trades` will include the
maker's alias, but only for trades in which this maker participated. Can be
optionally filtered by currency.

**Scope:** `block_rfq:read`

This is a private method; it can only be used after authentication.

### Parameters

| Parameter | Required | Type    | Enum   | Description                                    |
| --------- | -------- | ------- | ------ | ---------------------------------------------- |
| count     | false    | integer |        | Count of Block RFQs returned, maximum - `1000` |
| state     | false    | string  | `open` |

`filled`  
`traded`  
`cancelled`  
`expired`  
`closed` | State of Block RFQ | | role | false | string | `any`  
`taker`  
`maker` | Role of the user in Block RFQ. When the `any` role is selected, the
method returns all Block RFQs in which the user has participated, either as the
`taker` or as a `maker` | | continuation | false | integer | | The continuation
parameter specifies the starting point for fetching historical Block RFQs. When
provided, the endpoint returns Block RFQs, starting from the specified ID and
continuing backward (e.g., if `continuation` is 50, results will include Block
RFQs of ID 49, 48, etc.) | | block_rfq_id | false | integer | | ID of the Block
RFQ | | currency | false | string | `BTC`  
`ETH`  
`USDC`  
`USDT`  
`any` | The currency symbol |

### Response

| Name                                 | Type              | Description                                                                                                     |
| ------------------------------------ | ----------------- | --------------------------------------------------------------------------------------------------------------- |
| id                                   | integer           | The id that was sent in the request                                                                             |
| jsonrpc                              | string            | The JSON-RPC version (2.0)                                                                                      |
| result                               | _object_          |                                                                                                                 |
|   ›  block_rfqs                      | array of _object_ |                                                                                                                 |
|   ›    ›  amount                     | number            | This value multiplied by the ratio of a leg gives trade size on that leg.                                       |
|   ›    ›  app_name                   | string            | The name of the application that created the Block RFQ on behalf of the user (optional, visible only to taker). |
|   ›    ›  asks                       | array of _object_ |                                                                                                                 |
|   ›    ›    ›  amount                | number            | This value multiplied by the ratio of a leg gives trade size on that leg.                                       |
|   ›    ›    ›  execution_instruction | string            |

Execution instruction of the quote. Default - `any_part_of`

- `"all_or_none (AON)"` - The quote can only be filled entirely or not at all,
  ensuring that its amount matches the amount specified in the Block RFQ.
  Additionally, 'all_or_none' quotes have priority over 'any_part_of' quotes at
  the same price level.
- `"any_part_of (APO)"` - The quote can be filled either partially or fully,
  with the filled amount potentially being less than the Block RFQ amount.

| |   ›    ›    ›  expires*at | integer | The timestamp when the quote expires
(milliseconds since the Unix epoch), equal to the earliest expiry of placed
quotes | |   ›    ›    ›  last_update_timestamp | integer | Timestamp of the
last update of the quote (milliseconds since the UNIX epoch) | |
  ›    ›    ›  makers | array of string | Maker of the quote | |
  ›    ›    ›  price | number | Price of a quote | |   ›    ›  bids | array of
\_object* | | |   ›    ›    ›  amount | number | This value multiplied by the
ratio of a leg gives trade size on that leg. | |
  ›    ›    ›  execution_instruction | string |

Execution instruction of the quote. Default - `any_part_of`

- `"all_or_none (AON)"` - The quote can only be filled entirely or not at all,
  ensuring that its amount matches the amount specified in the Block RFQ.
  Additionally, 'all_or_none' quotes have priority over 'any_part_of' quotes at
  the same price level.
- `"any_part_of (APO)"` - The quote can be filled either partially or fully,
  with the filled amount potentially being less than the Block RFQ amount.

| |   ›    ›    ›  expires*at | integer | The timestamp when the quote expires
(milliseconds since the Unix epoch), equal to the earliest expiry of placed
quotes | |   ›    ›    ›  last_update_timestamp | integer | Timestamp of the
last update of the quote (milliseconds since the UNIX epoch) | |
  ›    ›    ›  makers | array of string | Maker of the quote | |
  ›    ›    ›  price | number | Price of a quote | |   ›    ›  block_rfq_id |
integer | ID of the Block RFQ | |   ›    ›  combo_id | string | Unique combo
identifier | |   ›    ›  creation_timestamp | integer | The timestamp when Block
RFQ was created (milliseconds since the Unix epoch) | |   ›    ›  disclosed |
boolean | Indicates whether the RFQ was created as non-anonymous, meaning taker
and maker aliases are visible to counterparties. | |
  ›    ›  expiration_timestamp | integer | The timestamp when the Block RFQ will
expire (milliseconds since the UNIX epoch) | |   ›    ›  hedge | \_object* | | |
  ›    ›    ›  amount | integer | It represents the requested hedge leg size.
For perpetual and inverse futures the amount is in USD units. For options and
linear futures and it is the underlying base currency coin. | |
  ›    ›    ›  direction | string | Direction: `buy`, or `sell` | |
  ›    ›    ›  instrument*name | string | Unique instrument identifier | |
  ›    ›    ›  price | number | Price for a hedge leg | |
  ›    ›  included_in_taker_rating | boolean | Indicates whether the RFQ is
included in the taker's rating calculation. Present only for closed RFQs created
by the requesting taker. | |   ›    ›  index_prices | array of number | A list
of index prices for the underlying instrument(s) at the time of trade execution.
| |   ›    ›  label | string | User defined label for the Block RFQ (maximum 64
characters) | |   ›    ›  legs | array of \_object* | | |
  ›    ›    ›  direction | string | Direction: `buy`, or `sell` | |
  ›    ›    ›  instrument*name | string | Unique instrument identifier | |
  ›    ›    ›  ratio | integer | Ratio of amount between legs | |
  ›    ›  makers | array of string | List of targeted Block RFQ makers | |
  ›    ›  mark_price | number | The mark price for the instrument | |
  ›    ›  min_trade_amount | number | Minimum amount for trading | |
  ›    ›  role | string | Role of the user in Block RFQ | |   ›    ›  state |
string | State of the Block RFQ | |   ›    ›  taker | string | Taker alias.
Present only when `disclosed` is `true`. | |   ›    ›  taker_rating | string |
Rating of the taker | |   ›    ›  trade_allocations | array of \_object* | List
of allocations for Block RFQ pre-allocation. Allows to split amount between
different (sub)accounts or broker clients. Each allocation must specify either
`user_id` (for direct allocation) or `client_info` object (for broker
allocation), and amount. Visible only to the taker. | |   ›    ›    ›  amount |
number | Amount allocated to this user or client. | |   ›    ›    ›  client*info
| \_object* | Client allocation info for brokers. | |
  ›    ›    ›    ›  client*id | integer | ID of a client; available to broker.
Represents a group of users under a common name. | |
  ›    ›    ›    ›  client_link_id | integer | ID assigned to a single user in a
client; available to broker. | |   ›    ›    ›    ›  name | string | Name of the
linked user within the client; available to broker. | |   ›    ›    ›  user_id |
integer | User ID to allocate part of the RFQ amount. For brokers the User ID is
obstructed. | |   ›    ›  trade_trigger | \_object* | Contains information about
the trade trigger state | |   ›    ›    ›  cancel*reason | string | Reason for
cancellation, present only when state is cancelled | |   ›    ›    ›  direction
| string | Direction of the trade trigger | |   ›    ›    ›  price | number |
Price of the trade trigger | |   ›    ›    ›  state | string | Trade trigger
state: `"untriggered"` or `"cancelled"` | |   ›    ›  trades | array of
\_object* | | |   ›    ›    ›  amount | number | Trade amount. For options,
linear futures, linear perpetuals and spots the amount is denominated in the
underlying base currency coin. The inverse perpetuals and inverse futures are
denominated in USD units. | |   ›    ›    ›  direction | string | Direction:
`buy`, or `sell` | |   ›    ›    ›  hedge_amount | number | Amount of the hedge
leg. For linear futures, linear perpetuals and spots the amount is denominated
in the underlying base currency coin. The inverse perpetuals and inverse futures
are denominated in USD units. | |   ›    ›    ›  maker | string | Alias of the
maker (optional) | |   ›    ›    ›  price | number | Price in base currency | |
  ›  continuation | string | Continuation token for pagination. |
