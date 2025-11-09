# GET [Cross]Query Info Of Take-profit and Stop-loss Order That Related To Position Opening Order

**Source:** [[Cross]Query Info Of Take-profit and Stop-loss Order That Related To Position Opening Order](https://www.htx.com/en-us/opend/newApiPages/?id=8cb8864d-77b5-11ed-9966-0242ac110003)

**Category:** Swap Strategy Order Interface

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v1/swap\_cross\_relation\_tpsl\_order (\[Cross\]Query Info Of Take-profit and Stop-loss Order That Related To Position Opening Order)

Request type: POST

Signature verification: Yes

Interface permission: Read

Rate Limit: Generally, the private interface rate limit of API key is at most 144 times every 3 seconds for each UID (Trade Interface: at most 72 times every 3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is shared by all the altcoins contracts delivered by different date).

Interface description: This interface only supports cross margin mode. The request parameter "contract\_code" supports the contract code of futures, in that the format is BTC-USDT-210625. one of pair and contract\_code must be filled in(if both of them not filled in, will get 1014 error code); and both filled in, the contract\_code is the preferred.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | false | contract code | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |  |
| pair | string | false | pair | BTC-USDT |  |
| order\_id | long | true | open order id |  |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | status | "ok", "error" |
| DATA\_START | object | true |  | dictionary |
| symbol | string | true | symbol |  |
| contract\_code | string | true | contract code | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |
| margin\_mode | string | true | margin mode | cross, isolated |
| margin\_account | string | true | margin account | such as “USDT”，“BTC-USDT” |
| volume | decimal | true | Numbers of orders (volume) |  |
| price | decimal | true | price |  |
| order\_price\_type | string | true | order price type | "market": Market Order，"limit”: Limit Order "opponent":BBO "post\_only": Post-Only Order, No order limit but position limit for post-only orders.,optimal\_5： Optimal , optimal\_10： Optimal 10, optimal\_20：Optimal 20，ioc: IOC Order,，fok：FOK Order, "opponent\_ioc"：IOC order using the BBO price，"optimal\_5\_ioc"：optimal\_5 IOC，"optimal\_10\_ioc"：optimal\_10 IOC，"optimal\_20\_ioc"：optimal\_20 IOC, "opponent\_fok"：FOK order using the BBO price，"optimal\_5\_fok"：optimal\_5 FOK，"optimal\_10\_fok"：optimal\_10 FOK，"optimal\_20\_fok"：optimal\_20 FOK |
| direction | string | true | direction | "buy","sell" |
| offset | string | true | offset | "open", "close", "both" |
| lever\_rate | int | true | lever rate |  |
| order\_id | long | true | order id |  |
| order\_id\_str | string | true | order id in string |  |
| client\_order\_id | long | true | client order id |  |
| created\_at | long | true | created at |  |
| trade\_volume | decimal | true | trade volume |  |
| trade\_turnover | decimal | true | trade turnover |  |
| fee | decimal | true | fee |  |
| trade\_avg\_price | decimal | true | trade avg price |  |
| margin\_frozen | decimal | true | margin frozen |  |
| profit | decimal | true | profit when close position (calculated with the average price of position, exclude profit in history settlement.) |  |
| status | int | true | status | 1\. Ready to submit the orders; 2. Ready to submit the orders; 3. Have sumbmitted the orders; 4. Orders partially matched; 5. Orders cancelled with partially matched; 6. Orders fully matched; 7. Orders cancelled; 11. Orders cancelling |
| order\_type | int | true | order type | 1\. Quotation; 2. Cancelled order; 3. Forced liquidation; 4. Delivery Order |
| order\_source | string | true | order source | system. web. api. m. risk. settlement. ios. android. windows. mac. trigger |
| fee\_asset | string | true | fee asset | （"BTC","ETH"...） |
| canceled\_at | long | true | canceled at |  |
| contract\_type | string | true | contract type | swap, this\_week, next\_week, quarter, next\_quarter |
| pair | string | true | pair | such as: “BTC-USDT” |
| business\_type | string | true | business type | futures, swap |
| TPSL\_ORDER\_INFO\_START | object array | true | related take-profit and stop loss order info |  |
| volume | decimal | true | Numbers of orders (volume) |  |
| tpsl\_order\_type | string | true | Order type(take-profit order/stop-loss order) | “tp”:take-profit order；"sl"stop-loss order |
| direction | string | true | direction | "buy", "sell" |
| order\_id | long | true | order id |  |
| order\_id\_str | string | true | order id in string |  |
| trigger\_type | string | true | trigger type: ge, le |  |
| trigger\_price | decimal | true | trigger price |  |
| price\_protect | boolean | false | price protection, default is false. This parameter is only required when setting tp/sl | true or false |
| created\_at | long | true | created time |  |
| order\_price | decimal | true | order price |  |
| status | int | true | status | 1.Not Activated, 2.Ready to submit the orders, 3.Submitting the orders, 4.Submit the orders success, 5.Submit the orders failed, 6.Orders cancelled, 8.Cancelled order not found, 9.Orders cancelling, 10.Failed, 11.Expired. 12. Not Activated-Expired |
| relation\_tpsl\_order\_id | string | true | related take-profit and stop loss order id（The field will have a value when users set take-profit and stop loss order stimulatenously, otherwise, the value will be "-1".） |  |
| canceled\_at | long | true | canceled time |  |
| fail\_code | int | true | fail code when triggered |  |
| fail\_reason | string | true | fail reason when triggered |  |
| triggered\_price | decimal | true | triggered price |  |
| relation\_order\_id | string | true | Relation order ID is the string related to the limit orders， The value is -1 before the trigger orders executed. |  |
| TPSL\_ORDER\_INFO\_END |  | false |  |  |
| DATA\_END |  | false |  |  |
| ts | long | true | Time of Respond Generation，Unit: Millisecond |  |

#### Request example

{

"contract\_code":

"BTC-USDT"

"pair":

"BTC-USDT"

"order\_id":

3456678123

}

#### Response Example

##### Success Example

{

"status":

"ok"

"data":{

"contract\_type":

"this\_week"

"business\_type":

"futures"

"pair":

"BTC-USDT"

"symbol":

"BTC"

"contract\_code":

"BTC-USDT-211210"

"margin\_mode":

"cross"

"margin\_account":

"USDT"

"volume":

1

"price":

48592.2

"order\_price\_type":

"opponent"

"direction":

"buy"

"offset":

"open"

"lever\_rate":

5

"order\_id":

918819004716982300

"order\_id\_str":

"918819004716982272"

"client\_order\_id":

NULL

"created\_at":

1639105121550

"trade\_volume":

1

"trade\_turnover":

48.5922

"fee":

\-0.0242961

"trade\_avg\_price":

48592.2

"margin\_frozen":

0

"profit":

0

"status":

6

"order\_type":

1

"order\_source":

"api"

"fee\_asset":

"USDT"

"canceled\_at":

0

"tpsl\_order\_info":\[

0:{

"volume":

1

"direction":

"sell"

"tpsl\_order\_type":

"tp"

"order\_id":

918819004746342400

"order\_id\_str":

"918819004746342400"

"trigger\_type":

"ge"

"trigger\_price":

50000

"order\_price":

0

"created\_at":

1639105121563

"order\_price\_type":

"optimal\_5"

"relation\_tpsl\_order\_id":

"918819004750536704"

"status":

2

"canceled\_at":

0

"fail\_code":

NULL

"fail\_reason":

NULL

"triggered\_price":

NULL

"relation\_order\_id":

"-1"

}

1:{

"volume":

1

"direction":

"sell"

"tpsl\_order\_type":

"sl"

"order\_id":

918819004750536700

"order\_id\_str":

"918819004750536704"

"trigger\_type":

"le"

"trigger\_price":

40000

"order\_price":

0

"created\_at":

1639105121564

"order\_price\_type":

"optimal\_5"

"relation\_tpsl\_order\_id":

"918819004746342400"

"status":

2

"canceled\_at":

0

"fail\_code":

NULL

"fail\_reason":

NULL

"triggered\_price":

NULL

"relation\_order\_id":

"-1"

}

\]

}

"ts":

1639105149621

}