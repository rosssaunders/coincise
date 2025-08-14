# [#](#gate-unified-websocket) Gate Unified WebSocket

Gate provides a simple and robust Websocket API to integrate Gate unified trade
status into your business or application.

We have language bindings in `Python`, more in the future! You can view code
examples in the dark area to the right, and you can switch the programming
language of the examples with the tabs in the top right.

## [#](#server-url) Server URL

**Base URLs:**

`wss://ws.gate.com/v4/ws/unified`

## [#](#api-overview) API Overview

### [#](#method) Method

Each general api supports some different event messages, they are:

1.  **`subscribe`** (**RECOMMENDED TO USE**)

    Subscribe to receive notification from server when new data is available.

2.  **`unsubscribe`**

    Server will not send new data notification if unsubscribed.

3.  **`update`**

    If new subscribed data(incremental data) is available, server will send a
    notification to client.

### [#](#request) Request

Each request follows a common format, which contains `time`, `channel`, `event`
and `payload`.

| parameter | type    | required | description                                                                                                         |
| --------- | ------- | -------- | ------------------------------------------------------------------------------------------------------------------- |
| `id`      | Integer | No       | Optional request id which will be sent back by the server to help you identify which request the server responds to |
| `time`    | Integer | Yes      | Request time                                                                                                        |
| `channel` | String  | Yes      | Request subscribe/unsubscribe channel                                                                               |
| `auth`    | String  | No       | Request auth info, see Authentication section for details                                                           |
| `event`   | String  | Yes      | Request event (subscribe/unsubscribe/update/all/api)                                                                |
| `payload` | Array   | Yes      | Request detail parameters                                                                                           |

### [#](#response) Response

Similar with request, response follows a common format composed of `time`,
`channel`, `event` , `error` and `result`.

| field     | type    | required | description                         |
| --------- | ------- | -------- | ----------------------------------- |
| `time`    | Integer | Yes      | Response time                       |
| `time_ms` | Integer | Yes      | Response time of millisecond        |
| `channel` | String  | Yes      | Response channel                    |
| `event`   | String  | Yes      | Response channel event (update/all) |
| `error`   | Object  | Yes      | Response error                      |
| `result`  | Array   | Yes      | Response detail parameters          |

### [#](#error) Error

In case of error, you receive a message containing the proper error code and
message within an error object.

| Code | Message                   |
| ---- | ------------------------- |
| `1`  | `invalid argument struct` |
| `2`  | `invalid argument`        |
| `3`  | `service error`           |

## [#](#authentication) Authentication

Request body needs to carry authentication information if channels are private,
e.g. `unified.assets`

WebSocket authentication uses the same signature calculation method with HTTP
API, but has the following differences:

1.  Signature string concatenation method:
    `channel=<channel>&event=<event>&time=<time>`, where `<channel>`, `<event>`,
    `<time>` are corresponding request information
2.  Authentication information are sent in request body in field `auth`.

```python
# example WebSocket signature calculation implementation in Python
import hmac, hashlib, time

## api_key method generate secret
secret = 'xxxx'
message = 'channel=%s&event=%s&time=%s' % ('unified.assets', 'subscribe', int(time.time()))
print(hmac.new(secret, message, hashlib.sha512).hexdigest())  ## Generating signature
```

You can log into the console to retrieve futures API key and secret.

| field    | type   | description             |
| -------- | ------ | ----------------------- |
| `method` | String | Allowed value:`api_key` |
| `KEY`    | String | User key string         |
| `SIGN`   | String | User sign string        |

# [#](#system-api) System API

**Provides system status check, such as ping-pong.**

## [#](#ping-and-pong) Ping and Pong

**Check Server/Client connectivity.**

**Gate unified use the protocol layer ping/pong message.The server will initiate
a ping message actively. If the client does not reply, the client will be
disconnected.**

