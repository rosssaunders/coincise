const DocProcessor = require('./doc_processor');

class PublicREST extends DocProcessor {
  constructor() {
    super({
      endpoints: [
        'https://exchange-docs.crypto.com/exchange/v1/rest-ws/index.html#public-rest-endpoints'
      ],
      outputFile: 'crypto_com/public_rest_api.md',
      title: 'Crypto.com Public REST API Documentation'
    });
  }
}

module.exports = PublicREST;
