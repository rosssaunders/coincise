# GET /private/get\_withdrawals

Retrieve the latest users withdrawals

**Scope:** `wallet:read`

This is a private method; it can only be used after authentication.

### Parameters

| Parameter | Required | Type | Enum | Description |
| --- | --- | --- | --- | --- |
| currency | true | string | BTC ETH USDC USDT EURR | The currency symbol |
| count | false | integer | Number of requested items, default - 10, maximum - 1000 |  |
| offset | false | integer | The offset for pagination, default - 0 |  |

### Response

| Name | Type | Description |
| --- | --- | --- |
| id | integer | The id that was sent in the request |
| jsonrpc | string | The JSON-RPC version (2.0) result object |
| result.count | integer | Total number of results available result.data array of object |
| result.data[].address | string | Address in proper format for currency |
| result.data[].amount | number | Amount of funds in given currency |
| result.data[].confirmed_timestamp | integer | The timestamp (milliseconds since the Unix epoch) of withdrawal confirmation, null when not confirmed |
| result.data[].created_timestamp | integer | The timestamp (milliseconds since the Unix epoch) |
| result.data[].currency | string | Currency, i.e "BTC", "ETH", "USDC" |
| result.data[].fee | number | Fee in currency |
| result.data[].id | integer | Withdrawal id in Deribit system |
| result.data[].priority | number | Id of priority level |
| result.data[].state | string | Withdrawal state, allowed values : unconfirmed, confirmed, cancelled, completed, interrupted, rejected |
| result.data[].transaction_id | string | Transaction id in proper format for currency, null if id is not available |
| result.data[].updated_timestamp | integer | The timestamp (milliseconds since the Unix epoch) |