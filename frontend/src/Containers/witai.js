'use strict';

let Wit = null;
let interactive = null;
try {
  // if running from repo
  Wit = require('../').Wit;
  interactive = require('../').interactive;
} catch (e) {
  Wit = require('node-wit').Wit;
  interactive = require('node-wit').interactive;
}

const accessToken = (() => {
  if (process.argv.length !== 3) {
    console.log('usage: node examples/basic.js <ER74C4OF34MQCPMYJFGOQTV54DQMEFOB>');
    process.exit(1);
  }
  return process.argv[2];
})();

const client = new Wit({ER74C4OF34MQCPMYJFGOQTV54DQMEFOB});
interactive(client);
//old fetch
submitRegistration = async (e) => {
    e.preventDefault();
    console.log("GOT HERE")
    console.log(this.state);
    try{
      console.log("GOT HERE, TOO")
      const createUser = await fetch('https://api.wit.ai/message', {
        method: 'GET',
        body: JSON.stringify(this.state),
        headers: {
          'Authorization': 'BearerER74C4OF34MQCPMYJFGOQTV54DQMEFOB'
        } 
      });




// other ai
// unirest.get("https://neuralengine-chatbot-v1.p.rapidapi.com/dev/ignition")
// .header("X-RapidAPI-Key", "3a8ab5a941mshedc40a3c711087cp135680jsne2288ee85afa")
// .end(function (result) {
//   console.log(result.status, result.headers, result.body);
// });
/* take out of backend folder into the same level as frontend renamed as client, in server.js require('dotenv").config();
add the const port - processenv.PORT || 9000 app.listen(port, ()=>{ consolelog}); 
add .env file with: REACT_APP
changed origin process.env.REACT_APP_ADDRESS
rename the paths
* takes everything 
fetch in APp.js change to the REACT_APP and add .env file there
start": node server.js"
heroku-postbuild with devtools
all the .env git push heroku master, go into settings reveal config vars after adding mlab add the REACT_APP_ADDRESS, REACT_APP_BACKEND, SESSION_SESSION

if still not working just add //this is a fake line*/