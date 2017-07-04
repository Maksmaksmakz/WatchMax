"use strict";

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FcmTokenSchema = new _mongoose2.default.Schema({
  token: String
});

module.exports = _mongoose2.default.model("FireBaseToken", FcmTokenSchema);
//# sourceMappingURL=fcmToken.js.map