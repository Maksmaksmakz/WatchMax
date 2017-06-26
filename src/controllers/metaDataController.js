import express from "express"
const router = express.Router()
import bodyParser from "body-parser"

import MetaData from "../models/metaData"

// POST "api/v1/metaData" - Create metaData
router.post("/", (req, res) => {
  console.log("post request to metaData")
  const newMetaData = new MetaData()
  newMetaData.version = req.body.version
  newMetaData.downloadLink = req.body.downloadLink
  newMetaData.forceUpdate = req.body.forceUpdate

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
// PUT "api/v1/metaData" - Update MetaData
router.put("/", (req, res) => {
  console.log("put request to metaData")
    MetaData.find({}, (err, metaDatas) => {
      if(err) {
        res.send(err)
      }
      console.log(metaDatas[0])
      metadata = metadatas[0]
      metaData.version = req.body.version
      metaData.downloadLink = req.body.downloadLink
      metaData.forceUpdate = req.body.forceUpdate
      metaData.save(err => {
        if(err){
          res.send(err)
        }
        res.json({ message: "metaData updated" })
      })
    })
  })
})
// GET "api/v1/metaData" - GetMetaData
router.get("/", (req, res) => {
  console.log("get request to metaData")
  MetaData.find({}, (err, metaDatas) => {
    if(err){
      res.status(500).send(`Couldn get users Error: ${err}`)
      return
    }
    res.json(metaDatas[0])
  })
})

module.exports = router
