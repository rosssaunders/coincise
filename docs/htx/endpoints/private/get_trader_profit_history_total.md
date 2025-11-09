# GET Trader profit history total

**Source:** [Trader profit history total](https://www.htx.com/en-us/opend/newApiPages/?id=8cb89359-77b5-11ed-9966-1912703c0c1)

**Category:** Future Copy Trade

## Authentication

Required (Private Endpoint)

### /copytrading/trader/total\_profit\_history (Trader profit history total)

Request type: GET

Signature verification: Yes

Interface permission: Read

Rate Limit: A single user requests all copytrading interfaces 18 times per second.

Interface description: This interface is used by traders to query summary information of profit sharing.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| tid | String | true | request id |  |
| DATA\_START |  | true |  |  |
| ITEMS\_START | array | true |  |  |
| profit\_currency | String | true | The currency of profit. |  |
| total\_profit\_amont | String | true | Total profit sharing amount. |  |
| ITEMS\_END |  | true |  |  |
| DATA\_END |  | false |  |  |
| code | Long | true |  |  |

#### Request example

`curl"https://api.hbdm.com/copytrading/trader/total_profit_history"`

#### Response Example

##### Success Example

{

"code":

200

"data":{

"items":\[

0:{

"profit\_currency":

"USDT"

"total\_profit\_amount":

"4708.975655472000000000"

}

\]

}

"tid":

"34373e7418d54f14b698cb93041c428c"

"success":

true

}