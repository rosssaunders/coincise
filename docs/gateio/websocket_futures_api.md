# [#](#gate-io-delivery-websocket-v4) Gate.io Delivery WebSocket v4

Gate.io provides a simple and robust Websocket API to integrate gate.io BTC/USDT
delivery contract trade status into your business or application.

We have language bindings in `Python`, more in the future! You can view code
examples in the dark area to the right, and you can switch the programming
language of the examples with the tabs in the top right.

## [#](#server-url) Server URL

We provide BTC/USDT delivery contract trade server urls, you can choose one of
them according to your condition.

### [#](#usdt-contract) USDT Contract

Base URLs:

- Real Trading: `wss://fx-ws.gateio.ws/v4/ws/delivery/usdt`
- TestNet: `wss://fx-ws-testnet.gateio.ws/v4/ws/delivery/usdt`

### [#](#btc-contract) BTC Contract

Base URLs:

- Real Trading: `wss://fx-ws.gateio.ws/v4/ws/delivery/btc`
- TestNet Trading: `wss://fx-ws-testnet.gateio.ws/v4/ws/delivery/btc`

## [#](#changelog) Changelog

```python
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
                    self._request("futures.ping", auth_required=False)
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
    ws.subscribe("futures.tickers", ['BTC_USDT_20230630'], False)

if __name__ == "__main__":
    logging.basicConfig(format="%(asctime)s - %(message)s", level=logging.DEBUG)
    app = GateWebSocketApp("wss://fx-ws-testnet.gateio.ws/v4/ws/delivery/usdt",
                           "YOUR_API_KEY",
                           "YOUR_API_SECRET",
                           on_open=on_open,
                           on_message=on_message)
    app.run_forever(ping_interval=5)
```

```go
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
	u := url.URL{Scheme: "wss", Host: "fx-ws.gateio.ws", Path: "/v4/ws/delivery/usdt"}
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
	pingMsg := NewMsg("futures.ping", "", t, []string{})
	err = pingMsg.send(c)
	if err != nil {
		panic(err)
	}

	// subscribe order book
	orderBookMsg := NewMsg("futures.order_book", "subscribe", t, []string{"BTC_USDT_20230630"})
	err = orderBookMsg.send(c)
	if err != nil {
		panic(err)
	}

	// subscribe positions
	positionsMsg := NewMsg("futures.positions", "subscribe", t, []string{"USERID", "BTC_USDT_20230630"})
	positionsMsg.sign()
	err = positionsMsg.send(c)
	if err != nil {
		panic(err)
	}

	select {}
}
```

2025-03-21

- The documentation for all private channel subscription parameters has been
  updated.

2021-08-06

- Add BTC settled delivery contracts support

2020-08-08

- Add a complete code demo(golang, python)

2020-08-07

- Add auto orders subscription

## [#](#api-overview) API Overview

### [#](#method) Method

Each general api (such as ticker, order book etc.) supports 4 different event
messages, they are:

1.  **`subscribe`** (**RECOMMENDED TO USE**)

    Subscribe to receive notification from server when new data is available.

2.  **`unsubscribe`**

    Server will not send new data notification if unsubscribed.

3.  **`update`**

    If new subscribed data(incremental data) is available, server will send a
    notification to client.

4.  **`all`**

    If new subscribed data(all data) is available, server will send a
    notification to client.

### [#](#request) Request

Each request follows a common format, which contains `time`, `channel`, `event`
and `payload`.

| parameter | type    | required | description                                               |
| --------- | ------- | -------- | --------------------------------------------------------- |
| time      | Integer | Yes      | request time                                              |
| channel   | String  | Yes      | request subscribe/unsubscribe channel                     |
| auth      | String  | no       | request auth info, see Authentication section for details |
| event     | String  | Yes      | request event (subscribe/unsubscribe/update/all)          |
| payload   | Array   | Yes      | request detail parameters                                 |

### [#](#response) Response

Similar with request, response follows a common format composed of `time`,
`channel`, `event` , `error` and `result`.

| field   | type    | required | description                                                                                      |
| ------- | ------- | -------- | ------------------------------------------------------------------------------------------------ |
| time    | Integer | Yes      | response time                                                                                    |
| channel | String  | Yes      | response channel                                                                                 |
| event   | String  | Yes      | response channel event (update/all)                                                              |
| error   | Object  | Yes      | response channel event (update/all)                                                              |
| result  | Any     | Yes      | New data notification from the server, or response to client requests. Null iferror is not null. |

Note: type of `result` is channel specific if it's server-initiated data update
notification, but response to client subscription request always set the
`result` to `{"status": "success"}`. To verify if subscription request is
successful or not, you only need to check if `error` field is null. Parsing
`result` field is not necessary.

Channel specific description below will only give the server-initiated data
update notification format for simplicity.

### [#](#error) Error

In case of error, you receive a message containing the proper error code and
message within an error object.

| Code | Message                 |
| ---- | ----------------------- |
| 1    | invalid argument struct |
| 2    | invalid argument        |
| 3    | service error           |
| 4    | authentication fail     |

## [#](#authentication) Authentication

Request body needs to carry authentication information if channels are private,
e.g. `futures.usertrades`

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
message = 'channel=%s&event=%s&time=%s' % ('futures.orders', 'subscribe', int(time.time()))
print(hmac.new(secret, message, hashlib.sha512).hexdigest())  ## Generating signature
```

You can log into the console to retrieve delivery API key and secret.

| field  | type   | description            |
| ------ | ------ | ---------------------- |
| method | String | allowed value: api_key |
| KEY    | String | user key string        |
| SIGN   | String | user sign string       |

# [#](#system-api) System API

**Provides system status check, such as ping-pong.**

## [#](#ping-and-pong) Ping and Pong

**Check Server/Client connectivity.**

**gate.io delivery contract use the protocol layer ping/pong message.The server
will initiate a ping message actively. If the client does not reply, the client
will be disconnected.**

[websocket rfc (opens new window)](https://tools.ietf.org/html/rfc6455)

**if you want to actively detect the connection status, you can send application
layer ping message and receive pong message.**

```python
from websocket import create_connection

ws = create_connection("wss://fx-ws-testnet.gateio.ws/v4/ws/delivery/usdt")
ws.send('{"time" : 123456, "channel" : "futures.ping"}')
print(ws.recv())
```

The above command returns JSON structured like this:

```json
{
  "time": 1545404023,
  "channel": "futures.pong",
  "event": "",
  "error": null,
  "result": null
}
```

### [#](#request-2) Request

- channel

  `futures.ping`

# [#](#tickers-api) Tickers API

**The ticker is a high level overview of the state of the contract. It shows you
the highest, lowest, last trade price. It also includes information such as
daily volume and how much the price has moved over the last day.**

## [#](#tickers-subscription) Tickers subscription

```python
from websocket import create_connection

ws = create_connection("wss://fx-ws-testnet.gateio.ws/v4/ws/delivery/usdt")
ws.send(
    '{"time" : 123456, "channel" : "futures.tickers", "event": "subscribe", "payload" : ["BTC_USDT_20230630"]}')
