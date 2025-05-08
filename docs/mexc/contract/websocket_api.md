# Private WebSocket API Streams

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

## WebSocket API

WebSocket is a new Protocol in HTML5. It realizes full-duplex communication between client and server. A single handshake can establish the connection between the client and the server, and the server can actively send information to the client according to the rules. The advantages are as follows:

1.  The request header information is relatively small about 2 bytes when the client and server transfer the data.
2.  Both the client and the server can actively send data to each other.
3.  No need to create or destroy TCP requests many times, saving bandwidth and server resources.

Developers are strongly advised to use the WebSocket API for market trends and buying/ selling depth information.

## Native WS connection address

*   wss://contract.mexc.com/edge

## Detailed data interaction commands

> Send ping message

```
{
  "method": "ping"
}
```

> Server return

```
{
  "channel": "pong",
  "data": 1587453241453
}
```

List of subscribe/unsubscribe data commands ( ws identification is not required except the list of personal related commands)

If no ping is received within 1 minute, the connection will be disconnected. It is recommended to send a ping for 10-20 seconds

The ping message and server return are shown on the right

## Filter Subscription

> cancel default push

```
{
    "subscribe": false,
    "method": "login",
    "param": {
        "apiKey": "mxU1TzSmRDW1o5AsE",
        "signature": "8c957a757ea31672eca05cb652d26bab7f46a41364adb714dda5475264aff120",
        "reqTime": "1611038237237"
    }
}
```

> asset only

```
{
    "method":"personal.filter",
    "param":{
        "filters":[
            {
                "filter":"asset"
            }
        ]
    }
}
```

> ADLlevel only

```
{
    "method":"personal.filter",
    "param":{
        "filters":[
            {
                "filter":"adl.level"
            }
        ]
    }
}
```

> deals only

```
{
    "method":"personal.filter",
    "param":{
        "filters":[
            {
                "filter":"order.deal",
                "rules":[]
            }
        ]
    }
}
```

> or

```
{
    "method":"personal.filter",
    "param":{
        "filters":[
            {
                "filter":"order.deal"
            }
        ]
    }
}
```

> deal for symbol

```
{
    "method":"personal.filter",
    "param":{
        "filters":[
            {
                "filter":"order.deal",
                "rules":[
                    "BTC_USDT"
                ]
            }
        ]
    }
}
```

> coordinate

```
{
    "method":"personal.filter",
    "param":{
        "filters":[
            {
                "filter":"order",
                "rules":[
                    "BTC_USDT"
                ]
            },
            {
                "filter":"order.deal",
                "rules":[
                    "EOS_USDT",
                    "ETH_USDT",
                    "BTC_USDT"
                ]
            },
            {
                "filter":"position",
                "rules":[
                    "EOS_USDT",
                    "BTC_USDT"
                ]
            },
            {
                "filter":"asset"
            }
        ]
    }
}
```

All private data will be pushed after login:order、order.deal、position、plan.order、stop.order、stop.planorder、risk.limit、adl.level、asset.

1.  If want to cancel the default push,add params when login: `"subscribe":false`.
    
2.  after login sucess,send "personal.filter" to filter the subscription，if want all data be pushed,send: `{"method":"personal.filter"}`or `{"method":"personal.filter","param":{"filters":[]}}`.
    
3.  available key for filter:order、order.deal、position、plan.order、stop.order、stop.planorder、risk.limit、adl.level、asset.
    

only asset and adl.level not support for filter single currency or single future.

The filter event sent later will overwrites the previous one.

## Public Channels

### Tickers

> Subscribe

```
{
  "method": "sub.tickers",
  "param": {}
} 
```

> If you want to return content (the same with following subscription):

```
{
  "method": "sub.tickers",
  "param": {},
  "gzip": false
} 
```

> Unsubscribe

```
{
  "method": "unsub.tickers",
  "param": {}
} 
```

> Example

```
{
  "channel": "push.tickers",
  "data": [
    {
      "fairPrice": 183.01,
      "lastPrice": 183,
      "riseFallRate": -0.0708,
      "symbol": "BSV_USDT",
      "volume24": 200
    },
    {
      "fairPrice": 220.22,
      "lastPrice": 220.4,
      "riseFallRate": -0.0686,
      "symbol": "BCH_USDT",
      "volume24": 200
    }
  ],
  "ts": 1587442022003
} 
```

