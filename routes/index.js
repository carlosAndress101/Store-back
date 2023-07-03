const express = require('express');
const productsRouter = require('./products.Router');
const usersRouter = require('./users.Router')
const categoriesRouter = require('./categories.router');
const orderRouter = require('./order.router');
const customerRouter = require('./customer.Router');
const authRouter = require('./auth.router');
const profileRouter = require('./profile.router');

function routerApi(app) {
    const router = express.Router();
    //podemos globalizar una version de esta forma.
    app.use('/api/v1', router);
  router.use('/products', productsRouter);
  router.use('/users', usersRouter);
  router.use('/categories', categoriesRouter);
  router.use('/order', orderRouter);
  router.use('/customers', customerRouter);
  router.use('/auth', authRouter);
  router.use('/profile', profileRouter);
}
module.exports = routerApi;
