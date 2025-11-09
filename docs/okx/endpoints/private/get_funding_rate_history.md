# GET funding rate history

Source:
[https://www.okx.com/docs-v5/en/#public-data-rest-api-get-funding-rate-history](https://www.okx.com/docs-v5/en/#public-data-rest-api-get-funding-rate-history)

### Get funding rate history

Retrieve funding rate history. This endpoint can return data up to three months.

#### Rate Limit: 10 requests per 2 seconds

#### Rate limit rule: IP + Instrument ID

#### HTTP Request

`GET /api/v5/public/funding-rate-history`

#### Request Parameters

| Parameter                 | Type   | Required | Description                                                                   |
| ------------------------- | ------ | -------- | ----------------------------------------------------------------------------- |
| instId                    | String | Yes      | Instrument ID, e.g. `BTC-USD-SWAP`                                            |
| only applicable to `SWAP` |
| before                    | String | No       | Pagination of data to return records newer than the requested `fundingTime`   |
| after                     | String | No       | Pagination of data to return records earlier than the requested `fundingTime` |
| limit                     | String | No       | Number of results per request. The maximum is `400`; The default is `400`     |

#### Response Parameters

| **Parameter** | **Type** | **Description**                    |
| ------------- | -------- | ---------------------------------- |
| instType      | String   | Instrument type                    |
| `SWAP`        |
| instId        | String   | Instrument ID, e.g. `BTC-USD-SWAP` |
| formulaType   | String   | Formula type                       |

`noRate`: old funding rate formula  
`withRate`: new funding rate formula | | fundingRate | String | Predicted
funding rate | | realizedRate | String | Actual funding rate | | fundingTime |
String | Settlement time, Unix timestamp format in milliseconds, e.g.
`1597026383085` | | method | String | Funding rate mechanism  
`current_period`  
`next_period` |

For some altcoins perpetual swaps with significant fluctuations in funding
rates, OKX will closely monitor market changes. When necessary, the funding rate
collection frequency, currently set at 8 hours, may be adjusted to higher
frequencies such as 6 hours, 4 hours, 2 hours, or 1 hour. Thus, users should
focus on the difference between \`fundingTime\` and \`nextFundingTime\` fields
to determine the funding fee interval of a contract.
