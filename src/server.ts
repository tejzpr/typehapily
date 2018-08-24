import "reflect-metadata";
import * as env from './configs/env';
import chalk from 'chalk';
import * as Hapi from 'hapi';
import * as blipp from "blipp";
import * as good from 'good';
import * as inert from 'inert';
import * as vision from 'vision';
import Glue from 'glue';
import logger from '@logger';
import * as Boom from 'boom';
import {forEach as lodashForEach} from 'lodash';

import {DBConnections} from './database';

import * as routes from '@routes/index';

// TODO: Fix this
// const GoodWinston: any = require("good-winston");
// const goodWinstonStream:any = new GoodWinston({ winston: logger });

const manifest:Glue.Manifest = {
    server: {
        host: env.HOST,
        port: env.PORT,
        routes: {
            validate: {
                failAction: async (request:any, h:any, err:any):Promise<void> => {
                if (env.NODE_ENV === 'production') {
                    // In prod, log a limited error message and throw the default Bad Request error.
                    logger.error('ValidationError:', err.message);
                    throw Boom.badRequest(`Invalid request payload input`);
                } else {
                    logger.error(err);
                    throw err;
                }
                }
            }
        },
        state: {
            // If your cookie format is not RFC 6265, set this param to false.
            strictHeader: false
        },
    },
    register: {
        plugins: [
            {
                plugin: inert,
            },
            {
                plugin: vision,
            },
            {
                plugin: blipp,
            },
            // TODO: Fix this
            /*
            {
                plugin: good,
                options: {
                    reporters:{
                      winston: [ goodWinstonStream ]
                    }
                }
            },
            */
        ]
    }
};

interface HapiServerWithVision extends Hapi.Server {
    views(options: vision.ServerViewsConfiguration): vision.ViewManager;
}

export const getServer: () => Promise<Hapi.Server> = async (): Promise<Hapi.Server> => {
    logger.info(`Server starting: ${new Date().toISOString()}`);

    // await DBConnections.init();

    const server:HapiServerWithVision = await Glue.compose(manifest, {relativeTo: __dirname }) as HapiServerWithVision;
    let serverRoutes:any = [];

    server.state('token', {
        ttl: null,
        isSecure: false, //(!(env.NODE_ENV === 'development')),
        isHttpOnly: true,
        clearInvalid: true,
        strictHeader: true
      });

    server.views({
        engines: {
            html: require('handlebars')
        },
        relativeTo: __dirname,
        path: './templates',
        layoutPath: './templates/layout',
        helpersPath: './templates/helpers'
    });

    let ROUTE_PREFIX:string = "";
    if (env.GLOBAL.ROUTE_PREFIX) {
        ROUTE_PREFIX = env.GLOBAL.ROUTE_PREFIX;
    }

    lodashForEach(routes, (value:any, key:any) => {
        serverRoutes.push(...value.map((route:any) => {
            route.path = ROUTE_PREFIX + route.path;
            return route;
        }));
    });
    server.route(serverRoutes);
    return server;
};

export const startServer:() => Promise<void> = async (): Promise<void> => {
    try {
        const server: Hapi.Server = await getServer();
        server.start();
        console.info(chalk.bgBlack(chalk.cyan(`Server running at: ${server.info.uri}`)));
        logger.info(`Server started at: ${new Date().toISOString()}`);
    } catch (e) {
        logger.error(e);
    }
};

if (require.main === module) {
    startServer();
} else {
    logger.info('Server setup for testing.');
}