print(ws.recv())
```

The above command returns JSON structured like this:

```json
{
  "time": 1545404023,
  "channel": "futures.tickers",
  "event": "subscribe",
  "error": null,
  "result": {
    "status": "success"
  }
}
```

**Subscribe delivery contract ticker.**

### [#](#request-3) Request

- channel

  `futures.tickers`

- event

  `subscribe`

* params

  | parameter | type  | required | description   |
  | --------- | ----- | -------- | ------------- |
  | payload   | Array | Yes      | contract list |

## [#](#tickers-notification) Tickers notification

```json
{
  "time": 1541659086,
  "channel": "futures.tickers",
  "event": "update",
  "error": null,
  "result": [
    {
      "contract": "BTC_USDT_20230630",
      "last": "118.4",
      "change_percentage": "0.77",
      "funding_rate": "-0.000114",
      "funding_rate_indicative": "0.01875",
      "mark_price": "118.35",
      "index_price": "118.36",
      "total_size": "73648",
      "volume_24h": "745487577",
      "volume_24h_btc": "117",
      "volume_24h_usd": "419950",
      "quanto_base_rate": "",
      "volume_24h_quote": "1665006",
      "volume_24h_settle": "178",
      "volume_24h_base": "5526"
    }
  ]
}
```

**Notify subscribed contract ticker.**

### [#](#notify) Notify

- channel

  `futures.tickers`

- event

  `update`

* params

  | field  | type  | description      |
  | ------ | ----- | ---------------- |
  | result | Array | Array of objects |

  | field                   | type   | description             |
  | ----------------------- | ------ | ----------------------- |
  | contract                | String | delivery contract name  |
  | last                    | String | last price              |
  | change_percentage       | String | change percentage       |
  | funding_rate            | String | funding rate            |
  | funding_rate_indicative | String | funding rate indicative |
  | mark_price              | String | mark price              |
  | index_price             | String | index price             |
  | total_size              | String | total size              |
  | volume_24h              | String | volume 24h              |
  | quanto_base_rate        | String | quanto base rate        |
  | volume_24h_btc          | String | watch http api          |
  | volume_24h_usd          | String | watch http api          |
  | volume_24h_quote        | String | watch http api          |
  | volume_24h_settle       | String | watch http api          |
  | volume_24h_base         | String | watch http api          |

## [#](#cancel-subscription) Cancel subscription

```python
import json
from websocket import create_connection

ws = create_connection("wss://fx-ws-testnet.gateio.ws/v4/ws/delivery/usdt")
req = {
    "time": 123456,
    "channel": "futures.tickers",
    "event": "unsubscribe",
    "payload": ["BTC_USDT_20230630"]
}
ws.send(json.dumps(req))
print(ws.recv())
```

The above command returns JSON structured like this:

```json
{
  "time": 1545404900,
  "channel": "futures.tickers",
  "event": "unsubscribe",
  "error": null,
  "result": {
    "status": "success"
  }
}
```

**Unsubscribe contract ticker.**

### [#](#request-4) Request

- channel

  `futures.tickers`

- event

  `unsubscribe`

# [#](#trades-api) Trades API

**This channel sends a trade message whenever a trade occurs at gate.io. It
includes details of the trade, such as price, amount, time and type.**

## [#](#trades-subscription) Trades subscription

```python
from websocket import create_connection

ws = create_connection("wss://fx-ws-testnet.gateio.ws/v4/ws/delivery/usdt")
ws.send(
    '{"time" : 123456, "channel" : "futures.trades", "event": "subscribe", "payload" : ["BTC_USDT_20230630"]}')
print(ws.recv())
```

The above command returns JSON structured like this:

```json
{
  "time": 1545405058,
  "channel": "futures.trades",
  "event": "subscribe",
  "error": null,
  "result": {
    "status": "success"
  }
}
```

**Subscribe trades update notification.**

### [#](#request-5) Request

- channel

  `futures.trades`

- event

  `subscribe`

* params

  | parameter | type  | required | description   |
  | --------- | ----- | -------- | ------------- |
  | payload   | Array | Yes      | contract list |

## [#](#trades-notification) Trades notification

Positive size means taker is buyer，negative seller

```json
{
  "channel": "futures.trades",
  "event": "update",
  "time": 1541503698,
  "result": [
    {
      "size": -108,
      "id": 27753479,
      "create_time": 1545136464,
      "create_time_ms": 1545136464123,
      "price": "96.4",
      "contract": "BTC_USDT_20230630"
    }
  ]
}
```

**Notify latest trades update.**

### [#](#notify-2) Notify

- channel

  `futures.trades`

- event

  `update`

* params

  | field  | type  | description      |
  | ------ | ----- | ---------------- |
  | result | Array | Array of objects |

  | field          | type   | description                            |
  | -------------- | ------ | -------------------------------------- |
  | contract       | String | delivery contract name                 |
  | size           | int    | trades size                            |
  | id             | int    | trades id                              |
  | create_time    | int    | trades msg create time                 |
  | create_time_ms | int    | trades msg create time in milliseconds |
  | price          | string | trades price                           |

## [#](#cancel-subscription-2) Cancel subscription

```python
from websocket import create_connection

ws = create_connection("wss://fx-ws-testnet.gateio.ws/v4/ws/delivery/usdt")
ws.send(
    '{"time" : 123456, "channel" : "futures.trades", "event": "subscribe", "payload" : ["BTC_USDT_20230630"]}')
print(ws.recv())
```

The above command returns JSON structured like this:

```json
{
  "time": 1545404900,
  "channel": "futures.trades",
  "event": "unsubscribe",
  "error": null,
  "result": {
    "status": "success"
  }
}
```

**Unsubscribe trades update notification.**

### [#](#request-6) Request

- channel

  `futures.trades`

- event

  `unsubscribe`

# [#](#order-book-api) Order Book API

**The order_book channel allow you to keep track of the state of the gate.io
order book depth. It is provided on a price aggregated basis, with customizable
precision.**

There are three different order book channels for subscription:

- `futures.order_book`

  Legacy channel, which uses `all` to push full limited-level order book, and
  `update` to send every order book change event.

- `futures.book_ticker`

  Push best bid and ask in real-time.

- `futures.order_book_update`

  Push order book change with user-specified update frequency.

WARNING

Receiving order book update through `futures.order_book` is not recommended to
use. `futures.order_book_update` can provide more timely update with less
traffic

How to maintain local order book:

1.  Subscribe `futures.order_book_update` with specified level and update
    frequency, e.g. `["BTC_USDT_20230630", "1000ms", "10"]` pushes the first 10
    levels' update in BTC_USDT order book every 1s
2.  Cache WebSocket notifications. Every notification use `U` and `u` to tell
    the first and last update ID since last notification.
3.  Retrieve base order book using REST API, and make sure the order book ID is
    recorded(referred as `baseID` below) e.g.
    `https://api.gateio.ws/api/v4/delivery/usdt/order_book?contract=BTC_USDT_20230630&limit=10&with_id=true`
    retrieves the 10-level base order book of BTC_USDT_20230630
