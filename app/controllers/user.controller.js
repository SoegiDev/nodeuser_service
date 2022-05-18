const db = require("../models");
const config = require("../config/auth.config");
const {v4 : uuidv4} = require('uuid');
const User = db.user;
const verify = db.verification

  exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
  };
  exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
  };
  exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
  };
  exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
  };
  exports.profile = (req, res) => {
    User.findOne({ id: req.userId }).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (user) {
        res.status(500).send({ 
          id: user.id,
          username: user.username,
          email: user.email,
          public_id: user.public_id 
        });
        return;
      }
    })
  };
  exports.pullverifyemail = (req, res) => {
    current_time = new Date()
    const verify_email = new verify({
      user_id: req.userId,
      verify_number: Math.floor(1000 + Math.random() * 9000),
      expire_time: current_time + 7200
    });
    verify.save(err => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      res.send({ message: "User was registered successfully!" });
    });
  };
  
