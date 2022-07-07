import React from "react";
import { Col, Card, ButtonGroup, Button } from "react-bootstrap";

interface ParticipatorInfoProps {
    id: string;
    name: string;
    age: number;
    courseType: string;
    period: string;
    handleUpdateParticipator(id: string): Promise<void>;
    handleDeleteParticipator(id: string): Promise<void>;
}

export const ParticipatorInfo: React.FC<ParticipatorInfoProps> = ({ id, name, age, courseType, period, handleUpdateParticipator, handleDeleteParticipator }) => (
    <Col>
        <Card>
            <Card.Header as="h5">{name}</Card.Header>
            <Card.Body>
                <Card.Title>{age} anos</Card.Title>
                <Card.Text>
                    Cursa {courseType}{courseType == 'Presencial'? ` no período da ${period}`:''}.
                </Card.Text>
                <ButtonGroup className=".align-bottom">
                    <Button
                    variant="outline-secondary"
                    onClick={ () => handleUpdateParticipator(id) }>
                        Editar
                    </Button>
                    <Button
                    variant="danger"
                    onClick={ () => handleDeleteParticipator(id) }>
                        Apagar
                    </Button>
                </ButtonGroup>
            </Card.Body>
        </Card>
    </Col>
);
