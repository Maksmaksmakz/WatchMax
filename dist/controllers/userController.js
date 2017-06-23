"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _user = require("../models/user");

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();


router.post("/", function (req, res) {
  console.log("post request");
  var newUser = new _user2.default();
  console.log(req.body);
  newUser.name = req.body.name;
  newUser.status = req.body.status;
  newUser.energyLevel = req.body.energyLevel;
  newUser.position.coordinates = req.body.position.coordinates;
  console.log(newUser.position.coordinates);

  newUser.save(function (err) {
    if (err) {
      res.send(err);
    }
    res.json({ message: "User created" });
  });
});

router.get("/", function (req, res) {
  console.log("get request");
  _user2.default.find({}, function (err, users) {
    if (err) {
      res.status(500).send("Couldn get users Error: " + err);
      return;
    }
    res.json(users);
  });
});

module.exports = router;
//# sourceMappingURL=userController.js.map