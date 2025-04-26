'use strict'

import { BaseProcessor } from './baseProcessor.js'

export class PrivateWebsocketProcessor extends BaseProcessor {
  constructor() {
    super('private_websocket.json', 'Private WebSocket')
  }
}

export async function generatePrivateWebsocketDocs() {
  const processor = new PrivateWebsocketProcessor()
  await processor.generateDocs()
}
