# Public REST API Endpoints

## Integration guide

## Access to url

> general data structures

```
{
  "success": true,
  "code": 0,
  "data": {
    "symbol": "BTC_USD",
    "fairPrice": 8000,
    "timestamp": 1587442022003
  }
} 
```

> or

```
{
  "success": false,
  "code":500,
  "message": "System internal error!"
}
```

*   https://contract.mexc.com

The corresponding API accepts a request of Type GET, POST, or DELETE. The content-type of POST request is: application/JSON.

Parameters are sent in JSON format (parameter naming rules are camel named), and get requests are sent in requestParam (parameter naming rules are '\_' delimited)

## Authentication method

> java example

```
/**
 * Gets the get request parameter string
 *
 * @param param get/delete Request parameters map
 * @return
 */
public static String getRequestParamString(Map<String, String> param) {
    if (MapUtils.isEmpty(param)) {
        return "";
    }
    StringBuilder sb = new StringBuilder(1024);
    SortedMap<String, String> map = new TreeMap<>(param);
    for (Map.Entry<String, String> entry : map.entrySet()) {
        String key = entry.getKey();
        String value = StringUtils.isBlank(entry.getValue()) ? "" : entry.getValue();
        sb.append(key).append('=').append(urlEncode(value)).append('&');
    }
    sb.deleteCharAt(sb.length() - 1);
    return sb.toString();
}

public static String urlEncode(String s) {
    try {
        return URLEncoder.encode(s, "UTF-8").replaceAll("\\+", "%20");
    } catch (UnsupportedEncodingException e) {
        throw new IllegalArgumentException("UTF-8 encoding not supported!");
    }
}

/**
 * signature
 */
public static String sign(SignVo signVo) {
    if (signVo.getRequestParam() == null) {
        signVo.setRequestParam("");
    }
    String str = signVo.getAccessKey() + signVo.getReqTime() + signVo.getRequestParam();
    return actualSignature(str, signVo.getSecretKey());
}

public static String actualSignature(String inputStr, String key) {
    Mac hmacSha256;
    try {
        hmacSha256 = Mac.getInstance("HmacSHA256");
        SecretKeySpec secKey =
                new SecretKeySpec(key.getBytes(StandardCharsets.UTF_8), "HmacSHA256");
        hmacSha256.init(secKey);
    } catch (NoSuchAlgorithmException e) {
        throw new RuntimeException("No such algorithm: " + e.getMessage());
    } catch (InvalidKeyException e) {
        throw new RuntimeException("Invalid key: " + e.getMessage());
    }
    byte[] hash = hmacSha256.doFinal(inputStr.getBytes(StandardCharsets.UTF_8));
    return Hex.encodeHexString(hash);
}

@Getter
@Setter
public static class SignVo {
    private String reqTime;
    private String accessKey;
    private String secretKey;
    private String requestParam; //get the request parameters are sorted in dictionary order, with & concatenated strings, POST should be a JSON string
}
```

1.  Signature is not required for public endpoint.
    
2.  For private endpoint, ApiKey, Request-Time, Signature and Content-Type need to be passed into the header, must be specified as application / JSON, Recv-Window (optional) parameters, Signature is a signature string. The signature rules are as follows:
    

1) When signing, you need to get the request parameter string first. It is "" if there is no parameter:

For GET/DELETE requests, the service parameters are spliced in dictionary order with & interval, and finally the signature target string is obtained (in the API of batch operation, if there are special symbols such as comma in the parameter value, these symbols need to be URL encoded when signing).

For POST requests, the signature parameter is a JSON string (dictionary sorting is not required).

2) After obtaining the parameter string, the signature target string is spliced. The rule is: accessKey + timestamp + obtained parameter string.

3) The HMAC SHA256 algorithm is used to sign the target string, and finally the signature is passed into the header as a parameter.

Note：

1) When the service parameter participating in the signature is null, it does not participate in the signature. For the path parameter, it does not participate in the signature; note that when get request stitches the parameter and pass it in the URL, if the parameter is null, it will be parsed into "" in the background parsing, fixed post request, when the parameter is null, do not pass the parameter, or set the value of the parameter to "" when signing, otherwise signature verification will fail.

2) When requesting, put the value of Request-Time used in signing into the Request-Time parameter of the header, put the obtained signature string into the signature parameter of the header, put the Access Key of APIKEY into the ApiKey parameter of the header, and pass the other service parameters.

