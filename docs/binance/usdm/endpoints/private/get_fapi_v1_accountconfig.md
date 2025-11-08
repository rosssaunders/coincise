# Futures Account Configuration(USER_DATA)

### API Description

Query account configuration

### HTTP Request

GET `/fapi/v1/accountConfig`

### Request Weight

**5**

### Request Parameters

| Name       | Type | Mandatory | Description |
| ---------- | ---- | --------- | ----------- |
| recvWindow | LONG | NO        |             |
| timestamp  | LONG | YES       |             |

### Response Example

```json
{
  "feeTier": 0, // account commission tier
  "canTrade": true, // if can trade
  "canDeposit": true, // if can transfer in asset
  "canWithdraw": true, // if can transfer out asset
  "dualSidePosition": true,
  "updateTime": 0, // reserved property, please ignore
  "multiAssetsMargin": false,
  "tradeGroupId": -1
}
```

> Source:
> [https://developers.binance.com/docs/derivatives/usds-margined-futures/account/rest-api/Account-Config](https://developers.binance.com/docs/derivatives/usds-margined-futures/account/rest-api/Account-Config)
