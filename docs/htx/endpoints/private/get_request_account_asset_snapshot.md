# GET Request account asset snapshot

**Source:** [Request account asset snapshot](https://www.htx.com/en-us/opend/newApiPages/?id=8cb89359-77b5-11ed-9966-18c8feecce2)

**Category:** Broker API

## Authentication

Required (Private Endpoint)

### /broker/v1/account\_capital\_snapshot\_everyday (Request account asset snapshot)

Request type: POST

Signature verification: Yes

Interface permission: Read

Rate Limit: 100 times/2s

Interface description: Users can request the account asset snapshot via this endpoint;

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.huobi.pro |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| start\_time | Long | false | Starting time If startTime and endTime are not transmitted, the data of the last 7 days will be returned by default. |  |  |
| end\_time | Long | false | End Time The start and end times cannot differ by more than 30 days. |  |  |
| account\_type | String | true | account type: spot margin-api super-margin-api delivery swap linear |  |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | false |  | ok , "error" |
| DATA\_START | object array | true |  |  |
| accountId | Integer | true | Acount id Account id Account id Account id Account id Account id Account id Account id |  |
| accountType | String | true | Account type |  |
| snapshotTime | String | true | Snapshot time，accurate to minute |  |
| convertBalance | BigDecimal | true |  |  |
| dataList | List<SpotAccountCapitalItemVo> | true |  |  |
| currency | String | true | Currency Type |  |
| balance | BigDecimal | true | Account available balance (after change) |  |
| frozenBalance | BigDecimal | true | frozen balance |  |
| waitPayLoansCapital | BigDecimal | true | Loan capital to be paid |  |
| waitPayLoansInterest | BigDecimal | true | Loan interest to be paid |  |
| netAccount | BigDecimal | true | Net assets, available + frozen - Loan capital to be paid - Loan interest to be paid |  |
| convertBalance | BigDecimal | true | Converted into USDT quantity |  |
| accountId | Integer | true | Account id |  |
| accountType | String | true | Account type |  |
| snapshotTime | String | true | Snapshot time，accurate to minute |  |
| convertBalance | BigDecimal | true | Coin-M futures account，The amount of Coin-M Swaps account assets converted into USDT |  |
| dataList | List<ContractAccountCapitalItemVo> | true |  |  |
| productId | String | true | Variety Code |  |
| contractCode | BigDecimal | true | Contract code |  |
| finalInterest | BigDecimal | true | static equity |  |
| staticInterest | BigDecimal | true | Account Equity |  |
| marginMode | String | true | Margin Mode |  |
| marginCoin | String | true | Margin Coin |  |
| positionMargin | BigDecimal | true | Position margin |  |
| frozenMargin | BigDecimal | true | Frozen Margin |  |
| availMargin | BigDecimal | true | Available Margin |  |
| dueProfitloss | BigDecimal | true | Realized profit and loss |  |
| undueProfitloss | BigDecimal | true | Unrealized profit and loss |  |
| withdrawable | BigDecimal | true | Withdrawable quantity |  |
| DATA\_END |  | false |  |  |
| ts | long | true |  |  |

#### Request example

{

"start\_time":

"12345678"

"end\_time":

"1"

"account\_type":

"spot"

}

#### Response Example

##### Success Example

No data