import { Connection, getConnection, EntityManager, Repository} from 'typeorm';
import {User} from '@database/entities/User';
import {Name} from '@database/entities/Name';
import {Address} from '@database/entities/Address';

export async function createUser(fname:string, mname:string|null , lname:string, username:string, password:string,
    dob:string, email:string, recoveryEmail:string|null, address1:string, address2:string|null, city:string,
    state:string, country:string, zip:string, mobilephone:string, homephone:string, workphone:string):Promise<boolean> {
    const userRepository:Repository<User> = getConnection().getRepository(User);
    const user:User = new User();
    user.name = new Name().setName(fname, mname, lname);
    user.email = email;
    user.username = username;
    user.password = password;
    user.dob = new Date(dob);
    user.recoveryEmail = recoveryEmail == null ? user.email : recoveryEmail;
    user.address = new Address().setAddress(address1, address2, city, state, country, zip, mobilephone, homephone, workphone);
    let status:User = await userRepository.save(user);
    return true;
}