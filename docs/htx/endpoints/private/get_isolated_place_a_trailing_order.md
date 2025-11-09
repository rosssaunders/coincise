# GET [Isolated]Place a Trailing Order

**Source:** [[Isolated]Place a Trailing Order](https://www.htx.com/en-us/opend/newApiPages/?id=8cb88960-77b5-11ed-9966-0242ac110003)

**Category:** Swap Strategy Order Interface

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v1/swap\_track\_order (\[Isolated\]Place a Trailing Order)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: 5 times per second.

Interface description: This interface only supports isolated margin mode. The frequency limit of this interface is 5 times per second.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | true | contract code | BTC-USDT |  |
| reduce\_only | int | false | reduce only(in hedge mode it is invalid, and in one-way mode it's value is 0 when not filled.) | 0: no, 1: yes |  |
| direction | string | true | direction | buy, sell |  |
| offset | string | false | offset | open, close, both |  |
| lever\_rate | int | false | lever rate, is required when open position, is optional when close position |  |  |
| volume | decimal | true | volume(cont) |  |  |
| callback\_rate | decimal | true | callback rate | Such as: 0.01 means 1%. And must be not less than 0.001 (0.1%) |  |
| active price | decimal | true | active price |  |  |
| order\_price\_type | string | true | order price type | optimal\_5, optimal\_10, optimal\_20, formula\_price |  |

Notes:  
When order\_price\_type is the formula\_price, it means that after the tracking order is triggered successfully, use the lowest (highest) market price \*(1 ± callback rate) that from statistic since place trading order, as the order price (the precision is the minimum variation of the contract price and be truncated) to place a limit price order  
whether filled in with the optimal N or the formula price, there is no guarantee that the order can be completely filled, which mainly depends on the market conditions.  
offset, in hedge mode it is a required field, and in one-way mode it is optional paramater which's value must be both when filled.  
please note that, in the one-way mode, if using the parameter reduce\_only=1 to place an order for opening positions, when the order triggered, it will respond error message: 1492 Amount of Reduce Only order exceeds the amount available to close. order will be failed.

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | the result of server handling to request | "ok" , "error" |
| ts | long | true | timestamp |  |
| DATA\_START | object | true | the returned data which is successful |  |
| order\_id | long | true | trailing order id\[Globally Unique\] |  |
| order\_id\_str | string | true | trailing order id in string format |  |
| DATA\_END |  | false |  |  |

#### Request example

{

"contract\_code":

"BTC-USDT"

"reduce\_only":

0

"direction":

"buy"

"offset":

"open"

"lever\_rate":

20

"volume":

100

"callback\_rate":

0.01

"active\_price":

1670

"order\_price\_type":

"optimal\_5"

}

#### Response Example

##### Success Example

{

"status":

"ok"

"data":{

"order\_id":

826052268312821800

"order\_id\_str":

"826052268312821760"

}

"ts":

1616987808080

}