# GET Query whether the system is available

**Source:** [Query whether the system is available](https://www.htx.com/en-us/opend/newApiPages/?id=5d51757b-77b6-11ed-9966-0242ac110003)

**Category:** Reference Data

## Authentication

Required (Private Endpoint)

### https://api.hbdm.com/heartbeat/ (Query whether the system is available)

Request type: GET

Signature verification: No

Interface permission: Read

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com/heartbeat/ |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |

Notes:  
No parameters are needed for this endpoint.

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | false | "ok" or "error"... |  |
| DATA\_START | dict object | false |  |  |
| heartbeat | int | false | future 1: avaiable 0: not available(maintenance with service suspended) |  |
| swap\_heartbeat | int | false | coin margined swap 1: avaiable 0: not available(maintenance with service suspended) |  |
| estimated\_recovery\_time | long | false | null: normal. estimated recovery time :millionseconds. |  |
| swap\_estimated\_recovery\_time | long | false | null: normal. coin margined swap estimated recovery time millionseconds. |  |
| linear\_swap\_heartbeat | long | false | USDT margined Contracts 1: avaiable 0: not available(maintenance with service suspended) |  |
| linear\_swap\_estimated\_recovery\_time | long | false | null: normal. USDT margined Contracts estimated recovery time millionseconds. |  |
| DATA\_END |  | false |  |  |

Notes:  
Heartbeat is 1 is available, 0 is not available.

#### Request example

`curl"https://api.hbdm.com/heartbeat/"`

#### Response Example

##### Success Example

{

"status":

"ok"

"data":{

"heartbeat":

1

"estimated\_recovery\_time":

NULL

"swap\_heartbeat":

1

"swap\_estimated\_recovery\_time":

NULL

"linear\_swap\_heartbeat":

1

"linear\_swap\_estimated\_recovery\_time":

NULL

}

"ts":

1557714418033

}