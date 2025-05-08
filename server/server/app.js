const express = require('express')
const morgan = require('morgan')
const app = express()
const connectDB = require('../server/db')
const todoRoutes = require('./routes/todoRoutes')
const cors = require('cors')

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

connectDB()
app.use(express.json())
app.use('/api/todos', todoRoutes)
app.use(cors({ origin: 'http://localhost:3000' }))

if (require.main === module) {
  const port = process.env.PORT || 3000
  app.listen(port, () =>
    console.log(`Server running on http://localhost:${port}`)
  )
}
module.exports = app
