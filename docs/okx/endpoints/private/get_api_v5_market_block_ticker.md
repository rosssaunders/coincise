# GET /api/v5/market/block-ticker

Source:
[https://www.okx.com/docs-v5/en/#block-trading-rest-api-get-block-ticker](https://www.okx.com/docs-v5/en/#block-trading-rest-api-get-block-ticker)

### Get block ticker

Retrieve the latest block trading volume in the last 24 hours.

#### Rate Limit: 20 requests per 2 seconds

#### Rate limit rule: IP

#### HTTP Request

`GET /api/v5/market/block-ticker`

#### Request Parameters

| Parameter | Type   | Required | Description                        |
| --------- | ------ | -------- | ---------------------------------- |
| instId    | String | Yes      | Instrument ID, e.g. `BTC-USD-SWAP` |

#### Response Parameters

| **Parameter** | **Type** | **Description**                                |
| ------------- | -------- | ---------------------------------------------- |
| instId        | String   | Instrument ID                                  |
| instType      | String   | Instrument type                                |
| volCcy24h     | String   | 24h trading volume, with a unit of `currency`. |

If it is a `derivatives` contract, the value is the number of base currency.  
If it is `SPOT`/`MARGIN`, the value is the quantity in quote currency. | |
vol24h | String | 24h trading volume, with a unit of `contract`.  
If it is a `derivatives` contract, the value is the number of contracts.  
If it is `SPOT`/`MARGIN`, the value is the quantity in base currency. | | ts |
String | Block ticker data generation time, Unix timestamp format in
milliseconds, e.g. `1597026383085` |
