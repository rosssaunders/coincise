# GET /api/v3/capital/config/getall

**Source:** https://www.mexc.com/api-docs/spot-v3/wallet-endpoints#query-the-currency-information

> Request

```bash
Get /api/v3/capital/config/getall
```

> Response

```json
[  {    "coin": "EOS",    "Name": "EOS",    "networkList": [      {          "coin": "EOS",          "depositDesc": null,          "depositEnable": true,          "minConfirm": 0,          "Name": "EOS",          "network": "EOS",          "withdrawEnable": false,          "withdrawFee": "0.000100000000000000",          "withdrawIntegerMultiple": null,          "withdrawMax": "10000.000000000000000000",          "withdrawMin": "0.001000000000000000",          "sameAddress": false,          "contract": "TN3W4H6rK2ce4vX9YnFQHwKENnHjoxbm9",          "withdrawTips": "Both a MEMO and an Address are required.",          "depositTips": "Both a MEMO and an Address are required.",          "netWork": "EOS"      },      {          "coin": "BTC",          "depositDesc": null,          "depositEnable": true,          "minConfirm": 0,          "Name": "BTC-BSC",          "network": "BEP20(BSC)",          "withdrawEnable": true,          "withdrawFee": "0.000010000000000000",          "withdrawIntegerMultiple": null,          "withdrawMax": "100.000000000000000000",          "withdrawMin": "0.000100000000000000",          "sameAddress": false,          "contract": "0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c",          "withdrawTips": null,          "depositTips": null,          "network": "BTC"      }    ]  },]
```

-   **GET** `/api/v3/capital/config/getall`

**Permission:** SPOT\_WITHDRAW\_READ

**Weight(IP):** 10

Query currency details and the smart contract address

Parameters:

None

Response:

| Name | Description |
| --- | --- |
| depositEnable | depositEnable |
| withdrawEnable | withdrawEnable |
| withdrawFee | withdrawFee |
| withdrawMax | Max withdraw amount |
| withdrawMin | Min withdraw amount |
| contract | coin contract |
| withdrawTips | withdrawTips |
| depositTips | depositTips |
| network | withdraw network(previous params,offline soon) |
| netWork | withdraw network(new params,for new withdraw endpoint) |
