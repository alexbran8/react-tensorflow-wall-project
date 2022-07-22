import React, { useState } from 'react';
import Webcam from "react-webcam";






export const WebcamCapture = (props) => {

    const [image, setImage] = useState('');
    const webcamRef = React.useRef(null);

    const videoConstraints = {
        width: 220,
        height: 200,
        facingMode: props.mode
    };
    console.log(videoConstraints)


    const capture = React.useCallback(
        () => {
            const imageSrc = webcamRef.current.getScreenshot();
            setImage(imageSrc)
            props.handleCapture(imageSrc)
        });


    return (
        <div className="webcam-container">
            <div className="webcam-img">

                {image === '' ? <Webcam
                    audio={false}
                    // height={300}
                    ref={webcamRef}
                    id="img"
                    screenshotFormat="image/jpeg"
                    // width={300}
                    videoConstraints={videoConstraints}
                /> : null}
            </div>
            <div>
                {image !== '' ?
                    <><button onClick={(e) => {
                        e.preventDefault();
                        setImage('')
                    }}
                        className="webcam-btn">
                        Retake Image</button>    <button onClick={(e) => {
                            e.preventDefault();
                            capture();
                        }}
                            className="webcam-btn">Close Camera</button></> :
                    <button onClick={(e) => {
                        e.preventDefault();
                        capture();
                    }}
                        className="webcam-btn">Capture</button>
                }
            </div>
        </div>
    );
};