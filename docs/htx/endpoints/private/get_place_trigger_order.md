# GET Place Trigger Order

**Source:**
[Place Trigger Order](https://www.htx.com/en-us/opend/newApiPages/?id=5d51af3f-77b6-11ed-9966-0242ac110003)

**Category:** Swap Strategy Order Interface

## Authentication

Required (Private Endpoint)

### /swap-api/v1/swap_trigger_order (Place Trigger Order)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: 5 times per second

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter        | Data Type | Required | Description                                                                                                                                                    | Value Range | Default Value |
| ---------------- | --------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- | ------------- |
| contract_code    | string    | true     | contract code                                                                                                                                                  | BTC-USD     |               |
| trigger_type     | string    | true     | trigger： ge Equal to or Greater than；le Less than or Equal to                                                                                                |             |               |
| trigger_price    | decimal   | true     | Trigger Price                                                                                                                                                  |             |               |
| order_price      | decimal   | false    | Order Price                                                                                                                                                    |             |               |
| order_price_type | string    | false    | order price type： "limit" by default;"optimal_5", "optimal_10"，"optimal_20"                                                                                  |             |               |
| volume           | long      | true     | volume                                                                                                                                                         |             |               |
| direction        | string    | true     | buy sell                                                                                                                                                       |             |               |
| offset           | string    | true     | open close                                                                                                                                                     |             |               |
| lever_rate       | int       | false    | Long leverage shall be equal to short leverage.\[Using Leverage greater than 20 times requires prior approval of high-leverage agreement for the first time.\] |             |               |

Notes:  
optimal_5: top 5 optimal BBO price. optimal_10: top 10 optimal BBO price.
optimal_20: top 20 optimal BBO price. limit: the limit order, order_price
needed.  
If you’re holding a position currently, the leverage you choose when placing an
order should be the same as the leverage of your current positions, otherwise,
the order will fail to be placed. If you need a new leverage to place an order,
you should switch the leverage of current positions first by using the Switch
Leverage interface.  
The frequency limit of this interface is 5 times per second.  
Request:  
{  
"contract_code": "BTC-USD",  
"trigger_type": "ge",  
"trigger_price": 1111,  
"order_price": 1000,  
"order_price_type":"limit",  
"volume": 111,  
"direction": "buy",  
"offset": "open",  
"lever_rate": 10  
}

Return:  
{  
"status": "ok",  
"data": {  
"order_id": 7002240,  
"order_id_str": "7002240"  
},  
"ts": 1603874184554  
}

#### Response Parameter

| Parameter    | Data Type | Required | Description      | Value Range |
| ------------ | --------- | -------- | ---------------- | ----------- |
| status       | string    | true     | status: ok,error |             |
| err_code     | int       | false    | error code       |             |
| ts           | long      | true     | timestamp        |             |
| err_msg      | string    | false    | error message    |             |
| data         |           | false    |                  |             |
| order_id     | int       | true     | order id.        |             |
| order_id_str | string    | true     | order id str     |             |
| DATA_END     |           | false    |                  |             |

#### Request example

{

"contract_code":

"BTC-USD"

"start_time":

1670987797000

"end_time":

1671090403222

"page_index":

1

"page_size":

20

}

#### Response Example

##### Success Example

{

"status":

"ok"

"data":{

"order_id":

7002240

"order_id_str":

"7002240"

}

"ts":

1603874184554

}
