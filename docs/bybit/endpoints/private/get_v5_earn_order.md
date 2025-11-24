# GET /v5/earn/order

**Source:** [Get Stake/Redeem Order History](https://bybit-exchange.github.io/docs/v5/earn/order-history)

## Authentication

Required (Private Endpoint)

-   Get Stake/Redeem Order History

# Get Stake/Redeem Order History

info

API key needs "Earn" permission

### HTTP Request[​](#http-request "Direct link to heading")

GET `/v5/earn/order`

### Request Parameters[​](#request-parameters "Direct link to heading")

| Parameter | Required | Type | Comments |
| :-- | :-- | :-- | --- |
| category | **true** | string | `FlexibleSaving`,`OnChain`  
**Remarks**: currently, only flexible savings and OnChain is supported |
| orderId | false | string | Order ID.-   For category = `OnChain`, either orderId or orderLinkId is **required**
-   if both are passed, make sure they're matched, otherwise returning empty result |
| orderLinkId | false | string | Order link ID  
**Remarks**: Always return the latest one if order link id is ever reused when querying by orderLinkId only |
| productId | false | string | Product ID |
| startTime | false | integer | The start timestamp (ms).-   1\. If both are not provided, the default is to return data from the last 7 days.
-   2\. If both are provided, the difference between the endTime and startTime must be less than or equal to 7 days. |
| endTime | false | integer | The endTime timestamp (ms) |
| limit | false | integer | Limit for data size per page. Range: \[1, 100\]. Default: 50 |
| cursor | false | string | Cursor, use the returned `nextPageCursor` to query data for the next page. |

### Response Parameters[​](#response-parameters "Direct link to heading")

| Parameter | Type | Comments |
| :-- | :-- | --- |
| nextPageCursor | string | Refer to the `cursor` request parameter |
| list | array | Object |
| \> coin | string | Coin name |
| \> orderValue | string | amount |
| \> orderType | string | `Redeem`, `Stake` |
| \> orderId | string | Order ID |
| \> orderLinkId | string | Order link ID |
| \> status | string | Order status `Success`, `Fail`, `Pending` |
| \> createdAt | string | Order created time, in milliseconds |
| \> productId | string | Product ID |
| \> updatedAt | string | Order updated time, in milliseconds |
| \> swapOrderValue | string | Swap order value. Only for LST Onchain. |
| \> estimateRedeemTime | string | Estimate redeem time, in milliseconds. Only for Onchain |
| \> estimateStakeTime | string | Estimate stake time, in milliseconds. Only for Onchain |

### Request Example[​](#request-example "Direct link to heading")

```bash
GET /v5/earn/order?orderId=9640dc23-df1a-448a-ad24-e1a48028a51f&category=OnChain HTTP/1.1Host: api-testnet.bybit.comX-BAPI-SIGN: XXXXXX-BAPI-API-KEY: xxxxxxxxxxxxxxxxxxX-BAPI-TIMESTAMP: 1739937044221X-BAPI-RECV-WINDOW: 5000Content-Type: application/json
```

```python
from pybit.unified_trading import HTTPsession = HTTP(    testnet=True,    api_key="xxxxxxxxxxxxxxxxxx",    api_secret="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",)print(session.get_stake_or_redemption_history(    category="OnChain",    orderId="9640dc23-df1a-448a-ad24-e1a48028a51f",))
```

```

```

### Response Example[​](#response-example "Direct link to heading")

```json
{
  "retCode": 0,
  "retMsg": "",
  "result": {
    "list": [
      {
        "coin": "USDT",
        "orderValue": "1000",
        "orderType": "Stake",
        "orderId": "ad98d473-4e17-46da-ab30-5563f62a97fa",
        "orderLinkId": "",
        "status": "Success",
        "createdAt": "1759983689000",
        "productId": "428",
        "updatedAt": "1759983689000",
        "swapOrderValue": "",
        "estimateRedeemTime": "",
        "estimateStakeTime": ""
      }
    ],
    "nextPageCursor": ""
  },
  "retExtInfo": {},
  "time": 1759983699446
}
```