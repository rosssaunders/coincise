# GET /api/v3/announcements

**Source:**
[/api/v3/announcements](https://www.kucoin.com/docs/rest//api/v3/announcements)

## Authentication

Not Required (Public Endpoint)

## Description

Get Announcements

This interface can obtain the latest news announcements, and the default page
search is for announcements within a month.

## Parameters

| Parameter   | Required | Type    | Description                                                                                                                                                                                                                                                                                                                                                          |
| ----------- | -------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| currentPage | optional | integer | page number                                                                                                                                                                                                                                                                                                                                                          |
| pageSize    | optional | integer | page Size                                                                                                                                                                                                                                                                                                                                                            |
| annType     | optional | string  | Announcement types: latest-announcements , activities (latest activities), new-listings (new currency online), product-updates (product updates), vip (institutions and VIPs), maintenance-updates (system maintenance), product -updates (product news), delistings (currency offline), others, api-campaigns (API user activities), default : latest-announcements |
| lang        | optional | string  | Language type, the default is en_US, the specific value parameters are as follows                                                                                                                                                                                                                                                                                    |
| startTime   | optional | integer | Announcement online start time (milliseconds)                                                                                                                                                                                                                                                                                                                        |
| endTime     | optional | integer | Announcement online end time (milliseconds)                                                                                                                                                                                                                                                                                                                          |

## Responses

### 200

| Parameter             | Required | Type    | Description                                                  |
| --------------------- | -------- | ------- | ------------------------------------------------------------ |
| code                  | required | string  |                                                              |
| data                  | required | object  |                                                              |
| data.totalNum         | required | integer | Total Number                                                 |
| data.items            | required | array   |                                                              |
| data.items[].annId    | required | integer | Announcement ID                                              |
| data.items[].annTitle | required | string  | Announcement title                                           |
| data.items[].annType  | required | array   | Announcement type                                            |
| data.items[].annDesc  | required | string  | Announcement description                                     |
| data.items[].cTime    | required | integer | Announcement release time, Unix millisecond timestamp format |
| data.items[].language | required | string  | language type                                                |
| data.items[].annUrl   | required | string  | Announcement link                                            |
| data.currentPage      | required | integer | Current page                                                 |
| data.pageSize         | required | integer | Page size                                                    |
| data.totalPage        | required | integer | Total Page                                                   |
