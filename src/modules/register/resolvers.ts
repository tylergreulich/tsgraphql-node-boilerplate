import { GQL } from '../../types/schema';
import { ResolverMap } from '../../types/graphql-utils';

import { validateRegister } from '../../validation/register';
import { UserInputError } from 'apollo-server-express';
import { signJwtToken } from '../../utils/signJwtToken';

import * as bcrypt from 'bcrypt';

export const resolvers: ResolverMap = {
  Query: { bye: () => 'Bye' },
  Mutation: {
    registerUser: async (root, args, { User }) => {
      const { errors, isValid } = await validateRegister(args);

      if (!isValid) {
        throw new UserInputError('Validation Error', errors);
      }

      const { username, email, password, confirmPassword, isAdmin } = args;

      const user = await User.findOne({ email });

      if (user) {
        errors.email = 'Email already exists';
        throw new UserInputError('Validation Error', errors);
      } else {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await new User({
          username,
          email,
          password: hashedPassword,
          isAdmin
        }).save();
        return signJwtToken(newUser);
      }
    }
  }
};
