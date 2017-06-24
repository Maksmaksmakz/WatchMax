"use strict";

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DataSchema = new _mongoose2.default.Schema({
  version: Number,
  downloadLink: String,
  forceUpdate: Boolean
});

module.exports = _mongoose2.default.model("MetaData", DataSchema);
//# sourceMappingURL=metaData.js.map