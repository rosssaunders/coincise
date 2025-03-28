

# UNIFIED/WS/EN/

# [\#](https://www.gate.io/docs/developers/unified/ws/en/\#gate-io-unified-websocket) Gate.io Unified WebSocket

Gate.io provides a simple and robust Websocket API to integrate gate.io unified
trade status into your business or application.

We have language bindings in `Python`, more in the future! You can view code
examples in the dark area to the right, and you can switch the programming language of the examples
with the tabs in the top right.

## [\#](https://www.gate.io/docs/developers/unified/ws/en/\#server-url) Server URL

**Base URLs:**

`wss://ws.gate.io/v4/ws/unified`

## [\#](https://www.gate.io/docs/developers/unified/ws/en/\#changelog) Changelog

2025-02-10

- `unified.assets` channel remove field `c`( `credit_available_margin`). This field is also returned inside the channel but field is not used. Do not use it later.

2024-10-23

- init version, support `unified.assets`, `unified.asset_detail` channel

```
# !/usr/bin/env python
# coding: utf-8

import hashlib
import hmac
import json
import logging
import time

from websocket import WebSocketApp

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class GateWebSocketApp(WebSocketApp):

    def __init__(self, url, api_key, api_secret, **kwargs):
        super(GateWebSocketApp, self).__init__(url, **kwargs)
        self._api_key = api_key
        self._api_secret = api_secret

    def _send_ping(self, interval, event):
        while not event.wait(interval):
            self.last_ping_tm = time.time()
            if self.sock:
                try:
                    self.sock.ping()
                except Exception as ex:
                    logger.warning("send_ping routine terminated: {}".format(ex))
                    break
                try:
                    self._request("unified.ping", auth_required=False)
                except Exception as e:
                    raise e

    def _request(self, channel, event=None, payload=None, auth_required=True):
        current_time = int(time.time())
        data = {
            "time": current_time,
            "channel": channel,
            "event": event,
            "payload": payload,
        }
        if auth_required:
            message = 'channel=%s&event=%s&time=%d' % (channel, event, current_time)
            data['auth'] = {
                "method": "api_key",
                "KEY": self._api_key,
                "SIGN": self.get_sign(message),
            }
        data = json.dumps(data)
        logger.info('request: %s', data)
        self.send(data)

    def get_sign(self, message):
        h = hmac.new(self._api_secret.encode("utf8"), message.encode("utf8"), hashlib.sha512)
        return h.hexdigest()

    def subscribe(self, channel, payload=None, auth_required=True):
        self._request(channel, "subscribe", payload, auth_required)

    def unsubscribe(self, channel, payload=None, auth_required=True):
        self._request(channel, "unsubscribe", payload, auth_required)

def on_message(ws, message):
    # type: (GateWebSocketApp, str) -> None
    # handle message received
    logger.info("message received from server: {}".format(message))

def on_open(ws):
    # type: (GateWebSocketApp) -> None
    # subscribe to channels interested
    logger.info('websocket connected')
    ws.subscribe("unified.assets", [], False)

if __name__ == "__main__":
    logging.basicConfig(format="%(asctime)s - %(message)s", level=logging.DEBUG)
    app = GateWebSocketApp("wss://ws.gate.io/v4/ws/unified",
                           "YOUR_API_KEY",
                           "YOUR_API_SECRET",
                           on_open=on_open,
                           on_message=on_message)
    app.run_forever(ping_interval=5)

```

