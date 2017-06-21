import http from "http"
import express from "express"
import bodyParser from "body-parser"
import mongoose from "mongoose"

import config from "./config"
import userController from "./controllers/userController"

const app = express()
app.server = http.createServer(app)

//middleware
app.use(bodyParser.json({
  limit: config.bodyLimit
}))

//config
const port = 8000

app.use("/users", userController)

//v1 routes
app.server.listen(config.port)
console.log(`server listening on: ${app.server.address().port}`)

mongoose.connect(config.mongoUrl)

export default app
