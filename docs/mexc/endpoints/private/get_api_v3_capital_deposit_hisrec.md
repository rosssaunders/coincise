# Deposit History(supporting network)

> Request

```
get /api/v3/capital/deposit/hisrec?coin=EOS&timestamp={{timestamp}}&signature={{signature}}
```

> Response

```
[
  {
        "amount": "50000",
        "coin": "EOS",
        "network": "EOS",
        "status": 5,
        "address": "0x20b7cf77db93d6ef1ab979c49142ec168427fdee",
        "txId": "01391d1c1397ef0a3cbb3c7f99a90846f7c8c2a8dddcdcf84f46b530dede203e1bc804",
        "insertTime": 1659513342000,
        "unlockConfirm": "10",
        "confirmTimes": "241",
        "memo": "xxyy1122"
  }
]
```

- **GET** `/api/v3/capital/deposit/hisrec`

**Permission:** SPOT_WITHDRAW_READ

**Weight(IP):** 1

Parameters:

| Name      | Type   | Mandatory | Description                           |
| --------- | ------ | --------- | ------------------------------------- |
| coin      | string | NO        | coin                                  |
| status    | string | NO        | status                                |
| startTime | string | NO        | default: 7 days ago from current time |
| endTime   | string | NO        | default:current time                  |
| limit     | string | NO        | default:1000,max:1000                 |
| timestamp | string | YES       | timestamp                             |
| signature | string | YES       | signature                             |

1.  default return the records of the last 7 days.
2.  Ensure that the default timestamp of 'startTime' and 'endTime' does not
    exceed 7 days.
3.  can query 90 days data at most.

Response:

| Name    | Description                                        |
| ------- | -------------------------------------------------- |
| amount  | deposit amount                                     |
| coin    | coin                                               |
| network | deposit network                                    |
| status  | deposit status,1:SMALL,2:TIME_DELAY,3:LARGE_DELAY, |

4:PENDING,5:SUCCESS,6:AUDITING,7:REJECTED  
8:REFUND,9:PRE_SUCCESS,10:INVALID,  
11:RESTRICTED,12:COMPLETED | | address | deposit adress | | addressTag |
addressTag | | txId | txId | | insertTime | insertTime | | unlockConfirm |
unlockConfirm | | confirmTimes | confirmTimes | | memo | memo |

---

**Source:**
https://mexcdevelop.github.io/apidocs/spot_v3_en#deposit-history-supporting-network
