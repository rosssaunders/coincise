# GET leverage

Source: [https://www.okx.com/docs-v5/en/#trading-account-rest-api-get-leverage](https://www.okx.com/docs-v5/en/#trading-account-rest-api-get-leverage)

### Get leverage

#### Rate Limit: 20 requests per 2 seconds

#### Rate limit rule: User ID

#### Permission: Read

#### HTTP Request

`GET /api/v5/account/leverage-info`

#### Request Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| instId | String | Conditional | Instrument ID  
Single instrument ID or multiple instrument IDs (no more than 20) separated with comma |
| ccy | String | Conditional | Currency，used for getting leverage of currency level.  
Applicable to `cross` `MARGIN` of `Spot mode`/`Multi-currency margin`/`Portfolio margin`.  
Supported single currency or multiple currencies (no more than 20) separated with comma. |
| mgnMode | String | Yes | Margin mode  
`cross` `isolated` |

#### Response Parameters

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
| instId | String | Instrument ID |
| ccy | String | Currency，used for getting leverage of currency level.  
Applicable to `cross` `MARGIN` of `Spot mode`/`Multi-currency margin`/`Portfolio margin`. |
| mgnMode | String | Margin mode |
| posSide | String | Position side  
`long`  
`short`  
`net`  
In `long/short` mode, the leverage in both directions `long`/`short` will be returned. |
| lever | String | Leverage |

Leverage cannot be enquired for the cross positions of Expiry Futures and Perpetual Futures under the portfolio margin account.
