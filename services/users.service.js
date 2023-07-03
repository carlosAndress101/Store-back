const bcrypt = require('bcrypt');
const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
class UserService {

  async create(data) {
    const hash = await bcrypt.hash(data.password, 10);
    const newUser = await models.users.create({ ...data, password:hash });
    delete newUser.dataValues.password;
    return newUser;
  }

  async find() {
    const res = await models.users.findAll({include: ['customer']});
    return res;
  }

  /**consumed by local-strategy*/
  async findByEmail(email) {
    const res = await models.users.findOne({where:{email}});
    return res;
  }

  async findOne(id) {
    const user = await models.users.findByPk(id);
    if(!user){
      throw boom.notFound('User not found');
    }
    return user;
  }

  async update(id, changes) {
    const user = await this.findOne(id);
    const res = await user.update(changes);
    return res;

  }

  async delete(id) {
    const user = await this.findOne(id);
    const rta = await user.destroy();
    return rta;
  }
}

module.exports = UserService;
