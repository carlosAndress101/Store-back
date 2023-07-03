//import boom from '@hapi/boom'
const sequelize = require ('../libs/sequelize.js')
const { models } = sequelize;
class OrderService {

    async create (data) {
      
      const newOrder = await models.Order.create(data);
      return newOrder;
    }

    async addItem (data){
      const newItem = await models.Order_Product.create(data);
      return newItem;
    }

    async findByUser(userId){
        const res = await models.Order.findAll({
          where:{'$customer.users.id$':userId},
          include:[{association:'customer', include:['users']}]});
        return res;
    }

    async find(){
        const res = await models.Order.findAll();
        return res;
    }

    async findOne(id){
      const resOrder = await models.Order.findByPk(id, {
        include:[
          {
            association:'customer',
            include:['users']
          }
        ]
      });
      return resOrder
    }

    async update(id, changes){
      const order = await this.findOne(id);
      const rta = await order.update(changes);
      return rta;

    }

    async delete(id){
      const order = await this.findOne(id);
      const rta = await order.destroy();
      return rta;
    }
}

module.exports = OrderService;
