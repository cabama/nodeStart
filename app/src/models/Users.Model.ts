// grab the things we need
import * as mongoose from 'mongoose'
import { Schema } from 'mongoose'

export interface UserModel extends mongoose.Document {
  name: string
  userId: string
  email: string
  password: string
  updateAt: Date
}

// create a schema
var userSchema = new Schema({
  name: String,
  userid: String,
  email: String,
  password: String
});

// the schema is useless so far
// we need to create a model using it
export let MdUser = mongoose.model<UserModel>('Users', userSchema);