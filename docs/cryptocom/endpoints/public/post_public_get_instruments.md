# POST public/get-instruments

**Source:** [public/get-instruments](https://exchange-docs.crypto.com/exchange/v1/rest-ws/index.html#public-get-instruments)

## Authentication

Not Required (Public Endpoint)

## public/get-instruments

> Request Sample

N/A

> Response Sample

```
{
  "id": 1,
  "method":"public/get-instruments",
  "code": 0,
  "result":{
    "data":[
      {
        "symbol":"BTCUSD-PERP",
        "inst_type":"PERPETUAL_SWAP",
        "display_name":"BTCUSD Perpetual",
        "base_ccy":"BTC",
        "quote_ccy":"USD",
        "quote_decimals":2,
        "quantity_decimals":4,
        "price_tick_size":"0.5",
        "qty_tick_size":"0.0001",
        "max_leverage":"50",
        "tradable":true,
        "expiry_timestamp_ms":1624012801123,
        "underlying_symbol": "BTCUSD-INDEX"
      }
    ]
  }
}
```

Provides information on all supported instruments (e.g. BTCUSD-PERP).

### Applies To

REST

### REST Method

GET

### Response Attributes

An array, consisting of:

| Name | Type | Description |
| --- | --- | --- |
| symbol | string | e.g. BTCUSD-PERP |
| inst\_type | string | e.g. PERPETUAL\_SWAP |
| display\_name | string | e.g. BTCUSD Perpetual |
| base\_ccy | string | Base currency, e.g. BTC |
| quote\_ccy | string | Quote currency, e.g. USD |
| quote\_decimals | number | Minimum decimal place for price field |
| quantity\_decimals | number | Minimum decimal place for qty field |
| price\_tick\_size | string | Minimum price tick size |
| qty\_tick\_size | string | Minimum trading quantity / tick size |
| max\_leverage | string | Max leverage of the product |
| tradable | boolean | True or false |
| expiry\_timestamp\_ms | number | Expiry timestamp in millisecond |
| underlying\_symbol | string | Underlying symbol |