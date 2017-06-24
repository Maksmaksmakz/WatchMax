"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _metaData = require("../models/metaData");

var _metaData2 = _interopRequireDefault(_metaData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();


router.post("/", function (req, res) {
  console.log("post request to metaData");
  var newMetaData = new _metaData2.default();
  newMetaData.version = req.body.version;
  newMetaData.downloadLink = req.body.downloadLink;
  newMetaData.forceMetaData = req.body.forceMetaData;

  _metaData2.default.find({}, function (err, metaData) {
    if (err) {
      res.status(500).send("Couldn get metaData Error: " + err);
      return;
    }
    if (metaData.length > 0) {
      res.json({ message: "MetaData already Exists. Use Put Request" });
      return;
    } else {
      newMetaData.save(function (err) {
        if (err) {
          res.send(err);
        }
        res.json({ message: "MetaData created" });
      });
    }
  });
});

router.put("/:id", function (req, res) {
  _metaData2.default.findById(req.params.id, function (err, metaData) {
    if (err) {
      res.send(err);
    }
    metaData.version = req.body.version;
    metaData.downloadLink = req.body.downloadLink;
    metaData.forceMetaData = req.body.forceMetaData;
    metaData.save(function (err) {
      if (err) {
        res.send(err);
      }
      res.json({ message: "metaData updated" });
    });
  });
});

router.get("/", function (req, res) {
  console.log("get request");
  _metaData2.default.find({}, function (err, metaDatas) {
    if (err) {
      res.status(500).send("Couldn get users Error: " + err);
      return;
    }
    res.json(metaDatas);
  });
});

module.exports = router;
//# sourceMappingURL=metaDataController.js.map