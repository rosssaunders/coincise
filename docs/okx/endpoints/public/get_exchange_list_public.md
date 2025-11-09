# GET exchange list (public)

Source:
[https://www.okx.com/docs-v5/en/#funding-account-rest-api-get-exchange-list-public](https://www.okx.com/docs-v5/en/#funding-account-rest-api-get-exchange-list-public)

### Get exchange list (public)

Authentication is not required for this public endpoint.

#### Rate Limit: 6 requests per second

#### Rate limit rule: IP

#### HTTP Request

`GET /api/v5/asset/exchange-list`

#### Request Parameters

None

#### Response Parameters

| Parameter | Type   | Description                                                             |
| --------- | ------ | ----------------------------------------------------------------------- |
| exchName  | String | Exchange name, e.g. `1xbet`                                             |
| exchId    | String | Exchange ID, e.g. `did:ethr:0xfeb4f99829a9acdf52979abee87e83addf22a7e1` |
