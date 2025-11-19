## Error Codes

> Here is the error JSON payload:

```
{
  "code":-1121,
  "msg":"Invalid symbol."
}
```

Errors consist of two parts: an error code and a message.  
Codes are universal,but messages can vary.

### 10xx - General Server or Network issues

#### \-1000 UNKNOWN

-   An unknown error occured while processing the request.

#### \-1001 DISCONNECTED

-   Internal error; unable to process your request. Please try again.

#### \-1002 UNAUTHORIZED

-   You are not authorized to execute this request.

#### \-1003 TOO\_MANY\_REQUESTS

-   Too many requests; current limit is %s requests per minute. Please use the websocket for live updates to avoid polling the API.
-   Way too many requests; IP banned until %s. Please use the websocket for live updates to avoid bans.

#### \-1004 DUPLICATE\_IP

-   This IP is already on the white list

#### \-1005 NO\_SUCH\_IP

-   No such IP has been white listed

#### \-1006 UNEXPECTED\_RESP

-   An unexpected response was received from the message bus. Execution status unknown.

#### \-1007 TIMEOUT

-   Timeout waiting for response from backend server. Send status unknown; execution status unknown.

#### \-1008 Request Throttled

-   Server is currently overloaded with other requests. Please try again in a few minutes.
-   Request throttled by system-level protection. Reduce-only/close-position orders are exempt. Please try again.

#### \-1010 ERROR\_MSG\_RECEIVED

-   ERROR\_MSG\_RECEIVED.

#### \-1011 NON\_WHITE\_LIST

-   This IP cannot access this route.

#### \-1013 INVALID\_MESSAGE

-   INVALID\_MESSAGE.

#### \-1014 UNKNOWN\_ORDER\_COMPOSITION

-   Unsupported order combination.

#### \-1015 TOO\_MANY\_ORDERS

-   Too many new orders.
-   Too many new orders; current limit is %s orders per %s.

#### \-1016 SERVICE\_SHUTTING\_DOWN

-   This service is no longer available.

#### \-1020 UNSUPPORTED\_OPERATION

-   This operation is not supported.

#### \-1021 INVALID\_TIMESTAMP

-   Timestamp for this request is outside of the recvWindow.
-   Timestamp for this request was 1000ms ahead of the server's time.

#### \-1022 INVALID\_SIGNATURE

-   Signature for this request is not valid.

#### \-1023 START\_TIME\_GREATER\_THAN\_END\_TIME

-   Start time is greater than end time.

### 11xx - Request issues

#### \-1100 ILLEGAL\_CHARS

-   Illegal characters found in a parameter.
-   Illegal characters found in parameter '%s'; legal range is '%s'.

#### \-1101 TOO\_MANY\_PARAMETERS

-   Too many parameters sent for this endpoint.
-   Too many parameters; expected '%s' and received '%s'.
-   Duplicate values for a parameter detected.

#### \-1102 MANDATORY\_PARAM\_EMPTY\_OR\_MALFORMED

-   A mandatory parameter was not sent, was empty/null, or malformed.
-   Mandatory parameter '%s' was not sent, was empty/null, or malformed.
-   Param '%s' or '%s' must be sent, but both were empty/null!

#### \-1103 UNKNOWN\_PARAM

-   An unknown parameter was sent.

#### \-1104 UNREAD\_PARAMETERS

-   Not all sent parameters were read.
-   Not all sent parameters were read; read '%s' parameter(s) but was sent '%s'.

#### \-1105 PARAM\_EMPTY

-   A parameter was empty.
-   Parameter '%s' was empty.

#### \-1106 PARAM\_NOT\_REQUIRED

-   A parameter was sent when not required.
-   Parameter '%s' sent when not required.

#### \-1108 BAD\_ASSET

-   Invalid asset.

#### \-1109 BAD\_ACCOUNT

-   Invalid account.

#### \-1110 BAD\_INSTRUMENT\_TYPE

-   Invalid symbolType.

