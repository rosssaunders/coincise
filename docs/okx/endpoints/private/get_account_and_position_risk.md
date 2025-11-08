# GET account and position risk

Source: [https://www.okx.com/docs-v5/en/#trading-account-rest-api-get-account-and-position-risk](https://www.okx.com/docs-v5/en/#trading-account-rest-api-get-account-and-position-risk)

### Get account and position risk

Get account and position risk

Obtain basic information about accounts and positions on the same time snapshot

#### Rate Limit: 10 requests per 2 seconds

#### Rate limit rule: User ID

#### Permission: Read

#### HTTP Request

`GET /api/v5/account/account-position-risk`

#### Request Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| instType | String | No | Instrument type  
`MARGIN`  
`SWAP`  
`FUTURES`  
`OPTION` |

#### Response Parameters

| **Parameters** | **Types** | **Description** |
| --- | --- | --- |
| ts | String | Update time of account information, millisecond format of Unix timestamp, e.g. `1597026383085` |
| adjEq | String | Adjusted / Effective equity in `USD`  
Applicable to `Multi-currency margin` and `Portfolio margin` |
| balData | Array of objects | Detailed asset information in all currencies |
| \> ccy | String | Currency |
| \> eq | String | Equity of currency |
| \> disEq | String | Discount equity of currency in `USD`. |
| posData | Array of objects | Detailed position information in all currencies |
| \> instType | String | Instrument type |
| \> mgnMode | String | Margin mode  
`cross`  
`isolated` |
| \> posId | String | Position ID |
| \> instId | String | Instrument ID, e.g. `BTC-USDT-SWAP` |
| \> pos | String | Quantity of positions `contract`. In the isolated margin mode, when doing manual transfers, a position with pos of `0` will be generated after the deposit is transferred |
| \> baseBal | String | ~Base currency balance, only applicable to `MARGIN`（Quick Margin Mode）~(Deprecated) |
| \> quoteBal | String | ~Quote currency balance, only applicable to `MARGIN`（Quick Margin Mode）~(Deprecated) |
| \> posSide | String | Position side  
`long`  
`short`  
`net` (`FUTURES`/`SWAP`/`OPTION`: positive `pos` means long position and negative `pos` means short position. `MARGIN`: `posCcy` being base currency means long position, `posCcy` being quote currency means short position.) |
| \> posCcy | String | Position currency, only applicable to `MARGIN` positions. |
| \> ccy | String | Currency used for margin |
| \> notionalCcy | String | Notional value of positions in `coin` |
| \> notionalUsd | String | Notional value of positions in `USD` |
