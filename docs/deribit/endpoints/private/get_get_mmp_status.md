# GET /private/get\_mmp\_status

Get MMP status for triggered index (or group). If the parameter is not provided, a list of all triggered MMP statuses is returned.

**Scope:** `trade:read` or `block_rfq:read` (when `block_rfq` = `true`)

This is a private method; it can only be used after authentication.

This is a matching engine method.

### Parameters

| Parameter | Required | Type | Enum | Description |
| --- | --- | --- | --- | --- |
| index_name | false | string | btc_usd eth_usd btc_usdc eth_usdc ada_usdc algo_usdc avax_usdc bch_usdc bnb_usdc doge_usdc dot_usdc link_usdc ltc_usdc near_usdc paxg_usdc shib_usdc sol_usdc ton_usdc trx_usdc trump_usdc uni_usdc xrp_usdc usde_usdc buidl_usdc btcdvol_usdc ethdvol_usdc btc_usdt eth_usdt all | Index identifier of derivative instrument on the platform; skipping this parameter will return all configurations |
| mmp_group | false | string | Specifies the MMP group for which the status is being retrieved. The index_name must be specified before using this parameter. 📖 Related Support Article: Mass Quotes Specifications |  |
| block_rfq | false | boolean | If true, retrieves MMP status for Block RFQ. When set, requires block_rfq scope instead of trade scope. Block RFQ MMP status is completely separate from normal order/quote MMP status. |  |

### Response

| Name | Type | Description |
| --- | --- | --- |
| id | integer | The id that was sent in the request |
| jsonrpc | string | The JSON-RPC version (2.0) result array of object |
| result[].block_rfq | boolean | If true, indicates that the MMP status is for Block RFQ. Block RFQ MMP status is completely separate from normal order/quote MMP status. |
| result[].frozen_until | integer | Timestamp (milliseconds since the UNIX epoch) until the user will be frozen - 0 means that the user is frozen until manual reset. |
| result[].index_name | string | Index identifier, matches (base) cryptocurrency with quote currency |
| result[].mmp_group | string | Triggered mmp group, this parameter is optional (appears only for Mass Quote orders trigger) |