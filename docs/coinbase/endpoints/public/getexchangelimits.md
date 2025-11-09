# GET /unknown

**Source:**
[Get user exchange limits](https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getexchangelimits)

## Authentication

Not Required (Public Endpoint)

This request returns information on your payment method transfer limits, as well as buy/sell limits per currency.

#### Authorizations

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| cb-access-key | string | required | ​cb-access-keystringheaderrequired |
| cb-access-passphrase | string | required | ​cb-access-passphrasestringheaderrequired |
| cb-access-sign | string | required | ​cb-access-signstringheaderrequired |
| cb-access-timestamp | string | required | ​cb-access-timestampstringheaderrequired |

[​

](#authorization-cb-access-key)

cb-access-key

string

header

required

[​

](#authorization-cb-access-passphrase)

cb-access-passphrase

string

header

required

[​

](#authorization-cb-access-sign)

cb-access-sign

string

header

required

[​

](#authorization-cb-access-timestamp)

cb-access-timestamp

string

header

required

#### Path Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| user\_id | string | required | ​user\_idstringrequired |

[​

](#parameter-user-id)

user\_id

string

required

#### Response

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| transfer\_limits | object | required | ​transfer\_limitsobjectrequired |
| transfer\_limits.exchange\_withdraw | object | required | ​transfer\_limits.exchange\_withdrawobjectrequired |
| limit\_currency | string | required | ​limit\_currencystringrequired |

200

application/json

[​

](#response-transfer-limits)

transfer\_limits

object

required

Show child attributes

[​

](#response-transfer-limits-exchange-withdraw)

transfer\_limits.exchange\_withdraw

object

required

Show child attributes

Example:

```
{  "exchange_withdraw": {    "MANA": {      "max": "391282.23187385",      "remaining": "391282.23187385",      "period_in_days": 7    },    "ALGO": {      "max": "59844.404548",      "remaining": "59844.404548",      "period_in_days": 7    },    "ATOM": {      "max": "4624.277457",      "remaining": "4624.277457",      "period_in_days": 7    },    "KNC": {      "max": "21584.28663933",      "remaining": "21584.28663933",      "period_in_days": 7    }  }}
```

[​

](#response-limit-currency)

limit\_currency

string

required
