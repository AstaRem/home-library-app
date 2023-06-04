import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../css/Rating.css';

const Rating = (props) => {

const maxRating = 5; // Total number of stars
const filledStars = props.ratings; // Number of filled stars
const emptyStars = maxRating - filledStars; // Number of empty stars

    return (
        <div className="ratings_overlay">
        {/* Filled stars */}
        {Array.from({ length: filledStars }).map((_, index) => (
            <FontAwesomeIcon icon="fa-solid fa-star" key={`filled-star-${index}`} className="star filled" />
        ))}
        

        {/* Empty stars */}
        {Array.from({ length: emptyStars }).map((_, index) => (
            <FontAwesomeIcon icon="fa-solid fa-star" key={`empty-star-${index}`} className="star empty" />
        ))}
        </div>
    );
}

export default Rating
