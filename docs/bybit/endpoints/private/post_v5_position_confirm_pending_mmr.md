# POST /v5/position/confirm-pending-mmr

**Source:**
[Confirm New Risk Limit](https://bybit-exchange.github.io/docs/v5/position/confirm-mmr)

## Authentication

Required (Private Endpoint)

- [](/docs/)
- Position
- Confirm New Risk Limit

On this page

# Confirm New Risk Limit

It is only applicable when the user is marked as only reducing positions (please
see the isReduceOnly field in the [Get Position Info](/docs/v5/position)
interface). After the user actively adjusts the risk level, this interface is
called to try to calculate the adjusted risk level, and if it passes
(retCode=0), the system will remove the position reduceOnly mark. You are
recommended to call [Get Position Info](/docs/v5/position) to check
`isReduceOnly` field.

### HTTP Request[​](#http-request "Direct link to heading")

POST `/v5/position/confirm-pending-mmr`

### Request Parameters[​](#request-parameters "Direct link to heading")

| Parameter                          | Required | Type   | Comments     |
| :--------------------------------- | :------- | :----- | ------------ |
| [category](/docs/v5/enum#category) | **true** | string | Product type |

- Unified account: `linear`, `inverse`
- Classic account: `linear`, `inverse`

| | symbol | **true** | string | Symbol name |

### Response Parameters[​](#response-parameters "Direct link to heading")

None

### Request Example[​](#request-example "Direct link to heading")

- HTTP
- Python
- Java
- Node.js

```
POST /v5/position/confirm-pending-mmr HTTP/1.1Host: api-testnet.bybit.comX-BAPI-SIGN: XXXXXXX-BAPI-API-KEY: xxxxxxxxxxxxxxxxxxX-BAPI-TIMESTAMP: 1698051123673X-BAPI-RECV-WINDOW: 5000Content-Type: application/jsonContent-Length: 53{    "category": "linear",    "symbol": "BTCUSDT"}
```

```

```

```
import com.bybit.api.client.domain.*;import com.bybit.api.client.domain.position.*;import com.bybit.api.client.domain.position.request.*;import com.bybit.api.client.service.BybitApiClientFactory;var client = BybitApiClientFactory.newInstance().newAsyncPositionRestClient();var confirmNewRiskRequest = PositionDataRequest.builder().category(CategoryType.LINEAR).symbol("BTCUSDT").build();client.confirmPositionRiskLimit(confirmNewRiskRequest, System.out::println);
```

```

```

### Response Example[​](#response-example "Direct link to heading")

```
{    "retCode": 0,    "retMsg": "OK",    "result": {},    "retExtInfo": {},    "time": 1698051124588}
```

[

Previous

Get Move Position History

](/docs/v5/position/move-position-history)[

Next

Set TP/SL Mode (deprecated)

](/docs/v5/position/tpsl-mode)

- [HTTP Request](#http-request)
- [Request Parameters](#request-parameters)
- [Response Parameters](#response-parameters)
- [Request Example](#request-example)
- [Response Example](#response-example)
