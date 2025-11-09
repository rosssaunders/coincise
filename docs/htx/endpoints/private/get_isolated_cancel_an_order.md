# GET [Isolated] Cancel an Order

**Source:** [[Isolated] Cancel an Order](https://www.htx.com/en-us/opend/newApiPages/?id=8cb84a62-77b5-11ed-9966-0242ac110003)

**Category:** Swap Trade Interface

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v1/swap\_cancel (\[Isolated\] Cancel an Order)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: Generally, the private interface rate limit of API key is at most 144 times every 3 seconds for each UID (Trade Interface: at most 72 times every 3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is shared by all the altcoins contracts delivered by different date).

Interface description: This interface only supports isolated margin mode.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| order\_id | string | false | order ID（different IDs are separated by ",", maximum 25 orders can be withdrew at one time） |  |  |
| client\_order\_id | string | false | Client order ID (different IDs are separated by ",", maximum 25 orders can be withdrew at one time) |  |  |
| contract\_code | string | true | Case-Insenstive.Both uppercase and lowercase are supported.e.g. "BTC-USDT" |  |  |

Notes:  
Both order\_id and client\_order\_id can be used for order withdrawl，one of them needed at one time，if both of them are set，the default will be order id。  
The return data from Cancel An Order Interface only means that order cancelation designation is executed successfully. To check cancelation result, please check your order status at Get Information Of An Order interface.  
client\_order\_id, order status query is available for orders placed within 8 hours; Otherwise, clients cannot check orders placed beyond 8 hours.

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | Request Processing Result | "ok" , "error" |
| DATA\_START | object | false |  |  |
| ERRORS\_START | array | false |  |  |
| order\_id | string | true | Order ID |  |
| err\_code | int | true | Error code |  |
| err\_msg | string | true | Error information |  |
| ERRORS\_END |  | false |  |  |
| successes | string | true | Successfully withdrew list of order\_id or client\_order\_id |  |
| DATA\_END |  | false |  |  |
| ts | long | true | Time of Respond Generation, Unit: Millisecond |  |

#### Request example

{

"order\_id":

"456789133445"

"client\_order\_id":

"4567891312345"

"contract\_code":

"BTC-USDT"

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

"770323133537685504"

"err\_code":

1071

"err\_msg":

"Repeated withdraw."

}

\]

"successes":

"770323847022211072"

}

"ts":

1603701351602

}