3) The obtained signature string does not need to be base64 encoded.

## Time security

All APIs that require signature process need to fill in header parameter of Request-time, which is timestamp in milliseconds, when receives the request, the system verifies the time range from which the request was issued. The request is considered invalid if the received req\_time is less or more than 10 seconds (the default value) (the time window can be adjusted by sending an optional header parameter `recv-window` with a maximum value of 60, `recv_window` of 30 seconds or more is not recommended)

## Create API key

Users can create API key in the personal center of MEXC, which is used for signature calculation and authentication, an API key is consist of two parts, secret key of Access keyAPI and secret key corresponding to Secret key.

---

## Error code

## Error code Example

Every endpoint has the potential for abnormalities.

The following is the error code information that the endpoint might return

| code | description |
| --- | --- |
| 0 | Operate succeed |
| 9999 | Public abnormal |
| 500 | Internal error |
| 501 | System busy |
| 401 | Unauthorized |
| 402 | Api\_key expired |
| 406 | Accessed IP is not in the whitelist |
| 506 | Unknown source of request |
| 510 | Excessive frequency of requests |
| 511 | Endpoint inaccessible |
| 513 | Invalid request(for open api serves time more or less than 10s) |
| 600 | Parameter error |
| 601 | Data decoding error |
| 602 | Verify failed |
| 603 | Repeated requests |
| 701 | Account read permission is required |
| 702 | Account modify permission is required |
| 703 | Trade information read permission is required |
| 704 | Transaction information modify permission is required |
| 1000 | Account does not exist |
| 1001 | Contract does not exist |
| 1002 | Contract not activated |
| 1003 | Error in risk limit level |
| 1004 | Amount error |
| 2001 | Wrong order direction |
| 2002 | Wrong opening type |
| 2003 | Overpriced to pay |
| 2004 | Low-price for selling |
| 2005 | Balance insufficient |
| 2006 | Leverage ratio error |
| 2007 | Order price error |
| 2008 | The quantity is insufficient |
| 2009 | Positions do not exist or have been closed |
| 2011 | Order quantity error |
| 2013 | Cancel orders over maximum limit |
| 2014 | The quantity of batch order exceeds the limit |
| 2015 | Price or quantity accuracy error |
| 2016 | Trigger volume over the maximum |
| 2018 | Exceeding the maximum available margin |
| 2019 | There is an active open position |
| 2021 | The single leverage is not consistent with the existing position leverage |
| 2022 | Wrong position type |
| 2023 | There are positions over the maximum leverage |
| 2024 | There are orders with leverage over the maximum |
| 2025 | The holding positions is over the maximum allowable positions |
| 2026 | Modification of leverage is not supported for cross |
| 2027 | There is only one cross or isolated in the same direction |
| 2028 | The maximum order quantity is exceeded |
| 2029 | Error order type |
| 2030 | External order ID is too long (Max. 32 bits ) |
| 2031 | The allowable holding position exceed the current risk limit |
| 2032 | Order price is less than long position force liquidate price |
| 2033 | Order price is more than short position force liquidate price |
| 2034 | The batch query quantity limit is exceeded |
| 2035 | Unsupported market price tier |
| 3001 | Trigger price type error |
| 3002 | Trigger type error |
| 3003 | Executive cycle error |
| 3004 | Trigger price error |
| 4001 | Unsupported currency |
| 2036 | The orders more than the limit, please contact customer service |
| 2037 | Frequent transactions, please try it later |
| 2038 | The maximum allowable position quantity is exceeded, please contact customer service! |
| 5001 | The take-price and the stop-loss price cannot be none at the same time |
| 5002 | The Stop-Limit order does not exist or has closed |
| 5003 | Take-profit and stop-loss price setting is wrong |
| 5004 | The take-profit and stop-loss order volume is more than the holding positions can be liquidated |
| 6001 | Trading forbidden |
| 6002 | Open forbidden |
| 6003 | Time range error |
| 6004 | The trading pair and status should be fill in |
| 6005 | The trading pair is not available |

---

## Market endpoints

The API endpoint under the \[Market endpoints\] module doesn't require authentication.

## Get the server time

> Request

```
curl "https://contract.mexc.com/api/v1/contract/ping"
```

> Response

```
{
  "success": true,
  "data":1587442022003 
}
```

