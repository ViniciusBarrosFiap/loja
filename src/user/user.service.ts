/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserListDTO } from "./dto/UserList.dto";
import { UserEntity } from "./validation/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  async listAllUsers(){
    const savedUsers = await this.userRepository.find()
    const userListed = savedUsers.map(
        (user) => new UserListDTO(user.id, user.name)
    )
    return userListed
  }
}
