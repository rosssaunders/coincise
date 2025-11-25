# GET Simulated Trading

**Source:** [Simulated Trading](https://developer-pro.bitmart.com/en/futuresv2/)

**API Type:** Futures

## Authentication

Required (Private Endpoint)

## Simulated Trading

Simulation API Domain:

- REST:`https://demo-api-cloud-v2.bitmart.com`
- WebSocket Public
  Channel:`wss://openapi-wsdemo-v2.bitmart.com/api?protocol=1.1`
- WebSocket Private
  Channel:`wss://openapi-wsdemo-v2.bitmart.com/user?protocol=1.1`

### Important Notes

#### 1\. **The API keys for the Simulated-Environment and the Prod-Environment are same.**

If you already have an API key, you can directly call the Simulated-Environment
using its domain. The API paths are the same as in the Prod-Environment.

#### 2\. In the Simulated-Environment, **USDX is represented as USDT in the API**.

For example:

- The trading pair `BTCUSDX` will appear as `BTCUSDT` in the API.
- When placing orders, please also use `symbol=BTCUSDT`.

#### 3\. The above domain supports **only futures trading** in the Simulated-Environment.

It does **not** support spot trading, withdrawals, deposits, transfers, or any
other functions.

---
