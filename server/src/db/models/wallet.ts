'use strict';
import { Model } from 'sequelize';

interface walletAttributes {
  // userId: string;
  address: string;
  private_key: string;
  coin: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Wallet extends Model<walletAttributes> 
  implements walletAttributes {
    // userId!: string;
    address!: string;
    private_key!: string;
    coin!: string;

    static associate(models: any) {
      // define association here
      // Wallet.belongsTo(models.User)
    }
  }
  Wallet.init({
    address: {
      type: DataTypes.STRING,
      primaryKey: true,
      unique: true,
      allowNull: false
    },
    private_key: {
      type: DataTypes.STRING,
      allowNull: false
    },
    coin: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Wallet',
  });
  return Wallet;
};