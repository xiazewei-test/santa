const axios = require('axios');

class UserInfoService {
  // TODO: Add more name format support, like 'James Bond'
  static getUserInfo(username){
    return axios.get(global.gConfig.user_info_url)
    .then(function (response) {
      // console.log(response.data);
      const result = response.data.find(element => element.username == username);
      // console.log(result);
      return result;
    })
    .catch(function (error) {
      // handle error
      console.error(error);
      return null;
    });
  }
}

module.exports = UserInfoService;