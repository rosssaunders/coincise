IntroductionAuthenticationSigning requestsChangelog2025-09-022025-09-012025-08-072025-06-082025-04-222025-04-082025-03-262025-03-192025-02-282025-02-112025-02-072025-02-032025-01-092024-12-032024-12-022024-11-102024-10-152024-05-142024-05-032024-05-022024-05-012024-03-142024-02-282024-02-242024-01-162024-01-11Public EndpointsAssetsgetGet assets.getGet collateral.Borrow Lend MarketsgetGet borrow lend markets.getGet borrow lend market history.MarketsgetGet markets.getGet market.getGet ticker.getGet tickers.getGet depth.getGet K-lines.getGet all mark prices.getGet open interest.getGet funding interval rates.SystemgetStatus.getPing.getGet system time.getGet wallets.TradesgetGet recent trades.getGet historical trades.Authenticated EndpointsAccountgetGet account.patchUpdate account.postConvert a dust balance on an account.getGet max borrow quantity.getGet max order quantity.getGet max withdrawal quantity.Borrow LendgetGet borrow lend positions.postExecute borrow lend.getGet an estimated liquidation price for potential borrow lend position.CapitalgetGet balances.getGet collateral.getGet deposits.getGet deposit address.getGet withdrawals.postRequest withdrawal.FuturesgetGet open positions.HistorygetGet borrow history.getGet interest history.getGet borrow position history.getGet dust conversion history.getGet fill history.getGet funding payments.getGet order history.getGet rfq history.getGet quote history.getGet settlement history.getGet strategy history.OrdergetGet open order.postExecute order.delCancel open order.postExecute orders.getGet open orders.delCancel open orders.Request For QuotepostSubmit RFQ.postAccept quote.postRefresh RFQ.postCancel RFQ.postSubmit quote.WebsocketStreamsUsageSubscribingTimingKeeping the connection alivePrivateOrder updatePosition updateRFQ UpdatePublicBook tickerDepthK-LineLiquidationMark priceTickerOpen interestTradeAPI docs by RedoclyBackpack Exchange API (1.0)Download OpenAPI specification:DownloadIntroductionWelcome to the Backpack Exchange API. This API is for programmatic trade execution. All of the endpoints require requests to be signed with an ED25519 keypair for authentication.

The API is hosted at https://api.backpack.exchange/ and the WS API is hosted at wss://ws.backpack.exchange/.

AuthenticationSigning requestsSigned requests are required for any API calls that mutate state. Additionally, some read only requests can be performed by signing or via session authentication.

Signed requests require the following additional headers:

X-Timestamp - Unix time in milliseconds that the request was sent.

X-Window - Time window in milliseconds that the request is valid for, default is 5000 and maximum is 60000.

X-API-Key - Base64 encoded verifying key of the ED25519 keypair.

X-Signature - Base64 encoded signature generated according to the instructions below.

## To generate a signature perform the following:

The key/values of the request body or query parameters should be ordered alphabetically and then turned into query string format.

Append the header values for the timestamp and receive window to the above generated string in the format &timestamp=<timestamp>&window=<window>. If no X-Window header is passed the default value of 5000 still needs to be added to the signing string.

Each request also has an instruction type, valid instructions are:

## accountQuery

## balanceQuery

## borrowLendExecute

## borrowHistoryQueryAll

## collateralQuery

## depositAddressQuery

## depositQueryAll

## fillHistoryQueryAll

## fundingHistoryQueryAll

## interestHistoryQueryAll

## orderCancel

## orderCancelAll

## orderExecute

## orderHistoryQueryAll

## orderQuery

## orderQueryAll

## pnlHistoryQueryAll

## positionQuery

## quoteSubmit

## strategyCancel

## strategyCancelAll

## strategyCreate

## strategyHistoryQueryAll

## strategyQuery

## strategyQueryAll

## withdraw

## withdrawalQueryAll

The correct instruction type should be prefixed to the signing string. The instruction types for each request are documented alongside the request.

For example, an API request to cancel an order with the following body:

## {

## "orderId": 28

"symbol": "BTC_USDT",

## }

## Would require the following to be signed:

instruction=orderCancel&orderId=28&symbol=BTC_USDT&timestamp=1614550000000&window=5000

Regarding batch order execution (POST /orders), for each order in the batch, the order parameters should be ordered alphabetically and then turned into query string format. The orderExecute instruction should then be prefixed to that string.

The query strings for the orders should be concatenated with & and the timestamp and window appended at the end.

For example, an API request for an order execution batch with the following body:

## [

## {

"symbol": "SOL_USDC_PERP",

"side": "Bid",

"orderType": "Limit",

"price": "141",

## "quantity": "12"

},

## {

"symbol": "SOL_USDC_PERP",

"side": "Bid",

"orderType": "Limit",

"price": "140",

## "quantity": "11"

## }

## ]

## Would require the following to be signed:

instruction=orderExecute&orderType=Limit&price=141&quantity=12&side=Bid&symbol=SOL_USDC_PERP&instruction=orderExecute&orderType=Limit&price=140&quantity=11&side=Bid&symbol=SOL_USDC_PERP&timestamp=1750793021519&window=5000

If the API endpoint requires query parameters instead of a request body, the same procedure should be used on the query parameters. If the API endpoint does not have a request body or query parameters, only the timestamp and receive window need to be signed.

This message should be signed using the private key of the ED25519 keypair that corresponds to the public key in the X-API-Key header. The signature should then be base64 encoded and submitted in the X-Signature header.

## Changelog2025-09-02

The /depth endpoint now returns a limit of 5,000 price levels on each side of the book.

## 2025-09-01

The cumulativeInterest response field is being removed from the /positionendpoint.

Estimated liquidation price or l is being removed from the position update stream. It will remain as a placeholder

and be set to 0. It will be removed in the future, so client's should not rely on its presence.

Liquidation price can be queried for a single position using the Positions API /position for example

/position?symbol=BTC_USDC_PERP.

## 2025-08-07

/history/pnl has been removed.

## 2025-06-08

The order id format is changing, it is no longer a byte shifted timestamp. It is no longer possible to derive the

order timestamp from the order id. This change will take place at Monday June 9th, 01:00 UTC.

## 2025-04-22

The /fills endpoint now returns all fills for the account, including fills from system orders as well as client

orders. System orders include liquidations, ADLs and collateral conversions. Previously, by default, it only returned

fills from client orders. This behavior can be achieved by setting the fillType parameter to User.

## 2025-04-08

Added funding rate lower and upper bounds to /markets and /market endpoints.

## 2025-03-26

Add open interest stream openInterest.<symbol>.

Added the option to query /history/borrowLend/positions with a signed request using the instruction

borrowPositionHistoryQueryAll.

## 2025-03-19

The leverage filter has been removed from /markets and /market endpoints.

Added /openInterest now takes symbol as an optional parameter. When not set, all markets are returned.

/openInterests has been deprecated.

Add stop loss and take profit fields to /orders/execute.

Add I field to the order update stream (related order id).

Add a and b fields to the order update stream (take profit trigger price and stop loss trigger price).

## 2025-02-28

Added clientId to fill history.

## 2025-02-11

An O field has been added to the order update stream. It denotes the origin of the update. The possible values are:

USER: The origin of the update was due to order entry by the user.

LIQUIDATION_AUTOCLOSE: The origin of the update was due to a liquidation by the liquidation engine.

ADL_AUTOCLOSE: The origin of the update was due to an ADL (auto-deleveraging) event.

COLLATERAL_CONVERSION: The origin of the update was due to a collateral conversion to settle debt on the

account.

SETTLEMENT_AUTOCLOSE: The origin of the update was due to the settlement of a position on a dated market.

BACKSTOP_LIQUIDITY_PROVIDER: The origin of the update was due to a backstop liquidity provider facilitating a

liquidation.

## 2025-02-07

Added r to denote a reduce only order on the order updates stream.

Added reduceOnly to the get orders endpoint.

## 2025-02-03

Added openInterestLimit to the markets endpoint. Applicable to futures markets only.

Added orderModified event to the order update stream. A resting reduce only order's quantity can be decreased in

order to prevent position side reversal.

## 2025-01-09

Added marketType to the markets endpoint.

Added an optional marketType filter to the fills and the orders endpoints.

## 2024-12-03

Add order expiry reason to order update stream.

Add cumulativeInterest to borrow lend position.

## 2024-12-02

Add borrow lend history per position endpoint.

## 2024-11-10

Add timestamp field denoting the system time in unix-epoch microseconds to the depth endpoint.

## 2024-10-15

Convert all error responses to JSON and add a error code.

## 2024-05-14

Add executedQuantity and executedQuoteQuantity to order history endpoint.

## 2024-05-03

Add single market order update stream account.orderUpdate.<symbol>.

## 2024-05-02

Add optional from and to timestamp to get withdrawals endpoint.

## 2024-05-01

Add optional from and to timestamp to get deposits endpoint.

## 2024-03-14

Add optional orderId filter to order history endpoint.

Add optional from and to timestamp to order fills endpoint.

## 2024-02-28

Return the withdrawal in request withdrawal response.

## 2024-02-24

An additional field t was added to the private order update stream. It is the trade_id of the fill that generated

the order update.

Added a maximum value for the X-Window header of 60000.

## 2024-01-16Breaking

A new websocket API is available at wss://ws.backpack.exchange. Please see the documentation. The previous API

remains on the same endpoint and will be deprecated after a migration period. The new API changes the following:

Subscription endpoint is now wss://ws.backpack.exchange instead of wss://ws.backpack.exchange/stream.

Can subscribe and unsubscribe to/from multiple streams by passing more than one in the params field.

Signature should now be sent in a separate signature field.

Signature instruction changed from accountQuery to subscribe.

Event and engine timestamps are now in microseconds instead of milliseconds.

Add engine timestamp to bookTicker, depth, and order streams.

Add quote asset volume to ticker stream.

Add sequential trade id to trade stream.

Rename the event type in the depth stream from depthEvent to depth.

Change the format of streams from <symbol>@<type> to <type>.<symbol> or kline.<interval>.<symbol> for

K-lines.

Flatten the K-Line in the K-line stream so its not nested.

## 2024-01-11Breaking

Replaced identifier field on deposits with transaction_hash and provider_id.

This aims to provide clearer representation of the field, particularly for fiat deposits.

Removed duplicate pending values from the WithdrawalStatus and DepositStatus spec enum.

AssetsAssets and collateral data.

Get assets. Get all supported assets.

Responses200 Success.

500 Internal server error.

get/api/v1/assetshttps://api.backpack.exchange/api/v1/assets Response samples 200500Content typeapplication/json; charset=utf-8Copy Expand all  Collapse all [{"symbol": "BTC","displayName": "string","coingeckoId": "string","tokens": [{"displayName": "string","blockchain": "Aptos","contractAddress": "string","depositEnabled": true,"minimumDeposit": "string","withdrawEnabled": true,"minimumWithdrawal": "string","maximumWithdrawal": "string","withdrawalFee": "string"}]}]Get collateral. Get collateral parameters for assets.

Responses200 Success.

500 Internal server error.

get/api/v1/collateralhttps://api.backpack.exchange/api/v1/collateral Response samples 200500Content typeapplication/json; charset=utf-8Copy Expand all  Collapse all [{"symbol": "string","imfFunction": {"type": "sqrt","base": "string","factor": "string"},"mmfFunction": {"type": "sqrt","base": "string","factor": "string"},"haircutFunction": {"weight": "string","kind": {"type": "identity"}}}]Borrow Lend MarketsBorrowing and lending.

Get borrow lend markets. Responses200 Success.

500 Internal server error.

get/api/v1/borrowLend/marketshttps://api.backpack.exchange/api/v1/borrowLend/markets Response samples 200500Content typeapplication/json; charset=utf-8Copy Expand all  Collapse all [{"state": "Open","assetMarkPrice": "string","borrowInterestRate": "string","borrowedQuantity": "string","fee": "string","lendInterestRate": "string","lentQuantity": "string","maxUtilization": "string","openBorrowLendLimit": "string","optimalUtilization": "string","symbol": "BTC","timestamp": "2019-08-24T14:15:22Z","throttleUtilizationThreshold": "string","throttleUtilizationBound": "string","throttleUpdateFraction": "string","utilization": "string","stepSize": "string"}]Get borrow lend market history. query Parametersintervalrequiredstring (BorrowLendMarketHistoryInterval)  Enum: "1d" "1w" "1month" "1year"  Filter for an interval.

symbolstring Market symbol to query. If not set, all markets are returned.

Responses200 Success.

500 Internal server error.

get/api/v1/borrowLend/markets/historyhttps://api.backpack.exchange/api/v1/borrowLend/markets/history Response samples 200500Content typeapplication/json; charset=utf-8Copy Expand all  Collapse all [{"borrowInterestRate": "string","borrowedQuantity": "string","lendInterestRate": "string","lentQuantity": "string","timestamp": "2019-08-24T14:15:22Z","utilization": "string"}]MarketsPublic market data.

Get markets. Retrieves all the markets that are supported by the exchange.

Responses200 Success.

500 Internal server error.

