const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  login: String,
  password: String,
  groups: []
})

module.exports = mongoose.model('User', userSchema)
