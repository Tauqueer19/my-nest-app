import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Postgresuser{
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;
}