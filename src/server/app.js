import Fastify from 'fastify';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import { config } from './config/index.js';
import apiRoutes from './routes/api.js';
import { salesforcePlugin } from './middleware/salesforce.js';

const fastify = Fastify();

// Register Swagger
await fastify.register(swagger, {
  openapi: {
    openapi: '3.0.1',
    info: {
      title: 'OpenAPI definition',
      version: 'v0'
    },
    servers: [
      {
        url: 'http://localhost:8080',
        description: 'Generated server url'
      }
    ],
    tags: [
      {
        name: 'Pricing Engine',
        description: 'Leverage dynamic pricing calculation logic and rules to calculate pricing information.'
      }
    ]
  },
  refResolver: {
    buildLocalReference (json, baseUri, fragment, i) {
      return json.$id || json.title;
    }
  }
});

// Register Swagger UI
await fastify.register(swaggerUi, {
  routePrefix: '/docs'
});

console.log('🚀 Registering Salesforce middleware...');
// Register Salesforce plugin
await fastify.register(salesforcePlugin);
console.log('✅ Salesforce middleware registered');

// Register routes
await fastify.register(apiRoutes, { prefix: '/api' });

// Start server
try {
  await fastify.ready();
  const address = await fastify.listen({ port: config.port });
  console.log('🌍 Server listening at', address);
} catch (err) {
  console.error('Failed to start server:', err);
  process.exit(1);
}

app.get('/record/:id', async (req, res) => {
  const recordId = req.params.id;
  // Use Salesforce REST API or other logic to fetch record
  const record = await getSalesforceRecord(recordId);
  res.json(record);
});

