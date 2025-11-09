# GET [General] Query sub-account transaction permissions

**Source:** [[General] Query sub-account transaction permissions](https://www.htx.com/en-us/opend/newApiPages/?id=8cb89359-77b5-11ed-9966-18d119ebd6b)

**Category:** Swap Account Interface

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v1/swap\_sub\_auth\_list (\[General\] Query sub-account transaction permissions)

Request type: GET

Signature verification: Yes

Interface permission: Read

Rate Limit: Generally, the private interface rate limit of API key is at most 144 times every 3 seconds for each UID (Trade Interface: at most 72 times every 3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is shared by all the altcoins contracts delivered by different date).

Interface description: This interface is used to query the contract sub-account and whether it has opened trading permissions.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| sub\_uid | string | false | sub-account uid (multiple uids are separated by ",")，No more than 10 |  |  |
| start\_time | long | false | Start time of sub-account creation |  |  |
| end\_time | long | false | End time of sub-account creation |  |  |
| direct | string | false | Search direct, If the direction is NEXT, the data is returned in positive chronological order; if the direction is PREV, the data is returned in reverse chronological order |  |  |
| from\_id | long | false | If the query direction is prev, from\_id should be the min query\_id in the last query result. If the query direction is next, from\_id should be the max query\_id in the last query result |  |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | Request the processing result | ok , "error" |
| DATA\_START |  | true |  |  |
| query\_id |  | false |  |  |
| ERRORS\_START | object array | true |  |  |
| sub\_uid | string | true | sub uid |  |
| err\_code | string | true | error code |  |
| err\_msg | string | true | error message |  |
| ERRORS\_END |  | false |  |  |
| SUCCESSES\_START | object array | false |  |  |
| sub\_uid | string | true | sub uid |  |
| sub\_auth | string | true | sub auth, 1:enable, 0:disable |  |
| SUCCESSES\_START |  | false |  |  |
| DATA\_END |  | false |  |  |
| ts | long | true |  |  |

#### Request example

`curl"https://api.hbdm.com?sub_uid=441618222,462826107,117196834&direct=next&from_id=23512590&start_time=&end_time="`

#### Response Example

##### Success Example

{

"status":

"ok"

"data":{

"errors":\[

0:{

"sub\_uid":

"117196834"

"err\_code":

1010

"err\_msg":

"用户不存在"

}

\]

"successes":\[

0:{

"query\_id":

23512591

"sub\_uid":

"441618222"

"sub\_auth":

1

}

1:{

"query\_id":

25460798

"sub\_uid":

"462826107"

"sub\_auth":

1

}

\]

}

"ts":

1705391607255

}