# GET Cancel an Order

**Source:** [Cancel an Order](https://www.htx.com/en-us/opend/newApiPages/?id=5d51a18b-77b6-11ed-9966-0242ac110003)

**Category:** Swap Trade Interface

## Authentication

Required (Private Endpoint)

### /swap-api/v1/swap\_cancel (Cancel an Order)

Request type: POST

Signature verification: Yes

Interface permission: Trade

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| order\_id | string | false | Order ID（different IDs are separated by ",", maximum 10 orders can be withdrew at one time） |  |  |
| client\_order\_id | string | false | Client order ID (different IDs are separated by ",", maximum 10 orders can be withdrew at one time) |  |  |
| contract\_code | string | true | Case-Insenstive.Both uppercase and lowercase are supported.e.g. "BTC-USD" |  |  |

Notes:  
Both order\_id and client\_order\_id can be used for order withdrawl，one of them needed at one time，if both of them are set，the default will be order id。  
The return data from Cancel An Order Interface only means that order cancelation designation is executed successfully. To check cancelation result, please check your order status at Get Information Of An Order interface.  
client\_order\_id, order status query is available for orders placed within 8 hours; Otherwise, clients cannot check orders placed beyond 8 hours.

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | Request Processing Result | "ok" , "error" |
| DICT>(ATTRIBUTE NAME: DATA\_START |  | false |  |  |
| LIST>(ATTRIBUTE NAME: ERRORS\_START |  | false |  |  |
| order\_id | string | true | Order ID |  |
| err\_code | int | true | Error code |  |
| err\_msg | string | true | Error information |  |
| LIST\_END |  | false |  |  |
| successes | string | true | Successfully withdrew list of order\_id or client\_order\_id |  |
| DICT\_END |  | false |  |  |
| ts | long | true | Time of Respond Generation, Unit: Millisecond |  |

#### Request example

{

"order\_id":

"123456"

"client\_order\_id":

"321456"

"contract\_code":

"BTC-USD"

}

#### Response Example

##### Success Example

{

"status":

"ok"

"data":{

"errors":\[

0:{

"order\_id":

"768503271974985728"

"err\_code":

1061

"err\_msg":

"This order doesnt exist."

}

\]

"successes":

"771038212360937472"

}

"ts":

1603871877639

}