# POST Modify Limit Order (SIGNED)

**Source:**
[Modify Limit Order (SIGNED)](https://developer-pro.bitmart.com/en/futuresv2/)

**API Type:** Futures

## Authentication

Required (Private Endpoint)

## Modify Limit Order (SIGNED)

`Applicable for modifying contract limit orders`

#### Request URL

`POST https://api-cloud-v2.bitmart.com/contract/private/modify-limit-order`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

`curl   -H 'X-BM-KEY:{{AccessKey}}'  -H 'X-BM-TIMESTAMP:{{currentTime}}'  -H 'X-BM-SIGN:{{SIGN}}'   -X POST -d '{   "symbol":"ETHUSDT",   "order_id":220906179559421,   "client_order_id":"123456",   "price":"1450",   "size":1 }' https://api-cloud-v2.bitmart.com/contract/private/modify-limit-order`

| 参数            | 类型   | 是否必填 | 描述                                                                                                                      |
| --------------- | ------ | -------- | ------------------------------------------------------------------------------------------------------------------------- |
| symbol          | String | Yes      | Symbol of the contract(like BTCUSDT)                                                                                      |
| order_id        | Int    | No       | Order ID(order_id or client_order_id must give one)                                                                       |
| client_order_id | String | No       | Client-defined OrderId(A combination of case-sensitive alphanumerics, all numbers, or all letters of up to 32 characters) |
| price           | String | No       | Order Price（price or size must give one）                                                                                |
| size            | Int    | No       | Order Size（size or price must give one）                                                                                 |

#### Response Data

> Response

```json
{
  "code": 1000,
  "message": "Ok",
  "data": {
    "order_id": 220609666322019,
    "client_order_id": "123456"
  },
  "trace": "13f7fda9-9543-4e11-a0ba-cbe117989988"
}
```

| Field           | Type   | Description     |
| --------------- | ------ | --------------- |
| order_id        | Int    | Order ID        |
| client_order_id | String | Client Order ID |
