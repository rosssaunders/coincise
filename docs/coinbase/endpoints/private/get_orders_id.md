# GET /orders/<id>.

**Source:**
[Cancel an order](https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_deleteorder)

## Authentication

Required (Private Endpoint)

Cancel a previously placed orderThe order must belong to the profile that the API key belongs to. If the order had no matches during its lifetime, its record may be purged. This means the order details is not available with `GET /orders/<id>`.

To prevent a race condition when canceling an order, it is highly recommended that you specify the product id as a query string.

## 

[​

](#api-key-permissions)

API Key Permissions

This endpoint requires the “trade” permission. Orders can be canceled using either the exchange assigned `id` or the client assigned `client_oid`. When using `client_oid` it must be preceded by the `client:` namespace.

## 

[​

](#response)

Response

A successfully cancelled order response includes:

-   the order ID if the order is cancelled with the exchange assigned `id`,
-   the client assigned `client_oid` if the order is cancelled with client order ID.

## 

[​

](#cancel-reject)

Cancel Reject

If the order could not be canceled (already filled or previously canceled, etc.), then an error response indicates the reason in the `message` field.

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

#### Path Parameters

[​

](#parameter-order-id)

order\_id

string

required

Orders may be canceled using either the exchange assigned id or the client assigned client\_oid. When using client\_oid it must be preceded by the `client:` namespace.

#### Query Parameters

[​

](#parameter-profile-id)

profile\_id

string

Cancels orders on a specific profile

[​

](#parameter-product-id)

product\_id

string

Optional product id of order

#### Response

200

application/json

the `id` of the order that was cancelled\`
