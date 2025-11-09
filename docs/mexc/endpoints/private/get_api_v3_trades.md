# Recent Trades List

> Response

```
[
  {
    "id": null,
    "price": "23",
    "qty": "0.478468",
    "quoteQty": "11.004764",
    "time": 1640830579240,
    "isBuyerMaker": true,
    "isBestMatch": true
  }
]
```

- **GET** `/api/v3/trades`

**Weight(IP):** 5

Parameter:

| Name   | Type    | Mandatory | Description | Scope                 |
| ------ | ------- | --------- | ----------- | --------------------- |
| symbol | string  | YES       |             |                       |
| limit  | integer | NO        |             | Default 500; max 1000 |

Response:

| Name         | Description                         |
| ------------ | ----------------------------------- |
| id           | Trade id                            |
| price        | Price                               |
| qty          | Number                              |
| quoteQty     | Trade total                         |
| time         | Trade time                          |
| isBuyerMaker | Was the buyer the maker?            |
| isBestMatch  | Was the trade the best price match? |

---

**Source:** https://mexcdevelop.github.io/apidocs/spot_v3_en#recent-trades-list
