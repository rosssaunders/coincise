# Bullish Trading API - Private REST API - Command Entry

# command entry

Authenticated API for submitting commands into the exchange.

## command-entry

> Code samples

```javascript
const inputBody = '{
  "commandType": "V3CancelOrder",
  "orderId": "297735387747975680",
  "symbol": "BTCUSDC",
  "tradingAccountId": "111000000000001",
  "x-widdershins-oldRef": "#/components/schemas/CancelOrderCommandV3/example"
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json',
  'Authorization':{
  "type": "string"
},
  'BX-SIGNATURE':{
  "type": "string"
},
  'BX-TIMESTAMP':{
  "type": "string"
},
  'BX-NONCE':{
  "type": "string"
},
  'BX-NONCE-WINDOW-ENABLED':{
  "type": "string",
  "enum": [
    "false",
    "true"
  ],
  "default": "false"
}
};

fetch('https://api.exchange.bullish.com/trading-api/v2/command',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Authorization': {
  "type": "string"
},
  'BX-SIGNATURE': {
  "type": "string"
},
  'BX-TIMESTAMP': {
  "type": "string"
},
  'BX-NONCE': {
  "type": "string"
},
  'BX-NONCE-WINDOW-ENABLED': {
  "type": "string",
  "enum": [
    "false",
    "true"
  ],
  "default": "false"
}
}

r = requests.post('https://api.exchange.bullish.com/trading-api/v2/command', headers = headers)

print(r.json())

```

`POST /v2/command`

_Create Command_

Submits a command to the trading engine. A successful response indicates that
the command entry was acknowledged but does not indicate that the command was
executed. This endpoint uses the [signing format](#overview--signing-format)
which does not require strict field ordering and addition of null fields in the
request body. Quantities and prices does not require strict precision. Eg. for
asset precision of 4 - `100`, `100.0`, `100.00`, `100.000` and `100.0000` are
all accepted.

Command schemas and examples are provided below. Supported commands:

- V3CancelOrder
- V1CancelAllOrders
- V1CancelAllOrdersByMarket
- V1DelayedCancelAllOrders
- V1UnsetDelayedCancelAllOrders
- V1AmendOrder
- V3TerminateAMMInstruction
- V2TransferAsset

Requires

- [bearer token](#overview--add-authenticated-request-header) in authorization
  header

**Ratelimited:** `True`. Higher tiers of rate limits available by providing the
`BX-RATELIMIT-TOKEN` request header.

> Body parameter

> Only one of `orderId` or `clientOrderId` can be used in the cancel order
> command

```json
{
  "commandType": "V3CancelOrder",
  "orderId": "297735387747975680",
  "symbol": "BTCUSDC",
  "tradingAccountId": "111000000000001",
  "x-widdershins-oldRef": "#/components/schemas/CancelOrderCommandV3/example"
}
```

### Parameters

| Name                    | In     | Type   | Required | Description                                                                                                                                                         |
| ----------------------- | ------ | ------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Authorization           | header | string | true     | authorization header, its value must be 'Bearer ' + [token](#overview--generate-a-jwt-token)                                                                        |
| BX-SIGNATURE            | header | string | true     | signature obtained using the [signing format](#overview--how-to-ensure-the-order-of-create-order-or-cancel-order-requests)                                          |
| BX-TIMESTAMP            | header | string | true     | timestamp is the number of milliseconds since EPOCH                                                                                                                 |
| BX-NONCE                | header | string | true     | nonce is a client side incremented unsigned 64 bit integer                                                                                                          |
| BX-NONCE-WINDOW-ENABLED | header | string | false    | string representation of a boolean value, [enables out-of-order order requests to be processed](#overview--how-to-enable-out-of-order-processing-of-order-requests) |
| body                    | body   | any    | true     | none                                                                                                                                                                |

#### Detailed descriptions

**BX-NONCE-WINDOW-ENABLED**: string representation of a boolean value,
[enables out-of-order order requests to be processed](#overview--how-to-enable-out-of-order-processing-of-order-requests)

#### Enumerated Values

| Parameter               | Value |
| ----------------------- | ----- |
| BX-NONCE-WINDOW-ENABLED | false |
| BX-NONCE-WINDOW-ENABLED | true  |

> Example responses

> Only one of `orderId` or `clientOrderId` present

```json
{
  "message": "Command acknowledged - CancelOrder",
  "requestId": "633910976353665024",
  "orderId": "633910775316480001"
}
```

> Status OK. This means a command was successfully acknowledged.

```json
{
  "message": "Command acknowledged - CancelAllOrders",
  "requestId": "633900538459062272"
}
```

```json
{
  "message": "Command acknowledged - CancelAllOrdersByMarket",
  "requestId": "633914459442118656"
}
```

```json
{
  "message": "Command acknowledged - DelayedCancelAllOrders",
  "requestId": "633914459442118656"
}
```

```json
{
  "message": "Command acknowledged - UnsetDelayedCancelAllOrders",
  "requestId": "633914459442118656"
}
```

```json
{
  "message": "Command acknowledged - TerminateAMMInstruction",
  "requestId": "633906221577404416",
  "instructionId": "633906221577404424"
}
```

```json
{
  "message": "Command acknowledged - TransferAsset",
  "requestId": "633909659774222336"
}
```

```json
{
  "message": "Command acknowledged - AmendOrder",
  "requestId": "633910976353665024",
  "orderId": "633910775316480001",
  "clientOrderId": "1234567-1"
}
```

> 400 Response

```json
{
  "type": "object",
  "required": ["message", "errorCode", "errorCodeName"],
  "properties": {
    "message": {
      "description": "message",
      "type": "string",
      "example": "Missing signature header"
    },
    "errorCode": {
      "description": "unique error code",
      "type": "integer",
      "example": 6029
    },
    "errorCodeName": {
      "description": "unique error code name",
      "type": "string",
      "example": "MISSING_SIGNATURE_HEADER"
    }
  }
}
```

### Responses

| Status | Meaning                                                          | Description                                                    | Schema |
| ------ | ---------------------------------------------------------------- | -------------------------------------------------------------- | ------ |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)          | Status OK. This means a command was successfully acknowledged. | Inline |
| 400    | [Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1) | Bad Request                                                    |

For example, sending a request with the `BX-SIGNATURE` header missing will
result in the following
response:|[BadOrderEntryResponse](#schemabadorderentryresponse)|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Not
Authenticated|None|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Access
Forbidden|None|
|429|[Too Many Requests](https://tools.ietf.org/html/rfc6585#section-4)|Too Many
Requests|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal
Server Error|None|

### Response Schema

> **Note:** To perform this operation, you must be authenticated by means of one
> of the following methods: jwtTokenAuth
