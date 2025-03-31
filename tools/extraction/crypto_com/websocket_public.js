const DocProcessor = require('./doc_processor');

class PublicWebsocket extends DocProcessor {
  constructor() {
    super({
      endpoints: [
        'https://exchange-docs.crypto.com/exchange/v1/rest-ws/index.html#public-websocket-for-market-data'
      ],
      outputFile: 'crypto_com/public_websocket_api.md',
      title: 'Crypto.com Public WebSocket API Documentation'
    });
  }
}

module.exports = PublicWebsocket;
