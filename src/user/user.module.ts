/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserController } from "./user.controller";
import { UserRepository } from "./user.repository";
import { UniqueEmailValidator } from "./validation/UniqueEmail.validator";
import { UserService } from "./user.service";
import { UserEntity } from "./validation/user.entity";
@Module({
    imports: [TypeOrmModule.forFeature([UserEntity])],
    controllers: [UserController],
    providers:[UserService ,UserRepository, UniqueEmailValidator]
})
export class UserModule{

}