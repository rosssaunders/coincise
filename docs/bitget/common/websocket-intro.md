# Websocket API

### Overview[​](#overview "Direct link to Overview")

WebSocket is a new HTML5 protocol that achieves full-duplex data transmission between the client and server, allowing data to be transferred effectively in both directions. A connection between the client and server can be established with just one handshake. The server will then be able to push data to the client according to preset rules. Its advantages include:

*   The WebSocket request header size for data transmission between client and server is only 2 bytes.
*   Either the client or server can initiate data transmission.
*   There's no need to repeatedly create and delete TCP connections, saving resources on bandwidth and server.

It is strongly recommended that developers use WebSocket API to obtain market information and transaction depth.

| Domain | WebSocket API | Recommended to use |
| :-- | :-- | :-- |
| Websocket Domain | wss://ws.bitget.com/v2/ws/public | Main Domain, Public channel 
| Websocket Domain | wss://ws.bitget.com/v2/ws/private | Main Domain, Private channel 

### Connect[​](#connect "Direct link to Connect")

**Connection instructions**:

**Connection limit**: 300 connection requests/IP/5min, Max 100 connections/IP

**Subscription limit**: 240 subscription requests/Hour/connection, Max 1000 channel subscription/connection

If there’s a network problem, the system will automatically disconnect the connection.

To keep the connection stable:

1.  Users set a 30 seconds timer to a send string "ping", and expect a string "pong" as response. If no string "pong" received, please reconnect
2.  Websocket server will disconnect the connection if there is no string "ping" received for 2 min
3.  The Websocket server accepts up to 10 messages per second. The message includes:

*   String "ping"
*   JSON message, such as subscribe, unsubscribe.

4.  If the user sends more messages than the limit, the connection will be disconnected. The IP which is repeatedly disconnected may be blocked by the server
5.  We highly recommend you to subscribe **less than 50 channels in one connection**. The connections with less channel subscriptions will be more stable.

### Login[​](#login "Direct link to Login")

**apiKey**: Unique identification for invoking API. Requires user to [apply](javascript:;) one manually.

**passphrase**: APIKey password

**timestamp**: Unix timestamp in milliseconds, which will expire in 30 seconds.

**secretKey**: The security key generated when the user applies for APIKey, e.g. : 22582BD0CFF14C41EDBF1AB98506286D

Example of timestamp

```
const timestamp ='' + Date.now()
```

"Sign

```
sign=CryptoJS.enc.Base64.Stringify(CryptoJS.HmacSHA256(timestamp +'GET'+'/user/verify', secretKey))
```

**method**: always 'GET'.

**requestPath** : always '/user/verify'

**sign**: signature string, the signature algorithm is as follows:

First concatenate `timestamp`, `method`, `requestPath`, then use HMAC SHA256 method to encrypt the concatenated string with SecretKey, and then perform Base64 encoding.

The request will expire 30 seconds after the timestamp. If your server time differs from the API server time, we recommended using the REST API to query the [API server time](/api-doc/common/public/Get-Server-Time) and then compare the timestamp.

#### Steps to generate the final signature[​](#steps-to-generate-the-final-signature "Direct link to Steps to generate the final signature")

**_HMAC_**

Step 1. concat the content

```
Long timestamp = System.currentTimeMillis() / 1000;        String content = timestamp +"GET"+"/user/verify";
```

Step 1. Use the private key secretkey to encrypt the string to be signed with hmac sha256

```
String hash = hmac_sha256(content, secretkey);
```

The final step is to base64 encode the hash

```
String sign = base64.encode(hash);
```

**_RSA_**

*   [RSA sample code](/api-doc/common/signature-samaple/rsa)

Step 1. Use the RSA privateKey **privateKey** to encrypt the string to be signed with SHA-256

Step 2. Base64 encoding for Signature.

If login fails, it will automatically disconnect

Request Format Description

