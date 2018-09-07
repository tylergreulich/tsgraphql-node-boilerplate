import * as Validator from 'validator';
import { User, AuthErrors } from '../interfaces/auth.interface';
import { isEmpty } from './is-empty';

import { createError } from 'apollo-errors';

export const validateRegister = (data: User) => {
  let errors: AuthErrors = {};

  data.username = !isEmpty(data.username) ? data.username : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.confirmPassword = !isEmpty(data.confirmPassword)
    ? data.confirmPassword
    : '';

  if (!Validator.isLength(data.username, { min: 2, max: 30 })) {
    errors.username = 'Username must be between 2 and 30 characters';
  }

  if (Validator.isEmpty(data.username)) {
    errors.username = 'Username field is required';
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  }

  if (Validator.isEmpty(data.confirmPassword)) {
    errors.confirmPassword = 'Confirm Password is required';
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'Password must be at least 6 characters';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }

  if (!Validator.equals(data.password, data.confirmPassword)) {
    errors.confirmPassword = 'Passwords must match';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
