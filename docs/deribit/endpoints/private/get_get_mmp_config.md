# GET /private/get\_mmp\_config

Get MMP configuration for an index, if the parameter is not provided, a list of all MMP configurations is returned. Empty list means no MMP configuration.

**Scope:** `trade:read` or `block_rfq:read` (when `block_rfq` = `true`)

This is a private method; it can only be used after authentication.

This is a matching engine method.

### Parameters

| Parameter | Required | Type | Enum | Description |
| --- | --- | --- | --- | --- |
| index_name | false | string | btc_usd eth_usd btc_usdc eth_usdc ada_usdc algo_usdc avax_usdc bch_usdc bnb_usdc doge_usdc dot_usdc link_usdc ltc_usdc near_usdc paxg_usdc shib_usdc sol_usdc ton_usdc trx_usdc trump_usdc uni_usdc xrp_usdc usde_usdc buidl_usdc btcdvol_usdc ethdvol_usdc btc_usdt eth_usdt all | Index identifier of derivative instrument on the platform; skipping this parameter will return all configurations |
| mmp_group | false | string | Specifies the MMP group for which the configuration is being retrieved. MMP groups are used for Mass Quotes. If MMP group is not provided, the method returns the configuration for the MMP settings for regular orders. The index_name must be specified before using this parameter. 📖 Related Support Article: Mass Quotes Specifications |  |
| block_rfq | false | boolean | If true, retrieves MMP configuration for Block RFQ. When set, requires block_rfq scope instead of trade scope. Block RFQ MMP settings are completely separate from normal order/quote MMP settings. |  |

### Response

| Name | Type | Description |
| --- | --- | --- |
| id | integer | The id that was sent in the request |
| jsonrpc | string | The JSON-RPC version (2.0) result array of object |
| result[].block_rfq | boolean | If true, indicates MMP configuration for Block RFQ. Block RFQ MMP settings are completely separate from normal order/quote MMP settings. |
| result[].delta_limit | number | Delta limit |
| result[].frozen_time | integer | MMP frozen time in seconds, if set to 0 manual reset is required |
| result[].index_name | string | Index identifier, matches (base) cryptocurrency with quote currency |
| result[].interval | integer | MMP Interval in seconds, if set to 0 MMP is disabled |
| result[].mmp_group | string | Specified MMP Group |
| result[].quantity_limit | number | Quantity limit |
| result[].trade_count_limit | integer | For Block RFQ only. The maximum number of Block RFQ trades allowed in the lookback window. Each RFQ trade counts as +1 towards the limit (not individual legs). Works across all currency pairs. |
| result[].vega_limit | number | Vega limit |