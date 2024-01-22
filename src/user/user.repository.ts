/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { UserEntity } from "./validation/user.entity";

//Classe que será instanciada no controller da API
//Aqui existirá as funções que serão executadas dentro dos métodos da api
@Injectable() //O decorator Injectable transforma uma classe em um provider
export class UserRepository{
    private users:UserEntity[] = []; //lista de usuários

    //Funções que poderão ser acessadas depois que a classe for instanciada

    //POST
    async save(user: UserEntity){//Função para dar push na lista de users com os usuários passados no parâmetro
        this.users.push(user); 
    }
    //GET
    async listUser(){//Função para exibir os usuários salvos na lista 
        return this.users;
    }

    async emailExist(email:string){
        const possibleUser = this.users.find(//Váriavel para armazenar se um possivel usuário foi encontrado
            user => user.email === email //se o .find não encontrar um email igual, será retornado "undefined"
        )

        return possibleUser !== undefined
    }

    private searchId(id:string){
        const possibleUser = this.users.find(
            saveUser => saveUser.id === id
        );

        if(!possibleUser){
            throw new Error("Usuário não existe")
        }
        return possibleUser;
    }

    async update(id:string, newData: Partial<UserEntity>) {//Dizendo que oque vai ser recebido é parcialmente igual a entidade de usuário
        const user = this.searchId(id);

        Object.entries(newData).forEach(([key, value])=>{
            if(key === "id"){
                return;
            }

            user[key] = value;
        })
        return user;
    }

    async remove(id: string){
        const user = this.searchId(id);
        this.users = this.users.filter(
            savedUser => savedUser.id !== id
        );

        return user;
    }
}