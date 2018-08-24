export default [
    {
        path: "/ping",
        method:"GET",
        handler: (): string => {
            return 'OK';
        },
    }
];