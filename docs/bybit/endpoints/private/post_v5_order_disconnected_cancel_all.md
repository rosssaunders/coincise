# Set Disconnect Cancel All

info

## What is Disconnection Protect (DCP)?[​](#what-is-disconnection-protect-dcp "Direct link to heading")

Based on the websocket private connection and heartbeat mechanism, Bybit
provides disconnection protection function. The timing starts from the first
disconnection. If the Bybit server does not receive the reconnection from the
client for more than 10 (default) seconds and resumes the heartbeat "ping", then
the client is in the state of "disconnection protect", all active **futures /
spot / option** orders of the client will be cancelled automatically. If within
10 seconds, the client reconnects and resumes the heartbeat "ping", the timing
will be reset and restarted at the next disconnection.

## How to enable DCP[​](#how-to-enable-dcp "Direct link to heading")

If you need to turn it on/off, you can contact your client manager for
consultation and application. The default time window is 10 seconds.

## Applicable[​](#applicable "Direct link to heading")

Effective for **Inverse Perp / Inverse Futures / USDT Perp / USDT Futures / USDC
Perp / USDC Futures / Spot / options**

tip

After the request is successfully sent, the system needs a certain time to take
effect. It is recommended to query or set again after 10 seconds

- You can use [this endpoint](/docs/v5/account/dcp-info) to get your current DCP
  configuration.
- Your private websocket connection **must** subscribe
  ["dcp" topic](/docs/v5/websocket/private/dcp) in order to trigger DCP
  successfully

### HTTP Request[​](#http-request "Direct link to heading")

POST `/v5/order/disconnected-cancel-all`

### Request Parameters[​](#request-parameters "Direct link to heading")

| Parameter  | Required | Type    | Comments                                                       |
| :--------- | :------- | :------ | -------------------------------------------------------------- |
| product    | false    | string  | `OPTIONS`(default), `DERIVATIVES`, `SPOT`                      |
| timeWindow | **true** | integer | Disconnection timing window time. \[`3`, `300`\], unit: second |

### Response Parameters[​](#response-parameters "Direct link to heading")

None

### Request Example[​](#request-example "Direct link to heading")

```
POST v5/order/disconnected-cancel-all HTTP/1.1Host: api.bybit.comX-BAPI-SIGN: XXXXXX-BAPI-API-KEY: xxxxxxxxxxxxxxxxxxX-BAPI-TIMESTAMP: 1675852742375X-BAPI-RECV-WINDOW: 50000Content-Type: application/json{  "timeWindow": 40}
```

```python
from pybit.unified_trading import HTTPsession = HTTP(    testnet=True,    api_key="xxxxxxxxxxxxxxxxxx",    api_secret="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",)print(session.set_dcp(    timeWindow=40,))
```

```python
import com.bybit.api.client.config.BybitApiConfig;import com.bybit.api.client.domain.trade.request.TradeOrderRequest;import com.bybit.api.client.domain.*;import com.bybit.api.client.domain.trade.*;import com.bybit.api.client.service.BybitApiClientFactory;var client = BybitApiClientFactory.newInstance("YOUR_API_KEY", "YOUR_API_SECRET", BybitApiConfig.TESTNET_DOMAIN).newTradeRestClient();var setDcpOptionsRequest = TradeOrderRequest.builder().timeWindow(40).build();System.out.println(client.setDisconnectCancelAllTime(setDcpOptionsRequest));
```

```javascript
const { RestClientV5 } = require("bybit-api")
const client = new RestClientV5({
  testnet: true,
  key: "YOUR_API_KEY",
  secret: "YOUR_API_SECRET"
})
client
  .setDisconnectCancelAllWindow("option", 40)
  .then(response => {
    console.log(response)
  })
  .catch(error => {
    console.error(error)
  })
```

### Response Example[​](#response-example "Direct link to heading")

```json
{
  "retCode": 0,
  "retMsg": "success"
}
```
