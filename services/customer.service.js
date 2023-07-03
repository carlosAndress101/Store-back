const bcrypt = require('bcrypt');
const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class CustomerService {

  constructor(){}

  async find(){
    const rta = await models.customer.findAll({include: ['users']});
    return rta;
  }

  async findOne(id){
    const customer = await models.customer.findByPk(id);
    if(!customer){
      throw boom.notFound("Customer not found");
    }
    return customer;
  }

  async create(data){
    const hash = await bcrypt.hash(data.users.password, 10);
    const newData ={
      ...data,
      users:{
        ...data.users,
        password:hash
      }
    }
    const newCustomer = await models.customer.create(newData, {include: ['users']});
    delete newCustomer.dataValues.password
    return newCustomer;
  }

  async update(id, changes) {
    const customer = await this.findOne(id);
    const res = await customer.update(changes);
    return res;
  }

  async delete(id){
    const customer = await this.findOne(id);
    const rta = await customer.destroy();
    return rta;
  }
}

module.exports = CustomerService;
