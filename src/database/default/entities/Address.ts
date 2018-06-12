import {Entity, Column} from "typeorm";

export class Address {

    @Column({type: "varchar"})
    address1: string;

    @Column({type: "varchar", nullable: true})
    address2: string | null;

    @Column({type: "varchar"})
    city: string;

    @Column({type: "varchar"})
    state: string;

    @Column({type: "varchar"})
    country: string;

    @Column({type: "varchar"})
    zip: string;

    @Column({type: "varchar", nullable: true})
    mobilePhone: string | null;

    @Column({type: "varchar", nullable: true})
    homePhone: string | null;

    @Column({type: "varchar", nullable: true})
    workPhone: string | null;

    setAddress(address1:string, address2:string | null = null , city:string, state:string, country:string,
        zip:string, mobilePhone:string | null = null, homePhone:string | null = null, workPhone:string | null = null):Address {
        if (address1 && address1 != null && address1.length > 5) {
            this.address1 = address1;
        } else {
            throw Error("Address1 is not valid");
        }

        this.address2 = address2;
        this.city = city;
        this.state = state;
        this.country = country;
        this.zip = zip;
        this.mobilePhone = mobilePhone;
        this.homePhone = homePhone;
        this.workPhone = workPhone;
        return this;
    }
}