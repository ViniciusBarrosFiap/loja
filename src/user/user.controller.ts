/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { CreateUsertDTO } from "./dto/CreateUser.dto";
import { UserEntity } from "./validation/user.entity";
import { v4 as uuid} from "uuid"
import { UserListDTO } from "./dto/UserList.dto";
import { UpdateUsertDTO } from "./dto/UpdateUser.dto";
@Controller("/users")//EndPoint da API, conseguimos executar os métodos http neste EndPoint
export class UserController{
    
    constructor(private userRepository: UserRepository){}
    
    //criando as métodos da api
    @Post() //Método POST
    async createUser(@Body() {name, email, password}:CreateUsertDTO){ //Especificando que os dados recebidos são do body da requisição
    //Indicando que é esperado receber um JSON do tipo "CreateUserDTO"
        
        //Se os dados estão sendo recebidos aqui significa que passou por todas as validações necessárias
        
        const userEntity = new UserEntity();//Instanciando a entidade do usuário

        //Atribuindo os valores recebidos na entidade instanciada
        userEntity.email = email;
        userEntity.password = password;
        userEntity.name = name;
        userEntity.id = uuid();

        //Mandando a entidade para ser salva 
        this.userRepository.save(userEntity);//Acessando os métodos de dentro da classe "userRepository"
        return {
            user: new UserListDTO(userEntity.id, userEntity.name),
            message:"Usuário cadastrado com sucesso"
        };
    }

    @Get()//Método GET
    async userList(){
        const savedUsers = await this.userRepository.listUser();//Acessando a função listUser
        const userList = savedUsers.map(
            user => new UserListDTO(
                user.id,
                user.name
            )
        );
        return userList;
    }
    @Put("/:id")
    async updateUser(@Param("id") id: string, @Body() newData: UpdateUsertDTO){
        //Dizendo que é para procurar um Param com o nome "id"
        //Logo depois dizemos que o id recebido é uma string
        //Por ultimo dizemos que os novos dados recebidos são dos tipos determinados no DTO do produto

        const UpdatedUser = await this.userRepository.update(id, newData); //Chamando a função do repository .update

        return{//Retornando o usuário modificado e a mensagem
            user: UpdatedUser,
            message: "Usuário atualizado com sucesso"
        }
    }
    @Delete("/:id")
    async removeUser(@Param("id") id:string){
        const removedUser = await this.userRepository.remove(id);
        return{
            user: removedUser,
            message: "Usuário removido com sucesso"
        }
    }

}