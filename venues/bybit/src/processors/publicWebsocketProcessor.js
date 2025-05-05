"use strict"

import { BaseProcessor } from "./baseProcessor.js"

export class PublicWebsocketProcessor extends BaseProcessor {
  constructor() {
    super("public_websocket.json", "Public WebSocket")
  }
}

export async function generatePublicWebsocketDocs() {
  const processor = new PublicWebsocketProcessor()
  await processor.generateDocs()
}
