# POST Transfer between user business systems

Source:
[https://doc.xt.com/docs/spot/Transfer/TransferBetweenUserSystems](https://doc.xt.com/docs/spot/Transfer/TransferBetweenUserSystems)

# Transfer between user business systems

**Type:** POST

**Description:** `/v4/balance/transfer`

### Parameters[​](#parameters "Direct link to Parameters")

| name     | type       | mandatory | default | description                                                                                                      | ranges                   |
| -------- | ---------- | --------- | ------- | ---------------------------------------------------------------------------------------------------------------- | ------------------------ |
| bizId    | string     | true      | N/A     | Unique ID for idempotent processing                                                                              | Maximum length: 128      |
| from     | enum       | true      | N/A     | Fund transfer out account                                                                                        | [bizType enum](#bizType) |
| to       | enum       | true      | N/A     | Fund transfer in account                                                                                         | [bizType enum](#bizType) |
| currency | string     | true      | N/A     | Currency name, must be lowercase (e.g. `usdt`, `btc`)                                                            |                          |
| symbol   | string     | false     | N/A     | Transfer symbol (must be lowercase). Required if one of the transfer-in or transfer-out accounts is **leverage** |                          |
| amount   | bigDecimal | true      | N/A     | Transfer amount                                                                                                  |                          |

### Notes[​](#notes "Direct link to Notes")

This endpoint allows fund transfers between **different business systems** under
the same user.

- `bizId` ensures idempotent processing, recommended to be stored for
  reconciliation.
- If leverage accounts are involved, `symbol` must be provided.

#### Parameters Example[​](#parameters-example "Direct link to Parameters Example")

```
curl --location --request POST 'https://sapi.xt.com/v4/balance/transfer' \--header 'accept: */*' \--header 'Content-Type: application/json' \--header 'validate-algorithms: HmacSHA256' \--header 'validate-recvwindow: 60000' \--header 'validate-appkey: xxxxxxxxxx' \--header 'validate-timestamp: xxxxxxxxxx' \--header 'validate-signature: xxxxxxxxxx' \--data '{    "bizId": "xxxx_xxxxxxxx",    "from": "SPOT",    "to": "FUTURES_U",    "currency": "USDT",    "amount": "1"}'
```

### Response Example[​](#response-example "Direct link to Response Example")

Response

```
{  "rc": 0,  "mc": "SUCCESS",  "ma": [],  "result": 123456 // The returned unique ID of the transfer, recommended to store for reconciliation}
```

[Edit this page](https://github.com/facebook/docusaurus/edit/main/website/docs/spot/Transfer/transferPost.mdx)
