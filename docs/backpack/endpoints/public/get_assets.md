# GET assets.

**Source:**
[assets.](https://docs.backpack.exchange/#tag/Assets/operation/get_assets)

## Authentication

Not Required (Public Endpoint)

## [](#tag/Assets/operation/get_assets)Get assets.

Get all supported assets.

### Responses

**200**

Success.

##### Response Schema: application/json; charset=utf-8

Array

| Parameter   | Required | Type    | Description                                         |
| ----------- | -------- | ------- | --------------------------------------------------- |
| symbol      | required | string  | Symbol of the asset, e.g. ETH.                      |
| displayName | required | string  | Display name of the asset.                          |
| coingeckoId | optional | string  | Coingecko ID of the asset.                          |
| tokens      | required | objects | Token on each blockchain the asset is available on. |

**500**

Internal server error.

##### Response Schema: application/json; charset=utf-8

| Parameter | Required | Type   | Description |
| --------- | -------- | ------ | ----------- |
| code      | required | string |             |
| message   | required | string |             |
