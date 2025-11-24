# Format

**Source:** [Format](https://developer-pro.bitmart.com/en/futuresv2/)

**API Type:** Futures

## Format

The message format sent by the client to the BitMart server.

```json
{
  "action": "<operation>",
  "args": ["<topic1>", "<topic2>"]
}
```

**Explain**:

- `operation` request action, value: \[`subscribe`\=Subscribe channel,
  `unsubscribe`\=Unsubscribe channel, `login`\=Account login\]
- `args` request parameter, value: channel array or parameters required for
  login
- `topic` channel topic, composed of `<channel>:<filter>`
  - channel is composed of business/name
  - filter is filterable data, refer to each channel description for details

**Example**:

- Example 1: `{"action": "subscribe", "args": ["futures/depth50:BTCUSDT"]}`
  - Means to subscribe to the depth data of the trading pair BTCUSDT
- Example 2:
  `{"action": "login", "args": ["80618e45710812162b04892c7ee5ead4a3cc3e56", "1589267764859", "3ceeb7e1b8cb165a975e28a2e2dfaca4d30b358873c0351c1a071d8c83314556", "web"]}`
  - Login request before private channel subscription

---

### Successful Response Format

The format of the success message returned by the BitMart server to the client.

Return `success` field is `ture`

> Successful Response Format

`When action=access ： {"action":"access","success":true}  When action=unsubscribe ： {"action":"unsubscribe","group":"Depth:1","success":true,"request":{"action":"unsubscribe","args":["Depth:1"]}}  When action=subscribe ： {"action":"subscribe","group":"Depth:1","success":true,"request":{"action":"subscribe","args":["Depth:1"]}}`

**Example**:

- Example 1：`{"action":"access","success":true}`
  - Means successful login
- Example
  2：`{"action":"unsubscribe","group":"futures/depth50:BTCUSDT","success":true,"request":{"action":"unsubscribe","args":["futures/depth50:BTCUSDT"]}}`
  - Means successful cancellation of depth50 subscription for trading pair
    BTCUSDT
- Example
  3：`{"action":"subscribe","group":"futures/depth50:BTCUSDT","success":true,"request":{"action":"subscribe","args":["futures/depth50:BTCUSDT"]}}`
  - Means successful subscribe of depth50 subscription for trading pair BTCUSDT
- Example
  4：`{"group":"futures/depth50:BTCUSDT","data":{"symbol":"BTCUSDT","way":2,"depths":[{"price":"30107.7","vol":"234"},{"price":"30107.8","vol":"1587"}]}}`
  - Means the depth50 subscription of spot trading pair BTCUSDT, generates data,
    and returns it to the client

---

### Failed Response Format

The format of the failed message returned by the BitMart server to the client.

Return `success` field is `false`

> Failed Response Format

```json
{
  "action": "subscribe",
  "group": "Depth:1",
  "success": false,
  "error": "authentication is temporarily unavailable"
}
```

- Example
  1：`{"action":"subscribe","group":"futures/order","success":false,"error":"futures/order need authenication"}`
  - Means you need to log in
- Example
  2：`{"action":"access","success":false,"error":"access failed: openapi auth: apiKey 880d5edecs**** failed: openapi auth failed"}`
  - Means login failed, your sign is wrong
- Example
  3：`{"action":"subscribe","group":"sfutures/depth50:BTCUSDT","success":false,"request":{"action":"subscribe","args":["sfutures/depth50:BTCUSDT"]},"error":"group [sfutures/depth50:BTCUSDT] not exist"}`
  - Means subscription failed, your parameter is invalid, this channel does not
    exist
