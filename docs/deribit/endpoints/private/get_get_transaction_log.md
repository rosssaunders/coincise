# GET /private/get_transaction_log

Retrieve the latest user trades that have occurred for a specific instrument and
within a given time range.

**📖 Related Support Article:**
[Transaction log](https://support.deribit.com/hc/en-us/articles/25944587269021-Transaction-log)

**Scope:** `account:read`

This is a private method; it can only be used after authentication.

### Parameters

| Parameter       | Required | Type    | Enum                                                                                                                                                                                                                                                          | Description         |
| --------------- | -------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| currency        | true     | string  | BTC ETH STETH ETHW USDC USDT EURR MATIC SOL XRP USYC PAXG BNB USDE                                                                                                                                                                                            | The currency symbol |
| start_timestamp | true     | integer | The earliest timestamp to return result from (milliseconds since the UNIX epoch)                                                                                                                                                                              |                     |
| end_timestamp   | true     | integer | The most recent timestamp to return result from (milliseconds since the UNIX epoch)                                                                                                                                                                           |                     |
| query           | false    | string  | The following keywords can be used to filter the results: trade, maker, taker, open, close, liquidation, buy, sell, withdrawal, delivery, settlement, deposit, transfer, option, future, correction, block_trade, swap. Plus withdrawal or transfer addresses |                     |
| count           | false    | integer | Count of transaction log entries returned, default - 100, maximum - 250                                                                                                                                                                                       |                     |
| subaccount_id   | false    | integer | Id of a subaccount                                                                                                                                                                                                                                            |                     |
| continuation    | false    | integer | Continuation token for pagination                                                                                                                                                                                                                             |                     |

### Response

| Name                             | Type    | Description                                                                                                                                                                       |
| -------------------------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id                               | integer | The id that was sent in the request                                                                                                                                               |
| jsonrpc                          | string  | The JSON-RPC version (2.0) result object                                                                                                                                          |
| result.continuation              | integer | Continuation token for pagination. NULL when no continuation. result.logs array of object                                                                                         |
| result.logs[].change             | number  | Change in cash balance. For trades: fees and options premium paid/received. For settlement: Futures session PNL and perpetual session funding.                                    |
| result.logs[].cashflow           | number  | For futures and perpetual contracts: Realized session PNL (since last settlement). For options: the amount paid or received for the options traded.                               |
| result.logs[].user_id            | integer | Unique user identifier                                                                                                                                                            |
| result.logs[].trade_id           | string  | Unique (per currency) trade identifier                                                                                                                                            |
| result.logs[].type               | string  | Transaction category/type. The most common are: trade, deposit, withdrawal, settlement, delivery, transfer, swap, correction. New types can be added any time in the future       |
| result.logs[].order_id           | string  | Unique order identifier                                                                                                                                                           |
| result.logs[].position           | number  | Updated position size after the transaction                                                                                                                                       |
| result.logs[].side               | string  | One of: short or long in case of settlements, close sell or close buy in case of deliveries, open sell, open buy, close sell, close buy in case of trades                         |
| result.logs[].contracts          | number  | It represents the order size in contract units. (Optional, may be absent in historical data).                                                                                     |
| result.logs[].interest_pl        | number  | Actual funding rate of trades and settlements on perpetual instruments                                                                                                            |
| result.logs[].user_role          | string  | Trade role of the user: maker or taker                                                                                                                                            |
| result.logs[].fee_role           | string  | Fee role of the user: maker or taker. Can be different from trade role of the user when iceberg order was involved in matching.                                                   |
| result.logs[].id                 | integer | Unique identifier                                                                                                                                                                 |
| result.logs[].index_price        | number  | The index price for the instrument during the delivery                                                                                                                            |
| result.logs[].info               | object  | Additional information regarding transaction. Strongly dependent on the log entry type                                                                                            |
| result.logs[].currency           | string  | Currency, i.e "BTC", "ETH", "USDC"                                                                                                                                                |
| result.logs[].price              | number  | Settlement/delivery price or the price level of the traded contracts                                                                                                              |
| result.logs[].user_seq           | integer | Sequential identifier of user transaction                                                                                                                                         |
| result.logs[].settlement_price   | number  | The settlement price for the instrument during the delivery                                                                                                                       |
| result.logs[].price_currency     | string  | Currency symbol associated with the price field value                                                                                                                             |
| result.logs[].equity             | number  | Updated equity value after the transaction                                                                                                                                        |
| result.logs[].total_interest_pl  | number  | Total session funding rate                                                                                                                                                        |
| result.logs[].balance            | number  | Cash balance after the transaction                                                                                                                                                |
| result.logs[].session_upl        | number  | Session unrealized profit and loss                                                                                                                                                |
| result.logs[].timestamp          | integer | The timestamp (milliseconds since the Unix epoch)                                                                                                                                 |
| result.logs[].profit_as_cashflow | boolean | Indicator informing whether the cashflow is waiting for settlement or not                                                                                                         |
| result.logs[].commission         | number  | Commission paid so far (in base currency)                                                                                                                                         |
| result.logs[].session_rpl        | number  | Session realized profit and loss                                                                                                                                                  |
| result.logs[].mark_price         | number  | Market price during the trade                                                                                                                                                     |
| result.logs[].block_rfq_id       | integer | ID of the Block RFQ - when trade was part of the Block RFQ                                                                                                                        |
| result.logs[].ip                 | string  | The IP address from which the trade was initiated                                                                                                                                 |
| result.logs[].amount             | number  | It represents the requested order size. For perpetual and inverse futures the amount is in USD units. For options and linear futures and it is the underlying base currency coin. |
| result.logs[].username           | string  | System name or user defined subaccount alias                                                                                                                                      |
| result.logs[].instrument_name    | string  | Unique instrument identifier                                                                                                                                                      |
