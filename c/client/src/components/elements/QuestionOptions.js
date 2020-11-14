import React from 'react';
import CheckBox from './Checkbox';

export default AnswerOptions = ({
    answerType,
    answerContent,
    answer,
    onAnswerSelected
}) => {
    return(
        <li className="answerOptions">
            <CheckBox />
            
        </li>
    )
}