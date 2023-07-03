const express = require('express');
const userService = require('../services/users.service');
const validatorHandler = require('../middlewares/validator.handler');
const { createUserSchema, updateUserSchema, getUserSchema } = require('../schemas/users.schema');


/**Instancias*/
const router = express.Router();
const service = new userService();


//endpoint de users.
router.get('/', async (req, res, next) => {
  try {
    const users = await service.find();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

router.get('/:id',
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    const { id } = req.params;
    try {
      const users = await service.findOne(id);
      res.json(users);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
  validatorHandler(createUserSchema, 'body'),
  async (req, res, next) => {
    const body = req.body;
    try {
      const newUser = await service.create(body);
      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id',
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  async (req, res, next) => {

    const { id } = req.params;
    const body = req.body;

    try {
      const user = await service.update(id, body);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id',
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    const { id } = req.params;
    try {
      const user = await service.delete(id);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
