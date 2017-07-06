import FcmToken from "../models/fcmToken"
import FCM from "fcm-push"

const serverKey = "AAAAhQuHNyQ:APA91bE0qmLVwog39G1ixRLblEEBaXcJBu2htcp0uN6w3N9vKO2OhKO7qrjcmqC7kmqHYsAbDF9RcSWdXpk03vEO4wPXPeUBAG9MU510N3bM6ugeBSazhNcXKZW8UTCCE57AA4UKW8Sw"
const fcm = new FCM(serverKey)

exports.pushToDevice = (deviceToken, data, notification) => {
  var message = {
      to : deviceToken,
      collapse_key : '<insert-collapse-key>',
      data : data,
      notification : notification
  };

  fcm.send(message, function(err, response){
    if (err) {
        console.log(`Something has gone wrong!: ${err}`);
    } else {
        console.log(`Successfully sent with response: ${response}`);
    }
  });
}

exports.pushToAllDevices = (data, notification) => {
  FcmToken.find({}, (err, tokens) => {
    if(err){
      res.status(500).send(`Couldnt find and send to all devices ${err}`)
      return
    }else{
      console.log(`found tokens, sending notifications now`)
      tokens.forEach(function (token) {
        console.log(`sent notification to: ${token.token}`)
        exports.pushToDevice(token.token, data, notification)
      });
    }
  })
}
