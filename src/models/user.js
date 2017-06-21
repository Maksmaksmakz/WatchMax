import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
  name: String
})
mongoose.model("User", UserSchema)

module.exports = mongoose.model("User")
