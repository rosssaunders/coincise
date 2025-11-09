# GET Query historical risk reserves

**Source:**
[Query historical risk reserves](https://www.htx.com/en-us/opend/newApiPages/?id=8cb89359-77b5-11ed-9966-1924161816a)

**Category:** Reference Data

## Authentication

Required (Private Endpoint)

### /v1/insurance_fund_history (Query historical risk reserves)

Request type: GET

Signature verification: No

Interface permission: 读取

Rate Limit: Generally, the private interface rate limit of API key is at most
144 times every 3 seconds for each UID (Trade Interface: at most 72 times every
3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is
shared by all the altcoins contracts delivered by different date).

Interface description: Query the data of historical risk funds and display it by
day.

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter  | Data Type | Required | Description                                                                                                                                                                              | Value Range                | Default Value |
| ---------- | --------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- | ------------- |
| start_time | long      | false    | Query start time, query by data creation. time,millisecond timestamp.                                                                                                                    |                            |               |
| end_time   | long      | false    | Query end time, query data by creation. timetime,millisecond timestamp.                                                                                                                  |                            |               |
| direct     | string    | false    | Search direct, If the direction is NEXT, the data is returned in positive chronological order; if the direction is PREV, the data is returned in reverse chronological order             | next, prev default is prev | now           |
| from_id    | long      | false    | If the query direction is prev, from_id should be the min query_id in the last query result. If the query direction is next, from_id should be the max query_id in the last query result |                            |               |
| limit      | int       | false    |                                                                                                                                                                                          | \[1,100\]                  | 10            |

#### Response Parameter

| Parameter      | Data Type    | Required | Description            | Value Range  |
| -------------- | ------------ | -------- | ---------------------- | ------------ |
| status         | string       | false    |                        | ok , "error" |
| DATA_START     | object array | true     |                        |              |
| query_id       | string       | true     | query id               |              |
| date           | string       | true     |                        |              |
| insurance_fund | string       | true     | Insurance Fund Balance |              |
| DATA_END       |              | false    |                        |              |
| ts             | long         | true     |                        |              |

#### Request example

`curl"https://api.hbdm.com?start_time=***&end_time=***&direct=**&from_id=123&limit=10"`

#### Response Example

##### Success Example

{

"status":

"ok"

"data":\[

0:{

"query_id":

37

"insurance_fund":

353207326.6713937

"date":

"2024-09-29"

}

1:{

"query_id":

30

"insurance_fund":

11455730.249709358

"date":

"2024-09-27"

}

2:{

"query_id":

29

"insurance_fund":

8674362.662209358

"date":

"2024-09-26"

}

3:{

"query_id":

28

"insurance_fund":

20002222.00001776

"date":

"2024-09-25"

}

4:{

"query_id":

27

"insurance_fund":

20002222.00001776

"date":

"2024-09-24"

}

5:{

"query_id":

26

"insurance_fund":

20002222.00001776

"date":

"2024-09-23"

}

6:{

"query_id":

25

"insurance_fund":

20002222.00001776

"date":

"2024-09-22"

}

7:{

"query_id":

24

"insurance_fund":

20002222.00001776

"date":

"2024-09-21"

}

8:{

"query_id":

23

"insurance_fund":

20002222.00001776

"date":

"2024-09-20"

}

9:{

"query_id":

22

"insurance_fund":

20002222.00001776

"date":

"2024-09-19"

}

\]

"ts":

1727592000787

}
