import { GQL } from '../../types/schema';
import { ResolverMap } from '../../types/graphql-utils';

import { UserInputError, AuthenticationError } from 'apollo-server-express';
import { validateLogin } from '../../../validation/login';
import { signJwtToken } from '../../utils/signJwtToken';

import * as bcrypt from 'bcrypt';

export const resolvers = {
  Query: {
    hi: () => 'Hi'
  },
  Mutation: {
    loginUser: async (root, args, { User }) => {
      const { errors, isValid } = await validateLogin(args);

      if (!isValid) {
        throw new UserInputError('Validation Error', errors);
      }

      const { email, password } = args;

      const user = await User.findOne({ email });

      if (!user) {
        errors.email = 'User does not exist';
        throw new UserInputError('Validation Error', errors);
      }

      const validPassword = await bcrypt.compare(password, user.password);

      if (!validPassword) {
        errors.password = 'Password is incorrect';
        throw new UserInputError('Validation Error', errors);
      } else {
        return signJwtToken(user);
      }
    }
  }
};
