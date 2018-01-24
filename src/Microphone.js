import React from 'react';
import { setTimeout } from 'timers';
import Artyom from './artyom.js';

class Microphone extends React.Component {

  componentDidMount() {
    setTimeout(() => this.setup(), 2000);
  }

  setup() {
    const artyom = new Artyom();

    artyom.addCommands([
		{
			indexes: ["Hello"],
			action: function(i){
				console.log("Hello");
			}
		},
		{
			indexes: ["My name is Jay"],
			action: function(i){
				console.log("My name is Jay");
			}
		},
		{
			indexes: ["When was FC Bayern formed?"],
			action: function(i){
				
			}
		},
		{
			indexes: ["My name is Jay"],
			action: function(i){
				console.log("My name is Jay");
			}
		}
	]);

	// Or the artisan mode to write less

	artyom.on(["Good morning"]).then(function(i){
		console.log("Triggered");
	});
		
	 
	 
    
	function startOneCommandArtyom(){
		artyom.say("Data received");
		
		artyom.fatality();// use this to stop any of

      setTimeout(function(){// if you use artyom.fatality , wait 250 ms to initialize again.
	  
		artyom.say("Data received");
	  
          artyom.initialize({
              lang:"en-GB",// A lot of languages are supported. Read the docs !
              continuous:true,// recognize 1 command and stop listening !
              listen:true, // Start recognizing
              debug:true, // Show everything in the console
              speed:1 // talk normally
          }).then(function(){
              console.log("Ready to work !");
              artyom.say("I'm listening...");
          });
      },250);
    }
	
    startOneCommandArtyom();
	
	
  }

  render() {
    return <div></div>;
  }
}

export default Microphone;
