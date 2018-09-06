import * as Validator from 'validator';
import { User, AuthErrors } from '../interfaces/auth.interface';
import { isEmpty } from './is-empty';

export const validateLogin = (data: User) => {
  let errors: AuthErrors = {};

  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }

  return { errors, isValid: isEmpty(errors) };
};
