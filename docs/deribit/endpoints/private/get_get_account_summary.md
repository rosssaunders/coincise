# GET /private/get\_account\_summary

Retrieves user account summary. To read subaccount summary use `subaccount_id` parameter.

**Scope:** `account:read`

This is a private method; it can only be used after authentication.

### Parameters

| Parameter | Required | Type | Enum | Description |
| --- | --- | --- | --- | --- |
| currency | true | string | BTC ETH STETH ETHW USDC USDT EURR MATIC SOL XRP USYC PAXG BNB USDE | The currency symbol |
| subaccount_id | false | integer | The user id for the subaccount |  |
| extended | false | boolean | Include additional fields |  |

### Response

| Name | Type | Description |
| --- | --- | --- |
| id | integer | The id that was sent in the request |
| jsonrpc | string | The JSON-RPC version (2.0) result object |
| result.options_pl | number | Options profit and Loss |
| result.projected_delta_total | number | The sum of position deltas without positions that will expire during closest expiration |
| result.options_theta_map | object | Map of options' thetas per index |
| result.has_non_block_chain_equity | boolean | Optional field returned with value true when user has non block chain equity that is excluded from proof of reserve calculations |
| result.total_margin_balance_usd | number | Optional (only for users using cross margin). The account's total margin balance in all cross collateral currencies, expressed in USD |
| result.limits | object | Returned object is described in separate document. |
| result.type | string | Account type (available when parameter extended = true) |
| result.total_delta_total_usd | number | Optional (only for users using cross margin). The account's total delta total in all cross collateral currencies, expressed in USD |
| result.available_withdrawal_funds | number | The account's available to withdrawal funds |
| result.options_session_rpl | number | Options session realized profit and Loss |
| result.futures_session_rpl | number | Futures session realized profit and Loss |
| result.total_pl | number | Profit and loss |
| result.spot_reserve | number | The account's balance reserved in active spot orders |
| result.fees | array of object | List of fee objects for all currency pairs and instrument types related to the currency (available when parameter extended = true and user has any discounts) |
| result.fees[].index_name | string | The currency pair this fee applies to |
| result.fees[].kind | string | Type of the instruments the fee applies to - future for future instruments (excluding perpetual), perpetual for future perpetual instruments, option for options result.fees[].value object |
| result.fees[].value.block_trade | number | Block trade fee (if applicable) result.fees[].value.default object |
| result.fees[].value.default.maker | number | Maker fee |
| result.fees[].value.default.taker | number | Taker fee |
| result.fees[].value.default.type | string | Fee type - relative if fee is calculated as a fraction of base instrument fee, fixed if fee is calculated solely using user fee |
| result.fees[].value.settlement | number | Settlement fee |
| result.additional_reserve | number | The account's balance reserved in other orders |
| result.options_session_upl | number | Options session unrealized profit and Loss |
| result.cross_collateral_enabled | boolean | When true cross collateral is enabled for user |
| result.id | integer | Account id (available when parameter extended = true) |
| result.options_value | number | Options value |
| result.creation_timestamp | integer | Time at which the account was created (milliseconds since the Unix epoch; available when parameter extended = true) |
| result.email | string | User email (available when parameter extended = true) |
| result.options_vega_map | object | Map of options' vegas per index |
| result.maintenance_margin | number | The maintenance margin. When cross collateral is enabled, this aggregated value is calculated by converting the sum of each cross collateral currency's value to the given currency, using each cross collateral currency's index. |
| result.mmp_enabled | boolean | Whether MMP is enabled (available when parameter extended = true) |
| result.futures_session_upl | number | Futures session unrealized profit and Loss |
| result.portfolio_margining_enabled | boolean | true when portfolio margining is enabled for user |
| result.futures_pl | number | Futures profit and Loss |
| result.options_gamma_map | object | Map of options' gammas per index |
| result.currency | string | The selected currency |
| result.options_delta | number | Options summary delta |
| result.initial_margin | number | The account's initial margin. When cross collateral is enabled, this aggregated value is calculated by converting the sum of each cross collateral currency's value to the given currency, using each cross collateral currency's index. |
| result.projected_maintenance_margin | number | Projected maintenance margin. When cross collateral is enabled, this aggregated value is calculated by converting the sum of each cross collateral currency's value to the given currency, using each cross collateral currency's index. |
| result.available_funds | number | The account's available funds. When cross collateral is enabled, this aggregated value is calculated by converting the sum of each cross collateral currency's value to the given currency, using each cross collateral currency's index. |
| result.referrer_id | string | Optional identifier of the referrer (of the affiliation program, and available when parameter extended = true), which link was used by this account at registration. It coincides with suffix of the affiliation link path after /reg- |
| result.login_enabled | boolean | Whether account is loginable using email and password (available when parameter extended = true and account is a subaccount) |
| result.equity | number | The account's current equity |
| result.margin_model | string | Name of user's currently enabled margin model |
| result.balance | number | The account's balance |
| result.session_upl | number | Session unrealized profit and loss |
| result.margin_balance | number | The account's margin balance. When cross collateral is enabled, this aggregated value is calculated by converting the sum of each cross collateral currency's value to the given currency, using each cross collateral currency's index. |
| result.security_keys_enabled | boolean | Whether Security Key authentication is enabled (available when parameter extended = true) |
| result.deposit_address | string | The deposit address for the account (if available) |
| result.options_theta | number | Options summary theta |
| result.self_trading_extended_to_subaccounts | string | true if self trading rejection behavior is applied to trades between subaccounts (available when parameter extended = true) |
| result.interuser_transfers_enabled | boolean | true when the inter-user transfers are enabled for user (available when parameter extended = true) |
| result.total_initial_margin_usd | number | Optional (only for users using cross margin). The account's total initial margin in all cross collateral currencies, expressed in USD |
| result.estimated_liquidation_ratio | number | Estimated Liquidation Ratio is returned only for users without portfolio margining enabled. Multiplying it by future position's market price returns its estimated liquidation price. When cross collateral is enabled, this aggregated value is calculated by converting the sum of each cross collateral currency's value to the given currency, using each cross collateral currency's index. |
| result.session_rpl | number | Session realized profit and loss |
| result.fee_balance | number | The account's fee balance (it can be used to pay for fees) |
| result.total_maintenance_margin_usd | number | Optional (only for users using cross margin). The account's total maintenance margin in all cross collateral currencies, expressed in USD |
| result.options_vega | number | Options summary vega |
| result.projected_initial_margin | number | Projected initial margin. When cross collateral is enabled, this aggregated value is calculated by converting the sum of each cross collateral currency's value to the given currency, using each cross collateral currency's index. |
| result.self_trading_reject_mode | string | Self trading rejection behavior - reject_taker or cancel_maker (available when parameter extended = true) |
| result.system_name | string | System generated user nickname (available when parameter extended = true) |
| result.options_gamma | number | Options summary gamma |
| result.username | string | Account name (given by user) (available when parameter extended = true) |
| result.total_equity_usd | number | Optional (only for users using cross margin). The account's total equity in all cross collateral currencies, expressed in USD |
| result.delta_total | number | The sum of position deltas |