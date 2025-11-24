# POST /info

**Source:**
https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/info-endpoint

`POST` `https://api.hyperliquid.xyz/info`

Request Body

| Name       | Type                 | Description                                                                                      |
| ---------- | -------------------- | ------------------------------------------------------------------------------------------------ |
| user\*<br> | String<br>           | Address in 42-character hexadecimal format; e.g. 0x0000000000000000000000000000000000000000.<br> |
| type\*<br> | String<br>           | "orderStatus"<br>                                                                                |
| oid\*<br>  | uint64 or string<br> | Either u64 representing the order id or 16-byte hex string representing the client order id<br>  |

The <status> string returned has the following possible values:

| Order status                                  | Explanation                                                                           |
| --------------------------------------------- | ------------------------------------------------------------------------------------- |
| open<br>                                      | Placed successfully<br>                                                               |
| filled<br>                                    | Filled<br>                                                                            |
| canceled<br>                                  | Canceled by user<br>                                                                  |
| triggered<br>                                 | Trigger order triggered<br>                                                           |
| rejected<br>                                  | Rejected at time of placement<br>                                                     |
| marginCanceled<br>                            | Canceled because insufficient margin to fill<br>                                      |
| vaultWithdrawalCanceled<br>                   | Vaults only. Canceled due to a user's withdrawal from vault<br>                       |
| openInterestCapCanceled<br>                   | Canceled due to order being too aggressive when open interest was at cap<br>          |
| selfTradeCanceled<br>                         | Canceled due to self-trade prevention<br>                                             |
| reduceOnlyCanceled<br>                        | Canceled reduced-only order that does not reduce position<br>                         |
| siblingFilledCanceled<br>                     | TP/SL only. Canceled due to sibling ordering being filled<br>                         |
| delistedCanceled<br>                          | Canceled due to asset delisting<br>                                                   |
| liquidatedCanceled<br>                        | Canceled due to liquidation<br>                                                       |
| scheduledCancel<br>                           | API only. Canceled due to exceeding scheduled cancel deadline (dead man's switch)<br> |
| tickRejected<br>                              | Rejected due to invalid tick price<br>                                                |
| minTradeNtlRejected<br>                       | Rejected due to order notional below minimum<br>                                      |
| perpMarginRejected<br>                        | Rejected due to insufficient margin<br>                                               |
| reduceOnlyRejected<br>                        | Rejected due to reduce only<br>                                                       |
| badAloPxRejected<br>                          | Rejected due to post-only immediate match<br>                                         |
| iocCancelRejected<br>                         | Rejected due to IOC not able to match<br>                                             |
| badTriggerPxRejected<br>                      | Rejected due to invalid TP/SL price<br>                                               |
| marketOrderNoLiquidityRejected<br>            | Rejected due to lack of liquidity for market order<br>                                |
| positionIncreaseAtOpenInterestCapRejected<br> | Rejected due to open interest cap<br>                                                 |
| positionFlipAtOpenInterestCapRejected<br>     | Rejected due to open interest cap<br>                                                 |
| tooAggressiveAtOpenInterestCapRejected<br>    | Rejected due to price too aggressive at open interest cap<br>                         |
| openInterestIncreaseRejected<br>              | Rejected due to open interest cap<br>                                                 |
| insufficientSpotBalanceRejected<br>           | Rejected due to insufficient spot balance<br>                                         |
| oracleRejected<br>                            | Rejected due to price too far from oracle<br>                                         |
| perpMaxPositionRejected<br>                   | Rejected due to exceeding margin tier limit at current leverage<br>                   |

200: OK A successful response

200: OK Missing Order

```json
{
  "status": "order",
  "order": {
    "order": {
      "coin": "ETH",
      "side": "A",
      "limitPx": "2412.7",
      "sz": "0.0",
      "oid": 1,
      "timestamp": 1724361546645,
      "triggerCondition": "N/A",
      "isTrigger": false,
      "triggerPx": "0.0",
      "children": [],
      "isPositionTpsl": false,
      "reduceOnly": true,
      "orderType": "Market",
      "origSz": "0.0076",
      "tif": "FrontendMarket",
      "cloid": null
    },
    "status": <status>,
    "statusTimestamp": 1724361546645
  }
}
```

```json
{
  "status": "unknownOid"
}
```
