const express = require('express')
const morgan = require('morgan')
const app = express()
const connectDB = require('../server/db')
const todoRoutes = require('./routes/todoRoutes')
const cors = require('cors')

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

const allowed = ['http://localhost:3000', 'https://venny-todo-app.vercel.app']

app.use(
  cors({
    origin: (origin, callback) => {
      // allow requests with no origin (e.g. mobile apps, curl)
      if (!origin) return callback(null, true)
      if (allowed.includes(origin)) {
        return callback(null, true)
      }
      callback(new Error(`Origin ${origin} not allowed by CORS`))
    },
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
)
connectDB()
app.use(express.json())
app.use('/api/todos', todoRoutes)

if (require.main === module) {
  const port = process.env.PORT || 3000
  app.listen(port, () =>
    console.log(`Server running on http://localhost:${port}`)
  )
}
module.exports = app
