import express from "express"
const router = express.Router()
import bodyParser from "body-parser"

import FcmToken from "../models/fcmToken"

// POST "api/v1/fcmToken" - Create token
router.post("/", (req, res) => {
  console.log("post request to FcmToken")
  const token = new FcmToken()
  token.token = req.body.token

  token.save(err => {
    if(err){
      res.send(err)
    }
    res.json({message: "token created"})
  })
})

// GET "api/v1/fcmToken" - Get tokens
router.get("/", (req, res) => {
  console.log("get request to metaData")
  FcmToken.find({}, (err, tokens) => {
    if(err){
      res.status(500).send(`Couldn get users Error: ${err}`)
      return
    }
    res.json(tokens)
  })
})

module.exports = router
