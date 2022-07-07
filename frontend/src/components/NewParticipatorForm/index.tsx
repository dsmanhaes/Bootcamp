import React, { useState } from "react";
import { Col, Card, Form, Button, ButtonGroup, Alert } from "react-bootstrap";

import { api } from "../../services/api";
import { getAge } from "../../services/getAge";
import { Participator } from "../../interfaces/Participator";

interface NewParticipatorFormProps {
    participator?: Participator;
    update: () => Promise<void>;
    cancel?: () => void;
}

export const NewParticipatorForm: React.FC<NewParticipatorFormProps> = ({ update, cancel = null, participator = null }) => {
    const [formError, setFormError] = useState('');
    const [newParticipatorName, setNewParticipatorName] = useState(participator? participator.name: '');
    const [newParticipatorBirthDate, setNewParticipatorBirthDate] = useState(participator? participator.birthDate.toString().split('T')[0]: '');
    const [newParticipatorCourseType, setNewParticipatorCourseType] = useState(participator? participator.courseType: '');
    const [newParticipatorPeriod, setNewParticipatorPeriod] = useState(participator? participator.period: '');

    async function handleAddParticipator() {
        if (!newParticipatorName) {
            setFormError('Insira o nome do participante');
            return;
        }
        if (!newParticipatorBirthDate) {
            setFormError('Insira a data de nascimento do participante');
            return;
        }
        if (getAge(newParticipatorBirthDate) < 18) {
            setFormError('O participante não pode ser menor de idade');
            return;
        }
        if (!newParticipatorCourseType) {
            setFormError('Insira o tipo de curso do participante');
            return;
        }
        if (newParticipatorCourseType == "Presencial" && !newParticipatorPeriod) {
            setFormError('Insira o período de estudo do participante');
            return;
        }

        try {
            if (participator) {
                await api.put<Participator>(`participators/${participator.id}`, {
                    name: newParticipatorName,
                    birthDate: new Date(newParticipatorBirthDate),
                    courseType: newParticipatorCourseType,
                    period: newParticipatorPeriod
                });
            } else {
                await api.post<Participator>('participators', {
                    name: newParticipatorName,
                    birthDate: new Date(newParticipatorBirthDate),
                    courseType: newParticipatorCourseType,
                    period: newParticipatorPeriod
                });
            }

            setFormError('');
            if (participator && cancel) {
                cancel();
            } else {
                handleClearNewParticipator();
            }
            update();
        } catch (err) {
            setFormError('Erro na adição de usuário.');
        }
    }

    function handleClearNewParticipator() {
        setNewParticipatorName('');
        setNewParticipatorBirthDate('');
        setNewParticipatorCourseType('');
        setNewParticipatorPeriod('');
    }

    return (
        <Col>
            <Card>
                <Card.Header as="h5">
                    <Form.Control
                        placeholder="Nome do participante"
                        value={newParticipatorName}
                        onChange={ (e) => setNewParticipatorName(e.target.value) }
                    />
                </Card.Header>
                <Card.Body>
                    <Card.Title>
                        <Form.Control
                            type="date"
                            value={newParticipatorBirthDate}
                            onChange={ (e) => setNewParticipatorBirthDate(e.target.value) }
                        />
                    </Card.Title>
                    <Card.Text>
                        <Form.Select
                        value={newParticipatorCourseType? newParticipatorCourseType: 'defaultValue'}
                        onChange={ (e) => setNewParticipatorCourseType(e.target.value) }>
                            <option value="">Tipo de Curso</option>
                            <option value="Presencial">Presencial</option>
                            <option value="EAD">EAD</option>
                        </Form.Select>
                        {newParticipatorCourseType == "Presencial" &&
                        <Form.Select
                        value={newParticipatorPeriod? newParticipatorPeriod: 'defaultValue'}
                        onChange={ (e) => setNewParticipatorPeriod(e.target.value) }>
                            <option value="">Período de estudo</option>
                            <option value="Manhã">Manhã</option>
                            <option value="Tarde">Tarde</option>
                            <option value="Noite">Noite</option>
                        </Form.Select>}
                    </Card.Text>
                    { formError && <Alert variant="danger">{ formError }</Alert>}
                    <ButtonGroup className=".align-bottom">
                        <Button variant="success" onClick={handleAddParticipator}>
                            Salvar
                        </Button>
                        {participator && cancel &&
                        <Button variant="danger" onClick={cancel}>
                            Cancelar
                        </Button>}
                        {!participator &&
                        <Button variant="danger" onClick={handleClearNewParticipator}>
                            Limpar
                        </Button>}
                    </ButtonGroup>
                </Card.Body>
            </Card>
        </Col>
    );
};
