# GET Query whether the system is available

**Source:**
[Query whether the system is available](https://www.htx.com/en-us/opend/newApiPages/?id=5d51757b-77b6-11ed-9966-0242ac110003)

**Category:** Reference Data

## Authentication

Required (Private Endpoint)

### https://api.hbdm.com/heartbeat/ (Query whether the system is available)

Request type: GET

Signature verification: No

Interface permission: Read

#### Request Address

| Environment | Address                         |
| ----------- | ------------------------------- |
| Online      | https://api.hbdm.com/heartbeat/ |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --------- | --------- | -------- | ----------- | ----------- | ------------- |

Notes:  
No parameters are needed for this endpoint.

#### Response Parameter

| Parameter                           | Data Type   | Required | Description                                                                              | Value Range |
| ----------------------------------- | ----------- | -------- | ---------------------------------------------------------------------------------------- | ----------- |
| status                              | string      | false    | "ok" or "error"...                                                                       |             |
| DATA_START                          | dict object | false    |                                                                                          |             |
| heartbeat                           | int         | false    | future 1: avaiable 0: not available(maintenance with service suspended)                  |             |
| swap_heartbeat                      | int         | false    | coin margined swap 1: avaiable 0: not available(maintenance with service suspended)      |             |
| estimated_recovery_time             | long        | false    | null: normal. estimated recovery time :millionseconds.                                   |             |
| swap_estimated_recovery_time        | long        | false    | null: normal. coin margined swap estimated recovery time millionseconds.                 |             |
| linear_swap_heartbeat               | long        | false    | USDT margined Contracts 1: avaiable 0: not available(maintenance with service suspended) |             |
| linear_swap_estimated_recovery_time | long        | false    | null: normal. USDT margined Contracts estimated recovery time millionseconds.            |             |
| DATA_END                            |             | false    |                                                                                          |             |

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

"estimated_recovery_time":

NULL

"swap_heartbeat":

1

"swap_estimated_recovery_time":

NULL

"linear_swap_heartbeat":

1

"linear_swap_estimated_recovery_time":

NULL

}

"ts":

1557714418033

}
