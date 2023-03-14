import postgres from 'postgres'
import { config } from '../app.config.js';
import Sequelize from 'sequelize';

export default new Sequelize(config.connect.dbName,
  config.connect.user, config.connect.password, {
    ...config.connect.options,
  })
