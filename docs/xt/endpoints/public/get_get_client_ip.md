# GET /v4/public/client

**Source:** [https://doc.xt.com/docs/spot/Market/GetClientIp](https://doc.xt.com/docs/spot/Market/GetClientIp)

## Description

This endpoint retrieves operations on /v4/public/client.

## Authentication

Not Required (Public Endpoint)

## HTTP Request

`GET /v4/public/client`

## Request Example

```bash
  curl --location --request GET 'https://sapi.xt.com/v4/public/client' \    --header 'accept: */*' \    --header 'Content-Type: application/json' \
```

## Response Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| rc | number | - |
| mc | string | - |
| ma | array | - |
| result | object | - |
| result.ip | string | - |


## Response Example

```json
{  "rc": 0,  "mc": "SUCCESS",  "ma": [],  "result": {    "ip": "192.168.1.1"  }}
```