4.  Iterate the cached WebSocket notifications, and find the first one which
    contains the baseID, i.e. `U <= baseId+1` and `u >= baseId+1`, then start
    consuming from it. Note that sizes in notifications are all absolute values.
    Use them to replace original sizes in corresponding price. If size equals to
    0, delete the price from the order book.
5.  Dump all notifications which satisfy `u < baseID+1`. If
    `baseID+1 < first notification U`, it means current base order book falls
    behind notifications. Start from step 3 to retrieve newer base order book.
6.  If any subsequent notification which satisfy `U > baseID+1` is found, it
    means some updates are lost. Reconstruct local order book from step 3.

## [#](#legacy-order-book-subscription) Legacy order book subscription

```python
from websocket import create_connection

ws = create_connection("wss://fx-ws-testnet.gateio.ws/v4/ws/delivery/usdt")
ws.send(
    '{"time" : 123456, "channel" : "futures.order_book", "event": "subscribe", "payload" : ["BTC_USDT_20230630", "20", "0"]}')
print(ws.recv())
```

The above command returns JSON structured like this:

```json
{
  "time": 1545405058,
  "time_ms": 1545405058123,
  "channel": "futures.order_book",
  "event": "subscribe",
  "error": null,
  "result": {
    "status": "success"
  }
}
```

**Subscribe order_book.**

### [#](#request-7) Request

- channel

  `futures.order_book`

- event

  `subscribe`

* params

  | parameter | type   | required | description                                |
  | --------- | ------ | -------- | ------------------------------------------ |
  | contract  | String | Yes      | contract name                              |
  | limit     | String | Yes      | limit, legal limits: 100, 50, 20, 10, 5, 1 |
  | interval  | String | Yes      | legal intervals: "0"                       |

## [#](#legacy-order-book-notification) Legacy order book notification

```json
{
  "channel": "futures.order_book",
  "event": "all",
  "time": 1541500161,
  "time_ms": 1541500161123,
  "result": {
    "t": 1541500161123,
    "contract": "BTC_USDT_20230630",
    "id": 93973511,
    "asks": [
      {
        "p": "97.1",
        "s": 2245
      },
      {
        "p": "97.1",
        "s": 2245
      }
    ],
    "bids": [
      {
        "p": "97.1",
        "s": 2245
      },
      {
        "p": "97.1",
        "s": 2245
      }
    ]
  }
}
```

Or

```json
{
  "channel": "futures.order_book",
  "event": "update",
  "time": 1541500167,
  "time_ms": 1541500167123,
  "result": [
    {
      "p": "97.5",
      "s": 6541,
      "contract": "BTC_USDT_20230630",
      "id": 93973512
    }
  ]
}
```

**Notify contract order book update information**

### [#](#notify-3) Notify

- channel

  `futures.order_book`

- event

  `update/all`

* params

  | field  | type  | description      |
  | ------ | ----- | ---------------- |
  | result | Array | Array of objects |

  | field    | type    | description                                                                                                                        |
  | -------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------- |
  | contract | String  | delivery contract name                                                                                                             |
  | s        | Integer | this number is the final value, the calculated value. Positive Numbers represent long(bids), Negative number represent short(asks) |
  | p        | String  | this order book price                                                                                                              |
  | id       | Integer | this price order book id                                                                                                           |

## [#](#legacy-order-book-unsubscription) Legacy order book unsubscription

```python
from websocket import create_connection

ws = create_connection("wss://fx-ws-testnet.gateio.ws/v4/ws/delivery/usdt")
ws.send(
    '{"time" : 123456, "channel" : "futures.order_book", "event": "unsubscribe", "payload" : ["BTC_USDT_20230630", "20", "0"]}')
print(ws.recv())
```

The above command returns JSON structured like this:

```json
{
  "time": 1545445847,
  "time_ms": 1545445847123,
  "channel": "futures.order_book",
  "event": "unsubscribe",
  "error": null,
  "result": {
    "status": "success"
  }
}
```

**Unsubscribe specified contract order book.**

### [#](#request-8) Request

- channel

  `futures.order_book`

- event

  `unsubscribe`

## [#](#best-ask-bid-subscription) Best ask/bid subscription

```python
from websocket import create_connection

ws = create_connection("wss://fx-ws-testnet.gateio.ws/v4/ws/delivery/usdt")
ws.send(
    '{"time" : 123456, "channel" : "futures.book_ticker", "event": "subscribe", "payload" : ["BTC_USDT_20230630"]}')
print(ws.recv())
```

The above command returns JSON structured like this:

```json
{
  "time": 1545405058,
  "time_ms": 1545405058123,
  "channel": "futures.book_ticker",
  "event": "subscribe",
  "error": null,
  "result": {
    "status": "success"
  }
}
```

**Subscribe book_ticker.**

### [#](#request-9) Request

- channel

  `futures.book_ticker`

- event

  `subscribe`

- params

  `payload` is an array contains contracts interested.

## [#](#best-ask-bid-notification) Best ask/bid notification

If `a` is empty string, it means empty asks; if `b` is empty string, it means
empty bids.

```json
{
  "time": 1615366379,
  "time_ms": 1615366379123,
  "channel": "futures.book_ticker",
  "event": "update",
  "error": null,
  "result": {
    "t": 1615366379123,
    "u": 2517661076,
    "s": "BTC_USDT_20230630",
    "b": "54696.6",
    "B": 37000,
    "a": "54696.7",
    "A": 47061
  }
}
```

**Notify contract order book best bid and ask**

### [#](#notify-4) Notify

- channel

  `futures.book_ticker`

- event

  `update`

* params

  | field  | type    | description                                     |
  | ------ | ------- | ----------------------------------------------- |
  | result | object  | Best bid and ask                                |
  | » t    | Integer | Book ticker generated timestamp in milliseconds |
  | » u    | String  | Order book update ID                            |
  | » s    | String  | Contract name                                   |
  | » b    | String  | Best bid price. If no bids, it's empty string   |
  | » B    | Integer | Best bid size. If no bids, it will be 0         |
  | » a    | String  | Best ask price. If no asks, it's empty string   |
  | » A    | Integer | Best ask size. If no asks, it will be 0         |

## [#](#best-ask-bid-unsubscription) Best ask/bid unsubscription

```python
from websocket import create_connection

ws = create_connection("wss://fx-ws-testnet.gateio.ws/v4/ws/delivery/usdt")
ws.send(
    '{"time" : 123456, "channel" : "futures.book_ticker", "event": "unsubscribe", "payload" : ["BTC_USDT_20230630"]}')
print(ws.recv())
```

The above command returns JSON structured like this:

```json
{
  "time": 1545445847,
  "time_ms": 1545445847123,
  "channel": "futures.book_ticker",
  "event": "unsubscribe",
  "error": null,
  "result": {
    "status": "success"
  }
}
```

**Unsubscribe specified contract order book.**

### [#](#request-10) Request

- channel

  `futures.book_ticker`

- event

  `unsubscribe`

## [#](#order-book-update-subscription) Order book update subscription

