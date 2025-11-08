# Get Futures Transaction History Download Link by Id (USER_DATA)

### API Description

Get futures transaction history download link by Id

### HTTP Request

GET `/fapi/v1/income/asyn/id`

### Request Weight

**10**

### Request Parameters

| Name       | Type   | Mandatory | Description            |
| ---------- | ------ | --------- | ---------------------- |
| downloadId | STRING | YES       | get by download id api |
| recvWindow | LONG   | NO        |                        |
| timestamp  | LONG   | YES       |                        |

> - Download link expiration: 24h

### Response Example

> **Response:**

```json
{
  "downloadId": "545923594199212032",
  "status": "completed", // Enum：completed，processing
  "url": "www.binance.com", // The link is mapped to download id
  "notified": true, // ignore
  "expirationTimestamp": 1645009771000, // The link would expire after this timestamp
  "isExpired": null
}
```

> **OR** (Response when server is processing)

```json
{
	"downloadId":"545923594199212032",
  	"status":"processing",
  	"url":"",
  	"notified":false,
  	"expirationTimestamp":-1
  	"isExpired":null,

}
```

> Source:
> [https://developers.binance.com/docs/derivatives/usds-margined-futures/account/rest-api/Get-Futures-Transaction-History-Download-Link-by-Id](https://developers.binance.com/docs/derivatives/usds-margined-futures/account/rest-api/Get-Futures-Transaction-History-Download-Link-by-Id)
