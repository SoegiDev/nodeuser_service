const db = require("../models");
const {v4 : uuidv4} = require('uuid')
const User = db.user;
function PublicID(){
  const public_id = uuidv4()
  return public_id
}
function UniqueID(){
    var last_Uniqueid;
    User.findOne({}).exec((err, user) => {
      if (err) {
        last_Uniqueid = null
        return;
      }
      if (user) {
        last_Uniqueid = user.public_id
        return;
      }
    })
    let ts = Date.now();
    let result = "0"
    if (last_Uniqueid === undefined) {
      return  "USR00001"
    }else{
      let prefix = last_Uniqueid.substring(0,3);
      let number = parseInt(last_Uniqueid.substring(3));
      let nextNumber = number+1;
      getNumber = String(nextNumber).padStart(5, '0');
      result = prefix+getNumber
      console.log(last_Uniqueid+ " "+result)
      return result
    }
}
module.exports = {
  UniqueID,PublicID
};  