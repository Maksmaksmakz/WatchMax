import express from "express"
const router = express.Router()
import bodyParser from "body-parser"

import User from "../models/user"

router.post("/", (req, res) => {
  console.log("post request")
  const newUser = new User()
  console.log(req.body)
  newUser.name = req.body.name
  newUser.status = req.body.status
  newUser.energyLevel = req.body.energyLevel
  newUser.position.coordinates = req.body.position.coordinates
  console.log(newUser.position.coordinates)

  newUser.save(err => {
    if(err){
      res.send(err)
    }
    res.json({message: "User created"})
  })
})

router.get("/", (req, res) => {
  console.log("get request")
  User.find({}, (err, users) => {
    if(err){
      res.status(500).send(`Couldn get users Error: ${err}`)
      return
    }
    res.json(users)
  })
})

module.exports = router
