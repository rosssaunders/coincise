# POST /api/v1/bullet-public

**Source:**
[/api/v1/bullet-public](https://www.kucoin.com/docs/rest//api/v1/bullet-public)

## Authentication

Not Required (Public Endpoint)

## Description

Get Public Token - Futures

This interface can obtain the token required for Websocket to establish a
Futures connection. If you need use public channels (e.g. all public market
data), please make request as follows to obtain the server list and public token

## Responses

### 200

| Parameter                           | Required | Type    | Description                                                                          |
| ----------------------------------- | -------- | ------- | ------------------------------------------------------------------------------------ |
| code                                | required | string  |                                                                                      |
| data                                | required | object  |                                                                                      |
| data.token                          | required | string  | The token required to establish a Websocket connection                               |
| data.instanceServers                | required | array   |                                                                                      |
| data.instanceServers[].endpoint     | required | string  | Websocket domain URL. It is recommended to use a dynamic URL, as the URL may change. |
| data.instanceServers[].encrypt      | required | boolean | Whether to encrypt. Currently only supports wss, not ws                              |
| data.instanceServers[].protocol     | required | string  | Network Protocol                                                                     |
| data.instanceServers[].pingInterval | required | integer | Recommended ping interval (milliseconds)                                             |
| data.instanceServers[].pingTimeout  | required | integer | Heartbeat timeout (milliseconds)                                                     |
