# Order List Cancel

##

Request Parameters

[](#request-parameters)

| Name            | Description                                                                                                                        | Type          |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| uuids[]\*       | List of order uuids (Max. 20)                                                                                                      | Array[String] |
| identifiers[]\* | List of order identifiers (Max. 20)\*Either uuids or identifiers field is required, and you cannot use both fields simultaneously. | Array[String] |

> ❗️
>
> This API only accepts the query parameter format. Please note that requesting
> with body is not supported.

##

Response

[](#response)

| 필드                      | 설명                                                                                 | 타입          |
| ------------------------- | ------------------------------------------------------------------------------------ | ------------- |
| success                   | information of orders successfully requested for cancellation                        | Object        |
| success.count             | The number of orders successfully requested for cancellation                         | Number        |
| success.orders            | List of the orders successfully requested for cancellation                           | Array[Object] |
| success.orders.uuid       | UUID of the order                                                                    | String        |
| success.orders.identifier | User custom value for query\*Provided only for orders created after October 18, 2024 |               |
| success.orders.market     | Market pair of the order                                                             | String        |
| failed                    | information of orders failed to request for cancellation                             | Object        |
| failed.count              | The number of orders failed to request for cancellation                              | Number        |
| failed.orders             | List of the orders failed to request for cancellation                                | Array[Object] |
| failed.orders.uuid        | UUID of the order                                                                    | String        |
| failed.orders.identifier  | User custom value for query\*Provided only for orders created after October 18, 2024 | String        |
| failed.orders.market      | Market pair of the order                                                             | String        |

> ❗️
>
> ###
>
> Cancellation Failure
>
> [](#cancellation-failure)
>
> Cancellation requests could fail for some orders due to reasons such as the
> order already being completely filled or canceled before the request, or
> temporary market suspension (rebranding, etc).

uuids\[\]

string

required

List of Order uuids

identifiers\[\]

string

required

List of Order identifiers

# 200

## Query Parameters

| Parameter     | Type   | Required | Description               |
| ------------- | ------ | -------- | ------------------------- |
| Authorization | string | Yes      | Authorization token (JWT) |
| success       | object | No       | count                     |
| orders        | object | No       | uuid                      |
| market        | string | No       | failed                    |
| error         | object | No       | name                      |
| message       | string | No       | Updated 3 months ago      |

200

object

integer

Defaults to 0

orders

array of objects

string

object

# 400

400

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

const querystring \= require("querystring")

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

const params \= {

12

    'uuids\[\]': \[

13

        '6c1eac69-b9bc-4fbf-9982-e9c4641c453f',

14

        'e7f41e24-7199-4cf4-9b02-72971cb69a4d',

15

        '1fc8d0bb-95c2-4116-96d8-6e2aa82200ba',

16

        '34c52f5d-e4c8-4217-a6a8-0f7a06bf4c63',

17

        '5767ea2c-451b-47f4-8a3d-009a5e08db5e',

18

    \],

19

}

20

​

21

const queryParams \= querystring.unescape(querystring.encode(params))

22

​

23

const hash \= crypto.createHash('sha512')

24

const queryHash \= hash.update(queryParams, 'utf-8').digest('hex')

25

​

26

const payload \= {

27

    access\_key: access\_key,

28

    nonce: uuidv4(),

29

    query\_hash: queryHash,

30

    query\_hash\_alg: 'SHA512',

31

}

32

​

33

const token \= sign(payload, secret_key)

34

​

35

const options \= {

36

    method: "DELETE",

37

    url: server\_url + \`/v1/orders/uuids?\${queryParams}\`,

38

    headers: {Authorization: \`Bearer \${token}\`},

39

}

40

​

41

request(options, (error, response, body) \=> {

42

    if (error) throw new Error(error)

43

    console.log(body)

44

})

Updated 3 months ago

---

> **Source:**
> [order-list-cancel](https://global-docs.upbit.com/reference/order-list-cancel)
