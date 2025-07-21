# Coinbase Exchange API Documentation

## Table of Contents

- [Cancel all orders](#cancel-all-orders)

---

# Cancel all orders

Copy page

With best effort, cancel all open orders. This may require you to make the
request multiple times until all of the open orders are deleted.

DELETE

/

orders

Cancel all orders

cURL

Copy

Ask AI

```
curl --request DELETE \
  --url https://api.exchange.coinbase.com/orders \
  --header 'cb-access-key: <api-key>' \
  --header 'cb-access-passphrase: <api-key>' \
  --header 'cb-access-sign: <api-key>' \
  --header 'cb-access-timestamp: <api-key>'
```

200

401

500

Copy

Ask AI

```
[
  "<string>"
]
```

##

[​

](#api-key-permissions)

API Key Permissions

This endpoint requires the “trade” permission.

##

[​

](#examples)

Examples

| Example                      | Response                                 |
| ---------------------------- | ---------------------------------------- |
| `/orders?product_id=FOO-BAR` | (404) ProductNotFound                    |
| `/orders?product_id=BtC-uSd` | (200) Cancel all orders for BTC-USD      |
| `/orders?Product_id=BTC-USD` | (400) Return BadRequest Error            |
| `/orders`                    | (200) Cancel all orders for all products |

#### Authorizations

[​

](#authorization-cb-access-key)

cb-access-key

string

header

required

[​

](#authorization-cb-access-passphrase)

cb-access-passphrase

string

header

required

[​

](#authorization-cb-access-sign)

cb-access-sign

string

header

required

[​

](#authorization-cb-access-timestamp)

cb-access-timestamp

string

header

required

#### Query Parameters

[​

](#parameter-profile-id)

profile_id

string

Cancels orders on a specific profile

[​

](#parameter-product-id)

product_id

string

Cancels orders on a specific product only

#### Response

200

200401500

application/json

A list of the `id`s of open orders that were successfully cancelled

Was this page helpful?

YesNo

[

Repay loan principal

Previous

](/api-reference/exchange-api/rest-api/loan/repay-loan-principal)[

Cancel an order

Next

](/api-reference/exchange-api/rest-api/orders/cancel-an-order)

[Coinbase home page](/)

[x](https://x.com/coinbasedev)[github](https://github.com/coinbase)[linkedin](https://www.linkedin.com/company/coinbasedeveloperplatform)

[Join CDP Discord](https://discord.com/invite/cdp)[Status](https://cdpstatus.coinbase.com/)[Privacy Policy](https://www.coinbase.com/legal/privacy)

[x](https://x.com/coinbasedev)[github](https://github.com/coinbase)[linkedin](https://www.linkedin.com/company/coinbasedeveloperplatform)

[x](https://x.com/coinbasedev)[github](https://github.com/coinbase)[linkedin](https://www.linkedin.com/company/coinbasedeveloperplatform)

Assistant

This is an AI generated summary and may contain mistakes. It is not intended to
give advice, including legal, financial or tax advice. It does not have access
to your account information. By using this AI-assistant, you agree to the
[CDP ToS](https://www.coinbase.com/legal/developer-platform/terms-of-service).

---
