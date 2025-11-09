# POST /earn/staking/swap

**Source:**
[/earn/staking/swap](https://www.gate.io/docs/developers/apiv4/en/#swapstakingcoin-parameters)

## Authentication

Required (Private Endpoint)

## [#](#on-chain-token-swap-for-earned-coins) On-chain token swap for earned coins

`POST /earn/staking/swap`

_On-chain token swap for earned coins_

> Body parameter

```
{
  "coin": "GT",
  "side": "0",
  "amount": "1.5"
}
```

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#swapstakingcoin-parameters](https://www.gate.io/docs/developers/apiv4/en/#swapstakingcoin-parameters)

| Name     | In   | Type           | Required | Description                          |
| -------- | ---- | -------------- | -------- | ------------------------------------ |
| body     | body | object         | true     | none                                 |
| » coin   | body | string         | true     | Currency                             |
| » side   | body | string         | true     | 0 - Stake 1 - Redeem                 |
| » amount | body | string         | true     | Amount                               |
| » pid    | body | integer(int32) | false    | DeFi-type Mining Protocol Identifier |

> Example responses

> 200 Response

```
{
  "id": 21000,
  "uid": 12345,
  "coin": "GT",
  "type": 0,
  "exchange_rate": "1.00000000",
  "amount": "2",
  "pid": 1,
  "status": 1,
  "createStamp": 1752200661
}
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#swapstakingcoin-responses](https://www.gate.io/docs/developers/apiv4/en/#swapstakingcoin-responses)

| Status | Meaning                                                                    | Description     | Schema |
| ------ | -------------------------------------------------------------------------- | --------------- | ------ |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Swap successful | Inline |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#swapstakingcoin-responseschema](https://www.gate.io/docs/developers/apiv4/en/#swapstakingcoin-responseschema)

Status Code **200**

| Name              | Type    | Description                 |
| ----------------- | ------- | --------------------------- |
| » id              | integer | Order ID                    |
| » pid             | integer | Product ID                  |
| » uid             | integer | User ID                     |
| » coin            | string  | Currency                    |
| » type            | integer | Type 0-Staking 1-Redemption |
| » subtype         | string  | 子Type                      |
| » amount          | string  | Amount                      |
| » exchange_rate   | string  | Exchange ratio              |
| » exchange_amount | string  | Redemption Amount           |
| » updateStamp     | integer | 更新Timestamp               |
| » createStamp     | integer | Transaction timestamp       |
| » status          | integer | status 1-success            |
| » protocol_type   | integer | DEFI Protocol Type          |
| » client_order_id | string  | Reference ID                |
| » source          | string  | Order Origin                |

WARNING

To perform this operation, you must be authenticated by API key and secret
