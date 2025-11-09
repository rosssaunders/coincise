# GET Set Asset Transfer Permission for Sub Users

**Source:** [Set Asset Transfer Permission for Sub Users](https://www.htx.com/en-us/opend/newApiPages/?id=7ec529c3-7773-11ed-9966-0242ac110003)

**Category:** Sub-account Management

## Authentication

Required (Private Endpoint)

### /v2/sub-user/transferability ( Set Asset Transfer Permission for Sub Users)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Interface description: Parent user is able to set asset transfer permission for a batch of sub users. By default, the asset transfer from sub user’s spot account to parent user’s spot account is allowed.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.huobi.pro |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| subUids | string | false | Sub user's UID list (maximum 50 UIDs, separated by comma) |  |  |
| accountType | string | false | Account type (if not available, adopt default value 'spot'） | spot |  |
| transferrable | bool | false | Transferrablility | true,false |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| code | int | false | Status code |  |
| message | string | false | Error message (if any) |  |
| DATA\_START | object | false |  |  |
| subUid | long | false | Sub user's UID |  |
| accountType | string | false | Account type | spot |
| transferrable | bool | false | Transferrability | true,false |
| errCode | int | false | Error code in case of rejection (only valid when the requested UID being rejected) |  |
| errMessage | string | false | Error code in case of rejection (only valid when the requested UID being rejected) |  |
| DATA\_END |  | false |  |  |

#### Request example

{

"subUids":

"178211"

"accountType":

"spot"

"transferrable":

true

}

#### Response Example

##### Success Example

{

"code":

200

"data":\[

0:{

"accountType":

"spot"

"transferrable":

true

"subUid":

245686628

}

1:{

"accountType":

"spot"

"subUid":

2215699261

"errCode":

2002

"errMessage":

"invalid field value in \`2,215,699,261\`"

}

\]

"ok":

true

}