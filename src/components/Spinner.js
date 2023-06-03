import React from 'react';
import { FallingLines } from  'react-loader-spinner';
import "../css/Spinner.css";

const Spinner = () => {
  return (
    <div className="overlay_trans">
        <FallingLines
              color="#4fa94d"
              width="200"
              visible={true}
              ariaLabel='falling-lines-loading'
            />
    </div>
  )
}

export default Spinner