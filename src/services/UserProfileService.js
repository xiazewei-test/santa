const axios = require('axios');

class UserProfileService {
  static getUserProfile(uuid){
    return axios.get(global.gConfig.user_profiles_url)
    .then(function (response) {
      // console.log(response.data);
      const result = response.data.find(element => element.userUid == uuid);
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

module.exports = UserProfileService;