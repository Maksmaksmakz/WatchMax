"use strict";

var _fcmToken = require("../models/fcmToken");

var _fcmToken2 = _interopRequireDefault(_fcmToken);

var _fcmPush = require("fcm-push");

var _fcmPush2 = _interopRequireDefault(_fcmPush);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var serverKey = "AAAAhQuHNyQ:APA91bE0qmLVwog39G1ixRLblEEBaXcJBu2htcp0uN6w3N9vKO2OhKO7qrjcmqC7kmqHYsAbDF9RcSWdXpk03vEO4wPXPeUBAG9MU510N3bM6ugeBSazhNcXKZW8UTCCE57AA4UKW8Sw";
var fcm = new _fcmPush2.default(serverKey);

exports.pushToDevice = function (deviceToken, notification) {
  var message = {
    to: deviceToken,
    notification: notification
  };

  fcm.send(message, function (err, response) {
    if (err) {
      console.log("Something has gone wrong!: " + err);
    } else {
      console.log("Successfully sent with response: " + response);
    }
  });
};

exports.pushToAllDevices = function (title, text) {
  var notification = {
    title: title,
    body: text,
    color: "#83c3ed",
    sound: "default",
    icon: "ic_stat_name"
  };

  _fcmToken2.default.find({}, function (err, tokens) {
    if (err) {
      res.status(500).send("Couldnt find and send to all devices " + err);
      return;
    } else {
      console.log("found tokens, sending notifications now");
      tokens.forEach(function (token) {
        console.log("sent notification to: " + token.token);
        exports.pushToDevice(token.token, notification);
      });
    }
  });
};
//# sourceMappingURL=fcmManager.js.map