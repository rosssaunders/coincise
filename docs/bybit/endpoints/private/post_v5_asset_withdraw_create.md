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
32 digits |

<table border="0.8"><tbody><tr><td>beneficiary</td><td>false</td><td>Object</td><td>Travel rule info. It is <b>required</b> for kyc/kyb=KOR (Korean), kyc=IND (India) users, and users who registered in <a href="https://www.bybit-tr.com/en-TR/" target="_blank" rel="noopener noreferrer">Bybit Turkey(TR)</a>, <a href="https://www.bybit.kz/kk-KAZ/" target="_blank" rel="noopener noreferrer">Bybit Kazakhstan(KZ)</a>, Bybit Indonesia (ID</td></tr><tr><td>&gt; vaspEntityId</td><td>false</td><td>Object</td><td>Receiver exchange entity Id. Please call this <a href="/docs/v5/asset/withdraw/vasp-list">endpoint</a> to get this ID.<li><b>Required</b> param for Korean users</li><li><b>Ignored by </b>TR, KZ users</li></td></tr><tr><td>&gt; vaspEntityId</td><td>false</td><td>string</td><td>Receiver exchange entity Id. Please call this <a href="/docs/v5/asset/withdraw/vasp-list">endpoint</a> to get this ID.<li><b>Required</b> param for Korean users</li><li><b>Ignored by </b>TR, KZ users</li></td></tr><tr><td>&gt; beneficiaryName</td><td>false</td><td>string</td><td>Receiver exchange user KYC name<br><b>Rules for Korean users</b>:<li>Please refer to target exchange kyc name</li><li>When vaspEntityId="others", this field can be null</li><b>Rules for TR, KZ, kyc=IND users</b>: it is a <b>required</b> param, fill with individual name or company name</td></tr><tr><td>&gt; beneficiaryLegalType</td><td>false</td><td>string</td><td>Beneficiary legal type, <code>individual</code>(default), <code>company</code><li><b>Required</b> param for TR, KZ, kyc=IND users</li><li>Korean users can ignore</li></td></tr><tr><td>&gt; beneficiaryWalletType</td><td>false</td><td>string</td><td>Beneficiary wallet type, <code>0</code>: custodial/exchange wallet (default), <code>1</code>: non custodial/exchane wallet<li><b>Required</b> param for TR, KZ, kyc=IND users</li><li>Korean users can ignore</li></td></tr><tr><td>&gt; beneficiaryUnhostedWalletType</td><td>false</td><td>string</td><td>Beneficiary unhosted wallet type, <code>0</code>: Your own wallet, <code>1</code>: others' wallet<li><b>Required</b> param for TR, KZ, kyc=IND users when "beneficiaryWalletType=1"</li><li>Korean users can ignore</li></td></tr><tr><td>&gt; beneficiaryPoiNumber</td><td>false</td><td>string</td><td>Beneficiary ducument number<li><b>Required</b> param for TR, KZ users</li><li>Korean users can ignore</li></td></tr><tr><td>&gt; beneficiaryPoiType</td><td>false</td><td>string</td><td>Beneficiary ducument type<li><b>Required</b> param for TR, KZ users: ID card, Passport, driver license, residence permit, Business ID, etc</li><li>Korean users can ignore</li></td></tr><tr><td>&gt; beneficiaryPoiIssuingCountry</td><td>false</td><td>string</td><td>Beneficiary ducument issuing country<li><b>Required</b> param for TR, KZ users: refer to <a href="https://www.iban.com/country-codes" target="_blank" rel="noopener noreferrer">Alpha-3 country code</a></li><li>Korean users can ignore</li></td></tr><tr><td>&gt; beneficiaryPoiExpiredDate</td><td>false</td><td>string</td><td>Beneficiary ducument expiry date<li><b>Required</b> param for TR, KZ users: yyyy-mm-dd format, e.g., "1990-02-15"</li><li>Korean users can ignore</li></td></tr><tr><td>&gt; beneficiaryAddressCountry</td><td>false</td><td>string</td><td>Beneficiary country<li><b>Required</b> param for UAE users only, e.g.,<code>IDN</code></li></td></tr><tr><td>&gt; beneficiaryAddressState</td><td>false</td><td>string</td><td>Beneficiary state<li><b>Required</b> param for UAE users only, e.g., "ABC"</li></td></tr><tr><td>&gt; beneficiaryAddressCity</td><td>false</td><td>string</td><td>Beneficiary city<li><b>Required</b> param for UAE users only, e.g., "Jakarta"</li></td></tr><tr><td>&gt; beneficiaryAddressBuilding</td><td>false</td><td>string</td><td>Beneficiary building address<li><b>Required</b> param for UAE users only</li></td></tr><tr><td>&gt; beneficiaryAddressStreet</td><td>false</td><td>string</td><td>Beneficiary street address<li><b>Required</b> param for UAE users only</li></td></tr><tr><td>&gt; beneficiaryAddressPostalCode</td><td>false</td><td>string</td><td>Beneficiary address post code<li><b>Required</b> param for UAE users only</li></td></tr><tr><td>&gt; beneficiaryDateOfBirth</td><td>false</td><td>string</td><td>Beneficiary date of birth<li><b>Required</b> param for UAE users only</li></td></tr><tr><td>&gt; beneficiaryPlaceOfBirth</td><td>false</td><td>string</td><td>Beneficiary birth place<li><b>Required</b> param for UAE users onl</li></td></tr></tbody></table>

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

### Response Example[​](#response-parameters "Direct link to heading")

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
