import React from 'react';
import PropTypes from 'prop-types';

export default Question = ({
    content
}) => {
    return(
    <h2 className="question"> {content}</h2>
    )
}