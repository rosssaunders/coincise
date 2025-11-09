# GET Sub User's Account List

**Source:** [Get Sub User's Account List](https://www.htx.com/en-us/opend/newApiPages/?id=7ec51da3-7773-11ed-9966-0242ac110003)

**Category:** Sub-account Management

## Authentication

Required (Private Endpoint)

### /v2/sub-user/account-list ( Get Sub User's Account List)

Request type: GET

Signature verification: Yes

Interface permission: Read

Interface description: Via this endpoint parent user is able to query account list of sub user by specifying a UID.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.huobi.pro |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| subUid | long | false | Sub User's UID |  |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| code | int | false | Status code |  |
| message | string | false | Error message (if any) |  |
| DATA\_START | object | false |  |  |
| uid | long | false | Sub user’s UID |  |
| deductMode |  | false | deduct mode |  |
| LIST\_START | object | false |  |  |
| accountType | string | false | Account type | spot, isolated-margin, cross-margin |
| activation | string | false | Account’s activation | activated, deactivated |
| transferrable | bool | false | Transfer permission (only valid for accountType=spot) | true, false |
| ACCOUNTIDS\_START | object | false |  |  |
| accountId | string | false | Account ID |  |
| subType | string | false | Account sub type (only valid for accountType=isolated-margin) |  |
| accountStatus | string | false | Account status | normal, locked |
| ACCOUNTIDS\_END |  | false |  |  |
| LIST\_END |  | false |  |  |
| DATA\_END |  | false |  |  |

#### Request example

`curl"https://api.huobi.pro/v2/sub-user/account-list?subUid=xxxx"`

#### Response Example

##### Success Example

{

"code":

200

"data":{

"uid":

132208121

"deductMode":

"sub"

"list":\[

0:{

"accountType":

"isolated-margin"

"activation":

"activated"

}

1:{

"accountType":

"cross-margin"

"activation":

"deactivated"

}

2:{

"accountType":

"spot"

"activation":

"activated"

"transferrable":

true

"accountIds":\[

0:{

"accountId":

12255180

"accountStatus":

"normal"

}

\]

}

\]

}

}