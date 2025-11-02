## Subscription account balance push

Subscription Type

dataType: ACCOUNT_UPDATE

Subscription example

{"id":"gdfg2311-d0f6-4a70-8d5a-043e4c741b40","reqType":
"sub","dataType":"ACCOUNT_UPDATE"}

The field "m" represents the reason for the launch of the event, including the
following possible types: -DEPOSIT

INIT

DEPOSIT

DEPOSIT

WITHDRAW

ORDER

FUNDING_FEE

WITHDRAW_REJECT

ADJUSTMENT

INSURANCE_CLEAR

ADMIN_DEPOSIT

ADMIN_WITHDRAW

MARGIN_TRANSFER

MARGIN_TYPE_CHANGE

ASSET_TRANSFER

OPTIONS_PREMIUM_FEE

OPTIONS_SETTLE_PROFIT

AUTO_EXCHANGE

- For more about return error codes, please see the error code description on
  the homepage.

The effective time of the listen key is 1 hour. In order to ensure that your
subscription is not interrupted, please update the listen key regularly

Push data

### Data Parameters

|     | Description         |
| --- | ------------------- |
| B   | Array\[\]           |
| m   | event launch reason |

### Order Parameters

|     | Description                                                           |
| --- | --------------------------------------------------------------------- |
| a   | Asset Name                                                            |
| bc  | The amount of change in the asset account in this transaction         |
| cw  | The total assets in the account after the change in the asset account |
| wb  | The total assets in the account after the change in the asset account |
| lk  | Locked Asset                                                          |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/spot/socket/account.html#Subscription%20order%20update%20data](https://bingx-api.github.io/docs/#/en-us/spot/socket/account.html#Subscription%20order%20update%20data)
