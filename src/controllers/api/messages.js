const express = require('express');
const json2html = require('node-json2html');
const router = express.Router();

const Child = require('../../models/Child');
const Message = require('../../models/Message');
const MailService = require('../../services/MailService');
let messages = [];

//json2html format
let template = {'<>':'li','html':[
  {'<>':'span','html':'username: ${username}\t'},
  {'<>':'span','html':'address: ${address}\t'},
  {'<>':'span','html':'wish: ${wish}\t'}
]};

/* get messages
 * http://localhost:3000/api/messages get method
 * Get all pending messages
 */
router.get('/', function(req, res) {
  res.header('Content-Type', 'application/json; charset=utf-8');
  res.send(messages);
});

/* delete messages
 * http://localhost:3000/api/messages delete method
 * Delete all pending messages
 */
// TODO: add authentication
router.delete('/', function(req, res) {
  res.header('Content-Type', 'application/json; charset=utf-8');
  messages = [];
  res.send('Messages deleted');
});


/* post messages
 * http://localhost:3000/api/messages post method
 * post a new message
 */
router.post('/', function(req, res) {
  // console.log(req.body);
  // const param = {"result":"Hello World !"};
  res.header('Content-Type', 'application/json; charset=utf-8');
  // res.send(param);
  if(!req.body.username){
    res.send({"error": "username illegal"});
    return;
  }
  const child = new Child(req.body.username);
  child.validate()
  .then(child => {
    // console.log(child);
    if(child.sendFlag){
      // TODO: Handle duplicated requests
      let message = new Message(child.username, child.address, req.body.wish);
      messages.push(message);
      console.log('message recorded');
      console.log(message);
    }
    res.send({
      "success":child.sendFlag,
      "response":child.response
    });
  });
});

const sendMail = function(){
  if(messages.length > 0){
    let content = JSON.stringify(messages);
    let html = json2html.transform(messages, template);
    console.log('Sending Mails:');
    console.log(messages);
    messages = [];
    MailService.sendMail(content, html);
  }
}

setInterval(sendMail, 15000);



module.exports = router;