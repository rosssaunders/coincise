const DocProcessor = require('./doc_processor');

class PrivateREST extends DocProcessor {
  constructor() {
    super({
      endpoints: [
        'https://exchange-docs.crypto.com/exchange/v1/rest-ws/index.html#private-rest-endpoints'
      ],
      outputFile: 'crypto_com/private_rest_api.md',
      title: 'Crypto.com Private REST API Documentation'
    });
  }
}

module.exports = PrivateREST;
