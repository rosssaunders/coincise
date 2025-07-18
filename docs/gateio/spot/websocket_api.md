# [#](#spot-websocket-v4) Spot WebSocket v4

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

# pip install -U websocket_client
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
                    self._request("spot.ping", auth_required=False)
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
    # handle whatever message you received
    logger.info("message received from server: {}".format(message))

def on_open(ws):
    # type: (GateWebSocketApp) -> None
    # subscribe to channels interested
    logger.info('websocket connected')
    ws.subscribe("spot.trades", ['BTC_USDT'], False)

if __name__ == "__main__":
    logging.basicConfig(format="%(asctime)s - %(message)s", level=logging.DEBUG)
    app = GateWebSocketApp("wss://api.gateio.ws/ws/v4/",
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
	u := url.URL{Scheme: "wss", Host: "api.gateio.ws", Path: "/ws/v4/"}
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
	pingMsg := NewMsg("spot.ping", "", t, []string{})
	err = pingMsg.send(c)
	if err != nil {
		panic(err)
	}

	// subscribe order book
	orderBookMsg := NewMsg("spot.order_book", "subscribe", t, []string{"BTC_USDT", "5", "100ms"})
	err = orderBookMsg.send(c)
	if err != nil {
		panic(err)
	}

	// subscribe positions
	ordersMsg := NewMsg("spot.orders", "subscribe", t, []string{"BTC_USDT"})
	ordersMsg.sign()
	err = ordersMsg.send(c)
	if err != nil {
		panic(err)
	}

	select {}
}
```

Gate provides a simple and robust Websocket API to integrate spot trade status
into your business or application.

We have language bindings in `Python` and `Golang`. You can view code examples
in the dark area to the right, and you can switch the programming language of
the examples with the tabs in the top right.

### [#](#server-url) Server URL

Base URLs:

- Real Trading: `wss://api.gateio.ws/ws/v4/`
- TestNet: `wss://ws-testnet.gate.com/v4/ws/spot`

### [#](#sdk) SDK

We provide WebSocket SDK to help developers with service integration.

