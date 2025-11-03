# POST Transfer between sub-account business systems

Source: [https://doc.xt.com/docs/spot/Transfer/TransferBetweenSubAccounts](https://doc.xt.com/docs/spot/Transfer/TransferBetweenSubAccounts)

# Transfer between sub-account business systems

**Type:** POST **Description:** `/v4/balance/account/transfer`

### Parameters[​](#parameters "Direct link to Parameters")

| name | type | mandatory | default | description | ranges |
| --- | --- | --- | --- | --- | --- |
| bizId | string | true | N/A | Unique ID for idempotent processing | Maximum length: 128 |
| from | enum | true | N/A | Fund transfer out account | [bizType enum](#bizType) |
| to | enum | true | N/A | Fund transfer in account | [bizType enum](#bizType) |
| currency | string | true | N/A | Currency name, must be lowercase (e.g. `usdt`, `btc`) |  |
| symbol | string | false | N/A | Transfer symbol (must be lowercase). Required if one of the transfer-in or transfer-out accounts is **leverage** |  |
| amount | bigDecimal | true | N/A | Transfer amount |  |
| toAccountId | long | true | N/A | Transfer-in account ID (must belong to the same user as the transfer-out account ID) |  |
| fromAccountId | long | false | N/A | Transfer-out account ID |  |

### Notes[​](#notes "Direct link to Notes")

This endpoint performs fund transfers between business system accounts under the same user.

-   `bizId` is recommended to be stored for reconciliation.
-   If leverage accounts are involved, `symbol` must be specified.

### Parameters Example[​](#parameters-example "Direct link to Parameters Example")

```
--header 'accept: */*' \--header 'Content-Type: application/json' \--header 'validate-algorithms: HmacSHA256' \--header 'validate-recvwindow: 60000' \--header 'validate-appkey: xxxxxxxxxx' \--header 'validate-timestamp: xxxxxxxxxx' \--header 'validate-signature: xxxxxxxxxx' \--data '{    "bizId": "xxxx_xxxxxxxx",    "from": "SPOT",    "to": "SPOT",    "currency": "USDT",    "amount": "1",    "toAccountId": accountId}'
```

### Response Example[​](#response-example "Direct link to Response Example")

Response

```
{  "rc": 0,  "mc": "SUCCESS",  "ma": [],  "result": 123456 // The returned unique ID of the transfer, recommended to store for reconciliation}
```

[Edit this page](https://github.com/facebook/docusaurus/edit/main/website/docs/spot/Transfer/subTransferPost.mdx)