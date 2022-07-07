import { Request, Response, Router } from "express";
import 'express-async-errors';
import { Like } from "typeorm";

import { dataSource } from "../database/DataSource"
import { Participator } from "../models/Participator";
import CreateParticipatorService from "../Services/CreateParticipatorService";
import DeleteParticipatorService from "../Services/DeleteParticipatorService";
import UpdateParticipatorService from "../Services/UpdateParticipatorService";

export const participatorsRouter = Router();

function getRouteLinks() {
    const links = [{
        "href": "/",
        "rel": "participators",
        "type" : "GET"
    },
    {
        "href": "/",
        "rel": "participators",
        "type" : "POST",
        "attributes": [
            "name",
            "birthDate",
            "courseType"
        ],
        "optionalAttributes": [
            "period"
        ]
    }];
    return links;
}

function addParticipatorLinks(participator: Participator) {
    const putLink = {
        href: `/${participator.id}`,
        rel: 'participator',
        type: 'PUT',
        "attributes": [
            "name",
            "birthDate",
            "courseType"
        ],
        "optionalAttributes": [
            "period"
        ]
    }
    const deleteLink = {
        href: `/${participator.id}`,
        rel: 'participator',
        type: 'DELETE'
    };
    participator.links = [ putLink, deleteLink ];
}

participatorsRouter.get('/', async (req, res) => {
    const { name } = req.query;

    const participatorsRepository = dataSource.getRepository(Participator);

    const participators = name
    ? await participatorsRepository.find({
        order: { name: 'ASC' },
        where: { name: Like(`%${name.toString()}%`) }
    })
    : await participatorsRepository.find({
        order: { name: 'ASC' }
    });

    participators.forEach((participator) => {
        addParticipatorLinks(participator);
    });

    return res.json({ participators: participators, links: getRouteLinks() });
});

participatorsRouter.post('/', async (req, res) => {
    const { name, birthDate, courseType, period} = req.body;
    const dateOfBirth = new Date(birthDate);

    const createParticipator = new CreateParticipatorService();
    const participator = await createParticipator.execute({
        name,
        birthDate: dateOfBirth,
        courseType,
        period: (!period)? null: period
    });

    addParticipatorLinks(participator);

    return res.json(participator);
});

participatorsRouter.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, birthDate, courseType, period} = req.body;
    const dateOfBirth = new Date(birthDate);
    
    const updateParticipatorService = new UpdateParticipatorService();
    const participator = await updateParticipatorService.execute({
        id,
        name,
        birthDate: dateOfBirth,
        courseType,
        period
    });
    
    addParticipatorLinks(participator);

    return res.json(participator);
});

participatorsRouter.delete('/:id', async (req, res) => {
    const { id } = req.params;
    
    const deleteParticipatorService = new DeleteParticipatorService();
    await deleteParticipatorService.execute({ id });

    return res.status(204).send();
});
