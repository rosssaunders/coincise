## Response and Reason Codes

These codes are shared by both the response, and the `reason` field for rejected
orders.

| Code  | HTTP Status | Message Code                             | Description                                                                                                                                     |
| ----- | ----------- | ---------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| 0     | 200         | \--                                      | Success                                                                                                                                         |
| 201   | 500         | NO_POSITION                              | No position                                                                                                                                     |
| 202   | 400         | ACCOUNT_IS_SUSPENDED                     | Account is suspended                                                                                                                            |
| 203   | 500         | ACCOUNTS_DO_NOT_MATCH                    | Accounts do not match                                                                                                                           |
| 204   | 400         | DUPLICATE_CLORDID                        | Duplicate client order id                                                                                                                       |
| 205   | 500         | DUPLICATE_ORDERID                        | Duplicate order id                                                                                                                              |
| 206   | 500         | INSTRUMENT_EXPIRED                       | Instrument has expired                                                                                                                          |
| 207   | 400         | NO_MARK_PRICE                            | No mark price                                                                                                                                   |
| 208   | 400         | INSTRUMENT_NOT_TRADABLE                  | Instrument is not tradable                                                                                                                      |
| 209   | 400         | INVALID_INSTRUMENT                       | Instrument is invalid                                                                                                                           |
| 210   | 500         | INVALID_ACCOUNT                          | Account is invalid                                                                                                                              |
| 211   | 500         | INVALID_CURRENCY                         | Currency is invalid                                                                                                                             |
| 212   | 500         | INVALID_ORDERID                          | Invalid order id                                                                                                                                |
| 213   | 400         | INVALID_ORDERQTY                         | Invalid order quantity                                                                                                                          |
| 214   | 500         | INVALID_SETTLE_CURRENCY                  | Invalid settlement currency                                                                                                                     |
| 215   | 500         | INVALID_FEE_CURRENCY                     | Invalid fee currency                                                                                                                            |
| 216   | 500         | INVALID_POSITION_QTY                     | Invalid position quantity                                                                                                                       |
| 217   | 500         | INVALID_OPEN_QTY                         | Invalid open quantity                                                                                                                           |
| 218   | 400         | INVALID_ORDTYPE                          | Invalid `order_type`                                                                                                                            |
| 219   | 500         | INVALID_EXECINST                         | Invalid `exec_inst`                                                                                                                             |
| 220   | 400         | INVALID_SIDE                             | Invalid `side`                                                                                                                                  |
| 221   | 400         | INVALID_TIF                              | Invalid `time_in_force`                                                                                                                         |
| 222   | 400         | STALE_MARK_PRICE                         | Stale mark price                                                                                                                                |
| 223   | 400         | NO_CLORDID                               | No client order id                                                                                                                              |
| 224   | 400         | REJ_BY_MATCHING_ENGINE                   | Rejected by matching engine                                                                                                                     |
| 225   | 400         | EXCEED_MAXIMUM_ENTRY_LEVERAGE            | Exceeds maximum entry leverage                                                                                                                  |
| 226   | 400         | INVALID_LEVERAGE                         | Invalid leverage                                                                                                                                |
| 227   | 400         | INVALID_SLIPPAGE                         | Invalid slippage                                                                                                                                |
| 228   | 400         | INVALID_FLOOR_PRICE                      | Invalid floor price                                                                                                                             |
| 229   | 400         | INVALID_REF_PRICE                        | Invalid ref price                                                                                                                               |
| 230   | 400         | INVALID_TRIGGER_TYPE                     | Invalid ref price type                                                                                                                          |
| 301   | 500         | ACCOUNT_IS_IN_MARGIN_CALL                | Account is in margin call                                                                                                                       |
| 302   | 500         | EXCEEDS_ACCOUNT_RISK_LIMIT               | Exceeds account risk limit                                                                                                                      |
| 303   | 500         | EXCEEDS_POSITION_RISK_LIMIT              | Exceeds position risk limit                                                                                                                     |
| 304   | 500         | ORDER_WILL_LEAD_TO_IMMEDIATE_LIQUIDATION | Order will lead to immediate liquidation                                                                                                        |
| 305   | 500         | ORDER_WILL_TRIGGER_MARGIN_CALL           | Order will trigger margin call                                                                                                                  |
| 306   | 500         | INSUFFICIENT_AVAILABLE_BALANCE           | Insufficient available balance                                                                                                                  |
| 307   | 500         | INVALID_ORDSTATUS                        | Invalid order status                                                                                                                            |
| 308   | 400         | INVALID_PRICE                            | Invalid price                                                                                                                                   |
| 309   | 500         | MARKET_IS_NOT_OPEN                       | Market is not open                                                                                                                              |
| 310   | 500         | ORDER_PRICE_BEYOND_LIQUIDATION_PRICE     | Order price beyond liquidation price                                                                                                            |
| 311   | 500         | POSITION_IS_IN_LIQUIDATION               | Position is in liquidation                                                                                                                      |
| 312   | 500         | ORDER_PRICE_GREATER_THAN_LIMITUPPRICE    | Order price is greater than the limit up price                                                                                                  |
| 313   | 500         | ORDER_PRICE_LESS_THAN_LIMITDOWNPRICE     | Order price is less than the limit down price                                                                                                   |
| 314   | 400         | EXCEEDS_MAX_ORDER_SIZE                   | Exceeds max order size                                                                                                                          |
| 315   | 400         | FAR_AWAY_LIMIT_PRICE                     | Far away limit price                                                                                                                            |
| 316   | 500         | NO_ACTIVE_ORDER                          | No active order                                                                                                                                 |
| 317   | 500         | POSITION_NO_EXIST                        | Position does not exist                                                                                                                         |
| 318   | 400         | EXCEEDS_MAX_ALLOWED_ORDERS               | Exceeds max allowed orders                                                                                                                      |
| 319   | 400         | EXCEEDS_MAX_POSITION_SIZE                | Exceeds max position size                                                                                                                       |
| 320   | 500         | EXCEEDS_INITIAL_MARGIN                   | Exceeds initial margin                                                                                                                          |
| 321   | 500         | EXCEEDS_MAX_AVAILABLE_BALANCE            | Exceeds maximum availble balance                                                                                                                |
| 401   | 400         | ACCOUNT_DOES_NOT_EXIST                   | Account does not exist                                                                                                                          |
| 406   | 500         | ACCOUNT_IS_NOT_ACTIVE                    | Account is not active                                                                                                                           |
| 407   | 500         | MARGIN_UNIT_DOES_NOT_EXIST               | Margin unit does not exist                                                                                                                      |
| 408   | 400         | MARGIN_UNIT_IS_SUSPENDED                 | Margin unit is suspended                                                                                                                        |
| 409   | 500         | INVALID_USER                             | Invalid user                                                                                                                                    |
| 410   | 500         | USER_IS_NOT_ACTIVE                       | User is not active                                                                                                                              |
| 411   | 500         | USER_NO_DERIV_ACCESS                     | User does not have derivative access                                                                                                            |
| 412   | 500         | ACCOUNT_NO_DERIV_ACCESS                  | Account does not have derivative access                                                                                                         |
| 415   | 500         | BELOW_MIN_ORDER_SIZE                     | Below Min. Order Size                                                                                                                           |
| 501   | 500         | EXCEED_MAXIMUM_EFFECTIVE_LEVERAGE        | Exceeds maximum effective leverage                                                                                                              |
| 604   | 500         | INVALID_COLLATERAL_PRICE                 | Invalid collateral price                                                                                                                        |
| 605   | 500         | INVALID_MARGIN_CALC                      | Invalid margin calculation                                                                                                                      |
| 606   | 500         | EXCEED_ALLOWED_SLIPPAGE                  | Exceed allowed slippage                                                                                                                         |
| 30024 | 400         | MAX_AMOUNT_VIOLATED                      | If `create-withdrawal` call quantity > `max_withdrawal_balance` in `user-balance` api                                                           |
| 40001 | 400         | BAD_REQUEST                              | Bad request                                                                                                                                     |
| 40002 | 400         | METHOD_NOT_FOUND                         | Method not found                                                                                                                                |
| 40003 | 400         | INVALID_REQUEST                          | Invalid request                                                                                                                                 |
| 40004 | 400         | MISSING_OR_INVALID_ARGUMENT              | Required argument is blank or missing                                                                                                           |
| 40005 | 400         | INVALID_DATE                             | Invalid date                                                                                                                                    |
| 40006 | 400         | DUPLICATE_REQUEST                        | Duplicate request received                                                                                                                      |
| 40101 | 401         | UNAUTHORIZED                             | Not authenticated, or key/signature incorrect                                                                                                   |
| 40102 | 400         | INVALID_NONCE                            | Nonce value differs by more than 60 seconds                                                                                                     |
| 40103 | 401         | IP_ILLEGAL                               | IP address not whitelisted                                                                                                                      |
| 40104 | 401         | USER_TIER_INVALID                        | Disallowed based on user tier                                                                                                                   |
| 40107 | 400         | EXCEED_MAX_SUBSCRIPTIONS                 | Session subscription limit has been exceeded                                                                                                    |
| 40401 | 200         | NOT_FOUND                                | Not found                                                                                                                                       |
| 40801 | 408         | REQUEST_TIMEOUT                          | Request has timed out                                                                                                                           |
| 42901 | 429         | TOO_MANY_REQUESTS                        | Requests have exceeded rate limits                                                                                                              |
| 43003 | 500         | FILL_OR_KILL                             | FOK order has not been filled and cancelled                                                                                                     |
| 43004 | 500         | IMMEDIATE_OR_CANCEL                      | IOC order has not been filled and cancelled                                                                                                     |
| 43005 | 500         | POST_ONLY_REJ                            | Rejected POST_ONLY create-order request (normally happened when `exec_inst` contains `POST_ONLY` but `time_in_force` is NOT `GOOD_TILL_CANCEL`) |
| 43012 | 200         | SELF_TRADE_PREVENTION                    | Canceled due to Self Trade Prevention                                                                                                           |
| 50001 | 400         | DW_CREDIT_LINE_NOT_MAINTAINED            | If `create-withdrawal` call breaching credit line check                                                                                         |
| 50001 | 400         | ERR_INTERNAL                             | Internal error                                                                                                                                  |

## Websocket Termination Codes

| Code | Description                                                                       |
| ---- | --------------------------------------------------------------------------------- |
| 1000 | Normal disconnection by server, usually when the heartbeat isn't handled properly |
| 1006 | Abnormal disconnection                                                            |
| 1013 | Server restarting -- try again later                                              |

## Error Response Format

Due to the asynchronous nature of websocket requests, a robust and consistent
error response is crucial in order to match the response with the request.

To ensure API consistency for websocket error responses, if the `id` and
`method` is omitted in the original request, `id` will have a value of `-1` and
`method` will have a value of `ERROR`.

The original request will be returned as an escaped string in the `original`
field.
