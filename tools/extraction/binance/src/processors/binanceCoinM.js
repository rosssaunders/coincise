import { BaseProcessor } from './baseProcessor.js';

/**
 * Processor for Binance COIN-M Public REST API documentation
 * @extends BaseProcessor
 */
export class BinanceCoinMPublicRESTProcessor extends BaseProcessor {
    constructor() {
        super('binance', 'coinm.json', 'public_rest');
    }
}

/**
 * Processor for Binance COIN-M Private REST API documentation
 * @extends BaseProcessor
 */
export class BinanceCoinMPrivateRESTProcessor extends BaseProcessor {
    constructor() {
        super('binance', 'coinm.json', 'private_rest');
    }
}

/**
 * Processor for Binance COIN-M Public WebSocket API documentation
 * @extends BaseProcessor
 */
export class BinanceCoinMPublicWebSocketProcessor extends BaseProcessor {
    constructor() {
        super('binance', 'coinm.json', 'public_websocket');
    }
}

/**
 * Processor for Binance COIN-M Private WebSocket API documentation
 * @extends BaseProcessor
 */
export class BinanceCoinMPrivateWebSocketProcessor extends BaseProcessor {
    constructor() {
        super('binance', 'coinm.json', 'private_websocket');
    }
}
