# POST /earn/staking/eth2/swap

**Source:** [/earn/staking/eth2/swap](https://www.gate.io/docs/developers/apiv4/en/#swapeth2-parameters)

## Authentication

Required (Private Endpoint)

## [#](#eth2-swap) ETH2 swap

`POST /earn/staking/eth2/swap`

_ETH2 swap_

> Body parameter

```
{
  "side": "1",
  "amount": "1.5"
}
```

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#swapeth2-parameters](https://www.gate.io/docs/developers/apiv4/en/#swapeth2-parameters)

| Name     | In   | Type   | Required | Description                                                |
| -------- | ---- | ------ | -------- | ---------------------------------------------------------- |
| body     | body | object | true     | none                                                       |
| » side   | body | string | true     | 1-Forward Swap (ETH -> ETH2), 2-Reverse Swap (ETH2 -> ETH) |
| » amount | body | string | true     | Swap Amount                                                |

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#swapeth2-responses](https://www.gate.io/docs/developers/apiv4/en/#swapeth2-responses)

| Status | Meaning                                                                    | Description     | Schema |
| ------ | -------------------------------------------------------------------------- | --------------- | ------ |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Swap successful | None   |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#eth2-historical-return-rate-query) ETH2 historical return rate query

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#eth2-historical-return-rate-query](https://www.gate.io/docs/developers/apiv4/en/#eth2-historical-return-rate-query)

> Code samples
