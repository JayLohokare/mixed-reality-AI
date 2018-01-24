import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Gazer from './Gazer';
import Tracking from './Tracking';
import playerVideo from './talking.webm';
import Microphone from './Microphone';

class App extends Component {

  componentDidMount() {
    this.origin = "Rotkreuzplatz";
    this.speak("Welcome to " + this.origin);
    window.setTimeout(() => this.speakDefaultTrainInfo(), 4000);
  }
  
  getData(val){
    // do not forget to bind getData in constructor
    console.log(val);
}

  getDirections() {
    const s = `http://144.217.88.211:5000/getDirections?origin=${this.origin}`;
    return fetch(s, { mode: 'cors' }).then(x => x.json());
  }

  speak(text, alternativeVoice) {
    return new Promise(resolve => {
      const config = {
        //pitch: 2,
        volume: 2,
        onend: resolve
      };
      window.responsiveVoice.speak(text, alternativeVoice ? "UK English Female" : "UK English Male", config);
    });
  }

  onFaceDetected() {
    this.speak("Hello there, are you going to the match?", false);
  }

  onFaceLost() {
    this.speakDefaultTrainInfo();
  }

  speakDefaultTrainInfo() {
    this.getDirections().then(data => {
      console.log(data);
      if (data.routes && data.routes.length && data.routes[0].legs.length) {
        const departure = data.routes[0].legs[0]["departure_time"].text;
        const duration = data.routes[0].legs[0].duration.text;
        this.speak(`Next train departs at ${departure} and takes ${duration} to reach the arena`);
      } else {
        this.speak("Next train should be here soon.");
      }
    });
  }

  getChatbotReply(text) {
    return fetch(`https://api.dialogflow.com/v1/query?v=20170712&query=${window.encodeURI(text)}&lang=en&sessionId=494475ee-8fb6-45ef-8d8a-bcdd255910a6&timezone=Europe/London`, {
      headers: new Headers({
        'Authorization': 'Bearer f1b3acd841674614b971cf20790cb531'
      })
    })
    .then(x => x.json())
    .then(j => j.result.fulfillment.speech);
  }

  ask(textareaNode) {
    const text = textareaNode.value;
    if (!text) {
      console.warn("you didn't say anything");
      return;
    }
    textareaNode.value = "";
    const response = this.getChatbotReply(text);
    this.speak(text, false).then(() => {
      response.then(toSay => this.speak(toSay, true));
    });
  }

  render() {
    return (
      <div  >
        <div id="message">
          <h2>Welcome FC Bayern Fans</h2>
		  
		  <Gazer sendData={this.getData}/>
		  
		  
          <video   loop autplay muted autoPlay>
            <source src={playerVideo} type="video/webm" />
            Your browser does not support the video tag.
          </video>
		  
		  
		  
		  
		  
		  
		  
		  
		  
          <Gazer
            onFaceDetected={() => this.onFaceDetected()}
            onFaceLost={() => this.onFaceLost()} />
          <Tracking />
		  
          <Microphone />
          <h1 style={{marginTop: "2em"}}>Talk to us...</h1>
         {/* <textarea ref={node => this.textareaNode = node} autoFocus></textarea> */}
          {/*<a href="#" onClick={() => this.ask(this.textareaNode)}>Speak</a>*/}
        </div>
        <p id="load">Thank you for supporting us. FC Bayern Munich</p>
        
      </div>
    );
  }
}

export default App;
