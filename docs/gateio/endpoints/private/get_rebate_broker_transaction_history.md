# GET /rebate/broker/transaction_history

**Source:**
[/rebate/broker/transaction_history](https://www.gate.io/docs/developers/apiv4/en/#rebatebrokertransactionhistory-parameters)

## Authentication

Required (Private Endpoint)

## [#](#broker-obtains-user-s-trading-history) Broker obtains user's trading history

`GET /rebate/broker/transaction_history`

_Broker obtains user's trading history_

Record query time range cannot exceed 30 days

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#rebatebrokertransactionhistory-parameters](https://www.gate.io/docs/developers/apiv4/en/#rebatebrokertransactionhistory-parameters)

| Name    | In    | Type           | Required | Description                                                                                   |
| ------- | ----- | -------------- | -------- | --------------------------------------------------------------------------------------------- |
| limit   | query | integer        | false    | Maximum number of records returned in a single list                                           |
| offset  | query | integer        | false    | List offset, starting from 0                                                                  |
| user_id | query | integer(int64) | false    | User ID. If not specified, all user records will be returned                                  |
| from    | query | integer(int64) | false    | Start time of the query record. If not specified, defaults to 30 days before the current time |
| to      | query | integer(int64) | false    | End timestamp for the query, defaults to current time if not specified                        |

> Example responses

> 200 Response

```json
{
  "list": [
    {
      "user_id": 110285442,
      "group_name": "",
      "fee": "0.5000045000",
      "transaction_time": 1702545051,
      "amount": "-1000.00900000",
      "currency_pair": "DOGE_USDT",
      "source": "Futures",
      "fee_asset": "USDT",
      "sub_broker_info": {
        "user_id": 110285114,
        "original_commission_rate": "0.2",
        "relative_commission_rate": "0.5",
        "commission_rate": "0.1"
      },
      "alpha_contract_addr": "0x9a26f5433671751c3276a065f57e5a02d2817973"
    }
  ],
  "total": 47
}
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#rebatebrokertransactionhistory-responses](https://www.gate.io/docs/developers/apiv4/en/#rebatebrokertransactionhistory-responses)

| Status | Meaning                                                                    | Description                 | Schema |
| ------ | -------------------------------------------------------------------------- | --------------------------- | ------ |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | List retrieved successfully | Inline |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#rebatebrokertransactionhistory-responseschema](https://www.gate.io/docs/developers/apiv4/en/#rebatebrokertransactionhistory-responseschema)

Status Code **200**

| Name                          | Type           | Description                                                |
| ----------------------------- | -------------- | ---------------------------------------------------------- |
| » total                       | integer(int64) | Total                                                      |
| » list                        | array          | List of transaction history                                |
| »» BrokerTransaction          | object         | none                                                       |
| »»» transaction_time          | integer(int64) | Transaction Time. (unix timestamp)                         |
| »»» user_id                   | integer(int64) | User ID                                                    |
| »»» group_name                | string         | Group name                                                 |
| »»» fee                       | string         | Fee amount (USDT)                                          |
| »»» currency_pair             | string         | Trading pair                                               |
| »»» amount                    | string         | Transaction amount                                         |
| »»» fee_asset                 | string         | Fee currency                                               |
| »»» source                    | string         | Commission transaction type: Spot, Futures, Options, Alpha |
| »»» sub_broker_info           | object         | Sub-broker information                                     |
| »»»» user_id                  | integer(int64) | Sub-broker user ID                                         |
| »»»» original_commission_rate | string         | Sub-broker original commission rate                        |
| »»»» relative_commission_rate | string         | Sub-broker relative commission rate                        |
| »»»» commission_rate          | string         | Sub-broker actual commission rate                          |
| »»» alpha_contract_addr       | string         | Alpha contract address                                     |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#user-obtains-rebate-information) User obtains rebate information

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#user-obtains-rebate-information](https://www.gate.io/docs/developers/apiv4/en/#user-obtains-rebate-information)

> Code samples