get/api/v1/marketshttps://api.backpack.exchange/api/v1/markets Response samples 200500Content typeapplication/json; charset=utf-8Copy Expand all  Collapse all [{"symbol": "string","baseSymbol": "BTC","quoteSymbol": "BTC","marketType": "SPOT","filters": {"price": {"minPrice": "string","maxPrice": "string","tickSize": "string","maxMultiplier": "string","minMultiplier": "string","maxImpactMultiplier": "string","minImpactMultiplier": "string","meanMarkPriceBand": {"maxMultiplier": "string","minMultiplier": "string"},"meanPremiumBand": {"tolerancePct": "string"},"borrowEntryFeeMaxMultiplier": "string","borrowEntryFeeMinMultiplier": "string"},"quantity": {"minQuantity": "string","maxQuantity": "string","stepSize": "string"}},"imfFunction": {"type": "sqrt","base": "string","factor": "string"},"mmfFunction": {"type": "sqrt","base": "string","factor": "string"},"fundingInterval": 0,"fundingRateUpperBound": "string","fundingRateLowerBound": "string","openInterestLimit": "string","orderBookState": "Open","createdAt": "string","visible": true}]Get market. Retrieves a market supported by the exchange.

query Parameterssymbolrequiredstring Responses200 Success.

400 Bad request.

500 Internal server error.

get/api/v1/markethttps://api.backpack.exchange/api/v1/market Response samples 200400500Content typeapplication/json; charset=utf-8Copy Expand all  Collapse all {"symbol": "string","baseSymbol": "BTC","quoteSymbol": "BTC","marketType": "SPOT","filters": {"price": {"minPrice": "string","maxPrice": "string","tickSize": "string","maxMultiplier": "string","minMultiplier": "string","maxImpactMultiplier": "string","minImpactMultiplier": "string","meanMarkPriceBand": {"maxMultiplier": "string","minMultiplier": "string"},"meanPremiumBand": {"tolerancePct": "string"},"borrowEntryFeeMaxMultiplier": "string","borrowEntryFeeMinMultiplier": "string"},"quantity": {"minQuantity": "string","maxQuantity": "string","stepSize": "string"}},"imfFunction": {"type": "sqrt","base": "string","factor": "string"},"mmfFunction": {"type": "sqrt","base": "string","factor": "string"},"fundingInterval": 0,"fundingRateUpperBound": "string","fundingRateLowerBound": "string","openInterestLimit": "string","orderBookState": "Open","createdAt": "string","visible": true}Get ticker. Retrieves summarised statistics for the last 24 hours for the given

market symbol.

query Parameterssymbolrequiredstring intervalstring (TickerInterval)  Enum: "1d" "1w"  Responses200 Success.

204 Not found.

400 Bad request.

500 Internal server error.

get/api/v1/tickerhttps://api.backpack.exchange/api/v1/ticker Response samples 200400500Content typeapplication/json; charset=utf-8Copy{"symbol": "string","firstPrice": "string","lastPrice": "string","priceChange": "string","priceChangePercent": "string","high": "string","low": "string","volume": "string","quoteVolume": "string","trades": "string"}Get tickers. Retrieves summarised statistics for the last 24 hours for all market

symbols.

query Parametersintervalstring (TickerInterval)  Enum: "1d" "1w"  Responses200 Success.

500 Internal server error.

get/api/v1/tickershttps://api.backpack.exchange/api/v1/tickers Response samples 200500Content typeapplication/json; charset=utf-8Copy Expand all  Collapse all [{"symbol": "string","firstPrice": "string","lastPrice": "string","priceChange": "string","priceChangePercent": "string","high": "string","low": "string","volume": "string","quoteVolume": "string","trades": "string"}]Get depth. Retrieves the order book depth for a given market symbol.

query Parameterssymbolrequiredstring Responses200 Success.

400 Bad request.

500 get/api/v1/depthhttps://api.backpack.exchange/api/v1/depth Response samples 200400500Content typeapplication/json; charset=utf-8Copy Expand all  Collapse all {"asks": [["21.9","500.123"],["22.1","2321.11"]],"bids": [["20.12","255.123"],["20.5","499.555"]],"lastUpdateId": "1684026955123","timestamp": 1684026955123}Get K-lines. Get K-Lines for the given market symbol, optionally providing a

startTime and endTime. If no endTime is provided, the current time

will be used.

The priceType parameter can be used to specify the price type of the

kline. If not provided, the default is LastPrice.

query Parameterssymbolrequiredstring Market symbol for the kline query, e.g. SOL_USDC.

intervalrequiredstring (KlineInterval)  Enum: "1m" "3m" "5m" "15m" "30m" "1h" "2h" "4h" "6h" "8h" "12h" "1d" "3d" "1w" "1month"  startTimerequiredinteger <int64>  UTC timestamp in seconds.

endTimeinteger <int64>  UTC timestamp in seconds. Set to the current time if not provided.

priceTypestring (KlinePriceType)  Enum: "Last" "Index" "Mark"  The price type of the K-line.

Responses200 Success.

400 Bad request.

500 Internal server error.

get/api/v1/klineshttps://api.backpack.exchange/api/v1/klines Response samples 200400500Content typeapplication/json; charset=utf-8Copy Expand all  Collapse all [{"start": "string","end": "string","open": "string","high": "string","low": "string","close": "string","volume": "string","quoteVolume": "string","trades": "string"}]Get all mark prices. Retrieves mark price, index price and the funding rate for the current

interval for all symbols, or the symbol specified.

query Parameterssymbolstring Responses200 Success.

400 Bad request.

500 Internal server error.

get/api/v1/markPriceshttps://api.backpack.exchange/api/v1/markPrices Response samples 200400500Content typeapplication/json; charset=utf-8Copy Expand all  Collapse all [{"fundingRate": "string","indexPrice": "string","markPrice": "string","nextFundingTimestamp": 0,"symbol": "string"}]Get open interest. Retrieves the current open interest for the given market.

If no market is provided, then all markets are returned.

query Parameterssymbolstring Responses200 Success.

400 Bad request.

500 Internal server error.

get/api/v1/openInteresthttps://api.backpack.exchange/api/v1/openInterest Response samples 200400500Content typeapplication/json; charset=utf-8Copy Expand all  Collapse all [{"symbol": "string","openInterest": "string","timestamp": 0}]Get funding interval rates. Funding interval rate history for futures.

query Parameterssymbolrequiredstring Market symbol to query

limitinteger <uint64>  Maximum number to return. Default 100, maximum 10000.

offsetinteger <uint64>  Offset for pagination. Default 0.

Responses200 Success.

400 Bad request.

500 Internal server error.

get/api/v1/fundingRateshttps://api.backpack.exchange/api/v1/fundingRates Response samples 200400500Content typeapplication/json; charset=utf-8Copy Expand all  Collapse all [{"symbol": "string","intervalEndTimestamp": "string","fundingRate": "string"}]SystemExchange system status.

Status. Get the system status, and the status message, if any.

Responses200 Success.

get/api/v1/statushttps://api.backpack.exchange/api/v1/status Response samples 200Content typeapplication/json; charset=utf-8Copy{"status": "Ok","message": "string"}Ping. Responds with pong.

Responses200 get/api/v1/pinghttps://api.backpack.exchange/api/v1/pingGet system time. Retrieves the current system time.

Responses200 get/api/v1/timehttps://api.backpack.exchange/api/v1/timeGet wallets. Returns all configured blockchain wallets and their addresses.

Responses200 Success.

get/api/v1/walletshttps://api.backpack.exchange/api/v1/wallets Response samples 200Content typeapplication/json; charset=utf-8Copy Expand all  Collapse all [{"blockchain": "string","address": "string"}]TradesPublic trade data.

Get recent trades. Retrieve the most recent trades for a symbol. This is public data and

is not specific to any account.

The maximum available recent trades is 1000. If you need more than

1000 trades use the historical trades endpoint.

query Parameterssymbolrequiredstring Market symbol to query fills for.

limitinteger <uint16>  Limit the number of fills returned. Default 100, maximum 1000.

Responses200 Success.

400 Bad request.

500 Internal Server Error.

get/api/v1/tradeshttps://api.backpack.exchange/api/v1/trades Response samples 200400500Content typeapplication/json; charset=utf-8Copy Expand all  Collapse all [{"id": 0,"price": "string","quantity": "string","quoteQuantity": "string","timestamp": 0,"isBuyerMaker": true}]Get historical trades. Retrieves all historical trades for the given symbol. This is public

trade data and is not specific to any account.

query Parameterssymbolrequiredstring limitinteger <uint64>  Limit the number of trades returned. Default 100, maximum 1000.

offsetinteger <uint64>  Offset. Default 0.

Responses200 Success.

400 Bad request.

500 Internal Server Error.

get/api/v1/trades/historyhttps://api.backpack.exchange/api/v1/trades/history Response samples 200400500Content typeapplication/json; charset=utf-8Copy Expand all  Collapse all [{"id": 0,"price": "string","quantity": "string","quoteQuantity": "string","timestamp": 0,"isBuyerMaker": true}]AccountAccount settings and limits.

Get account. Instruction: accountQuery

## header ParametersX-API-KEYrequiredstring API key

X-SIGNATURErequiredstring Signature of the request

X-TIMESTAMPrequiredinteger <int64>  Timestamp of the request in milliseconds

X-WINDOWinteger <uint64>  Time the request is valid for in milliseconds (default 5000, maximum 60000)

Responses200 Success.

400 Bad request.

500 Internal server error.

get/api/v1/accounthttps://api.backpack.exchange/api/v1/account Response samples 200400500Content typeapplication/json; charset=utf-8Copy{"autoBorrowSettlements": true,"autoLend": true,"autoRealizePnl": true,"autoRepayBorrows": true,"borrowLimit": "string","futuresMakerFee": "string","futuresTakerFee": "string","leverageLimit": "string","limitOrders": 0,"liquidating": true,"positionLimit": "string","spotMakerFee": "string","spotTakerFee": "string","triggerOrders": 0}Update account. Update account settings.

## Instruction: accountUpdate

## header ParametersX-API-KEYrequiredstring API key

X-SIGNATURErequiredstring Signature of the request

X-TIMESTAMPrequiredinteger <int64>  Timestamp of the request in milliseconds

X-WINDOWinteger <uint64>  Time the request is valid for in milliseconds (default 5000, maximum 60000)

Request Body schema: application/json; charset=utf-8requiredautoBorrowSettlementsboolean If true, then tries to borrow during collateral reconciliation.

Collateral reconciliation is a process in which the system reconciles

the negative account debt or positive account equity.

autoLendboolean Determines if the account should automatically lend.

autoRepayBorrowsboolean Determines if the account should automatically repay borrows with

available balance.

leverageLimitstring <decimal>  Determines the maximum leverage allowed for the main account or

subaccount.

Responses200 Success.

400 Bad request.

401 Unauthorized.

500 Internal server error.

503 System under maintenance.

patch/api/v1/accounthttps://api.backpack.exchange/api/v1/account Request samples PayloadContent typeapplication/json; charset=utf-8Copy{"autoBorrowSettlements": true,"autoLend": true,"autoRepayBorrows": true,"leverageLimit": "string"} Response samples 400401500503Content typeapplication/json; charset=utf-8Copy{"code": "ACCOUNT_LIQUIDATING","message": "string"}Convert a dust balance on an account. Converts a dust balance to USDC. The balance (including lend) must be

less than the minimum quantity tradable on the spot order book.

## Instruction: convertDust

## header ParametersX-API-KEYrequiredstring API key

X-SIGNATURErequiredstring Signature of the request

X-TIMESTAMPrequiredinteger <int64>  Timestamp of the request in milliseconds

X-WINDOWinteger <uint64>  Time the request is valid for in milliseconds (default 5000, maximum 60000)

Request Body schema: application/json; charset=utf-8requiredsymbolstring Enum: "BTC" "ETH" "SOL" "USDC" "USDT" "PYTH" "JTO" "BONK" "HNT" "MOBILE" "WIF" "JUP" "RENDER" "WEN" "W" "TNSR" "PRCL" "SHARK" "KMNO" "MEW" "BOME" "RAY" "HONEY" "SHFL" "BODEN" "IO" "DRIFT" "PEPE" "SHIB" "LINK" "UNI" "ONDO" "FTM" "MATIC" "STRK" "BLUR" "WLD" "GALA" "NYAN" "HLG" "MON" "ZKJ" "MANEKI" "HABIBI" "UNA" "ZRO" "ZEX" "AAVE" "LDO" "MOTHER" "CLOUD" "MAX" "POL" "TRUMPWIN" "HARRISWIN" "MOODENG" "DBR" "GOAT" "ACT" "DOGE" "BCH" "LTC" "APE" "ENA" "ME" "EIGEN" "CHILLGUY" "PENGU" "EUR" "SONIC" "J" "TRUMP" "MELANIA" "ANIME" "XRP" "SUI" "VINE" "ADA" "MOVE" "BERA" "IP" "HYPE" "BNB" "KAITO" "kPEPE" "kBONK" "kSHIB" "AVAX" "S" "POINTS" "ROAM" "AI16Z" "LAYER" "FARTCOIN" "NEAR" "PNUT" "ARB" "DOT" "APT" "OP" "PYUSD" "HUMA" "WAL" "DEEP" "CETUS" "SEND" "BLUE" "NS" "HAEDAL" "JPY" "TAO" "VIRTUAL" "TIA" "TRX" "FRAG" "PUMP" "WCT" "ES" "SEI" "CRV" "TON" "HBAR" "XLM" "ZORA" "WLFI" "BPEUR" "SWTCH" "LINEA" "XPL" "BARD" "FLOCK" "AVNT" "PENDLE" "AERO"  The asset symbol to convert dust for.

