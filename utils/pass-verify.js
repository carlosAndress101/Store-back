const bcrypt = require('bcrypt');

const hashverify = async () => {
  const myPassword = 'admin123';
  const hash = '$2b$10$urxM9EBd1iy82jcsBsbU2.vXdN4tse3Uy48c3yGLzt7DIYKPNVqIa';
  const isMatch = await bcrypt.compare(myPassword, hash);
  console.log(isMatch);
}

module.exports = {hashverify};

