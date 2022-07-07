import React, { useState } from "react";
import { Container, Row } from "react-bootstrap";

import { api } from "../services/api";
import { Participator } from "../interfaces/Participator";
import { Search } from "../components/Search";
import { NewParticipatorForm } from "../components/NewParticipatorForm";
import { ParticipatorCard } from "../components/ParticipatorCard";

interface Response {
    participators: Participator[];
}

export const Dashboard: React.FC = () => {
    const [searchedParticipator, setSearchedParticipator] = useState('');
    const [participators, setParticipators] = useState<Participator[]>(() => {
        handleSearchParticipator();
        return [];
    });

    async function handleSearchParticipator() {
        const response = await api.get<Response>(`participators?name=${searchedParticipator}`);
        const searchedParticipators = response.data.participators;
        
        setParticipators([...searchedParticipators]);
    }

    return (
        <Container className="p-5 text-center">
            <h1>Lista de Participantes do Bootcamp</h1>
            <Search
                searchedParticipator={searchedParticipator}
                setSearchedParticipator={setSearchedParticipator}
                handleSearchParticipator={handleSearchParticipator}
            />
            <Row xs={1} sm={2} md={3} xl={4} xxl={5} className="g-4">
                <NewParticipatorForm update={handleSearchParticipator} />
                { participators.map((participator) => (
                    <ParticipatorCard
                        key={participator.id}
                        participator={participator}
                        update={handleSearchParticipator}
                    />
                ))}
            </Row>
        </Container>
    );
};
