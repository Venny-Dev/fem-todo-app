const dotenv = require('dotenv')
const path = require('path')
dotenv.config({ path: path.join(__dirname, '../config.env') })

const mongoose = require('mongoose')
// console.log(process.env)
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
)

module.exports = () =>
  mongoose
    .connect(DB)
    .then(() => console.log('DB connection successful'))
    .catch(err => console.log(err))
