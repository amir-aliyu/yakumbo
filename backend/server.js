require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const plantRoutes = require('./routes/plants')
const PORT = process.env.PORT

// express app
const app = express();

// middleware
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.use('/api/plants', plantRoutes)

// connect to db
mongoose.connect(process.env.ATLAS_URI)
    .then(() => {
        // listen for requests
        app.listen(PORT, () => {
            console.log(`successfully connected to db`)
            console.log(`listening on port ${PORT}`)
        })
    })
    .catch((error) => {
        console.log(error)
    })