```python
from websocket import create_connection

ws = create_connection("wss://fx-ws-testnet.gateio.ws/v4/ws/delivery/btc")
ws.send(
    '{"time" : 123456, "channel" : "futures.order_book_update", "event": "subscribe", "payload" : ["BTC_USDT_20230630", "1000ms", "20"]}')
print(ws.recv())
```

The above command returns JSON structured like this:

```json
{
  "time": 1545405058,
  "time_ms": 1545405058123,
  "channel": "futures.order_book_update",
  "event": "subscribe",
  "error": null,
  "result": {
    "status": "success"
  }
}
```

**Subscribe order_book_update.**

### [#](#request-11) Request

- channel

  `futures.order_book_update`

- event

  `subscribe`

* params

  | parameter | type   | required | description                                                                                                 |
  | --------- | ------ | -------- | ----------------------------------------------------------------------------------------------------------- |
  | contract  | String | Yes      | Contract name                                                                                               |
  | frequency | String | Yes      | Update frequency, 100ms or 1000ms                                                                           |
  | level     | String | No       | Optional level interested. Only updates within are notified. Allowed values: "100", "50", "20", "10" or "5" |

## [#](#order-book-update-notification) Order book update notification

```json
{
  "time": 1615366381,
  "time_ms": 1615366381123,
  "channel": "futures.order_book_update",
  "event": "update",
  "error": null,
  "result": {
    "t": 1615366381417,
    "s": "BTC_USDT_20230630",
    "U": 2517661101,
    "u": 2517661113,
    "b": [
      {
        "p": "54672.1",
        "s": 0
      },
      {
        "p": "54664.5",
        "s": 58794
      }
    ],
    "a": [
      {
        "p": "54743.6",
        "s": 0
      },
      {
        "p": "54742",
        "s": 95
      }
    ]
  }
}
```

**Notify contract order book update**

### [#](#notify-5) Notify

- channel

  `futures.order_book_update`

- event

  `update`

* params

  | field  | type    | description                                                               |
  | ------ | ------- | ------------------------------------------------------------------------- |
  | result | object  | Changed asks and bids since last update                                   |
  | » t    | Integer | Order book generation timestamp in milliseconds                           |
  | » s    | String  | Contract name                                                             |
  | » U    | Integer | First order book update ID since last update                              |
  | » u    | Integer | Last order book update ID since last update                               |
  | » b    | String  | Changed bids                                                              |
  | »» p   | String  | Changed price                                                             |
  | »» s   | String  | Absolute size value after change. If 0, remove this price from order book |
  | » a    | String  | Changed asks                                                              |
  | »» p   | String  | Changed price                                                             |
  | »» s   | String  | Absolute size value after change. If 0, remove this price from order book |

## [#](#order-book-update-unsubscription) Order book update unsubscription

```python
from websocket import create_connection

ws = create_connection("wss://fx-ws-testnet.gateio.ws/v4/ws/delivery/btc")
ws.send(
    '{"time" : 123456, "channel" : "futures.order_book_update", "event": "unsubscribe", "payload" : ["BTC_USDT_20230630", "100ms"]}')
print(ws.recv())
```

The above command returns JSON structured like this:

```json
{
  "time": 1545445847,
  "time_ms": 1545445847123,
  "channel": "futures.order_book_update",
  "event": "unsubscribe",
  "error": null,
  "result": {
    "status": "success"
  }
}
```

**Unsubscribe specified contract order book.**

### [#](#request-12) Request

- channel

  `futures.order_book_update`

- event

  `unsubscribe`

# [#](#candlesticks-api) Candlesticks API

**Provides a way to access charting candlestick info.**

## [#](#candlesticks-subscription) Candlesticks subscription

**_If prefix `contract` with `mark_`, the contract's mark price candlesticks
will be subscribed.\_**

```python
from websocket import create_connection

ws = create_connection("wss://fx-ws-testnet.gateio.ws/v4/ws/delivery/usdt")
ws.send(
    '{"time" : 123456, "channel" : "futures.candlesticks", "event": "subscribe", "payload" : ["1m", "BTC_USDT_20230630"]}')
print(ws.recv())
```

The above command returns JSON structured like this:

```json
{
  "time": 1545445847,
  "channel": "futures.candlesticks",
  "event": "subscribe",
  "error": null,
  "result": {
    "status": "success"
  }
}
```

### [#](#request-13) Request

- channel

  `futures.candlesticks`

- event

  `subscribe`

* params

  | field    | type   | description                                                              |
  | -------- | ------ | ------------------------------------------------------------------------ |
  | interval | String | interval : "10s", "1m", "5m", "15m", "30m", "1h", "4h", "8h", "1d", "7d" |
  | contract | String | delivery contract name                                                   |

## [#](#candlesticks-notification) Candlesticks notification

```json
{
  "time": 1542162490,
  "channel": "futures.candlesticks",
  "event": "update",
  "error": null,
  "result": [
    {
      "t": 1545129300,
      "v": 27525555,
      "c": "95.4",
      "h": "96.9",
      "l": "89.5",
      "o": "94.3",
      "n": "1m_BTC_USDT_20230630"
    },
    {
      "t": 1545129300,
      "v": 27525555,
      "c": "95.4",
      "h": "96.9",
      "l": "89.5",
      "o": "94.3",
      "n": "1m_BTC_USDT_20230630"
    }
  ]
}
```

**Notify kline information of subscribed contract.**

### [#](#notify-6) Notify

- channel

  `futures.candlesticks`

- event

  `update`

* params

  | field  | type  | description      |
  | ------ | ----- | ---------------- |
  | result | Array | Array of objects |

  | field | type    | description            |
  | ----- | ------- | ---------------------- |
  | t     | Integer | time                   |
  | o     | String  | open                   |
  | c     | String  | close                  |
  | h     | String  | highest                |
  | l     | String  | lowest                 |
  | v     | Integer | volume                 |
  | n     | String  | delivery contract name |

## [#](#cancel-subscription-3) Cancel subscription

```python
from websocket import create_connection

ws = create_connection("wss://fx-ws-testnet.gateio.ws/v4/ws/delivery/usdt")
ws.send(
    '{"time" : 123456, "channel" : "futures.candlesticks", "event": "unsubscribe", "payload" : ["1m", "BTC_USDT_20230630"]}')
print(ws.recv())
```

The above command returns JSON structured like this:

```json
{
  "time": 1545445847,
  "channel": "futures.candlesticks",
  "event": "unsubscribe",
  "error": null,
  "result": {
    "status": "success"
  }
}
```

**Unsubscribe specified contract kline information.**

### [#](#request-14) Request

- channel

  `futures.candlesticks`

- event

  `unsubscribe`

# [#](#orders-api) Orders API

**Provides a way to receive user closed orders.**

WARNING

Authentication required.

## [#](#orders-subscription) Orders subscription

