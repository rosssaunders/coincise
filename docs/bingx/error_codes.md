# Error Codes

## [Common Error Codes](#/en-us/spot/base-info.html#Common Error Codes)

#### Types:

- 4XX error codes are used to indicate wrong request content, behavior, format.

- 5XX error codes are used to indicate problems with the Bingx service.

#### Common business error codes:

- 100001 - signature verification failed#

- 100202 - Insufficient balance

- 100204 - No data

- 100400 - Invalid parameter

- 100440 - Order price deviates greatly from the market price

- 100500 - We had a problem with our server

- 100503 - Server busy

100202

- Insufficient assets
- The current system is busy, please try again later

100421

- The current system is busy, please try again later

100400

- quantity/quoteOrderQty can't both be lte 0 in limit order
- The current system is busy, please try again later
- The same order can only be submitted once per second.
- invalid symbol, send symbol like BTC-USDT
- The minimum amount per order is \*
- miss arguments

100414

- The account is abnormal, please contact customer service.

100413

- Incorrect apiKey
- Null apiKey

#### Notes:

- If it fails, there will be an error description included in the response body.

- Errors may be thrown from every interface.
