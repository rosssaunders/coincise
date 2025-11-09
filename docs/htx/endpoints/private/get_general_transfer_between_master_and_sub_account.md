# GET [General] Transfer between master and sub account

**Source:**
[[General] Transfer between master and sub account](https://www.htx.com/en-us/opend/newApiPages/?id=8cb83b3e-77b5-11ed-9966-0242ac110003)

**Category:** Swap Account Interface

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v1/swap_master_sub_transfer (\[General\] Transfer between master and sub account)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: Generally, the private interface rate limit of API key is at most
144 times every 3 seconds for each UID (Trade Interface: at most 72 times every
3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is
shared by all the altcoins contracts delivered by different date).

Interface description: The interface supports cross margin mode and isolated
margin mode.

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter           | Data Type | Required | Description                           | Value Range                                                                          | Default Value |
| ------------------- | --------- | -------- | ------------------------------------- | ------------------------------------------------------------------------------------ | ------------- |
| sub_uid             | long      | true     | uid of sub account                    |                                                                                      |               |
| asset               | string    | true     | asset                                 | "USDT"...                                                                            |               |
| from_margin_account | string    | true     | from margin account                   | The unified account is "USDT", and the non-unified account is "USDT", "BTC-USDT".... |               |
| to_margin_account   | string    | true     | to margin account                     | The unified account is "USDT", and the non-unified account is "USDT", "BTC-USDT".... |               |
| amount              | decimal   | true     | transfer amount                       |                                                                                      |               |
| type                | string    | true     | transfer type                         | "master_to_sub" or "sub_to_master"                                                   |               |
| client_order_id     | long      | false    | Clients fill and maintain themselves. | \[1, 9223372036854775807\]                                                           |               |

Notes:  
When from_margin_account or to_margin_account is USDT, it means the transfer in
or transfer out from cross margin account  
represents transfer from transfer_out margin account to transfer_in margin
account. The currency transferred shall be the same as the denominated currency
of the transfer_out margin account.；  
The denominated currency of the transfer_out margin account and transfer_in
margin account must be the same. (eg, USDT can be transferred from BTC-USDT to
ETH-USDT, but cannot be transferred from BTC-USDT to ETH-HUSD account).  
the rate limit between the master account and each subaccount is 10 times/
minute  
The client_order_id is valid in 8 hours only, that is the user cannot use the
same client_order_id beyonds one times for the same transfer path (for example,
transfer currency from master account to sub-account using client_order_id=1,
and you can't do that transfe currency from master account to sub-account using
client_order_id=1 in the next time; but you can transfer currency from
sub-account to master account using client_order_id=1).

#### Response Parameter

| Parameter       | Data Type | Required | Description                                                                                        | Value Range    |
| --------------- | --------- | -------- | -------------------------------------------------------------------------------------------------- | -------------- |
| status          | string    | true     | status                                                                                             | "ok" , "error" |
| ts              | long      | true     | response timestamp，millionseconds                                                                 |                |
| DATA_START      | object    | true     |                                                                                                    |                |
| order_id        | string    | true     | order id                                                                                           |                |
| client_order_id | long      | false    | the client ID that is filled in when the order is placed, if it’s not filled, it won’t be returned |                |
| DATA_END        |           | false    |                                                                                                    |                |

#### Request example

{

"sub_uid":

123456

"asset":

"USDT"

"from_margin_account":

"BTC-USDT"

"to_margin_account":

"USDT"

"amount":

20

"type":

"master_to_sub"

"client_order_id":

456321

}

#### Response Example

##### Success Example

{

"status":

"ok"

"data":{

"order_id":

"770320047276195840"

}

"ts":

1603700211160

}
