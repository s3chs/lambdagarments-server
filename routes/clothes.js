var express = require("express");
var router = express.Router();
const Clothes = require("../model/Clothes.js");
const uploader = require("../config/cloudinary.js");

/* GET home page. */
router.get("/", function (req, res, next) {
  Clothes.find()
    .then((dbResponse) => {
      res.status(200).json(dbResponse);
    })
    .catch((dbErr) => {
      console.log(dbErr);
      res.status(500).json(dbErr);
    });
});

router.get("/:id", function (req, res, next) {
  Clothes.findById(req.params.id)
    .then((dbResponse) => {
      res.status(200).json(dbResponse);
    })
    .catch((dbErr) => {
      console.log(dbErr);
      res.status(500).json(dbErr);
    });
});

router.post("/", uploader.single("images"), function(req, res, next) {
console.log(req.body)
  if (req.files) {
    req.body.images = req.files.path;
  }

  Clothes.create(req.body)
    .then((dbResponse) => {
      res.status(201).json(dbResponse);
    })
    .catch((dbErr) => {
      console.log(dbErr);
      res.status(500).json(dbErr);
    });
});

router.patch("/:id", (req, res, next) => {
  const updateValues = req.body;
  Clothes.findByIdAndUpdate(req.params.id, updateValues, { new: true })
    .then((dbResponse) => {
      res.status(200).json(dbResponse);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

router.delete("/:id", (req, res, next) => {
  Clothes.findByIdAndRemove(req.params.id)
    .then((dbResponse) => {
      res.status(204);
    })
    .catch((error) => {
      res.sendStatus(500).json(error);
    });
});

module.exports = router;
