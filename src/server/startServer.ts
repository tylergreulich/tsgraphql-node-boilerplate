import { ApolloServer, gql } from 'apollo-server-express';
import User from '../models/User';
import { schema } from './createSchema';
import { searchOriginalError } from '../utils/searchOriginalError';
import { app } from './serverMiddleware';
import { startWinstonLogger } from './startWinstonLogger';
import { startMongoDbConnection } from './startMongoDbConnection';
import * as winston from 'winston';

startWinstonLogger();

startMongoDbConnection();

export const startServer = () => {
  const server = new ApolloServer({
    schema,
    context: ({ req: { currentUser } }) => ({
      User,
      currentUser
    }),
    // Resolves the path to the errors object when using mergeSchemas()
    // mergeSchemas() ends up swallowing the error object before it's thrown
    formatError: error => searchOriginalError(error)
  });

  server.applyMiddleware({ app });

  const port = process.env.PORT || 4000;

  app.listen(port, () =>
    winston.info(`Server listening at localhost:${port}${server.graphqlPath}`)
  );

  return app;
};
