import mongoose from "mongoose"

const DataSchema = new mongoose.Schema({
  version: Number,
  downloadLink: String,
  forceUpdate: Boolean
})

module.exports = mongoose.model("MetaData", DataSchema)
