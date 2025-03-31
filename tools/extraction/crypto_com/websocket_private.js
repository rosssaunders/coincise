const DocProcessor = require('./doc_processor');

class PrivateWebsocket extends DocProcessor {
  constructor() {
    super({
      endpoints: [
        'https://exchange-docs.crypto.com/exchange/v1/rest-ws/index.html#private-websocket-for-trading'
      ],
      outputFile: 'crypto_com/private_websocket_api.md',
      title: 'Crypto.com Private WebSocket API Documentation'
    });
  }
}

module.exports = PrivateWebsocket;