```python
import json
from websocket import create_connection

ws = create_connection("wss://fx-ws-testnet.gateio.ws/v4/ws/delivery/usdt")
req = {
    "time": 123456,
    "channel": "futures.orders",
    "event": "subscribe",
    "payload": ["20011", "BTC_USDT_20230630"],
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
  "time": 1545459681,
  "channel": "futures.orders",
  "event": "subscribe",
  "error": null,
  "result": {
    "status": "success"
  }
}
```

**Subscribe user orders update**

### [#](#request-15) Request

- channel

  `futures.orders`

- event

  `subscribe`

* params

  | parameter | type   | required | description                                               |
  | --------- | ------ | -------- | --------------------------------------------------------- |
  | user id   | String | no       | user id                                                   |
  | contract  | String | yes      | delivery contract name. !all——Subscribe to all contracts. |

## [#](#orders-notification) Orders notification

```json
{
  "channel": "futures.orders",
  "event": "update",
  "time": 1541505434,
  "result": [
    {
      "contract": "BTC_USDT_20230630",
      "user": "200XX",
      "create_time": 1545141817,
      "create_time_ms": 1545141817123,
      "fill_price": 4120,
      "finish_as": "filled",
      "iceberg": 0,
      "id": 93282759,
      "is_reduce_only": false,
      "status": "finished",
      "is_close": 0,
      "is_liq": 0,
      "left": 0,
      "mkfr": -0.00025,
      "price": 4120,
      "refu": 0,
      "size": 10,
      "text": "-",
      "tif": "gtc",
      "finish_time": 1545640868,
      "finish_time_ms": 1545640868123,
      "tkfr": 0.00075
    }
  ]
}
```

**Notify user orders information when an order is put, updated or finished.**

### [#](#notify-7) Notify

- channel

  `futures.orders`

- event

  `update`

* params

  `For the meaning of parameters, please refer to http interface.`

  | field  | type  | description      |
  | ------ | ----- | ---------------- |
  | result | Array | Array of objects |

  | field          | type    | description                                 |
  | -------------- | ------- | ------------------------------------------- |
  | create_time    | Integer |                                             |
  | create_time_ms | Integer | create unix timestamp in milliseconds       |
  | fill_price     | Float   |                                             |
  | finish_as      | String  |                                             |
  | iceberg        | Integer |                                             |
  | id             | Integer |                                             |
  | is_close       | Integer |                                             |
  | is_liq         | Integer |                                             |
  | left           | Integer |                                             |
  | mkfr           | Integer |                                             |
  | is_reduce_only | Bool    |                                             |
  | status         | String  |                                             |
  | tkfr           | Integer |                                             |
  | price          | Integer |                                             |
  | refu           | Integer |                                             |
  | size           | Integer |                                             |
  | text           | String  |                                             |
  | tif            | String  |                                             |
  | finish_time    | Integer | order update unix timestamp in milliseconds |
  | finish_time_ms | Integer | order update unix timestamp in milliseconds |
  | user           | String  |                                             |
  | contract       | String  |                                             |

## [#](#cancel-subscription-4) Cancel subscription

```python
import json
from websocket import create_connection

ws = create_connection("wss://fx-ws-testnet.gateio.ws/v4/ws/delivery/usdt")
req = {
    "time": 123456,
    "channel": "futures.orders",
    "event": "unsubscribe",
    "payload": ["20011", "BTC_USDT_20230630"],
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
  "time": 1545459681,
  "channel": "futures.orders",
  "event": "unsubscribe",
  "error": null,
  "result": {
    "status": "success"
  }
}
```

**Unsubscribe user orders update notification, for all contract.**

### [#](#request-16) Request

- channel

  `futures.orders`

- event

  `unsubscribe`

# [#](#user-trades-api) User trades API

**Provides a way to receive user trades.**

WARNING

Authentication required.

## [#](#user-trades-subscription) User trades subscription

```python
import json
from websocket import create_connection

ws = create_connection("wss://fx-ws-testnet.gateio.ws/v4/ws/delivery/usdt")
req = {
    "time": 123456,
    "channel": "futures.usertrades",
    "event": "subscribe",
    "payload": ["20011", "BTC_USDT_20230630"],
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
  "time": 1545459681,
  "channel": "futures.usertrades",
  "event": "subscribe",
  "error": null,
  "result": {
    "status": "success"
  }
}
```

**Subscribe for user trades update.**

### [#](#request-17) Request

- channel

  `futures.usertrades`

- event

  `subscribe`

* params

  | parameter | type   | required | description                                               |
  | --------- | ------ | -------- | --------------------------------------------------------- |
  | user id   | String | no       | user id                                                   |
  | contract  | String | yes      | delivery contract name. !all——Subscribe to all contracts. |

## [#](#user-trades-notification) User trades notification

```json
{
  "time": 1543205083,
  "channel": "futures.usertrades",
  "event": "update",
  "error": null,
  "result": [
    {
      "contract": "BTC_USDT_20230630",
      "create_time": 1545140672,
      "create_time_ms": 1545140672371,
      "id": "12651269",
      "order_id": "56945246",
      "price": "113.6",
      "size": 10,
      "role": "maker"
    }
  ]
}
```

**Notify user trades update.**

### [#](#notify-8) Notify

- channel

  `futures.usertrades`

- event

  `update`

* params

  | field  | type  | description      |
  | ------ | ----- | ---------------- |
  | result | Array | Array of objects |

  | field          | type    | description                 |
  | -------------- | ------- | --------------------------- |
  | contract       | String  | delivery contract name      |
  | create_time    | Integer | create time                 |
  | create_time_ms | Integer | create time in milliseconds |
  | id             | String  | trades id                   |
  | order_id       | String  | Order Id                    |
  | price          | String  | price                       |
  | size           | Integer | trades size                 |
  | role           | String  | user role (maker/taker)     |

## [#](#cancel-subscription-5) Cancel subscription

```python
import json
from websocket import create_connection

ws = create_connection("wss://fx-ws-testnet.gateio.ws/v4/ws/delivery/usdt")
req = {
    "time": 123456,
    "channel": "futures.usertrades",
    "event": "unsubscribe",
    "payload": ["20011", "BTC_USDT_20230630"],
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
  "time": 1545459681,
  "channel": "futures.usertrades",
  "event": "unsubscribe",
  "error": null,
  "result": {
    "status": "success"
  }
}
```

**Unsubscribe user trades update.**

### [#](#request-18) Request

- channel

  `futures.usertrades`

- event

  `unsubscribe`

# [#](#liquidates-api) Liquidates API

**Provides a way to receive user liquidates info.**

WARNING

Authentication required.

## [#](#liquidates-subscription) Liquidates subscription

```python
import json
from websocket import create_connection

ws = create_connection("wss://fx-ws-testnet.gateio.ws/v4/ws/delivery/usdt")
req = {
    "time": 123456,
    "channel": "futures.liquidates",
    "event": "subscribe",
    "payload": ["20011", "BTC_USDT_20230630"],
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
  "time": 1545459681,
  "channel": "futures.liquidates",
  "event": "subscribe",
  "error": null,
  "result": {
    "status": "success"
  }
}
```

**Subscribe for user liquidates update.**

### [#](#request-19) Request

- channel

  `futures.liquidates`

