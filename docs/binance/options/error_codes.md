# Error Codes

## Error Codes

> Here is the error JSON payload:

```
{  "code":-1121,  "msg":"Invalid symbol."}
```

Errors consist of two parts: an error code and a message.  
Codes are universal,but messages can vary.

### 10xx - General Server or Network issues

#### \-1000 UNKNOWN

-   An unknown error occurred while processing the request.

#### \-1001 DISCONNECTED

-   Internal error; unable to process your request. Please try again.

#### \-1002 UNAUTHORIZED

-   You are not authorized to execute this request.

#### \-1008 TOO\_MANY\_REQUESTS

-   Too many requests queued.
-   Too much request weight used; please use the websocket for live updates to avoid polling the API.
-   Too much request weight used; current limit is %s request weight per %s %s. Please use the websocket for live updates to avoid polling the API.
-   Way too much request weight used; IP banned until %s. Please use the websocket for live updates to avoid bans.

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

### 11xx - 2xxx Request issues

#### \-1100 ILLEGAL\_CHARS

-   Illegal characters found in a parameter.
-   Illegal characters found in a parameter. %s
-   Illegal characters found in parameter `%s`; legal range is `%s`.

#### \-1101 TOO\_MANY\_PARAMETERS

-   Too many parameters sent for this endpoint.
-   Too many parameters; expected `%s` and received `%s`.
-   Duplicate values for a parameter detected.

#### \-1102 MANDATORY\_PARAM\_EMPTY\_OR\_MALFORMED

-   A mandatory parameter was not sent, was empty/null, or malformed.
-   Mandatory parameter `%s` was not sent, was empty/null, or malformed.
-   Param `%s` or `%s` must be sent, but both were empty/null!

#### \-1103 UNKNOWN\_PARAM

-   An unknown parameter was sent.

#### \-1104 UNREAD\_PARAMETERS

-   Not all sent parameters were read.
-   Not all sent parameters were read; read `%s` parameter(s) but was sent `%s`.

#### \-1105 PARAM\_EMPTY

-   A parameter was empty.
-   Parameter `%s` was empty.

#### \-1106 PARAM\_NOT\_REQUIRED

-   A parameter was sent when not required.
-   Parameter `%s` sent when not required.

#### \-1111 BAD\_PRECISION

-   Precision is over the maximum defined for this asset.

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

-   This listenKey does not exist.

#### \-1127 MORE\_THAN\_XX\_HOURS

-   Lookup interval is too big.
-   More than %s hours between startTime and endTime.

#### \-1128 BAD\_CONTRACT

-   Invalid underlying

#### \-1129 BAD\_CURRENCY

-   Invalid asset。

#### \-1130 INVALID\_PARAMETER

-   Invalid data sent for a parameter.
-   Data sent for paramter `%s` is not valid.

#### \-1131 BAD\_RECV\_WINDOW

-   recvWindow must be less than 60000

#### \-2010 NEW\_ORDER\_REJECTED

-   NEW\_ORDER\_REJECTED

#### \-2013 NO\_SUCH\_ORDER

-   Order does not exist.

#### \-2014 BAD\_API\_KEY\_FMT

-   API-key format invalid.

#### \-2015 INVALID\_API\_KEY

-   Invalid API-key, IP, or permissions for action.

#### \-2018 BALANCE\_NOT\_SUFFICIENT

-   Balance is insufficient.

#### \-2027 OPTION\_MARGIN\_NOT\_SUFFICIENT

-   Option margin is insufficient.

### 3xxx-5xxx Filters and other issues

#### \-3029 TRANSFER\_FAILED

-   Asset transfer fail.

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

#### \-4013 PRICE\_LESS\_THAN\_MIN\_PRICE

-   Price less than min price.

#### \-4029 INVALID\_TICK\_SIZE\_PRECISION

-   Tick size precision is invalid.

#### \-4030 INVALID\_QTY\_PRECISION

-   Step size precision is invalid.

#### \-4055 AMOUNT\_MUST\_BE\_POSITIVE

-   Amount must be positive.

> Source: [https://developers.binance.com/docs/derivatives/option/error-code](https://developers.binance.com/docs/derivatives/option/error-code)
