
# TypeHapily
A Typescript based boilerplate for HAPIJS with TypeORM & Dynamic Linting
 
### Run the following steps to start the project

1. npm install -g yarn typescript ts-node
2. yarn install
3. npm run build:live

###  Run the following to build the source for production
1. npm run build
2. Compiled javascirpt files can be found in the "dist" directory

### Creating new routes
New routes can be created by creating a route_name.ts file in the src/routes directory and then adding that file in src/routes/index.ts

### Changelog

#0.1.1
1. Removed required ENTITY_ROOT declaration
2. Added support for shortand module paths 
3. Added config/env for handling environment variables and server startup
4. Added Home.ts 
5. Added @types
6. Added coverage