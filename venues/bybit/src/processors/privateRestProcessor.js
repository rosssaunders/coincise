'use strict';

import { BaseProcessor } from './baseProcessor.js';

export class PrivateRestProcessor extends BaseProcessor {
  constructor() {
    super('private_rest.json', 'Private REST');
  }
}

export async function generatePrivateRestDocs() {
  const processor = new PrivateRestProcessor();
  await processor.generateDocs();
} 