# Response Formats

**Source:**
https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/notation

1.  [For developers](/hyperliquid-docs/for-developers)
2.  [API](/hyperliquid-docs/for-developers/api)

# Notation

The current v0 API currently uses some nonstandard notation. Relevant
standardization will be batched into a breaking v1 API change.

| Abbreviation | Full name                 | Explanation                                                                                    |
| ------------ | ------------------------- | ---------------------------------------------------------------------------------------------- |
| Px<br>       | Price<br>                 | <br>                                                                                           |
| Sz<br>       | Size<br>                  | In units of coin, i.e. base currency<br>                                                       |
| Szi<br>      | Signed size<br>           | Positive for long, negative for short<br>                                                      |
| Ntl<br>      | Notional<br>              | USD amount, Px \* Sz<br>                                                                       |
| Side<br>     | Side of trade or book<br> | B = Bid = Buy, A = Ask = Short. Side is aggressing side for trades.<br>                        |
| Asset<br>    | Asset<br>                 | An integer representing the asset being traded. See below for explanation<br>                  |
| Tif<br>      | Time in force<br>         | GTC = good until canceled, ALO = add liquidity only (post only), IOC = immediate or cancel<br> |

[PreviousAPI](/hyperliquid-docs/for-developers/api)[NextAsset IDs](/hyperliquid-docs/for-developers/api/asset-ids)

Last updated 1 year ago
