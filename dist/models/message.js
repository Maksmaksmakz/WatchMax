"use strict";

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var MessageSchema = new Schema({
  text: String
});

module.exports = _mongoose2.default.model("Message", MessageSchema);
//# sourceMappingURL=message.js.map