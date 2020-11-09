const UserInfoService = require('../services/UserInfoService');
const UserProfileService = require('../services/UserProfileService');
const getAge = require('get-age')

const NOT_REGISTERED = 'Child not registered!'
const AGE_OVER = 'Age is over 10!'
const BIRTH_FORMAT_ILLEGAL = 'Birth date format is illegal!'
const SUCCESS = 'Your wish will be send!'

class Child{
  constructor(username){
    this.username = username;
    this.uuid = null;
    this.address =  null;
    this.birthdate = null;
    this.age = null;
    this.isRegistered = false;
    // the flag of validate
    this.sendFlag = false;
    // response to client
    this.response = '';
  }

  getChildAge(){
    if(this.birthdate == null){
      console.error(`No birth date! username: ${this.username}`);
      return;
    }
    this.age = getAge(this.birthdate.replace('/','-'))
    return this.age;
  }

  getUserInfo(){
    return UserInfoService
      .getUserInfo(this.username)
      .then(res => {
        // console.log(res)
        if(!res || !res.uid){
          this.isRegistered = false;
          return;
        }else{
          this.uuid = res.uid;
          this.isRegistered = true;
          return this.getUserProfile();
        }
      });

  }

  getUserProfile(){
    return UserProfileService
      .getUserProfile(this.uuid)
      .then(res => {
        // console.log(res)
        this.address = res.address;
        this.birthdate = res.birthdate;
      });
  }

  validate(){
    return this.getUserInfo()
      .then(() => {
        if(!this.isRegistered){
          this.response = NOT_REGISTERED;
        }else{
          this.getChildAge();
          if(!Number.isInteger(this.age)){
            this.response = BIRTH_FORMAT_ILLEGAL;
          }else if(this.getChildAge() > 10){
            this.response = AGE_OVER;
          }else{
            this.response = SUCCESS;
            this.sendFlag = true;
          }
        }
        return this;
      });
  }
}

module.exports = Child;