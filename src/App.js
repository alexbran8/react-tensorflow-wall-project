import React, { useState } from 'react';
import { WebcamCapture} from './components/webcam/webcam'
import {isMobile} from 'react-device-detect';


function App() {
  // const classes = useStyles();


  const [source, setSource] = useState("");



  ;const handleCapture = (target) => {
    if (target.files) {
      if (target.files.length !== 0) {
        const file = target.files[0];
        const newUrl = URL.createObjectURL(file);
        setSource(newUrl);
      }
    }
  }

  return (
    <div>
          <h5>Capture your image</h5>
          {isMobile ? <h5>Loaded from mobile</h5>:<h5>Loaded from desktop</h5>}
          {/* { source && <img src={source} alt={"snap"} ></img> } */}
          <WebcamCapture/>
          <input
            accept="image/*"
            // className={classes.input}
            id="icon-button-file"
            type="file"
            capture="environment"
            onChange={(e) => handleCapture(e.target)}
          />
    </div>
  );
}


export default App;