[websocket rfc (opens new window)](https://tools.ietf.org/html/rfc6455)

**if you want to actively detect the connection status, you can send application
layer ping message and receive pong message.**

```python
from websocket import create_connection

ws = create_connection("wss://ws.gate.com/v4/ws/unified")
ws.send(json.dumps({
    "time": int(time.time()),
    "channel": "unified.ping",
}))
print(ws.recv())
```

The above command returns JSON structured like this:

```json
{
  "time": 1701830644,
  "time_ms": 1701830644326,
  "channel": "unified.pong",
  "event": "",
  "result": null
}
```

### [#](#request-2) Request

- channel

  `unified.ping`

# [#](#assets-overview-api) Assets overview API

**Push asset overview information, with asset values truncated to 2 decimal
places by default.**

WARNING

Authentication required.

## [#](#assets-subscription) assets subscription

```python
import json
from websocket import create_connection

ws = create_connection("wss://ws.gate.com/v4/ws/unified")
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

```json
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

### [#](#request-3) Request

- channel

  `unified.assets`

- event

  `subscribe`

* params

  this channel do not need params

  | parameter | type | required | description |
  | --------- | ---- | -------- | ----------- |
  |           |      |          |             |

## [#](#assets-notification) assets notification

```json
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

**Notify user assets overview information.**

### [#](#notify) Notify

- channel

  `unified.assets`

- event

  `update`

* params

  `For the meaning of parameters, please refer to http interface.`

  | field    | type  | description      |
  | -------- | ----- | ---------------- |
  | `result` | Array | Array of objects |

  | field | type    | field full name (non-push field) | description                             |
  | ----- | ------- | -------------------------------- | --------------------------------------- |
  | `u`   | integer | `user_id`                        | user id                                 |
  | `t`   | integer | `refresh_time`                   | data refresh time                       |
  | `r`   | string  | `total_initial_margin_rate`      | total initial margin rate (unit: %)     |
  | `R`   | string  | `total_maintenance_margin_rate`  | total maintenance margin rate (unit: %) |
  | `b`   | string  | `total_margin_balance`           | total margin balance                    |
  | `e`   | string  | `unified_margin_total_equity`    | portfolio margin total equity           |
  | `l`   | string  | `unified_margin_total_liab`      | portfolio margin total liab             |
  | `T`   | string  | `unified_margin_total`           | portfolio margin total                  |
  | `a`   | string  | `total_available_margin`         | total available margin                  |

## [#](#cancel-subscription) Cancel subscription

```python
import json
from websocket import create_connection

ws = create_connection("wss://ws.gate.com/v4/ws/unified")
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

```json
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

**Unsubscribe assets update notification**

### [#](#request-4) Request

- channel

  `unified.assets`

- event

  `unsubscribe`

# [#](#asset-detail-api) Asset detail API

**Push currency asset information, which includes 'spot assets, Earn, financial
management, and lending.' USDT also includes contracts and options.**

WARNING

Authentication required.

## [#](#asset-detail-subscription) Asset_detail subscription

```python
import json
from websocket import create_connection

ws = create_connection("wss://ws.gate.com/v4/ws/unified")
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

```python
# Subscribe to all currencies
import json
from websocket import create_connection

ws = create_connection("wss://ws.gate.com/v4/ws/unified")
req = {
    "time": 1716796362,
    "channel": "unified.asset_detail",
    "event": "subscribe",
    "payload": ["!all"],
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

```json
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

### [#](#request-5) Request

- channel

  `unified.asset_detail`

- event

  `subscribe`

* params

  | parameter    | type         | required | description                                                                                                                                                                                                     |
  | ------------ | ------------ | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
  | `currencies` | array string | yes      | asset currencies. You can specify individual currencies like `["BTC","ETH"]` or use `["!all"]` to subscribe to all currencies. Note: you cannot mix individual currencies with `!all` in the same subscription. |

## [#](#asset-detail-notification) asset detail notification

```json
{
  "time": 1716796362,
  "time_ms": 1716796362915,
  "channel": "unified.asset_detail",
  "event": "update",
  "result": {
    "u": 11027732,
    "t": 1716796364,
    "dts": {
      "BTC": {
        "a": "1086390.949548",
        "f": "0.000000",
        "e": "1086390.949548",
        "tl": "0.00",
        "b": "1086390.949548"
      },
      "USDT": {
        "a": "8724.23263378",
        "f": "0.00",
        "e": "8724.23263378",
        "tl": "0.00",
        "b": "8724.23263378",
        "cb": "8724.23263378",
        "mb": "8724.23263378",
        "im": "0.00",
        "imr": "9999.99",
        "mm": "0.00",
        "mmr": "9999.99",
        "am": "8724.23263378",
        "iam": "8724.23263378"
      }
    }
  }
}
```

**Notify user trades update.**

### [#](#notify-2) Notify

- channel

  `unified.asset_detail`

- event

  `update`

* params

  | field    | type  | description      |
  | -------- | ----- | ---------------- |
  | `result` | Array | Array of objects |

  | field                                                                                                                         | type    | field full name (non-push field) | description                                           |
  | ----------------------------------------------------------------------------------------------------------------------------- | ------- | -------------------------------- | ----------------------------------------------------- |
  | `u`                                                                                                                           | integer | `user_id`                        | user id                                               |
  | `t`                                                                                                                           | integer | `refresh_time`                   | data refresh time                                     |
  | `dts`                                                                                                                         | map     | `details`                        | assets detail map                                     |
  | `>a`                                                                                                                          | string  | `available`                      | availabe amount                                       |
  | `>f`                                                                                                                          | string  | `freeze`                         | locked amount                                         |
  | `>e`                                                                                                                          | string  | `equity`                         | equity                                                |
  | `>tl`                                                                                                                         | string  | `total_liab`                     | total liabilities                                     |
  | `>b`                                                                                                                          | string  | `balance`                        | balance                                               |
  | The following fields: These fields are used in the single-currency margin mode and are only pushed when the currency is USDT. |         |                                  |                                                       |
  | `>cb`                                                                                                                         | string  | `cross_balance`                  | cross margin balance                                  |
  | `>mb`                                                                                                                         | string  | `margin_balance`                 | cross margin collateral balance                       |
  | `>im`                                                                                                                         | string  | `initial_margin`                 | total initial margin (cross margin)                   |
  | `>mm`                                                                                                                         | string  | `maintenance_margin`             | total maintenance margin (cross margin)               |
  | `>imr`                                                                                                                        | string  | `initial_margin_rate`            | total initial margin rate (cross margin, unit: %)     |
  | `>mmr`                                                                                                                        | string  | `maintenance_margin_rate`        | total maintenance margin rate (cross margin, unit: %) |
  | `>am`                                                                                                                         | string  | `available_margin`               | total available margin balance                        |
  | `>iam`                                                                                                                        | string  | `iso_available_margin`           | isolated margin available for opening positions       |

## [#](#cancel-subscription-2) Cancel subscription

```python
import json
from websocket import create_connection

ws = create_connection("wss://ws.gate.com/v4/ws/unified")
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

```python
# Unsubscribe from all currencies
import json
from websocket import create_connection

ws = create_connection("wss://ws.gate.com/v4/ws/unified")
req = {
    "time": 1716796362,
    "channel": "unified.asset_detail",
    "event": "unsubscribe",
    "payload": ["!all"],
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

```json
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

**Unsubscribe user trades update.**

### [#](#request-6) Request

- channel

  `unified.asset_detail`

- event

  `unsubscribe`

Last Updated: 7/9/2025, 2:07:42 PM
