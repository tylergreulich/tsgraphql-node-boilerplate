import * as mongoose from 'mongoose';
import { ApolloServer, gql } from 'apollo-server-express';
import User from '../models/User';
import { keys } from '../../config/keys';
import { schema } from './createSchema';
import { searchOriginalError } from '../utils/searchOriginalError';
import { app } from './serverMiddleware';

mongoose
  .connect(
    process.env.MONGODB_URI || keys.MONGO_URI,
    { useNewUrlParser: true }
  )
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err));

export const startServer = () => {
  const server = new ApolloServer({
    schema,
    context: ({ req: { currentUser } }) => ({
      User,
      currentUser
    }),
    // Resolves error directory when using mergeSchemas()
    // mergeSchemas() ends up swallowing the error object before it's thrown
    formatError: error => searchOriginalError(error)
  });

  server.applyMiddleware({ app });

  const port = process.env.PORT || 4000;

  app.listen(port, () =>
    console.log(`Server listening at localhost:${port}${server.graphqlPath}`)
  );

  return app;
};
