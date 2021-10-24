const mongoose = require('mongoose')
const app = require('./app')
const dotenv = require('dotenv')
const cloudinary = require('cloudinary')


/// setting up confige file
if (process.env.NODE_ENV != "PRODUCTION") {
    dotenv.config({ path: 'server/config/.env' })
}



// Setting up cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})


// database and server connect
const dbName = process.env.DB_NAME
const dbPass = process.env.DB_PASS
const url = `mongodb+srv://${dbName}:${dbPass}@cluster0.ltldm.mongodb.net/shopIt?retryWrites=true&w=majority`
mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`Server Started on PORT ${process.env.PORT} in ${process.env.NODE_ENV}`)
            console.log('Database Connect Success')
        })

    })
    .catch((e) => {
        return console.log(e)
    })