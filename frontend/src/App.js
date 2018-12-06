//npm start

import React, { Component } from 'react';
//import "semantic-ui-css/semantic.min.css"; //{ Input, List} from
import './App.css';
import { TextField, List } from "@material-ui/core" //ListItem, ListItemText
import database from './firebase/firebase';
import Pusher from 'pusher-js';
const admin = require('firebase-admin');

//import * as admin from 'firebase-admin';
 // Get refresh token from OAuth2 flow

const serviceAccount = require('./chatapp-b9baf-firebase-adminsdk-g1ehd-8d46d5e083.json');

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://chatapp.firebaseio.com'
});


class App extends Component {
    constructor(props){
        super(props)
        this.state = {
      users: [],
    //   username: "",
      text: "",
      messages: []
  }

  
    }
    componentDidMount=()=>{
        const pusher = new Pusher('17b1eaedd74f0e3d83c7', {
          cluster: 'us2',
          encrypted: true,
        });
  
        const channel = pusher.subscribe('bot');
        channel.bind('bot-response', data => {
          const msg = {
            text: data.message,
            user: 'ai',
          };
          this.setState({
            conversation: [...this.state.message, msg],
          });
        });
        this.getMessages()
        }

// submitRegistration = async (e) => {
//           e.preventDefault();
//           console.log("GOT HERE")
//           console.log(this.state);
//           try{
//             console.log("GOT HERE, TOO")
//             const createUser = await fetch('https://api.wit.ai/message', {
//               method: 'GET',
//               body: JSON.stringify(this.state),
//               headers: {
//                 'Authorization': 'Bearer ER74C4OF34MQCPMYJFGOQTV54DQMEFOB'
//               }
//               }
//             })
//           }

  onSubmit = (event) =>{
      if(event.charCode=== 13 && this.state.text.trim() !== ""){
          console.log(this.state.text)
          this.writeMessageToDB(this.state.text)
        this.setState({text: ""})
      }
  }
  writeMessageToDB = (message) =>{
    database
    .ref("messages/")
    .push({
        text: message
    })
}

  getMessages=()=>{
      let messageDB = database
      .ref("messages/")
      .limitToLast(500)
      messageDB.on("value", snapshot =>{
          let newMessages = []
          snapshot.forEach(child =>{
              const message = child.val()
              newMessages.push({id: child.key, text: message.text})
          })
          this.setState({messages: newMessages, loading: false})
          this.bottomSpan.scrollIntoView({ behavior: "smooth"})
        })
  }

    // renderMessages = () => {
    //     return this.state.messages.map(message => (
    //       <ListItem key={message.id}>
    //         <ListItemText
    //           style={{ wordBreak: "break-word" }}
    //           primary={message.text}
    //         />
    //       </ListItem>
    //     ))
    //   }

    render(){
      const ChatBubble = (text, i, className) => {
        const classes = `${className} chat-bubble`;
        return (
          <div key={`${className}-${i}`} class={`${className} chat-bubble`}>
            <span class="chat-content">{text}</span>
          </div>
        );
      };

      const chat = this.state.messages.map((e, index) =>
          ChatBubble(e.text, index, e.user)
        );
      return (
        <div className="App">
          {/* <UserList />
          <ChatHistory />
          <SendMessage /> */}
          <h1>Welcome to Skynet Chatbot</h1>
            <div className="chat-window">
              <div class="conversation-view">{chat}</div>
              <div className="message-box">
          <List>
                  {/* {this.renderMessages()} */}
          </List>
    
          <TextField 
          autoFocus={true}
          multiline={true}
          fullWidth={true}
          rowsMax={3}
          placeholder="Type something"
          onChange={event => this.setState({ text: event.target.value })}
          value={this.state.text}
          onKeyPress={this.onSubmit}
          style={{ width: "98vw", overflow: "hidden" }}
          />
          <span ref={el => (this.bottomSpan = el)} />

          </div>
       </div>
       </div>
      )
    }
}

export default App;
