export default [
    {
        path: '/{path*}',
        method:"GET",
        config: {
            cache: {
                privacy: 'private',
                expiresIn: 86400 * 1000
            }
        },
        handler: ((request: any, reply: any):string => {
            return reply.view('index');
        }),
    }
];