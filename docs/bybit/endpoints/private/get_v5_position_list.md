# Get Position Info

Query real-time position data, such as position size, cumulative realized PNL,
etc.

info

**category="inverse"**

1.  You can query all open positions with `/v5/position/list?category=inverse`;
2.  Cannot query multiple symbols in one request

### HTTP Request[​](#http-request "Direct link to heading")

GET `/v5/position/list`

### Request Parameters[​](#request-parameters "Direct link to heading")

| Parameter                          | Required | Type   | Comments                                    |
| :--------------------------------- | :------- | :----- | ------------------------------------------- |
| [category](/docs/v5/enum#category) | **true** | string | Product type `linear`, `inverse`, `option`  |
| symbol                             | false    | string | Symbol name, like `BTCUSDT`, uppercase only |

- If `symbol` passed, it returns data regardless of having position or not.
- If `symbol`\=null and `settleCoin` specified, it returns position size greater
  than zero.

| | baseCoin | false | string | Base coin, uppercase only. `option` **only**.
Return all option positions if not passed | | settleCoin | false | string |
Settle coin- `linear`: either `symbol` or `settleCoin` is **required**. `symbol`
has a higher priority | | limit | false | integer | Limit for data size per
page. \[`1`, `200`\]. Default: `20` | | cursor | false | string | Cursor. Use
the `nextPageCursor` token from the response to retrieve the next page of the
result set |

### Response Parameters[​](#response-parameters "Direct link to heading")

| Parameter                                   | Type    | Comments                                                             |
| :------------------------------------------ | :------ | -------------------------------------------------------------------- |
| [category](/docs/v5/enum#category)          | string  | Product type                                                         |
| nextPageCursor                              | string  | Refer to the `cursor` request parameter                              |
| list                                        | array   | Object                                                               |
| \> [positionIdx](/docs/v5/enum#positionidx) | integer | Position idx, used to identify positions in different position modes |

- `0`: One-Way Mode
- `1`: Buy side of both side mode
- `2`: Sell side of both side mode

| | \> riskId | integer | Risk tier ID  
_for portfolio margin mode, this field returns 0, which means risk limit rules
are invalid_ | | \> riskLimitValue | string | Risk limit value, become
meaningless when auto risk-limit tier is applied  
_for portfolio margin mode, this field returns 0, which means risk limit rules
are invalid_ | | \> symbol | string | Symbol name | | \> side | string |
Position side. `Buy`: long, `Sell`: short  
return an empty string `""` for an empty position | | \> size | string |
Position size, always positive | | \> avgPrice | string | Average entry price-
For USDC Perp & Futures, it indicates average entry price, and it will not be
changed with 8-hour session settlement | | \> positionValue | string | Position
value | | \> autoAddMargin | integer | Whether to add margin automatically when
using isolated margin mode- `0`: false

- `1`: true | | \> [positionStatus](/docs/v5/enum#positionstatus) | String |
  Position status. `Normal`, `Liq`, `Adl` | | \> leverage | string | Position
  leverage  
  _for portfolio margin mode, this field returns "", which means leverage rules
  are invalid_ | | \> markPrice | string | Mark price | | \> liqPrice | string |
  Position liquidation price

- Isolated margin:  
  it is the real price for isolated and cross positions, and keeps `""` when
  liqPrice <= minPrice or liqPrice >= maxPrice
- Cross margin:  
  it is an **estimated** price for cross positions(because the unified mode
  controls the risk rate according to the account), and keeps `""` when liqPrice
  <= minPrice or liqPrice >= maxPrice

_this field is empty for Portfolio Margin Mode, and no liquidation price will be
provided_ | | \> positionIM | string | Initial margin, the same value as
`positionIMByMp`, please note this change
[The New Margin Calculation: Adjustments and Implications](https://www.bybit.com/en/help-center/article/Understanding-the-Adjustment-and-Impact-of-the-New-Margin-Calculation)-
Portfolio margin mode: returns "" | | \> positionIMByMp | string | Initial
margin calculated by mark price, the same value as `positionIM`- Portfolio
margin mode: returns "" | | \> positionMM | string | Maintenance margin, the
same value as `positionMMByMp`- Portfolio margin mode: returns "" | | \>
positionMMByMp | string | Maintenance margin calculated by mark price, the same
value as `positionMM`- Portfolio margin mode: returns "" | | \> takeProfit |
string | Take profit price | | \> stopLoss | string | Stop loss price | | \>
trailingStop | string | Trailing stop (the distance from market price) | | \>
sessionAvgPrice | string | USDC contract session avg price, it is the same
figure as avg entry price shown in the web UI | | \> delta | string | Delta | |
\> gamma | string | Gamma | | \> vega | string | Vega | | \> theta | string |
Theta | | \> unrealisedPnl | string | Unrealised PnL | | \> curRealisedPnl |
string | The realised PnL for the current holding position | | \> cumRealisedPnl
| string | Cumulative realised pnl

- Futures & Perps: it is the all time cumulative realised P&L
- Option: always "", meaningless

| | \> [adlRankIndicator](/docs/v5/enum#adlrankindicator) | integer |
Auto-deleverage rank indicator.
[What is Auto-Deleveraging?](https://www.bybit.com/en-US/help-center/s/article/What-is-Auto-Deleveraging-ADL)
| | \> createdTime | string | Timestamp of the first time a position was created
on this symbol (ms) | | \> updatedTime | string | Position updated timestamp
(ms) | | \> seq | long | Cross sequence, used to associate each fill and each
position update

- Different symbols may have the same seq, please use seq + symbol to check
  unique
- Returns `"-1"` if the symbol has never been traded
- Returns the seq updated by the last transaction when there are settings like
  leverage, risk limit

| | \> isReduceOnly | boolean | Useful when Bybit lower the risk limit

- `true`: Only allowed to reduce the position. You can consider a series of
  measures, e.g., lower the risk limit, decrease leverage or reduce the
  position, add margin, or cancel orders, after these operations, you can call
  [confirm new risk limit](/docs/v5/position/confirm-mmr) endpoint to check if
  your position can be removed the reduceOnly mark
- `false`: There is no restriction, and it means your position is under the risk
  when the risk limit is systematically adjusted
- Only meaningful for isolated margin & cross margin of USDT Perp, USDC Perp,
  USDC Futures, Inverse Perp and Inverse Futures, meaningless for others

| | \> mmrSysUpdatedTime | string | Useful when Bybit lower the risk limit

- When isReduceOnly=`true`: the timestamp (ms) when the MMR will be forcibly
  adjusted by the system When isReduceOnly=`false`: the timestamp when the MMR
  had been adjusted by system- It returns the timestamp when the system
  operates, and if you manually operate, there is no timestamp
- Keeps `""` by default, if there was a lower risk limit system adjustment
  previously, it shows that system operation timestamp
- Only meaningful for isolated margin & cross margin of USDT Perp, USDC Perp,
  USDC Futures, Inverse Perp and Inverse Futures, meaningless for others

| | \> leverageSysUpdatedTime | string | Useful when Bybit lower the risk limit

- When isReduceOnly=`true`: the timestamp (ms) when the leverage will be
  forcibly adjusted by the system When isReduceOnly=`false`: the timestamp when
  the leverage had been adjusted by system- It returns the timestamp when the
  system operates, and if you manually operate, there is no timestamp
- Keeps `""` by default, if there was a lower risk limit system adjustment
  previously, it shows that system operation timestamp
- Only meaningful for isolated margin & cross margin of USDT Perp, USDC Perp,
  USDC Futures, Inverse Perp and Inverse Futures, meaningless for others

| | \> tpslMode | string | **Deprecated**, always "Full" | | \> bustPrice |
string | **Deprecated**, always `""` | | \> positionBalance | string |
**Deprecated**, can refer to `positionIM` or `positionIMByMp` field | | \>
tradeMode | integer | **Deprecated**, always `0`, check
[Get Account Info](/docs/v5/account/account-info) to know the margin mode |

[RUN >>](/docs/api-explorer/v5/position/position-info)

---

### Request Example[​](#request-example "Direct link to heading")

```bash
GET /v5/position/list?category=inverse&symbol=BTCUSD HTTP/1.1Host: api-testnet.bybit.comX-BAPI-SIGN: XXXXXX-BAPI-API-KEY: xxxxxxxxxxxxxxxxxxX-BAPI-TIMESTAMP: 1672280218882X-BAPI-RECV-WINDOW: 5000
```

```python
from pybit.unified_trading import HTTPsession = HTTP(    testnet=True,    api_key="xxxxxxxxxxxxxxxxxx",    api_secret="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",)print(session.get_positions(    category="inverse",    symbol="BTCUSD",))
```

```python
import com.bybit.api.client.domain.*;import com.bybit.api.client.domain.position.*;import com.bybit.api.client.domain.position.request.*;import com.bybit.api.client.service.BybitApiClientFactory;var client = BybitApiClientFactory.newInstance().newAsyncPositionRestClient();var positionListRequest = PositionDataRequest.builder().category(CategoryType.LINEAR).symbol("BTCUSDT").build();client.getPositionInfo(positionListRequest, System.out::println);
```

```javascript
const { RestClientV5 } = require("bybit-api")
const client = new RestClientV5({
  testnet: true,
  key: "YOUR_API_KEY",
  secret: "YOUR_API_SECRET"
})
client
  .getPositionInfo({ category: "inverse", symbol: "BTCUSD" })
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
  "retMsg": "OK",
  "result": {
    "list": [
      {
        "positionIdx": 0,
        "riskId": 1,
        "riskLimitValue": "150",
        "symbol": "BTCUSD",
        "side": "Sell",
        "size": "300",
        "avgPrice": "27464.50441675",
        "positionValue": "0.01092319",
        "tradeMode": 0,
        "positionStatus": "Normal",
        "autoAddMargin": 1,
        "adlRankIndicator": 2,
        "leverage": "10",
        "positionBalance": "0.00139186",
        "markPrice": "28224.50",
        "liqPrice": "",
        "bustPrice": "999999.00",
        "positionMM": "0.0000015",
        "positionMMByMp": "0.0000015",
        "positionIM": "0.00010923",
        "positionIMByMp": "0.00010923",
        "tpslMode": "Full",
        "takeProfit": "0.00",
        "stopLoss": "0.00",
        "trailingStop": "0.00",
        "unrealisedPnl": "-0.00029413",
        "curRealisedPnl": "0.00013123",
        "cumRealisedPnl": "-0.00096902",
        "seq": 5723621632,
        "isReduceOnly": false,
        "mmrSysUpdateTime": "",
        "leverageSysUpdatedTime": "",
        "sessionAvgPrice": "",
        "createdTime": "1676538056258",
        "updatedTime": "1697673600012"
      }
    ],
    "nextPageCursor": "",
    "category": "inverse"
  },
  "retExtInfo": {},
  "time": 1697684980172
}
```
