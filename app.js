const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const config = require('./config')
const db = require('./src/db')
const userRoutes = require('./src/routes/user.routes')

const app = express()

app.use(morgan('common'))
app.use(cors())
app.use(helmet())
app.use(express.json())

app.use('/api/users', userRoutes)

app.use((req, res, next) => {
    const error = new Error('Not found')
    error.status = 404
    next(error)
})

app.use((error, req, res, next) => {
    console.error(error)
    res.status(error.status || 500).json({ message: error.message })
})

const PORT = config.port

db.once('open', () => {
    console.log('Connected to database')
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`)
    })
})