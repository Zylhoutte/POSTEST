const bcrypt = require('bcryptjs')

const users = [

  {
    name: 'John Doe',
    email: 'john@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Jane Doe',
    email: 'jane@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Gian Carlo',
    email: 'gian@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
 
]

module.exports = users
