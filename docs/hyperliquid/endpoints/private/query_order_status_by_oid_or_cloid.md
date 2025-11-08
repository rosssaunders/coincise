# Query order status by oid or cloid

**Source:** https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/info-endpoint

`POST` `https://api.hyperliquid.xyz/info`

#### 

[](#request-body-6)

Request Body

Name

Type

Description

user\*

String

Address in 42-character hexadecimal format; e.g. 0x0000000000000000000000000000000000000000.

type\*

String

"orderStatus"

oid\*

uint64 or string

Either u64 representing the order id or 16-byte hex string representing the client order id

The <status> string returned has the following possible values:

Order status

Explanation

open

Placed successfully

filled

Filled

canceled

Canceled by user

triggered

Trigger order triggered

rejected

Rejected at time of placement

marginCanceled

Canceled because insufficient margin to fill

vaultWithdrawalCanceled

Vaults only. Canceled due to a user's withdrawal from vault

openInterestCapCanceled

Canceled due to order being too aggressive when open interest was at cap

selfTradeCanceled

Canceled due to self-trade prevention

reduceOnlyCanceled

Canceled reduced-only order that does not reduce position

siblingFilledCanceled

TP/SL only. Canceled due to sibling ordering being filled

delistedCanceled

Canceled due to asset delisting

liquidatedCanceled

Canceled due to liquidation

scheduledCancel

API only. Canceled due to exceeding scheduled cancel deadline (dead man's switch)

tickRejected

Rejected due to invalid tick price

minTradeNtlRejected

Rejected due to order notional below minimum

perpMarginRejected

Rejected due to insufficient margin

reduceOnlyRejected

Rejected due to reduce only

badAloPxRejected

Rejected due to post-only immediate match

iocCancelRejected

Rejected due to IOC not able to match

badTriggerPxRejected

Rejected due to invalid TP/SL price

marketOrderNoLiquidityRejected

Rejected due to lack of liquidity for market order

positionIncreaseAtOpenInterestCapRejected

Rejected due to open interest cap

positionFlipAtOpenInterestCapRejected

Rejected due to open interest cap

tooAggressiveAtOpenInterestCapRejected

Rejected due to price too aggressive at open interest cap

openInterestIncreaseRejected

Rejected due to open interest cap

insufficientSpotBalanceRejected

Rejected due to insufficient spot balance

oracleRejected

Rejected due to price too far from oracle

perpMaxPositionRejected

Rejected due to exceeding margin tier limit at current leverage

200: OK A successful response

200: OK Missing Order

Copy

```
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

Copy

```
{
  "status": "unknownOid"
}
```
