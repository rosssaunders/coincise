# GET Withdraw Detail

Source: [https://doc.xt.com/docs/spot/Deposit&Withdrawal/WithdrawDetail](https://doc.xt.com/docs/spot/Deposit&Withdrawal/WithdrawDetail)

# Withdraw Detail

**Type:** GET **Description:** `/v4/withdraw`

### Parameters[​](#parameters "Direct link to Parameters")

| name | type | mandatory | default | description | ranges |
| --- | --- | --- | --- | --- | --- |
| recordId | string | false | N/A | Withdrawal record ID, obtained from the **Withdraw** endpoint. Recommended to use this first. |  |
| clientOrderId | string | false | N/A | Custom client ID |  |

### Notes[​](#notes "Direct link to Notes")

-   Limit flow rules: **1 request/second per apikey**.
-   Use `recordId` if available, otherwise `clientOrderId`.
-   This endpoint retrieves the detailed information of a specific withdrawal record.

### Request Example[​](#request-example "Direct link to Request Example")

Request

```
  curl --location --request GET 'https://sapi.xt.com/v4/withdraw?recordId=xxxxxxxxx' \    --header 'accept: */*' \    --header 'Content-Type: application/json' \    --header 'validate-algorithms: HmacSHA256' \    --header 'validate-recvwindow: 60000' \    --header 'validate-appkey: xxxxxxxxxx' \    --header 'validate-timestamp: xxxxxxxxxx' \    --header 'validate-signature: xxxxxxxxxx' \
```

### Response Example[​](#response-example "Direct link to Response Example")

Response

```
{  "rc": 0,  "mc": "SUCCESS",  "ma": [],  "result": {    "id": 100, // Withdrawal record ID    "clientOrderId": 10, // Client ID    "type": 0, // Type: CHAIN_TRANSFER - Blockchain withdrawal, INTERNAL_TRANSFER - Internal withdrawal    "currency": "btc", // Currency    "address": "xxxxx", // Withdrawal address    "status": "REVIEW", // Withdrawal status (see Deposit/Withdraw status reference)    "amount": 0.1, // Withdrawal amount    "fee": 0.0001, // Withdrawal fee    "chain": "Tron", // Transfer network    "memo": "yyyyy", // Memo/Tag if applicable    "confirmations": 2, // Number of block confirmations    "transactionId": "490267492", // Transaction hash    "createdTime": 1737093343000 // Withdrawal application time (ms)  }}
```

[Edit this page](https://github.com/facebook/docusaurus/edit/main/website/docs/spot/Deposit&Withdrawal/withdrawDetail.mdx)