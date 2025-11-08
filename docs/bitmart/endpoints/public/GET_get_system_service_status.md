# GET Get System Service Status

**Source:** [Get System Service Status](https://developer-pro.bitmart.com/en/spot/)

**API Type:** Spot

## Authentication

Not Required (Public Endpoint)

## Get System Service Status

`Get system service status`

#### Request URL

`GET https://api-cloud.bitmart.com/system/service`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

`curl https://api-cloud.bitmart.com/system/service`

None

#### Response Data

> Response

`{   "code": 1000,   "trace":"886fb6ae-456b-4654-b4e0-d681ac05cea1",   "message": "OK",   "data": {     "service":[       {          "title": "Spot API Stop",          "service_type": "spot",          "status": "2",          "start_time": 1527777538000,          "end_time": 1527777538000      },      {         "title": "Contract API Stop",         "service_type": "contract",         "status": "2",         "start_time": 1527777538000,         "end_time": 1527777538000     }    ]   } }`

| Field | Type | Description |
| --- | --- | --- |
| title | String | System maintenance instructions title |
| status | Long | System maintenance status  
\- `0`\=Waiting  
\- `1`\=Working  
\- `2`\=Completed |
| service\_type | String | Service type  
\- `spot`\=Spot API service  
\- `contract`\=Contract API service  
\- `account`\=Account API service |
| start\_time | Long | System maintenance start time, UTC-0, timestamp accuracy in milliseconds |
| end\_time | Long | System maintenance end time, UTC-0, timestamp accuracy in milliseconds |