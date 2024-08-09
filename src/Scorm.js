import React from "react";
import { withScorm } from "react-scorm-provider";

const Scorm = (props) => {
    return (
      <div>
        <iframe
          src="scorm/scormcontent/index.html"
          height="600px"
          width="900px"
          title="Scorm Package URL"
        />
        <br />
        <button onClick={() => { console.log(props); }}>
          Click Me
        </button>
      </div>
    );
}

export default withScorm()(Scorm);