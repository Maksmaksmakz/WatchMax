"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _http = require("http");

var _http2 = _interopRequireDefault(_http);

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _config = require("./config");

var _config2 = _interopRequireDefault(_config);

var _userController = require("./controllers/userController");

var _userController2 = _interopRequireDefault(_userController);

var _metaDataController = require("./controllers/metaDataController");

var _metaDataController2 = _interopRequireDefault(_metaDataController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
app.server = _http2.default.createServer(app);

//middleware
app.use(_bodyParser2.default.json({
  limit: _config2.default.bodyLimit
}));

app.use("/api/v1/users", _userController2.default);
app.use("/api/v1/metaData", _metaDataController2.default);

//v1 routes
app.server.listen(_config2.default.port);
console.log("server listening on: " + app.server.address().port);

_mongoose2.default.connect(_config2.default.mongoUrlDev, function (err) {
  if (err) return console.error(err);
});

exports.default = app;
//# sourceMappingURL=index.js.map