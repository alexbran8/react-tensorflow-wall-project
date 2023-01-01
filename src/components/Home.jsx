import React, { useState } from "react";
import "./Home.css";
// import { WebcamCapture } from './webcam/webcam'
import { isMobile } from "react-device-detect";
import { useEffect } from "react";
import Webcam from "react-webcam";

import * as cocoSsd from "@tensorflow-models/coco-ssd";
import * as tf from "@tensorflow/tfjs";

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

const Home = () => {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );
  const [source, setSource] = useState("");
  //   const [isCameraEnabled, setIsCameraEnabled] = useState(false);
  const webcamRef = React.useRef(null);
  const [model, setModel] = useState(null);

  const [videoWidth, setVideoWidth] = useState(960);
  const [videoHeight, setVideoHeight] = useState(640);

  async function loadModel() {
    try {
      const model = await cocoSsd.load();
      setModel(model);
      console.log("set loaded Model");
    } catch (err) {
      console.log(err);
      console.log("failed load model");
    }
  }

  useEffect(() => {
    tf.ready()
      .then(() => setVideoWidth(webcamRef.current.video.videoWidth))
      .then(() => setVideoHeight(webcamRef.current.video.videoHeight))
      .then(() => loadModel())
      .then(() => predictionFunction());
  }, [model]);

  async function predictionFunction() {
    try {
      console.log("started to predict");
      //Clear the canvas for each prediction
      var cnvs = document.getElementById("myCanvas");
      var ctx = cnvs.getContext("2d");
      ctx.clearRect(
        0,
        0,
        webcamRef.current.video.videoWidth,
        webcamRef.current.video.videoHeight
      );
      //Start prediction
      const predictions = await model.detect(document.getElementById("img"));
      if (predictions.length > 0) {
        console.log(predictions);
        for (let n = 0; n < predictions.length; n++) {
          if (predictions[n].score > 0.2) {
            //Threshold is 0.8 or 80%
            //Extracting the coordinate and the bounding box information
            let bboxLeft = predictions[n].bbox[0];
            let bboxTop = predictions[n].bbox[1];
            let bboxWidth = predictions[n].bbox[2];
            let bboxHeight = predictions[n].bbox[3] - bboxTop;
            console.log("bboxLeft: " + bboxLeft);
            console.log("bboxTop: " + bboxTop);
            console.log("bboxWidth: " + bboxWidth);
            console.log("bboxHeight: " + bboxHeight);
            //Drawing begin
            ctx.beginPath();
            ctx.font = "28px Arial";
            ctx.fillStyle = "red";
            ctx.fillText(
              predictions[n].class +
                ": " +
                Math.round(parseFloat(predictions[n].score) * 100) +
                "%",
              bboxLeft,
              bboxTop
            );
            ctx.rect(bboxLeft, bboxTop, bboxWidth, bboxHeight);
            ctx.strokeStyle = "#FF0000";
            ctx.lineWidth = 1;
            ctx.stroke();
            console.log("detected");
          }
        }
      }
      //Rerun prediction by timeout
      setTimeout(() => predictionFunction(), 100);
    } catch (error) {
      console.log(error);
    }
  }

  const videoConstraints = {
    height: windowDimensions.height * 0.75,
    width: windowDimensions.width * 0.75,
    maxWidth: "100vw",
    facingMode: !isMobile ? "environment" : { exact: "environment" },
  };

  const handleCapture = (target) => {
    if (target.files) {
      if (target.files.length !== 0) {
        const file = target.files[0];
        const newUrl = URL.createObjectURL(file);
        setSource(newUrl);
      }
    } else {
      console.log(target);
      setSource(target);
    }
  };

  return (
    <div className="home-container">
      <div className="container">
        <div className="text">
          {isMobile ? <h5>Mobile</h5> : <h5>Desktop mode</h5>}
        </div>
        <div
          className="absolute-element"
          style={{ top: "200px", zIndex: "999" }}
        >
          <canvas
            // className="absolute-element"
            id="myCanvas"
            width={videoWidth}
            height={videoHeight}
            style={{ top: "200px", backgroundColor: "transparent" }}
          />
        </div>
        <div className="absolute-element">
          {/* <img
          style={{ width: videoWidth, objectFit: "fill" }}
          id="img"
          src={imageData}
        ></img>   <Webcam
        audio={false}
        id="img2"
        ref={webcamRef}
        // width={640}
        screenshotQuality={1}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
      /> */}
          <Webcam
            audio={false}
            className="absolute-element"
            id="img"
            ref={webcamRef}
            // width={640}
            screenshotQuality={1}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
          />
        </div>
      </div>
    </div>
  );
};
export default Home;
