import React, { useState } from 'react'
import './Home.css'
import { WebcamCapture } from './webcam/webcam'
import { isMobile } from 'react-device-detect';

const Home = () => {
    const [source, setSource] = useState("");


    const submitForm = () => {
        alert("Form submitted");
    }

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

    return (
        <div className="home-container">
            <div className="container">
                <div className="text">
                    {isMobile ? <h5>Loaded from mobile</h5> : <h5>Loaded from desktop</h5>}
                    <form className="form">
                        <WebcamCapture 
                        handleCapture={handleCapture}
                        />
                        <img src={source} />
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