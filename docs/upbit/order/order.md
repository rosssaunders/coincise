# Order

##

Request Parameters

[](#request-parameters)

> 📘
>
> ###
>
> New order type & options
>
> [](#new-order-type--options)
>
> We support the `best` order type as well as the `ioc` (Immediate or Cancel)
> and `fok` (Fill or Kill) functions.
>
> - The `best` order type is added to the `ord_type` field.
> - The `time_in_force` field is added. (Type: `ioc` and `fok`)

| Field Name    | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Type                |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------- |
| market \*     | Market ID (required)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | String              |
| side \*       | Order Type (required)bid : Buyingask : Selling                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | String              |
| volume \*     | Order Volume (Required when selling at the limit price or market price)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | NumberString        |
| price \*      | Order Price. (Required when selling at the limit price or market price)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | NumberString        |
| ord_type \*   | Order Method (required)limit : Limit Orderprice : Market Price Order(Bid)market : Market Price Order(Ask)best : Best Order type (time_in_force field is required)                                                                                                                                                                                                                                                                                                                                                                                                        | String              |
| identifier    | User custom Value for Inquiries (Optional)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | String (Uniq Value) |
| time_in_force | IOC, FOK, and Post Only Settings (Optional)ioc: Immediately executes the portion of the order that can be filled; cancels the rest. (Immediate or Cancel)fok: Executes the order only if the entire quantity can be filled immediately; otherwise, the order is canceled. (Fill or Kill)post_only: Places the order only if it would not immediately match with an existing order; otherwise, the order is canceled.The ioc and fok options are supported only when ord_type is set tobest or limit.The post_only option is supported only when ord_type is set tolimit. | String              |
| smp_type      | SMP (Self-Match Prevention) Type (Optional)reduce : Prevent matching by reducing the volume of both orders by the matched amount when orders from the same user are matched.cancel_maker : Cancel the maker order when orders from the same user are matched.cancel_taker : Cancel the taker order when orders from the same user are matched.**The SMP is determined by thesmp_type of the taker order. **The smp_type of the maker order does not affect the prevention logic. Please refer to the [SMP Guide] for more details.                                       |                     |

<span style={{color:'red'}}>_</span>\_Required_\\ <span
style={{color:'orange'}}>_</span> \_Required under specific conditions_

> 🚧
>
> ###
>
> Using the Identifier Parameter
>
> [](#using-the-identifier-parameter)
>
> The `identifier` is a user-generated key, not a system-issued `UUID`. It can
> be assigned to search an order and must be unique across all of the user’s
> orders. Once used, an `identifier` cannot be reused, regardless of the order’s
> status (filled, unfilled, or canceled).
>
> Submitting a duplicate identifier will result in an error. Always **generate a
> new unique`identifier` for each order request**.

> 🚧
>
> ###
>
> Market Price Order
>
> [](#market-price-order)
>
> For market price orders, please set the `ord_type` field to `price` or
> `market`.
>
> For purchase orders, set the `ord_type` to `price` and set the `volume` to
> `null` or exclude it completely.
>
> For sale orders, set the `ord_type` to `market` and set the `price` to `null`
> or exclude it completely.
>
> For market price orders, `ioc` and `fok` functions are not supported.

> 🚧
>
> ###
>
> Best Order
>
> [](#best-order)
>
> - Set `ord_type` field to `best`
> - Set `time_in_force` field to `ioc` or `fok`

> 🚧
>
> ###
>
> Ioc Limit Order & Fok Limit Order
>
> [](#ioc-limit-order--fok-limit-order)
>
> - Set `ord_type` field to `limit`
> - Set `time_in_force` field to `ioc` or `fok`

> 📘
>
> ###
>
> Post-Only and SMP (Self-Match Prevention) Features Added
> ([June 16, 2025 ~](/changelog/smp))
>
> [](#post-only-and-smp-self-match-prevention-features-added-june-16-2025-)
>
> - The post-only order condition
>
>   - You can now set `post_only` as a value for the `time_in_force` field.
>   - Only limit orders support the post-only condition and SMP is not supported
>     in post-only orders.
>
> - The [**SMP** (Self-Match Prevention)](/docs/smp) feature
>
>   - Introduced the `smp_type` field with the following options: `reduce`,
>     `cancel_maker`, `cancel_taker`

##

Response

[](#response)

| Field Name       | Description                                                                                                                                         | Type         |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| uuid             | Unique Order ID                                                                                                                                     | String       |
| side             | Order Type                                                                                                                                          | String       |
| ord_type         | Order Method                                                                                                                                        | String       |
| price            | Currency Price at the Time of Order                                                                                                                 | NumberString |
| state            | Order Status                                                                                                                                        | String       |
| market           | Market Unique Key                                                                                                                                   | String       |
| created_at       | Order Generation Time                                                                                                                               | String       |
| volume           | User Input Order Volume                                                                                                                             | NumberString |
| remaining_volume | Remaining Order Volume after Trade                                                                                                                  | NumberString |
| reserved_fee     | Ratio Reserved as Fees                                                                                                                              | NumberString |
| remaining_fee    | Remaining Fees                                                                                                                                      | NumberString |
| paid_fee         | Used Fees                                                                                                                                           | NumberString |
| locked           | Ratio being used in Transactions                                                                                                                    | NumberString |
| executed_volume  | Traded Volume                                                                                                                                       | NumberString |
| trades_count     | The number of Transactions in the order                                                                                                             | Integer      |
| time_in_force    | IOC, FOK, Post Only settings                                                                                                                        | String       |
| identifier       | User custom value for query\*Provided only for orders created after October 18, 2024                                                                | String       |
| smp_type         | SMP (Self-Match Prevention) Type                                                                                                                    | String       |
| prevented_volume | Total cancelled volume by SMP                                                                                                                       | NumberString |
| prevented_locked | (Buy) The amount canceled due to the Self-Match Prevention (SMP) setting.(Sell) The volume canceled due to the Self-Match Prevention (SMP) setting. | NumberString |

ord_type

string

required

Order Type

time_in_force

string

IOC, FOK, Post Only settings

smp_type

string

SMP (Self-Match Prevention) Type

# 201

## Query Parameters

| Parameter     | Type   | Required | Description                         |
| ------------- | ------ | -------- | ----------------------------------- |
| market        | string | Yes      | Market ID                           |
| side          | string | Yes      | Order Type                          |
| volume        | string | Yes      | Order Quantity                      |
| price         | string | Yes      | Order Price per Unit                |
| identifier    | string | No       | User Designated Value for Inquiries |
| Authorization | string | Yes      | Authorization token (JWT)           |
| uuid          | string | No       | side                                |
| state         | string | No       | market                              |
| locked        | string | No       | executed_volume                     |
| error         | object | No       | name                                |
| message       | string | No       | Updated about 2 months ago          |

201

object

string

ord_type

string

string

string

created_at

string

string

reserved_fee

string

remaining_fee

string

paid_fee

string

string

trades_count

integer

Defaults to 0

prevented_volume

string

prevented_locked

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

const crypto \= require('crypto')

4

const sign \= require('jsonwebtoken').sign

5

const queryEncode \= require("querystring").encode

6

​

7

const access_key \= process.env.UPBIT_OPEN_API_ACCESS_KEY

8

const secret_key \= process.env.UPBIT_OPEN_API_SECRET_KEY

9

const server_url \= process.env.UPBIT_OPEN_API_SERVER_URL

10

​

11

const body \= {

12

    market: 'SGD-BTC',

13

    side: 'bid',

14

    volume: '0.01',

15

    price: '100',

16

    ord\_type: 'limit',

17

}

18

​

19

const query \= queryEncode(body)

20

​

21

const hash \= crypto.createHash('sha512')

22

const queryHash \= hash.update(query, 'utf-8').digest('hex')

23

​

24

const payload \= {

25

    access\_key: access\_key,

26

    nonce: uuidv4(),

27

    query\_hash: queryHash,

28

    query\_hash\_alg: 'SHA512',

29

}

30

​

31

const token \= sign(payload, secret_key)

32

​

33

const options \= {

34

    method: "POST",

35

    url: server\_url + "/v1/orders",

36

    headers: {Authorization: \`Bearer \${token}\`},

37

    json: body

38

}

39

​

40

request(options, (error, response, body) \=> {

41

    if (error) throw new Error(error)

42

    console.log(body)

43

})

Updated about 2 months ago

---

> **Source:** [order](https://global-docs.upbit.com/reference/order)
