# GET /rebate/agency/transaction_history

**Source:**
[/rebate/agency/transaction_history](https://www.gate.io/docs/developers/apiv4/en/#agencytransactionhistory-parameters)

## Authentication

Required (Private Endpoint)

## [#](#broker-obtains-transaction-history-of-recommended-users) Broker obtains transaction history of recommended users

`GET /rebate/agency/transaction_history`

_Broker obtains transaction history of recommended users_

Record query time range cannot exceed 30 days

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#agencytransactionhistory-parameters](https://www.gate.io/docs/developers/apiv4/en/#agencytransactionhistory-parameters)

| Name          | In    | Type           | Required | Description                                                                              |
| ------------- | ----- | -------------- | -------- | ---------------------------------------------------------------------------------------- |
| currency_pair | query | string         | false    | Specify the trading pair. If not specified, returns all trading pairs                    |
| user_id       | query | integer(int64) | false    | User ID. If not specified, all user records will be returned                             |
| from          | query | integer(int64) | false    | Start time for querying records, defaults to 7 days before current time if not specified |
| to            | query | integer(int64) | false    | End timestamp for the query, defaults to current time if not specified                   |
| limit         | query | integer        | false    | Maximum number of records returned in a single list                                      |
| offset        | query | integer        | false    | List offset, starting from 0                                                             |

> Example responses

> 200 Response

```
{
  "total": 100,
  "list": [
    {
      "transaction_time": 1539852480,
      "user_id": 10000,
      "group_name": "gateio",
      "fee": "1",
      "fee_asset": "GT",
      "currency_pair": "GT_USDT",
      "amount": "1000",
      "source": "SPOT",
      "amount_asset": "GT"
    }
  ]
}
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#agencytransactionhistory-responses](https://www.gate.io/docs/developers/apiv4/en/#agencytransactionhistory-responses)

| Status | Meaning                                                                    | Description                 | Schema |
| ------ | -------------------------------------------------------------------------- | --------------------------- | ------ |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | List retrieved successfully | Inline |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#agencytransactionhistory-responseschema](https://www.gate.io/docs/developers/apiv4/en/#agencytransactionhistory-responseschema)

Status Code **200**

| Name                 | Type           | Description                                                             |
| -------------------- | -------------- | ----------------------------------------------------------------------- |
| » currency_pair      | string         | Trading pair                                                            |
| » total              | integer(int64) | Total                                                                   |
| » list               | array          | List of transaction history                                             |
| »» AgencyTransaction | object         | none                                                                    |
| »»» transaction_time | integer(int64) | Transaction Time. (unix timestamp)                                      |
| »»» user_id          | integer(int64) | User ID                                                                 |
| »»» group_name       | string         | Group name                                                              |
| »»» fee              | string         | Fee                                                                     |
| »»» fee_asset        | string         | Fee currency                                                            |
| »»» currency_pair    | string         | Trading pair                                                            |
| »»» amount           | string         | Transaction amount                                                      |
| »»» amount_asset     | string         | Commission Asset                                                        |
| »»» source           | string         | Commission source: SPOT - Spot commission, FUTURES - Futures commission |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#broker-obtains-rebate-history-of-recommended-users) Broker obtains rebate history of recommended users

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#broker-obtains-rebate-history-of-recommended-users](https://www.gate.io/docs/developers/apiv4/en/#broker-obtains-rebate-history-of-recommended-users)

> Code samples