Get the latest transaction price, buy-price, sell-price and 24 transaction volume of all the perpetual contracts on the platform without login. Send once a second after subscribing.

subscribe , unsubscribe, example is shown on the right.

**Response parameters:**

| Parameter | Data Type | Description |
| --- | --- | --- |
| symbol | string | the name of the contract |
| lastPrice | decimal | the last price |
| volume24 | decimal | 24 hours trading volume, according to the statistics count |
| riseFallRate | decimal | rise/fall rate |
| fairPrice | decimal | fair price |

### Ticker

> Subscribe

```
{
    "method":"sub.ticker",
    "param":{
        "symbol":"BTC_USDT"
    }
}
```

> Unsubscribe

```
{
    "method":"unsub.ticker",
    "param":{
        "symbol":"BTC_USDT"
    }
}
```

> Example

```
{
    "channel":"push.ticker",
    "data":{
        "ask1":6866.5,
        "bid1":6865,
        "contractId":1,
        "fairPrice":6867.4,
        "fundingRate":0.0008,
        "high24Price":7223.5,
        "indexPrice":6861.6,
        "lastPrice":6865.5,
        "lower24Price":6756,
        "maxBidPrice":7073.42,
        "minAskPrice":6661.37,
        "riseFallRate":-0.0424,
        "riseFallValue":-304.5,
        "symbol":"BTC_USDT",
        "timestamp":1587442022003,
        "holdVol":2284742,
        "volume24":164586129
    },
    "symbol":"BTC_USDT",
    "ts":1587442022003
}
```

Get the latest transaction price, buy price, sell price and 24 transaction volume of a contract, send the transaction data without users' login, and send once a second after subscription.

subscribe , unsubscribe, example is shown on the right.

**Response parameters:**

| Parameter | Data Type | Description |
| --- | --- | --- |
| symbol | string | the name of the contract |
| lastPrice | decimal | last price |
| bid1 | decimal | bid/price |
| ask1 | decimal | ask/price |
| volume24 | decimal | 24 hours transaction volume, according to the statistical count |
| holdVol | decimal | hold volume |
| lower24Price | decimal | lowest price within 24 hours |
| high24Price | decimal | highest price in 24 hours |
| riseFallRate | decimal | rise fall rate |
| riseFallValue | decimal | rise fall value |
| indexPrice | decimal | index price |
| fairPrice | decimal | fair price |
| fundingRate | decimal | funding fee |
| timestamp | long | system timestamp |

### Transaction

> subscribe

```
{
    "method":"sub.deal",
    "param":{
        "symbol":"BTC_USDT"
    }
}
```

> Unsubscribe

```
{
    "method":"unsub.deal",
    "param":{
        "symbol":"BTC_USDT"
    }
}
```

> Example

```
{
    "channel":"push.deal",
    "data":{
        "M":1,
        "O":1,
        "T":1,
        "p":6866.5,
        "t":1587442049632,
        "v":2096
    },
    "symbol":"BTC_USDT",
    "ts":1587442022003
}
```

Access to the latest data without login, and keep updating.

subscribe , unsubscribe, example is shown on the right.

**Response parameters:**

| Parameter | Data Type | Description |
| --- | --- | --- |
| p | decimal | transaction price |
| v | decimal | volume |
| T | int | transaction direction,1:purchase,2:sell |
| O | int | open position, 1: open position,2:close position,3:position no change,volume is the additional position when O is 1 |
| M | int | Is it auto-transact ? 1: Yes,2: No |
| t | long | transaction time |

### Depth

> Subscription increments (all)

```
{
    "method":"sub.depth",
    "param":{
        "symbol":"BTC_USDT"
    }
}
```

> Subscription increments (zipped push)

```
{
    "method":"sub.depth",
    "param":{
        "symbol":"BTC_USDT",
        "compress":true
    }
}
```

> Full subscription(Limit could be 5, 10 or 20, default 20 without define., only subscribe to the full amount of one gear)

```
{
    "method":"sub.depth.full",
    "param":{
        "symbol":"BTC_USDT",
        "limit":5
    }
}
```

> unsubscribe (cancel the incremental subscription)

```
{
    "method":"unsub.depth",
    "param":{
        "symbol":"BTC_USDT"
    }
}
```

> Unsubscribe (cancel the full subscription, limit is not mandatory)

