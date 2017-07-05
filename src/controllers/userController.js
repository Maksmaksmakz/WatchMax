import express from "express"
const router = express.Router()
import bodyParser from "body-parser"

import User from "../models/user"
import Message from "../models/message"
import { pushToAllDevices } from "../fcm/fcmManager"

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

//PUT "/api/v1/user/position"
router.put("/position", (req, res) => {
  console.log("put request to user")
    User.find({}, (err, users) => {
      if(err) {
        res.send(err)
      }
      let user = users[0]
      user.position.coordinates.long = req.body.coordinates.long;
      user.position.coordinates.lat = req.body.coordinates.lat;
      user.save(err => {
        if(err){
          res.send(err)
        }
        res.json({ message: "User updated" })
        pushToAllDevices(
          {
            "bla" : "Max",
            "test" : "ist toll"
          },
          {
            title : "Max ist jetzt woanders",
            body : "Max hat seine Position aktualisiert",
          }
        )
      })
  })
})

// PUT "api/v1/user/message" - addNew Message
router.post("/message", (req, res) => {
  console.log("post request to messages")
    User.find({}, (err, users) => {
      if(err) {
        res.send(err)
      }
      let user = users[0]
      let newMessage = new Message
      console.log(req.body)
      newMessage.text = req.body.message.text;
      console.log(newMessage)
      newMessage.save((err, review) => {
        if(err){
          res.send(err)
        }
        user.messages.push(newMessage)
        console.log("user.messages: " + user.messages)
        user.save(err => {
          if(err){
            res.send(err)
          }
          res.json({newMessage:"new Message saved"})
          pushToAllDevices(
            {
              "bla" : "Max",
              "test" : "ist toll"
            },
            {
              title : "Max hat was gepostet",
              body : "Max hat einen Neuen Status gepostet",
            }
          )
        })
      })
  })
})

// PUT "api/v1/user/messages" - get all Messages
router.get("/messages", (req, res) => {
  console.log("get request to messages")
  Message.find({}, (err, messages) => {
    if(err){
      res.status(500).send(`Couldn get messages Error: ${err}`)
      return
    }
    console.log(messages)
    res.json(messages)
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
