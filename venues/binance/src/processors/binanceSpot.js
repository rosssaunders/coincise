import { BaseProcessor } from './baseProcessor.js';

/**
 * Processor for Binance Spot Public REST API documentation
 * @extends BaseProcessor
 */
export class BinanceSpotPublicRESTProcessor extends BaseProcessor {
    constructor() {
        super('binance', 'spot.json', 'public_rest');
    }
}

/**
 * Processor for Binance Spot Private REST API documentation
 * @extends BaseProcessor
 */
export class BinanceSpotPrivateRESTProcessor extends BaseProcessor {
    constructor() {
        super('binance', 'spot.json', 'private_rest');
    }
}

/**
 * Processor for Binance Spot Public WebSocket API documentation
 * @extends BaseProcessor
 */
export class BinanceSpotPublicWebSocketProcessor extends BaseProcessor {
    constructor() {
        super('binance', 'spot.json', 'public_websocket');
    }
}

/**
 * Processor for Binance Spot Private WebSocket API documentation
 * @extends BaseProcessor
 */
export class BinanceSpotPrivateWebSocketProcessor extends BaseProcessor {
    constructor() {
        super('binance', 'spot.json', 'private_websocket');
    }
}

/**
 * Processor for Binance Spot FIX API documentation
 * @extends BaseProcessor
 */
export class BinanceSpotFIXProcessor extends BaseProcessor {
    constructor() {
        super('binance', 'spot.json', 'fix');
    }
}

/**
 * Processor for Binance Spot SBE API documentation
 * @extends BaseProcessor
 */
export class BinanceSpotSBEProcessor extends BaseProcessor {
    constructor() {
        super('binance', 'spot.json', 'sbe');
    }
}