#### \-1111 BAD\_PRECISION

-   Precision is over the maximum defined for this asset.

#### \-1112 NO\_DEPTH

-   No orders on book for symbol.

#### \-1113 WITHDRAW\_NOT\_NEGATIVE

-   Withdrawal amount must be negative.

#### \-1114 TIF\_NOT\_REQUIRED

-   TimeInForce parameter sent when not required.

#### \-1115 INVALID\_TIF

-   Invalid timeInForce.

#### \-1116 INVALID\_ORDER\_TYPE

-   Invalid orderType.

#### \-1117 INVALID\_SIDE

-   Invalid side.

#### \-1118 EMPTY\_NEW\_CL\_ORD\_ID

-   New client order ID was empty.

#### \-1119 EMPTY\_ORG\_CL\_ORD\_ID

-   Original client order ID was empty.

#### \-1120 BAD\_INTERVAL

-   Invalid interval.

#### \-1121 BAD\_SYMBOL

-   Invalid symbol.

#### \-1125 INVALID\_LISTEN\_KEY

-   This listenKey does not exist. Please use `POST /fapi/v1/listenKey` to recreate `listenKey`

#### \-1127 MORE\_THAN\_XX\_HOURS

-   Lookup interval is too big.
-   More than %s hours between startTime and endTime.

#### \-1128 OPTIONAL\_PARAMS\_BAD\_COMBO

-   Combination of optional parameters invalid.

#### \-1130 INVALID\_PARAMETER

-   Invalid data sent for a parameter.
-   Data sent for parameter '%s' is not valid.

#### \-1136 INVALID\_NEW\_ORDER\_RESP\_TYPE

-   Invalid newOrderRespType.

### 20xx - Processing Issues

#### \-2010 NEW\_ORDER\_REJECTED

-   NEW\_ORDER\_REJECTED

#### \-2011 CANCEL\_REJECTED

-   CANCEL\_REJECTED

#### \-2013 NO\_SUCH\_ORDER

-   Order does not exist.

#### \-2014 BAD\_API\_KEY\_FMT

-   API-key format invalid.

#### \-2015 REJECTED\_MBX\_KEY

-   Invalid API-key, IP, or permissions for action.

#### \-2016 NO\_TRADING\_WINDOW

-   No trading window could be found for the symbol. Try ticker/24hrs instead.

#### \-2018 BALANCE\_NOT\_SUFFICIENT

-   Balance is insufficient.

#### \-2019 MARGIN\_NOT\_SUFFICIEN

-   Margin is insufficient.

#### \-2020 UNABLE\_TO\_FILL

-   Unable to fill.

#### \-2021 ORDER\_WOULD\_IMMEDIATELY\_TRIGGER

-   Order would immediately trigger.

#### \-2022 REDUCE\_ONLY\_REJECT

-   ReduceOnly Order is rejected.
-   This indicates the new reduce-only order conflicts with existing open orders; cancel the existing order and resubmit the reduce-only order.

#### \-2023 USER\_IN\_LIQUIDATION

-   User in liquidation mode now.

#### \-2024 POSITION\_NOT\_SUFFICIENT

-   Position is not sufficient.

#### \-2025 MAX\_OPEN\_ORDER\_EXCEEDED

-   Reach max open order limit.

#### \-2026 REDUCE\_ONLY\_ORDER\_TYPE\_NOT\_SUPPORTED

-   This OrderType is not supported when reduceOnly.

#### \-2027 MAX\_LEVERAGE\_RATIO

-   Exceeded the maximum allowable position at current leverage.

#### \-2028 MIN\_LEVERAGE\_RATIO

-   Leverage is smaller than permitted: insufficient margin balance.

### 40xx - Filters and other Issues

#### \-4000 INVALID\_ORDER\_STATUS

-   Invalid order status.

#### \-4001 PRICE\_LESS\_THAN\_ZERO

-   Price less than 0.

#### \-4002 PRICE\_GREATER\_THAN\_MAX\_PRICE

