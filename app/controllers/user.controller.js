const db = require("../models");
const {v4 : uuidv4} = require('uuid');
const {redisClient} = require('../config/redis.config')
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
  exports.profile = async (req, res) => {
    key = 'profile:'+req.userId
    let results = null;
    const value = await redisClient.get(key);
    if (value) {
      res.status(200).send(JSON.parse(value));
      console.log("ADa cache")
    } else {
      console.log("Tidak ada cache",value)
      User.findOne({ id: req.userId }).exec((err, user) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        if (user) {
          console.log("data",user)
          res.status(500).send({ 
            id: user.id,
            username: user.username,
            email: user.email,
            public_id: user.public_id 
          });
          results
          redisClient.setEx(key, 300, JSON.stringify({id: user.id,
            username: user.username,
            email: user.email,
            public_id: user.public_id}));
          return;
        }
      })
    }
    
  };
  exports.pullverifyemail = (req, res) => {
    current_time = new Date()
    const setverify = new verify({
      user_id: req.userId,
      verify_number: Math.floor(1000 + Math.random() * 9000),
      expire_time: current_time.getTime() + 7200
    });
    setverify.save(err => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      res.send({ message: "Successfully Re Verify Email!" });
    });
  };