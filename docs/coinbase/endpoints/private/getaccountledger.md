# GET /unknown

**Source:**
[Get a single account's ledger](https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getaccountledger)

## Authentication

Required (Private Endpoint)

**Caution**If neither `start_date` nor `end_date` is set, the endpoint will
return ledger activity for the past 1 day only.

List account activity of the API key’s profile. Account activity either
increases or decreases your account balance.

##

[​

](#api-key-permissions)

API Key Permissions

This endpoint requires either the “view” or “trade” permission.

##

[​

](#entry-types)

Entry Types

Entry type indicates the reason for the account change.

| Type       | Description                                                              |
| ---------- | ------------------------------------------------------------------------ |
| transfer   | Funds moved to/from Coinbase to Coinbase Exchange                        |
| match      | Funds moved as a result of a trade                                       |
| fee        | Fee as a result of a trade                                               |
| rebate     | Fee rebate as per our [fee schedule](https://exchange.coinbase.com/fees) |
| conversion | Funds converted between fiat currency and a stablecoin                   |

##

[​

](#details)

Details

If an entry is the result of a trade (match, fee), the details field contains
additional information about the trade.

##

[​

](#pagination)

Pagination

Items are paginated and sorted latest first. See
[Pagination](/exchange/rest-api/pagination) for retrieving additional entries
after the first page.

##

[​

](#searching-by-date)

Searching By Date

Searching by start and end dates are inclusive of the time provided and can be
combined with before or after fields to narrow down the search to entries from a
specific time range. Dates must be after Unix Epoch time and are restricted to
the following formats:

- [RFC3339](https://www.rfc-editor.org/rfc/rfc3339) (i.e.,
  `2006-01-02T15:04:05.000000Z` or `2006-01-02T15:04:05+05:30`)
- `2006-01-02`
- `2006-01-02T15:04:05`

A `400 Bad Request` error is returned for any formats that are not accepted.

#### Authorizations

| Parameter            | Type   | Required | Description                               |
| -------------------- | ------ | -------- | ----------------------------------------- |
| cb-access-key        | string | required | ​cb-access-keystringheaderrequired        |
| cb-access-passphrase | string | required | ​cb-access-passphrasestringheaderrequired |
| cb-access-sign       | string | required | ​cb-access-signstringheaderrequired       |
| cb-access-timestamp  | string | required | ​cb-access-timestampstringheaderrequired  |

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

| Parameter  | Type   | Required | Description               |
| ---------- | ------ | -------- | ------------------------- |
| account_id | string | required | ​account_idstringrequired |

[​

](#parameter-account-id)

account_id

string

required

Returns list of ledger entries from this account id.

#### Query Parameters

| Parameter  | Type    | Required | Description                                                                                                                                                  |
| ---------- | ------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| start_date | string  | optional | Search by minimum posted date time and is inclusive of time provided. Valid formats are either RFC3339, date or date time and must be after Unix Epoch time. |
| end_date   | string  | optional | Search by maximum posted date time and is inclusive of time provided. Valid formats are either RFC3339, date or date time and must be after Unix Epoch time. |
| before     | string  | optional | Used for pagination. Sets start cursor to before id.                                                                                                         |
| after      | string  | optional | Used for pagination. Sets end cursor to after id.                                                                                                            |
| limit      | integer | optional | ​limitintegerdefault:100                                                                                                                                     |
| profile_id | string  | optional |                                                                                                                                                              |

[​

](#parameter-start-date)

start_date

string

Search by minimum posted date time and is inclusive of time provided. Valid
formats are either RFC3339, date or date time and must be after Unix Epoch time.

[​

](#parameter-end-date)

end_date

string

Search by maximum posted date time and is inclusive of time provided. Valid
formats are either RFC3339, date or date time and must be after Unix Epoch time.

[​

](#parameter-before)

before

string

Used for pagination. Sets start cursor to `before` id.

[​

](#parameter-after)

after

string

Used for pagination. Sets end cursor to `after` id.

[​

](#parameter-limit)

limit

integer

default:100

Limit on number of results to return.

[​

](#parameter-profile-id)

profile_id

string

#### Response

| Parameter  | Type   | Required | Description                               |
| ---------- | ------ | -------- | ----------------------------------------- |
| id         | string | required |                                           |
| amount     | string | required | ​amountstringrequired                     |
| created_at | string | required | ​created_atstring<date-time>required      |
| balance    | string | required | ​balancestringrequired                    |
| type       | string | required | ​typeenum<string>default:transferrequired |
| details    | object | required | ​detailsobjectrequired                    |

200

application/json

[​

](#response-id)

id

string

required

[​

](#response-amount)

amount

string

required

[​

](#response-created-at)

created_at

string<date-time>

required

[​

](#response-balance)

balance

string

required

[​

](#response-type)

type

enum<string>

default:transfer

required

Available options:

`transfer`,

`match`,

`fee`,

`conversion`,

`margin_interest`,

`rebate`,

`otc_fee`,

`otc_match`,

`tax_credit`,

`rfq_match`,

`rfq_fee`,

`match_conversion`,

`stake_wrap`,

`conversion_fee`,

`redeem`

[​

](#response-details)

details

object

required

Show child attributes
