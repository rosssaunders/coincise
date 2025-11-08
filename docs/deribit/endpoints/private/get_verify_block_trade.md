## /private/verify_block_trade

Verifies and creates block trade signature

**Note:** In the API, the `direction` field is always expressed from the maker's
perspective. This means that when you accept a block trade as a taker, the
direction shown in the API represents the opposite side of your trade. For
example, if you are buying puts as a taker, the API will show the operation as a
"sell put" (maker's perspective), and you will be verifying and accepting a
"sell put" block trade.

**📖 Related Support Article:**
[Block Trading](https://support.deribit.com/hc/en-us/articles/25944688627229-Block-Trading)

**Scope:** `block_trade:read`

This is a private method; it can only be used after authentication.

This is a matching engine method.

### Parameters

| Parameter            | Required                                               | Type             | Enum    | Description                                                                                                                                                                       |
| -------------------- | ------------------------------------------------------ | ---------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| timestamp            | true                                                   | integer          |         | Timestamp, shared with other party (milliseconds since the UNIX epoch)                                                                                                            |
| nonce                | true                                                   | string           |         | Nonce, shared with other party                                                                                                                                                    |
| role                 | true                                                   | string           | `maker` |
| `taker`              | Describes if user wants to be maker or taker of trades |
| trades               | true                                                   | array of objects |         | List of trades for block trade                                                                                                                                                    |
|   ›  instrument_name | true                                                   | string           |         | Instrument name                                                                                                                                                                   |
|   ›  price           | true                                                   | number           |         | Price for trade                                                                                                                                                                   |
|   ›  amount          | false                                                  | number           |         | It represents the requested trade size. For perpetual and inverse futures the amount is in USD units. For options and linear futures and it is the underlying base currency coin. |
|   ›  direction       | true                                                   | string           | `buy`   |
| `sell`               | Direction of trade from the maker perspective          |

### Response

| Name                                                  | Type     | Description                         |
| ----------------------------------------------------- | -------- | ----------------------------------- |
| id                                                    | integer  | The id that was sent in the request |
| jsonrpc                                               | string   | The JSON-RPC version (2.0)          |
| result                                                | _object_ |                                     |
|   ›  signature                                        | string   | Signature of block trade            |
| It is valid only for 5 minutes around given timestamp |
