const jwt = require('jsonwebtoken');


const secret = 'myDot';
const payload = {
  sub: 1,
  role:'customer'
}

const singToken = (payload, secret) =>{
  return jwt.sign(payload, secret);
}

const token = singToken(payload, secret);
console.log(token)