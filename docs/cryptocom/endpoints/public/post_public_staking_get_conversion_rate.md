# POST public/staking/get-conversion-rate

**Source:** [public/staking/get-conversion-rate](https://exchange-docs.crypto.com/exchange/v1/rest-ws/index.html#public-staking-get-conversion-rate)

## Authentication

Not Required (Public Endpoint)

## public/staking/get-conversion-rate

> Request Sample

```
{
  "id": 1,
  "method": "public/staking/get-conversion-rate",
  "params": {
    "instrument_name": "CDCETH"
  }
}
```

> Response Sample

```
{
  "id": 1,
  "method": "public/staking/get-conversion-rate",
  "code": 0,
  "result": {
    "instrument_name": "CDCETH",
    "conversion_rate": "1.0203"
  }
}
```

Get conversion rate between staked token and liquid staking token

### Request Params

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| instrument\_name | string | Y | liquid staking token instrument name:  
\- CDCETH |

### Applies To

REST

### REST Method

POST

### Response Attributes

| Name | Type | Description |
| --- | --- | --- |
| instrument\_name | string | CDCETH |
| conversion\_rate | string | conversion rate between staked token (ETH.staked) and liquid staking token (CDCETH) |