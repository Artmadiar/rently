const db = require('../index')();
require('dotenv').config();

// email for admin user
let email = process.env.ADMIN_EMAIL;
if (!email) {
  email = 'admin@email.com';
}

db.user.findAll()
.then((users) => {
  if (users.length === 0) {
    return db.user.create({
      username: 'admin',
      email,
      phone: '+420',
      firstName: 'admin',
      lastName: 'admin',
      password: 'admin123456',
    });
  }
  return Promise.resolve(false);
})
.then((user) => {
  if (user) {
    console.log('New user was successfully created!');
    console.log(`Email: "${email}", password: "admin123456"`);
  }
  process.exit(0);
})
.catch(err => console.error(err));
