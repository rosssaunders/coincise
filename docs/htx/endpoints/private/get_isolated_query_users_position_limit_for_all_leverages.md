# GET [Isolated]Query Users' Position Limit for All Leverages

**Source:**
[[Isolated]Query Users' Position Limit for All Leverages](https://www.htx.com/en-us/opend/newApiPages/?id=8cb838ef-77b5-11ed-9966-0242ac110003)

**Category:** Swap Account Interface

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v1/swap_lever_position_limit (\[Isolated\]Query Users' Position Limit for All Leverages)

Request type: POST

Signature verification: Yes

Interface permission: Read

Rate Limit: Generally, the private interface rate limit of API key is at most
144 times every 3 seconds for each UID (Trade Interface: at most 72 times every
3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is
shared by all the altcoins contracts delivered by different date).

Interface description: \\This interface only supports isolated margin mode. If
the status of contract is Pending Listing, Listing, Suspension, or Suspending of
Listing, the data of that contract will not be returned when querying all; If
that contract is queried separately, error 1014 will be reported; lever_rate
must fall within the user's available leverage rate, otherwise error 1037 will
be reported

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter     | Data Type | Required | Description                 | Value Range                    | Default Value |
| ------------- | --------- | -------- | --------------------------- | ------------------------------ | ------------- |
| contract_code | string    | false    | contract code, NA means all | such as "BTC-USDT", "ETH-USDT" |               |
| lever_rate    | int       | false    | leverage rate, NA means all |                                |               |

#### Response Parameter

| Parameter        | Data Type    | Required | Description                                   | Value Range    |
| ---------------- | ------------ | -------- | --------------------------------------------- | -------------- |
| status           | string       | true     | status code                                   | "ok" , "error" |
| DATA_START       | object array | true     |                                               |                |
| symbol           | string       | true     | symbol                                        | "BTC","ETH"... |
| contract_code    | string       | true     | contract code                                 | "BTC-USDT" ... |
| margin_mode      | string       | true     | margin mode                                   | isolated       |
| LIST_START       | object array | true     |                                               |                |
| lever_rate       | int          | true     | leverage rate                                 |                |
| buy_limit_value  | decimal      | true     | upper limit on long positions, unit: usdt     |                |
| sell_limit_value | decimal      | true     | upper limit on short positions, unit: usdt    |                |
| LIST_END         |              | false    |                                               |                |
| DATA_END         |              | false    |                                               |                |
| ts               | long         | true     | Time of Respond Generation，Unit：Millisecond |                |

#### Request example

{

"contract_code":

"BTC-USDT"

"lever_rate":

20

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

"list":\[

0:{

"lever_rate":

2

"buy_limit_value":

50000000

"sell_limit_value":

50000000

}

\]

}

\]

"ts":

1638769536897

}
