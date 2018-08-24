
# TypeHapily
A Typescript based boilerplate for HAPIJS with TypeORM & Dynamic Linting
 
### Run the following steps to start the project

1. npm install -g yarn typescript ts-node
2. yarn install
3. yarn serve

###  Run the following to build the source for production
1. yarn build
2. Compiled javascirpt files can be found in the "dist" directory

### Creating new routes
New routes can be created by creating a route_name.ts file in the src/routes directory and then adding that file in src/routes/index.ts

### Changelog
#### 1.0.0
> 1. Removed required ENTITY_ROOT declaration
> 2. Support for shorthand module paths 
> 3. config/env for handling environment variables and server startup 
> 4. Added @types
> 5. Added support for tests & coverage
> 6. Use custom TypeOrm fork for Oracle TNS support 
> 7. Added support for Global Route Prefix