# Switch Position Mode

It supports to switch the position mode for **USDT perpetual** and **Inverse futures**. If you are in one-way Mode, you can only open one position on Buy or Sell side. If you are in hedge mode, you can open both Buy and Sell side positions simultaneously.

tip

-   Priority for configuration to take effect: symbol > coin > system default
-   System default: one-way mode
-   If the request is by coin (settleCoin), then all symbols based on this setteCoin that do not have position and open order will be batch switched, and new listed symbol based on this settleCoin will be the same mode you set.

### Example[​](#example "Direct link to heading")

|  | System default | coin | symbol |
| --- | --- | --- | --- |
| Initial setting | one-way | never configured | never configured |
| Result | All USDT perpetual trading pairs are one-way mode |
| **Change 1** | \- | \- | Set BTCUSDT to hedge-mode |
| Result | BTCUSDT becomes hedge-mode, and all other symbols keep one-way mode |
| list new symbol ETHUSDT | ETHUSDT is one-way mode (inherit default rules) |
| **Change 2** | \- | Set USDT to hedge-mode | \- |
| Result | All current trading pairs with no positions or orders are hedge-mode, and no adjustments will be made for trading pairs with positions and orders |
| list new symbol SOLUSDT | SOLUSDT is hedge-mode (Inherit coin rule) |
| **Change 3** | \- | \- | Set ASXUSDT to one-mode |
| Take effect result | AXSUSDT is one-way mode, other trading pairs have no change |
| list new symbol BITUSDT | BITUSDT is hedge-mode (Inherit coin rule) |

### The position-switch ability for each contract[​](#the-position-switch-ability-for-each-contract "Direct link to heading")

|  | Classic account | UTA1.0 | UTA2.0 |
| --- | --- | --- | --- |
| USDT perpetual | **Support one-way & hedge-mode** | **Support one-way & hedge-mode** | **Support one-way & hedge-mode** |
| USDT futures | N/A | Support one-way **only** | Support one-way **only** |
| USDC perpetual | N/A | Support one-way **only** | Support one-way **only** |
| USDC futures | N/A | Support one-way **only** | Support one-way **only** |
| Inverse perpetual | Support one-way **only** | Support one-way **only** | Support one-way **only** |
| Inverse futures | **Support one-way & hedge-mode** | **Support one-way & hedge-mode** | Support one-way **only** |

### HTTP Request[​](#http-request "Direct link to heading")

POST `/v5/position/switch-mode`

### Request Parameters[​](#request-parameters "Direct link to heading")

| Parameter | Required | Type | Comments |
| :-- | :-- | :-- | --- |
| [category](/docs/v5/enum#category) | **true** | string | Product type
-   [UTA2.0](/docs/v5/acct-mode#uta-20): `linear`, USDT Contract
-   [UTA1.0](/docs/v5/acct-mode#uta-10): `linear`, USDT Contract; `inverse`, Inverse Futures
-   Classic: `linear`, USDT Perp; `inverse`, Inverse Futures

 |
| symbol | false | string | Symbol name, like `BTCUSDT`, uppercase only. Either `symbol` or `coin` is **required**. `symbol` has a higher priority |
| coin | false | string | Coin, uppercase only |
| mode | **true** | integer | Position mode. `0`: Merged Single. `3`: Both Sides |

[RUN >>](/docs/api-explorer/v5/position/position-mode)

* * *

### Response Parameters[​](#response-parameters "Direct link to heading")

None

### Request Example[​](#request-example "Direct link to heading")

```bash
POST /v5/position/switch-mode HTTP/1.1Host: api-testnet.bybit.comX-BAPI-SIGN: XXXXXX-BAPI-API-KEY: xxxxxxxxxxxxxxxxxxX-BAPI-TIMESTAMP: 1675249072041X-BAPI-RECV-WINDOW: 5000Content-Type: application/jsonContent-Length: 87{    "category":"inverse",    "symbol":"BTCUSDH23",    "coin": null,    "mode": 0}
```

```python
from pybit.unified_trading import HTTPsession = HTTP(    testnet=True,    api_key="xxxxxxxxxxxxxxxxxx",    api_secret="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",)print(session.switch_position_mode(    category="inverse",    symbol="BTCUSDH23",    mode=0,))
```

```python
import com.bybit.api.client.domain.*;import com.bybit.api.client.domain.position.*;import com.bybit.api.client.domain.position.request.*;import com.bybit.api.client.service.BybitApiClientFactory;var client = BybitApiClientFactory.newInstance().newPositionRestClient();var switchPositionMode = PositionDataRequest.builder().category(CategoryType.LINEAR).symbol("BTCUSDT").positionMode(PositionMode.BOTH_SIDES).build();System.out.println(client.switchPositionMode(switchPositionMode));
```

```javascript
const { RestClientV5 } = require('bybit-api');const client = new RestClientV5({    testnet: true,    key: "YOUR_API_KEY",    secret: "YOUR_API_SECRET",});client    .switchPositionMode({        category: 'inverse',        symbol: 'BTCUSDH23',        mode: 0,    })    .then((response) => {        console.log(response);    })    .catch((error) => {        console.error(error);    });
```

### Response Example[​](#response-example "Direct link to heading")

```json
{
  "retCode": 0,
  "retMsg": "OK",
  "result": {},
  "retExtInfo": {},
  "time": 1675249072814
}
```