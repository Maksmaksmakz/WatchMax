"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _fcmToken = require("../models/fcmToken");

var _fcmToken2 = _interopRequireDefault(_fcmToken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();


// POST "api/v1/fcmToken" - Create token
router.post("/", function (req, res) {
  console.log("post request to FcmToken");
  var token = new _fcmToken2.default();
  token.token = req.body.token;

  token.save(function (err) {
    if (err) {
      res.send(err);
    }
    res.json({ message: "token created" });
  });
});

// GET "api/v1/fcmToken" - Get tokens
router.get("/", function (req, res) {
  console.log("get request to metaData");
  _fcmToken2.default.find({}, function (err, tokens) {
    if (err) {
      res.status(500).send("Couldn get users Error: " + err);
      return;
    }
    res.json(tokens);
  });
});

module.exports = router;
//# sourceMappingURL=fcmTokenController.js.map