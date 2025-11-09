### Overview

The API request may be tampered during internet, therefore all private API must be signed by your API Key (Secrete Key).

Each API Key has permission property, please check the API permission, and make sure your API key has proper permission.

A valid request consists of below parts:

-   API Path: for example api.huobi.pro/v1/order/orders
-   API Access Key: The 'Access Key' in your API Key
-   Signature Method: The first one is for users to use the elliptic curve digital signature algorithm, using Ed25519. ‌The second, hash-based protocol for user-computed signatures, uses HmacSHA256.
-   Ed25519 introduction: It is a high-performance digital signature algorithm that provides fast signature verification and generation while having high security.
-   Signature Version: The version for the signature protocol, it uses **2**
-   Timestamp: The UTC time when the request is sent, e.g. 2017-05-11T16:22:06. It is useful to prevent the request to be intercepted by third-party.
-   Parameters: Each API Method has a group of parameters, you can refer to detailed document for each of them.
    -   For GET request, all the parameters must be signed.
    -   For POST request, the parameters needn't be signed and they should be put in request body.
-   Signature: The value after signed, it is guarantee the signature is valid and the request is not be tempered.

### Ed25519 Signature Method

The signature may be different if the request text is different, therefore the request should be normalized before signing. Below signing steps take the order query as an example:

This is a full URL to query one order:

`[https://api.huobi.pro/v1/order/orders](https://api.huobi.pro/v1/order/orders)?`

`AccessKeyId=e2xxxxxx-99xxxxxx-84xxxxxx-7xxxx`

`&SignatureMethod=Ed25519`

`&SignatureVersion=2`

`&Timestamp=2017-05-11T15:19:30`

`&order-id=1234567890`

**1\. The request Method (GET or POST, WebSocket use GET), append line break "\\n"**

`GET\n`

**2\. The host with lower case, append line break "\\n"**

Example:`api.huobi.pro\n`

**3\. The path, append line break "\\n"**

For example, query orders:

`/v1/order/orders\n`

For example, WebSocket v2

`/ws/v2`

**4\. The parameters are URL encoded, and ordered based on ASCII**

For example below is the original parameters:

`AccessKeyId=e2xxxxxx-99xxxxxx-84xxxxxx-7xxxx`

`order-id=1234567890`

`SignatureMethod=Ed25519`

`SignatureVersion=2`

`Timestamp=2017-05-11T15%3A19%3A30`

Use UTF-8 encoding and URL encoded, the hex must be upper case. For example, The semicolon ':' should be encoded as '%3A', The space should be encoded as '%20'.The 'timestamp' should be formated as 'YYYY-MM-DDThh:mm:ss' and URL encoded. The value is valid within 5 minutes.

Then above parameter should be ordered like below:

`AccessKeyId=e2xxxxxx-99xxxxxx-84xxxxxx-7xxxx`

`SignatureMethod=Ed25519`

`SignatureVersion=2`

`Timestamp=2017-05-11T15%3A19%3A30`

`order-id=1234567890`

**5\. Use char "&" to concatenate all parameters**

`AccessKeyId=e2xxxxxx-99xxxxxx-84xxxxxx-7xxxx&SignatureMethod=Ed25519&SignatureVersion=2&Timestamp=2017-05-11T15%3A19%3A30&order-id=1234567890`

**6\. Assemble the pre-signed text**

`GET\n`

`api.huobi.pro\n`

`/v1/order/orders\n`

`AccessKeyId=e2xxxxxx-99xxxxxx-84xxxxxx-7xxxx&SignatureMethod=HmacSHA256&SignatureVersion=2&Timestamp=2017-05-11T15%3A19%3A30&order-id=1234567890`

**7\. Use the pre-signed text and your Secret Key to generate a signature**

-   Use the request string obtained in the previous step to generate the private key of Ed25519 and add it to generate a signature.
-   Encode the generated signature with base-64, and the resulting value is used as the digital signature of this interface call.

`4F65x5A2bLyMWVQj3Aqp+B4w+ivaA7n5Oi2SuYtCJ9o=`

**8\. Put the signature into request URL**

For Rest interface:

1.  Put all the parameters in the URL
2.  Encode signature by URL encoding and append in the URL with parameter name "Signature".

Finally, the request sent to API should be:

`https://api.huobi.pro/v1/order/orders?AccessKeyId=e2xxxxxx-99xxxxxx-84xxxxxx-7xxxx&order-id=1234567890&SignatureMethod=Ed25519&SignatureVersion=2&Timestamp=2017-05-11T15%3A19%3A30&Signature=4F65x5A2bLyMWVQj3Aqp%2BB4w%2BivaA7n5Oi2SuYtCJ9o%3D`

For WebSocket interface:

1.  Fill the value according to required JSON schema
2.  The value in JSON doesn't require URL encode

For example:

