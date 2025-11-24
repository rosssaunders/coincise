# Move Position

You can move positions between sub-master, master-sub, or sub-sub UIDs when necessary

tip

[UTA2.0](/docs/v5/acct-mode#uta-20) inverse contract move position is supported now

info

-   UIDs must be the same master-sub account relationship
-   The trades generated from move-position endpoint will not be displayed in the Recent Trade (Rest API & Websocket)

-   `fromUid` and `toUid` both should be Unified trading accounts, and they need to be one-way mode when moving the positions
-   Please note that once executed, you will get execType=`MovePosition` entry from [Get Trade History](/docs/v5/order/execution), [Get Closed Pnl](/docs/v5/position/close-pnl), and stream from [Execution](/docs/v5/websocket/private/execution).

### HTTP Request[​](#http-request "Direct link to heading")

POST `/v5/position/move-positions`

### Request Parameters[​](#request-parameters "Direct link to heading")

| Parameter | Required | Type | Comments |
| :-- | :-- | :-- | --- |
| fromUid | **true** | string | From UID

-   Must be in one-way mode for Futures

 |
| toUid | **true** | string | To UID

-   Must be in one-way mode for Futures

 |
| list | **true** | array | Object. Up to 25 legs per request |
| \> [category](/docs/v5/enum#category) | **true** | string | Product type

-   [UTA2.0](/docs/v5/acct-mode#uta-20):`linear`, `spot`, `option`,`inverse`
-   [UTA1.0](/docs/v5/acct-mode#uta-10): `linear`, `spot`, `option`

 |
| \> symbol | **true** | string | Symbol name, like `BTCUSDT`, uppercase only |
| \> price | **true** | string | Trade price

-   `linear`&`inverse`: the price needs to be between \[95% of mark price, 105% of mark price\]
-   `spot`&`option`: the price needs to follow the price rule from [Instruments Info](/docs/v5/market/instrument)

 |
| \> side | **true** | string | Trading side of `fromUid`

-   For example, `fromUid` has a long position, when side=`Sell`, then once executed, the position of `fromUid` will be reduced or open a short position depending on `qty` input

 |
| \> qty | **true** | string | Executed qty

-   The value must satisfy the qty rule from [Instruments Info](/docs/v5/market/instrument), in particular, category=`linear` is able to input `maxOrderQty` \* 5

 |

### Response Parameters[​](#response-parameters "Direct link to heading")

| Parameter | Type | Comments |
| :-- | :-- | --- |
| retCode | integer | Result code. `0` means request is successfully accepted |
| retMsg | string | Result message |
| result | map | Object |
| \> blockTradeId | string | Block trade ID |
| \> status | string | Status. `Processing`, `Rejected` |
| \> rejectParty | string | 
-   `""` means initial validation is passed, please check the order status via [Get Move Position History](/docs/v5/position/move-position-history)
-   `Taker`, `Maker` when status=`Rejected`
-   `bybit` means error is occurred on the Bybit side

 |

### Request Example[​](#request-example "Direct link to heading")

```bash
POST /v5/position/move-positions HTTP/1.1Host: api-testnet.bybit.comX-BAPI-SIGN: XXXXXXX-BAPI-API-KEY: xxxxxxxxxxxxxxxxxxX-BAPI-TIMESTAMP: 1697447928051X-BAPI-RECV-WINDOW: 5000Content-Type: application/json{    "fromUid": "100307601",    "toUid": "592324",    "list": [        {            "category": "spot",            "symbol": "BTCUSDT",            "price": "100",            "side": "Sell",            "qty": "0.01"        }    ]}
```

```

```

```python
import com.bybit.api.client.domain.*;import com.bybit.api.client.domain.position.*;import com.bybit.api.client.domain.position.request.*;import com.bybit.api.client.service.BybitApiClientFactory;var client = BybitApiClientFactory.newInstance().newAsyncPositionRestClient();var movePositionsRequest = Arrays.asList(MovePositionDetailsRequest.builder().category(CategoryType.SPOT.getCategoryTypeId()).symbol("BTCUSDT").side(Side.SELL.getTransactionSide()).price("100").qty("0.01").build(),                MovePositionDetailsRequest.builder().category(CategoryType.SPOT.getCategoryTypeId()).symbol("ETHUSDT").side(Side.SELL.getTransactionSide()).price("100").qty("0.01").build());var batchMovePositionsRequest = BatchMovePositionRequest.builder().fromUid("123456").toUid("456789").list(movePositionsRequest).build();System.out.println(client.batchMovePositions(batchMovePositionsRequest));
```

```

```

### Response Example[​](#response-example "Direct link to heading")

```json
{
  "retCode": 0,
  "retMsg": "OK",
  "result": {
    "blockTradeId": "e9bb926c95f54cf1ba3e315a58b8597b",
    "status": "Processing",
    "rejectParty": ""
  }
}
```