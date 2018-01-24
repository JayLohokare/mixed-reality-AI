import React from 'react';

class Tracking extends React.Component {

  componentDidMount() {
    this.setup();
  }

  setup() {
    var video = document.getElementById('video');
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    var tracker = new window.tracking.ObjectTracker('face');
    tracker.setInitialScale(4);
    tracker.setStepSize(2);
    tracker.setEdgesDensity(0.1);
    window.tracking.track('#video', tracker, { camera: true });
    console.log("tracking set up");
    tracker.on('track', function(event) {
      const numOfFaces = event.data.length;
      window.numOfFaces = numOfFaces;
      // console.log("Num of faces: " + numOfFaces);
      //context.clearRect(0, 0, canvas.width, canvas.height);
      /*event.data.forEach(function(rect) {
        context.strokeStyle = '#a64ceb';
        context.strokeRect(rect.x, rect.y, rect.width, rect.height);
        context.font = '11px Helvetica';
        context.fillStyle = "#fff";
        context.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11);
        context.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22);
      });*/
    });
    /*var gui = new window.dat.GUI();
    gui.add(tracker, 'edgesDensity', 0.1, 0.5).step(0.01);
    gui.add(tracker, 'initialScale', 1.0, 10.0).step(0.1);
    gui.add(tracker, 'stepSize', 1, 5).step(0.1);*/
  }

  render() {
    return (<div>
        <div className="demo-frame" style={{ visibility: "hidden", height: 0 }}>
          <div className="demo-container">
            <video id="video" width="320" height="240" autoPlay loop muted></video>
            <canvas id="canvas" width="320" height="240"></canvas>
          </div>
      </div>
    </div>);
    //return <div></div>;
  }
}

export default Tracking;