If omitted, all dust balances will be converted.

Responses200 Success.

400 Bad request.

500 Internal server error.

503 System under maintenance.

post/api/v1/account/convertDusthttps://api.backpack.exchange/api/v1/account/convertDust Request samples PayloadContent typeapplication/json; charset=utf-8Copy{"symbol": "BTC"} Response samples 400500503Content typeapplication/json; charset=utf-8Copy{"code": "ACCOUNT_LIQUIDATING","message": "string"}Get max borrow quantity. Retrieves the maxmimum quantity an account can borrow

for a given asset based on the accounts existing exposure

## and margin requirements

## Instruction: maxBorrowQuantity

query Parameterssymbolrequiredstring The asset to borrow.

## header ParametersX-API-KEYstring API key

## X-SIGNATUREstring Signature of the request

X-TIMESTAMPinteger <int64>  Timestamp of the request in milliseconds

X-WINDOWinteger <uint64>  Time the request is valid for in milliseconds (default 5000, maximum 60000)

Responses200 Success.

400 Bad request.

500 Internal server error.

503 Service unavailable.

get/api/v1/account/limits/borrowhttps://api.backpack.exchange/api/v1/account/limits/borrow Response samples 200400500503Content typeapplication/json; charset=utf-8Copy{"maxBorrowQuantity": "string","symbol": "string"}Get max order quantity. Retrieves the maxmimum quantity an account can trade

for a given symbol based on the account's balances, existing exposure

and margin requirements.

## Instruction: maxOrderQuantity

query Parameterssymbolrequiredstring The market symbol to trade.

siderequiredstring (Side)  Enum: "Bid" "Ask"  The side of the order.

pricestring <decimal>  The limit price of the order. Not included for market orders.

reduceOnlyboolean Whether the order is reduce only.

autoBorrowboolean Whether the order uses auto borrow.

autoBorrowRepayboolean Whether the order uses auto borrow repay.

autoLendRedeemboolean Whether the order uses auto lend redeem.

## header ParametersX-API-KEYstring API key

## X-SIGNATUREstring Signature of the request

X-TIMESTAMPinteger <int64>  Timestamp of the request in milliseconds

X-WINDOWinteger <uint64>  Time the request is valid for in milliseconds (default 5000, maximum 60000)

Responses200 Success.

400 Bad request.

500 Internal server error.

get/api/v1/account/limits/orderhttps://api.backpack.exchange/api/v1/account/limits/order Response samples 200400500Content typeapplication/json; charset=utf-8Copy{"autoBorrow": true,"autoBorrowRepay": true,"autoLendRedeem": true,"maxOrderQuantity": "string","price": "string","side": "string","symbol": "string","reduceOnly": true}Get max withdrawal quantity. Retrieves the maxmimum quantity an account can withdraw

for a given asset based on the accounts existing exposure

## and margin requirements

The response will include the maximum quantity that can be withdrawn

and whether the withdrawal is with auto borrow or auto lend redeem

enabled.

## Instruction: maxWithdrawalQuantity

query Parameterssymbolrequiredstring The asset to withdraw.

autoBorrowboolean Whether the withdrawal is with auto borrow.

autoLendRedeemboolean Whether the withdrawal is with auto lend redeem.

## header ParametersX-API-KEYstring API key

## X-SIGNATUREstring Signature of the request

X-TIMESTAMPinteger <int64>  Timestamp of the request in milliseconds

X-WINDOWinteger <uint64>  Time the request is valid for in milliseconds (default 5000, maximum 60000)

Responses200 Success.

400 Bad request.

500 Internal server error.

get/api/v1/account/limits/withdrawalhttps://api.backpack.exchange/api/v1/account/limits/withdrawal Response samples 200400500Content typeapplication/json; charset=utf-8Copy{"autoBorrow": true,"autoLendRedeem": true,"maxWithdrawalQuantity": "string","symbol": "string"}Borrow LendBorrowing and lending.

Get borrow lend positions. Retrieves all the open borrow lending positions for the account.

## Instruction: borrowLendPositionQuery

## header ParametersX-API-KEYstring API key

## X-SIGNATUREstring Signature of the request

X-TIMESTAMPinteger <int64>  Timestamp of the request in milliseconds

X-WINDOWinteger <uint64>  Time the request is valid for in milliseconds (default 5000, maximum 60000)

Responses200 Success.

400 Bad request.

500 Internal server error.

get/api/v1/borrowLend/positionshttps://api.backpack.exchange/api/v1/borrowLend/positions Response samples 200400500Content typeapplication/json; charset=utf-8Copy Expand all  Collapse all [{"cumulativeInterest": "string","id": "string","imf": "string","imfFunction": {"type": "sqrt","base": "string","factor": "string"},"netQuantity": "string","markPrice": "string","mmf": "string","mmfFunction": {"type": "sqrt","base": "string","factor": "string"},"netExposureQuantity": "string","netExposureNotional": "string","symbol": "BTC"}]Execute borrow lend. Instruction: borrowLendExecute

## header ParametersX-API-KEYrequiredstring API key

X-SIGNATURErequiredstring Signature of the request

X-TIMESTAMPrequiredinteger <int64>  Timestamp of the request in milliseconds

X-WINDOWinteger <uint64>  Time the request is valid for in milliseconds (default 5000, maximum 60000)

Request Body schema: application/json; charset=utf-8requiredquantityrequiredstring <decimal>  The quantity of the asset to repay.

siderequiredstring Enum: "Borrow" "Lend"  Side of the borrow lend.

symbolrequiredstring Enum: "BTC" "ETH" "SOL" "USDC" "USDT" "PYTH" "JTO" "BONK" "HNT" "MOBILE" "WIF" "JUP" "RENDER" "WEN" "W" "TNSR" "PRCL" "SHARK" "KMNO" "MEW" "BOME" "RAY" "HONEY" "SHFL" "BODEN" "IO" "DRIFT" "PEPE" "SHIB" "LINK" "UNI" "ONDO" "FTM" "MATIC" "STRK" "BLUR" "WLD" "GALA" "NYAN" "HLG" "MON" "ZKJ" "MANEKI" "HABIBI" "UNA" "ZRO" "ZEX" "AAVE" "LDO" "MOTHER" "CLOUD" "MAX" "POL" "TRUMPWIN" "HARRISWIN" "MOODENG" "DBR" "GOAT" "ACT" "DOGE" "BCH" "LTC" "APE" "ENA" "ME" "EIGEN" "CHILLGUY" "PENGU" "EUR" "SONIC" "J" "TRUMP" "MELANIA" "ANIME" "XRP" "SUI" "VINE" "ADA" "MOVE" "BERA" "IP" "HYPE" "BNB" "KAITO" "kPEPE" "kBONK" "kSHIB" "AVAX" "S" "POINTS" "ROAM" "AI16Z" "LAYER" "FARTCOIN" "NEAR" "PNUT" "ARB" "DOT" "APT" "OP" "PYUSD" "HUMA" "WAL" "DEEP" "CETUS" "SEND" "BLUE" "NS" "HAEDAL" "JPY" "TAO" "VIRTUAL" "TIA" "TRX" "FRAG" "PUMP" "WCT" "ES" "SEI" "CRV" "TON" "HBAR" "XLM" "ZORA" "WLFI" "BPEUR" "SWTCH" "LINEA" "XPL" "BARD" "FLOCK" "AVNT" "PENDLE" "AERO"  The asset to repay.

Responses200 Success.

400 Bad request.

500 Internal server error.

503 System under maintenance.

post/api/v1/borrowLendhttps://api.backpack.exchange/api/v1/borrowLend Request samples PayloadContent typeapplication/json; charset=utf-8Copy{"quantity": "string","side": "Borrow","symbol": "BTC"} Response samples 400500503Content typeapplication/json; charset=utf-8Copy{"code": "ACCOUNT_LIQUIDATING","message": "string"}Get an estimated liquidation price for potential borrow lend position. Retrieves the estimated liquidation price for a potential borrow lend

position.

query ParameterssubaccountIdinteger <uint16>  Optional subaccount.

borrowrequiredstring Standard base64 encoded json of [BorrowLendExecutePayload]

Responses200 Success.

400 Bad request.

401 Unauthorized.

500 Internal server error.

get/api/v1/borrowLend/position/liquidationPricehttps://api.backpack.exchange/api/v1/borrowLend/position/liquidationPrice Response samples 200400401500Content typeapplication/json; charset=utf-8Copy{"liquidationPrice": "string","markPrice": "string"}CapitalCapital management.

Get balances. Retrieves account balances and the state of the balances (locked or

available).

Locked assets are those that are currently in an open order.

## Instruction: balanceQuery

## header ParametersX-API-KEYstring API key

## X-SIGNATUREstring Signature of the request

X-TIMESTAMPinteger <int64>  Timestamp of the request in milliseconds

X-WINDOWinteger <uint64>  Time the request is valid for in milliseconds (default 5000, maximum 60000)

Responses200 Success.

400 Bad request.

500 Internal server error.

get/api/v1/capitalhttps://api.backpack.exchange/api/v1/capital Response samples 200400500Content typeapplication/json; charset=utf-8Copy Expand all  Collapse all {"property1": {"available": "string","locked": "string","staked": "string"},"property2": {"available": "string","locked": "string","staked": "string"}}Get collateral. Retrieves collateral information for an account.

## Instruction: collateralQuery

query ParameterssubaccountIdinteger <uint16>  header ParametersX-API-KEYstring API key

## X-SIGNATUREstring Signature of the request

X-TIMESTAMPinteger <int64>  Timestamp of the request in milliseconds

X-WINDOWinteger <uint64>  Time the request is valid for in milliseconds (default 5000, maximum 60000)

Responses200 Success.

400 Bad request.

500 Internal server error.

get/api/v1/capital/collateralhttps://api.backpack.exchange/api/v1/capital/collateral Response samples 200400500Content typeapplication/json; charset=utf-8Copy Expand all  Collapse all {"assetsValue": "string","borrowLiability": "string","collateral": [{"symbol": "string","assetMarkPrice": "string","totalQuantity": "string","balanceNotional": "string","collateralWeight": "string","collateralValue": "string","openOrderQuantity": "string","lendQuantity": "string","availableQuantity": "string"}],"imf": "string","unsettledEquity": "string","liabilitiesValue": "string","marginFraction": "string","mmf": "string","netEquity": "string","netEquityAvailable": "string","netEquityLocked": "string","netExposureFutures": "string","pnlUnrealized": "string"}Get deposits. Retrieves deposit history.

## Instruction: depositQueryAll

query Parametersfrominteger <int64>  Filter to minimum time (milliseconds).

tointeger <int64>  Filter to maximum time (milliseconds).

limitinteger <uint64>  Maximum number to return. Default 100, maximum 1000.

offsetinteger <uint64>  Offset. Default 0.

## header ParametersX-API-KEYstring API key

## X-SIGNATUREstring Signature of the request

X-TIMESTAMPinteger <int64>  Timestamp of the request in milliseconds

X-WINDOWinteger <uint64>  Time the request is valid for in milliseconds (default 5000, maximum 60000)

Responses200 Success.

400 Bad request.

401 Unauthorized.

500 Internal server error.

get/wapi/v1/capital/depositshttps://api.backpack.exchange/wapi/v1/capital/deposits Response samples 200400401500Content typeapplication/json; charset=utf-8Copy Expand all  Collapse all [{"id": 0,"toAddress": "string","fromAddress": "string","source": "administrator","status": "cancelled","transactionHash": "string","symbol": "BTC","quantity": "string","createdAt": "string","fiatAmount": 0.1,"fiatCurrency": "AED","institutionBic": "string","platformMemo": "string"}]Get deposit address. Retrieves the user specific deposit address if the user were to deposit

on the specified blockchain.

## Instruction: depositAddressQuery

query Parametersblockchainrequiredstring (Blockchain)  Enum: "Aptos" "Arbitrum" "Avalanche" "Base" "Berachain" "Bitcoin" "BitcoinCash" "Bsc" "Cardano" "Dogecoin" "Eclipse" "EqualsMoney" "Ethereum" "Hyperliquid" "Litecoin" "Optimism" "Polygon" "Sei" "Sui" "Solana" "Story" "Tron" "XRP"  Blockchain symbol to get a deposit address for.

## header ParametersX-API-KEYstring API key

## X-SIGNATUREstring Signature of the request

X-TIMESTAMPinteger <int64>  Timestamp of the request in milliseconds

X-WINDOWinteger <uint64>  Time the request is valid for in milliseconds (default 5000, maximum 60000)

Responses200 Success.

400 Bad request.

401 Unauthorized.

## 409 Conflict

500 Internal server error.

get/wapi/v1/capital/deposit/addresshttps://api.backpack.exchange/wapi/v1/capital/deposit/address Response samples 200400401409500Content typeapplication/json; charset=utf-8Copy{"address": "string"}Get withdrawals. Retrieves withdrawal history.

