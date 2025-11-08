# GET Get Currency List (V1)

**Source:** [Get Currency List (V1)](https://developer-pro.bitmart.com/en/spot/)

**API Type:** Spot

## Authentication

Not Required (Public Endpoint)

## Get Currency List (V1)

`Get a list of all cryptocurrencies on the platform`

#### Request URL

`GET https://api-cloud.bitmart.com/spot/v1/currencies`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

Copy Success

Copy to Clipboard

`curl https://api-cloud.bitmart.com/spot/v1/currencies`

None

#### Response Data

> Response

Copy Success

Copy to Clipboard

`{   "code": 1000,   "trace":"886fb6ae-456b-4654-b4e0-d681ac05cea1",   "message": "OK",   "data": {     "currencies": [       {         "id": "BTC",         "name": "Bitcoin",         "withdraw_enabled": true,         "deposit_enabled": true       },       {         "id": "ETH",         "name": "Ethereum",         "withdraw_enabled": true,         "deposit_enabled": true       }     ]   } }`

| Field | Type | Description |
| --- | --- | --- |
| id | String | Currency abbreviation, such as BTC |
| name | String | Currency full name, such as Bitcoin |
| withdraw\_enabled | Boolean | Whether this currency can be withdrawn on the platform  
\- `true`\=can  
\- `false`\=no |
| deposit\_enabled | Boolean | Whether this currency can be deposited on the platform  
\- `true`\=can  
\- `false`\=no |

If the currency you need is not included in the returned response, the currency may have been delisted.