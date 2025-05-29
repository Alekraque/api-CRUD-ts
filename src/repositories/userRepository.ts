
import { DeleteResult, Repository } from "typeorm";
import { UserEntity } from "@/entities/userEntity";
import AppDataSource from "@/database/connection";
import { CreateUserDTO } from "@/dto/create.userDto";
import { UpdateUserDTO } from "@/dto/update.userDto";

export default class UserRepository {

    private repository: Repository<UserEntity>

    constructor() {
        this.repository = AppDataSource.getRepository(UserEntity)
    }

    async getAllUsers(): Promise<UserEntity[]>{
      return await this.repository.find()
    }

    async getOneUser(id: string): Promise<UserEntity | null> {
      return await this.repository.findOneBy({ id })
    }

    async createUser(user:CreateUserDTO):Promise<UserEntity | null>{
      const newUser = new UserEntity
      newUser.name = user.name
      newUser.email = user.email
      newUser.cpf = user.cpf
      newUser.password = user.password
      return await this.repository.save(newUser)
    }

    // updateClient? - feito
    async updateUser(user:UpdateUserDTO):Promise<UserEntity | null> {
      const updateUser = await this.getOneUser(user.id)
      if(!updateUser) {
        return null
      }
      updateUser.name = user.name
      updateUser.email = user.email
      updateUser.cpf = user.cpf
      updateUser.password = user.password

      return await this.repository.save(updateUser)
    }

    // client?
    async deleteUser(id:string):Promise<DeleteResult>{
      return await this.repository.delete(id)
    }

}
