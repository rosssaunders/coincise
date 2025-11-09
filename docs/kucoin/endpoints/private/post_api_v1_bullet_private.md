# POST /api/v1/bullet-private

**Source:**
[/api/v1/bullet-private](https://www.kucoin.com/docs/rest//api/v1/bullet-private)

## Authentication

Required (Private Endpoint)

## Description

Get Private Token - Futures

This interface can obtain the token required for Websocket to establish a
Futures private connection. If you need use private channels (e.g. account
balance notice), please make request as follows to obtain the server list and
private token

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
