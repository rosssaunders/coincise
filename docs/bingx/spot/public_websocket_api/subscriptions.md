## Subscriptions

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
> [https://bingx-api.github.io/docs/#/en-us/spot/socket/#Connection%20Limits](https://bingx-api.github.io/docs/#/en-us/spot/socket/#Connection%20Limits)
