"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _metaData = require("../models/metaData");

var _metaData2 = _interopRequireDefault(_metaData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();


// POST "api/v1/metaData" - Create metaData
router.post("/", function (req, res) {
  console.log("post request to metaData");
  var newMetaData = new _metaData2.default();
  newMetaData.version = req.body.version;
  newMetaData.downloadLink = req.body.downloadLink;
  newMetaData.forceUpdate = req.body.forceUpdate;

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
// PUT "api/v1/metaData" - Update MetaData
router.put("/", function (req, res) {
  console.log("put request to metaData");
  _metaData2.default.find({}, function (err, metaDatas) {
    if (err) {
      res.send(err);
    }
    metadata = metadatas[0];
    if (metaData.version < req.body.version) {
      pushToAllDevices({
        "bla": "Max",
        "test": "ist toll"
      }, {
        title: "Max ist fleißig",
        body: "Max hat eine neue Version hochgeladen."
      });
    }
    metaData.version = req.body.version;
    metaData.downloadLink = req.body.downloadLink;
    metaData.forceUpdate = req.body.forceUpdate;
    metaData.save(function (err) {
      if (err) {
        res.send(err);
      }
      res.json({ message: "metaData updated" });
    });
  });
});
// GET "api/v1/metaData" - GetMetaData
router.get("/", function (req, res) {
  console.log("get request to metaData");
  _metaData2.default.find({}, function (err, metaDatas) {
    if (err) {
      res.status(500).send("Couldn get users Error: " + err);
      return;
    }
    res.json(metaDatas[0]);
  });
});

module.exports = router;
//# sourceMappingURL=metaDataController.js.map