# Authentication

# Signature Instructions

Since XT needs to provide some open interfaces for third-party platforms, the
issue of **data security** needs to be considered.

Such as:

- Whether the data has been tampered with
- Whether the data is outdated
- Whether the data can be submitted repeatedly
- The access frequency of the interface

Among these, **whether data has been tampered with is the most important
issue**.

---

### Steps[​](#steps "Direct link to Steps")

1.  **Appkey & Secretkey** Apply for `appkey` and `secretkey` in the user center
    first, each user's keys are different.
2.  **Timestamp** Add `timestamp`.
    - Its value should be the **unix timestamp (milliseconds)** of the time when
      the request is sent.
    - The time of the data is calculated based on this value.

3.  **Signature** Add `signature`, its value is obtained by the signature
    algorithm rule.
4.  **RecvWindow** Add `recvwindow` (defines the valid time of the request).
    - Valid time is fixed at a certain value.
    - When a request is received, the server checks if:

      ```
      serverTime - timestamp < recvwindow
      ```

    - Any request older than **5000 ms** is invalid.
    - If the client’s timestamp is more than **1 second ahead of server time**,
      the request is invalid.

    **Note:** Online conditions are not always 100% reliable. That’s why we
    provide the `recvWindow` parameter:
    - For high-frequency trading, adjust `recvWindow` to meet timeliness needs.
    - RecvWindow longer than **5 seconds** is **not recommended**.

5.  **Algorithm** Add `algorithms` (signature method).
    - Recommended: `HmacSHA256`
    - Supported algorithms:
      - HmacMD5
      - HmacSHA1
      - HmacSHA224
      - **HmacSHA256 (recommended)**
      - HmacSHA384
      - HmacSHA512

---

### Example Parameters[​](#example-parameters "Direct link to Example Parameters")

| Name                 | Mandatory | Example                                                          | Description                                                       |
| -------------------- | --------- | ---------------------------------------------------------------- | ----------------------------------------------------------------- |
| validate-appkey      | ✅        | dbefbc809e3e83c283a984c3a1459732ea7db1360ca80c5c2c8867408d28cc83 |                                                                   |
| validate-timestamp   | ✅        | 1641446237201                                                    |                                                                   |
| validate-signature   | ✅        | 0a7d0b5e802eb5e52ac0cfcd6311b0faba6e2503a9a8d1e2364b38617877574d |                                                                   |
| validate-recvwindow  | ✅        | 5000 (millisecond)                                               |                                                                   |
| validate-algorithms  | ✅        | HmacSHA256                                                       | HmacMD5、HmacSHA1、HmacSHA224、HmacSHA256、HmacSHA384、HmacSHA512 |
| Default: HmacSHA256  |
| validate-signversion | ❌        | 1.0                                                              | Reserved, signed version number                                   |

[Edit this
page](https://github.com/facebook/docusaurus/edit/main/website/docs/spot/Access
Description/signStatement.mdx)

# Signature generation

> Take `https://sapi.xt.com/v4/order` as an example.

The following **appKey/secret** are **for demo only** (Linux bash with `echo`,
`openssl`, `curl`):

- **appKey**: `3976eb88-76d0-4f6e-a6b2-a57980770085`
- **secretKey**: `bc6630d0231fda5cd98794f52c4998659beda290`

### Required Headers[​](#required-headers "Direct link to Required Headers")

```
validate-algorithms: HmacSHA256validate-appkey: 3976eb88-76d0-4f6e-a6b2-a57980770085validate-recvwindow: 5000validate-timestamp: 1641446237201validate-signature: 2b5eb11e18796d12d88f13dc27dbbd02c2cc51ff7059765ed9821957d82bb4d9
```

### Sample Request Body[​](#sample-request-body "Direct link to Sample Request Body")

```
{  "type": "LIMIT",  "timeInForce": "GTC",  "side": "BUY",  "symbol": "btc_usdt",  "price": "39000",  "quantity": "2"}
```

---

## 1 Data Part Concatenation (`Y`)[​](#1-data-part-concatenation-y "Direct link to 1-data-part-concatenation-y")

- **method**: uppercase HTTP method, e.g. `GET`, `POST`, `DELETE`, `PUT`
- **path**: concrete RESTful path after filling variables, e.g.
  `/sign/test/bb/aa`
- **query**: sort all `key=value` by key (lexicographical), join with `&`
  example: `userName=dfdfdf&password=ggg`
