import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
  name: String,
  type: String,
  status: String,
  energyLevel: Number,
  position: {
    type: { type: String, default: "Point"},
    coordinates: {
      lat: Number,
      long: Number
    }
  },
  messages: [{type: mongoose.Schema.Types.ObjectId, ref: 'Message'}]
})

module.exports = mongoose.model("User", UserSchema)
