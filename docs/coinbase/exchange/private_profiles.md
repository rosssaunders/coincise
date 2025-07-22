# Coinbase Exchange API Documentation

## Table of Contents

- [Create a profile - Coinbase](#create-a-profile-coinbase)
- [Delete a profile - Coinbase](#delete-a-profile-coinbase)
- [Get profile by id - Coinbase](#get-profile-by-id-coinbase)
- [Get profiles - Coinbase](#get-profiles-coinbase)
- [Rename a profile - Coinbase](#rename-a-profile-coinbase)
- [Transfer funds between profiles - Coinbase](#transfer-funds-between-profiles-coinbase)

---

# Create a profile - Coinbase

**Source:**
[https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/profiles/create-profile](https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/profiles/create-profile)

## Endpoint

`POST /profiles`

## Description

Create a new profile. Will fail if no name is provided or if user already has
max number of profiles.

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

| Field      | Type    | Required | Description |
| ---------- | ------- | -------- | ----------- |
| id         | string  | Yes      |             |
| user_id    | string  | Yes      |             |
| name       | string  | Yes      |             |
| active     | boolean | Yes      |             |
| is_default | boolean | Yes      |             |
| created_at | string  | Yes      |             |

#### Example Response

```json
{
  "id": "8058d771-2d88-4f0f-ab6e-299c153d4308",
  "user_id": "5cf6e115aaf44503db300f1e",
  "name": "default",
  "active": true,
  "is_default": true,
  "created_at": "2019-06-04T21:22:32.226Z"
}
```

---

# Delete a profile - Coinbase

**Source:**
[https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/profiles/delete-profile](https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/profiles/delete-profile)

## Endpoint

`PUT /profiles/%7Bprofile_id%7D/deactivate`

## Description

Deletes the profile specified by profile_id and transfers all funds to the
profile specified by to. Fails if there are any open orders on the profile to be
deleted.

## Authorization

| Header               | Type   | Required |
| -------------------- | ------ | -------- |
| cb-access-key        | string | Yes      |
| cb-access-passphrase | string | Yes      |
| cb-access-sign       | string | Yes      |
| cb-access-timestamp  | string | Yes      |

## Path Parameters

| Parameter  | Type   | Required | Description |
| ---------- | ------ | -------- | ----------- |
| profile_id | string | Yes      |             |

## Response

### 200 Success

A successful response.

#### Example Response

```json
{}
```

---

# Get profile by id - Coinbase

**Source:**
[https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/profiles/get-profile-by-id](https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/profiles/get-profile-by-id)

## Endpoint

`GET /profiles/%7Bprofile_id%7D`

## Authorization

| Header               | Type   | Required |
| -------------------- | ------ | -------- |
| cb-access-key        | string | Yes      |
| cb-access-passphrase | string | Yes      |
| cb-access-sign       | string | Yes      |
| cb-access-timestamp  | string | Yes      |

## Path Parameters

| Parameter  | Type   | Required | Description |
| ---------- | ------ | -------- | ----------- |
| profile_id | string | Yes      |             |

## Query Parameters

| Parameter | Type    | Description |
| --------- | ------- | ----------- |
| active    | boolean |             |

## Response

### 200 Success

#### Response Fields

| Field      | Type    | Required | Description |
| ---------- | ------- | -------- | ----------- |
| id         | string  | Yes      |             |
| user_id    | string  | Yes      |             |
| name       | string  | Yes      |             |
| active     | boolean | Yes      |             |
| is_default | boolean | Yes      |             |
| created_at | string  | Yes      |             |

#### Example Response

```json
{
  "id": "8058d771-2d88-4f0f-ab6e-299c153d4308",
  "user_id": "5cf6e115aaf44503db300f1e",
  "name": "default",
  "active": true,
  "is_default": true,
  "created_at": "2019-06-04T21:22:32.226Z"
}
```

---

# Get profiles - Coinbase

**Source:**
[https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/profiles/get-profiles](https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/profiles/get-profiles)

## Endpoint

`GET /profiles`

## Description

Gets a list of all of the current user’s profiles.

## Authorization

| Header               | Type   | Required |
| -------------------- | ------ | -------- |
| cb-access-key        | string | Yes      |
| cb-access-passphrase | string | Yes      |
| cb-access-sign       | string | Yes      |
| cb-access-timestamp  | string | Yes      |

## Query Parameters

| Parameter | Type    | Description |
| --------- | ------- | ----------- |
| active    | boolean |             |

## Response

### 200 Success

#### Response Fields

| Field      | Type    | Required | Description |
| ---------- | ------- | -------- | ----------- |
| id         | string  | Yes      |             |
| user_id    | string  | Yes      |             |
| name       | string  | Yes      |             |
| active     | boolean | Yes      |             |
| is_default | boolean | Yes      |             |
| created_at | string  | Yes      |             |

#### Example Response

```json
[
  {
    "id": "8058d771-2d88-4f0f-ab6e-299c153d4308",
    "user_id": "5cf6e115aaf44503db300f1e",
    "name": "default",
    "active": true,
    "is_default": true,
    "created_at": "2019-06-04T21:22:32.226Z"
  }
]
```

---

# Rename a profile - Coinbase

**Source:**
[https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/profiles/rename-profile](https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/profiles/rename-profile)

## Endpoint

`PUT /profiles/%7Bprofile_id%7D`

## Authorization

| Header               | Type   | Required |
| -------------------- | ------ | -------- |
| cb-access-key        | string | Yes      |
| cb-access-passphrase | string | Yes      |
| cb-access-sign       | string | Yes      |
| cb-access-timestamp  | string | Yes      |

## Path Parameters

| Parameter  | Type   | Required | Description |
| ---------- | ------ | -------- | ----------- |
| profile_id | string | Yes      |             |

## Response

### 200 Success

#### Response Fields

| Field      | Type    | Required | Description |
| ---------- | ------- | -------- | ----------- |
| id         | string  | Yes      |             |
| user_id    | string  | Yes      |             |
| name       | string  | Yes      |             |
| active     | boolean | Yes      |             |
| is_default | boolean | Yes      |             |
| created_at | string  | Yes      |             |

#### Example Response

```json
{
  "id": "8058d771-2d88-4f0f-ab6e-299c153d4308",
  "user_id": "5cf6e115aaf44503db300f1e",
  "name": "default",
  "active": true,
  "is_default": true,
  "created_at": "2019-06-04T21:22:32.226Z"
}
```

---

# Transfer funds between profiles - Coinbase

**Source:**
[https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/profiles/transfer-funds-profile](https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/profiles/transfer-funds-profile)

## Endpoint

`POST /profiles/transfer`

## Permissions

This endpoint requires the “transfer” permission.

## Authorization

| Header               | Type   | Required |
| -------------------- | ------ | -------- |
| cb-access-key        | string | Yes      |
| cb-access-passphrase | string | Yes      |
| cb-access-sign       | string | Yes      |
| cb-access-timestamp  | string | Yes      |

## Response

### 200 Success

A successful response.

#### Example Response

```json
{}
```

---
