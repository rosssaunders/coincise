# GET all Supported Currencies(V2)

**Source:**
[Get all Supported Currencies(V2)](https://www.htx.com/en-us/opend/newApiPages/?id=7ec51aee-7773-11ed-9966-0242ac110003)

**Category:** Reference Data

## Authentication

Required (Private Endpoint)

### /v2/settings/common/currencies ( Get all Supported Currencies(V2))

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

| Parameter | Data Type | Required | Description                                                                           | Value Range |
| --------- | --------- | -------- | ------------------------------------------------------------------------------------- | ----------- |
| status    | string    | false    | status                                                                                |             |
| data      | Object    | false    |                                                                                       |             |
| cc        | string    | false    | currency code                                                                         |             |
| dn        | string    | false    | currency display name                                                                 |             |
| fn        | string    | false    | currency full name                                                                    |             |
| at        | int       | false    | asset type, 1 virtual currency 2 fiat currency                                        |             |
| wp        | int       | false    | withdraw precision                                                                    |             |
| ft        | string    | false    | fee type, eth: Fixed fee, btc: Interval fee husd: Fee charged in proportion           |             |
| dma       | string    | false    | deposit min amount                                                                    |             |
| wma       | string    | false    | withdraw min amount                                                                   |             |
| sp        | string    | false    | show precision                                                                        |             |
| w         | string    | false    | weight                                                                                |             |
| qc        | boolean   | false    | be quote currency                                                                     |             |
| state     | string    | false    | symbol state. unkown, not-online, online, offline                                     |             |
| v         | boolean   | false    | visible or not -- users who have offline currency but have assets can see it          |             |
| whe       | boolean   | false    | white enabled                                                                         |             |
| cd        | boolean   | false    | country disabled--users who have country disabled currency but have assets can see it |             |
| de        | boolean   | false    | deposit enabled                                                                       |             |
| wed       | boolean   | false    | withdraw enabled                                                                      |             |
| cawt      | boolean   | false    | currency addr with tag                                                                |             |
| fc        | int       | false    | fast confirms                                                                         |             |
| sc        | int       | false    | safe confirms                                                                         |             |
| swd       | string    | false    | suspend withdraw desc                                                                 |             |
| wd        | string    | false    | withdraw desc                                                                         |             |
| sdd       | string    | false    | suspend deposit desc                                                                  |             |
| dd        | string    | false    | deposit desc                                                                          |             |
| svd       | string    | false    | suspend visible desc                                                                  |             |
| tags      | string    | false    | Tags, multiple tags are separated by commas, such as: st, hadax                       |             |
| DATA_END  |           | false    |                                                                                       |             |
| ts        | String    | false    | timestamp of incremental data                                                         |             |
| full      | int       | false    | full data flag: 0 for no and 1 for yes                                                |             |
| err_code  | string    | false    | error code(returned when the interface reports an error)                              |             |
| err_msg   | string    | false    | error msg(returned when the interface reports an error)                               |             |

#### Request example

`curl"https://api.huobi.pro/v2/settings/common/currencies"`

#### Response Example

##### Success Example

{

"status":

"ok"

"data":\[

0:{

"tags":

""

"cawt":

false

"fc":

12

"sc":

12

"dma":

"1"

"wma":

"10"

"ft":

"eth"

"whe":

false

"cd":

false

"qc":

true

"sp":

"8"

"wp":

6

"fn":

"Tether USDT"

"at":

1

"cc":

"usdt"

"v":

true

"de":

true

"wed":

true

"w":

10006

"state":

"online"

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

"1641869938436"

"full":

1

}
