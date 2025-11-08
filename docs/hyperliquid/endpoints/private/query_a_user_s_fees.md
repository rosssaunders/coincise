# Query a user's fees

**Source:** https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/info-endpoint

`POST` `https://api.hyperliquid.xyz/info`

#### 

[](#headers-13)

Headers

Name

Type

Description

Content-Type\*

String

"application/json"

#### 

[](#request-body-15)

Request Body

Name

Type

Description

type\*

String

"userFees"

user\*

String

hexadecimal format; e.g. 0x0000000000000000000000000000000000000000.

200: OK

Copy

```
{
  "dailyUserVlm": [
    {
      "date": "2025-05-23",
      "userCross": "0.0",
      "userAdd": "0.0",
      "exchange": "2852367.0770729999"
    },
    ...
  ],
  "feeSchedule": {
    "cross": "0.00045",
    "add": "0.00015",
    "spotCross": "0.0007",
    "spotAdd": "0.0004",
    "tiers": {
      "vip": [
        {
          "ntlCutoff": "5000000.0",
          "cross": "0.0004",
          "add": "0.00012",
          "spotCross": "0.0006",
          "spotAdd": "0.0003"
        },
        ...
      ],
      "mm": [
        {
          "makerFractionCutoff": "0.005",
          "add": "-0.00001"
        },
        ...
      ]
    },
    "referralDiscount": "0.04",
    "stakingDiscountTiers": [
      {
        "bpsOfMaxSupply": "0.0",
        "discount": "0.0"
      },
      {
        "bpsOfMaxSupply": "0.0001",
        "discount": "0.05"
      },
      ...
    ]
  },
  "userCrossRate": "0.000315",
  "userAddRate": "0.000105",
  "userSpotCrossRate": "0.00049",
  "userSpotAddRate": "0.00028",
  "activeReferralDiscount": "0.0",
  "trial": null,
  "feeTrialReward": "0.0",
  "nextTrialAvailableTimestamp": null,
  "stakingLink": {
    "type": "tradingUser",
    "stakingUser": "0x54c049d9c7d3c92c2462bf3d28e083f3d6805061"
  },
  "activeStakingDiscount": {
    "bpsOfMaxSupply": "4.7577998927",
    "discount": "0.3"
  }
}
```
