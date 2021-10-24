const express = require('express')
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')
const path = require('path')
const morgan = require("morgan")

// midlewares
const errorMiddleware = require('./midlewares/errors')
const {
    notFoundHandler,
    defaultErrorHandler
} = require("./midlewares/errorsMidleware")
const { bindUserWithReq } = require("./midlewares/authMidlewares")
    // Import all routers
const auth = require('./routers/authRouters')
const products = require('./routers/productRoutes')
const order = require('./routers/orderRouters')
const category = require("./routers/categoryRouters")


const midleware = [
    cors(),
    cookieParser(),
    fileUpload(),
    bindUserWithReq(),
    morgan("dev")
]

// applys midlewares
app.use(midleware)


app.use(bodyParser.urlencoded({ extended: false }))
    // parse application/json
app.use(bodyParser.json())

// use all routers
app.use('/api/user', auth)
app.use("/api/category", category)
app.use('/api/products', products);
app.use('/api', order)


if (process.env.NODE_ENV == "production") {
    app.use(express.static(path.join(__dirname, '../client/build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../client/build/index.html'))
    })
}

// // apply midleware
// app.use(errorMiddleware);

// 404 error handler
app.use(notFoundHandler)

// default error handler
app.use(defaultErrorHandler)


module.exports = app;