const bcrypt = require('bcrypt');
const boom = require('@hapi/boom');
const nodemailer = require('nodemailer');
const {config} = require('../config/config');
const UserService = require('./users.service');
const jwt = require('jsonwebtoken');


const {jwtSecret, email_send, password_send} = config;
const service = new UserService();

class AuthService {

  async getUser(email, password){
    //validation one
    const user = await service.findByEmail(email);
    if(!user){
      throw boom.unauthorized();
    };

    //validation two
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
      throw boom.unauthorized();
    };

    //response
    delete user.dataValues.password;
    delete user.dataValues.recoveryToken;
    return user;
  }

  async signToken(user){
      const payload = {
        sub: user.id,
        role:user.role
      };

      const token = jwt.sign(payload, jwtSecret);
      
      return {user, token};
  }

  async sendmail(infoMail){
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: email_send,
        pass: password_send,
      },
    });

    await transporter.sendMail(infoMail);
    return { message: `Mail sent`}
  }
  
  async sendRecovery(email){

    /**verify user */
    const user = await service.findByEmail(email);
    if(!user){
      throw boom.unauthorized();
    }

    /**devolvemos el token */
    const payload = {sub: user.id};
    const token = jwt.sign(payload, jwtSecret, {expiresIn:'10min'},);

    const linkFront = `http:myfronend.com/recovery?token=${token}`;
    await service.update(user.id, {recoveryToken: token});

    const mail = {
      from: `"web app support👻" <${email_send}>`, // sender address
      to: `${user.email}`, // list of receivers
      subject: 'Email to recovery password ✔', // Subject line
      html: `<h3>Visit is link for recovery password: ${linkFront}</h3>`, // html body
    }
    const rta = await this.sendmail(mail);
    return rta;
  }

  async changePassword(token, newPassword){
    try {
      /**verify token*/
      const payload = jwt.verify(token, jwtSecret)
      const user = await service.findOne(payload.sub);
      if(user.recoveryToken !== token){
        throw boom.unauthorized();
      }
      /**new password hash*/
      const hash = await bcrypt.hash(newPassword, 10);
      await service.update(user.id, {recoveryToken: null, password: hash});
      return {message: 'password changed'}
    } catch (error) {
      throw boom.unauthorized();
    }
  }
  
}


module.exports = AuthService;