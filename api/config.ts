import path from 'path';

const rootPath = __dirname;

const config = {
  rootPath,
  publicPath: path.join(rootPath, 'public'),
  mongoose: {
    // db: 'mongodb://localhost/onlineshop',
    db: "mongodb://127.0.0.1:27017/onlineshop",
  }
};

export default config;