# GET funding rate

Source: [https://www.okx.com/docs-v5/en/#public-data-rest-api-get-funding-rate](https://www.okx.com/docs-v5/en/#public-data-rest-api-get-funding-rate)

### Get funding rate

Retrieve funding rate.

#### Rate Limit: 10 requests per 2 seconds

#### Rate limit rule: IP + Instrument ID

#### HTTP Request

`GET /api/v5/public/funding-rate`

#### Request Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| instId | String | Yes | Instrument ID, e.g. `BTC-USD-SWAP` or `ANY` to return the funding rate info of all swap symbols  
only applicable to `SWAP` |

#### Response Parameters

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
| instType | String | Instrument type `SWAP` |
| instId | String | Instrument ID, e.g. `BTC-USD-SWAP` or `ANY` |
| method | String | Funding rate mechanism  
`current_period`~  
`next_period`~(no longer supported) |
| formulaType | String | Formula type  
`noRate`: old funding rate formula  
`withRate`: new funding rate formula |
| fundingRate | String | Current funding rate |
| nextFundingRate | String | ~Forecasted funding rate for the next period  
The nextFundingRate will be "" if the method is `current_period`~(no longer supported) |
| fundingTime | String | Settlement time, Unix timestamp format in milliseconds, e.g. `1597026383085` |
| nextFundingTime | String | Forecasted funding time for the next period , Unix timestamp format in milliseconds, e.g. `1597026383085` |
| minFundingRate | String | The lower limit of the funding rate |
| maxFundingRate | String | The upper limit of the funding rate |
| interestRate | String | Interest rate |
| impactValue | String | Depth weighted amount (in the unit of quote currency) |
| settState | String | Settlement state of funding rate  
`processing`  
`settled` |
| settFundingRate | String | If settState = `processing`, it is the funding rate that is being used for current settlement cycle.  
If settState = `settled`, it is the funding rate that is being used for previous settlement cycle |
| premium | String | Premium index  
formula: \[Max (0, Impact bid price – Index price) – Max (0, Index price – Impact ask price)\] / Index price |
| ts | String | Data return time, Unix timestamp format in milliseconds, e.g. `1597026383085` |

For some altcoins perpetual swaps with significant fluctuations in funding rates, OKX will closely monitor market changes. When necessary, the funding rate collection frequency, currently set at 8 hours, may be adjusted to higher frequencies such as 6 hours, 4 hours, 2 hours, or 1 hour. Thus, users should focus on the difference between \`fundingTime\` and \`nextFundingTime\` fields to determine the funding fee interval of a contract.
