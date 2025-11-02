## Heartbeats

Once the Websocket Client and Websocket Server get connected, the server will
send a heartbeat- ping message every 5 seconds (the frequency might change).

{"ping":"2177c68e4d0e45679965f482929b59c2","time":"2022-06-07T16:27:36.323+0800"}

When the Websocket Client receives this heartbeat message, it should return pong
message.

{"pong":"2177c68e4d0e45679965f482929b59c2","time":"2022-06-07T16:27:36.323+0800"}

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/spot/socket/#Connection%20Limits](https://bingx-api.github.io/docs/#/en-us/spot/socket/#Connection%20Limits)
