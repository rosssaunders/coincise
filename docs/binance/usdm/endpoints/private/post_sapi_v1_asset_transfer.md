# User Universal Transfer (USER_DATA)

### API Description

user universal transfer

### HTTP Request

POST `/sapi/v1/asset/transfer`

You need to enable `Permits Universal Transfer` option for the API Key which
requests this endpoint.

### Request Weight(UID)

**900**

### Request Parameters

| Name       | Type    | Mandatory | Description |
| ---------- | ------- | --------- | ----------- |
| type       | ENUM    | YES       |             |
| asset      | STRING  | YES       |             |
| amount     | DECIMAL | YES       |             |
| fromSymbol | STRING  | NO        |             |
| toSymbol   | STRING  | NO        |             |
| recvWindow | LONG    | NO        |             |
| timestamp  | LONG    | YES       |             |

- `fromSymbol` must be sent when type are ISOLATEDMARGIN_MARGIN and
  ISOLATEDMARGIN_ISOLATEDMARGIN
- `toSymbol` must be sent when type are MARGIN_ISOLATEDMARGIN and
  ISOLATEDMARGIN_ISOLATEDMARGIN
- ENUM of transfer types:
  - MAIN_UMFUTURE Spot account transfer to USDⓈ-M Futures account
  - MAIN_CMFUTURE Spot account transfer to COIN-M Futures account
  - MAIN_MARGIN Spot account transfer to Margin（cross）account
  - UMFUTURE_MAIN USDⓈ-M Futures account transfer to Spot account
  - UMFUTURE_MARGIN USDⓈ-M Futures account transfer to Margin（cross）account
  - CMFUTURE_MAIN COIN-M Futures account transfer to Spot account
  - CMFUTURE_MARGIN COIN-M Futures account transfer to Margin(cross) account
  - MARGIN_MAIN Margin（cross）account transfer to Spot account
  - MARGIN_UMFUTURE Margin（cross）account transfer to USDⓈ-M Futures
  - MARGIN_CMFUTURE Margin（cross）account transfer to COIN-M Futures
  - ISOLATEDMARGIN_MARGIN Isolated margin account transfer to Margin(cross)
    account
  - MARGIN_ISOLATEDMARGIN Margin(cross) account transfer to Isolated margin
    account
  - ISOLATEDMARGIN_ISOLATEDMARGIN Isolated margin account transfer to Isolated
    margin account
  - MAIN_FUNDING Spot account transfer to Funding account
  - FUNDING_MAIN Funding account transfer to Spot account
  - FUNDING_UMFUTURE Funding account transfer to UMFUTURE account
  - UMFUTURE_FUNDING UMFUTURE account transfer to Funding account
  - MARGIN_FUNDING MARGIN account transfer to Funding account
  - FUNDING_MARGIN Funding account transfer to Margin account
  - FUNDING_CMFUTURE Funding account transfer to CMFUTURE account
  - CMFUTURE_FUNDING CMFUTURE account transfer to Funding account
  - MAIN_OPTION Spot account transfer to Options account
  - OPTION_MAIN Options account transfer to Spot account
  - UMFUTURE_OPTION USDⓈ-M Futures account transfer to Options account
  - OPTION_UMFUTURE Options account transfer to USDⓈ-M Futures account
  - MARGIN_OPTION Margin（cross）account transfer to Options account
  - OPTION_MARGIN Options account transfer to Margin（cross）account
  - FUNDING_OPTION Funding account transfer to Options account
  - OPTION_FUNDING Options account transfer to Funding account
  - MAIN_PORTFOLIO_MARGIN Spot account transfer to Portfolio Margin account
  - PORTFOLIO_MARGIN_MAIN Portfolio Margin account transfer to Spot account

### Response Example

```json
{
  "tranId": 13526853623
}
```

> Source:
> [https://developers.binance.com/docs/wallet/asset/user-universal-transfer](https://developers.binance.com/docs/wallet/asset/user-universal-transfer)
