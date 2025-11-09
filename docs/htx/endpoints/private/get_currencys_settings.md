# GET Currencys Settings

**Source:**
[Get Currencys Settings](https://www.htx.com/en-us/opend/newApiPages/?id=7ec4f45e-7773-11ed-9966-0242ac110003)

**Category:** Reference Data

## Authentication

Required (Private Endpoint)

### /v1/settings/common/currencys ( Get Currencys Settings)

Request type: GET

Signature verification: No

Interface permission: Read

#### Request Address

| Environment                         | Address                   |
| ----------------------------------- | ------------------------- |
| Online                              | https://api.huobi.pro     |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description                       | Value Range | Default Value |
| --------- | --------- | -------- | --------------------------------- | ----------- | ------------- |
| ts        | long      | false    | timestamp to get incremental data |             |               |

Notes:  
It returns updated data from this timestample to the current time if filled in
with ts. If there is no update, the "data" of response is "\[\]".

#### Response Parameter

| Parameter  | Data Type | Required | Description                                                                                                                                                                                                                                                                                                                               | Value Range |
| ---------- | --------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| status     | string    | false    | status                                                                                                                                                                                                                                                                                                                                    |             |
| DATA_START | Object    | false    |                                                                                                                                                                                                                                                                                                                                           |             |
| name       | string    | false    | currency name                                                                                                                                                                                                                                                                                                                             |             |
| dn         | string    | false    | currency display name                                                                                                                                                                                                                                                                                                                     |             |
| vat        | long      | false    | visible assets timestamp                                                                                                                                                                                                                                                                                                                  |             |
| det        | long      | false    | deposit enable timestamp                                                                                                                                                                                                                                                                                                                  |             |
| wet        | long      | false    | withdraw enable timestamp                                                                                                                                                                                                                                                                                                                 |             |
| wp         | int       | false    | withdraw precision                                                                                                                                                                                                                                                                                                                        |             |
| ct         | string    | false    | currency type                                                                                                                                                                                                                                                                                                                             |             |
| cp         | string    | false    | currency partition. INVALID, all(PRO and HADAX), pro, hadax                                                                                                                                                                                                                                                                               |             |
| ss         | array     | false    | support sites. unknown, otc, futures(coin-m futures), minepool( not supports mulan), institution, swap(coin-m swap), asset(mulan does not support transfer, it is only used for reconciliation, cfd(cfd contract in Japan), chat(HTX Chat IM), option, linear-swap(usdt-m), custody(funding account in HK), turbine, margin, super-margin |             |
| oe         | integer   | false    | 0: disable, 1: enable                                                                                                                                                                                                                                                                                                                     |             |
| dma        | string    | false    | deposit min amount                                                                                                                                                                                                                                                                                                                        |             |
| wma        | string    | false    | withdraw min amount                                                                                                                                                                                                                                                                                                                       |             |
| sp         | string    | false    | show precision                                                                                                                                                                                                                                                                                                                            |             |
| w          | string    | false    | weight                                                                                                                                                                                                                                                                                                                                    |             |
| qc         | boolean   | false    | be quote currency                                                                                                                                                                                                                                                                                                                         |             |
| state      | string    | false    | currency state. unkown, not-online, online, offline                                                                                                                                                                                                                                                                                       |             |
| v          | boolean   | false    | visible                                                                                                                                                                                                                                                                                                                                   |             |
| whe        | boolean   | false    | white enabled                                                                                                                                                                                                                                                                                                                             |             |
| cd         | boolean   | false    | country disabled                                                                                                                                                                                                                                                                                                                          |             |
| de         | boolean   | false    | deposit enabled                                                                                                                                                                                                                                                                                                                           |             |
| we         | boolean   | false    | withdraw enabled                                                                                                                                                                                                                                                                                                                          |             |
| cawt       | boolean   | false    | currency addr with tag                                                                                                                                                                                                                                                                                                                    |             |
| cao        | boolean   | false    | currency addr oneoff                                                                                                                                                                                                                                                                                                                      |             |
| fc         | int       | false    | fast confirms                                                                                                                                                                                                                                                                                                                             |             |
| sc         | int       | false    | safe confirms                                                                                                                                                                                                                                                                                                                             |             |
| swd        | string    | false    | suspend withdraw desc                                                                                                                                                                                                                                                                                                                     |             |
| wd         | string    | false    | withdraw desc                                                                                                                                                                                                                                                                                                                             |             |
| sdd        | string    | false    | suspend deposit desc                                                                                                                                                                                                                                                                                                                      |             |
| dd         | string    | false    | deposit desc                                                                                                                                                                                                                                                                                                                              |             |
| svd        | string    | false    | suspend visible desc                                                                                                                                                                                                                                                                                                                      |             |
| tags       | string    | false    | Tags, multiple tags are separated by commas, such as: st, hadax                                                                                                                                                                                                                                                                           |             |
| fn         | string    | false    | currency full name                                                                                                                                                                                                                                                                                                                        |             |
| bc         |           | false    |                                                                                                                                                                                                                                                                                                                                           |             |
| iqc        |           | false    |                                                                                                                                                                                                                                                                                                                                           |             |
| DATA_END   |           | false    |                                                                                                                                                                                                                                                                                                                                           |             |
| ts         | String    | false    | timestamp of incremental data                                                                                                                                                                                                                                                                                                             |             |
| full       | int       | false    | full data flag: 0 for no and 1 for yes                                                                                                                                                                                                                                                                                                    |             |
| err-code   | string    | false    | error code(returned when the interface reports an error)                                                                                                                                                                                                                                                                                  |             |
| err-msg    | string    | false    | error msg(returned when the interface reports an error)                                                                                                                                                                                                                                                                                   |             |

#### Request example

`curl"https://api.huobi.pro/v1/settings/common/currencys"`

#### Response Example

##### Success Example

{

"status":

"ok"

"data":\[

0:{

"tags":

""

"name":

"usdt"

"state":

"online"

"cawt":

false

"fc":

12

"sc":

12

"sp":

"8"

"iqc":

true

"ct":

"eth"

"de":

true

"we":

true

"cd":

false

"oe":

1

"v":

true

"whe":

false

"wet":

1609430400000

"det":

1609430400000

"cp":

"all"

"vat":

1508839200000

"ss":\[

0

:

"INSTITUTION"

1

:

"MINEPOOL"

2

:

"OTC"

\]

"fn":

"Tether USDT"

"wp":

6

"w":

10006

"dma":

"1"

"wma":

"10"

"dn":

"USDT"

"dd":

"Please don’t deposit any other digital assets except USDT to the above address.
Otherwise, you may lose your assets permanently.
!>\_<!Depositing to the above address requires confirmations of the entire network. It will arrive after 12 confirmations, and it will be available to withdraw after 12 confirmations. !>\_<!Minimum deposit amount: 1 USDT. Any deposits less than the minimum will not be credited or refunded.!>\_<!Your deposit address won’t change often. If there are any changes, we will notify you via announcement or email.!>\_<!Please
make sure that your computer and browser are secure and your information is
protected from being tampered or leaked."

"svd":

NULL

"swd":

NULL

"sdd":

NULL

"wd":

"Minimum withdrawal amount: 10 USDT (ERC20).
!>\_<!To ensure the safety of your funds, your withdrawal request will be manually reviewed if your security strategy or password is changed. Please wait for phone calls or emails from our staff.!>\_<!Please
make sure that your computer and browser are secure and your information is
protected from being tampered or leaked."

}

\]

"ts":

"1641872721891"

"full":

1

}
