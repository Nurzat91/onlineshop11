import mongoose from 'mongoose';
import config from './config';
import Category from './models/Category';
import Product from './models/Product';
import User from './models/User';
import crypto from 'crypto';

const dropCollection = async (db: mongoose.Connection, collectionName: string) =>{
  try {
    await db.dropCollection(collectionName);
  }catch (e){
    console.log(`Collection ${collectionName} was missing, skipping drop...`);
  }
};
const run = async () => {
  await mongoose.connect(config.mongoose.db);
  const db = mongoose.connection;

  const collections = ['categories', 'products', 'users'];

  for (const collectionName of collections){
    await dropCollection(db, collectionName);
  }

  await User.create({
    username: 'User',
    password: '123',
    displayName: 'Sun',
    phoneNumber: '1234567',
    token: crypto.randomUUID(),
  });

  const [firstCategory, secondCategory, thirdCategory, fourthCategory] = await Category.create(
    {title: 'All items',},
    {title: 'Cars',},
    {title: 'Moto',},
    {title: 'Other',},
  );

  await Product.create(
    {
      title: 'Ford Mustang Convertible Black',
      description: 'Аренда Ford Mustang Convertible Black',
      price: 2350000,
      category: firstCategory, secondCategory,
      image: 'fixtures/car1.jpg',
    },
    {
      title: 'Ford Mustang Shelby',
      description: 'Ford Mustang Shelby II поколениe',
      price: 1350000,
      category: firstCategory, secondCategory,
      image: 'fixtures/car2.jpg',
    },
    {
      title: 'Мотоциклы Harley-Davidson',
      description: 'Мотоциклы Harley-Davidson – тяжелая техника от американского бренда',
      price: 950000,
      category: firstCategory, thirdCategory,
      image: 'fixtures/moto2.jpg',
    },
    {
      title: 'Kawasaki Z900RS SE',
      description: 'Мотоциклы Kawasaki Z900RS SE',
      price: 750000,
      category: firstCategory, thirdCategory,
      image: 'fixtures/moto1.jpg',
    },
    {
      title: 'Galeon 640 FLY',
      description: 'Моторная яхта Galeon 640 FLY',
      price: 1350000,
      category: firstCategory, fourthCategory,
      image: 'fixtures/other1.jpg',
    },
    {
      title: 'Africa ',
      description: 'Мега-яхты Africa ',
      price: 750000,
      category: firstCategory, fourthCategory,
      image: 'fixtures/other2.jpg',
    },

  );

  await db.close();
};

void run();