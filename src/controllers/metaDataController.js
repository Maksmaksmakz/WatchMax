import express from "express"
const router = express.Router()
import bodyParser from "body-parser"

import MetaData from "../models/metaData"

router.post("/", (req, res) => {
  console.log("post request to metaData")
  const newMetaData = new MetaData()
  newMetaData.version = req.body.version
  newMetaData.downloadLink = req.body.downloadLink
  newMetaData.forceMetaData = req.body.forceMetaData

  MetaData.find({}, (err, metaData) => {
    if(err){
      res.status(500).send(`Couldn get metaData Error: ${err}`)
      return
    }
    if(metaData.length > 0) {
      res.json({message: "MetaData already Exists. Use Put Request"})
      return
    }else {
      newMetaData.save(err => {
        if(err){
          res.send(err)
        }
        res.json({message: "MetaData created"})
      })
    }
  })
})

router.put("/:id", (req, res) => {
    MetaData.findById(req.params.id, (err, metaData) => {
      if(err) {
        res.send(err)
      }
      metaData.version = req.body.version
      metaData.downloadLink = req.body.downloadLink
      metaData.forceMetaData = req.body.forceMetaData
      metaData.save(err => {
        if(err){
          res.send(err)
        }
        res.json({ message: "metaData updated" })
      })
    })
  })

router.get("/", (req, res) => {
  console.log("get request")
  MetaData.find({}, (err, metaDatas) => {
    if(err){
      res.status(500).send(`Couldn get users Error: ${err}`)
      return
    }
    res.json(metaDatas)
  })
})

module.exports = router
