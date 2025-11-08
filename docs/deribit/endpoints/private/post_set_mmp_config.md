## /private/set_mmp_config

Set config for MMP - triggers MMP reset

**📖 Related Support Article:**
[Market Maker Protection API Configuration](https://support.deribit.com/hc/en-us/articles/27308287203357-Market-Maker-Protection-API-Configuration)

**Scope:** `trade:read_write` or `block_rfq:read_write` (when `block_rfq` =
`true`)

This is a private method; it can only be used after authentication.

This is a matching engine method.

### Parameters

| Parameter  | Required | Type   | Enum      | Description |
| ---------- | -------- | ------ | --------- | ----------- |
| index_name | true     | string | `btc_usd` |

`eth_usd`  
`btc_usdc`  
`eth_usdc`  
`ada_usdc`  
`algo_usdc`  
`avax_usdc`  
`bch_usdc`  
`bnb_usdc`  
`doge_usdc`  
`dot_usdc`  
`link_usdc`  
`ltc_usdc`  
`near_usdc`  
`paxg_usdc`  
`shib_usdc`  
`sol_usdc`  
`ton_usdc`  
`trx_usdc`  
`trump_usdc`  
`uni_usdc`  
`xrp_usdc`  
`usde_usdc`  
`buidl_usdc`  
`btcdvol_usdc`  
`ethdvol_usdc`  
`btc_usdt`  
`eth_usdt`  
`all` | Index identifier of derivative instrument on the platform | | interval |
true | integer | | MMP Interval in seconds, if set to 0 MMP is removed | |
frozen_time | true | integer | | MMP frozen time in seconds, if set to 0 manual
reset is required | | mmp_group | false | string | | Designates the MMP group
for which the configuration is being set. If the specified group is already
associated with a different `index_name`, an error is returned. This parameter
enables distinct configurations for each MMP group, linked to particular
`index_name`. Maximum 64 characters. Case sensitive. Cannot be empty string.

**📖 Related Support Article:**
[Mass Quotes Specifications](https://support.deribit.com/hc/en-us/articles/26302715576989-Mass-Quotes-Specifications)
| | quantity_limit | false | number | | Quantity limit, positive value | |
delta_limit | false | number | | Delta limit, positive value | | vega_limit |
false | number | | Vega limit, positive value | | block_rfq | false | boolean |
| If true, configures MMP for Block RFQ. When set, requires block_rfq scope
instead of trade scope. Block RFQ MMP settings are completely separate from
normal order/quote MMP settings. | | trade_count_limit | false | integer | | For
Block RFQ only (`block_rfq` = `true`). Sets the maximum number of Block RFQ
trades allowed in the lookback window. Each RFQ trade counts as `+1` towards the
limit (not individual legs). Works across all currency pairs. When using this
parameter, `index_name` must be set to `"all"`. Maximum - `1000`. |

### Response

| Name                   | Type              | Description                                                                                                                                                                                      |
| ---------------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| id                     | integer           | The id that was sent in the request                                                                                                                                                              |
| jsonrpc                | string            | The JSON-RPC version (2.0)                                                                                                                                                                       |
| result                 | array of _object_ |                                                                                                                                                                                                  |
|   ›  block_rfq         | boolean           | If true, indicates MMP configuration for Block RFQ. Block RFQ MMP settings are completely separate from normal order/quote MMP settings.                                                         |
|   ›  delta_limit       | number            | Delta limit                                                                                                                                                                                      |
|   ›  frozen_time       | integer           | MMP frozen time in seconds, if set to 0 manual reset is required                                                                                                                                 |
|   ›  index_name        | string            | Index identifier, matches (base) cryptocurrency with quote currency                                                                                                                              |
|   ›  interval          | integer           | MMP Interval in seconds, if set to 0 MMP is disabled                                                                                                                                             |
|   ›  mmp_group         | string            | Specified MMP Group                                                                                                                                                                              |
|   ›  quantity_limit    | number            | Quantity limit                                                                                                                                                                                   |
|   ›  trade_count_limit | integer           | For Block RFQ only. The maximum number of Block RFQ trades allowed in the lookback window. Each RFQ trade counts as +1 towards the limit (not individual legs). Works across all currency pairs. |
|   ›  vega_limit        | number            | Vega limit                                                                                                                                                                                       |
