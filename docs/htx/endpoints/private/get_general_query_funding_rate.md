# GET [General] Query funding rate

**Source:**
[[General] Query funding rate](https://www.htx.com/en-us/opend/newApiPages/?id=8cb7ec03-77b5-11ed-9966-0242ac110003)

**Category:** Reference Data

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v1/swap_funding_rate (\[General\] Query funding rate)

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

| Parameter     | Data Type | Required | Description   | Value Range                    | Default Value |
| ------------- | --------- | -------- | ------------- | ------------------------------ | ------------- |
| contract_code | string    | true     | contract code | Case-Insenstive."BTC-USDT" ... |               |

#### Response Parameter

| Parameter         | Data Type | Required | Description                                   | Value Range       |
| ----------------- | --------- | -------- | --------------------------------------------- | ----------------- |
| status            | string    | false    | response status                               | "ok" , "error"    |
| ts                | long      | false    | response timestamp.unit:millionSeconds.       |                   |
| DATA_START        |           | false    |                                               |                   |
| symbol            | string    | false    | symbol                                        | "BTC","ETH"...    |
| contract_code     | string    | false    | contract code,eg:"BTC-USDT"                   |                   |
| fee_asset         | string    | false    | fee asset                                     | eg:"BTC","ETH"... |
| funding_time      | string    | false    | current funding time                          |                   |
| funding_rate      | string    | false    | current funding rate（Updated once a minute） |                   |
| estimated_rate    | string    | false    | (Deprecated, default is null)                 |                   |
| next_funding_time | string    | false    | (Deprecated, default is null)                 |                   |
| DATA_END          |           | false    |                                               |                   |

#### Request example

`curl "https://api.hbdm.com/linear-swap-api/v1/swap_fund ing_rate?contract_code=BTC-USDT"`

#### Response Example

##### Success Example

{

"status":

"ok"

"data":{

"funding_rate":

"0.000100000000000000"

"contract_code":

"BTC-USDT"

"symbol":

"BTC"

"fee_asset":

"BTC"

"funding_time":

"1603699200000"

"estimated_rate":

"null"

"next_funding_time":

"null"

}

"ts":

1603696494714

}
