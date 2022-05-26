const {db,response} = require("../models");
const {v4 : uuidv4} = require('uuid');
const {redisClient} = require('../config/redis.config');
const { json } = require("express");
const { successResponseRedis, errorResponse, notFoundResponse } = require("../models/response");
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
    const value = await redisClient.get(key);
    if (value) {
      successResponseRedis(res,200,"Successfully",value)
      console.log("ADa cache")
    } else {
      console.log("Tidak ada cache",value)
      User.findOne({ id: req.userId }).exec((err, user) => {
        if (err) {
          // res.status(500).send({ message: err });
          errorResponse(res,res.statusCode,err)
          return;
        }
        if (user) {
          console.log("data",user)
          data ={id: user.id,username: user.username,email: user.email,public_id: user.public_id}
          successResponse(res, 200, "Successfully", data);
          redisClient.setEx(key, 300, JSON.stringify(data));
          return;
        }
      })
    }
    
  };
  exports.username = async (req, res) => {
    key = 'username:'+req.query.username
    const value = await redisClient.get(key);
    if (value) {
      successResponseRedis(res,200,"Successfully",value)
      console.log("ADa cache")
    } else {
      console.log("Tidak ada cache",value)
      User.findOne({ username: req.query.username }).exec((err, user) => {
        if (err) {
          errorResponse(res,res.statusCode,err)
          return;
        }
        if (user) {
          console.log("data",user)
          data ={id: user.id,username: user.username,email: user.email,public_id: user.public_id}
          successResponse(res, 200, "Successfully", data);
          redisClient.setEx(key, 300, JSON.stringify(data));
          return;
        }
        else{
          message = "Data Not Found"
          notFoundResponse(res,404,message)
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