```
{
    "method":"usub.depth.full",
    "param":{
        "symbol":"BTC_USDT"
    }
}
```

> Example

```
{
    "channel":"push.depth",
    "data":{
        "asks":[
            [
                6859.5,
                3251,
                1
            ]
        ],
        "bids":[
        ],
        "version":96801927
    },
    "symbol":"BTC_USDT",
    "ts":1587442022003
}
```

subscribe , unsubscribe, example is shown on the right. Incremental depth subscription has merging enabled by default. If you do not want to enable it, please set `compress` to `false` when subscribing.

**Response Parameter:**

| Parameter | Data Type | Description |
| --- | --- | --- |
| asks | List | seller depth |
| bids | List | buyer depth |
| version | long | the version number |

Tip: \[411.8, 10, 1\] 411.8 is price，10 is the order numbers of the contract ,1 is the order quantity

### K-line

> Subscribe

```
{
    "method":"sub.kline",
    "param":{
        "symbol":"BTC_USDT",
        "interval":"Min60"
    }
}
```

> Unsubscribe

```
{
    "method":"unsub.kline",
    "param":{
        "symbol":"BTC_USDT"
    }
}
```

> Example

```
{
    "channel":"push.kline",
    "data":{
        "a":233.740269343644737245,
        "c":6885,
        "h":6910.5,
        "interval":"Min60",
        "l":6885,
        "o":6894.5,
        "q":1611754,
        "symbol":"BTC_USDT",
        "t":1587448800
    },
    "symbol":"BTC_USDT",
    "ts":1587442022003
}
```

Get the k-line data of the contract and keep updating.

subscribe , unsubscribe, example is shown on the right.

interval optional parameters: Min1、Min5、Min15、Min30、Min60、Hour4、Hour8、Day1、Week1、Month1

**Response parameters:**

| Parameter | Data Type | Description |
| --- | --- | --- |
| symbol | string | the name of the contract |
| a | decimal | total transaction amount |
| c | decimal | the closing price |
| interval | string | interval: Min1、Min5、Min15、Min30、Min60、Hour4、Hour8、Day1、Week1、Month1 |
| l | decimal | the lowest price |
| o | decimal | the opening price |
| q | decimal | total transaction volume |
| h | decimal | the highest price |
| t | long | trading time，unit：second（s）， the start time of the window（windowStart） |

### Funding rate

> Subscribe

```
{
    "method":"sub.funding.rate",
    "param":{
        "symbol":"BTC_USDT"
    }
}
```

> unsubscribe

```
{
    "method":"unsub.funding.rate",
    "param":{
        "symbol":"BTC_USDT"
    }
}
```

> Example

```
{
    "channel":"push.funding.rate",
    "data":{
        "rate":0.001,
        "symbol":"BTC_USDT"
    },
    "symbol":"BTC_USDT",
    "ts":1587442022003
}
```

Get the contract funding rate, and keep updating.

subscribe , unsubscribe, example is shown on the right.

**Response parameters:**

| Parameter | Data Type | Description |
| --- | --- | --- |
| symbol | string | the name of the contract |
| fundingRate | decimal | funding rate |
| nextSettleTime | long | next liquidate time |

### Index price

> subscribe

```
{
    "method":"sub.index.price",
    "param":{
        "symbol":"BTC_USDT"
    }
}
```

> unsubscribe

```
{
    "method":"unsub.index.price",
    "param":{
        "symbol":"BTC_USDT"
    }
}
```

> Example

```
{
    "channel":"push.index.price",
    "data":{
        "price":0.001,
        "symbol":"BTC_USDT"
    },
    "symbol":"BTC_USDT",
    "ts":1587442022003
}
```

Get the index price, and will keep updating if there is any changes.

subscribe , unsubscribe, example is shown on the right.

**Response parameters:**

| Parameter | Data Type | Description |
| --- | --- | --- |
| symbol | string | the name of the contract |
| price | decimal | price |

### Fair price

> Subscribe

```
{
    "method":"sub.fair.price",
    "param":{
        "symbol":"BTC_USDT"
    }
}
```

> Unsubscribe

```
{
    "method":"unsub.fair.price",
    "param":{
        "symbol":"BTC_USDT"
    }
}
```

> Example

```
{
    "channel":"push.fair.price",
    "data":{
        "price":0.001,
        "symbol":"BTC_USDT"
    },
    "symbol":"BTC_USDT",
    "ts":1587442022003
}
```

