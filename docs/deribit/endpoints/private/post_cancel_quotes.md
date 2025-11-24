# POST /private/cancel\_quotes

Cancels quotes based on the provided type. `delta` cancels quotes within a Delta range defined by `min_delta` and `max_delta`. `quote_set_id` cancels quotes by a specific Quote Set identifier. `instrument` cancels all quotes associated with a particular instrument. `kind` cancels all quotes for a certain instrument kind. `currency` cancels all quotes in a specified currency. `currency_pair` cancels all quotes in a specified currency pair. `all` cancels all quotes.

**Scope:** `trade:read_write`

This is a private method; it can only be used after authentication.

This is a matching engine method.

### Parameters

| Parameter | Required | Type | Enum | Description |
| --- | --- | --- | --- | --- |
| detailed | false | boolean | When detailed is set to true output format is changed. See description. Default: false |  |
| freeze_quotes | false | boolean | Whether or not to reject incoming quotes for 1 second after cancelling (false by default). Related to private/mass_quote request. |  |
| cancel_type | true | string | delta quote_set_id instrument instrument_kind currency currency_pair all | Type of cancel criteria. |
| min_delta | false | number | Min delta to cancel by delta (for cancel_type: delta). |  |
| max_delta | false | number | Max delta to cancel by delta (for cancel_type: delta). |  |
| quote_set_id | false | string | Unique identifier for the Quote set. |  |
| instrument_name | false | string | Instrument name. |  |
| kind | false | string | future option spot future_combo option_combo combo any | Instrument kind, "combo" for any combo or "any" for all. If not provided instruments of all kinds are considered |
| currency | true | string | BTC ETH USDC USDT EURR | The currency symbol |
| currency_pair | true | string | btc_usd eth_usd ada_usdc algo_usdc avax_usdc bch_usdc bnb_usdc btc_usdc btcdvol_usdc buidl_usdc doge_usdc dot_usdc eurr_usdc eth_usdc ethdvol_usdc link_usdc ltc_usdc near_usdc paxg_usdc shib_usdc sol_usdc steth_usdc ton_usdc trump_usdc trx_usdc uni_usdc usde_usdc usyc_usdc xrp_usdc btc_usdt eth_usdt eurr_usdt sol_usdt steth_usdt usdc_usdt usde_usdt btc_eurr btc_usde btc_usyc eth_btc eth_eurr eth_usde eth_usyc steth_eth paxg_btc drbfix-btc_usdc drbfix-eth_usdc | The currency pair symbol |

### Response

| Name | Type | Description |
| --- | --- | --- |
| id | integer | The id that was sent in the request |
| jsonrpc | string | The JSON-RPC version (2.0) |
| result | number | Total number of successfully cancelled quotes |