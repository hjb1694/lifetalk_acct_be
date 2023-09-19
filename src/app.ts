import { Server, createServer } from "node:http";
import express, { Application, Request, Response } from "express";
import config from "./config";
import appDataSource from './database';
import 'reflect-metadata';

async function init() {

    const app: Application = express();
    const svr: Server = createServer(app);

    app.get('/', (req: Request, res: Response) => {

        res.send('<h1>Hello World!</h1>');

    });

    const onListenSuccess = () => {
        console.log(`Listening on port ${config.port}`);
        onServerClose();
    }

    const onServerError = (err: NodeJS.ErrnoException) => {
        console.error(err);
        process.exit(0);
    }

    const onServerClose = () => {
        console.log('Connection Closed');
        process.exit(0);
    }

    svr.on('error', onServerError);
    svr.on('close', onServerClose);

    await appDataSource.initialize();

    svr.listen(+config.port, onListenSuccess);

    process.on('SIGTERM', () => {
        svr.close();
        onServerClose();
    });

}

init();


