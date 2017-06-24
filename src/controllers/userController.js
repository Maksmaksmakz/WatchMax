import express from "express"
const router = express.Router()
import bodyParser from "body-parser"

import User from "../models/user"

// POST "api/v1/user" - Create user
router.post("/", (req, res) => {
  console.log("post request to user")
  const newUser = new User()
  newUser.name = req.body.name
  newUser.status = req.body.status
  newUser.energyLevel = req.body.energyLevel
  newUser.position.coordinates = req.body.position.coordinates

  newUser.save(err => {
    if(err){
      res.send(err)
    }
    res.json({message: "User created"})
  })
})

// GET "api/v1/user" - Get users
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

// GET "api/v1/user/status" - Get users status
router.get("/:id/status", (req, res) => {
  console.log("get request")
  User.findById(req.params.id, (err, user) => {
    if(err){
      res.status(500).send(`Couldn find user Error: ${err}`)
      return
    }
    res.json(user.status)
  })
})

// PUT "api/v1/user" - Update user
router.put("/:id", (req, res) => {
    User.findById(req.params.id, (err, user) => {
      if(err) {
        res.send(err)
      }
      user.name = req.body.name
      user.status = req.body.status
      user.energyLevel = req.body.energyLevel
      user.position.coordinates = req.body.position.coordinates
      user.save(err => {
        if(err){
          res.send(err)
        }
        res.json({ message: "User updated" })
      })
    })
  })

module.exports = router
