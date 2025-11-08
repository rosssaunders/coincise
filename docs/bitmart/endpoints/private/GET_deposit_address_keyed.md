# GET Deposit Address (KEYED)

**Source:** [Deposit Address (KEYED)](https://developer-pro.bitmart.com/en/spot/)

**API Type:** Spot

## Authentication

Required (Private Endpoint)

## Deposit Address (KEYED)

`Gets Deposit Address`

#### Request URL

`GET https://api-cloud.bitmart.com/account/v1/deposit/address`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

`curl -H 'X-BM-KEY:{{AccessKey}}' https://api-cloud.bitmart.com/account/v1/deposit/address?currency=USDT-TRC20`

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| currency | String | Yes | Token symbol, e.g., 'BTC' |

**Instruction**

![PNG](../../images/usdt_address_en-4cddf274.png)

USDT has multiple recharge addresses, please select them correctly. For example:  
\`currency\` = \`USDT\` default is OMNI;  
\`currency\` = \`USDT-TRC20\` is TRC20;  
\`currency\` = \`USDT-ERC20\` is ERC20;

#### Response Data

> Response

`{     "message":"OK",     "code":1000,     "trace":"0e6edd79-f77f-4251-abe5-83ba75d06c1a",     "data":{         "currency":"USDT-TRC20",         "chain":"USDT-TRC20",         "address":"TGR3ghy2b5VLbyAYrmiE15jasR6aPHTvC5",         "address_memo":""     } }`

| Field | Type | Description |
| --- | --- | --- |
| currency | String | Token symbol, e.g., 'BTC' |
| chain | String | Token chain |
| address | String | Deposit address |
| address\_memo | String | Tag (tag/payment\_id/memo); If some currencies need to withdraw currency, it will return data. If not, it will return empty string |

This interface is not available for sub-account

The tag names required by each currency are different, such as (tag/payment\_id/memo). For convenience, BitMart is uniformly defined as address\_Memo. This means that regardless of the currency in which tag/payment\_id/memo is required, the service returns the address\_Memo field uniformly. Please pay attention to the distinction.  
Tag are required for some tokens. Please include them while making deposits to ensure the your funds will be properly credited.  
IOTA and HLX COINS are temporarily not supported for deposit.

[Forgot to write Memo/Wrote a wrong Memo?](https://bitmart.zendesk.com/hc/en-us/articles/360050031134-Forgot-to-write-Memo-Wrote-a-wrong-Memo)