const express = require('express');
const passport = require('passport');
const { checkRoles } = require('../middlewares/auth.handler');
const CategorieService = require('../services/categories.service');
const validatorHandler = require('../middlewares/validator.handler');
const { createCategorySchema, updateCategorySchema, getCategorySchema} = require('../schemas/categories.schema');

/**Instancias*/
const router = express.Router();
const service = new CategorieService();

//endpoint de Category.
router.get('/', 
  passport.authenticate('jwt', {session: false}),
  checkRoles('admin', 'customer'),
  async (req, res, next) => {
  try {
    const categories = await service.find();
    res.json(categories);
  } catch (error) {
    next(error);
  }
});

router.get('/:id',
  passport.authenticate('jwt', {session: false}),
  checkRoles('admin', 'customer'),
  validatorHandler(getCategorySchema, 'params'),
  async (req, res, next) => {
    const { id } = req.params;
    try {
      const category = await service.findOne(id);
      res.json(category);
    } catch (error) {
      next(error);
    }
});

router.post('/',
  passport.authenticate('jwt', {session: false}),
  checkRoles('admin'),
  validatorHandler(createCategorySchema, 'body'),
  async (req, res, next) => {
    const body = req.body;
    try {
      const newCategory = await service.create(body);
      res.status(201).json(newCategory);
    } catch (error) {
      next(error);
    }
});

router.patch('/:id',
  passport.authenticate('jwt', {session: false}),
  checkRoles('admin'),
  validatorHandler(getCategorySchema, 'params'),
  validatorHandler(updateCategorySchema, 'body'),
  async (req, res, next) => {
    const { id } = req.params;
    const body = req.body;
    try {
      const category = await service.update(id, body);
      res.json(category);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id',
  passport.authenticate('jwt', {session: false}),
  checkRoles('admin'),
  validatorHandler(getCategorySchema, 'params'),
  async (req, res, next) => {
    const { id } = req.params;
    try {
      const category = await service.delete(id);
      res.json(category);
    } catch (error) {
      next(error);
    }
});

module.exports = router;
