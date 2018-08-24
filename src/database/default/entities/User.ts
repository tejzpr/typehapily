import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from "typeorm";
import {IsDate, IsEmail} from "class-validator";
import {createHash} from '@utilities/encryption';
import { Name } from './Name';
import { Address } from './Address';

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: "30", unique: true })
    username: string;

    @Column()
    password: string;

    @Column()
    salt: string;

    @Column()
    @IsEmail()
    email: string;

    @Column({ default: true })
    isActive: boolean;

    @Column((type:Name) => Name)
    name: Name;

    @Column({ default: false })
    isMinor: boolean;

    @Column()
    @IsEmail()
    recoveryEmail: string;

    @Column({type: "time without time zone"})
    @IsDate()
    dob: Date;

    @Column((type:Address) => Address)
    address: Address;

    @Column({ type: 'timestamp', default: ():any => 'CURRENT_TIMESTAMP'})
    @IsDate()
    createdOn: Date;

    @Column({ type: 'timestamp', default: ():any => 'CURRENT_TIMESTAMP'})
    @IsDate()
    updatedOn: Date;


    @BeforeInsert()
    async hashPassword():Promise<void> {
        try {
         let hashObj:{salt:string, hash:string} = await createHash(this.password, null);
         this.salt = hashObj.salt;
         this.password = hashObj.hash;
        } catch (e) {
            throw e;
        }
    }
}