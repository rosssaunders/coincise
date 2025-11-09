# GET [General]Query a Batch of Funding Rate

**Source:**
[[General]Query a Batch of Funding Rate](https://www.htx.com/en-us/opend/newApiPages/?id=8cb7ed6a-77b5-11ed-9966-0242ac110003)

**Category:** Reference Data

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v1/swap_batch_funding_rate (\[General\]Query a Batch of Funding Rate)

Request type: GET

Signature verification: No

Interface permission: Read

Rate Limit: For public interface used to get information of index, price limit,
settlement, delivery, open positions and so on, the rate limit is 240 times
every 3 second at most for each IP (this 240 times every 3 second public
interface rate limit is shared by all the requests from that IP of non-marketing
information, like above).

Interface description: The interface supports cross margin mode and isolated
margin mode.

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter     | Data Type | Required | Description                                     | Value Range    | Default Value |
| ------------- | --------- | -------- | ----------------------------------------------- | -------------- | ------------- |
| contract_code | string    | false    | contract code，if not filled in, default as all | "BTC-USDT" ... |               |

#### Response Parameter

| Parameter         | Data Type    | Required | Description                                   | Value Range    |
| ----------------- | ------------ | -------- | --------------------------------------------- | -------------- |
| status            | string       | true     | the result of server handles for the request  | "ok" , "error" |
| ts                | long         | true     | Time of Respond Generation, Unit: Millisecond |                |
| DATA_START        | object array | true     |                                               |                |
| symbol            | string       | true     | symbol                                        |                |
| contract_code     | string       | true     | contract code                                 | "BTC-USDT" ... |
| fee_asset         | string       | true     | fee asset                                     | "USDT...       |
| funding_time      | string       | true     | current funding time(Millisecond)             |                |
| funding_rate      | string       | true     | current funding rate（Updated once a minute） |                |
| estimated_rate    | string       | true     | (Deprecated, default is null)                 |                |
| next_funding_time | string       | true     | (Deprecated, default is null)                 |                |
| DATA_END          |              | false    |                                               |                |

#### Request example

`curl"https://api.hbdm.com/linear-swap-api/v1/swap_batch_funding_rate?contract_code=BTC-USDT"`

#### Response Example

##### Success Example

{

"status":

"ok"

"data":\[

0:{

"funding_rate":

"-0.007500000000000000"

"contract_code":

"ETC-USDT"

"symbol":

"ETC"

"fee_asset":

"USDT"

"funding_time":

"1613976000000"

"estimated_rate":

"null"

"next_funding_time":

"null"

}

1:{

"funding_rate":

"-0.007500000000000000"

"contract_code":

"ADA-USDT"

"symbol":

"ADA"

"fee_asset":

"USDT"

"funding_time":

"1613976000000"

"estimated_rate":

"null"

"next_funding_time":

"null"

}

\]

"ts":

1614045373795

}
