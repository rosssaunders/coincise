# GET Withdraw

Source:
[https://doc.xt.com/docs/spot/Deposit&Withdrawal/Withdraw](https://doc.xt.com/docs/spot/Deposit&Withdrawal/Withdraw)

# Withdraw

### Description[​](#description "Direct link to Description")

**POST** `/v4/withdraw`

---

### Note[​](#note "Direct link to Note")

- The parameters are placed in the **body** in JSON format.

---

### Limit Rule[​](#limit-rule "Direct link to Limit Rule")

- 1/s/apikey

---

### Parameters[​](#parameters "Direct link to Parameters")

| Name          | Type   | Mandatory | Default | Description                                                                     | Ranges |
| ------------- | ------ | --------- | ------- | ------------------------------------------------------------------------------- | ------ |
| currency      | string | Yes       | —       | Currency name, obtained from `Get supported currencies for deposit/withdraw`    |        |
| chain         | string | No        | —       | Transfer network, obtained from `Get supported currencies for deposit/withdraw` |        |
| clientOrderId | string | No        | —       | Custom Client ID, RegEx: `^[a-zA-Z0-9_]{4,32}$`                                 |        |
| amount        | number | Yes       | —       | Withdrawal amount, including fees                                               |        |
| address       | string | No        | —       | Withdrawal address                                                              |        |
| memo          | string | No        | —       | Memo, required for EOS-like chains                                              |        |
| toAccountId   | number | No        | —       | Receiving user ID                                                               |        |

---

### Request Example[​](#request-example "Direct link to Request Example")

```
{  "currency": "zb",  "chain": "Ethereum",  "amount": 1000,  "address": "0xfa3abfa50eb2006f5be7831658b17aca240d8526",  "memo": ""}
```

[Edit this page](https://github.com/facebook/docusaurus/edit/main/website/docs/spot/Deposit&Withdrawal/withdraw.mdx)
