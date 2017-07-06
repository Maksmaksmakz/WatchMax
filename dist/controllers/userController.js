"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _user = require("../models/user");

var _user2 = _interopRequireDefault(_user);

var _message = require("../models/message");

var _message2 = _interopRequireDefault(_message);

var _fcmManager = require("../fcm/fcmManager");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();


// POST "api/v1/user" - Create user
router.post("/", function (req, res) {
  console.log("post request to user");
  var newUser = new _user2.default();
  newUser.name = req.body.name;
  newUser.status = req.body.status;
  newUser.energyLevel = req.body.energyLevel;
  newUser.position.coordinates = req.body.position.coordinates;

  newUser.save(function (err) {
    if (err) {
      res.send(err);
    }
    res.json({ message: "User created" });
  });
});

// GET "api/v1/user" - Get users
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

// GET "api/v1/user/status" - Get users status
router.get("/:id/status", function (req, res) {
  console.log("get request");
  _user2.default.findById(req.params.id, function (err, user) {
    if (err) {
      res.status(500).send("Couldn find user Error: " + err);
      return;
    }
    res.json(user.status);
  });
});

//PUT "/api/v1/user/position"
router.put("/position", function (req, res) {
  console.log("put request to user");
  _user2.default.find({}, function (err, users) {
    if (err) {
      res.send(err);
    }
    var user = users[0];
    user.position.coordinates.long = req.body.coordinates.long;
    user.position.coordinates.lat = req.body.coordinates.lat;
    user.save(function (err) {
      if (err) {
        res.send(err);
      }
      res.json({ message: "User updated" });
      (0, _fcmManager.pushToAllDevices)("Max ist jetzt woanders", "Max hat seine Position aktualisiert");
    });
  });
});

// PUT "api/v1/user/message" - addNew Message
router.post("/message", function (req, res) {
  console.log("post request to messages");
  _user2.default.find({}, function (err, users) {
    if (err) {
      res.send(err);
    }
    var user = users[0];
    var newMessage = new _message2.default();
    console.log(req.body);
    newMessage.text = req.body.message.text;
    console.log(newMessage);
    newMessage.save(function (err, review) {
      if (err) {
        res.send(err);
      }
      user.messages.push(newMessage);
      console.log("user.messages: " + user.messages);
      user.save(function (err) {
        if (err) {
          res.send(err);
        }
        res.json({ newMessage: "new Message saved" });
        (0, _fcmManager.pushToAllDevices)("Max hat was gepostet", "Max hat einen Neuen Status gepostet");
      });
    });
  });
});

// PUT "api/v1/user/messages" - get all Messages
router.get("/messages", function (req, res) {
  console.log("get request to messages");
  _message2.default.find({}, function (err, messages) {
    if (err) {
      res.status(500).send("Couldn get messages Error: " + err);
      return;
    }
    console.log(messages);
    res.json(messages);
  });
});

// PUT "api/v1/user" - Update user
router.put("/:id", function (req, res) {
  _user2.default.findById(req.params.id, function (err, user) {
    if (err) {
      res.send(err);
    }
    user.name = req.body.name;
    user.status = req.body.status;
    user.energyLevel = req.body.energyLevel;
    user.position.coordinates = req.body.position.coordinates;
    user.save(function (err) {
      if (err) {
        res.send(err);
      }
      res.json({ message: "User updated" });
    });
  });
});
module.exports = router;
//# sourceMappingURL=userController.js.map