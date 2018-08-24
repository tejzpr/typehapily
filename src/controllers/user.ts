import Joi from 'joi';
import * as UserRepository from '@database/repositories/UserRepository';

export const createUserValidationSchema:any = {
    fname: Joi.string().required(),
    mname: Joi.string(),
    lname: Joi.string().required(),
    username: Joi.string().alphanum().min(3).max(30).required(),
    // Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character
    password: Joi.string().regex( /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/).required(),
    dob: Joi.date().iso().required(),
    email: Joi.string().email().required(),
    recoveryEmail: Joi.string().email(),
    address1: Joi.string().required(),
    address2: Joi.string(),
    state: Joi.string().required(),
    city: Joi.string().required(),
    country: Joi.string().required(),
    zip: Joi.string().required(),
    mobilephone: Joi.string().required(),
    homephone: Joi.string(),
    workphone: Joi.string()
};
export async function createUserController(request:any, response:any):Promise<string> {
    try {
        const payload:any = request.payload;
        await UserRepository.createUser(payload.fname, payload.mname, payload.lname, payload.username, payload.password, payload.dob,
        payload.email, payload.recoveryEmail, payload.address1, payload.address2, payload.city, payload.state, payload.country,
        payload.zip, payload.mobilephone, payload.homephone, payload.workphone);
        return "OK";
    } catch (e) {
        console.error(e);
        return "ERROR";
    }
}