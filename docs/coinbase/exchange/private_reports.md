# Coinbase Exchange API Documentation

## Table of Contents

- [Create a report - Coinbase](#create-a-report-coinbase)
- [Get a report - Coinbase](#get-a-report-coinbase)
- [Get all reports - Coinbase](#get-all-reports-coinbase)

---

# Create a report - Coinbase

**Source:**
[https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/reports/create-report](https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/reports/create-report)

## Endpoint

`POST /reports`

## Description

Reports provide batches of historic information about your profile in various
human and machine readable forms.

## Permissions

This endpoint requires either the “view” or “trade” permission.

## Authorization

| Header               | Type   | Required |
| -------------------- | ------ | -------- |
| cb-access-key        | string | Yes      |
| cb-access-passphrase | string | Yes      |
| cb-access-sign       | string | Yes      |
| cb-access-timestamp  | string | Yes      |

## Response

### 200 Success

#### Response Fields

| Field  | Type         | Required | Description |
| ------ | ------------ | -------- | ----------- |
| id     | string       | Yes      |             |
| type   | string       | Yes      |             |
| status | enum<string> | Yes      |             |

#### Example Response

```json
{
  "id": "<string>",
  "type": "<string>",
  "status": "pending"
}
```

---

# Get a report - Coinbase

**Source:**
[https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/reports/get-report](https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/reports/get-report)

## Endpoint

`GET /reports/%7Breport_id%7D`

## Description

Once a report request has been accepted for processing, you can poll the report
resource endpoint at /reports/{report_id} for its status. When status is ready,
the final report is uploaded and available at {file_url}.

## Permissions

This endpoint requires either the “view” or “trade” permission.

## Authorization

| Header               | Type   | Required |
| -------------------- | ------ | -------- |
| cb-access-key        | string | Yes      |
| cb-access-passphrase | string | Yes      |
| cb-access-sign       | string | Yes      |
| cb-access-timestamp  | string | Yes      |

## Path Parameters

| Parameter | Type   | Required | Description |
| --------- | ------ | -------- | ----------- |
| report_id | string | Yes      |             |

## Response

### 200 Success

#### Response Fields

| Field        | Type         | Required | Description |
| ------------ | ------------ | -------- | ----------- |
| id           | string       | Yes      |             |
| type         | string       | Yes      |             |
| created_at   | string       | Yes      |             |
| completed_at | string       | Yes      |             |
| expires_at   | string       | Yes      |             |
| status       | enum<string> | Yes      |             |
| user_id      | string       | Yes      |             |
| file_url     | string       | Yes      |             |
| params       | object       | Yes      |             |
| file_count   | string       | No       |             |

#### Example Response

```json
{
  "start_date": "2019-06-25T22:13:48.592Z",
  "end_date": "2019-07-25T22:13:48.592Z",
  "format": "pdf",
  "product_id": "ALL",
  "account_id": "ALL",
  "profile_id": "8058d771-2d88-4f0f-ab6e-299c153d4308",
  "email": "user1@example.com",
  "user": {
    "created_at": "2019-06-04T21:22:32.226Z",
    "active_at": "2019-06-04T21:27:49.250Z",
    "id": "5cf6e115aaf44503db300f1e",
    "name": "User One",
    "email": "user1@example.com",
    "is_banned": false,
    "user_type": "individual",
    "fulfills_new_requirements": true,
    "oauth_client": "pro",
    "preferences": {
      "preferred_market": "BTC-USD",
      "margin_terms_completed_in_utc": "2019-06-13T23:40:17.752Z",
      "margin_tutorial_completed_in_utc": "2019-06-19T23:56:59.411Z"
    },
    "has_default": false
  },
  "new_york_state": false
}
```

---

# Get all reports - Coinbase

**Source:**
[https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/reports/get-all-reports](https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/reports/get-all-reports)

## Endpoint

`GET /reports`

## Description

Once a report request has been accepted for processing, you can poll the report
resource endpoint at /reports/{report_id} for its status. When status is ready,
the final report is uploaded and available at {file_url}.

## Permissions

This endpoint requires either the “view” or “trade” permission.

## Authorization

| Header               | Type   | Required |
| -------------------- | ------ | -------- |
| cb-access-key        | string | Yes      |
| cb-access-passphrase | string | Yes      |
| cb-access-sign       | string | Yes      |
| cb-access-timestamp  | string | Yes      |

## Query Parameters

| Parameter      | Type    | Description                                                                                                                                |
| -------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| profile_id     | string  | Filter results by a specific profile_id                                                                                                    |
| after          | string  | Filter results after a specific date                                                                                                       |
| limit          | integer | Limit results to a specific number                                                                                                         |
| type           | string  | Filter results by type of report. Possible values: [account, balance, fills, otc-fills, rfq-fills, tax-invoice, 1099k-transaction-history] |
| ignore_expired | boolean | Ignore expired results                                                                                                                     |

## Response

### 200 Success

#### Response Fields

| Field        | Type         | Required | Description |
| ------------ | ------------ | -------- | ----------- |
| id           | string       | Yes      |             |
| type         | string       | Yes      |             |
| created_at   | string       | Yes      |             |
| completed_at | string       | Yes      |             |
| expires_at   | string       | Yes      |             |
| status       | enum<string> | Yes      |             |
| user_id      | string       | Yes      |             |
| file_url     | string       | Yes      |             |
| params       | object       | Yes      |             |
| file_count   | string       | No       |             |

#### Example Response

```json
{
  "start_date": "2019-06-25T22:13:48.592Z",
  "end_date": "2019-07-25T22:13:48.592Z",
  "format": "pdf",
  "product_id": "ALL",
  "account_id": "ALL",
  "profile_id": "8058d771-2d88-4f0f-ab6e-299c153d4308",
  "email": "user1@example.com",
  "user": {
    "created_at": "2019-06-04T21:22:32.226Z",
    "active_at": "2019-06-04T21:27:49.250Z",
    "id": "5cf6e115aaf44503db300f1e",
    "name": "User One",
    "email": "user1@example.com",
    "is_banned": false,
    "user_type": "individual",
    "fulfills_new_requirements": true,
    "oauth_client": "pro",
    "preferences": {
      "preferred_market": "BTC-USD",
      "margin_terms_completed_in_utc": "2019-06-13T23:40:17.752Z",
      "margin_tutorial_completed_in_utc": "2019-06-19T23:56:59.411Z"
    },
    "has_default": false
  },
  "new_york_state": false
}
```

---
