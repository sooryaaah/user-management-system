const User = require('../model/users')
'use strict';

module.exports = {
  up: (models, mongoose) => {

    return models.User.insertMany([
      {
        _id:"68e756e88c35e68352cc94db",
        name: 'admin', 
        email: 'admin@gmail.com',
        userType:'admin',
        password: "$2a$10$tdxH/dQX.g0xa1EAkl6ltuvTl2WIGKrUtVn5wNKOWwi3LZIvMUkE2"
      }
    ])
  },

  down: (models, mongoose) => {
    return models.User.deleteMany({
        _id: { $in: [
          "68e756e88c35e68352cc94db"
        ] },
      })
  }
};
