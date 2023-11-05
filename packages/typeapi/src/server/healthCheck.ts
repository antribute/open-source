import { output } from '@antribute/typecli';
import type { Hono } from 'hono';

import type { Config } from 'config';

export const createHealthCheckEndpoint = (config: Config, server: Hono) => {
  if (!config.healthCheck.enabled) {
    output.debug('Health Check Endpoint Disabled in Config, Skipping Creation');
    return;
  }
  output.debug('Creating Health Check Endpoint at /health');
  server.get('/health', (c) => c.json({ status: 'Healthy', typeApiVersion: '0.1.0' }));
};
