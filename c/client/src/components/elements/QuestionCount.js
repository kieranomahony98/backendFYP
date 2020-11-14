import React from 'react';

export default questionCount = ({
    counter,
    total
}) => {
    return(
        <div className="questionCount"> 
            Question <span>{counter}</span> of <span>{total}</span>
        </div>
    );
}