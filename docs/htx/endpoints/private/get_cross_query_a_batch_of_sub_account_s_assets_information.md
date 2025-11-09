# GET [Cross]Query a Batch of Sub-Account's Assets Information

**Source:** [[Cross]Query a Batch of Sub-Account's Assets Information](https://www.htx.com/en-us/opend/newApiPages/?id=8cb8243c-77b5-11ed-9966-0242ac110003)

**Category:** Swap Account Interface

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v1/swap\_cross\_sub\_account\_info\_list (\[Cross\]Query a Batch of Sub-Account's Assets Information)

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
| margin\_account | string | false | margin account，if not filled in return all margin account | "USDT"，but now just has one account usdt |  |
| page\_index | int | false | page index, if not filled in as 1st |  |  |
| page\_size | int | false | if not filled in as 20，50 at most |  |  |

Notes:  
Only return data of sub-accounts that have agreed to access the contract market.  
By default, the list of sub-accounts is in ascending order according to the time when agree to access the contract market, and and the earlier the agreed time, the first the position

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | result of server handled request | "ok" , "error" |
| ts | long | true | Time of Respond Generation，Unit：Millisecond |  |
| DATA\_START | object | true |  |  |
| SUB\_LIST\_START | object array | true |  |  |
| sub\_uid | long | true | sub uid |  |
| ACCOUNT\_INFO\_LIST\_START | object array | true |  |  |
| margin\_mode | string | true | margin mode | cross； |
| margin\_account | string | true | margin account | such as:USDT” |
| margin\_asset | string | true | margin asset |  |
| margin\_balance | decimal | true | margin balance |  |
| risk\_rate | decimal | true | risk rate |  |
| ACCOUNT\_INFO\_LIST\_END |  | false |  |  |
| SUB\_LIST\_END |  | false | sub-account UID |  |
| UNITE\_SUB\_LIST\_START | object array | true | unite sub list |  |
| sub\_uid | long | true |  |  |
| ASSET\_MULTI\_SUB\_START | object array | true | Account status |  |
| state | String | true | Account Equity | 1(NORMAL): The account is functioning normally for trading and transfers. 3 (LIQUIDATING): The account is under liquidation, and trading, transfers, and the receipt of funding fees are unavailable. 5(ADL): The account is under auto deleveraging, and trading, transfers, and the receipt of funding fees are unavailable. 6(OPEN\_LIMIT): Orders are being canceled for risk management. Only ADL orders are allowed for futures trading; transfers in are permitted, but transfers out are not allowed. |
| equity | String | true | Account Equity |  |
| initial\_margin | String | true | Initial margin |  |
| maintenance\_margin | String | true | Maintenance margin |  |
| maintenance\_margin\_rate | String | true | Maintenance margin ratio |  |
| profit\_unreal | String | true | Unrealized PnL |  |
| available\_margin | String | true | Available collateral |  |
| created\_time | String | true | Account creation time |  |
| updated\_time | String | true | Account update time |  |
| details | list | true |  |  |
| UNITE\_SUB\_LIST\_START | object array | true |  |  |
| current\_page | int | true | current page |  |
| total\_page | int | true | total page |  |
| total\_size | int | true | total size |  |
| DATA\_END |  | false |  |  |

#### Request example

{

"contract\_code":

"BTC-USDT"

"page\_index":

1

"page\_size":

100

}

#### Response Example

##### Success Example

{

"status":

"ok"

"data":{

"total\_page":

1

"current\_page":

1

"total\_size":

9

"sub\_list":\[

0:{

"sub\_uid":

415353372

"account\_info\_list":\[

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

}

1:{

"sub\_uid":

415779795

"account\_info\_list":\[\]

}

2:{

"sub\_uid":

486424213

"account\_info\_list":\[

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

}

3:{

"sub\_uid":

511356054

"account\_info\_list":\[

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

}

4:{

"sub\_uid":

531926803

"account\_info\_list":\[

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

}

5:{

"sub\_uid":

531927396

"account\_info\_list":\[

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

}

6:{

"sub\_uid":

536147469

"account\_info\_list":\[\]

}

7:{

"sub\_uid":

537382988

"account\_info\_list":\[

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

}

\]

"unite\_sub\_list":\[

0:{

"sub\_uid":

414513021

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

\]

}

"ts":

1743393714820

}