-   Price greater than max price.

#### \-4003 QTY\_LESS\_THAN\_ZERO

-   Quantity less than zero.

#### \-4004 QTY\_LESS\_THAN\_MIN\_QTY

-   Quantity less than min quantity.

#### \-4005 QTY\_GREATER\_THAN\_MAX\_QTY

-   Quantity greater than max quantity.

#### \-4006 STOP\_PRICE\_LESS\_THAN\_ZERO

-   Stop price less than zero.

#### \-4007 STOP\_PRICE\_GREATER\_THAN\_MAX\_PRICE

-   Stop price greater than max price.

#### \-4008 TICK\_SIZE\_LESS\_THAN\_ZERO

-   Tick size less than zero.

#### \-4009 MAX\_PRICE\_LESS\_THAN\_MIN\_PRICE

-   Max price less than min price.

#### \-4010 MAX\_QTY\_LESS\_THAN\_MIN\_QTY

-   Max qty less than min qty.

#### \-4011 STEP\_SIZE\_LESS\_THAN\_ZERO

-   Step size less than zero.

#### \-4012 MAX\_NUM\_ORDERS\_LESS\_THAN\_ZERO

-   Max mum orders less than zero.

#### \-4013 PRICE\_LESS\_THAN\_MIN\_PRICE

-   Price less than min price.

#### \-4014 PRICE\_NOT\_INCREASED\_BY\_TICK\_SIZE

-   Price not increased by tick size.

#### \-4015 INVALID\_CL\_ORD\_ID\_LEN

-   Client order id is not valid.
-   Client order id length should not be more than 36 chars

#### \-4016 PRICE\_HIGHTER\_THAN\_MULTIPLIER\_UP

-   Price is higher than mark price multiplier cap.

#### \-4017 MULTIPLIER\_UP\_LESS\_THAN\_ZERO

-   Multiplier up less than zero.

#### \-4018 MULTIPLIER\_DOWN\_LESS\_THAN\_ZERO

-   Multiplier down less than zero.

#### \-4019 COMPOSITE\_SCALE\_OVERFLOW

-   Composite scale too large.

#### \-4020 TARGET\_STRATEGY\_INVALID

-   Target strategy invalid for orderType '%s',reduceOnly '%b'.

#### \-4021 INVALID\_DEPTH\_LIMIT

-   Invalid depth limit.
-   '%s' is not valid depth limit.

#### \-4022 WRONG\_MARKET\_STATUS

-   market status sent is not valid.

#### \-4023 QTY\_NOT\_INCREASED\_BY\_STEP\_SIZE

-   Qty not increased by step size.

#### \-4024 PRICE\_LOWER\_THAN\_MULTIPLIER\_DOWN

-   Price is lower than mark price multiplier floor.

#### \-4025 MULTIPLIER\_DECIMAL\_LESS\_THAN\_ZERO

-   Multiplier decimal less than zero.

#### \-4026 COMMISSION\_INVALID

-   Commission invalid.
-   `%s` less than zero.
-   `%s` absolute value greater than `%s`

#### \-4027 INVALID\_ACCOUNT\_TYPE

-   Invalid account type.

#### \-4028 INVALID\_LEVERAGE

-   Invalid leverage
-   Leverage `%s` is not valid
-   Leverage `%s` already exist with `%s`

#### \-4029 INVALID\_TICK\_SIZE\_PRECISION

-   Tick size precision is invalid.

#### \-4030 INVALID\_STEP\_SIZE\_PRECISION

-   Step size precision is invalid.

#### \-4031 INVALID\_WORKING\_TYPE

-   Invalid parameter working type
-   Invalid parameter working type: `%s`

#### \-4032 EXCEED\_MAX\_CANCEL\_ORDER\_SIZE

-   Exceed maximum cancel order size.
-   Invalid parameter working type: `%s`

#### \-4033 INSURANCE\_ACCOUNT\_NOT\_FOUND

-   Insurance account not found.

#### \-4044 INVALID\_BALANCE\_TYPE

