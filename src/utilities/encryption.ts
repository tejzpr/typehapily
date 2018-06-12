import {randomBytes, pbkdf2} from 'crypto';

const HASH_ITERATIONS:number = 11024;

export function createHash(input:string, salt:string|null):Promise<{salt:string, hash:string}> {
    let in_salt:string = salt != null ? salt : randomBytes(128).toString('base64');
    return new Promise((resolve:any, reject:any):any => {
        return pbkdf2(input, in_salt, HASH_ITERATIONS, 512, 'sha512', (err:any, hash:Buffer) => {
            if (err) {
                return reject(err);
            }
            return resolve({
                salt: in_salt,
                hash: hash.toString('base64')
            });
        });
    });
}

