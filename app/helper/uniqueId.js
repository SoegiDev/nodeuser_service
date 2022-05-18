function CreateUserUniqueID(last_Uniqueid){
    let ts = Date.now();
    let result = "0"
    if (last_Uniqueid === null) {
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
  CreateUserUniqueID
};  