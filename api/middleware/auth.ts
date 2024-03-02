import {Request, Response, NextFunction} from 'express';
import {HydratedDocument} from 'mongoose';
import {UserFields} from '../types';
import User from '../models/User';

export interface RequestWithUser extends Request {
  user?: HydratedDocument<UserFields>;
}
const auth = async (req: RequestWithUser, res: Response, next: NextFunction) => {

  const request = req as RequestWithUser;

  const token = request.get('Authorization');

  if (!token) {
    return res.status(401).send({error: 'No token or Authorization header present'});
  }

  const user = await User.findOne({token});

  if (!user) {
    return res.status(401).send({error: 'Wrong token!'});
  }

  req.user = user;

  return next();
};

export default auth;