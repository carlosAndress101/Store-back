const { Model, DataTypes, Sequelize } = require('sequelize')

const USER_TABLE = 'users'

const userSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  recoveryToken: {
    field:'recovery_token',
    allowNull: true,
    type: DataTypes.STRING,
  },
  role: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: 'customer'
  },
  createAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW,
  },
}

class User extends Model {
  static associate(models) {
    this.hasOne(models.customer, {as:'customer', foreignKey:'usersId'});
  }

  static config(sequelize) {
    return {
      sequelize,
      tablaName: USER_TABLE,
      modelName: 'users',
      timestamps: false,
    }
  }
}

module.exports = { USER_TABLE, userSchema, User };