```
{  "op":"login",  "args":[    {      "apiKey":"<api_key>",      "passphrase":"<passphrase>",      "timestamp":"<timestamp>",      "sign":"<sign>"    }  ]}
```

Request Example

```
{  "op":"login",  "args":[    {      "apiKey":"xx_xxx",      "passphrase":"xxx",      "timestamp":"1538054050",      "sign":"8RCOqCJAhhEh4PWcZB/96QojLDqMAg4qNynIixFzS3E="    }  ]}
```

Successful Response Example

```
{  "event":"login",  "code":"0",  "msg":""}
```

Failure Response Example

```
{  "event":"error",  "code":"30005",  "msg":"error"}
```

### Subscribe[​](#subscribe "Direct link to Subscribe")

**Subscription Instructions**

Request Format Description

```
{    "op": "subscribe",    "args": ["<SubscriptionTopic>"]}
```

`instId`: should be either `symbol` or `default`

Users can choose to subscribe to one or more channels, and the total length of multiple channels cannot exceed 4096 bytes at a time.

Request Example

```
{    "op":"subscribe",    "args":[        {            "instType":"SPOT",            "channel":"ticker",            "instId":"BTCUSDT"        },        {            "instType":"SPOT",            "channel":"candle5m",            "instId":"BTCUSDT"        }    ]}
```

**Request Parameters**

| Parameter | Type | Required | Description |
| :-- | :-- | :-- | :-- |
| op | String | Yes | Operation, <code>subscribe</code> 
| args | Array | Yes | List of subscribe channels 
| &gt; instType | String | No | Instrument Type 
| &gt; channel | String | Yes | Channel name 
| &gt; instId | String | No | Instrument ID 

Example Response

```
{ "event": "subscribe",  "arg": {   "instType":"SPOT",   "channel":"ticker",    "instId":"BTCUSDT"  }}
```

**Return Parameters**

| Parameter | Type | Required | Description |
| :-- | :-- | :-- | :-- |
| event | String | Yes | Event, subscribe error 
| arg | Object | No | Subscribed channel 
| &gt; instType | String | No | Instrument Type MC：Perpetual contract public channel 
| &gt; channel | String | Yes | Channel name 
| &gt; instId | String | No | Instrument ID 
| code | String | No | Error code 
| msg | String | No | Error message 

### Unsubscribe[​](#unsubscribe "Direct link to Unsubscribe")

Unsubscribe from one or more channels.

Request Format Description

```
{    "op": "unsubscribe",    "args": ["< SubscriptionTopic>"]}
```

Request Example

```
{    "op":"unsubscribe",    "args":[        {            "instType":"SPOT",            "channel":"ticker",            "instId":"BTCUSDT"        },        {            "instType":"SPOT",            "channel":"candle1m",            "instId":"BTCUSDT"        }    ]}
```

**Request Parameters**

| Parameter | Type | Required | Description |
| :-- | :-- | :-- | :-- |
| op | String | Yes | Operation, unsubscribe 
| args | Array | Yes | List of channels to unsubscribe from 
| &gt; instType | String | Yes | Instrument Type MC：Perpetual contract public channel 
| &gt; channel | String | Yes | Channel name 
| &gt; instId | String | Yes | Instrument ID 

Example Response

```
{  "op":"unsubscribe",  "args":[    {      "instType":"USDT-FUTURES",      "channel":"ticker",      "instId":"BTCUSDT"    },    {      "instType":"USDT-FUTURES",      "channel":"candle1m",      "instId":"BTCUSDT"    }  ]}
```

**Return Parameters**

| Parameter | Type | Required | Description |
| :-- | :-- | :-- | :-- |
| event | String | Yes | Event, unsubscribe error 
| arg | Object | Yes | Unsubscribed channel 
| &gt; instType | String | Yes | Instrument Type 
| &gt; channel | String | Yes | Channel name 
| &gt; instId | String | Yes | Instrument ID 
| code | String | No | Error Code 
| msg | String | No | Error Message

> **Source:** https://www.bitget.com/api-doc/common/websocket-intro
