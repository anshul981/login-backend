const mongoose = require('mongoose');

let Users = mongoose.model('Users', {
    username: { type: String },
    password: { type: String },
});

module.exports = Users;
