# GET deposit withdraw status

Source:
[https://www.okx.com/docs-v5/en/#funding-account-rest-api-get-deposit-withdraw-status](https://www.okx.com/docs-v5/en/#funding-account-rest-api-get-deposit-withdraw-status)

### Get deposit withdraw status

Retrieve deposit's and withdrawal's detailed status and estimated complete time.

#### Rate Limit: 1 request per 2 seconds

#### Rate limit rule: User ID

#### Permission: Read

#### HTTP Request

`GET /api/v5/asset/deposit-withdraw-status`

#### Request Parameters

| **Parameters**                                          | **Types** | **Required** | **Description**                                            |
| ------------------------------------------------------- | --------- | ------------ | ---------------------------------------------------------- |
| wdId                                                    | String    | Conditional  | Withdrawal ID, use to retrieve withdrawal status           |
| Required to input one and only one of `wdId` and `txId` |
| txId                                                    | String    | Conditional  | Hash record of the deposit, use to retrieve deposit status |
| Required to input one and only one of `wdId` and `txId` |
| ccy                                                     | String    | Conditional  | Currency type, e.g. `USDT`                                 |
| Required when retrieving deposit status with `txId`     |
| to                                                      | String    | Conditional  | To address, the destination address in deposit             |
| Required when retrieving deposit status with `txId`     |
| chain                                                   | String    | Conditional  | Currency chain information, e.g. USDT-ERC20                |
| Required when retrieving deposit status with `txId`     |

#### Response Parameters

| Parameter       | Type   | Description             |
| --------------- | ------ | ----------------------- |
| estCompleteTime | String | Estimated complete time |

The timezone is `UTC+8`. The format is MM/dd/yyyy, h:mm:ss AM/PM  
estCompleteTime is only an approximate estimated time, for reference only. | |
state | String | The detailed stage and status of the deposit/withdrawal  
The message in front of the colon is the stage; the message after the colon is
the ongoing status. | | txId | String | Hash record on-chain  
For withdrawal, if the `txId` has already been generated, it will return the
value, otherwise, it will return "". | | wdId | String | Withdrawal ID  
When retrieving deposit status, wdId returns blank "". |

Stage References  
Deposit  
Stage 1: On-chain transaction detection  
Stage 2: Push deposit data to associated account  
Stage 3: Receiving account credit  
Final stage: Deposit complete  
Withdrawal  
Stage 1: Pending withdrawal  
Stage 2: Withdrawal in progress  
Final stage: Withdrawal complete / cancellation complete
