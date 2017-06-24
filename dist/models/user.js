"use strict";

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UserSchema = new _mongoose2.default.Schema({
  name: String,
  type: String,
  status: String,
  energyLevel: Number,
  position: {
    type: { type: String, default: "Point" },
    coordinates: {
      lat: Number,
      long: Number
    }
  }
});

module.exports = _mongoose2.default.model("User", UserSchema);
//# sourceMappingURL=user.js.map