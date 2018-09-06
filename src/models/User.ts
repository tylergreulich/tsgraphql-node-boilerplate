import * as jwt from 'jsonwebtoken';
import { Schema, Document, model } from 'mongoose';
import { User } from '../interfaces/auth.interface';
import { Response } from 'express';

const UserSchema: Schema = new Schema({
  username: {
    type: String,
    required: true,
    min: 2,
    max: 30
  },
  email: {
    type: String,
    required: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 30
  },
  date: {
    type: Date,
    default: Date.now
  }
});

export default model<User>('User', UserSchema);
