import http from 'http';
import https from 'https';
// import 'reflect-metadata';
import config from '@/config/app-config';
import app from '@/server/index';
import logger from '@/utils/logger';

function startServer() {
    try {
        http.createServer(app).listen(config.app.port);
        https.createServer({}, app).listen(443);
        logger.info(`Server started on port ${config.app.port}`);
    } catch (e) {
        console.error(e);
    }
}

startServer();