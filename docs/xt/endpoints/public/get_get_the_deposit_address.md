# GET Get the deposit address

Source: [https://doc.xt.com/docs/spot/Deposit&Withdrawal/GetDepositAddress](https://doc.xt.com/docs/spot/Deposit&Withdrawal/GetDepositAddress)

# Get the deposit address

**Type:** GET  
**Description:** `/v4/deposit/address`

### Parameters[​](#parameters "Direct link to Parameters")

| name | type | mandatory | default | description | ranges |
| --- | --- | --- | --- | --- | --- |
| chain | string | true | N/A | Network for deposit |  |
| currency | string | true | N/A | Currency name |  |

### Notes[​](#notes "Direct link to Notes")

This endpoint retrieves the deposit address for a specified currency on a given chain.

-   Some currencies may require a **memo/tag** in addition to the address.
-   Always confirm the network matches the currency to avoid loss of funds.

### Response Example[​](#response-example "Direct link to Response Example")

Response

```
{  "rc": 0,  "mc": "string",  "ma": [{}],  "result": {    "address": "0xfa3abfa50eb2006f5be7831658b17aca240d8526", // Wallet address    "memo": "" // Memo/Tag if required, otherwise empty  }}
```

[Edit this page](https://github.com/facebook/docusaurus/edit/main/website/docs/spot/Deposit&Withdrawal/depositAddressGet.mdx)