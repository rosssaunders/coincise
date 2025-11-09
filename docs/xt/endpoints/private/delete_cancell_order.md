# DELETE Cancell order

Source:
[https://doc.xt.com/docs/spot/Order/CancelOrder](https://doc.xt.com/docs/spot/Order/CancelOrder)

# Cancell order

**Type:** DELETE **Description:** `/v4/order/{orderId}`

### Parameters[​](#parameters "Direct link to Parameters")

| name    | type   | mandatory | default | description | ranges |
| ------- | ------ | --------- | ------- | ----------- | ------ |
| orderId | number | true      |         |             |        |

#### **Limit Flow Rules**[​](#limit-flow-rules "Direct link to limit-flow-rules")

N/A

### Parameters Example[​](#parameters-example "Direct link to Parameters Example")

```
curl --location --request DELETE 'https://sapi.xt.com/v4/order/xxxxxxxxxxx' \    // xxxxxxxxxxx：orderId--header 'accept: */*' \--header 'Content-Type: application/json' \--header 'validate-algorithms: HmacSHA256' \--header 'validate-recvwindow: 60000' \--header 'validate-appkey: xxxxxxxxxx' \--header 'validate-timestamp: xxxxxxxxxx' \--header 'validate-signature: xxxxxxxxxx'
```

### Response Example[​](#response-example "Direct link to Response Example")

Response

```
{  "rc": 0,  "mc": "string",  "ma": [{}],  "result": {    "cancelId": "6216559590087220004"  }}
```

[Edit this page](https://github.com/facebook/docusaurus/edit/main/website/docs/spot/Order/orderDel.mdx)
