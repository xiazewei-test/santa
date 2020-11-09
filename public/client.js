// client-side js
// run by the browser each time your view template is loaded
const MESSAGE_API_URL = '/api/messages';
const SUCCESS_URL = '/success/';
const ERROR_URL = '/error/';

const LENGTH_OVER = 'Text over 100 chars!';
const INPUT_ERROR = 'Please check your input!';


console.log('hello world :o');


// define variables that reference elements on our page
const username = document.querySelector("input[name='userid']");
const wish = document.querySelector("textarea[name='wish']");
const santaForm = document.forms[0];

// listen for the form to be submitted and add a new dream when it is
santaForm.onsubmit = function (event) {
  event.preventDefault();
  // check the text isn't more than 100chars before submitting
  if(!wish.value || !username.value){
    alert(INPUT_ERROR);
  }else if(wish.value.length > 100){
    alert(LENGTH_OVER);
  }else{
    axios.post(MESSAGE_API_URL, {
        username: username.value,
        wish: wish.value
      })
      .then(function (res) {
        console.log(res.data);
        if(res.data.success){
          window.location.href = SUCCESS_URL + res.data.response;
        }else{
          window.location.href = ERROR_URL + res.data.response;
        }
      })
      .catch(function (error) {
        // handle error
        console.error(error);
        return;
      });
    }
};
