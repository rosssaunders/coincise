# POST public/get-book

**Source:**
[public/get-book](https://exchange-docs.crypto.com/exchange/v1/rest-ws/index.html#public-get-book)

## Authentication

Not Required (Public Endpoint)

## public/get-book

> Request Sample

```
https://{URL}/public/get-book?instrument_name=BTCUSD-PERP&depth=10
```

> Response Sample

```
{
  "code":0,
  "method":"public/get-book",
  "result": {
    "depth": 10,
    "data": [{
      "asks": [
        ["50126.000000", "0.400000", "0"],
        ["50130.000000", "1.279000", "0"],
        ["50136.000000", "1.279000", "0"],
        ["50137.000000", "0.800000", "0"],
        ["50142.000000", "1.279000", "0"],
        ["50148.000000", "2.892900", "0"],
        ["50154.000000", "1.279000", "0"],
        ["50160.000000", "1.133000", "0"],
        ["50166.000000", "3.090700", "0"],
        ["50172.000000", "1.279000", "0"]
      ],
      "bids": [
        ["50113.500000", "0.400000", "0"],
        ["50113.000000", "0.051800", "0"],
        ["50112.000000", "1.455300", "0"],
        ["50106.000000", "1.174800", "0"],
        ["50100.500000", "0.800000", "0"],
        ["50100.000000", "1.455300", "0"],
        ["50097.500000", "0.048000", "0"],
        ["50097.000000", "0.148000", "0"],
        ["50096.500000", "0.399200", "0"],
        ["50095.000000", "0.399200", "0"]
      ]
    }],
    "instrument_name": "BTCUSD-PERP"
  }
}

```

Fetches the public order book for a particular instrument and depth.

### Request Params

| Name            | Type   | Required | Description                                  |
| --------------- | ------ | -------- | -------------------------------------------- |
| instrument_name | string | Y        | e.g. BTCUSD-PERP                             |
| depth           | string | Y        | Number of bids and asks to return (up to 50) |

### Applies To

REST

### REST Method

GET

### Response Attributes

| Name            | Type   | Description                                  |
| --------------- | ------ | -------------------------------------------- |
| instrument_name | string | e.g. BTCUSD-PERP                             |
| depth           | string | Number of bids and asks to return (up to 50) |
| data            | array  | See below                                    |

`data` consists of:

| Name | Type  | Description                                                           |
| ---- | ----- | --------------------------------------------------------------------- |
| bids | array | Bids array: \[0\] = Price, \[1\] = Quantity, \[2\] = Number of Orders |
| asks | array | Asks array: \[0\] = Price, \[1\] = Quantity, \[2\] = Number of Orders |

**Note**: Known issue: Number of Orders currently returns 0
