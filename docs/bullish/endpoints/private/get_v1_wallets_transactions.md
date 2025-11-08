# GET /v1/wallets/transactions

**Summary**: Get Custody Transaction History

## Description

Get custody transaction history, requires
[bearer token](#overview--add-authenticated-request-header) in authorization
header

Please note that Custody endpoints utilize a non-multiplied asset format for
long decimal assets like SHIB and PEPE, ensuring consistency with real-world
asset representation. This differs from Trading endpoints, which use a
multiplied asset format, such as SHIB1M and PEPE1M. For more information, please
see
[help centre](https://bullishexchange.atlassian.net/wiki/spaces/BHC/pages/20807684/Understanding+Multiplied+Assets+PEPE1M+and+SHIB1M)

Note on Source Address for Token Transfers (ERC-20, SPL, TRC-20): The source
address for tokens following standards like ERC-20, SPL and TRC-20 may not be
the originator wallet that broadcasts a transaction. If the transfer is executed
by a smart contract or program, the visible source address may represent the
account executing the token logic, not the external user who initiated the
transfer (Externally Owned Account).

- [supports pagination](#overview--pagination-support)

**Ratelimited:** `True` - see [custody limits](#tag--custody)

**Operation ID**: custody-get-history

**Tags**: custody

**Endpoint**: `GET /v1/wallets/transactions`

**Authentication Required**: Yes

## Parameters

| Parameter              | In    | Type   | Required | Description                                                    |
| ---------------------- | ----- | ------ | -------- | -------------------------------------------------------------- |
|                        |       | string | No       |                                                                |
| createdAtDatetime[gte] | query | string | No       | start timestamp of period, ISO 8601 with millisecond as string |
| createdAtDatetime[lte] | query | string | No       | end timestamp of period, ISO 8601 with millisecond as string   |
| custodyTransactionId   | query | string | No       | Custody transaction Id                                         |

## Responses

### 200 - OK

**Content-Type**: application/json

**Schema**:

```json
{
  "type": "array",
  "items": {
    "$ref": "#/components/schemas/CustodyHistory"
  }
}
```

### 429 - Too Many Requests

### 500 - Internal Server Error
