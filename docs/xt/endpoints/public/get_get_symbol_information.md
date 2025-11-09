# GET /v4/public/symbol

**Source:** [https://doc.xt.com/docs/spot/Market/GetSymbolInformation](https://doc.xt.com/docs/spot/Market/GetSymbolInformation)

## Description

This endpoint retrieves operations on /v4/public/symbol.

## Authentication

Not Required (Public Endpoint)

## Rate Limit

-   `buyMaxDeviation`, `buyPriceLimitCoefficient`, `sellMaxDeviation`, `sellPriceLimitCoefficient`

```
Buy:  price >= latestPrice - latestPrice * buyMaxDeviation      price <= latestPrice + latestPrice * buyPriceLimitCoefficientSell: price <= latestPrice + latestPrice * sellMaxDeviation      price >= latestPrice - latestPrice * sellPriceLimitCoefficient
```

## HTTP Request

`GET /v4/public/symbol`

## Request Parameters

| name | type | Required | default | description | ranges |
| --- | --- | --- | --- | --- | --- |
| symbol | string | No | \- | trading pair eg:btc\_usdt |  |
| symbols | array | No | \- | collection of trading pairs. priority is higher than symbol. eg: btc\_usdt,eth\_usdt |  |
| version | string | No | \- | version number, if request version equals response version, list will not be returned (reduce IO). eg: 2e14d2cd5czcb2c2af2c1db6 |  |

## Request Example

```bash
// version: Version number, optional. If the requested version is equal to the response version, the list will not be returned (to reduce I/O).  curl --location --request GET 'https://sapi.xt.com/v4/public/symbol?symbol=XT_USDT&version=xxxxxxxx' \    --header 'accept: */*' \    --header 'Content-Type: application/json' \
```

## Response Example

```json
{  "rc": 0,  "mc": "SUCCESS",  "ma": [],  "result": {    "time": 1662444177871,
```