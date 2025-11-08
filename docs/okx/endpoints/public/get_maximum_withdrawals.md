# GET maximum withdrawals

Source: [https://www.okx.com/docs-v5/en/#trading-account-rest-api-get-maximum-withdrawals](https://www.okx.com/docs-v5/en/#trading-account-rest-api-get-maximum-withdrawals)

### Get maximum withdrawals

Retrieve the maximum transferable amount from trading account to funding account. If no currency is specified, the transferable amount of all owned currencies will be returned.

#### Rate Limit: 20 requests per 2 seconds

#### Rate limit rule: User ID

#### Permission: Read

#### HTTP Request

`GET /api/v5/account/max-withdrawal`

#### Request Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| ccy | String | No | Single currency or multiple currencies (no more than 20) separated with comma, e.g. `BTC` or `BTC,ETH`. |

#### Response Parameters

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
| ccy | String | Currency |
| maxWd | String | Max withdrawal (excluding borrowed assets under `Spot mode`/`Multi-currency margin`/`Portfolio margin`) |
| maxWdEx | String | Max withdrawal (including borrowed assets under `Spot mode`/`Multi-currency margin`/`Portfolio margin`) |
| spotOffsetMaxWd | String | Max withdrawal under Spot-Derivatives risk offset mode (excluding borrowed assets under `Portfolio margin`)  
Applicable to `Portfolio margin` |
| spotOffsetMaxWdEx | String | Max withdrawal under Spot-Derivatives risk offset mode (including borrowed assets under `Portfolio margin`)  
Applicable to `Portfolio margin` |
