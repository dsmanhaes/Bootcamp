import React from "react";
import { Col, Card, ButtonGroup, Button } from "react-bootstrap";

interface DangerConfirmationProps {
    id: string;
    cancel(id: string): void;
    doDanger(id: string): Promise<void>;
}

export const DangerConfirmation: React.FC<DangerConfirmationProps> = ({ id, cancel, doDanger }) => (
    <Col>
        <Card>
            <Card.Body>
                <Card.Title>Você tem certeza?</Card.Title>
                <ButtonGroup className=".align-bottom">
                    <Button
                    variant="outline-secondary"
                    onClick={ () => cancel(id) }>
                        Não
                    </Button>
                    <Button
                    variant="danger"
                    onClick={ () => doDanger(id) }>
                        Sim
                    </Button>
                </ButtonGroup>
            </Card.Body>
        </Card>
    </Col>
);
