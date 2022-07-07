import "reflect-metadata";
import { DataSource } from "typeorm";

import { Participator } from "../models/Participator";

export const dataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "mysql",
    database: "bootcamp",
    synchronize: true,
    entities: [Participator]
});

dataSource.initialize().then(() => {
    console.log("Data Source has been initialized!");
})
.catch((err) => {
    console.error("Error during Data Source initialization", err);
})
