# GET FAQ

**Source:** [FAQ](https://developer-pro.bitmart.com/en/futuresv2/)

**API Type:** Futures

## Authentication

Required (Private Endpoint)

## FAQ

Here are some frequently asked questions.

### Q1. Will different API KEY in the same account return different data?

Different API KEY data under the same account is the same.

### Q2. How to fill information in when applying for APIKEY?

1\. \`memo\` is provided by the user, it can be any string, used to confuse the
signature algorithm  
2\. Binding ip is optional, it is recommended to fill in for account security  
3\. API permissions can be checked according to user needs

### Q3. How is the HTTP status code 429 created?

The request interface exceeds the access frequency limit, it is recommended to
reduce the access frequency.

### Q4. Using ccxt, the API KEY is correctly filled in, but it will also prompt 'message': 'Header X-BM-SIGN is wrong'

The parameter uid of ccxt needs to be filled in as the memo when creating the
API  
Here is an example of initialization:

bitmart = ccxt.bitmart({  
'apiKey': 'your_api_key',  
'secret': 'your_api_secret',  
'uid': 'your_api_memo' // not your uid, is the api memo  
});

### Q5. The program I wrote myself always prompts 'message': 'Header X-BM-SIGN is wrong'

Please refer to [Quick Access API](/en/quick/#python-quick-start), select the
language you use, and there are correct signature methods for reference.

### Q6. Where is the location of BitMart servers?

We are using Google Cloud Services and deployed in Taiwan.

### Q7. When will the VIP fee I applied for take effect?

We will update on the 8th, 18th and 28th of every month.

### Q8. Why does it prompt "IP is forbidden. We recommend enabling IP whitelist for API trading. "

Because you set up an IP whitelist when creating the API, which means that this
API KEY can only send requests through this IP, and other IPs using this API KEY
will prompt that it is prohibited.  
Why set up: IP whitelist is a network security measure used to control who can
access specific network resources or services. If a whitelist IP is added, the
service will only accept API requests from that IP and reject API requests from
other IPs.
