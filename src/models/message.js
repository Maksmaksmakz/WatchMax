import mongoose from "mongoose"
let Schema = mongoose.Schema

let MessageSchema = new Schema({
  text: String
})

module.exports = mongoose.model("Message", MessageSchema)
