const express = require('express'); 
const passport = require('passport');
const AuthService = require('../services/auth.service');



/**Instancias*/
const service = new AuthService();
const router = express.Router();

//endpoint de Auth.

router.post('/login',
  passport.authenticate('local', {session: false}),
  async (req, res, next) => {
    const user = req.user;
    try {  
      await service.signToken(user);
      res.status(201).json(await service.signToken(user))
    } catch (error) {
      next(error);
    }
});

router.post('/recovery',
  async (req, res, next) => {
    const { email } = req.body;
    try {
      const rta = await service.sendRecovery(email);
      res.json(rta)
    } catch (error) {
      next(error);
    }
});

router.post('/change-password',
  async (req, res, next) => {
    const { token, newPassword } = req.body;
    try {
      const rta = await service.changePassword(token, newPassword);
      res.json(rta)
    } catch (error) {
      next(error);
    }
});



module.exports = router;
