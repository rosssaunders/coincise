# [#](#gate-io-futures-websocket-v4) Gate.io Futures WebSocket v4

Gate.io provides a simple and robust Websocket API to integrate gate.io BTC/USDT
futures contract trade status into your business or application.

We have language bindings in `Python`, more in the future! You can view code
examples in the dark area to the right, and you can switch the programming
language of the examples with the tabs in the top right.

## [#](#server-url) Server URL

We provide BTC/USDT futures contract trade server urls, you can choose one of
them according to your condition.

### [#](#btc-contract) BTC Contract

Base URLs:

- Real Trading: `wss://fx-ws.gateio.ws/v4/ws/btc`
- TestNet Trading: `wss://fx-ws-testnet.gateio.ws/v4/ws/btc`

### [#](#usdt-contract) USDT Contract

Base URLs:

- Real Trading: `wss://fx-ws.gateio.ws/v4/ws/usdt`
- TestNet: `wss://fx-ws-testnet.gateio.ws/v4/ws/usdt`

WARNING

If you use old server urls(`wss://fx-ws.gateio.ws/v4/ws` or
`wss://fx-ws-testnet.gateio.ws/v4/ws`), we will use BTC contract for you.

## [#](#changelog) Changelog

Demo WebSocket application

```python
# !/usr/bin/env python
# coding: utf-8

import hashlib
import hmac
import json
import logging
import time
import threading

from websocket import WebSocketApp

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

event = threading.Event()

class GateWebSocketApp(WebSocketApp):

  def __init__(self, url, api_key, api_secret, **kwargs):
    super(GateWebSocketApp, self).__init__(url, **kwargs)
    self._api_key = api_key
    self._api_secret = api_secret

  def _send_ping(self):
    while not event.wait(10):
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
  ws.subscribe("futures.tickers", ['BTC_USDT'], False)

if __name__ == "__main__":
  logging.basicConfig(format="%(asctime)s - %(message)s", level=logging.DEBUG)
  app = GateWebSocketApp("wss://fx-ws.gateio.ws/v4/ws/usdt",
                         "YOUR_API_KEY",
                         "YOUR_API_SECRET",
                         on_open=on_open,
                         on_message=on_message)
  app.run_forever(ping_interval=5)
```

Demo WebSocket application

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
	u := url.URL{Scheme: "wss", Host: "fx-ws.gateio.ws", Path: "/v4/ws/usdt"}
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
	orderBookMsg := NewMsg("futures.order_book", "subscribe", t, []string{"BTC_USDT"})
	err = orderBookMsg.send(c)
	if err != nil {
		panic(err)
	}

	// subscribe positions
	positionsMsg := NewMsg("futures.positions", "subscribe", t, []string{"USERID", "BTC_USDT"})
	positionsMsg.sign()
	err = positionsMsg.send(c)
	if err != nil {
		panic(err)
	}

	select {}
}
```

2025-04-25

- Futures Account Trade has added a new `futures.order_cancel_ids` channel.
- `futures.order_book` and `futures.order_book_update` have added a new depth
  level field `l`.

2025-04-18

- Add additional code examples to the documentation.

2025-03-24

- Fixed the incorrect descriptions in some documents of the order_book channel.
- Fixed the incorrect descriptions in some documents of the orders channel.

2025-03-21

- The documentation for channel `futures.orders` has been updated, with new
  explanations added for fields such as `update_id`, `update_time`, `biz_info`,
  `stop_profit_price`, `stop_loss_price`.

2025-03-12

- Add new field `contract` in channel `contract_stats`
- Updated the Futures Account Trade module and added the `x-gate-exptime` field
- Fixed some descriptive errors in the Futures Account Trade documentation

2025-02-19

- Added channel `futures.public_liquidates` to push liquidate orders snapshot

2025-02-10

- Updated the Futures Account Trade module and added `x_in_time`, `x_out_time`,
  `conn_trace_id`, `trace_id` fields
- `futures.order_place`, `futures.order_batch_place`, `futures.order_cancel`,
  `futures.order_cancel_cp` and `futures.order_amend` added
  `x_gate_ratelimit_requests_remain`, `x_gate_ratelimit_limit` and
  `x_gat_ratelimit_reset_timestamp` fields

2024-11-18

- remove `10` level and `1000ms` interval in channel `futures.order_book_update`

2023-09-21

- Add new field `is_internal` in channel `futures.trades`

2023-08-18

- Add WebSocket API
- WebSocket API allows placing, canceling, amending, querying orders through a
  WebSocket connection.

2023-07-07

- Add new interval `20ms` in channel `futures.order_book_update`, please note
  that the interval of `20ms` is only supported for `20` levels.

2023-06-20

- Add `update_id` of `futures.positions`

2022-12-22

- Add new field `auto_size` in `futures.autoorders` initial struct, field detail
  to http api

2022-11-22

- Add new field `time_ms` in common msg response for time of message created

2022-08-11

- Add new field `text` in user trades notification
- Add new fields `low_24h` and `high_24h` in tickers notification

2022-04-15

- Add new field `currency` in balance notification

2021-03-31

- Add milliseconds field `t` in `futures.book_ticker` and `futures.order_book`
  response

2021-03-10

- Add new order book channel `futures.book_ticker` to push best ask/bid in
  realtime
- Add new order book channel `futures.order_book_update` to push order book
  change with user specified update frequency
- Add local order book maintenance documentation

2021-03-01

- Add new millisecond-precision timestamp ended with `_ms` in server
  notification.
- Add new field `id` in order book `all` notification.

2020-8-08

- Add a complete code demo(golang, python)

2020-8-07

- Add auto orders subscription

2020-7-07

- Add order book annotation

2020-4-30

- Add positions subscription

2019-11-06

- Add USDT futures contract
- Add volume_24h_base field, volume_24h_settle field, volume_24h_quote field for
  tickers
- Remove old server urls(`wss://fx-ws.gateio.ws/v4/ws` or
  `wss://fx-ws-testnet.gateio.ws/v4/ws`)

TIP

If you use old server urls(`wss://fx-ws.gateio.ws/v4/ws` or
`wss://fx-ws-testnet.gateio.ws/v4/ws`), we will use BTC contract for you.

2019-10-22

- Add application layer ping/pong message

2019-04-30

- Add index and mark candlestick subscription
- Add funding_rate_indicative field for tickers
- Add is_reduce_only and status field for orders

2019-02-13

- Change WebSocket base url
- Add volume_24h_usd field and volume_24h_btc field for tickers

2019-01-11

- Add position_closes and balances subscription
- Del finish_time field for auto_deleverages and liquidates
- Add time field for auto_deleverages and liquidates

## [#](#api-overview) API Overview

### [#](#method) Method

Each general api (such as ticker, order book etc.) supports some different event
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

### [#](#response) Response

Similar with request, response follows a common format composed of `time`,
`channel`, `event` , `error` and `result`.

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

## [#](#authentication) Authentication

Request body needs to carry authentication information if channels are private,
e.g. `futures.usertrades`

WebSocket authentication uses the same signature calculation method with HTTP
API, but has the following differences:

1.  Signature string concatenation method:
    `channel=<channel>&event=<event>&time=<time>`, where `<channel>`, `<event>`,
    `<time>` are corresponding request information
2.  Authentication information are sent in request body in field `auth`.

Code example

```python
# example WebSocket signature calculation implementation in Python
import hmac, hashlib, json, time

def gen_sign(channel, event, timestamp):
    # GateAPIv4 key pair
    api_key = 'YOUR_API_KEY'
    api_secret = 'YOUR_API_SECRET'

    s = 'channel=%s&event=%s&time=%d' % (channel, event, timestamp)
    sign = hmac.new(api_secret.encode('utf-8'), s.encode('utf-8'), hashlib.sha512).hexdigest()
    return {'method': 'api_key', 'KEY': api_key, 'SIGN': sign}

request = {
    'id': int(time.time() * 1e6),
    'time': int(time.time()),
    'channel': 'futures.orders',
    'event': 'subscribe',
    'payload': ["20011", "BTC_USD"]
}
request['auth'] = gen_sign(request['channel'], request['event'], request['time'])
print(json.dumps(request))
```

Code example

```go
package main

import (
	"crypto/hmac"
	"crypto/sha512"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"time"
)

func genSign(channel, event string, timestamp int64) map[string]string {
	apiKey := "YOUR_API_KEY"
	apiSecret := "YOUR_API_SECRET"

	s := fmt.Sprintf("channel=%s&event=%s&time=%d", channel, event, timestamp)
	h := hmac.New(sha512.New, []byte(apiSecret))
	h.Write([]byte(s))
	sign := hex.EncodeToString(h.Sum(nil))

	return map[string]string{
		"method": "api_key",
		"KEY":    apiKey,
		"SIGN":   sign,
	}
}

func main() {
	timestamp := time.Now().Unix()
	request := map[string]interface{}{
		"id":      time.Now().UnixNano() / 1e3,
		"time":    timestamp,
		"channel": "futures.orders",
		"event":   "subscribe",
		"payload": []string{"20011", "BTC_USD"},
	}
	request["auth"] = genSign(request["channel"].(string), request["event"].(string), timestamp)

	jsonBytes, _ := json.Marshal(request)
	fmt.Println(string(jsonBytes))
}
```

You can log into the console to retrieve futures API key and secret.

# [#](#system-api) System API

**Provides system status check, such as ping-pong.**

## [#](#ping-and-pong) Ping and Pong

**Check Server/Client connectivity.**

**gate.io futures contract use the protocol layer ping/pong message.The server
will initiate a ping message actively. If the client does not reply, the client
will be disconnected.**

