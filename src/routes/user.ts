import {createUserController, createUserValidationSchema} from '../controllers/user';

export default [
    {
        path: "/user/create",
        method:"POST",
        config: {
            validate: {
                payload: createUserValidationSchema
            }
        },
        handler: createUserController,
    }
];