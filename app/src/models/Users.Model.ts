// grab the things we need
import * as mongoose from 'mongoose'
import { Schema } from 'mongoose'

export enum AccountOrigin {
  'local' = 'LOCAL',
  'google' = 'GOOGLE'
}

export enum AccountRole {
  'admin' = 'admin',
  'slave' = 'slave'
}

export interface UserModel extends mongoose.Document {
  avatar: string
  name: string
  userId: string
  email: string
  password: string
  updateAt: Date
  role: AccountRole
  origin: AccountOrigin
}

// create a schema
var userSchema = new Schema({
  avatar: String,
  name: String,
  userid: String,
  email: String,
  password: {
    type: String,
    select: false
  },
  origin: String,
  role: String
});

// the schema is useless so far
// we need to create a model using it
export let MdUser = mongoose.model<UserModel>('Users', userSchema);