# POST public/get-announcements

**Source:**
[public/get-announcements](https://exchange-docs.crypto.com/exchange/v1/rest-ws/index.html#public-get-announcements)

## Authentication

Not Required (Public Endpoint)

## public/get-announcements

> Request Sample

```

https://api.crypto.com/v1/public/get-announcements?category=system&product_type=Spot

```

> Response Sample

```
{
  "id": 0,
  "method": "public/get-announcements",
  "code": 0,
  "result": {
    "data": [
      {
        "id": "67ea25c534909545bfc81232",
        "category": "system",
        "product_type": "Spot,Margin,Derivative,TradingArena,VIPProgramme,MMProgramme,Supercharger,TradingBot,Documents,DefiStaking,Staking,LiquidStaking,Affiliate,Referral,CROLockup,AccountManagement,OtcConvert,Transfer,ZeroFeeToken",
        "announced_at": 1743379200000,
        "title": "No Otc, lending, broker, affiliate_dashboard",
        "content": "<p>test system</p>",
        "instrument_name": null,
        "impacted_params": {
          "spot_trading_impacted": "PARTIAL",
          "derivative_trading_impacted": "BAU",
          "margin_trading_impacted": "BAU",
          "otc_trading_impacted": "PARTIAL",
          "convert_impacted": "PARTIAL",
          "staking_impacted": "PARTIAL",
          "trading_bot_impacted": "PARTIAL",
          "crypto_wallet_impacted": "PARTIAL",
          "fiat_wallet_impacted": "PARTIAL",
          "login_impacted": "PARTIAL"
        },
        "start_time": 1743426900000,
        "end_time": 1743434100000
      }
    ]
  }
}
```

Production endpoint: https://api.crypto.com/v1/public/get-announcements

This api fetches all announcements in [Crypto.com](https://crypto.com/) Exchange

### Request Params

| Name         | Type   | Required | Description                                                                   |
| ------------ | ------ | -------- | ----------------------------------------------------------------------------- |
| category     | string | N        | filter by category: list, delist, event, product, system                      |
| product_type | string | N        | filter by product type. e.g. Spot, Derivative, OTC, Staking, TradingArena etc |

### Response Attributes

| Name            | Type   | Description                        |
| --------------- | ------ | ---------------------------------- |
| id              | string | announcement id                    |
| category        | string | type of announcement               |
| product_type    | string | type of product                    |
| announced_at    | string | announced timestamps               |
| title           | string | title of announcement              |
| content         | string | content of announcement            |
| instrument_name | string | instrument name                    |
| impacted_params | map    | impacted params                    |
| start_time      | long   | announcements start time timestamp |
| end_time        | long   | announcements end time timestamp   |

### Applies To

REST

### REST Method

GET
