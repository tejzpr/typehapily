import {Entity, Column} from "typeorm";

export class Name {

    @Column({type: "varchar"})
    first: string;

    @Column({type: "varchar"})
    last: string;

    @Column({type: "varchar", nullable: true})
    middle: string|null;

    setName(first:string, middle:string | null = null , last:string):Name {
        this.first = first;
        this.last = last;
        return this;
    }
}