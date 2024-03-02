import {Model} from 'mongoose';

export interface UserFields {
  username: string;
  displayName: string;
  password: string;
  token: string;
  phoneNumber: string;
}
interface UserMethods{
  checkPassword(password: string): Promise<boolean>;
  generateToken(): void;
}

type UserModel = Model<UserFields, {}, UserMethods>;