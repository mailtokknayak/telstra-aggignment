import React from 'react';
import {ListGroup, Card, ListGroupItem} from 'react-bootstrap'


function Profile(props) {
    return (
        <Card style={{width: '18rem'}}>
            <Card.Img variant="top" src={props.character.image}/>
            <Card.Body>
                <Card.Title>{props.character.name}</Card.Title>
                <Card.Subtitle
                    className="mb-2 text-muted">{props.character.id} - {props.character.created}</Card.Subtitle>
                <ListGroup className="list-group-flush">
                    <ListGroupItem>STATUS - {props.character.status}</ListGroupItem>
                    <ListGroupItem>SPECIES - {props.character.species}</ListGroupItem>
                    <ListGroupItem>GENDER - {props.character.gender}</ListGroupItem>
                    <ListGroupItem>ORIGIN - {props.character.origin.name}</ListGroupItem>
                    <ListGroupItem>LAST LOCATION - {props.character.location.name}</ListGroupItem>
                </ListGroup>
            </Card.Body>
        </Card>
    )
}

export default Profile;