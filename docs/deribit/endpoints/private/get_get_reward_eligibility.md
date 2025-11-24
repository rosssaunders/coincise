# GET /private/get_reward_eligibility

Returns reward eligibility status and APR data for all supported currencies.

**📖 Related Support Article:**
[Yield reward-bearing coins](https://support.deribit.com/hc/en-us/articles/26525792475677-Yield-reward-bearing-coins)

This is a private method; it can only be used after authentication.

### Parameters

_This method takes no parameters_

### Response

| Name                      | Type    | Description                                                                                                                                                                                                                     |
| ------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id                        | integer | The id that was sent in the request                                                                                                                                                                                             |
| jsonrpc                   | string  | The JSON-RPC version (2.0) result object                                                                                                                                                                                        |
| result.apr_sma7           | number  | Simple Moving Average (SMA) of the last 7 days of rewards for the currency                                                                                                                                                      |
| result.eligibility_status | string  | eligible: User can get reward for specific currency for all its equitypartially_eligible: User can get reward for specific currency, but custody balance is excludednon_eligible: User can not get reward for specific currency |
