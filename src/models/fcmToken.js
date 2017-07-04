import mongoose from "mongoose"

const FcmTokenSchema = new mongoose.Schema({
  token: String
})

module.exports = mongoose.model("FireBaseToken", FcmTokenSchema)
