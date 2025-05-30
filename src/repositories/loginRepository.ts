import { compare } from "bcrypt-ts";
import UserRepository from "./userRepository";
import { AuthError } from "@/utils/authError";
import { Response } from "express";
import { UserEntity } from "@/entities/userEntity";

export default class LoginRepository {
  private userRepository: UserRepository

  constructor() {
    this.userRepository = new UserRepository()
  }


  async checkUser(email:string, password:string):Promise<UserEntity> {
    const userDB = await this.userRepository.getOneUserByEmail(email)

    if (!userDB) {
      throw new AuthError("invalid credentials")
    }

    const match = await compare(password, userDB.password)

    if (!match) {
      throw new AuthError("invalid credentials");
    }

    return userDB

  }
}