- event

  `subscribe`

* params

  | parameter | type   | required | description                                               |
  | --------- | ------ | -------- | --------------------------------------------------------- |
  | user id   | String | no       | user id                                                   |
  | contract  | String | yes      | delivery contract name. !all——Subscribe to all contracts. |

## [#](#liquidates-notification) Liquidates notification

```json
{
  "channel": "futures.liquidates",
  "event": "update",
  "time": 1541505434,
  "result": [
    {
      "entry_price": 209,
      "fill_price": 215.1,
      "left": 0,
      "leverage": 0.0,
      "liq_price": 213,
      "margin": 0.007816722941,
      "mark_price": 213,
      "order_id": 4093362,
      "order_price": 215.1,
      "size": -124,
      "time": 1541486601,
      "time_ms": 1541486601123,
      "contract": "BTC_USDT_20230630",
      "user": "1040"
    }
  ]
}
```

**Notify liquidates update.**

### [#](#notify-9) Notify

- channel

  `futures.liquidates`

- event

  `update`

* params

  | field  | type  | description      |
  | ------ | ----- | ---------------- |
  | result | Array | Array of objects |

  | field       | type    | description             |
  | ----------- | ------- | ----------------------- |
  | entry_price | Float   | average entry price     |
  | fill_price  | Float   | average execution price |
  | leverage    | Float   | leverage                |
  | liq_price   | Float   | liquidates price        |
  | margin      | Float   | margin                  |
  | mark_price  | Float   | mark price              |
  | order_id    | Integer | order id                |
  | order_price | Float   | commission price        |
  | left        | Integer | order unfilled quantity |
  | size        | Integer | position original size  |
  | time        | Integer | time                    |
  | time_ms     | Integer | time in milliseconds    |
  | user        | String  | user id                 |
  | contract    | String  | delivery contract name  |

## [#](#cancel-subscription-6) Cancel subscription

```python
import json
from websocket import create_connection

ws = create_connection("wss://fx-ws-testnet.gateio.ws/v4/ws/delivery/usdt")
req = {
    "time": 123456,
    "channel": "futures.liquidates",
    "event": "unsubscribe",
    "payload": ["20011", "BTC_USDT_20230630"],
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
  "time": 1545459681,
  "channel": "futures.liquidates",
  "event": "unsubscribe",
  "error": null,
  "result": {
    "status": "success"
  }
}
```

**Unsubscribe liquidates update.**

### [#](#request-20) Request

- channel

  `futures.liquidates`

- event

  `unsubscribe`

# [#](#auto-deleverages-api) Auto_deleverages API

**Provides a way to receive user auto deleverages info.**

WARNING

Authentication required.

## [#](#auto-deleverages-subscription) Auto_deleverages subscription

```python
import json
from websocket import create_connection

ws = create_connection("wss://fx-ws-testnet.gateio.ws/v4/ws/delivery/usdt")
req = {
    "time": 123456,
    "channel": "futures.auto_deleverages",
    "event": "subscribe",
    "payload": ["20011", "BTC_USDT_20230630"],
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
  "time": 1545459681,
  "channel": "futures.auto_deleverages",
  "event": "subscribe",
  "error": null,
  "result": {
    "status": "success"
  }
}
```

**Subscribe for user auto_deleverages update.**

### [#](#request-21) Request

- channel

  `futures.auto_deleverages`

- event

  `subscribe`

* params

  | parameter | type   | required | description                                               |
  | --------- | ------ | -------- | --------------------------------------------------------- |
  | user id   | String | no       | user id                                                   |
  | contract  | String | yes      | delivery contract name. !all——Subscribe to all contracts. |

## [#](#auto-deleverages-notification) Auto_deleverages notification

```json
{
  "channel": "futures.auto_deleverages",
  "event": "update",
  "time": 1541505434,
  "result": [
    {
      "entry_price": 209,
      "fill_price": 215.1,
      "position_size": 10,
      "trade_size": 10,
      "time": 1541486601,
      "time_ms": 1541486601123,
      "contract": "BTC_USDT_20230630",
      "user": "1040"
    }
  ]
}
```

**Notify auto_deleverages update.**

### [#](#notify-10) Notify

- channel

  `futures.auto_deleverages`

- event

  `update`

* params

  | field  | type  | description      |
  | ------ | ----- | ---------------- |
  | result | Array | Array of objects |

  | field         | type    | description            |
  | ------------- | ------- | ---------------------- |
  | entry_price   | Float   | entry price            |
  | fill_price    | Float   | execution price        |
  | position_size | Integer | position size          |
  | trade_size    | Integer | trade size             |
  | time          | Integer | time                   |
  | time_ms       | Integer | time in milliseconds   |
  | user          | String  | user id                |
  | contract      | String  | delivery contract name |

## [#](#cancel-subscription-7) Cancel subscription

```python
import json
from websocket import create_connection

ws = create_connection("wss://fx-ws-testnet.gateio.ws/v4/ws/delivery/usdt")
req = {
    "time": 123456,
    "channel": "futures.auto_deleverages",
    "event": "unsubscribe",
    "payload": ["20011", "BTC_USDT_20230630"],
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
  "time": 1545459681,
  "channel": "futures.auto_deleverages",
  "event": "unsubscribe",
  "error": null,
  "result": {
    "status": "success"
  }
}
```

**Unsubscribe auto_deleverages update.**

### [#](#request-22) Request

- channel

  `futures.auto_deleverages`

- event

  `unsubscribe`

# [#](#position-closes-api) Position_closes API

**Provides a way to receive user position closes info.**

WARNING

Authentication required.

## [#](#position-closes-subscription) Position_closes subscription

```python
import json
from websocket import create_connection

ws = create_connection("wss://fx-ws-testnet.gateio.ws/v4/ws/delivery/usdt")
req = {
    "time": 123456,
    "channel": "futures.position_closes",
    "event": "subscribe",
    "payload": ["20011", "BTC_USDT_20230630"],
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
  "time": 1545459681,
  "channel": "futures.position_closes",
  "event": "subscribe",
  "error": null,
  "result": {
    "status": "success"
  }
}
```

**Subscribe for user position_closes update.**

### [#](#request-23) Request

- channel

  `futures.position_closes`

- event

  `subscribe`

* params

  | parameter | type   | required | description                                               |
  | --------- | ------ | -------- | --------------------------------------------------------- |
  | user id   | String | no       | user id                                                   |
  | contract  | String | yes      | delivery contract name. !all——Subscribe to all contracts. |

## [#](#position-closes-notification) Position_closes notification

```json
{
  "channel": "futures.position_closes",
  "event": "update",
  "time": 1541505434,
  "result": [
    {
      "contract": "BTC_USDT_20230630",
      "pnl": -0.000624354791,
      "side": "long",
      "text": "web",
      "time": 1547198562,
      "time_ms": 1547198562123,
      "user": "20011"
    }
  ]
}
```

**Notify position_closes update.**

### [#](#notify-11) Notify

- channel

  `futures.position_closes`

- event

  `update`