```
package main

import (
  "crypto/hmac"
  "crypto/sha512"
  "crypto/tls"
  "encoding/hex"
  "encoding/json"
  "fmt"
  "io"
  "net/url"
  "time"

  "github.com/gorilla/websocket"
)

type Msg struct {
  Time    int64    `json:"time"`
  Channel string   `json:"channel"`
  Event   string   `json:"event"`
  Payload []string `json:"payload"`
  Auth    *Auth    `json:"auth"`
}

type Auth struct {
  Method string `json:"method"`
  KEY    string `json:"KEY"`
  SIGN   string `json:"SIGN"`
}

const (
  Key    = "YOUR_API_KEY"
  Secret = "YOUR_API_SECRETY"
)

func sign(channel, event string, t int64) string {
  message := fmt.Sprintf("channel=%s&event=%s&time=%d", channel, event, t)
  h2 := hmac.New(sha512.New, []byte(Secret))
  io.WriteString(h2, message)
  return hex.EncodeToString(h2.Sum(nil))
}

func (msg *Msg) sign() {
  signStr := sign(msg.Channel, msg.Event, msg.Time)
  msg.Auth = &Auth{
    Method: "api_key",
    KEY:    Key,
    SIGN:   signStr,
  }
}

func (msg *Msg) send(c *websocket.Conn) error {
  msgByte, err := json.Marshal(msg)
  if err != nil {
    return err
  }
  return c.WriteMessage(websocket.TextMessage, msgByte)
}

func NewMsg(channel, event string, t int64, payload []string) *Msg {
  return &Msg{
    Time:    t,
    Channel: channel,
    Event:   event,
    Payload: payload,
  }
}

func main() {
  u := url.URL{Scheme: "wss", Host: "ws.gate.io", Path: "/v4/ws/unified"}
  websocket.DefaultDialer.TLSClientConfig = &tls.Config{RootCAs: nil, InsecureSkipVerify: true}
  c, _, err := websocket.DefaultDialer.Dial(u.String(), nil)
  if err != nil {
    panic(err)
  }
  c.SetPingHandler(nil)

  // read msg
  go func() {
    for {
      _, message, err := c.ReadMessage()
      if err != nil {
        c.Close()
        panic(err)
      }
      fmt.Printf("recv: %s\n", message)
    }
  }()

  t := time.Now().Unix()
  pingMsg := NewMsg("unified.ping", "", t, []string{})
  err = pingMsg.send(c)
  if err != nil {
    panic(err)
  }

  select {}
}

```

## [\#](https://www.gate.io/docs/developers/unified/ws/en/\#api-overview) API Overview

### [\#](https://www.gate.io/docs/developers/unified/ws/en/\#method) Method

Each general api supports some different event messages, they are:

1. **`subscribe`** ( **RECOMMENDED TO USE**)

Subscribe to receive notification from server when new data is available.

2. **`unsubscribe`**

Server will not send new data notification if unsubscribed.

3. **`update`**

If new subscribed data(incremental data) is available, server will send a notification to client.


### [\#](https://www.gate.io/docs/developers/unified/ws/en/\#request) Request

Each request follows a common format, which contains `time`, `channel`, `event` and `payload`.

| parameter | type | required | description |
| --- | --- | --- | --- |
| `id` | Integer | No | Optional request id which will be sent back by the server to help you identify which request the server responds to |
| `time` | Integer | Yes | Request time |
| `channel` | String | Yes | Request subscribe/unsubscribe channel |
| `auth` | String | No | Request auth info, see Authentication section for details |
| `event` | String | Yes | Request event (subscribe/unsubscribe/update/all/api) |
| `payload` | Array | Yes | Request detail parameters |

### [\#](https://www.gate.io/docs/developers/unified/ws/en/\#response) Response

Similar with request, response follows a common format composed of `time`, `channel`, `event`
, `error` and `result`.

| field | type | required | description |
| --- | --- | --- | --- |
| `time` | Integer | Yes | Response time |
| `time_ms` | Integer | Yes | Response time of millisecond |
| `channel` | String | Yes | Response channel |
| `event` | String | Yes | Response channel event (update/all) |
| `error` | Object | Yes | Response error |
| `result` | Array | Yes | Response detail parameters |

### [\#](https://www.gate.io/docs/developers/unified/ws/en/\#error) Error

In case of error, you receive a message containing the proper error code and message within an error
object.

| Code | Message |
| --- | --- |
| `1` | `invalid argument struct` |
| `2` | `invalid argument` |
| `3` | `service error` |

## [\#](https://www.gate.io/docs/developers/unified/ws/en/\#authentication) Authentication

Request body needs to carry authentication information if channels are private,
e.g. `unified.assets`

WebSocket authentication uses the same signature calculation method with HTTP API, but has the
following differences:

1. Signature string concatenation method: `channel=<channel>&event=<event>&time=<time>`,
where `<channel>`, `<event>`, `<time>` are corresponding request information
2. Authentication information are sent in request body in field `auth`.

You can log into the console to retrieve futures API key and secret.

| field | type | description |
| --- | --- | --- |
| `method` | String | Allowed value: `api_key` |
| `KEY` | String | User key string |
| `SIGN` | String | User sign string |

