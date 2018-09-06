import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as mongoose from 'mongoose';
import * as cors from 'cors';
import * as jwt from 'jsonwebtoken';

import { ApolloServer, gql } from 'apollo-server-express';

import User from '../src/models/User';
import { keys } from '../config/keys';

import { schema } from './createSchema';
import { searchOriginalError } from './utils/searchOriginalError';

mongoose
  .connect(
    process.env.MONGODB_URI || keys.MONGO_URI,
    { useNewUrlParser: true }
  )
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err));

const app = express();

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true
};
app.use(cors(corsOptions));

interface IExpressRequest extends express.Request {
  currentUser: any;
}

app.use(async (req: IExpressRequest, res, next) => {
  const token = req.headers['authorization'];
  if (typeof token !== null && typeof token !== 'undefined') {
    try {
      const currentUser = await jwt.verify(token, keys.SECRET);
      req.currentUser = currentUser;
    } catch (error) {
      console.log(error);
    }
  }
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

export const startServer = () => {
  const server = new ApolloServer({
    schema,
    context: ({ req: { currentUser } }) => ({
      User,
      currentUser
    }),
    // Resolves error directory whe using mergeSchemas()
    // ... mergeSchemas() ends up swallowing the error object before it's thrown
    formatError: error => searchOriginalError(error)
  });

  server.applyMiddleware({ app });

  const port = process.env.PORT || 4004;

  app.listen(port, () =>
    console.log(`Server listening at localhost:${port}${server.graphqlPath}`)
  );

  return app;
};