## Instruction: withdrawalQueryAll

query Parametersfrominteger <int64>  Filter to minimum time (milliseconds).

tointeger <int64>  Filter to maximum time (milliseconds).

limitinteger <uint64>  Maximum number to return. Default 100, maximum 1000.

offsetinteger <uint64>  Offset. Default 0.

## header ParametersX-API-KEYstring API key

## X-SIGNATUREstring Signature of the request

X-TIMESTAMPinteger <int64>  Timestamp of the request in milliseconds

X-WINDOWinteger <uint64>  Time the request is valid for in milliseconds (default 5000, maximum 60000)

Responses200 Success.

400 Bad request.

401 Unauthorized.

500 Internal Server Error.

get/wapi/v1/capital/withdrawalshttps://api.backpack.exchange/wapi/v1/capital/withdrawals Response samples 200400401500Content typeapplication/json; charset=utf-8Copy Expand all  Collapse all [{"id": 0,"blockchain": "Aptos","clientId": "string","identifier": "string","quantity": "string","fee": "string","fiatFee": "string","fiatState": "initialized","fiatSymbol": "AED","providerId": "string","symbol": "BTC","status": "confirmed","subaccountId": 0,"toAddress": "string","transactionHash": "string","createdAt": "string","isInternal": true,"bankName": "string","bankIdentifier": "string","accountIdentifier": "string","triggerAt": "string"}]Request withdrawal. Requests a withdrawal from the exchange.

The twoFactorToken field is required if the withdrawal address is not

an address that is configured in the address book to not require

2FA. These addresses can be configured here.

## Instruction: withdraw

## header ParametersX-API-KEYrequiredstring API key

X-TIMESTAMPrequiredinteger <int64>  Timestamp of the request in milliseconds

X-WINDOWinteger <uint64>  Time the request is valid for in milliseconds (default 5000, maximum 60000)

X-SIGNATURErequiredstring Signature of the request

Request Body schema: application/json; charset=utf-8requiredaddressrequiredstring Address to withdraw to.

blockchainrequiredstring Enum: "Aptos" "Arbitrum" "Avalanche" "Base" "Berachain" "Bitcoin" "BitcoinCash" "Bsc" "Cardano" "Dogecoin" "Eclipse" "EqualsMoney" "Ethereum" "Hyperliquid" "Litecoin" "Optimism" "Polygon" "Sei" "Sui" "Solana" "Story" "Tron" "XRP"  Blockchain to withdraw on.

clientIdstring  <= 255 characters  Custom client id.

quantityrequiredstring <decimal>  Quantity to withdraw.

symbolrequiredstring Enum: "BTC" "ETH" "SOL" "USDC" "USDT" "PYTH" "JTO" "BONK" "HNT" "MOBILE" "WIF" "JUP" "RENDER" "WEN" "W" "TNSR" "PRCL" "SHARK" "KMNO" "MEW" "BOME" "RAY" "HONEY" "SHFL" "BODEN" "IO" "DRIFT" "PEPE" "SHIB" "LINK" "UNI" "ONDO" "FTM" "MATIC" "STRK" "BLUR" "WLD" "GALA" "NYAN" "HLG" "MON" "ZKJ" "MANEKI" "HABIBI" "UNA" "ZRO" "ZEX" "AAVE" "LDO" "MOTHER" "CLOUD" "MAX" "POL" "TRUMPWIN" "HARRISWIN" "MOODENG" "DBR" "GOAT" "ACT" "DOGE" "BCH" "LTC" "APE" "ENA" "ME" "EIGEN" "CHILLGUY" "PENGU" "EUR" "SONIC" "J" "TRUMP" "MELANIA" "ANIME" "XRP" "SUI" "VINE" "ADA" "MOVE" "BERA" "IP" "HYPE" "BNB" "KAITO" "kPEPE" "kBONK" "kSHIB" "AVAX" "S" "POINTS" "ROAM" "AI16Z" "LAYER" "FARTCOIN" "NEAR" "PNUT" "ARB" "DOT" "APT" "OP" "PYUSD" "HUMA" "WAL" "DEEP" "CETUS" "SEND" "BLUE" "NS" "HAEDAL" "JPY" "TAO" "VIRTUAL" "TIA" "TRX" "FRAG" "PUMP" "WCT" "ES" "SEI" "CRV" "TON" "HBAR" "XLM" "ZORA" "WLFI" "BPEUR" "SWTCH" "LINEA" "XPL" "BARD" "FLOCK" "AVNT" "PENDLE" "AERO"  Symbol of the asset to withdraw.

twoFactorTokenstring Issued two factor token.

autoBorrowboolean Auto borrow to withdraw if required.

autoLendRedeemboolean Auto redeem a lend if required.

Responses200 Success.

400 Bad request.

401 Unauthorized.

403 Forbidden.

429 Too many requests.

500 Internal server error.

503 System under maintenance.

post/wapi/v1/capital/withdrawalshttps://api.backpack.exchange/wapi/v1/capital/withdrawals Request samples PayloadContent typeapplication/json; charset=utf-8Copy{"address": "string","blockchain": "Aptos","clientId": "string","quantity": "string","symbol": "BTC","twoFactorToken": "string","autoBorrow": true,"autoLendRedeem": true} Response samples 200400401403429500503Content typeapplication/json; charset=utf-8Copy{"id": 0,"blockchain": "Aptos","clientId": "string","identifier": "string","quantity": "string","fee": "string","fiatFee": "string","fiatState": "initialized","fiatSymbol": "AED","providerId": "string","symbol": "BTC","status": "confirmed","subaccountId": 0,"toAddress": "string","transactionHash": "string","createdAt": "string","isInternal": true,"bankName": "string","bankIdentifier": "string","accountIdentifier": "string","triggerAt": "string"}FuturesFutures data.

Get open positions. Retrieves account position summary.

## Instruction: positionQuery

query Parameterssymbolstring Filter for a single position by symbol.

## header ParametersX-API-KEYstring API key

## X-SIGNATUREstring Signature of the request

X-TIMESTAMPinteger <int64>  Timestamp of the request in milliseconds

X-WINDOWinteger <uint64>  Time the request is valid for in milliseconds (default 5000, maximum 60000)

Responses200 Success.

400 Bad request.

401 Unauthorized.

404 Position not found.

500 Internal server error.

get/api/v1/positionhttps://api.backpack.exchange/api/v1/position Response samples 200400401404500Content typeapplication/json; charset=utf-8Copy Expand all  Collapse all [{"breakEvenPrice": "string","entryPrice": "string","estLiquidationPrice": "string","imf": "string","imfFunction": {"type": "sqrt","base": "string","factor": "string"},"markPrice": "string","mmf": "string","mmfFunction": {"type": "sqrt","base": "string","factor": "string"},"netCost": "string","netQuantity": "string","netExposureQuantity": "string","netExposureNotional": "string","pnlRealized": "string","pnlUnrealized": "string","cumulativeFundingPayment": "string","subaccountId": 0,"symbol": "string","userId": 0,"positionId": "string","cumulativeInterest": "string"}]HistoryHistorical account data.

Get borrow history. History of borrow and lend operations for the account.

## Instruction: borrowHistoryQueryAll

query Parameterstypestring (BorrowLendEventType)  Enum: "Borrow" "BorrowRepay" "Lend" "LendRedeem"  Filter to history for either borrows or lends.

sourcesstring Filter to return history for a particular source. Can be a single

source, or multiple sources separated by commas.

positionIdstring Filter to return history for a borrow lend position.

symbolstring Filter to the given symbol.

limitinteger <uint64>  Maximum number to return. Default 100, maximum 1000.

offsetinteger <uint64>  Offset for pagination. Default 0.

sortDirectionstring (SortDirection)  Enum: "Asc" "Desc"  Sort direction.

## header ParametersX-API-KEYstring API key

## X-SIGNATUREstring Signature of the request

X-TIMESTAMPinteger <int64>  Timestamp of the request in milliseconds

X-WINDOWinteger <uint64>  Time the request is valid for in milliseconds (default 5000, maximum 60000)

Responses200 Success.

400 Bad request.

401 Unauthorized.

500 Internal server error.

get/wapi/v1/history/borrowLendhttps://api.backpack.exchange/wapi/v1/history/borrowLend Response samples 200400401500Content typeapplication/json; charset=utf-8Copy Expand all  Collapse all [{"eventType": "Borrow","positionId": "string","positionQuantity": "string","quantity": "string","source": "AdlProvider","symbol": "string","timestamp": "string","spotMarginOrderId": "string"}]Get interest history. History of the interest payments for borrows and lends for the account.

## Instruction: interestHistoryQueryAll

query Parametersassetstring Asset to query. If not set, all assets are returned.

symbolstring Market symbol to query. If not set, all markets are returned. If a

futures symbol is supplied, then interest payments on unrealized pnl

will be returned. Spot market symbols refer to interest payments on

regular borrow lend positions.

positionIdstring Filter to return history for a borrow lend position.

limitinteger <uint64>  Maximum number to return. Default 100, maximum 1000.

offsetinteger <uint64>  Offset for pagination. Default 0.

sourcestring (InterestPaymentSource)  Enum: "UnrealizedPnl" "BorrowLend"  Filter to return interest payments of a particular source. Borrow

interest payments through two mechanisms: borrow lend

positions; interest paid on unrealized pnl.

sortDirectionstring (SortDirection)  Enum: "Asc" "Desc"  Sort direction.

## header ParametersX-API-KEYstring API key

## X-SIGNATUREstring Signature of the request

X-TIMESTAMPinteger <int64>  Timestamp of the request in milliseconds

X-WINDOWinteger <uint64>  Time the request is valid for in milliseconds (default 5000, maximum 60000)

Responses200 Success.

400 Bad request.

401 Unauthorized.

500 Internal server error.

get/wapi/v1/history/interesthttps://api.backpack.exchange/wapi/v1/history/interest Response samples 200400401500Content typeapplication/json; charset=utf-8Copy Expand all  Collapse all [{"paymentType": "EntryFee","interestRate": "string","interval": 0,"marketSymbol": "string","positionId": "string","quantity": "string","symbol": "BTC","timestamp": "string"}]Get borrow position history. History of borrow and lend positions for the account.

## Instruction: borrowPositionHistoryQueryAll

query Parameterssymbolstring Filter to the given symbol.

sidestring (BorrowLendSide)  Enum: "Borrow" "Lend"  Return only borrows or only lends.

statestring (BorrowLendPositionState)  Enum: "Open" "Closed"  Return only open positions or closed positions.

limitinteger <uint64>  Maximum number to return. Default 100, maximum 1000.

offsetinteger <uint64>  Offset for pagination. Default 0.

sortDirectionstring (SortDirection)  Enum: "Asc" "Desc"  Sort direction.

## header ParametersX-API-KEYstring API key

## X-SIGNATUREstring Signature of the request

X-TIMESTAMPinteger <int64>  Timestamp of the request in milliseconds

X-WINDOWinteger <uint64>  Time the request is valid for in milliseconds (default 5000, maximum 60000)

Responses200 Success.

400 Bad request.

401 Unauthorized.

500 Internal server error.

get/wapi/v1/history/borrowLend/positionshttps://api.backpack.exchange/wapi/v1/history/borrowLend/positions Response samples 200400401500Content typeapplication/json; charset=utf-8Copy Expand all  Collapse all [{"positionId": "string","quantity": "string","symbol": "string","source": "AdlProvider","cumulativeInterest": "string","avgInterestRate": "string","side": "Borrow","createdAt": "string"}]Get dust conversion history. Retrieves the dust conversion history for the user.

## Instruction: dustHistoryQueryAll

query Parametersidinteger <int64>  Filter to a given dust conversion id.

symbolstring Filter to the given symbol.

limitinteger <uint64>  Maximum number to return. Default 100, maximum 1000.

offsetinteger <uint64>  Offset. Default 0.

sortDirectionstring (SortDirection)  Enum: "Asc" "Desc"  Sort direction.

## header ParametersX-API-KEYstring API key

## X-SIGNATUREstring Signature of the request

X-TIMESTAMPinteger <int64>  Timestamp of the request in milliseconds

X-WINDOWinteger <uint64>  Time the request is valid for in milliseconds (default 5000, maximum 60000)

Responses200 Success.

400 Bad request.

401 Unauthorized.

500 Internal server error.

get/wapi/v1/history/dusthttps://api.backpack.exchange/wapi/v1/history/dust Response samples 200400401500Content typeapplication/json; charset=utf-8Copy Expand all  Collapse all [{"id": 0,"quantity": "string","symbol": "string","usdcReceived": "string","timestamp": "string"}]Get fill history. Retrieves historical fills, with optional filtering for a specific order

or symbol.

## Instruction: fillHistoryQueryAll

query ParametersorderIdstring Filter to the given order.

strategyIdstring Filter to the given strategy.

frominteger <int64>  Filter to minimum time (milliseconds).

tointeger <int64>  Filter to maximum time (milliseconds).

symbolstring Filter to the given symbol.

limitinteger <uint64>  Maximum number to return. Default 100, maximum 1000.

offsetinteger <uint64>  Offset. Default 0.

