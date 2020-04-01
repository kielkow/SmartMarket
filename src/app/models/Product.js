import Sequelize, { Model } from 'sequelize';

class Product extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        type_id: Sequelize.INTEGER,
        brand_id: Sequelize.INTEGER,
        file_id: Sequelize.INTEGER,
        price: Sequelize.STRING,
        amount: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Type, {
      foreignKey: 'type_id',
      as: 'type',
    });
    this.belongsTo(models.Brand, {
      foreignKey: 'brand_id',
      as: 'brand',
    });
    this.belongsTo(models.File, {
      foreignKey: 'file_id',
      as: 'file',
    });
  }
}

export default Product;
