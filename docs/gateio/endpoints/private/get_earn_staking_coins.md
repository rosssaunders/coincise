# GET /earn/staking/coins

**Source:** [/earn/staking/coins](https://www.gate.io/docs/developers/apiv4/en/#findcoin-parameters)

## Authentication

Required (Private Endpoint)

## [#](#staking-coins) Staking coins

`GET /earn/staking/coins`

_Staking coins_

> Body parameter

```
{
  "coin": "string",
  "cointype": "string"
}
```

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#findcoin-parameters](https://www.gate.io/docs/developers/apiv4/en/#findcoin-parameters)

| Name       | In   | Type   | Required | Description                           |
| ---------- | ---- | ------ | -------- | ------------------------------------- |
| body       | body | object | true     | none                                  |
| » coin     | body | string | false    | Currency                              |
| » cointype | body | string | false    | Token Type: swap-Voucher, lock-Locked |

> Example responses

> 200 Response

```
[
  "GT",
  "SOL",
  "USDT",
  "ALEO",
  "DOT",
  "TRX",
  "ADA"
]
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#findcoin-responses](https://www.gate.io/docs/developers/apiv4/en/#findcoin-responses)

| Status | Meaning                                                                    | Description            | Schema     |
| ------ | -------------------------------------------------------------------------- | ---------------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Successfully retrieved | \[string\] |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#findcoin-responseschema](https://www.gate.io/docs/developers/apiv4/en/#findcoin-responseschema)

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#on-chain-token-swap-for-earned-coins) On-chain token swap for earned coins

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#on-chain-token-swap-for-earned-coins](https://www.gate.io/docs/developers/apiv4/en/#on-chain-token-swap-for-earned-coins)

> Code samples