The SDK's source code are available in
[gatews (opens new window)](https://github.com/gateio/gatews) GitHub repository.

## [#](#api-overview) API Overview

WebSocket operations are divided into different channels. Channels are either
public or private. While public channels can be subscribed to directly, private
channels require authentication using Gate APIv4 key pairs(refer to
[Authentication](#authentication) down below for details).

All channels support the following events:

- **`subscribe`**

  Initiated from the client. Client uses this method to tell the server that it
  is interested in this channel and requires the server to notify the new data
  if channel related data are changed.

- **`unsubscribe`**

  Initiated from the client. Client uses this method to tell the server that it
  is no longer interested in this channel and stop sending any further channel
  updates.

- **`update`**

  Initiated from the sever. Server uses this method to send changed data to all
  clients subscribed to this channel. Client cannot use this operation event.

### [#](#client-request) Client Request

Client request example

```json
{
  "time": 1611541000,
  "id": 123456789,
  "channel": "spot.orders",
  "event": "subscribe",
  "payload": ["BTC_USDT", "GT_USDT"],
  "auth": {
    "method": "api_key",
    "KEY": "xxxx",
    "SIGN": "xxxx"
  }
}
```

`subscribe` or `unsubscribe` requests initiated from the client follow a common
JSON format, which contains the following fields:

| Field     | Type                 | Required | Description                                                                                                         |
| --------- | -------------------- | -------- | ------------------------------------------------------------------------------------------------------------------- |
| `time`    | Integer              | Yes      | Request time in seconds. Gap between request time and server time must not exceed 60 seconds                        |
| `id`      | Integer              | No       | Optional request id which will be sent back by the server to help you identify which request the server responds to |
| `channel` | String               | Yes      | WebSocket channel to subscribe to.                                                                                  |
| `auth`    | [Auth](#schema_auth) | No       | Authentication credentials for private channels. See[Authentication](#authentication) section for details           |
| `event`   | String               | Yes      | Channel operation event, i.e.`subscribe`, `unsubscribe`                                                             |
| `payload` | Any                  | No       | Optional request detail parameters                                                                                  |

Note that the type of `payload` is channel specific, but `subscribe` and
`unsubscribe` payloads in one channel are in the same format. Take `spot.orders`
for example, the payload format is a list of currency pairs interested. You can
specify `["foo", "bar", "etc"]` as `subscribe` payload to receive order updates
about them. Then specify `["etc"]` in `unsubscribe` payload later to exclude it
from futures order updates.

Channel specific description below only gives the channel specific payload
format for simplicity, but you need to send the full request to do channel
subscription operations.

### [#](#server-response) Server Response

Server response example

```json
{
  "time": 1611541000,
  "time_ms": 1611541000001,
  "channel": "spot.orders",
  "event": "subscribe",
  "error": null,
  "result": {
    "status": "success"
  }
}
```

Server response includes both response to client requests and server-initiated
message updates. Similar with request, server responses follow almost the same
JSON format with client requests:

| Field     | Type                   | Description                                                                                            |
| --------- | ---------------------- | ------------------------------------------------------------------------------------------------------ |
| `time`    | Integer                | Response time in seconds.                                                                              |
| `time_ms` | Integer                | Response time in millisecond.                                                                          |
| `id`      | Integer                | Request ID extracted from the client request payload if client request has one                         |
| `channel` | String                 | WebSocket channel name                                                                                 |
| `event`   | String                 | Server side channel event(i.e.,`update`) or `event` used in requests initiated from the client         |
| `error`   | [Error](#schema_error) | Null if the server accepts the client request; otherwise, the detailed reason why request is rejected. |
| `result`  | Any                    | New data notification from the server, or response to client requests. Null if`error` is not null.     |

Note: type of `result` is channel specific if it's server-initiated data update
notification, but response to client subscription request always set the
`result` to `{"status": "success"}`. To verify if subscription request is
successful or not, you only need to check if `error` field is null. Parsing
`result` field is not necessary.

Channel specific description below will only give the server-initiated data
update notification format for simplicity.

### [#](#error) Error

Error object has the following format:

| Field     | Type    | Description           |
| --------- | ------- | --------------------- |
| `code`    | Integer | Error code            |
| `message` | String  | Detailed error reason |

In case of errors, you receive a message containing the proper error code and
message within an error object. Possible errors includes:

| `code` | `message`                   |
| ------ | --------------------------- |
| 1      | Invalid request body format |
| 2      | Invalid argument provided   |
| 3      | Server side error happened  |
| 4      | Authentication fail         |

## [#](#authentication) Authentication

WARNING

Note: the GateAPIv4 key pair you used MUST have at least spot read permission
enabled, and your outbound IP address must be in the key's IP whitelist if its
whitelist is enabled.

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
    'channel': 'spot.orders',
    'event': 'subscribe',
    'payload': ["BTC_USDT", "GT_USDT"]
}
request['auth'] = gen_sign(request['channel'], request['event'], request['time'])
print(json.dumps(request))
```

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
		"channel": "spot.orders",
		"event":   "subscribe",
		"payload": []string{"BTC_USDT", "GT_USDT"},
	}
	request["auth"] = genSign(request["channel"].(string), request["event"].(string), timestamp)

	jsonBytes, _ := json.Marshal(request)
	fmt.Println(string(jsonBytes))
}
```

Client requests need to carry authentication information if channels are
private, e.g. `spot.orders` channel to retrieve user orders update.

Authentication are sent by `auth` field in request body with the following
format:

| Field    | Type   | Description                                                                       |
| -------- | ------ | --------------------------------------------------------------------------------- |
| `method` | String | Authentication method. Currently only one method`api_key` is accepted             |
| `KEY`    | String | Gate APIv4 user key string                                                        |
| `SIGN`   | String | Authentication signature generated using GateAPIv4 secret and request information |

WebSocket authentication uses the same signature calculation method with Gate
APIv4 API, i.e., `HexEncode(HMAC_SHA512(secret, signature_string))`, but has the
following differences:

1.  Signature string concatenation method:
    `channel=<channel>&event=<event>&time=<time>`, where `<channel>`, `<event>`,
    `<time>` are corresponding request information
2.  Authentication information are sent in request body in field `auth`.

You can log into the console to retrieve Gate APIv4 key and secret.

# [#](#system-api) System API

System APIs used to retrieve service meta information. **NOT** used for
subscription.

## [#](#application-ping-pong) Application ping pong

`spot.ping`

Code samples

```python
import time
# pip install websocket_client
from websocket import create_connection

ws = create_connection("wss://api.gateio.ws/ws/v4/")
ws.send('{"time": %d, "channel" : "spot.ping"}' % int(time.time()))
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
	url := "wss://api.gateio.ws/ws/v4/"
	conn, _, err := websocket.DefaultDialer.Dial(url, nil)
	if err != nil {
		log.Fatal("dial error:", err)
	}
	defer conn.Close()

	ping := map[string]interface{}{
		"time":    time.Now().Unix(),
		"channel": "spot.ping",
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

Response example

```json
{
  "time": 1545404023,
  "channel": "spot.pong",
  "event": "",
  "error": null,
  "result": null
}
```

Check if connection to server is still alive.

This is an additional connection reachability check. The server uses the
[protocol layer ping/pong (opens new window)](https://tools.ietf.org/html/rfc6455)
message to check if client is still connected. It does NOT force this method to
be used. If you use some well-known WebSocket client library, you generally
don't need to care about this API.

However, from the client's view, this API can help the client to actively check
if the connection to server is still reachable. Additionally, if the server
receives the client's `spot.ping` request, it will also reset the client's
timeout timer.

TIP

This channel does not require authentication

# [#](#tickers-channel) Tickers Channel

`spot.tickers`

**update speed:** 1000ms

The ticker is a high level overview of the state of the spot trading. It shows
you the highest, lowest, last trade price. It also includes information such as
daily volume and how much the price has changed over the last day.

## [#](#client-subscription) Client Subscription

Code samples

```python
import time
import json

# pip install websocket_client
from websocket import create_connection

ws = create_connection("wss://api.gateio.ws/ws/v4/")
ws.send(json.dumps({
    "time": int(time.time()),
    "channel": "spot.tickers",
    "event": "subscribe",  # "unsubscribe" for unsubscription
    "payload": ["BTC_USDT"]
}))
print(ws.recv())
```

Code example：

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
	url := "wss://api.gateio.ws/ws/v4/"
	conn, _, err := websocket.DefaultDialer.Dial(url, nil)
	if err != nil {
		log.Fatal("dial error:", err)
	}
	defer conn.Close()

	subscribe := map[string]interface{}{
		"time":    time.Now().Unix(),
		"channel": "spot.tickers",
		"event":   "subscribe",
		"payload": []string{"BTC_USDT"},
	}

	msg, err := json.Marshal(subscribe)
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

Payload format:

| Field     | Type            | Required | Description            |
| --------- | --------------- | -------- | ---------------------- |
| `payload` | `Array[String]` | Yes      | List of currency pairs |

You can subscribe/unsubscribe multiple times. Currency pair subscribed earlier
will not be overridden unless explicitly unsubscribed to.

## [#](#server-notification) Server Notification

Notification example

```json
{
  "time": 1669107766,
  "time_ms": 1669107766406,
  "channel": "spot.tickers",
  "event": "update",
  "result": {
    "currency_pair": "BTC_USDT",
    "last": "15743.4",
    "lowest_ask": "15744.4",
    "highest_bid": "15743.5",
    "change_percentage": "-1.8254",
    "base_volume": "9110.473081735",
    "quote_volume": "145082083.2535",
    "high_24h": "16280.9",
    "low_24h": "15468.5"
  }
}
```

Result format:

| Field                | Type   | Description           |
| -------------------- | ------ | --------------------- |
| `result`             | Object | Ticker object         |
| »`currency_pair`     | String | Currency pair         |
| »`last`              | String | Last price            |
| »`lowest_ask`        | String | Recent best ask price |
| »`highest_bid`       | String | Recent best bid price |
| »`change_percentage` | String | Change percentage     |
| »`base_volume`       | String | Base volume           |
| »`quote_volume`      | String | Quote volume          |
| »`high_24h`          | String | Highest price in 24h  |
| »`low_24h`           | String | Lowest price in 24h   |

# [#](#public-trades-channel) Public Trades Channel

`spot.trades`

**update speed:** realtime

This channel sends a trade message whenever a trade occurs. It includes details
of the trade, such as price, amount, time and type.

Only the taker side in notified.

Note this is a public channel. For private trade notifications, refer to section
[User Trades](#spot-user-trades) below.

## [#](#client-subscription-2) Client Subscription

Code samples

```python
import time
import json

# pip install websocket_client
from websocket import create_connection

ws = create_connection("wss://api.gateio.ws/ws/v4/")
ws.send(json.dumps({
    "time": int(time.time()),
    "channel": "spot.trades",
    "event": "subscribe",  # "unsubscribe" for unsubscription
    "payload": ["BTC_USDT"]
}))
print(ws.recv())
```

Code example：

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
	url := "wss://api.gateio.ws/ws/v4/"
	conn, _, err := websocket.DefaultDialer.Dial(url, nil)
	if err != nil {
		log.Fatal("dial error:", err)
	}
	defer conn.Close()

	subscribe := map[string]interface{}{
		"time":    time.Now().Unix(),
		"channel": "spot.trades",
		"event":   "subscribe",
		"payload": []string{"BTC_USDT"},
	}

	msg, err := json.Marshal(subscribe)
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

Payload format:

| Field     | Type            | Required | Description            |
| --------- | --------------- | -------- | ---------------------- |
| `payload` | `Array[String]` | Yes      | List of currency pairs |

You can subscribe/unsubscribe multiple times. Currency pair subscribed earlier
will not be overridden unless explicitly unsubscribed to.

TIP

This channel does not require authentication

## [#](#server-notification-2) Server Notification

Notification example

```json
{
  "time": 1606292218,
  "time_ms": 1606292218231,
  "channel": "spot.trades",
  "event": "update",
  "result": {
    "id": 309143071,
    "id_market": 2390902,
    "create_time": 1606292218,
    "create_time_ms": "1606292218213.4578",
    "side": "sell",
    "currency_pair": "GT_USDT",
    "amount": "16.4700000000",
    "price": "0.4705000000",
    "range": "2390902-2390902",
    "id_market": 5736713
  }
}
```

Note that public trade channel only notify the taker side in a trade. Private
user trades channel below will notify all user related trades.

Result format:

| Field             | Type    | Description                                                                                         |
| ----------------- | ------- | --------------------------------------------------------------------------------------------------- |
| `result`          | Object  | Public trade detail                                                                                 |
| »`id`             | Integer | All Market Trade ID                                                                                 |
| »`id_market`      | Integer | One market Trade ID (Continuous Growth within a Single Market ID)                                   |
| »`create_time`    | Integer | Trading unix timestamp in seconds                                                                   |
| »`create_time_ms` | String  | Trading unix timestamp in milliseconds. Precision higher than ms will be appended as decimal points |
| »`side`           | String  | Taker side                                                                                          |
| »`currency_pair`  | String  | Currency pair                                                                                       |
| »`amount`         | String  | Trade amount                                                                                        |
| »`price`          | String  | Trade price                                                                                         |
| »`range`          | String  | market Trade range (format: "start-end")                                                            |
| »`id_market`      | Integer | One market Trade ID (Continuous Growth within a Single Market ID)                                   |

#### [#](#enumerated-values) Enumerated Values

| Property | Value |
| -------- | ----- |
| side     | buy   |
| side     | sell  |

# [#](#public-trades-channel-v2-deprecated) Public Trades Channel V2(Deprecated)

`spot.trades_v2`

**update speed:** realtime

**It is recommended to use the public trade channel `spot.trades` as the first
choice. The V2 version of the public trade channel `spot.trades_v2` is no longer
maintained and may be deprecated in the future.**

This channel sends a trade message whenever a trade occurs. It includes details
of the trade, such as price, amount, time and type.

Note this is a public channel. For private trade notifications, refer to section
[User Trades](#spot-user-trades) below.

## [#](#client-subscription-3) Client Subscription

Code samples

```python
import time
import json

# pip install websocket_client
from websocket import create_connection

ws = create_connection("wss://api.gateio.ws/ws/v4/")
ws.send(json.dumps({
    "time": int(time.time()),
    "channel": "spot.trades_v2",
    "event": "subscribe",  # "unsubscribe" for unsubscription
    "payload": ["BTC_USDT"]
}))
print(ws.recv())
```

Code example：

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
	url := "wss://api.gateio.ws/ws/v4/"
	conn, _, err := websocket.DefaultDialer.Dial(url, nil)
	if err != nil {
		log.Fatal("dial error:", err)
	}
	defer conn.Close()

	subscribe := map[string]interface{}{
		"time":    time.Now().Unix(),
		"channel": "spot.trades_v2",
		"event":   "subscribe",
		"payload": []string{"BTC_USDT"},
	}

	msg, err := json.Marshal(subscribe)
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

Payload format:

| Field     | Type            | Required | Description            |
| --------- | --------------- | -------- | ---------------------- |
| `payload` | `Array[String]` | Yes      | List of currency pairs |

You can subscribe/unsubscribe multiple times. Currency pair subscribed earlier
will not be overridden unless explicitly unsubscribed to.

TIP

This channel does not require authentication

## [#](#server-notification-3) Server Notification

Notification example

```json
{
  "time": 1606292218,
  "time_ms": 1606292218231,
  "channel": "spot.trades_v2",
  "event": "update",
  "result": {
    "id": 309143071,
    "id_market": 2390902,
    "create_time": 1606292218,
    "create_time_ms": "1606292218213.4578",
    "side": "sell",
    "currency_pair": "GT_USDT",
    "amount": "16.4700000000",
    "price": "0.4705000000",
    "range": "2390902-2390902",
    "id_market": 5736713
  }
}
```

Note that public trade channel only notify the taker side in a trade. Private
user trades channel below will notify all user related trades.

Result format:

| Field             | Type    | Description                                                                                         |
| ----------------- | ------- | --------------------------------------------------------------------------------------------------- |
| `result`          | Object  | Public trade detail                                                                                 |
| »`id`             | Integer | All Market Trade ID                                                                                 |
| »`id_market`      | Integer | One market Trade ID (Continuous Growth within a Single Market ID)                                   |
| »`create_time`    | Integer | Trading unix timestamp in seconds                                                                   |
| »`create_time_ms` | String  | Trading unix timestamp in milliseconds. Precision higher than ms will be appended as decimal points |
| »`side`           | String  | Taker side                                                                                          |
| »`currency_pair`  | String  | Currency pair                                                                                       |
| »`amount`         | String  | Trade amount                                                                                        |
| »`price`          | String  | Trade price                                                                                         |
| »`range`          | String  | market Trade range (format: "start-end")                                                            |
| »`id_market`      | Integer | One market Trade ID (Continuous Growth within a Single Market ID)                                   |

#### [#](#enumerated-values-2) Enumerated Values

| Property | Value |
| -------- | ----- |
| side     | buy   |
| side     | sell  |

# [#](#candlesticks-channel) Candlesticks Channel

`spot.candlesticks`

**update speed:** 2000ms

Provides a way to access charting candlestick info.

## [#](#client-subscription-4) Client Subscription

Code samples

```python
import time
import json

# pip install websocket_client
from websocket import create_connection

ws = create_connection("wss://api.gateio.ws/ws/v4/")
ws.send(json.dumps({
    "time": int(time.time()),
    "channel": "spot.candlesticks",
    "event": "subscribe",  # "unsubscribe" for unsubscription
    "payload": ["1m", "BTC_USDT"]
}))
print(ws.recv())
```

Code example：

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
	url := "wss://api.gateio.ws/ws/v4/"
	conn, _, err := websocket.DefaultDialer.Dial(url, nil)
	if err != nil {
		log.Fatal("dial error:", err)
	}
	defer conn.Close()

	subscribe := map[string]interface{}{
		"time":    time.Now().Unix(),
		"channel": "spot.candlesticks",
		"event":   "subscribe",
		"payload": []string{"1m", "BTC_USDT"},
	}

	msg, err := json.Marshal(subscribe)
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

Payload format:

| Field       | Type            | Required | Description                                                  |
| ----------- | --------------- | -------- | ------------------------------------------------------------ |
| `payload`   | `Array[String]` | Yes      | Subscription parameters. From left to right,`interval`, `cp` |
| »`interval` | String          | Yes      | Candlestick data point interval                              |
| »`cp`       | String          | Yes      | Currency pair                                                |

#### [#](#enumerated-values-3) Enumerated Values

| Property | Value |
| -------- | ----- |
| interval | 10s   |
| interval | 1m    |
| interval | 5m    |
| interval | 15m   |
| interval | 30m   |
| interval | 1h    |
| interval | 4h    |
| interval | 8h    |
| interval | 1d    |
| interval | 7d    |

To subscribe to multiple currency pairs or with different intervals, just send
multiple subscribe request with different parameters.

TIP

This channel does not require authentication

## [#](#server-notification-4) Server Notification

Notification example

```json
{
  "time": 1606292600,
  "time_ms": 1606292600376,
  "channel": "spot.candlesticks",
  "event": "update",
  "result": {
    "t": "1606292580",
    "v": "2362.32035",
    "c": "19128.1",
    "h": "19128.1",
    "l": "19128.1",
    "o": "19128.1",
    "n": "1m_BTC_USDT",
    "a": "3.8283",
    "w": true
  }
}
```

Result format:

| Field    | Type    | Description                                                                      |
| -------- | ------- | -------------------------------------------------------------------------------- |
| `result` | Object  | One candlestick data point                                                       |
| »`t`     | String  | Unix timestamp in seconds                                                        |
| »`v`     | String  | Total volume                                                                     |
| »`c`     | String  | Close price                                                                      |
| »`h`     | String  | Highest price                                                                    |
| »`l`     | String  | Lowest price                                                                     |
| »`o`     | String  | Open price                                                                       |
| »`n`     | String  | Name of the subscription, in the format of`<interval>_<cp>`                      |
| »`a`     | String  | Base currency trading amount                                                     |
| »`w`     | Boolean | `true` means window close. `true` may be missing, but does not affect data usage |

# [#](#order-book-channel) Order Book Channel

Order book has three channels for subscription to satisfy different needs. They
are:

- `spot.book_ticker`

  Pushes any update about the price and amount of best bid or ask price in
  realtime for subscribed currency pairs.

- `spot.order_book_update`

  Periodically notify order book changed levels which can be used to locally
  manage an order book.

- `spot.order_book`

  Periodically notify top bids and asks snapshot with limited levels.

Every currency pair's order book update has an internal update ID, which
increments 1 on every order book update. The order book update ID corresponds to
the `id` field in response of REST API `GET /api/v4/spot/order_book`.

How to maintain local order book:

1.  Subscribe `spot.order_book_update`, e.g. `["BTC_USDT", "100ms"]` pushes
    update in BTC_USDT order book every 100ms
2.  Cache WebSocket notifications. Every notification use `U` and `u` to tell
    the first and last update ID since last notification.
3.  Retrieve base order book using REST API, and make sure the order book ID is
    recorded(referred as `baseID` below) e.g.
    `https://api.gateio.ws/api/v4/spot/order_book?currency_pair=BTC_USDT&limit=100&with_id=true`
    retrieves the full base order book of BTC_USDT
4.  Iterate the cached WebSocket notifications, and find the first one which the
    baseID falls into, i.e. `U <= baseId+1` and `u >= baseId+1`, then start
    consuming from it. Note that amount in notifications are all absolute
    values. Use them to replace original value in corresponding price. If amount
    equals to 0, delete the price from the order book.
5.  Dump all notifications which satisfy `u < baseID+1`. If
    `baseID+1 < first notification U`, it means current base order book falls
    behind notifications. Start from step 3 to retrieve newer base order book.
6.  If any subsequent notification which satisfy `U > baseID+1` is found, it
    means some updates are lost. Reconstruct local order book from step 3.

You can find example application implementing the methods above in the
[SDK GitHub repository (opens new window)](https://github.com/gateio/gatews)

## [#](#best-bid-or-ask-price) Best bid or ask price

`spot.book_ticker`

**update speed:** 10ms

### [#](#client-subscription-5) Client Subscription

Code samples

```python
import time
import json

# pip install websocket_client
from websocket import create_connection

ws = create_connection("wss://api.gateio.ws/ws/v4/")
ws.send(json.dumps({
    "time": int(time.time()),
    "channel": "spot.book_ticker",
    "event": "subscribe",  # "unsubscribe" for unsubscription
    "payload": ["BTC_USDT"]
}))
print(ws.recv())
```

Code example：

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
	url := "wss://api.gateio.ws/ws/v4/"
	conn, _, err := websocket.DefaultDialer.Dial(url, nil)
	if err != nil {
		log.Fatal("dial error:", err)
	}
	defer conn.Close()

	subscribe := map[string]interface{}{
		"time":    time.Now().Unix(),
		"channel": "spot.book_ticker",
		"event":   "subscribe",
		"payload": []string{"BTC_USDT"},
	}

	msg, err := json.Marshal(subscribe)
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

Payload format:

| Field     | Type            | Required | Description            |
| --------- | --------------- | -------- | ---------------------- |
| `payload` | `Array[String]` | Yes      | List of currency pairs |

You can subscribe/unsubscribe multiple times. Currency pair subscribed earlier
will not be overridden unless explicitly unsubscribed to.

TIP

This channel does not require authentication

### [#](#server-notification-5) Server Notification

Notification example

```json
{
  "time": 1606293275,
  "time_ms": 1606293275723,
  "channel": "spot.book_ticker",
  "event": "update",
  "result": {
    "t": 1606293275123,
    "u": 48733182,
    "s": "BTC_USDT",
    "b": "19177.79",
    "B": "0.0003341504",
    "a": "19179.38",
    "A": "0.09"
  }
}
```

Result format:

| Field    | Type    | Description                            |
| -------- | ------- | -------------------------------------- |
| `result` | Object  | Order book ticker object               |
| »`t`     | Integer | Order book update time in milliseconds |
| »`u`     | Integer | Order book update ID                   |
| »`s`     | String  | Currency pair                          |
| »`b`     | String  | best bid price                         |
| »`B`     | String  | best bid amount                        |
| »`a`     | String  | best ask price                         |
| »`A`     | String  | best ask amount                        |

## [#](#changed-order-book-levels) Changed order book levels

`spot.order_book_update`

**update speed:** 20ms or 100ms

### [#](#client-subscription-6) Client Subscription

Code samples

```python
import time
import json

# pip install websocket_client
from websocket import create_connection

ws = create_connection("wss://api.gateio.ws/ws/v4/")
ws.send(json.dumps({
    "time": int(time.time()),
    "channel": "spot.order_book_update",
    "event": "subscribe",  # "unsubscribe" for unsubscription
    "payload": ["BTC_USDT", "100ms"]
}))
print(ws.recv())
```

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
	url := "wss://api.gateio.ws/ws/v4/"
	conn, _, err := websocket.DefaultDialer.Dial(url, nil)
	if err != nil {
		log.Fatal("dial error:", err)
	}
	defer conn.Close()

	subscribe := map[string]interface{}{
		"time":    time.Now().Unix(),
		"channel": "spot.order_book_update",
		"event":   "subscribe",
		"payload": []string{"BTC_USDT", "100ms"},
	}

	msg, err := json.Marshal(subscribe)
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

Payload format:

| Field       | Type            | Required | Description                                                                                                                         |
| ----------- | --------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `payload`   | `Array[String]` | Yes      | Subscription parameters, from left to right,`cp`, `interval`                                                                        |
| »`cp`       | String          | Yes      | Currency pair                                                                                                                       |
| »`interval` | String          | Yes      | Notification update speed: `20ms` or `100ms` (`20ms` corresponds to depth level `20`, and `100ms` corresponds to depth level `100`) |

#### [#](#enumerated-values-4) Enumerated Values

| Property | Value |
| -------- | ----- |
| interval | 20ms  |
| interval | 100ms |

TIP

This channel does not require authentication

### [#](#server-notification-6) Server Notification

Notification example

```json
{
  "time": 1606294781,
  "time_ms": 1606294781236,
  "channel": "spot.order_book_update",
  "event": "update",
  "result": {
    "t": 1606294781123,
    "full": true,
    "l": "100",
    "e": "depthUpdate",
    "E": 1606294781,
    "s": "BTC_USDT",
    "U": 48776301,
    "u": 48776306,
    "b": [
      ["19137.74", "0.0001"],
      ["19088.37", "0"]
    ],
    "a": [["19137.75", "0.6135"]]
  }
}
```

Result format:

| Field              | Type                    | Description                                                                                                                                                                                                                                                                               |
| ------------------ | ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `result`           | Object                  | Changed order book levels                                                                                                                                                                                                                                                                 |
| »`t`               | Integer                 | Order book update time in milliseconds                                                                                                                                                                                                                                                    |
| » `full`           | Boolean                 | `true` indicates a full depth snapshot (e.g., if subscribed at 100ms, a complete 100-level order book is pushed); upon receiving it, the user should replace the local depth with this data. `false` indicates incremental depth; when `false`, this field is not included in the message |
| » `l`              | String                  | Depth level (For example, 100 represents a depth update of 100 levels)                                                                                                                                                                                                                    |
| »`e`               | String                  | Ignore this field                                                                                                                                                                                                                                                                         |
| »`E`               | Integer                 | Update unix timestamp in seconds. Deprecated in favour of`t`                                                                                                                                                                                                                              |
| »`s`               | String                  | Currency pair                                                                                                                                                                                                                                                                             |
| »`U`               | Integer                 | First update order book id in this event since last update                                                                                                                                                                                                                                |
| »`u`               | Integer                 | Last update order book id in this event since last update                                                                                                                                                                                                                                 |
| »`b`               | `Array[OrderBookArray]` | Changed bids since last update                                                                                                                                                                                                                                                            |
| »»`OrderBookArray` | `Array[String]`         | \[Price, Amount\] pair                                                                                                                                                                                                                                                                    |
| »`a`               | `Array[OrderBookArray]` | Changed asks since last update                                                                                                                                                                                                                                                            |
| »»`OrderBookArray` | `Array[String]`         | \[Price, Amount\] pair                                                                                                                                                                                                                                                                    |

## [#](#limited-level-full-order-book-snapshot) Limited-Level Full Order Book Snapshot

`spot.order_book`

**update speed:** 1000ms or 100ms

### [#](#client-subscription-7) Client Subscription

Code samples

```python
import time
import json

# pip install websocket_client
from websocket import create_connection

ws = create_connection("wss://api.gateio.ws/ws/v4/")
ws.send(json.dumps({
    "time": int(time.time()),
    "channel": "spot.order_book",
    "event": "subscribe",  # "unsubscribe" for unsubscription
    "payload": ["BTC_USDT", "5", "100ms"]
}))
print(ws.recv())
```

Code example：

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
	url := "wss://api.gateio.ws/ws/v4/"
	conn, _, err := websocket.DefaultDialer.Dial(url, nil)
	if err != nil {
		log.Fatal("dial error:", err)
	}
	defer conn.Close()

	subscribe := map[string]interface{}{
		"time":    time.Now().Unix(),
		"channel": "spot.order_book",
		"event":   "subscribe",
		"payload": []string{"BTC_USDT", "5", "100ms"},
	}

	msg, err := json.Marshal(subscribe)
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

Payload format:

| Field       | Type            | Required | Description                                                           |
| ----------- | --------------- | -------- | --------------------------------------------------------------------- |
| `payload`   | `Array[String]` | Yes      | Subscription parameters, from left to right,`cp`, `level`, `interval` |
| »`cp`       | String          | Yes      | Currency pair                                                         |
| »`level`    | String          | Yes      | Depth level                                                           |
| »`interval` | String          | Yes      | Notification update speed                                             |

#### [#](#enumerated-values-5) Enumerated Values

| Property | Value  |
| -------- | ------ |
| level    | 5      |
| level    | 10     |
| level    | 20     |
| level    | 50     |
| level    | 100    |
| interval | 100ms  |
| interval | 1000ms |

TIP

This channel does not require authentication

### [#](#server-notification-7) Server Notification

Notification example

```json
{
  "time": 1606295412,
  "time_ms": 1606295412213,
  "channel": "spot.order_book",
  "event": "update",
  "result": {
    "t": 1606295412123,
    "lastUpdateId": 48791820,
    "s": "BTC_USDT",
    "l": "5",
    "bids": [
      ["19079.55", "0.0195"],
      ["19079.07", "0.7341"],
      ["19076.23", "0.00011808"],
      ["19073.9", "0.105"],
      ["19068.83", "0.1009"]
    ],
    "asks": [
      ["19080.24", "0.1638"],
      ["19080.91", "0.1366"],
      ["19080.92", "0.01"],
      ["19081.29", "0.01"],
      ["19083.8", "0.097"]
    ]
  }
}
```

Result format:

| Field              | Type                    | Description                                                            |
| ------------------ | ----------------------- | ---------------------------------------------------------------------- |
| `result`           | Object                  | Order book levels                                                      |
| »`t`               | Integer                 | Order book update time in milliseconds                                 |
| »`lastUpdateId`    | Integer                 | Order book update ID of this snapshot                                  |
| »`s`               | String                  | Currency Pair                                                          |
| » `l`              | String                  | Depth level (For example, 100 represents a depth update of 100 levels) |
| »`bids`            | `Array[OrderBookArray]` | Top level bids in current snapshot, sort by price from high to low     |
| »»`OrderBookArray` | `Array[String]`         | \[Price, Amount\] pair                                                 |
| »`asks`            | `Array[OrderBookArray]` | Top level asks in current snapshot, sort by price from low to high     |
| »»`OrderBookArray` | `Array[String]`         | \[Price, Amount\] pair                                                 |

# [#](#order-book-v2-api) Order Book V2 API

**Provide a faster method for retrieving depth information**

## [#](#maintain-local-depth) Maintain local depth

Note:

1.  Full Depth Snapshot Push (`full=true`):When the channel pushes full depth
    data, the local depth should be completely replaced with the received data.
    Additionally, the `depth ID` should be updated to the value of the `u` field
    in the message. Note that the server may send full depth snapshots multiple
    times.
    1.  The first message pushed after subscribing to this channel is a full
        depth snapshot.
2.  Incremental Depth Push (`full=false`):Incremental messages do not include
    the full field. Instead, each message contains the fields `U` (starting
    depth ID) and `u` (ending depth ID).
    1.  If `U` equals the local `depth ID` + `1`, it indicates a continuous
        depth update:
        1.  Replace the local depth ID with the value of `u` from the message.
        2.  If `a` (asks) and `b` (bids) in the update are not empty, update the
            corresponding bid and ask depth levels based on price.(Each
            `level[0]` represents the price, and `level[1]` represents the
            quantity.)If `level[1]` is `"0"`, the corresponding price level
            should be removed from the order book.
    2.  If `U` ≠ local `depth ID` + `1`, the depth data is not continuous. In
        this case, you must unsubscribe from the market and resubscribe to
        retrieve the initial depth snapshot.
3.  Subscription Limitations:For the same spot trading pair and the same depth
    stream, a single connection is allowed to subscribe only once. Duplicate
    subscription attempts will result in an error. Example of a failed attempt:

```json
{
  "time": 1747391482,
  "time_ms": 1747391482960,
  "id": 1,
  "conn_id": "d9db9373dc5e081e",
  "trace_id": "ee001938590e183db957bd5ba71651c0",
  "channel": "spot.obu",
  "event": "subscribe",
  "payload": ["ob.BTC_USDT.400"],
  "error": {
    "code": 2,
    "message": "Alert sub ob.BTC_USDT.400"
  },
  "result": {
    "status": "fail"
  }
}
```

## [#](#order-book-v2-subscription) Order book V2 subscription

Code example

```python
from websocket import create_connection

ws = create_connection("wss://api.gateio.ws/ws/v4/")
ws.send('{"time" : 123456, "channel" : "spot.obu",
        "event": "subscribe", "payload" : ["ob.BTC_USDT.50"]}')
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
	url := "wss://api.gateio.ws/ws/v4/"
	conn, _, err := websocket.DefaultDialer.Dial(url, nil)
	if err != nil {
		log.Fatal("dial error:", err)
	}
	defer conn.Close()

	msg := `{"time" : 123456, "channel" : "spot.obu", "event": "subscribe", "payload" : ["ob.BTC_USDT.50"]}`

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
  "time": 1747054611,
  "time_ms": 1747054611614,
  "conn_id": "d7de96c024f2a5b2",
  "trace_id": "e6fd9bdd617fcdb80d0762ffa33e71f6",
  "channel": "spot.obu",
  "event": "subscribe",
  "payload": ["ob.BTC_USDT.50"],
  "result": {
    "status": "success"
  }
}
```

### [#](#request) Request

- channel

  `spot.obu`

- event

  `subscribe`

- params

  `payload`It is a list containing stream names. The format is:
  ob.{symbol}.{level}; for example, ob.BTC_USDT.400, ob.BTC_USDT.50

  The `level` enum values are: 400, 50; Update frequency: 400-level updates
  every 100 ms; 50-level updates every 20 ms.

## [#](#order-book-v2-update-notification) Order book V2 update notification

Example of full depth push:

```json
{
  "channel": "spot.obu",
  "result": {
    "t": 1747054612673,
    "full": true,
    "s": "ob.BTC_USDT.50",
    "u": 73777715168,
    "b": [
      ["104027.1", "509392"],
      ["104027", "477932"]
    ],
    "a": [
      ["104027.2", "44617"],
      ["104027.4", "39322"]
    ]
  },
  "time_ms": 1747054612848
}
```

Example of incremental push:

```json
{
  "channel": "spot.obu",
  "result": {
    "t": 1747054612695,
    "s": "ob.BTC_USDT.50",
    "U": 73777715169,
    "u": 73777715212,
    "b": [
      ["104024.5", "10343"],
      ["104014.5", "509392"]
    ],
    "a": [
      ["104027.2", "0"],
      ["104027.4", "0"]
    ]
  },
  "time_ms": 1747054612925
}
```

**Notify contract order book v2 update**

### [#](#notify) Notify

- channel

  `spot.obu`

- event

  `update`

- params

| field             | type                    | description                                                                                                                                            |
| ----------------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `result`          | Object                  | Ask and bid price changes since the previous update                                                                                                    |
| »`t`              | Integer                 | Order book generation timestamp (in milliseconds)                                                                                                      |
| »`full`           | Boolean                 | `true` indicates a full depth snapshot; `false` indicates incremental depth updates. When the value is `false`, this field is omitted from the message |
| »`s`              | String                  | Name of the depth stream                                                                                                                               |
| »`U`              | Integer                 | Starting order book update ID of this update                                                                                                           |
| »`u`              | Integer                 | Ending order book update ID of this update                                                                                                             |
| »`b`              | `Array[OrderBookArray]` | Bids updates since the last update                                                                                                                     |
| »» OrderBookArray | `Array[String]`         | An array pair \[Price, Amount\]; if Amount = 0, the corresponding entry should be removed from the local depth.                                        |
| »`a`              | `Array[OrderBookArray]` | Asks updates since the last update                                                                                                                     |
| »» OrderBookArray | `Array[String]`         | An array pair \[Price, Amount\]; if Amount = 0, the corresponding entry should be removed from the local depth.                                        |

## [#](#order-book-v2-update-unsubscription) Order book V2 update unsubscription

Code example

```python
from websocket import create_connection

ws = create_connection("wss://api.gateio.ws/ws/v4/")
ws.send(
  '{"time" : 123456, "channel" : "spot.obu", "event": "unsubscribe", "payload" : ["ob.BTC_USDT.50"]}')
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
	url := "wss://api.gateio.ws/ws/v4/"
	conn, _, err := websocket.DefaultDialer.Dial(url, nil)
	if err != nil {
		log.Fatal("dial error:", err)
	}
	defer conn.Close()

	msg := `{"time" : 123456, "channel" : "spot.obu", "event": "unsubscribe", "payload" : ["ob.BTC_USDT.50"]}`

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
  "time": 1743673617,
  "time_ms": 1743673617242,
  "id": 1,
  "conn_id": "7b06ff199a98ab0e",
  "trace_id": "8f86e4021a84440e502f73fde5b94918",
  "channel": "spot.obu",
  "event": "unsubscribe",
  "payload": ["ob.BTC_USDT.50"],
  "result": {
    "status": "success"
  }
}
```

**Unsubscribe specified contract order book v2**

### [#](#request-2) Request

- channel

  `spot.obu`

- event

  `unsubscribe`

# [#](#orders-channel) Orders Channel

`spot.orders`

**update speed:** realtime

Notify changes of orders created in subscribed currency pairs. Including order
creation, fill, close and cancellation

## [#](#client-subscription-8) Client Subscription

Code samples

```python
import time
import json

# pip install websocket_client
from websocket import create_connection

ws = create_connection("wss://api.gateio.ws/ws/v4/")
request = {
    "time": int(time.time()),
    "channel": "spot.orders",
    "event": "subscribe",  # "unsubscribe" for unsubscription
    "payload": ["BTC_USDT"]
}
# refer to Authentication section for gen_sign implementation
request['auth'] = gen_sign(request['channel'], request['event'], request['time'])
ws.send(json.dumps(request))
print(ws.recv())
```

Code example：

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
	url := "wss://api.gateio.ws/ws/v4/"
	conn, _, err := websocket.DefaultDialer.Dial(url, nil)
	if err != nil {
		log.Fatal("dial error:", err)
	}
	defer conn.Close()

	timestamp := time.Now().Unix()
	request := map[string]interface{}{
		"time":    timestamp,
		"channel": "spot.orders",
		"event":   "subscribe",
		"payload": []string{"BTC_USDT"},
	}

	// refer to Authentication section for gen_sign implementation
	request["auth"] = genSign(request["channel"].(string), request["event"].(string), timestamp)

	msg, err := json.Marshal(request)
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

Payload format:

| Field     | Type            | Required | Description             |
| --------- | --------------- | -------- | ----------------------- |
| `payload` | `Array[String]` | Yes      | List of currency pairs. |

You can subscribe/unsubscribe multiple times. Currency pair subscribed earlier
will not be overridden unless explicitly unsubscribed to.

If you want to subscribe to all orders updates in all currency pairs, you can
include `!all` in currency pair list.

WARNING

This channel requires authentication.

## [#](#server-notification-8) Server Notification

Notification example

```json
{
  "time": 1694655225,
  "time_ms": 1694655225315,
  "channel": "spot.orders",
  "event": "update",
  "result": [
    {
      "id": "399123456",
      "text": "t-testtext",
      "create_time": "1694655225",
      "update_time": "1694655225",
      "currency_pair": "BTC_USDT",
      "type": "limit",
      "account": "spot",
      "side": "sell",
      "amount": "0.0001",
      "price": "26253.3",
      "time_in_force": "gtc",
      "left": "0.0001",
      "filled_total": "0",
      "filled_amount": "812.8",
      "avg_deal_price": "0",
      "fee": "0",
      "fee_currency": "USDT",
      "point_fee": "0",
      "gt_fee": "0",
      "rebated_fee": "0",
      "rebated_fee_currency": "USDT",
      "create_time_ms": "1694655225315",
      "update_time_ms": "1694655225315",
      "user": 3497082,
      "event": "put",
      "stp_id": 0,
      "stp_act": "-",
      "finish_as": "open",
      "biz_info": "-",
      "amend_text": "-"
    }
  ]
}
```

Updated order list. Note it is possible that multiple currency pairs' orders
will be updated in one notification.

Result format:

| Field             | Type            | Description                                  |
| ----------------- | --------------- | -------------------------------------------- |
| `result`          | `Array[Object]` | Updated order list                           |
| »`id`             | String          | Order ID                                     |
| »`user`           | Integer         | User ID                                      |
| »`text`           | String          | User defined information                     |
| »`create_time`    | String          | Order creation time                          |
| »`create_time_ms` | String          | Order creation time in milliseconds          |
| »`update_time`    | String          | Order last modification time                 |
| »`update_time_ms` | String          | Order last modification time in milliseconds |
| »`event`          | String          | Order event                                  |

\- `put`: order creation  
\- `update`: order fill update  
\- `finish`: order closed or cancelled | | »`currency_pair` | String | Currency
pair | | »`type` | String | Order type | | »`account` | String | Account type.
spot - spot account; margin - margin account; cross_margin - cross margin
account; unified - unified account | | »`side` | String | Order side | |
»`amount` | String | Trade amount | | »`price` | String | Order price | |
»`time_in_force` | String | Time in force

\- gtc: GoodTillCancelled  
\- ioc: ImmediateOrCancelled, taker only  
\- poc: PendingOrCancelled, makes a post-only order that always enjoys a maker
fee | | »`left` | String | Amount left to fill | | »`filled_total` | String |
Total filled in quote currency | | »`filled_amount` | String | Currency
transaction volume | | »`avg_deal_price` | String | Average transaction price of
orders | | »`fee` | String | Fee deducted | | »`fee_currency` | String | Fee
currency unit | | »`point_fee` | String | Point used to deduct fee | | »`gt_fee`
| String | GT used to deduct fee | | »`gt_discount` | Boolean | Whether GT fee
discount is used | | »`rebated_fee` | String | Rebated fee | |
»`rebated_fee_currency` | String | Rebated fee currency unit | | »`auto_repay` |
Boolean | Enable or disable automatic repayment for automatic borrow loan
generated by cross margin order. Default is disabled. Note that:  
1\. This field is only effective for cross margin orders. Margin account does
not support setting auto repayment for orders.  
2\. `auto_borrow` and `auto_repay` cannot be both set to true in one order. | |
»`auto_borrow` | Boolean | Used in margin or cross margin trading to allow
automatic loan of insufficient amount if balance is not enough. | | »`stp_id` |
Integer | Orders between users in the same `stp_id` group are not allowed to be
self-traded. Detail to ApiV4 | | »`stp_act` | String | Self-Trading Prevention
Action. Users can use this field to set self-trade prevetion strategies | |
»`finish_as` | String | How the order was finished.  
\- `open`: processing  
\- `filled`: filled totally  
\- `cancelled`: manually cancelled  
\- `ioc`: time in force is `IOC`, finish immediately  
\- `stp`: cancelled because self trade prevention  
\- `poc`: pending order policy is not met because tif is set to `poc`  
\- `fok`: not fully filled immediately because tif is set to `fok`  
\- `trader_not_enough`: insufficient counterparties lead to order cancellation  
\- `depth_not_enough`: insufficient depth leads to order cancellation  
\- `small`: order amount too small  
\- `liquidate_cancelled`: cancelled by liquidate  
\- `-`: unknown | | »`amend_text` | String | The custom data that the user
remarked when amending the order |

#### [#](#enumerated-values-6) Enumerated Values

| Property      | Value              | Description                                                                                                                                                                                                                                               |
| ------------- | ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| type          | limit              | Place a limit order in the spot account                                                                                                                                                                                                                   |
| type          | market             | Place a market order in the spot account                                                                                                                                                                                                                  |
| type          | limit_repay        | When a limit order is filled under the unified account, the system will automatically trigger repayment                                                                                                                                                   |
| type          | market_repay       | When a market order is filled under the unified account, the system will automatically trigger repayment                                                                                                                                                  |
| type          | limit_borrow       | When placing a limit order under the unified account with insufficient balance, the system will automatically borrow funds before submitting the order                                                                                                    |
| type          | market_borrow      | When placing a market order under the unified account with insufficient balance, the system will automatically borrow funds before submitting the order                                                                                                   |
| type          | limit_borrow_repay | Under the unified account, if the available balance is insufficient when placing a limit order, the system will automatically borrow the required funds before order submission. Upon execution of the order, the system will trigger automatic repayment |
| account       | spot               | spot account                                                                                                                                                                                                                                              |
| account       | margin             | margin account                                                                                                                                                                                                                                            |
| account       | cross_margin       | cross margin account                                                                                                                                                                                                                                      |
| account       | unified            | unified account                                                                                                                                                                                                                                           |
| side          | buy                | buy                                                                                                                                                                                                                                                       |
| side          | sell               | sell                                                                                                                                                                                                                                                      |
| time_in_force | gtc                | GoodTillCancelled                                                                                                                                                                                                                                         |
| time_in_force | ioc                | ImmediateOrCancelled                                                                                                                                                                                                                                      |
| time_in_force | poc                | PendingOrCancelled                                                                                                                                                                                                                                        |

# [#](#orders-channel-v2-lite) Orders Channel V2(lite)

`spot.orders_v2`

**update speed:** realtime

**Difference between the orders channel `spot.orders` and the V2 version
`spot.orders_v2`:** `spot.orders_v2` does not include fee-related fields,
specifically: `fee`, `point_fee`, `gt_fee`, and `rebated_fee`.

Notify changes of orders created in subscribed currency pairs. Including order
creation, fill, close and cancellation

## [#](#client-subscription-9) Client Subscription

Code samples

```python
import time
import json

# pip install websocket_client
from websocket import create_connection

ws = create_connection("wss://api.gateio.ws/ws/v4/")
request = {
    "time": int(time.time()),
    "channel": "spot.orders_v2",
    "event": "subscribe",  # "unsubscribe" for unsubscription
    "payload": ["BTC_USDT"]
}
# refer to Authentication section for gen_sign implementation
request['auth'] = gen_sign(request['channel'], request['event'], request['time'])
ws.send(json.dumps(request))
print(ws.recv())
```

Code example：

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
	url := "wss://api.gateio.ws/ws/v4/"
	conn, _, err := websocket.DefaultDialer.Dial(url, nil)
	if err != nil {
		log.Fatal("dial error:", err)
	}
	defer conn.Close()

	timestamp := time.Now().Unix()
	request := map[string]interface{}{
		"time":    timestamp,
		"channel": "spot.orders_v2",
		"event":   "subscribe",
		"payload": []string{"BTC_USDT"},
	}

	// refer to Authentication section for gen_sign implementation
	request["auth"] = genSign(request["channel"].(string), request["event"].(string), timestamp)

	msg, err := json.Marshal(request)
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

Payload format:

| Field     | Type            | Required | Description             |
| --------- | --------------- | -------- | ----------------------- |
| `payload` | `Array[String]` | Yes      | List of currency pairs. |

You can subscribe/unsubscribe multiple times. Currency pair subscribed earlier
will not be overridden unless explicitly unsubscribed to.

If you want to subscribe to all orders updates in all currency pairs, you can
include `!all` in currency pair list.

WARNING

This channel requires authentication.

## [#](#server-notification-9) Server Notification

Notification example

```json
{
  "time": 1694655225,
  "time_ms": 1694655225315,
  "channel": "spot.orders_v2",
  "event": "update",
  "result": [
    {
      "id": "399123456",
      "text": "t-testtext",
      "create_time": "1694655225",
      "update_time": "1694655225",
      "currency_pair": "BTC_USDT",
      "type": "limit",
      "account": "spot",
      "side": "sell",
      "amount": "0.0001",
      "price": "26253.3",
      "time_in_force": "gtc",
      "left": "0.0001",
      "filled_total": "0",
      "filled_amount": "812.8",
      "avg_deal_price": "0",
      "fee_currency": "USDT",
      "rebated_fee_currency": "USDT",
      "create_time_ms": "1694655225315",
      "update_time_ms": "1694655225315",
      "user": 3497082,
      "event": "put",
      "stp_id": 0,
      "stp_act": "-",
      "finish_as": "open",
      "biz_info": "-",
      "amend_text": "-"
    }
  ]
}
```

Updated order list. Note it is possible that multiple currency pairs' orders
will be updated in one notification.

Result format:

| Field             | Type            | Description                                  |
| ----------------- | --------------- | -------------------------------------------- |
| `result`          | `Array[Object]` | Updated order list                           |
| »`id`             | String          | Order ID                                     |
| »`user`           | Integer         | User ID                                      |
| »`text`           | String          | User defined information                     |
| »`create_time`    | String          | Order creation time                          |
| »`create_time_ms` | String          | Order creation time in milliseconds          |
| »`update_time`    | String          | Order last modification time                 |
| »`update_time_ms` | String          | Order last modification time in milliseconds |
| »`event`          | String          | Order event                                  |

\- `put`: order creation  
\- `update`: order fill update  
\- `finish`: order closed or cancelled | | »`currency_pair` | String | Currency
pair | | »`type` | String | Order type | | »`account` | String | Account type.
spot - spot account; margin - margin account; cross_margin - cross margin
account; unified - unified account | | »`side` | String | Order side | |
»`amount` | String | Trade amount | | »`price` | String | Order price | |
»`time_in_force` | String | Time in force

\- gtc: GoodTillCancelled  
\- ioc: ImmediateOrCancelled, taker only  
\- poc: PendingOrCancelled, makes a post-only order that always enjoys a maker
fee | | »`left` | String | Amount left to fill | | »`filled_total` | String |
Total filled in quote currency | | »`filled_amount` | String | Currency
transaction volume | | »`avg_deal_price` | String | Average transaction price of
orders | | »`fee_currency` | String | Fee currency unit | | »`gt_discount` |
Boolean | Whether GT fee discount is used | | »`rebated_fee_currency` | String |
Rebated fee currency unit | | »`auto_repay` | Boolean | Enable or disable
automatic repayment for automatic borrow loan generated by cross margin order.
Default is disabled. Note that:  
1\. This field is only effective for cross margin orders. Margin account does
not support setting auto repayment for orders.  
2\. `auto_borrow` and `auto_repay` cannot be both set to true in one order. | |
»`auto_borrow` | Boolean | Used in margin or cross margin trading to allow
automatic loan of insufficient amount if balance is not enough. | | »`stp_id` |
Integer | Orders between users in the same `stp_id` group are not allowed to be
self-traded. Detail to ApiV4 | | »`stp_act` | String | Self-Trading Prevention
Action. Users can use this field to set self-trade prevetion strategies | |
»`finish_as` | String | How the order was finished.  
\- `open`: processing  
\- `filled`: filled totally  
\- `cancelled`: manually cancelled  
\- `ioc`: time in force is `IOC`, finish immediately  
\- `stp`: cancelled because self trade prevention  
\- `poc`: pending order policy is not met because tif is set to `poc`  
\- `fok`: not fully filled immediately because tif is set to `fok`  
\- `trader_not_enough`: insufficient counterparties lead to order cancellation  
\- `depth_not_enough`: insufficient depth leads to order cancellation  
\- `small`: order amount too small  
\- `liquidate_cancelled`: cancelled by liquidate  
\- `-`: unknown | | »`amend_text` | String | The custom data that the user
remarked when amending the order |

#### [#](#enumerated-values-7) Enumerated Values

| Property      | Value              | Description                                                                                                                                                                                                                                               |
| ------------- | ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| type          | limit              | Place a limit order in the spot account                                                                                                                                                                                                                   |
| type          | market             | Place a market order in the spot account                                                                                                                                                                                                                  |
| type          | limit_repay        | When a limit order is filled under the unified account, the system will automatically trigger repayment                                                                                                                                                   |
| type          | market_repay       | When a market order is filled under the unified account, the system will automatically trigger repayment                                                                                                                                                  |
| type          | limit_borrow       | When placing a limit order under the unified account with insufficient balance, the system will automatically borrow funds before submitting the order                                                                                                    |
| type          | market_borrow      | When placing a market order under the unified account with insufficient balance, the system will automatically borrow funds before submitting the order                                                                                                   |
| type          | limit_borrow_repay | Under the unified account, if the available balance is insufficient when placing a limit order, the system will automatically borrow the required funds before order submission. Upon execution of the order, the system will trigger automatic repayment |
| account       | spot               | spot account                                                                                                                                                                                                                                              |
| account       | margin             | margin account                                                                                                                                                                                                                                            |
| account       | cross_margin       | cross margin account                                                                                                                                                                                                                                      |
| account       | unified            | unified account                                                                                                                                                                                                                                           |
| side          | buy                | buy                                                                                                                                                                                                                                                       |
| side          | sell               | sell                                                                                                                                                                                                                                                      |
| time_in_force | gtc                | GoodTillCancelled                                                                                                                                                                                                                                         |
| time_in_force | ioc                | ImmediateOrCancelled                                                                                                                                                                                                                                      |
| time_in_force | poc                | PendingOrCancelled                                                                                                                                                                                                                                        |

# [#](#user-trades-channel) User Trades Channel

`spot.usertrades`

**update speed:** realtime

Notify user's personal trades in specified currency pairs. Unlike `spot.trades`
channel, this is a private channel and notify all trades related to user
whatever the trade role(maker/taker) is.

## [#](#client-subscription-10) Client Subscription

Code samples

```python
import time
import json

# pip install websocket_client
from websocket import create_connection

ws = create_connection("wss://api.gateio.ws/ws/v4/")
request = {
    "time": int(time.time()),
    "channel": "spot.usertrades",
    "event": "subscribe",  # "unsubscribe" for unsubscription
    "payload": ["BTC_USDT"]
}
# refer to Authentication section for gen_sign implementation
request['auth'] = gen_sign(request['channel'], request['event'], request['time'])
ws.send(json.dumps(request))
print(ws.recv())
```

Code example：

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
	url := "wss://api.gateio.ws/ws/v4/"
	conn, _, err := websocket.DefaultDialer.Dial(url, nil)
	if err != nil {
		log.Fatal("dial error:", err)
	}
	defer conn.Close()

	timestamp := time.Now().Unix()
	request := map[string]interface{}{
		"time":    timestamp,
		"channel": "spot.usertrades",
		"event":   "subscribe",
		"payload": []string{"BTC_USDT"},
	}

	// refer to Authentication section for gen_sign implementation
	request["auth"] = genSign(request["channel"].(string), request["event"].(string), timestamp)

	msg, err := json.Marshal(request)
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

Payload format:

| Field     | Type            | Required | Description             |
| --------- | --------------- | -------- | ----------------------- |
| `payload` | `Array[String]` | Yes      | List of currency pairs. |

You can subscribe/unsubscribe multiple times. Currency pair subscribed earlier
will not be overridden unless explicitly unsubscribed to.

If you want to subscribe to all user trades updates in all currency pairs, you
can include `!all` in currency pair list.

WARNING

This channel requires authentication.

## [#](#server-notification-10) Server Notification

Notification example

```json
{
  "time": 1605176741,
  "time_ms": 1605176741763,
  "channel": "spot.usertrades",
  "event": "update",
  "result": [
    {
      "id": 5736713,
      "user_id": 1000001,
      "order_id": "30784428",
      "currency_pair": "BTC_USDT",
      "create_time": 1605176741,
      "create_time_ms": "1605176741123.456",
      "side": "sell",
      "amount": "1.00000000",
      "role": "taker",
      "price": "10000.00000000",
      "fee": "0.00200000000000",
      "point_fee": "0",
      "gt_fee": "0",
      "text": "apiv4",
      "id_market": 5736713
    }
  ]
}
```

Updated user trades list. Note it is possible that multiple currency pairs'
trades will be updated in one notification.

Result format:

| Field             | Type               | Description                                                                               |
| ----------------- | ------------------ | ----------------------------------------------------------------------------------------- |
| `result`          | `Array[UserTrade]` | Updated user trades list                                                                  |
| »`id`             | Integer            | All Market Trade ID                                                                       |
| »`user_id`        | Integer            | User ID                                                                                   |
| »`order_id`       | String             | Related order ID                                                                          |
| »`currency_pair`  | String             | currency pair                                                                             |
| »`create_time`    | Integer            | Trading time in seconds                                                                   |
| »`create_time_ms` | String             | Trading time in milliseconds. Precision higher than ms will be appended as decimal points |
| »`side`           | String             | Order side                                                                                |
| »`amount`         | String             | Trade Amount                                                                              |
| »`role`           | String             | Trade Role (maker/taker)                                                                  |
| »`price`          | String             | Trade price                                                                               |
| »`fee`            | String             | Fee deducted                                                                              |
| »`fee_currency`   | String             | Fee currency unit                                                                         |
| »`point_fee`      | String             | Point used to deduct fee                                                                  |
| »`gt_fee`         | String             | GT used to deduct fee                                                                     |
| »`text`           | String             | User defined information                                                                  |
| »`id_market`      | Integer            | One market Trade ID (Continuous Growth within a Single Market ID)                         |

#### [#](#enumerated-values-8) Enumerated Values

| Property | Value |
| -------- | ----- |
| side     | buy   |
| side     | sell  |
| role     | maker |
| role     | taker |

# [#](#user-trades-channel-v2-lite) User Trades Channel V2 (lite)

`spot.usertrades_v2`

**update speed:** realtime

**Difference between the user trades channel `spot.usertrades` and its V2
version `spot.usertrades_v2`:** `spot.usertrades_v2` does not include
fee-related fields, specifically: `fee`, `point_fee`, `gt_fee` and
`fee_currency`.

Notify user's personal trades in specified currency pairs. Unlike `spot.trades`
channel, this is a private channel and notify all trades related to user
whatever the trade role(maker/taker) is.

## [#](#client-subscription-11) Client Subscription

Code samples

```python
import time
import json

# pip install websocket_client
from websocket import create_connection

ws = create_connection("wss://api.gateio.ws/ws/v4/")
request = {
    "time": int(time.time()),
    "channel": "spot.usertrades_v2",
    "event": "subscribe",  # "unsubscribe" for unsubscription
    "payload": ["BTC_USDT"]
}
# refer to Authentication section for gen_sign implementation
request['auth'] = gen_sign(request['channel'], request['event'], request['time'])
ws.send(json.dumps(request))
print(ws.recv())
```

Code example：

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
	url := "wss://api.gateio.ws/ws/v4/"
	conn, _, err := websocket.DefaultDialer.Dial(url, nil)
	if err != nil {
		log.Fatal("dial error:", err)
	}
	defer conn.Close()

	timestamp := time.Now().Unix()
	request := map[string]interface{}{
		"time":    timestamp,
		"channel": "spot.usertrades_v2",
		"event":   "subscribe",
		"payload": []string{"BTC_USDT"},
	}

	// refer to Authentication section for gen_sign implementation
  request["auth"] = genSign(request["channel"].(string), request["event"].(string), timestamp)

	msg, err := json.Marshal(request)
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

Payload format:

| Field     | Type            | Required | Description             |
| --------- | --------------- | -------- | ----------------------- |
| `payload` | `Array[String]` | Yes      | List of currency pairs. |

You can subscribe/unsubscribe multiple times. Currency pair subscribed earlier
will not be overridden unless explicitly unsubscribed to.

If you want to subscribe to all user trades updates in all currency pairs, you
can include `!all` in currency pair list.

WARNING

This channel requires authentication.

## [#](#server-notification-11) Server Notification

Notification example

```json
{
  "time": 1605176741,
  "time_ms": 1605176741763,
  "channel": "spot.usertrades_v2",
  "event": "update",
  "result": [
    {
      "id": 5736713,
      "user_id": 1000001,
      "order_id": "30784428",
      "currency_pair": "BTC_USDT",
      "create_time": 1605176741,
      "create_time_ms": "1605176741123.456",
      "side": "sell",
      "amount": "1.00000000",
      "role": "taker",
      "price": "10000.00000000",
      "text": "apiv4",
      "id_market": 5736713
    }
  ]
}
```

Updated user trades list. Note it is possible that multiple currency pairs'
trades will be updated in one notification.

Result format:

| Field             | Type               | Description                                                                               |
| ----------------- | ------------------ | ----------------------------------------------------------------------------------------- |
| `result`          | `Array[UserTrade]` | Updated user trades list                                                                  |
| »`id`             | Integer            | All Market Trade ID                                                                       |
| »`user_id`        | Integer            | User ID                                                                                   |
| »`order_id`       | String             | Related order ID                                                                          |
| »`currency_pair`  | String             | currency pair                                                                             |
| »`create_time`    | Integer            | Trading time in seconds                                                                   |
| »`create_time_ms` | String             | Trading time in milliseconds. Precision higher than ms will be appended as decimal points |
| »`side`           | String             | Order side                                                                                |
| »`amount`         | String             | Trade Amount                                                                              |
| »`role`           | String             | Trade Role (maker/taker)                                                                  |
| »`price`          | String             | Trade price                                                                               |
| »`fee_currency`   | String             | Fee currency unit                                                                         |
| »`text`           | String             | User defined information                                                                  |
| »`id_market`      | Integer            | One market Trade ID (Continuous Growth within a Single Market ID)                         |

#### [#](#enumerated-values-9) Enumerated Values

| Property | Value |
| -------- | ----- |
| side     | buy   |
| side     | sell  |
| role     | maker |
| role     | taker |

# [#](#spot-balance-channel) Spot Balance Channel

`spot.balances`

**update speed:** realtime

Notify user spot balance updates

## [#](#client-subscription-12) Client Subscription

Code samples

```python
import time
import json

# pip install websocket_client
from websocket import create_connection

ws = create_connection("wss://api.gateio.ws/ws/v4/")
request = {
    "time": int(time.time()),
    "channel": "spot.balances",
    "event": "subscribe",  # "unsubscribe" for unsubscription
}
# refer to Authentication section for gen_sign implementation
request['auth'] = gen_sign(request['channel'], request['event'], request['time'])
ws.send(json.dumps(request))
print(ws.recv())
```

Code example：

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
	url := "wss://api.gateio.ws/ws/v4/"
	conn, _, err := websocket.DefaultDialer.Dial(url, nil)
	if err != nil {
		log.Fatal("dial error:", err)
	}
	defer conn.Close()

	timestamp := time.Now().Unix()
	request := map[string]interface{}{
		"time":    timestamp,
		"channel": "spot.balances",
		"event":   "subscribe",
	}

	// refer to Authentication section for gen_sign implementation
	request["auth"] = genSign(request["channel"].(string), request["event"].(string), timestamp)

	msg, err := json.Marshal(request)
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

No payload is required.

WARNING

This channel requires authentication.

## [#](#server-notification-12) Server Notification

Notification example

```json
{
  "time": 1605248616,
  "time_ms": 1605248616763,
  "channel": "spot.balances",
  "event": "update",
  "result": [
    {
      "timestamp": "1667556323",
      "timestamp_ms": "1667556323730",
      "user": "1000001",
      "currency": "USDT",
      "change": "0",
      "total": "222244.3827652",
      "available": "222244.3827",
      "freeze": "5",
      "freeze_change": "5.000000",
      "change_type": "order-create"
    }
  ]
}
```

Result format:

| Field            | Type                 | Description                    |
| ---------------- | -------------------- | ------------------------------ |
| `result`         | `Array[SpotBalance]` | New balance update list        |
| »`timestamp`     | String               | Unix timestamp in seconds      |
| »`timestamp_ms`  | String               | Unix timestamp in milliseconds |
| »`user`          | String               | User id                        |
| »`currency`      | String               | Changed currency               |
| »`change`        | String               | Changed amount                 |
| »`total`         | String               | Total spot balance             |
| »`available`     | String               | Balance available to use       |
| »`freeze`        | String               | Balance locked amount          |
| »`freeze_change` | String               | Balance locked changed amount  |
| »`change_type`   | String               | Balance change type            |

\- `withdraw`  
\- `deposit`  
\- `trade-fee-deduct`  
\- `order-create`: order creation  
\- `order-match`: order fill update  
\- `order-update`: cancel order or modify order  
\- `margin-transfer`  
\- `future-transfer`  
\- `cross-margin-transfer`  
\- `other` |

# [#](#margin-balance-channel) Margin Balance Channel

`spot.margin_balances`

**update speed:** realtime

Notify user margin balance updates. Any margin funding, borrowing will generate
a new notification.

## [#](#client-subscription-13) Client Subscription

Code samples

```python
import time
import json

# pip install websocket_client
from websocket import create_connection

ws = create_connection("wss://api.gateio.ws/ws/v4/")
request = {
    "time": int(time.time()),
    "channel": "spot.margin_balances",
    "event": "subscribe",  # "unsubscribe" for unsubscription
}
# refer to Authentication section for gen_sign implementation
request['auth'] = gen_sign(request['channel'], request['event'], request['time'])
ws.send(json.dumps(request))
print(ws.recv())
```

Code example：

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
	url := "wss://api.gateio.ws/ws/v4/"
	conn, _, err := websocket.DefaultDialer.Dial(url, nil)
	if err != nil {
		log.Fatal("dial error:", err)
	}
	defer conn.Close()

	timestamp := time.Now().Unix()
	request := map[string]interface{}{
		"time":    timestamp,
		"channel": "spot.margin_balances",
		"event":   "subscribe",
	}

	// refer to Authentication section for gen_sign implementation
	request["auth"] = genSign(request["channel"].(string), request["event"].(string), timestamp)

	msg, err := json.Marshal(request)
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

No payload is required.

WARNING

This channel requires authentication.

## [#](#server-notification-13) Server Notification

Notification example

```json
{
  "time": 1605248616,
  "time_ms": 1605248616763,
  "channel": "spot.margin_balances",
  "event": "update",
  "result": [
    {
      "timestamp": "1605248812",
      "timestamp_ms": "1605248812123",
      "user": "1000001",
      "currency_pair": "BTC_USDT",
      "currency": "BTC",
      "change": "-0.002",
      "available": "999.999836",
      "freeze": "1",
      "borrowed": "0",
      "interest": "0"
    }
  ]
}
```

Result format:

| Field            | Type                   | Description                                    |
| ---------------- | ---------------------- | ---------------------------------------------- |
| `result`         | `Array[MarginBalance]` | New margin balance update list                 |
| »`timestamp`     | String                 | Unix timestamp in seconds                      |
| »`timestamp_ms`  | String                 | Unix timestamp in milliseconds                 |
| »`user`          | String                 | User id                                        |
| »`currency_pair` | String                 | Currency pair                                  |
| »`currency`      | String                 | Changed currency                               |
| »`change`        | String                 | Changed amount                                 |
| »`available`     | String                 | Amount available to use                        |
| »`freeze`        | String                 | Amount locked, e.g. used in funding book       |
| »`borrowed`      | String                 | Amount borrowed                                |
| »`interest`      | String                 | Total unpaid interest generated from borrowing |

# [#](#funding-balance-channel) Funding Balance Channel

`spot.funding_balances`

**update speed:** realtime

Notify user funding balance updates. Including new lending loan being created,
cancelled, or borrowed by someone else.

## [#](#client-subscription-14) Client Subscription

Code samples

```python
import time
import json

# pip install websocket_client
from websocket import create_connection

ws = create_connection("wss://api.gateio.ws/ws/v4/")
request = {
    "time": int(time.time()),
    "channel": "spot.funding_balances",
    "event": "subscribe",  # "unsubscribe" for unsubscription
}
# refer to Authentication section for gen_sign implementation
request['auth'] = gen_sign(request['channel'], request['event'], request['time'])
ws.send(json.dumps(request))
print(ws.recv())
```

Code example：

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
	url := "wss://api.gateio.ws/ws/v4/"
	conn, _, err := websocket.DefaultDialer.Dial(url, nil)
	if err != nil {
		log.Fatal("dial error:", err)
	}
	defer conn.Close()

	timestamp := time.Now().Unix()
	request := map[string]interface{}{
		"time":    timestamp,
		"channel": "spot.funding_balances",
		"event":   "subscribe",
	}

	// refer to Authentication section for gen_sign implementation
	request["auth"] = genSign(request["channel"].(string), request["event"].(string), timestamp)

	msg, err := json.Marshal(request)
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

No payload is required.

WARNING

This channel requires authentication.

## [#](#server-notification-14) Server Notification

Notification example

```json
{
  "time": 1605248616,
  "time_ms": 1605248616763,
  "channel": "spot.funding_balances",
  "event": "update",
  "result": [
    {
      "timestamp": "1605248616",
      "timestamp_ms": "1605248616123",
      "user": "1000001",
      "currency": "USDT",
      "change": "100",
      "freeze": "100",
      "lent": "0"
    }
  ]
}
```

Result format:

| Field           | Type                    | Description                              |
| --------------- | ----------------------- | ---------------------------------------- |
| `result`        | `Array[FundingBalance]` | New funding balance update list          |
| »`timestamp`    | String                  | Unix timestamp in seconds                |
| »`timestamp_ms` | String                  | Unix timestamp in milliseconds           |
| »`user`         | String                  | User id                                  |
| »`currency`     | String                  | Changed currency                         |
| »`change`       | String                  | Changed amount                           |
| »`freeze`       | String                  | Amount locked, e.g. used in funding book |
| »`lent`         | String                  | Amount lent                              |

# [#](#cross-margin-balance-channel) Cross Margin Balance Channel

`spot.cross_balances`

**update speed:** realtime

Notify user cross margin balance updates

Note that open orders will not trigger balance update until being partially or
fully filled.

## [#](#client-subscription-15) Client Subscription

Code samples

```python
import time
import json

# pip install websocket_client
from websocket import create_connection

ws = create_connection("wss://api.gateio.ws/ws/v4/")
request = {
    "time": int(time.time()),
    "channel": "spot.cross_balances",
    "event": "subscribe",  # "unsubscribe" for unsubscription
}
# refer to Authentication section for gen_sign implementation
request['auth'] = gen_sign(request['channel'], request['event'], request['time'])
ws.send(json.dumps(request))
print(ws.recv())
```

Code example：

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
	url := "wss://api.gateio.ws/ws/v4/"
	conn, _, err := websocket.DefaultDialer.Dial(url, nil)
	if err != nil {
		log.Fatal("dial error:", err)
	}
	defer conn.Close()

	timestamp := time.Now().Unix()
	request := map[string]interface{}{
		"time":    timestamp,
		"channel": "spot.cross_balances",
		"event":   "subscribe",
	}

	// refer to Authentication section for gen_sign implementation
	request["auth"] = genSign(request["channel"].(string), request["event"].(string), timestamp)

	msg, err := json.Marshal(request)
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

No payload is required.

WARNING

This channel requires authentication.

## [#](#server-notification-15) Server Notification

Notification example

```json
{
  "time": 1605248616,
  "time_ms": 1605248616763,
  "channel": "spot.cross_balances",
  "event": "update",
  "result": [
    {
      "timestamp": "1605248616",
      "timestamp_ms": "1605248616123",
      "user": "1000001",
      "currency": "USDT",
      "change": "100",
      "total": "1032951.325075926",
      "available": "1022943.325075926",
      "freeze": "0",
      "freeze_change": "0",
      "change_type": "cross-margin-transfer"
    }
  ]
}
```

Result format:

| Field            | Type                 | Description                    |
| ---------------- | -------------------- | ------------------------------ |
| `result`         | `Array[SpotBalance]` | New balance update list        |
| »`timestamp`     | String               | Unix timestamp in seconds      |
| »`timestamp_ms`  | String               | Unix timestamp in milliseconds |
| »`user`          | String               | User id                        |
| »`currency`      | String               | Changed currency               |
| »`change`        | String               | Changed amount.                |
| »`total`         | String               | Total spot balance             |
| »`available`     | String               | Balance available to use       |
| »`freeze`        | String               | Balance locked amount          |
| »`freeze_change` | String               | Balance locked changed amount  |
| »`change_type`   | String               | Balance change type            |

\- `withdraw`  
\- `deposit`  
\- `trade-fee-deduct`  
\- `order-create`: order creation  
\- `order-match`: order fill update  
\- `order-update`: cancel order or modify order  
\- `margin-transfer`  
\- `future-transfer`  
\- `cross-margin-transfer`  
\- `other` |

# [#](#cross-margin-loan-channel-deprecated) Cross Margin Loan Channel (deprecated)

`spot.cross_loan`

**update speed:** realtime

**this channel is deprecated due to data was out of date**

Notify user cross margin borrowed and Interest updates

Any cross margin borrowing, repayment will generate a new notification.

1.  If a loan or repayment operation occurs, Both this channel and
    `spot.cross_balances` (balance change) will be notified, but
    `spot.cross_balances` notification only has the balance change(No loan
    information), This channel notification will contain balance、borrowed and
    Interest information
2.  This channel is only notified when a loan or repayment occurs, if only the
    trade happens, This channel will not notify.

## [#](#client-subscription-16) Client Subscription

Code samples

```python
import time
import json

# pip install websocket_client
from websocket import create_connection

ws = create_connection("wss://api.gateio.ws/ws/v4/")
request = {
    "time": int(time.time()),
    "channel": "spot.cross_loan",
    "event": "subscribe",  # "unsubscribe" for unsubscription
}
# refer to Authentication section for gen_sign implementation
request['auth'] = gen_sign(request['channel'], request['event'], request['time'])
ws.send(json.dumps(request))
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
	url := "wss://api.gateio.ws/ws/v4/"
	conn, _, err := websocket.DefaultDialer.Dial(url, nil)
	if err != nil {
		log.Fatal("dial error:", err)
	}
	defer conn.Close()

	timestamp := time.Now().Unix()
	request := map[string]interface{}{
		"time":    timestamp,
		"channel": "spot.cross_loan",
		"event":   "subscribe",
	}

	// refer to Authentication section for gen_sign implementation
	request["auth"] = genSign(request["channel"].(string), request["event"].(string), timestamp)

	msg, err := json.Marshal(request)
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

No payload is required.

WARNING

This channel requires authentication.

## [#](#server-notification-16) Server Notification

Notification example

```json
{
  "time": 1658289372,
  "time_ms": 1658289372763,
  "channel": "spot.cross_loan",
  "event": "update",
  "result": {
    "timestamp": 1658289372338,
    "user": "1000001",
    "currency": "BTC",
    "change": "0.01",
    "total": "4.992341029566",
    "available": "0.078054772536",
    "borrowed": "0.01",
    "interest": "0.00001375"
  }
}
```

Result format:

| Field        | Type   | Description                                           |
| ------------ | ------ | ----------------------------------------------------- |
| `result`     | Object | New cross margin borrowed and Interest update message |
| »`timestamp` | int64  | Unix timestamp in milliseconds                        |
| »`user`      | String | User id                                               |
| »`currency`  | String | Changed currency                                      |
| »`change`    | String | Changed amount.                                       |
| »`total`     | String | Total spot balance                                    |
| »`available` | String | Balance available to use                              |
| »`borrowed`  | String | Amount borrowed                                       |
| »`interest`  | String | Total unpaid interest generated from borrowing        |

# [#](#priceorders-channel) PriceOrders Channel

`spot.priceorders`

**update speed:** realtime

Notify user spot priceOrders updates

## [#](#client-subscription-17) Client Subscription

Code samples

```python
import time
import json

# pip install websocket_client
from websocket import create_connection

ws = create_connection("wss://api.gateio.ws/ws/v4/")
request = {
    "time": int(time.time()),
    "channel": "spot.priceorders",
    "event": "subscribe",  # "unsubscribe" for unsubscription
    "payload" : ["!all"],
}
# refer to Authentication section for gen_sign implementation
request['auth'] = gen_sign(request['channel'], request['event'], request['time'])
ws.send(json.dumps(request))
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
	url := "wss://api.gateio.ws/ws/v4/"
	conn, _, err := websocket.DefaultDialer.Dial(url, nil)
	if err != nil {
		log.Fatal("dial error:", err)
	}
	defer conn.Close()

	timestamp := time.Now().Unix()
	request := map[string]interface{}{
		"time":    timestamp,
		"channel": "spot.priceorders",
		"event":   "subscribe",
		"payload": []string{"!all"},
	}

	// refer to Authentication section for gen_sign implementation
	request["auth"] = genSign(request["channel"].(string), request["event"].(string), timestamp)

	msg, err := json.Marshal(request)
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

Payload format:

| Field     | Type            | Required | Description            |
| --------- | --------------- | -------- | ---------------------- |
| `payload` | `Array[String]` | Yes      | List of currency pairs |

You can subscribe/unsubscribe multiple times. Currency pair subscribed earlier
will not be overridden unless explicitly unsubscribed to.

If you want to subscribe to all user trades updates in all currency pairs, you
can include !all in currency pair list.

WARNING

This channel requires authentication.

## [#](#server-notification-17) Server Notification

Notification example

```json
{
  "time": 1691847986,
  "time_ms": 1691847986454,
  "channel": "spot.priceorders",
  "event": "update",
  "result": {
    "market": "METAN_USDT",
    "uid": "13679450",
    "id": "247480109",
    "currency_type": "METAN",
    "exchange_type": "USDT",
    "reason": "",
    "err_msg": "",
    "fired_order_id": 0,
    "instant_cancel": false,
    "trigger_price": "0.00302",
    "trigger_rule": "<=",
    "trigger_expiration": 900,
    "price": "0.00300",
    "amount": "26666.667",
    "source": "",
    "order_type": "limit",
    "side": "buy",
    "engine_type": "normal",
    "is_stop_order": false,
    "stop_trigger_price": "",
    "stop_trigger_rule": "",
    "stop_price": "",
    "ctime": "1691517983131",
    "ftime": "-62135596800000"
  }
}
```

Result format:

| Field                 | Type   | Description        |
| --------------------- | ------ | ------------------ |
| `result`              | Object |                    |
| »`market`             | String | market name        |
| »`uid`                | String | User id            |
| »`id`                 | String | id                 |
| »`currency_type`      | String | currency type      |
| »`exchange_type`      | String | exchange type      |
| »`reason`             | String | reason             |
| »`err_msg`            | String | err_msg            |
| »`fired_order_id`     | int    | fired_order_id     |
| »`instant_cancel`     | bool   | instant cancel     |
| »`trigger_price`      | String | trigger_price      |
| »`trigger_rule`       | String | trigger_rule       |
| »`trigger_expiration` | int    | trigger_expiration |
| »`price`              | String | price              |
| »`amount`             | String | amount             |
| »`source`             | String | source             |
| »`order_type`         | String | order_type         |
| »`side`               | String | side               |
| »`engine_type`        | String | engine_type        |
| »`is_stop_order`      | bool   | is_stop_order      |
| »`stop_trigger_price` | String | stop_trigger_price |
| »`stop_trigger_rule`  | String | stop_trigger_rule  |
| »`stop_price`         | String | stop_price         |
| »`ctime`              | String | ctime              |
| »`ftime`              | String | ftime              |

# [#](#spot-account-trade) Spot Account Trade

## [#](#websocket-api) Websocket API

WebSocket API allows placing, canceling, amending, querying orders through a
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


API_KEY = "YOUR_API_KEY"
SECRET = "YOUR_API_SECRET"
WS_URL = "wss://api.gateio.ws/ws/v4/"
CHANNEL_LOGIN = "spot.login"
CHANNEL_ORDER_PLACE = "spot.order_place"

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
        "text": "t-123456",
        "currency_pair": "ETH_BTC",
        "type": "limit",
        "account": "spot",
        "side": "buy",
        "iceberg": "0",
        "amount": "1",
        "price": "0.00032",
        "time_in_force": "gtc",
        "auto_borrow": False
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
	channel := "spot.login"
	ts := time.Now().Unix()
	requestId := fmt.Sprintf("%d-%d", time.Now().UnixMilli(), 1)

	req := ApiRequest{
		Time:    ts,
		Channel: "spot.login",
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
	if err != nil {
		panic(err)
	}
	time.Sleep(2 * time.Second)

	//ws create an order
	orderParam := OrderParam{
		Text:         "t-123456",
		CurrencyPair: "ETH_BTC",
		Type:         "limit",
		Account:      "spot",
		Side:         "buy",
		Iceberg:      "0",
		Amount:       "1",
		Price:        "0.00032",
		TimeInForce:  "gtc",
		AutoBorrow:   false,
	}
	orderParamBytes, _ := json.Marshal(orderParam)

	//warn: if you want create batch_orders, the `RequestParam` : []byte([{orderParam},{orderParam},...])
	order_place := ApiRequest{
		Time:    ts,
		Channel: "spot.order_place",
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
	Text         string `json:"text,omitempty"`
	CurrencyPair string `json:"currency_pair,omitempty"`
	Type         string `json:"type,omitempty"`
	Account      string `json:"account,omitempty"`
	Side         string `json:"side,omitempty"`
	Iceberg      string `json:"iceberg,omitempty"`
	Amount       string `json:"amount,omitempty"`
	Price        string `json:"price,omitempty"`
	TimeInForce  string `json:"time_in_force,omitempty"`
	AutoBorrow   bool   `json:"auto_borrow,omitempty"`
	StpAct       string `json:"stp_act,omitempty"`
}
```

`api` requests initiated from the client follow a common JSON format, which
contains the following fields:

| Field                      | Type     | Required | Description                                                                                                         |
| -------------------------- | -------- | -------- | ------------------------------------------------------------------------------------------------------------------- |
| `time`                     | Integer  | Yes      | Request time in seconds. Gap between request time and server time must not exceed 60 seconds                        |
| `id`                       | Integer  | No       | Optional request id which will be sent back by the server to help you identify which request the server responds to |
| `channel`                  | String   | Yes      | WebSocket channel to subscribe to.                                                                                  |
| `event`                    | String   | Yes      | Fixed as api                                                                                                        |
| `payload`                  | Object   | Yes      | Optional request detail parameters                                                                                  |
| »`req_id`                  | String   | Yes      | Unique identifier of the message Provided by client. It will be returned in response message for identifying        |
| the corresponding request. |
| »`req_param`               | \[\]Byte | Yes      | Request api param                                                                                                   |

Note that the type of `payload.req_param` is channel specific, Take
`spot.order_place` for example, `payload.req_param` same as apiv4
[/spot/orders (opens new window)](https://www.gate.com/docs/developers/apiv4/en/#create-an-order)
or
[/spot/batch_orders (opens new window)](https://www.gate.com/docs/developers/apiv4/en/#create-a-batch-of-orders).
You can place a limit order for GT_USDT with example.

### [#](#websocket-api-server-response) Websocket API Server Response

Server ack response example

```json
{
  "request_id": "request-2",
  "ack": true,
  "header": {
    "response_time": "1681985856667",
    "status": "200",
    "channel": "spot.order_place",
    "event": "api",
    "client_id": "::1-0x140033dc0c0",
    "x_in_time": 1681985856667508,
    "x_out_time": 1681985856667598,
    "conn_id": "5e74253e9c793974",
    "conn_trace_id": "1bde5aaa0acf2f5f48edfd4392e1fa68",
    "trace_id": "e410abb5f74b4afc519e67920548838d",
    "x_gate_ratelimit_requests_remain": 9,
    "x_gate_ratelimit_limit": 10,
    "x_gate_ratelimit_reset_timestamp": 1681985856667
  },
  "data": {
    "result": {
      "req_id": "request-2",
      "req_header": null,
      "req_param": {
        "text": "t-my-custom-id",
        "currency_pair": "GT_USDT",
        "type": "limit",
        "account": "spot",
        "side": "buy",
        "amount": "1",
        "price": "1"
      }
    }
  }
}
```

Server api response example

```json
{
  "request_id": "request-2",
  "header": {
    "response_time": "1681986204784",
    "status": "200",
    "channel": "spot.order_place",
    "event": "api",
    "client_id": "::1-0x140001623c0",
    "x_in_time": 1681985856667508,
    "x_out_time": 1681985856667598,
    "conn_id": "5e74253e9c793974",
    "conn_trace_id": "1bde5aaa0acf2f5f48edfd4392e1fa68",
    "trace_id": "e410abb5f74b4afc519e67920548838d",
    "x_gate_ratelimit_requests_remain": 9,
    "x_gate_ratelimit_limit": 10,
    "x_gate_ratelimit_reset_timestamp": 1681986204784
  },
  "data": {
    "result": {
      "id": "1700664330",
      "text": "t-my-custom-id",
      "amend_text": "-",
      "create_time": "1681986204",
      "update_time": "1681986204",
      "create_time_ms": 1681986204832,
      "update_time_ms": 1681986204832,
      "status": "open",
      "currency_pair": "GT_USDT",
      "type": "limit",
      "account": "spot",
      "side": "buy",
      "amount": "1",
      "price": "1",
      "time_in_force": "gtc",
      "iceberg": "0",
      "left": "1",
      "fill_price": "0",
      "filled_total": "0",
      "fee": "0",
      "fee_currency": "GT",
      "point_fee": "0",
      "gt_fee": "0",
      "gt_maker_fee": "0.0015",
      "gt_taker_fee": "0.0015",
      "gt_discount": true,
      "rebated_fee": "0",
      "rebated_fee_currency": "USDT",
      "stp_id": 1,
      "stp_act": "cn",
      "finish_as": "open"
    }
  }
}
```

Server response includes ack response to client requests and api result callback
message updates. Server responses follow a common JSON format, which contains
the following fields:

| Field                               | Type    | Description                                                                                                                                                                                                                                                                                          |
| ----------------------------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `request_id`                        | String  | Unique identifier of the message                                                                                                                                                                                                                                                                     |
| `header`                            | Map     | response meta info                                                                                                                                                                                                                                                                                   |
| »`response_time`                    | String  | response send time in mill                                                                                                                                                                                                                                                                           |
| »`channel`                          | String  | request channel                                                                                                                                                                                                                                                                                      |
| »`event`                            | String  | request event                                                                                                                                                                                                                                                                                        |
| »`client_id`                        | String  | Unique client id                                                                                                                                                                                                                                                                                     |
| »`x_in_time`                        | Integer | time to receive the request (in microseconds)                                                                                                                                                                                                                                                        |
| »`x_out_time`                       | Integer | time to return response (in microseconds)                                                                                                                                                                                                                                                            |
| »`x_gate_ratelimit_requests_remain` | Integer | (For order placement/modification only) Remaining available requests in the current time window (hidden if 0)                                                                                                                                                                                        |
| »`x_gate_ratelimit_limit`           | Integer | (For order placement/modification only) Current rate limit cap (hidden if 0)                                                                                                                                                                                                                         |
| »`x_gat_ratelimit_reset_timestamp`  | Integer | (For order placement/modification only) If the current rate limit has been exceeded, this indicates the timestamp (in milliseconds) of the next available time window when access can be resumed. If the limit has not been exceeded, the response returns the current server time (in milliseconds) |
| »`conn_id`                          | String  | Connection ID established with the client (remains consistent for the same connection)                                                                                                                                                                                                               |
| »`conn_trace_id`                    | String  | TraceId to establish connection with client                                                                                                                                                                                                                                                          |
| »`trace_id`                         | String  | TraceId for executing order operation                                                                                                                                                                                                                                                                |
| `data`                              | Object  | Response data of the request                                                                                                                                                                                                                                                                         |
| »`result`                           | Object  | If this is ack response, result is the payload of the request, otherwise result is the response of the api                                                                                                                                                                                           |
| »`errs`                             | Object  | It is only available when the request fails                                                                                                                                                                                                                                                          |
| »»`label`                           | String  | denotes error type in string format                                                                                                                                                                                                                                                                  |
| »»`message`                         | String  | detailed error message                                                                                                                                                                                                                                                                               |

### [#](#error-2) Error

Error Response Notification example

```json
{
  "request_id": "xxxx",
  "header": {
    "response_time": "1677816784084",
    "status": "401",
    "channel": "spot.login",
    "event": "api",
    "client_id": "::1-0x14002ba2300",
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
    "channel": "spot.order_place",
    "event": "api",
    "client_id": "::1-0x14002ba2300",
    "x_in_time": 1681985856667508,
    "x_out_time": 1681985856667598,
    "conn_id": "5e74253e9c793974",
    "conn_trace_id": "1bde5aaa0acf2f5f48edfd4392e1fa68",
    "trace_id": "e410abb5f74b4afc519e67920548838d",
    "x_gate_ratelimit_limit": 10,
    "x_gate_ratelimit_reset_timestamp": 1677816785084
  },
  "data": {
    "errs": {
      "label": "TOO_MANY_REQUESTS",
      "message": "Request Rate limit Exceeded (211)"
    }
  }
}
```

Error object has the following format:

| Field     | Type   | Description                         |
| --------- | ------ | ----------------------------------- |
| `label`   | String | denotes error type in string format |
| `message` | String | detailed error message              |

Explanation of rate limit-related error codes:

| Code  | Description                            |
| ----- | -------------------------------------- |
| `100` | Internal rate limiting exception error |
| `211` | Spot trading rate limit                |
| `212` | Spot rate limiting based on fill rate  |

## [#](#login) Login

WARNING

Note: the GateAPIv4 key pair you used MUST have spot Corresponding
permissions(eg: order-place channel must have spot write permissions), and your
outbound IP address must be in the key's IP whitelist if its whitelist is
enabled.

### [#](#login-request) Login Request

Code example

```python
#!/usr/bin/python

import time
import json
import hmac
import hashlib
import websocket
import threading


API_KEY = "YOUR_API_KEY"
SECRET = "YOUR_API_SECRET"
WS_URL = "wss://api.gateio.ws/ws/v4/"
CHANNEL_LOGIN = "spot.login"

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
	"encoding/hex"
	"encoding/json"
	"fmt"
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
	channel := "spot.login"
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

	marshal, _ := json.Marshal(req)
	fmt.Println(string(marshal))

	// connect ws service
	u := url.URL{Scheme: "ws", Host: "xxxx", Path: "xxxx"}
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
  "channel": "spot.login",
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

| Field                             | Type     | Required | Description                                                                                                 |
| --------------------------------- | -------- | -------- | ----------------------------------------------------------------------------------------------------------- |
| `req_id`                          | `string` | Yes      | request id which will be sent back by the server to help you identify which request the server responds to, |
| it's different from outside's`id` |
| `api_key`                         | `string` | Yes      | apiv4 key                                                                                                   |
| `req_header`                      | `object` | Yes      | apiv4 custom header                                                                                         |
| `signature`                       | `string` | Yes      | apiv4 signature                                                                                             |
| `timestamp`                       | `string` | Yes      | unix timestamp in seconds                                                                                   |

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
    "channel": "spot.login",
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

| Field            | Type    | Description                                                                                                |
| ---------------- | ------- | ---------------------------------------------------------------------------------------------------------- |
| `request_id`     | String  | Unique identifier of the message                                                                           |
| `header`         | Map     | response meta info                                                                                         |
| »`response_time` | String  | response send time in mill                                                                                 |
| »`channel`       | String  | request channel                                                                                            |
| »`event`         | String  | request event                                                                                              |
| »`client_id`     | String  | Unique client id                                                                                           |
| »`x_in_time`     | Integer | time to receive the request (in microseconds)                                                              |
| »`x_out_time`    | Integer | time to return response (in microseconds)                                                                  |
| »`conn_id`       | String  | Connection ID established with the client (remains consistent for the same connection)                     |
| »`conn_trace_id` | String  | TraceId to establish connection with client                                                                |
| »`trace_id`      | String  | TraceId for executing order operation                                                                      |
| `data`           | Object  | Response data of the request                                                                               |
| »`result`        | Object  | If this is ack response, result is the payload of the request, otherwise result is the response of the api |
| »»`api_key`      | String  | Login success apikey                                                                                       |
| »»`uid`          | String  | Login user id                                                                                              |
| »`errs`          | Object  | It is only available when the request fails                                                                |
| »»`label`        | String  | denotes error type in string format                                                                        |
| »»`message`      | String  | detailed error message                                                                                     |

## [#](#order-place) Order Place

`spot.order_place`

You can place orders with this channel and event `api`.

**function as api below:**

```json
POST /spot/orders
POST /spot/batch_orders
```

### [#](#order-place-request) Order Place Request

Code example: Login is required before making requests

```python
#!/usr/bin/python

import time
import json
# pip install websocket_client
from websocket import create_connection


placeParam = {"text":"t-my-custom-id","currency_pair":"GT_USDT","type":"limit","account":"spot","side":"buy","amount":"1","price":"1"}
batchPlaceParam = [
                    {"text":"t-my-custom-id-1","currency_pair":"GT_USDT","type":"limit","account":"spot","side":"buy","amount":"1","price":"1"},
                    {"text":"t-my-custom-id-2","currency_pair":"GT_USDT","type":"limit","account":"spot","side":"buy","amount":"1","price":"1.1"}
                  ]

ws = create_connection("wss://api.gateio.ws/ws/v4/")
channel = "spot.order_place"

# refer to the Authentication section for a WebSocket API code example

# create a order
ws.send(json.dumps({
    "time":int(time.time()),
    "channel":channel,
    "event":"api",
    "payload":{
        "req_id":"test_1",
        # create a order
        "req_param": placeParam
        # batch orders
        # "req_param": batchPlaceParam
    }
}))

for i in range(2):
    data = ws.recv()
    print("data: ", data)
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

// example WebSocket create order in go
func main() {

	u := url.URL{Scheme: "ws", Host: "xxxx", Path: "xxx"}
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

	// warn: before order, you should login first, pls refer to the channel `spot.login`;
	// order_place
	orderParam := OrderParam{
		Text:         "t-123456",
		CurrencyPair: "ETH_BTC",
		Type:         "limit",
		Account:      "spot",
		Side:         "buy",
		Iceberg:      "0",
		Amount:       "1",
		Price:        "5.00032",
		TimeInForce:  "gtc",
		AutoBorrow:   false,
		StpAct:       "cn",
	}
	paramBytes, _ := json.Marshal(orderParam)
	requestId := fmt.Sprintf("%d-%d", time.Now().UnixMilli(), 1)
	order_place := ApiRequest{
		Time:    time.Now().Unix(),
		Channel: "spot.order_place",
		Event:   "api",
		Payload: ApiPayload{
			RequestId:    requestId,
			RequestParam: []byte(paramBytes),
		},
	}
	orderPlaceReqByte, _ := json.Marshal(order_place)
	err = c.WriteMessage(websocket.TextMessage, orderPlaceReqByte)

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
	Text         string `json:"text,omitempty"`
	CurrencyPair string `json:"currency_pair,omitempty"`
	Type         string `json:"type,omitempty"`
	Account      string `json:"account,omitempty"`
	Side         string `json:"side,omitempty"`
	Iceberg      string `json:"iceberg,omitempty"`
	Amount       string `json:"amount,omitempty"`
	Price        string `json:"price,omitempty"`
	TimeInForce  string `json:"time_in_force,omitempty"`
	AutoBorrow   bool   `json:"auto_borrow,omitempty"`
	StpAct       string `json:"stp_act,omitempty"`
}
```

Request example

```json
{
  "time": 1681986203,
  "channel": "spot.order_place",
  "event": "api",
  "payload": {
    "req_id": "request-2",
    "req_param": {
      "text": "t-my-custom-id",
      "currency_pair": "GT_USDT",
      "type": "limit",
      "account": "spot",
      "side": "buy",
      "amount": "1",
      "price": "1"
    }
  }
}
```

Payload format:

| Field                             | Type     | Required | Description                                                                                                                                                                                 |
| --------------------------------- | -------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `req_id`                          | `string` | Yes      | request id which will be sent back by the server to help you identify which request the server responds to,                                                                                 |
| it's different from outside's`id` |
| `req_param`                       | `object` | Yes      | api order model's json byte data, could be an array with api order model; api order model detail to[api (opens new window)](https://www.gate.com/docs/developers/apiv4/en/#create-an-order) |
| `req_header`                      | `object` | No       | apiv4 custom header                                                                                                                                                                         |

`req_param` JSON byte data of the API order model:

| Field           | Type      | Required | Description                                                                                                                                                                               |
| --------------- | --------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `text`          | `string`  | false    | User defined information. If not empty, must follow the rules below:                                                                                                                      |
| `currency_pair` | `string`  | true     | Currency pair                                                                                                                                                                             |
| `type`          | `object`  | false    | Order Type                                                                                                                                                                                |
| `account`       | `string`  | false    | Account types， spot - spot account, margin - margin account, unified - unified account, cross_margin - cross margin account. Portfolio margin accounts can only be set to `cross_margin` |
| `side`          | `string`  | true     | Order side                                                                                                                                                                                |
| `amount`        | `string`  | true     | When `type` is limit, it refers to base currency. For instance, `BTC_USDT` means `BTC`                                                                                                    |
| `price`         | `string`  | false    | Price can't be empty when `type` = `limit`                                                                                                                                                |
| `time_in_force` | `object`  | false    | Time in force                                                                                                                                                                             |
| `iceberg`       | `string`  | false    | Amount to display for the iceberg order. Null or 0 for normal orders. Hiding all amount is not supported.                                                                                 |
| `auto_borrow`   | `boolean` | false    | Used in margin or cross margin trading to allow automatic loan of insufficient amount if balance is not enough.                                                                           |
| `auto_repay`    | `boolean` | false    | Enable or disable automatic repayment for automatic borrow loan generated by cross margin order. Default is disabled.                                                                     |
| `stp_act`       | `string`  | false    | Self-Trading Prevention Action. Users can use this field to set self-trade prevetion strategies                                                                                           |
| `action_mode`   | `string`  | false    | Processing Mode                                                                                                                                                                           |

`req_header` Custom header data:

| Field            | Type     | Required | Description                                                                                                                                                         |
| ---------------- | -------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `x-gate-exptime` | `string` | false    | Specifies the expiration timestamp (in milliseconds). If the request time received by the WebSocket is later than the expiration time, the request will be rejected |

#### [#](#detail) Detail:

**text**: User defined information. If not empty, must follow the rules below:

- prefixed with `t-`
- no longer than 28 bytes without `t-` prefix
- can only include 0-9, A-Z, a-z, underscore(\_), hyphen(-) or dot(.)
- not specified, default `apiv4-ws`

**type**: Order Type

- limit: Limit Order
- market: Market Order

**account**: Account types: spot - spot account, margin - margin account,
cross_margin - cross margin account, unified - unified account (old, only
supports `cross_margin`)

**amount**: When type is `limit`, it refers to base currency. For instance,
`BTC_USDT` means `BTC` When `type` is `market`, it refers to different currency
according to `side`

- `side`: `buy` means quote currency, `BTC_USDT` means `USDT`
- `side`: `sell` means base currency，`BTC_USDT` means `BTC`

**time_in_force**: Time in force

- gtc: GoodTillCancelled
- ioc: mmediateOrCancelled, taker only
- poc: PendingOrCancelled, makes a post-only order that always enjoys a maker
  fee
- fok: FillOrKill, fill either completely or none Only `ioc` and `fok` are
  supported when `type` = `market`

**auto_repay**: Enable or disable automatic repayment for automatic borrow loan
generated by cross margin order. Default is disabled. Note that:

- This field is only effective for cross margin orders. Margin account does not
  support setting auto repayment for orders.
- `auto_borrow` and `auto_repay` can be both set to true in one order.

**stp_act**: Self-Trading Prevention Action. Users can use this field to set
self-trade prevention strategies.

- After users join the STP Group, they can pass stp_act to limit the user's
  self-trade prevention strategy. If stp_act is not passed, the default is cn
  strategy.
- When the user does not join the STP group, an error will be returned when
  passing the stp_act parameter.
- If the user did not use 'stp_act' when placing the order, 'stp_act' will
  return '-'
- cn: Cancel newest, Cancel new orders and keep old ones
- co: Cancel oldest, Cancel old orders and keep new ones
- cb: Cancel both, Both old and new orders will be cancelled

**action_mode**: Processing mode: When placing orders, different fields are
returned based on `action_mode`. This field is only valid in requests and is not
included in response results.

- `ACK`: Asynchronous mode, only returns key order fields
- `RESULT`: No settlement information
- `FULL`: Full mode (default)

### [#](#ack-notification) Ack Notification

Ack Notification example for an order

```json
{
  "request_id": "request-2",
  "ack": true,
  "header": {
    "response_time": "1681986203814",
    "status": "200",
    "channel": "spot.order_place",
    "event": "api",
    "client_id": "::1-0x140001623c0",
    "x_in_time": 1681985856667508,
    "x_out_time": 1681985856667598,
    "conn_id": "5e74253e9c793974",
    "conn_trace_id": "1bde5aaa0acf2f5f48edfd4392e1fa68",
    "trace_id": "e410abb5f74b4afc519e67920548838d",
    "x_gate_ratelimit_requests_remain": 9,
    "x_gate_ratelimit_limit": 10,
    "x_gat_ratelimit_reset_timestamp": 1736408263764
  },
  "data": {
    "result": {
      "req_id": "request-2",
      "req_header": null,
      "req_param": {
        "text": "t-my-custom-id",
        "currency_pair": "GT_USDT",
        "type": "limit",
        "account": "spot",
        "side": "buy",
        "amount": "1",
        "price": "1"
      },
      "api_key": "",
      "timestamp": "",
      "signature": ""
    }
  }
}
```

Ack Notification example for **order array**

```json
{
  "request_id": "xxxx",
  "ack": true,
  "header": {
    "response_time": "1677810708738",
    "status": "200",
    "channel": "spot.order_place",
    "event": "api",
    "client_id": "::1-0x140002f63c0",
    "x_in_time": 1681985856667508,
    "x_out_time": 1681985856667598,
    "conn_id": "5e74253e9c793974",
    "conn_trace_id": "1bde5aaa0acf2f5f48edfd4392e1fa68",
    "trace_id": "e410abb5f74b4afc519e67920548838d",
    "x_gate_ratelimit_requests_remain": 9,
    "x_gate_ratelimit_limit": 10,
    "x_gat_ratelimit_reset_timestamp": 1736408263764
  },
  "data": {
    "result": {
      "req_id": "xxxx",
      "req_header": null,
      "req_param": [
        {
          "text": "t-my-custom-id",
          "currency_pair": "GT_USDT",
          "type": "limit",
          "account": "spot",
          "side": "buy",
          "amount": "1",
          "price": "1"
        },
        {
          "text": "t-my-custom-id",
          "currency_pair": "GT_USDT",
          "type": "limit",
          "account": "spot",
          "side": "buy",
          "amount": "1",
          "price": "1"
        }
      ]
    }
  }
}
```

### [#](#order-place-notification) Order Place Notification

Order place notification example

Response Notification example for an order

> action_mode: ACK

```json
{
  "request_id": "request-2",
  "header": {
    "response_time": "1681986204784",
    "status": "200",
    "channel": "spot.order_place",
    "event": "api",
    "client_id": "::1-0x140001623c0",
    "x_in_time": 1681985856667508,
    "x_out_time": 1681985856667598,
    "conn_id": "5e74253e9c793974",
    "conn_trace_id": "1bde5aaa0acf2f5f48edfd4392e1fa68",
    "trace_id": "e410abb5f74b4afc519e67920548838d",
    "x_gate_ratelimit_requests_remain": 9,
    "x_gate_ratelimit_limit": 10,
    "x_gat_ratelimit_reset_timestamp": 1736408263764
  },
  "data": {
    "result": {
      "id": "12332324",
      "text": "t-123456",
      "amend_text": "test2"
    }
  }
}
```

> action_mode: RESULT

```json
{
  "request_id": "request-2",
  "header": {
    "response_time": "1681986204784",
    "status": "200",
    "channel": "spot.order_place",
    "event": "api",
    "client_id": "::1-0x140001623c0",
    "x_in_time": 1681985856667508,
    "x_out_time": 1681985856667598,
    "conn_id": "5e74253e9c793974",
    "conn_trace_id": "1bde5aaa0acf2f5f48edfd4392e1fa68",
    "trace_id": "e410abb5f74b4afc519e67920548838d",
    "x_gate_ratelimit_requests_remain": 9,
    "x_gate_ratelimit_limit": 10,
    "x_gat_ratelimit_reset_timestamp": 1736408263764
  },
  "data": {
    "result": {
      "id": "12332324",
      "text": "t-123456",
      "create_time": "1548000000",
      "update_time": "1548000100",
      "create_time_ms": 1548000000123,
      "update_time_ms": 1548000100123,
      "currency_pair": "ETH_BTC",
      "status": "cancelled",
      "type": "limit",
      "account": "spot",
      "side": "buy",
      "iceberg": "0",
      "amount": "1",
      "price": "5.00032",
      "time_in_force": "gtc",
      "auto_borrow": false,
      "left": "0.5",
      "filled_total": "2.50016",
      "avg_deal_price": "5.00032",
      "stp_act": "cn",
      "finish_as": "stp",
      "stp_id": 10240
    }
  }
}
```

> action_mode: FULL

```json
{
  "request_id": "request-2",
  "header": {
    "response_time": "1681986204784",
    "status": "200",
    "channel": "spot.order_place",
    "event": "api",
    "client_id": "::1-0x140001623c0",
    "x_in_time": 1681985856667508,
    "x_out_time": 1681985856667598,
    "conn_id": "5e74253e9c793974",
    "conn_trace_id": "1bde5aaa0acf2f5f48edfd4392e1fa68",
    "trace_id": "e410abb5f74b4afc519e67920548838d",
    "x_gate_ratelimit_requests_remain": 9,
    "x_gate_ratelimit_limit": 10,
    "x_gat_ratelimit_reset_timestamp": 1736408263764
  },
  "data": {
    "result": {
      "id": "1852454420",
      "text": "t-abc123",
      "amend_text": "-",
      "create_time": "1710488334",
      "update_time": "1710488334",
      "create_time_ms": 1710488334073,
      "update_time_ms": 1710488334074,
      "status": "closed",
      "currency_pair": "BTC_USDT",
      "type": "limit",
      "account": "unified",
      "side": "buy",
      "amount": "0.001",
      "price": "65000",
      "time_in_force": "gtc",
      "iceberg": "0",
      "left": "0",
      "filled_amount": "0.001",
      "fill_price": "63.4693",
      "filled_total": "63.4693",
      "avg_deal_price": "63469.3",
      "fee": "0.00000022",
      "fee_currency": "BTC",
      "point_fee": "0",
      "gt_fee": "0",
      "gt_maker_fee": "0",
      "gt_taker_fee": "0",
      "gt_discount": false,
      "rebated_fee": "0",
      "rebated_fee_currency": "USDT",
      "finish_as": "filled"
    }
  }
}
```

Updated order list. Note it is possible that multiple currency pairs' orders
will be updated in one notification.

Result format:

| Field                                                                                                                         | Type    | Description                                                                                                                                                                                                                                                  |
| ----------------------------------------------------------------------------------------------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request_id`                                                                                                                  | String  | Unique identifier of the message                                                                                                                                                                                                                             |
| `ack`                                                                                                                         | Bool    | The return of the "ack" message represents the WebSocket confirmation message(Currently exists in the order-place api). If "ack" is false(this field will not be returned),                                                                                  |
| it means that the message is a response message, and you can determine if the request was successful by checking "data.errs". |
| `header`                                                                                                                      | Map     | response meta info                                                                                                                                                                                                                                           |
| »`response_time`                                                                                                              | String  | response send time in mill                                                                                                                                                                                                                                   |
| »`channel`                                                                                                                    | String  | request channel                                                                                                                                                                                                                                              |
| »`event`                                                                                                                      | String  | request event                                                                                                                                                                                                                                                |
| »`client_id`                                                                                                                  | String  | Unique client id                                                                                                                                                                                                                                             |
| »`x_in_time`                                                                                                                  | Integer | time to receive the request (in microseconds)                                                                                                                                                                                                                |
| »`x_out_time`                                                                                                                 | Integer | time to return response (in microseconds)                                                                                                                                                                                                                    |
| »`conn_trace_id`                                                                                                              | String  | TraceId to establish connection with client                                                                                                                                                                                                                  |
| »`trace_id`                                                                                                                   | String  | TraceId for executing order operation                                                                                                                                                                                                                        |
| »`x_gate_ratelimit_requests_remain`                                                                                           | Integer | Remaining available requests in the current time window (hidden if 0)                                                                                                                                                                                        |
| »`x_gate_ratelimit_limit`                                                                                                     | Integer | Current rate limit cap (hidden if 0)                                                                                                                                                                                                                         |
| »`x_gat_ratelimit_reset_timestamp`                                                                                            | Integer | If the current rate limit has been exceeded, this indicates the timestamp (in milliseconds) of the next available time window when access can be resumed. If the limit has not been exceeded, the response returns the current server time (in milliseconds) |
| »`conn_id`                                                                                                                    | String  | Connection ID established with the client (remains consistent for the same connection)                                                                                                                                                                       |
| `data`                                                                                                                        | Object  | Response data of the request                                                                                                                                                                                                                                 |
| »`result`                                                                                                                     | Object  | If this is ack response, result is the payload of the request, otherwise result is the response of the api                                                                                                                                                   |
| »`errs`                                                                                                                       | Object  | It is only available when the request fails                                                                                                                                                                                                                  |
| »»`label`                                                                                                                     | String  | denotes error type in string format                                                                                                                                                                                                                          |
| »»`message`                                                                                                                   | String  | detailed error message                                                                                                                                                                                                                                       |

## [#](#order-cancel) Order Cancel

You can cancel an open order with this channel and event `cancel`.

**function as api below:**

```json
DELETE /spot/orders/{order_id}
```

### [#](#order-cancel-request) Order Cancel Request

Code example: Login is required before making requests

```python
#!/usr/bin/python

import time
import json
# pip install websocket_client
from websocket import create_connection


time = int(time.time())
cancelParam = {"order_id":"1694883366","currency_pair":"GT_USDT"}
channel = "spot.order_cancel"

ws = create_connection("wss://api.gateio.ws/ws/v4/")

# refer to the Authentication section for a WebSocket API code example

ws.send(json.dumps({
    "time":time,
    "channel":channel,
    "event":"api",
    "payload":{
        "req_id":"test_1",
        "req_param": cancelParam
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
	url := "wss://api.gateio.ws/ws/v4/"
	conn, _, err := websocket.DefaultDialer.Dial(url, nil)
	if err != nil {
		log.Fatal("dial error:", err)
	}
	defer conn.Close()

	timestamp := time.Now().Unix()
	cancelParam := map[string]interface{}{
		"order_id":    "1694883366",
		"currency_pair": "GT_USDT",
	}
	channel := "spot.order_cancel"

	request := map[string]interface{}{
		"time":    timestamp,
		"channel": channel,
		"event":   "api",
		"payload": map[string]interface{}{
			"req_id":    "test_1",
			"req_param": cancelParam,
		},
	}

	// refer to the Authentication section for a WebSocket API code example

	msg, err := json.Marshal(request)
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

Order cancel request example

```json
{
  "time": 1681986206,
  "channel": "spot.order_cancel",
  "event": "api",
  "payload": {
    "req_id": "request-5",
    "req_param": {
      "order_id": "1700664330",
      "currency_pair": "GT_USDT"
    }
  }
}
```

Payload format:

| Field                             | Type     | Required | Description                                                                                                               |
| --------------------------------- | -------- | -------- | ------------------------------------------------------------------------------------------------------------------------- |
| `req_id`                          | `string` | Yes      | request id which will be sent back by the server to help you identify which request the server responds to,               |
| it's different from outside's`id` |
| `req_param`                       | `object` | Yes      | api cancel order, detail to[api (opens new window)](https://www.gate.com/docs/developers/apiv4/en/#cancel-a-single-order) |
| `req_header`                      | `object` | No       | apiv4 custom header                                                                                                       |

`req_param` JSON byte data of the API order model:

| Field           | Type     | Required | Description                                                                                                                                                                                                  |
| --------------- | -------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `order_id`      | `string` | true     | Order ID returned, or user custom ID(i.e., text field).                                                                                                                                                      |
| `currency_pair` | `string` | tur      | Currency pair                                                                                                                                                                                                |
| `account`       | `string` | false    | Specify operation account. Default to spot ,portfolio and margin account if not specified. Set to `cross_margin` to operate against margin account. Portfolio margin account must set to `cross_margin` only |

`req_header` Custom header data:

| Field            | Type     | Required | Description                                                                                                                                                         |
| ---------------- | -------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `x-gate-exptime` | `string` | false    | Specifies the expiration timestamp (in milliseconds). If the request time received by the WebSocket is later than the expiration time, the request will be rejected |

### [#](#order-cancel-notification) Order Cancel Notification

Order cancel notification example

```json
{
  "request_id": "request-5",
  "header": {
    "response_time": "1681986206282",
    "status": "200",
    "channel": "spot.order_cancel",
    "event": "api",
    "client_id": "::1-0x140001623c0",
    "x_in_time": 1681985856667508,
    "x_out_time": 1681985856667598,
    "conn_id": "5e74253e9c793974",
    "conn_trace_id": "1bde5aaa0acf2f5f48edfd4392e1fa68",
    "trace_id": "e410abb5f74b4afc519e67920548838d"
  },
  "data": {
    "result": {
      "id": "1700664330",
      "text": "t-my-custom-id",
      "amend_text": "-",
      "create_time": "1681986204",
      "update_time": "1681986206",
      "create_time_ms": 1681986204832,
      "update_time_ms": 1681986206330,
      "status": "cancelled",
      "currency_pair": "GT_USDT",
      "type": "limit",
      "account": "spot",
      "side": "buy",
      "amount": "1",
      "price": "2",
      "time_in_force": "gtc",
      "iceberg": "0",
      "left": "1",
      "fill_price": "0",
      "filled_total": "0",
      "fee": "0",
      "fee_currency": "GT",
      "point_fee": "0",
      "gt_fee": "0",
      "gt_maker_fee": "0.0015",
      "gt_taker_fee": "0.0015",
      "gt_discount": true,
      "rebated_fee": "0",
      "rebated_fee_currency": "USDT",
      "stp_id": 1,
      "stp_act": "cn",
      "finish_as": "cancelled"
    }
  }
}
```

Result format:

| Field            | Type    | Description                                                                                                                           |
| ---------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `request_id`     | String  | Unique identifier of the message                                                                                                      |
| `header`         | Map     | response meta info                                                                                                                    |
| »`response_time` | String  | response send time in mill                                                                                                            |
| »`channel`       | String  | request channel                                                                                                                       |
| »`event`         | String  | request event                                                                                                                         |
| »`client_id`     | String  | Unique client id                                                                                                                      |
| »`x_in_time`     | Integer | time to receive the request (in microseconds)                                                                                         |
| »`x_out_time`    | Integer | time to return response (in microseconds)                                                                                             |
| »`conn_id`       | String  | Connection ID established with the client (remains consistent for the same connection)                                                |
| »`conn_trace_id` | String  | TraceId to establish connection with client                                                                                           |
| »`trace_id`      | String  | TraceId for executing order operation                                                                                                 |
| `data`           | Object  | Response data of the request                                                                                                          |
| »`result`        | Object  | single order cancel response, detail to[api (opens new window)](https://www.gate.com/docs/developers/apiv4/en/#cancel-a-single-order) |
| »`errs`          | Object  | It is only available when the request fails                                                                                           |
| »»`label`        | String  | denotes error type in string format                                                                                                   |
| »»`message`      | String  | detailed error message                                                                                                                |

## [#](#order-cancel-all-with-id-list) Order Cancel All With Id List

You can cancel all open orders with this channel and event `cancel_ids`.

**function as api below:**

```json
POST /spot/cancel_batch_orders
```

### [#](#order-cancel-all-with-id-list-request) Order Cancel All With Id List Request

Code example: Login is required before making requests

```python
#!/usr/bin/python

import time
import json
# pip install websocket_client
from websocket import create_connection


time = int(time.time())
cancelWithIdsParam = [{"id":"1694883366","currency_pair":"GT_USDT"}]
channel = "spot.order_cancel_ids"

ws = create_connection("wss://api.gateio.ws/ws/v4/")

# refer to the Authentication section for a WebSocket API code example

ws.send(json.dumps({
    "time":time,
    "channel":channel,
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
	url := "wss://api.gateio.ws/ws/v4/"
	conn, _, err := websocket.DefaultDialer.Dial(url, nil)
	if err != nil {
		log.Fatal("dial error:", err)
	}
	defer conn.Close()

	timestamp := time.Now().Unix()
	cancelWithIdsParam := []map[string]interface{}{
		{
			"id":            "1694883366",
			"currency_pair": "GT_USDT",
		},
	}
	channel := "spot.order_cancel_ids"

	request := map[string]interface{}{
		"time":    timestamp,
		"channel": channel,
		"event":   "api",
		"payload": map[string]interface{}{
			"req_id":    "test_1",
			"req_param": cancelWithIdsParam,
		},
	}

	// refer to the Authentication section for a WebSocket API code example

	msg, err := json.Marshal(request)
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

Client request example

```json
{
  "time": 1681986208,
  "channel": "spot.order_cancel_ids",
  "event": "api",
  "payload": {
    "req_id": "request-9",
    "req_param": [
      {
        "currency_pair": "GT_USDT",
        "id": "1700664343"
      }
    ]
  }
}
```

Payload format:

| Field                             | Type     | Required | Description                                                                                                                |
| --------------------------------- | -------- | -------- | -------------------------------------------------------------------------------------------------------------------------- |
| `req_id`                          | `string` | Yes      | request id which will be sent back by the server to help you identify which request the server responds to,                |
| it's different from outside's`id` |
| `req_param`                       | `object` | Yes      | detail to[api (opens new window)](https://www.gate.com/docs/developers/apiv4/en/#cancel-a-batch-of-orders-with-an-id-list) |
| `req_header`                      | `object` | No       | apiv4 custom header                                                                                                        |

`req_param` JSON byte data of the API order model:

| Field           | Type     | Required | Description                                                                                                                                                                                                  |
| --------------- | -------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `currency_pair` | `string` | true     | Currency pair                                                                                                                                                                                                |
| `id`            | `string` | true     | Order ID or user-defined ID. If using a custom ID, it is only valid within 30 minutes after the order is created.                                                                                            |
| `account`       | `string` | false    | Specify operation account. Default to spot ,portfolio and margin account if not specified. Set to `cross_margin` to operate against margin account. Portfolio margin account must set to `cross_margin` only |

`req_header` Custom header data:

| Field            | Type     | Required | Description                                                                                                                                                         |
| ---------------- | -------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `x-gate-exptime` | `string` | false    | Specifies the expiration timestamp (in milliseconds). If the request time received by the WebSocket is later than the expiration time, the request will be rejected |

### [#](#order-cancel-all-with-id-list-notification) Order Cancel All With Id List Notification

Order cancel notification example

```json
{
  "request_id": "request-9",
  "header": {
    "response_time": "1681986208564",
    "status": "200",
    "channel": "spot.order_cancel_ids",
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
        "currency_pair": "GT_USDT",
        "id": "1700664343",
        "succeeded": true
      }
    ]
  }
}
```

Result format:

| Field            | Type    | Description                                                                                                                         |
| ---------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `request_id`     | String  | Unique identifier of the message                                                                                                    |
| `header`         | Map     | response meta info                                                                                                                  |
| »`response_time` | String  | response send time in mill                                                                                                          |
| »`channel`       | String  | request channel                                                                                                                     |
| »`event`         | String  | request event                                                                                                                       |
| »`client_id`     | String  | Unique client id                                                                                                                    |
| »`x_in_time`     | Integer | time to receive the request (in microseconds)                                                                                       |
| »`x_out_time`    | Integer | time to return response (in microseconds)                                                                                           |
| »`conn_id`       | String  | Connection ID established with the client (remains consistent for the same connection)                                              |
| »`conn_trace_id` | String  | TraceId to establish connection with client                                                                                         |
| »`trace_id`      | String  | TraceId for executing order operation                                                                                               |
| `data`           | Object  | Response data of the request                                                                                                        |
| »`result`        | Object  | response detail to[api (opens new window)](https://www.gate.com/docs/developers/apiv4/en/#cancel-a-batch-of-orders-with-an-id-list) |
| »`errs`          | Object  | It is only available when the request fails                                                                                         |
| »»`label`        | String  | denotes error type in string format                                                                                                 |
| »»`message`      | String  | detailed error message                                                                                                              |

## [#](#order-cancel-all-with-specified-currency-pair) Order Cancel All With Specified Currency Pair

You can cancel all open orders with this channel and event `cancel_cp`.

**function as api below:**

```json
DELETE /spot/orders
```

### [#](#order-cancel-all-with-specified-currency-pair-request) Order Cancel All With Specified Currency Pair Request

Code example: Login is required before making requests

```python
#!/usr/bin/python

import time
import json
# pip install websocket_client
from websocket import create_connection


time = int(time.time())
cancelParam = {"side":"buy","currency_pair":"GT_USDT"}
channel = "spot.order_cancel_cp"

ws = create_connection("wss://api.gateio.ws/ws/v4/")

# refer to the Authentication section for a WebSocket API code example

ws.send(json.dumps({
    "time":time,
    "channel":channel,
    "event":"api",
    "payload":{
        "req_id":"test_1",
        "req_param": cancelParam
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
	url := "wss://api.gateio.ws/ws/v4/"
	conn, _, err := websocket.DefaultDialer.Dial(url, nil)
	if err != nil {
		log.Fatal("dial error:", err)
	}
	defer conn.Close()

	timestamp := time.Now().Unix()
	cancelParam := map[string]interface{}{
		"side":          "buy",
		"currency_pair": "GT_USDT",
	}
	channel := "spot.order_cancel_cp"

	request := map[string]interface{}{
		"time":    timestamp,
		"channel": channel,
		"event":   "api",
		"payload": map[string]interface{}{
			"req_id":    "test_1",
			"req_param": cancelParam,
		},
	}

	// refer to the Authentication section for a WebSocket API code example

	msg, err := json.Marshal(request)
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

```json
{
  "time": 1681986207,
  "channel": "spot.order_cancel_cp",
  "event": "api",
  "payload": {
    "req_id": "request-7",
    "req_param": {
      "currency_pair": "GT_USDT",
      "side": "buy"
    }
  }
}
```

Payload format:

| Field                             | Type     | Required | Description                                                                                                                         |
| --------------------------------- | -------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `req_id`                          | `string` | Yes      | request id which will be sent back by the server to help you identify which request the server responds to,                         |
| it's different from outside's`id` |
| `req_param`                       | `object` | Yes      | detail to[api (opens new window)](https://www.gate.com/docs/developers/apiv4/en/#cancel-all-open-orders-in-specified-currency-pair) |
| `req_header`                      | `object` | No       | apiv4 custom header                                                                                                                 |

`req_param` JSON byte data of the API order model:

| Field           | Type     | Required | Description                                                                                                                                                                                                  |
| --------------- | -------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `currency_pair` | `string` | true     | Currency pair                                                                                                                                                                                                |
| `side`          | `string` | true     | All bids or asks. Both included if not specified                                                                                                                                                             |
| `account`       | `string` | false    | Specify operation account. Default to spot ,portfolio and margin account if not specified. Set to `cross_margin` to operate against margin account. Portfolio margin account must set to `cross_margin` only |

`req_header` Custom header data:

| Field            | Type     | Required | Description                                                                                                                                                         |
| ---------------- | -------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `x-gate-exptime` | `string` | false    | Specifies the expiration timestamp (in milliseconds). If the request time received by the WebSocket is later than the expiration time, the request will be rejected |

### [#](#order-cancel-all-with-specified-currency-pair-notification) Order Cancel All With Specified Currency Pair Notification

Order cancel notification example

```json
{
  "request_id": "request-7",
  "header": {
    "response_time": "1681986207412",
    "status": "200",
    "channel": "spot.order_cancel_cp",
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
        "id": "1700664337",
        "text": "t-my-custom-id",
        "amend_text": "-",
        "create_time": "1681986206",
        "update_time": "1681986207",
        "create_time_ms": 1681986206384,
        "update_time_ms": 1681986207444,
        "status": "cancelled",
        "currency_pair": "GT_USDT",
        "type": "limit",
        "account": "spot",
        "side": "buy",
        "amount": "1",
        "price": "1",
        "time_in_force": "gtc",
        "iceberg": "0",
        "left": "1",
        "fill_price": "0",
        "filled_total": "0",
        "fee": "0",
        "fee_currency": "GT",
        "point_fee": "0",
        "gt_fee": "0",
        "gt_maker_fee": "0.0015",
        "gt_taker_fee": "0.0015",
        "gt_discount": true,
        "rebated_fee": "0",
        "rebated_fee_currency": "USDT",
        "stp_id": 1,
        "stp_act": "cn",
        "finish_as": "cancelled"
      }
    ]
  }
}
```

Result format:

| Field            | Type    | Description                                                                                                                                  |
| ---------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `request_id`     | String  | Unique identifier of the message                                                                                                             |
| `header`         | Map     | response meta info                                                                                                                           |
| »`response_time` | String  | response send time in mill                                                                                                                   |
| »`channel`       | String  | request channel                                                                                                                              |
| »`event`         | String  | request event                                                                                                                                |
| »`client_id`     | String  | Unique client id                                                                                                                             |
| »`x_in_time`     | Integer | time to receive the request (in microseconds)                                                                                                |
| »`x_out_time`    | Integer | time to return response (in microseconds)                                                                                                    |
| »`conn_id`       | String  | Connection ID established with the client (remains consistent for the same connection)                                                       |
| »`conn_trace_id` | String  | TraceId to establish connection with client                                                                                                  |
| »`trace_id`      | String  | TraceId for executing order operation                                                                                                        |
| `data`           | Object  | Response data of the request                                                                                                                 |
| »`result`        | Object  | response detail to[api (opens new window)](https://www.gate.com/docs/developers/apiv4/en/#cancel-all-open-orders-in-specified-currency-pair) |
| »`errs`          | Object  | It is only available when the request fails                                                                                                  |
| »»`label`        | String  | denotes error type in string format                                                                                                          |
| »»`message`      | String  | detailed error message                                                                                                                       |

## [#](#order-amend) Order Amend

You can amend an open order with this channel and event `amend`.

**function as api below:**

```text
PATCH /spot/orders/{order_id}
```

### [#](#order-amend-request) Order Amend Request

Code example: Login is required before making requests

```python
#!/usr/bin/python

import time
import json
# pip install websocket_client
from websocket import create_connection


time = int(time.time())
amendParam = {"order_id":"1694883366","currency_pair":"GT_USDT","price":"2"}
channel = "spot.order_amend"

ws = create_connection("wss://api.gateio.ws/ws/v4/")

# refer to the Authentication section for a WebSocket API code example

ws.send(json.dumps({
    "time":time,
    "channel":channel,
    "event":"api",
    "payload":{
        "req_id":"test_1",
        "req_param": amendParam
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
	url := "wss://api.gateio.ws/ws/v4/"
	conn, _, err := websocket.DefaultDialer.Dial(url, nil)
	if err != nil {
		log.Fatal("dial error:", err)
	}
	defer conn.Close()

	timestamp := time.Now().Unix()
	amendParam := map[string]interface{}{
		"order_id":     "1694883366",
		"currency_pair": "GT_USDT",
		"price":        "2",
	}
	channel := "spot.order_amend"

	request := map[string]interface{}{
		"time":    timestamp,
		"channel": channel,
		"event":   "api",
		"payload": map[string]interface{}{
			"req_id":    "test_1",
			"req_param": amendParam,
		},
	}

	// refer to the Authentication section for a WebSocket API code example

	msg, err := json.Marshal(request)
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

Client request example

```json
{
  "time": 1681986206,
  "channel": "spot.order_amend",
  "event": "api",
  "payload": {
    "req_id": "request-4",
    "req_param": {
      "order_id": "1700664330",
      "currency_pair": "GT_USDT",
      "price": "2"
    }
  }
}
```

Payload format:

| Field                             | Type     | Required | Description                                                                                                       |
| --------------------------------- | -------- | -------- | ----------------------------------------------------------------------------------------------------------------- |
| `req_id`                          | `string` | Yes      | request id which will be sent back by the server to help you identify which request the server responds to,       |
| it's different from outside's`id` |
| `req_param`                       | `object` | Yes      | api amend order, detail to[api (opens new window)](https://www.gate.com/docs/developers/apiv4/en/#amend-an-order) |
| `req_header`                      | `object` | No       | apiv4 custom header                                                                                               |

`req_param` JSON byte data of the API order model:

| Field           | Type     | Required | Description                                                                                                                                                                                                  |
| --------------- | -------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `amount`        | `string` | false    | New order amount. `amount` and \`price must specify one of them                                                                                                                                              |
| `price`         | `string` | false    | New order price. `amount` and `Price` must specify one of them"                                                                                                                                              |
| `amend_text`    | `string` | false    | Custom info during amending order                                                                                                                                                                            |
| `order_id`      | `string` | true     | Order ID returned, or user custom ID(i.e., `text` field).                                                                                                                                                    |
| `currency_pair` | `string` | true     | Currency pair                                                                                                                                                                                                |
| `account`       | `string` | false    | Specify operation account. Default to spot ,portfolio and margin account if not specified. Set to `cross_margin` to operate against margin account. Portfolio margin account must set to `cross_margin` only |

`req_header` Custom header data:

| Field            | Type     | Required | Description                                                                                                                                                         |
| ---------------- | -------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `x-gate-exptime` | `string` | false    | Specifies the expiration timestamp (in milliseconds). If the request time received by the WebSocket is later than the expiration time, the request will be rejected |

### [#](#order-amend-notification) Order Amend Notification

Order amend notification example

```json
{
  "request_id": "request-4",
  "header": {
    "response_time": "1681986206145",
    "status": "200",
    "channel": "spot.order_amend",
    "event": "api",
    "client_id": "::1-0x140001623c0",
    "x_in_time": 1681985856667508,
    "x_out_time": 1681985856667598,
    "conn_id": "5e74253e9c793974",
    "conn_trace_id": "1bde5aaa0acf2f5f48edfd4392e1fa68",
    "trace_id": "e410abb5f74b4afc519e67920548838d",
    "x_gate_ratelimit_requests_remain": 9,
    "x_gate_ratelimit_limit": 10,
    "x_gat_ratelimit_reset_timestamp": 1736408263764
  },
  "data": {
    "result": {
      "id": "1700664330",
      "text": "t-my-custom-id",
      "amend_text": "-",
      "create_time": "1681986204",
      "update_time": "1681986206",
      "create_time_ms": 1681986204832,
      "update_time_ms": 1681986206176,
      "status": "open",
      "currency_pair": "GT_USDT",
      "type": "limit",
      "account": "spot",
      "side": "buy",
      "amount": "1",
      "price": "2",
      "time_in_force": "gtc",
      "iceberg": "0",
      "left": "1",
      "fill_price": "0",
      "filled_total": "0",
      "fee": "0",
      "fee_currency": "GT",
      "point_fee": "0",
      "gt_fee": "0",
      "gt_maker_fee": "0.0015",
      "gt_taker_fee": "0.0015",
      "gt_discount": true,
      "rebated_fee": "0",
      "rebated_fee_currency": "USDT",
      "stp_id": 1,
      "stp_act": "cn",
      "finish_as": "open"
    }
  }
}
```

Result format:

| Field                               | Type    | Description                                                                                                                                                                                                                                                  |
| ----------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request_id`                        | String  | Unique identifier of the message                                                                                                                                                                                                                             |
| `header`                            | Map     | response meta info                                                                                                                                                                                                                                           |
| »`response_time`                    | String  | response send time in mill                                                                                                                                                                                                                                   |
| »`channel`                          | String  | request channel                                                                                                                                                                                                                                              |
| »`event`                            | String  | request event                                                                                                                                                                                                                                                |
| »`client_id`                        | String  | Unique client id                                                                                                                                                                                                                                             |
| »`x_in_time`                        | Integer | time to receive the request (in microseconds)                                                                                                                                                                                                                |
| »`x_out_time`                       | Integer | time to return response (in microseconds)                                                                                                                                                                                                                    |
| »`conn_trace_id`                    | String  | TraceId to establish connection with client                                                                                                                                                                                                                  |
| »`trace_id`                         | String  | TraceId for executing order operation                                                                                                                                                                                                                        |
| »`x_gate_ratelimit_requests_remain` | Integer | Remaining available requests in the current time window (hidden if 0)                                                                                                                                                                                        |
| »`x_gate_ratelimit_limit`           | Integer | Current rate limit cap (hidden if 0)                                                                                                                                                                                                                         |
| »`x_gat_ratelimit_reset_timestamp`  | Integer | If the current rate limit has been exceeded, this indicates the timestamp (in milliseconds) of the next available time window when access can be resumed. If the limit has not been exceeded, the response returns the current server time (in milliseconds) |
| »`conn_id`                          | String  | Connection ID established with the client (remains consistent for the same connection)                                                                                                                                                                       |
| `data`                              | Object  | Response data of the request                                                                                                                                                                                                                                 |
| »`result`                           | Object  | response detail to[api (opens new window)](https://www.gate.com/docs/developers/apiv4/en/#amend-an-order)                                                                                                                                                    |
| »`errs`                             | Object  | It is only available when the request fails                                                                                                                                                                                                                  |
| »»`label`                           | String  | denotes error type in string format                                                                                                                                                                                                                          |
| »»`message`                         | String  | detailed error message                                                                                                                                                                                                                                       |

## [#](#order-status) Order Status

You can query an order with this channel and event `status`.

**function as api below:**

```text
GET /spot/orders/{order_id}
```

### [#](#order-status-request) Order Status Request

Code example: Login is required before making requests

```python
#!/usr/bin/python

import time
import json
# pip install websocket_client
from websocket import create_connection


time = int(time.time())
statusParam = {"order_id":"1694883366","currency_pair":"GT_USDT"}
channel = "spot.order_status"

ws = create_connection("wss://api.gateio.ws/ws/v4/")

# refer to the Authentication section for a WebSocket API code example

ws.send(json.dumps({
    "time":time,
    "channel":channel,
    "event":"api",
    "payload":{
        "req_id":"test_1",
        "req_param": statusParam
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
	url := "wss://api.gateio.ws/ws/v4/"
	conn, _, err := websocket.DefaultDialer.Dial(url, nil)
	if err != nil {
		log.Fatal("dial error:", err)
	}
	defer conn.Close()

	timestamp := time.Now().Unix()
	statusParam := map[string]interface{}{
		"order_id":     "1694883366",
		"currency_pair": "GT_USDT",
	}
	channel := "spot.order_status"

	request := map[string]interface{}{
		"time":    timestamp,
		"channel": channel,
		"event":   "api",
		"payload": map[string]interface{}{
			"req_id":    "test_1",
			"req_param": statusParam,
		},
	}

	// refer to the Authentication section for a WebSocket API code example

	msg, err := json.Marshal(request)
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

Client request example

```json
{
  "time": 1681986205,
  "channel": "spot.order_status",
  "event": "api",
  "payload": {
    "req_id": "request-3",
    "req_param": {
      "order_id": "1700664330",
      "currency_pair": "GT_USDT"
    }
  }
}
```

Payload format:

| Field                             | Type     | Required | Description                                                                                                 |
| --------------------------------- | -------- | -------- | ----------------------------------------------------------------------------------------------------------- |
| `req_id`                          | `string` | Yes      | request id which will be sent back by the server to help you identify which request the server responds to, |
| it's different from outside's`id` |
| `req_param`                       | `object` | Yes      | detail to[api (opens new window)](https://www.gate.com/docs/developers/apiv4/en/#get-a-single-order)        |

`req_param` JSON byte data of the API order model:

| Field           | Type     | Required | Description                                                                                                                                                                                                  |
| --------------- | -------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `order_id`      | `string` | true     | Order ID returned, or user custom ID(i.e., `text` field).                                                                                                                                                    |
| `currency_pair` | `string` | true     | Currency pair                                                                                                                                                                                                |
| `account`       | `string` | false    | Specify operation account. Default to spot ,portfolio and margin account if not specified. Set to `cross_margin` to operate against margin account. Portfolio margin account must set to `cross_margin` only |

#### [#](#detailed-descriptions) Detailed descriptions

**order_id**: Order ID returned when the order was successfully created, or
user-specified custom ID (i.e., `text` field). Operations based on custom ID can
only be queried while the order is pending. After the order is completed
(filled/cancelled), it can be queried within 1 hour after completion, and only
the order ID can be used after expiration.

**account**: Specify the query account. If not specified, it defaults to spot,
margin, and isolated margin accounts. Set to `cross_margin` to query cross
margin accounts. Unified accounts can only specify `cross_margin`.

### [#](#order-status-notification) Order Status Notification

Order status notification example

```json
{
  "request_id": "request-3",
  "header": {
    "response_time": "1681986205829",
    "status": "200",
    "channel": "spot.order_status",
    "event": "api",
    "client_id": "::1-0x140001623c0",
    "x_in_time": 1681985856667508,
    "x_out_time": 1681985856667598,
    "conn_id": "5e74253e9c793974",
    "conn_trace_id": "1bde5aaa0acf2f5f48edfd4392e1fa68",
    "trace_id": "e410abb5f74b4afc519e67920548838d"
  },
  "data": {
    "result": {
      "id": "1700664330",
      "text": "t-my-custom-id",
      "amend_text": "-",
      "create_time": "1681986204",
      "update_time": "1681986204",
      "create_time_ms": 1681986204939,
      "update_time_ms": 1681986204939,
      "status": "open",
      "currency_pair": "GT_USDT",
      "type": "limit",
      "account": "spot",
      "side": "buy",
      "amount": "1",
      "price": "1",
      "time_in_force": "gtc",
      "iceberg": "0",
      "left": "1",
      "fill_price": "0",
      "filled_total": "0",
      "fee": "0",
      "fee_currency": "GT",
      "point_fee": "0",
      "gt_fee": "0",
      "gt_maker_fee": "0.0015",
      "gt_taker_fee": "0.0015",
      "gt_discount": true,
      "rebated_fee": "0",
      "rebated_fee_currency": "USDT",
      "stp_id": 1,
      "stp_act": "cn",
      "finish_as": "open"
    }
  }
}
```

Updated order list. Note it is possible that multiple currency pairs' orders
will be updated in one notification.

Result format:

| Field            | Type    | Description                                                                                                   |
| ---------------- | ------- | ------------------------------------------------------------------------------------------------------------- |
| `request_id`     | String  | Unique identifier of the message                                                                              |
| `header`         | Map     | response meta info                                                                                            |
| »`response_time` | String  | response send time in mill                                                                                    |
| »`channel`       | String  | request channel                                                                                               |
| »`event`         | String  | request event                                                                                                 |
| »`client_id`     | String  | Unique client id                                                                                              |
| »`x_in_time`     | Integer | time to receive the request (in microseconds)                                                                 |
| »`x_out_time`    | Integer | time to return response (in microseconds)                                                                     |
| »`conn_id`       | String  | Connection ID established with the client (remains consistent for the same connection)                        |
| »`conn_trace_id` | String  | TraceId to establish connection with client                                                                   |
| »`trace_id`      | String  | TraceId for executing order operation                                                                         |
| `data`           | Object  | Response data of the request                                                                                  |
| »`result`        | Object  | response detail to[api (opens new window)](https://www.gate.com/docs/developers/apiv4/en/#get-a-single-order) |
| »`errs`          | Object  | It is only available when the request fails                                                                   |
| »»`label`        | String  | denotes error type in string format                                                                           |
| »»`message`      | String  | detailed error message                                                                                        |

## [#](#list-orders) List orders

`spot.order_list`

You can use this channel and event `api` to query orders.

**Following are the functions of the API:**

```text
GET /spot/orders
```

### [#](#request-3) Request

Code example: Login is required before making requests

```python
#!/usr/bin/python

import time
import json
# pip install websocket_client
from websocket import create_connection


time = int(time.time())
statusParam = {"currency_pair": "BTC_USDT","status": "finished","limit": 3,"page": 1}
channel = "spot.order_list"

ws = create_connection("wss://api.gateio.ws/ws/v4/")

# refer to the Authentication section for a WebSocket API code example

ws.send(json.dumps({
    "time":time,
    "channel":channel,
    "event":"api",
    "payload":{
        "req_id":"1734081140-1",
        "req_param": statusParam
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
	url := "wss://api.gateio.ws/ws/v4/"
	conn, _, err := websocket.DefaultDialer.Dial(url, nil)
	if err != nil {
		log.Fatal("dial error:", err)
	}
	defer conn.Close()

	timestamp := time.Now().Unix()
	statusParam := map[string]interface{}{
		"currency_pair": "BTC_USDT",
		"status":        "finished",
		"limit":         3,
		"page":          1,
	}
	channel := "spot.order_list"

	request := map[string]interface{}{
		"time":    timestamp,
		"channel": channel,
		"event":   "api",
		"payload": map[string]interface{}{
			"req_id":    "1734081140-1",
			"req_param": statusParam,
		},
	}

	// refer to the Authentication section for a WebSocket API code example

	msg, err := json.Marshal(request)
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

Request example

```json
{
  "time": 1734400368,
  "channel": "spot.order_list",
  "event": "api",
  "payload": {
    "req_id": "1734081140-1",
    "req_param": {
      "currency_pair": "BTC_USDT",
      "status": "finished",
      "limit": 3,
      "page": 1
    }
  }
}
```

Payload:

| Field                             | Type     | Required | Description                                                                                                 |
| --------------------------------- | -------- | -------- | ----------------------------------------------------------------------------------------------------------- |
| `req_id`                          | `string` | Yes      | request id which will be sent back by the server to help you identify which request the server responds to, |
| it's different from outside's`id` |
| `req_param`                       | `object` | Yes      | detail to[api (opens new window)](https://www.gate.com/docs/developers/apiv4/en/#list-orders)               |

`req_param` JSON byte data of the API order model:

| Field           | Type             | Required | Description                                                                                                                                                                                                  |
| --------------- | ---------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `currency_pair` | `string`         | true     | Retrieve results with specified currency pair. It is required for open orders, but optional for finished ones.                                                                                               |
| `status`        | `string`         | true     | List orders based on status                                                                                                                                                                                  |
| `page`          | `integer(int32)` | false    | Page number                                                                                                                                                                                                  |
| `limit`         | `integer`        | false    | Maximum number of records to be returned. If `status` is `open`, maximum of `limit` is 100                                                                                                                   |
| `account`       | `string`         | false    | Specify operation account. Default to spot ,portfolio and margin account if not specified. Set to `cross_margin` to operate against margin account. Portfolio margin account must set to `cross_margin` only |
| `from`          | `integer(int64)` | false    | Start timestamp of the query                                                                                                                                                                                 |
| `to`            | `integer(int64)` | false    | Time range ending, default to current time                                                                                                                                                                   |
| `side`          | `string`         | false    | All bids or asks. Both included if not specified                                                                                                                                                             |

#### [#](#detailed-descriptions-2) Detailed descriptions

**status**: List orders based on status

`open` - order is waiting to be filled

`finished` - order has been filled or cancelled

**account**: Specify operation account. Default to spot, margin, and isolated
margin accounts if not specified. Set to `cross_margin` to query cross margin
accounts. Unified accounts can only specify `cross_margin`.

### [#](#responses) Responses

Responses example

```json
{
  "header": {
    "response_time": "1734486677912",
    "status": "200",
    "channel": "spot.order_list",
    "event": "api",
    "client_id": "35.79.119.197-0xc00a13a1a0",
    "x_in_time": 1734486677912508,
    "x_out_time": 1734486677912598,
    "conn_id": "5e74253e9c793974",
    "conn_trace_id": "1bde5aaa0acf2f5f48edfd4392e1fa68",
    "trace_id": "e410abb5f74b4afc519e67920548838d"
  },
  "data": {
    "result": [
      {
        "id": "20874890569",
        "text": "web",
        "amend_text": "-",
        "create_time": "1734081653",
        "update_time": "1734081653",
        "create_time_ms": 1734081653247,
        "update_time_ms": 1734081653249,
        "status": "closed",
        "currency_pair": "BTC_USDT",
        "type": "market",
        "account": "spot",
        "side": "buy",
        "amount": "70.0",
        "price": "0.0",
        "time_in_force": "ioc",
        "iceberg": "0.0",
        "left": "0.143511",
        "filled_amount": "0.00299",
        "fill_price": "69.856489",
        "filled_total": "69.856489",
        "avg_deal_price": "23363.3742475",
        "fee": "0.0000028704",
        "fee_currency": "BTC",
        "point_fee": "0.0",
        "gt_fee": "0.0",
        "gt_maker_fee": "0.0",
        "gt_taker_fee": "0.0",
        "rebated_fee": "0.0",
        "rebated_fee_currency": "USDT",
        "finish_as": "filled"
      },
      {
        "id": "20884808760",
        "text": "web",
        "amend_text": "-",
        "create_time": "1734081534",
        "update_time": "1734081534",
        "create_time_ms": 1734081534822,
        "update_time_ms": 1734081534824,
        "status": "closed",
        "currency_pair": "BTC_USDT",
        "type": "market",
        "account": "spot",
        "side": "buy",
        "amount": "100.0",
        "price": "0.0",
        "time_in_force": "ioc",
        "iceberg": "0.0",
        "left": "0.088092",
        "filled_amount": "0.00433",
        "fill_price": "99.911908",
        "filled_total": "99.911908",
        "avg_deal_price": "23074.34364897",
        "fee": "0.0000041568",
        "fee_currency": "BTC",
        "point_fee": "0.0",
        "gt_fee": "0.0",
        "gt_maker_fee": "0.0",
        "gt_taker_fee": "0.0",
        "rebated_fee": "0.0",
        "rebated_fee_currency": "USDT",
        "finish_as": "filled"
      },
      {
        "id": "20870148234",
        "text": "t-123456",
        "amend_text": "-",
        "create_time": "1733900250",
        "update_time": "1733900250",
        "create_time_ms": 1733900250750,
        "update_time_ms": 1733900250755,
        "status": "closed",
        "currency_pair": "BTC_USDT",
        "type": "market",
        "account": "spot",
        "side": "buy",
        "amount": "10.0",
        "price": "0.0",
        "time_in_force": "ioc",
        "iceberg": "0.0",
        "left": "0.144492",
        "filled_amount": "0.00013",
        "fill_price": "9.855508",
        "filled_total": "9.855508",
        "avg_deal_price": "75811.6",
        "fee": "0.0000001248",
        "fee_currency": "BTC",
        "point_fee": "0.0",
        "gt_fee": "0.0",
        "gt_maker_fee": "0.0",
        "gt_taker_fee": "0.0",
        "rebated_fee": "0.0",
        "rebated_fee_currency": "USDT",
        "finish_as": "filled"
      }
    ]
  },
  "request_id": "1734081140-1"
}
```

Result format:

| Field            | Type    | Description                                                                                        |
| ---------------- | ------- | -------------------------------------------------------------------------------------------------- |
| `request_id`     | String  | Unique identifier of the message                                                                   |
| `header`         | Map     | response meta info                                                                                 |
| »`response_time` | String  | response send time in mill                                                                         |
| »`channel`       | String  | request channel                                                                                    |
| »`event`         | String  | request event                                                                                      |
| »`client_id`     | String  | Unique client id                                                                                   |
| »`x_in_time`     | Integer | time to receive the request (in microseconds)                                                      |
| »`x_out_time`    | Integer | time to return response (in microseconds)                                                          |
| »`conn_id`       | String  | Connection ID established with the client (remains consistent for the same connection)             |
| »`conn_trace_id` | String  | TraceId to establish connection with client                                                        |
| »`trace_id`      | String  | TraceId for executing order operation                                                              |
| `data`           | Object  | Response data of the request                                                                       |
| »`result`        | Array   | response detail to[api (opens new window)](https://www.gate.com/docs/developers/apiv4/en/#order-2) |
| »`errs`          | Object  | It is only available when the request fails                                                        |
| »»`label`        | String  | denotes error type in string format                                                                |
| »»`message`      | String  | detailed error message                                                                             |

Last Updated: 7/9/2025, 1:17:26 PM
