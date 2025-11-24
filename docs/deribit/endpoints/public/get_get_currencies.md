# GET /public/get_currencies

Retrieves all cryptocurrencies supported by the API.

### Parameters

_This method takes no parameters_

### Response

| Name                              | Type    | Description                                                                                                                                                                                                                                         |
| --------------------------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id                                | integer | The id that was sent in the request                                                                                                                                                                                                                 |
| jsonrpc                           | string  | The JSON-RPC version (2.0) result array of object                                                                                                                                                                                                   |
| result[].apr                      | number  | Simple Moving Average (SMA) of the last 7 days of rewards. If fewer than 7 days of reward data are available, the APR is calculated as the average of the available rewards. Only applicable to yield-generating tokens (USDE, STETH, USDC, BUILD). |
| result[].coin_type                | string  | The type of the currency.                                                                                                                                                                                                                           |
| result[].currency                 | string  | The abbreviation of the currency. This abbreviation is used elsewhere in the API to identify the currency.                                                                                                                                          |
| result[].currency_long            | string  | The full name for the currency.                                                                                                                                                                                                                     |
| result[].decimals                 | integer | The number of decimal places for the currency                                                                                                                                                                                                       |
| result[].in_cross_collateral_pool | boolean | true if the currency is part of the cross collateral pool                                                                                                                                                                                           |
| result[].min_confirmations        | integer | Minimum number of block chain confirmations before deposit is accepted.                                                                                                                                                                             |
| result[].min_withdrawal_fee       | number  | The minimum transaction fee paid for withdrawals                                                                                                                                                                                                    |
| result[].network_currency         | string  | The currency of the network                                                                                                                                                                                                                         |
| result[].network_fee              | number  | The network fee                                                                                                                                                                                                                                     |
| result[].withdrawal_fee           | number  | The total transaction fee paid for withdrawals result[].withdrawal_priorities array of object result[].withdrawal_priorities[].name string result[].withdrawal_priorities[].value number                                                            |
