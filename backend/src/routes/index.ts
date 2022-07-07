import { Router } from "express";

import { participatorsRouter } from "./participators.routes";

export const routes = Router();

routes.use('/participators', participatorsRouter);

routes.get('/', (req, res) => {
    return res.json({ 
        links: [{
                "href": "/participators",
                "rel": "participators",
                "type" : "GET",
                "optionalAttributes": [
                    "name"
                ]
            },
            {
                "href": "/participators",
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
            }
        ]
    });
});
