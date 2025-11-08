# PUT Update Order(Limit)

Source: [https://doc.xt.com/docs/spot/Order/UpdateOrderLimit](https://doc.xt.com/docs/spot/Order/UpdateOrderLimit)

# Update Order(Limit)

**Type:** PUT **Description:** `/v4/order/{orderId}`

### Parameters[​](#parameters "Direct link to Parameters")

| name | type | mandatory | default | description | ranges |
| --- | --- | --- | --- | --- | --- |
| orderId | number | true |  | order ID |  |
| price | number | true |  | Price |  |
| quantity | number | true |  | Quantity |  |

#### **Limit Flow Rules**[​](#limit-flow-rules "Direct link to limit-flow-rules")

50/s/apikey

### Parameters Example[​](#parameters-example "Direct link to Parameters Example")

```
curl --location --request PUT 'https://sapi.xt.com/v4/order/xxxxxx' \--header 'accept: */*' \--header 'Content-Type: application/json' \--header 'validate-algorithms: HmacSHA256' \--header 'validate-recvwindow: 60000' \--header 'validate-appkey: xxxxxxxxxx' \--header 'validate-timestamp: xxxxxxxxxx' \--header 'validate-signature: xxxxxxxxxx' \--data '{    "orderId": "xxxxxx",    "price": 10,    "quantity": 2}'
```

### Response Example[​](#response-example "Direct link to Response Example")

Response

```
{  "rc": 0,  "mc": "string",  "ma": [{}],  "result": {    "orderId": "6216559590087220004", //order id    "modifyId": "407329711723834560" //modify id  }}
```

[Edit this page](https://github.com/facebook/docusaurus/edit/main/website/docs/spot/Order/orderUpdate.mdx)