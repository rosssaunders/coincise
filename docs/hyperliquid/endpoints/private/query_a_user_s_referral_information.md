# POST /info

**Source:** https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/info-endpoint

`POST` `https://api.hyperliquid.xyz/info`

Headers

Name

Type

Description

Content-Type\*

String

"application/json"

Request Body

Name

Type

Description

type\*

String

"referral"

user\*

String

hexadecimal format; e.g. 0x0000000000000000000000000000000000000000.

200: OK

```json
{
    "referredBy": {
        "referrer": "0x5ac99df645f3414876c816caa18b2d234024b487",
        "code": "TESTNET"
    },
    "cumVlm": "149428030.6628420055", // USDC Only
    "unclaimedRewards": "11.047361", // USDC Only
    "claimedRewards": "22.743781", // USDC Only
    "builderRewards": "0.027802", // USDC Only
    "tokenToState":[
      0,
      {
         "cumVlm":"149428030.6628420055",
         "unclaimedRewards":"11.047361",
         "claimedRewards":"22.743781",
         "builderRewards":"0.027802"
      }
   ],
    "referrerState": {
        "stage": "ready",
        "data": {
            "code": "TEST",
            "referralStates": [
                {
                    "cumVlm": "960652.017122",
                    "cumRewardedFeesSinceReferred": "196.838825",
                    "cumFeesRewardedToReferrer": "19.683748",
                    "timeJoined": 1679425029416,
                    "user": "0x11af2b93dcb3568b7bf2b6bd6182d260a9495728"
                },
                {
                    "cumVlm": "438278.672653",
                    "cumRewardedFeesSinceReferred": "97.628107",
                    "cumFeesRewardedToReferrer": "9.762562",
                    "timeJoined": 1679423947882,
                    "user": "0x3f69d170055913103a034a418953b8695e4e42fa"
                }
            ]
        }
    },
    "rewardHistory": []
}
```

Note that rewardHistory is for legacy rewards. Claimed rewards are now returned in nonFundingLedgerUpdate