*   **GET** `api/v1/contract/ping`

rate limit: 20 times / 2 seconds

**Request parameters:**

None

## Get the contract information

> Request

```
curl "https://contract.mexc.com/api/v1/contract/detail"
```

> Response

```
{
    "success":true,
    "code":0,
    "data":[
        {
            "symbol":"BTC_USDT",
            "displayName":"BTC_USDT永续",
            "displayNameEn":"BTC_USDT SWAP",
            "positionOpenType":3,
            "baseCoin":"BTC",
            "quoteCoin":"USDT",
            "settleCoin":"USDT",
            "contractSize":0.0001,
            "minLeverage":1,
            "maxLeverage":125,
            "priceScale":2,
            "volScale":0,
            "amountScale":4,
            "priceUnit":0.5,
            "volUnit":1,
            "minVol":1,
            "maxVol":5000000,
            "bidLimitPriceRate":0.03,
            "askLimitPriceRate":0.03,
            "takerFeeRate":0.0006,
            "makerFeeRate":0.0002,
            "maintenanceMarginRate":0.004,
            "initialMarginRate":0.008,
            "riskBaseVol":150000,
            "riskIncrVol":150000,
            "riskIncrMmr":0.004,
            "riskIncrImr":0.004,
            "riskLevelLimit":5,
            "priceCoefficientVariation":0.05,
            "indexOrigin":[
                "Binance",
                "GATEIO",
                "HUOBI",
                "MXC"
            ],
            "state":0,
            "isNew":false,
            "isHot":true,
            "isHidden":false,
            "conceptPlate": [
                "mc-trade-zone-grey",
                "mc-trade-zone-pow"
            ],
            "riskLimitType": "BY_VOLUME",
            "maxNumOrders": [
                200,
                50
            ],
            "marketOrderMaxLevel": 15,
            "marketOrderPriceLimitRate1": 0.03,
            "marketOrderPriceLimitRate2": 0.005,
            "triggerProtect": 0.05,
            "appraisal": 0,
            "showAppraisalCountdown": 0,
            "automaticDelivery": 0,
            "apiAllowed": false
        },
    ]
}
```

*   **GET** `api/v1/contract/detail`

Rate limit: 1 times / 5 seconds

**Request parameters:**

| Parameter | Date Type | Mandatory | Description |
| --- | --- | --- | --- |
| symbol | string | false | the name of the contract |

**Response parameters:**

| Parameter | Date Type | Description |
| --- | --- | --- |
| symbol | string | the name of the contract |
| displayName | string | display name |
| displayNameEn | string | english display name |
| positionOpenType | int | position open type,1：isolated，2：cross，3：both |
| baseCoin | string | base currency such as BTC |
| quoteCoin | string | quote currency such as USDT |
| settleCoin | string | liquidation currency such as USDT |
| contractSize | decimal | contract value |
| minLeverage | int | minimum leverage |
| maxLeverage | int | maximum leverage |
| priceScale | int | price scale |
| volScale | int | quantity scale |
| amountScale | int | amount scale |
| priceUnit | int | price unit |
| volUnit | int | volume unit |
| minVol | decimal | minimum volume |
| maxVol | decimal | maximum volume |
| bidLimitPriceRate | decimal | bid limit price rate |
| askLimitPriceRate | decimal | ask limit price rate |
| takerFeeRate | decimal | taker rate |
| makerFeeRate | decimal | maker rate |
| maintenanceMarginRate | decimal | maintenance margin rate |
| initialMarginRate | decimal | initial margin rate |
| riskBaseVol | decimal | initial volume |
| riskIncrVol | decimal | risk increasing volume |
| riskIncrMmr | decimal | maintain increasing margin rate |
| riskIncrImr | decimal | initial increasing margin rate |
| riskLevelLimit | int | risk level limit |
| priceCoefficientVariation | decimal | fair price coefficient variation |
| indexOrigin | List | index origin |
| state | int | status, 0:enabled,1:delivery, 2:completed, 3: offline, 4: pause |
| apiAllowed | bool | whether support api |
| conceptPlate | List | The zone, corresponding to the entryKey field of the section list |
| riskLimitType | List | Risk limit type, BY\_VOLUME: by the volume, BY\_VALUE: by the position |

## Get the transferable currencies

> Request

```
curl "https://contract.mexc.com/api/v1/contract/support_currencies"
```

> Response

