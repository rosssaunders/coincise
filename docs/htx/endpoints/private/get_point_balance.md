# GET Point Balance

**Source:**
[Get Point Balance](https://www.htx.com/en-us/opend/newApiPages/?id=7ec514e2-7773-11ed-9966-0242ac110003)

**Category:** Account

## Authentication

Required (Private Endpoint)

### /v2/point/account ( Get Point Balance)

Request type: GET

Signature verification: Yes

Interface permission: Read

Rate Limit: 2times/s

Interface description: Via this endpoint, user should be able to query
‘termless’ point’s balance, as well as ‘terminable’ point’s balance including
its group IDs and individual expiration date. Via this endpoint, user could only
query point’s balance instead of any other cryptocurrency’s balance. Via this
endpoint, parent user could query either parent user’s point balance, or sub
user’s point balance. User can only exchange HTX point via HTX official web or
app.

#### Request Address

| Environment                         | Address                   |
| ----------------------------------- | ------------------------- |
| Online                              | https://api.huobi.pro     |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description                                                                               | Value Range | Default Value |
| --------- | --------- | -------- | ----------------------------------------------------------------------------------------- | ----------- | ------------- |
| subUid    | string    | false    | Sub user’s UID (only valid for scenario of parent user querying sub user’s point balance) |             |               |

#### Response Parameter

| Parameter      | Data Type | Required | Description                                                         | Value Range |
| -------------- | --------- | -------- | ------------------------------------------------------------------- | ----------- |
| code           | integer   | false    | Status code                                                         |             |
| message        | string    | false    | Error message (if any)                                              |             |
| success        | string    | false    |                                                                     |             |
| DATA_START     | object    | false    |                                                                     |             |
| accountId      | string    | false    | Account ID                                                          |             |
| accountStatus  | string    | false    | Account status (working, lock, fl-sys, fl-mgt, fl-end, fl-negative) |             |
| acctBalance    | string    | false    | Account balance                                                     |             |
| GROUPIDS_START | object    | false    | Group ID list                                                       |             |
| groupId        | long      | false    | Group ID                                                            |             |
| expiryDate     | long      | false    | Expiration date (unix time in millisecond)                          |             |
| remainAmt      | string    | false    | Remaining amount                                                    |             |
| GROUPIDS_END   |           | false    |                                                                     |             |
| DATA_END       |           | false    |                                                                     |             |

Notes:  
Group ID is the transaction ID generated while parent user exchanging the
‘terminable’ points.  
Group ID of ‘termless’ points is 0.  
Expiration date of ‘termless’ points is null.

#### Request example

`curl"https://api.huobi.pro/v2/point/account？subUid=xxxx"`

#### Response Example

##### Success Example

{

"code":

200

"data":{

"accountId":

"14403739"

"groupIds":\[

0:{

"groupId":

26

"expiryDate":

1594396800000

"remainAmt":

"0.3"

}

\]

"acctBalance":

"0.30000000"

"accountStatus":

"working"

}

"success":

true

}
