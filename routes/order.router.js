const express = require('express');
const orderService = require('../services/order.service');
const validatorHandler = require('../middlewares/validator.handler');
const {  createOrderSchema, getOrderSchema, addItemSchema } = require('../schemas/order.schema');


/**Instancias*/
const router = express.Router();
const service = new orderService();


//endpoint de customer
router.get('/', async (req, res, next) => {
  try {
    const order = await service.find();
    res.json(order);
  } catch (error) {
    next(error);
  }
});

router.get('/:id',
validatorHandler(getOrderSchema, 'params'),
async (req, res, next) => {
  const { id } = req.params;
  try {
    const order = await service.findOne(id);
    res.json(order);
  } catch (error) {
    next(error);
  }
})

router.post('/',
  validatorHandler(createOrderSchema, 'body'),
  async (req, res, next) => {
  const body = req.body;
    try {
      const newOrder = await service.create(body);
      res.status(201).json(newOrder);
    } catch (error) {
      next(error)
    }
});


router.post('/addItem',
  validatorHandler(addItemSchema, 'body'),
  async (req, res, next) => {
  const body = req.body;
    try {
      const newItem = await service.addItem(body);
      res.status(201).json(newItem);
    } catch (error) {
      next(error)
    }
});


router.delete('/:id',
  validatorHandler(getOrderSchema, 'params'),
  async (req, res, next) =>{
    const { id } = req.params;
    try {
      const order = await service.delete(id);
      res.status(201).json(order);
    } catch (error) {
      next(error);
    }
});

module.exports = router;
