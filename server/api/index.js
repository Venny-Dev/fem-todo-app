const serverless = require('serverless-http')
const connectDB = require('../server/db') // ① import your DB-connector
const app = require('../server/app') // ② your express app

// ① Connect to MongoDB on cold start
connectDB()

// ② Export the wrapped app
module.exports = serverless(app)
