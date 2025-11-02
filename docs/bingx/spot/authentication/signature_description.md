## Signature Description

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
> [https://bingx-api.github.io/docs/#/en-us/spot/authentication.html](https://bingx-api.github.io/docs/#/en-us/spot/authentication.html)
