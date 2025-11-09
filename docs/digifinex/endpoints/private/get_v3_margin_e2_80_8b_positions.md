# GET /v3/margin%E2%80%8B/positions

**Title:** Margin positions

**Source:** [Margin positions](https://docs.digifinex.com/en-ww/spot/v3/rest.html#margin-positions)

## Authentication

Required (Private Endpoint)

---

## Margin positions

### HTTP Request

-   GET `https://openapi.digifinex.com/v3/margin​/positions`

### Request Parameters

| Field | Request Type | Mandatory | Description |
| --- | --- | --- | --- |
| symbol | str | false | Symbol Name |

> Response:

```

{
  "code": 0,
  "margin": "20",
  "margin_rate": "1",
  "unrealized_pnl": "55",
  "positions": [
    {
      "symbol": "BTC_USDT",
      "leverage_ratio": "3.0",
      "side": "long",
      "amount": 3.0,
      "entry_price": 40,
      "unrealized_pnl": 55,
      "liquidation_price": 25.999999999999996,
      "liquidation_rate": 0.3
    }
  ]
}

```

### Response Content

| Field | Mandatory | Request Type | Description |
| --- | --- | --- | --- |
| margin | true | str | Margin |
| margin\_rate | true | str | Margin Rate |
| unrealized\_pnl | true | str | Unrealized Profit and Loss |
| positions | true | object | Positions |
| symbol | true | string | Symbol Name |
| leverage\_ratio | true | float | Leverage Ratio |
| side | true | string | long, short, empty for none position |
| amount | true | float | Amount in position |
| entry\_price | true | float | Entrance price of position |
| unrealized\_pnl | true | float | Unrealized Profit and Loss |
| liquidation\_price | true | float | Estimated liquidation price |
| liquidation\_rate | true | float | liquidation leverage ratio |
| code | true | int | Status |