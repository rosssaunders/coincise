# Coinbase Exchange API Documentation

## Table of Contents

- [Welcome to Coinbase Exchange API - Coinbase](#welcome-to-coinbase-exchange-api-coinbase)
- [Exchange REST API Requests - Coinbase](#exchange-rest-api-requests-coinbase)
- [Exchange REST API Rate Limits - Coinbase](#exchange-rest-api-rate-limits-coinbase)
- [Exchange REST API Pagination - Coinbase](#exchange-rest-api-pagination-coinbase)
- [Exchange Types - Coinbase](#exchange-types-coinbase)

---

# Welcome to Coinbase Exchange API - Coinbase

**Source:**
[https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/introduction](https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/introduction)

## ​Getting Started

- [Authentication](/exchange/rest-api/authentication)
- [Rate Limits](/exchange/rest-api/rate-limits)
- [Pagination](/exchange/rest-api/pagination)
- [Status Codes](/exchange/rest-api/requests)
- [Quickstart](/exchange/introduction/rest-quickstart)

## ​FIX API

- [FIX API reference](/exchange/fix-api/connectivity)

## ​WebSocket API

- [WebSocket API reference](/exchange/websocket-feed/overview)

---

# Exchange REST API Requests - Coinbase

**Source:**
[https://docs.cdp.coinbase.com/exchange/rest-api/requests](https://docs.cdp.coinbase.com/exchange/rest-api/requests)

### ​Common Error Codes

| Status Code | Reason                                                       |
| ----------- | ------------------------------------------------------------ |
| 400         | Bad Request — Invalid request format                         |
| 401         | Unauthorized — Invalid API Key                               |
| 403         | Forbidden — You do not have access to the requested resource |
| 404         | Not Found                                                    |
| 500         | Internal Server Error — We had a problem with our server     |

---

# Exchange REST API Rate Limits - Coinbase

**Source:**
[https://docs.cdp.coinbase.com/exchange/rest-api/rate-limits](https://docs.cdp.coinbase.com/exchange/rest-api/rate-limits)

### ​Public Endpoints

- Requests per second per IP: 10
- Requests per second per IP in bursts: Up to 15

### ​Private Endpoints

- Requests per second per profile: 15
- Requests per second per profile in bursts: Up to 30

### ​Private /fills Endpoint

- Requests per second per profile: 10
- Requests per second per profile in bursts: Up to 20

### ​Private /loans Endpoint

- Requests per second per profile: 10

---

# Exchange REST API Pagination - Coinbase

**Source:**
[https://docs.cdp.coinbase.com/exchange/rest-api/pagination](https://docs.cdp.coinbase.com/exchange/rest-api/pagination)

### ​Parameters

| Parameter | Default | Description                                                |
| --------- | ------- | ---------------------------------------------------------- |
| `before`  |         | Request page before (newer) this pagination id             |
| `after`   |         | Request page after (older) this pagination id              |
| `limit`   | 1000    | Number of results per request. Maximum 1000 (default 1000) |

---

# Exchange Types - Coinbase

**Source:**
[https://docs.cdp.coinbase.com/exchange/rest-api/types](https://docs.cdp.coinbase.com/exchange/rest-api/types)

```
2014-11-06T10:34:47.123456Z
```

---
