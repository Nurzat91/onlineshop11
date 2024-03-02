import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import config from "./config";
import userRouter from './routers/user';
import productsRouter from './routers/product';
import categoriesRouter from './routers/categories';

const app = express();
const port = 8000;

app.use(express.static('public'));
app.use(cors());
app.use(express.json());

app.use('/users', userRouter);
app.use('/products', productsRouter);
app.use('/categories', categoriesRouter);

const run = async () => {

  await mongoose.connect(config.mongoose.db);

  app.listen(port, () => {
    console.log(`Server started on ${port} port!`);
  });

  process.on('exit', () => {
    mongoose.disconnect();
    console.log('disconnected!');
  });
};
void run();