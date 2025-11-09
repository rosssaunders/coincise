## Query relevant filters (USER_DATA)​

```
GET /api/v3/myFilters
```

Retrieves the list of [filters](/docs/binance-spot-api-docs/filters) relevant to
an account on a given symbol. This is the only endpoint that shows if an account
has [`MAX_ASSET`](/docs/binance-spot-api-docs/filters#max_asset) filters applied
to it.

**Weight:** 40

**Parameters:**

| Name                                                                                                     | Type    | Mandatory | Description                               |
| -------------------------------------------------------------------------------------------------------- | ------- | --------- | ----------------------------------------- |
| symbol                                                                                                   | STRING  | YES       |                                           |
| recvWindow                                                                                               | DECIMAL | NO        | The value cannot be greater than `60000`. |
| Supports up to three decimal places of precision (e.g., 6000.346) so that microseconds may be specified. |
| timestamp                                                                                                | LONG    | YES       |                                           |

**Data Source:** Memory

**Response:**

```
{  "exchangeFilters": [    {      "filterType": "EXCHANGE_MAX_NUM_ORDERS",      "maxNumOrders": 1000    }  ],  "symbolFilters": [    {      "filterType": "MAX_NUM_ORDER_LISTS",      "maxNumOrderLists": 20    }  ],  "assetFilters": [    {      "filterType": "MAX_ASSET",      "asset": "JPY",      "limit": "1000000.00000000"    }  ]}
```

> Source:
> [https://developers.binance.com/docs/binance-spot-api-docs/rest-api/account-endpoints](https://developers.binance.com/docs/binance-spot-api-docs/rest-api/account-endpoints)
