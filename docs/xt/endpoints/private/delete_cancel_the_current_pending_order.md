# DELETE Cancel the current pending order

Source:
[https://doc.xt.com/docs/spot/Order/CancelCurrentPendingOrder](https://doc.xt.com/docs/spot/Order/CancelCurrentPendingOrder)

# Cancel the current pending order

**Type** DELETE

**Description:** `/v4/open-order`

---

### Parameters[​](#parameters "Direct link to Parameters")

| Name    | Type   | Mandatory | Default | Description                                    | Ranges      |
| ------- | ------ | --------- | ------- | ---------------------------------------------- | ----------- |
| symbol  | string | No        | N/A     | Trading pair, if not filled in, represents all | —           |
| bizType | string | Yes       | N/A     | Business type                                  | SPOT, LEVER |
| side    | string | No        | N/A     | Order side                                     | BUY, SELL   |

---

### Limit Flow Rules[​](#limit-flow-rules "Direct link to Limit Flow Rules")

- 10/s/apikey
- **Note:** The parameters should be placed in the request body in the form of
  JSON.

### Parameters Example[​](#parameters-example "Direct link to Parameters Example")

```
curl --location --request DELETE 'https://sapi.xt.com/v4/open-order?symbol=XT_USDT' \--header 'accept: */*' \--header 'Content-Type: application/json' \--header 'validate-algorithms: HmacSHA256' \--header 'validate-recvwindow: 60000' \--header 'validate-appkey: xxxxxxxxxx' \--header 'validate-timestamp: xxxxxxxxxx' \--header 'validate-signature: xxxxxxxxxx'--data '{    "bizType": "SPOT",    "symbol": "XT_USDT"}'
```

---

### Response Example[​](#response-example "Direct link to Response Example")

Response

```
{  "rc": 0,  "mc": "string",  "ma": [{}],  "result": {}}
```

[Edit this page](https://github.com/facebook/docusaurus/edit/main/website/docs/spot/Order/openOrderDel.mdx)
