# Announcement

## GET / Announcements

Get announcements, the response is sorted by `pTime` and `businessPTime` with
the most recent first. The sort will not be affected if the announcement is
updated. Every page has 20 records

Authentication is optional for this endpoint.

It will be regarded as private endpoint and authentication is required if
OK-ACCESS-KEY in HTTP header is delivered.  
It will be regarded as public endpoint and authentication isn't required if
OK-ACCESS-KEY in HTTP header isn't delivered.

There are differences between public endpoint and private endpoint.  
For public endpoint, the response is restricted based on your request IP.  
For private endpoint, the response is restricted based on your country of
residence.

#### Rate Limit: 5 requests per 2 seconds

#### Rate limit rule: User ID(Private) or IP(Public)

#### Permission: Read

#### HTTP Request

`GET /api/v5/support/announcements`

> Request Example

Copy to Clipboard

`GET /api/v5/support/announcements`

#### Request Parameters

| Parameter                           | Type   | Required | Description                                                                 |
| ----------------------------------- | ------ | -------- | --------------------------------------------------------------------------- |
| annType                             | String | No       | Announcement type. Delivering the `annType` from "GET / Announcement types" |
| Returning all when it is not posted |
| page                                | String | No       | Page for pagination.                                                        |
| The default is 1                    |

> Response Example

Copy to Clipboard

`{     "code": "0",     "data": [         {             "details": [                 {                     "annType": "announcements-new-listings",                     "title": "OKX to list Virtuals Protocol (VIRTUAL) for spot trading",                     "url": "https://www.okx.com/help/okx-to-list-virtuals-protocol-virtual-for-spot-trading",                     "pTime": "1761620404821",                     "businessPTime": "1761620400000"                 },                 {                     "annType": "announcements-web3",                     "title": "Completion of X Layer Mainnet Upgrade",                     "url": "https://www.okx.com/help/completion-of-x-layer-mainnet-upgrade",                     "pTime": "1761582756071",                     "businessPTime": "1761580800000"                 },             ],             "totalPage": "123"         }     ],     "msg": "" }`

#### Response Parameters

| Parameter        | Type             | Description                                                                                                                 |
| ---------------- | ---------------- | --------------------------------------------------------------------------------------------------------------------------- |
| totalPage        | String           | Total number of pages                                                                                                       |
| details          | Array of objects | List of announcements                                                                                                       |
| \> title         | String           | Announcement title                                                                                                          |
| \> annType       | String           | Announcement type                                                                                                           |
| \> businessPTime | String           | The time displayed on the announcement page for user reference. Unix timestamp format in milliseconds, e.g. `1597026383085` |
| \> pTime         | String           | The actual time the announcement was first published. Unix timestamp format in milliseconds, e.g. `1597026383085`           |
| \> url           | String           | Announcement url                                                                                                            |

## GET / Announcement types

Authentication is not required for this public endpoint.
