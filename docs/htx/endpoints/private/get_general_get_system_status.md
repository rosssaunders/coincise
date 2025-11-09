# GET [General]Get system status

**Source:** [[General]Get system status](https://www.htx.com/en-us/opend/newApiPages/?id=8cb8072f-77b5-11ed-9966-0242ac110003)

**Category:** Downline Interface

## Authentication

Required (Private Endpoint)

### https://status-linear-swap.huobigroup.com/api/v2/summary.json (\[General\]Get system status)

Request type: GET

Signature verification: No

Interface permission: Read

Rate Limit: For public interface used to get information of index, price limit, settlement, delivery, open positions and so on, the rate limit is 240 times every 3 second at most for each IP (this 240 times every 3 second public interface rate limit is shared by all the requests from that IP of non-marketing information, like above).

Interface description: This endpoint allows users to get system status, Incidents and planned maintenance. The system status can also be obtained through email, SMS, webhook, RSS/Atom feed. Users can You can click here to subscribe. The subscription function depends on Google services. Before you subscribe, please ensure that you can access Google services normally.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://status-linear-swap.huobigroup.com/api/v2/summary.json |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |

Notes:  
No parameters are needed for this endpoint.

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

`curl "https://status-linear-swap.huobigroup.com/api/v2/summary.json"`

#### Response Example

##### Success Example

{

"page":{

"id":

"p0qjfl24znv5"

"name":

"HTX Futures-USDT-margined Swaps"

"url":

"https://status-linear-swap.huobigroup.com"

"time\_zone":

"Asia/Singapore"

"updated\_at":

"2020-02-07T10:25:14.717Z"

}

"components":\[

0:{

"id":

"h028tnzw1n5l"

"name":

"Deposit"

"status":

"operational"

"created\_at":

"2019-12-05T02:07:12.372Z"

"updated\_at":

"2020-02-07T09:27:15.563Z"

"position":

1

"description":

NULL

"showcase":

true

"group\_id":

"gtd0nyr3pf0k"

"page\_id":

"p0qjfl24znv5"

"group":

false

"only\_show\_if\_degraded":

false

}

\]

"incidents":\[

0:{

"id":

"rclfxz2g21ly"

"name":

"Market data is delayed"

"status":

"investigating"

"created\_at":

"2020-02-11T03:15:01.913Z"

"updated\_at":

"2020-02-11T03:15:02.003Z"

"monitoring\_at":

NULL

"resolved\_at":

NULL

"impact":

"minor"

"shortlink":

"http://stspg.io/pkvbwp8jppf9"

"started\_at":

"2020-02-11T03:15:01.906Z"

"page\_id":

"p0qjfl24znv5"

"incident\_updates":\[

0:{

"id":

"dwfsk5ttyvtb"

"status":

"investigating"

"body":

"Market data is delayed"

"incident\_id":

"rclfxz2g21ly"

"created\_at":

"2020-02-11T03:15:02.000Z"

"updated\_at":

"2020-02-11T03:15:02.000Z"

"display\_at":

"2020-02-11T03:15:02.000Z"

"affected\_components":\[

0:{

"code":

"nctwm9tghxh6"

"name":

"Market data"

"old\_status":

"operational"

"new\_status":

"degraded\_performance"

}

\]

"deliver\_notifications":

true

"custom\_tweet":

NULL

"tweet\_id":

NULL

}

\]

"components":\[

0:{

"id":

"nctwm9tghxh6"

"name":

"Market data"

"status":

"degraded\_performance"

"created\_at":

"2020-01-13T09:34:48.284Z"

"updated\_at":

"2020-02-11T03:15:01.951Z"

"position":

8

"description":

NULL

"showcase":

false

"group\_id":

NULL

"page\_id":

"p0qjfl24znv5"

"group":

false

"only\_show\_if\_degraded":

false

}

\]

}

\]

"scheduled\_maintenances":\[

0:{

"id":

"k7g299zl765l"

"name":

"Schedule maintenance"

"status":

"scheduled"

"created\_at":

"2020-02-11T03:16:31.481Z"

"updated\_at":

"2020-02-11T03:16:31.530Z"

"monitoring\_at":

NULL

"resolved\_at":

NULL

"impact":

"maintenance"

"shortlink":

"http://stspg.io/md4t4ym7nytd"

"started\_at":

"2020-02-11T03:16:31.474Z"

"page\_id":

"p0qjfl24znv5"

"incident\_updates":\[

0:{

"id":

"8whgr3rlbld8"

"status":

"scheduled"

"body":

"We will be undergoing scheduled maintenance during this time."

"incident\_id":

"k7g299zl765l"

"created\_at":

"2020-02-11T03:16:31.527Z"

"updated\_at":

"2020-02-11T03:16:31.527Z"

"display\_at":

"2020-02-11T03:16:31.527Z"

"affected\_components":\[

0:{

"code":

"h028tnzw1n5l"

"name":

"Deposit And Withdraw - Deposit"

"old\_status":

"operational"

"new\_status":

"operational"

}

\]

"deliver\_notifications":

true

"custom\_tweet":

NULL

"tweet\_id":

NULL

}

\]

"components":\[

0:{

"id":

"h028tnzw1n5l"

"name":

"Deposit"

"status":

"operational"

"created\_at":

"2019-12-05T02:07:12.372Z"

"updated\_at":

"2020-02-10T12:34:52.970Z"

"position":

1

"description":

NULL

"showcase":

false

"group\_id":

"gtd0nyr3pf0k"

"page\_id":

"p0qjfl24znv5"

"group":

false

"only\_show\_if\_degraded":

false

}

\]

"scheduled\_for":

"2020-02-15T00:00:00.000Z"

"scheduled\_until":

"2020-02-15T01:00:00.000Z"

}

\]

"status":{

"indicator":

"minor"

"description":

"Partially Degraded Service"

}

}