-   Balance Type is invalid.

#### \-4045 MAX\_STOP\_ORDER\_EXCEEDED

-   Reach max stop order limit.

#### \-4046 NO\_NEED\_TO\_CHANGE\_MARGIN\_TYPE

-   No need to change margin type.

#### \-4047 THERE\_EXISTS\_OPEN\_ORDERS

-   Margin type cannot be changed if there exists open orders.

#### \-4048 THERE\_EXISTS\_QUANTITY

-   Margin type cannot be changed if there exists position.

#### \-4049 ADD\_ISOLATED\_MARGIN\_REJECT

-   Add margin only support for isolated position.

#### \-4050 CROSS\_BALANCE\_INSUFFICIENT

-   Cross balance insufficient.

#### \-4051 ISOLATED\_BALANCE\_INSUFFICIENT

-   Isolated balance insufficient.

#### \-4052 NO\_NEED\_TO\_CHANGE\_AUTO\_ADD\_MARGIN

-   No need to change auto add margin.

#### \-4053 AUTO\_ADD\_CROSSED\_MARGIN\_REJECT

-   Auto add margin only support for isolated position.

#### \-4054 ADD\_ISOLATED\_MARGIN\_NO\_POSITION\_REJECT

-   Cannot add position margin: position is 0.

#### \-4055 AMOUNT\_MUST\_BE\_POSITIVE

-   Amount must be positive.

#### \-4056 INVALID\_API\_KEY\_TYPE

-   Invalid api key type.

#### \-4057 INVALID\_RSA\_PUBLIC\_KEY

-   Invalid api public key

#### \-4058 MAX\_PRICE\_TOO\_LARGE

-   maxPrice and priceDecimal too large,please check.

#### \-4059 NO\_NEED\_TO\_CHANGE\_POSITION\_SIDE

-   No need to change position side.

#### \-4060 INVALID\_POSITION\_SIDE

-   Invalid position side.

#### \-4061 POSITION\_SIDE\_NOT\_MATCH

-   Order's position side does not match user's setting.

#### \-4062 REDUCE\_ONLY\_CONFLICT

-   Invalid or improper reduceOnly value.

#### \-4067 POSITION\_SIDE\_CHANGE\_EXISTS\_OPEN\_ORDERS

-   Position side cannot be changed if there exists open orders.

#### \-4068 POSITION\_SIDE\_CHANGE\_EXISTS\_QUANTITY

-   Position side cannot be changed if there exists position.

#### \-4082 INVALID\_BATCH\_PLACE\_ORDER\_SIZE

-   Invalid number of batch place orders.
-   Invalid number of batch place orders: %s

#### \-4083 PLACE\_BATCH\_ORDERS\_FAIL

-   Fail to place batch orders.

#### \-4084 UPCOMING\_METHOD

-   Method is not allowed currently. Upcoming soon.

#### \-4086 INVALID\_PRICE\_SPREAD\_THRESHOLD

-   Invalid price spread threshold.

#### \-4087 INVALID\_PAIR

-   Invalid pair.

#### \-4088 INVALID\_TIME\_INTERVAL

-   Invalid time interval.
-   Maximum time interval is %s days.

#### \-4089 REDUCE\_ONLY\_ORDER\_PERMISSION

-   User can only place reduce only order.

#### \-4090 NO\_PLACE\_ORDER\_PERMISSION

-   User can not place order currently.

#### \-4104 INVALID\_CONTRACT\_TYPE

-   Invalid contract type.

#### \-4110 INVALID\_CLIENT\_TRAN\_ID\_LEN

-   clientTranId is not valid.
-   Client tran id length should be less than 64 chars.

#### \-4111 DUPLICATED\_CLIENT\_TRAN\_ID

-   clientTranId is duplicated.
-   Client tran id should be unique within 7 days.

#### \-4112 REDUCE\_ONLY\_MARGIN\_CHECK\_FAILED