```
{
    "success": true,
    "code": 0,
    "data": [
        "BTC",
        "ETH",
        "USDT"
    ]
}
```

*   **GET** `api/v1/contract/support_currencies`

Rate limit: 20 times /2 seconds

**Request parameters:**

None

**Response parameters:**

The returned "data" field contains a list of string with each string represents a suppported currency.

## Get the contract‘s depth information

> Request

```
curl "https://contract.mexc.com/api/v1/contract/depth/BTC_USDT"
```

> Response

```
{
    "asks":[
        [
            3968.5,
            121
        ],
        [
            3968.6,
            160,
            4
        ]
    ],
    "bids":[
        [
            3968.4,
            179,
            4
        ],
        [
            3968,
            914,
            3
        ]
    ],
    "version":1,
    "timestamp":1587442022003
}
```

*   **GET** `api/v1/contract/depth/{symbol}`

Rate limit: 20 times /2 seconds

**Request parameters:**

| Parameter | Date Type | Mandatory | Description |
| --- | --- | --- | --- |
| symbol | string | true | the name of the contract |
| limit | int | false | tier |

**Response parameters:**

| Parameter | Data Type | Description |
| --- | --- | --- |
| asks | List | the seller depth |
| bids | List | the buyer depth |
| version | long | the version number |
| timestamp | long | system timestamp |

note: \[411.8, 10, 1\] 411.8 is the price，10 is the volume of contracts for this price,1 is the order quantity

## Get a snapshot of the latest N depth information of the contract

> Request

```
curl "https://contract.mexc.com/api/v1/contract/depth_commits/BTC_USDT/20"
```

> Response

```
{
    "success": true,
    "code": 0,
    "data": [
        {
            "asks": [
                [
                    31792,
                    59105,
                    1
                ]
            ],
            "bids": [],
            "version": 1481763378
        }
    ]
}
```

*   **GET** `api/v1/contract/depth_commits/{symbol}/{limit}`

Rate limit: 20 times /2 seconds

**Request parameter:**

| Parameter | Data Type | Mandatory | Description |
| --- | --- | --- | --- |
| symbol | string | true | the name of the contract |
| limit | int | true | count |

**Response parameters:**

| Parameter | Data Type | Description |
| --- | --- | --- |
| asks | List | the seller depth |
| bids | List | the buyer depth |
| version | long | the version number |

## Get contract index price

> Request

```
curl "https://contract.mexc.com/api/v1/contract/index_price/BTC_USDT"
```

> Response

```
{
    "success": true,
    "code": 0,
    "data": {
        "symbol": "BTC_USDT",
        "indexPrice": 31104.6,
        "timestamp": 1609829627708
    }
}
```

*   **GET** `api/v1/contract/index_price/{symbol}`

Rate limit: 20 times /2 seconds

**Request parameters:**

| Parameter | Data Type | Mandatory | Description |
| --- | --- | --- | --- |
| symbol | string | true | the name of the contract |

**Response parameters:**

| Parameter | Data Type | Description |
| --- | --- | --- |
| symbol | string | trading pair |
| indexPrice | decimal | index price |
| timestamp | long | system timestamp |

## Get contract fair price

> Request

```
curl "https://contract.mexc.com/api/v1/contract/fair_price/BTC_USDT"
```

> Response

```
{
    "success": true,
    "code": 0,
    "data": {
        "symbol": "BTC_USDT",
        "fairPrice": 31103.4,
        "timestamp": 1609829705178
    }
}
```

*   **GET** `api/v1/contract/fair_price/{symbol}`

Rate limit:20 times/2 seconds

**Request parameters:**

| Parameter | Data Type | Mandatory | Description |
| --- | --- | --- | --- |
| symbol | string | true | the name of the contract |

**Response parameters:**

| Parameter | Data Type | Description |
| --- | --- | --- |
| symbol | string | the name of the contract |
| fairPrice | decimal | fair price |
| timestamp | long | system timestamp |

## Get contract funding rate

> Request

```
curl "https://contract.mexc.com/api/v1/contract/funding_rate/BTC_USDT"
```

> Response

```
{
    "success": true,
    "code": 0,
    "data": {
        "symbol": "BTC_USDT",
        "fundingRate": -0.000489,
        "maxFundingRate": 0.001,
        "minFundingRate": -0.001,
        "collectCycle": 8,
        "nextSettleTime": 1609833600000,
        "timestamp": 1609829807577
    }
}
```

