# GET Exchange Vasp List

**Source:** [Get Exchange Vasp List](https://www.htx.com/en-us/opend/newApiPages/?id=8cb89359-77b5-11ed-9966-195ac7dd1a7)

**Category:** Wallet (Deposits and Withdrawals)

## Authentication

Required (Private Endpoint)

### /v1/query/vasp-list (Get Exchange Vasp List)

Request type: GET

Signature verification: No

Interface permission: Read

Rate Limit: 1 time/s

Interface description: description:This interface is mainly used by individual users in South Korea, who enter exchange information when withdrawing funds.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.huobi.pro |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | false |  | ok , "error" |
| DATA\_START |  | true |  |  |
| vasp-id | string | true | Exchange ID |  |
| vasp-name | string | true | Exchange Name |  |
| legal-name | string | true | Legal name of the exchange |  |
| DATA\_START |  | false |  |  |

#### Request example

No data

#### Response Example

##### Success Example

No data