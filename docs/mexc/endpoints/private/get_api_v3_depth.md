# GET /api/v3/depth

**Source:** https://www.mexc.com/api-docs/spot-v3/market-data-endpoints#order-book

> Response

```json
{  "lastUpdateId": 1112416,  "bids": [      ["15.00000", "49999.00000"]  ],  "asks": [    ["14.0000", "1.0000"]  ]}
```

-   **GET** `/api/v3/depth`

**Weight(IP):** 1

Parameter:

| Name | Type | Mandatory | Description | Scope |
| --- | --- | --- | --- | --- |
| symbol | string | YES | Symbol |  |
| limit | integer | NO | Returen number | default 100; max 5000 |

Response:

| Name | Type | Description |
| --- | --- | --- |
| lastUpdateId | long | Last Update Id |
| bids | list | Bid \[Price, Quantity \] |
| asks | list | Ask \[Price, Quantity \] |
