//const express = require('express');
const {Op} = require('sequelize')
const boom = require('@hapi/boom')
const { models } = require('./../libs/sequelize')

class ProductsService {

  constructor() {}


  async create(data) {
    const newProduct = await models.product.create(data);
    return newProduct;
  }

  async find(query) {
    //Pagination en mi API dinamica
    const options = { include:['category'], where:{} };

    /**Limit and Offset */
    const {limit, offset} = query;

    if(limit && offset){
      options.limit = limit;
      options.offset = offset;
    }

    /**calculate price */
    const { price } = query;
    if(price){
      options.where.price = price;
    }

    /**calculate price min and max */
    const { price_min, price_max } = query;
    if(price_min && price_max){
      options.where.price = {
        [Op.gte]: price_min,
        [Op.lte]: price_max
      };
    }
    const products = await models.product.findAll(options);
    return products;
  }

  async findOne(id) {
    const product = models.product.findByPk(id);
    if(!product){
      throw boom.notFound('Product not found')
    }
    return product;
  }

  async update(id, changes) {

    const product = await this.findOne(id);
    const rta = await product.update(changes);
    return rta;
  }

  async delete(id) {

    const product = await this.findOne(id);
    const rta = await product.destroy();
    return rta;
  }
}

module.exports = ProductsService
