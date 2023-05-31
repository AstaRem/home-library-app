import React from 'react';
import ContentWrapper from './ContentWrapper';
import '../css/Contact.css';

const OnLoan = () => {
  return (
<ContentWrapper pageTitle="Books On Loan">
    <div className="borrowed_books">
        <ul>
            <li>
                <div className="booksOnLoan_image_holder"></div>
            </li>
        </ul>

    </div>
</ContentWrapper>
    
  )
}

export default OnLoan