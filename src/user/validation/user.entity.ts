/* eslint-disable prettier/prettier */
import { Entity, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn } from "typeorm";
//Criando um entidade do usuário
//A entidade serve para definir as propriedades que um objeto tem e seus tipos

@Entity({name:"users"})
export class UserEntity{
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column({name:"name", length:100, nullable:false})
    name: string;

    @Column({name:"email", length:70, nullable:false})
    email: string;

    @Column({name:"password", length:255, nullable:false})
    password: string;

    @CreateDateColumn({name:"created_at"})
    createdAt: string;

    @UpdateDateColumn({name:"updated_at"})
    updatedAt: string;

    @DeleteDateColumn({name:"deleted_at"})
    deletedAt: string;  
}