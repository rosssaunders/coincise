# GET /api/v3/avgPrice

**Source:**
https://www.mexc.com/api-docs/spot-v3/market-data-endpoints#current-average-price

> Response

```json
{ "mins": 5, "price": "9.35751834" }
```

- **GET** `/api/v3/avgPrice`

**Weight(IP):** 1

Parameters:

| Name   | Type   | Mandatory | Description |
| ------ | ------ | --------- | ----------- |
| symbol | string | YES       |             |

Response:

| Name  | Description              |
| ----- | ------------------------ |
| mins  | Average price time frame |
| price | Price                    |
