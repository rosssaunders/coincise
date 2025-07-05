# Binance USDM Futures Private Websocket API Documentation

## Quick Start

### API Key Setup

- Some endpoints will require an API Key. Please refer to
  [this page](https://www.binance.com/en/support/faq/how-to-create-api-keys-on-binance-360002502072)
  regarding API key creation.
- Once API key is created, it is recommended to set IP restrictions on the key
  for security reasons.
- **Never share your API key/secret key to ANYONE.**

If the API keys were accidentally shared, please delete them immediately and
create a new key.

### API Key Restrictions

- After creating the API key, the default restrictions is `Enable Reading`.
- To **enable withdrawals via the API**, the API key restriction needs to be
  modified through the Binance UI.

### Enabling Accounts

#### Account

A `SPOT` account is provided by default upon creation of a Binance Account.

#### Futures Account

To enable a `FUTURES` account for Futures Trading, please refer to the
[Futures Trading Guide](https://www.binance.com/en/support/faq/a-beginner-s-guide-to-futures-trading-website-360039304272)

#### Futures Testnet

Users can use the Futures Testnet to practice `FUTURES` trading.

Currently, this is only available via the API.

Please refer to the
[Futures Testnet page](https://testnet.binancefuture.com/en/futures/BTCUSDT) for
more information and how to set up the Testnet API key.

#### Option Account

To enable a `OPTION` account for Option Trading, please refer to the
[Option Trading Guide](https://www.binance.com/en/support/faq/introduction-to-binance-options-374321c9317c473480243365298b8706)

### API Library

#### Python connector

This is a lightweight library that works as a connector to Binance public API,
written in Python.

[https://github.com/binance/binance-futures-connector-python](https://github.com/binance/binance-futures-connector-python)

#### Java connector

This is a lightweight library that works as a connector to Binance public API,
written for Java users.

[https://github.com/binance/binance-futures-connector-java](https://github.com/binance/binance-futures-connector-java)

> Source:
> [https://developers.binance.com/docs/derivatives/quick-start](https://developers.binance.com/docs/derivatives/quick-start)

## Error Codes

> Here is the error JSON payload:

```json
{
  "code": -1121,
  "msg": "Invalid symbol."
}
```

Errors consist of two parts: an error code and a message.  
Codes are universal,but messages can vary.

| Code | Name                                           | Description                                                                                                                                                                                                                                            |
| ---- | ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1000 | UNKNOWN​                                       | An unknown error occured while processing the request.                                                                                                                                                                                                 |
| 1001 | DISCONNECTED​                                  | Internal error; unable to process your request. Please try again.                                                                                                                                                                                      |
| 1002 | UNAUTHORIZED​                                  | You are not authorized to execute this request.                                                                                                                                                                                                        |
| 1003 | TOO_MANY_REQUESTS​                             | \- Too many requests; current limit is %s requests per minute. Please use the websocket for live updates to avoid polling the API. - Way too many requests; IP banned until %s. Please use the websocket for live updates to avoid bans.               |
| 1004 | DUPLICATE_IP​                                  | This IP is already on the white list                                                                                                                                                                                                                   |
| 1005 | NO_SUCH_IP​                                    | No such IP has been white listed                                                                                                                                                                                                                       |
| 1006 | UNEXPECTED_RESP​                               | An unexpected response was received from the message bus. Execution status unknown.                                                                                                                                                                    |
| 1007 | TIMEOUT​                                       | Timeout waiting for response from backend server. Send status unknown; execution status unknown.                                                                                                                                                       |
| 1008 | Service Unavailable​                           | Server is currently overloaded with other requests. Please try again in a few minutes.                                                                                                                                                                 |
| 1010 | ERROR_MSG_RECEIVED​                            | ERROR_MSG_RECEIVED.                                                                                                                                                                                                                                    |
| 1011 | NON_WHITE_LIST​                                | This IP cannot access this route.                                                                                                                                                                                                                      |
| 1013 | INVALID_MESSAGE​                               | INVALID_MESSAGE.                                                                                                                                                                                                                                       |
| 1014 | UNKNOWN_ORDER_COMPOSITION​                     | Unsupported order combination.                                                                                                                                                                                                                         |
| 1015 | TOO_MANY_ORDERS​                               | \- Too many new orders. - Too many new orders; current limit is %s orders per %s.                                                                                                                                                                      |
| 1016 | SERVICE_SHUTTING_DOWN​                         | This service is no longer available.                                                                                                                                                                                                                   |
| 1020 | UNSUPPORTED_OPERATION​                         | This operation is not supported.                                                                                                                                                                                                                       |
| 1021 | INVALID_TIMESTAMP​                             | \- Timestamp for this request is outside of the recvWindow. - Timestamp for this request was 1000ms ahead of the server's time.                                                                                                                        |
| 1022 | INVALID_SIGNATURE​                             | Signature for this request is not valid.                                                                                                                                                                                                               |
| 1023 | START_TIME_GREATER_THAN_END_TIME​              | Start time is greater than end time.                                                                                                                                                                                                                   |
| 1099 | NOT_FOUND​                                     | Not found, unauthenticated, or unauthorized.                                                                                                                                                                                                           |
| 1100 | ILLEGAL_CHARS​                                 | \- Illegal characters found in a parameter. - Illegal characters found in parameter '%s'; legal range is '%s'.                                                                                                                                         |
| 1101 | TOO_MANY_PARAMETERS​                           | \- Too many parameters sent for this endpoint. - Too many parameters; expected '%s' and received '%s'. - Duplicate values for a parameter detected.                                                                                                    |
| 1102 | MANDATORY_PARAM_EMPTY_OR_MALFORMED​            | \- A mandatory parameter was not sent, was empty/null, or malformed. - Mandatory parameter '%s' was not sent, was empty/null, or malformed. - Param '%s' or '%s' must be sent, but both were empty/null!                                               |
| 1103 | UNKNOWN_PARAM​                                 | An unknown parameter was sent.                                                                                                                                                                                                                         |
| 1104 | UNREAD_PARAMETERS​                             | \- Not all sent parameters were read. - Not all sent parameters were read; read '%s' parameter(s) but was sent '%s'.                                                                                                                                   |
| 1105 | PARAM_EMPTY​                                   | \- A parameter was empty. - Parameter '%s' was empty.                                                                                                                                                                                                  |
| 1106 | PARAM_NOT_REQUIRED​                            | \- A parameter was sent when not required. - Parameter '%s' sent when not required.                                                                                                                                                                    |
| 1108 | BAD_ASSET​                                     | Invalid asset.                                                                                                                                                                                                                                         |
| 1109 | BAD_ACCOUNT​                                   | Invalid account.                                                                                                                                                                                                                                       |
| 1110 | BAD_INSTRUMENT_TYPE​                           | Invalid symbolType.                                                                                                                                                                                                                                    |
| 1111 | BAD_PRECISION​                                 | Precision is over the maximum defined for this asset.                                                                                                                                                                                                  |
| 1112 | NO_DEPTH​                                      | No orders on book for symbol.                                                                                                                                                                                                                          |
| 1113 | WITHDRAW_NOT_NEGATIVE​                         | Withdrawal amount must be negative.                                                                                                                                                                                                                    |
| 1114 | TIF_NOT_REQUIRED​                              | TimeInForce parameter sent when not required.                                                                                                                                                                                                          |
| 1115 | INVALID_TIF​                                   | Invalid timeInForce.                                                                                                                                                                                                                                   |
| 1116 | INVALID_ORDER_TYPE​                            | Invalid orderType.                                                                                                                                                                                                                                     |
| 1117 | INVALID_SIDE​                                  | Invalid side.                                                                                                                                                                                                                                          |
| 1118 | EMPTY_NEW_CL_ORD_ID​                           | New client order ID was empty.                                                                                                                                                                                                                         |
| 1119 | EMPTY_ORG_CL_ORD_ID​                           | Original client order ID was empty.                                                                                                                                                                                                                    |
| 1120 | BAD_INTERVAL​                                  | Invalid interval.                                                                                                                                                                                                                                      |
| 1121 | BAD_SYMBOL​                                    | Invalid symbol.                                                                                                                                                                                                                                        |
| 1122 | INVALID_SYMBOL_STATUS​                         | Invalid symbol status.                                                                                                                                                                                                                                 |
| 1125 | INVALID_LISTEN_KEY​                            | This listenKey does not exist. Please use `POST /fapi/v1/listenKey` to recreate `listenKey`                                                                                                                                                            |
| 1126 | ASSET_NOT_SUPPORTED​                           | This asset is not supported.                                                                                                                                                                                                                           |
| 1127 | MORE_THAN_XX_HOURS​                            | \- Lookup interval is too big. - More than %s hours between startTime and endTime.                                                                                                                                                                     |
| 1128 | OPTIONAL_PARAMS_BAD_COMBO​                     | Combination of optional parameters invalid.                                                                                                                                                                                                            |
| 1130 | INVALID_PARAMETER​                             | \- Invalid data sent for a parameter. - Data sent for parameter '%s' is not valid.                                                                                                                                                                     |
| 1136 | INVALID_NEW_ORDER_RESP_TYPE​                   | Invalid newOrderRespType.                                                                                                                                                                                                                              |
| 2010 | NEW_ORDER_REJECTED​                            | NEW_ORDER_REJECTED                                                                                                                                                                                                                                     |
| 2011 | CANCEL_REJECTED​                               | CANCEL_REJECTED                                                                                                                                                                                                                                        |
| 2012 | CANCEL_ALL_FAIL​                               | Batch cancel failure.                                                                                                                                                                                                                                  |
| 2013 | NO_SUCH_ORDER​                                 | Order does not exist.                                                                                                                                                                                                                                  |
| 2014 | BAD_API_KEY_FMT​                               | API-key format invalid.                                                                                                                                                                                                                                |
| 2015 | REJECTED_MBX_KEY​                              | Invalid API-key, IP, or permissions for action.                                                                                                                                                                                                        |
| 2016 | NO_TRADING_WINDOW​                             | No trading window could be found for the symbol. Try ticker/24hrs instead.                                                                                                                                                                             |
| 2017 | API_KEYS_LOCKED​                               | API Keys are locked on this account.                                                                                                                                                                                                                   |
| 2018 | BALANCE_NOT_SUFFICIENT​                        | Balance is insufficient.                                                                                                                                                                                                                               |
| 2019 | MARGIN_NOT_SUFFICIEN​                          | Margin is insufficient.                                                                                                                                                                                                                                |
| 2020 | UNABLE_TO_FILL​                                | Unable to fill.                                                                                                                                                                                                                                        |
| 2021 | ORDER_WOULD_IMMEDIATELY_TRIGGER​               | Order would immediately trigger.                                                                                                                                                                                                                       |
| 2022 | REDUCE_ONLY_REJECT​                            | ReduceOnly Order is rejected.                                                                                                                                                                                                                          |
| 2023 | USER_IN_LIQUIDATION​                           | User in liquidation mode now.                                                                                                                                                                                                                          |
| 2024 | POSITION_NOT_SUFFICIENT​                       | Position is not sufficient.                                                                                                                                                                                                                            |
| 2025 | MAX_OPEN_ORDER_EXCEEDED​                       | Reach max open order limit.                                                                                                                                                                                                                            |
| 2026 | REDUCE_ONLY_ORDER_TYPE_NOT_SUPPORTED​          | This OrderType is not supported when reduceOnly.                                                                                                                                                                                                       |
| 2027 | MAX_LEVERAGE_RATIO​                            | Exceeded the maximum allowable position at current leverage.                                                                                                                                                                                           |
| 2028 | MIN_LEVERAGE_RATIO​                            | Leverage is smaller than permitted: insufficient margin balance.                                                                                                                                                                                       |
| 4000 | INVALID_ORDER_STATUS​                          | Invalid order status.                                                                                                                                                                                                                                  |
| 4001 | PRICE_LESS_THAN_ZERO​                          | Price less than 0.                                                                                                                                                                                                                                     |
| 4002 | PRICE_GREATER_THAN_MAX_PRICE​                  | Price greater than max price.                                                                                                                                                                                                                          |
| 4003 | QTY_LESS_THAN_ZERO​                            | Quantity less than zero.                                                                                                                                                                                                                               |
| 4004 | QTY_LESS_THAN_MIN_QTY​                         | Quantity less than min quantity.                                                                                                                                                                                                                       |
| 4005 | QTY_GREATER_THAN_MAX_QTY​                      | Quantity greater than max quantity.                                                                                                                                                                                                                    |
| 4006 | STOP_PRICE_LESS_THAN_ZERO​                     | Stop price less than zero.                                                                                                                                                                                                                             |
| 4007 | STOP_PRICE_GREATER_THAN_MAX_PRICE​             | Stop price greater than max price.                                                                                                                                                                                                                     |
| 4008 | TICK_SIZE_LESS_THAN_ZERO​                      | Tick size less than zero.                                                                                                                                                                                                                              |
| 4009 | MAX_PRICE_LESS_THAN_MIN_PRICE​                 | Max price less than min price.                                                                                                                                                                                                                         |
| 4010 | MAX_QTY_LESS_THAN_MIN_QTY​                     | Max qty less than min qty.                                                                                                                                                                                                                             |
| 4011 | STEP_SIZE_LESS_THAN_ZERO​                      | Step size less than zero.                                                                                                                                                                                                                              |
| 4012 | MAX_NUM_ORDERS_LESS_THAN_ZERO​                 | Max mum orders less than zero.                                                                                                                                                                                                                         |
| 4013 | PRICE_LESS_THAN_MIN_PRICE​                     | Price less than min price.                                                                                                                                                                                                                             |
| 4014 | PRICE_NOT_INCREASED_BY_TICK_SIZE​              | Price not increased by tick size.                                                                                                                                                                                                                      |
| 4015 | INVALID_CL_ORD_ID_LEN​                         | \- Client order id is not valid. - Client order id length should not be more than 36 chars                                                                                                                                                             |
| 4016 | PRICE_HIGHTER_THAN_MULTIPLIER_UP​              | Price is higher than mark price multiplier cap.                                                                                                                                                                                                        |
| 4017 | MULTIPLIER_UP_LESS_THAN_ZERO​                  | Multiplier up less than zero.                                                                                                                                                                                                                          |
| 4018 | MULTIPLIER_DOWN_LESS_THAN_ZERO​                | Multiplier down less than zero.                                                                                                                                                                                                                        |
| 4019 | COMPOSITE_SCALE_OVERFLOW​                      | Composite scale too large.                                                                                                                                                                                                                             |
| 4020 | TARGET_STRATEGY_INVALID​                       | Target strategy invalid for orderType '%s',reduceOnly '%b'.                                                                                                                                                                                            |
| 4021 | INVALID_DEPTH_LIMIT​                           | \- Invalid depth limit. - '%s' is not valid depth limit.                                                                                                                                                                                               |
| 4022 | WRONG_MARKET_STATUS​                           | market status sent is not valid.                                                                                                                                                                                                                       |
| 4023 | QTY_NOT_INCREASED_BY_STEP_SIZE​                | Qty not increased by step size.                                                                                                                                                                                                                        |
| 4024 | PRICE_LOWER_THAN_MULTIPLIER_DOWN​              | Price is lower than mark price multiplier floor.                                                                                                                                                                                                       |
| 4025 | MULTIPLIER_DECIMAL_LESS_THAN_ZERO​             | Multiplier decimal less than zero.                                                                                                                                                                                                                     |
| 4026 | COMMISSION_INVALID​                            | \- Commission invalid. - `%s` less than zero. - `%s` absolute value greater than `%s`                                                                                                                                                                  |
| 4027 | INVALID_ACCOUNT_TYPE​                          | Invalid account type.                                                                                                                                                                                                                                  |
| 4028 | INVALID_LEVERAGE​                              | \- Invalid leverage - Leverage `%s` is not valid - Leverage `%s` already exist with `%s`                                                                                                                                                               |
| 4029 | INVALID_TICK_SIZE_PRECISION​                   | Tick size precision is invalid.                                                                                                                                                                                                                        |
| 4030 | INVALID_STEP_SIZE_PRECISION​                   | Step size precision is invalid.                                                                                                                                                                                                                        |
| 4031 | INVALID_WORKING_TYPE​                          | \- Invalid parameter working type - Invalid parameter working type: `%s`                                                                                                                                                                               |
| 4032 | EXCEED_MAX_CANCEL_ORDER_SIZE​                  | \- Exceed maximum cancel order size. - Invalid parameter working type: `%s`                                                                                                                                                                            |
| 4033 | INSURANCE_ACCOUNT_NOT_FOUND​                   | Insurance account not found.                                                                                                                                                                                                                           |
| 4044 | INVALID_BALANCE_TYPE​                          | Balance Type is invalid.                                                                                                                                                                                                                               |
| 4045 | MAX_STOP_ORDER_EXCEEDED​                       | Reach max stop order limit.                                                                                                                                                                                                                            |
| 4046 | NO_NEED_TO_CHANGE_MARGIN_TYPE​                 | No need to change margin type.                                                                                                                                                                                                                         |
| 4047 | THERE_EXISTS_OPEN_ORDERS​                      | Margin type cannot be changed if there exists open orders.                                                                                                                                                                                             |
| 4048 | THERE_EXISTS_QUANTITY​                         | Margin type cannot be changed if there exists position.                                                                                                                                                                                                |
| 4049 | ADD_ISOLATED_MARGIN_REJECT​                    | Add margin only support for isolated position.                                                                                                                                                                                                         |
| 4050 | CROSS_BALANCE_INSUFFICIENT​                    | Cross balance insufficient.                                                                                                                                                                                                                            |
| 4051 | ISOLATED_BALANCE_INSUFFICIENT​                 | Isolated balance insufficient.                                                                                                                                                                                                                         |
| 4052 | NO_NEED_TO_CHANGE_AUTO_ADD_MARGIN​             | No need to change auto add margin.                                                                                                                                                                                                                     |
| 4053 | AUTO_ADD_CROSSED_MARGIN_REJECT​                | Auto add margin only support for isolated position.                                                                                                                                                                                                    |
| 4054 | ADD_ISOLATED_MARGIN_NO_POSITION_REJECT​        | Cannot add position margin: position is 0.                                                                                                                                                                                                             |
| 4055 | AMOUNT_MUST_BE_POSITIVE​                       | Amount must be positive.                                                                                                                                                                                                                               |
| 4056 | INVALID_API_KEY_TYPE​                          | Invalid api key type.                                                                                                                                                                                                                                  |
| 4057 | INVALID_RSA_PUBLIC_KEY​                        | Invalid api public key                                                                                                                                                                                                                                 |
| 4058 | MAX_PRICE_TOO_LARGE​                           | maxPrice and priceDecimal too large,please check.                                                                                                                                                                                                      |
| 4059 | NO_NEED_TO_CHANGE_POSITION_SIDE​               | No need to change position side.                                                                                                                                                                                                                       |
| 4060 | INVALID_POSITION_SIDE​                         | Invalid position side.                                                                                                                                                                                                                                 |
| 4061 | POSITION_SIDE_NOT_MATCH​                       | Order's position side does not match user's setting.                                                                                                                                                                                                   |
| 4062 | REDUCE_ONLY_CONFLICT​                          | Invalid or improper reduceOnly value.                                                                                                                                                                                                                  |
| 4063 | INVALID_OPTIONS_REQUEST_TYPE​                  | Invalid options request type                                                                                                                                                                                                                           |
| 4064 | INVALID_OPTIONS_TIME_FRAME​                    | Invalid options time frame                                                                                                                                                                                                                             |
| 4065 | INVALID_OPTIONS_AMOUNT​                        | Invalid options amount                                                                                                                                                                                                                                 |
| 4066 | INVALID_OPTIONS_EVENT_TYPE​                    | Invalid options event type                                                                                                                                                                                                                             |
| 4067 | POSITION_SIDE_CHANGE_EXISTS_OPEN_ORDERS​       | Position side cannot be changed if there exists open orders.                                                                                                                                                                                           |
| 4068 | POSITION_SIDE_CHANGE_EXISTS_QUANTITY​          | Position side cannot be changed if there exists position.                                                                                                                                                                                              |
| 4069 | INVALID_OPTIONS_PREMIUM_FEE​                   | Invalid options premium fee                                                                                                                                                                                                                            |
| 4070 | INVALID_CL_OPTIONS_ID_LEN​                     | \- Client options id is not valid. - Client options id length should be less than 32 chars                                                                                                                                                             |
| 4071 | INVALID_OPTIONS_DIRECTION​                     | Invalid options direction                                                                                                                                                                                                                              |
| 4072 | OPTIONS_PREMIUM_NOT_UPDATE​                    | premium fee is not updated, reject order                                                                                                                                                                                                               |
| 4073 | OPTIONS_PREMIUM_INPUT_LESS_THAN_ZERO​          | input premium fee is less than 0, reject order                                                                                                                                                                                                         |
| 4074 | OPTIONS_AMOUNT_BIGGER_THAN_UPPER​              | Order amount is bigger than upper boundary or less than 0, reject order                                                                                                                                                                                |
| 4075 | OPTIONS_PREMIUM_OUTPUT_ZERO​                   | output premium fee is less than 0, reject order                                                                                                                                                                                                        |
| 4076 | OPTIONS_PREMIUM_TOO_DIFF​                      | original fee is too much higher than last fee                                                                                                                                                                                                          |
| 4077 | OPTIONS_PREMIUM_REACH_LIMIT​                   | place order amount has reached to limit, reject order                                                                                                                                                                                                  |
| 4078 | OPTIONS_COMMON_ERROR​                          | options internal error                                                                                                                                                                                                                                 |
| 4079 | INVALID_OPTIONS_ID​                            | \- invalid options id - invalid options id: %s - duplicate options id %d for user %d                                                                                                                                                                   |
| 4080 | OPTIONS_USER_NOT_FOUND​                        | \- user not found - user not found with id: %s                                                                                                                                                                                                         |
| 4081 | OPTIONS_NOT_FOUND​                             | \- options not found - options not found with id: %s                                                                                                                                                                                                   |
| 4082 | INVALID_BATCH_PLACE_ORDER_SIZE​                | \- Invalid number of batch place orders. - Invalid number of batch place orders: %s                                                                                                                                                                    |
| 4083 | PLACE_BATCH_ORDERS_FAIL​                       | Fail to place batch orders.                                                                                                                                                                                                                            |
| 4084 | UPCOMING_METHOD​                               | Method is not allowed currently. Upcoming soon.                                                                                                                                                                                                        |
| 4085 | INVALID_NOTIONAL_LIMIT_COEF​                   | Invalid notional limit coefficient                                                                                                                                                                                                                     |
| 4086 | INVALID_PRICE_SPREAD_THRESHOLD​                | Invalid price spread threshold                                                                                                                                                                                                                         |
| 4087 | REDUCE_ONLY_ORDER_PERMISSION​                  | User can only place reduce only order                                                                                                                                                                                                                  |
| 4088 | NO_PLACE_ORDER_PERMISSION​                     | User can not place order currently                                                                                                                                                                                                                     |
| 4104 | INVALID_CONTRACT_TYPE​                         | Invalid contract type                                                                                                                                                                                                                                  |
| 4114 | INVALID_CLIENT_TRAN_ID_LEN​                    | \- clientTranId is not valid - Client tran id length should be less than 64 chars                                                                                                                                                                      |
| 4115 | DUPLICATED_CLIENT_TRAN_ID​                     | \- clientTranId is duplicated - Client tran id should be unique within 7 days                                                                                                                                                                          |
| 4116 | DUPLICATED_CLIENT_ORDER_ID​                    | clientOrderId is duplicated                                                                                                                                                                                                                            |
| 4117 | STOP_ORDER_TRIGGERING​                         | stop order is triggering                                                                                                                                                                                                                               |
| 4118 | REDUCE_ONLY_MARGIN_CHECK_FAILED​               | ReduceOnly Order Failed. Please check your existing position and open orders                                                                                                                                                                           |
| 4131 | MARKET_ORDER_REJECT​                           | The counterparty's best price does not meet the PERCENT_PRICE filter limit                                                                                                                                                                             |
| 4135 | INVALID_ACTIVATION_PRICE​                      | Invalid activation price                                                                                                                                                                                                                               |
| 4137 | QUANTITY_EXISTS_WITH_CLOSE_POSITION​           | Quantity must be zero with closePosition equals true                                                                                                                                                                                                   |
| 4138 | REDUCE_ONLY_MUST_BE_TRUE​                      | Reduce only must be true with closePosition equals true                                                                                                                                                                                                |
| 4139 | ORDER_TYPE_CANNOT_BE_MKT​                      | Order type can not be market if it's unable to cancel                                                                                                                                                                                                  |
| 4140 | INVALID_OPENING_POSITION_STATUS​               | Invalid symbol status for opening position                                                                                                                                                                                                             |
| 4141 | SYMBOL_ALREADY_CLOSED​                         | Symbol is closed                                                                                                                                                                                                                                       |
| 4142 | STRATEGY_INVALID_TRIGGER_PRICE​                | REJECT: take profit or stop order will be triggered immediately                                                                                                                                                                                        |
| 4144 | INVALID_PAIR​                                  | Invalid pair                                                                                                                                                                                                                                           |
| 4161 | ISOLATED_LEVERAGE_REJECT_WITH_POSITION​        | Leverage reduction is not supported in Isolated Margin Mode with open positions                                                                                                                                                                        |
| 4164 | MIN_NOTIONAL​                                  | \- Order's notional must be no smaller than 5.0 (unless you choose reduce only) - Order's notional must be no smaller than %s (unless you choose reduce only)                                                                                          |
| 4165 | INVALID_TIME_INTERVAL​                         | \- Invalid time interval - Maximum time interval is %s days                                                                                                                                                                                            |
| 4167 | ISOLATED_REJECT_WITH_JOINT_MARGIN​             | Unable to adjust to Multi-Assets mode with symbols of USDⓈ-M Futures under isolated-margin mode.                                                                                                                                                       |
| 4168 | JOINT_MARGIN_REJECT_WITH_ISOLATED​             | Unable to adjust to isolated-margin mode under the Multi-Assets mode.                                                                                                                                                                                  |
| 4169 | JOINT_MARGIN_REJECT_WITH_MB​                   | Unable to adjust Multi-Assets Mode with insufficient margin balance in USDⓈ-M Futures.                                                                                                                                                                 |
| 4170 | JOINT_MARGIN_REJECT_WITH_OPEN_ORDER​           | Unable to adjust Multi-Assets Mode with open orders in USDⓈ-M Futures.                                                                                                                                                                                 |
| 4171 | NO_NEED_TO_CHANGE_JOINT_MARGIN​                | Adjusted asset mode is currently set and does not need to be adjusted repeatedly.                                                                                                                                                                      |
| 4172 | JOINT_MARGIN_REJECT_WITH_NEGATIVE_BALANCE​     | Unable to adjust Multi-Assets Mode with a negative wallet balance of margin available asset in USDⓈ-M Futures account.                                                                                                                                 |
| 4183 | ISOLATED_REJECT_WITH_JOINT_MARGIN​             | \- Price is higher than stop price multiplier cap. - Limit price can't be higher than %s.                                                                                                                                                              |
| 4184 | PRICE_LOWER_THAN_STOP_MULTIPLIER_DOWN​         | \- Price is lower than stop price multiplier floor. - Limit price can't be lower than %s.                                                                                                                                                              |
| 4192 | COOLING_OFF_PERIOD​                            | Trade forbidden due to Cooling-off Period.                                                                                                                                                                                                             |
| 4202 | ADJUST_LEVERAGE_KYC_FAILED​                    | Intermediate Personal Verification is required for adjusting leverage over 20x                                                                                                                                                                         |
| 4203 | ADJUST_LEVERAGE_ONE_MONTH_FAILED​              | More than 20x leverage is available one month after account registration.                                                                                                                                                                              |
| 4205 | ADJUST_LEVERAGE_X_DAYS_FAILED​                 | More than 20x leverage is available %s days after Futures account registration.                                                                                                                                                                        |
| 4206 | ADJUST_LEVERAGE_KYC_LIMIT​                     | \- Users in this country has limited adjust leverage. - Users in your location/country can only access a maximum leverage of %s                                                                                                                        |
| 4208 | ADJUST_LEVERAGE_ACCOUNT_SYMBOL_FAILED​         | Current symbol leverage cannot exceed 20 when using position limit adjustment service.                                                                                                                                                                 |
| 4209 | ADJUST_LEVERAGE_SYMBOL_FAILED​                 | \- The max leverage of Symbol is 20x - Leverage adjustment failed. Current symbol max leverage limit is %sx                                                                                                                                            |
| 4210 | STOP_PRICE_HIGHER_THAN_PRICE_MULTIPLIER_LIMIT​ | \- Stop price is higher than price multiplier cap. - Stop price can't be higher than %s                                                                                                                                                                |
| 4211 | STOP_PRICE_LOWER_THAN_PRICE_MULTIPLIER_LIMIT​  | \- Stop price is lower than price multiplier floor. - Stop price can't be lower than %s                                                                                                                                                                |
| 4400 | TRADING_QUANTITATIVE_RULE​                     | Futures Trading Quantitative Rules violated, only reduceOnly order is allowed, please try again later.                                                                                                                                                 |
| 4401 | LARGE_POSITION_SYM_RULE​                       | Futures Trading Risk Control Rules of large position holding violated, only reduceOnly order is allowed, please reduce the position. .                                                                                                                 |
| 4402 | COMPLIANCE_BLACK_SYMBOL_RESTRICTION​           | Dear user, as per our Terms of Use and compliance with local regulations, this feature is currently not available in your region.                                                                                                                      |
| 4403 | ADJUST_LEVERAGE_COMPLIANCE_FAILED​             | \- Dear user, as per our Terms of Use and compliance with local regulations, the leverage can only up to 10x in your region - Dear user, as per our Terms of Use and compliance with local regulations, the leverage can only up to %sx in your region |
| 5021 | FOK_ORDER_REJECT​                              | Due to the order could not be filled immediately, the FOK order has been rejected.                                                                                                                                                                     |
| 5022 | GTX_ORDER_REJECT​                              | Due to the order could not be executed as maker, the Post Only order will be rejected.                                                                                                                                                                 |
| 5024 | MOVE_ORDER_NOT_ALLOWED_SYMBOL_REASON​          | Symbol is not in trading status. Order amendment is not permitted.                                                                                                                                                                                     |
| 5025 | LIMIT_ORDER_ONLY​                              | Only limit order is supported.                                                                                                                                                                                                                         |
| 5026 | Exceed_Maximum_Modify_Order_Limit​             | Exceed maximum modify order limit.                                                                                                                                                                                                                     |
| 5027 | SAME_ORDER​                                    | No need to modify the order.                                                                                                                                                                                                                           |
| 5028 | ME_RECVWINDOW_REJECT​                          | Timestamp for this request is outside of the ME recvWindow.                                                                                                                                                                                            |
| 5029 | MODIFICATION_MIN_NOTIONAL​                     | Order's notional must be no smaller than %s                                                                                                                                                                                                            |
| 5037 | INVALID_PRICE_MATCH​                           | Invalid price match                                                                                                                                                                                                                                    |
| 5038 | UNSUPPORTED_ORDER_TYPE_PRICE_MATCH​            | Price match only supports order type: LIMIT, STOP AND TAKE_PROFIT                                                                                                                                                                                      |
| 5039 | INVALID_SELF_TRADE_PREVENTION_MODE​            | Invalid self trade prevention mode                                                                                                                                                                                                                     |
| 5040 | FUTURE_GOOD_TILL_DATE​                         | The goodTillDate timestamp must be greater than the current time plus 600 seconds and smaller than 253402300799000 (UTC 9999-12-31 23:59:59)                                                                                                           |
| 5041 | BBO_ORDER_REJECT​                              | No depth matches this BBO order                                                                                                                                                                                                                        |
| 5043 | BBO_ORDER_REJECT​                              | A pending modification already exists for this order.                                                                                                                                                                                                  |

### 10xx - General Server or Network issues

### 11xx - Request issues

### 20xx - Processing Issues

### 40xx - Filters and other Issues

### 50xx - Order Execution Issues

> Source:
> [https://developers.binance.com/docs/derivatives/usds-margined-futures/error-code](https://developers.binance.com/docs/derivatives/usds-margined-futures/error-code)

## WebSocket API General Info

- The base endpoint is: **`wss://ws-fapi.binance.com/ws-fapi/v1`**
  - The base endpoint for testnet is:
    `wss://testnet.binancefuture.com/ws-fapi/v1`
- A single connection to the API is only valid for 24 hours; expect to be
  disconnected after the 24-hour mark.
- Websocket server will send a ping frame every 3 minutes.
  - If the websocket server does not receive a `pong frame` back from the
    connection within a 10 minute period, the connection will be disconnected.
  - When you receive a ping, you must send a pong with a copy of ping's payload
    as soon as possible.
  - Unsolicited pong frames are allowed, but will not prevent disconnection.
    **It is recommended that the payload for these pong frames are empty.**
- Signature payload must be generated by taking all request params except for
  the signature and sorting them by name in alphabetical order.
- Lists are returned in **chronological order**, unless noted otherwise.
- All timestamps are in **milliseconds in UTC**, unless noted otherwise.
- All field names and values are **case-sensitive**, unless noted otherwise.
- **`INT` parameters such as timestamp are expected as JSON integers, not
  strings.**
- **`DECIMAL` parameters such as price are expected as JSON strings, not
  floats.**
- **User Data Stream requests - you will need to establish a separate WebSocket
  connection to listen to
  [user data streams](https://binance-docs.github.io/apidocs/futures/en/#user-data-streams)**

### WebSocket API Request format

Requests must be sent as JSON in **text frames**, one request per frame.

> Example of request:

```json
{
  "id": "9ca10e58-7452-467e-9454-f669bb9c764e",
  "method": "order.place",
  "params": {
    "apiKey": "yeqKcXjtA9Eu4Tr3nJk61UJAGzXsEmFqqfVterxpMpR4peNfqE7Zl7oans8Qj089",
    "price": "42088.0",
    "quantity": "0.1",
    "recvWindow": 5000,
    "side": "BUY",
    "signature": "996962a19802b5a09d7bc6ab1524227894533322a2f8a1f8934991689cabf8fe",
    "symbol": "BTCUSDT",
    "timeInForce": "GTC",
    "timestamp": 1705311512994,
    "type": "LIMIT"
  }
}
```

Request fields:

| Name     | Type            | Mandatory |  Description                                                  |
| -------- | --------------- | --------- | ------------------------------------------------------------- |
| `id`     | INT/STRING/null | YES       | Arbitrary ID used to match responses to requests              |
| `method` | STRING          | YES       | Request method name                                           |
| `params` | OBJECT          | NO        | Request parameters. May be omitted if there are no parameters |
|          |                 |           |                                                               |

- Request `id` is truly arbitrary. You can use UUIDs, sequential IDs, current
  timestamp, etc. The server does not interpret `id` in any way, simply echoing
  it back in the response.

You can freely reuse IDs within a session. However, be careful to not send more
than one request at a time with the same ID, since otherwise it might be
impossible to tell the responses apart.  

- Request method names may be prefixed with explicit version: e.g.,
  "`v3/order.place`".
- The order of `params` is not significant.

### Response format

Responses are returned as JSON in text frames, one response per frame.

> Example of successful response:

```json
{
  "id": "43a3843a-2321-4e45-8f79-351e5c354563",
  "status": 200,
  "result": {
    "orderId": 336829446,
    "symbol": "BTCUSDT",
    "status": "NEW",
    "clientOrderId": "FqEw6cn0vDhrkmfiwLYPeo",
    "price": "42088.00",
    "avgPrice": "0.00",
    "origQty": "0.100",
    "executedQty": "0.000",
    "cumQty": "0.000",
    "cumQuote": "0.00000",
    "timeInForce": "GTC",
    "type": "LIMIT",
    "reduceOnly": false,
    "closePosition": false,
    "side": "BUY",
    "positionSide": "BOTH",
    "stopPrice": "0.00",
    "workingType": "CONTRACT_PRICE",
    "priceProtect": false,
    "origType": "LIMIT",
    "priceMatch": "NONE",
    "selfTradePreventionMode": "NONE",
    "goodTillDate": 0,
    "updateTime": 1705385954229
  },
  "rateLimits": [
    {
      "rateLimitType": "REQUEST_WEIGHT",
      "interval": "MINUTE",
      "intervalNum": 1,
      "limit": 2400,
      "count": 1
    },
    {
      "rateLimitType": "ORDERS",
      "interval": "SECOND",
      "intervalNum": 10,
      "limit": 300,
      "count": 1
    },
    {
      "rateLimitType": "ORDERS",
      "interval": "MINUTE",
      "intervalNum": 1,
      "limit": 1200,
      "count": 0
    }
  ]
}
```

> Example of failed response:

```json
{
  "id": "5761b939-27b1-4948-ab87-4a372a3f6b72",
  "status": 400,
  "error": {
    "code": -1102,
    "msg": "Mandatory parameter 'quantity' was not sent, was empty/null, or malformed."
  },
  "rateLimits": [
    {
      "rateLimitType": "REQUEST_WEIGHT",
      "interval": "MINUTE",
      "intervalNum": 1,
      "limit": 2400,
      "count": 1
    },
    {
      "rateLimitType": "ORDERS",
      "interval": "SECOND",
      "intervalNum": 10,
      "limit": 300,
      "count": 1
    },
    {
      "rateLimitType": "ORDERS",
      "interval": "MINUTE",
      "intervalNum": 1,
      "limit": 1200,
      "count": 1
    }
  ]
}
```

Response fields:

| Name         | Type            | Mandatory |  Description                                   |
| ------------ | --------------- | --------- | ---------------------------------------------- |
| `id`         | INT/STRING/null | YES       | Same as in the original request                |
| `status`     | INT             | YES       | Response status. See status codes              |
| `result`     | OBJECT/ARRAY    | YES       | Response content. Present if request succeeded |
| `error`      | OBJECT          | YES       | Error description. Present if request failed   |
| `rateLimits` | ARRAY           | NO        | Rate limiting status. See Rate limits          |

### WebSocket API Rate limits

- Rate limits are the same as on REST API and are shared with REST API.
- WebSocket handshake attempt costs 5 weight.
- Rate limit for ping/pong frames: maximum 5 per second.
- Rate limit information is included in responses by default, see the
  `rateLimits` field.
- `rateLimits` field visibility can be controlled with `returnRateLimits`
  boolean parameter in connection string or individual requests.
- E.g., use `wss://ws-fapi.binance.com/ws-fapi/v1?returnRateLimits=false` to
  hide `rateLimits` in responses by default. With that, you can pass extra
  `"returnRateLimits": true` parameter in requests to show rate limit in
  response when it is otherwise hidden by default.

### WebSocket API Authenticate after connection

You can authenticate an already established connection using session
authentication requests:

- `session.logon` - authenticate, or change the API key associated with the
  connection
- `session.status` - check connection status and the current API key
- `session.logout` - forget the API key associated with the connection

### WebSocket API API key revocation

If during an active session the API key becomes invalid for any reason (e.g. IP
address is not whitelisted, API key was deleted, API key doesn't have correct
permissions, etc), after the next request the session will be revoked with the
following error message:

```json
{
  "id": null,
  "status": 401,
  "error": {
    "code": -2015,
    "msg": "Invalid API-key, IP, or permissions for action."
  }
}
```

### WebSocket API Authorize ad hoc requests

Only one API key can be authenticated with the WebSocket connection. The
authenticated API key is used by default for requests that require an apiKey
parameter. However, you can always specify the apiKey and signature explicitly
for individual requests, overriding the authenticated API key and using a
different one to authorize a specific request.

For example, you might want to authenticate your USER_DATA key to be used by
default, but specify the TRADE key with an explicit signature when placing
orders.

### WebSocket API Authentication request

**Note**:

> Only _Ed25519_ keys are supported for this feature.

#### Log in with API key (SIGNED)

> **Request**

```json
{
  "id": "c174a2b1-3f51-4580-b200-8528bd237cb7",
  "method": "session.logon",
  "params": {
    "apiKey": "vmPUZE6mv9SD5VNHk4HlWFsOr6aKE2zvsw0MuIgwCIPy6utIco14y7Ju91duEh8A",
    "signature": "1cf54395b336b0a9727ef27d5d98987962bc47aca6e13fe978612d0adee066ed",
    "timestamp": 1649729878532
  }
}
```

> **Response**

```json
{
  "id": "c174a2b1-3f51-4580-b200-8528bd237cb7",
  "status": 200,
  "result": {
    "apiKey": "vmPUZE6mv9SD5VNHk4HlWFsOr6aKE2zvsw0MuIgwCIPy6utIco14y7Ju91duEh8A",
    "authorizedSince": 1649729878532,
    "connectedSince": 1649729873021,
    "returnRateLimits": false,
    "serverTime": 1649729878630
  }
}
```

Authenticate WebSocket connection using the provided API key.

After calling `session.logon`, you can omit `apiKey` and `signature` parameters
for future requests that require them.

Note that only one API key can be authenticated. Calling `session.logon`
multiple times changes the current authenticated API key.

**Weight:** 2

**Method**: "session.logon"

**Parameters**

| Name         | Type   | Mandatory |  Description |
| ------------ | ------ | --------- | ------------ |
| `apiKey`     | STRING | YES       |              |
| `recvWindow` | INT    | NO        |              |
| `signature`  | STRING | YES       |              |
| `timestamp`  | INT    | YES       |              |

#### Query session status

> **Request**

```json
{
  "id": "b50c16cd-62c9-4e29-89e4-37f10111f5bf",
  "method": "session.status"
}
```

> **Response**

```json
{
  "id": "b50c16cd-62c9-4e29-89e4-37f10111f5bf",
  "status": 200,
  "result": {
    // if the connection is not authenticated, "apiKey" and "authorizedSince" will be shown as null
    "apiKey": "vmPUZE6mv9SD5VNHk4HlWFsOr6aKE2zvsw0MuIgwCIPy6utIco14y7Ju91duEh8A",
    "authorizedSince": 1649729878532,
    "connectedSince": 1649729873021,
    "returnRateLimits": false,
    "serverTime": 1649730611671
  }
}
```

Query the status of the WebSocket connection, inspecting which API key (if any)
is used to authorize requests.

**Weight:** 2

**Method**: "session.status"

**Parameters**: None

#### Log out of the session

> **Request**

```json
{
  "id": "c174a2b1-3f51-4580-b200-8528bd237cb7",
  "method": "session.logout"
}
```

> **Response**

```json
{
  "id": "c174a2b1-3f51-4580-b200-8528bd237cb7",
  "status": 200,
  "result": {
    "apiKey": null,
    "authorizedSince": null,
    "connectedSince": 1649729873021,
    "returnRateLimits": false,
    "serverTime": 1649730611671
  }
}
```

Forget the API key previously authenticated. If the connection is not
authenticated, this request does nothing.

Note that the WebSocket connection stays open after `session.logout` request.
You can continue using the connection, but now you will have to explicitly
provide the `apiKey` and `signature` parameters where needed.

**Weight:** 2

**Method**: "session.logout"

**Parameters**: None

### SIGNED (TRADE and USER_DATA) Endpoint Security

#### SIGNED request example (Ed25519)

| Parameter   | Value         |
| ----------- | ------------- |
| symbol      | BTCUSDT       |
| side        | SELL          |
| type        | LIMIT         |
| timeInForce | GTC           |
| quantity    | 1             |
| price       | 0.2           |
| timestamp   | 1668481559918 |

```xyz1
#!/usr/bin/env python3

import base64
import time
import json
from cryptography.hazmat.primitives.serialization import load_pem_private_key
from websocket import create_connection

# Set up authentication
API_KEY='put your own API Key here'
PRIVATE_KEY_PATH='test-prv-key.pem'

# Load the private key.
# In this example the key is expected to be stored without encryption,
# but we recommend using a strong password for improved security.
with open(PRIVATE_KEY_PATH, 'rb') as f:
    private_key = load_pem_private_key(data=f.read(),
                                       password=None)

# Set up the request parameters
params = {
    'apiKey':        API_KEY,
    'symbol':       'BTCUSDT',
    'side':         'SELL',
    'type':         'LIMIT',
    'timeInForce':  'GTC',
    'quantity':     '1.0000000',
    'price':        '0.20'
}

# Timestamp the request
timestamp = int(time.time() * 1000) # UNIX timestamp in milliseconds
params['timestamp'] = timestamp

# Sign the request
payload = '&'.join([f'{param}={value}' for param, value in sorted(params.items())])

signature = base64.b64encode(private_key.sign(payload.encode('ASCII')))
params['signature'] = signature.decode('ASCII')

# Send the request
request = {
    'id': 'my_new_order',
    'method': 'order.place',
    'params': params
}

ws = create_connection("wss://ws-fapi.binance.com/ws-fapi/v1")
ws.send(json.dumps(request))
result =  ws.recv()
ws.close()

print(result)
```

A sample code in Python to show how to sign the payload with an Ed25519 key is
available on the right side.

> Source:
> [https://developers.binance.com/docs/derivatives/usds-margined-futures/websocket-api-general-info](https://developers.binance.com/docs/derivatives/usds-margined-futures/websocket-api-general-info)

## Modify Order (TRADE)

### API Description

Order modify function, currently only LIMIT order modification is supported,
modified orders will be reordered in the match queue

### Method

`order.modify`

### Request

```json
{
  "id": "c8c271ba-de70-479e-870c-e64951c753d9",
  "method": "order.modify",
  "params": {
    "apiKey": "HMOchcfiT9ZRZnhjp2XjGXhsOBd6msAhKz9joQaWwZ7arcJTlD2hGPHQj1lGdTjR",
    "orderId": 328971409,
    "origType": "LIMIT",
    "positionSide": "SHORT",
    "price": "43769.1",
    "priceMatch": "NONE",
    "quantity": "0.11",
    "side": "SELL",
    "symbol": "BTCUSDT",
    "timestamp": 1703426755754,
    "signature": "d30c9f0736a307f5a9988d4a40b688662d18324b17367d51421da5484e835923"
  }
}
```

### Request Weight

1 on 10s order rate limit(X-MBX-ORDER-COUNT-10S); 1 on 1min order rate
limit(X-MBX-ORDER-COUNT-1M); 1 on IP rate limit(x-mbx-used-weight-1m)

### Request Parameters

| Name              | Type    | Mandatory | Description                                                                                                                                                                                                     |
| ----------------- | ------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| orderId           | LONG    | NO        |                                                                                                                                                                                                                 |
| origClientOrderId | STRING  | NO        |                                                                                                                                                                                                                 |
| symbol            | STRING  | YES       |                                                                                                                                                                                                                 |
| side              | ENUM    | YES       | `SELL`, `BUY`                                                                                                                                                                                                   |
| quantity          | DECIMAL | YES       | Order quantity, cannot be sent with `closePosition=true`                                                                                                                                                        |
| price             | DECIMAL | YES       |                                                                                                                                                                                                                 |
| priceMatch        | ENUM    | NO        | only avaliable for `LIMIT`/`STOP`/`TAKE_PROFIT` order; can be set to `OPPONENT`/ `OPPONENT_5`/ `OPPONENT_10`/ `OPPONENT_20`: /`QUEUE`/ `QUEUE_5`/ `QUEUE_10`/ `QUEUE_20`; Can't be passed together with `price` |
| recvWindow        | LONG    | NO        |                                                                                                                                                                                                                 |
| timestamp         | LONG    | YES       |                                                                                                                                                                                                                 |

> - Either `orderId` or `origClientOrderId` must be sent, and the `orderId` will
>   prevail if both are sent.
> - Both `quantity` and `price` must be sent, which is different from dapi
>   modify order endpoint.
> - When the new `quantity` or `price` doesn't satisfy PRICE_FILTER /
>   PERCENT_FILTER / LOT_SIZE, amendment will be rejected and the order will
>   stay as it is.
> - However the order will be cancelled by the amendment in the following
>   situations:
>   - when the order is in partially filled status and the new `quantity` <=
>     `executedQty`
>   - When the order is `GTX` and the new price will cause it to be executed
>     immediately
> - One order can only be modfied for less than 10000 times

### Response Example

```json
{
  "id": "c8c271ba-de70-479e-870c-e64951c753d9",
  "status": 200,
  "result": {
    "orderId": 328971409,
    "symbol": "BTCUSDT",
    "status": "NEW",
    "clientOrderId": "xGHfltUMExx0TbQstQQfRX",
    "price": "43769.10",
    "avgPrice": "0.00",
    "origQty": "0.110",
    "executedQty": "0.000",
    "cumQty": "0.000",
    "cumQuote": "0.00000",
    "timeInForce": "GTC",
    "type": "LIMIT",
    "reduceOnly": false,
    "closePosition": false,
    "side": "SELL",
    "positionSide": "SHORT",
    "stopPrice": "0.00",
    "workingType": "CONTRACT_PRICE",
    "priceProtect": false,
    "origType": "LIMIT",
    "priceMatch": "NONE",
    "selfTradePreventionMode": "NONE",
    "goodTillDate": 0,
    "updateTime": 1703426756190
  },
  "rateLimits": [
    {
      "rateLimitType": "ORDERS",
      "interval": "SECOND",
      "intervalNum": 10,
      "limit": 300,
      "count": 1
    },
    {
      "rateLimitType": "ORDERS",
      "interval": "MINUTE",
      "intervalNum": 1,
      "limit": 1200,
      "count": 1
    },
    {
      "rateLimitType": "REQUEST_WEIGHT",
      "interval": "MINUTE",
      "intervalNum": 1,
      "limit": 2400,
      "count": 1
    }
  ]
}
```

> Source:
> [https://developers.binance.com/docs/derivatives/usds-margined-futures/trade/websocket-api/Modify-Order](https://developers.binance.com/docs/derivatives/usds-margined-futures/trade/websocket-api/Modify-Order)

## Cancel Order (TRADE)

### API Description

Cancel an active order.

### Method

`order.cancel`

### Request

```json
{
  "id": "5633b6a2-90a9-4192-83e7-925c90b6a2fd",
  "method": "order.cancel",
  "params": {
    "apiKey": "HsOehcfih8ZRxnhjp2XjGXhsOBd6msAhKz9joQaWwZ7arcJTlD2hGOGQj1lGdTjR",
    "orderId": 283194212,
    "symbol": "BTCUSDT",
    "timestamp": 1703439070722,
    "signature": "b09c49815b4e3f1f6098cd9fbe26a933a9af79803deaaaae03c29f719c08a8a8"
  }
}
```

### Request Weight

**1**

### Request Parameters

| Name              | Type   | Mandatory | Description |
| ----------------- | ------ | --------- | ----------- |
| symbol            | STRING | YES       |             |
| orderId           | LONG   | NO        |             |
| origClientOrderId | STRING | NO        |             |
| recvWindow        | LONG   | NO        |             |
| timestamp         | LONG   | YES       |             |

> - Either `orderId` or `origClientOrderId` must be sent.

### Response Example

```json
{
  "id": "5633b6a2-90a9-4192-83e7-925c90b6a2fd",
  "status": 200,
  "result": {
    "clientOrderId": "myOrder1",
    "cumQty": "0",
    "cumQuote": "0",
    "executedQty": "0",
    "orderId": 283194212,
    "origQty": "11",
    "origType": "TRAILING_STOP_MARKET",
    "price": "0",
    "reduceOnly": false,
    "side": "BUY",
    "positionSide": "SHORT",
    "status": "CANCELED",
    "stopPrice": "9300",
    "closePosition": false,
    "symbol": "BTCUSDT",
    "timeInForce": "GTC",
    "type": "TRAILING_STOP_MARKET",
    "activatePrice": "9020",
    "priceRate": "0.3",
    "updateTime": 1571110484038,
    "workingType": "CONTRACT_PRICE",
    "priceProtect": false,
    "priceMatch": "NONE",
    "selfTradePreventionMode": "NONE",
    "goodTillDate": 0
  },
  "rateLimits": [
    {
      "rateLimitType": "REQUEST_WEIGHT",
      "interval": "MINUTE",
      "intervalNum": 1,
      "limit": 2400,
      "count": 1
    }
  ]
}
```

> Source:
> [https://developers.binance.com/docs/derivatives/usds-margined-futures/trade/websocket-api/Cancel-Order](https://developers.binance.com/docs/derivatives/usds-margined-futures/trade/websocket-api/Cancel-Order)

## Query Order (USER_DATA)

### API Description

Check an order's status.

- These orders will not be found:
  - order status is `CANCELED` or `EXPIRED` **AND** order has NO filled trade
    **AND** created time + 3 days < current time
  - order create time + 90 days < current time

### Method

`order.status`

### Request

```json
{
  "id": "0ce5d070-a5e5-4ff2-b57f-1556741a4204",
  "method": "order.status",
  "params": {
    "apiKey": "HMOchcfii9ZRZnhjp2XjGXhsOBd6msAhKz9joQaWwZ7arcJTlD2hGPHQj1lGdTjR",
    "orderId": 328999071,
    "symbol": "BTCUSDT",
    "timestamp": 1703441060152,
    "signature": "ba48184fc38a71d03d2b5435bd67c1206e3191e989fe99bda1bc643a880dfdbf"
  }
}
```

### Request Weight

**1**

### Request Parameters

| Name              | Type   | Mandatory | Description |
| ----------------- | ------ | --------- | ----------- |
| symbol            | STRING | YES       |             |
| orderId           | LONG   | NO        |             |
| origClientOrderId | STRING | NO        |             |
| recvWindow        | LONG   | NO        |             |
| timestamp         | LONG   | YES       |             |

Notes:

> - Either `orderId` or `origClientOrderId` must be sent.
> - `orderId` is self-increment for each specific `symbol`

### Response Example

```json
{
  "id": "605a6d20-6588-4cb9-afa0-b0ab087507ba",
  "status": 200,
  "result": {
    "avgPrice": "0.00000",
    "clientOrderId": "abc",
    "cumQuote": "0",
    "executedQty": "0",
    "orderId": 1917641,
    "origQty": "0.40",
    "origType": "TRAILING_STOP_MARKET",
    "price": "0",
    "reduceOnly": false,
    "side": "BUY",
    "positionSide": "SHORT",
    "status": "NEW",
    "stopPrice": "9300", // please ignore when order type is TRAILING_STOP_MARKET
    "closePosition": false, // if Close-All
    "symbol": "BTCUSDT",
    "time": 1579276756075, // order time
    "timeInForce": "GTC",
    "type": "TRAILING_STOP_MARKET",
    "activatePrice": "9020", // activation price, only return with TRAILING_STOP_MARKET order
    "priceRate": "0.3", // callback rate, only return with TRAILING_STOP_MARKET order
    "updateTime": 1579276756075, // update time
    "workingType": "CONTRACT_PRICE",
    "priceProtect": false // if conditional order trigger is protected
  }
}
```

> Source:
> [https://developers.binance.com/docs/derivatives/usds-margined-futures/trade/websocket-api/Query-Order](https://developers.binance.com/docs/derivatives/usds-margined-futures/trade/websocket-api/Query-Order)

## User Data Streams Connect

- The base API endpoint is:
  **[https://fapi.binance.com](https://fapi.binance.com)**
- A User Data Stream `listenKey` is valid for 60 minutes after creation.
- Doing a `PUT` on a `listenKey` will extend its validity for 60 minutes, if
  response `-1125` error "This listenKey does not exist." Please use
  `POST /fapi/v1/listenKey` to recreate `listenKey`.
- Doing a `DELETE` on a `listenKey` will close the stream and invalidate the
  `listenKey`.
- Doing a `POST` on an account with an active `listenKey` will return the
  currently active `listenKey` and extend its validity for 60 minutes.
- The connection method for Websocket：

  - Base Url: **wss://fstream.binance.com**
  - User Data Streams are accessed at **/ws/<listenKey>**
  - Example:
    `wss://fstream.binance.com/ws/XaEAKTsQSRLZAGH9tuIu37plSRsdjmlAVBoNYPUITlTAko1WI22PgmBMpI1rS8Yh`

- For one connection(one user data), the user data stream payloads can
  guaranteed to be in order during heavy periods; **Strongly recommend you order
  your updates using E**
- A single connection is only valid for 24 hours; expect to be disconnected at
  the 24 hour mark

> Source:
> [https://developers.binance.com/docs/derivatives/usds-margined-futures/user-data-streams](https://developers.binance.com/docs/derivatives/usds-margined-futures/user-data-streams)

## Start User Data Stream (USER_STREAM)

### API Description

Start a new user data stream. The stream will close after 60 minutes unless a
keepalive is sent. If the account has an active `listenKey`, that `listenKey`
will be returned and its validity will be extended for 60 minutes.

### HTTP Request

POST `/fapi/v1/listenKey`

### Request Weight

**1**

### Request Parameters

None

### Response Example

```json
{
  "listenKey": "pqia91ma19a5s61cv6a81va65sdf19v8a65a1a5s61cv6a81va65sdf19v8a65a1"
}
```

> Source:
> [https://developers.binance.com/docs/derivatives/usds-margined-futures/user-data-streams/Start-User-Data-Stream](https://developers.binance.com/docs/derivatives/usds-margined-futures/user-data-streams/Start-User-Data-Stream)

## Keepalive User Data Stream (USER_STREAM)

### API Description

Keepalive a user data stream to prevent a time out. User data streams will close
after 60 minutes. It's recommended to send a ping about every 60 minutes.

### HTTP Request

PUT `/fapi/v1/listenKey`

### Request Weight

**1**

### Request Parameters

None

### Response Example

```json
{
  "listenKey": "3HBntNTepshgEdjIwSUIBgB9keLyOCg5qv3n6bYAtktG8ejcaW5HXz9Vx1JgIieg" //the listenkey which got extended
}
```

> Source:
> [https://developers.binance.com/docs/derivatives/usds-margined-futures/user-data-streams/Keepalive-User-Data-Stream](https://developers.binance.com/docs/derivatives/usds-margined-futures/user-data-streams/Keepalive-User-Data-Stream)

## Close User Data Stream (USER_STREAM)

### API Description

Close out a user data stream.

### HTTP Request

DELETE `/fapi/v1/listenKey`

### Request Weight

1

### Request Parameters

None

### Response Example

```json
{}
```

> Source:
> [https://developers.binance.com/docs/derivatives/usds-margined-futures/user-data-streams/Close-User-Data-Stream](https://developers.binance.com/docs/derivatives/usds-margined-futures/user-data-streams/Close-User-Data-Stream)

## Start User Data Stream (USER_STREAM)

### API Description

Start a new user data stream. The stream will close after 60 minutes unless a
keepalive is sent. If the account has an active `listenKey`, that `listenKey`
will be returned and its validity will be extended for 60 minutes.

### Method

`userDataStream.start`

### Request

```json
{
  "id": "d3df8a61-98ea-4fe0-8f4e-0fcea5d418b0",
  "method": "userDataStream.start",
  "params": {
    "apiKey": "vmPUZE6mv9SD5VNHk4HlWFsOr6aKE2zvsw0MuIgwCIPy6utIco14y7Ju91duEh8A"
  }
}
```

### Request Weight

**1**

### Request Parameters

None

### Response Example

```json
{
  "id": "d3df8a61-98ea-4fe0-8f4e-0fcea5d418b0",
  "status": 200,
  "result": {
    "listenKey": "xs0mRXdAKlIPDRFrlPcw0qI41Eh3ixNntmymGyhrhgqo7L6FuLaWArTD7RLP"
  },
  "rateLimits": [
    {
      "rateLimitType": "REQUEST_WEIGHT",
      "interval": "MINUTE",
      "intervalNum": 1,
      "limit": 2400,
      "count": 2
    }
  ]
}
```

> Source:
> [https://developers.binance.com/docs/derivatives/usds-margined-futures/user-data-streams/Start-User-Data-Stream-Wsp](https://developers.binance.com/docs/derivatives/usds-margined-futures/user-data-streams/Start-User-Data-Stream-Wsp)

## Keepalive User Data Stream (USER_STREAM)

### API Description

Keepalive a user data stream to prevent a time out. User data streams will close
after 60 minutes. It's recommended to send a ping about every 60 minutes.

### Method

`userDataStream.ping`

### Request

```json
{
  "id": "815d5fce-0880-4287-a567-80badf004c74",
  "method": "userDataStream.ping",
  "params": {
    "apiKey": "vmPUZE6mv9SD5VNHk9HlWFsOr9aLE2zvsw0MuIgwCIPy8atIco14y7Ju91duEh8A"
  }
}
```

### Request Weight

**1**

### Request Parameters

None

### Response Example

```json
{
  "id": "815d5fce-0880-4287-a567-80badf004c74",
  "status": 200,
  "result": {
    "listenKey": "3HBntNTepshgEdjIwSUIBgB9keLyOCg5qv3n6bYAtktG8ejcaW5HXz9Vx1JgIieg"
  },
  "rateLimits": [
    {
      "rateLimitType": "REQUEST_WEIGHT",
      "interval": "MINUTE",
      "intervalNum": 1,
      "limit": 2400,
      "count": 2
    }
  ]
}
```

> Source:
> [https://developers.binance.com/docs/derivatives/usds-margined-futures/user-data-streams/Keepalive-User-Data-Stream-Wsp](https://developers.binance.com/docs/derivatives/usds-margined-futures/user-data-streams/Keepalive-User-Data-Stream-Wsp)

## Close User Data Stream (USER_STREAM)

### API Description

Close out a user data stream.

### Method

`userDataStream.stop`

### Request

```json
{
  "id": "819e1b1b-8c06-485b-a13e-131326c69599",
  "method": "userDataStream.stop",
  "params": {
    "apiKey": "vmPUZE6mv9SD5VNHk9HlWFsOr9aLE2zvsw0MuIgwCIPy8atIco14y7Ju91duEh8A"
  }
}
```

### Request Weight

**1**

### Request Parameters

None

### Response Example

```json
{
  "id": "819e1b1b-8c06-485b-a13e-131326c69599",
  "status": 200,
  "result": {},
  "rateLimits": [
    {
      "rateLimitType": "REQUEST_WEIGHT",
      "interval": "MINUTE",
      "intervalNum": 1,
      "limit": 2400,
      "count": 2
    }
  ]
}
```

> Source:
> [https://developers.binance.com/docs/derivatives/usds-margined-futures/user-data-streams/Close-User-Data-Stream-Wsp](https://developers.binance.com/docs/derivatives/usds-margined-futures/user-data-streams/Close-User-Data-Stream-Wsp)

## Event: User Data Stream Expired

### Event Description

When the `listenKey` used for the user data stream turns expired, this event
will be pushed.

**Notice:**

> - This event is not related to the websocket disconnection.
> - This event will be received only when a valid `listenKey` in connection got
>   expired.
> - No more user data event will be updated after this event received until a
>   new valid `listenKey` used.

### Event Name

`listenKeyExpired`

### Response Example

```json
{
  "e": "listenKeyExpired", // event type
  "E": "1736996475556", // event time
  "listenKey": "WsCMN0a4KHUPTQuX6IUnqEZfB1inxmv1qR4kbf1LuEjur5VdbzqvyxqG9TSjVVxv"
}
```

> Source:
> [https://developers.binance.com/docs/derivatives/usds-margined-futures/user-data-streams/Event-User-Data-Stream-Expired](https://developers.binance.com/docs/derivatives/usds-margined-futures/user-data-streams/Event-User-Data-Stream-Expired)

## Event: Balance and Position Update

### Event Description

Event type is `ACCOUNT_UPDATE`.

- When balance or position get updated, this event will be pushed.

  - `ACCOUNT_UPDATE` will be pushed only when update happens on user's account,
    including changes on balances, positions, or margin type.
  - Unfilled orders or cancelled orders will not make the event `ACCOUNT_UPDATE`
    pushed, since there's no change on positions.
  - "position" in `ACCOUNT_UPDATE`: Only symbols of changed positions will be
    pushed.

- When "FUNDING FEE" changes to the user's balance, the event will be pushed
  with the brief message:

  - When "FUNDING FEE" occurs in a **crossed position**, `ACCOUNT_UPDATE` will
    be pushed with only the balance `B`(including the "FUNDING FEE" asset only),
    without any position `P` message.
  - When "FUNDING FEE" occurs in an **isolated position**, `ACCOUNT_UPDATE` will
    be pushed with only the balance `B`(including the "FUNDING FEE" asset only)
    and the relative position message `P`( including the isolated position on
    which the "FUNDING FEE" occurs only, without any other position message).

- The field "m" represents the reason type for the event and may shows the
  following possible types:

  - DEPOSIT
  - WITHDRAW
  - ORDER
  - FUNDING_FEE
  - WITHDRAW_REJECT
  - ADJUSTMENT
  - INSURANCE_CLEAR
  - ADMIN_DEPOSIT
  - ADMIN_WITHDRAW
  - MARGIN_TRANSFER
  - MARGIN_TYPE_CHANGE
  - ASSET_TRANSFER
  - OPTIONS_PREMIUM_FEE
  - OPTIONS_SETTLE_PROFIT
  - AUTO_EXCHANGE
  - COIN_SWAP_DEPOSIT
  - COIN_SWAP_WITHDRAW

- The field "bc" represents the balance change except for PnL and commission.

### Event Name

`ACCOUNT_UPDATE`

### Response Example

```json
{
  "e": "ACCOUNT_UPDATE",				// Event Type
  "E": 1564745798939,            		// Event Time
  "T": 1564745798938 ,           		// Transaction
  "a":                          		// Update Data
    {
      "m":"ORDER",						// Event reason type
      "B":[                     		// Balances
        {
          "a":"USDT",           		// Asset
          "wb":"122624.12345678",    	// Wallet Balance
          "cw":"100.12345678",			// Cross Wallet Balance
          "bc":"50.12345678"			// Balance Change except PnL and Commission
        },
        {
          "a":"BUSD",
          "wb":"1.00000000",
          "cw":"0.00000000",
          "bc":"-49.12345678"
        }
      ],
      "P":[
        {
          "s":"BTCUSDT",          	// Symbol
          "pa":"0",               	// Position Amount
          "ep":"0.00000",            // Entry Price
          "bep":"0",                // breakeven price
		  "cr":"200",             	// (Pre-fee) Accumulated Realized
          "up":"0",						// Unrealized PnL
          "mt":"isolated",				// Margin Type
          "iw":"0.00000000",			// Isolated Wallet (if isolated position)
          "ps":"BOTH"					// Position Side
        }，
        {
        	"s":"BTCUSDT",
        	"pa":"20",
        	"ep":"6563.66500",
        	"bep":"0",                // breakeven price
        	"cr":"0",
        	"up":"2850.21200",
        	"mt":"isolated",
        	"iw":"13200.70726908",
        	"ps":"LONG"
      	 },
        {
        	"s":"BTCUSDT",
        	"pa":"-10",
        	"ep":"6563.86000",
        	"bep":"6563.6",          // breakeven price
        	"cr":"-45.04000000",
        	"up":"-1423.15600",
        	"mt":"isolated",
        	"iw":"6570.42511771",
        	"ps":"SHORT"
        }
      ]
    }
}
```

> Source:
> [https://developers.binance.com/docs/derivatives/usds-margined-futures/user-data-streams/Event-Balance-and-Position-Update](https://developers.binance.com/docs/derivatives/usds-margined-futures/user-data-streams/Event-Balance-and-Position-Update)

## Event: Margin Call

### Event Description

- When the user's position risk ratio is too high, this stream will be pushed.
- This message is only used as risk guidance information and is not recommended
  for investment strategies.
- In the case of a highly volatile market, there may be the possibility that the
  user's position has been liquidated at the same time when this stream is
  pushed out.

### Event Name

`MARGIN_CALL`

### Response Example

```json
{
  "e": "MARGIN_CALL", // Event Type
  "E": 1587727187525, // Event Time
  "cw": "3.16812045", // Cross Wallet Balance. Only pushed with crossed position margin call
  "p": [
    // Position(s) of Margin Call
    {
      "s": "ETHUSDT", // Symbol
      "ps": "LONG", // Position Side
      "pa": "1.327", // Position Amount
      "mt": "CROSSED", // Margin Type
      "iw": "0", // Isolated Wallet (if isolated position)
      "mp": "187.17127", // Mark Price
      "up": "-1.166074", // Unrealized PnL
      "mm": "1.614445" // Maintenance Margin Required
    }
  ]
}
```

> Source:
> [https://developers.binance.com/docs/derivatives/usds-margined-futures/user-data-streams/Event-Margin-Call](https://developers.binance.com/docs/derivatives/usds-margined-futures/user-data-streams/Event-Margin-Call)

## Event: Order Update

### Event Description

When new order created, order status changed will push such event. event type is
`ORDER_TRADE_UPDATE`.

**Side**

- BUY
- SELL

**Order Type**

- LIMIT
- MARKET
- STOP
- STOP_MARKET
- TAKE_PROFIT
- TAKE_PROFIT_MARKET
- TRAILING_STOP_MARKET
- LIQUIDATION

**Execution Type**

- NEW
- CANCELED
- CALCULATED - Liquidation Execution
- EXPIRED
- TRADE
- AMENDMENT - Order Modified

**Order Status**

- NEW
- PARTIALLY_FILLED
- FILLED
- CANCELED
- EXPIRED
- EXPIRED_IN_MATCH

**Time in force**

- GTC
- IOC
- FOK
- GTX

**Working Type**

- MARK_PRICE
- CONTRACT_PRICE

**Liquidation and ADL:**

- If user gets liquidated due to insufficient margin balance:

  - `c` shows as "autoclose-XXX"，`X` shows as "NEW"

- If user has enough margin balance but gets ADL:

  - `c` shows as “adl_autoclose”，`X` shows as “NEW”

### Event Name

`ORDER_TRADE_UPDATE`

### Response Example

```json
{
  "e": "ORDER_TRADE_UPDATE", // Event Type
  "E": 1568879465651, // Event Time
  "T": 1568879465650, // Transaction Time
  "o": {
    "s": "BTCUSDT", // Symbol
    "c": "TEST", // Client Order Id
    // special client order id:
    // starts with "autoclose-": liquidation order
    // "adl_autoclose": ADL auto close order
    // "settlement_autoclose-": settlement order for delisting or delivery
    "S": "SELL", // Side
    "o": "TRAILING_STOP_MARKET", // Order Type
    "f": "GTC", // Time in Force
    "q": "0.001", // Original Quantity
    "p": "0", // Original Price
    "ap": "0", // Average Price
    "sp": "7103.04", // Stop Price. Please ignore with TRAILING_STOP_MARKET order
    "x": "NEW", // Execution Type
    "X": "NEW", // Order Status
    "i": 8886774, // Order Id
    "l": "0", // Order Last Filled Quantity
    "z": "0", // Order Filled Accumulated Quantity
    "L": "0", // Last Filled Price
    "N": "USDT", // Commission Asset
    "n": "0", // Commission
    "T": 1568879465650, // Order Trade Time
    "t": 0, // Trade Id
    "b": "0", // Bids Notional
    "a": "9.91", // Ask Notional
    "m": false, // Is this trade the maker side?
    "R": false, // Is this reduce only
    "wt": "CONTRACT_PRICE", // Stop Price Working Type
    "ot": "TRAILING_STOP_MARKET", // Original Order Type
    "ps": "LONG", // Position Side
    "cp": false, // If Close-All, pushed with conditional order
    "AP": "7476.89", // Activation Price, only puhed with TRAILING_STOP_MARKET order
    "cr": "5.0", // Callback Rate, only puhed with TRAILING_STOP_MARKET order
    "pP": false, // If price protection is turned on
    "si": 0, // ignore
    "ss": 0, // ignore
    "rp": "0", // Realized Profit of the trade
    "V": "EXPIRE_TAKER", // STP mode
    "pm": "OPPONENT", // Price match mode
    "gtd": 0 // TIF GTD order auto cancel time
  }
}
```

> Source:
> [https://developers.binance.com/docs/derivatives/usds-margined-futures/user-data-streams/Event-Order-Update](https://developers.binance.com/docs/derivatives/usds-margined-futures/user-data-streams/Event-Order-Update)

## Event: Trade Lite Update

### Event Description

Fast trade stream reduces data latency compared original `ORDER_TRADE_UPDATE`
stream. However, it only pushes TRADE Execution Type, and fewer data fields.

### Event Name

`TRADE_LITE`

### Response Example

```json
{
  "e": "TRADE_LITE", // Event Type
  "E": 1721895408092, // Event Time
  "T": 1721895408214, // Transaction Time
  "s": "BTCUSDT", // Symbol
  "q": "0.001", // Original Quantity
  "p": "0", // Original Price
  "m": false, // Is this trade the maker side?
  "c": "z8hcUoOsqEdKMeKPSABslD", // Client Order Id
  // special client order id:
  // starts with "autoclose-": liquidation order
  // "adl_autoclose": ADL auto close order
  // "settlement_autoclose-": settlement order for delisting or delivery
  "S": "BUY", // Side
  "L": "64089.20", // Last Filled Price
  "l": "0.040", // Order Last Filled Quantity
  "t": 109100866, // Trade Id
  "i": 8886774 // Order Id
}
```

> Source:
> [https://developers.binance.com/docs/derivatives/usds-margined-futures/user-data-streams/Event-Trade-Lite](https://developers.binance.com/docs/derivatives/usds-margined-futures/user-data-streams/Event-Trade-Lite)

## Event: Account Configuration Update previous Leverage Update

### Event Description

When the account configuration is changed, the event type will be pushed as
`ACCOUNT_CONFIG_UPDATE` When the leverage of a trade pair changes, the payload
will contain the object `ac` to represent the account configuration of the trade
pair, where `s` represents the specific trade pair and `l` represents the
leverage When the user Multi-Assets margin mode changes the payload will contain
the object `ai` representing the user account configuration, where `j`
represents the user Multi-Assets margin mode

### Event Name

`ACCOUNT_CONFIG_UPDATE`

### Response Example

> **Payload:**

```json
{
  "e": "ACCOUNT_CONFIG_UPDATE", // Event Type
  "E": 1611646737479, // Event Time
  "T": 1611646737476, // Transaction Time
  "ac": {
    "s": "BTCUSDT", // symbol
    "l": 25 // leverage
  }
}
```

> **Or**

```json
{
  "e": "ACCOUNT_CONFIG_UPDATE", // Event Type
  "E": 1611646737479, // Event Time
  "T": 1611646737476, // Transaction Time
  "ai": {
    // User's Account Configuration
    "j": true // Multi-Assets Mode
  }
}
```

> Source:
> [https://developers.binance.com/docs/derivatives/usds-margined-futures/user-data-streams/Event-Account-Configuration-Update-previous-Leverage-Update](https://developers.binance.com/docs/derivatives/usds-margined-futures/user-data-streams/Event-Account-Configuration-Update-previous-Leverage-Update)

## Event: STRATEGY_UPDATE

### Event Description

`STRATEGY_UPDATE` update when a strategy is created/cancelled/expired, ...etc.

**Strategy Status**

- NEW
- WORKING
- CANCELLED
- EXPIRED

**opCode**

- 8001: The strategy params have been updated
- 8002: User cancelled the strategy
- 8003: User manually placed or cancelled an order
- 8004: The stop limit of this order reached
- 8005: User position liquidated
- 8006: Max open order limit reached
- 8007: New grid order
- 8008: Margin not enough
- 8009: Price out of bounds
- 8010: Market is closed or paused
- 8011: Close position failed, unable to fill
- 8012: Exceeded the maximum allowable notional value at current leverage
- 8013: Grid expired due to incomplete KYC verification or access from a
  restricted jurisdiction
- 8014: Violated Futures Trading Quantitative Rules. Strategy stopped
- 8015: User position empty or liquidated

### Event Name

`STRATEGY_UPDATE`

### Response Example

```json
{
  "e": "STRATEGY_UPDATE", // Event Type
  "T": 1669261797627, // Transaction Time
  "E": 1669261797628, // Event Time
  "su": {
    "si": 176054594, // Strategy ID
    "st": "GRID", // Strategy Type
    "ss": "NEW", // Strategy Status
    "s": "BTCUSDT", // Symbol
    "ut": 1669261797627, // Update Time
    "c": 8007 // opCode
  }
}
```

> Source:
> [https://developers.binance.com/docs/derivatives/usds-margined-futures/user-data-streams/Event-STRATEGY-UPDATE](https://developers.binance.com/docs/derivatives/usds-margined-futures/user-data-streams/Event-STRATEGY-UPDATE)

## Event: GRID_UPDATE

### Event Description

`GRID_UPDATE` update when a sub order of a grid is filled or partially filled.
**Strategy Status**

- NEW
- WORKING
- CANCELLED
- EXPIRED

### Event Name

`GRID_UPDATE`

### Response Example

```json
{
  "e": "GRID_UPDATE", // Event Type
  "T": 1669262908216, // Transaction Time
  "E": 1669262908218, // Event Time
  "gu": {
    "si": 176057039, // Strategy ID
    "st": "GRID", // Strategy Type
    "ss": "WORKING", // Strategy Status
    "s": "BTCUSDT", // Symbol
    "r": "-0.00300716", // Realized PNL
    "up": "16720", // Unmatched Average Price
    "uq": "-0.001", // Unmatched Qty
    "uf": "-0.00300716", // Unmatched Fee
    "mp": "0.0", // Matched PNL
    "ut": 1669262908197 // Update Time
  }
}
```

> Source:
> [https://developers.binance.com/docs/derivatives/usds-margined-futures/user-data-streams/Event-GRID-UPDATE](https://developers.binance.com/docs/derivatives/usds-margined-futures/user-data-streams/Event-GRID-UPDATE)

## Event: Conditional_Order_Trigger_Reject

### Event Description

`CONDITIONAL_ORDER_TRIGGER_REJECT` update when a triggered TP/SL order got
rejected.

### Event Name

`CONDITIONAL_ORDER_TRIGGER_REJECT`

### Response Example

```json
{
  "e": "CONDITIONAL_ORDER_TRIGGER_REJECT", // Event Type
  "E": 1685517224945, // Event Time
  "T": 1685517224955, // me message send Time
  "or": {
    "s": "ETHUSDT", // Symbol
    "i": 155618472834, // orderId
    "r": "Due to the order could not be filled immediately, the FOK order has been rejected. The order will not be recorded in the order history" // reject reason
  }
}
```

> Source:
> [https://developers.binance.com/docs/derivatives/usds-margined-futures/user-data-streams/Event-Conditional-Order-Trigger-Reject](https://developers.binance.com/docs/derivatives/usds-margined-futures/user-data-streams/Event-Conditional-Order-Trigger-Reject)

## Futures Account Balance V2(USER_DATA)

### API Description

Query account balance info

### Method

`v2/account.balance`

### Request

```json
{
  "id": "605a6d20-6588-4cb9-afa0-b0ab087507ba",
  "method": "v2/account.balance",
  "params": {
    "apiKey": "xTaDyrmvA9XT2oBHHjy39zyPzKCvMdtH3b9q4xadkAg2dNSJXQGCxzui26L823W2",
    "timestamp": 1702561978458,
    "signature": "208bb94a26f99aa122b1319490ca9cb2798fccc81d9b6449521a26268d53217a"
  }
}
```

### Request Weight

**5**

### Request Parameters

| Name       | Type | Mandatory | Description |
| ---------- | ---- | --------- | ----------- |
| recvWindow | LONG | NO        |             |
| timestamp  | LONG | YES       |             |

### Response Example

```json
{
    "id": "605a6d20-6588-4cb9-afa0-b0ab087507ba",
    "status": 200,
    "result": [
      {
        "accountAlias": "SgsR",              // unique account code
        "asset": "USDT",  	                // asset name
        "balance": "122607.35137903",        // wallet balance
        "crossWalletBalance": "23.72469206", // crossed wallet balance
        "crossUnPnl": "0.00000000"           // unrealized profit of crossed positions
        "availableBalance": "23.72469206",   // available balance
        "maxWithdrawAmount": "23.72469206",  // maximum amount for transfer out
        "marginAvailable": true,             // whether the asset can be used as margin in Multi-Assets mode
        "updateTime": 1617939110373
      }
    ],
    "rateLimits": [
      {
        "rateLimitType": "REQUEST_WEIGHT",
        "interval": "MINUTE",
        "intervalNum": 1,
        "limit": 2400,
        "count": 20
      }
    ]
}
```

> Source:
> [https://developers.binance.com/docs/derivatives/usds-margined-futures/account/websocket-api](https://developers.binance.com/docs/derivatives/usds-margined-futures/account/websocket-api)

## Futures Account Balance(USER_DATA)

### API Description

Query account balance info

### Method

`account.balance`

### Request

```json
{
  "id": "605a6d20-6588-4cb9-afa0-b0ab087507ba",
  "method": "account.balance",
  "params": {
    "apiKey": "xTaDyrmvA9XT2oBHHjy39zyPzKCvMdtH3b9q4xadkAg2dNSJXQGCxzui26L823W2",
    "timestamp": 1702561978458,
    "signature": "208bb94a26f99aa122b1319490ca9cb2798fccc81d9b6449521a26268d53217a"
  }
}
```

### Request Weight

**5**

### Request Parameters

| Name       | Type | Mandatory | Description |
| ---------- | ---- | --------- | ----------- |
| recvWindow | LONG | NO        |             |
| timestamp  | LONG | YES       |             |

### Response Example

```json
{
    "id": "605a6d20-6588-4cb9-afa0-b0ab087507ba",
    "status": 200,
    "result": [
        {
            "accountAlias": "SgsR",    // unique account code
            "asset": "USDT",    // asset name
            "balance": "122607.35137903", // wallet balance
            "crossWalletBalance": "23.72469206", // crossed wallet balance
            "crossUnPnl": "0.00000000"  // unrealized profit of crossed positions
            "availableBalance": "23.72469206",       // available balance
            "maxWithdrawAmount": "23.72469206",     // maximum amount for transfer out
            "marginAvailable": true,    // whether the asset can be used as margin in Multi-Assets mode
            "updateTime": 1617939110373
        }
    ],
    "rateLimits": [
      {
        "rateLimitType": "REQUEST_WEIGHT",
        "interval": "MINUTE",
        "intervalNum": 1,
        "limit": 2400,
        "count": 20
      }
    ]
}
```

> Source:
> [https://developers.binance.com/docs/derivatives/usds-margined-futures/account/websocket-api/Futures-Account-Balance](https://developers.binance.com/docs/derivatives/usds-margined-futures/account/websocket-api/Futures-Account-Balance)

## Account Information V2(USER_DATA)

### API Description

Get current account information. User in single-asset/ multi-assets mode will
see different value, see comments in response section for detail.

### Method

`v2/account.status`

### Request

```json
{
  "id": "605a6d20-6588-4cb9-afa0-b0ab087507ba",
  "method": "v2/account.status",
  "params": {
    "apiKey": "xTaDyrmvA9XT2oBHHjy39zyPzKCvMdtH3b9q4xadkAg2dNSJXQGCxzui26L823W2",
    "timestamp": 1702620814781,
    "signature": "6bb98ef84170c70ba3d01f44261bfdf50fef374e551e590de22b5c3b729b1d8c"
  }
}
```

### Request Weight

**5**

### Request Parameters

| Name       | Type | Mandatory | Description |
| ---------- | ---- | --------- | ----------- |
| recvWindow | LONG | NO        |             |
| timestamp  | LONG | YES       |             |

### Response Example

> Single Asset Mode

```json
{
  "id": "605a6d20-6588-4cb9-afa0-b0ab087507ba",
  "status": 200,
  "result": {
  	"totalInitialMargin": "0.00000000",            // total initial margin required with current mark price (useless with isolated positions), only for USDT asset
  	"totalMaintMargin": "0.00000000",  	           // total maintenance margin required, only for USDT asset
  	"totalWalletBalance": "103.12345678",           // total wallet balance, only for USDT asset
  	"totalUnrealizedProfit": "0.00000000",         // total unrealized profit, only for USDT asset
  	"totalMarginBalance": "103.12345678",           // total margin balance, only for USDT asset
  	"totalPositionInitialMargin": "0.00000000",    // initial margin required for positions with current mark price, only for USDT asset
  	"totalOpenOrderInitialMargin": "0.00000000",   // initial margin required for open orders with current mark price, only for USDT asset
  	"totalCrossWalletBalance": "103.12345678",      // crossed wallet balance, only for USDT asset
  	"totalCrossUnPnl": "0.00000000",	           // unrealized profit of crossed positions, only for USDT asset
  	"availableBalance": "103.12345678",             // available balance, only for USDT asset
  	"maxWithdrawAmount": "103.12345678"             // maximum amount for transfer out, only for USDT asset
  	"assets": [ // For assets that are quote assets, USDT/USDC/BTC
  		{
  			"asset": "USDT",			            // asset name
  			"walletBalance": "23.72469206",         // wallet balance
  			"unrealizedProfit": "0.00000000",       // unrealized profit
  			"marginBalance": "23.72469206",         // margin balance
  			"maintMargin": "0.00000000",	        // maintenance margin required
  			"initialMargin": "0.00000000",          // total initial margin required with current mark price
  			"positionInitialMargin": "0.00000000",  // initial margin required for positions with current mark price
  			"openOrderInitialMargin": "0.00000000", // initial margin required for open orders with current mark price
  			"crossWalletBalance": "23.72469206",    // crossed wallet balance
  			"crossUnPnl": "0.00000000"              // unrealized profit of crossed positions
  			"availableBalance": "23.72469206",      // available balance
  			"maxWithdrawAmount": "23.72469206",     // maximum amount for transfer out
  			"updateTime": 1625474304765             // last update time
  		},   
   		{
  			"asset": "USDC",			            // asset name
  			"walletBalance": "103.12345678",         // wallet balance
  			"unrealizedProfit": "0.00000000",       // unrealized profit
  			"marginBalance": "103.12345678",         // margin balance
  			"maintMargin": "0.00000000",	        // maintenance margin required
  			"initialMargin": "0.00000000",          // total initial margin required with current mark price
  			"positionInitialMargin": "0.00000000",  // initial margin required for positions with current mark price
  			"openOrderInitialMargin": "0.00000000", // initial margin required for open orders with current mark price
  			"crossWalletBalance": "103.12345678",    // crossed wallet balance
  			"crossUnPnl": "0.00000000"              // unrealized profit of crossed positions
  			"availableBalance": "126.72469206",      // available balance
  			"maxWithdrawAmount": "103.12345678",     // maximum amount for transfer out
  			"updateTime": 1625474304765             // last update time
  		},  
      ],
  	"positions": [  // positions of all symbols user had position/ open orders are returned
  		            // only "BOTH" positions will be returned with One-way mode
  		            // only "LONG" and "SHORT" positions will be returned with Hedge mode
     	  {
             "symbol": "BTCUSDT",
             "positionSide": "BOTH",            // position side
             "positionAmt": "1.000",
             "unrealizedProfit": "0.00000000",  // unrealized profit     
             "isolatedMargin": "0.00000000",
             "notional": "0",
             "isolatedWallet": "0",
             "initialMargin": "0",              // initial margin required with current mark price
             "maintMargin": "0",                // maintenance margin required
             "updateTime": 0
    	  }
  	]
  },
  "rateLimits": [
    {
      "rateLimitType": "REQUEST_WEIGHT",
      "interval": "MINUTE",
      "intervalNum": 1,
      "limit": 2400,
      "count": 20
    }
  ]
}
```

> Multi-Asset Mode

```json
{
  "id": "605a6d20-6588-4cb9-afa0-b0ab087507ba",
  "status": 200,
  "result": {
  	"totalInitialMargin": "0.00000000",            // the sum of USD value of all cross positions/open order initial margin
  	"totalMaintMargin": "0.00000000",  	           // the sum of USD value of all cross positions maintenance margin
  	"totalWalletBalance": "126.72469206",          // total wallet balance in USD
  	"totalUnrealizedProfit": "0.00000000",         // total unrealized profit in USD
  	"totalMarginBalance": "126.72469206",          // total margin balance in USD
  	"totalPositionInitialMargin": "0.00000000",    // the sum of USD value of all cross positions initial margin
  	"totalOpenOrderInitialMargin": "0.00000000",   // initial margin required for open orders with current mark price in USD
  	"totalCrossWalletBalance": "126.72469206",     // crossed wallet balance in USD
  	"totalCrossUnPnl": "0.00000000",	           // unrealized profit of crossed positions in USD
  	"availableBalance": "126.72469206",            // available balance in USD
  	"maxWithdrawAmount": "126.72469206"            // maximum virtual amount for transfer out in USD
  	"assets": [
  		{
  			"asset": "USDT",			         // asset name
  			"walletBalance": "23.72469206",      // wallet balance
  			"unrealizedProfit": "0.00000000",    // unrealized profit
  			"marginBalance": "23.72469206",      // margin balance
  			"maintMargin": "0.00000000",	     // maintenance margin required
  			"initialMargin": "0.00000000",       // total initial margin required with current mark price
  			"positionInitialMargin": "0.00000000",    //initial margin required for positions with current mark price
  			"openOrderInitialMargin": "0.00000000",   // initial margin required for open orders with current mark price
  			"crossWalletBalance": "23.72469206",      // crossed wallet balance
  			"crossUnPnl": "0.00000000"       // unrealized profit of crossed positions
  			"availableBalance": "126.72469206",       // available balance
  			"maxWithdrawAmount": "23.72469206",     // maximum amount for transfer out
  			"marginAvailable": true,    // whether the asset can be used as margin in Multi-Assets mode
  			"updateTime": 1625474304765 // last update time
  		},
  		{
  			"asset": "BUSD",			// asset name
  			"walletBalance": "103.12345678",      // wallet balance
  			"unrealizedProfit": "0.00000000",    // unrealized profit
  			"marginBalance": "103.12345678",      // margin balance
  			"maintMargin": "0.00000000",	    // maintenance margin required
  			"initialMargin": "0.00000000",    // total initial margin required with current mark price
  			"positionInitialMargin": "0.00000000",    //initial margin required for positions with current mark price
  			"openOrderInitialMargin": "0.00000000",   // initial margin required for open orders with current mark price
  			"crossWalletBalance": "103.12345678",      // crossed wallet balance
  			"crossUnPnl": "0.00000000"       // unrealized profit of crossed positions
  			"availableBalance": "126.72469206",       // available balance
  			"maxWithdrawAmount": "103.12345678",     // maximum amount for transfer out
  			"marginAvailable": true,    // whether the asset can be used as margin in Multi-Assets mode
  			"updateTime": 1625474304765 // last update time
  		}
  	],
   	"positions": [  // positions of all symbols user had position are returned
                      // only "BOTH" positions will be returned with One-way mode
  		            // only "LONG" and "SHORT" positions will be returned with Hedge mode
     	  {
             "symbol": "BTCUSDT",
             "positionSide": "BOTH",            // position side
             "positionAmt": "1.000",
             "unrealizedProfit": "0.00000000",  // unrealized profit     
             "isolatedMargin": "0.00000000",
             "notional": "0",
             "isolatedWallet": "0",
             "initialMargin": "0",              // initial margin required with current mark price
             "maintMargin": "0",                // maintenance margin required
             "updateTime": 0
    	  }
  	]
  },
  "rateLimits": [
    {
      "rateLimitType": "REQUEST_WEIGHT",
      "interval": "MINUTE",
      "intervalNum": 1,
      "limit": 2400,
      "count": 20
    }
  ]
}
```

> Source:
> [https://developers.binance.com/docs/derivatives/usds-margined-futures/account/websocket-api/Account-Information-V2](https://developers.binance.com/docs/derivatives/usds-margined-futures/account/websocket-api/Account-Information-V2)

## Account Information(USER_DATA)

### API Description

Get current account information. User in single-asset/ multi-assets mode will
see different value, see comments in response section for detail.

### Method

`account.status`

### Request

```json
{
  "id": "605a6d20-6588-4cb9-afa0-b0ab087507ba",
  "method": "account.status",
  "params": {
    "apiKey": "xTaDyrmvA9XT2oBHHjy39zyPzKCvMdtH3b9q4xadkAg2dNSJXQGCxzui26L823W2",
    "timestamp": 1702620814781,
    "signature": "6bb98ef84170c70ba3d01f44261bfdf50fef374e551e590de22b5c3b729b1d8c"
  }
}
```

### Request Weight

**5**

### Request Parameters

| Name       | Type | Mandatory | Description |
| ---------- | ---- | --------- | ----------- |
| recvWindow | LONG | NO        |             |
| timestamp  | LONG | YES       |             |

### Response Example

> Single Asset Mode

```json
{
  "id": "605a6d20-6588-4cb9-afa0-b0ab087507ba",
  "status": 200,
  "result": {
    "feeTier": 0,       // account commission tier
    "canTrade": true,   // if can trade
    "canDeposit": true,     // if can transfer in asset
    "canWithdraw": true,    // if can transfer out asset
    "updateTime": 0,        // reserved property, please ignore
    "multiAssetsMargin": false,
    "tradeGroupId": -1,
    "totalInitialMargin": "0.00000000",    // total initial margin required with current mark price (useless with isolated positions), only for USDT asset
    "totalMaintMargin": "0.00000000",     // total maintenance margin required, only for USDT asset
    "totalWalletBalance": "23.72469206",     // total wallet balance, only for USDT asset
    "totalUnrealizedProfit": "0.00000000",   // total unrealized profit, only for USDT asset
    "totalMarginBalance": "23.72469206",     // total margin balance, only for USDT asset
    "totalPositionInitialMargin": "0.00000000",    // initial margin required for positions with current mark price, only for USDT asset
    "totalOpenOrderInitialMargin": "0.00000000",   // initial margin required for open orders with current mark price, only for USDT asset
    "totalCrossWalletBalance": "23.72469206",      // crossed wallet balance, only for USDT asset
    "totalCrossUnPnl": "0.00000000",      // unrealized profit of crossed positions, only for USDT asset
    "availableBalance": "23.72469206",       // available balance, only for USDT asset
    "maxWithdrawAmount": "23.72469206"     // maximum amount for transfer out, only for USDT asset
    "assets": [
        {
            "asset": "USDT",            // asset name
            "walletBalance": "23.72469206",      // wallet balance
            "unrealizedProfit": "0.00000000",    // unrealized profit
            "marginBalance": "23.72469206",      // margin balance
            "maintMargin": "0.00000000",        // maintenance margin required
            "initialMargin": "0.00000000",    // total initial margin required with current mark price
            "positionInitialMargin": "0.00000000",    //initial margin required for positions with current mark price
            "openOrderInitialMargin": "0.00000000",   // initial margin required for open orders with current mark price
            "crossWalletBalance": "23.72469206",      // crossed wallet balance
            "crossUnPnl": "0.00000000"       // unrealized profit of crossed positions
            "availableBalance": "23.72469206",       // available balance
            "maxWithdrawAmount": "23.72469206",     // maximum amount for transfer out
            "marginAvailable": true,    // whether the asset can be used as margin in Multi-Assets mode
            "updateTime": 1625474304765 // last update time
        },
        {
            "asset": "BUSD",            // asset name
            "walletBalance": "103.12345678",      // wallet balance
            "unrealizedProfit": "0.00000000",    // unrealized profit
            "marginBalance": "103.12345678",      // margin balance
            "maintMargin": "0.00000000",        // maintenance margin required
            "initialMargin": "0.00000000",    // total initial margin required with current mark price
            "positionInitialMargin": "0.00000000",    //initial margin required for positions with current mark price
            "openOrderInitialMargin": "0.00000000",   // initial margin required for open orders with current mark price
            "crossWalletBalance": "103.12345678",      // crossed wallet balance
            "crossUnPnl": "0.00000000"       // unrealized profit of crossed positions
            "availableBalance": "103.12345678",       // available balance
            "maxWithdrawAmount": "103.12345678",     // maximum amount for transfer out
            "marginAvailable": true,    // whether the asset can be used as margin in Multi-Assets mode
            "updateTime": 1625474304765 // last update time
        }
    ],
    "positions": [  // positions of all symbols in the market are returned
        // only "BOTH" positions will be returned with One-way mode
        // only "LONG" and "SHORT" positions will be returned with Hedge mode
        {
            "symbol": "BTCUSDT",    // symbol name
            "initialMargin": "0",   // initial margin required with current mark price
            "maintMargin": "0",     // maintenance margin required
            "unrealizedProfit": "0.00000000",  // unrealized profit
            "positionInitialMargin": "0",      // initial margin required for positions with current mark price
            "openOrderInitialMargin": "0",     // initial margin required for open orders with current mark price
            "leverage": "100",      // current initial leverage
            "isolated": true,       // if the position is isolated
            "entryPrice": "0.00000",    // average entry price
            "maxNotional": "250000",    // maximum available notional with current leverage
            "bidNotional": "0",  // bids notional, ignore
            "askNotional": "0",  // ask notional, ignore
            "positionSide": "BOTH",     // position side
            "positionAmt": "0",         // position amount
            "updateTime": 0           // last update time
        }
    ]
  },
  "rateLimits": [
    {
      "rateLimitType": "REQUEST_WEIGHT",
      "interval": "MINUTE",
      "intervalNum": 1,
      "limit": 2400,
      "count": 20
    }
  ]
}
```

> Multi-Asset Mode

```json
{
  "id": "605a6d20-6588-4cb9-afa0-b0ab087507ba",
  "status": 200,
  "result": {
      "feeTier": 0,       // account commission tier
      "canTrade": true,   // if can trade
      "canDeposit": true,     // if can transfer in asset
      "canWithdraw": true,    // if can transfer out asset
      "updateTime": 0,        // reserved property, please ignore
      "multiAssetsMargin": true,
      "tradeGroupId": -1,
      "totalInitialMargin": "0.00000000",    // the sum of USD value of all cross positions/open order initial margin
      "totalMaintMargin": "0.00000000",     // the sum of USD value of all cross positions maintenance margin
      "totalWalletBalance": "126.72469206",     // total wallet balance in USD
      "totalUnrealizedProfit": "0.00000000",   // total unrealized profit in USD
      "totalMarginBalance": "126.72469206",     // total margin balance in USD
      "totalPositionInitialMargin": "0.00000000",    // the sum of USD value of all cross positions initial margin
      "totalOpenOrderInitialMargin": "0.00000000",   // initial margin required for open orders with current mark price in USD
      "totalCrossWalletBalance": "126.72469206",      // crossed wallet balance in USD
      "totalCrossUnPnl": "0.00000000",      // unrealized profit of crossed positions in USD
      "availableBalance": "126.72469206",       // available balance in USD
      "maxWithdrawAmount": "126.72469206"     // maximum virtual amount for transfer out in USD
      "assets": [
          {
              "asset": "USDT",            // asset name
              "walletBalance": "23.72469206",      // wallet balance
              "unrealizedProfit": "0.00000000",    // unrealized profit
              "marginBalance": "23.72469206",      // margin balance
              "maintMargin": "0.00000000",        // maintenance margin required
              "initialMargin": "0.00000000",    // total initial margin required with current mark price
              "positionInitialMargin": "0.00000000",    //initial margin required for positions with current mark price
              "openOrderInitialMargin": "0.00000000",   // initial margin required for open orders with current mark price
              "crossWalletBalance": "23.72469206",      // crossed wallet balance
              "crossUnPnl": "0.00000000"       // unrealized profit of crossed positions
              "availableBalance": "126.72469206",       // available balance
              "maxWithdrawAmount": "23.72469206",     // maximum amount for transfer out
              "marginAvailable": true,    // whether the asset can be used as margin in Multi-Assets mode
              "updateTime": 1625474304765 // last update time
          },
          {
              "asset": "BUSD",            // asset name
              "walletBalance": "103.12345678",      // wallet balance
              "unrealizedProfit": "0.00000000",    // unrealized profit
              "marginBalance": "103.12345678",      // margin balance
              "maintMargin": "0.00000000",        // maintenance margin required
              "initialMargin": "0.00000000",    // total initial margin required with current mark price
              "positionInitialMargin": "0.00000000",    //initial margin required for positions with current mark price
              "openOrderInitialMargin": "0.00000000",   // initial margin required for open orders with current mark price
              "crossWalletBalance": "103.12345678",      // crossed wallet balance
              "crossUnPnl": "0.00000000"       // unrealized profit of crossed positions
              "availableBalance": "126.72469206",       // available balance
              "maxWithdrawAmount": "103.12345678",     // maximum amount for transfer out
              "marginAvailable": true,    // whether the asset can be used as margin in Multi-Assets mode
              "updateTime": 1625474304765 // last update time
          }
      ],
      "positions": [  // positions of all symbols in the market are returned
          // only "BOTH" positions will be returned with One-way mode
          // only "LONG" and "SHORT" positions will be returned with Hedge mode
          {
              "symbol": "BTCUSDT",    // symbol name
              "initialMargin": "0",   // initial margin required with current mark price
              "maintMargin": "0",     // maintenance margin required
              "unrealizedProfit": "0.00000000",  // unrealized profit
              "positionInitialMargin": "0",      // initial margin required for positions with current mark price
              "openOrderInitialMargin": "0",     // initial margin required for open orders with current mark price
              "leverage": "100",      // current initial leverage
              "isolated": true,       // if the position is isolated
              "entryPrice": "0.00000",    // average entry price
              "breakEvenPrice": "0.0",    // average entry price
              "maxNotional": "250000",    // maximum available notional with current leverage
              "bidNotional": "0",  // bids notional, ignore
              "askNotional": "0",  // ask notional, ignore
              "positionSide": "BOTH",     // position side
              "positionAmt": "0",         // position amount
              "updateTime": 0           // last update time
          }
      ]
  },
  "rateLimits": [
    {
      "rateLimitType": "REQUEST_WEIGHT",
      "interval": "MINUTE",
      "intervalNum": 1,
      "limit": 2400,
      "count": 20
    }
  ]
}
```

> Source:
> [https://developers.binance.com/docs/derivatives/usds-margined-futures/account/websocket-api/Account-Information](https://developers.binance.com/docs/derivatives/usds-margined-futures/account/websocket-api/Account-Information)
