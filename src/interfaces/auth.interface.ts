import { Document } from 'mongoose';
import { Response } from 'express';
import { IPayload } from './payload.interface';

export interface User extends Document {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  isAdmin: boolean;
}

export interface AuthErrors {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}
