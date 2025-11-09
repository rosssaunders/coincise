# GET Query a Batch of Funding Rate

**Source:**
[Query a Batch of Funding Rate](https://www.htx.com/en-us/opend/newApiPages/?id=5d516c58-77b6-11ed-9966-0242ac110003)

**Category:** Reference Data

## Authentication

Required (Private Endpoint)

### /swap-api/v1/swap_batch_funding_rate (Query a Batch of Funding Rate)

Request type: GET

Signature verification: No

Interface permission: Read

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter     | Data Type | Required | Description                                     | Value Range   | Default Value |
| ------------- | --------- | -------- | ----------------------------------------------- | ------------- | ------------- |
| contract_code | string    | false    | contract code, if not filled in, default as all | "BTC-USD" ... |               |

#### Response Parameter

| Parameter         | Data Type    | Required | Description                                   | Value Range    |
| ----------------- | ------------ | -------- | --------------------------------------------- | -------------- |
| status            | string       | true     | the result of server handles for the request  | "ok" , "error" |
| ts                | long         | true     | Time of Respond Generation, Unit: Millisecond |                |
| DATA_START        | object array | true     |                                               |                |
| symbol            | string       | true     | symbol                                        |                |
| contract_code     | string       | true     | contract code                                 | "BTC-USD" ...  |
| fee_asset         | string       | true     | fee asset                                     | "BTC","ETH"... |
| funding_time      | string       | true     | current funding time(Millisecond)             |                |
| funding_rate      | string       | true     | current funding rate（Updated once a minute） |                |
| estimated_rate    | string       | true     | (Deprecated, default is null)                 |                |
| next_funding_time | string       | true     | (Deprecated, default is null)                 |                |
| DATA_END          |              | false    |                                               |                |

#### Request example

`curl "https://api.hbdm.com/swap-api/v1/swap_funding_rate?contract_code=BTC-USD"`

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

"ETC"

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

"ADA"

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
