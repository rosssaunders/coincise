# System Status

## Get System Time

`Get system time`

#### Request URL

`GET https://api-cloud.bitmart.com/system/time`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

`curl https://api-cloud.bitmart.com/system/time`

None

#### Response Data

> Response

`{   "code": 1000,   "trace":"886fb6ae-456b-4654-b4e0-d681ac05cea1",   "message": "OK",   "data": {     "server_time": 1527777538000   } }`

| Field | Type | Description |
| --- | --- | --- |
| server_time | Long | Current system time (timestamp, accuracy in milliseconds) 

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
| title | String | System maintenance instructions title 
| status | Long | System maintenance status<br>- <code>0</code>=Waiting<br>- <code>1</code>=Working<br>- <code>2</code>=Completed 
| service_type | String | Service type<br>- <code>spot</code>=Spot API service<br>- <code>contract</code>=Contract API service<br>- <code>account</code>=Account API service 
| start_time | Long | System maintenance start time, UTC-0, timestamp accuracy in milliseconds 
| end_time | Long | System maintenance end time, UTC-0, timestamp accuracy in milliseconds
