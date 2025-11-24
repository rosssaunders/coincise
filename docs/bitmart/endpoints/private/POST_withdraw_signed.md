# POST Withdraw (SIGNED)

**Source:** [Withdraw (SIGNED)](https://developer-pro.bitmart.com/en/spot/)

**API Type:** Spot

## Authentication

Required (Private Endpoint)

## Withdraw (SIGNED)

`Creates a withdraw request from spot account to an external address`

`The API can only make withdrawal to verified addresses, and verified addresses can be set by WEB/APP.`

#### Request URL

`POST https://api-cloud.bitmart.com/account/v1/withdraw/apply`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

| Field    | Type   | Required? | Description                        |
| -------- | ------ | --------- | ---------------------------------- |
| currency | String | Yes       | Token symbol, e.g., 'BTC'          |
| amount   | String | Yes       | The amount of currency to withdraw |

#### Parameters for Withdraw to the blockchain

> 1.Request: Withdraw to the blockchain

`curl   -H 'X-BM-KEY:{{AccessKey}}'  -H 'X-BM-TIMESTAMP:{{currentTime}}'  -H 'X-BM-SIGN:{{SIGN}}'   -X POST -d '{ {     "currency": "USDT-TRC20",     "amount": "100.000",     "destination": "To Digital Address",     "address": "0x1EE6FA5A3803608fc22a1f3F76********",     "address_memo": "" }' https://api-cloud.bitmart.com/account/v1/withdraw/apply`

| Field        | Type   | Required? | Description                                                                    |
| ------------ | ------ | --------- | ------------------------------------------------------------------------------ |
| address      | String | Yes       | Withdraw address (only the address added on the official website is supported) |
| address_memo | String | No        | Address tag(tag Or payment_id Or memo)                                         |
| destination  | String | No        | Remark                                                                         |

#### Parameters for Withdraw to BitMart account

> 2.Request: Withdraw to BitMart account

`curl   -H 'X-BM-KEY:{{AccessKey}}'  -H 'X-BM-TIMESTAMP:{{currentTime}}'  -H 'X-BM-SIGN:{{SIGN}}'   -X POST -d '{ {     "currency": "USDT-TRC20",     "amount": "100.000",     "type": 1,     "value": "876940329",     "areaCode": "" }' https://api-cloud.bitmart.com/account/v1/withdraw/apply`

| Field | Type | Required? | Description  |
| ----- | ---- | --------- | ------------ |
| type  | Int  | Yes       | Account type |

`1`\=CID  
`2`\=Email  
`3`\=Phone | | value | String | Yes | Account | | areaCode | String | Yes |
Phone area code, required when account type is phone, e.g.: 61 |

##### Important notes on request parameters

1\. If the currency has multiple blockchains, please pay attention to passing
parameters: such as USDT  
\`currency\`=\`USDT-TRX\` network is TRX  
\`currency\`=\`USDT-ETH\` network is ETH  
\`currency\`=\`USDT-BSC_BNB\` network is BSC_BNB  
\`currency\`=\`USDT-SOL\` network is SOL  
\`currency\`=\`USDT-ALGO\` network is ALGO  
[find more currencies network](#get-currencies)  
2\. Withdraw only supports addresses in the list of commonly used addresses of
users. IOTA, HLX one-time currency withdrawal address cannot be set as the
common address, so IOTA, HLX withdrawal address is not supported.  
3\. Without the withdrawal tag, \`address_memo\` does not pass or pass an empty
string.  
4\. If the parameters for \`Withdraw to the blockchain\` and the parameters for
\`Withdraw to BitMart account\` are transmitted at the same time, the parameters
for \`Withdraw to the blockchain\` will take precedence.

#### Response Data

> Response

```json
{
  "code": 1000,
  "trace": "886fb6ae-456b-4654-b4e0-d681ac05cea1",
  "message": "OK",
  "data": {
    "withdraw_id": "121212"
  }
}
```

| Field       | Type   | Description  |
| ----------- | ------ | ------------ |
| withdraw_id | String | Withdrawa ID |

##### Note

This interface is not available for sub-account

**1\. When withdraw_id is returned, it means that the withdrawal request has
been sent successfully.**

**2\. You can check the tx_id of this withdrawal by using the interface of
[Get A Deposit Or Withdraw Detail](#get-a-deposit-or-withdraw-detail-keyed), and
use it to query the withdrawal progress on the blockchain.**

**3\. If you get an error
message， message=`This address is not verified. Please add and verify this address on the client`**  
You
need to add the address to the whitelist address according to the following 3
steps.

Step 1: After logging in to the account on the Web or APP, enter the withdrawal
page.

Step 2: Click【Add withdrawal address】

![PNG](../../images/add-address-v2-step1-en-eeaabb94.png)

Step 3: On the address management page, save the withdrawal address as
\[Verified Address\], which supports API withdrawal.

![PNG](../../images/add-address-v2-step2-en-47a1ddb2.png)
![PNG](../../images/add-address-v2-step3-en-36045e7f.png)

**4\. Address Types:**

1\. Standard Address: Can be withdrawn to a specified currency and network
address.  
2\. Universal Address: Can be withdrawn to all currencies on the specified
network.  
3\. EVM Address: Can be withdrawn to currencies on EVM type networks.

**5\. Verified Addresses:**

1\. When saving an address, it can be pre-verified to skip the verification
during withdrawal (Verified addresses will not need to be verified again during
the withdrawal process).  
2\. API withdrawal must use verified addresses; un-verified addresses cannot be
used for withdrawal via API.
