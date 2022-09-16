require("dotenv").config()
const express = require('express')
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const app = express()
const port = process.env.PORT || 3000
const mongoUri = process.env.REACT_APP_MONGOURI
const apiRoutes = require("./api-routes")

app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())

app.use("/api", apiRoutes)

mongoose.connect(mongoUri, { useNewUrlParser: 
    true})

const db = mongoose.connection

if(!db)
    console.log("Error connecting db")
else
    console.log("Db connected successfully")

app.get('/', (req, res) => {
    res.send('Hello World!')
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

module.exports = app;
