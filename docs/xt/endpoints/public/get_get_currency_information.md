# GET /v4/public/currencies

**Source:** [https://doc.xt.com/docs/spot/Balance/GetCurrencies](https://doc.xt.com/docs/spot/Balance/GetCurrencies)

## Description

This endpoint retrieves operations on the resource.

## Authentication

Not Required (Public Endpoint)

## HTTP Request

`GET /v4/public/currencies`

## Request Parameters

| Name | Type | Required | Default | Description | Ranges |
| --- | --- | --- | --- | --- | --- |
| — | string | No | N/A | No request parameters required |  |

## Request Example

```bash
  curl --location --request GET 'https://sapi.xt.com/v4/public/currencies' \    --header 'accept: */*' \    --header 'Content-Type: application/json' \
```

## Response Example

```json
{  "rc": 0,  "mc": "string",  "ma": [{}],  "result": [    {      "id": 11,
```