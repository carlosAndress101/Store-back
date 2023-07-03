const express = require('express'); 
const passport = require('passport');
const orderService = require('../services/order.service');



/**Instancias*/
const router = express.Router();
const service = new orderService();

//endpoint de Category.

router.get('/myorders',
  passport.authenticate('jwt', {session: false}),
  async (req, res, next) => {
    const user = req.user;
    try {
      const orders = await service.findByUser(user.sub);
      res.json(orders)
    } catch (error) {
      next(error);
    }
});



module.exports = router;
