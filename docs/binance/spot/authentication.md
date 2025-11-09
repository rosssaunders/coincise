# Authentication

## Request Security

- Each method has a security type indicating required API key permissions, shown
  next to the method name (e.g.,
  [New order (TRADE)](/docs/binance-spot-api-docs/rest-api/request-security#new-order-trade)).
- If unspecified, the security type is `NONE`.
- Methods with a security type other than `NONE` are considered `SIGNED`
  requests (i.e. requires parameter `signature`). A few legacy
  [listenKey management](/docs/binance-spot-api-docs/rest-api/request-security#user-data-stream-requests)
  endpoints are an exception to this rule.
- Secure methods require a valid API key to be specified and authenticated.
  - API keys can be created on the
    [API Management](https://www.binance.com/en/support/faq/360002502072) page
    of your Binance account.
  - **Both API key and secret key are sensitive.** Never share them with anyone.
    If you notice unusual activity in your account, immediately revoke all the
    keys and contact Binance support.
- API keys can be configured to allow access only to certain types of secure
  methods.
  - For example, you can have an API key with `TRADE` permission for trading,
    while using a separate API key with `USER_DATA` permission to monitor your
    order status.
  - By default, an API key cannot `TRADE`. You need to enable trading in API
    Management first.

| Security type | Description                                                                |
| ------------- | -------------------------------------------------------------------------- |
| `NONE`        | Public market data                                                         |
| `TRADE`       | Trading on the exchange, placing and canceling orders                      |
| `USER_DATA`   | Private account information, such as order status and your trading history |
| `USER_STREAM` | Managing User Data Stream subscriptions                                    |

#### SIGNED Endpoint security

- `SIGNED` endpoints require an additional parameter, `signature`, to be sent in
  the `query string` or `request body`.
- The `signature` is **not case sensitive**.
- Please consult the
  [examples](/docs/binance-spot-api-docs/rest-api/request-security#signed-endpoint-examples-for-post-apiv3order)
  below on how to compute signature, depending on which API key type you are
  using.

#### Timing security

- `SIGNED` requests also require a `timestamp` parameter which should be the
  current timestamp either in milliseconds or microseconds. (See
  [General API Information](/docs/binance-spot-api-docs/rest-api/request-security#general-api-information))
- An additional optional parameter, `recvWindow`, specifies for how long the
  request stays valid and may only be specified in milliseconds.
  - `recvWindow` supports up to three decimal places of precision (e.g.,
    6000.346) so that microseconds may be specified.
  - If `recvWindow` is not sent, **it defaults to 5000 milliseconds**.
  - Maximum `recvWindow` is 60000 milliseconds.
- Request processing logic is as follows:

```
serverTime = getCurrentTime()if (timestamp < (serverTime + 1 second) && (serverTime - timestamp) <= recvWindow) {  // begin processing request  serverTime = getCurrentTime()  if (serverTime - timestamp) <= recvWindow {    // forward request to Matching Engine  } else {    // reject request  }  // finish processing request} else {  // reject request}
```

**Serious trading is about timing.** Networks can be unstable and unreliable,
which can lead to requests taking varying amounts of time to reach the servers.
With `recvWindow`, you can specify that the request must be processed within a
certain number of milliseconds or be rejected by the server.

**It is recommended to use a small recvWindow of 5000 or less! The max cannot go
beyond 60,000!**

#### SIGNED Endpoint Examples for POST /api/v3/order

##### HMAC Keys

Here is a step-by-step example of how to send a valid signed payload from the
Linux command line using `echo`, `openssl`, and `curl`.

| Key           | Value                                                            |
| ------------- | ---------------------------------------------------------------- |
| `apiKey`      | vmPUZE6mv9SD5VNHk4HlWFsOr6aKE2zvsw0MuIgwCIPy6utIco14y7Ju91duEh8A |
| `secretKey`   | NhqPtmdSJYdKjVHjA7PZj4Mge3R5YNiP1e3UZjInClVN65XAbvqqM6A7H5fATj0j |
| Parameter     | Value                                                            |
| ---           | ---                                                              |
| `symbol`      | LTCBTC                                                           |
| `side`        | BUY                                                              |
| `type`        | LIMIT                                                            |
| `timeInForce` | GTC                                                              |
| `quantity`    | 1                                                                |
| `price`       | 0.1                                                              |
| `recvWindow`  | 5000                                                             |
| `timestamp`   | 1499827319559                                                    |

**Example 1: As a request body**

- **requestBody:**
  symbol=LTCBTC&side=BUY&type=LIMIT&timeInForce=GTC&quantity=1&price=0.1&recvWindow=5000&timestamp=1499827319559
- **HMAC SHA256 signature:**

  ```
  [linux]$ echo -n "symbol=LTCBTC&side=BUY&type=LIMIT&timeInForce=GTC&quantity=1&price=0.1&recvWindow=5000&timestamp=1499827319559" | openssl dgst -sha256 -hmac "NhqPtmdSJYdKjVHjA7PZj4Mge3R5YNiP1e3UZjInClVN65XAbvqqM6A7H5fATj0j"(stdin)= c8db56825ae71d6d79447849e617115f4a920fa2acdcab2b053c4b2838bd6b71
  ```

- **curl command:**

  ```
  (HMAC SHA256)[linux]$ curl -H "X-MBX-APIKEY: vmPUZE6mv9SD5VNHk4HlWFsOr6aKE2zvsw0MuIgwCIPy6utIco14y7Ju91duEh8A" -X POST 'https://api.binance.com/api/v3/order' -d 'symbol=LTCBTC&side=BUY&type=LIMIT&timeInForce=GTC&quantity=1&price=0.1&recvWindow=5000&timestamp=1499827319559&signature=c8db56825ae71d6d79447849e617115f4a920fa2acdcab2b053c4b2838bd6b71'
  ```

**Example 2: As a query string**

- **queryString:**
  symbol=LTCBTC&side=BUY&type=LIMIT&timeInForce=GTC&quantity=1&price=0.1&recvWindow=5000&timestamp=1499827319559
- **HMAC SHA256 signature:**

  ```
  [linux]$ echo -n "symbol=LTCBTC&side=BUY&type=LIMIT&timeInForce=GTC&quantity=1&price=0.1&recvWindow=5000&timestamp=1499827319559" | openssl dgst -sha256 -hmac "NhqPtmdSJYdKjVHjA7PZj4Mge3R5YNiP1e3UZjInClVN65XAbvqqM6A7H5fATj0j"(stdin)= c8db56825ae71d6d79447849e617115f4a920fa2acdcab2b053c4b2838bd6b71
  ```

- **curl command:**

  ```
  (HMAC SHA256)[linux]$ curl -H "X-MBX-APIKEY: vmPUZE6mv9SD5VNHk4HlWFsOr6aKE2zvsw0MuIgwCIPy6utIco14y7Ju91duEh8A" -X POST 'https://api.binance.com/api/v3/order?symbol=LTCBTC&side=BUY&type=LIMIT&timeInForce=GTC&quantity=1&price=0.1&recvWindow=5000&timestamp=1499827319559&signature=c8db56825ae71d6d79447849e617115f4a920fa2acdcab2b053c4b2838bd6b71'
  ```

**Example 3: Mixed query string and request body**

- **queryString:** symbol=LTCBTC&side=BUY&type=LIMIT&timeInForce=GTC
- **requestBody:** quantity=1&price=0.1&recvWindow=5000&timestamp=1499827319559
- **HMAC SHA256 signature:**

  ```
  [linux]$ echo -n "symbol=LTCBTC&side=BUY&type=LIMIT&timeInForce=GTCquantity=1&price=0.1&recvWindow=5000&timestamp=1499827319559" | openssl dgst -sha256 -hmac "NhqPtmdSJYdKjVHjA7PZj4Mge3R5YNiP1e3UZjInClVN65XAbvqqM6A7H5fATj0j"(stdin)= 0fd168b8ddb4876a0358a8d14d0c9f3da0e9b20c5d52b2a00fcf7d1c602f9a77
  ```

- **curl command:**

  ```
  (HMAC SHA256)[linux]$ curl -H "X-MBX-APIKEY: vmPUZE6mv9SD5VNHk4HlWFsOr6aKE2zvsw0MuIgwCIPy6utIco14y7Ju91duEh8A" -X POST 'https://api.binance.com/api/v3/order?symbol=LTCBTC&side=BUY&type=LIMIT&timeInForce=GTC' -d 'quantity=1&price=0.1&recvWindow=5000&timestamp=1499827319559&signature=0fd168b8ddb4876a0358a8d14d0c9f3da0e9b20c5d52b2a00fcf7d1c602f9a77'
  ```

Note that the signature is different in example 3. There is no & between "GTC"
and "quantity=1".

##### RSA Keys

This will be a step by step process how to create the signature payload to send
a valid signed payload.

We support `PKCS#8` currently.

To get your API key, you need to upload your RSA Public Key to your account and
a corresponding API key will be provided for you.

For this example, the private key will be referenced as `./test-prv-key.pem`

| Key           | Value                                                            |
| ------------- | ---------------------------------------------------------------- |
| `apiKey`      | CAvIjXy3F44yW6Pou5k8Dy1swsYDWJZLeoK2r8G4cFDnE9nosRppc2eKc1T8TRTQ |
| Parameter     | Value                                                            |
| ---           | ---                                                              |
| `symbol`      | BTCUSDT                                                          |
| `side`        | SELL                                                             |
| `type`        | LIMIT                                                            |
| `timeInForce` | GTC                                                              |
| `quantity`    | 1                                                                |
| `price`       | 0.2                                                              |
| `timestamp`   | 1668481559918                                                    |
| `recvWindow`  | 5000                                                             |

**Step 1: Construct the payload**

Arrange the list of parameters into a string. Separate each parameter with a
`&`.

For the parameters above, the signature payload would look like this:

```
symbol=BTCUSDT&side=SELL&type=LIMIT&timeInForce=GTC&quantity=1&price=0.2&timestamp=1668481559918&recvWindow=5000
```

**Step 2: Compute the signature:**

1.  Encode signature payload as ASCII data.
2.  Sign payload using RSASSA-PKCS1-v1_5 algorithm with SHA-256 hash function.

```
$ echo -n 'symbol=BTCUSDT&side=SELL&type=LIMIT&timeInForce=GTC&quantity=1&price=0.2&timestamp=1668481559918&recvWindow=5000' | openssl dgst -sha256 -sign ./test-prv-key.pem
```

3.  Encode output as base64 string.

```
$  echo -n 'symbol=BTCUSDT&side=SELL&type=LIMIT&timeInForce=GTC&quantity=1&price=0.2&timestamp=1668481559918&recvWindow=5000' | openssl dgst -sha256 -sign ./test-prv-key.pem | openssl enc -base64 -AHZ8HOjiJ1s/igS9JA+n7+7Ti/ihtkRF5BIWcPIEluJP6tlbFM/Bf44LfZka/iemtahZAZzcO9TnI5uaXh3++lrqtNonCwp6/245UFWkiW1elpgtVAmJPbogcAv6rSlokztAfWk296ZJXzRDYAtzGH0gq7CgSJKfH+XxaCmR0WcvlKjNQnp12/eKXJYO4tDap8UCBLuyxDnR7oJKLHQHJLP0r0EAVOOSIbrFang/1WOq+Jaq4Efc4XpnTgnwlBbWTmhWDR1pvS9iVEzcSYLHT/fNnMRxFc7u+j3qI//5yuGuu14KR0MuQKKCSpViieD+fIti46sxPTsjSemoUKp0oXA==
```

4.  Since the signature may contain `/` and `=`, this could cause issues with
    sending the request. So the signature has to be URL encoded.

```
HZ8HOjiJ1s%2FigS9JA%2Bn7%2B7Ti%2FihtkRF5BIWcPIEluJP6tlbFM%2FBf44LfZka%2FiemtahZAZzcO9TnI5uaXh3%2B%2BlrqtNonCwp6%2F245UFWkiW1elpgtVAmJPbogcAv6rSlokztAfWk296ZJXzRDYAtzGH0gq7CgSJKfH%2BXxaCmR0WcvlKjNQnp12%2FeKXJYO4tDap8UCBLuyxDnR7oJKLHQHJLP0r0EAVOOSIbrFang%2F1WOq%2BJaq4Efc4XpnTgnwlBbWTmhWDR1pvS9iVEzcSYLHT%2FfNnMRxFc7u%2Bj3qI%2F%2F5yuGuu14KR0MuQKKCSpViieD%2BfIti46sxPTsjSemoUKp0oXA%3D%3D
```

5.  The curl command:

```
curl -H "X-MBX-APIKEY: CAvIjXy3F44yW6Pou5k8Dy1swsYDWJZLeoK2r8G4cFDnE9nosRppc2eKc1T8TRTQ" -X POST 'https://api.binance.com/api/v3/order?symbol=BTCUSDT&side=SELL&type=LIMIT&timeInForce=GTC&quantity=1&price=0.2&timestamp=1668481559918&recvWindow=5000&signature=HZ8HOjiJ1s%2FigS9JA%2Bn7%2B7Ti%2FihtkRF5BIWcPIEluJP6tlbFM%2FBf44LfZka%2FiemtahZAZzcO9TnI5uaXh3%2B%2BlrqtNonCwp6%2F245UFWkiW1elpgtVAmJPbogcAv6rSlokztAfWk296ZJXzRDYAtzGH0gq7CgSJKfH%2BXxaCmR0WcvlKjNQnp12%2FeKXJYO4tDap8UCBLuyxDnR7oJKLHQHJLP0r0EAVOOSIbrFang%2F1WOq%2BJaq4Efc4XpnTgnwlBbWTmhWDR1pvS9iVEzcSYLHT%2FfNnMRxFc7u%2Bj3qI%2F%2F5yuGuu14KR0MuQKKCSpViieD%2BfIti46sxPTsjSemoUKp0oXA%3D%3D'
```

A sample Bash script below does the similar steps said above.

```
API_KEY="put your own API Key here"PRIVATE_KEY_PATH="test-prv-key.pem"# Set up the request:API_METHOD="POST"API_CALL="api/v3/order"API_PARAMS="symbol=BTCUSDT&side=SELL&type=LIMIT&timeInForce=GTC&quantity=1&price=0.2"# Sign the request:timestamp=$(date +%s000)api_params_with_timestamp="$API_PARAMS&timestamp=$timestamp"signature=$(echo -n "$api_params_with_timestamp" \            | openssl dgst -sha256 -sign "$PRIVATE_KEY_PATH" \            | openssl enc -base64 -A)# Send the request:curl -H "X-MBX-APIKEY: $API_KEY" -X "$API_METHOD" \    "https://api.binance.com/$API_CALL?$api_params_with_timestamp" \    --data-urlencode "signature=$signature"
```

##### Ed25519 Keys

**Note: It is highly recommended to use Ed25519 API keys as it should provide
the best performance and security out of all supported key types.**

| Parameter     | Value         |
| ------------- | ------------- |
| `symbol`      | BTCUSDT       |
| `side`        | SELL          |
| `type`        | LIMIT         |
| `timeInForce` | GTC           |
| `quantity`    | 1             |
| `price`       | 0.2           |
| `timestamp`   | 1668481559918 |

This is a sample code in Python to show how to sign the payload with an Ed25519
key.

```
#!/usr/bin/env python3import base64import requestsimport timefrom cryptography.hazmat.primitives.serialization import load_pem_private_key# Set up authenticationAPI_KEY='put your own API Key here'PRIVATE_KEY_PATH='test-prv-key.pem'# Load the private key.# In this example the key is expected to be stored without encryption,# but we recommend using a strong password for improved security.with open(PRIVATE_KEY_PATH, 'rb') as f:    private_key = load_pem_private_key(data=f.read(),                                       password=None)# Set up the request parametersparams = {    'symbol':       'BTCUSDT',    'side':         'SELL',    'type':         'LIMIT',    'timeInForce':  'GTC',    'quantity':     '1.0000000',    'price':        '0.20',}# Timestamp the requesttimestamp = int(time.time() * 1000) # UNIX timestamp in millisecondsparams['timestamp'] = timestamp# Sign the requestpayload = '&'.join([f'{param}={value}' for param, value in params.items()])signature = base64.b64encode(private_key.sign(payload.encode('ASCII')))params['signature'] = signature# Send the requestheaders = {    'X-MBX-APIKEY': API_KEY,}response = requests.post(    'https://api.binance.com/api/v3/order',    headers=headers,    data=params,)print(response.json())
```

> Source:
> [https://developers.binance.com/docs/binance-spot-api-docs/rest-api/request-security](https://developers.binance.com/docs/binance-spot-api-docs/rest-api/request-security)