`{ "action": "req", "ch": "auth", "params": { "authType":"api", "accessKey": "e2xxxxxx-99xxxxxx-84xxxxxx-7xxxx", "signatureMethod": "Ed25519", "signatureVersion": "2.1", "timestamp": "2019-09-01T18:16:16", "signature": "4F65x5A2bLyMWVQj3Aqp+B4w+ivaA7n5Oi2SuYtCJ9o=" }}`

### `HmacSHA256` Signature Method

The signature may be different if the request text is different, therefore the request should be normalized before signing. Below signing steps take the order query as an example:

This is a full URL to query one order:

`[https://api.huobi.pro/v1/order/orders](https://api.huobi.pro/v1/order/orders)?`

`AccessKeyId=e2xxxxxx-99xxxxxx-84xxxxxx-7xxxx`

`&SignatureMethod=HmacSHA256`

`&SignatureVersion=2`

`&Timestamp=2017-05-11T15:19:30`

`&order-id=1234567890`

**1\. The request Method (GET or POST, WebSocket use GET), append line break "\\n"**

`GET\n`

**2\. The host with lower case, append line break "\\n"**

Example:`api.huobi.pro\n`

**3\. The path, append line break "\\n"**

For example, query orders:

`/v1/order/orders\n`

For example, WebSocket v2

`/ws/v2`

**4\. The parameters are URL encoded, and ordered based on ASCII**

For example below is the original parameters:

`AccessKeyId=e2xxxxxx-99xxxxxx-84xxxxxx-7xxxx`

`order-id=1234567890`

`SignatureMethod=HmacSHA256`

`SignatureVersion=2`

`Timestamp=2017-05-11T15%3A19%3A30`

Use UTF-8 encoding and URL encoded, the hex must be upper case. For example, The semicolon ':' should be encoded as '%3A', The space should be encoded as '%20'.The 'timestamp' should be formated as 'YYYY-MM-DDThh:mm:ss' and URL encoded. The value is valid within 5 minutes.

Then above parameter should be ordered like below:

`AccessKeyId=e2xxxxxx-99xxxxxx-84xxxxxx-7xxxx`

`SignatureMethod=HmacSHA256`

`SignatureVersion=2`

`Timestamp=2017-05-11T15%3A19%3A30`

`order-id=1234567890`

**5\. Use char "&" to concatenate all parameters**

`AccessKeyId=e2xxxxxx-99xxxxxx-84xxxxxx-7xxxx&SignatureMethod=HmacSHA256&SignatureVersion=2&Timestamp=2017-05-11T15%3A19%3A30&order-id=1234567890`

**6\. Assemble the pre-signed text**

`GET\n`

`api.huobi.pro\n`

`/v1/order/orders\n`

`AccessKeyId=e2xxxxxx-99xxxxxx-84xxxxxx-7xxxx&SignatureMethod=HmacSHA256&SignatureVersion=2&Timestamp=2017-05-11T15%3A19%3A30&order-id=1234567890`

**7\. Use the pre-signed text and your Secret Key to generate a signature**

-   Use the pre-signed text in step 6 and your API Secret Key to generate hash code by HmacSHA256 hash function.
-   Encode the hash code with base-64 to generate the signature.

`4F65x5A2bLyMWVQj3Aqp+B4w+ivaA7n5Oi2SuYtCJ9o=`

**8\. Put the signature into request URL**

For Rest interface:

1.  Put all the parameters in the URL
2.  Encode signature by URL encoding and append in the URL with parameter name "Signature".

Finally, the request sent to API should be:

`[https://api.huobi.pro/v1/order/orders?AccessKeyId=e2xxxxxx-99xxxxxx-84xxxxxx-7xxxx&order-id=1234567890&SignatureMethod=HmacSHA256&SignatureVersion=2&Timestamp=2017-05-11T15%3A19%3A30&Signature=4F65x5A2bLyMWVQj3Aqp%2BB4w%2BivaA7n5Oi2SuYtCJ9o%3D](https://api.huobi.pro/v1/order/orders?AccessKeyId=e2xxxxxx-99xxxxxx-84xxxxxx-7xxxx&order-id=1234567890&SignatureMethod=HmacSHA256&SignatureVersion=2&Timestamp=2017-05-11T15%3A19%3A30&Signature=4F65x5A2bLyMWVQj3Aqp%2BB4w%2BivaA7n5Oi2SuYtCJ9o%3D)`

For WebSocket interface:

1.  Fill the value according to required JSON schema
2.  The value in JSON doesn't require URL encode

For example:

`{ "action": "req", "ch": "auth", "params": { "authType":"api", "accessKey": "e2xxxxxx-99xxxxxx-84xxxxxx-7xxxx", "signatureMethod": "HmacSHA256", "signatureVersion": "2.1", "timestamp": "2019-09-01T18:16:16", "signature": "4F65x5A2bLyMWVQj3Aqp+B4w+ivaA7n5Oi2SuYtCJ9o=" }}`