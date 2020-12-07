require('dotenv').config()
const mongoose = require('mongoose')

const dbConnectionURL = `mongodb://localhost:27017/${process.env.DB_NAME}`
// const dbConnectionURL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.7kltq.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`

function dbConnect() {
  mongoose.connect(dbConnectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) return console.log(err)
    return console.log(`Success connected to ${process.env.DB_NAME} database`)
  })
}

module.exports = dbConnect
