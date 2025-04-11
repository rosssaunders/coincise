import { BaseProcessor } from './baseProcessor.js';

/**
 * Processor for Binance Options Public REST API documentation
 * @extends BaseProcessor
 */
export class BinanceOptionsPublicRESTProcessor extends BaseProcessor {
    constructor() {
        super('binance', 'options.json', 'public_rest');
    }
}

/**
 * Processor for Binance Options Private REST API documentation
 * @extends BaseProcessor
 */
export class BinanceOptionsPrivateRESTProcessor extends BaseProcessor {
    constructor() {
        super('binance', 'options.json', 'private_rest');
    }
}

/**
 * Processor for Binance Options Public WebSocket API documentation
 * @extends BaseProcessor
 */
export class BinanceOptionsPublicWebSocketProcessor extends BaseProcessor {
    constructor() {
        super('binance', 'options.json', 'public_websocket');
    }
}

/**
 * Processor for Binance Options Private WebSocket API documentation
 * @extends BaseProcessor
 */
export class BinanceOptionsPrivateWebSocketProcessor extends BaseProcessor {
    constructor() {
        super('binance', 'options.json', 'private_websocket');
    }
}
