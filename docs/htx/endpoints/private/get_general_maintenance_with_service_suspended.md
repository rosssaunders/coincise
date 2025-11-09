# GET [General]Maintenance with service suspended

**Source:** [[General]Maintenance with service suspended](https://www.htx.com/en-us/opend/newApiPages/?id=10000027-77b7-11ed-9966-0242ac110003)

**Category:** Reference Data

## Authentication

Required (Private Endpoint)

### https://api.hbdm.com/heartbeat (\[General\]Maintenance with service suspended)

Request type: GET

Signature verification: Yes

Interface permission: Read

Interface description: During the maintenance of the business system, in addition to the below two interfaces(Get system status, Query whether the system is available) for users to query the system status, all “rest” interfaces of the API business will return this in a fixed manner:{"status": "maintain"}. During maintenance with service suspended，all websocket notify interfaces except subscribing system status updates（Subscribe system status updates）can't work，and will push 1006 error code to clients.Response{ "status": "maintain"}Query whether the system is available: https://api.hbdm.com/heartbeat/for getting the infomation that system maintenance with service suspended, could by subscrib system status updates websocket interface.

#### Request Address

| Environment | Address |
| --- | --- |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |

#### Request example

No data

#### Response Example

##### Success Example

{

"status":

"maintain"

}