1.  Home

Copy Page

# Authentication

#### Generating an API Key[#](#generating-an-api-key)

Before being able to sign any requests, you must create an API key via the
[KuCoin website](https://www.kucoin.com/account/api). Upon creating a key you
need to write down 3 pieces of information:

Key

Secret

Passphrase

The Key and Secret are generated and provided by KuCoin and the Passphrase
refers to the one you used to create the KuCoin API. Please note that these
three pieces of information can not be recovered once lost. If you lost this
information, please create a new API key.

#### API KEY PERMISSIONS[#](#api-key-permissions)

You can manage the API permission on KuCoin’s official website. Please refer to
the documentation below to see what API key permissions are required for a
specific route.

#### Creating a Request[#](#creating-a-request)

All private REST requests must contain the following headers:

**KC-API-KEY** The API key as a string.

**KC-API-SIGN** The base 64-encoded signature.

**KC-API-TIMESTAMP** A timestamp for your request (milliseconds).

**KC-API-PASSPHRASE** The passphrase you specified when creating the API key.

**KC-API-KEY-VERSION** You can check the API key version on the page of
[API Management](https://www.kucoin.com/account/api).

**Content-Type** All requests and responses are **application/json** content
type.

#### Signing a Message[#](#signing-a-message)

For the header of **KC-API-SIGN**:

Use API-Secret to encrypt the prehash string {timestamp+method+endpoint+body}
with sha256 HMAC. The request body is a JSON string and need to be the same with
the parameters passed by the API.

Encode contents by **base64** before you pass the request.

For the **KC-API-PASSPHRASE** of the header:

Encrypt passphrase with **HMAC-sha256** via API-Secret.

Encode contents by **base64** before you pass the request.

Note:

The encrypted timestamp shall be consistent with the KC-API-TIMESTAMP field in
the request header.

The body to be encrypted shall be consistent with the content of the Request
Body.

The Method should be UPPER CASE.

For GET, DELETE request, all query parameters need to be included in the request
url. e.g. /api/v1/deposit-addresses?currency=XBT. The body is "" if there is no
request body (typically for GET requests).

For the POST request, all query parameters need to be included in the request
body with JSON. (e.g. {"currency":"BTC"}). Do not include extra spaces in JSON
strings.

When generating signature, the URL must use the content that has not been
URL-encoded to participate in the signature.  
For example: When the url is
/api/v1/sub/api-key?apiKey=67*b3&subName=test&passphrase=abc%21%40%2311  
, the url content participating in the signature should be the original
information /api/v1/sub/api-key?apiKey=67*b3&subName=test&passphrase=abc!@#11

#### PHP Example[#](#php-example)

```
    <?php

use KuCoin\UniversalSDK\Api\DefaultClient;
use KuCoin\UniversalSDK\Common\Logger;
use KuCoin\UniversalSDK\Generate\Account\Fee\GetSpotActualFeeReq;
use KuCoin\UniversalSDK\Generate\Futures\Market\GetKlinesReq;
use KuCoin\UniversalSDK\Generate\Service\AccountService;
use KuCoin\UniversalSDK\Generate\Service\FuturesService;
use KuCoin\UniversalSDK\Generate\Service\SpotService;
use KuCoin\UniversalSDK\Generate\Spot\Order\AddOrderSyncReq;
use KuCoin\UniversalSDK\Generate\Spot\Order\CancelOrderByOrderIdSyncReq;
use KuCoin\UniversalSDK\Generate\Spot\Order\GetOrderByOrderIdReq;
use KuCoin\UniversalSDK\Model\ClientOptionBuilder;
use KuCoin\UniversalSDK\Model\Constants;
use KuCoin\UniversalSDK\Model\TransportOptionBuilder;

include '../vendor/autoload.php';

function restExample()
{
    // Retrieve API secret information from environment variables
    $key = getenv('API_KEY') ?: '';
    $secret = getenv('API_SECRET') ?: '';
    $passphrase = getenv('API_PASSPHRASE') ?: '';

    // Optional: Retrieve broker secret information from environment variables; applicable for broker API only
    $brokerName = getenv('BROKER_NAME');
    $brokerKey = getenv('BROKER_KEY');
    $brokerPartner = getenv('BROKER_PARTNER');

    // Set specific options, others will fall back to default values
    $httpTransportOption = (new TransportOptionBuilder())
        ->setKeepAlive(true)
        ->setMaxConnections(10)
        ->build();

    // Create a client using the specified options
    $clientOption = (new ClientOptionBuilder())
        ->setKey($key)
        ->setSecret($secret)
        ->setPassphrase($passphrase)
        ->setBrokerName($brokerName)
        ->setBrokerKey($brokerKey)
        ->setBrokerPartner($brokerPartner)
        ->setSpotEndpoint(Constants::GLOBAL_API_ENDPOINT)
        ->setFuturesEndpoint(Constants::GLOBAL_FUTURES_API_ENDPOINT)
        ->setBrokerEndpoint(Constants::GLOBAL_BROKER_API_ENDPOINT)
        ->setTransportOption($httpTransportOption)
        ->build();

    $client = new DefaultClient($clientOption);
    $kucoinRestService = $client->restService();

    accountServiceExample($kucoinRestService->getAccountService());
    spotServiceExample($kucoinRestService->getSpotService());
    futuresServiceExample($kucoinRestService->getFuturesService());
}

function accountServiceExample(AccountService $accountService)
{
    $accountApi = $accountService->getAccountApi();
    $accountInfoResp = $accountApi->getAccountInfo();
    Logger::info("account info: level: {$accountInfoResp->level}, SubAccountSize: {$accountInfoResp->subQuantity}");

    $feeApi = $accountService->getFeeApi();
    $getActualFeeReq = GetSpotActualFeeReq::builder()
        ->setSymbols("BTC-USDT,ETH-USDT")
        ->build();

    $getActualFeeResp = $feeApi->getSpotActualFee($getActualFeeReq);

    foreach ($getActualFeeResp->data as $feeData) {
        Logger::info("Fee info: symbol: {$feeData->symbol}, TakerFee: {$feeData->takerFeeRate}, MakerFee: {$feeData->makerFeeRate}");
    }
}

function spotServiceExample(SpotService $spotService)
{
    $orderApi = $spotService->getOrderApi();

    $addOrderReq = AddOrderSyncReq::builder()
        ->setClientOid(uniqid('', true))
        ->setSide('buy')
        ->setSymbol("BTC-USDT")
        ->setType('limit')
        ->setRemark("sdk_example")
        ->setPrice("10000")
        ->setSize("0.001")
        ->build();

    $resp = $orderApi->addOrderSync($addOrderReq);
    Logger::info("Add order success, id: {$resp->orderId}, oid: {$resp->clientOid}");

    $queryOrderDetailReq = GetOrderByOrderIdReq::builder()
        ->setOrderId($resp->orderId)
        ->setSymbol("BTC-USDT")
        ->build();
    $orderDetailResp = $orderApi->getOrderByOrderId($queryOrderDetailReq);
    Logger::info("Order detail: " . $orderDetailResp->jsonSerialize(JMS\Serializer\SerializerBuilder::create()->build()));

    $cancelOrderReq = CancelOrderByOrderIdSyncReq::builder()
        ->setOrderId($resp->orderId)
        ->setSymbol("BTC-USDT")
        ->build();
    $cancelOrderResp = $orderApi->cancelOrderByOrderIdSync($cancelOrderReq);
    Logger::info("Cancel order success, id: {$cancelOrderResp->orderId}");
}

function futuresServiceExample(FuturesService $futuresService)
{
    $marketApi = $futuresService->getMarketApi();

    $allSymbolResp = $marketApi->getAllSymbols();
    $maxQuery = min(count($allSymbolResp->data), 10);

    for ($i = 0; $i < $maxQuery; $i++) {
        $symbol = $allSymbolResp->data[$i];

        $start = (int)((microtime(true) - 600) * 1000);
        $end = (int)(microtime(true) * 1000);

        $getKlineReq = GetKlinesReq::builder()
            ->setSymbol($symbol->symbol)
            ->setGranularity(1)
            ->setFrom($start)
            ->setTo($end)
            ->build();

        $getKlineResp = $marketApi->getKlines($getKlineReq);
        $rows = [];


        foreach ($getKlineResp->data as $row) {
            $timestamp = date("Y-m-d H:i:s", $row[0] / 1000);
            $formattedRow = sprintf(
                "[Time: %s, Open: %.2f, High: %.2f, Low: %.2f, Close: %.2f, Volume: %.2f]",
                $timestamp, $row[1], $row[2], $row[3], $row[4], $row[5]
            );
            $rows[] = $formattedRow;
        }

        Logger::info("Symbol: {$symbol->symbol}, Kline: " . implode(', ', $rows));
    }
}

if (php_sapi_name() === 'cli') {
    restExample();
}

    ?>
```

#### Python Example[#](#python-example)

For a more production-ready implementation, please refer to:
[Code](https://github.com/Kucoin/kucoin-universal-sdk/blob/main/sdk/python/kucoin_universal_sdk/internal/infra/default_transport.py)

```
import base64
import hashlib
import hmac
import json
import logging
import os
import time
import uuid
from urllib.parse import urlencode

import requests


class KcSigner:
    def __init__(self, api_key: str, api_secret: str, api_passphrase: str,
                 broker_partner: str = "", broker_name: str = "", broker_key: str = ""):
        """
        KcSigner contains information about 'apiKey', 'apiSecret', 'apiPassPhrase'
        and provides methods to sign and generate headers for API requests.
        """
        self.api_key = api_key or ""
        self.api_secret = api_secret or ""
        self.api_passphrase = api_passphrase or ""
        self.broker_partner = broker_partner or ""
        self.broker_name = broker_name or ""
        self.broker_key = broker_key or ""

        # Encrypt passphrase
        if api_passphrase and api_secret:
            self.api_passphrase = self.sign(
                api_passphrase.encode('utf-8'),
                api_secret.encode('utf-8')
            )

        if not all([api_key, api_secret, api_passphrase]):
            logging.warning("API token is empty. Access is restricted to public interfaces only.")

    def sign(self, plain: bytes, key: bytes) -> str:
        hm = hmac.new(key, plain, hashlib.sha256)
        return base64.b64encode(hm.digest()).decode()

    def headers(self, plain: str) -> dict:
        """
        Generate signature headers for API authorization.
        """
        timestamp = str(int(time.time() * 1000))
        signature = self.sign((timestamp + plain).encode("utf-8"), self.api_secret.encode("utf-8"))

        headers = {
            "KC-API-KEY": self.api_key,
            "KC-API-PASSPHRASE": self.api_passphrase,
            "KC-API-TIMESTAMP": timestamp,
            "KC-API-SIGN": signature,
            "KC-API-KEY-VERSION": "2"
        }

        # Add broker headers if all parameters are provided
        if self.broker_partner and self.broker_name and self.broker_key:
            message = timestamp + self.broker_partner + self.api_key
            partner_sign = base64.b64encode(
                hmac.new(self.broker_key.encode("utf-8"), message.encode("utf-8"), hashlib.sha256).digest()
            ).decode()

            headers.update({
                "KC-API-PARTNER": self.broker_partner,
                "KC-API-PARTNER-SIGN": partner_sign,
                "KC-BROKER-NAME": self.broker_name,
                "KC-API-PARTNER-VERIFY": True
            })

        return headers


def process_headers(signer: KcSigner, body: bytes, raw_url: str,
                    request: requests.PreparedRequest, method: str):
    request.headers["Content-Type"] = "application/json"

    payload = method + raw_url + body.decode()
    headers = signer.headers(payload)
    request.headers.update(headers)


def get_trade_fees(signer: KcSigner, session: requests.Session):
    endpoint = "https://api.kucoin.com"
    path = "/api/v1/trade-fees"
    method = "GET"
    query_params = {"symbols": "BTC-USDT"}

    full_path = f"{endpoint}{path}?{urlencode(query_params)}"
    raw_url = f"{path}?{urlencode(query_params)}"

    req = requests.Request(method=method, url=full_path).prepare()
    process_headers(signer, b"", raw_url, req, method)

    resp = session.send(req)
    print(json.loads(resp.content))


def add_limit_order(signer: KcSigner, session: requests.Session):
    endpoint = "https://api.kucoin.com"
    path = "/api/v1/hf/orders"
    method = "POST"

    order_data = json.dumps({
        "clientOid": str(uuid.uuid4()),
        "side": "buy",
        "symbol": "BTC-USDT",
        "type": "limit",
        "price": "100000",
        "size": "0.00001"
    })

    full_path = f"{endpoint}{path}"
    raw_url = path

    req = requests.Request(method=method, url=full_path, data=order_data).prepare()
    process_headers(signer, order_data.encode(), raw_url, req, method)

    resp = session.send(req)
    print(json.loads(resp.content))


def add_futures_limit_order(signer: KcSigner, session: requests.Session):
    endpoint = "https://api-futures.kucoin.com"
    path = "/api/v1/orders"
    method = "POST"

    order_data = json.dumps({
        "clientOid": str(uuid.uuid4()),
        "side": "buy",
        "symbol": "XBTUSDTM",
        "type": "limit",
        "price": "91000",
        "size": 1,
        "leverage": "5",
        "marginMode": "CROSS",
        "reduceOnly": False,
        "timeInForce": "GTC"
    })

    full_path = f"{endpoint}{path}"
    raw_url = path

    req = requests.Request(method=method, url=full_path, data=order_data).prepare()
    process_headers(signer, order_data.encode(), raw_url, req, method)

    resp = session.send(req)
    resp_obj = json.loads(resp.content)
    print(resp_obj)


def query_broker_user(signer: KcSigner, session: requests.Session):
    """
    Call Broker API: GET /api/v2/broker/queryUser
    No request parameters required.
    """
    endpoint = "https://api.kucoin.com"
    path = "/api/v2/broker/queryUser"
    method = "GET"

    full_path = f"{endpoint}{path}"
    raw_url = path  # No query params, so raw_url is just the path

    # Prepare request
    req = requests.Request(method=method, url=full_path).prepare()

    # No body for GET requests
    process_headers(signer, b"", raw_url, req, method)

    # Send request
    resp = session.send(req)
    print(json.loads(resp.content))


if __name__ == "__main__":
    # Load credentials
    key = os.getenv("API_KEY", "")
    secret = os.getenv("API_SECRET", "")
    passphrase = os.getenv("API_PASSPHRASE", "")

    brokerPartner = os.getenv("KC-API-PARTNER", "")
    brokerName = os.getenv("KC-BROKER-NAME", "")
    brokerKey = os.getenv("BROKER-KEY", "")

    session = requests.Session()
    signer = KcSigner(key, secret, passphrase, brokerPartner, brokerName, brokerKey)

    # Execute General API calls
    get_trade_fees(signer, session)
    add_limit_order(signer, session)
    add_futures_limit_order(signer, session)

    # API Broker calls
    # query_broker_user(signer, session)
```

#### Go Example[#](#go-example)

For a more production-ready implementation, please refer to:
[Code](https://github.com/Kucoin/kucoin-universal-sdk/blob/main/sdk/golang/internal/infra/default_transport.go)

```
package main

import (
 "bytes"
 "crypto/hmac"
 "crypto/sha256"
 "encoding/base64"
 "encoding/json"
 "fmt"
 "github.com/google/uuid"
 "io"
 "net/http"
 "os"
 "strconv"
 "time"
)

type KcSigner struct {
 apiKey        string
 apiSecret     string
 apiPassPhrase string
}

func Sign(plain []byte, key []byte) []byte {
 hm := hmac.New(sha256.New, key)
 hm.Write(plain)
 data := hm.Sum(nil)
 return []byte(base64.StdEncoding.EncodeToString(data))
}

func (ks *KcSigner) Headers(plain string) map[string]string {
 t := strconv.FormatInt(time.Now().UnixNano()/1000000, 10)
 p := []byte(t + plain)
 s := string(Sign(p, []byte(ks.apiSecret)))
 ksHeaders := map[string]string{
  "KC-API-KEY":         ks.apiKey,
  "KC-API-PASSPHRASE":  ks.apiPassPhrase,
  "KC-API-TIMESTAMP":   t,
  "KC-API-SIGN":        s,
  "KC-API-KEY-VERSION": "2",
 }
 return ksHeaders
}

func NewKcSigner(key, secret, passPhrase string) *KcSigner {
 ks := &KcSigner{
  apiKey:        key,
  apiSecret:     secret,
  apiPassPhrase: string(Sign([]byte(passPhrase), []byte(secret))),
 }
 return ks
}

func getTradeFees(signer *KcSigner, client *http.Client) {
 endpoint := "https://api.kucoin.com"
 path := "/api/v1/trade-fees"
 method := "GET"
 queryParams := "symbols=BTC-USDT"

 fullURL := fmt.Sprintf("%s%s?%s", endpoint, path, queryParams)
 rawPath := fmt.Sprintf("%s?%s", path, queryParams)

 req, err := http.NewRequest(method, fullURL, nil)
 if err != nil {
  fmt.Println("Error creating request:", err)
  return
 }
 var b bytes.Buffer
 b.WriteString(method)
 b.WriteString(rawPath)
 b.Write([]byte{})

 headers := signer.Headers(b.String())
 for k, v := range headers {
  req.Header.Set(k, v)
 }
 resp, err := client.Do(req)
 if err != nil {
  fmt.Println("Error sending request:", err)
  return
 }
 defer resp.Body.Close()

 body, err := io.ReadAll(resp.Body)
 if err != nil {
  fmt.Println("Error reading response:", err)
  return
 }

 fmt.Println("Response:", string(body))
}

func addLimitOrder(signer *KcSigner, client *http.Client) {
 endpoint := "https://api.kucoin.com"
 path := "/api/v1/hf/orders"
 method := "POST"

 orderData := map[string]interface{}{
  "clientOid": uuid.NewString(),
  "side":      "buy",
  "symbol":    "BTC-USDT",
  "type":      "limit",
  "price":     "10000",
  "size":      "0.001",
 }

 orderDataBytes, err := json.Marshal(orderData)
 if err != nil {
  fmt.Println("Error marshalling order data:", err)
  return
 }

 fullURL := fmt.Sprintf("%s%s", endpoint, path)

 var b bytes.Buffer
 b.WriteString(method)
 b.WriteString(path)
 b.Write(orderDataBytes)

 req, err := http.NewRequest(method, fullURL, bytes.NewBuffer(orderDataBytes))
 if err != nil {
  fmt.Println("Error creating request:", err)
  return
 }

 headers := signer.Headers(b.String())
 for k, v := range headers {
  req.Header.Set(k, v)
 }

 req.Header.Set("Content-Type", "application/json")

 resp, err := client.Do(req)
 if err != nil {
  fmt.Println("Error sending request:", err)
  return
 }
 defer resp.Body.Close()

 body, err := io.ReadAll(resp.Body)
 if err != nil {
  fmt.Println("Error reading response:", err)
  return
 }

 fmt.Println("Response:", string(body))
}

func SignExample() {
 apiKey := os.Getenv("API_KEY")
 apiSecret := os.Getenv("API_SECRET")
 passphrase := os.Getenv("API_PASSPHRASE")

 signer := NewKcSigner(apiKey, apiSecret, passphrase)

 client := &http.Client{}

 getTradeFees(signer, client)
 addLimitOrder(signer, client)
}
```

Modified at 12 days ago

[

Previous

Introduction

](/docs-new/introduction)[

Next

Enums Definitions

](/docs-new/enums-definitions)

[LLMs.txt](/docs-new/llms.txt)

On this page

[Generating an API Key](#generating-an-api-key)

[API KEY PERMISSIONS](#api-key-permissions)

[Creating a Request](#creating-a-request)

[Signing a Message](#signing-a-message)

[PHP Example](#php-example)

[Python Example](#python-example)

[Go Example](#go-example)