*   **GET** `api/v1/contract/funding_rate/{symbol}`

Rate limit:20 times/2 seconds

**Request parameters:**

| Parameter | Data Type | Mandatory | Description |
| --- | --- | --- | --- |
| symbol | string | true | the name of the contract |

**Response parameters:**

| Parameter | Data Type | Description |
| --- | --- | --- |
| symbol | string | the name of the contract |
| fundingRate | decimal | funding rate |
| maxFundingRate | decimal | max funding rate |
| minFundingRate | decimal | min funding rate |
| collectCycle | int | charge cycle |
| nextSettleTime | long | next charge time |
| timestamp | long | system timestamp |

## K-line data

> Request

```
curl "https://contract.mexc.com/api/v1/contract/kline/BTC_USDT?interval=Min15&start=1609992674&end=1609992694"
```

> Response

```
{
    "success": true,
    "code": 0,
    "data": {
        "time": [
            1609740600
        ],
        "open": [
            33016.5
        ],
        "close": [
            33040.5
        ],
        "high": [
            33094.0
        ],
        "low": [
            32995.0
        ],
        "vol": [
            67332.0
        ],
        "amount": [
            222515.85925
        ]
    }
}
```

*   **GET** `api/v1/contract/kline/{symbol}`

Rate limit:20 times/2 seconds

**Request parameters:**

| Parameter | Data Type | Mandatory | Description |
| --- | --- | --- | --- |
| symbol | string | true | the name of the contract |
| interval | string | false | interval: Min1、Min5、Min15、Min30、Min60、Hour4、Hour8、Day1、Week1、Month1,default: Min1 |
| start | long | false | start timestamp,seconds |
| end | long | false | end timestamp,seconds |

**Response parameters:**

| Parameter | Data Type | Description |
| --- | --- | --- |
| open | double | the opening price |
| close | double | the closing price |
| high | double | the highest price |
| low | double | the lowest price |
| vol | double | volume |
| time | long | time window |

Attention:

1、The maximum data in a single request is 2000 pieces. If your choice of start/end time and granularity of time results in more than the maximum volume of data in a single request, your request will only return 2000 pieces. If you want to get sufficiently fine-grained data over a larger time range, you need to make several times requests.

2、If only the start time is provided, then query the data from the start time to the current system time. If only the end time is provided, the 2000 pieces of data closest to the end time are returned. If neither start time nor end time is provided, the 2000 pieces of data closest to the current time in the system are queried.

## Get K-line data of the index price

> Request

```
curl "https://contract.mexc.com/api/v1/contract/kline/index_price/BTC_USDT?interval=Min15&start=1609992674&end=1609992694"
```

> Response

```
{
    "success": true,
    "code": 0,
    "data": {
        "time": [
            1609740900
        ],
        "open": [
            33039.0
        ],
        "close": [
            33233.1
        ],
        "high": [
            33352.3
        ],
        "low": [
            33007.9
        ],
        "vol": [
            0.0
        ],
        "amount": [
            0.0
        ]
    }
}
```

*   **GET** `api/v1/contract/kline/index_price/{symbol}`

Rate limit:20 times/2 seconds

**Request parameters:**

| Parameter | Data Type | Mandatory | Description |
| --- | --- | --- | --- |
| symbol | string | true | the name of the contract |
| interval | string | false | interval: Min1、Min5、Min15、Min30、Min60、Hour4、Hour8、Day1、Week1、Month1,default: Min1 |
| start | long | false | start timestamp,seconds |
| end | long | false | end timestamp,seconds |

**Response parameters:**

| Parameter | Data Type | Description |
| --- | --- | --- |
| open | double | the opening price |
| close | double | the closing price |
| high | double | the highest price |
| low | double | the lowest price |
| vol | double | volume |
| time | long | time window |

Attention:

1、The maximum data in a single request is 2000 pieces. If your choice of start/end time and granularity of time results in more than the maximum volume of data in a single request, your request will only return 2000 pieces. If you want to get sufficiently fine-grained data over a larger time range, you need to make several times requests.

2、If only the start time is provided, then query the data from the start time to the current system time. If only the end time is provided, the 2000 pieces of data closest to the end time are returned. If neither start time nor end time is provided, the 2000 pieces of data closest to the current time in the system are queried.

