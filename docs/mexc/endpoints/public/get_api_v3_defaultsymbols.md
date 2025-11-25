# GET /api/v3/defaultSymbols

**Source:**
https://www.mexc.com/api-docs/spot-v3/market-data-endpoints#api-default-symbol

> Request

```bash
GET /api/v3/defaultSymbols
```

> Response

```json
{
  "code": 200,
  "data": ["GENE1USDT", "SNTUSDT", "SQUAWKUSDT", "HEGICUSDT", "GUMUSDT"],
  "msg": null
}
```

- **GET** `/api/v3/defaultSymbols`

**Weight(IP):** 1

**Request**

NONE

**Response**

| Name   | Type   | Description |
| ------ | ------ | ----------- |
| symbol | string | symbol      |
