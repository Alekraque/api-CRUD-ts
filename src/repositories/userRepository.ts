
import { DeleteResult, Repository } from "typeorm";
import { UserEntity } from "@/entities/userEntity";
import AppDataSource from "@/database/connection";
import { CreateUserDTO } from "@/dto/create.userDto";
import { UpdateUserDTO } from "@/dto/update.userDto";
import { genSalt, hash, compare } from "bcrypt-ts";
import { AuthError } from "@/utils/authError";

interface ResponseError {
  status: number
  errorMessage?: string
  message?: string
}

export default class UserRepository {

    private repository: Repository<UserEntity>

    constructor() {
        this.repository = AppDataSource.getRepository(UserEntity)
    }

    async getAllUsers(): Promise<UserEntity[]>{
      return await this.repository.find()
    }

    async getOneUserById(id: string): Promise<UserEntity | null> {
      return await this.repository.findOneBy({ id })
    }

    async getOneUserByEmail(email: string): Promise<UserEntity | null> {
      return await this.repository.findOneBy({ email })
    }

    async createUser(user:CreateUserDTO):Promise<ResponseError>{

      const existingUserByCpf = await this.repository.findOne({
        where: { cpf: user.cpf }
      })

      if (existingUserByCpf) {
        return {
          status: 401,
          errorMessage: "CPF already registered"
        }
      }

      const existingUserByEmail = await this.repository.findOne({
        where: { email: user.email }
      })

      if (existingUserByEmail) {
        return {
          status: 401,
          errorMessage: "E-mail already registered"
        }
      }
      const salt = await genSalt(10)
      const result = await hash(user.password, salt)

      const newUser = new UserEntity
      newUser.name = user.name
      newUser.email = user.email
      newUser.cpf = user.cpf
      newUser.password = result
      newUser.role = user.role

      try {
        await this.repository.save(newUser)
        return {
          status: 201,
          message: "User sucessful created"
        }

      } catch (error) {
        return {
          status: 400,
          errorMessage: "Error to create User"
        }

      }

    }

    async updateUser(user:UpdateUserDTO):Promise<UserEntity | object> {


      const updateUser = await this.getOneUserById(user.id)

      if(!updateUser) {
        return {
          status: 404,
          errorMessage: "User ID not found"
        }
      }

      const verifyPassword = await compare(user.password, updateUser.password)

      if(!verifyPassword) {
        return {
          status: 404,
          errorMessage: "Incorrectly Password, please try again"
        }
      }

      const salt = await genSalt(10)
      const result = await hash(user.newPassword, salt)

      updateUser.name = user.name
      updateUser.email = user.email
      updateUser.cpf = user.cpf
      updateUser.password = result
      updateUser.role = user.role

      return await this.repository.save(updateUser)
    }


    async deleteUser(id:string):Promise<DeleteResult>{
      return await this.repository.delete(id)
    }

}
