# GET [General]Query historical risk reserves

**Source:** [[General]Query historical risk reserves](https://www.htx.com/en-us/opend/newApiPages/?id=8cb89359-77b5-11ed-9966-1924136e8df)

**Category:** Reference Data

## Authentication

Required (Private Endpoint)

### /v1/insurance\_fund\_history (\[General\]Query historical risk reserves)

Request type: GET

Signature verification: No

Interface permission: 读取

Rate Limit: Generally, the private interface rate limit of API key is at most 144 times every 3 seconds for each UID (Trade Interface: at most 72 times every 3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is shared by all the altcoins contracts delivered by different date).

Interface description: Query the data of historical risk funds and display it by day.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| start\_time | long | false | Query start time, query by data creation. time,millisecond timestamp. |  |  |
| end\_time | long | false | Query end time, query data by creation. timetime,millisecond timestamp. |  |  |
| direct | string | false | Search direct, If the direction is NEXT, the data is returned in positive chronological order; if the direction is PREV, the data is returned in reverse chronological order | next, prev default is prev | now |
| from\_id | long | false | If the query direction is prev, from\_id should be the min query\_id in the last query result. If the query direction is next, from\_id should be the max query\_id in the last query result |  |  |
| limit | int | false |  | \[1,100\] | 10 |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | false |  | ok , "error" |
| DATA\_START | object array | false |  |  |
| query\_id | string | false | query id |  |
| date | string | false |  |  |
| insurance\_fund | string | false | Insurance Fund Balance |  |
| DATA\_END |  | false |  |  |
| ts | long | false |  |  |

#### Request example

`curl"https://api.hbdm.com?start_time=***&end_time=***&direct=**&from_id=123&limit=10"`

#### Response Example

##### Success Example

{

"status":

"ok"

"data":\[

0:{

"query\_id":

37

"insurance\_fund":

353207326.6713937

"date":

"2024-09-29"

}

1:{

"query\_id":

30

"insurance\_fund":

11455730.249709358

"date":

"2024-09-27"

}

2:{

"query\_id":

29

"insurance\_fund":

8674362.662209358

"date":

"2024-09-26"

}

3:{

"query\_id":

28

"insurance\_fund":

20002222.00001776

"date":

"2024-09-25"

}

4:{

"query\_id":

27

"insurance\_fund":

20002222.00001776

"date":

"2024-09-24"

}

5:{

"query\_id":

26

"insurance\_fund":

20002222.00001776

"date":

"2024-09-23"

}

6:{

"query\_id":

25

"insurance\_fund":

20002222.00001776

"date":

"2024-09-22"

}

7:{

"query\_id":

24

"insurance\_fund":

20002222.00001776

"date":

"2024-09-21"

}

8:{

"query\_id":

23

"insurance\_fund":

20002222.00001776

"date":

"2024-09-20"

}

9:{

"query\_id":

22

"insurance\_fund":

20002222.00001776

"date":

"2024-09-19"

}

\]

"ts":

1727592000787

}