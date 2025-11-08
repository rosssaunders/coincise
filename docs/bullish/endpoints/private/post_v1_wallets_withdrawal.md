# POST /v1/wallets/withdrawal

**Summary**: Create Withdrawal

## Description

Trigger a withdrawal, requires
[bearer token](#overview--add-authenticated-request-header) in authorization
header

The `BX-SIGNATURE` header should be created by signing the request with an ECDSA
API Key as follows:

1. Construct a string that concatenates the following fields:
   - `timestamp` - current epoch milliseconds e.g. 1697008474031
   - `nonce` - a UUID identifier to protect against replay attacks e.g.
     255241a1-2cde-4954-87b1-13beef547960
   - `request method` - e.g. POST
   - `request path` - e.g. /trading-api/v1/wallets/withdrawal
   - `request body JSON string`, removing any spaces and newline characters
2. Hash the string using a SHA-256 hash function and sign the resulting
   hexdigest with your `<PRIVATE_KEY>`.
3. DER encode the signature, and BASE64 encode the DER encoded signature.

> **Bullish requires you to whitelist a withdrawal destination address before
> submitting a withdrawal request. You may view, approve, and manage your list
> of destination addresses in Account Settings on the Bullish website. If you
> attempt a withdrawal without first whitelisting an address in Account
> Settings, then the withdrawal attempt will fail.**

For a full example of using the withdrawal endpoint please see the
[Custody Withdrawal Example](https://github.com/bullish-exchange/api-examples/blob/master/custody/custody_withdrawal_ecdsa.py)

Please note that Custody endpoints utilize a non-multiplied asset format for
long decimal assets like SHIB and PEPE, ensuring consistency with real-world
asset representation. This differs from Trading endpoints, which use a
multiplied asset format, such as SHIB1M and PEPE1M. For more information, please
see
[help centre](https://bullishexchange.atlassian.net/wiki/spaces/BHC/pages/20807684/Understanding+Multiplied+Assets+PEPE1M+and+SHIB1M)

The currently supported precisions for withdrawal quantities are as follows.
Please note that fees are always specified in units of the symbol itself, not in
smaller denominations (e.g. BTC not Satoshi, ETH not Wei) :

| Symbol | Precision                                             | Remarks                                                                                                                                                                  |
| ------ | ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| USD    | 2dp                                                   |                                                                                                                                                                          |
| BTC    | 8dp                                                   |                                                                                                                                                                          |
| DOGE   | 8dp                                                   |                                                                                                                                                                          |
| ETH    | 8dp                                                   |                                                                                                                                                                          |
| LTC    | 8dp                                                   |                                                                                                                                                                          |
| XRP    | 6dp                                                   |                                                                                                                                                                          |
| AAVE   | 8dp                                                   |                                                                                                                                                                          |
| CRV    | 8dp                                                   |                                                                                                                                                                          |
| LINK   | 8dp                                                   |                                                                                                                                                                          |
| MANA   | 8dp                                                   |                                                                                                                                                                          |
| MATIC  | 8dp                                                   |                                                                                                                                                                          |
| SUSHI  | 8dp                                                   |                                                                                                                                                                          |
| UNI    | 8dp                                                   |                                                                                                                                                                          |
| USDC   | 6dp                                                   |                                                                                                                                                                          |
| USDT   | 6dp                                                   |                                                                                                                                                                          |
| SHIB   | 2dp                                                   | Please ensure to use the non-multiplied asset format (e.g., SHIB, PEPE, BONK) when creating withdrawals, as Custody endpoints align with real-world asset representation |
| PEPE   | 2dp                                                   | Please ensure to use the non-multiplied asset format (e.g., SHIB, PEPE, BONK) when creating withdrawals, as Custody endpoints align with real-world asset representation |
| BONK   | Round to the nearest ten (e.g., 120 or 130, not 125). | Please ensure to use the non-multiplied asset format (e.g., SHIB, PEPE, BONK) when creating withdrawals, as Custody endpoints align with real-world asset representation |

**Ratelimited:** `True` - see [custody limits](#tag--custody)

**Operation ID**: custody-withdrawal

**Tags**: custody

**Endpoint**: `POST /v1/wallets/withdrawal`

**Authentication Required**: Yes

## Parameters

| Parameter | In  | Type   | Required | Description |
| --------- | --- | ------ | -------- | ----------- |
|           |     | string | No       |             |
|           |     | string | No       |             |

## Request Body

withdrawal request

**Required**: Yes

### Content-Type: application/json

**Schema**:

```json
{
  "$ref": "#/components/schemas/CustodyApiEcdsaWithdrawalRequest"
}
```

## Responses

### 200 - OK

**Content-Type**: application/json

**Schema**:

```json
{
  "$ref": "#/components/schemas/CustodyApiWithdrawalResponse"
}
```

### 429 - Too Many Requests

### 500 - Internal Server Error
