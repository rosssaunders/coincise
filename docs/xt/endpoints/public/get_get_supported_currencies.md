# GET Get supported currencies

Source:
[https://doc.xt.com/docs/spot/Deposit&Withdrawal/GetSupportedCurrencies](https://doc.xt.com/docs/spot/Deposit&Withdrawal/GetSupportedCurrencies)

# Get information of currencies (available for deposit and withdraw)

**Type:** GET  
**Description:** `/v4/public/wallet/support/currency`

### Parameters[​](#parameters "Direct link to Parameters")

| name | type | mandatory | default | description            | ranges |
| ---- | ---- | --------- | ------- | ---------------------- | ------ |
| –    | –    | false     | N/A     | No parameters required | –      |

### Notes[​](#notes "Direct link to Notes")

- The `currency` and `chain` fields in the response are required inputs for
  other **deposit/withdrawal APIs**.
- Each currency includes its supported transfer networks, deposit/withdrawal
  status, and fee details.

### Response Example[​](#response-example "Direct link to Response Example")

Response

```
{  "rc": 0,  "mc": "string",  "ma": [{}],  "result": [    {      "currency": "BTC", // Currency      "supportChains": [        {          "chain": "Bitcoin", // Supported Transfer Network          "depositEnabled": true, // Deposit supported          "withdrawEnabled": true, // Withdrawal supported          "contract": "futureAddress", // Future Address (if applicable)          "depositMinAmount": 1, // Minimum deposit amount          "depositFeeRate": 0.2, // Deposit fee rate (percentage)          "depositConfirmations": 2, // Deposit confirmation block count          "withdrawMinAmount": 10, // Minimum withdrawal amount          "withdrawPrecision": 4, // Withdrawal amount precision          "withdrawFeeAmount": 0.2, // Withdrawal fee          "withdrawFeeCurrency": "btc" // Withdrawal fee currency        }      ]    },    {      "currency": "ETH", // Currency      "supportChains": [        {          "chain": "Ethereum", // Supported Transfer Network          "depositEnabled": true,          "withdrawEnabled": true,          "contract": "futureAddress",          "depositMinAmount": 1,          "depositFeeRate": 0.2,          "depositConfirmations": 2,          "withdrawMinAmount": 10,          "withdrawPrecision": 4,          "withdrawFeeAmount": 0.2,          "withdrawFeeCurrency": "eth"        }      ]    }  ]}
```

[Edit this page](https://github.com/facebook/docusaurus/edit/main/website/docs/spot/Deposit&Withdrawal/supportedCurrenciesGet.mdx)
