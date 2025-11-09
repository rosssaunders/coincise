# GET [Cross] Switch Leverage

**Source:** [[Cross] Switch Leverage](https://www.htx.com/en-us/opend/newApiPages/?id=8cb850d7-77b5-11ed-9966-0242ac110003)

**Category:** Swap Trade Interface

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v1/swap\_cross\_switch\_lever\_rate (\[Cross\] Switch Leverage)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: 1 time per 3 seconds.

Interface description: The interface only supports cross margin mode. Only if a user has positions of a single token and has no open orders, the leverage is available to be switched flexibly. The interface limits the number of requests to 1 time per 3 seconds. The request parameter "contract\_code" supports the contract code of futures, in that the format is BTC-USDT-210625. one of (pair+contract\_type) and contract\_code must be filled in(if all of them not filled in, will get 1014 error code); and all filled in, the contract\_code is the preferred.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | false | contract code | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |  |
| pair | string | false | pair | BTC-USDT |  |
| contract\_type | string | false | contract type | swap, this\_week, next\_week, quarter, next\_quarter |  |
| lever\_rate | int | true | The leverage multiple to be switched; high leverage has a high risk factor, so please use it with caution. |  |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | ok/error |  |
| DATA\_START | object | false |  |  |
| contract\_code | string | false | contract code | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |
| margin\_mode | string | false | margin mode | cross: cross margin mode |
| lever\_rate | int | false | switched leverage |  |
| contract\_type | string | true | contract type | swap, this\_week, next\_week, quarter, next\_quarter |
| pair | string | true | pair | such as: “BTC-USDT” |
| business\_type | string | true | business type | futures, swap |
| DATA\_END |  | false |  |  |
| err-code | int | false | error code |  |
| err-msg | string | false | error message |  |
| ts | long | true | timestamp |  |

#### Request example

{

"contract\_code":

"BTC-USDT"

"pair":

"BTC-USDT"

"contract\_type":

"swap"

"lever\_rate":

20

}

#### Response Example

##### Success Example

{

"status":

"ok"

"data":{

"contract\_type":

"swap"

"pair":

"BTC-USDT"

"business\_type":

"swap"

"contract\_code":

"BTC-USDT"

"lever\_rate":

2

"margin\_mode":

"cross"

}

"ts":

1639099382678

}