subscribe , unsubscribe, example is shown on the right.

**Response parameters**

| Parameter | Data Type | Description |
| --- | --- | --- |
| symbol | string | the name of the contract |
| price | decimal | price |

## Private Channels

**Signature:**

The signature target string is: accessKey + timestamp,The HMAC SHA256 algorithm is used to sign the target string.

**Signature String:**

`"mx0aBYs33eIilxBW5C1657186536762"`

### Login authentication

> Payload

```
{"channel":"rs.login",
"data":"success",
"ts":"1587442022003"
}
```

```
{
    "method":"login",
    "param":{
        "apiKey":"apiKey", // openapi need to fill in this parameter，Parameters are constructed in accordance with the OpenAPI documentation
        "reqTime":"reqTime", // openapi need to fill in this parameters，Parameters are constructed in accordance with the OpenAPI documentation
        "signature":"signature" // openapi need to fill in this parameters，Parameters are constructed in accordance with the OpenAPI documentation
    }
}
```

**Response parameters:**

Success: none, failure: return the corresponding error message, channel = rs.error

Login successful (channel = rs.login)

### Order

> Payload

```
{
    "channel":"push.personal.order",
    "data":{
        "category":1,
        "createTime":1610005069976,
        "dealAvgPrice":0.731,
        "dealVol":1,
        "errorCode":0,
        "externalOid":"_m_95bc2b72d3784bce8f9efecbdef9fe35",
        "feeCurrency":"USDT",
        "leverage":0,
        "makerFee":0,
        "openType":1,
        "orderId":"102067003631907840",
        "orderMargin":0,
        "orderType":5,
        "positionId":1397818,
        "price":0.707,
        "profit":-0.0005,
        "remainVol":0,
        "side":4,
        "state":3,
        "symbol":"CRV_USDT",
        "takerFee":0.00004386,
        "updateTime":1610005069983,
        "usedMargin":0,
        "version":2,
        "vol":1
    },
    "ts":1610005069989
}
```

`channel = push.personal.order`

| Parameter | Data Type | Description |
| --- | --- | --- |
| orderId | long | orderid |
| symbol | string | the name of the contract |
| positionId | long | position id |
| price | decimal | trigger price |
| vol | decimal | trigger volume |
| leverage | long | leverage |
| side | int | order side 1open long,2close short,3open short 4 close long |
| category | int | order category:1limit order, 2 system take-over delegate, 3 close delegate 4 ADL reduction |
| orderType | int | true |
| dealAvgPrice | decimal | transaction average price |
| dealVol | decimal | transaction volume |
| orderMargin | decimal | order margin |
| usedMargin | decimal | used margin |
| takerFee | decimal | taker fee |
| makerFee | decimal | maker fee |
| profit | decimal | close profit |
| feeCurrency | string | fee currency |
| openType | int | open type,1:isolated,2:cross |
| state | int | order state,1 uninformed,2 uncompleted,3 completed,4 cancelled,5 invalid |
| errorCode | int | error code, 0:normal, 1:param\_invalid, 2:insufficient\_balance, 3:position\_not\_exists, 4:position\_not\_enough, 5:position\_liq, 6:order\_liq, 7:risk\_level\_limit, 8:sys\_cancel, 9:position\_mode\_not\_match, 10:reduce\_only\_liq, 11:contract\_not\_enable, 12:delivery\_cancel, 13:position\_liq\_cancel, 14:adl\_cancel, 15:black\_user\_cancel, 16:settle\_funding\_cancel, 17:position\_im\_change\_cancel, 18:ioc\_cancel, 19:fok\_cancel, 20:post\_only\_cancel, 21:market\_cancel |
| externalOid | string | external order id |
| createTime | date | create time |
| updateTime | date | update time |

### Asset

> Payload

```
{
    "channel":"push.personal.asset",
    "data":{
        "availableBalance":0.7514236,
        "bonus":0,
        "currency":"USDT",
        "frozenBalance":0,
        "positionMargin":0
    },
    "ts":1610005070083
}
```

`channel = push.personal.asset`

| Parameter | Data Type | Description |
| --- | --- | --- |
| currency | string | currency |
| positionMargin | decimal | position margin |
| frozenBalance | decimal | frozen balance |
| availableBalance | decimal | available balance |
| cashBalance | decimal | drawable balance |

### Position

> Payload

