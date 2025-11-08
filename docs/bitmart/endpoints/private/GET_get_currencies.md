# GET Get Currencies

**Source:** [Get Currencies](https://developer-pro.bitmart.com/en/spot/)

**API Type:** Spot

## Authentication

Required (Private Endpoint)

## Get Currencies

`Gets the currency of the asset for withdrawal`

#### Request URL

`GET https://api-cloud.bitmart.com/account/v1/currencies`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

Copy Success

Copy to Clipboard

`curl https://api-cloud.bitmart.com/account/v1/currencies?currencies=BTC,ETH,BMX`

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| currencies | String | No | Single query, such as `BTC`; multiple queries, such as `BTC,ETH,BMX`, can have a maximum of 20. |

#### Response Data

> Response

Copy Success

Copy to Clipboard

`{   "code": 1000,   "trace":"886fb6ae-456b-4654-b4e0-d681ac05cea1",   "message": "OK",   "data": {     "currencies": [       {         "currency": "USDT",         "name": "Tether USD",         "contract_address": null,         "network": "OMNI",         "withdraw_enabled": false,         "deposit_enabled": false,         "withdraw_minsize": null,         "withdraw_minfee": null,         "withdraw_fee": "10",         "withdraw_fee_estimate": "10.3"       },       {         "currency": "USDT-TRC20",         "name": "USDT-TRC20",         "contract_address": "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t",         "network": "TRC20",         "withdraw_enabled": true,         "deposit_enabled": true,         "withdraw_minsize": "10",         "withdraw_minfee": null,         "withdraw_fee": "10",         "withdraw_fee_estimate": "10.3"       },       {         "currency": "USDT-ERC20",         "name": "USDT-ERC20",         "contract_address": "0xdac17f958d2ee523a2206206994597c13d831ec7",         "network": "ERC20",         "withdraw_enabled": true,         "deposit_enabled": true,         "withdraw_minsize": "26",         "withdraw_minfee": null,         "withdraw_fee": "26",         "withdraw_fee_estimate": "26.3"       }     ]   } }`

| Field | Type | Description |
| --- | --- | --- |
| currency | String | Token symbol, e.g., 'BTC' |
| name | String | Token name, e.g., 'Bitcoin' |
| contract\_address | String | Contract address |
| network | String | network, e.g., 'ERC20' |
| withdraw\_enabled | Boolean | Availability to withdraw  
\- `true`\=available  
\- `false`\=not available |
| deposit\_enabled | Boolean | Availability to deposit  
\- `true`\=available  
\-`false`\=not available |
| withdraw\_minsize | String | Minimum withdrawal amount |
| withdraw\_minfee | String | Minimum withdrawal fee (After 2025-05-18, the field will be removed) |
| withdraw\_fee | String | Withdrawal fee. The unit corresponds to the currency |
| withdraw\_fee\_estimate | String | Withdrawal fee estimate. The unit is USD. |

1\. If the returned response does not contain the currency you need, the currency may have been removed.  
2\. There are multiple USDT currencies. Note that:  
\`currency\` = \`USDT\` default is OMNI network  
\`currency\` = \`USDT-TRC20\` , is TRC20 network  
\`currency\` = \`USDT-ERC20\`, is ERC20 network