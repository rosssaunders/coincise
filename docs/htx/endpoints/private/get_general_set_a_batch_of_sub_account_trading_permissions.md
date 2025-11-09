# GET [General]Set a Batch of Sub-Account Trading Permissions

**Source:**
[[General]Set a Batch of Sub-Account Trading Permissions](https://www.htx.com/en-us/opend/newApiPages/?id=8cb81ffc-77b5-11ed-9966-0242ac110003)

**Category:** Swap Account Interface

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v1/swap_sub_auth (\[General\]Set a Batch of Sub-Account Trading Permissions)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: Generally, the private interface rate limit of API key is at most
144 times every 3 seconds for each UID (Trade Interface: at most 72 times every
3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is
shared by all the altcoins contracts delivered by different date).

Interface description: The interface supports cross margin mode and isolated
margin mode. If the sub-account trading permission has been enable, the
interface will directly return success when request to enable again; if the
sub-account trading permission has been disable, the interface will directly
return success when request to disable again;

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter | Data Type | Required | Description                                                                           | Value Range | Default Value |
| --------- | --------- | -------- | ------------------------------------------------------------------------------------- | ----------- | ------------- |
| sub_uid   | string    | true     | sub-account uid (multiple uids are separated by ",", and one time 10 sub uid at most) |             |               |
| sub_auth  | int       | true     | sub auth, 1:enable, 0:disable                                                         |             |               |

Notes:  
When enable the transaction authority on the sub-account for the first time,
deemed to agree to access the contract market.

#### Response Parameter

| Parameter    | Data Type    | Required | Description                                   | Value Range    |
| ------------ | ------------ | -------- | --------------------------------------------- | -------------- |
| status       | string       | true     | result of server handled request              | "ok" , "error" |
| DATA_START   |              | true     |                                               |                |
| ERRORS_START | object array | true     |                                               |                |
| sub_uid      | string       | true     | the list of sub uid which failed              |                |
| err_code     | int          | true     | error code                                    |                |
| err_msg      | string       | true     | error msg                                     |                |
| ERRORS_END   |              | false    |                                               |                |
| successes    | string       | true     | the list of sub uid which successes           |                |
| DATA_END     |              | false    |                                               |                |
| ts           | long         | true     | Time of Respond Generation，Unit：Millisecond |                |

#### Request example

{

"sub_uid":

"123456"

"sub_auth":

1

}

#### Response Example

##### Success Example

{

"status":

"ok"

"data":{

"errors":\[

0:{

"sub_uid":

"1234567"

"err_code":

1010

"err_msg":

"Account doesnt exist."

}

\]

"successes":

"123456789"

}

"ts":

1612504316476

}
