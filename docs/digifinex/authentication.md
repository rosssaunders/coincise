# Authentication

## Signature Authentication & Verification

You could create API Key in "Account - API setting".

API Key consists of the following two parts.

"Access Key", the Key used to visit API.

"Secret Key", the Key used to do Signature authentication and verification
(visible during application period).

**Both Access Key and Secret Key are closely related with account security,
please do not disclose them to others for any reasons anytime.**

### API Endpoints Description:

The field contentType in request header should be:
application/x-www-form-urlencoded

- The parameters can be passed in query string or request body, priority in
  query string if passed in both.
- All endpoints are classified as two ranks:

public Public endpoints, no signature or timestamp needed

private Private endpoints, need signature and timestamp

- All sign required endpoints must be requested with header:

  ACCESS-KEY User's API-KEY

  ACCESS-SIGN Signature

  ACCESS-TIMESTAMP Timestamp in seconds

- The request will be considered invalid if the timestamp passed to server was
  behind more than 5 seconds (the time window can be customized with
  ACCESS-RECV-WINDOW parameter in the request header). Also, any request with
  timestamp ahead of server more than 1 second would be considered invalid.
- For all the request will cosume server resources, there is a weight for every
  endpoint base on load balance considerations. Sum of weights for any
  \[IP|API-KEY|User\] must not exceed 1200, or the \[IP|API-KEY|User\] will be
  banned for 2 minutes for the first 3 times within 24 hours, 10 minutes if
  exceed more than 3 times, 30 times if exceed more than 6 times.

### Signature Algorithm

- The HMAC SHA256 is used for signature.
- The API-Secret of specific API-KEY will be the secret key of HMAC SHA256,
  other parameters as the HMAC SHA256 encrypting object, the outcome string is
  the signature.
- The signature is not case sensitive.
- When query string and request body are both passed with parameters, the input
  of HMAC SHA256 must be composed with query string and request body concat with
  '&' and the query string must be in front.
- The signature of specific ACCESS-KEY must be passed in the request header by
  ACCESS-SIGN parameter.

## Authentication

### Overview

The API request may be tampered during internet, therefore all private API must
be signed by your API Key (Secrete Key).

Each API Key has permission property, please check the API permission, and make
sure your API key has proper permission.

Signature Method：

The signature may be different if the request text is different, therefore the
request should be normalized before signing. Below signing steps take the Create
New Order as an example:

1.  Create new order Parameters.

`{'symbol': 'trx_usdt', 'price': 0.01, 'amount': 1, 'type': 'buy'}`

1.  The parameters are URL encoded, and ordered based on ASCII

`symbol=trx_usdt&price=0.01&amount=1&type=buy`

1.  Use the pre-signed text and your Secret Key to generate a
    signature（Example: Secret:01234567890123456789abcd）:

`7e2d0636cab21fd41c828b8c6ce8f77e643febecdeaeab0771c01dc4d7dbef38`

1.  Put ACCESS-KEY，ACCESS-TIMESTAMP，ACCESS-SIGN（Get last step） into header.

`{'ACCESS-KEY': '0123456789abcd', 'ACCESS-TIMESTAMP': '1589872188', 'ACCESS-SIGN': '7e2d0636cab21fd41c828b8c6ce8f77e643febecdeaeab0771c01dc4d7dbef38'}`

1.  Request Create new order url.

`Method: Post`

`url: https://openapi.digifinex.com/v3/spot/order/new`

`headers: {'ACCESS-KEY': '0123456789abcd', 'ACCESS-TIMESTAMP': '1589872188', 'ACCESS-SIGN': '7e2d0636cab21fd41c828b8c6ce8f77e643febecdeaeab0771c01dc4d7dbef38'}`

`body: {'symbol': 'trx_usdt', 'price': 0.01, 'amount': 1, 'type': 'buy'}`
