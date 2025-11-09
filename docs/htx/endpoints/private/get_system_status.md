# GET system status

**Source:** [Get system status](https://www.htx.com/en-us/opend/newApiPages/?id=5d517664-77b6-11ed-9966-0242ac110003)

**Category:** Reference Data

## Authentication

Required (Private Endpoint)

### https://status-swap.huobigroup.com/api/v2/summary.json (Get system status)

Request type: GET

Signature verification: No

Interface permission: Read

Interface description: This endpoint allows users to get system status, Incidents and planned maintenance. The system status can also be obtained through email, SMS, webhook, RSS/Atom feed. Users can You can click here to subscribe. The subscription function depends on Google services. Before you subscribe, please ensure that you can access Google services normally.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://status-swap.huobigroup.com/api/v2/summary.json |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |

Notes:  
No parameter is available for this endpoint.

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| page |  | false | basic information of status page |  |
| {id | string | false | page id |  |
| name | string | false | page name |  |
| url | string | false | page url |  |
| time\_zone | string | false | time zone |  |
| updated\_at} | string | false | page update time |  |
| components |  | false | System components and their status |  |
| \[{id | string | false | component id |  |
| name | string | false | component name, including Order submission, Order cancellation, Deposit etc. |  |
| status | string | false | component status, value range: operational, degraded\_performance, partial\_outage, major\_outage, under maintenance |  |
| created\_at | string | false | component create time |  |
| updated\_at | string | false | component update time |  |
| .......}\] |  | false | for details of other fields, please refer to the return example |  |
| incidents |  | false | System fault incident and their status. If there is no fault at present, it will return to null |  |
| \[{id | string | false | incident id |  |
| name | string | false | incident name |  |
| status | string | false | incident staus, value range: investigating, identified, monitoring, resolved |  |
| created\_at | string | false | incident creat time |  |
| updated\_at | string | false | incident update time |  |
| .......}\] |  | false | for details of other fields, please refer to the return example |  |
| scheduled\_maintenances |  | false | System scheduled maintenance incident and status. If there is no scheduled maintenance at present, it will return to null |  |
| \[{id | string | false | incident id |  |
| name | string | false | incident name |  |
| status | string | false | incident staus, value range: scheduled, in progress, verifying, completed |  |
| created\_at | string | false | incident creat time |  |
| updated\_at | string | false | incident update time |  |
| scheduled\_for | string | false | scheduled maintenance start time |  |
| scheduled\_until | string | false | scheduled maintenance end time |  |
| .......}\] |  | false | for details of other fields, please refer to the return example |  |
| status |  | false | The overall current status of the system |  |
| {indicator | string | false | system indicator, value range: none, minor, major, critical, maintenance |  |
| description} | string | false | system description, value range: All Systems Operational, Minor Service Outager, Partial System Outage, Partially Degraded Service, Service Under Maintenance |  |

#### Request example

`curl"https://status-swap.huobigroup.com/api/v2/summary.json"`

#### Response Example

##### Success Example

`{ "page": { "id": "p0qjfl24znv5", "name": "HTX", "url": "https://status-swap.huobigroup.com", "time_zone": "Etc/UTC", // 时区 "updated_at": "2020-02-07T10:25:14.717Z" }, "components": [ { "id": "h028tnzw1n5l", "name": "Deposit", "status": "operational", "created_at": "2019-12-05T02:07:12.372Z", "updated_at": "2020-02-07T09:27:15.563Z", "position": 1, "description": null, "showcase": true, "group_id": "gtd0nyr3pf0k", "page_id": "p0qjfl24znv5", "group": false, "only_show_if_degraded": false } ], "incidents": [ { "id": "rclfxz2g21ly", "name": "Market data is delayed", "status": "investigating", "created_at": "2020-02-11T03:15:01.913Z", "updated_at": "2020-02-11T03:15:02.003Z", "monitoring_at": null, "resolved_at": null, "impact": "minor", "shortlink": "http://stspg.io/pkvbwp8jppf9", "started_at": "2020-02-11T03:15:01.906Z", "page_id": "p0qjfl24znv5", "incident_updates": [ { "id": "dwfsk5ttyvtb", "status": "investigating", "body": "Market data is delayed", "incident_id": "rclfxz2g21ly", "created_at": "2020-02-11T03:15:02.000Z", "updated_at": "2020-02-11T03:15:02.000Z", "display_at": "2020-02-11T03:15:02.000Z", "affected_components": [ { "code": "nctwm9tghxh6", "name": "Market data", "old_status": "operational", "new_status": "degraded_performance" } ], "deliver_notifications": true, "custom_tweet": null, "tweet_id": null } ], "components": [ { "id": "nctwm9tghxh6", "name": "Market data", "status": "degraded_performance", "created_at": "2020-01-13T09:34:48.284Z", "updated_at": "2020-02-11T03:15:01.951Z", "position": 8, "description": null, "showcase": false, "group_id": null, "page_id": "p0qjfl24znv5", "group": false, "only_show_if_degraded": false } ] } ], "scheduled_maintenances": [ { "id": "k7g299zl765l", "name": "Schedule maintenance", "status": "scheduled", "created_at": "2020-02-11T03:16:31.481Z", "updated_at": "2020-02-11T03:16:31.530Z", "monitoring_at": null, "resolved_at": null, "impact": "maintenance", "shortlink": "http://stspg.io/md4t4ym7nytd", "started_at": "2020-02-11T03:16:31.474Z", "page_id": "p0qjfl24znv5", "incident_updates": [ { "id": "8whgr3rlbld8", "status": "scheduled", "body": "We will be undergoing scheduled maintenance during this time.", "incident_id": "k7g299zl765l", "created_at": "2020-02-11T03:16:31.527Z", "updated_at": "2020-02-11T03:16:31.527Z", "display_at": "2020-02-11T03:16:31.527Z", "affected_components": [ { "code": "h028tnzw1n5l", "name": "Deposit And Withdraw - Deposit", "old_status": "operational", "new_status": "operational" } ], "deliver_notifications": true, "custom_tweet": null, "tweet_id": null } ], "components": [ { "id": "h028tnzw1n5l", "name": "Deposit", "status": "operational", "created_at": "2019-12-05T02:07:12.372Z", "updated_at": "2020-02-10T12:34:52.970Z", "position": 1, "description": null, "showcase": false, "group_id": "gtd0nyr3pf0k", "page_id": "p0qjfl24znv5", "group": false, "only_show_if_degraded": false } ], "scheduled_for": "2020-02-15T00:00:00.000Z", "scheduled_until": "2020-02-15T01:00:00.000Z" } ], "status": { "indicator": "minor", "description": "Partially Degraded Service" } }`