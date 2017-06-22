import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
  name: String,
  status: String,
  energyLevel: Number,
  position: {
    type: { type: String, default: "Point"},
    coordinates: {
      lat: Number,
      long: Number
    }
  }
})
mongoose.model("User", UserSchema)

module.exports = mongoose.model("User")
