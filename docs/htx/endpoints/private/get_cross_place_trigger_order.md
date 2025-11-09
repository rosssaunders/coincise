# GET [Cross] Place Trigger Order

**Source:** [[Cross] Place Trigger Order](https://www.htx.com/en-us/opend/newApiPages/?id=8cb86dfe-77b5-11ed-9966-0242ac110003)

**Category:** Swap Strategy Order Interface

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v1/swap\_cross\_trigger\_order (\[Cross\] Place Trigger Order)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: 5 times per second.

Interface description: The interface only supports cross margin mode. The frequency limit of this interface is 5 times per second. The request parameter "contract\_code" supports the contract code of futures, in that the format is BTC-USDT-210625. one of (pair+contract\_type) and contract\_code must be filled in(if all of them not filled in, will get 1014 error code); and all filled in, the contract\_code is the preferred. offset, in hedge mode it is a required field, and in one-way mode it is optional paramater which's value must be both when filled. please note that, in the one-way mode, if using the parameter reduce\_only=1 to place an order for opening positions, when the order triggered, it will respond error message: 1492 Amount of Reduce Only order exceeds the amount available to close. order will be failed.

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
| reduce\_only | int | false | reduce only(in hedge mode it is invalid, and in one-way mode it's value is 0 when not filled.) | 0: no, 1: yes |  |
| trigger\_type | string | true | trigger type | ge: Equal to or Greater than；le: Less than or Equal to |  |
| trigger\_price | decimal | true | trigger price |  |  |
| order\_price | decimal | false | order price |  |  |
| order\_price\_type | string | false | order price type | "limit" by default;"optimal\_5", "optimal\_10"，"optimal\_20" |  |
| volume | long | true | Numbers of orders (volume) |  |  |
| direction | string | true | direction | buy/sell |  |
| offset | string | false | offset | open,close,both |  |
| lever\_rate | int | false | leverage rate | Long leverage shall be equal to short leverage.high leverage has a high risk factor, so please use it with caution. |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | Request Processing Result | "ok" , "error" |
| ts | long | true | timestamp |  |
| DATA\_START | object | true |  |  |
| order\_id | int | true | order ID |  |
| order\_id\_str | string | true | order id |  |
| DATA\_END |  | false |  |  |

#### Request example

{

"contract\_code":

"BTC-USDT"

"pair":

"BTC-USDT"

"contract\_type":

"swap"

"reduce\_only":

0

"trigger\_type":

"le"

"trigger\_price":

16500

"order\_price":

16000

"order\_price\_type":

"limit"

"volume":

10

"direction":

"buy"

"offset":

"open"

"lever\_rate":

20

}

#### Response Example

##### Success Example

`正确的返回： { "status": "ok", "data": { "order_id": 1880, "order_id_str": "1880" }, "ts": 1606977456766 } 错误的返回： { "status": "error", "err_code": 1085, "err_msg": "Trigger order failed, please modify the price and place the order again or contact the customer service.", "ts": 1606977396756 }`