```
{
    "channel":"push.personal.position",
    "data":{
        "autoAddIm":false,
        "closeAvgPrice":0.731,
        "closeVol":1,
        "frozenVol":0,
        "holdAvgPrice":0.736,
        "holdFee":0,
        "holdVol":0,
        "im":0,
        "leverage":15,
        "liquidatePrice":0,
        "oim":0,
        "openAvgPrice":0.736,
        "openType":1,
        "positionId":1397818,
        "positionType":1,
        "realised":-0.0005,
        "state":3,
        "symbol":"CRV_USDT"
    },
    "ts":1610005070157
}
```

`channel = push.personal.position`

| Parameter | Data Type | Description |
| --- | --- | --- |
| positionId | long | position id |
| symbol | string | the name of the contract |
| holdVol | decimal | hold volume |
| positionType | int | position type， 1long 2short |
| openType | int | open type， 1isolated 2cross |
| state | int | position state,1holding2system holding 3closed |
| frozenVol | decimal | frozen volume |
| closeVol | decimal | close volume |
| holdAvgPrice | decimal | hold average price |
| closeAvgPrice | decimal | close average price |
| openAvgPrice | decimal | open average price |
| liquidatePrice | decimal | liquidate price |
| oim | decimal | original initial margin |
| adlLevel | int | the value of ADL is 1-5. If it is empty, wait for the refresh |
| im | decimal | initial margin， add or subtract this item can be used to adjust the liquidate price |
| holdFee | decimal | hold fee, positive means u get it, negative means lose it |
| realised | decimal | realized profit and loss |
| createTime | date | create time |
| updateTime | date | update time |

### Risk limitation

`channel = push.personal.risk.limit`

| Parameter | Data Type | Description |
| --- | --- | --- |
| symbol | string | the name of the contract |
| positionType | int | position type 1:long，2:short |
| riskSource | int | Source of risk 0:other 1:Liquidation Service |
| level | int | current risk level |
| maxVol | decimal | maximum position volume |
| maxLeverage | int | maximum leverage ratio |
| mmr | decimal | maintenance margin rate |
| imr | decimal | initial margin rate |

### Adl automatic reduction of position level

> Payload

```
{
    "channel":"push.personal.adl.level",
    "data":{
        "adlLevel":0,
        "positionId":1397818
    },
    "ts":1610005032231
}
```

`channel = push.personal.adl.level`

| Parameter | Data Type | Description |
| --- | --- | --- |
| adlLevel | int | the current adl level ：1-5 |
| positionId | long | position id |

### Position Mode

```
{
    "channel":"push.personal.position.mode",
    "data":{
        "positionMode": 1
    },
    "ts":1610005070157
}
```

`channel = push.personal.position.mode`

| Parameter | Data Type | Description |
| --- | --- | --- |
| positionMode | int | position mode,1:hedge，2:one-way |

## How is depth information maintained

> Example: Submit subscription information

```
{"method":"sub.deal",
"param":{
    "symbol":"BTC_USDT"
}
}
```

> subscribe succeed response

```
{"channel":"rs.sub.deal",
"data":"success",
"ts":"1587442022003"
}
```

> subscribe failed response

```
{"channel":"rs.error",
"data":"Contract doesn't exist!",
"ts":"1587442022003"
}
```

**How is incremental depth information maintained:**

1.  Though /api/v1/contract/depth/BTC\_USDT to get full amount of depth information, save the current version.
2.  Subscribe to ws depth information, if the received data version more than the current version after update, the later received update cover the previous one at the same price.
3.  Through /api/v1/contract/depth\_commits/BTC\_USDT/1000 get the latest 1000 depth snapshots.
4.  Discard version data from the snapshot obtained by Version (less than step 3 )for the same price in the current cached depth information
5.  Update the contents of the deep snapshots to the local cache and keep updating from the event received by the WS
6.  The version of each new event should be exactly equal to version+1 of the previous event, otherwise packet loss may occur. In case of packet loss or discontinuous version of the event retrieved, please re-initialize from Step 3.
7.  The amount of hanging orders in each event represents the absolute value of the current hanging orders of the price, rather than the relative change.
8.  If the amount of a hanging order corresponding to a certain price is 0, it means that the hanging order at that price has been cancelled, the price should be removed.

**Subscriptions，subscribe succeed response:**

channel : rs. + subscription method， data is "success"