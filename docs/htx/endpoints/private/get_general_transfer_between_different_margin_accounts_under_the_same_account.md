# GET [General] Transfer between different margin accounts under the same account

**Source:** [[General] Transfer between different margin accounts under the same account](https://www.htx.com/en-us/opend/newApiPages/?id=8cb83f97-77b5-11ed-9966-0242ac110003)

**Category:** Swap Account Interface

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v1/swap\_transfer\_inner (\[General\] Transfer between different margin accounts under the same account)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: Generally, the private interface rate limit of API key is at most 144 times every 3 seconds for each UID (Trade Interface: at most 72 times every 3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is shared by all the altcoins contracts delivered by different date).

Interface description: The interface supports cross margin mode and isolated margin mode.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| asset | string | true | asset | "USDT"... |  |
| from\_margin\_account | string | true | from margin account | "BTC-USDT","USDT"... |  |
| to\_margin\_account | string | true | to margin account | "ETH-USDT","USDT"... |  |
| amount | decimal | true | amount（The unit is the denominated currency of the contract.） |  |  |
| client\_order\_id | long | false | Clients fill and maintain themselves. | \[1, 9223372036854775807\] |  |

Notes:  
When from\_margin\_account or to\_margin\_account is USDT, it means the transfer in or transfer out from cross margin account  
represents transfer from transfer\_out margin account to transfer\_in margin account. The currency transferred shall be the same as the denominated currency of the transfer\_out margin account.；  
The denominated currency of the transfer\_out margin account and transfer\_in margin account must be the same. (eg, USDT can be transferred from BTC-USDT to ETH-USDT, but cannot be transferred from BTC-USDT to ETH-HUSD account)。  
API rate limit for this interface is up to 10 times per minute.  
The client\_order\_id is valid in 8 hours only, that is the user cannot use the same client\_order\_id beyonds one times

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | response status | "ok" , "error" |
| DATA\_START |  | false |  | object array |
| order\_id | string | true | order id |  |
| client\_order\_id | long | false | the client ID that is filled in when the order is placed, if it’s not filled, it won’t be returned |  |
| DATA\_END |  | false |  |  |
| ts | long | true | response millionseconds. |  |

#### Request example

{

"asset":

"USDT"

"from\_margin\_account":

"BTC-USDT"

"to\_margin\_account":

"ETH-USDT"

"amount":

10

"client\_order\_id":

456321

}

#### Response Example

##### Success Example

{

"status":

"ok"

"data":{

"order\_id":

"770321554893758464"

}

"ts":

1603700570600

}