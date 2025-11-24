# POST /private/cancel\_all\_by\_currency\_pair

Cancels all orders by currency pair, optionally filtered by instrument kind and/or order type.

**Scope:** `trade:read_write`

This is a private method; it can only be used after authentication.

This is a matching engine method.

### Parameters

| Parameter | Required | Type | Enum | Description |
| --- | --- | --- | --- | --- |
| currency_pair | true | string | btc_usd eth_usd ada_usdc algo_usdc avax_usdc bch_usdc bnb_usdc btc_usdc btcdvol_usdc buidl_usdc doge_usdc dot_usdc eurr_usdc eth_usdc ethdvol_usdc link_usdc ltc_usdc near_usdc paxg_usdc shib_usdc sol_usdc steth_usdc ton_usdc trump_usdc trx_usdc uni_usdc usde_usdc usyc_usdc xrp_usdc btc_usdt eth_usdt eurr_usdt sol_usdt steth_usdt usdc_usdt usde_usdt btc_eurr btc_usde btc_usyc eth_btc eth_eurr eth_usde eth_usyc steth_eth paxg_btc drbfix-btc_usdc drbfix-eth_usdc | The currency pair symbol |
| kind | false | string | future option spot future_combo option_combo combo any | Instrument kind, "combo" for any combo or "any" for all. If not provided instruments of all kinds are considered |
| type | false | string | all limit trigger_all stop take trailing_stop | Order type - limit, stop, take, trigger_all or all, default - all |
| detailed | false | boolean | When detailed is set to true output format is changed. See description. Default: false |  |
| freeze_quotes | false | boolean | Whether or not to reject incoming quotes for 1 second after cancelling (false by default). Related to private/mass_quote request. |  |

### Response

| Name | Type | Description |
| --- | --- | --- |
| id | integer | The id that was sent in the request |
| jsonrpc | string | The JSON-RPC version (2.0) |
| result | number | Total number of successfully cancelled orders |