* params

  | field  | type  | description      |
  | ------ | ----- | ---------------- |
  | result | Array | Array of objects |

  | field    | type    | description            |
  | -------- | ------- | ---------------------- |
  | contract | String  | delivery contract name |
  | pnl      | Number  | profit & loss          |
  | side     | String  | side (long or short)   |
  | text     | String  | messages               |
  | time     | Integer | time                   |
  | time_ms  | Integer | time in milliseconds   |
  | user     | String  | user id                |

## [#](#cancel-subscription-8) Cancel subscription

```python
import json
from websocket import create_connection

ws = create_connection("wss://fx-ws-testnet.gateio.ws/v4/ws/delivery/usdt")
req = {
    "time": 123456,
    "channel": "futures.position_closes",
    "event": "unsubscribe",
    "payload": ["20011", "BTC_USDT_20230630"],
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
  "time": 1545459681,
  "channel": "futures.position_closes",
  "event": "unsubscribe",
  "error": null,
  "result": {
    "status": "success"
  }
}
```

**Unsubscribe position_closes update.**

### [#](#request-24) Request

- channel

  `futures.position_closes`

- event

  `unsubscribe`

# [#](#balances-api) Balances API

**Provides a way to receive user balances info.**

WARNING

Authentication required.

## [#](#balances-subscription) Balances subscription

```python
import json
from websocket import create_connection

ws = create_connection("wss://fx-ws-testnet.gateio.ws/v4/ws/delivery/usdt")
req = {
    "time": 123456,
    "channel": "futures.balances",
    "event": "subscribe",
    "payload": ["20011"],
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
  "time": 1545459681,
  "channel": "futures.balances",
  "event": "subscribe",
  "error": null,
  "result": {
    "status": "success"
  }
}
```

**Subscribe for user balances update.**

### [#](#request-25) Request

- channel

  `futures.balances`

- event

  `subscribe`

* params

  | parameter | type   | required | description |
  | --------- | ------ | -------- | ----------- |
  | user id   | String | no       | user id     |

## [#](#balances-notification) balances notification

```json
{
  "channel": "futures.balances",
  "event": "update",
  "time": 1541505434,
  "result": [
    {
      "balance": 9.998739899488,
      "change": -0.000002074115,
      "text": "BTC_USDT_20230630:3914424",
      "time": 1547199246,
      "time_ms": 1547199246123,
      "type": "fee",
      "user": "20011"
    }
  ]
}
```

**Notify balances update.**

### [#](#notify-12) Notify

- channel

  `futures.balances`

- event

  `update`

* params

  | field  | type  | description      |
  | ------ | ----- | ---------------- |
  | result | Array | Array of objects |

  | field   | type    | description           |
  | ------- | ------- | --------------------- |
  | balance | Number  | balance after changed |
  | change  | Number  | change                |
  | text    | String  | messages              |
  | time    | Integer | time                  |
  | time_ms | Integer | time in milliseconds  |
  | type    | String  | type                  |
  | user    | String  | user id               |

## [#](#cancel-subscription-9) Cancel subscription

```python
import json
from websocket import create_connection

ws = create_connection("wss://fx-ws-testnet.gateio.ws/v4/ws/delivery/usdt")
req = {
    "time": 123456,
    "channel": "futures.balances",
    "event": "unsubscribe",
    "payload": ["20011"],
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
  "time": 1545459681,
  "channel": "futures.balances",
  "event": "unsubscribe",
  "error": null,
  "result": {
    "status": "success"
  }
}
```

# [#](#reduce-risk-limits-api) Reduce_risk_limits API

**Provides a way to receive user reduce risk limits info.**

WARNING

Authentication required.

## [#](#reduce-risk-limits-subscription) Reduce_risk_limits subscription

```python
import json
from websocket import create_connection

ws = create_connection("wss://fx-ws-testnet.gateio.ws/v4/ws/delivery/usdt")
req = {
    "time": 123456,
    "channel": "futures.reduce_risk_limits",
    "event": "subscribe",
    "payload": ["20011", "BTC_USDT_20230630"],
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
  "time": 1545459681,
  "channel": "futures.reduce_risk_limits",
  "event": "subscribe",
  "error": null,
  "result": {
    "status": "success"
  }
}
```

**Subscribe for user reduce_risk_limits update.**

### [#](#request-26) Request

- channel

  `futures.reduce_risk_limits`

- event

  `subscribe`

* params

  | parameter | type   | required | description                                               |
  | --------- | ------ | -------- | --------------------------------------------------------- |
  | user id   | String | no       | user id                                                   |
  | contract  | String | yes      | delivery contract name. !all——Subscribe to all contracts. |

## [#](#reduce-risk-limits-notification) Reduce_risk_limits notification

```json
{
  "time": 1551858330,
  "channel": "futures.reduce_risk_limits",
  "event": "update",
  "error": null,
  "result": [
    {
      "cancel_orders": 0,
      "contract": "ETH_USD",
      "leverage_max": 10,
      "liq_price": 136.53,
      "maintenance_rate": 0.09,
      "risk_limit": 450,
      "time": 1551858330,
      "time_ms": 1551858330123,
      "user": "20011"
    }
  ]
}
```

**Notify reduce risk limits update.**

### [#](#notify-13) Notify

- channel

  `futures.reduce_risk_limits`

- event

  `update`

* params

  | field  | type  | description      |
  | ------ | ----- | ---------------- |
  | result | Array | Array of objects |

  | field            | type   | description          |
  | ---------------- | ------ | -------------------- |
  | cancel_orders    | Number | cancel orders        |
  | contract         | String | contract name        |
  | leverage_max     | Number | leverage max         |
  | liq_price        | Number | liquidates price     |
  | maintenance_rate | Number | maintenance rate     |
  | risk_limit       | Number | risk limit           |
  | time             | Number | time                 |
  | time_ms          | Number | time in milliseconds |
  | user             | String | user id              |

## [#](#cancel-subscription-10) Cancel subscription

```python
import json
from websocket import create_connection

ws = create_connection("wss://fx-ws-testnet.gateio.ws/v4/ws/delivery/usdt")
req = {
    "time": 123456,
    "channel": "futures.reduce_risk_limits",
    "event": "unsubscribe",
    "payload": ["20011", "BTC_USDT_20230630"],
    "auth": {
        "method": "api_key",
        "KEY": "xxxx",
        "SIGN": "xxxx"
    }
}
ws.send(json.dumps(req))
print(ws.recv())
```

**Unsubscribe reduce risk limits update.**

### [#](#request-27) Request

- channel

  `futures.reduce_risk_limits`

- event

  `unsubscribe`

# [#](#positions-api) Positions API

**Provides a way to receive user positions info.**

WARNING

Authentication required.

## [#](#positions-subscription) Positions subscription

```python
import json
from websocket import create_connection

ws = create_connection("wss://fx-ws-testnet.gateio.ws/v4/ws/delivery/usdt")
req = {
    "time": 123456,
    "channel": "futures.positions",
    "event": "subscribe",
    "payload": ["20011", "BTC_USDT_20230630"],
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
  "time": 1545459681,
  "channel": "futures.positions",
  "event": "subscribe",
  "error": null,
  "result": {
    "status": "success"
  }
}
```