fillTypestring (FillType)  Enum: "User" "BookLiquidation" "Adl" "Backstop" "Liquidation" "AllLiquidation" "CollateralConversion" "CollateralConversionAndSpotLiquidation"  Filter to return fills for different fill types

marketTypeArray of strings (MarketType) Items Enum: "SPOT" "PERP" "IPERP" "DATED" "PREDICTION" "RFQ"  Market type.

sortDirectionstring (SortDirection)  Enum: "Asc" "Desc"  Sort direction.

## header ParametersX-API-KEYstring API key

## X-SIGNATUREstring Signature of the request

X-TIMESTAMPinteger <int64>  Timestamp of the request in milliseconds

X-WINDOWinteger <uint64>  Time the request is valid for in milliseconds (default 5000, maximum 60000)

Responses200 Success.

400 Bad request.

401 Unauthorized.

500 Internal server error.

get/wapi/v1/history/fillshttps://api.backpack.exchange/wapi/v1/history/fills Response samples 200400401500Content typeapplication/json; charset=utf-8Copy Expand all  Collapse all [{"clientId": "string","fee": "string","feeSymbol": "string","isMaker": true,"orderId": "string","price": "string","quantity": "string","side": "Bid","symbol": "string","systemOrderType": "CollateralConversion","timestamp": "string","tradeId": 0}]Get funding payments. Users funding payment history for futures.

## Instruction: fundingHistoryQueryAll

query ParameterssubaccountIdinteger <uint16>  Filter for a subaccount.

symbolstring Market symbol to query. If not set, all markets are returned.

limitinteger <uint64>  Maximum number to return. Default 100, maximum 1000.

offsetinteger <uint64>  Offset for pagination. Default 0.

sortDirectionstring (SortDirection)  Enum: "Asc" "Desc"  Sort direction.

## header ParametersX-API-KEYstring API key

## X-SIGNATUREstring Signature of the request

X-TIMESTAMPinteger <int64>  Timestamp of the request in milliseconds

X-WINDOWinteger <uint64>  Time the request is valid for in milliseconds (default 5000, maximum 60000)

Responses200 Success.

400 Bad request.

401 Unauthorized.

500 Internal server error.

get/wapi/v1/history/fundinghttps://api.backpack.exchange/wapi/v1/history/funding Response samples 200400401500Content typeapplication/json; charset=utf-8Copy Expand all  Collapse all [{"userId": 0,"subaccountId": 0,"symbol": "string","quantity": "string","intervalEndTimestamp": "string","fundingRate": "string"}]Get order history. Retrieves the order history for the user. This includes orders that have

been filled and are no longer on the book. It may include orders

that are on the book, but the /orders endpoint contains more up to

date data.

## Instruction: orderHistoryQueryAll

query ParametersorderIdstring Filter to the given order.

strategyIdstring Filter to the given strategy.

symbolstring Filter to the given symbol.

limitinteger <uint64>  Maximum number to return. Default 100, maximum 1000.

offsetinteger <uint64>  Offset. Default 0.

marketTypeArray of strings (MarketType) Items Enum: "SPOT" "PERP" "IPERP" "DATED" "PREDICTION" "RFQ"  Market type.

sortDirectionstring (SortDirection)  Enum: "Asc" "Desc"  Sort direction.

## header ParametersX-API-KEYstring API key

## X-SIGNATUREstring Signature of the request

X-TIMESTAMPinteger <int64>  Timestamp of the request in milliseconds

X-WINDOWinteger <uint64>  Time the request is valid for in milliseconds (default 5000, maximum 60000)

Responses200 Success.

400 Bad request.

401 Unauthorized.

500 Internal server error.

get/wapi/v1/history/ordershttps://api.backpack.exchange/wapi/v1/history/orders Response samples 200400401500Content typeapplication/json; charset=utf-8Copy Expand all  Collapse all [{"id": "string","createdAt": "string","executedQuantity": "string","executedQuoteQuantity": "string","expiryReason": "AccountTradingSuspended","orderType": "Market","postOnly": true,"price": "string","quantity": "string","quoteQuantity": "string","selfTradePrevention": "RejectTaker","status": "Cancelled","side": "Bid","stopLossTriggerPrice": "string","stopLossLimitPrice": "string","stopLossTriggerBy": "string","symbol": "string","takeProfitTriggerPrice": "string","takeProfitLimitPrice": "string","takeProfitTriggerBy": "string","timeInForce": "GTC","triggerBy": "string","triggerPrice": "string","triggerQuantity": "string","clientId": 0,"systemOrderType": "CollateralConversion","strategyId": "string","slippageTolerance": "string","slippageToleranceType": "TickSize"}]Get rfq history. Retrieves the rfq history for the user. This includes RFQs that have

been filled or expired.

## Instruction: rfqHistoryQueryAll

query ParametersrfqIdstring Filter to the given rfq.

symbolstring Filter to the given symbol.

statusstring (OrderStatus)  Enum: "Cancelled" "Expired" "Filled" "New" "PartiallyFilled" "TriggerPending" "TriggerFailed"  Filter to the given status.

sidestring (Side)  Enum: "Bid" "Ask"  Filter to the given side.

limitinteger <uint64>  Maximum number to return. Default 100, maximum 1000.

offsetinteger <uint64>  Offset. Default 0.

sortDirectionstring (SortDirection)  Enum: "Asc" "Desc"  Sort direction.

## header ParametersX-API-KEYstring API key

## X-SIGNATUREstring Signature of the request

X-TIMESTAMPinteger <int64>  Timestamp of the request in milliseconds

X-WINDOWinteger <uint64>  Time the request is valid for in milliseconds (default 5000, maximum 60000)

Responses200 Success.

400 Bad request.

401 Unauthorized.

500 Internal server error.

get/wapi/v1/history/rfqhttps://api.backpack.exchange/wapi/v1/history/rfq Response samples 200400401500Content typeapplication/json; charset=utf-8Copy Expand all  Collapse all [{"userId": 0,"subaccountId": 0,"rfqId": "string","clientId": 0,"symbol": "string","side": "Bid","price": "string","quantity": "string","quoteQuantity": "string","submissionTime": "string","expiryTime": "string","status": "Cancelled","executionMode": "AwaitAccept","createdAt": "string"}]Get quote history. Retrieves the quote history for the user. This includes quotes that have

been filled or expired.

## Instruction: quoteHistoryQueryAll

query ParametersquoteIdstring Filter to the given quote.

symbolstring Filter to the given symbol.

statusstring (OrderStatus)  Enum: "Cancelled" "Expired" "Filled" "New" "PartiallyFilled" "TriggerPending" "TriggerFailed"  Filter to the given status.

limitinteger <uint64>  Maximum number to return. Default 100, maximum 1000.

offsetinteger <uint64>  Offset. Default 0.

sortDirectionstring (SortDirection)  Enum: "Asc" "Desc"  Sort direction.

## header ParametersX-API-KEYstring API key

## X-SIGNATUREstring Signature of the request

X-TIMESTAMPinteger <int64>  Timestamp of the request in milliseconds

X-WINDOWinteger <uint64>  Time the request is valid for in milliseconds (default 5000, maximum 60000)

Responses200 Success.

400 Bad request.

401 Unauthorized.

500 Internal server error.

get/wapi/v1/history/quotehttps://api.backpack.exchange/wapi/v1/history/quote Response samples 200400401500Content typeapplication/json; charset=utf-8Copy Expand all  Collapse all [{"userId": 0,"subaccountId": 0,"rfqId": "string","quoteId": "string","clientId": 0,"bidPrice": "string","askPrice": "string","status": "Cancelled","createdAt": "string"}]Get settlement history. History of settlement operations for the account.

## Instruction: settlementHistoryQueryAll

query Parameterslimitinteger <uint64>  Maximum number to return. Default 100, maximum 1000.

offsetinteger <uint64>  Offset for pagination. Default 0.

sourcestring (SettlementSourceFilter)  Enum: "BackstopLiquidation" "CulledBorrowInterest" "CulledRealizePnl" "CulledRealizePnlBookUtilization" "FundingPayment" "RealizePnl" "TradingFees" "TradingFeesSystem"  sortDirectionstring (SortDirection)  Enum: "Asc" "Desc"  Sort direction.

## header ParametersX-API-KEYstring API key

## X-SIGNATUREstring Signature of the request

X-TIMESTAMPinteger <int64>  Timestamp of the request in milliseconds

X-WINDOWinteger <uint64>  Time the request is valid for in milliseconds (default 5000, maximum 60000)

Responses200 Success.

400 Bad request.

401 Unauthorized.

500 Internal server error.

get/wapi/v1/history/settlementhttps://api.backpack.exchange/wapi/v1/history/settlement Response samples 200400401500Content typeapplication/json; charset=utf-8Copy Expand all  Collapse all [{"quantity": "string","source": "TradingFees","subaccountId": 0,"timestamp": "string","userId": 0}]Get strategy history. Retrieves the strategy history for the user. This returns strategies

that are no longer active as they have either been

completed, cancelled by the user or cancelled by the system.

## Instruction: strategyHistoryQueryAll

query ParametersstrategyIdstring Filter to the given strategy.

symbolstring Filter to the given symbol.

limitinteger <uint64>  Maximum number to return. Default 100, maximum 1000.

offsetinteger <uint64>  Offset. Default 0.

marketTypeArray of strings (MarketType) Items Enum: "SPOT" "PERP" "IPERP" "DATED" "PREDICTION" "RFQ"  Market type.

sortDirectionstring (SortDirection)  Enum: "Asc" "Desc"  Sort direction.

## header ParametersX-API-KEYstring API key

## X-SIGNATUREstring Signature of the request

X-TIMESTAMPinteger <int64>  Timestamp of the request in milliseconds

X-WINDOWinteger <uint64>  Time the request is valid for in milliseconds (default 5000, maximum 60000)

Responses200 Success.

400 Bad request.

401 Unauthorized.

500 Internal server error.

get/wapi/v1/history/strategieshttps://api.backpack.exchange/wapi/v1/history/strategies Response samples 200400401500Content typeapplication/json; charset=utf-8Copy Expand all  Collapse all [{"id": "string","createdAt": "string","executedQuantity": "string","executedQuoteQuantity": "string","cancelReason": "Expired","strategyType": "Scheduled","quantity": "string","selfTradePrevention": "RejectTaker","status": "Running","side": "Bid","symbol": "string","timeInForce": "GTC","clientStrategyId": 0,"duration": 0,"interval": 0,"randomizedIntervalQuantity": true,"slippageTolerance": "string","slippageToleranceType": "TickSize"}]OrderOrder management.

Get open order. Retrieves an open order from the order book. This only returns the order

if it is resting on the order book (i.e. has not been completely filled,

expired, or cancelled).

One of orderId or clientId must be specified. If both are specified

then the request will be rejected.

## Instruction: orderQuery

query ParametersclientIdinteger <uint32>  Client ID of the order.

orderIdstring ID of the order.

symbolrequiredstring Market symbol for the order.

## header ParametersX-API-KEYstring API key

## X-SIGNATUREstring Signature of the request

X-TIMESTAMPinteger <int64>  Timestamp of the request in milliseconds

X-WINDOWinteger <uint64>  Time the request is valid for in milliseconds (default 5000, maximum 60000)

Responses200 Success.

400 Bad request.

404 Order not found.

## 500 Internal server error

get/api/v1/orderhttps://api.backpack.exchange/api/v1/order Response samples 200400404500Content typeapplication/json; charset=utf-8ExampleMarketLimitBatchCommandOrderResult_OrderTypeMarketCopy{"orderType": "Market","id": "string","clientId": 0,"createdAt": 0,"executedQuantity": "string","executedQuoteQuantity": "string","quantity": "string","quoteQuantity": "string","reduceOnly": true,"timeInForce": "GTC","selfTradePrevention": "RejectTaker","side": "Bid","status": "Cancelled","stopLossTriggerPrice": "string","stopLossLimitPrice": "string","stopLossTriggerBy": "string","symbol": "string","takeProfitTriggerPrice": "string","takeProfitLimitPrice": "string","takeProfitTriggerBy": "string","triggerBy": "string","triggerPrice": "string","triggerQuantity": "string","triggeredAt": 0,"relatedOrderId": "string","strategyId": "string","slippageTolerance": "string","slippageToleranceType": "TickSize"}Execute order. Submits an order to the matching engine for execution.

## Instruction: orderExecute

## header ParametersX-API-KEYrequiredstring API key

X-SIGNATURErequiredstring Signature of the request

X-TIMESTAMPrequiredinteger <int64>  Timestamp of the request in milliseconds

X-WINDOWinteger <uint64>  Time the request is valid for in milliseconds (default 5000, maximum 60000)

X-BROKER-IDinteger <uint16>  Broker ID of the order

X-Broker-Idinteger <uint16>  Request Body schema: application/json; charset=utf-8requiredautoLendboolean If true then the order can lend. Spot margin only.

autoLendRedeemboolean If true then the order can redeem a lend if required. Spot margin only.

autoBorrowboolean If true then the order can borrow. Spot margin only.

autoBorrowRepayboolean If true then the order can repay a borrow. Spot margin only.

brokerIdinteger <uint16>  Broker ID of the order.

clientIdinteger <uint32>  Custom order id.

