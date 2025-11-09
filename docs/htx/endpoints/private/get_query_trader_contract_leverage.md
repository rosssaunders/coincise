# GET Query trader contract leverage

**Source:** [Query trader contract leverage](https://www.htx.com/en-us/opend/newApiPages/?id=8cb89359-77b5-11ed-9966-19126a9c7ea)

**Category:** Future Copy Trade

## Authentication

Required (Private Endpoint)

### /copytrading/trader/query\_contract\_lever (Query trader contract leverage)

Request type: GET

Signature verification: Yes

Interface permission: Read

Rate Limit: A single user requests all copytrading interfaces 18 times per second.

Interface description: This interface is used to query the trader’s leverage level

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | String | true | BTC-USDT |  |  |
| margin\_mode | String | true | isolated：，cross： |  |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| tid | String | true | request id |  |
| DATA>\_START |  | true |  |  |
| contract\_code | String | true | BTC-USDT |  |
| margin\_mode | String | true | isolated：，cross： |  |
| lever\_rate\_range | Integer | true |  |  |
| current\_lever\_rate | Integer | true |  |  |
| DATA\_END |  | false |  |  |
| code | long | true |  |  |

#### Request example

`curl"https://api.hbdm.com/copytrading/trader/query_contract_lever?contract_code=DOT-USDT&margin_mode=cross"`

#### Response Example

##### Success Example

{

"code":

200

"data":{

"lever\_rate\_range":\[

0

:

1

1

:

75

\]

"current\_lever\_rate":

5

"contract\_code":

"DOT-USDT"

"margin\_mode":

"cross"

}

"tid":

"5bc3deb33abe417dbe79b43d094e0474"

"success":

true

}