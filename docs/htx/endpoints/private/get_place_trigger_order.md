# GET Place Trigger Order

**Source:** [Place Trigger Order](https://www.htx.com/en-us/opend/newApiPages/?id=5d51af3f-77b6-11ed-9966-0242ac110003)

**Category:** Swap Strategy Order Interface

## Authentication

Required (Private Endpoint)

### /swap-api/v1/swap\_trigger\_order (Place Trigger Order)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: 5 times per second

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | true | contract code | BTC-USD |  |
| trigger\_type | string | true | trigger： ge Equal to or Greater than；le Less than or Equal to |  |  |
| trigger\_price | decimal | true | Trigger Price |  |  |
| order\_price | decimal | false | Order Price |  |  |
| order\_price\_type | string | false | order price type： "limit" by default;"optimal\_5", "optimal\_10"，"optimal\_20" |  |  |
| volume | long | true | volume |  |  |
| direction | string | true | buy sell |  |  |
| offset | string | true | open close |  |  |
| lever\_rate | int | false | Long leverage shall be equal to short leverage.\[Using Leverage greater than 20 times requires prior approval of high-leverage agreement for the first time.\] |  |  |

Notes:  
optimal\_5: top 5 optimal BBO price. optimal\_10: top 10 optimal BBO price. optimal\_20: top 20 optimal BBO price. limit: the limit order, order\_price needed.  
If you’re holding a position currently, the leverage you choose when placing an order should be the same as the leverage of your current positions, otherwise, the order will fail to be placed. If you need a new leverage to place an order, you should switch the leverage of current positions first by using the Switch Leverage interface.  
The frequency limit of this interface is 5 times per second.  
Request:  
{  
"contract\_code": "BTC-USD",  
"trigger\_type": "ge",  
"trigger\_price": 1111,  
"order\_price": 1000,  
"order\_price\_type":"limit",  
"volume": 111,  
"direction": "buy",  
"offset": "open",  
"lever\_rate": 10  
}  
  
Return:  
{  
"status": "ok",  
"data": {  
"order\_id": 7002240,  
"order\_id\_str": "7002240"  
},  
"ts": 1603874184554  
}

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | status: ok,error |  |
| err\_code | int | false | error code |  |
| ts | long | true | timestamp |  |
| err\_msg | string | false | error message |  |
| data |  | false |  |  |
| order\_id | int | true | order id. |  |
| order\_id\_str | string | true | order id str |  |
| DATA\_END |  | false |  |  |

#### Request example

{

"contract\_code":

"BTC-USD"

"start\_time":

1670987797000

"end\_time":

1671090403222

"page\_index":

1

"page\_size":

20

}

#### Response Example

##### Success Example

{

"status":

"ok"

"data":{

"order\_id":

7002240

"order\_id\_str":

"7002240"

}

"ts":

1603874184554

}