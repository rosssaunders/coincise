## [](#section/Authentication)Authentication

## [](#section/Authentication/Signing-requests)Signing requests

Signed requests are required for any API calls that mutate state. Additionally,
some read only requests can be performed by signing or via session
authentication.

Signed requests require the following additional headers:

- `X-Timestamp` - Unix time in milliseconds that the request was sent.
- `X-Window` - Time window in milliseconds that the request is valid for,
  default is `5000` and maximum is `60000`.
- `X-API-Key` - Base64 encoded verifying key of the ED25519 keypair.
- `X-Signature` - Base64 encoded signature generated according to the
  instructions below.

`X-Timestamp``X-Window``5000``60000``X-API-Key``X-Signature`

### Generate ED25519 Keys

You can generate a private/public ED25519 keypair using this Python one-liner:

```python
python3 -c "from cryptography.hazmat.primitives.asymmetric import ed25519; import base64; key = ed25519.Ed25519PrivateKey.generate(); seed = key.private_bytes_raw(); pub = key.public_key().public_bytes_raw(); print(f'Seed: {base64.b64encode(seed).decode()}\nPublic Key: {base64.b64encode(pub).decode()}')"
```

`python3 -c "from cryptography.hazmat.primitives.asymmetric import ed25519; import base64; key = ed25519.Ed25519PrivateKey.generate(); seed = key.private_bytes_raw(); pub = key.public_key().public_bytes_raw(); print(f'Seed: {base64.b64encode(seed).decode()}\nPublic Key: {base64.b64encode(pub).decode()}')"`

This will output your base64-encoded private key (seed) and public key that can
be used for API authentication.

### Signature Generation

To generate a signature perform the following:

1.  The key/values of the request body or query parameters should be ordered
    alphabetically and then turned into query string format.
2.  Append the header values for the timestamp and receive window to the above
    generated string in the format `&timestamp=<timestamp>&window=<window>`. If
    no `X-Window` header is passed the default value of `5000` still needs to be
    added to the signing string.

The key/values of the request body or query parameters should be ordered
alphabetically and then turned into query string format.

Append the header values for the timestamp and receive window to the above
generated string in the format `&timestamp=<timestamp>&window=<window>`. If no
`X-Window` header is passed the default value of `5000` still needs to be added
to the signing string.

`&timestamp=<timestamp>&window=<window>``X-Window``5000`

Each request also has an instruction type, valid instructions are:

```
accountQuery
balanceQuery
borrowLendExecute
borrowHistoryQueryAll
collateralQuery
depositAddressQuery
depositQueryAll
fillHistoryQueryAll
fundingHistoryQueryAll
interestHistoryQueryAll
orderCancel
orderCancelAll
orderExecute
orderHistoryQueryAll
orderQuery
orderQueryAll
pnlHistoryQueryAll
positionHistoryQueryAll
positionQuery
quoteSubmit
strategyCancel
strategyCancelAll
strategyCreate
strategyHistoryQueryAll
strategyQuery
strategyQueryAll
withdraw
withdrawalQueryAll
```

`accountQuery balanceQuery borrowLendExecute borrowHistoryQueryAll collateralQuery depositAddressQuery depositQueryAll fillHistoryQueryAll fundingHistoryQueryAll interestHistoryQueryAll orderCancel orderCancelAll orderExecute orderHistoryQueryAll orderQuery orderQueryAll pnlHistoryQueryAll positionHistoryQueryAll positionQuery quoteSubmit strategyCancel strategyCancelAll strategyCreate strategyHistoryQueryAll strategyQuery strategyQueryAll withdraw withdrawalQueryAll`

The correct instruction type should be prefixed to the signing string. The
instruction types for each request are documented alongside the request.

For example, an API request to cancel an order with the following body:

```json
{
    "orderId": 28
    "symbol": "BTC_USDT",
}
```

`{ "orderId": 28 "symbol": "BTC_USDT", }`

Would require the following to be signed:

```text
instruction=orderCancel&orderId=28&symbol=BTC_USDT&timestamp=1614550000000&window=5000
```

`instruction=orderCancel&orderId=28&symbol=BTC_USDT&timestamp=1614550000000&window=5000`

Regarding batch order execution (`POST /orders`), for each order in the batch,
the order parameters should be ordered alphabetically and then turned into query
string format. The orderExecute instruction should then be prefixed to that
string. The query strings for the orders should be concatenated with `&` and the
timestamp and window appended at the end.

`POST /orders``&`

For example, an API request for an order execution batch with the following
body:

```json
[
  {
    "symbol": "SOL_USDC_PERP",
    "side": "Bid",
    "orderType": "Limit",
    "price": "141",
    "quantity": "12"
  },
  {
    "symbol": "SOL_USDC_PERP",
    "side": "Bid",
    "orderType": "Limit",
    "price": "140",
    "quantity": "11"
  }
]
```

`[ { "symbol": "SOL_USDC_PERP", "side": "Bid", "orderType": "Limit", "price": "141", "quantity": "12" }, { "symbol": "SOL_USDC_PERP", "side": "Bid", "orderType": "Limit", "price": "140", "quantity": "11" } ]`

Would require the following to be signed:

```text
instruction=orderExecute&orderType=Limit&price=141&quantity=12&side=Bid&symbol=SOL_USDC_PERP&instruction=orderExecute&orderType=Limit&price=140&quantity=11&side=Bid&symbol=SOL_USDC_PERP&timestamp=1750793021519&window=5000
```

`instruction=orderExecute&orderType=Limit&price=141&quantity=12&side=Bid&symbol=SOL_USDC_PERP&instruction=orderExecute&orderType=Limit&price=140&quantity=11&side=Bid&symbol=SOL_USDC_PERP&timestamp=1750793021519&window=5000`

If the API endpoint requires query parameters instead of a request body, the
same procedure should be used on the query parameters. If the API endpoint does
not have a request body or query parameters, only the timestamp and receive
window need to be signed.

This message should be signed using the private key of the ED25519 keypair that
corresponds to the public key in the `X-API-Key` header. The signature should
then be base64 encoded and submitted in the `X-Signature` header.

`X-API-Key``X-Signature`