```
# example WebSocket signature calculation implementation in Python
import hmac, hashlib, time

## api_key method generate secret
secret = 'xxxx'
message = 'channel=%s&event=%s&time=%s' % ('unified.assets', 'subscribe', int(time.time()))
print(hmac.new(secret, message, hashlib.sha512).hexdigest())  ## Generating signature

```

# [\#](https://www.gate.io/docs/developers/unified/ws/en/\#system-api) System API

**Provides system status check, such as ping-pong.**

## [\#](https://www.gate.io/docs/developers/unified/ws/en/\#ping-and-pong) Ping and Pong

**Check Server/Client connectivity.**

**gate.io unified use the protocol layer ping/pong message.The server will initiate a ping**
**message actively. If the client does not reply, the client will be disconnected.**

[websocket rfc(opens new window)](https://tools.ietf.org/html/rfc6455)

**if you want to actively detect the connection status, you can send application layer ping message**
**and receive pong message.**

### [\#](https://www.gate.io/docs/developers/unified/ws/en/\#request-2) Request

- channel

`unified.ping`


```
from websocket import create_connection

ws = create_connection("wss://ws.gate.io/v4/ws/unified")
ws.send(json.dumps({
    "time": int(time.time()),
    "channel": "unified.ping",
}))
print(ws.recv())

```

The above command returns JSON structured like this:

```
{
    "time": 1701830644,
    "time_ms": 1701830644326,
    "channel": "unified.pong",
    "event": "",
    "result": null
}

```

# [\#](https://www.gate.io/docs/developers/unified/ws/en/\#assets-overview-api) Assets overview API

**Push asset overview information, with asset values truncated to 2 decimal places by default.**

WARNING

Authentication required.

## [\#](https://www.gate.io/docs/developers/unified/ws/en/\#assets-subscription) assets subscription

### [\#](https://www.gate.io/docs/developers/unified/ws/en/\#request-3) Request

- channel

`unified.assets`

- event

`subscribe`

- params

this channel do not need params



| parameter | type | required | description |
| --- | --- | --- | --- |
|  |  |  |  |


```
import json
from websocket import create_connection

ws = create_connection("wss://ws.gate.io/v4/ws/unified")
req = {
    "time": 1700625194,
    "channel": "unified.assets",
    "event": "subscribe",
    "payload": [],
    "auth": {
        "method": "api_key",
        "KEY": "xxxx",
        "SIGN": "xxxx"
    }
}
ws.send(json.dumps(req))
print(ws.recv())

```

The above command returns JSON structured like this:

```
{
  "time": 1716796362,
  "time_ms": 1716796362915,
  "channel": "unified.assets",
  "event": "subscribe",
  "result": {
    "status": "success"
  }
}

```

## [\#](https://www.gate.io/docs/developers/unified/ws/en/\#assets-notification) assets notification

**Notify user assets overview information.**

### [\#](https://www.gate.io/docs/developers/unified/ws/en/\#notify) Notify

- channel

`unified.assets`

- event

`update`

- params

`For the meaning of parameters, please refer to http interface.`



| field | type | description |
| --- | --- | --- |
| `result` | Array | Array of objects |




| field | type | field full name (non-push field) | description |
| --- | --- | --- | --- |
| `u` | integer | `user_id` | user id |
| `t` | integer | `refresh_time` | data refresh time |
| `r` | string | `total_initial_margin_rate` | total initial margin rate |
| `R` | string | `total_maintenance_margin_rate` | total maintenance margin rate |
| `b` | string | `total_margin_balance` | total margin balance |
| `e` | string | `unified_margin_total_equity` | portfolio margin total equity |
| `l` | string | `unified_margin_total_liab` | portfolio margin total liab |
| `T` | string | `unified_margin_total` | portfolio margin total |
| `a` | string | `total_available_margin` | total available margin |


```
{
        "time": 1700625194,
        "channel": "unified.assets",
        "event": "update",
        "result": {
                "u": 9008,
                "t": 1700625194,
                "r": "18.56",
                "R": "20.10",
                "b": "-1005719.51",
                "e": "-617985.29",
                "l": "1293939.74",
                "T": "675222.27",
                "a": "-1432719.62"
        }
}

```

## [\#](https://www.gate.io/docs/developers/unified/ws/en/\#cancel-subscription) Cancel subscription

**Unsubscribe assets update notification**

### [\#](https://www.gate.io/docs/developers/unified/ws/en/\#request-4) Request

- channel

`unified.assets`

- event

`unsubscribe`


```
import json
from websocket import create_connection

ws = create_connection("wss://ws.gate.io/v4/ws/unified")
req = {
    "time": 123456,
    "channel": "unified.assets",
    "event": "unsubscribe",
    "payload": [],
    "auth": {
        "method": "api_key",
        "KEY": "xxxx",
        "SIGN": "xxxx"
    }
}
ws.send(json.dumps(req))
print(ws.recv())

```

The above command returns JSON structured like this:

```
{
  "time": 1716796362,
  "time_ms": 1716796362915,
  "channel": "unified.assets",
  "event": "unsubscribe",
  "result": {
    "status": "success"
  }
}

```

# [\#](https://www.gate.io/docs/developers/unified/ws/en/\#asset-detail-api) Asset detail API

**Push currency asset information, which includes 'spot assets, Earn, financial management, and lending.' USDT also includes contracts and options.**

WARNING

Authentication required.

## [\#](https://www.gate.io/docs/developers/unified/ws/en/\#asset-detail-subscription) Asset\_detail subscription

### [\#](https://www.gate.io/docs/developers/unified/ws/en/\#request-5) Request

- channel

`unified.asset_detail`

- event

`subscribe`

- params



| parameter | type | required | description |
| --- | --- | --- | --- |
| `currencies` | array string | yes | asset currencies |


```
import json
from websocket import create_connection

ws = create_connection("wss://ws.gate.io/v4/ws/unified")
req = {
    "time": 1716796362,
    "channel": "unified.asset_detail",
    "event": "subscribe",
    "payload": ["BTC","ETH"],
    "auth": {
        "method": "api_key",
        "KEY": "xxxx",
        "SIGN": "xxxx"
    }
}
ws.send(json.dumps(req))
print(ws.recv())

```

The above command returns JSON structured like this:

```
{
  "time": 1716796362,
  "time_ms": 1716796362915,
  "channel": "unified.asset_detail",
  "event": "subscribe",
  "result": {
    "status": "success"
  }
}

```

## [\#](https://www.gate.io/docs/developers/unified/ws/en/\#asset-detail-notification) asset detail notification

**Notify user trades update.**

### [\#](https://www.gate.io/docs/developers/unified/ws/en/\#notify-2) Notify

- channel

`unified.asset_detail`

- event

`update`

- params



| field | type | description |
| --- | --- | --- |
| `result` | Array | Array of objects |




| field | type | field full name (non-push field) | description |
| --- | --- | --- | --- |
| `u` | integer | `user_id` | user id |
| `t` | integer | `refresh_time` | data refresh time |
| `dts` | map | `details` | assets detail map |
| `>a` | string | `available` | availabe amount |
| `>f` | string | `freeze` | locked amount |
| `>e` | string | `equity` | equity |
| `>tl` | string | `total_liab` | total liabilities |
| `>b` | string | `balance` | balance |


```
{
    "time": 1716796362,
    "time_ms": 1716796362915,
    "channel": "unified.asset_detail",
    "event": "update",
    "result":
    {
        "u": 11027732,
        "t": 1716796364,
        "dts":
        {
            "BTC":
            {
                "a": "1086390.949548",
                "f": "0.000000",
                "e": "1086390.949548",
                "tl": "0.00",
                "b": "1086390.949548"
            }
        }
    }
}

```

## [\#](https://www.gate.io/docs/developers/unified/ws/en/\#cancel-subscription-2) Cancel subscription

**Unsubscribe user trades update.**

### [\#](https://www.gate.io/docs/developers/unified/ws/en/\#request-6) Request

- channel

`unified.asset_detail`

- event

`unsubscribe`


```
import json
from websocket import create_connection

ws = create_connection("wss://ws.gate.io/v4/ws/unified")
req = {
    "time": 1716796362,
    "channel": "unified.asset_detail",
    "event": "unsubscribe",
    "payload": ["BTC", "ETH"],
    "auth": {
        "method": "api_key",
        "KEY": "xxxx",
        "SIGN": "xxxx"
    }
}
ws.send(json.dumps(req))
print(ws.recv())

```

The above command returns JSON structured like this:

```
{
  "time": 1716796362,
  "time_ms": 1716796362689,
  "channel": "unified.asset_detail",
  "event": "unsubscribe",
  "result": {
    "status": "success"
  }
}

```

Last Updated:2/10/2025, 3:36:25 AM