orderTyperequiredstring Enum: "Market" "Limit"  Order type, market or limit.

postOnlyboolean Only post liquidity, do not take liquidity.

pricestring <decimal>  The order price if this is a limit order.

quantitystring <decimal>  The order quantity. Market orders must specify either a quantity or

quoteQuantity. All other order types must specify a quantity.

quoteQuantitystring <decimal>  The maximum amount of the quote asset to spend (Ask) or receive (Bid)

for market orders. This is used for reverse market orders. The

order book will execute a quantity as close as possible to the

notional value of quoteQuantity.

reduceOnlyboolean If true then the order can only reduce the positon. Futures only.

selfTradePreventionstring Enum: "RejectTaker" "RejectMaker" "RejectBoth"  Action to take if the user crosses themselves in the order book.

siderequiredstring Enum: "Bid" "Ask"  Order will be matched against the resting orders on the other side of

the order book.

stopLossLimitPricestring <decimal>  Stop loss limit price. If set the stop loss will be a limit order.

stopLossTriggerBystring Reference price that should trigger the stop loss order.

stopLossTriggerPricestring Stop loss price (price the stop loss order will be triggered at).

symbolrequiredstring The market for the order.

takeProfitLimitPricestring <decimal>  Take profit limit price. If set the take profit will be a limit order,

takeProfitTriggerBystring Reference price that should trigger the take profit order.

takeProfitTriggerPricestring Take profit price (price the take profit order will be triggered at).

timeInForcestring Enum: "GTC" "IOC" "FOK"  How long the order is good for.

triggerBystring Trigger by.

triggerPricestring Trigger price if this is a conditional order.

triggerQuantitystring Trigger quantity type if this is a trigger order.

slippageTolerancestring <decimal>  Slippage tolerance allowed for the order.

slippageToleranceTypestring Enum: "TickSize" "Percent"  Slippage tolerance type.

Responses200 Order executed.

400 Bad request.

500 Internal server error.

503 System under maintenance.

post/api/v1/orderhttps://api.backpack.exchange/api/v1/order Request samples PayloadContent typeapplication/json; charset=utf-8Copy{"autoLend": true,"autoLendRedeem": true,"autoBorrow": true,"autoBorrowRepay": true,"brokerId": 0,"clientId": 0,"orderType": "Market","postOnly": true,"price": "string","quantity": "string","quoteQuantity": "string","reduceOnly": true,"selfTradePrevention": "RejectTaker","side": "Bid","stopLossLimitPrice": "string","stopLossTriggerBy": "string","stopLossTriggerPrice": "string","symbol": "string","takeProfitLimitPrice": "string","takeProfitTriggerBy": "string","takeProfitTriggerPrice": "string","timeInForce": "GTC","triggerBy": "string","triggerPrice": "string","triggerQuantity": "string","slippageTolerance": "string","slippageToleranceType": "TickSize"} Response samples 200400500503Content typeapplication/json; charset=utf-8ExampleMarketLimitBatchCommandOrderResult_OrderTypeMarketCopy{"orderType": "Market","id": "string","clientId": 0,"createdAt": 0,"executedQuantity": "string","executedQuoteQuantity": "string","quantity": "string","quoteQuantity": "string","reduceOnly": true,"timeInForce": "GTC","selfTradePrevention": "RejectTaker","side": "Bid","status": "Cancelled","stopLossTriggerPrice": "string","stopLossLimitPrice": "string","stopLossTriggerBy": "string","symbol": "string","takeProfitTriggerPrice": "string","takeProfitLimitPrice": "string","takeProfitTriggerBy": "string","triggerBy": "string","triggerPrice": "string","triggerQuantity": "string","triggeredAt": 0,"relatedOrderId": "string","strategyId": "string","slippageTolerance": "string","slippageToleranceType": "TickSize"}Cancel open order. Cancels an open order from the order book.

One of orderId or clientId must be specified. If both are specified

then the request will be rejected.

## Instruction: orderCancel

## header ParametersX-API-KEYrequiredstring API key

X-SIGNATURErequiredstring Signature of the request

X-TIMESTAMPrequiredinteger <int64>  Timestamp of the request in milliseconds

X-WINDOWinteger <uint64>  Time the request is valid for in milliseconds (default 5000, maximum 60000)

Request Body schema: application/json; charset=utf-8requiredclientIdinteger <uint32>  Client ID of the order.

orderIdstring ID of the order.

symbolrequiredstring Market the order exists on.

Responses200 Order cancelled.

202 Request accepted but not yet executed.

400 Bad request.

500 Internal server error.

503 System under maintenance.

delete/api/v1/orderhttps://api.backpack.exchange/api/v1/order Request samples PayloadContent typeapplication/json; charset=utf-8Copy{"clientId": 0,"orderId": "string","symbol": "string"} Response samples 200400500503Content typeapplication/json; charset=utf-8ExampleMarketLimitBatchCommandOrderResult_OrderTypeMarketCopy{"orderType": "Market","id": "string","clientId": 0,"createdAt": 0,"executedQuantity": "string","executedQuoteQuantity": "string","quantity": "string","quoteQuantity": "string","reduceOnly": true,"timeInForce": "GTC","selfTradePrevention": "RejectTaker","side": "Bid","status": "Cancelled","stopLossTriggerPrice": "string","stopLossLimitPrice": "string","stopLossTriggerBy": "string","symbol": "string","takeProfitTriggerPrice": "string","takeProfitLimitPrice": "string","takeProfitTriggerBy": "string","triggerBy": "string","triggerPrice": "string","triggerQuantity": "string","triggeredAt": 0,"relatedOrderId": "string","strategyId": "string","slippageTolerance": "string","slippageToleranceType": "TickSize"}Execute orders. Submits a set of orders to the matching engine for execution in a batch.

## Batch commands instruction: orderExecute

## header ParametersX-API-KEYrequiredstring API key

X-SIGNATURErequiredstring Signature of the request

X-TIMESTAMPrequiredinteger <int64>  Timestamp of the request in milliseconds

X-WINDOWinteger <uint64>  Time the request is valid for in milliseconds (default 5000, maximum 60000)

X-Broker-Idinteger <uint16>  Request Body schema: application/json; charset=utf-8required Array autoLendboolean If true then the order can lend. Spot margin only.

autoLendRedeemboolean If true then the order can redeem a lend if required. Spot margin only.

autoBorrowboolean If true then the order can borrow. Spot margin only.

autoBorrowRepayboolean If true then the order can repay a borrow. Spot margin only.

brokerIdinteger <uint16>  Broker ID of the order.

clientIdinteger <uint32>  Custom order id.

orderTyperequiredstring Enum: "Market" "Limit"  Order type, market or limit.

postOnlyboolean Only post liquidity, do not take liquidity.

pricestring <decimal>  The order price if this is a limit order.

quantitystring <decimal>  The order quantity. Market orders must specify either a quantity or

quoteQuantity. All other order types must specify a quantity.

quoteQuantitystring <decimal>  The maximum amount of the quote asset to spend (Ask) or receive (Bid)

for market orders. This is used for reverse market orders. The

order book will execute a quantity as close as possible to the

notional value of quoteQuantity.

reduceOnlyboolean If true then the order can only reduce the positon. Futures only.

selfTradePreventionstring Enum: "RejectTaker" "RejectMaker" "RejectBoth"  Action to take if the user crosses themselves in the order book.

siderequiredstring Enum: "Bid" "Ask"  Order will be matched against the resting orders on the other side of

the order book.

stopLossLimitPricestring <decimal>  Stop loss limit price. If set the stop loss will be a limit order.

stopLossTriggerBystring Reference price that should trigger the stop loss order.

stopLossTriggerPricestring Stop loss price (price the stop loss order will be triggered at).

symbolrequiredstring The market for the order.

takeProfitLimitPricestring <decimal>  Take profit limit price. If set the take profit will be a limit order,

takeProfitTriggerBystring Reference price that should trigger the take profit order.

takeProfitTriggerPricestring Take profit price (price the take profit order will be triggered at).

timeInForcestring Enum: "GTC" "IOC" "FOK"  How long the order is good for.

triggerBystring Trigger by.

triggerPricestring Trigger price if this is a conditional order.

triggerQuantitystring Trigger quantity type if this is a trigger order.

slippageTolerancestring <decimal>  Slippage tolerance allowed for the order.

slippageToleranceTypestring Enum: "TickSize" "Percent"  Slippage tolerance type.

Responses200 Batch orders executed.

400 Bad request.

500 Internal server error.

503 System under maintenance.

post/api/v1/ordershttps://api.backpack.exchange/api/v1/orders Request samples PayloadContent typeapplication/json; charset=utf-8Copy Expand all  Collapse all [{"autoLend": true,"autoLendRedeem": true,"autoBorrow": true,"autoBorrowRepay": true,"brokerId": 0,"clientId": 0,"orderType": "Market","postOnly": true,"price": "string","quantity": "string","quoteQuantity": "string","reduceOnly": true,"selfTradePrevention": "RejectTaker","side": "Bid","stopLossLimitPrice": "string","stopLossTriggerBy": "string","stopLossTriggerPrice": "string","symbol": "string","takeProfitLimitPrice": "string","takeProfitTriggerBy": "string","takeProfitTriggerPrice": "string","timeInForce": "GTC","triggerBy": "string","triggerPrice": "string","triggerQuantity": "string","slippageTolerance": "string","slippageToleranceType": "TickSize"}] Response samples 200400500503Content typeapplication/json; charset=utf-8Copy Expand all  Collapse all [{"operation": "Ok","orderType": "Market","id": "string","clientId": 0,"createdAt": 0,"executedQuantity": "string","executedQuoteQuantity": "string","quantity": "string","quoteQuantity": "string","reduceOnly": true,"timeInForce": "GTC","selfTradePrevention": "RejectTaker","side": "Bid","status": "Cancelled","stopLossTriggerPrice": "string","stopLossLimitPrice": "string","stopLossTriggerBy": "string","symbol": "string","takeProfitTriggerPrice": "string","takeProfitLimitPrice": "string","takeProfitTriggerBy": "string","triggerBy": "string","triggerPrice": "string","triggerQuantity": "string","triggeredAt": 0,"relatedOrderId": "string","strategyId": "string","slippageTolerance": "string","slippageToleranceType": "TickSize"}]Get open orders. Retrieves all open orders. If a symbol is provided, only open orders for

that market will be returned, otherwise all open orders are

returned.

## Instruction: orderQueryAll

query ParametersmarketTypestring (MarketType)  Enum: "SPOT" "PERP" "IPERP" "DATED" "PREDICTION" "RFQ"  The market for the orders (SPOT or PERP).

symbolstring The symbol of the market for the orders.

## header ParametersX-API-KEYstring API key

## X-SIGNATUREstring Signature of the request

X-TIMESTAMPinteger <int64>  Timestamp of the request in milliseconds

X-WINDOWinteger <uint64>  Time the request is valid for in milliseconds (default 5000, maximum 60000)

Responses200 Success.

400 Bad request.

500 Internal Server Error.

get/api/v1/ordershttps://api.backpack.exchange/api/v1/orders Response samples 200400500Content typeapplication/json; charset=utf-8Copy Expand all  Collapse all [{"orderType": "Market","id": "string","clientId": 0,"createdAt": 0,"executedQuantity": "string","executedQuoteQuantity": "string","quantity": "string","quoteQuantity": "string","reduceOnly": true,"timeInForce": "GTC","selfTradePrevention": "RejectTaker","side": "Bid","status": "Cancelled","stopLossTriggerPrice": "string","stopLossLimitPrice": "string","stopLossTriggerBy": "string","symbol": "string","takeProfitTriggerPrice": "string","takeProfitLimitPrice": "string","takeProfitTriggerBy": "string","triggerBy": "string","triggerPrice": "string","triggerQuantity": "string","triggeredAt": 0,"relatedOrderId": "string","strategyId": "string","slippageTolerance": "string","slippageToleranceType": "TickSize"}]Cancel open orders. Cancels all open orders on the specified market.

## Instruction: orderCancelAll

## header ParametersX-API-KEYrequiredstring API key

X-SIGNATURErequiredstring Signature of the request

X-TIMESTAMPrequiredinteger <int64>  Timestamp of the request in milliseconds

X-WINDOWinteger <uint64>  Time the request is valid for in milliseconds (default 5000, maximum 60000)

Request Body schema: application/json; charset=utf-8requiredsymbolrequiredstring Market to cancel orders for.

orderTypestring Enum: "RestingLimitOrder" "ConditionalOrder"  Type of orders to cancel.

Responses200 Success.

202 Request accepted but not yet executed.

400 Bad request.

500 Internal server error.

503 System under maintenance.

delete/api/v1/ordershttps://api.backpack.exchange/api/v1/orders Request samples PayloadContent typeapplication/json; charset=utf-8Copy{"symbol": "string","orderType": "RestingLimitOrder"} Response samples 200400500503Content typeapplication/json; charset=utf-8Copy Expand all  Collapse all [{"orderType": "Market","id": "string","clientId": 0,"createdAt": 0,"executedQuantity": "string","executedQuoteQuantity": "string","quantity": "string","quoteQuantity": "string","reduceOnly": true,"timeInForce": "GTC","selfTradePrevention": "RejectTaker","side": "Bid","status": "Cancelled","stopLossTriggerPrice": "string","stopLossLimitPrice": "string","stopLossTriggerBy": "string","symbol": "string","takeProfitTriggerPrice": "string","takeProfitLimitPrice": "string","takeProfitTriggerBy": "string","triggerBy": "string","triggerPrice": "string","triggerQuantity": "string","triggeredAt": 0,"relatedOrderId": "string","strategyId": "string","slippageTolerance": "string","slippageToleranceType": "TickSize"}]Request For QuoteRequest For Quote.

