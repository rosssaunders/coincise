# GET /private/list\_custody\_accounts

Retrieves user custody accounts list.

**📖 Related Support Article:** [Custody Options](https://support.deribit.com/hc/en-us/articles/26533163120413-Custody-Options)

This is a private method; it can only be used after authentication.

### Parameters

| Parameter | Required | Type | Enum | Description |
| --- | --- | --- | --- | --- |
| currency | true | string | BTC ETH USDC USDT EURR | The currency symbol |

### Response

| Name | Type | Description |
| --- | --- | --- |
| id | integer | The id that was sent in the request |
| jsonrpc | string | The JSON-RPC version (2.0) |
| result | array of object | Custody account |
| result[].auto_deposit | boolean | When set to 'true' all new funds added to custody balance will be automatically transferred to trading balance |
| result[].balance | number | Amount of funds in given currency |
| result[].client_id | string | API key 'client id' used to reserve/release funds in custody platform, requires scope 'custody:read_write' |
| result[].currency | string | Currency, i.e "BTC", "ETH", "USDC" |
| result[].deposit_address | string | Address that can be used for deposits |
| result[].external_id | string | User ID in external systems |
| result[].name | string | Custody name |
| result[].pending_withdrawal_addres | string | New withdrawal address that will be used after 'withdrawal_address_change' |
| result[].pending_withdrawal_balance | number | Amount of funds in given currency |
| result[].withdrawal_address | string | Address that is used for withdrawals |
| result[].withdrawal_address_change | number | UNIX timestamp after when new withdrawal address will be used for withdrawals |