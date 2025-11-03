# DELETE Cancell batch order

Source: [https://doc.xt.com/docs/spot/Order/CancelBatchOrder](https://doc.xt.com/docs/spot/Order/CancelBatchOrder)

# Cancell batch order

**Type:** DELETE **Description:** `/v4/batch-order`

### Parameters[​](#parameters "Direct link to Parameters")

| name | type | mandatory | default | description | ranges |
| --- | --- | --- | --- | --- | --- |
| clientBatchId | string | false |  | client batch id |  |
| orderIds | array | true |  | 6216559590087220004, 6216559590087220005 |  |

> Note: The parameters should be placed in the request body in the form of JSON.

### Parameters Example[​](#parameters-example "Direct link to Parameters Example")

```
curl --location --request DELETE 'https://sapi.xt.com/v4/batch-order?orderIds=xxxxxx,xxxxxx,xxxxxx' \--header 'accept: */*' \--header 'Content-Type: application/json' \--header 'validate-algorithms: HmacSHA256' \--header 'validate-recvwindow: 60000' \--header 'validate-appkey: xxxxxxxxxx' \--header 'validate-timestamp: xxxxxxxxxx' \--header 'validate-signature: xxxxxxxxxx'
```

### Response Example[​](#response-example "Direct link to Response Example")

Response

```
{  "rc": 0,  "mc": "string",  "ma": [{}],  "result": {}}
```

[Edit this page](https://github.com/facebook/docusaurus/edit/main/website/docs/spot/Order/batchOrderDel.mdx)