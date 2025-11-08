# Error Codes

## Error codes

| code | Description |
| --- | --- |
| 0 | Success |
| 10001 | Wrong request method, please check it's a GET or POST request |
| 10002 | Invalid ApiKey |
| 10003 | Sign doesn't match |
| 10004 | Illegal request parameters |
| 10005 | Request frequency exceeds the limit |
| 10006 | Unauthorized to execute this request |
| 10007 | IP address Unauthorized |
| 10008 | Timestamp for this request is invalid |
| 10009 | Unexist endpoint or misses ACCESS-KEY, please check endpoint URL |
| 10011 | ApiKey expired. Please go to client side to re-create an ApiKey. |
| 20002 | Trade of this trading pair is suspended |
| 20007 | Price precision error |
| 20008 | Amount precision error |
| 20009 | Amount is less than the minimum requirement |
| 20010 | Cash Amount is less than the minimum requirement |
| 20011 | Insufficient balance |
| 20012 | Invalid trade type (valid value: buy/sell) |
| 20013 | No order info found |
| 20014 | Invalid date (Valid format: 2018-07-25) |
| 20015 | Date exceeds the limit |
| 20018 | Your have been banned for API trading by the system |
| 20019 | Wrong trading pair symbol, correct format:"base\_quote", e.g. "btc\_usdt" |
| 20020 | You have violated the API trading rules and temporarily banned for trading. At present, we have certain restrictions on the user's transaction rate and withdrawal rate. |
| 20021 | Invalid currency |
| 20022 | The ending timestamp must be larger than the starting timestamp |
| 20023 | Invalid transfer type |
| 20024 | Invalid amount |
| 20025 | This currency is not transferable at the moment |
| 20026 | Transfer amount exceed your balance |
| 20027 | Abnormal account status |
| 20028 | Blacklist for transfer |
| 20029 | Transfer amount exceed your daily limit |
| 20030 | You have no position on this trading pair |
| 20032 | Withdrawal limited |
| 20033 | Wrong Withdrawal ID |
| 20034 | Withdrawal service of this crypto has been closed |
| 20035 | Withdrawal limit |
| 20036 | Withdrawal cancellation failed |
| 20037 | The withdrawal address, Tag or chain type is not included in the withdrawal management list |
| 20038 | The withdrawal address is not on the white list |
| 20039 | Can't be canceled in current status |
| 20040 | Withdraw too frequently; limitation: 3 times a minute, 100 times a day |
| 20041 | Beyond the daily withdrawal limit |
| 20042 | Current trading pair does not support API trading |
| 50000 | Exception error |