# BingX Coin-Futures API - Authentication

## Authentication

### Generate an API Key

- Before being able to sign any requests, you must create an API Key at the API
  Management page on[BingX](https://bingx.com)Upon creating a key you will have
  2 pieces of information which you should remember:API key and Secret key.
- While setting the API key, it is recommended to set the IP access whitelist
  for security reasons
- Never tell anyone your API key/Secret key

If the API key is accidentally leaked, please delete it immediately and produce
a new API key

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/cswap/authentication.html#Generate
> an API
> Key](https://bingx-api.github.io/docs/#/en-us/cswap/authentication.html#Generate
> an API Key)

### Permission Settings

- The default permission for newly created APIs is read-only.
- If you need to perform write operations such as placing an order through the
  API, you need to modify it to the corresponding permission on the UI.

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/cswap/authentication.html#Permission
> Settings](https://bingx-api.github.io/docs/#/en-us/cswap/authentication.html#Permission
> Settings)

### Make Requests

All private REST requests must contain the following parameters:

- Pass the API Key with X-BX-APIKEY on the request header.
- The request parameter carries the signature obtained by using the signature
  algorithm.
- timestamp is the timestamp of your request, in milliseconds. When the server
  receives the request, it will judge the timestamp in the request. If it is
  sent before 5000 milliseconds, the request will be considered invalid. This
  time window value can be defined by sending the optional parameter recvWindow.

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/cswap/authentication.html#Make
> Requests](https://bingx-api.github.io/docs/#/en-us/cswap/authentication.html#Make
> Requests)

### Signature Description

signatureRequest parameter by using HMAC SHA256 encode

for example

- api parameters

symbol=BTC-USDT

timestamp=1696751141337

recvWindow=0

- api information

apiKey =
hO6oQotzTE0S5FRYze2Jx2wGx7eVnJGMolpA1nZyehsoMgCcgKNWQHd4QgTFZuwl4Zt4xMe2PqGBegWXO4A

secretKey =
mheO6dR8ovSsxZQCOYEFCtelpuxcWGTfHw7te326y6jOwq5WpvFQ9JNljoTwBXZGv5It07m9RXSPpDQEK2w

- Example of sending parameters through query string

1\. Splice all api parameters (without sorting)

recvWindow=0&symbol=BTC-USDT&timestamp=1696751141337

2\. Use secretKey to generate a signature for the concatenated parameter string:
1e63e8cfd1c04919881e60cf369e404b9b7c87d3a09bc300f1abfdcce7da57e8

echo -n "recvWindow=0&symbol=BTC-USDT&timestamp=1696751141337" | openssl dgst
-sha256 -hmac
"mheO6dR8ovSsxZQCOYEFCtelpuxcWGTfHw7te326y6jOwq5WpvFQ9JNljoTwBXZGv5It07m9RXSPpDQEK2w"
-hex

3\. Send request

Some query string scenarios (such as a='1 '&b={a:'2'}) require URL encoding for
each value of the request parameters, only for the value value, without URL
encoding for the field key, nor for the entire original parameters string. Here
is a special field: the value of timestamp does not require URL encoding. Please
refer
to[URL encoding scenario description](https://bingx-api.github.io/docs/#/swapV2/trade-api.html#Bulk%20order)

- Example of sending parameters through request body

1\. Sort and concatenate all api parameters according to (a-z) (sorting
required)

recvWindow=0&subAccountString=abc12345&timestamp=1696751141337

2\. Use secretKey to generate a signature for the concatenated parameter
string:1e63e8cfd1c04919881e60cf369e404b9b7c87d3a09bc300f1abfdcce7da57e8

echo -n "recvWindow=0&subAccountString=abc12345&timestamp=1696751141337" |
openssl dgst -sha256 -hmac
"mheO6dR8ovSsxZQCOYEFCtelpuxcWGTfHw7te326y6jOwq5WpvFQ9JNljoTwBXZGv5It07m9RXSPpDQEK2w"
-hex

3\. Combine into JSON, place the request body, and set header: 'Content Type':
'application/JSON'

{"recvWindow":0,"subAccountString":"abc12345","timestamp":1696751141337,"signature":"1e63e8cfd1c04919881e60cf369e404b9b7c87d3a09bc300f1abfdcce7da57e8"}

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/cswap/authentication.html#Signature
> Description](https://bingx-api.github.io/docs/#/en-us/cswap/authentication.html#Signature
> Description)

### Requests

Root URL for REST access: https://open-api.bingx.com

Alternate domain name: open-api.bingx.io (total frequency limit: 60/min) Release
the frequency limit of the alternate domain name only when there is a problem
with the primary domain name open-api.bingx.com

Request Description

- Request parameter: Parameter encapsulation is performed according to the api
  request parameter specification.

- Submit request parameters: Submit the encapsulated request parameters to the
  server through POST/GET/DELETE, etc.

- Server response: The server first performs parameter security verification on
  the user request data, and returns the response data to the user in JSON
  format after passing the verification according to the business logic.

- Data processing: process the server response data.

Success

- A successful response is indicated by HTTP status code 200 and may optionally
  contain a body. If the response has a body, it will be included under each
  resource below.

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/cswap/authentication.html#Requests](https://bingx-api.github.io/docs/#/en-us/cswap/authentication.html#Requests)

---
