## Response and Reason Codes

These codes are shared by both the response, and the `reason` field for rejected orders.

| Code | HTTP Status | Message Code | Description |
| --- | --- | --- | --- |
| 0 | 200 | \-- | Success |
| 201 | 500 | NO\_POSITION | No position |
| 202 | 400 | ACCOUNT\_IS\_SUSPENDED | Account is suspended |
| 203 | 500 | ACCOUNTS\_DO\_NOT\_MATCH | Accounts do not match |
| 204 | 400 | DUPLICATE\_CLORDID | Duplicate client order id |
| 205 | 500 | DUPLICATE\_ORDERID | Duplicate order id |
| 206 | 500 | INSTRUMENT\_EXPIRED | Instrument has expired |
| 207 | 400 | NO\_MARK\_PRICE | No mark price |
| 208 | 400 | INSTRUMENT\_NOT\_TRADABLE | Instrument is not tradable |
| 209 | 400 | INVALID\_INSTRUMENT | Instrument is invalid |
| 210 | 500 | INVALID\_ACCOUNT | Account is invalid |
| 211 | 500 | INVALID\_CURRENCY | Currency is invalid |
| 212 | 500 | INVALID\_ORDERID | Invalid order id |
| 213 | 400 | INVALID\_ORDERQTY | Invalid order quantity |
| 214 | 500 | INVALID\_SETTLE\_CURRENCY | Invalid settlement currency |
| 215 | 500 | INVALID\_FEE\_CURRENCY | Invalid fee currency |
| 216 | 500 | INVALID\_POSITION\_QTY | Invalid position quantity |
| 217 | 500 | INVALID\_OPEN\_QTY | Invalid open quantity |
| 218 | 400 | INVALID\_ORDTYPE | Invalid `order_type` |
| 219 | 500 | INVALID\_EXECINST | Invalid `exec_inst` |
| 220 | 400 | INVALID\_SIDE | Invalid `side` |
| 221 | 400 | INVALID\_TIF | Invalid `time_in_force` |
| 222 | 400 | STALE\_MARK\_PRICE | Stale mark price |
| 223 | 400 | NO\_CLORDID | No client order id |
| 224 | 400 | REJ\_BY\_MATCHING\_ENGINE | Rejected by matching engine |
| 225 | 400 | EXCEED\_MAXIMUM\_ENTRY\_LEVERAGE | Exceeds maximum entry leverage |
| 226 | 400 | INVALID\_LEVERAGE | Invalid leverage |
| 227 | 400 | INVALID\_SLIPPAGE | Invalid slippage |
| 228 | 400 | INVALID\_FLOOR\_PRICE | Invalid floor price |
| 229 | 400 | INVALID\_REF\_PRICE | Invalid ref price |
| 230 | 400 | INVALID\_TRIGGER\_TYPE | Invalid ref price type |
| 301 | 500 | ACCOUNT\_IS\_IN\_MARGIN\_CALL | Account is in margin call |
| 302 | 500 | EXCEEDS\_ACCOUNT\_RISK\_LIMIT | Exceeds account risk limit |
| 303 | 500 | EXCEEDS\_POSITION\_RISK\_LIMIT | Exceeds position risk limit |
| 304 | 500 | ORDER\_WILL\_LEAD\_TO\_IMMEDIATE\_LIQUIDATION | Order will lead to immediate liquidation |
| 305 | 500 | ORDER\_WILL\_TRIGGER\_MARGIN\_CALL | Order will trigger margin call |
| 306 | 500 | INSUFFICIENT\_AVAILABLE\_BALANCE | Insufficient available balance |
| 307 | 500 | INVALID\_ORDSTATUS | Invalid order status |
| 308 | 400 | INVALID\_PRICE | Invalid price |
| 309 | 500 | MARKET\_IS\_NOT\_OPEN | Market is not open |
| 310 | 500 | ORDER\_PRICE\_BEYOND\_LIQUIDATION\_PRICE | Order price beyond liquidation price |
| 311 | 500 | POSITION\_IS\_IN\_LIQUIDATION | Position is in liquidation |
| 312 | 500 | ORDER\_PRICE\_GREATER\_THAN\_LIMITUPPRICE | Order price is greater than the limit up price |
| 313 | 500 | ORDER\_PRICE\_LESS\_THAN\_LIMITDOWNPRICE | Order price is less than the limit down price |
| 314 | 400 | EXCEEDS\_MAX\_ORDER\_SIZE | Exceeds max order size |
| 315 | 400 | FAR\_AWAY\_LIMIT\_PRICE | Far away limit price |
| 316 | 500 | NO\_ACTIVE\_ORDER | No active order |
| 317 | 500 | POSITION\_NO\_EXIST | Position does not exist |
| 318 | 400 | EXCEEDS\_MAX\_ALLOWED\_ORDERS | Exceeds max allowed orders |
| 319 | 400 | EXCEEDS\_MAX\_POSITION\_SIZE | Exceeds max position size |
| 320 | 500 | EXCEEDS\_INITIAL\_MARGIN | Exceeds initial margin |
| 321 | 500 | EXCEEDS\_MAX\_AVAILABLE\_BALANCE | Exceeds maximum availble balance |
| 401 | 400 | ACCOUNT\_DOES\_NOT\_EXIST | Account does not exist |
| 406 | 500 | ACCOUNT\_IS\_NOT\_ACTIVE | Account is not active |
| 407 | 500 | MARGIN\_UNIT\_DOES\_NOT\_EXIST | Margin unit does not exist |
| 408 | 400 | MARGIN\_UNIT\_IS\_SUSPENDED | Margin unit is suspended |
| 409 | 500 | INVALID\_USER | Invalid user |
| 410 | 500 | USER\_IS\_NOT\_ACTIVE | User is not active |
| 411 | 500 | USER\_NO\_DERIV\_ACCESS | User does not have derivative access |
| 412 | 500 | ACCOUNT\_NO\_DERIV\_ACCESS | Account does not have derivative access |
| 415 | 500 | BELOW\_MIN\_ORDER\_SIZE | Below Min. Order Size |
| 501 | 500 | EXCEED\_MAXIMUM\_EFFECTIVE\_LEVERAGE | Exceeds maximum effective leverage |
| 604 | 500 | INVALID\_COLLATERAL\_PRICE | Invalid collateral price |
| 605 | 500 | INVALID\_MARGIN\_CALC | Invalid margin calculation |
| 606 | 500 | EXCEED\_ALLOWED\_SLIPPAGE | Exceed allowed slippage |
| 30024 | 400 | MAX\_AMOUNT\_VIOLATED | If `create-withdrawal` call quantity > `max_withdrawal_balance` in `user-balance` api |
| 40001 | 400 | BAD\_REQUEST | Bad request |
| 40002 | 400 | METHOD\_NOT\_FOUND | Method not found |
| 40003 | 400 | INVALID\_REQUEST | Invalid request |
| 40004 | 400 | MISSING\_OR\_INVALID\_ARGUMENT | Required argument is blank or missing |
| 40005 | 400 | INVALID\_DATE | Invalid date |
| 40006 | 400 | DUPLICATE\_REQUEST | Duplicate request received |
| 40101 | 401 | UNAUTHORIZED | Not authenticated, or key/signature incorrect |
| 40102 | 400 | INVALID\_NONCE | Nonce value differs by more than 60 seconds |
| 40103 | 401 | IP\_ILLEGAL | IP address not whitelisted |
| 40104 | 401 | USER\_TIER\_INVALID | Disallowed based on user tier |
| 40107 | 400 | EXCEED\_MAX\_SUBSCRIPTIONS | Session subscription limit has been exceeded |
| 40401 | 200 | NOT\_FOUND | Not found |
| 40801 | 408 | REQUEST\_TIMEOUT | Request has timed out |
| 42901 | 429 | TOO\_MANY\_REQUESTS | Requests have exceeded rate limits |
| 43003 | 500 | FILL\_OR\_KILL | FOK order has not been filled and cancelled |
| 43004 | 500 | IMMEDIATE\_OR\_CANCEL | IOC order has not been filled and cancelled |
| 43005 | 500 | POST\_ONLY\_REJ | Rejected POST\_ONLY create-order request (normally happened when `exec_inst` contains `POST_ONLY` but `time_in_force` is NOT `GOOD_TILL_CANCEL`) |
| 43012 | 200 | SELF\_TRADE\_PREVENTION | Canceled due to Self Trade Prevention |
| 50001 | 400 | DW\_CREDIT\_LINE\_NOT\_MAINTAINED | If `create-withdrawal` call breaching credit line check |
| 50001 | 400 | ERR\_INTERNAL | Internal error |

## Websocket Termination Codes

| Code | Description |
| --- | --- |
| 1000 | Normal disconnection by server, usually when the heartbeat isn't handled properly |
| 1006 | Abnormal disconnection |
| 1013 | Server restarting -- try again later |

## Error Response Format

Due to the asynchronous nature of websocket requests, a robust and consistent error response is crucial in order to match the response with the request.

To ensure API consistency for websocket error responses, if the `id` and `method` is omitted in the original request, `id` will have a value of `-1` and `method` will have a value of `ERROR`.

The original request will be returned as an escaped string in the `original` field.