- **body**:
  - **JSON**: use the **raw JSON string** (no conversion/sorting)
  - **x-www-form-urlencoded**: sort all `key=value` by key (lexicographical),
    join with `&` example: `userName=dfdfdf&password=ggg`
  - **form-data**: **not supported**
- If multiple forms exist, concatenate **in order**: `path` → `query` → `body`.

Finally, splice by `#` **with leading markers**:

```
Y = #method#path#query#body
```

**Notice**:

- query present, body empty → `Y = #method#path#query`
- query empty, body present → `Y = #method#path#body`
- both present → `Y = #method#path#query#body`

### Mini Examples[​](#mini-examples "Direct link to Mini Examples")

- **Method**: `POST`
- **Path**: `/v4/order` (recorded as `path`)
- **Query Example**: `symbol=btc_usdt` (recorded as `query`)
- **Body Examples**:
  - `x-www-form-urlencoded`
    `symbol=btc_usdt&side=BUY&type=LIMIT&timeInForce=GTC&quantity=1&price=0.1`
  - `json`
    `{"symbol":"btc_usdt","side":"BUY","type":"LIMIT","timeInForce":"GTC","quantity":2,"price":39000}`

- **Mixed (query + body/json)**
  - query: `symbol=btc_usdt&side=BUY&type=LIMIT`
  - body(json): `{"symbol":"btc_usdt","side":BUY,"type":"LIMIT"}`

---

## 2 Header Part Concatenation (`X`)[​](#2-header-part-concatenation-x "Direct link to 2-header-part-concatenation-x")

Sort the following header keys **in natural ascending alphabetical order**, then
join with `&`:

```
X = validate-algorithms=HmacSHA256&validate-appkey=3976eb88-76d0-4f6e-a6b2-a57980770085&validate-recvwindow=5000&validate-timestamp=1641446237201
```

---

## 3Generate Signature[​](#3generate-signature "Direct link to 3Generate Signature")

Concatenate **`original = X + Y`** (no delimiter beyond the `#` already in `Y`),
then compute:

```
signature = org.apache.commons.codec.digest.HmacUtils.hmacSha256Hex(secretKey, original);
```

Add the generated value to the request header:

```
validate-signature: <signature>
```

---

## 4 Complete Example[​](#4-complete-example "Direct link to 4 Complete Example")

**Sample original signature message**:

```
validate-algorithms=HmacSHA256&validate-appkey=2063495b-85ec-41b3-a810-be84ceb78751&validate-recvwindow=60000&validate-timestamp=1666026215729#POST#/v4/order#{"symbol":"XT_USDT","side":"BUY","type":"LIMIT","timeInForce":"GTC","bizType":"SPOT","price":3,"quantity":2}
```

**Sample request (cURL)**:

```
curl --location --request POST 'https://sapi.xt.com/v4/order' \  --header 'accept: */*' \  --header 'Content-Type: application/json' \  --header 'validate-algorithms: HmacSHA256' \  --header 'validate-appkey: 10c172ca-d791-4da5-91cd-e74d202dac96' \  --header 'validate-recvwindow: 60000' \  --header 'validate-timestamp: 1666026215729' \  --header 'validate-signature: 4cb36e820f50d2e353e5e0a182dc4a955b1c26efcb4b513d81eec31dd36072ba' \  --data-raw '{"symbol":"XT_USDT","side":"BUY","type":"LIMIT","timeInForce":"GTC","bizType":"SPOT","price":3,"quantity":2}'
```

**Matters needing attention**

- Ensure **Content-Type**, **signature original message**, and **final request
  payload** are **consistent**.
- `validate-timestamp` should be **milliseconds** of the **send time**; pair
  with a reasonable `validate-recvwindow` to tolerate network jitter.
- When body is JSON, use the **exact raw JSON string** for signing (don’t
  reorder keys or prettify).

[Edit this
page](https://github.com/facebook/docusaurus/edit/main/website/docs/spot/Access
Description/signSteps.mdx)

# API Key Application Steps

### API Key Application[​](#api-key-application "Direct link to API Key Application")

Some interfaces may require the user's **API Key**.

How to create an API Key → please refer to the official documentation:
[How to Apply for API Trading & Create API Key](https://xtsupport.zendesk.com/hc/zh-cn/articles/900006868163-%E5%A6%82%E4%BD%95%E7%94%B3%E8%AF%B7API%E4%BA%A4%E6%98%93-%E5%A6%82%E4%BD%95%E5%88%9B%E5%BB%BAAPI%E5%AF%86%E9%92%A5-)

[Edit this
page](https://github.com/facebook/docusaurus/edit/main/website/docs/spot/Access
Description/applyApi.mdx)
