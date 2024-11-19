import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import envConfigs from '../config/config';

dotenv.config();

const env = process.env.NODE_ENV || 'development';
const config = envConfigs[env];

let sequelize;

if (config.url) {
  sequelize = new Sequelize(config.url, config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    ...config
  );
}

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (err) {
    console.error('Unable to connect to the database:', err);
    throw err;
  }
};

export { sequelize, testConnection };