## Get K-line data of the fair price

> Request

```
curl "https://contract.mexc.com/api/v1/contract/kline/fair_price/BTC_USDT?interval=Min15&start=1609992674&end=1609992694"
```

> Response

```
{
    "success": true,
    "code": 0,
    "data": {
        "time": [
            1609740900
        ],
        "open": [
            33041.0
        ],
        "close": [
            33233.3
        ],
        "high": [
            33354.8
        ],
        "low": [
            33009.4
        ],
        "vol": [
            0.0
        ],
        "amount": [
            0.0
        ]
    }
}
```

*   **GET** `api/v1/contract/kline/fair_price/{symbol}`

Rate limit:20 times/2 seconds

**Request parameters:**

| Parameter | Data Type | Mandatory | Description |
| --- | --- | --- | --- |
| symbol | string | true | the name of the contract |
| interval | string | false | interval: Min1、Min5、Min15、Min30、Min60、Hour4、Hour8、Day1、Week1、Month1,default: Min1 |
| start | long | false | start timestamp,seconds |
| end | long | false | end timestamp,seconds |

**Response parameters:**

| Parameter | Data Type | Description |
| --- | --- | --- |
| open | double | the opening price |
| close | double | the closing price |
| high | double | the highest price |
| low | double | the lowest price |
| vol | double | volume |
| time | long | time window |

Attention:

1、The maximum data in a single request is 2000 pieces. If your choice of start/end time and granularity of time results in more than the maximum volume of data in a single request, your request will only return 2000 pieces. If you want to get sufficiently fine-grained data over a larger time range, you need to make several times requests.

2、If only the start time is provided, then query the data from the start time to the current system time. If only the end time is provided, the 2000 pieces of data closest to the end time are returned. If neither start time nor end time is provided, the 2000 pieces of data closest to the current time in the system are queried.

## Get contract transaction data

> Request

```
curl "https://contract.mexc.com/api/v1/contract/deals/BTC_USDT"
```

> Response

```
{
    "success": true,
    "code": 0,
    "data": [
        {
            "p": 31199,
            "v": 18,
            "T": 1,
            "O": 3,
            "M": 2,
            "t": 1609831235985
        },
        {
            "p": 31199,
            "v": 15,
            "T": 2,
            "O": 3,
            "M": 1,
            "t": 1609831234759
        }
    ]
}
```

*   **GET** `api/v1/contract/deals/{symbol}`

Rate limit:20 times/2 seconds

**Request parameters:**

| Parameter | Data Type | Mandatory | Description |
| --- | --- | --- | --- |
| symbol | string | true | the name of the contract |
| limit | int | false | consequence set quantity ，maximum is 100, default 100 without setting |

**Response parameters:**

| Parameter | Data Type | Description |
| --- | --- | --- |
| p | decimal | transaction price |
| v | decimal | quantity |
| T | int | deal type,1:purchase,2:sell |
| O | int | open position, 1: Yes,2: No, when O is 1, vol is additional position |
| M | int | self-transact,1:yes,2:no |
| t | long | transaction time |

## Get contract trend data

> Request

```
curl "https://contract.mexc.com/api/v1/contract/ticker"
```

> Response

```
{
    "success": true,
    "code": 0,
    "data": {
        "symbol": "BTC_USDT",
        "lastPrice": 31199,
        "bid1": 31198.5,
        "ask1": 31199,
        "volume24": 40146908,
        "amount24": 124905007.4428,
        "holdVol": 55102960,
        "lower24Price": 27795,
        "high24Price": 33152.5,
        "riseFallRate": -0.0176,
        "riseFallValue": -562,
        "indexPrice": 31016.3,
        "fairPrice": 31199.5,
        "fundingRate": 0.001,
        "maxBidPrice": 31946.5,
        "minAskPrice": 30085.5,
        "timestamp": 1609831334016
    }
}
```

*   **GET** `api/v1/contract/ticker`

Rate limit:20 times/2 seconds

**Request parameters:**

| Parameter | Data Type | Mandatory | Description |
| --- | --- | --- | --- |
| symbol | string | false | the name of the contract |

**Response parameters:**

