import "reflect-metadata";
import * as Dotenv from 'dotenv';
import * as Hapi from 'hapi';
import * as blipp from "blipp";
import * as good from 'good';
import Glue from 'glue';
import GoodWinston from 'good-winston';
import winston from 'winston';
import * as Boom from 'boom';
import {forEach as lodashForEach} from 'lodash';

import {default as logger} from './utilities/logger';

import {DBConnections} from './database';

import * as routes from './routes';

const goodWinstonStream:any = new GoodWinston({ winston });
logger(winston);

//This should be before anything else
Dotenv.config();

const manifest:any = {
    server: {
        host: "localhost",
        port: process.env.PORT,
        routes: {
            validate: {
              failAction: async (request:any, h:any, err:any):Promise<void> => {
                if (process.env.NODE_ENV === 'production') {
                  // In prod, log a limited error message and throw the default Bad Request error.
                  winston.error('ValidationError:', err.message);
                  throw Boom.badRequest(`Invalid request payload input`);
                } else {
                  winston.error(err);
                  throw err;
                }
              }
            }
          }
    },
    register: {
        plugins: [
            {
                plugin: blipp,
            },
            {
                plugin: good,
                options: {
                    reporters:{
                      winston: [ goodWinstonStream ]
                    }
                }
            },
        ]
    }
};

(async ():Promise<void> => {
    try {
        winston.info("Server starting..");
        await DBConnections.init();
        const server:Hapi.Server = await Glue.compose(manifest, {relativeTo: __dirname });
        let serverRoutes:any = [];
        lodashForEach(routes, (value:any, key:any) => {
            serverRoutes.push(...value);
        });
        server.route(serverRoutes);
        await server.start();
        winston.info(`Typehapily Server running at: ${server.info.uri}`);
    } catch (e) {
        winston.error(e);
    }
})();