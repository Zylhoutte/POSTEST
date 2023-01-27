const bcrypt = require('bcryptjs')

const admins = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
]

module.exports = admins