-   ReduceOnly Order Failed. Please check your existing position and open orders.
-   This indicates that the new reduce-only order, combined with an existing same-side open order, would create an opposite-side position and lead to insufficient margin; please cancel the open order and try again.

#### \-4113 MARKET\_ORDER\_REJECT

-   The counterparty's best price does not meet the PERCENT\_PRICE filter limit.

#### \-4135 INVALID\_ACTIVATION\_PRICE

-   Invalid activation price.

#### \-4137 QUANTITY\_EXISTS\_WITH\_CLOSE\_POSITION

-   Quantity must be zero with closePosition equals true.

#### \-4138 REDUCE\_ONLY\_MUST\_BE\_TRUE

-   Reduce only must be true with closePosition equals true.

#### \-4139 ORDER\_TYPE\_CANNOT\_BE\_MKT

-   Order type can not be market if it's unable to cancel.

#### \-4142 STRATEGY\_INVALID\_TRIGGER\_PRICE

-   REJECT: take profit or stop order will be triggered immediately.

#### \-4150 ISOLATED\_LEVERAGE\_REJECT\_WITH\_POSITION

-   Leverage reduction is not supported in Isolated Margin Mode with open positions.

#### \-4151 PRICE\_HIGHTER\_THAN\_STOP\_MULTIPLIER\_UP

-   Price is higher than stop price multiplier cap.
-   Limit price can't be higher than %s.

#### \-4152 PRICE\_LOWER\_THAN\_STOP\_MULTIPLIER\_DOWN

-   Price is lower than stop price multiplier floor.
-   Limit price can't be lower than %s.

#### \-4154 STOP\_PRICE\_HIGHER\_THAN\_PRICE\_MULTIPLIER\_LIMIT

-   Stop price is higher than price multiplier cap.
-   Stop price can't be higher than %s

#### \-4155 STOP\_PRICE\_LOWER\_THAN\_PRICE\_MULTIPLIER\_LIMIT

-   PStop price is lower than price multiplier floor.
-   Stop price can't be lower than %s

#### \-4178 MIN\_NOTIONAL

-   Order's notional must be no smaller than one (unless you choose reduce only)
-   Order's notional must be no smaller than %s (unless you choose reduce only)

#### \-4192 COOLING\_OFF\_PERIOD

-   Trade forbidden due to Cooling-off Period.

#### \-4194 ADJUST\_LEVERAGE\_KYC\_FAILED

-   Intermediate Personal Verification is required for adjusting leverage over 20x.

#### \-4195 ADJUST\_LEVERAGE\_ONE\_MONTH\_FAILED

-   More than 20x leverage is available one month after account registration.

#### \-4196 LIMIT\_ORDER\_ONLY

-   Only limit order is supported.

#### \-4197 SAME\_ORDER

-   No need to modify the order.

#### \-4198 EXCEED\_MAX\_MODIFY\_ORDER\_LIMIT

-   Exceed maximum modify order limit.

#### \-4199 MOVE\_ORDER\_NOT\_ALLOWED\_SYMBOL\_REASON

-   Symbol is not in trading status. Order amendment is not permitted.

#### \-4200 ADJUST\_LEVERAGE\_X\_DAYS\_FAILED

-   More than 20x leverage is available 30 days after Futures account registration.
-   More than 20x leverage is available %s days after Futures account registration.

#### \-4201 ADJUST\_LEVERAGE\_KYC\_LIMIT

-   Users in this country has limited adjust leverage.
-   Users in your location/country can only access a maximum leverage of %s

#### \-4202 ADJUST\_LEVERAGE\_ACCOUNT\_SYMBOL\_FAILED

-   Current symbol leverage cannot exceed 20 when using position limit adjustment service.

#### \-4188 ME\_INVALID\_TIMESTAMP

-   Timestamp for this request is outside of the ME recvWindow.

> Source: [https://developers.binance.com/docs/derivatives/coin-margined-futures/error-code](https://developers.binance.com/docs/derivatives/coin-margined-futures/error-code)
