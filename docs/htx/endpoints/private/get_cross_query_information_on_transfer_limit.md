# GET [Cross] Query Information On Transfer Limit

**Source:**
[[Cross] Query Information On Transfer Limit](https://www.htx.com/en-us/opend/newApiPages/?id=8cb83475-77b5-11ed-9966-0242ac110003)

**Category:** Swap Account Interface

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v1/swap_cross_transfer_limit (\[Cross\] Query Information On Transfer Limit)

Request type: POST

Signature verification: Yes

Interface permission: Read

Rate Limit: Generally, the private interface rate limit of API key is at most
144 times every 3 seconds for each UID (Trade Interface: at most 72 times every
3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is
shared by all the altcoins contracts delivered by different date).

Interface description: The interface only supports cross margin mode.

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter      | Data Type | Required | Description                                              | Value Range                  | Default Value |
| -------------- | --------- | -------- | -------------------------------------------------------- | ---------------------------- | ------------- |
| margin_account | string    | false    | margin account, return all margin account info when null | "USDT"...，but now only USDT |               |

#### Response Parameter

| Parameter                  | Data Type    | Required | Description                                   | Value Range              |
| -------------------------- | ------------ | -------- | --------------------------------------------- | ------------------------ |
| status                     | string       | true     | Request Processing Result                     | "ok" , "error"           |
| ts                         | long         | true     | Time of Respond Generation, Unit: Millisecond |                          |
| DATA_START                 | object array | true     |                                               |                          |
| margin_mode                | string       | true     | margin mode                                   | cross: cross margin mode |
| margin_account             | string       | true     | margin account                                | "USDT"...                |
| transfer_in_max_each       | decimal      | true     | max limit of a single deposit                 |                          |
| transfer_in_min_each       | decimal      | true     | min limit of a single deposit                 |                          |
| transfer_out_max_each      | decimal      | true     | max limit of a single withdrawal              |                          |
| transfer_out_min_each      | decimal      | true     | min limit of a single withdrawal              |                          |
| transfer_in_max_daily      | decimal      | true     | max daily limit of total deposits             |                          |
| transfer_out_max_daily     | decimal      | true     | max daily limit of totally withdrawals        |                          |
| net_transfer_in_max_daily  | decimal      | true     | max daily limit of net total deposits         |                          |
| net_transfer_out_max_daily | decimal      | true     | max daily limit of net total withdrawals      |                          |
| DATA_END                   |              | false    |                                               |                          |

#### Request example

{

"margin_account":

"USDT"

}

#### Response Example

##### Success Example

{

"status":

"ok"

"data":\[

0:{

"transfer_in_max_each":

1000000000000000000

"transfer_in_min_each":

0.0001

"transfer_out_max_each":

1000000000000000000

"transfer_out_min_each":

0.0001

"transfer_in_max_daily":

900000001000000000

"transfer_out_max_daily":

900000100000000000

"net_transfer_in_max_daily":

900000000100000000

"net_transfer_out_max_daily":

123456789012345680

"margin_account":

"USDT"

"margin_mode":

"cross"

}

\]

"ts":

1606964432217

}