Submit RFQ. Submit a Request for Quote (RFQ). The RFQ will be available for

a specified time window for makers to respond to.

## Instruction: rfqSubmit

## header ParametersX-API-KEYrequiredstring API key

X-SIGNATURErequiredstring Signature of the request

X-TIMESTAMPrequiredinteger <int64>  Timestamp of the request in milliseconds

X-WINDOWinteger <uint64>  Time the request is valid for in milliseconds (default 5000, maximum 60000)

Request Body schema: application/json; charset=utf-8requiredclientIdinteger <uint32>  Custom RFQ ID.

quantitystring <decimal>  RFQ quantity (in base asset).

quoteQuantitystring <decimal>  RFQ quote quantity (in quote asset).

pricestring <decimal>  RFQ price. Only when execution mode is Immediate.

symbolrequiredstring RFQ symbol.

siderequiredstring Enum: "Bid" "Ask"  Side of the order.

executionModestring Enum: "AwaitAccept" "Immediate"  Execution mode. Defaults to AwaitAccept when not provided.

Responses200 Accepted.

400 Bad request.

500 Internal server error.

503 System under maintenance.

post/api/v1/rfqhttps://api.backpack.exchange/api/v1/rfq Request samples PayloadContent typeapplication/json; charset=utf-8Copy{"clientId": 0,"quantity": "string","quoteQuantity": "string","price": "string","symbol": "string","side": "Bid","executionMode": "AwaitAccept"} Response samples 200400500503Content typeapplication/json; charset=utf-8Copy{"rfqId": "string","clientId": 0,"symbol": "string","side": "Bid","price": "string","quantity": "string","quoteQuantity": "string","submissionTime": 0,"systemOrderType": "CollateralConversion","expiryTime": 0,"status": "Cancelled","executionMode": "AwaitAccept","createdAt": 0}Accept quote. Accept a specific quote from a maker in response to an RFQ.

## Instruction: quoteAccept

## header ParametersX-API-KEYrequiredstring API key

X-SIGNATURErequiredstring Signature of the request

X-TIMESTAMPrequiredinteger <int64>  Timestamp of the request in milliseconds

X-WINDOWinteger <uint64>  Time the request is valid for in milliseconds (default 5000, maximum 60000)

Request Body schema: application/json; charset=utf-8requiredrfqIdstring RFQ ID.

clientIdinteger <uint32>  Custom RFQ ID.

quoteIdrequiredstring RFQ quote ID.

Responses200 Accepted.

400 Bad request.

500 Internal server error.

503 System under maintenance.

post/api/v1/rfq/accepthttps://api.backpack.exchange/api/v1/rfq/accept Request samples PayloadContent typeapplication/json; charset=utf-8Copy{"rfqId": "string","clientId": 0,"quoteId": "string"} Response samples 200400500503Content typeapplication/json; charset=utf-8Copy{"rfqId": "string","clientId": 0,"symbol": "string","side": "Bid","price": "string","quantity": "string","quoteQuantity": "string","submissionTime": 0,"systemOrderType": "CollateralConversion","expiryTime": 0,"status": "Cancelled","executionMode": "AwaitAccept","createdAt": 0}Refresh RFQ. Refresh a RFQ, extending the time window it is available for.

## Instruction: rfqRefresh

## header ParametersX-API-KEYrequiredstring API key

X-SIGNATURErequiredstring Signature of the request

X-TIMESTAMPrequiredinteger <int64>  Timestamp of the request in milliseconds

X-WINDOWinteger <uint64>  Time the request is valid for in milliseconds (default 5000, maximum 60000)

Request Body schema: application/json; charset=utf-8requiredrfqIdrequiredstring RFQ ID. An RFQ can only be refreshed using the RFQ ID.

Responses200 Accepted.

400 Bad request.

500 Internal server error.

503 System under maintenance.

post/api/v1/rfq/refreshhttps://api.backpack.exchange/api/v1/rfq/refresh Request samples PayloadContent typeapplication/json; charset=utf-8Copy{"rfqId": "string"} Response samples 200400500503Content typeapplication/json; charset=utf-8Copy{"rfqId": "string","clientId": 0,"symbol": "string","side": "Bid","price": "string","quantity": "string","quoteQuantity": "string","submissionTime": 0,"systemOrderType": "CollateralConversion","expiryTime": 0,"status": "Cancelled","executionMode": "AwaitAccept","createdAt": 0}Cancel RFQ. Instruction: rfqCancel

## header ParametersX-API-KEYrequiredstring API key

X-SIGNATURErequiredstring Signature of the request

X-TIMESTAMPrequiredinteger <int64>  Timestamp of the request in milliseconds

X-WINDOWinteger <uint64>  Time the request is valid for in milliseconds (default 5000, maximum 60000)

Request Body schema: application/json; charset=utf-8requiredrfqIdstring RFQ ID.

clientIdinteger <uint32>  Custom RFQ ID.

Responses200 Accepted.

400 Bad request.

500 Internal server error.

503 System under maintenance.

post/api/v1/rfq/cancelhttps://api.backpack.exchange/api/v1/rfq/cancel Request samples PayloadContent typeapplication/json; charset=utf-8Copy{"rfqId": "string","clientId": 0} Response samples 200400500503Content typeapplication/json; charset=utf-8Copy{"rfqId": "string","clientId": 0,"symbol": "string","side": "Bid","price": "string","quantity": "string","quoteQuantity": "string","submissionTime": 0,"systemOrderType": "CollateralConversion","expiryTime": 0,"status": "Cancelled","executionMode": "AwaitAccept","createdAt": 0}Submit quote. Submit a quote in response to an RFQ. If valid, the quote may be

accepted within the specified time window.

## Instruction: quoteSubmit

## header ParametersX-API-KEYrequiredstring API key

X-SIGNATURErequiredstring Signature of the request

X-TIMESTAMPrequiredinteger <int64>  Timestamp of the request in milliseconds

X-WINDOWinteger <uint64>  Time the request is valid for in milliseconds (default 5000, maximum 60000)

Request Body schema: application/json; charset=utf-8requiredrfqIdrequiredstring RFQ ID.

clientIdinteger <uint32>  Custom RFQ quote ID.

bidPricerequiredstring <decimal>  Bid price.

askPricerequiredstring <decimal>  Ask price.

Responses200 Accepted.

400 Bad request.

500 Internal server error.

503 System under maintenance.

post/api/v1/rfq/quotehttps://api.backpack.exchange/api/v1/rfq/quote Request samples PayloadContent typeapplication/json; charset=utf-8Copy{"rfqId": "string","clientId": 0,"bidPrice": "string","askPrice": "string"} Response samples 200400500503Content typeapplication/json; charset=utf-8Copy{"rfqId": "string","quoteId": "string","clientId": 0,"bidPrice": "string","askPrice": "string","status": "Cancelled","createdAt": 0}StreamsUsageSubscribingTo use the websocket API, connect to

wss://ws.backpack.exchange.

To subscribe to a stream with the name stream send a text frame

over the websocket connection with the following JSON payload:

## {

"method": "SUBSCRIBE",

## "params": ["stream"]

## }

Similarly, to unsubscribe from a stream with the name stream:

## {

"method": "UNSUBSCRIBE",

## "params": ["stream"]

## }

You can subscribe or unsubscribe from multiple streams if you include

more than one in the params field.

All data from streams is wrapped in a JSON object of the following form:

## {

"stream": "<stream>",

## "data": "<payload>"

## }

The following command can be used to test subscribing to a stream:

## (sleep 1; \

echo '{"method":"SUBSCRIBE","params":["depth.SOL_USDC"]}';\

## cat) |\

wscat -c wss://ws.backpack.exchange

The payloads for each stream time are outlined below.

TimingTimestamps are in microseconds (except for the K-line start and end

times). The event timestamp is the time the event was emitted from

the websocket server, and the engine timestamp is the time the event

was generated by the matching engine.

If a message aggregates more than one event (for example, a depth

message), the engine timestamp will be the timestamp of the last

matching engine event.

Keeping the connection aliveTo keep the connection alive, a Ping frame will be sent from the

server every 60s, and a Pong is expected to be received from the

client. If a Pong is not received within 120s, a Close frame will be

sent and the connection will be closed.

If the server is shutting down, a Close frame will be sent and then a

grace period of 30s will be given before the connection is closed. The

client should reconnect after receiving the Close frame. The client

will be reconnected to a server that is not shutting down.

PrivateSubscribing to a private stream requires a valid signature generated

from an ED25519 keypair. For stream subscriptions, the signature

## should be of the form:

instruction=subscribe&timestamp=1614550000000&window=5000

Where the timestamp and window are in milliseconds.

Private streams are prefixed with account. and require signature data

to be submitted in the subscribe parameters. The verifying key and

signature should be base64 encoded.

## {

"method": "SUBSCRIBE",

"params": ["stream"],

"signature": ["<verifying key>", "<signature>", "<timestamp>", "<window>"]

## }

Order updateOn any mutation to an order the order will be pushed to the order update

stream. The event type of the order update will be one of the

## following:

## orderAccepted

## orderCancelled

## orderExpired

## orderFill

## orderModified

## triggerPlaced

## triggerFailed

An orderModified update will be received when a resting reduce only

order's quantity is decreased in order to prevent position side

reversal.

## Stream Name Format

For all markets: account.orderUpdate

For single market: account.orderUpdate.<symbol>

## {

"e": "orderAccepted",   // Event type

"E": 1694687692980000,  // Event time in microseconds

"s": "SOL_USD",         // Symbol

"c": 123,               // Client order ID

"S": "Bid",             // Side

"o": "LIMIT",           // Order type

"f": "GTC",             // Time in force

"q": "32123",           // Quantity

"Q": "32123",           // Quantity in quote

"p": "20",              // Price

"P": "21",              // Trigger price

"B": "LastPrice",       // Trigger by

"a": "30",              // Take profit trigger price

"b": "10",              // Stop loss trigger price

"d": "MarkPrice",       // Take profit trigger by

"g": "IndexPrice",      // Stop loss trigger by

"Y": "10",              // Trigger quantity

"X": "Filled",          // Order state

"R": "PRICE_BAND",      // Order expiry reason

## "i": "1111343026172067" // Order ID

"t": 567,               // Trade ID

"l": "1.23",            // Fill quantity

"z": "321",             // Executed quantity

"Z": "123",             // Executed quantity in quote

"L": "20",              // Fill price

"m": true,              // Whether the order was maker

"n": "23",              // Fee

"N": "USD",             // Fee symbol

"V": "RejectTaker",     // Self trade prevention

"T": 1694687692989999,  // Engine timestamp in microseconds

## "O": "USER"             // Origin of the update

## "I": "1111343026156135" // Related order ID

## "H": 6023471188         // Strategy ID

## "y": true               // Post only

## }

