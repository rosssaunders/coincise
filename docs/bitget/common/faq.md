# FAQ

*   Q1： How to get API support?
    
    A : Join our official API support group and our admins will answer your questions. [https://t.me/bitgetOpenapi](https://t.me/bitgetOpenapi)
    
*   Q2: Order parameter `symbol` What should I pass? For example, BTCUSDT\_UMCBL or BTCUSDT ?
    
    A : `BTCUSDT` in 'v2' API, `BTCUSDT_UMCBL` in 'v1' API
    
*   Q3 : What does the WebSocket parameter `instId` pass? For example, BTCUSDT\_UMCBL or BTCUSDT ?
    
    A : `BTCUSDT` or `default`; Please refer to the `symbol` value from [Get Contract Config](/api-doc/contract/market/Get-All-Symbols-Contracts)
    
*   Q4： Deposit Demo Coins in Demo Trading ?
    
    *   A :First please enter the official site for demo trading
    
    On the right side under your Asset section, click the deposit buttun below it.  
    Notice:You can only claim again 72 hour(s) after your last claim.
    
*   Q5： What are the differences of Trader's minimum open count from normal users ?
    
    *   A :  
        Future Trader's minimum open count Please refer to the response param minOpenCount of this endpoint [Get Copy Trade Symbol Settings](/api-doc/copytrading/future-copytrade/trader/Trader-Get-Config-Query-Symbols)  
        Spot Trader's minimum open count Please refer to the response param minOpenCount of this endpoint [Get Copytrade Configuration](/api-doc/copytrading/spot-copytrade/trader/Config-Query-Settings).
*   Q6： How to get future's maximum order numbers and position numbers ?
    
    *   A : Please refer to the response params maxProductOrderNum maxPositionNum of this endpoint [Get Contract Config](/api-doc/contract/market/Get-All-Symbols-Contracts).
*   Q7： How to know that you are a trader ？
    
    *   A : Please refer to the response param traderType of this endpoint GET /api/v2/spot/account/info.[Get Account Information](/api-doc/spot/account/Get-Account-Info)
*   Q8: I am using a third party server/codes and it is not working. How can I get help?
    
    *   A: Unfortunately, we do not provide troubleshooting support for third party servers or tools, please contact the third party customer service for further assistance. In addition, providing your API keys/keys to any other platform will have portential security risk, and it is up to you to decide whether to use their services. Please note that we do not provide coding related help.
*   Q9: If I forget the passphrase of API key, What should I do?
    
    *   A: The passphrase of API Key can not be modified, please recreate your API Key.
*   Q10: What is the rate limit of API?
    
    *   A: 1. The rate limit of each API endpoint is marked on the doc page;2. The rate limit of each API interface is calculated independently;3. The overall rate limit is 6000/IP/Min,After the rate limit is triggered, it takes 5 minutes to recover.
*   Q11: How can I find out the remaining rate limit per second for the API?
    

A: Please refer to the `x-mbx-used-remain-limit` parameter in the response header.

*   Q12: Is there any currency with a different name in the spot market and the future market?
    
    *   A: Yes, currently there are three currencies with this situation. 1.Luna2(Future) — Luna(Spot) 2.ALT(Future) — $ALT(Spot) 3.MEME(Future) — MEMECOIN(Spot)
*   Q13: Which characters are supported for clientOid?
    
    *   A: clientOid supports \[0-9\], \[a-z\],\[A-Z\] and \[-,+,\_,#\], length less than 50
*   Q14: Is there a fixed regular release data for backend?
    
    *   A: Yes.The current fixed regular release date for backend is **every Tuesday, Wednesday, and Thursday from 14:00 PM to 17:00 PM (UTC +8)**(Except for emergency upgrade). During the regular release time window, the RestAPI may return 45001, 40725, 40808 or 40015 error responses. Users can retry after receiving these error responses. WebSocket connections may be disconnected during the release period. WebSocket users are advised to implement a reconnection mechanism in their code.

> **Source:** https://www.bitget.com/api-doc/common/faq