[websocket rfc (opens new window)](https://tools.ietf.org/html/rfc6455)

**if you want to actively detect the connection status, you can send application
layer ping message and receive pong message.**

Code example

```python
from websocket import create_connection

ws = create_connection("wss://fx-ws-testnet.gateio.ws/v4/ws/btc")
ws.send('{"time" : 123456, "channel" : "futures.ping"}')
print(ws.recv())
```

Code example

```go
package main

import (
	"encoding/json"
	"fmt"
	"log"
	"time"

	"github.com/gorilla/websocket"
)

func main() {
	url := "wss://fx-ws-testnet.gateio.ws/v4/ws/btc"
	conn, _, err := websocket.DefaultDialer.Dial(url, nil)
	if err != nil {
		log.Fatal("dial error:", err)
	}
	defer conn.Close()

	ping := map[string]interface{}{
		"time":    time.Now().Unix(),
		"channel": "futures.ping",
	}

	msg, err := json.Marshal(ping)
	if err != nil {
		log.Fatal("json marshal error:", err)
	}

	err = conn.WriteMessage(websocket.TextMessage, msg)
	if err != nil {
		log.Fatal("write message error:", err)
	}

	_, message, err := conn.ReadMessage()
	if err != nil {
		log.Fatal("read message error:", err)
	}
	fmt.Println(string(message))
}
```

The above command returns JSON structured like this:

```json
{
  "time": 1545404023,
  "time_ms": 1545404023123,
  "channel": "futures.pong",
  "event": "",
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

Code example

```python
from websocket import create_connection

ws = create_connection("wss://fx-ws-testnet.gateio.ws/v4/ws/btc")
ws.send('{"time" : 123456, "channel" : "futures.tickers","event": "subscribe", "payload" : ["BTC_USD"]}')
print(ws.recv())
```

Code example

```go
package main

import (
	"fmt"
	"log"

	"github.com/gorilla/websocket"
)

func main() {
	url := "wss://fx-ws-testnet.gateio.ws/v4/ws/btc"
	conn, _, err := websocket.DefaultDialer.Dial(url, nil)
	if err != nil {
		log.Fatal("dial error:", err)
	}
	defer conn.Close()

	msg := `{"time":123456,"channel":"futures.tickers","event":"subscribe","payload":["BTC_USD"]}`

	err = conn.WriteMessage(websocket.TextMessage, []byte(msg))
	if err != nil {
		log.Fatal("write message error:", err)
	}

	_, message, err := conn.ReadMessage()
	if err != nil {
		log.Fatal("read message error:", err)
	}

	fmt.Println(string(message))
}
```

The above command returns JSON structured like this:

```json
{
  "time": 1545404023,
  "time_ms": 1545404023123,
  "channel": "futures.tickers",
  "event": "subscribe",
  "result": {
    "status": "success"
  }
}
```

**Subscribe futures contract ticker.**

### [#](#request-3) Request

- channel

  `futures.tickers`

- event

  `subscribe`

* params

## [#](#tickers-notification) Tickers notification

```json
{
  "time": 1541659086,
  "time_ms": 1541659086123,
  "channel": "futures.tickers",
  "event": "update",
  "result": [
    {
      "contract": "BTC_USD",
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
      "volume_24h_base": "5526",
      "low_24h": "99.2",
      "high_24h": "132.5"
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

## [#](#cancel-subscription) Cancel subscription

Code example

```python
import json
from websocket import create_connection

ws = create_connection("wss://fx-ws-testnet.gateio.ws/v4/ws/btc")
req = {
  "time": 123456,
  "channel": "futures.tickers",
  "event": "unsubscribe",
  "payload": ["BTC_USD"]
}
ws.send(json.dumps(req))
print(ws.recv())
```

Code example

```go
package main

import (
	"encoding/json"
	"fmt"
	"log"

	"github.com/gorilla/websocket"
)

func main() {
	url := "wss://fx-ws-testnet.gateio.ws/v4/ws/btc"
	conn, _, err := websocket.DefaultDialer.Dial(url, nil)
	if err != nil {
		log.Fatal("dial error:", err)
	}
	defer conn.Close()

	req := map[string]interface{}{
		"time":    123456,
		"channel": "futures.tickers",
		"event":   "unsubscribe",
		"payload": []string{"BTC_USD"},
	}

	msg, err := json.Marshal(req)
	if err != nil {
		log.Fatal("json marshal error:", err)
	}

	err = conn.WriteMessage(websocket.TextMessage, msg)
	if err != nil {
		log.Fatal("write message error:", err)
	}

	_, message, err := conn.ReadMessage()
	if err != nil {
		log.Fatal("read message error:", err)
	}

	fmt.Println(string(message))
}
```

The above command returns JSON structured like this:

```json
{
  "time": 1545404900,
  "time_ms": 1545404900123,
  "channel": "futures.tickers",
  "event": "unsubscribe",
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

Code example

```python
from websocket import create_connection

ws = create_connection("wss://fx-ws-testnet.gateio.ws/v4/ws/btc")
ws.send('{"time" : 123456, "channel" : "futures.trades","event": "subscribe", "payload" : ["BTC_USD"]}')
print(ws.recv())
```

Code example

```go
package main

import (
	"fmt"
	"log"

	"github.com/gorilla/websocket"
)

func main() {
	url := "wss://fx-ws-testnet.gateio.ws/v4/ws/btc"
	conn, _, err := websocket.DefaultDialer.Dial(url, nil)
	if err != nil {
		log.Fatal("dial error:", err)
	}
	defer conn.Close()

	msg := `{"time":123456,"channel":"futures.trades","event":"subscribe","payload":["BTC_USD"]}`

	err = conn.WriteMessage(websocket.TextMessage, []byte(msg))
	if err != nil {
		log.Fatal("write message error:", err)
	}

	_, message, err := conn.ReadMessage()
	if err != nil {
		log.Fatal("read message error:", err)
	}

	fmt.Println(string(message))
}
```

The above command returns JSON structured like this:

```json
{
  "time": 1545405058,
  "time_ms": 1545405058123,
  "channel": "futures.trades",
  "event": "subscribe",
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

## [#](#trades-notification) Trades notification

Positive size means taker is buyer，negative seller

```json
{
  "channel": "futures.trades",
  "event": "update",
  "time": 1541503698,
  "time_ms": 1541503698123,
  "result": [
    {
      "size": -108,
      "id": 27753479,
      "create_time": 1545136464,
      "create_time_ms": 1545136464123,
      "price": "96.4",
      "contract": "BTC_USD",
      "is_internal": true
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

## [#](#cancel-subscription-2) Cancel subscription

Code example

```python
from websocket import create_connection

ws = create_connection("wss://fx-ws-testnet.gateio.ws/v4/ws/btc")
ws.send(
  '{"time" : 123456, "channel" : "futures.trades", "event": "subscribe", "payload" : ["BTC_USD"]}')
print(ws.recv())
```

Code example

```go
package main

import (
	"fmt"
	"log"

	"github.com/gorilla/websocket"
)

func main() {
	url := "wss://fx-ws-testnet.gateio.ws/v4/ws/btc"
	conn, _, err := websocket.DefaultDialer.Dial(url, nil)
	if err != nil {
		log.Fatal("dial error:", err)
	}
	defer conn.Close()

	msg := `{"time":123456,"channel":"futures.trades","event":"subscribe","payload":["BTC_USD"]}`

	err = conn.WriteMessage(websocket.TextMessage, []byte(msg))
	if err != nil {
		log.Fatal("write message error:", err)
	}

	_, message, err := conn.ReadMessage()
	if err != nil {
		log.Fatal("read message error:", err)
	}

	fmt.Println(string(message))
}
```

The above command returns JSON structured like this:

```json
{
  "time": 1545404900,
  "time_ms": 1545404900123,
  "channel": "futures.trades",
  "event": "unsubscribe",
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
    frequency, e.g. `["BTC_USDT", "100ms", "100"]` pushes the first 100 levels'
    update in BTC_USDT order book every 100ms
2.  Cache WebSocket notifications. Every notification use `U` and `u` to tell
    the first and last update ID since last notification.
3.  Retrieve base order book using REST API, and make sure the order book ID is
    recorded(referred as `baseID` below) e.g.
    `https://api.gateio.ws/api/v4/futures/usdt/order_book?contract=BTC_USDT&limit=10&with_id=true`
    retrieves the 10-level base order book of BTC_USDT
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

Code example

```python
from websocket import create_connection

ws = create_connection("wss://fx-ws-testnet.gateio.ws/v4/ws/btc")
ws.send('{"time" : 123456, "channel" : "futures.order_book","event": "subscribe", "payload" : ["BTC_USD", "20", "0"]}')
print(ws.recv())
```

Code example

```go
package main

import (
	"fmt"
	"log"

	"github.com/gorilla/websocket"
)

func main() {
	url := "wss://fx-ws-testnet.gateio.ws/v4/ws/btc"
	conn, _, err := websocket.DefaultDialer.Dial(url, nil)
	if err != nil {
		log.Fatal("dial error:", err)
	}
	defer conn.Close()

	msg := `{"time":123456,"channel":"futures.order_book","event":"subscribe","payload":["BTC_USD","20","0"]}`

	err = conn.WriteMessage(websocket.TextMessage, []byte(msg))
	if err != nil {
		log.Fatal("write message error:", err)
	}

	_, message, err := conn.ReadMessage()
	if err != nil {
		log.Fatal("read message error:", err)
	}

	fmt.Println(string(message))
}
```

The above command returns JSON structured like this:

```json
{
  "time": 1545405058,
  "time_ms": 1545405058123,
  "channel": "futures.order_book",
  "event": "subscribe",
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

## [#](#legacy-order-book-notification) Legacy order book notification

```json
{
  "channel": "futures.order_book",
  "event": "all",
  "time": 1541500161,
  "time_ms": 1541500161123,
  "result": {
    "t": 1541500161123,
    "contract": "BTC_USD",
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
    ],
    "l": "20"
  }
}
```

**Notify contract order book update information**

### [#](#notify-3) Notify

- channel

  `futures.order_book`

- event

  `all`

* params

## [#](#legacy-order-book-unsubscription) Legacy order book unsubscription

Code example

```python
from websocket import create_connection

ws = create_connection("wss://fx-ws-testnet.gateio.ws/v4/ws/btc")
ws.send('{"time" : 123456, "channel" : "futures.order_book","event": "unsubscribe", "payload" : ["BTC_USD", "20", "0"]}')
print(ws.recv())
```

Code example

```go
package main

import (
	"fmt"
	"log"

	"github.com/gorilla/websocket"
)

func main() {
	url := "wss://fx-ws-testnet.gateio.ws/v4/ws/btc"
	conn, _, err := websocket.DefaultDialer.Dial(url, nil)
	if err != nil {
		log.Fatal("dial error:", err)
	}
	defer conn.Close()

	msg := `{"time":123456,"channel":"futures.order_book","event":"unsubscribe","payload":["BTC_USD","20","0"]}`

	err = conn.WriteMessage(websocket.TextMessage, []byte(msg))
	if err != nil {
		log.Fatal("write message error:", err)
	}

	_, message, err := conn.ReadMessage()
	if err != nil {
		log.Fatal("read message error:", err)
	}

	fmt.Println(string(message))
}
```

The above command returns JSON structured like this:

```json
{
  "time": 1545445847,
  "time_ms": 1545445847123,
  "channel": "futures.order_book",
  "event": "unsubscribe",
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

Code example

```python
from websocket import create_connection

ws = create_connection("wss://fx-ws.gateio.ws/v4/ws/usdt")
ws.send('{"time" : 123456, "channel" : "futures.book_ticker","event": "subscribe", "payload" : ["BTC_USDT"]}')
print(ws.recv())
```

Code example

```go
package main

import (
	"fmt"
	"log"

	"github.com/gorilla/websocket"
)

func main() {
	url := "wss://fx-ws.gateio.ws/v4/ws/usdt"
	conn, _, err := websocket.DefaultDialer.Dial(url, nil)
	if err != nil {
		log.Fatal("dial error:", err)
	}
	defer conn.Close()

	msg := `{"time":123456,"channel":"futures.book_ticker","event":"subscribe","payload":["BTC_USDT"]}`

	err = conn.WriteMessage(websocket.TextMessage, []byte(msg))
	if err != nil {
		log.Fatal("write message error:", err)
	}

	_, message, err := conn.ReadMessage()
	if err != nil {
		log.Fatal("read message error:", err)
	}

	fmt.Println(string(message))
}
```

The above command returns JSON structured like this:

```json
{
  "time": 1545405058,
  "time_ms": 1545405058123,
  "channel": "futures.book_ticker",
  "event": "subscribe",
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
  "result": {
    "t": 1615366379123,
    "u": 2517661076,
    "s": "BTC_USD",
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

## [#](#best-ask-bid-unsubscription) Best ask/bid unsubscription

Code example

```python
from websocket import create_connection

ws = create_connection("wss://fx-ws.gateio.ws/v4/ws/usdt")
ws.send('{"time" : 123456, "channel" : "futures.book_ticker","event": "unsubscribe", "payload" : ["BTC_USDT"]}')
print(ws.recv())
```

Code example

```go
package main

import (
	"fmt"
	"log"

	"github.com/gorilla/websocket"
)

func main() {
	url := "wss://fx-ws.gateio.ws/v4/ws/usdt"
	conn, _, err := websocket.DefaultDialer.Dial(url, nil)
	if err != nil {
		log.Fatal("dial error:", err)
	}
	defer conn.Close()

	msg := `{"time":123456,"channel":"futures.book_ticker","event":"unsubscribe","payload":["BTC_USDT"]}`

	err = conn.WriteMessage(websocket.TextMessage, []byte(msg))
	if err != nil {
		log.Fatal("write message error:", err)
	}

	_, message, err := conn.ReadMessage()
	if err != nil {
		log.Fatal("read message error:", err)
	}

	fmt.Println(string(message))
}
```

The above command returns JSON structured like this:

```json
{
  "time": 1545445847,
  "time_ms": 1545445847123,
  "channel": "futures.book_ticker",
  "event": "unsubscribe",
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

Code example

```python
from websocket import create_connection

ws = create_connection("wss://fx-ws.gateio.ws/v4/ws/usdt")
ws.send('{"time" : 123456, "channel" : "futures.order_book_update","event": "subscribe", "payload" : ["BTC_USDT", "100ms", "100"]}')
print(ws.recv())
```

Code example

```go
package main

import (
	"fmt"
	"log"

	"github.com/gorilla/websocket"
)

func main() {
	url := "wss://fx-ws.gateio.ws/v4/ws/usdt"
	conn, _, err := websocket.DefaultDialer.Dial(url, nil)
	if err != nil {
		log.Fatal("dial error:", err)
	}
	defer conn.Close()

	msg := `{"time":123456,"channel":"futures.order_book_update","event":"subscribe","payload":["BTC_USDT", "100ms", "100"]}`

	err = conn.WriteMessage(websocket.TextMessage, []byte(msg))
	if err != nil {
		log.Fatal("write message error:", err)
	}

	_, message, err := conn.ReadMessage()
	if err != nil {
		log.Fatal("read message error:", err)
	}

	fmt.Println(string(message))
}
```

The above command returns JSON structured like this:

```json
{
  "time": 1545405058,
  "time_ms": 1545405058123,
  "channel": "futures.order_book_update",
  "event": "subscribe",
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

## [#](#order-book-update-notification) Order book update notification

```json
{
  "time": 1615366381,
  "time_ms": 1615366381123,
  "channel": "futures.order_book_update",
  "event": "update",
  "result": {
    "t": 1615366381417,
    "s": "BTC_USD",
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
    ],
    "l": "100"
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

## [#](#order-book-update-unsubscription) Order book update unsubscription

Code example

```python
from websocket import create_connection

ws = create_connection("wss://fx-ws.gateio.ws/v4/ws/usdt")
ws.send(
  '{"time" : 123456, "channel" : "futures.order_book_update", "event": "unsubscribe", "payload" : ["BTC_USDT", "100ms"]}')
print(ws.recv())
```

Code example

```go
package main

import (
	"fmt"
	"log"

	"github.com/gorilla/websocket"
)

func main() {
	url := "wss://fx-ws.gateio.ws/v4/ws/usdt"
	conn, _, err := websocket.DefaultDialer.Dial(url, nil)
	if err != nil {
		log.Fatal("dial error:", err)
	}
	defer conn.Close()

	msg := `{"time":123456,"channel":"futures.order_book_update","event":"unsubscribe","payload":["BTC_USDT", "100ms"]}`

	err = conn.WriteMessage(websocket.TextMessage, []byte(msg))
	if err != nil {
		log.Fatal("write message error:", err)
	}

	_, message, err := conn.ReadMessage()
	if err != nil {
		log.Fatal("read message error:", err)
	}

	fmt.Println(string(message))
}
```

The above command returns JSON structured like this:

```json
{
  "time": 1545445847,
  "time_ms": 1545445847123,
  "channel": "futures.order_book_update",
  "event": "unsubscribe",
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

**_If prefix `contract` with
`mark_`, the contract's mark price candlesticks will be subscribed; if prefix with `index*`,
index price candlesticks will be subscribed.***

Code example

```python
from websocket import create_connection

ws = create_connection("wss://fx-ws-testnet.gateio.ws/v4/ws/btc")
ws.send('{"time" : 123456, "channel" : "futures.candlesticks","event": "subscribe", "payload" : ["1m", "BTC_USD"]}')
print(ws.recv())
```

Code example

```go
package main

import (
	"fmt"
	"log"

	"github.com/gorilla/websocket"
)

func main() {
	url := "wss://fx-ws-testnet.gateio.ws/v4/ws/btc"
	conn, _, err := websocket.DefaultDialer.Dial(url, nil)
	if err != nil {
		log.Fatal("dial error:", err)
	}
	defer conn.Close()

	msg := `{"time":123456,"channel":"futures.candlesticks","event":"subscribe","payload":["1m", "BTC_USD"]}`

	err = conn.WriteMessage(websocket.TextMessage, []byte(msg))
	if err != nil {
		log.Fatal("write message error:", err)
	}

	_, message, err := conn.ReadMessage()
	if err != nil {
		log.Fatal("read message error:", err)
	}

	fmt.Println(string(message))
}
```

The above command returns JSON structured like this:

```json
{
  "time": 1545445847,
  "time_ms": 1545445847123,
  "channel": "futures.candlesticks",
  "event": "subscribe",
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

## [#](#candlesticks-notification) Candlesticks notification

```json
{
  "time": 1542162490,
  "time_ms": 1542162490123,
  "channel": "futures.candlesticks",
  "event": "update",
  "result": [
    {
      "t": 1545129300,
      "v": 27525555,
      "c": "95.4",
      "h": "96.9",
      "l": "89.5",
      "o": "94.3",
      "n": "1m_BTC_USD",
      "a": "314732.87412"
    },
    {
      "t": 1545129300,
      "v": 27525555,
      "c": "95.4",
      "h": "96.9",
      "l": "89.5",
      "o": "94.3",
      "n": "1m_BTC_USD",
      "a": "314732.87412"
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

## [#](#cancel-subscription-3) Cancel subscription

Code example

```python
from websocket import create_connection

ws = create_connection("wss://fx-ws-testnet.gateio.ws/v4/ws/btc")
ws.send(
  '{"time" : 123456, "channel" : "futures.candlesticks", "event": "unsubscribe", "payload" : ["1m", "BTC_USD"]}')
print(ws.recv())
```

Code example

```go
package main

import (
	"fmt"
	"log"

	"github.com/gorilla/websocket"
)

func main() {
	url := "wss://fx-ws-testnet.gateio.ws/v4/ws/btc"
	conn, _, err := websocket.DefaultDialer.Dial(url, nil)
	if err != nil {
		log.Fatal("dial error:", err)
	}
	defer conn.Close()

	msg := `{"time":123456,"channel":"futures.candlesticks","event":"unsubscribe","payload":["1m", "BTC_USD"]}`

	err = conn.WriteMessage(websocket.TextMessage, []byte(msg))
	if err != nil {
		log.Fatal("write message error:", err)
	}

	_, message, err := conn.ReadMessage()
	if err != nil {
		log.Fatal("read message error:", err)
	}

	fmt.Println(string(message))
}
```

The above command returns JSON structured like this:

```json
{
  "time": 1545445847,
  "time_ms": 1545445847123,
  "channel": "futures.candlesticks",
  "event": "unsubscribe",
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

# [#](#public-liquidates-order-api) public liquidates order API

**Provide a way to receive Gate liquidate order information, and each contract
can push up to one liquidate order data every 1 second**

## [#](#public-liquidate-order-subscription) public liquidate order subscription

If you want to subscribe to liquidates order push in all contracts, use `!all`
in the subscription request list

Code example

```python
import json
from websocket import create_connection

ws = create_connection("wss://fx-ws-testnet.gateio.ws/v4/ws/btc")
req = {
    "time": 123456,
    "channel": "futures.public_liquidates",
    "event": "subscribe",
    "payload": ["BTC_USD","ETH_USD"],
}
ws.send(json.dumps(req))
print(ws.recv())
```

Code example

```go
package main

import (
	"fmt"
	"log"
	"encoding/json"

	"github.com/gorilla/websocket"
)

func main() {
	url := "wss://fx-ws-testnet.gateio.ws/v4/ws/btc"
	conn, _, err := websocket.DefaultDialer.Dial(url, nil)
	if err != nil {
		log.Fatal("dial error:", err)
	}
	defer conn.Close()

	req := map[string]interface{}{
		"time":    123456,
		"channel": "futures.public_liquidates",
		"event":   "subscribe",
		"payload": []string{"BTC_USD", "ETH_USD"},
	}

	msg, err := json.Marshal(req)
	if err != nil {
		log.Fatal("json marshal error:", err)
	}

	err = conn.WriteMessage(websocket.TextMessage, msg)
	if err != nil {
		log.Fatal("write message error:", err)
	}

	_, message, err := conn.ReadMessage()
	if err != nil {
		log.Fatal("read message error:", err)
	}

	fmt.Println(string(message))
}
```

The above command returns JSON structured like this:

```json
{
  "time": 1545459681,
  "time_ms": 1545459681123,
  "channel": "futures.public_liquidates",
  "event": "subscribe",
  "result": {
    "status": "success"
  }
}
```

**public liquidates order notify**

### [#](#request-parameters) request parameters

- channel

  `futures.public_liquidates`

- event `subscribe`

* params

## [#](#public-liquidate-order-notification) public liquidate order notification

```json
{
  "channel": "futures.public_liquidates",
  "event": "update",
  "time": 1541505434,
  "time_ms": 1541505434123,
  "result": [
    {
      "price": 215.1,
      "size": -124,
      "time_ms": 1541486601123,
      "contract": "BTC_USD"
    }
  ]
}
```

**Push public liquidate order updates**

### [#](#notify-params) Notify params

- channel

  `futures.public_liquidates`

- event

  `update`

* params

## [#](#cancel-subscription-4) Cancel subscription

Code example

```python
import json
from websocket import create_connection

ws = create_connection("wss://fx-ws-testnet.gateio.ws/v4/ws/btc")
req = {
    "time": 123456,
    "channel": "futures.public_liquidates",
    "event": "unsubscribe",
    "payload": ["BTC_USD"],
}
ws.send(json.dumps(req))
print(ws.recv())
```

Code example

```go
package main

import (
	"fmt"
	"log"
	"encoding/json"

	"github.com/gorilla/websocket"
)

func main() {
	url := "wss://fx-ws-testnet.gateio.ws/v4/ws/btc"
	conn, _, err := websocket.DefaultDialer.Dial(url, nil)
	if err != nil {
		log.Fatal("dial error:", err)
	}
	defer conn.Close()

	req := map[string]interface{}{
		"time":    123456,
		"channel": "futures.public_liquidates",
		"event":   "unsubscribe",
		"payload": []string{"BTC_USD"},
	}

	msg, err := json.Marshal(req)
	if err != nil {
		log.Fatal("json marshal error:", err)
	}

	err = conn.WriteMessage(websocket.TextMessage, msg)
	if err != nil {
		log.Fatal("write message error:", err)
	}

	_, message, err := conn.ReadMessage()
	if err != nil {
		log.Fatal("read message error:", err)
	}

	fmt.Println(string(message))
}
```

The above command returns the JSON structure as follows：

```json
{
  "time": 1545459681,
  "time_ms": 1545459681123,
  "channel": "futures.public_liquidates",
  "event": "unsubscribe",
  "result": {
    "status": "success"
  }
}
```

**public liquidate order Unsubscribe**

### [#](#params) params

- channel

  `futures.public_liquidates`

- event

  `unsubscribe`

# [#](#contract-stats-api) Contract Stats API

**The contract_stats channel allows you to obtain contract statistics.**

## [#](#contract-stats-subscription) Contract Stats subscription

Code example

```python
from websocket import create_connection

ws = create_connection("wss://fx-ws-testnet.gateio.ws/v4/ws/btc")
ws.send('{"time" : 123456, "channel" : "futures.contract_stats","event": "subscribe", "payload" : ["BTC_USD","1m"]}')
print(ws.recv())
```

Code example

```go
package main

import (
	"fmt"
	"log"

	"github.com/gorilla/websocket"
)

func main() {
	url := "wss://fx-ws-testnet.gateio.ws/v4/ws/btc"
	conn, _, err := websocket.DefaultDialer.Dial(url, nil)
	if err != nil {
		log.Fatal("dial error:", err)
	}
	defer conn.Close()

	message := `{
		"time": 123456,
		"channel": "futures.contract_stats",
		"event": "subscribe",
		"payload": ["BTC_USD", "1m"]
	}`

	err = conn.WriteMessage(websocket.TextMessage, []byte(message))
	if err != nil {
		log.Fatal("write error:", err)
	}

	_, msg, err := conn.ReadMessage()
	if err != nil {
		log.Fatal("read error:", err)
	}

	fmt.Println(string(msg))
}
```

The above command returns JSON structured like this:

```json
{
  "time": 1545404023,
  "time_ms": 1545404023123,
  "channel": "futures.contract_stats",
  "event": "subscribe",
  "result": {
    "status": "success"
  }
}
```

**Subscribe futures contract stats.**

### [#](#request-15) Request

- channel

  `futures.contract_stats`

- event

  `subscribe`

* params

## [#](#contract-stats-notification) Contract Stats notification

```json
{
  "time": 1541659086,
  "time_ms": 1541659086123,
  "channel": "futures.contract_stats",
  "event": "update",
  "result": [
    {
      "time": 1603865400,
      "contract": "BTC_USDT",
      "lsr_taker": 100,
      "lsr_account": 0.5,
      "long_liq_size": 0,
      "short_liq_size": 0,
      "open_interest": 124724,
      "short_liq_usd": 0,
      "mark_price": "8865",
      "top_lsr_size": 1.02,
      "short_liq_amount": 0,
      "long_liq_amount": 0,
      "open_interest_usd": 1511,
      "top_lsr_account": 1.5,
      "long_liq_usd": 0
    }
  ]
}
```

**Notify subscribed contract stats.**

### [#](#notify-7) Notify

- channel

  `futures.contract_stats`

- event

  `update`

* params

## [#](#cancel-subscription-5) Cancel subscription

Code example

```python
import json
from websocket import create_connection

ws = create_connection("wss://fx-ws-testnet.gateio.ws/v4/ws/btc")
req = {
    "time": 123456,
    "channel": "futures.contract_stats",
    "event": "unsubscribe",
    "payload": ["BTC_USD","1m"]
}
ws.send(json.dumps(req))
print(ws.recv())
```

Code example

```go
package main

import (
	"fmt"
	"log"

	"github.com/gorilla/websocket"
)

func main() {
	url := "wss://fx-ws-testnet.gateio.ws/v4/ws/btc"
	conn, _, err := websocket.DefaultDialer.Dial(url, nil)
	if err != nil {
		log.Fatal("dial error:", err)
	}
	defer conn.Close()

	req := `{
		"time": 123456,
		"channel": "futures.contract_stats",
		"event": "unsubscribe",
		"payload": ["BTC_USD", "1m"]
	}`

	err = conn.WriteMessage(websocket.TextMessage, []byte(req))
	if err != nil {
		log.Fatal("write error:", err)
	}

	_, msg, err := conn.ReadMessage()
	if err != nil {
		log.Fatal("read error:", err)
	}

	fmt.Println(string(msg))
}
```

The above command returns JSON structured like this:

```json
{
  "time": 1545404900,
  "time_ms": 1545404900123,
  "channel": "futures.contract_stats",
  "event": "unsubscribe",
  "result": {
    "status": "success"
  }
}
```

**Unsubscribe contract stats.**

### [#](#request-16) Request

- channel

  `futures.contract_stats`

- event

  `unsubscribe`

* params

**Note: `contract` is `unsub_all`, which means cancel all**

# [#](#orders-api) Orders API

**Provides a way to receive user closed orders.**

WARNING

Authentication required.

## [#](#orders-subscription) Orders subscription

If you want to subscribe to order updates in all contracts, use `!all` in
contract list.

Code example

```python
import json, time
from websocket import create_connection

ws = create_connection("wss://fx-ws-testnet.gateio.ws/v4/ws/btc")
req = {
  "time": int(time.time()),
  "channel": "futures.orders",
  "event": "subscribe",
  "payload": ["20011", "BTC_USD"],
  "auth": {
    "method": "api_key",
    "KEY": "xxxx",
    "SIGN": "xxxx"
  }
}
ws.send(json.dumps(req))
print(ws.recv())
```

Code example

```go
package main

import (
	"fmt"
	"log"
  "time"

	"github.com/gorilla/websocket"
)

func main() {
	url := "wss://fx-ws-testnet.gateio.ws/v4/ws/btc"
	conn, _, err := websocket.DefaultDialer.Dial(url, nil)
	if err != nil {
		log.Fatal("dial error:", err)
	}
	defer conn.Close()

	req := map[string]interface{}{
		"time":    time.Now().Unix(),
		"channel": "futures.orders",
		"event":   "subscribe",
		"payload": []interface{}{"20011", "BTC_USD"},
		"auth": map[string]string{
			"method": "api_key",
			"KEY":    "xxxx",
			"SIGN":   "xxxx",
		},
	}

	msg, err := json.Marshal(req)
	if err != nil {
		log.Fatal("json marshal error:", err)
	}

	err = conn.WriteMessage(websocket.TextMessage, msg)
	if err != nil {
		log.Fatal("write error:", err)
	}

	_, resp, err := conn.ReadMessage()
	if err != nil {
		log.Fatal("read error:", err)
	}

	fmt.Println(string(resp))
}
```

The above command returns JSON structured like this:

```json
{
  "time": 1545459681,
  "time_ms": 1545459681123,
  "channel": "futures.orders",
  "event": "subscribe",
  "result": {
    "status": "success"
  }
}
```

**Subscribe user orders update**

### [#](#request-17) Request

- channel

  `futures.orders`

- event

  `subscribe`

* params

## [#](#orders-notification) Orders notification

```json
{
  "channel": "futures.orders",
  "event": "update",
  "time": 1541505434,
  "time_ms": 1541505434123,
  "result": [
    {
      "contract": "BTC_USD",
      "create_time": 1628736847,
      "create_time_ms": 1628736847325,
      "fill_price": 40000.4,
      "finish_as": "filled",
      "finish_time": 1628736848,
      "finish_time_ms": 1628736848321,
      "iceberg": 0,
      "id": 4872460,
      "is_close": false,
      "is_liq": false,
      "is_reduce_only": false,
      "left": 0,
      "mkfr": -0.00025,
      "price": 40000.4,
      "refr": 0,
      "refu": 0,
      "size": 1,
      "status": "finished",
      "text": "-",
      "tif": "gtc",
      "tkfr": 0.0005,
      "user": "110xxxxx",
      "update_id": 1,
      "update_time": 1541505434123,
      "stop_loss_price": "",
      "stop_profit_price": ""
    }
  ]
}
```

**Notify user orders information when an order is put, updated or finished.**

### [#](#notify-8) Notify

- channel

  `futures.orders`

- event

  `update`

* params

  `For the meaning of parameters, please refer to http interface.`

## [#](#cancel-subscription-6) Cancel subscription

Code example

```python
import json, time
from websocket import create_connection

ws = create_connection("wss://fx-ws-testnet.gateio.ws/v4/ws/btc")
req = {
  "time": int(time.time()),
  "channel": "futures.orders",
  "event": "unsubscribe",
  "payload": ["20011", "BTC_USD"],
  "auth": {
    "method": "api_key",
    "KEY": "xxxx",
    "SIGN": "xxxx"
  }
}
ws.send(json.dumps(req))
print(ws.recv())
```

Code example

```go
package main

import (
	"encoding/json"
	"fmt"
	"log"
  "time"

	"github.com/gorilla/websocket"
)

func main() {
	url := "wss://fx-ws-testnet.gateio.ws/v4/ws/btc"
	conn, _, err := websocket.DefaultDialer.Dial(url, nil)
	if err != nil {
		log.Fatal("dial error:", err)
	}
	defer conn.Close()

	req := map[string]interface{}{
		"time":    time.Now().Unix(),
		"channel": "futures.orders",
		"event":   "unsubscribe",
		"payload": []interface{}{"20011", "BTC_USD"},
		"auth": map[string]string{
			"method": "api_key",
			"KEY":    "xxxx", // replace with your API key
			"SIGN":   "xxxx", // replace with your generated signature
		},
	}

	msg, err := json.Marshal(req)
	if err != nil {
		log.Fatal("json marshal error:", err)
	}

	err = conn.WriteMessage(websocket.TextMessage, msg)
	if err != nil {
		log.Fatal("write error:", err)
	}

	_, resp, err := conn.ReadMessage()
	if err != nil {
		log.Fatal("read error:", err)
	}

	fmt.Println(string(resp))
}
```

The above command returns JSON structured like this:

```json
{
  "time": 1545459681,
  "time_ms": 1545459681123,
  "channel": "futures.orders",
  "event": "unsubscribe",
  "result": {
    "status": "success"
  }
}
```

**Unsubscribe user orders update notification, for all contract.**

### [#](#request-18) Request

- channel

  `futures.orders`

- event

  `unsubscribe`

# [#](#user-trades-api) User trades API

**Provides a way to receive user trades.**

WARNING

Authentication required.

## [#](#user-trades-subscription) User trades subscription

If you want to subscribe to user trade updates in all contracts, use `!all` in
contract list.

Code example

```python
import json, time
from websocket import create_connection

ws = create_connection("wss://fx-ws-testnet.gateio.ws/v4/ws/btc")
req = {
  "time": int(time.time()),
  "channel": "futures.usertrades",
  "event": "subscribe",
  "payload": ["20011", "BTC_USD"],
  "auth": {
    "method": "api_key",
    "KEY": "xxxx",
    "SIGN": "xxxx"
  }
}
ws.send(json.dumps(req))
print(ws.recv())
```

Code example

```go
package main

import (
	"encoding/json"
	"fmt"
	"log"
  "time"

	"github.com/gorilla/websocket"
)

func main() {
	url := "wss://fx-ws-testnet.gateio.ws/v4/ws/btc"
	conn, _, err := websocket.DefaultDialer.Dial(url, nil)
	if err != nil {
		log.Fatal("dial error:", err)
	}
	defer conn.Close()

	req := map[string]interface{}{
		"time":    time.Now().Unix(),
		"channel": "futures.usertrades",
		"event":   "subscribe",
		"payload": []interface{}{"20011", "BTC_USD"},
		"auth": map[string]string{
			"method": "api_key",
			"KEY":    "xxxx",
			"SIGN":   "xxxx",
		},
	}

	msg, err := json.Marshal(req)
	if err != nil {
		log.Fatal("json marshal error:", err)
	}

	err = conn.WriteMessage(websocket.TextMessage, msg)
	if err != nil {
		log.Fatal("write error:", err)
	}

	_, resp, err := conn.ReadMessage()
	if err != nil {
		log.Fatal("read error:", err)
	}

	fmt.Println(string(resp))
}
```

The above command returns JSON structured like this:

```json
{
  "time": 1545459681,
  "time_ms": 1545459681123,
  "channel": "futures.usertrades",
  "event": "subscribe",
  "result": {
    "status": "success"
  }
}
```

**Subscribe for user trades update.**

### [#](#request-19) Request

- channel

  `futures.usertrades`

- event

  `subscribe`

* params

## [#](#user-trades-notification) User trades notification

```json
{
  "time": 1543205083,
  "time_ms": 1543205083123,
  "channel": "futures.usertrades",
  "event": "update",
  "result": [
    {
      "id": "3335259",
      "create_time": 1628736848,
      "create_time_ms": 1628736848321,
      "contract": "BTC_USD",
      "order_id": "4872460",
      "size": 1,
      "price": "40000.4",
      "role": "maker",
      "text": "api",
      "fee": 0.0009290592,
      "point_fee": 0
    }
  ]
}
```

**Notify user trades update.**

### [#](#notify-9) Notify

- channel

  `futures.usertrades`

- event

  `update`

* params

## [#](#cancel-subscription-7) Cancel subscription

Code example

```python
import json, time
from websocket import create_connection

ws = create_connection("wss://fx-ws-testnet.gateio.ws/v4/ws/btc")
req = {
  "time": int(time.time()),
  "channel": "futures.usertrades",
  "event": "unsubscribe",
  "payload": ["20011", "BTC_USD"],
  "auth": {
    "method": "api_key",
    "KEY": "xxxx",
    "SIGN": "xxxx"
  }
}
ws.send(json.dumps(req))
print(ws.recv())
```

Code example

```go
package main

import (
	"encoding/json"
	"fmt"
	"log"
  "time"

	"github.com/gorilla/websocket"
)

func main() {
	url := "wss://fx-ws-testnet.gateio.ws/v4/ws/btc"
	conn, _, err := websocket.DefaultDialer.Dial(url, nil)
	if err != nil {
		log.Fatal("dial error:", err)
	}
	defer conn.Close()

	req := map[string]interface{}{
		"time":    time.Now().Unix(),
		"channel": "futures.usertrades",
		"event":   "unsubscribe",
		"payload": []interface{}{"20011", "BTC_USD"},
		"auth": map[string]string{
			"method": "api_key",
			"KEY":    "xxxx",
			"SIGN":   "xxxx",
		},
	}

	msg, err := json.Marshal(req)
	if err != nil {
		log.Fatal("json marshal error:", err)
	}

	err = conn.WriteMessage(websocket.TextMessage, msg)
	if err != nil {
		log.Fatal("write error:", err)
	}

	_, resp, err := conn.ReadMessage()
	if err != nil {
		log.Fatal("read error:", err)
	}

	fmt.Println(string(resp))
}
```

The above command returns JSON structured like this:

```json
{
  "time": 1545459681,
  "time_ms": 1545459681123,
  "channel": "futures.usertrades",
  "event": "unsubscribe",
  "result": {
    "status": "success"
  }
}
```

**Unsubscribe user trades update.**

### [#](#request-20) Request

- channel

  `futures.usertrades`

- event

  `unsubscribe`

# [#](#liquidates-api) Liquidates API

**Provides a way to receive user liquidates info.**

WARNING

Authentication required.

## [#](#liquidates-subscription) Liquidates subscription

If you want to subscribe to liquidate updates in all contracts, use `!all` in
contract list.

Code example

```python
import json, time
from websocket import create_connection

ws = create_connection("wss://fx-ws-testnet.gateio.ws/v4/ws/btc")
req = {
  "time": int(time.time()),
  "channel": "futures.liquidates",
  "event": "subscribe",
  "payload": ["20011", "BTC_USD"],
  "auth": {
    "method": "api_key",
    "KEY": "xxxx",
    "SIGN": "xxxx"
  }
}
ws.send(json.dumps(req))
print(ws.recv())
```

Code example

```go
package main

import (
	"encoding/json"
	"fmt"
	"log"
  "time"

	"github.com/gorilla/websocket"
)

func main() {
	url := "wss://fx-ws-testnet.gateio.ws/v4/ws/btc"
	conn, _, err := websocket.DefaultDialer.Dial(url, nil)
	if err != nil {
		log.Fatal("dial error:", err)
	}
	defer conn.Close()

	req := map[string]interface{}{
		"time":    time.Now().Unix(),
		"channel": "futures.liquidates",
		"event":   "subscribe",
		"payload": []interface{}{"20011", "BTC_USD"},
		"auth": map[string]string{
			"method": "api_key",
			"KEY":    "xxxx",
			"SIGN":   "xxxx",
		},
	}

	msg, err := json.Marshal(req)
	if err != nil {
		log.Fatal("json marshal error:", err)
	}

	err = conn.WriteMessage(websocket.TextMessage, msg)
	if err != nil {
		log.Fatal("write error:", err)
	}

	_, resp, err := conn.ReadMessage()
	if err != nil {
		log.Fatal("read error:", err)
	}

	fmt.Println(string(resp))
}
```

The above command returns JSON structured like this:

```json
{
  "time": 1545459681,
  "time_ms": 1545459681123,
  "channel": "futures.liquidates",
  "event": "subscribe",
  "result": {
    "status": "success"
  }
}
```

**Subscribe for user liquidates update.**

### [#](#request-21) Request

- channel

  `futures.liquidates`

- event

  `subscribe`

* params

## [#](#liquidates-notification) Liquidates notification

```json
{
  "channel": "futures.liquidates",
  "event": "update",
  "time": 1541505434,
  "time_ms": 1541505434123,
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
      "contract": "BTC_USD",
      "user": "1040xxxx"
    }
  ]
}
```

**Notify liquidates update.**

### [#](#notify-10) Notify

- channel

  `futures.liquidates`

- event

  `update`

* params

## [#](#cancel-subscription-8) Cancel subscription

Code example

```python
import json, time
from websocket import create_connection

ws = create_connection("wss://fx-ws-testnet.gateio.ws/v4/ws/btc")
req = {
  "time": int(time.time()),
  "channel": "futures.liquidates",
  "event": "unsubscribe",
  "payload": ["20011", "BTC_USD"],
  "auth": {
    "method": "api_key",
    "KEY": "xxxx",
    "SIGN": "xxxx"
  }
}
ws.send(json.dumps(req))
print(ws.recv())
```

Code example

```go
package main

import (
	"encoding/json"
	"fmt"
	"log"
  "time"

	"github.com/gorilla/websocket"
)

func main() {
	url := "wss://fx-ws-testnet.gateio.ws/v4/ws/btc"
	conn, _, err := websocket.DefaultDialer.Dial(url, nil)
	if err != nil {
		log.Fatal("dial error:", err)
	}
	defer conn.Close()

	req := map[string]interface{}{
		"time":    time.Now().Unix(),
		"channel": "futures.liquidates",
		"event":   "unsubscribe",
		"payload": []interface{}{"20011", "BTC_USD"},
		"auth": map[string]string{
			"method": "api_key",
			"KEY":    "xxxx",
			"SIGN":   "xxxx",
		},
	}

	msg, err := json.Marshal(req)
	if err != nil {
		log.Fatal("json marshal error:", err)
	}

	err = conn.WriteMessage(websocket.TextMessage, msg)
	if err != nil {
		log.Fatal("write error:", err)
	}

	_, resp, err := conn.ReadMessage()
	if err != nil {
		log.Fatal("read error:", err)
	}

	fmt.Println(string(resp))
}
```

The above command returns JSON structured like this:

```json
{
  "time": 1545459681,
  "time_ms": 1545459681123,
  "channel": "futures.liquidates",
  "event": "unsubscribe",
  "result": {
    "status": "success"
  }
}
```

**Unsubscribe liquidates update.**

### [#](#request-22) Request

- channel

  `futures.liquidates`

- event

  `unsubscribe`

# [#](#auto-deleverages-api) Auto_deleverages API

**Provides a way to receive user auto deleverages info.**

WARNING

Authentication required.

## [#](#auto-deleverages-subscription) Auto_deleverages subscription

If you want to subscribe to auto deleverage updates in all contracts, use `!all`
in contract list.

Code example

```python
import json, time
from websocket import create_connection

ws = create_connection("wss://fx-ws-testnet.gateio.ws/v4/ws/btc")
req = {
  "time": int(time.time()),
  "channel": "futures.auto_deleverages",
  "event": "subscribe",
  "payload": ["20011", "BTC_USD"],
  "auth": {
    "method": "api_key",
    "KEY": "xxxx",
    "SIGN": "xxxx"
  }
}
ws.send(json.dumps(req))
print(ws.recv())
```

Code example

```go
package main

import (
	"encoding/json"
	"fmt"
	"log"
  "time"

	"github.com/gorilla/websocket"
)

func main() {
	url := "wss://fx-ws-testnet.gateio.ws/v4/ws/btc"
	conn, _, err := websocket.DefaultDialer.Dial(url, nil)
	if err != nil {
		log.Fatal("dial error:", err)
	}
	defer conn.Close()

	req := map[string]interface{}{
		"time":    time.Now().Unix(),
		"channel": "futures.auto_deleverages",
		"event":   "subscribe",
		"payload": []interface{}{"20011", "BTC_USD"},
		"auth": map[string]string{
			"method": "api_key",
			"KEY":    "xxxx",
			"SIGN":   "xxxx",
		},
	}

	msg, err := json.Marshal(req)
	if err != nil {
		log.Fatal("json marshal error:", err)
	}

	err = conn.WriteMessage(websocket.TextMessage, msg)
	if err != nil {
		log.Fatal("write error:", err)
	}

	_, resp, err := conn.ReadMessage()
	if err != nil {
		log.Fatal("read error:", err)
	}

	fmt.Println(string(resp))
}
```

The above command returns JSON structured like this:

```json
{
  "time": 1545459681,
  "time_ms": 1545459681123,
  "channel": "futures.auto_deleverages",
  "event": "subscribe",
  "result": {
    "status": "success"
  }
}
```

**Subscribe for user auto_deleverages update.**

### [#](#request-23) Request

- channel

  `futures.auto_deleverages`

- event

  `subscribe`

* params

## [#](#auto-deleverages-notification) Auto_deleverages notification

```json
{
  "channel": "futures.auto_deleverages",
  "event": "update",
  "time": 1541505434,
  "time_ms": 1541505434123,
  "result": [
    {
      "entry_price": 209,
      "fill_price": 215.1,
      "position_size": 10,
      "trade_size": 10,
      "time": 1541486601,
      "time_ms": 1541486601123,
      "contract": "BTC_USD",
      "user": "1040"
    }
  ]
}
```

**Notify auto_deleverages update.**

### [#](#notify-11) Notify

- channel

  `futures.auto_deleverages`

- event

  `update`

* params

## [#](#cancel-subscription-9) Cancel subscription

Code example

```python
import json, time
from websocket import create_connection

ws = create_connection("wss://fx-ws-testnet.gateio.ws/v4/ws/btc")
req = {
  "time": int(time.time()),
  "channel": "futures.auto_deleverages",
  "event": "unsubscribe",
  "payload": ["20011", "BTC_USD"],
  "auth": {
    "method": "api_key",
    "KEY": "xxxx",
    "SIGN": "xxxx"
  }
}
ws.send(json.dumps(req))
print(ws.recv())
```

Code example

```go
package main

import (
	"encoding/json"
	"fmt"
	"log"
  "time"

	"github.com/gorilla/websocket"
)

func main() {
	url := "wss://fx-ws-testnet.gateio.ws/v4/ws/btc"
	conn, _, err := websocket.DefaultDialer.Dial(url, nil)
	if err != nil {
		log.Fatal("dial error:", err)
	}
	defer conn.Close()

	req := map[string]interface{}{
		"time":    time.Now().Unix(),
		"channel": "futures.auto_deleverages",
		"event":   "unsubscribe",
		"payload": []interface{}{"20011", "BTC_USD"},
		"auth": map[string]string{
			"method": "api_key",
			"KEY":    "xxxx",
			"SIGN":   "xxxx",
		},
	}

	msg, err := json.Marshal(req)
	if err != nil {
		log.Fatal("json marshal error:", err)
	}

	err = conn.WriteMessage(websocket.TextMessage, msg)
	if err != nil {
		log.Fatal("write error:", err)
	}

	_, resp, err := conn.ReadMessage()
	if err != nil {
		log.Fatal("read error:", err)
	}

	fmt.Println(string(resp))
}
```

The above command returns JSON structured like this:

```json
{
  "time": 1545459681,
  "time_ms": 1545459681123,
  "channel": "futures.auto_deleverages",
  "event": "unsubscribe",
  "result": {
    "status": "success"
  }
}
```

**Unsubscribe auto_deleverages update.**

### [#](#request-24) Request

- channel

  `futures.auto_deleverages`

- event

  `unsubscribe`

# [#](#position-closes-api) Position_closes API

**Provides a way to receive user position closes info.**

WARNING

Authentication required.

## [#](#position-closes-subscription) Position_closes subscription

If you want to subscribe to position close updates in all contracts, use `!all`
in contract list.

Code example

```python
import json, time
from websocket import create_connection

ws = create_connection("wss://fx-ws-testnet.gateio.ws/v4/ws/btc")
req = {
  "time": int(time.time()),
  "channel": "futures.position_closes",
  "event": "subscribe",
  "payload": ["20011", "BTC_USD"],
  "auth": {
    "method": "api_key",
    "KEY": "xxxx",
    "SIGN": "xxxx"
  }
}
ws.send(json.dumps(req))
print(ws.recv())
```

Code example

```go
package main

import (
	"encoding/json"
	"fmt"
	"log"
  "time"

	"github.com/gorilla/websocket"
)

func main() {
	url := "wss://fx-ws-testnet.gateio.ws/v4/ws/btc"
	conn, _, err := websocket.DefaultDialer.Dial(url, nil)
	if err != nil {
		log.Fatal("dial error:", err)
	}
	defer conn.Close()

	req := map[string]interface{}{
		"time":    time.Now().Unix(),
		"channel": "futures.position_closes",
		"event":   "subscribe",
		"payload": []interface{}{"20011", "BTC_USD"},
		"auth": map[string]string{
			"method": "api_key",
			"KEY":    "xxxx",
			"SIGN":   "xxxx",
		},
	}

	msg, err := json.Marshal(req)
	if err != nil {
		log.Fatal("json marshal error:", err)
	}

	err = conn.WriteMessage(websocket.TextMessage, msg)
	if err != nil {
		log.Fatal("write error:", err)
	}

	_, resp, err := conn.ReadMessage()
	if err != nil {
		log.Fatal("read error:", err)
	}

	fmt.Println(string(resp))
}
```

The above command returns JSON structured like this:

```json
{
  "time": 1545459681,
  "time_ms": 1545459681123,
  "channel": "futures.position_closes",
  "event": "subscribe",
  "result": {
    "status": "success"
  }
}
```

**Subscribe for user position_closes update.**

### [#](#request-25) Request

- channel

  `futures.position_closes`

- event

  `subscribe`

* params

## [#](#position-closes-notification) Position_closes notification

```json
{
  "channel": "futures.position_closes",
  "event": "update",
  "time": 1541505434,
  "time_ms": 1541505434123,
  "result": [
    {
      "contract": "BTC_USD",
      "pnl": -0.000624354791,
      "side": "long",
      "text": "web",
      "time": 1547198562,
      "time_ms": 1547198562123,
      "user": "211xxxx"
    }
  ]
}
```

**Notify position_closes update.**

### [#](#notify-12) Notify

- channel

  `futures.position_closes`

- event

  `update`

* params

## [#](#cancel-subscription-10) Cancel subscription

Code example

```python
import json, time
from websocket import create_connection

ws = create_connection("wss://fx-ws-testnet.gateio.ws/v4/ws/btc")
req = {
    "time": int(time.time()),
    "channel": "futures.position_closes",
    "event": "unsubscribe",
    "payload": ["20011", "BTC_USD"],
    "auth": {
        "method": "api_key",
        "KEY": "xxxx",
        "SIGN": "xxxx"
    }
}
ws.send(json.dumps(req))
print(ws.recv())
```

Code example

```go
package main

import (
	"encoding/json"
	"fmt"
	"log"
  "time"

	"github.com/gorilla/websocket"
)

func main() {
	url := "wss://fx-ws-testnet.gateio.ws/v4/ws/btc"
	conn, _, err := websocket.DefaultDialer.Dial(url, nil)
	if err != nil {
		log.Fatal("dial error:", err)
	}
	defer conn.Close()

	req := map[string]interface{}{
		"time":    time.Now().Unix(),
		"channel": "futures.position_closes",
		"event":   "unsubscribe",
		"payload": []interface{}{"20011", "BTC_USD"},
		"auth": map[string]string{
			"method": "api_key",
			"KEY":    "xxxx",
			"SIGN":   "xxxx",
		},
	}

	msg, err := json.Marshal(req)
	if err != nil {
		log.Fatal("json marshal error:", err)
	}

	err = conn.WriteMessage(websocket.TextMessage, msg)
	if err != nil {
		log.Fatal("write error:", err)
	}

	_, resp, err := conn.ReadMessage()
	if err != nil {
		log.Fatal("read error:", err)
	}

	fmt.Println(string(resp))
}
```

The above command returns JSON structured like this:

```json
{
  "time": 1545459681,
  "time_ms": 1545459681123,
  "channel": "futures.position_closes",
  "event": "unsubscribe",
  "result": {
    "status": "success"
  }
}
```

**Unsubscribe position_closes update.**

### [#](#request-26) Request

- channel

  `futures.position_closes`

- event

  `unsubscribe`

# [#](#balances-api) Balances API

**Provides a way to receive user balances info.**

WARNING

Authentication required.

## [#](#balances-subscription) Balances subscription

Code example

```python
import json, time
from websocket import create_connection

ws = create_connection("wss://fx-ws-testnet.gateio.ws/v4/ws/btc")
req = {
    "time": int(time.time()),
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

Code example

```go
package main

import (
	"encoding/json"
	"fmt"
	"log"
  "time"

	"github.com/gorilla/websocket"
)

func main() {
	url := "wss://fx-ws-testnet.gateio.ws/v4/ws/btc"
	conn, _, err := websocket.DefaultDialer.Dial(url, nil)
	if err != nil {
		log.Fatal("dial error:", err)
	}
	defer conn.Close()

	req := map[string]interface{}{
		"time":    time.Now().Unix(),
		"channel": "futures.balances",
		"event":   "subscribe",
		"payload": []interface{}{"20011"},
		"auth": map[string]string{
			"method": "api_key",
			"KEY":    "xxxx",
			"SIGN":   "xxxx",
		},
	}

	msg, err := json.Marshal(req)
	if err != nil {
		log.Fatal("json marshal error:", err)
	}

	err = conn.WriteMessage(websocket.TextMessage, msg)
	if err != nil {
		log.Fatal("write error:", err)
	}

	_, resp, err := conn.ReadMessage()
	if err != nil {
		log.Fatal("read error:", err)
	}

	fmt.Println(string(resp))
}
```

The above command returns JSON structured like this:

```json
{
  "time": 1545459681,
  "time_ms": 1545459681123,
  "channel": "futures.balances",
  "event": "subscribe",
  "result": {
    "status": "success"
  }
}
```

**Subscribe for user balances update.**

### [#](#request-27) Request

- channel

  `futures.balances`

- event

  `subscribe`

* params

## [#](#balances-notification) balances notification

```json
{
  "channel": "futures.balances",
  "event": "update",
  "time": 1541505434,
  "time_ms": 1541505434123,
  "result": [
    {
      "balance": 9.998739899488,
      "change": -0.000002074115,
      "text": "BTC_USD:3914424",
      "time": 1547199246,
      "time_ms": 1547199246123,
      "type": "fee",
      "user": "211xxx",
      "currency": "btc"
    }
  ]
}
```

**Notify balances update.**

### [#](#notify-13) Notify

- channel

  `futures.balances`

- event

  `update`

* params

## [#](#cancel-subscription-11) Cancel subscription

Code example

```python
import json, time
from websocket import create_connection

ws = create_connection("wss://fx-ws-testnet.gateio.ws/v4/ws/btc")
req = {
    "time": int(time.time()),
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

Code example

```go
package main

import (
	"encoding/json"
	"fmt"
	"log"
  "time"

	"github.com/gorilla/websocket"
)

func main() {
	url := "wss://fx-ws-testnet.gateio.ws/v4/ws/btc"
	conn, _, err := websocket.DefaultDialer.Dial(url, nil)
	if err != nil {
		log.Fatal("dial error:", err)
	}
	defer conn.Close()

	req := map[string]interface{}{
		"time":    time.Now().Unix(),
		"channel": "futures.balances",
		"event":   "unsubscribe",
		"payload": []interface{}{"20011"},
		"auth": map[string]string{
			"method": "api_key",
			"KEY":    "xxxx",
			"SIGN":   "xxxx",
		},
	}

	msg, err := json.Marshal(req)
	if err != nil {
		log.Fatal("json marshal error:", err)
	}

	err = conn.WriteMessage(websocket.TextMessage, msg)
	if err != nil {
		log.Fatal("write error:", err)
	}

	_, resp, err := conn.ReadMessage()
	if err != nil {
		log.Fatal("read error:", err)
	}

	fmt.Println(string(resp))
}
```

The above command returns JSON structured like this:

```json
{
  "time": 1545459681,
  "time_ms": 1545459681123,
  "channel": "futures.balances",
  "event": "unsubscribe",
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

If you want to subscribe to reduce risk limit updates in all contracts, use
`!all` in contract list.

Code example

```python
import json, time
from websocket import create_connection

ws = create_connection("wss://fx-ws-testnet.gateio.ws/v4/ws/btc")
req = {
    "time": int(time.time()),
    "channel": "futures.reduce_risk_limits",
    "event": "subscribe",
    "payload": ["20011", "BTC_USD"],
    "auth": {
        "method": "api_key",
        "KEY": "xxxx",
        "SIGN": "xxxx"
    }
}
ws.send(json.dumps(req))
print(ws.recv())
```

Code example

```go
package main

import (
	"encoding/json"
	"fmt"
	"log"
  "time"

	"github.com/gorilla/websocket"
)

func main() {
	url := "wss://fx-ws-testnet.gateio.ws/v4/ws/btc"
	conn, _, err := websocket.DefaultDialer.Dial(url, nil)
	if err != nil {
		log.Fatal("dial error:", err)
	}
	defer conn.Close()

	req := map[string]interface{}{
		"time":    time.Now().Unix(),
		"channel": "futures.reduce_risk_limits",
		"event":   "subscribe",
		"payload": []interface{}{"20011", "BTC_USD"},
		"auth": map[string]string{
			"method": "api_key",
			"KEY":    "xxxx", // replace with your API key
			"SIGN":   "xxxx", // replace with your generated signature
		},
	}

	msg, err := json.Marshal(req)
	if err != nil {
		log.Fatal("json marshal error:", err)
	}

	err = conn.WriteMessage(websocket.TextMessage, msg)
	if err != nil {
		log.Fatal("write error:", err)
	}

	_, resp, err := conn.ReadMessage()
	if err != nil {
		log.Fatal("read error:", err)
	}

	fmt.Println(string(resp))
}
```

The above command returns JSON structured like this:

```json
{
  "time": 1545459681,
  "time_ms": 1545459681123,
  "channel": "futures.reduce_risk_limits",
  "event": "subscribe",
  "result": {
    "status": "success"
  }
}
```

**Subscribe for user reduce_risk_limits update.**

### [#](#request-28) Request

- channel

  `futures.reduce_risk_limits`

- event

  `subscribe`

* params

## [#](#reduce-risk-limits-notification) Reduce_risk_limits notification

```json
{
  "time": 1551858330,
  "time_ms": 1551858330123,
  "channel": "futures.reduce_risk_limits",
  "event": "update",
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

### [#](#notify-14) Notify

- channel

  `futures.reduce_risk_limits`

- event

  `update`

* params

## [#](#cancel-subscription-12) Cancel subscription

Code example

```python
import json, time
from websocket import create_connection

ws = create_connection("wss://fx-ws-testnet.gateio.ws/v4/ws/btc")
req = {
    "time": int(time.time()),
    "channel": "futures.reduce_risk_limits",
    "event": "unsubscribe",
    "payload": ["20011", "BTC_USD"],
    "auth": {
        "method": "api_key",
        "KEY": "xxxx",
        "SIGN": "xxxx"
    }
}
ws.send(json.dumps(req))
print(ws.recv())
```

Code example

```go
package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"log"
  "time"
	"github.com/gorilla/websocket"
)

func main() {
	url := "wss://fx-ws-testnet.gateio.ws/v4/ws/btc"
	conn, _, err := websocket.DefaultDialer.Dial(url, nil)
	if err != nil {
		log.Fatal("Dial error:", err)
	}
	defer conn.Close()

	req := map[string]interface{}{
		"time":    time.Now().Unix(),
		"channel": "futures.reduce_risk_limits",
		"event":   "unsubscribe",
		"payload": []string{"20011", "BTC_USD"},
		"auth": map[string]string{
			"method": "api_key",
			"KEY":    "xxxx",
			"SIGN":   "xxxx",
		},
	}

	reqBytes, err := json.Marshal(req)
	if err != nil {
		log.Fatal("JSON Marshal error:", err)
	}

	err = conn.WriteMessage(websocket.TextMessage, reqBytes)
	if err != nil {
		log.Fatal("Write error:", err)
	}

	_, msg, err := conn.ReadMessage()
	if err != nil {
		log.Fatal("Read error:", err)
	}
	fmt.Println(string(msg))
}
```

**Unsubscribe reduce risk limits update.**

### [#](#request-29) Request

- channel

  `futures.reduce_risk_limits`

- event

  `unsubscribe`

# [#](#positions-api) Positions API

**Provides a way to receive user positions info.**

WARNING

Authentication required.

## [#](#positions-subscription) Positions subscription

If you want to subscribe to position updates in all contracts, use `!all` in
contract list.

Code example

```python
import json, time
from websocket import create_connection

ws = create_connection("wss://fx-ws-testnet.gateio.ws/v4/ws/btc")
req = {
    "time": int(time.time()),
    "channel": "futures.positions",
    "event": "subscribe",
    "payload": ["20011", "BTC_USD"],
    "auth": {
        "method": "api_key",
        "KEY": "xxxx",
        "SIGN": "xxxx"
    }
}
ws.send(json.dumps(req))
print(ws.recv())
```

Code example

```go
package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"log"
  "time"
	"github.com/gorilla/websocket"
)

func main() {
	url := "wss://fx-ws-testnet.gateio.ws/v4/ws/btc"
	conn, _, err := websocket.DefaultDialer.Dial(url, nil)
	if err != nil {
		log.Fatal("Dial error:", err)
	}
	defer conn.Close()

	req := map[string]interface{}{
		"time":    time.Now().Unix(),
		"channel": "futures.positions",
		"event":   "subscribe",
		"payload": []string{"20011", "BTC_USD"},
		"auth": map[string]string{
			"method": "api_key",
			"KEY":    "xxxx",
			"SIGN":   "xxxx",
		},
	}

	reqBytes, err := json.Marshal(req)
	if err != nil {
		log.Fatal("JSON Marshal error:", err)
	}

	err = conn.WriteMessage(websocket.TextMessage, reqBytes)
	if err != nil {
		log.Fatal("Write error:", err)
	}

	_, msg, err := conn.ReadMessage()
	if err != nil {
		log.Fatal("Read error:", err)
	}
	fmt.Println(string(msg))
}
```

The above command returns JSON structured like this:

```json
{
  "time": 1545459681,
  "time_ms": 1545459681123,
  "channel": "futures.positions",
  "event": "subscribe",
  "result": {
    "status": "success"
  }
}
```

**Subscribe for user positions update.**

### [#](#request-30) Request

- channel

  `futures.positions`

- event

  `subscribe`

* params

## [#](#positions-notification) Positions notification

```json
{
  "time": 1588212926,
  "time_ms": 1588212926123,
  "channel": "futures.positions",
  "event": "update",
  "result": [
    {
      "contract": "BTC_USD",
      "cross_leverage_limit": 0,
      "entry_price": 40000.36666661111,
      "history_pnl": -0.000108569505,
      "history_point": 0,
      "last_close_pnl": -0.000050123368,
      "leverage": 0,
      "leverage_max": 100,
      "liq_price": 0.1,
      "maintenance_rate": 0.005,
      "margin": 49.999890611186,
      "mode": "single",
      "realised_pnl": -1.25e-8,
      "realised_point": 0,
      "risk_limit": 100,
      "size": 3,
      "time": 1628736848,
      "time_ms": 1628736848321,
      "user": "110xxxxx",
      "update_id": 170919
    }
  ]
}
```

**Notify positions update.**

### [#](#notify-15) Notify

- channel

  `futures.positions`

- event

  `update`

* params

## [#](#cancel-subscription-13) Cancel subscription

Code example

```python
import json, time
from websocket import create_connection

ws = create_connection("wss://fx-ws-testnet.gateio.ws/v4/ws/btc")
req = {
    "time": int(time.time()),
    "channel": "futures.positions",
    "event": "unsubscribe",
    "payload": ["20011", "BTC_USD"],
    "auth": {
        "method": "api_key",
        "KEY": "xxxx",
        "SIGN": "xxxx"
    }
}
ws.send(json.dumps(req))
print(ws.recv())
```

Code example

```go
package main

import (
	"encoding/json"
	"fmt"
	"log"
  "time"
	"github.com/gorilla/websocket"
)

func main() {
	url := "wss://fx-ws-testnet.gateio.ws/v4/ws/btc"
	conn, _, err := websocket.DefaultDialer.Dial(url, nil)
	if err != nil {
		log.Fatal(err)
	}
	defer conn.Close()

	req := map[string]interface{}{
		"time":    time.Now().Unix(),
		"channel": "futures.positions",
		"event":   "unsubscribe",
		"payload": []string{"20011", "BTC_USD"},
		"auth": map[string]string{
			"method": "api_key",
			"KEY":    "xxxx",
			"SIGN":   "xxxx",
		},
	}

	reqBytes, err := json.Marshal(req)
	if err != nil {
		log.Fatal(err)
	}

	err = conn.WriteMessage(websocket.TextMessage, reqBytes)
	if err != nil {
		log.Fatal(err)
	}

	_, msg, err := conn.ReadMessage()
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println(string(msg))
}
```

The above command returns JSON structured like this:

```json
{
  "time": 1545459681,
  "time_ms": 1545459681123,
  "channel": "futures.positions",
  "event": "unsubscribe",
  "result": {
    "status": "success"
  }
}
```

**Unsubscribe positions update.**

### [#](#request-31) Request

- channel

  `futures.positions`

- event

  `unsubscribe`

# [#](#auto-orders-api) Auto orders API

**Provides a way to receive user auto orders info.**

WARNING

Authentication required.

## [#](#auto-orders-subscription) Auto orders subscription

If you want to subscribe to auto order updates in all contracts, use `!all` in
contract list.

Code example

```python
import json, time
from websocket import create_connection

ws = create_connection("wss://fx-ws-testnet.gateio.ws/v4/ws/btc")
req = {
    "time": int(time.time()),
    "channel": "futures.autoorders",
    "event": "subscribe",
    "payload": ["20011", "BTC_USD"],
    "auth": {
        "method": "api_key",
        "KEY": "xxxx",
        "SIGN": "xxxx"
    }
}
ws.send(json.dumps(req))
print(ws.recv())
```

Code example

```go
package main

import (
	"encoding/json"
	"fmt"
	"log"
  "time"
	"github.com/gorilla/websocket"
)

func main() {
	url := "wss://fx-ws-testnet.gateio.ws/v4/ws/btc"
	conn, _, err := websocket.DefaultDialer.Dial(url, nil)
	if err != nil {
		log.Fatal(err)
	}
	defer conn.Close()

	req := map[string]interface{}{
		"time":    time.Now().Unix(),
		"channel": "futures.autoorders",
		"event":   "subscribe",
		"payload": []string{"20011", "BTC_USD"},
		"auth": map[string]string{
			"method": "api_key",
			"KEY":    "xxxx",
			"SIGN":   "xxxx",
		},
	}

	reqBytes, err := json.Marshal(req)
	if err != nil {
		log.Fatal(err)
	}

	err = conn.WriteMessage(websocket.TextMessage, reqBytes)
	if err != nil {
		log.Fatal(err)
	}

	_, msg, err := conn.ReadMessage()
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println(string(msg))
}
```

The above command returns JSON structured like this:

```json
{
  "time": 1545459681,
  "time_ms": 1545459681123,
  "channel": "futures.autoorders",
  "event": "subscribe",
  "result": {
    "status": "success"
  }
}
```

**Subscribe for user auto orders update.**

### [#](#request-32) Request

- channel

  `futures.autoorders`

- event

  `subscribe`

* params

## [#](#auto-orders-notification) Auto orders notification

```json
{
  "time": 1596798126,
  "time_ms": 1596798126123,
  "channel": "futures.autoorders",
  "event": "update",
  "result": [
    {
      "user": 123456,
      "trigger": {
        "strategy_type": 0,
        "price_type": 0,
        "price": "10000",
        "rule": 2,
        "expiration": 86400
      },
      "initial": {
        "contract": "BTC_USDT",
        "size": 10,
        "price": "10000",
        "tif": "gtc",
        "text": "web",
        "iceberg": 0,
        "is_close": false,
        "is_reduce_only": false,
        "auto_size": ""
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
      },
      "order_type": "close-long-order",
      "me_order_id": "213867453823"
    }
  ]
}
```

**Notify auto orders update.**

### [#](#notify-16) Notify

- channel

  `futures.autoorders`

- event

  `update`

* params

## [#](#cancel-subscription-14) Cancel subscription

Code example

```python
import json, time
from websocket import create_connection

ws = create_connection("wss://fx-ws-testnet.gateio.ws/v4/ws/btc")
req = {
    "time": int(time.time()),
    "channel": "futures.autoorders",
    "event": "unsubscribe",
    "payload": ["20011", "BTC_USD"],
    "auth": {
        "method": "api_key",
        "KEY": "xxxx",
        "SIGN": "xxxx"
    }}
ws.send(json.dumps(req))
print(ws.recv())
```

Code example

```go
package main

import (
	"encoding/json"
	"fmt"
	"log"
  "time"
	"github.com/gorilla/websocket"
)

func main() {
	url := "wss://fx-ws-testnet.gateio.ws/v4/ws/btc"
	conn, _, err := websocket.DefaultDialer.Dial(url, nil)
	if err != nil {
		log.Fatal(err)
	}
	defer conn.Close()

	req := map[string]interface{}{
		"time":     time.Now().Unix(),
		"channel": "futures.autoorders",
		"event":   "unsubscribe",
		"payload": []string{"20011", "BTC_USD"},
		"auth": map[string]string{
			"method": "api_key",
			"KEY":    "xxxx",
			"SIGN":   "xxxx",
		},
	}

	reqBytes, err := json.Marshal(req)
	if err != nil {
		log.Fatal(err)
	}

	err = conn.WriteMessage(websocket.TextMessage, reqBytes)
	if err != nil {
		log.Fatal(err)
	}

	_, msg, err := conn.ReadMessage()
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println(string(msg))
}
```

The above command returns JSON structured like this:

```json
{
  "time": 1545459681,
  "time_ms": 1545459681123,
  "channel": "futures.autoorders",
  "event": "unsubscribe",
  "result": {
    "status": "success"
  }
}
```

**Unsubscribe auto orders update.**

### [#](#request-33) Request

- channel

  `futures.autoorders`

- event

  `unsubscribe`

# [#](#futures-account-trade) Futures Account Trade

## [#](#websocket-api) Websocket API

WebSocket API allows placing , canceling , amending , querying orders through a
WebSocket connection.

### [#](#websocket-api-client-api-request) Websocket API Client Api Request

Code example

```python
#!/usr/bin/python

import time
import json
import hmac
import hashlib
import websocket
import threading


API_KEY = "xxxxx"
SECRET = "xxxxx"
WS_URL = "wss://fx-ws.gateio.ws/v4/ws/usdt"
CHANNEL_LOGIN = "futures.login"
CHANNEL_ORDER_PLACE = "futures.order_place"

def get_ts():
    return int(time.time())

def get_ts_ms():
    return int(time.time() * 1000)

def get_signature(secret, channel, request_param_bytes, ts):
    key = f"api\n{channel}\n{request_param_bytes.decode()}\n{ts}"
    return hmac.new(secret.encode(), key.encode(), hashlib.sha512).hexdigest()

def build_login_request():
    ts = get_ts()
    req_id = f"{get_ts_ms()}-1"
    request_param = b""

    sign = get_signature(SECRET, CHANNEL_LOGIN, request_param, ts)

    payload = {
        "api_key": API_KEY,
        "signature": sign,
        "timestamp": str(ts),
        "req_id": req_id
    }

    return {
        "time": ts,
        "channel": CHANNEL_LOGIN,
        "event": "api",
        "payload": payload
    }

def build_order_request():
    ts = get_ts()
    req_id = f"{get_ts_ms()}-2"
    order_param = {
        "contract": "BTC_USDT",
        "size": 6024,
        "iceberg": 0,
        "price": "3765",
        "tif": "gtc",
        "text": "t-my-custom-id",
        "stp_act": "-"
    }

    payload = {
        "req_id": req_id,
        "req_param": order_param
    }

    return {
        "time": ts,
        "channel": CHANNEL_ORDER_PLACE,
        "event": "api",
        "payload": payload
    }

def on_message(ws, message):
    print(f"recv: {message}")

def on_error(ws, error):
    print(f"error: {error}")

def on_close(ws, close_status_code, close_msg):
    print("connection closed")

def on_open(ws):
    print("WebSocket opened")

    login_payload = build_login_request()
    print("login payload:", login_payload)
    ws.send(json.dumps(login_payload))

    def delayed_order():
        time.sleep(2)
        order_payload = build_order_request()
        print("order payload:", order_payload)
        ws.send(json.dumps(order_payload))

    threading.Thread(target=delayed_order).start()

if __name__ == "__main__":
    ws = websocket.WebSocketApp(
        WS_URL,
        on_message=on_message,
        on_error=on_error,
        on_close=on_close,
        on_open=on_open
    )
    ws.run_forever()
```

Code example

```go
package main

import (
	"crypto/hmac"
	"crypto/sha512"
	"crypto/tls"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"net/url"
	"strconv"
	"time"

	"github.com/gorilla/websocket"
)

func GetApiSignature(secret, channel string, requestParam []byte, ts int64) string {
	hash := hmac.New(sha512.New, []byte(secret))
	key := fmt.Sprintf("%s\n%s\n%s\n%d", "api", channel, string(requestParam), ts)
	hash.Write([]byte(key))
	return hex.EncodeToString(hash.Sum(nil))
}

func main() {

	// 1. login
	apiKey := "xxxxx"
	secret := "xxxxx"
	requestParam := ""
	channel := "futures.login"
	ts := time.Now().Unix()
	requestId := fmt.Sprintf("%d-%d", time.Now().UnixMilli(), 1)

	req := ApiRequest{
		Time:    ts,
		Channel: "futures.login",
		Event:   "api",
		Payload: ApiPayload{
			ApiKey:       apiKey,
			Signature:    GetApiSignature(secret, channel, []byte(requestParam), ts),
			Timestamp:    strconv.FormatInt(ts, 10),
			RequestId:    requestId,
			RequestParam: []byte(requestParam),
		},
	}

	fmt.Println(GetApiSignature(secret, channel, []byte(requestParam), ts))
	marshal, _ := json.Marshal(req)
	fmt.Println(string(marshal))

	// connect the ws
	u := url.URL{Scheme: "wss", Host: "fx-ws.gateio.ws", Path: "/v4/ws/usdt"}
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

	err = c.WriteMessage(websocket.TextMessage, marshal)
	if err != nil {
		panic(err)
	}
	time.Sleep(2 * time.Second)

	//ws create an order
	orderParam := OrderParam{
		Contract: "BTC_USDT",
		Size:     6024,
		Iceberg:  0,
		Price:    "3765",
		Tif:      "gtc",
		Text:     "t-my-custom-id",
		StpAct:   false,
	}
	orderParamBytes, _ := json.Marshal(orderParam)

	order_place := ApiRequest{
		Time:    ts,
		Channel: "futures.order_place",
		Event:   "api",
		Payload: ApiPayload{
			RequestId:    requestId,
			RequestParam: []byte(orderParamBytes),
		},
	}
	orderReqByte, _ := json.Marshal(order_place)
	err = c.WriteMessage(websocket.TextMessage, orderReqByte)

	if err != nil {
		panic(err)
	}

	select {}
}

type ApiRequest struct {
	App     string     `json:"app,omitempty"`
	Time    int64      `json:"time"`
	Id      *int64     `json:"id,omitempty"`
	Channel string     `json:"channel"`
	Event   string     `json:"event"`
	Payload ApiPayload `json:"payload"`
}
type ApiPayload struct {
	ApiKey       string          `json:"api_key,omitempty"`
	Signature    string          `json:"signature,omitempty"`
	Timestamp    string          `json:"timestamp,omitempty"`
	RequestId    string          `json:"req_id,omitempty"`
	RequestParam json.RawMessage `json:"req_param,omitempty"`
}

type OrderParam struct {
	Contract   string `json:"contract"`
	Size       int64  `json:"size,omitempty"`
	Iceberg    int64  `json:"iceberg,omitempty"`
	Price      string `json:"price,omitempty"`
	Close      bool   `json:"close,omitempty"`
	ReduceOnly bool   `json:"reduce_only,omitempty"`
	Tif        string `json:"tif,omitempty"`
	Text       string `json:"text,omitempty"`
	AutoSize   string `json:"auto_size,omitempty"`
	StpAct     bool   `json:"stp_act,omitempty"`
}
```

Client request example

```json
{
  "time": 1680772890,
  "channel": "futures.order_place",
  "event": "api",
  "payload": {
    "req_id": "xxxx",
    "req_param": {
      "contract": "BTC_USDT",
      "size": 10,
      "price": "80048.240000",
      "tif": "gtc",
      "text": "t-my-custom-id"
    }
  }
}
```

`api` requests initiated from the client follow a common JSON format, which
contains the following fields:

Note that the type of `payload.req_param` is channel specific, Take
`futures.order_place` for example, `payload.req_param` same as apiv4
[/futures/{settle}/orders (opens new window)](https://www.gate.io/docs/developers/apiv4/en/#create-a-futures-order).
You can place a limit order for BTC_USDT with example.

### [#](#websocket-api-server-response) Websocket API Server Response

Server ack response example

```json
{
  "request_id": "request-id-1",
  "ack": true,
  "header": {
    "response_time": "1681195121499",
    "status": "200",
    "channel": "futures.order_place",
    "event": "api",
    "client_id": "::1-0x140031563c0",
    "x_in_time": 1681985856667508,
    "x_out_time": 1681985856667598,
    "conn_id": "5e74253e9c793974",
    "conn_trace_id": "1bde5aaa0acf2f5f48edfd4392e1fa68",
    "trace_id": "e410abb5f74b4afc519e67920548838d",
    "x_gate_ratelimit_requests_remain": 99,
    "x_gate_ratelimit_limit": 100,
    "x_gate_ratelimit_reset_timestamp": 1681195121499
  },
  "data": {
    "result": {
      "req_id": "request-id-1",
      "req_param": {
        "contract": "BTC_USDT",
        "size": 10,
        "price": "31503.280000",
        "tif": "gtc",
        "text": "t-my-custom-id"
      }
    }
  }
}
```

Server api response example

```json
{
  "request_id": "request-id-1",
  "ack": false,
  "header": {
    "response_time": "1681195121639",
    "status": "200",
    "channel": "futures.order_place",
    "event": "api",
    "client_id": "::1-0x140031563c0",
    "x_in_time": 1681985856667508,
    "x_out_time": 1681985856667598,
    "conn_id": "5e74253e9c793974",
    "conn_trace_id": "1bde5aaa0acf2f5f48edfd4392e1fa68",
    "trace_id": "e410abb5f74b4afc519e67920548838d",
    "x_gate_ratelimit_requests_remain": 99,
    "x_gate_ratelimit_limit": 100,
    "x_gate_ratelimit_reset_timestamp": 1681195121639
  },
  "data": {
    "result": {
      "id": 74046511,
      "user": 6790020,
      "create_time": 1681195121.754,
      "finish_time": 1681195121.754,
      "finish_as": "filled",
      "status": "finished",
      "contract": "BTC_USDT",
      "size": 10,
      "price": "31503.3",
      "tif": "gtc",
      "fill_price": "31500",
      "text": "t-my-custom-id",
      "tkfr": "0.0003",
      "mkfr": "0",
      "stp_id": 2,
      "stp_act": "cn",
      "amend_text": "-"
    }
  }
}
```

Server response includes ack response to client requests and api result callback
message updates. Server responses follow a common JSON format, which contains
the following fields:

### [#](#error-2) Error

Error Response Notification example

```json
{
  "request_id": "request-id-1",
  "ack": false,
  "header": {
    "response_time": "1681195360034",
    "status": "401",
    "channel": "futures.login",
    "event": "api",
    "client_id": "::1-0x140001a2600",
    "x_in_time": 1681985856667508,
    "x_out_time": 1681985856667598,
    "conn_id": "5e74253e9c793974",
    "conn_trace_id": "1bde5aaa0acf2f5f48edfd4392e1fa68",
    "trace_id": "e410abb5f74b4afc519e67920548838d"
  },
  "data": {
    "errs": {
      "label": "INVALID_KEY",
      "message": "Invalid key provided"
    }
  }
}
```

Error Response Notification example（rate limit）

```json
{
  "request_id": "xxxx",
  "header": {
    "response_time": "1677816784084",
    "status": "429",
    "channel": "futures.order_place",
    "event": "api",
    "client_id": "::1-0x14002ba2300",
    "x_in_time": 1681985856667508,
    "x_out_time": 1681985856667598,
    "conn_id": "5e74253e9c793974",
    "conn_trace_id": "1bde5aaa0acf2f5f48edfd4392e1fa68",
    "trace_id": "e410abb5f74b4afc519e67920548838d",
    "x_gate_ratelimit_limit": 100,
    "x_gate_ratelimit_reset_timestamp": 1677816785084
  },
  "data": {
    "errs": {
      "label": "TOO_MANY_REQUESTS",
      "message": "Request Rate limit Exceeded (311)"
    }
  }
}
```

Error object has the following format:

Explanation of rate limit-related error codes:

## [#](#login) Login

WARNING

Note: the GateAPIv4 key pair you used MUST have future Corresponding
permissions(eg: order-place channel must have future write permissions), and
your outbound IP address must be in the key's IP whitelist if its whitelist is
enabled.

### [#](#login-request) Login Request

Client Api Request

Code example

```python
import hmac
import hashlib
import json
import time
import websocket
import ssl

def get_api_signature(secret, channel, request_param, ts):
    key = f"api\n{channel}\n{request_param}\n{ts}"
    hash_object = hmac.new(secret.encode(), key.encode(), hashlib.sha512)
    return hash_object.hexdigest()

class ApiPayload:
    def __init__(self, api_key, signature, timestamp, req_id, request_param):
        self.api_key = api_key
        self.signature = signature
        self.timestamp = timestamp
        self.req_id = req_id
        self.request_param = request_param

class ApiRequest:
    def __init__(self, ts, channel, event, payload):
        self.time = ts
        self.channel = channel
        self.event = event
        self.payload = payload

def main():
    api_key = "YOUR_API_KEY"
    secret = "YOUR_API_SECRET"
    request_param = ""
    channel = "futures.login"
    ts = int(time.time())
    request_id = f"{int(time.time() * 1000)}-1"

    payload = ApiPayload(
        api_key=api_key,
        signature=get_api_signature(secret, channel, request_param, ts),
        timestamp=str(ts),
        req_id=request_id,
        request_param=request_param
    )

    req = ApiRequest(ts=ts, channel=channel, event="api", payload=payload)

    print(get_api_signature(secret, channel, request_param, ts))

    req_json = json.dumps(req, default=lambda o: o.__dict__)
    print(req_json)

    # Connect to WebSocket
    ws_url = "wss://fx-ws.gateio.ws/v4/ws/usdt"  # Replace with your WebSocket URL
    websocket.enableTrace(False)
    ws = websocket.create_connection(ws_url, sslopt={"cert_reqs": ssl.CERT_NONE})

    # Function to receive messages
    def recv_messages():
        while True:
            try:
                message = ws.recv()
                print(f"recv: {message}")
            except Exception as e:
                print(f"Error receiving message: {e}")
                ws.close()
                break

    # Start receiving messages in a separate thread
    import threading
    receive_thread = threading.Thread(target=recv_messages)
    receive_thread.start()

    # Send the request
    ws.send(req_json)

    # Keep the main thread running
    receive_thread.join()

if __name__ == "__main__":
    main()
```

Code example

```go
package main

import (
	"crypto/hmac"
	"crypto/sha512"
	"crypto/tls"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"github.com/gorilla/websocket"
	"net/url"
	"strconv"
	"time"
)

func GetApiSignature(secret, channel string, requestParam []byte, ts int64) string {
	hash := hmac.New(sha512.New, []byte(secret))
	key := fmt.Sprintf("%s\n%s\n%s\n%d", "api", channel, string(requestParam), ts)
	hash.Write([]byte(key))
	return hex.EncodeToString(hash.Sum(nil))
}

// example WebSocket signature calculation implementation in go
func main() {
	apiKey := "YOUR_API_KEY"
	secret := "YOUR_API_SECRET"
	requestParam := ""
	channel := "futures.login"
	ts := time.Now().Unix()
	requestId := fmt.Sprintf("%d-%d", time.Now().UnixMilli(), 1)

	req := ApiRequest{
		Time:    ts,
		Channel: channel,
		Event:   "api",
		Payload: ApiPayload{
			ApiKey:       apiKey,
			Signature:    GetApiSignature(secret, channel, []byte(requestParam), ts),
			Timestamp:    strconv.FormatInt(ts, 10),
			RequestId:    requestId,
			RequestParam: []byte(requestParam),
		},
	}

	fmt.Println(GetApiSignature(secret, channel, []byte(requestParam), ts))

	marshal, _ := json.Marshal(req)
	fmt.Println(string(marshal))

	// connect the ws
	u := url.URL{Scheme: "wss", Host: "fx-ws.gateio.ws", Path: "/v4/ws/usdt"}
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

	err = c.WriteMessage(websocket.TextMessage, marshal)
	if err != nil {
		panic(err)
	}

	select {}
}

type ApiRequest struct {
	App     string     `json:"app,omitempty"`
	Time    int64      `json:"time"`
	Id      *int64     `json:"id,omitempty"`
	Channel string     `json:"channel"`
	Event   string     `json:"event"`
	Payload ApiPayload `json:"payload"`
}
type ApiPayload struct {
	ApiKey       string          `json:"api_key,omitempty"`
	Signature    string          `json:"signature,omitempty"`
	Timestamp    string          `json:"timestamp,omitempty"`
	RequestId    string          `json:"req_id,omitempty"`
	RequestParam json.RawMessage `json:"req_param,omitempty"`
}
```

Request example

```json
{
  "time": 1681984544,
  "channel": "futures.login",
  "event": "api",
  "payload": {
    "api_key": "ea83fad2604399da16bf97e6eea772a6",
    "signature": "6fa3824c8141f2b2283108558ec50966d7caf749bf04a3b604652325b50b47d2343d569d848373d58e65c49d9622ba2e73dc25797abef11c9f20c07da741591e",
    "timestamp": "1681984544",
    "req_id": "request-1"
  }
}
```

Payload format:

WebSocket api operation authentication uses the same signature calculation
method with Gate APIv4 API, i.e.,
`HexEncode(HMAC_SHA512(secret, signature_string))`, but has the following
differences:

1.  Signature string concatenation method:
    `"<event>\n<channel>\n<req_param>\n<timestamp>"`, where `<event>`,
    `<channel>`,`<req_param>`, `<timestamp>` are corresponding request
    information
2.  `req_param` in `login` channel always empty string
3.  Authentication information are sent in request body in field `payload`.

### [#](#login-notification) Login Notification

Login Response example

```json
{
  "request_id": "request-1",
  "header": {
    "response_time": "1681985856666",
    "status": "200",
    "channel": "futures.login",
    "event": "api",
    "clientId": "",
    "x_in_time": 1681985856667508,
    "x_out_time": 1681985856667598,
    "conn_id": "5e74253e9c793974",
    "conn_trace_id": "1bde5aaa0acf2f5f48edfd4392e1fa68",
    "trace_id": "e410abb5f74b4afc519e67920548838d"
  },
  "data": {
    "result": {
      "api_key": "ea83fad2604399da16bf97e6eea772a6",
      "uid": "110284739"
    }
  }
}
```

Result format:

## [#](#order-place) Order Place

`futures.order_place`

You can place orders with this channel and event `api`.

**function as api below:**

```json
POST /futures/{settle}/orders
```

### [#](#order-place-request) Order Place Request

Code example: Login is required before making requests

```python
import time
import json

# pip install websocket_client
from websocket import create_connection

api_order = {
      "contract": "BTC_USDT",
      "size": 10,
      "price": "31503.280000",
      "tif": "gtc",
      "text": "t-my-custom-id"
    }

ws = create_connection("wss://fx-ws.gateio.ws/v4/ws/usdt")
ws.send(json.dumps(
    {"time": int(time.time()),
    "channel": "futures.order_place",
    "event": "api",
    "payload": {
        "req_id": "1ewq-3123w-5",
        "req_param": api_order
    }}
))

print(ws.recv())
```

Code example: Login is required before making requests

```go
package main

import (
    "crypto/hmac"
    "crypto/sha512"
    "crypto/tls"
    "encoding/hex"
    "encoding/json"
    "fmt"
    "github.com/gorilla/websocket"
    "net/url"
    "strconv"
    "time"
)

func main() {

	// warn: you should login first before order

	// connect the ws
	u := url.URL{Scheme: "ws", Host: "xx.xx.xxx.xx:xxx", Path: "xxx"}
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

	err = c.WriteMessage(websocket.TextMessage, marshal)

	//ws create an order
	orderParam := orderParam{
		Contract: "BTC_USDT",
		size:     6024,
		Iceberg:  0,
		Price:    "3765",
		Tif:      "gtc",
		Text:     "t-my-custom-id",
		Stp_act:  "-",
	}
	orderParamBytes, _ := json.Marshal(orderParam)
	requestId := fmt.Sprintf("%d-%d", time.Now().UnixMilli(), 1)
	order_place := ApiRequest{
		Time:    time.Now().Unix(),
		Channel: "futures.order_place",
		Event:   "api",
		Payload: ApiPayload{
			RequestId:    requestId,
			RequestParam: []byte(orderParamBytes),
		},
	}
	orderReqByte, _ := json.Marshal(order_place)
	err = c.WriteMessage(websocket.TextMessage, orderReqByte)

	if err != nil {
		panic(err)
	}

	select {}
}
```

Request example

```json
{
  "time": 1681195484,
  "channel": "futures.order_place",
  "event": "api",
  "payload": {
    "req_id": "request-id-1",
    "req_param": {
      "contract": "BTC_USDT",
      "size": 10,
      "price": "31503.280000",
      "tif": "gtc",
      "text": "t-my-custom-id"
    }
  }
}
```

Payload format:

`req_param` JSON byte data of the API order model:

`req_header` Custom header data:

#### [#](#detail) Detail

**tif**: Validity time

- gtc: Good Till Canceled
- ioc: Immediate Or Cancelled, accepted only
- poc: Pending Or Cancelled, for posted orders only, always incurs maker fees
- fok: Fill Or Kill, must be completely filled or not filled at all

**text**: User-defined information. If not empty, it must follow these rules：

- Must start with "t-"
- Excluding "t-", the length cannot exceed 28 bytes
- The input can only contain numbers, letters, underscores (\_), hyphens (-), or
  dots (.)
- If left empty, the default is apiv4-ws, from WebSocket
- web: From the web
- api: From the API
- app: From the mobile app
- auto_deleveraging: From ADL
- liquidation: From liquidation
- insurance: From insurance

**stp_act**：Self-trade prevention actions. Users can set self-trade prevention
strategies through this field

After the user joins the `STP Group`, they can use `stp_act` to limit their
self-trade prevention strategy. If `stp_act` is not provided, the default
strategy is `cn`. When the user is not part of the `STP group`, passing the
parameter will return an error with `stp_act`. If the user does not use
`stp_act` when placing an order, `stp_act` will return `-`.

- cn: Cancel the latest order, cancel the new order and keep the old one
- co: Cancel the oldest order, cancel the old order and keep the new one
- cb: Cancel both, cancel both the new and old orders

### [#](#ack-notification) Ack Notification

Ack Notification example for an order

```json
{
  "request_id": "request-id-1",
  "ack": true,
  "header": {
    "response_time": "1681195484268",
    "status": "200",
    "channel": "futures.order_place",
    "event": "api",
    "client_id": "::1-0x140001a2600",
    "x_in_time": 1681985856667508,
    "x_out_time": 1681985856667598,
    "conn_trace_id": "1bde5aaa0acf2f5f48edfd4392e1fa68",
    "trace_id": "e410abb5f74b4afc519e67920548838d",
    "conn_id": "5e74253e9c793974",
    "x_gate_ratelimit_requests_remain": 99,
    "x_gate_ratelimit_limit": 100,
    "x_gat_ratelimit_reset_timestamp": 1736408263764
  },
  "data": {
    "result": {
      "req_id": "request-id-1",
      "req_header": null,
      "req_param": {
        "contract": "BTC_USDT",
        "size": 10,
        "price": "31503.280000",
        "tif": "gtc",
        "text": "t-my-custom-id"
      }
    }
  }
}
```

### [#](#order-place-notification) Order Place Notification

Response Notification example

```json
{
  "request_id": "request-id-1",
  "ack": false,
  "header": {
    "response_time": "1681195484360",
    "status": "200",
    "channel": "futures.order_place",
    "event": "api",
    "client_id": "::1-0x140001a2600",
    "x_in_time": 1681985856667508,
    "x_out_time": 1681985856667598,
    "conn_id": "5e74253e9c793974",
    "conn_trace_id": "1bde5aaa0acf2f5f48edfd4392e1fa68",
    "trace_id": "e410abb5f74b4afc519e67920548838d",
    "x_gate_ratelimit_requests_remain": 99,
    "x_gate_ratelimit_limit": 100,
    "x_gat_ratelimit_reset_timestamp": 1736408263764
  },
  "data": {
    "result": {
      "id": 74046514,
      "user": 6790020,
      "create_time": 1681195484.462,
      "finish_time": 1681195484.462,
      "finish_as": "filled",
      "status": "finished",
      "contract": "BTC_USDT",
      "size": 10,
      "price": "31503.3",
      "tif": "gtc",
      "fill_price": "31500",
      "text": "t-my-custom-id",
      "tkfr": "0.0003",
      "mkfr": "0",
      "stp_id": 2,
      "stp_act": "cn",
      "amend_text": "-"
    }
  }
}
```

Return of order information for placing an order

Result format:

## [#](#order-batch-place) Order Batch Place

`futures.order_batch_place`

You can batch place orders with this channel and event `api`.

**function as api below:**

```json
POST /futures/{settle}/batch_orders
```

### [#](#order-batch-place-request) Order Batch Place Request

Code example: Login is required before making requests

```python
import time
import json

# pip install websocket_client
from websocket import create_connection

api_order=[
      {
        "contract": "BTC_USDT",
        "size": 10,
        "price": "31403.180000",
        "tif": "gtc",
        "text": "t-my-custom-id"
      }
    ]

ws = create_connection("wss://fx-ws.gateio.ws/v4/ws/usdt")
ws.send(json.dumps({
    "time": int(time.time()),
    "channel": "futures.order_batch_place",
    "event": "api",
    "payload": {
        "header":{
            "x-gate-channel-id":"xxxx",
        },
        "req_id": "1ewq-3123w-5",
        "req_param": api_order
    }
}))

print(ws.recv())
```

Code example: Login is required before making requests

```go
package main

import (
	"encoding/json"
	"fmt"
	"log"
	"time"

	"github.com/gorilla/websocket"
)

func main() {
	apiOrder := []map[string]interface{}{
		{
			"contract": "BTC_USDT",
			"size":     10,
			"price":    "31403.180000",
			"tif":      "gtc",
			"text":     "t-my-custom-id",
		},
	}

	url := "wss://fx-ws.gateio.ws/v4/ws/usdt"
	ws, _, err := websocket.DefaultDialer.Dial(url, nil)
	if err != nil {
		log.Fatal("dial:", err)
	}
	defer ws.Close()

	payload := map[string]interface{}{
		"time":    time.Now().Unix(),
		"channel": "futures.order_batch_place",
		"event":   "api",
		"payload": map[string]interface{}{
			"header": map[string]interface{}{
				"x-gate-channel-id": "xxxx",
			},
			"req_id":    "1ewq-3123w-5",
			"req_param": apiOrder,
		},
	}

	msg, _ := json.Marshal(payload)
	err = ws.WriteMessage(websocket.TextMessage, msg)
	if err != nil {
		log.Println("write:", err)
		return
	}

	_, message, err := ws.ReadMessage()
	if err != nil {
		log.Println("read:", err)
		return
	}
	fmt.Println(string(message))
}
```

Request example

```json
{
  "time": 1681196536,
  "channel": "futures.order_batch_place",
  "event": "api",
  "payload": {
    "req_id": "request-id-6",
    "req_param": [
      {
        "contract": "BTC_USDT",
        "size": 10,
        "price": "31403.180000",
        "tif": "gtc",
        "text": "t-my-custom-id"
      }
    ]
  }
}
```

Payload format:

`req_param` The JSON byte data for the API order model can refer to a single
order placement, or an array of multiple single orders. For details, refer to
the order placement documentation.

`req_header` Custom header data:

### [#](#order-batch-place-ack-notification) Order Batch Place Ack Notification

Ack Notification example

```json
{
  "request_id": "request-id-6",
  "ack": true,
  "header": {
    "response_time": "1681196536283",
    "status": "200",
    "channel": "futures.order_batch_place",
    "event": "api",
    "client_id": "::1-0x14002cfa0c0",
    "x_in_time": 1681985856667508,
    "x_out_time": 1681985856667598,
    "conn_id": "5e74253e9c793974",
    "conn_trace_id": "1bde5aaa0acf2f5f48edfd4392e1fa68",
    "trace_id": "e410abb5f74b4afc519e67920548838d",
    "x_gate_ratelimit_requests_remain": 99,
    "x_gate_ratelimit_limit": 100,
    "x_gat_ratelimit_reset_timestamp": 1736408263764
  },
  "data": {
    "result": {
      "req_id": "request-id-6",
      "req_header": null,
      "req_param": [
        {
          "contract": "BTC_USDT",
          "size": 10,
          "price": "31403.180000",
          "tif": "gtc",
          "text": "t-my-custom-id"
        }
      ]
    }
  }
}
```

### [#](#order-batch-place-notification) Order Batch Place Notification

Response Notification example

```json
{
  "request_id": "request-id-6",
  "ack": false,
  "header": {
    "response_time": "1681196536532",
    "status": "200",
    "channel": "futures.order_batch_place",
    "event": "api",
    "client_id": "::1-0x14002cfa0c0",
    "x_in_time": 1681985856667508,
    "x_out_time": 1681985856667598,
    "conn_id": "5e74253e9c793974",
    "conn_trace_id": "1bde5aaa0acf2f5f48edfd4392e1fa68",
    "trace_id": "e410abb5f74b4afc519e67920548838d",
    "x_gate_ratelimit_requests_remain": 99,
    "x_gate_ratelimit_limit": 100,
    "x_gat_ratelimit_reset_timestamp": 1736408263764
  },
  "data": {
    "result": [
      {
        "succeeded": true,
        "id": 74046545,
        "user": 6790020,
        "create_time": 1681196536.592,
        "status": "open",
        "contract": "BTC_USDT",
        "size": 10,
        "price": "31403.2",
        "tif": "gtc",
        "left": 10,
        "fill_price": "0",
        "text": "t-my-custom-id",
        "tkfr": "0.0003",
        "mkfr": "0"
      }
    ]
  }
}
```

Return of order information for batch placing order

Result format:

## [#](#order-cancel) Order Cancel

`futures.order_cancel`

You can cancel an open order with this channel and event `api`.

**function as api below:**

```json
DELETE /futures/{settle}/orders/{order_id}
```

### [#](#order-cancel-request) Order Cancel Request

Code example: Login is required before making requests

```python
import time
import json

# pip install websocket_client
from websocket import create_connection

ws = create_connection("wss://fx-ws.gateio.ws/v4/ws/usdt")
api_cancel_order = {
      "order_id": "74046514"
    }
ws.send(json.dumps({
    "time": int(time.time()),
    "channel": "futures.order_cancel",
    "event": "api",
    "payload": {
        "req_id": "1ewq-3123w-5",
        "req_param": api_cancel_order
    }
}))

print(ws.recv())
```

Code example: Login is required before making requests

```go
package main

import (
	"encoding/json"
	"fmt"
	"log"
	"time"

	"github.com/gorilla/websocket"
)

func main() {
	url := "wss://fx-ws.gateio.ws/v4/ws/usdt"
	ws, _, err := websocket.DefaultDialer.Dial(url, nil)
	if err != nil {
		log.Fatal("dial:", err)
	}
	defer ws.Close()

	apiCancelOrder := map[string]interface{}{
		"order_id": "74046514",
	}

	payload := map[string]interface{}{
		"time":    time.Now().Unix(),
		"channel": "futures.order_cancel",
		"event":   "api",
		"payload": map[string]interface{}{
			"req_id":    "1ewq-3123w-5",
			"req_param": toJSONString(apiCancelOrder),
		},
	}

	msg, _ := json.Marshal(payload)
	err = ws.WriteMessage(websocket.TextMessage, msg)
	if err != nil {
		log.Println("write:", err)
		return
	}

	_, message, err := ws.ReadMessage()
	if err != nil {
		log.Println("read:", err)
		return
	}
	fmt.Println(string(message))
}

func toJSONString(data interface{}) string {
	bytes, _ := json.Marshal(data)
	return string(bytes)
}
```

Order cancel request example

```json
{
  "time": 1681195485,
  "channel": "futures.order_cancel",
  "event": "api",
  "payload": {
    "req_id": "request-id-5",
    "req_param": {
      "order_id": "74046514"
    }
  }
}
```

Payload format:

`req_header` Custom header data:

### [#](#order-status-notification) Order Status Notification

Order status notification example

```json
{
  "request_id": "request-id-5",
  "header": {
    "response_time": "1681196536282",
    "status": "200",
    "channel": "futures.order_cancel",
    "event": "api",
    "client_id": "::1-0x14002cfa0c0",
    "x_in_time": 1681985856667508,
    "x_out_time": 1681985856667598,
    "conn_id": "5e74253e9c793974",
    "conn_trace_id": "1bde5aaa0acf2f5f48edfd4392e1fa68",
    "trace_id": "e410abb5f74b4afc519e67920548838d",
    "x_gate_ratelimit_requests_remain": 99,
    "x_gate_ratelimit_limit": 100,
    "x_gat_ratelimit_reset_timestamp": 1736408263764
  },
  "data": {
    "result": {
      "id": 74046543,
      "user": 6790020,
      "create_time": 1681196535.01,
      "finish_time": 1681196536.343,
      "finish_as": "cancelled",
      "status": "finished",
      "contract": "BTC_USDT",
      "size": 10,
      "price": "31303.2",
      "tif": "gtc",
      "left": 10,
      "fill_price": "0",
      "text": "t-my-custom-id",
      "tkfr": "0.0003",
      "mkfr": "0",
      "stp_id": 2,
      "stp_act": "cn",
      "amend_text": "-"
    }
  }
}
```

Result format:

## [#](#order-cancel-all-with-id-list) Order Cancel All With Id List

You can cancel all open orders with this channel `futures.order_cancel_ids`.

Multiple distinct order IDs can be specified. Each request can cancel a maximum
of 20 records.

**function as api below:**

```json
POST /futures/{settle}/batch_cancel_orders
```

### [#](#order-cancel-all-with-id-list-request) Order Cancel All With Id List Request

Code example: Login is required before making requests

```python
#!/usr/bin/python

import time
import json
# pip install websocket_client
from websocket import create_connection

ws = create_connection("wss://fx-ws.gateio.ws/v4/ws/usdt")
cancelWithIdsParam = ["1694883366","123"]
ws.send(json.dumps({
    "time":int(time.time()),
    "channel":"futures.order_cancel_ids",
    "event":"api",
    "payload":{
        "req_id":"test_1",
        "req_param": cancelWithIdsParam
    }
}))

print(ws.recv())
```

Code example: Login is required before making requests

```go
package main

import (
	"encoding/json"
	"fmt"
	"log"
	"time"

	"github.com/gorilla/websocket"
)

func main() {
	timestamp := time.Now().Unix()
	cancelWithIdsParam := []string{"1694883366", "123"}
	channel := "futures.order_cancel_ids"

	url := "wss://fx-ws.gateio.ws/v4/ws/usdt"
	ws, _, err := websocket.DefaultDialer.Dial(url, nil)
	if err != nil {
		log.Fatal("dial:", err)
	}
	defer ws.Close()

	payload := map[string]interface{}{
		"time":    timestamp,
		"channel": channel,
		"event":   "api",
		"payload": map[string]interface{}{
			"req_id":    "test_1",
			"req_param": cancelWithIdsParam,
		},
	}

	msg, _ := json.Marshal(payload)
	err = ws.WriteMessage(websocket.TextMessage, msg)
	if err != nil {
		log.Println("write:", err)
		return
	}

	_, message, err := ws.ReadMessage()
	if err != nil {
		log.Println("read:", err)
		return
	}
	fmt.Println(string(message))
}
```

Client request example

```json
{
  "time": 1681986208,
  "channel": "futures.order_cancel_ids",
  "event": "api",
  "payload": {
    "req_id": "request-9",
    "req_param": ["1700664343", "123"]
  }
}
```

Payload format:

`req_header` Custom header data:

### [#](#order-cancel-all-with-id-list-notification) Order Cancel All With Id List Notification

Order cancel notification example

```json
{
  "request_id": "request-9",
  "header": {
    "response_time": "1681986208564",
    "status": "200",
    "channel": "futures.order_cancel_ids",
    "event": "api",
    "client_id": "::1-0x140001623c0",
    "x_in_time": 1681985856667508,
    "x_out_time": 1681985856667598,
    "conn_id": "5e74253e9c793974",
    "conn_trace_id": "1bde5aaa0acf2f5f48edfd4392e1fa68",
    "trace_id": "e410abb5f74b4afc519e67920548838d"
  },
  "data": {
    "result": [
      {
        "id": "1694883366",
        "user_id": 111,
        "succeeded": true
      },
      {
        "id": "123",
        "user_id": 111,
        "message": "ORDER_NOT_FOUND"
      }
    ]
  }
}
```

Result format:

## [#](#cancel-all-open-orders-matched) Cancel all open orders matched

`futures.order_cancel_cp`

You can cancel all open orders with this channel and event `api`.

**function as api below:**

```json
DELETE /futures/{settle}/orders
```

### [#](#cancel-all-open-orders-matched-request) Cancel all open orders matched Request

Code example: Login is required before making requests

```python
import time
import json

# pip install websocket_client
from websocket import create_connection

ws = create_connection("wss://fx-ws.gateio.ws/v4/ws/usdt")
api_cancel_all_order = {
      "contract": "BTC_USDT",
      "side": "bid"
    }
ws.send(json.dumps({
    "time": int(time.time()),
    "channel": "futures.order_cancel_cp",
    "event": "api",
    "payload": {
        "req_id": "1ewq-3123w-5",
        "req_param": api_cancel_all_order
    }
}))

print(ws.recv())
```

Code example: Login is required before making requests

```go
package main

import (
	"encoding/json"
	"fmt"
	"log"
	"time"

	"github.com/gorilla/websocket"
)

func main() {
	url := "wss://fx-ws.gateio.ws/v4/ws/usdt"
	ws, _, err := websocket.DefaultDialer.Dial(url, nil)
	if err != nil {
		log.Fatal("dial:", err)
	}
	defer ws.Close()

	apiCancelAllOrder := map[string]interface{}{
		"contract": "BTC_USDT",
		"side":     "bid",
	}

	payload := map[string]interface{}{
		"time":    time.Now().Unix(),
		"channel": "futures.order_cancel_cp",
		"event":   "api",
		"payload": map[string]interface{}{
			"req_id":    "1ewq-3123w-5",
			"req_param": toJSONString(apiCancelAllOrder),
		},
	}

	msg, _ := json.Marshal(payload)
	err = ws.WriteMessage(websocket.TextMessage, msg)
	if err != nil {
		log.Println("write:", err)
		return
	}

	_, message, err := ws.ReadMessage()
	if err != nil {
		log.Println("read:", err)
		return
	}
	fmt.Println(string(message))
}

func toJSONString(data interface{}) string {
	bytes, _ := json.Marshal(data)
	return string(bytes)
}
```

Client request example

```json
{
  "time": 1681196537,
  "channel": "futures.order_cancel_cp",
  "event": "api",
  "payload": {
    "req_id": "request-id-7",
    "req_param": {
      "contract": "BTC_USDT",
      "side": "bid"
    }
  }
}
```

Payload format:

`req_header` Custom header data:

### [#](#cancel-all-open-orders-matched-notification) Cancel all open orders matched Notification

Order cancel notification example

```json
{
  "request_id": "request-id-7",
  "header": {
    "response_time": "1681196537567",
    "status": "200",
    "channel": "futures.order_cancel_cp",
    "event": "api",
    "client_id": "::1-0x14002cfa0c0",
    "x_in_time": 1681985856667508,
    "x_out_time": 1681985856667598,
    "conn_id": "5e74253e9c793974",
    "conn_trace_id": "1bde5aaa0acf2f5f48edfd4392e1fa68",
    "trace_id": "e410abb5f74b4afc519e67920548838d",
    "x_gate_ratelimit_requests_remain": 99,
    "x_gate_ratelimit_limit": 100,
    "x_gat_ratelimit_reset_timestamp": 1736408263764
  },
  "data": {
    "result": [
      {
        "id": 74046545,
        "user": 6790020,
        "create_time": 1681196536.592,
        "finish_time": 1681196537.626,
        "finish_as": "cancelled",
        "status": "finished",
        "contract": "BTC_USDT",
        "size": 10,
        "price": "31403.2",
        "tif": "gtc",
        "left": 10,
        "fill_price": "0",
        "text": "t-my-custom-id",
        "tkfr": "0.0003",
        "mkfr": "0",
        "stp_id": 2,
        "stp_act": "cn",
        "amend_text": "-"
      }
    ]
  }
}
```

Result format:

## [#](#order-amend) Order Amend

`futures.order_amend`

You can amend an open order with this channel and event `api`.

**function as api below:**

```text
PUT /futures/{settle}/orders/{order_id}
```

### [#](#order-amend-request) Order Amend Request

Code example: Login is required before making requests

```python
import time
import json

# pip install websocket_client
from websocket import create_connection

ws = create_connection("wss://fx-ws.gateio.ws/v4/ws/usdt")
api_amend_order = {
      "order_id": "74046543",
      "price": "31303.180000"
    }
ws.send(json.dumps({
    "time": int(time.time()),
    "channel": "futures.order_amend",
    "event": "api",
    "payload": {
        "req_id": "1ewq-3123w-5",
        "req_param": api_amend_order
    }
}))

print(ws.recv())
```

Code example: Login is required before making requests

```go
package main

import (
	"encoding/json"
	"fmt"
	"log"
	"time"

	"github.com/gorilla/websocket"
)

func main() {
	url := "wss://fx-ws.gateio.ws/v4/ws/usdt"
	ws, _, err := websocket.DefaultDialer.Dial(url, nil)
	if err != nil {
		log.Fatal("dial:", err)
	}
	defer ws.Close()

	apiAmendOrder := map[string]interface{}{
		"order_id": "74046543",
		"price":    "31303.180000",
	}

	payload := map[string]interface{}{
		"time":    time.Now().Unix(),
		"channel": "futures.order_amend",
		"event":   "api",
		"payload": map[string]interface{}{
			"req_id":    "1ewq-3123w-5",
			"req_param": toJSONString(apiAmendOrder),
		},
	}

	msg, _ := json.Marshal(payload)
	err = ws.WriteMessage(websocket.TextMessage, msg)
	if err != nil {
		log.Println("write:", err)
		return
	}

	_, message, err := ws.ReadMessage()
	if err != nil {
		log.Println("read:", err)
		return
	}
	fmt.Println(string(message))
}

func toJSONString(data interface{}) string {
	bytes, _ := json.Marshal(data)
	return string(bytes)
}
```

Client request example

```json
{
  "time": 1681196536,
  "channel": "futures.order_amend",
  "event": "api",
  "payload": {
    "req_id": "request-id-4",
    "req_param": {
      "order_id": "74046543",
      "price": "31303.180000"
    }
  }
}
```

Payload format:

`req_header` Custom header data:

### [#](#order-amend-notification) Order Amend Notification

Order amend notification example

```json
{
  "request_id": "request-id-4",
  "header": {
    "response_time": "1681196536251",
    "status": "200",
    "channel": "futures.order_amend",
    "event": "api",
    "client_id": "::1-0x14002cfa0c0",
    "x_in_time": 1681985856667508,
    "x_out_time": 1681985856667598,
    "conn_id": "5e74253e9c793974",
    "conn_trace_id": "1bde5aaa0acf2f5f48edfd4392e1fa68",
    "trace_id": "e410abb5f74b4afc519e67920548838d",
    "x_gate_ratelimit_requests_remain": 99,
    "x_gate_ratelimit_limit": 100,
    "x_gat_ratelimit_reset_timestamp": 1736408263764
  },
  "data": {
    "result": {
      "id": 74046543,
      "user": 6790020,
      "create_time": 1681196535.01,
      "status": "open",
      "contract": "BTC_USDT",
      "size": 10,
      "price": "31303.2",
      "tif": "gtc",
      "left": 10,
      "fill_price": "0",
      "text": "t-my-custom-id",
      "tkfr": "0.0003",
      "mkfr": "0",
      "stp_id": 2,
      "stp_act": "cn",
      "amend_text": "-"
    }
  }
}
```

Result format:

## [#](#order-list) Order List

`futures.order_list`

You can list futures orders with this channel and event `api`.

**function as api below:**

```text
GET /futures/{settle}/orders
```

### [#](#order-list-request) Order List Request

Code example: Login is required before making requests

```python
import time
import json

# pip install websocket_client
from websocket import create_connection

ws = create_connection("wss://fx-ws.gateio.ws/v4/ws/usdt")
api_list_order = {
      "contract": "BTC_USDT",
      "status": "open"
    }
ws.send(json.dumps({
    "time": int(time.time()),
    "channel": "futures.order_list",
    "event": "api",
    "payload": {
        "req_id": "1ewq-3123w-5",
        "req_param": api_list_order
    }
}
))

print(ws.recv())
```

Code example: Login is required before making requests

```go
package main

import (
	"encoding/json"
	"fmt"
	"log"
	"time"

	"github.com/gorilla/websocket"
)

func main() {
	url := "wss://fx-ws.gateio.ws/v4/ws/usdt"
	ws, _, err := websocket.DefaultDialer.Dial(url, nil)
	if err != nil {
		log.Fatal("dial:", err)
	}
	defer ws.Close()

	apiListOrder := map[string]interface{}{
		"contract": "BTC_USDT",
		"status":   "open",
	}

	payload := map[string]interface{}{
		"time":    time.Now().Unix(),
		"channel": "futures.order_list",
		"event":   "api",
		"payload": map[string]interface{}{
			"req_id":    "1ewq-3123w-5",
			"req_param": toJSONString(apiListOrder),
		},
	}

	msg, _ := json.Marshal(payload)
	err = ws.WriteMessage(websocket.TextMessage, msg)
	if err != nil {
		log.Println("write:", err)
		return
	}

	_, message, err := ws.ReadMessage()
	if err != nil {
		log.Println("read:", err)
		return
	}
	fmt.Println(string(message))
}

func toJSONString(data interface{}) string {
	bytes, _ := json.Marshal(data)
	return string(bytes)
}
```

Client request example

```json
{
  "time": 1681196535,
  "channel": "futures.order_list",
  "event": "api",
  "payload": {
    "req_id": "request-id-3",
    "req_param": {
      "contract": "BTC_USDT",
      "status": "open"
    }
  }
}
```

Payload format:

### [#](#order-list-notification) Order List Notification

Order list notification example

```json
{
  "request_id": "request-id-3",
  "header": {
    "response_time": "1681196536017",
    "status": "200",
    "channel": "futures.order_list",
    "event": "api",
    "client_id": "::1-0x14002cfa0c0",
    "x_in_time": 1681985856667508,
    "x_out_time": 1681985856667598,
    "conn_id": "5e74253e9c793974",
    "conn_trace_id": "1bde5aaa0acf2f5f48edfd4392e1fa68",
    "trace_id": "e410abb5f74b4afc519e67920548838d"
  },
  "data": {
    "result": [
      {
        "id": 74046543,
        "user": 6790020,
        "create_time": 1681196535.01,
        "status": "open",
        "contract": "BTC_USDT",
        "size": 10,
        "price": "31403.2",
        "tif": "gtc",
        "left": 10,
        "fill_price": "0",
        "text": "t-my-custom-id",
        "tkfr": "0.0003",
        "mkfr": "0",
        "stp_id": 2,
        "stp_act": "cn",
        "amend_text": "-"
      }
    ]
  }
}
```

Result format:

## [#](#order-status) Order Status

`futures.order_status`

You can query an order with this channel and event `api`.

**function as api below:**

```text
GET /futures/{settle}/orders/{order_id}
```

### [#](#order-status-request) Order Status Request

Code example: Login is required before making requests

```python
import time
import json

# pip install websocket_client
from websocket import create_connection

ws = create_connection("wss://fx-ws.gateio.ws/v4/ws/usdt")

api_status_order = {
      "order_id": "74046543"
    }

ws.send(json.dumps({
    "time": int(time.time()),
    "channel": "futures.order_status",
    "event": "api",
    "payload": {
        "req_id": "1ewq-3123w-5",
        "req_param": api_status_order
    }
}))

print(ws.recv())
```

Code example: Login is required before making requests

```go
package main

import (
	"encoding/json"
	"fmt"
	"log"
	"time"

	"github.com/gorilla/websocket"
)

func main() {
	url := "wss://fx-ws.gateio.ws/v4/ws/usdt"
	ws, _, err := websocket.DefaultDialer.Dial(url, nil)
	if err != nil {
		log.Fatal("dial:", err)
	}
	defer ws.Close()

	apiStatusOrder := map[string]interface{}{
		"order_id": "74046543",
	}

	payload := map[string]interface{}{
		"time":    time.Now().Unix(),
		"channel": "futures.order_status",
		"event":   "api",
		"payload": map[string]interface{}{
			"req_id":    "1ewq-3123w-5",
			"req_param": toJSONString(apiStatusOrder),
		},
	}

	msg, _ := json.Marshal(payload)
	err = ws.WriteMessage(websocket.TextMessage, msg)
	if err != nil {
		log.Println("write:", err)
		return
	}

	_, message, err := ws.ReadMessage()
	if err != nil {
		log.Println("read:", err)
		return
	}
	fmt.Println(string(message))
}

func toJSONString(data interface{}) string {
	bytes, _ := json.Marshal(data)
	return string(bytes)
}
```

Client request example

```json
{
  "time": 1681196535,
  "channel": "futures.order_status",
  "event": "api",
  "payload": {
    "req_id": "request-id-2",
    "req_param": {
      "order_id": "74046543"
    }
  }
}
```

Payload format:

### [#](#order-cancel-notification) Order Cancel Notification

Order cancel notification example

```json
{
  "request_id": "request-id-2",
  "header": {
    "response_time": "1681196535985",
    "status": "200",
    "channel": "futures.order_status",
    "event": "api",
    "client_id": "::1-0x14002cfa0c0",
    "x_in_time": 1681985856667508,
    "x_out_time": 1681985856667598,
    "conn_id": "5e74253e9c793974",
    "conn_trace_id": "1bde5aaa0acf2f5f48edfd4392e1fa68",
    "trace_id": "e410abb5f74b4afc519e67920548838d"
  },
  "data": {
    "result": {
      "id": 74046543,
      "user": 6790020,
      "create_time": 1681196535.01,
      "status": "open",
      "contract": "BTC_USDT",
      "size": 10,
      "price": "31403.2",
      "tif": "gtc",
      "left": 10,
      "fill_price": "0",
      "text": "t-my-custom-id",
      "tkfr": "0.0003",
      "mkfr": "0",
      "stp_id": 2,
      "stp_act": "cn",
      "amend_text": "-"
    }
  }
}
```

Result format:

Last Updated: 4/25/2025, 9:09:39 AM
