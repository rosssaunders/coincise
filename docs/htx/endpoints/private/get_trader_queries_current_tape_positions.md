# GET Trader queries current tape positions

**Source:** [Trader queries current tape positions](https://www.htx.com/en-us/opend/newApiPages/?id=8cb89359-77b5-11ed-9966-19126cfd87d)

**Category:** Future Copy Trade

## Authentication

Required (Private Endpoint)

### /copytrading/trader/current\_positions (Trader queries current tape positions)

Request type: GET

Signature verification: Yes

Interface permission: Read

Rate Limit: A single user requests all copytrading interfaces 18 times per second.

Interface description: This interface is used to query the current trader’s open positions with orders.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | true | BTC-USDT... |  |  |
| start\_time | long | false | Query start time, query by data creation. time,millisecond timestamp. | The query window is the last 90 days |  |
| end\_time | long | false | Query end time, query data by creation. timetime,millisecond timestamp. | The query window is the last 90 days |  |
| direct | string | false | Search direct, If the direction is NEXT, the data is returned in positive chronological order; if the direction is PREV, the data is returned in reverse chronological order | next, prev default is prev | now |
| from\_id | long | false | If the query direction is prev, from\_id should be the min query\_id in the last query result. If the query direction is next, from\_id should be the max query\_id in the last query result |  |  |
| limit | long | false | Number of results per request. Maximum is 100. Default is 100. |  |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| tid | String | true | request id |  |
| DATA\_START |  | true |  |  |
| POSITIONS\_START | array | true |  |  |
| sub\_position\_id | String | true | copy position ID |  |
| margin\_mode | String | true | margin mode | isolated，cross |
| position\_side | String | true | position side | long, short |
| lever | String | true | lever |  |
| open\_order\_id | String | true | Order ID for opening position |  |
| open\_avg\_price | String | true | Average open price |  |
| open\_fee | String | true | open fee |  |
| open\_time | long | true | Open time |  |
| position\_margin | String | true |  |  |
| volume | String | true | Quantity of positions |  |
| liquidation\_price | String | true |  |  |
| tp\_trigger\_price | String | true | Take-profit trigger price. Take-profit order price will be the market price after triggering. |  |
| sl\_trigger\_price | String | true | Stop-loss trigger price. Stop-loss order price will be the market price after triggering. |  |
| POSITIONS\_END |  | false |  |  |
| query\_id | long | true | Query id, which can be used as the from\_id field for the next query request. |  |
| DATA\_END |  | false |  |  |
| code | long | true |  |  |

#### Request example

`curl"https://api.hbdm.com?contract_code=DOT-USDT&start_time=1716539773000&end_time=1719284288864&direct=prev&from_id=249639&limit=2"`

#### Response Example

##### Success Example

{

"code":

200

"data":{

"positions":\[

0:{

"sub\_position\_id":

"249733"

"lever":

"5"

"position\_side":

"long"

"open\_avg\_price":

"10"

"volume":

"1"

"margin\_mode":

"cross"

"open\_time":

1719209592656

"open\_fee":

"0.0036"

"position\_margin":

"2"

"tp\_trigger\_price":

NULL

"sl\_trigger\_price":

NULL

"open\_order\_id":

"1254801508272640000"

"liquidation\_price":

NULL

}

1:{

"sub\_position\_id":

"249736"

"lever":

"5"

"position\_side":

"long"

"open\_avg\_price":

"10"

"volume":

"1"

"margin\_mode":

"cross"

"open\_time":

1719209797540

"open\_fee":

"0.0036"

"position\_margin":

"2"

"tp\_trigger\_price":

NULL

"sl\_trigger\_price":

NULL

"open\_order\_id":

"1254802367618420736"

"liquidation\_price":

NULL

}

\]

"query\_id":

249736

}

"tid":

"3ce9a50eb5094f309d699aa4a1b65afe"

"success":

true

}