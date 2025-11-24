# Withdraw

Withdraw assets from your Bybit account. You can make an off-chain transfer if
the target wallet address is from Bybit. This means that no blockchain fee will
be charged.

Note that, although the API rate limit for this endpoint is 5 req/s, there is
also a secondary limit: you can only withdraw once every 10 seconds per
chain/coin combination.

tip

- Make sure you have whitelisted your wallet address
  [here](https://www.bybit.com/user/assets/money-address)
- Request by the master UID's api key **only**

formula

**feeType=0:**

- withdrawPercentageFee != 0: _handlingFee = inputAmount / (1 -
  withdrawPercentageFee) \* withdrawPercentageFee + withdrawFee_
- withdrawPercentageFee = 0: _handlingFee = withdrawFee_

**feeType=1:**

- withdrawPercentageFee != 0: _handlingFee = withdrawFee + (inputAmount -
  withdrawFee) \* withdrawPercentageFee_
- withdrawPercentageFee = 0: _handlingFee = withdrawFee_

### HTTP Request[​](#http-request "Direct link to heading")

POST `/v5/asset/withdraw/create`

### Request Parameters[​](#request-parameters "Direct link to heading")

| Parameter | Required | Type   | Comments             |
| :-------- | :------- | :----- | -------------------- |
| coin      | **true** | string | Coin, uppercase only |
| chain     | false    | string | Chain                |

- `forceChain`\=0 or 1: this field is **required**
- `forceChain`\=2: this field can be null

| | address | **true** | string |

- `forceChain`\=0 or 1: fill wallet address, and make sure you add address in
  the [address book](https://www.bybit.com/user/assets/money-address) first.
  Please note that the address is case sensitive, so use the exact same address
  added in address book
- `forceChain`\=2: fill Bybit UID, and it can only be another Bybit **main**
  account UID. Make sure you add UID in the
  [address book](https://www.bybit.com/user/assets/money-address) first

| | tag | false | string | Tag

- **Required** if tag exists in the wallet address list.
- **Note**: please do not set a tag/memo in the address book if the chain does
  not support tag

| | amount | **true** | string | Withdraw amount | | timestamp | **true** |
integer | Current timestamp (ms). Used for preventing from withdraw replay | |
forceChain | false | integer | Whether or not to force an on-chain withdrawal

- `0`(default): If the address is parsed out to be an internal address, then
  internal transfer (**Bybit main account only**)
- `1`: Force the withdrawal to occur on-chain
- `2`: Use UID to withdraw

| | accountType | **true** | string | Select the wallet to be withdrawn from

- `FUND`: Funding wallet
- `UTA`: System transfers the funds to Funding wallet to withdraw
- `FUND,UTA`: For combo withdrawals, funds will be deducted from the Funding
  wallet first. If the balance is insufficient, the remaining amount will be
  deducted from the UTA wallet.
- `SPOT`: withdraw from spot wallet (classic account only)

| | feeType | false | integer | Handling fee option

- `0`(default): input amount is the actual amount received, so you have to
  calculate handling fee manually
- `1`: input amount is not the actual amount you received, the system will help
  to deduct the handling fee automatically

| | requestId | false | string | Customised ID, globally unique, it is used for
idempotent verification- A combination of letters (case sensitive) and numbers,
which can be pure letters or pure numbers and the length must be between 1 and
32 digits | | beneficiary | false | Object | Travel rule info. It is
**required** for kyc/kyb=KOR (Korean), kyc=IND (India) users, and users who
registered in [Bybit Turkey(TR)](https://www.bybit-tr.com/en-TR/),
[Bybit Kazakhstan(KZ)](https://www.bybit.kz/kk-KAZ/), Bybit Indonesia (ID) | |
\> vaspEntityId | false | string | Receiver exchange entity Id. Please call this
[endpoint](/docs/v5/asset/withdraw/vasp-list) to get this ID.- **Required**
param for Korean users

- **Ignored by** TR, KZ users | | \> beneficiaryName | false | string | Receiver
  exchange user KYC name  
  **Rules for Korean users**:- Please refer to target exchange kyc name
- When vaspEntityId="others", this field can be null **Rules for TR, KZ, kyc=IND
  users**: it is a **required** param, fill with individual name or company name
  | | \> beneficiaryLegalType | false | string | Beneficiary legal type,
  `individual`(default), `company`- **Required** param for TR, KZ, kyc=IND users
- Korean users can ignore | | \> beneficiaryWalletType | false | string |
  Beneficiary wallet type, `0`: custodial/exchange wallet (default), `1`: non
  custodial/exchane wallet- **Required** param for TR, KZ, kyc=IND users
- Korean users can ignore | | \> beneficiaryUnhostedWalletType | false | string
  | Beneficiary unhosted wallet type, `0`: Your own wallet, `1`: others' wallet-
  **Required** param for TR, KZ, kyc=IND users when "beneficiaryWalletType=1"
- Korean users can ignore | | \> beneficiaryPoiNumber | false | string |
  Beneficiary ducument number- **Required** param for TR, KZ users
- Korean users can ignore | | \> beneficiaryPoiType | false | string |
  Beneficiary ducument type- **Required** param for TR, KZ users: ID card,
  Passport, driver license, residence permit, Business ID, etc
- Korean users can ignore | | \> beneficiaryPoiIssuingCountry | false | string |
  Beneficiary ducument issuing country- **Required** param for TR, KZ users:
  refer to [Alpha-3 country code](https://www.iban.com/country-codes)
- Korean users can ignore | | \> beneficiaryPoiExpiredDate | false | string |
  Beneficiary ducument expiry date- **Required** param for TR, KZ users:
  yyyy-mm-dd format, e.g., "1990-02-15"
- Korean users can ignore | | \> beneficiaryAddressCountry | false | string |
  Beneficiary country- **Required** param for UAE users only, e.g.,`IDN` | | \>
  beneficiaryAddressState | false | string | Beneficiary state- **Required**
  param for UAE users only, e.g., "ABC" | | \> beneficiaryAddressCity | false |
  string | Beneficiary city- **Required** param for UAE users only, e.g.,
  "Jakarta" | | \> beneficiaryAddressBuilding | false | string | Beneficiary
  building address- **Required** param for UAE users only | | \>
  beneficiaryAddressStreet | false | string | Beneficiary street address-
  **Required** param for UAE users only | | \> beneficiaryAddressPostalCode |
  false | string | Beneficiary address post code- **Required** param for UAE
  users only | | \> beneficiaryDateOfBirth | false | string | Beneficiary date
  of birth- **Required** param for UAE users only | | \> beneficiaryPlaceOfBirth
  | false | string | Beneficiary birth place- **Required** param for UAE users
  onl |

### Response Parameters[​](#response-parameters "Direct link to heading")

| Parameter | Type   | Comments      |
| :-------- | :----- | ------------- |
| id        | string | Withdrawal ID |

### Request Example[​](#request-example "Direct link to heading")

```bash
POST /v5/asset/withdraw/create HTTP/1.1Host: api-testnet.bybit.comX-BAPI-API-KEY: xxxxxxxxxxxxxxxxxxX-BAPI-TIMESTAMP: 1672196570254X-BAPI-RECV-WINDOW: 5000X-BAPI-SIGN: XXXXXContent-Type: application/json{    "coin": "USDT",    "chain": "ETH",    "address": "0x99ced129603abc771c0dabe935c326ff6c86645d",    "amount": "24",    "timestamp": 1672196561407,    "forceChain": 0,    "accountType": "FUND"}
```

```python
from pybit.unified_trading import HTTPsession = HTTP(    testnet=True,    api_key="xxxxxxxxxxxxxxxxxx",    api_secret="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",)print(session.withdraw(    coin="USDT",    chain="ETH",    address="0x99ced129603abc771c0dabe935c326ff6c86645d",    amount="24",    timestamp=1672196561407,    forceChain=0,    accountType="FUND",))
```

```javascript
const { RestClientV5 } = require("bybit-api")
const client = new RestClientV5({
  testnet: true,
  key: "YOUR_API_KEY",
  secret: "YOUR_API_SECRET"
})
client
  .submitWithdrawal({
    coin: "USDT",
    chain: "ETH",
    address: "0x99ced129603abc771c0dabe935c326ff6c86645d",
    amount: "24",
    timestamp: 1672196561407,
    forceChain: 0,
    accountType: "FUND"
  })
  .then(response => {
    console.log(response)
  })
  .catch(error => {
    console.error(error)
  })
```

### Response Example[​](#response-example "Direct link to heading")

```json
{
  "retCode": 0,
  "retMsg": "success",
  "result": {
    "id": "10195"
  },
  "retExtInfo": {},
  "time": 1672196571239
}
```
