# GET [Isolated] Place Trigger Order

**Source:** [[Isolated] Place Trigger Order](https://www.htx.com/en-us/opend/newApiPages/?id=8cb86c95-77b5-11ed-9966-0242ac110003)

**Category:** Swap Strategy Order Interface

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v1/swap\_trigger\_order (\[Isolated\] Place Trigger Order)

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
| contract\_code | string | true | contract type | BTC-USDT |  |
| reduce\_only | int | false | reduce only(in hedge mode it is invalid, and in one-way mode it's value is 0 when not filled.) | 0: no, 1: yes |  |
| trigger\_type | string | true | trigger： ge Equal to or Greater than；le Less than or Equal to |  |  |
| trigger\_price | decimal | true | Trigger Price |  |  |
| order\_price | decimal | false | Order Price |  |  |
| order\_price\_type | string | false | order price type： "limit" by default;"optimal\_5", "optimal\_10"，"optimal\_20" |  |  |
| volume | long | true | volume |  |  |
| direction | string | true | buy sell |  |  |
| offset | string | false | open, close, both |  |  |
| lever\_rate | int | false | Long leverage shall be equal to short leverage.high leverage has a high risk factor, so please use it with caution. |  |  |

Notes:  
optimal\_5: top 5 optimal BBO price. optimal\_10: top 10 optimal BBO price. optimal\_20: top 20 optimal BBO price. limit: the limit order, order\_price needed.  
If you’re holding a position currently, the leverage you choose when placing an order should be the same as the leverage of your current positions, otherwise, the order will fail to be placed. If you need a new leverage to place an order, you should switch the leverage of current positions first by using the Switch Leverage interface.  
offset, in hedge mode it is a required field, and in one-way mode it is optional paramater which's value must be both when filled.  
please note that, in the one-way mode, if using the parameter reduce\_only=1 to place an order for opening positions, when the order triggered, it will respond error message: 1492 Amount of Reduce Only order exceeds the amount available to close. order will be failed.

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | 1 | false | status: ok,error |  |
| err\_code | 0 | false | error code |  |
| err\_msg | 0 | false | error message |  |
| DATA\_START |  | false |  |  |
| order\_id | 1 | false | order id. |  |
| order\_id\_str | 1 | false | order id str |  |
| DATA\_END |  | false |  |  |
| ts | 1 | false | timestamp |  |

#### Request example

{

"contract\_code":

"BTC-USDT"

"trigger\_type":

"ge"

"trigger\_price":

1111

"order\_price":

1000

"order\_price\_type":

"limit"

"volume":

111

"direction":

"buy"

"offset":

"open"

"lever\_rate":

10

}

#### Response Example

##### Success Example

{

"status":

"ok"

"data":{

"order\_id":

35

"order\_id\_str":

"35"

}

"ts":

1547521135713

}