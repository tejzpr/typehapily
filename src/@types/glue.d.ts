import Hapi from 'hapi';

interface Plugin {
    plugin: any;
    options?: any;
}

export interface Manifest {
    server: Hapi.ServerOptions;
    register: {
        plugins: Plugin[]
    };
}

declare module 'glue' {
    export function compose(manifest: Manifest, options:any): Promise<Hapi.Server>;
}