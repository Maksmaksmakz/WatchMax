import http from "http"
import express from "express"
import bodyParser from "body-parser"
import mongoose from "mongoose"

import config from "./config"
import userController from "./controllers/userController"
import metaDataController from "./controllers/metaDataController"
import fcmTokenController from "./controllers/fcmTokenController"

const app = express()
app.server = http.createServer(app)

//middleware
app.use(bodyParser.json({
  limit: config.bodyLimit
}))

app.use("/api/v1/users", userController)
app.use("/api/v1/metaData", metaDataController)
app.use("/api/v1/firebaseToken", fcmTokenController)

//v1 routes
app.server.listen(config.port)
console.log(`server listening on: ${app.server.address().port}`)

const url = process.env.NODE_ENV === "development" ? config.mongoUrlDev : config.mongoUrlProd

mongoose.connect(url, (err) => {
    if (err)
        return console.error(err);
    console.log(`mongoose connected to ${url}`)
});

export default app
