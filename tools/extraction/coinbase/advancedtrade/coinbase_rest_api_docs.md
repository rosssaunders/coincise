

# REFERENCE/RETAILBROKERAGEAPI_GETACCOUNTS

[Skip to main content](https://docs.cdp.coinbase.com/advanced-trade/reference/retailbrokerageapi_getaccounts#__docusaurus_skipToContent_fallback)

### Query Params

limit

int32

The number of accounts to display per page. By default, displays 49 (max 250). If `has_next` is true, additional pages of accounts are available to be fetched. Use the `cursor` parameter to start on a specified page.

cursor

string

For paginated responses, returns all responses that come after this value.

retail\_portfolio\_id

string

**(Deprecated)** Only returns the accounts matching the portfolio ID. Only applicable for legacy keys. CDP keys will default to the key's permissioned portfolio.

### Responses

`` 200

A successful response.

`` Error

An unexpected error response.

cURL

NodeJs

Python

Go

Java

C#

​x

1

```
curl -L 'https://api.coinbase.com/api/v3/brokerage/accounts' \
```

2

```
-H 'Content-Type: application/json'
```





Wrap lines

```
xxxxxxxxxx
```

1

27

1

```
{
```

2

```
  "accounts": {
```

3

```
    "uuid": "8bfc20d7-f7c6-4422-bf07-8243ca4169fe",
```

4

```
    "name": "BTC Wallet",
```

5

```
    "currency": "BTC",
```

6

```
    "available_balance": {
```

7

```
      "value": "1.23",
```

8

```
      "currency": "BTC"
```

9

```
    },
```

10

```
    "default": false,
```

11

```
    "active": true,
```

12

```
    "created_at": "2021-05-31T09:59:59Z",
```

13

```
    "updated_at": "2021-05-31T09:59:59Z",
```

14

```
    "deleted_at": "2021-05-31T09:59:59Z",
```

15

```
    "type": "FIAT",
```

16

```
    "ready": true,
```

17

```
    "hold": {
```

18

```
      "value": "1.23",
```

19

```
      "currency": "BTC"
```

20

```
    },
```

21

```
    "retail_portfolio_id": "b87a2d3f-8a1e-49b3-a4ea-402d8c389aca",
```

22

```
    "platform": "ACCOUNT_PLATFORM_CONSUMER"
```

23

```
  },
```

24

```
  "has_next": true,
```

25

```
  "cursor": "789100",
```

26

```
  "size": "integer"
```

27

```
}
```

We use cookies and similar technologies on our websites to enhance and tailor your experience, analyze our traffic, and for security and marketing. You can choose not to allow some type of cookies by clicking Manage Settings. For more information see our [Cookie Policy](https://www.coinbase.com/legal/cookie).

Manage settings

Accept all