"use strict";

var _fcmToken = require("../models/fcmToken");

var _fcmToken2 = _interopRequireDefault(_fcmToken);

var _fcmPush = require("fcm-push");

var _fcmPush2 = _interopRequireDefault(_fcmPush);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var devices = null;

_fcmToken2.default.find({}, function (err, tokens) {
  if (err) {
    res.status(500).send("Couldn get users Error: " + err);
    return;
  } else {
    devices = tokens;
  }
});

var serverKey = "AAAAhQuHNyQ:APA91bE0qmLVwog39G1ixRLblEEBaXcJBu2htcp0uN6w3N9vKO2OhKO7qrjcmqC7kmqHYsAbDF9RcSWdXpk03vEO4wPXPeUBAG9MU510N3bM6ugeBSazhNcXKZW8UTCCE57AA4UKW8Sw";
var fcm = new _fcmPush2.default(serverKey);

exports.pushToDevice = function (deviceToken, data, notification) {
  var message = {
    to: deviceToken,
    collapse_key: '<insert-collapse-key>',
    data: data,
    notification: notification
  };

  fcm.send(message, function (err, response) {
    if (err) {
      console.log("Something has gone wrong!");
    } else {
      console.log("Successfully sent with response: ", response);
    }
  });
};

exports.pushToAllDevices = function (data, notification) {
  devices.forEach(function (token) {
    console.log(token.token);
    exports.pushToDevice(token.token, data, notification);
  });
};
//# sourceMappingURL=fcmManager.js.map