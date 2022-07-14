import React, { useState } from 'react'
import './Home.css'
import { WebcamCapture } from './webcam/webcam'
import { isMobile } from 'react-device-detect';
import { useEffect } from 'react';


const Home = () => {
    const [source, setSource] = useState("");
    const [isCameraEnabled, setIsCameraEnabled] = useState(false)

    const handleCapture = (target) => {
        if (target.files) {
            if (target.files.length !== 0) {
                const file = target.files[0];
                const newUrl = URL.createObjectURL(file);
                setSource(newUrl);
            }
        }
        else {
            console.log(target)
            setSource(target);
        }
    }

    useEffect(()=>{

    },[])

    return (
        <div className="home-container">
            <div className="container">
                <div className="text">
                    {isMobile ? <h5>Loaded from mobile</h5> : <h5>This application works in desktop mode</h5>}
                    
                    <form className="form">
                        <h3>You can either take on image using the camera</h3>
                        <div className="camera-container">
                        { isCameraEnabled ? <>
                        Take snapshot picture
                        {/* this works as frontcam */}
                        {isMobile ? 
                        <WebcamCapture
                            handleCapture={handleCapture}
                            mode={{exact:"environment"}}
                        />
                        :
                        <WebcamCapture
                        handleCapture={handleCapture}
                        mode={"user"}
                    />
                        }
                        </> : <div> <button onClick={(e) => {
                            setIsCameraEnabled(!isCameraEnabled)
              
                    }}
                        className="webcam-btn">
                        Enable Camera</button> : </div> }
                        </div>
                        {source?<img src={source} alt="the_wall" /> : <div>... waiting for the image to be loaded</div>}
                        <h3>OR</h3>
                        <h3>You can load one image using the below file looader</h3>
                        this works as back camera on mobile
                        <input
                            accept="image/*"
                            // className={classes.input}
                            id="icon-button-file"
                            type="file"
                            capture="environment"
                            onChange={(e) => handleCapture(e.target)}
                        />
                     
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Home