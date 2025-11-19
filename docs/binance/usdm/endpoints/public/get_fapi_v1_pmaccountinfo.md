## Classic Portfolio Margin Account Information (USER\_DATA)

### API Description

Get Classic Portfolio Margin current account information.

### HTTP Request

GET `/fapi/v1/pmAccountInfo`

### Request Weight

**5**

### Request Parameters

| Name | Type | Mandatory | Description |
| --- | --- | --- | --- |
| asset | STRING | YES |  |
| recvWindow | LONG | NO |  |
| timestamp | LONG | YES |  |

> -   maxWithdrawAmount is for asset transfer out to the spot wallet.

### Response Example

```
{
	"maxWithdrawAmountUSD": "1627523.32459208",   // Classic Portfolio margin maximum virtual amount for transfer out in USD
	"asset": "BTC",            // asset name
	"maxWithdrawAmount": "27.43689636",        // maximum amount for transfer out
}
```

> Source: [https://developers.binance.com/docs/derivatives/usds-margined-futures/portfolio-margin-endpoints](https://developers.binance.com/docs/derivatives/usds-margined-futures/portfolio-margin-endpoints)
