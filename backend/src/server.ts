import express from 'express';
import cors from 'cors';

import './database/DataSource';
import { routes } from "./routes/index";
import { appErrorHandler } from './midlewares/appErrorHandler';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
//app.use(appErrorHandler);

app.listen(3333, () => console.log('Server Launched'));
