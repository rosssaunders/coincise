## /public/get_index

Retrieves the current index price for the instruments, for the selected
currency.

This method is deprecated and will be removed in the future.

### Parameters

| Parameter | Required | Type   | Enum  | Description |
| --------- | -------- | ------ | ----- | ----------- |
| currency  | true     | string | `BTC` |

`ETH`  
`USDC`  
`USDT`  
`EURR` | The currency symbol |

### Response

| Name     | Type     | Description                                                                                                 |
| -------- | -------- | ----------------------------------------------------------------------------------------------------------- |
| id       | integer  | The id that was sent in the request                                                                         |
| jsonrpc  | string   | The JSON-RPC version (2.0)                                                                                  |
| result   | _object_ |                                                                                                             |
|   ›  BTC | number   | The current index price for BTC-USD (only for selected currency == BTC)                                     |
|   ›  ETH | number   | The current index price for ETH-USD (only for selected currency == ETH)                                     |
|   ›  edp | number   | Estimated delivery price for the currency. For more details, see Documentation > General > Expiration Price |
