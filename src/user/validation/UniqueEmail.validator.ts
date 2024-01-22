/* eslint-disable prettier/prettier */
import { ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, registerDecorator } from "class-validator";
import { UserRepository } from "../user.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
@ValidatorConstraint({ async: true })
export class UniqueEmailValidator implements ValidatorConstraintInterface{

    constructor(private userRepository:UserRepository){};

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> {
        const userWithEmailExist = await this.userRepository.emailExist(value);
        return !userWithEmailExist;//retorna true se o email não existir
    }
}

export const EmailIsUnique = (validationOptions: ValidationOptions) =>{
    
    return (object: object, property: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName: property,
            options: validationOptions,
            constraints: [],
            validator: UniqueEmailValidator
        });
    }
}