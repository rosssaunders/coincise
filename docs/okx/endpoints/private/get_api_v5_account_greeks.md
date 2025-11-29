# GET /api/v5/account/greeks

Source:
[https://www.okx.com/docs-v5/en/#trading-account-rest-api-get-greeks](https://www.okx.com/docs-v5/en/#trading-account-rest-api-get-greeks)

### Get Greeks

Retrieve a greeks list of all assets in the account.

#### Rate Limit: 10 requests per 2 seconds

#### Rate limit rule: User ID

#### Permission: Read

#### HTTP Request

`GET /api/v5/account/greeks`

#### Request Parameters

| **Parameters** | **Types** | **Required** | **Description**              |
| -------------- | --------- | ------------ | ---------------------------- |
| ccy            | String    | No           | Single currency, e.g. `BTC`. |

#### Response Parameters

| **Parameters** | **Types** | **Description**                                                                   |
| -------------- | --------- | --------------------------------------------------------------------------------- |
| deltaBS        | String    | delta: Black-Scholes Greeks in dollars                                            |
| deltaPA        | String    | delta: Greeks in coins                                                            |
| gammaBS        | String    | gamma: Black-Scholes Greeks in dollars, only applicable to OPTION                 |
| gammaPA        | String    | gamma: Greeks in coins, only applicable to OPTION                                 |
| thetaBS        | String    | theta: Black-Scholes Greeks in dollars, only applicable to `OPTION`               |
| thetaPA        | String    | theta: Greeks in coins, only applicable to `OPTION`                               |
| vegaBS         | String    | vega: Black-Scholes Greeks in dollars, only applicable to `OPTION`                |
| vegaPA         | String    | vega：Greeks in coins, only applicable to `OPTION`                                |
| ccy            | String    | Currency                                                                          |
| ts             | String    | Time of getting Greeks, Unix timestamp format in milliseconds, e.g. 1597026383085 |
