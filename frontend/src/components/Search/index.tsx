import React, { MouseEventHandler } from "react";
import { Row, Col, Form, Button, InputGroup } from "react-bootstrap";

interface SearchProps {
    searchedParticipator: string;
    setSearchedParticipator: React.Dispatch<React.SetStateAction<string>>;
    handleSearchParticipator: MouseEventHandler<HTMLButtonElement>;
}

export const Search: React.FC<SearchProps> = ({ searchedParticipator, setSearchedParticipator, handleSearchParticipator }) => (
    <Row className="p-5 justify-content-md-center">
        <Col xs={12} md={{span: 8, offset: 3}} lg={{ span: 5, offset: 3 }}>
            <InputGroup>
                <Form.Control
                    placeholder="Nome do participante"
                    value={searchedParticipator}
                    onChange={ (e) => setSearchedParticipator(e.target.value) }
                />
                {searchedParticipator && <Button
                variant="outline-secondary"
                onClick={ () => setSearchedParticipator('') }>
                        Limpar
                </Button>}
                <Button
                variant="outline-secondary"
                onClick={handleSearchParticipator}>
                        { (searchedParticipator)? 'Buscar': 'Mostrar todos' }
                </Button>
            </InputGroup>
        </Col>
    </Row>
);
