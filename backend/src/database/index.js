import Sequelize from 'sequelize';

import Product from '../app/models/Product';
import Type from '../app/models/Type';
import Brand from '../app/models/Brand';
import File from '../app/models/File';

import databaseConfig from '../config/database';

const models = [Product, Type, Brand, File];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
