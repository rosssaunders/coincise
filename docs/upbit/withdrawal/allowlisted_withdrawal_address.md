# Allowlisted Withdrawal Address

> 📘
>
> ###
>
> Allowlisted Withdrawal Address registration is REQUIRED to withdraw.
>
> [](#allowlisted-withdrawal-address-registration-is-required-to-withdraw)
>
> In order to withdraw through Open API, the withdrawal address must be
> registered as an allowlisted withdrawal address. Register the withdrawal
> address by going to \[MY\] > \[Open API\] > \[Allowlisted Withdrawal
> Address\].

> 🚧
>
> ###
>
> Network Type (net_type) vs. Network name(network_name)
>
> [](#network-type-net_type-vs-network-namenetwork_name)
>
> - **What is`net_type`?**
>
>   'Network type' is the blockchain network used when depositing/withdrawing
>   digital assets. Every digital asset has its unique network(chain) and may
>   differ depending on the type of digital asset.
>
> - **What is`network_name`?**
>
>   'Network Name' allows you to check the blockchain network name of the
>   digital assets supported by Upbit.

##

Response

[](#response)

Note on Singapore-Specific Response Fields

Response fields marked with `*Only Singapore` are included only when the
withdrawal destination is Singapore. These fields will not appear in the
response when withdrawing to any other country.

| Name                     | Description                                                                           | Type   |
| ------------------------ | ------------------------------------------------------------------------------------- | ------ |
| currency                 | Currency Symbol                                                                       | String |
| net_type                 | Currency Network                                                                      | String |
| network_name             | Currency Blockchain Network Name                                                      | String |
| withdraw_address         | Withdrawal Address                                                                    | String |
| secondary_address        | Secondary Withdrawal Address (only for required digital assets)                       | String |
| beneficiary_name         | Name of recipient (* Only Singapore)*For corporate entities, the response will beNone | String |
| beneficiary_company_name | Corporate name (\* Only Singapore)                                                    | String |
| beneficiary_type         | Owner type of the address (\* Only Singapore)individualcorporate                      | String |
| exchange_name            | Name of the exchange for the address (\* Only Singapore)                              | String |
| wallet_type              | Type of the personal wallet (\* Only Singapore)                                       | String |

# 200

## Query Parameters

| Parameter     | Type   | Required | Description                |
| ------------- | ------ | -------- | -------------------------- |
| Authorization | string | Yes      | Authorization token (JWT)  |
| currency      | string | No       | net_type                   |
| error         | object | No       | name                       |
| message       | string | No       | Updated about 2 months ago |

200

object

string

network_name

string

withdraw_address

string

secondary_address

string

# 4XX

4XX

object

string

---

NodePythonRubyJava

xxxxxxxxxx

1

const request \= require('request')

2

const uuidv4 \= require("uuid/v4")

3

const sign \= require('jsonwebtoken').sign

4

​

5

const access_key \= process.env.UPBIT_OPEN_API_ACCESS_KEY

6

const secret_key \= process.env.UPBIT_OPEN_API_SECRET_KEY

7

const server_url \= process.env.UPBIT_OPEN_API_SERVER_URL

8

​

9

const payload \= {

10

    access\_key: access\_key,

11

    nonce: uuidv4(),

12

}

13

​

14

const token \= sign(payload, secret_key)

15

​

16

const options \= {

17

    method: "GET",

18

    url: server\_url + "/v1/withdraws/coin\_addresses",

19

    headers: {Authorization: \`Bearer \${token}\`},

20

}

21

​

22

request(options, (error, response, body) \=> {

23

    if (error) throw new Error(error)

24

    console.log(body)

25

})

xxxxxxxxxx

1

{

2

"currency": "BTC",

3

"net_type": "BTC",

4

"network_name": "Bitcoin",

5

"withdraw_address":
"bc1q\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*", // This field
normally contains the recipient's actual Bitcoin wallet address, but it has been
masked in this example.

6

"secondary_address": null,

7

"beneficiary_name": "Not Provided", // \*Only Singapore. This field normally
contains the recipient's real name, but is intentionally omitted here.

8

"beneficiary_company_name": null, // \*Only Singapore

9

"beneficiary_type": "individual", // \*Only Singapore

10

"exchange_name": "Upbit Singapore", // \*Only Singapore

11

"wallet_type": null // \*Only Singapore

12

}

Updated about 2 months ago

---

> **Source:**
> [allowlisted-withdrawal-address](https://global-docs.upbit.com/reference/allowlisted-withdrawal-address)
