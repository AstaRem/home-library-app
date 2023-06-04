import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../css/Read.css';

const Read = (props) => {
  return (
    <div className="circle_overlay">
        <FontAwesomeIcon icon="fa-solid fa-book-open-reader"  className={`icn_read ${props.read ? "read" : ""}`} />
    </div>
  )
}

export default Read