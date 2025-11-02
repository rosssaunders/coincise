# GET wallets.

**Source:**
[wallets.](https://docs.backpack.exchange/#tag/System/operation/get_wallets)

## Authentication

Not Required (Public Endpoint)

## [](#tag/System/operation/get_wallets)Get wallets.

Returns all configured blockchain wallets and their addresses.

### Responses

**200**

Success.

##### Response Schema: application/json; charset=utf-8

Array

| Parameter  | Required | Type   | Description             |
| ---------- | -------- | ------ | ----------------------- |
| blockchain | required | string | The blockchain network. |
| address    | required | string | The wallet address.     |
