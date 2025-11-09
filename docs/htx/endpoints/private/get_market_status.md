# GET Market Status

**Source:** [Get Market Status](https://www.htx.com/en-us/opend/newApiPages/?id=7ec513b1-7773-11ed-9966-0242ac110003)

**Category:** Reference Data

## Authentication

Required (Private Endpoint)

### /v2/market-status ( Get Market Status)

Request type: GET

Signature verification: No

Interface description: The endpoint returns current market status The enum values of market status includes: 1 - normal (order submission & cancellation are allowed)，2 - halted (order submission & cancellation are prohibited)，3 - cancel-only(order submission is prohibited but order cancellation is allowed). Halt reason includes: 2 - emergency maintenance，3 - schedule maintenance.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.huobi.pro |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |

Notes:  
No parameters are needed for this endpoint.

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| code | integer | false | Status code |  |
| message | string | false | Error message (if any) |  |
| DATA\_START | object | false |  |  |
| marketStatus | integer | false | Market status (1=normal, 2=halted, 3=cancel-only) |  |
| haltStartTime | long | false | Halt start time (unix time in millisecond) , only valid for marketStatus=halted or cancel-only |  |
| haltEndTime | long | false | Estimated halt end time (unix time in millisecond) , only valid for marketStatus=halted or cancel-only; if this field is not returned during marketStatus=halted or cancel-only, it implicates the halt end time cannot be estimated at this time. |  |
| haltReason | integer | false | Halt reason (2=emergency-maintenance, 3=scheduled-maintenance) , only valid for marketStatus=halted or cancel-only |  |
| affectedSymbols | string | false | Affected symbols, separated by comma. If affect all symbols just respond with value ‘all’. Only valid for marketStatus=halted or cancel-only |  |
| DATA\_END |  | false |  |  |

#### Request example

`curl"https://api.huobi.pro/v2/market-status"`

#### Response Example

##### Success Example

{

"code":

200

"message":

"success"

"data":{

"marketStatus":

1

}

}