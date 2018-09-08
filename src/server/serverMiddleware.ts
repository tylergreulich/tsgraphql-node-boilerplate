import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as cors from 'cors';
import * as jwt from 'jsonwebtoken';
import * as winston from 'winston';
import { keys } from '../../config/keys';

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
      winston.error(error);
    }
  }
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

export { app };
