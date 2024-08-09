// import React from "react";
// import Scorm from "./Scorm";

// const App = () => {
//   return (
//     <div>
//       <h1>SCORM Integration</h1>
//       <Scorm />
//     </div>
//   );
// };

// export default App;


// App.js

// import React from 'react';
// import VideoPlayer from './VideoPlayer';

// const App = () => {
//   const videoUrl = 'https://testvideo-1bd7.onrender.com/manifest.mpd'; // Update with your video URL

//   return (
//     <div>
//       <h1>Video Player</h1>
//       <VideoPlayer url={videoUrl} />
//     </div>
//   );
// };

// export default App;

import React from 'react';
import VoicetoText from './VoicetoText';

function App() {
  return (
    <div className="App">
      <VoicetoText/>
    </div>
  );
}

export default App;
