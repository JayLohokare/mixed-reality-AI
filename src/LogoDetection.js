import React from 'react';

class LogoDetection extends React.Component {

  componentDidMount() {
    // this.setup();
  }

  setup() {
    let video = document.getElementById('videoInput');
    let src = new window.cv.Mat(video.height, video.width, window.cv.CV_8UC4);
    let dst = new window.cv.Mat(video.height, video.width, window.cv.CV_8UC4);
    let gray = new window.cv.Mat();
    let cap = new window.cv.VideoCapture(video);
    let faces = new window.cv.RectVector();
    let classifier = new window.cv.CascadeClassifier();

    // load pre-trained classifiers
    classifier.load('haarcascade_frontalface_default.xml');

    const FPS = 30;
    function processVideo() {
        try {
            let begin = Date.now();
            // start processing.
            cap.read(src);
            src.copyTo(dst);
            window.cv.cvtColor(dst, gray, window.cv.COLOR_RGBA2GRAY, 0);
            // detect faces.
            classifier.detectMultiScale(gray, faces, 1.1, 3, 0);
            // draw faces.
            for (let i = 0; i < faces.size(); ++i) {
                let face = faces.get(i);
                let point1 = new window.cv.Point(face.x, face.y);
                let point2 = new window.cv.Point(face.x + face.width, face.y + face.height);
                window.cv.rectangle(dst, point1, point2, [255, 0, 0, 255]);
            }
            window.cv.imshow('canvasOutput', dst);
            // schedule the next one.
            let delay = 1000/FPS - (Date.now() - begin);
            setTimeout(processVideo, delay);
        } catch (err) {
        }
    };

    // schedule the first one.
    setTimeout(processVideo, 0);
  }

  render() {
    return <div></div>;
    /*return (
      <div>
        <video id="videoInput" width="320" height="240"></video>
        <canvas id="canvasOutput" width="320" height="240"></canvas>
      </div>
    );*/
  }
}

export default LogoDetection;
