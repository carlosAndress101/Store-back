const jwt = require('jsonwebtoken');


const secret = 'myDot';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTY4ODIwNTc3MH0.1bVMcV2LWUybWLVCVfAYC1vP5lnJQAahh1aOUvzxIu4';


const verifyToken = (token, secret) =>{
  return jwt.verify(token, secret);
}

const payload = verifyToken(token, secret);
console.log(payload)