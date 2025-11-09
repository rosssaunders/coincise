# GET Account Balance

**Source:** [Get Account Balance](https://www.htx.com/en-us/opend/newApiPages/?id=8cb89359-77b5-11ed-9966-19588469969)

**Category:** Account

## Authentication

Required (Private Endpoint)

### /v5/account/balance (Get Account Balance)

Request type: GET

Signature verification: Yes

Interface permission: Read

Rate Limit: Generally, the private interface rate limit of API key is at most 144 times every 3 seconds for each UID (Trade Interface: at most 72 times every 3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is shared by all the altcoins contracts delivered by different date).

Interface description: For Multi-Assets Collateral Mode users: Get information about your Futures account.

#### Request Address

| Environment | Address |
| --- | --- |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| state | String | true | Account status 1(NORMAL): The account is functioning normally for trading and transfers. 3 (LIQUIDATING): The account is under liquidation, and trading, transfers, and the receipt of funding fees are unavailable. 5(ADL): The account is under auto deleveraging, and trading, transfers, and the receipt of funding fees are unavailable. 6(OPEN\_LIMIT): Orders are being canceled for risk management. Only ADL orders are allowed for futures trading; transfers in are permitted, but transfers out are not allowed. |  |
| equity | String | true | Account Equity |  |
| initial\_margin | String | true | Initial margin |  |
| maintenance\_margin | String | true | Maintenance margin |  |
| maintenance\_margin\_rate | String | true | Maintenance margin ratio |  |
| profit\_unreal | String | true | Unrealized PnL |  |
| available\_margin | String | true | Available collateral |  |
| voucher\_value | String | true | voucher value(usdt) |  |
| created\_time | String | true | Account creation time |  |
| updated\_time | String | true | Account update time |  |
| details | list | true |  |  |
| currency | String | true | Cryptocurrency |  |
| equity | String | true | Equity of a cryptocurrency |  |
| available | String | true | Available balance of a cryptocurrency |  |
| withdraw\_available | String | true | withdraw\_available |  |
| profit\_unreal | String | true | Unrealized PnL |  |
| initial\_margin | String | true | Initial margin of a cryptocurrency |  |
| maintenance\_margin | String | true | Maintenance margin of a cryptocurrency |  |
| maintenance\_margin\_rate | String | true | Maintenance margin ratio of a cryptocurrency |  |
| initial\_margin\_rate | String | true | Initial margin ratio of a cryptocurrency |  |
| voucher | String | true | voucher |  |
| voucher\_value | String | true | voucher value(usdt) |  |
| created\_time | String | true | Creation time |  |
| updated\_time | String | true | Update time |  |

#### Request example

`none`

#### Response Example

##### Success Example

{

"code":

200

"data":{

"available\_margin":

"74997.0030803324"

"created\_time":

1736736784249

"details":\[

0:{

"available":

"-0.0050448676"

"created\_time":

1736756095314

"currency":

"USDT"

"equity":

"-0.0969198676"

"initial\_margin":

"2.8999998"

"initial\_margin\_rate":

"-29.921623623844075494"

"maintenance\_margin":

"0.05437499625"

"maintenance\_margin\_rate":

"-0.561030442947076415"

"profit\_unreal":

"-0.091875"

"voucher":

""

"voucher\_value":

""

"withdraw\_available":

"123456"

"updated\_time":

1736995068674

}

1:{

"available":

"1"

"created\_time":

1736994815496

"currency":

"BTC"

"equity":

"1"

"initial\_margin":

"0"

"initial\_margin\_rate":

"0"

"maintenance\_margin":

"0"

"maintenance\_margin\_rate":

"0"

"profit\_unreal":

"0"

"voucher":

""

"voucher\_value":

""

"withdraw\_available":

"123456"

"updated\_time":

1736994815496

}

\]

"equity":

"74999.9030801324"

"initial\_margin":

"2.8999998"

"maintenance\_margin":

"0.05437499625"

"maintenance\_margin\_rate":

"0.000000725000886893"

"profit\_unreal":

"-0.091875"

"state":

"normal"

"voucher\_value":

""

"updated\_time":

1736995068674

}

"message":

"Success"

"ts":

1736995070573

}