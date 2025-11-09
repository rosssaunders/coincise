# GET Query information on Transfer Limit

**Source:**
[Query information on Transfer Limit](https://www.htx.com/en-us/opend/newApiPages/?id=5d519a16-77b6-11ed-9966-0242ac110003)

**Category:** Swap Account Interface

## Authentication

Required (Private Endpoint)

### /swap-api/v1/swap_transfer_limit (Query information on Transfer Limit)

Request type: POST

Signature verification: Yes

Interface permission: Read

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter     | Data Type | Required | Description        | Value Range                                                               | Default Value |
| ------------- | --------- | -------- | ------------------ | ------------------------------------------------------------------------- | ------------- |
| contract_code | string    | false    | contract type code | Case-Insenstive.Both uppercase and lowercase are supported.e.g. "BTC-USD" |               |

#### Response Parameter

| Parameter                  | Data Type | Required | Description                                   | Value Range    |
| -------------------------- | --------- | -------- | --------------------------------------------- | -------------- |
| status                     | string    | true     | Request Processing Result                     | "ok" , "error" |
| ts                         | long      | true     | Time of Respond Generation, Unit: Millisecond |                |
| DATA_START                 |           | false    |                                               |                |
| symbol                     | string    | true     | Contract Code                                 | "BTC","ETH"... |
| contract_code              | string    | true     | contract type code                            | "BTC-USD",...  |
| transfer_in_max_each       | decimal   | true     | Max limit of a single deposit                 |                |
| transfer_in_min_each       | decimal   | true     | Min limit of a single deposit                 |                |
| transfer_out_max_each      | decimal   | true     | Max limit of a single withdrawal              |                |
| transfer_out_min_each      | decimal   | true     | Min limit of a single withdrawal              |                |
| transfer_in_max_daily      | decimal   | true     | Max daily limit of total deposits             |                |
| transfer_out_max_daily     | decimal   | true     | Max daily limit of totally withdrawals        |                |
| net_transfer_in_max_daily  | decimal   | true     | Max daily limit of net total deposits         |                |
| net_transfer_out_max_daily | decimal   | true     | Max daily limit of net total withdrawals      |                |
| DATA_END                   |           | false    |                                               |                |

#### Request example

{

"contract_code":

"BTC-USD"

"order_id":

"123456"

}

#### Response Example

##### Success Example

{

"status":

"ok"

"data":\[

0:{

"symbol":

"THETA"

"contract_code":

"THETA-USD"

"transfer_in_max_each":

301000000

"transfer_in_min_each":

4

"transfer_out_max_each":

30100000

"transfer_out_min_each":

0.000001

"transfer_in_max_daily":

3010000000

"transfer_out_max_daily":

602000000

"net_transfer_in_max_daily":

1505000000

"net_transfer_out_max_daily":

301000000

}

\]

"ts":

1603870908389

}
