import React from 'react';
import Card from 'react-bootstrap/Card';

export const Cards = ({
    title,
    body,
    image,
}) => {
    return(
        <>
            <Card>
                <Card.Body>
                    This is some text within a card body
                </Card.Body>
            </Card>
        </>
    );
}