**Subscribe for user positions update.**

### [#](#request-28) Request

- channel

  `futures.positions`

- event

  `subscribe`

* params

  | parameter | type   | required | description                                               |
  | --------- | ------ | -------- | --------------------------------------------------------- |
  | user id   | String | no       | user id                                                   |
  | contract  | String | yes      | delivery contract name. !all——Subscribe to all contracts. |

## [#](#positions-notification) Positions notification

```json
{
  "time": 1588212926,
  "channel": "futures.positions",
  "event": "update",
  "error": null,
  "result": [
    {
      "contract": "BTC_USDT_20230630",
      "entry_price": 5999,
      "history_pnl": 9.99872821972,
      "history_point": -0.02954299895,
      "last_close_pnl": -0.00011406187,
      "leverage": 10,
      "leverage_max": 100,
      "liq_price": 5508.28,
      "maintenance_rate": 0.005,
      "margin": 0.001112608124,
      "realised_pnl": -0.000072631078,
      "realised_point": 0,
      "risk_limit": 100,
      "size": 70,
      "time": 1588212925,
      "time_ms": 1588212925123,
      "user": "10003"
    }
  ]
}
```

**Notify positions update.**

### [#](#notify-14) Notify

- channel

  `futures.positions`

- event

  `update`

* params

  | field  | type  | description      |
  | ------ | ----- | ---------------- |
  | result | Array | Array of objects |

  | field            | type    | description                                                                    |
  | ---------------- | ------- | ------------------------------------------------------------------------------ |
  | contract         | String  | delivery contract name                                                         |
  | entry_price      | Float   | Entry price                                                                    |
  | history_pnl      | Float   | History realized PNL                                                           |
  | history_point    | Float   | History realized POINT PNL                                                     |
  | last_close_pnl   | Float   | PNL of last position close                                                     |
  | leverage         | Integer | Position leverage. 0 means cross margin; positive number means isolated margin |
  | leverage_max     | Integer | Maximum leverage under current risk limit                                      |
  | liq_price        | Float   | Liquidation price                                                              |
  | maintenance_rate | Float   | Maintenance rate under current risk limit                                      |
  | margin           | Float   | Position margin                                                                |
  | realised_pnl     | Float   | Realized PNL                                                                   |
  | realised_point   | Float   | Realized POINT PNL                                                             |
  | risk_limit       | Integer | Position risk limit                                                            |
  | size             | Number  | contract size                                                                  |
  | time             | Number  | update unix timestamp                                                          |
  | time_ms          | Number  | update unix timestamp in milliseconds                                          |
  | user             | String  | user id                                                                        |

## [#](#cancel-subscription-11) Cancel subscription

```python
import json
from websocket import create_connection

ws = create_connection("wss://fx-ws-testnet.gateio.ws/v4/ws/delivery/usdt")
req = {
    "time": 123456,
    "channel": "futures.positions",
    "event": "unsubscribe",
    "payload": ["20011", "BTC_USDT_20230630"],
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
  "time": 1545459681,
  "channel": "futures.positions",
  "event": "unsubscribe",
  "error": null,
  "result": {
    "status": "success"
  }
}
```

**Unsubscribe positions update.**

### [#](#request-29) Request

- channel

  `futures.positions`

- event

  `unsubscribe`

# [#](#auto-orders-api) Auto orders API

**Provides a way to receive user auto orders info.**

WARNING

Authentication required.

## [#](#auto-orders-subscription) Auto orders subscription

```python
import json
from websocket import create_connection

ws = create_connection("wss://fx-ws-testnet.gateio.ws/v4/ws/delivery/usdt")
req = {
    "time": 123456,
    "channel": "futures.autoorders",
    "event": "subscribe",
    "payload": ["20011", "BTC_USDT_20230630"],
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
  "time": 1545459681,
  "channel": "futures.autoorders",
  "event": "subscribe",
  "error": null,
  "result": {
    "status": "success"
  }
}
```

**Subscribe for user auto orders update.**

### [#](#request-30) Request

- channel

  `futures.autoorders`

- event

  `subscribe`

* params

  | parameter | type   | required | description                                               |
  | --------- | ------ | -------- | --------------------------------------------------------- |
  | user id   | String | no       | user id                                                   |
  | contract  | String | yes      | delivery contract name. !all——Subscribe to all contracts. |

## [#](#auto-orders-notification) Auto orders notification

```json
{
  "time": 1596798126,
  "channel": "futures.autoorders",
  "event": "update",
  "error": null,
  "result": [
    {
      "user": 1543255,
      "trigger": {
        "strategy_type": 0,
        "price_type": 0,
        "price": "10000",
        "rule": 2,
        "expiration": 86400
      },
      "initial": {
        "contract": "BTC_USDT_20230630",
        "size": 10,
        "price": "10000",
        "tif": "gtc",
        "text": "web",
        "iceberg": 0,
        "is_close": false,
        "is_reduce_only": false
      },
      "id": 9256,
      "trade_id": 0,
      "status": "open",
      "reason": "",
      "create_time": 1596798126,
      "name": "price_autoorders",
      "is_stop_order": false,
      "stop_trigger": {
        "rule": 0,
        "trigger_price": "",
        "order_price": ""
      }
    }
  ]
}
```

**Notify auto orders update.**

### [#](#notify-15) Notify

- channel

  `futures.autoorders`

- event

  `update`

* params

  | field  | type  | description      |
  | ------ | ----- | ---------------- |
  | result | Array | Array of objects |

  | field         | type    | description    |
  | ------------- | ------- | -------------- |
  | user          | Number  | user id        |
  | trigger       | Object  | watch http api |
  | initial       | Object  | watch http api |
  | id            | Number  | auto order id  |
  | trade_id      | Number  | trade id       |
  | status        | String  | order status   |
  | reason        | String  | change reason  |
  | create_time   | Number  | create time    |
  | name          | String  | name           |
  | is_stop_order | boolean | is stop        |
  | stop_trigger  | Object  | watch http api |

## [#](#cancel-subscription-12) Cancel subscription

```python
import json
from websocket import create_connection

ws = create_connection("wss://fx-ws-testnet.gateio.ws/v4/ws/delivery/usdt")
req = {
    "time": 123456,
    "channel": "futures.autoorders",
    "event": "unsubscribe",
    "payload": ["20011", "BTC_USDT_20230630"],
    "auth": {
        "method": "api_key",
        "KEY": "xxxx",
        "SIGN": "xxxx"
    }}
ws.send(json.dumps(req))
print(ws.recv())
```

The above command returns JSON structured like this:

```json
{
  "time": 1545459681,
  "channel": "futures.autoorders",
  "event": "unsubscribe",
  "error": null,
  "result": {
    "status": "success"
  }
}
```

**Unsubscribe auto orders update.**

### [#](#request-31) Request

- channel

  `futures.autoorders`

- event

  `unsubscribe`

Last Updated: 3/21/2025, 6:23:28 AM
