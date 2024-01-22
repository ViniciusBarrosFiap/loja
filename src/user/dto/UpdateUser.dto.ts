/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty, IsOptional, MinLength } from "class-validator";
import { EmailIsUnique } from "../validation/UniqueEmail.validator";

//Esse arquivo serve para fazer a validação dos dados recebidos
//Ele é invocado como o tipo esperado dentro do parâmetro de uma função do controller
export class UpdateUsertDTO { //Colocar as propriedades esperadas para criar um usuário
    
    @IsNotEmpty({message:"O nome não pode ser em branco ou conter números"})//Verifica se é uma string e se ela não está vazia
    @IsOptional()//Diz que é algo opcional
    name: string;

    @IsEmail(undefined, {message:"O e-mail é inválido"})//Verifica se é um email
    @EmailIsUnique({message: "Email já cadastrado"})
    @IsOptional()//Diz que é algo opcional
    email: string;

    @MinLength(6, {message:"A senha deve precisar ter ao menos 6 caracteres"})
    //Diz que é necessário ter no minimo 6 caracteres na senha
    @IsOptional()//Diz que é algo opcional
    password: string;

} 