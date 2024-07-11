import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'User API',
      version: '1.0.0',
      description: 'API para gestionar usuarios',
    },
  },
  apis: ['./src/controllers/*.ts'],
};

const swaggerSpec = swaggerJsdoc(options);

const swaggerDocs = (app: Express) => {
  app.use(
    `/${process.env.SWAGGER_URL}`,
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec),
  );
};

export default swaggerDocs;