| Parameter | Data Type | Description |
| --- | --- | --- |
| symbol | string | the name of the contract |
| lastPrice | decimal | the latest price |
| bid1 | decimal | purchase price |
| ask1 | decimal | sell price |
| volume24 | decimal | 24 hours trading volume, according to the volume of statistical count |
| amount24 | decimal | 24 hours transaction volume |
| holdVol | decimal | total holdings |
| lower24Price | decimal | lowest price within 24 hours |
| high24Price | decimal | highest price within 24 hours |
| riseFallRate | decimal | rise/fall rate |
| riseFallValue | decimal | rise/fall value |
| indexPrice | decimal | index price |
| fairPrice | decimal | fair price |
| fundingRate | decimal | funding rate |
| timestamp | long | transaction timestamp |

## Get all contract risk fund balance

> Request

```
curl "https://contract.mexc.com/api/v1/contract/risk_reverse"
```

> Response

```
{
    "success": true,
    "code": 0,
    "data": [
        {
            "symbol": "BTC_USDT",
            "currency": "USDT",
            "available": 425018.32968325152473812,
            "timestamp": 1609831395734
        },
        {
            "symbol": "BTC_USD",
            "currency": "BTC",
            "available": 5.00211366264782435,
            "timestamp": 1609831395734
        },
    ]
}
```

*   **GET** `api/v1/contract/risk_reverse`

Rate limit:20 times/2 seconds

**Request parameters:**

None

**Response parameters:**

| parameter name | type | description |
| --- | --- | --- |
| symbol | string | the name of the cntract |
| currency | string | currency |
| available | decimal | available balance |
| timestamp | long | system timestamp |

## Get contract risk fund balance history

> Request

```
curl "https://contract.mexc.com/api/v1/contract/risk_reverse/history?symbol=BTC_USDT&page_num=1&page_size=20"
```

> Response

```
{
    "success": true,
    "code": 0,
    "data": {
        "pageSize": 2,
        "totalCount": 42,
        "totalPage": 21,
        "currentPage": 1,
        "resultList": [
            {
                "symbol": "BTC_USDT",
                "currency": "USDT",
                "available": 424288.053161046680168662,
                "snapshotTime": 1609819200000
            },
            {
                "symbol": "BTC_USDT",
                "currency": "USDT",
                "available": 423989.817244106347071489,
                "snapshotTime": 1609804800000
            }
        ]
    }
}
```

*   **GET** `api/v1/contract/risk_reverse/history`

Rate limit:20 times/2 seconds

**Request parameters:**

| Parameter | Data Type | Mandatory | Description |
| --- | --- | --- | --- |
| symbol | string | true | the name of the contract |
| page\_num | int | true | current page number, default is 1 |
| page\_size | int | true | the page size, default 20, maximum 100 |

**Response parameters:**

| Parameter | Data Type | Description |
| --- | --- | --- |
| pageSize | int | page size |
| totalCount | int | total count |
| totalPage | int | total pages |
| currentPage | int | current page |
| resultList | list | data consequence set |
| symbol | string | the name of the contract |
| currency | string | liquidation currency |
| available | decimal | balance |
| snapshotTime | long | snapshot time |

## Get contract funding rate history

> Request

```
curl "https://contract.mexc.com/api/v1/contract/funding_rate/history?symbol=BTC_USDT&page_num=1&page_size=20"
```

> Response

```
{
    "success": true,
    "code": 0,
    "data": {
        "pageSize": 2,
        "totalCount": 21,
        "totalPage": 11,
        "currentPage": 1,
        "resultList": [
            {
                "symbol": "BTC_USDT",
                "fundingRate": 0.000266,
                "settleTime": 1609804800000
            },
            {
                "symbol": "BTC_USDT",
                "fundingRate": 0.00029,
                "settleTime": 1609776000000
            }
        ]
    }
}
```

*   **GET** `api/v1/contract/funding_rate/history`

Rate limit:20 times/2 seconds

**Request parameters:**

| Parameter | Data Type | Mandatory | Description |
| --- | --- | --- | --- |
| symbol | string | true | the name of the contract |
| page\_num | int | true | current page number, default is 1 |
| page\_size | int | true | the page size, default 20, maximum 100 |

**Response parameters:**

| Parameter | Data Type | Description |
| --- | --- | --- |
| pageSize | int | page size |
| totalCount | int | the total count |
| totalPage | int | the total pages |
| currentPage | int | the current page |
| resultList | list | data consequence set |
| symbol | string | the name of the contract |
| fundingRate | decimal | funding rate |
| settleTime | long | liquidation time |