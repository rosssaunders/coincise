# BingX Spot Private WebSocket API

## Introduction

### Connection Limits

A single websocket is limited to a maximum of 200 topics; exceeding this will
return error code 100416.

A single IP is limited to a maximum of 60 websockets; exceeding this will return
error code 100419.

### Access

Market Websocket access URL: wss://open-api-ws.bingx.com/market

### Data Compression

All response data from Websocket server are compressed into GZIP format. Clients
have to decompress them for further use.

### Heartbeats

Once the Websocket Client and Websocket Server get connected, the server will
send a heartbeat- ping message every 5 seconds (the frequency might change).

{"ping":"2177c68e4d0e45679965f482929b59c2","time":"2022-06-07T16:27:36.323+0800"}

When the Websocket Client receives this heartbeat message, it should return pong
message.

{"pong":"2177c68e4d0e45679965f482929b59c2","time":"2022-06-07T16:27:36.323+0800"}

### Unsubscribe

The format of unsubscription is as follows:

{ "id": "id1", "reqType": "unsub", "dataType": "data to unsub"}

Confirmation of Unsubscription:

{ "id": "id1", "code": 0, "msg": "" }

#### Symbol Description

Symbol must be fully capitalized

### Subscriptions

After successfully establishing a connection with the Websocket server, the
Websocket client sends the following request to subscribe to a specific topic:

{ "id": "id1", "reqType": "sub", "dataType": "data to sub" }

- ID is the unique ID passed in by the user, which will be returned when
  returned, used for distinguishing idempotence checks by the user

After a successful subscription, the Websocket client will receive a
confirmation message:

{ "id": "id1", "code": 0, "msg": "" }

After that, once the subscribed data is updated, the Websocket client will
receive the update message pushed by the server.

- Code Error Code Description

0:"SUCCESS"

/\*\*

\* 100xxx is a universal status code.

\*/

// No data found in server search

100204:"SEARCH_NO_CONTENT"

// Duplicate Request

100205:"REPEAT_REQUEST"

// Client request parameter error

100400:"ILLEGAL_ARGUMENT"

// Client authentication failed

100401:"AUTHENTICATION_FAIL"

// Client permission verification failed

100403:"AUTHORIZATION_FAIL"

// Client request frequency limit

100410:"FREQUENCY_LIMIT"

// Server error

100500:"INTERNAL_SERVER_ERROR"

// Server Busy

100503:"SERVER_BUSY"

