const mongoose = require('mongoose')

const groupSchema = new mongoose.Schema({
  name: String,
  image: String,
  tasks: [],
  users: Array,
})

module.exports = mongoose.model('Group', groupSchema)
