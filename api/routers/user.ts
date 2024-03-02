import express from "express";
import User from "../models/User";
import mongoose from "mongoose";

const userRouter = express.Router();

userRouter.post('/', async (req, res, next) =>{
  try {
    const user = new User ({
      username: req.body.username,
      password: req.body.password,
      displayname: req.body.displayname,
      phonenumber: req.body.phonenumber,
    });

    user.generateToken();
    await user.save();
    return res.send({message: "Ok", user});
  }catch (e){
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(422).send(e);
    }
    next(e);
  }
});

userRouter.post('/sessions', async (req, res, next) =>{
  try {

    const user = await User.findOne({ username: req.body.username});

    if(!user){
      return res.status(422).send({error: 'Username not found!'});

    }

    const isMatch = await user.checkPassword(req.body.password);

    if(!isMatch){
      return res.status(422).send({error: 'Password is wrong!'});
    }

    user.generateToken();
    await user.save();

    return res.send({message: 'Username and password are correct!', user});
  }catch (e){
    next(e);
  }
});


userRouter.delete('/sessions', async (req, res, next) => {
  try {
    const headerValue = req.get('Authorization');
    const successMessage = { message: 'Success!' };

    if (!headerValue) {
      return res.send({ ...successMessage });
    }

    const [_bearer, token] = headerValue.split(' ');

    if (!token) {
      return res.send({ ...successMessage });
    }

    const user = await User.findOne({ token });

    if (!user) {
      return res.send({ ...successMessage });
    }

    user.generateToken();
    await user.save();

    return res.send({ ...successMessage });
  } catch (e) {
    return next(e);
  }
});

export default userRouter;