> **Source:**
> [original URL](https://bingx-api.github.io/docs/#/en-us/spot/socket/)

---

## Listen Key

websocket interface

wss://open-api-ws.bingx.com/market

account subscription data stream /market?listenKey=

wss://open-api-ws.bingx.com/market?listenKey=a8ea75681542e66f1a50a1616dd06ed77dab61baa0c296bca03a9b13ee5f2dd7

### generate Listen Key

POST /openApi/user/auth/userDataStream

rate limitation by UID: 2/s & rate limitation by IP in group Number: 2

API KEY permission: Read

Content-Type:request body(application/json)

listen key Valid for 1 hour

interface

CURL

response

{"listenKey":"a8ea75681542e66f1a50a1616dd06ed77dab61baa0c296bca03a9b13ee5f2dd7"}

#### Request Parameters

| Parameter Name | Type   | Required | Description |
| -------------- | ------ | -------- | ----------- |
| X-BX-APIKEY    | string | no       | API KEY     |

#### Response Parameters

| Parameter Name | Type   | Description |
| -------------- | ------ | ----------- |
| listenKey      | string | listen Key  |

#### Errors

| Error Code | Description                                                                                                                                                  |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 80014      | timestamp is invalid                                                                                                                                         |
| 100421     | Null timestamp or timestamp mismatch, try to run our sample code from the link https://bingx-api.github.io/docs/#/en-us/spot/account-api.html#Query%20Assets |
| 100419     | IP does not match IP whitelist , please go to https://bingx.com/en/account/api/ to verify the ip you have set                                                |
| 100410     | code:100410:The endpoint trigger frequency limit rule is currently in the disabled period and will be unblocked after 1727193814249                          |
| 100410     | rate limited                                                                                                                                                 |
| 100413     | Incorrect apiKey                                                                                                                                             |
| 100410     | over 20 error code:100202 requests within 480000 ms for this api, please verify and fix it ,can retry after time: 1727193970155                              |

### extend Listen Key Validity period

rate limitation by UID: 2/s & rate limitation by IP in group Number: 2

API KEY permission: Read

Content-Type:request body(application/json)

The validity period is extended to 60 minutes after this call, and it is
recommended to send a ping every 30 minutes.

CURL

response

- http status 200 success

- http status 204 not content

- http status 404 not find key

[1\. Create Account](https://bingx.com)
[2\. Pass KYC/KYB](https://bingx.com/en-us/account/api/)
[3\. Create API KEY](https://bingx.com/en-us/account/api/)
[4\. Configure API KEY permissions](https://bingx.com/en-us/account/api/)
[5\. Understanding signature authentication](https://bingx-api.github.io/docs/#/en-us/swapV2/authentication.html#Signature%20Description)
_6\. Run the following example code_
[7\. Understand common error codes](https://bingx-api.github.io/docs/#/en-us/swapV2/base-info.html#Common%20Error%20Codes)
[8\. Understand rate limitations](https://bingx-api.github.io/docs/#/en-us/swapV2/base-info.html#Rate%20limit)
[9\. Understanding request timestamps](https://bingx-api.github.io/docs/#/en-us/swapV2/base-info.html#Timestamp)
[10\. Understand fee schedule](https://bingx.com/en-us/support/costs/)
[11\. Understand trading rules](https://bingx.com/en-us/tradeInfo/perpetual/trading-rules/BTC-USDT)

request parameters https://open-api.bingx.com

PUT /openApi/user/auth/userDataStream

#### Request Parameters

| Parameter Name | Type   | Required | Description |
| -------------- | ------ | -------- | ----------- |
| listenKey      | string | yes      | listen Key  |

#### Errors

| Error Code | Description                                                                                                                                                  |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 80014      | timestamp is invalid                                                                                                                                         |
| 100421     | Null timestamp or timestamp mismatch, try to run our sample code from the link https://bingx-api.github.io/docs/#/en-us/spot/account-api.html#Query%20Assets |
| 100419     | IP does not match IP whitelist , please go to https://bingx.com/en/account/api/ to verify the ip you have set                                                |
| 100410     | code:100410:The endpoint trigger frequency limit rule is currently in the disabled period and will be unblocked after 1727193814249                          |
| 100410     | rate limited                                                                                                                                                 |
| 100413     | Incorrect apiKey                                                                                                                                             |
| 100410     | over 20 error code:100202 requests within 480000 ms for this api, please verify and fix it ,can retry after time: 1727193970155                              |

### delete Listen Key

rate limitation by UID: 2/s & rate limitation by IP in group Number: 2

API KEY permission: Read

Content-Type:request body(application/json)

delete User data flow.

CURL

response

- http status 200 success

- http status 204 not content

- http status 404 not find key

[1\. Create Account](https://bingx.com)
[2\. Pass KYC/KYB](https://bingx.com/en-us/account/api/)
[3\. Create API KEY](https://bingx.com/en-us/account/api/)
[4\. Configure API KEY permissions](https://bingx.com/en-us/account/api/)
[5\. Understanding signature authentication](https://bingx-api.github.io/docs/#/en-us/swapV2/authentication.html#Signature%20Description)
_6\. Run the following example code_
[7\. Understand common error codes](https://bingx-api.github.io/docs/#/en-us/swapV2/base-info.html#Common%20Error%20Codes)
[8\. Understand rate limitations](https://bingx-api.github.io/docs/#/en-us/swapV2/base-info.html#Rate%20limit)
[9\. Understanding request timestamps](https://bingx-api.github.io/docs/#/en-us/swapV2/base-info.html#Timestamp)
[10\. Understand fee schedule](https://bingx.com/en-us/support/costs/)
[11\. Understand trading rules](https://bingx.com/en-us/tradeInfo/perpetual/trading-rules/BTC-USDT)

request parameters https://open-api.bingx.com

DELETE /openApi/user/auth/userDataStream

#### Request Parameters

| Parameter Name | Type   | Required | Description |
| -------------- | ------ | -------- | ----------- |
| listenKey      | string | yes      | listen Key  |

#### Errors

| Error Code | Description                                                                                                                                                  |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 80014      | timestamp is invalid                                                                                                                                         |
| 100421     | Null timestamp or timestamp mismatch, try to run our sample code from the link https://bingx-api.github.io/docs/#/en-us/spot/account-api.html#Query%20Assets |
| 100419     | IP does not match IP whitelist , please go to https://bingx.com/en/account/api/ to verify the ip you have set                                                |
| 100410     | code:100410:The endpoint trigger frequency limit rule is currently in the disabled period and will be unblocked after 1727193814249                          |
| 100410     | rate limited                                                                                                                                                 |
| 100413     | Incorrect apiKey                                                                                                                                             |
| 100410     | over 20 error code:100202 requests within 480000 ms for this api, please verify and fix it ,can retry after time: 1727193970155                              |

> **Source:**
> [original URL](https://bingx-api.github.io/docs/#/en-us/spot/socket/listenKey.html)

---

## Websocket Account Data

Note that obtaining such information requires websocket authentication, use
listenKey, and check the
[Listen Key](https://bingx-api.github.io/docs/#/swapV2/listen-key.html)

The websocket api is wss://open-api-ws.bingx.com/market

The stream name of the subscription account data stream is /market?listenKey=

wss://open-api-ws.bingx.com/market?listenKey=a8ea75681542e66f1a50a1616dd06ed77dab61baa0c296bca03a9b13ee5f2dd7

### Subscription order update data

Subscription Type

dataType: spot.executionReport

Subscription example

{"id":"e745cd6d-d0f6-4a70-8d5a-043e4c741b40","reqType":
"sub","dataType":"spot.executionReport"}

The effective time of the listen key is 1 hour. In order to ensure that your
subscription is not interrupted, please update the listen key regularly

Push data

#### Data Parameters

|     | Description                              |
| --- | ---------------------------------------- |
| e   | Event Type                               |
| E   | event time                               |
| s   | trading pair                             |
| S   | Order direction                          |
| o   | order type                               |
| q   | Order original quantity                  |
| p   | Original order price                     |
| x   | Event Type                               |
| X   | order status                             |
| i   | Order ID                                 |
| l   | Last order transaction volume            |
| z   | Accumulated transaction volume of orders |
| L   | Last transaction price of the order      |
| n   | Number of handling fees                  |
| N   | Handling fee asset category              |
| T   | transaction time                         |
| t   | Transaction ID                           |
| O   | Order creation time                      |
| Z   | Accumulated transaction amount of orders |
| Y   | Last transaction amount of the order     |
| Q   | Original order amount                    |

### Subscription account balance push

Subscription Type

dataType: ACCOUNT_UPDATE

Subscription example

{"id":"gdfg2311-d0f6-4a70-8d5a-043e4c741b40","reqType":
"sub","dataType":"ACCOUNT_UPDATE"}

The field "m" represents the reason for the launch of the event, including the
following possible types: -DEPOSIT

INIT

DEPOSIT

DEPOSIT

WITHDRAW

ORDER

FUNDING_FEE

WITHDRAW_REJECT

ADJUSTMENT

INSURANCE_CLEAR

ADMIN_DEPOSIT

ADMIN_WITHDRAW

MARGIN_TRANSFER

MARGIN_TYPE_CHANGE

ASSET_TRANSFER

OPTIONS_PREMIUM_FEE

OPTIONS_SETTLE_PROFIT

AUTO_EXCHANGE

- For more about return error codes, please see the error code description on
  the homepage.

The effective time of the listen key is 1 hour. In order to ensure that your
subscription is not interrupted, please update the listen key regularly

Push data

#### Data Parameters

|     | Description         |
| --- | ------------------- |
| B   | Array\[\]           |
| m   | event launch reason |

#### Order Parameters

|     | Description                                                           |
| --- | --------------------------------------------------------------------- |
| a   | Asset Name                                                            |
| bc  | The amount of change in the asset account in this transaction         |
| cw  | The total assets in the account after the change in the asset account |
| wb  | The total assets in the account after the change in the asset account |
| lk  | Locked Asset                                                          |

> **Source:**
> [original URL](https://bingx-api.github.io/docs/#/en-us/spot/socket/account.html#Subscription%20order%20update%20data)

---
