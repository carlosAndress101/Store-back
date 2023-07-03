const bcrypt = require('bcrypt');

const hashPass = async () => {
  const myPassword = 'admin1234';
  const hash = await bcrypt.hash(myPassword, 10);
  console.log(hash);
}

module.exports = {hashPass};

