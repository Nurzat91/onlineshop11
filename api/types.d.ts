import {Model} from 'mongoose';

export interface UserFields {
  username: string;
  displayname: string;
  password: string;
  token: string;
  phonenumber: number;
}
interface UserMethods{
  checkPassword(password: string): Promise<boolean>;
  generateToken(): void;
}

type UserModel = Model<UserFields, {}, UserMethods>;