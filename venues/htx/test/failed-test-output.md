This API can only be used with the SPOT Exchange.

**Access URLs**

Order access URL: `tcp+tls://`[`fix-order.huobi.pro`](http://fix-oe.binance.com)`: 9000`

`Feature:` Place and cancel your orders.

Market access URL: `tcp+tls://`[`fix-market.huobi.pro`](http://fix-oe.binance.com)`: 9000`

`Feature:` Send push notifications of market movements.

**Connection Limits**

A maximum of 200 messages per second can be sent to the exchange per connection. It is the same as orders. Upon breaching the limit, a Reject `<3>` message will be sent.

A maximum of 10 TCP connections per account is allowed. Exceeding this limit will result in a Logout `<5>` message being sent, followed by a disconnection.

**Response Mode**

FIX API allows multiple concurrent sessions for a single account. By default, all sessions receive all of the account's successful ExecutionReport`<8>` messages. These messages include responses from other FIX sessions as well as non-FIX API orders.

**Header**

Appears at the beginning of every message.

| Tag | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| 8 | BeginString | String | Y | Always FIX.4.4 Must be the first field in the message. |
| 9 | BodyLength | Int | Y | Message length in bytes. Must be the second field in the message. |
| 35 | MsgType | String | Y | Must be the third field in the message. |
| 49 | SenderCompID | String | Y | Must be a unique mark with an alphanumeric combination of 10-32 characters. Your UUID is recommended. |
| 56 | TargetCompID | String | Y | On messages from client required to be set to "spot." |
| 34 | MsgSeqNum | Int | Y | Integer message sequence number.Values that will cause a gap will be rejected. |
| 52 | SendingTime | UTCTimestamp | Y | Time of message transmission always expressed in UTC (YYYYMMDD-HH:MM:SS.sss). |

**Trailer**

Appears at the end of every message.

| Tag | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| 10 | CheckSum | String | Y |   |