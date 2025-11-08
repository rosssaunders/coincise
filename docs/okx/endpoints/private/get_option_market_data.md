# GET option market data

Source: [https://www.okx.com/docs-v5/en/#public-data-rest-api-get-option-market-data](https://www.okx.com/docs-v5/en/#public-data-rest-api-get-option-market-data)

### Get option market data

Retrieve option market data.

#### Rate Limit: 20 requests per 2 seconds

#### Rate limit rule: IP + instFamily

#### HTTP Request

`GET /api/v5/public/opt-summary`

#### Request Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| instFamily | String | Yes | Instrument family, only applicable to `OPTION`  
 |
| expTime | String | No | Contract expiry date, the format is "YYMMDD", e.g. "200527" |

#### Response Parameters

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
| instType | String | Instrument type  
`OPTION` |
| instId | String | Instrument ID, e.g. `BTC-USD-200103-5500-C` |
| uly | String | Underlying |
| delta | String | Sensitivity of option price to `uly` price |
| gamma | String | The delta is sensitivity to `uly` price |
| vega | String | Sensitivity of option price to implied volatility |
| theta | String | Sensitivity of option price to remaining maturity |
| deltaBS | String | Sensitivity of option price to `uly` price in BS mode |
| gammaBS | String | The delta is sensitivity to `uly` price in BS mode |
| vegaBS | String | Sensitivity of option price to implied volatility in BS mode |
| thetaBS | String | Sensitivity of option price to remaining maturity in BS mode |
| lever | String | Leverage |
| markVol | String | Mark volatility |
| bidVol | String | Bid volatility |
| askVol | String | Ask volatility |
| realVol | String | Realized volatility (not currently used) |
| volLv | String | Implied volatility of at-the-money options |
| fwdPx | String | Forward price |
| ts | String | Data update time, Unix timestamp format in milliseconds, e.g. `1597026383085` |