There are several possible values for the O field (origin of the

## update):

USER: The origin of the update was due to order entry by the user.

LIQUIDATION_AUTOCLOSE: The origin of the update was due to a

liquidation by the liquidation engine.

ADL_AUTOCLOSE: The origin of the update was due to an ADL

(auto-deleveraging) event.

COLLATERAL_CONVERSION: The origin of the update was due to a

collateral conversion to settle debt on the account.

SETTLEMENT_AUTOCLOSE: The origin of the update was due to the

settlement of a position on a dated market.

BACKSTOP_LIQUIDITY_PROVIDER: The origin of the update was due to a

backstop liquidity provider facilitating a liquidation.

Some fields are conditional on the order settings or event type:

c - Only present if the order has a client order ID.

q - Only present if the order has a quantity set.

Q - Only present if the order is reverse market order.

p - Only present if the order is a limit order.

P - Only present if the order is a trigger order.

B - Only present if the order is a trigger order.

a - Only present if the order has a take profit trigger price set.

b - Only present if the order has a stop loss trigger price set.

d - Only present if the order has a take profit trigger price set.

g - Only present if the order has a stop loss trigger price set.

Y - Only present if the order is a trigger order.

R - Only present if the event is a orderExpired event.

t - Only present if the event is a orderFill event.

l - Only present if the event is a orderFill event.

L - Only present if the event is a orderFill event.

m - Only present if the event is a orderFill event.

n - Only present if the event is a orderFill event.

N - Only present if the event is a orderFill event.

Position updateOn any mutation to a position the position will be pushed to the

position update stream. The event type of the position update will

## be one of the following:

## positionAdjusted

## positionOpened

## positionClosed

On subscription, a message will be sent to the client with the current

open positions, if any. The e field will not be present in the

message.

## Stream Name Format

For all markets: account.positionUpdate

For single market: account.positionUpdate.<symbol>

## {

"e": "positionOpened",  // Event type

"E": 1694687692980000,  // Event time in microseconds

"s": "SOL_USDC_PERP",    // Symbol

"b": 123,               // Break event price

"B": 122,               // Entry price

"f": 0.5,               // Initial margin fraction

"M": 122,               // Mark price

"m": 0.01,              // Maintenance margin fraction

"q": 5,                 // Net quantity

"Q": 6,                 // Net exposure quantity

"n": 732 ,              // Net exposure notional

## "i": "1111343026172067" // Position ID

"p": "-1",              // PnL realized

"P": "0",               // PnL unrealized

"T": 1694687692989999   // Engine timestamp in microseconds

## }

The net quantity field will be positive if the position is long and

negative if the position is short.

The net exposure quantity field includes exposure from the open

position, as well as any open orders.

RFQ UpdateThis WebSocket stream provides real-time updates on RFQs (Request for

Quotes) that are relevant to makers. Events are pushed to this

stream whenever there is a significant state change in an RFQ or its

associated quotes, allowing makers to monitor and respond to RFQs as

they progress through various states.

## Event Types

For RFQs that submitted by other requesters.

rfqActive: Indicates that an RFQ is active and open for quotes.

For RFQs that submitted by your account.

rfqAccepted: Indicates that an RFQ has been accepted and is no

rfqRefreshed: Indicates that an RFQ has been refreshed, is active

and open for quotes.

rfqCancelled: Indicates that an RFQ has been cancelled or expired.

rfqCandidate: RFQ has received a new best quote.

rfqFilled: Indicates that an RFQ has been fully filled with a quote.

For Quotes submitted by your account.

quoteAccepted: Indicates that a quote submitted by the maker has

been accepted.

quoteCancelled: Indicates that a quote has been cancelled due to

quote submission, RFQ being filled, refreshed, cancelled, or expired.

## Quote Submission and RFQ Timing

Makers should submit quotes before the submission time (w field)

is reached, as indicated in each rfqActive event. An RFQ remains

active until the expiration time (W field). If no quote is

accepted or the RFQ is not cancelled, makers may continue to submit

quotes until expiration.

RFQs can periodically request new quotes by issuing additional

rfqActive events. Each new rfqActive event will have the same

RFQ ID (R field) but updated values for submission time and

expiration time, allowing makers to participate in extended or

renewed quoting periods for ongoing RFQs.

## Stream Name Format

For all markets: account.rfqUpdate

For single market: account.rfqUpdate.<symbol>

## Example Messages

## RFQ Accepted (sent to requester)

## {

"e": "rfqAccepted",            // Event type

"E": 1730225420369829,         // Event time in microseconds

"R": 113392053149171712,       // RFQ ID

"C": "123",                    // Client RFQ ID

"s": "SOL_USDC_RFQ",           // Symbol

"S": "Bid",                    // RFQ side

"q": "10",                     // Quantity (if quantity in base asset)

"w": 1730225480368,            // Submission time in milliseconds

"W": 1730225540368,            // Expiry time in milliseconds

"X": "New",                    // RFQ status

"T": 1730225420368765          // Engine timestamp in microseconds

## }

## RFQ Active (broadcast to all rfq listeners)

## {

"e": "rfqActive",              // Event type

"E": 1730225420369829,         // Event time in microseconds

"R": 113392053149171712,       // RFQ ID

"s": "SOL_USDC_RFQ",           // Symbol

"q": "10",                     // Quantity (optional) (if quantity in base asset)

"w": 1730225480368,            // Submission time in milliseconds

"W": 1730225540368,            // Expiry time in milliseconds

"X": "New",                    // RFQ status

"T": 1730225420368765          // Engine timestamp in microseconds

## }

## RFQ Refreshed (sent to requester)

## {

"e": "rfqRefreshed",           // Event type

"E": 1730225450369829,         // Event time in microseconds

"R": 113392053149171712,       // RFQ ID

"C": "123",                    // Client RFQ ID

"s": "SOL_USDC_RFQ",           // Symbol

"S": "Bid",                    // RFQ side

"q": "10",                     // Quantity (optional) (if quantity in base asset)

"w": 1730225480368,            // Submission time in milliseconds

"W": 1730225540368,            // Expiry time in milliseconds

"X": "New",                    // RFQ status

"T": 1730225450368765          // Engine timestamp in microseconds

## }

## RFQ Cancelled (sent to taker only)

## {

"e": "rfqCancelled",           // Event type

"E": 1730225460369829,         // Event time in microseconds

"R": 113392053149171712,       // RFQ ID

"C": "123",                    // Client RFQ ID

"s": "SOL_USDC_RFQ",           // Symbol

"S": "Bid",                    // RFQ side

"Q": "150",                    // Quote quantity (optional) (if quantity in quote asset)

"w": 1730225480368,            // Submission time in milliseconds

"W": 1730225540368,            // Expiry time in milliseconds

"X": "Cancelled",              // RFQ status

"T": 1730225460368765          // Engine timestamp in microseconds

## }

## Quote Accepted (sent to quoter)

## {

"e": "quoteAccepted",          // Event type

"E": 1730225434631394,         // Event time in microseconds

"R": 113392053149171712,       // RFQ ID

"u": 113392054083780608,       // Quote ID

"C": "123",                    // Client Quote ID

"s": "SOL_USDC_RFQ",           // Symbol

"X": "New",                    // Quote status

"T": 1730225434629778          // Engine timestamp in microseconds

## }

## Quote Cancelled (sent to quoter)

## {

"e": "quoteCancelled",         // Event type

"E": 1730225583761963,         // Event time in microseconds

"R": 113392061354344448,       // RFQ ID

"u": 113392062870847488,       // Quote ID

"C": "123",                    // Client Quote ID

"s": "SOL_USDC_RFQ",           // Symbol

"X": "Cancelled",              // Quote status

"T": 1730225583753811          // Engine timestamp in microseconds

## }

RFQ Candidate (sent to requester with quote details)

## {

"e": "rfqCandidate",           // Event type

"E": 1730225490648996,         // Event time in microseconds

"R": 113392053149171712,       // RFQ ID

"u": 113392054083780608,       // Quote ID

"C": "123",                    // Client RFQ ID

"s": "SOL_USDC_RFQ",           // Symbol

"S": "Bid",                    // RFQ side

"q": "10",                     // RFQ quantity (in base asset)

"Q": "150",                    // RFQ quote quantity (in quote asset)

"p": "15.50",                  // Taker price (quote price + fee)

"X": "New",                    // RFQ status

"T": 1730225490647080          // Engine timestamp in microseconds

## }

## RFQ Filled (sent to both requester and quoter)

## // To requester

## {

"e": "rfqFilled",              // Event type

"E": 1730225497648996,         // Event time in microseconds

"R": 113392053149171712,       // RFQ ID

"u": 113392054083780608,       // Quote ID

"C": "123",                    // Client RFQ ID

"s": "SOL_USDC_RFQ",           // Symbol

"S": "Bid",                    // RFQ side

"Q": "150",                    // RFQ quote quantity (optional) (if quantity in quote asset)

"p": "15.50",                  // Taker price (quote price + fee)

"X": "Filled",                 // RFQ status

"T": 1730225497647080          // Engine timestamp in microseconds

## }

## // To quoter

## {

"e": "rfqFilled",              // Event type

"E": 1730225497648996,         // Event time in microseconds

"R": 113392053149171712,       // RFQ ID

"u": 113392054083780608,       // Quote ID

"C": "123",                    // Client Quote ID

"s": "SOL_USDC_RFQ",           // Symbol

"p": "15.00",                  // Price

"X": "Filled",                 // Quote status

"T": 1730225497647080          // Engine timestamp in microseconds

## }

## Field Descriptions

e - Event type (e.g., rfqActive, rfqAccepted, rfqRefreshed,

rfqCancelled, quoteAccepted, quoteCancelled, rfqCandidate,

rfqFilled).

E - Event time in microseconds.

R - RFQ ID, identifying the request for quote.

u - Quote ID, identifying the specific quote.

C - Client ID (either Client RFQ ID or Client Quote ID depending on

context).

s - Symbol the RFQ is for.

S - Side of the RFQ, either "Bid" or "Ask".

q - Quantity for the RFQ (in base asset, if quantity in base asset).

Q - Quote quantity for the RFQ (in quote asset, if quantity in quote

asset).

p - Price associated with the quote/fill event.

w - Submission time for the RFQ in milliseconds.

W - Expiry time for the RFQ in milliseconds.

X - Order status (e.g., New, Cancelled, Filled).

T - Engine timestamp in microseconds.

Some fields are conditional and may be present only in specific events.

PublicBook tickerStream name format: bookTicker.<symbol>

## {

"e": "bookTicker",          // Event type

"E": 1694687965941000,      // Event time in microseconds

"s": "SOL_USDC",            // Symbol

"a": "18.70",               // Inside ask price

"A": "1.000",               // Inside ask quantity

"b": "18.67",               // Inside bid price

"B": "2.000",               // Inside bid quantity

"u": "111063070525358080",  // Update ID of event

"T": 1694687965940999       // Engine timestamp in microseconds

## }

DepthContains incremental depth updates. Each depth update has the absolute

value of the depths at the given levels, and only changes when the

depth has changed.

To obtain an initial snapshot of the depth, the client should query the

REST API.

The depth stream will push updates as quickly as possible, but under

load it may aggregate more than one update into a single event. In

this case the U and u fields will not be the same. The U field

is the first update ID in the event, and the u field is the final

update ID in the event.

There are alternative depth streams that aggregates updates into a

single message over a 200ms, 600ms or 1000ms period instead of pushing

updates in realtime. This is useful for reducing network traffic.

Updates are sequential, so U will always be u + 1 from the previous

message. If this is not the case, the client should assume that the

depth has been invalidated and requery the REST API.

Stream name format: depth.<symbol> (realtime)

Stream name format: depth.200ms.<symbol> (aggregated)

Stream name format: depth.600ms.<symbol> (aggregated)

Stream name format: depth.1000ms.<symbol> (aggregated)

## {

"e": "depth",           // Event type

"E": 1694687965941000,  // Event time in microseconds

"s": "SOL_USDC",        // Symbol

## "a": [                  // Asks

## [

"18.70",

"0.000"

## ]

],

## "b": [                  // Bids

## [

"18.67",

"0.832"

],

## [

"18.68",

"0.000"

## ]

],

"U": 94978271,          // First update ID in event

"u": 94978271,          // Last update ID in event

"T": 1694687965940999   // Engine timestamp in microseconds

## }

K-LineStream name format: kline.<interval>.<symbol>

## {

"e": "kline",           // Event type

"E": 1694687692980000,  // Event time in microseconds

"s": "SOL_USD",         // Symbol

"t": 123400000,         // K-Line start time in seconds

"T": 123460000,         // K-Line close time in seconds

"o": "18.75",           // Open price

"c": "19.25",           // Close price

"h": "19.80",           // High price

"l": "18.50",           // Low price

"v": "32123",           // Base asset volume

"n": 93828,             // Number of trades

## "X": false              // Is this k-line closed?

## }

LiquidationContains updates for liquidation events for all liquidation types.

## Stream name format: liquidation

## {

"e": "liquidation",         // Event type

"E": 1694688638091000,      // Event time in microseconds

"q": "10",                  // Quantity

"p": "18.70",               // Price

"S": "Bid",                 // Side

"s": "SOL_USDC",            // Symbol

"T": 567,                   // Engine timestamp in microseconds

## }

Mark priceStream name format: markPrice.<symbol>

## {

"e": "markPrice",           // Event type

"E": 1694687965941000,      // Event time in microseconds

"s": "SOL_USDC",            // Symbol

"p": "18.70",               // Mark price

"f": "1.70",                // Estimated funding rate

"i": "19.70",               // Index price

"n": 1694687965941000,      // Next funding timestamp in microseconds

## }

TickerThe ticker stream pushes 24hr rolling statistics for a single symbol

every second.

Stream name format: ticker.<symbol>

## {

"e": "ticker",          // Event type

"E": 1694687692980000,  // Event time in microseconds

"s": "SOL_USD",         // Symbol

"o": "18.75",           // First price

"c": "19.24",           // Last price

"h": "19.80",           // High price

"l": "18.50",           // Low price

"v": "32123",           // Base asset volume

"V": "928190",          // Quote asset volume

## "n": 93828              // Number of trades

## }

Open interestOpen interest updates are pushed to the openInterest stream every 60

seconds.

Stream name format: openInterest.<symbol>

## {

"e": "openInterest",          // Event type

"E": 1694687965941000,        // Event time in microseconds

"s": "SOL_USDC_PERP",         // Symbol

"o": "100",                   // Open interest in contracts

## }

TradeContains public trade data for a single symbol. The trade ID is a

sequential number specific to the symbol. This stream includes updates

for trades executed as a result of liquidations.

Stream name format: trade.<symbol>

## {

"e": "trade",                   // Event type

"E": 1694688638091000,          // Event time in microseconds

"s": "SOL_USDC",                // Symbol

"p": "18.68",                   // Price

"q": "0.122",                   // Quantity

"b": "111063114377265150",      // Buyer order ID

"a": "111063114585735170",      // Seller order ID

"t": 12345,                     // Trade ID

"T": 1694688638089000,          // Engine timestamp in microseconds

"m": true                       // Is the buyer the maker?

}