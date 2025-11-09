# GET /v4/public/time

**Source:** [https://doc.xt.com/docs/spot/Market/GetServerTime](https://doc.xt.com/docs/spot/Market/GetServerTime)

## Description

This endpoint retrieves operations on /v4/public/time.

## Authentication

Not Required (Public Endpoint)

## HTTP Request

`GET /v4/public/time`

## Request Example

```bash
  curl --location --request GET 'https://sapi.xt.com/v4/public/time' \    --header 'accept: */*' \    --header 'Content-Type: application/json' \
```bash
Response Example

Response

```bash
{  "rc": 0,  "mc": "SUCCESS",  "ma": [],  "result": {    "serverTime": 1662435658062  }}
```