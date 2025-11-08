# 11xx - Request issues[​](/docs/derivatives/coin-margined-futures/error-code#11xx---request-issues "Direct link to 11xx - Request issues")

### \-1100 ILLEGAL_CHARS[​](/docs/derivatives/coin-margined-futures/error-code#-1100-illegal_chars "Direct link to -1100 ILLEGAL_CHARS")

- Illegal characters found in a parameter.
- Illegal characters found in parameter '%s'; legal range is '%s'.

### \-1101 TOO_MANY_PARAMETERS[​](/docs/derivatives/coin-margined-futures/error-code#-1101-too_many_parameters "Direct link to -1101 TOO_MANY_PARAMETERS")

- Too many parameters sent for this endpoint.
- Too many parameters; expected '%s' and received '%s'.
- Duplicate values for a parameter detected.

### \-1102 MANDATORY_PARAM_EMPTY_OR_MALFORMED[​](/docs/derivatives/coin-margined-futures/error-code#-1102-mandatory_param_empty_or_malformed "Direct link to -1102 MANDATORY_PARAM_EMPTY_OR_MALFORMED")

- A mandatory parameter was not sent, was empty/null, or malformed.
- Mandatory parameter '%s' was not sent, was empty/null, or malformed.
- Param '%s' or '%s' must be sent, but both were empty/null!

### \-1103 UNKNOWN_PARAM[​](/docs/derivatives/coin-margined-futures/error-code#-1103-unknown_param "Direct link to -1103 UNKNOWN_PARAM")

- An unknown parameter was sent.

### \-1104 UNREAD_PARAMETERS[​](/docs/derivatives/coin-margined-futures/error-code#-1104-unread_parameters "Direct link to -1104 UNREAD_PARAMETERS")

- Not all sent parameters were read.
- Not all sent parameters were read; read '%s' parameter(s) but was sent '%s'.

### \-1105 PARAM_EMPTY[​](/docs/derivatives/coin-margined-futures/error-code#-1105-param_empty "Direct link to -1105 PARAM_EMPTY")

- A parameter was empty.
- Parameter '%s' was empty.

### \-1106 PARAM_NOT_REQUIRED[​](/docs/derivatives/coin-margined-futures/error-code#-1106-param_not_required "Direct link to -1106 PARAM_NOT_REQUIRED")

- A parameter was sent when not required.
- Parameter '%s' sent when not required.

### \-1108 BAD_ASSET[​](/docs/derivatives/coin-margined-futures/error-code#-1108-bad_asset "Direct link to -1108 BAD_ASSET")

- Invalid asset.

### \-1109 BAD_ACCOUNT[​](/docs/derivatives/coin-margined-futures/error-code#-1109-bad_account "Direct link to -1109 BAD_ACCOUNT")

- Invalid account.

### \-1110 BAD_INSTRUMENT_TYPE[​](/docs/derivatives/coin-margined-futures/error-code#-1110-bad_instrument_type "Direct link to -1110 BAD_INSTRUMENT_TYPE")

- Invalid symbolType.

### \-1111 BAD_PRECISION[​](/docs/derivatives/coin-margined-futures/error-code#-1111-bad_precision "Direct link to -1111 BAD_PRECISION")

- Precision is over the maximum defined for this asset.

### \-1112 NO_DEPTH[​](/docs/derivatives/coin-margined-futures/error-code#-1112-no_depth "Direct link to -1112 NO_DEPTH")

- No orders on book for symbol.

### \-1113 WITHDRAW_NOT_NEGATIVE[​](/docs/derivatives/coin-margined-futures/error-code#-1113-withdraw_not_negative "Direct link to -1113 WITHDRAW_NOT_NEGATIVE")

- Withdrawal amount must be negative.

### \-1114 TIF_NOT_REQUIRED[​](/docs/derivatives/coin-margined-futures/error-code#-1114-tif_not_required "Direct link to -1114 TIF_NOT_REQUIRED")

- TimeInForce parameter sent when not required.

### \-1115 INVALID_TIF[​](/docs/derivatives/coin-margined-futures/error-code#-1115-invalid_tif "Direct link to -1115 INVALID_TIF")

- Invalid timeInForce.

### \-1116 INVALID_ORDER_TYPE[​](/docs/derivatives/coin-margined-futures/error-code#-1116-invalid_order_type "Direct link to -1116 INVALID_ORDER_TYPE")

- Invalid orderType.

### \-1117 INVALID_SIDE[​](/docs/derivatives/coin-margined-futures/error-code#-1117-invalid_side "Direct link to -1117 INVALID_SIDE")

- Invalid side.

### \-1118 EMPTY_NEW_CL_ORD_ID[​](/docs/derivatives/coin-margined-futures/error-code#-1118-empty_new_cl_ord_id "Direct link to -1118 EMPTY_NEW_CL_ORD_ID")

- New client order ID was empty.

### \-1119 EMPTY_ORG_CL_ORD_ID[​](/docs/derivatives/coin-margined-futures/error-code#-1119-empty_org_cl_ord_id "Direct link to -1119 EMPTY_ORG_CL_ORD_ID")

- Original client order ID was empty.

### \-1120 BAD_INTERVAL[​](/docs/derivatives/coin-margined-futures/error-code#-1120-bad_interval "Direct link to -1120 BAD_INTERVAL")

- Invalid interval.

### \-1121 BAD_SYMBOL[​](/docs/derivatives/coin-margined-futures/error-code#-1121-bad_symbol "Direct link to -1121 BAD_SYMBOL")

- Invalid symbol.

### \-1125 INVALID_LISTEN_KEY[​](/docs/derivatives/coin-margined-futures/error-code#-1125-invalid_listen_key "Direct link to -1125 INVALID_LISTEN_KEY")

- This listenKey does not exist. Please use `POST /fapi/v1/listenKey` to
  recreate `listenKey`

### \-1127 MORE_THAN_XX_HOURS[​](/docs/derivatives/coin-margined-futures/error-code#-1127-more_than_xx_hours "Direct link to -1127 MORE_THAN_XX_HOURS")

- Lookup interval is too big.
- More than %s hours between startTime and endTime.

### \-1128 OPTIONAL_PARAMS_BAD_COMBO[​](/docs/derivatives/coin-margined-futures/error-code#-1128-optional_params_bad_combo "Direct link to -1128 OPTIONAL_PARAMS_BAD_COMBO")

- Combination of optional parameters invalid.

### \-1130 INVALID_PARAMETER[​](/docs/derivatives/coin-margined-futures/error-code#-1130-invalid_parameter "Direct link to -1130 INVALID_PARAMETER")

- Invalid data sent for a parameter.
- Data sent for parameter '%s' is not valid.

### \-1136 INVALID_NEW_ORDER_RESP_TYPE[​](/docs/derivatives/coin-margined-futures/error-code#-1136-invalid_new_order_resp_type "Direct link to -1136 INVALID_NEW_ORDER_RESP_TYPE")

- Invalid newOrderRespType.
