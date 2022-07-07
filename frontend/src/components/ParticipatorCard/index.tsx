import React, { useState } from "react";

import { api } from "../../services/api";
import { getAge } from "../../services/getAge";
import { Participator } from "../../interfaces/Participator";
import { ParticipatorInfo } from "../ParticipatorInfo";
import { NewParticipatorForm } from "../NewParticipatorForm";
import { DangerConfirmation } from "../DangerConfirmation";

interface ParticipatorCardProps {
    participator: Participator;
    update: () => Promise<void>;
}

export const ParticipatorCard: React.FC<ParticipatorCardProps> = ({ participator, update }) => {
    const [isUpdating, setIsUpdating] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const { id, name, birthDate, courseType, period } = participator;

    async function handleUpdateParticipator(id: string) {
        setIsUpdating(true);
    }

    async function handleDeleteParticipator(id: string) {
        setIsDeleting(true);
    }

    async function deleteParticipator(id: string) {
        await api.delete(`participators/${id}`);
        update();
    }

    function cancel() {
        setIsUpdating(false);
        setIsDeleting(false);
    }

    return (
        <>
        {!isUpdating && !isDeleting &&
        <ParticipatorInfo
            id={id}
            name={name}
            age={getAge(birthDate)}
            courseType={courseType}
            period={period}
            handleUpdateParticipator={ () => handleUpdateParticipator(id)}
            handleDeleteParticipator={ () => handleDeleteParticipator(id)}
        />}
        {isUpdating &&
        <NewParticipatorForm cancel={cancel} participator={participator} update={update} />}
        {isDeleting &&
        <DangerConfirmation cancel={cancel} id={participator.id} doDanger={deleteParticipator} />}
        </>
    );
};
