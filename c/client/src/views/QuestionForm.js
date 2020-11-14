import React from 'react';
import Question from '../components/elements/Question';
import QuestionCount from '../components/elements/QuestionCount';
import QuestionOptions from '../components/elements/QuestionOptions';

export default QuestionForm = ({
    questionID,
    questionTotal,
    question,
    answerOptions
}) => {
    return(
        <div className="quiz"> 
            <QuestionCount counter={questionID} total={questionTotal} />
            <Question content={question} />
            <ul className="answerOptions">
                {answerOptions.map(renderAnswerOptions)}
            </ul>
        </div>

    )
}