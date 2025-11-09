# GET [Cross] Query Assets Information Of All Sub-Accounts Under The Master Account

**Source:** [[Cross] Query Assets Information Of All Sub-Accounts Under The Master Account](https://www.htx.com/en-us/opend/newApiPages/?id=8cb8221f-77b5-11ed-9966-0242ac110003)

**Category:** Swap Account Interface

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v1/swap\_cross\_sub\_account\_list (\[Cross\] Query Assets Information Of All Sub-Accounts Under The Master Account)

Request type: POST

Signature verification: Yes

Interface permission: Read

Rate Limit: Generally, the private interface rate limit of API key is at most 144 times every 3 seconds for each UID (Trade Interface: at most 72 times every 3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is shared by all the altcoins contracts delivered by different date).

Interface description: The interface only supports cross margin mode.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| margin\_account | string | false | margin account，return all margin account info when null | "USDT"...，but now only USDT |  |
| direct | string | false | Search direct, If the direction is NEXT, the data is returned in positive chronological order; if the direction is PREV, the data is returned in reverse chronological order | next, prev default is next | next |
| from\_id | long | false | If the query direction is prev, from\_id should be the min query\_id in the last query result. If the query direction is next, from\_id should be the max query\_id in the last query result | Search query\_id to begin with |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | Request Processing Result | "ok" , "error" |
| ts | long | true | Time of Respond Generation, Unit: Millisecond |  |
| DATA\_START | object array | true |  |  |
| sub\_uid | long | true | sub-account UID |  |
| LIST\_START | object array | true |  |  |
| margin\_mode | string | true | margin mode | cross: cross margin mode |
| margin\_account | string | true | margin account | "USDT"... |
| margin\_asset | string | true | margin asset |  |
| margin\_balance | decimal | true | account equity |  |
| risk\_rate | decimal | true | margin rate |  |
| query\_id | long | true | Query id, which can be used as the from\_id field for the next query request. |  |
| DATA\_END | object array | false |  |  |
| sub\_uid | long | true | sub-account UID |  |
| query\_id | long | true | Query id, which can be used as the from\_id field for the next query request. |  |
| LIST\_END |  | false |  |  |
| state | String | true | Account status | 1(NORMAL): The account is functioning normally for trading and transfers. 3 (LIQUIDATING): The account is under liquidation, and trading, transfers, and the receipt of funding fees are unavailable. 5(ADL): The account is under auto deleveraging, and trading, transfers, and the receipt of funding fees are unavailable. 6(OPEN\_LIMIT): Orders are being canceled for risk management. Only ADL orders are allowed for futures trading; transfers in are permitted, but transfers out are not allowed. |
| equity | String | true | Account Equity |  |
| initial\_margin | String | true | Initial margin |  |
| maintenance\_margin | String | true | Maintenance margin |  |
| maintenance\_margin\_rate | String | true | Maintenance margin ratio |  |
| profit\_unreal | String | true | Unrealized PnL |  |
| available\_margin | String | true | Available collateral |  |
| created\_time | String | true | Account creation time |  |
| updated\_time | String | true | Account update time |  |
| details | list | true |  |  |
| DATA\_START | object array | true |  |  |

Notes:  
Only return data for activated contract sub-account (i.e. sub-accounts that have gained contract trading permission).

#### Request example

{

"margin\_account":

"USDT"

}

#### Response Example

##### Success Example

{

"status":

"ok"

"data":\[

0:{

"query\_id":

20699714

"sub\_uid":

414513021

"list":\[\]

"asset\_multi\_sub":{

"state":

"normal"

"equity":

"0"

"initial\_margin":

"0"

"maintenance\_margin":

"0"

"maintenance\_margin\_rate":

"0"

"profit\_unreal":

"0"

"available\_margin":

"0"

"created\_time":

1743393157729

"updated\_time":

1743393157729

"details":\[\]

}

}

1:{

"query\_id":

20785109

"sub\_uid":

415353372

"list":\[

0:{

"margin\_balance":

0

"risk\_rate":

NULL

"margin\_asset":

"USDT"

"margin\_mode":

"cross"

"margin\_account":

"USDT"

"trade\_partition":

"USDT"

}

\]

"asset\_multi\_sub":

NULL

}

2:{

"query\_id":

20829528

"sub\_uid":

415779795

"list":\[\]

"asset\_multi\_sub":

NULL

}

3:{

"query\_id":

27711735

"sub\_uid":

486424213

"list":\[

0:{

"margin\_balance":

5e-9

"risk\_rate":

NULL

"margin\_asset":

"USDT"

"margin\_mode":

"cross"

"margin\_account":

"USDT"

"trade\_partition":

"USDT"

}

\]

"asset\_multi\_sub":

NULL

}

4:{

"query\_id":

30091410

"sub\_uid":

511356054

"list":\[

0:{

"margin\_balance":

3.5e-15

"risk\_rate":

NULL

"margin\_asset":

"USDT"

"margin\_mode":

"cross"

"margin\_account":

"USDT"

"trade\_partition":

"USDT"

}

\]

"asset\_multi\_sub":

NULL

}

5:{

"query\_id":

32131301

"sub\_uid":

531926803

"list":\[

0:{

"margin\_balance":

0

"risk\_rate":

NULL

"margin\_asset":

"USDT"

"margin\_mode":

"cross"

"margin\_account":

"USDT"

"trade\_partition":

"USDT"

}

\]

"asset\_multi\_sub":

NULL

}

6:{

"query\_id":

32131360

"sub\_uid":

531927396

"list":\[

0:{

"margin\_balance":

0

"risk\_rate":

NULL

"margin\_asset":

"USDT"

"margin\_mode":

"cross"

"margin\_account":

"USDT"

"trade\_partition":

"USDT"

}

\]

"asset\_multi\_sub":

NULL

}

7:{

"query\_id":

32551209

"sub\_uid":

536147469

"list":\[\]

"asset\_multi\_sub":

NULL

}

8:{

"query\_id":

32674241

"sub\_uid":

537382988

"list":\[

0:{

"margin\_balance":

0

"risk\_rate":

NULL

"margin\_asset":

"USDT"

"margin\_mode":

"cross"

"margin\_account":

"USDT"

"trade\_partition":

"USDT"

}

\]

"asset\_multi\_sub":

NULL

}

\]

"ts":

1743393401798

}