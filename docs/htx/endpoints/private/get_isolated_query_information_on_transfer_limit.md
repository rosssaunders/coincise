# GET [Isolated] Query information on Transfer Limit

**Source:**
[[Isolated] Query information on Transfer Limit](https://www.htx.com/en-us/opend/newApiPages/?id=8cb83330-77b5-11ed-9966-0242ac110003)

**Category:** Swap Account Interface

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v1/swap_transfer_limit (\[Isolated\] Query information on Transfer Limit)

Request type: POST

Signature verification: Yes

Interface permission: Read

Rate Limit: Generally, the private interface rate limit of API key is at most
144 times every 3 seconds for each UID (Trade Interface: at most 72 times every
3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is
shared by all the altcoins contracts delivered by different date).

Interface description: This interface only supports isolated margin mode.

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter     | Data Type | Required | Description        | Value Range                                                                | Default Value |
| ------------- | --------- | -------- | ------------------ | -------------------------------------------------------------------------- | ------------- |
| contract_code | string    | false    | contract type code | Case-Insenstive.Both uppercase and lowercase are supported.e.g. "BTC-USDT" |               |

#### Response Parameter

| Parameter                  | Data Type | Required | Description                                   | Value Range           |
| -------------------------- | --------- | -------- | --------------------------------------------- | --------------------- |
| status                     | string    | true     | Request Processing Result                     | "ok" , "error"        |
| ts                         | long      | true     | Time of Respond Generation, Unit: Millisecond |                       |
| DATA_START                 |           | false    |                                               |                       |
| symbol                     | string    | true     | symbol                                        | "BTC","ETH"...        |
| contract_code              | string    | true     | contract type code                            | "BTC-USDT",...        |
| transfer_in_max_each       | decimal   | true     | Max limit of a single deposit                 |                       |
| transfer_in_min_each       | decimal   | true     | Min limit of a single deposit                 |                       |
| transfer_out_max_each      | decimal   | true     | Max limit of a single withdrawal              |                       |
| transfer_out_min_each      | decimal   | true     | Min limit of a single withdrawal              |                       |
| transfer_in_max_daily      | decimal   | true     | Max daily limit of total deposits             |                       |
| transfer_out_max_daily     | decimal   | true     | Max daily limit of totally withdrawals        |                       |
| net_transfer_in_max_daily  | decimal   | true     | Max daily limit of net total deposits         |                       |
| net_transfer_out_max_daily | decimal   | true     | Max daily limit of net total withdrawals      |                       |
| margin_mode                | string    | true     | margin mode                                   | isolated : "isolated" |
| margin_account             | string    | true     | margin account                                | e.g: "BTC-USDT" ...   |
| DATA_END                   |           | false    |                                               |                       |

#### Request example

{

"contract_code":

"BTC-USDT"

}

#### Response Example

##### Success Example

{

"status":

"ok"

"data":\[

0:{

"symbol":

"BTC"

"contract_code":

"BTC-USDT"

"margin_mode":

"isolated"

"margin_account":

"BTC-USDT"

"transfer_in_max_each":

100000000

"transfer_in_min_each":

1

"transfer_out_max_each":

10000000

"transfer_out_min_each":

0.000001

"transfer_in_max_daily":

1000000000

"transfer_out_max_daily":

200000000

"net_transfer_in_max_daily":

500000000

"net_transfer_out_max_daily":

100000000

}

\]

"ts":

1603699803580

}
