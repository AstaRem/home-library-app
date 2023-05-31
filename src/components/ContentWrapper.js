import React from 'react';
import '../css/ContentWrapper.css';

const ContentWrapper = (props) => {
  return (
    <div className='content_wrapper'>
        <div className="container">
            <div className="page_title">{props.pageTitle}</div>
            <div className="page_wrapper">
               <div className="pageContent">{props.children}</div>
            </div>      
        </div>
    </div>
  )
}

export default ContentWrapper