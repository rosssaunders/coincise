# GET /api/v5/asset/non-tradable-assets

Source:
[https://www.okx.com/docs-v5/en/#funding-account-rest-api-get-non-tradable-assets](https://www.okx.com/docs-v5/en/#funding-account-rest-api-get-non-tradable-assets)

### Get non-tradable assets

Retrieve the funding account balances of all the assets and the amount that is
available or on hold.

#### Rate Limit: 6 requests per second

#### Rate limit rule: User ID

#### Permission: Read

#### HTTP Request

`GET /api/v5/asset/non-tradable-assets`

#### Request Parameters

| **Parameters** | **Types** | **Required** | **Description**                                                                                         |
| -------------- | --------- | ------------ | ------------------------------------------------------------------------------------------------------- |
| ccy            | String    | No           | Single currency or multiple currencies (no more than 20) separated with comma, e.g. `BTC` or `BTC,ETH`. |

#### Response Parameters

| Parameter                                                                                                                                                        | Type    | Description                                                                   |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | ----------------------------------------------------------------------------- |
| ccy                                                                                                                                                              | String  | Currency, e.g. `CELT`                                                         |
| name                                                                                                                                                             | String  | Chinese name of currency. There is no related name when it is not shown.      |
| logoLink                                                                                                                                                         | String  | Logo link of currency                                                         |
| bal                                                                                                                                                              | String  | Withdrawable balance                                                          |
| canWd                                                                                                                                                            | Boolean | Availability to withdraw to chain.                                            |
| `false`: not available `true`: available                                                                                                                         |
| chain                                                                                                                                                            | String  | Chain for withdrawal                                                          |
| minWd                                                                                                                                                            | String  | Minimum withdrawal amount of currency in a single transaction                 |
| wdAll                                                                                                                                                            | Boolean | Whether all assets in this currency must be withdrawn at one time             |
| fee                                                                                                                                                              | String  | Fixed withdrawal fee                                                          |
| feeCcy                                                                                                                                                           | String  | Fixed withdrawal fee unit, e.g. `USDT`                                        |
| burningFeeRate                                                                                                                                                   | String  | Burning fee rate, e.g "0.05" represents "5%".                                 |
| Some currencies may charge combustion fees. The burning fee is deducted based on the withdrawal quantity (excluding gas fee) multiplied by the burning fee rate. |
| ctAddr                                                                                                                                                           | String  | Last 6 digits of contract address                                             |
| wdTickSz                                                                                                                                                         | String  | Withdrawal precision, indicating the number of digits after the decimal point |
| needTag                                                                                                                                                          | Boolean | Whether tag/memo information is required for withdrawal                       |
