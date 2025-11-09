# GET /api/v1/status

**Source:** [/api/v1/status](https://www.kucoin.com/docs/rest//api/v1/status)

## Authentication

Not Required (Public Endpoint)

## Description

Get Service Status

Get the service status.

## Responses

### 200

| Parameter   | Required | Type   | Description                                                                                                                             |
| ----------- | -------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------- |
| code        | required | string |                                                                                                                                         |
| data        | required | object |                                                                                                                                         |
| data.msg    | required | string |                                                                                                                                         |
| data.status | required | string | Status of service: open: normal transaction; close: Stop Trading/Maintenance; cancelonly: can only cancel the order but not place order |
