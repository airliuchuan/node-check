var user = require('../schema/user.js')
var mongoose = require('mongoose')

var User = mongoose.model('User', user)

module.exports = User
