import React from 'react';


class Gazer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      faceDetected: false,
      faceFirstDetected: null,
      faceFirstLost: null
    };
  }

  componentDidMount() {
    setTimeout(() => this.setupVideo(), 4000);
  }
  
  setupVideo() {
    //start the webgazer tracker
    window.webgazer.setRegression('ridge') /* currently must set regression and tracker */
        .setTracker('clmtrackr')
        .setGazeListener(function(data, clock) {
          //   console.log(data); /* data is an object containing an x and y key which are the x and y prediction coordinates (no bounds limiting) */
          //   console.log(clock); /* elapsed time in milliseconds since webgazer.begin() was called */
        })
        .begin()
        .showPredictionPoints(true); /* shows a square every 100 milliseconds where current prediction is */

    setTimeout(() => this.checkIfReady(),100);
  }

  checkIfReady() {
    if (window.webgazer.isReady()) {
        this.setup();
    } else {
        setTimeout(() => this.checkIfReady(), 100);
    }
  }

  setup() {

    var width = 320;
    var height = 240;
    var topDist = '0px';
    var leftDist = '0px';

        console.log("calling setup for webgazer");
        //Set up video variable to store the camera feedback
        var video = document.getElementById('webgazerVideoFeed');

        //Position the camera feedback to the top left corner.
        video.style.display = 'block';
        video.style.position = 'fixed';
        video.style.top = topDist;
        video.style.left = leftDist;

        //Set up the video feedback box size
        video.width = width;
        video.height = height;
        video.style.margin = '0px';
        video.style.background = '#222222';
        window.webgazer.params.imgWidth = width;
        window.webgazer.params.imgHeight = height;

        //Set up the main canvas. The main canvas is used to calibrate the webgazer.
        var overlay = document.createElement('canvas');
        overlay.id = 'overlay';

        //Setup the size of canvas
        overlay.style.position = 'fixed';
        overlay.width = width;
        overlay.height = height;
        overlay.style.top = topDist;
        overlay.style.left = leftDist;
        overlay.style.margin = '0px';

        //Draw the face overlay on the camera video feedback
        var faceOverlay = document.createElement('face_overlay');
        faceOverlay.id = 'faceOverlay';
        faceOverlay.style.position = 'fixed';
        faceOverlay.style.top = '59px';
        faceOverlay.style.left = '107px';
        faceOverlay.style.border = 'solid';

        document.body.appendChild(overlay);
        document.body.appendChild(faceOverlay);

        /*var canvas = document.getElementById("plotting_canvas");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvas.style.position = 'fixed';*/

        var cl = window.webgazer.getTracker().clm;
        //console.log(window.webgazer.getTracker());
       /* window.webgazer.getTracker().on('track', function(event) {
          console.log("bbbbbbbbbb ", event);
        });*/

        //This function draw the face of the user frame.
        const drawLoop = () => {
			
			
            window.requestAnimationFrame(drawLoop);
            overlay.getContext('2d').clearRect(0,0,width,height);
            const now = Date.now();
            if (cl.getCurrentPosition()) {
                cl.draw(overlay);
                if (!this.state.faceDetected && this.state.faceFirstDetected) {
                  // console.log(now - this.state.faceFirstDetected );
                  if (now - this.state.faceFirstDetected > 5000) {
                    this.setState({ faceDetected: true });
                    //this.props.onFaceDetected();
					
					//this.props.sendData(this.state.faceDetected); 
					
					
					//Call function that changes the VIDEO CONTENT
                  }
                } else {
                  this.setState({ faceFirstDetected: now });
                }
                this.setState({ faceFirstLost: null });
            } else {
              // we cannot see a face
              if (this.state.faceFirstLost) {
                if(now - this.state.faceFirstLost > 3000) {
                  // couldn't see it for a while
				  
				  
                  if(this.state.faceDetected) {
                    this.props.onFaceLost();
                  }
				  
				  
					
                  this.setState({
                    faceDetected: false,
                    faceFirstDetected: null,
                    faceFirstLost: null
					//Call function that changes the VIDEO CONTENT
                  });
				  
				  //this.props.sendData(this.state.faceDetected); 
					
                }
              } else {
                // first time we lost it
                this.setState({
                  faceFirstLost: now
                });
              }
            }
        }
        drawLoop();
  }

  render() {
    return (
      <div>
	  
	    <div>Face detected: {this.state.faceDetected ? "Yes" : "No"}.<br />
        First detected: {this.state.faceFirstDetected}
		</div>
		 
		
		
	
	
		
		</div>
    );
  }
}

export default Gazer;
