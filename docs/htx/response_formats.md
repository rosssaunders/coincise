The response is JSON format.There are four fields in the top level: `status`, `ch`, `ts` and `data`. The first three fields indicate the general status, the business data is is under `data` field.

Below is an example of response:

```
{ "status": "ok", "ch": "market.btcusdt.kline.1day", "ts": 1499223904680, "data": // per API response data in nested JSON object}
```

| Field | Data Type | Description |
| --- | --- | --- |
| status | string | Status of API response |
| ch | string | The data stream. It may be empty as some API doesn't have data stream |
| ts | int | The UTC timestamp when API respond, the unit is millisecond |
| data | object | The body data in response |